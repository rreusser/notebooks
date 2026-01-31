// Exponential smoother for smooth value transitions

export class Smoother {
  constructor(initialValue = 0, timeConstant = 0.05) {
    this.tTock = Date.now() / 1000;
    this.tTick = Date.now() / 1000;
    this.value = initialValue;
    this.target = initialValue;
    this.alpha = Math.log(2) / timeConstant;
  }

  tick() {
    this.tTock = this.tTick;
    this.tTick = Date.now() / 1000;

    const dt = this.tTick - this.tTock;
    this.value += (this.target - this.value) * (1.0 - Math.exp(-dt * this.alpha));

    return this.value;
  }

  setTarget(target) {
    this.target = target;
  }

  getValue() {
    return this.value;
  }

  getSlope() {
    const t = Date.now() / 1000;
    return -(this.target - this.value) * Math.exp(-(t - this.tTick) * this.alpha);
  }
}
