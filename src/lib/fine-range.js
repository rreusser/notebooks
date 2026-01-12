// A lot of this logic is wholesale copied from the original input so that we can access
// the transform and invert functions exactly as intended, but I've opted to
// wrap the Range component rather than a full rewrite in order to get the html
// structure for free.
//
// https://github.com/observablehq/inputs/blob/cc5f9d12f9d6e7ca7849942424b145695bc9de85/src/range.js#L29
//
// License: https://github.com/observablehq/inputs/blob/cc5f9d12f9d6e7ca7849942424b145695bc9de85/LICENSE
//
// Copyright 2021 Observable, Inc.
//
// Permission to use, copy, modify, and/or distribute this software for any purpose
// with or without fee is hereby granted, provided that the above copyright notice
// and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
// REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
// INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
// OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
// TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
// THIS SOFTWARE.
const epsilon = 1e-6;

function negate(x) {
  return -x;
}
function identity(x) {
  return x;
}

function square(x) {
  return x * x;
}

function solver(f) {
  if (f === identity || f === negate) return f;
  if (f === Math.sqrt) return square;
  if (f === Math.log) return Math.exp;
  if (f === Math.exp) return Math.log;
  return x => solve(f, x, x);
}

function solve(f, y, x) {
  let steps = 100,
    delta,
    f0,
    f1;
  x = x === undefined ? 0 : +x;
  y = +y;
  do {
    f0 = f(x);
    f1 = f(x + epsilon);
    if (f0 === f1) f1 = f0 + epsilon;
    x -= delta = (-1 * epsilon * (f0 - y)) / (f0 - f1);
  } while (steps-- > 0 && Math.abs(delta) > epsilon);
  return steps < 0 ? NaN : x;
}

export default function FineRange(Range, [min, max] = [0, 1], opts) {
  const THUMB_SIZE = 8;
  opts = opts || {};

  const stepSubdivisionHeight =
    typeof opts.stepSubdivisionHeight === 'number'
      ? opts.stepSubdivisionHeight
      : 50;

  const shiftKeySubdivisions =
    typeof opts.shiftKeySubdivisions === 'number'
      ? opts.shiftKeySubdivisions
      : 5;

  const invertControl =
    opts.invertControl === undefined ? false : opts.invertControl;

  (min = +min), (max = +max);
  let transform = opts.transform;
  let invert = opts.invert;
  if (min > max)
    ([min, max] = [max, min]),
      transform === undefined && (transform = negate);
  if (transform === undefined) transform = identity;
  if (typeof transform !== "function")
    throw new TypeError("transform is not a function");
  if (invert === undefined)
    invert =
      transform.invert === undefined ? solver(transform) : transform.invert;
  if (typeof invert !== "function")
    throw new TypeError("invert is not a function");

  opts = Object.assign({}, opts, { transform, invert });
  const component = Range([min, max], opts);

  // Ensure the component is positioned for absolute children
  component.style.position = 'relative';

  // Find the range input:
  const range = component.querySelector('input[type=range]');
  range.style.cursor = 'move';
  range.title = 'Move vertically or press shift key to adjust rate';

  // An element to display the rate
  const rate = document.createElement('span');
  rate.style.position = 'absolute';
  rate.style.color = '#666';
  rate.style.top = '-7px';
  rate.style.fontSize = '0.75em';
  rate.style.pointerEvents = 'none';
  component.appendChild(rate);

  function updateRate(num) {
    rate.style.right = '0';
    if (num === -1) {
      rate.textContent = '';
    } else if (num === 0) {
      rate.textContent = '1×';
    } else {
      rate.textContent = `1/${Math.pow(2, num)}×`;
    }
  }

  // Transformed min/max
  const tmin = transform(min);
  const tmax = transform(max);

  // State!!
  let x0, y0, xPrev, yPrev;

  function onstartinput(evt) {
    x0 = evt.clientX;
    y0 = evt.clientY;
    xPrev = x0;
    yPrev = y0;
  }

  function oninput(evt) {
    const rect = range.getBoundingClientRect();

    const x = evt.clientX;
    const y = evt.clientY;
    const dx = x - xPrev;
    const dy = y - yPrev;

    // Compute the rate as a power of two
    let rateNum = Math.min(
      0,
      Math.round(-Math.abs(y - y0) / stepSubdivisionHeight)
    );

    // Slow down if shift key pressed
    if (evt.shiftKey) rateNum -= shiftKeySubdivisions;

    const rate = Math.pow(2, rateNum);
    updateRate(Math.abs(rateNum));

    // Compute the change in slider units
    const delta = (dx / (rect.width - 2.0 * THUMB_SIZE)) * (tmax - tmin);

    // Update the value
    range.value = range.valueAsNumber + delta * rate;

    // Emit an event
    range.dispatchEvent(new CustomEvent('input'));
    component.dispatchEvent(new CustomEvent('input'));

    // Previous coords
    xPrev = x;
    yPrev = y;
  }

  function onendinput(evt) {
    updateRate(-1);
  }

  range.addEventListener('pointerdown', function(evt) {
    evt.preventDefault();
    range.setPointerCapture(evt.pointerId);
    onstartinput(evt);
  });

  range.addEventListener('touchstart', function(evt) {
    if (!evt.touches.length) return;
    onstartinput(evt.touches[0]);
  });

  range.addEventListener('pointermove', function(evt) {
    if (evt.buttons !== 1) return;
    oninput(evt);
    evt.preventDefault();
  });

  range.addEventListener('touchmove', function(evt) {
    if (evt.touches.length !== 1) return;
    oninput(evt.touches[0]);
    evt.preventDefault();
  });

  range.addEventListener('pointerup', function(evt) {
    range.releasePointerCapture(evt.pointerId);
    onendinput(evt);
  });

  range.addEventListener('touchend', function(evt) {
    if (evt.touches.length > 0) return;
    onendinput(evt);
  });

  return component;
};
