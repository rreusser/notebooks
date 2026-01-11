import{_ as b,d as u}from"./index-Bvdv0JJ6.js";(window.location.hostname==="localhost"||window.location.hostname.match(/127\.0\.0\.1/))&&b(async()=>{const{main:e}=await import("./index-Bvdv0JJ6.js").then(t=>t.i);return{main:e}},[]).then(({main:e})=>{window.__observableRuntime=e,console.log("[DebugClient] Runtime module exposed as window.__observableRuntime"),b(()=>import("./debug-client-BJyqFSh-.js"),[])});u({root:document.getElementById("cell-2819"),expanded:[],variables:[]},{id:2819,body:async function(e,t,a,n){return e`<figure>
<img src="${await t(new URL("/notebooks/assets/old-CLf2rk4C.jpg",import.meta.url).href).url()}" width="48%">
<img src="${await t(new URL("/notebooks/assets/new-BqwmRspw.jpg",import.meta.url).href).url()}" width="48%">
<figcaption>${a`A comparison of a Möbius transformation, ${n`f(z) = \frac{(z-a)(b-m)}{(z-b)(a-m)}`} with ${n`a = -\frac{3}{2} + \frac{i}{2}`}, ${n`b = \frac{3}{2} - \frac{i}{2}`}, and ${n`m = 0`}, using my [older method for domain coloring](https://github.com/rreusser/glsl-domain-coloring) (*left*) and [the techniques from this notebook](https://observablehq.com/@rreusser/complex-function-plotter) (*right*).`}</figcaption>
</figure>`},inputs:["html","FileAttachment","md","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-3497"),expanded:[],variables:[]},{id:3497,body:(e,t)=>({complexSampleFunctionGLSL:e(t(`vec2 complexSampleFunction (vec2 z, vec2 zMouse) {
  return cmul(
    cdiv(z - vec2(1, 0), z + vec2(1, 0)),
    z - zMouse
  );
}`))}),inputs:["view","code"],outputs:["complexSampleFunctionGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2288"),expanded:[],variables:[]},{id:2288,body:(e,t)=>({logStripesGLSL:e(t(`float logStripesColormap (float f, float spacing) {
  return 2.0 * (0.5 - abs(fract(log2(abs(f)) / spacing) - 0.5));
}`))}),inputs:["view","code"],outputs:["logStripesGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2598"),expanded:[],variables:[]},{id:2598,body:(e,t,a,n)=>({regl0:e(function(){const o=t(a),d=n`
    <figure>
      ${o}
      <figcaption>Our starting point: the log of the magnitude of a function, plotted with a triangle-wave color map. Adjust the threshold below and observe non-uniform lines that result.</figcaption>
    </figure>`;return d.value=o.value,d}())}),inputs:["view","createREGLContext","smallCanvas","html"],outputs:["regl0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-3022"),expanded:[],variables:[]},{id:3022,body:function(t){return t({min:0,max:1,value:[0,1],description:"Colorscale threshold"})},inputs:["rangeSlider"],outputs:void 0,output:"viewof$gradientThreshold",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});u({root:document.getElementById("cell-3625"),expanded:[],variables:[]},{id:3625,body:(e,t,a,n)=>({drawLoop0:function(){e.configureMouse.taint();const o=t.frame(()=>{e.configureView(()=>{e.configureBlit(()=>{e.configureMouse(d=>{d.dirty&&e.drawField({contourSpacing:1,gradientThreshold:a})})})})});n.then(()=>o.cancel())}()}),inputs:["drawCmds0","regl0","gradientThreshold","invalidation"],outputs:["drawLoop0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2601"),expanded:[],variables:[]},{id:2601,body:(e,t,a,n,i,o,d,l,f)=>({drawCmds0:{configureBlit:e(t),configureView:a(t),configureMouse:n(t,i),drawField:t({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float contourSpacing;
      uniform vec2 mouse;
      uniform vec2 threshold;
      varying vec2 xy;

      ${o}
      ${d}
      ${l}
      ${f}

      // Equivalent to smoothstep, but with a hard edge
      float hardstep (float edge0, float edge1, float x) {
        return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      }

      void main () {
        vec2 f = complexSampleFunction(xy, mouse);
        float contours = logStripesColormap(cabs(f), contourSpacing);
        contours = hardstep(threshold.x, threshold.y, contours);
        gl_FragColor = vec4(gammaCorrect(vec3(contours)), 1);
      }`,uniforms:{contourSpacing:t.prop("contourSpacing"),threshold:t.prop("gradientThreshold")}})}}),inputs:["createBlitCmd","regl0","createConfigureViewCmd","createAttachMouseCmd","invalidation","glslComplex","gammaCorrectGLSL","complexSampleFunctionGLSL","logStripesGLSL"],outputs:["drawCmds0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2940"),expanded:[],variables:[]},{id:2940,body:async(e,t,a)=>e`<figure style="text-align:center">
<img src="${await t(new URL("/notebooks/assets/fragments-CQSjwBqD.jpg",import.meta.url).href).url()}" style="max-width:300px;margin:auto">
<figcaption>${a`A block of four adjacent fragments (pixels), from which GPU shaders may request screen-space derivatives.`}</figcaption>
</figure>`,inputs:["html","FileAttachment","md"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3596"),expanded:[],variables:[]},{id:3596,body:(e,t)=>e`GPUs evaluate fragments in ${t`2 \times 2`} blocks and offer horizontal and vertical differences between fragments as built-in functions. These differences are equivalent to first order [finite difference](https://en.wikipedia.org/wiki/Finite_difference) approximations of the derivative with units of *units per pixel*. Horizontal derivatives within a block are defined as
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3597"),expanded:[],variables:[]},{id:3597,body:(e,t)=>e`${t.block`
\begin{aligned}
& \left.\frac{\partial f}{\partial i}\right|_{i, j} = \left.\frac{\partial f}{\partial i}\right|_{i + 1, j} \approx f_{i + 1, j} - f_{i, j} \\

& \left.\frac{\partial f}{\partial i}\right|_{i, j + 1} = \left.\frac{\partial f}{\partial i}\right|_{i + 1, j + 1} \approx f_{i + 1, j + 1} - f_{i, j + 1}
\end{aligned}
`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3599"),expanded:[],variables:[]},{id:3599,body:(e,t)=>e`where ${t`i`} and ${t`j`} are pixel coordinates. Vertical derivatives are defined similarly. The screen-space gradient magnitude is then the sum of the squares of the ${t`i-`} and ${t`j-`}derivatives.
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3600"),expanded:[],variables:[]},{id:3600,body:(e,t)=>e`${t.block`\left| \nabla f \right| = \sqrt{ \left(\frac{\partial f}{\partial i}\right)^2 +  \left(\frac{\partial f}{\partial j}\right)^2}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3602"),expanded:[],variables:[]},{id:3602,body:(e,t)=>e`${t.block`\frac{(\mathrm{units})}{(\frac{\mathrm{units}}{\mathrm{pixel}})} = \mathrm{pixels}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(e,t)=>e`The function \`fwidth\` is often used as a square-root-free proxy for the gradient magnitude but results in about a 40% anisotropy in diagonal directions (i.e. ${t`\sqrt{2}`}), so that \`length(vec2(dFdx(f), dFdy(f)))\` is preferable for the best quality.
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-220"),expanded:[],variables:[]},{id:220,body:(e,t)=>({logContoursGLSL:e(t(`float logContours (float f, float spacing, float width, float antialiasWidth) {
  float plotVar = log2(abs(f)) * spacing;
  float screenSpaceGradient = hypot(vec2(dFdx(f), dFdy(f))) / abs(f) * spacing;
  return linearstep(
    width + 0.5 * antialiasWidth,
    width - 0.5 * antialiasWidth,
    (0.5 - abs(fract(plotVar) - 0.5)) / screenSpaceGradient
  );
}`))}),inputs:["view","code"],outputs:["logContoursGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-3654"),expanded:[],variables:[]},{id:3654,body:(e,t,a,n,i,o,d)=>{const c=Array.from({length:401},(m,v)=>v/400*60),p=m=>.002*(20*m+.5*m*m),r=m=>.002*(20+m),s=c.map(m=>p(m)*e%1),g=c.map(m=>(.5-Math.abs(p(m)*e%1-.5))/r(m)/e),y=g.map(m=>Math.min(t,m)),h=c.map(m=>a(1+.5*Math.max(1e-4,n)/t,1-.5*Math.max(1e-4,n)/t,(.5-Math.abs(p(m)*e%1-.5))/r(m)/(t*e)));return i(o.plot({width:d.width,height:120,x:{domain:[0,60]},y:{domain:[-.1,1.1]},marginTop:10,marginBottom:40,marks:[o.ruleY([.5],{stroke:"black"}),o.line(c.map((m,v)=>({x:m,y:s[v]})),{x:"x",y:"y",stroke:"#27c"})]})),i(o.plot({width:d.width,height:120,x:{domain:[0,60]},y:{domain:[0,5]},marginTop:10,marginBottom:30,marks:[o.line(c.map((m,v)=>({x:m,y:g[v]})),{x:"x",y:"y",stroke:"#27c"}),o.ruleY([t],{stroke:"black"}),o.ruleY([t-.5*n,t+.5*n],{stroke:"#bbb",strokeDasharray:"4,4"})]})),i(o.plot({width:d.width,height:120,x:{domain:[0,60]},y:{domain:[-.1,1.1]},marginTop:20,marginBottom:30,marks:[o.areaY(c.map((m,v)=>({x:m,y:h[v]})),{x:"x",y:"y",fill:"#27c",fillOpacity:.25}),o.line(c.map((m,v)=>({x:m,y:h[v]})),{x:"x",y:"y",stroke:"#27c"})]})),{n:401,xmax:60,x:c,f:p,dFdx:r,phase:s,triangle:g,clippedTriangle:y,smooth:h}},inputs:["contourSpacing","lineWidth","linearstep","lineFeather","display","Plot","smallCanvas"],outputs:["n","xmax","x","f","dFdx","phase","triangle","clippedTriangle","smooth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-508"),expanded:[],variables:[]},{id:508,body:(e,t)=>{const a=e(t.range([.5,10],{step:.01,value:1,label:"Contour spacing"})),n=e(t.range([.5,3],{step:.1,value:1,label:"Line width"})),i=e(t.range([0,2],{step:.1,value:1,label:"Antialiasing width"}));return{contourSpacing:a,lineWidth:n,lineFeather:i}},inputs:["view","Inputs"],outputs:["contourSpacing","lineWidth","lineFeather"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-98"),expanded:[],variables:[]},{id:98,body:(e,t,a,n)=>({regl1:e(function(){const o=t(a),d=n`
    <figure>
      ${o}
      <figcaption>Contours of the log-magnitude of a sample function computed in a WebGL fragment shader with the screen-space derivatives technique.</figcaption>
    </figure>`;return d.value=o.value,d}())}),inputs:["view","createREGLContext","smallCanvas","html"],outputs:["regl1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-121"),expanded:[],variables:[]},{id:121,body:(e,t,a,n,i,o)=>({drawLoop1:function(){e.configureMouse.taint();const l=t.frame(()=>{e.configureView(()=>{e.configureBlit(()=>{e.configureMouse(f=>{f.dirty&&e.drawField({lineWidth:a,lineFeather:n,contourSpacing:i})})})})});o.then(()=>l.cancel())}()}),inputs:["drawCmds1","regl1","lineWidth","lineFeather","contourSpacing","invalidation"],outputs:["drawLoop1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-358"),expanded:[],variables:[]},{id:358,body:(e,t,a,n,i,o,d,l,f,c)=>({drawCmds1:{configureBlit:e(t),configureView:a(t),configureMouse:n(t,i),drawField:t({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float lineWidth, lineFeather, contourSpacing;
      uniform vec2 mouse;
      varying vec2 xy;

      ${o}
      ${d}
      ${l}
      ${f}
      ${c}

      void main () {
        vec2 f = complexSampleFunction(xy, mouse);

        float contours = logContours(cabs(f), contourSpacing, lineWidth, lineFeather);

        // Awhite background with black contours
        gl_FragColor = vec4(gammaCorrect(vec3(1.0 - contours)), 1);
      }`,uniforms:{contourSpacing:t.prop("contourSpacing"),lineWidth:(r,s)=>r.pixelRatio*s.lineWidth,lineFeather:(r,s)=>Math.max(1e-4,r.pixelRatio*s.lineFeather)}})}}),inputs:["createBlitCmd","regl1","createConfigureViewCmd","createAttachMouseCmd","invalidation","linearStepGLSL","glslComplex","gammaCorrectGLSL","logContoursGLSL","complexSampleFunctionGLSL"],outputs:["drawCmds1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-3629"),expanded:[],variables:[]},{id:3629,body:(e,t)=>e`Our next observation is that we can use the same gradient to select a locally appropriate contour step size. We call regions of equal spacing *octaves*, and every time the octave increments, we split one division into ${t`D`} divisions.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3631"),expanded:[],variables:[]},{id:3631,body:(e,t)=>e`${t.block`
N_{octave} = \left \lceil \log_{D}{\left( m \frac{\left|\nabla f\right|}{|f|} \right)} \right \rceil
`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3632"),expanded:[],variables:[]},{id:3632,body:(e,t)=>e`${t.block`
N_{octave} = \left \lceil \log_{D}{\left( m \frac{\left|\nabla f\right|}{|f|} \right)} \right \rceil
`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3633"),expanded:[],variables:[]},{id:3633,body:(e,t)=>e`where ${t`N_{octave}`} is an integer indicating to which octave a given region belongs, ${t`D`} is the number of divisions per octave, and ${t`m`} is the minimum spacing, in pixels, between divisions. Note that the term in the inner parentheses is dimensionless.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3634"),expanded:[],variables:[]},{id:3634,body:(e,t)=>e`We then compute the contour spacing ${t`\delta`} as`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3635"),expanded:[],variables:[]},{id:3635,body:(e,t)=>e`${t.block`
\delta = D^{N_{octave}}.
`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3637"),expanded:[],variables:[]},{id:3637,body:(e,t)=>e`${t.block`
\frac{d}{dx} \ln{f(x)} = \frac{1}{f(x)} \frac{d f(x)}{dx}.
`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-938"),expanded:[],variables:[]},{id:938,body:(e,t,a)=>({locallyScaledLogContoursGLSL:e(t(`float locallyScaledLogContours (float f,
                                float minSpacing,
                                float divisions,
                                float lineWidth,
                                float antialiasWidth
) {
  float screenSpaceGrad = hypot(vec2(dFdx(f), dFdy(f)))${a==="Linear"?"":" / abs(f)"};

  // Select which integer-valued octave a region falls into
  float localOctave = ceil(log2(screenSpaceGrad * minSpacing) / log2(divisions));

  // An integer power of the divisions per octave
  float contourSpacing = pow(divisions, localOctave);

  // Plot contours at each multiple of the contour spacing
  float plotVar = ${a==="Logarithmic"?"log2(abs(f))":"abs(f)"} / contourSpacing;

  // A magic width scale to make the lines uniform
  float widthScale = 2.0 * contourSpacing / screenSpaceGrad${a==="Logarithmic"?"":" * 2.0"};

  return linearstep(
    lineWidth + antialiasWidth,
    lineWidth - antialiasWidth,
    (0.5 - abs(fract(plotVar) - 0.5)) * widthScale
  );
}`))}),inputs:["view","code","scalingType2"],outputs:["locallyScaledLogContoursGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-3478"),expanded:[],variables:[]},{id:3478,body:(e,t)=>{const a=e(t.range([2,40],{step:1,value:15,label:"Minimum contour spacing, in pixels"})),n=e(t.range([2,8],{step:1,value:2,label:"Divisions per octave"})),i=e(t.radio(["Logarithmic","Linear"],{value:"Logarithmic"})),o=e(t.checkbox(["Visualize octave with color"],{value:["Visualize octave with color"]}));return{baselineSpacing:a,octaveDivisions:n,scalingType2:i,debugColor:o}},inputs:["view","Inputs"],outputs:["baselineSpacing","octaveDivisions","scalingType2","debugColor"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-927"),expanded:[],variables:[]},{id:927,body:(e,t,a,n)=>({regl2:e(function(){const o=t(a),d=n`
    <figure>
      ${o}
      <figcaption>Log-distributed contours with spacing scaled by the local relative gradient of the function.</figcaption>
    </figure>`;return d.value=o.value,d}())}),inputs:["view","createREGLContext","largeCanvas","html"],outputs:["regl2"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-932"),expanded:[],variables:[]},{id:932,body:(e,t,a,n,i,o,d)=>({drawLoop2:function(){e.configureMouse.taint();const f=t.frame(()=>{e.configureView(()=>{e.configureBlit(()=>{e.configureMouse(c=>{c.dirty&&e.drawField({lineWidth:1.5,lineFeather:1.5,contourSpacing:a,octaveDivisions:n,baselineSpacing:i,debugColor:o.includes("Visualize octave with color")})})})})});d.then(()=>f.cancel())}()}),inputs:["drawCmds2","regl2","contourSpacing","octaveDivisions","baselineSpacing","debugColor","invalidation"],outputs:["drawLoop2"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-929"),expanded:[],variables:[]},{id:929,body:(e,t,a,n,i,o,d,l,f,c,p)=>({drawCmds2:{configureBlit:e(t),configureView:a(t),configureMouse:n(t,i),drawField:t({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float lineWidth, lineFeather, octaveDivisions, baselineSpacing;
      uniform bool debugColor;
      uniform vec2 mouse;
      varying vec2 xy;

      ${o}
      ${d}
      ${l}
      ${f}
      ${c}

      vec3 randomColor (float x) {
        return 0.5 + 0.5 * vec3(cos(x), cos(x - PI * 2.0 / 3.0), cos(x - PI * 4.0 / 3.0));
      }

      vec3 octaveColor (float f, float minSpacing, float divisions) {
        float screenSpaceGrad = hypot(vec2(dFdx(f), dFdy(f)))${p==="Linear"?"":" / abs(f)"};
        float localOctave = ceil(log2(screenSpaceGrad * minSpacing) / log2(divisions));
        return randomColor(localOctave);
      }

      void main () {
        vec2 f = complexSampleFunction(xy, mouse);
        vec3 color = mix(vec3(1), octaveColor(cabs(f), baselineSpacing, octaveDivisions), debugColor ? 0.3 : 0.0);

        gl_FragColor = vec4(gammaCorrect(color * vec3(
          1.0 - locallyScaledLogContours(
            cabs(f),
            baselineSpacing,
            octaveDivisions,
            lineWidth,
            lineFeather)
          )), 1);
      }`,uniforms:{debugColor:(s,g)=>!!g.debugColor,octaveDivisions:t.prop("octaveDivisions"),baselineSpacing:(s,g)=>g.baselineSpacing*s.pixelRatio,lineWidth:(s,g)=>s.pixelRatio*g.lineWidth,lineFeather:(s,g)=>Math.max(1e-4,s.pixelRatio*g.lineFeather)}})}}),inputs:["createBlitCmd","regl2","createConfigureViewCmd","createAttachMouseCmd","invalidation","linearStepGLSL","glslComplex","gammaCorrectGLSL","complexSampleFunctionGLSL","locallyScaledLogContoursGLSL","scalingType2"],outputs:["drawCmds2"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-1035"),expanded:[],variables:[]},{id:1035,body:function(t){return t`## Blending over octaves

We've made progress, except we have sharp transitions between successive contour spacings. The final major trick is to blend these contours over a number of octaves, starting at the finest spacing relative to pixels and increasing the size until contours would cover the entire image, at which point further octaves have no use.

This approach is not unlike a [Shepard tone](https://en.wikipedia.org/wiki/Shepard_tone), which appears to increase infinitely, fading out tones as they leave the upper end of the auditory range and replacing them with new tones at the bottom end of the auditory range. Similarly, we fade out contours as they leave the desirable range, becoming either too densely spaced or too spread out.`},inputs:["md"],outputs:void 0,output:"blending",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-1049"),expanded:[],variables:[]},{id:1049,body:(e,t,a,n)=>({blendedOctavesGLSL:e(t(`float blendedContours (float f, float minSpacing, float width, float antialiasing) {
  // Compile-time constants
  const int octaves = ${a};
  const float n = ${a.toFixed(1)};

  float screenSpaceGrad = hypot(vec2(dFdx(f), dFdy(f)))${n==="Linear"?"":" / abs(f)"};${n==="Linear"?"antialiasing /= 2.0;":""}

  float localOctave = log2(screenSpaceGrad * minSpacing) / log2(octaveDivisions);
  float contourSpacing = pow(octaveDivisions, ceil(localOctave));

  float plotVar = ${n==="Logarithmic"?"log2(abs(f))":"abs(f)"} / contourSpacing;
  float widthScale = contourSpacing / screenSpaceGrad;

  float contourSum = 0.0;
  for(int i = 0; i < octaves; i++) {
    // A weight which fades in the smallest octave and fades out the largest
    float t = float(i + 1) - fract(localOctave);
    float weight = smoothstep(0.0, 1.0, t) * smoothstep(n, n - 1.0, t);

    contourSum += weight * linearstep(
      0.5 * (width + antialiasing),
      0.5 * (width - antialiasing),
      (0.5 - abs(fract(plotVar) - 0.5)) * widthScale
    );

    // Rescale for the next octave
    widthScale *= octaveDivisions;
    plotVar /= octaveDivisions;
  }

  return contourSum / n;
}`))}),inputs:["view","code","octaveCount","scalingType3"],outputs:["blendedOctavesGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-1164"),expanded:[],variables:[]},{id:1164,body:(e,t)=>{const a=e(t.range([1,5],{step:.1,value:2,label:"Minimum contour spacing, in pixels"})),n=e(t.range([2,8],{step:1,value:6,label:"Divisons per octave"})),i=e(t.range([1,8],{step:1,value:4,label:"Octaves"})),o=e(t.radio(["Logarithmic","Linear"],{value:"Logarithmic"}));return{baselineSpacing2:a,octaveDivisions2:n,octaveCount:i,scalingType3:o}},inputs:["view","Inputs"],outputs:["baselineSpacing2","octaveDivisions2","octaveCount","scalingType3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-1038"),expanded:[],variables:[]},{id:1038,body:(e,t,a,n)=>({regl3:e(function(){const o=t(a),d=n`
    <figure>
      ${o}
      <figcaption>Locally-scaled contours, blended across multiple octaves.</figcaption>
    </figure>`;return d.value=o.value,d}())}),inputs:["view","createREGLContext","largeCanvas","html"],outputs:["regl3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-1043"),expanded:[],variables:[]},{id:1043,body:(e,t,a,n,i,o)=>({drawLoop3:function(){e.configureMouse.taint();const l=t.frame(()=>{e.configureView(()=>{e.configureBlit(()=>{e.configureMouse(f=>{f.dirty&&e.drawField({lineWidth:1.5,lineFeather:1.5,contourSpacing:a,octaveDivisions:n,baselineSpacing:i})})})})});o.then(()=>l.cancel())}()}),inputs:["drawCmds3","regl3","contourSpacing","octaveDivisions2","baselineSpacing2","invalidation"],outputs:["drawLoop3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-1046"),expanded:[],variables:[]},{id:1046,body:(e,t,a,n,i,o,d,l,f,c)=>({drawCmds3:{configureBlit:e(t),configureView:a(t),configureMouse:n(t,i),drawField:t({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float lineWidth, lineFeather, octaveDivisions, baselineSpacing;
      uniform vec2 mouse;
      varying vec2 xy;

      ${o}
      ${d}
      ${l}
      ${f}
      ${c}

      void main () {
        vec2 f = complexSampleFunction(xy, mouse);

        gl_FragColor = vec4(
          gammaCorrect(
            vec3(1.0 - 1.5 * blendedContours(hypot(f), baselineSpacing, lineWidth, lineFeather))
          ), 1);
      }`,uniforms:{octaveDivisions:t.prop("octaveDivisions"),baselineSpacing:(r,s)=>s.baselineSpacing*r.pixelRatio,lineWidth:(r,s)=>r.pixelRatio*s.lineWidth,lineFeather:(r,s)=>Math.max(1e-4,r.pixelRatio*s.lineFeather)}})}}),inputs:["createBlitCmd","regl3","createConfigureViewCmd","createAttachMouseCmd","invalidation","linearStepGLSL","glslComplex","gammaCorrectGLSL","complexSampleFunctionGLSL","blendedOctavesGLSL"],outputs:["drawCmds3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2634"),expanded:[],variables:[]},{id:2634,body:function(e){return e`<div style="padding-top: 5em"></div>`},inputs:["html"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-1208"),expanded:[],variables:[]},{id:1208,body:function(t){return t`## Shaded contouring

We've so far spent all of our time on line contours. Next, we repurpose the exact same concepts for shaded regions.

Since shading fills entire regions, it may at first appear that our screen-space trick for relating function values to pixel widths has no place here. However, if we smoothly shade regions from a value of zero to one with a sharp jump back to zero, we'll encounter aliasing at the threshold.

To antialias, we use the above screen-space derivative trick to produce a function that goes smoothly from zero to one then back to zero *over a given number of pixels*.`},inputs:["md"],outputs:void 0,output:"shading",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-3652"),expanded:[],variables:[]},{id:3652,body:(e,t,a,n)=>{const o=[{x:0,y:0},{x:30,y:1}],d=[{x:0,y:30/e},{x:30,y:0}],l=[{x:0,y:0},{x:30-e+e/30,y:1-e/30},{x:30,y:0}];return t(a.plot({width:n.width,height:300,y:{domain:[0,1.5]},marginTop:20,marginRight:20,marginBottom:40,marginLeft:40,marks:[a.areaY(l,{x:"x",y:"y",fill:"#27c",fillOpacity:.25}),a.line(o,{x:"x",y:"y",stroke:"#27c"}),a.dot(o,{x:"x",y:"y",fill:"#27c",r:3}),a.line(d,{x:"x",y:"y",stroke:"#27c",strokeDasharray:"4,4"})]})),{xmax:30,baseLine:o,dashedLine:d,areaShape:l}},inputs:["antialiasing4","display","Plot","smallCanvas"],outputs:["xmax","baseLine","dashedLine","areaShape"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2386"),expanded:[],variables:[]},{id:2386,body:function(t){return t.range([0,2],{step:.1,value:1,label:"Antialiasing width"})},inputs:["Inputs"],outputs:void 0,output:"viewof$antialiasing4",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});u({root:document.getElementById("cell-2502"),expanded:[],variables:[]},{id:2502,body:function(e){return e`Of course we may not want our coloring to go *linearly* from zero to one. In the style of [unsharp masking](https://en.wikipedia.org/wiki/Unsharp_masking), we can distribute the slope toward the edges of the ramp to increase the perceived contrast. The plot below shows a simple single-parameter contrast ramp layered over multiple octaves.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-2508"),expanded:[],variables:[]},{id:2508,body:(e,t)=>({contrastFunctionGLSL:e(t(`float contrastFunction(float x, float power) {
  x = 2.0 * x - 1.0;
  return 0.5 + 0.5 * pow(abs(x), power) * sign(x);
}`))}),inputs:["view","code"],outputs:["contrastFunctionGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-3649"),expanded:[],variables:[]},{id:3649,body:(e,t,a,n,i,o)=>{const f=Array.from({length:801},(s,g)=>g/800);function c(s,g){return s=2*s-1,.5+.5*Math.pow(Math.abs(s),g)*Math.sign(s)}function p(s){let g=1,y=0;for(let h=0;h<e;h++)y+=c(s*g%1,t),g*=a;return y/e}const r=f.map(s=>({x:s,y:p(s)}));return n(i.plot({width:o.width,height:300,y:{domain:[0,1]},marginTop:20,marginRight:20,marginBottom:40,marginLeft:40,marks:[i.areaY(r,{x:"x",y:"y",fill:"#27c",fillOpacity:.25}),i.line(r,{x:"x",y:"y",stroke:"#27c",strokeWidth:1})]})),{n:801,xmax:1,x:f,ramp:c,f:p,data:r}},inputs:["octaveCount4","rampPower4","octaveDivisions4","display","Plot","smallCanvas"],outputs:["n","xmax","x","ramp","f","data"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2498"),expanded:[],variables:[]},{id:2498,body:(e,t)=>{const a=e(t.range([1,4],{step:.01,value:2,label:"Contrast ramp power"})),n=e(t.range([1,8],{step:1,value:4,label:"Octaves"})),i=e(t.range([2,8],{step:1,value:5,label:"Divisons per octave"})),o=e(t.range([1,5],{step:.1,value:1,label:"Minimum contour spacing, in pixels"})),d=e(t.range([0,2],{step:.1,value:1,label:"Antialiasing width"})),l=e(t.radio(["Logarithmic","Linear"],{value:"Logarithmic"}));return{rampPower4:a,octaveCount4:n,octaveDivisions4:i,contourSpacing4:o,antialiasing5:d,scalingType:l}},inputs:["view","Inputs"],outputs:["rampPower4","octaveCount4","octaveDivisions4","contourSpacing4","antialiasing5","scalingType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2330"),expanded:[],variables:[]},{id:2330,body:function(t,a,n){const i=t(a),o=n`
    <figure>
      ${i}
      <figcaption>The line contouring code, repurposed for shading. Adjust the zoom below and observe that the contours always adjust just right to produce the illusion of infinite detail.</figcaption>
    </figure>`;return o.value=i.value,o},inputs:["createREGLContext","largeCanvas","html"],outputs:void 0,output:"viewof$regl4",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});u({root:document.getElementById("cell-3343"),expanded:[],variables:[]},{id:3343,body:(e,t)=>({zoom:e(function(){const n=t.range([-3,3],{step:.001,precision:3,value:0,label:"Zoom"});return n.classList.add("wide"),n}())}),inputs:["view","Inputs"],outputs:["zoom"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2325"),expanded:[],variables:[]},{id:2325,body:(e,t,a,n)=>({shadedOctavesGLSL:e(t(`float shadedContours (float f, float minSpacing, float antialiasWidth, float rampPower) {
  // Compile-time constants
  const int octaves = ${a};
  const float fOctaves = ${a.toFixed(1)};

  float screenSpaceGrad = hypot(vec2(dFdx(f), dFdy(f)))${n==="Linear"?"":" / abs(f)"};${n==="Linear"?"antialiasWidth /= 2.0;":""}

  float localOctave = log2(screenSpaceGrad * minSpacing) / log2(octaveDivisions);
  float contourSpacing = pow(octaveDivisions, ceil(localOctave));

  float plotVar = ${n==="Logarithmic"?"log2(abs(f))":"abs(f)"} / contourSpacing;
  float widthScale = contourSpacing / screenSpaceGrad;

  float contourSum = 0.0;
  for(int i = 0; i < octaves; i++) {
    // A weight which fades in the smallest octave and fades out the largest
    float t = float(i + 1) - fract(localOctave);
    float weight = smoothstep(0.0, 1.0, t) * smoothstep(fOctaves, fOctaves - 1.0, t);

    // Shading for this octave is the contrast ramp with a chunk cut out of the corner for antialiasing
    float y = fract(plotVar);
    contourSum += weight * min(
      contrastFunction(y, rampPower),
      (1.0 - y) * 0.5 * widthScale / antialiasWidth
    );

    // Adjust scales for the next octave
    widthScale *= octaveDivisions;
    plotVar /= octaveDivisions;
  }

  return contourSum / fOctaves;
}`))}),inputs:["view","code","octaveCount4","scalingType"],outputs:["shadedOctavesGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2332"),expanded:[],variables:[]},{id:2332,body:(e,t,a,n,i,o,d,l)=>({drawLoop4:function(){e.configureMouse.taint(),e.configureMouse.reset();const c=t.frame(()=>{e.configureView({scale:Math.pow(10,-a)*2},()=>{e.configureBlit(()=>{e.configureMouse(p=>{p.dirty&&e.drawField({antialiasWidth:n,octaveDivisions:i,baselineSpacing:o,rampPower:d})})})})});l.then(()=>c.cancel())}()}),inputs:["drawCmds4","regl4","zoom","antialiasing5","octaveDivisions4","contourSpacing4","rampPower4","invalidation"],outputs:["drawLoop4"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2334"),expanded:[],variables:[]},{id:2334,body:(e,t,a,n,i,o,d,l,f,c)=>({drawCmds4:{configureBlit:e(t),configureView:a(t),configureMouse:n(t,i),drawField:t({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float antialiasWidth, octaveDivisions, baselineSpacing, rampPower;
      uniform vec2 mouse;
      varying vec2 xy;

      ${o}
      ${d}
      ${l}
      ${f}
      ${c}

      void main () {
        vec2 f = complexSampleFunction(xy, mouse);

        gl_FragColor = vec4(vec3(
          gammaCorrect(vec3(1.0 - shadedContours(hypot(f), baselineSpacing, antialiasWidth, rampPower)))
        ), 1);
      }`,uniforms:{octaveDivisions:t.prop("octaveDivisions"),rampPower:t.prop("rampPower"),baselineSpacing:(r,s)=>s.baselineSpacing*r.pixelRatio,antialiasWidth:(r,s)=>Math.max(1e-4,s.antialiasWidth)}})}}),inputs:["createBlitCmd","regl4","createConfigureViewCmd","createAttachMouseCmd","invalidation","glslComplex","gammaCorrectGLSL","contrastFunctionGLSL","complexSampleFunctionGLSL","shadedOctavesGLSL"],outputs:["drawCmds4"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2649"),expanded:[],variables:[]},{id:2649,body:function(e){return e`<div style="padding-top: 5em"></div>`},inputs:["html"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-432"),expanded:[],variables:[]},{id:432,body:(e,t)=>{function a(n){function i(l,f,c){const p=e.canvas(Math.floor(l*c),Math.floor(f*c));return p.style.width=`${l}px`,p.style.height=`${f}px`,p}const o=i(n.width,n.height,n.pixelRatio),d=t({pixelRatio:n.pixelRatio,canvas:o,extensions:["OES_standard_derivatives"]});return o.value=d,o}return{createREGLContext:a}},inputs:["DOM","createREGL"],outputs:["createREGLContext"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-410"),expanded:[],variables:[]},{id:410,body:()=>({createBlitCmd:function(t){return t({vert:`
      precision highp float;
      attribute vec2 uv;
      varying vec2 xy;
      uniform mat3 view;
      void main () {
        xy = (view * vec3(uv, 1)).xy;
        gl_Position = vec4(uv, 0, 1);
      }`,attributes:{uv:[-4,-4,4,-4,0,4]},count:3,depth:{enable:!1}})}}),inputs:[],outputs:["createBlitCmd"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-340"),expanded:[],variables:[]},{id:340,body:(e,t)=>{function a(n){const i=e();return n({uniforms:{view:n.context("view")},context:{view:(o,d)=>{var l=o.framebufferWidth/o.framebufferHeight,f=!d||d.scale===void 0?2:d.scale;return t(i,-1/(f*l),1/(f*l),-1/f,1/f)}}})}return{createConfigureViewCmd:a}},inputs:["mat3create","mat3ortho"],outputs:["createConfigureViewCmd"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-381"),expanded:[],variables:[]},{id:381,body:e=>({createAttachMouseCmd:function(a,n){const i=a._gl.canvas;let o=!0;const d=[i.clientWidth/2,i.clientHeight/2],l=[0,0,1],f=new Float32Array([0,0]);function c(s){d[0]=s.offsetX,d[1]=s.offsetY,o=!0}const p=a({context:{dirty:()=>o,mouse:s=>{const g=2*s.pixelRatio;return l[0]=-1+g*(d[0]/s.viewportWidth),l[1]=1-g*(d[1]/s.viewportHeight),l[2]=1,e(l,s.view,l),f[0]=l[0],f[1]=l[1],f}},uniforms:{mouse:a.context("mouse")}});i.addEventListener("mousemove",c),n.then(()=>{i.removeEventListener("mousemove",c)});const r=function(g){p(g),o=!1};return r.taint=function(){o=!0},r.reset=function(){d[0]=i.clientWidth/2,d[1]=i.clientHeight/2},r}}),inputs:["mat3multiply"],outputs:["createAttachMouseCmd"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-255"),expanded:[],variables:[]},{id:255,body:e=>{const t={width:Math.min(640,e),height:Math.floor(Math.min(640,e)*.6),pixelRatio:devicePixelRatio},a={width:e,height:Math.max(300,Math.floor(e*.6)),pixelRatio:devicePixelRatio};return{smallCanvas:t,largeCanvas:a}},inputs:["width"],outputs:["smallCanvas","largeCanvas"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-2728"),expanded:[],variables:[]},{id:2728,body:()=>{function e(n,i,o){return Math.max(0,Math.min(1,(o-n)/(i-n)))}return{linearstep:e,linearStepGLSL:`
float linearstep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}`,gammaCorrectGLSL:`
vec3 gammaCorrect(vec3 color) {
  // Quick approximate gamma correction
  return pow(color, vec3(0.454));
}`}},inputs:[],outputs:["linearstep","linearStepGLSL","gammaCorrectGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-92"),expanded:[],variables:[]},{id:92,body:async(e,t)=>{const[{default:a},{rangeSlider:n},{glslComplex:i},{mat3invert:o,mat3multiply:d,mat3create:l,mat3ortho:f}]=await Promise.all([b(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(c=>{if(!("default"in c))throw new SyntaxError("export 'default' not found");return c}),b(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(c=>{const p={},r=e.module(c.default),s=e.module();if(!r.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return s.variable(p.rangeSlider=t()).import("rangeSlider",r),p}),b(()=>import("https://api.observablehq.com/@rreusser/glsl-complex.js?v=4"),[]).then(c=>{const p={},r=e.module(c.default),s=e.module();if(!r.defines("glslComplex"))throw new SyntaxError("export 'glslComplex' not found");return s.variable(p.glslComplex=t()).import("glslComplex",r),p}),b(()=>import("https://api.observablehq.com/@rreusser/gl-mat3.js?v=4"),[]).then(c=>{const p={},r=e.module(c.default),s=e.module();if(!r.defines("mat3invert"))throw new SyntaxError("export 'mat3invert' not found");if(s.variable(p.mat3invert=t()).import("mat3invert",r),!r.defines("mat3multiply"))throw new SyntaxError("export 'mat3multiply' not found");if(s.variable(p.mat3multiply=t()).import("mat3multiply",r),!r.defines("mat3create"))throw new SyntaxError("export 'mat3create' not found");if(s.variable(p.mat3create=t()).import("mat3create",r),!r.defines("mat3ortho"))throw new SyntaxError("export 'mat3ortho' not found");return s.variable(p.mat3ortho=t()).import("mat3ortho",r),p})]);return{createREGL:a,rangeSlider:n,glslComplex:i,mat3invert:o,mat3multiply:d,mat3create:l,mat3ortho:f}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["createREGL","rangeSlider","glslComplex","mat3invert","mat3multiply","mat3create","mat3ortho"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-3593"),expanded:[],variables:[]},{id:3593,body:e=>{function t(a,{language:n="glsl"}={}){const i=e`\`\`\`${n}\n${a}\n\`\`\``;return i.value=a,i.style.fontSize="0.9em",i}return{code:t}},inputs:["md"],outputs:["code"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
