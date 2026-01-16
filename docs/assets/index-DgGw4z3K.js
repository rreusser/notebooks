import{d,_ as b}from"./index-ByB2dbry.js";d({root:document.getElementById("cell-2819"),expanded:[],variables:[]},{id:2819,body:async function(t,e,a,n){return t`<figure>
<div style="display: flex; gap: 2%; justify-content: center;">
  <img src="${await e(new URL("/notebooks/assets/old-CLf2rk4C.jpg",import.meta.url).href).url()}" style="width: 48%; height: auto;">
  <img src="${await e(new URL("/notebooks/assets/new-BqwmRspw.jpg",import.meta.url).href).url()}" style="width: 48%; height: auto;">
</div>
<figcaption>${a`A comparison of a Möbius transformation, ${n`f(z) = \frac{(z-a)(b-m)}{(z-b)(a-m)}`} with ${n`a = -\frac{3}{2} + \frac{i}{2}`}, ${n`b = \frac{3}{2} - \frac{i}{2}`}, and ${n`m = 0`}, using my [older method for domain coloring](https://github.com/rreusser/glsl-domain-coloring) (*left*) and [the techniques from this notebook](https://observablehq.com/@rreusser/complex-function-plotter) (*right*).`}</figcaption>
</figure>`},inputs:["html","FileAttachment","md","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-3497"),expanded:[],variables:[]},{id:3497,body:(t,e)=>({complexSampleFunctionGLSL:t(e(`vec2 complexSampleFunction (vec2 z, vec2 zMouse) {
  return cmul(
    cdiv(z - vec2(1, 0), z + vec2(1, 0)),
    z - zMouse
  );
}`))}),inputs:["view","code"],outputs:["complexSampleFunctionGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2288"),expanded:[],variables:[]},{id:2288,body:(t,e)=>({logStripesGLSL:t(e(`float logStripesColormap (float f, float spacing) {
  return 2.0 * (0.5 - abs(fract(log2(abs(f)) / spacing) - 0.5));
}`))}),inputs:["view","code"],outputs:["logStripesGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2598"),expanded:[],variables:[]},{id:2598,body:(t,e,a,n)=>({regl0:t(function(){const o=e(a),u=n`
    <figure>
      ${o}
      <figcaption>Our starting point: the log of the magnitude of a function, plotted with a triangle-wave color map. Adjust the threshold below and observe non-uniform lines that result.</figcaption>
    </figure>`;return u.value=o.value,u}())}),inputs:["view","createREGLContext","smallCanvas","html"],outputs:["regl0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-3022"),expanded:[],variables:[]},{id:3022,body:function(e){return e({min:0,max:1,value:[0,1],description:"Colorscale threshold"})},inputs:["rangeSlider"],outputs:void 0,output:"viewof$gradientThreshold",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});d({root:document.getElementById("cell-3625"),expanded:[],variables:[]},{id:3625,body:(t,e,a,n)=>({drawLoop0:function(){t.configureMouse.taint();const o=e.frame(()=>{t.configureView(()=>{t.configureBlit(()=>{t.configureMouse(u=>{u.dirty&&t.drawField({contourSpacing:1,gradientThreshold:a})})})})});n.then(()=>o.cancel())}()}),inputs:["drawCmds0","regl0","gradientThreshold","invalidation"],outputs:["drawLoop0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2601"),expanded:[],variables:[]},{id:2601,body:(t,e,a,n,i,o,u,l,c)=>({drawCmds0:{configureBlit:t(e),configureView:a(e),configureMouse:n(e,i),drawField:e({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float contourSpacing;
      uniform vec2 mouse;
      uniform vec2 threshold;
      varying vec2 xy;

      ${o}
      ${u}
      ${l}
      ${c}

      // Equivalent to smoothstep, but with a hard edge
      float hardstep (float edge0, float edge1, float x) {
        return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      }

      void main () {
        vec2 f = complexSampleFunction(xy, mouse);
        float contours = logStripesColormap(cabs(f), contourSpacing);
        contours = hardstep(threshold.x, threshold.y, contours);
        gl_FragColor = vec4(gammaCorrect(vec3(contours)), 1);
      }`,uniforms:{contourSpacing:e.prop("contourSpacing"),threshold:e.prop("gradientThreshold")}})}}),inputs:["createBlitCmd","regl0","createConfigureViewCmd","createAttachMouseCmd","invalidation","glslComplex","gammaCorrectGLSL","complexSampleFunctionGLSL","logStripesGLSL"],outputs:["drawCmds0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2940"),expanded:[],variables:[]},{id:2940,body:async(t,e,a)=>t`<figure style="text-align:center">
<img src="${await e(new URL("/notebooks/assets/fragments-CQSjwBqD.jpg",import.meta.url).href).url()}" style="max-width:300px;margin:auto">
<figcaption>${a`A block of four adjacent fragments (pixels), from which GPU shaders may request screen-space derivatives.`}</figcaption>
</figure>`,inputs:["html","FileAttachment","md"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3596"),expanded:[],variables:[]},{id:3596,body:(t,e)=>t`GPUs evaluate fragments in ${e`2 \times 2`} blocks and offer horizontal and vertical differences between fragments as built-in functions. These differences are equivalent to first order [finite difference](https://en.wikipedia.org/wiki/Finite_difference) approximations of the derivative with units of *units per pixel*. Horizontal derivatives within a block are defined as
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3597"),expanded:[],variables:[]},{id:3597,body:(t,e)=>t`${e.block`
\begin{aligned}
& \left.\frac{\partial f}{\partial i}\right|_{i, j} = \left.\frac{\partial f}{\partial i}\right|_{i + 1, j} \approx f_{i + 1, j} - f_{i, j} \\

& \left.\frac{\partial f}{\partial i}\right|_{i, j + 1} = \left.\frac{\partial f}{\partial i}\right|_{i + 1, j + 1} \approx f_{i + 1, j + 1} - f_{i, j + 1}
\end{aligned}
`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3599"),expanded:[],variables:[]},{id:3599,body:(t,e)=>t`where ${e`i`} and ${e`j`} are pixel coordinates. Vertical derivatives are defined similarly. The screen-space gradient magnitude is then the sum of the squares of the ${e`i-`} and ${e`j-`}derivatives.
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3600"),expanded:[],variables:[]},{id:3600,body:(t,e)=>t`${e.block`\left| \nabla f \right| = \sqrt{ \left(\frac{\partial f}{\partial i}\right)^2 +  \left(\frac{\partial f}{\partial j}\right)^2}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3602"),expanded:[],variables:[]},{id:3602,body:(t,e)=>t`${e.block`\frac{(\mathrm{units})}{(\frac{\mathrm{units}}{\mathrm{pixel}})} = \mathrm{pixels}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(t,e)=>t`The function \`fwidth\` is often used as a square-root-free proxy for the gradient magnitude but results in about a 40% anisotropy in diagonal directions (i.e. ${e`\sqrt{2}`}), so that \`length(vec2(dFdx(f), dFdy(f)))\` is preferable for the best quality.
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-220"),expanded:[],variables:[]},{id:220,body:(t,e)=>({logContoursGLSL:t(e(`float logContours (float f, float spacing, float width, float antialiasWidth) {
  float plotVar = log2(abs(f)) * spacing;
  float screenSpaceGradient = hypot(vec2(dFdx(f), dFdy(f))) / abs(f) * spacing;
  return linearstep(
    width + 0.5 * antialiasWidth,
    width - 0.5 * antialiasWidth,
    (0.5 - abs(fract(plotVar) - 0.5)) / screenSpaceGradient
  );
}`))}),inputs:["view","code"],outputs:["logContoursGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-3654"),expanded:[],variables:[]},{id:3654,body:(t,e,a,n,i,o,u)=>{const f=Array.from({length:401},(s,y)=>y/400*60),v=s=>.002*(20*s+.5*s*s),p=s=>.002*(20+s),r=f.map(s=>v(s)*t%1),g=f.map(s=>(.5-Math.abs(v(s)*t%1-.5))/p(s)/t),m=g.map(s=>Math.min(e,s)),h=f.map(s=>a(1+.5*Math.max(1e-4,n)/e,1-.5*Math.max(1e-4,n)/e,(.5-Math.abs(v(s)*t%1-.5))/p(s)/(e*t)));return i(o.plot({width:u.width,height:120,x:{domain:[0,60]},y:{domain:[-.1,1.1]},marginTop:10,marginBottom:40,marks:[o.ruleY([.5],{stroke:"black"}),o.line(f.map((s,y)=>({x:s,y:r[y]})),{x:"x",y:"y",stroke:"#27c"})]})),i(o.plot({width:u.width,height:120,x:{domain:[0,60]},y:{domain:[0,5]},marginTop:10,marginBottom:30,marks:[o.line(f.map((s,y)=>({x:s,y:g[y]})),{x:"x",y:"y",stroke:"#27c"}),o.ruleY([e],{stroke:"black"}),o.ruleY([e-.5*n,e+.5*n],{stroke:"#bbb",strokeDasharray:"4,4"})]})),i(o.plot({width:u.width,height:120,x:{domain:[0,60]},y:{domain:[-.1,1.1]},marginTop:20,marginBottom:30,marks:[o.areaY(f.map((s,y)=>({x:s,y:h[y]})),{x:"x",y:"y",fill:"#27c",fillOpacity:.25}),o.line(f.map((s,y)=>({x:s,y:h[y]})),{x:"x",y:"y",stroke:"#27c"})]})),{n:401,xmax:60,x:f,f:v,dFdx:p,phase:r,triangle:g,clippedTriangle:m,smooth:h}},inputs:["contourSpacing","lineWidth","linearstep","lineFeather","display","Plot","smallCanvas"],outputs:["n","xmax","x","f","dFdx","phase","triangle","clippedTriangle","smooth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-508"),expanded:[],variables:[]},{id:508,body:(t,e)=>{const a=t(e.range([.5,10],{step:.01,value:1,label:"Contour spacing"})),n=t(e.range([.5,3],{step:.1,value:1,label:"Line width"})),i=t(e.range([0,2],{step:.1,value:1,label:"Antialiasing width"}));return{contourSpacing:a,lineWidth:n,lineFeather:i}},inputs:["view","Inputs"],outputs:["contourSpacing","lineWidth","lineFeather"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-98"),expanded:[],variables:[]},{id:98,body:(t,e,a,n)=>({regl1:t(function(){const o=e(a),u=n`
    <figure>
      ${o}
      <figcaption>Contours of the log-magnitude of a sample function computed in a WebGL fragment shader with the screen-space derivatives technique.</figcaption>
    </figure>`;return u.value=o.value,u}())}),inputs:["view","createREGLContext","smallCanvas","html"],outputs:["regl1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-121"),expanded:[],variables:[]},{id:121,body:(t,e,a,n,i,o)=>({drawLoop1:function(){t.configureMouse.taint();const l=e.frame(()=>{t.configureView(()=>{t.configureBlit(()=>{t.configureMouse(c=>{c.dirty&&t.drawField({lineWidth:a,lineFeather:n,contourSpacing:i})})})})});o.then(()=>l.cancel())}()}),inputs:["drawCmds1","regl1","lineWidth","lineFeather","contourSpacing","invalidation"],outputs:["drawLoop1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-358"),expanded:[],variables:[]},{id:358,body:(t,e,a,n,i,o,u,l,c,f)=>({drawCmds1:{configureBlit:t(e),configureView:a(e),configureMouse:n(e,i),drawField:e({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float lineWidth, lineFeather, contourSpacing;
      uniform vec2 mouse;
      varying vec2 xy;

      ${o}
      ${u}
      ${l}
      ${c}
      ${f}

      void main () {
        vec2 f = complexSampleFunction(xy, mouse);

        float contours = logContours(cabs(f), contourSpacing, lineWidth, lineFeather);

        // Awhite background with black contours
        gl_FragColor = vec4(gammaCorrect(vec3(1.0 - contours)), 1);
      }`,uniforms:{contourSpacing:e.prop("contourSpacing"),lineWidth:(p,r)=>p.pixelRatio*r.lineWidth,lineFeather:(p,r)=>Math.max(1e-4,p.pixelRatio*r.lineFeather)}})}}),inputs:["createBlitCmd","regl1","createConfigureViewCmd","createAttachMouseCmd","invalidation","linearStepGLSL","glslComplex","gammaCorrectGLSL","logContoursGLSL","complexSampleFunctionGLSL"],outputs:["drawCmds1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-3629"),expanded:[],variables:[]},{id:3629,body:(t,e)=>t`The approach is to partition the plane into regions we'll call *octaves*, where each octave draws contours at a different spacing. Within each octave, we draw ${e`D`} evenly spaced contours. When the contours in one octave get too close together, we switch to the next octave and draw ${e`D`} times fewer contours.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3631"),expanded:[],variables:[]},{id:3631,body:(t,e)=>t`${e.block`
N_{\mathrm{octave}} = \left \lceil \log_{D}{\left( m \frac{\left|\nabla f\right|}{|f|} \right)} \right \rceil
`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3633"),expanded:[],variables:[]},{id:3633,body:(t,e)=>t`where ${e`N_{\mathrm{octave}}`} is an integer indicating which octave a given region belongs to, ${e`D`} is the number of divisions per octave, and ${e`m`} is the minimum spacing, in pixels, between divisions.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3658"),expanded:[],variables:[]},{id:3658,body:(t,e)=>t`Why ${e`|\nabla f| / |f|`} and not just ${e`|\nabla f|`}? The answer is that we want to place contours at evenly spaced values of ${e`\log|f|`}, not ${e`|f|`} itself. Logarithmic spacing places more contours near zeros and poles, which helps reveal the structure of the function. Since we're effectively plotting ${e`\log|f|`}, we need the gradient of ${e`\log|f|.`} By the [logarithmic derivative](https://en.wikipedia.org/wiki/Logarithmic_derivative),`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3637"),expanded:[],variables:[]},{id:3637,body:(t,e)=>t`${e.block`
\left|\nabla \ln{f}\right| = \frac{|\nabla f|}{|f|}.
`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3659"),expanded:[],variables:[]},{id:3659,body:(t,e)=>t`This is convenient because it means we don't have to compute the logarithm to get its gradient. We just divide the gradient of ${e`f`} by ${e`|f|`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3634"),expanded:[],variables:[]},{id:3634,body:(t,e)=>t`Once we've determined the octave, we compute the contour spacing ${e`\delta`} as`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-3635"),expanded:[],variables:[]},{id:3635,body:(t,e)=>t`${e.block`
\delta = D^{N_{\mathrm{octave}}}.
`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-938"),expanded:[],variables:[]},{id:938,body:(t,e,a)=>({locallyScaledLogContoursGLSL:t(e(`float locallyScaledLogContours (float f,
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
}`))}),inputs:["view","code","scalingType2"],outputs:["locallyScaledLogContoursGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-3478"),expanded:[],variables:[]},{id:3478,body:(t,e)=>{const a=t(e.range([2,40],{step:1,value:15,label:"Minimum contour spacing, in pixels"})),n=t(e.range([2,8],{step:1,value:2,label:"Divisions per octave"})),i=t(e.radio(["Logarithmic","Linear"],{value:"Logarithmic"})),o=t(e.checkbox(["Visualize octave with color"],{value:["Visualize octave with color"]}));return{baselineSpacing:a,octaveDivisions:n,scalingType2:i,debugColor:o}},inputs:["view","Inputs"],outputs:["baselineSpacing","octaveDivisions","scalingType2","debugColor"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-927"),expanded:[],variables:[]},{id:927,body:(t,e,a,n)=>({regl2:t(function(){const o=e(a),u=n`
    <figure>
      ${o}
      <figcaption>Log-distributed contours with spacing scaled by the local relative gradient of the function.</figcaption>
    </figure>`;return u.value=o.value,u}())}),inputs:["view","createREGLContext","largeCanvas","html"],outputs:["regl2"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-932"),expanded:[],variables:[]},{id:932,body:(t,e,a,n,i,o,u)=>({drawLoop2:function(){t.configureMouse.taint();const c=e.frame(()=>{t.configureView(()=>{t.configureBlit(()=>{t.configureMouse(f=>{f.dirty&&t.drawField({lineWidth:1.5,lineFeather:1.5,contourSpacing:a,octaveDivisions:n,baselineSpacing:i,debugColor:o.includes("Visualize octave with color")})})})})});u.then(()=>c.cancel())}()}),inputs:["drawCmds2","regl2","contourSpacing","octaveDivisions","baselineSpacing","debugColor","invalidation"],outputs:["drawLoop2"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-929"),expanded:[],variables:[]},{id:929,body:(t,e,a,n,i,o,u,l,c,f,v)=>({drawCmds2:{configureBlit:t(e),configureView:a(e),configureMouse:n(e,i),drawField:e({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float lineWidth, lineFeather, octaveDivisions, baselineSpacing;
      uniform bool debugColor;
      uniform vec2 mouse;
      varying vec2 xy;

      ${o}
      ${u}
      ${l}
      ${c}
      ${f}

      vec3 randomColor (float x) {
        return 0.5 + 0.5 * vec3(cos(x), cos(x - PI * 2.0 / 3.0), cos(x - PI * 4.0 / 3.0));
      }

      vec3 octaveColor (float f, float minSpacing, float divisions) {
        float screenSpaceGrad = hypot(vec2(dFdx(f), dFdy(f)))${v==="Linear"?"":" / abs(f)"};
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
      }`,uniforms:{debugColor:(r,g)=>!!g.debugColor,octaveDivisions:e.prop("octaveDivisions"),baselineSpacing:(r,g)=>g.baselineSpacing*r.pixelRatio,lineWidth:(r,g)=>r.pixelRatio*g.lineWidth,lineFeather:(r,g)=>Math.max(1e-4,r.pixelRatio*g.lineFeather)}})}}),inputs:["createBlitCmd","regl2","createConfigureViewCmd","createAttachMouseCmd","invalidation","linearStepGLSL","glslComplex","gammaCorrectGLSL","complexSampleFunctionGLSL","locallyScaledLogContoursGLSL","scalingType2"],outputs:["drawCmds2"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1035"),expanded:[],variables:[]},{id:1035,body:function(e){return e`## Blending over octaves

We've made progress, except we have sharp transitions between successive contour spacings. The final major trick is to blend these contours over a number of octaves, starting at the finest spacing relative to pixels and increasing the size until contours would cover the entire image, at which point further octaves have no use.

This approach is not unlike a [Shepard tone](https://en.wikipedia.org/wiki/Shepard_tone), which appears to increase infinitely, fading out tones as they leave the upper end of the auditory range and replacing them with new tones at the bottom end of the auditory range. Similarly, we fade out contours as they leave the desirable range, becoming either too densely spaced or too spread out.`},inputs:["md"],outputs:void 0,output:"blending",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-1049"),expanded:[],variables:[]},{id:1049,body:(t,e,a,n)=>({blendedOctavesGLSL:t(e(`float blendedContours (float f, float minSpacing, float width, float antialiasing) {
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
}`))}),inputs:["view","code","octaveCount","scalingType3"],outputs:["blendedOctavesGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1164"),expanded:[],variables:[]},{id:1164,body:(t,e)=>{const a=t(e.range([1,5],{step:.1,value:2,label:"Minimum contour spacing, in pixels"})),n=t(e.range([2,8],{step:1,value:6,label:"Divisons per octave"})),i=t(e.range([1,8],{step:1,value:4,label:"Octaves"})),o=t(e.radio(["Logarithmic","Linear"],{value:"Logarithmic"}));return{baselineSpacing2:a,octaveDivisions2:n,octaveCount:i,scalingType3:o}},inputs:["view","Inputs"],outputs:["baselineSpacing2","octaveDivisions2","octaveCount","scalingType3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1038"),expanded:[],variables:[]},{id:1038,body:(t,e,a,n)=>({regl3:t(function(){const o=e(a),u=n`
    <figure>
      ${o}
      <figcaption>Locally-scaled contours, blended across multiple octaves.</figcaption>
    </figure>`;return u.value=o.value,u}())}),inputs:["view","createREGLContext","largeCanvas","html"],outputs:["regl3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1043"),expanded:[],variables:[]},{id:1043,body:(t,e,a,n,i,o)=>({drawLoop3:function(){t.configureMouse.taint();const l=e.frame(()=>{t.configureView(()=>{t.configureBlit(()=>{t.configureMouse(c=>{c.dirty&&t.drawField({lineWidth:1.5,lineFeather:1.5,contourSpacing:a,octaveDivisions:n,baselineSpacing:i})})})})});o.then(()=>l.cancel())}()}),inputs:["drawCmds3","regl3","contourSpacing","octaveDivisions2","baselineSpacing2","invalidation"],outputs:["drawLoop3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1046"),expanded:[],variables:[]},{id:1046,body:(t,e,a,n,i,o,u,l,c,f)=>({drawCmds3:{configureBlit:t(e),configureView:a(e),configureMouse:n(e,i),drawField:e({frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;
      uniform float lineWidth, lineFeather, octaveDivisions, baselineSpacing;
      uniform vec2 mouse;
      varying vec2 xy;

      ${o}
      ${u}
      ${l}
      ${c}
      ${f}

      void main () {
        vec2 f = complexSampleFunction(xy, mouse);

        gl_FragColor = vec4(
          gammaCorrect(
            vec3(1.0 - 1.5 * blendedContours(hypot(f), baselineSpacing, lineWidth, lineFeather))
          ), 1);
      }`,uniforms:{octaveDivisions:e.prop("octaveDivisions"),baselineSpacing:(p,r)=>r.baselineSpacing*p.pixelRatio,lineWidth:(p,r)=>p.pixelRatio*r.lineWidth,lineFeather:(p,r)=>Math.max(1e-4,p.pixelRatio*r.lineFeather)}})}}),inputs:["createBlitCmd","regl3","createConfigureViewCmd","createAttachMouseCmd","invalidation","linearStepGLSL","glslComplex","gammaCorrectGLSL","complexSampleFunctionGLSL","blendedOctavesGLSL"],outputs:["drawCmds3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2634"),expanded:[],variables:[]},{id:2634,body:function(t){return t`<div style="padding-top: 5em"></div>`},inputs:["html"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-1208"),expanded:[],variables:[]},{id:1208,body:function(e){return e`## Shaded contouring

We've so far spent all of our time on line contours. Next, we repurpose the exact same concepts for shaded regions.

Since shading fills entire regions, it may at first appear that our screen-space trick for relating function values to pixel widths has no place here. However, if we smoothly shade regions from a value of zero to one with a sharp jump back to zero, we'll encounter aliasing at the threshold.

To antialias, we use the above screen-space derivative trick to produce a function that goes smoothly from zero to one then back to zero *over a given number of pixels*.`},inputs:["md"],outputs:void 0,output:"shading",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-3652"),expanded:[],variables:[]},{id:3652,body:(t,e,a,n)=>{const o=[{x:0,y:0},{x:30,y:1}],u=[{x:0,y:30/t},{x:30,y:0}],l=[{x:0,y:0},{x:30-t+t/30,y:1-t/30},{x:30,y:0}];return e(a.plot({width:n.width,height:300,y:{domain:[0,1.5]},marginTop:20,marginRight:20,marginBottom:40,marginLeft:40,marks:[a.areaY(l,{x:"x",y:"y",fill:"#27c",fillOpacity:.25}),a.line(o,{x:"x",y:"y",stroke:"#27c"}),a.dot(o,{x:"x",y:"y",fill:"#27c",r:3}),a.line(u,{x:"x",y:"y",stroke:"#27c",strokeDasharray:"4,4"})]})),{xmax:30,baseLine:o,dashedLine:u,areaShape:l}},inputs:["antialiasing4","display","Plot","smallCanvas"],outputs:["xmax","baseLine","dashedLine","areaShape"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2386"),expanded:[],variables:[]},{id:2386,body:function(e){return e.range([0,2],{step:.1,value:1,label:"Antialiasing width"})},inputs:["Inputs"],outputs:void 0,output:"viewof$antialiasing4",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});d({root:document.getElementById("cell-2502"),expanded:[],variables:[]},{id:2502,body:function(t){return t`Of course we may not want our coloring to go *linearly* from zero to one. In the style of [unsharp masking](https://en.wikipedia.org/wiki/Unsharp_masking), we can distribute the slope toward the edges of the ramp to increase the perceived contrast. The plot below shows a simple single-parameter contrast ramp layered over multiple octaves.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-2508"),expanded:[],variables:[]},{id:2508,body:(t,e)=>({contrastFunctionGLSL:t(e(`float contrastFunction(float x, float power) {
  x = 2.0 * x - 1.0;
  return 0.5 + 0.5 * pow(abs(x), power) * sign(x);
}`))}),inputs:["view","code"],outputs:["contrastFunctionGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-3649"),expanded:[],variables:[]},{id:3649,body:(t,e,a,n,i,o)=>{const c=Array.from({length:801},(r,g)=>g/800);function f(r,g){return r=2*r-1,.5+.5*Math.pow(Math.abs(r),g)*Math.sign(r)}function v(r){let g=1,m=0;for(let h=0;h<t;h++)m+=f(r*g%1,e),g*=a;return m/t}const p=c.map(r=>({x:r,y:v(r)}));return n(i.plot({width:o.width,height:300,y:{domain:[0,1]},marginTop:20,marginRight:20,marginBottom:40,marginLeft:40,marks:[i.areaY(p,{x:"x",y:"y",fill:"#27c",fillOpacity:.25}),i.line(p,{x:"x",y:"y",stroke:"#27c",strokeWidth:1})]})),{n:801,xmax:1,x:c,ramp:f,f:v,data:p}},inputs:["octaveCount4","rampPower4","octaveDivisions4","display","Plot","smallCanvas"],outputs:["n","xmax","x","ramp","f","data"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2498"),expanded:[],variables:[]},{id:2498,body:(t,e)=>{const a=t(e.range([1,4],{step:.01,value:2,label:"Contrast ramp power"})),n=t(e.range([1,8],{step:1,value:4,label:"Octaves"})),i=t(e.range([2,8],{step:1,value:5,label:"Divisons per octave"})),o=t(e.range([1,5],{step:.1,value:1,label:"Minimum contour spacing, in pixels"})),u=t(e.range([0,2],{step:.1,value:1,label:"Antialiasing width"}));return{rampPower4:a,octaveCount4:n,octaveDivisions4:i,contourSpacing4:o,antialiasing5:u}},inputs:["shadedCtrl","Inputs"],outputs:["rampPower4","octaveCount4","octaveDivisions4","contourSpacing4","antialiasing5"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2499"),expanded:[],variables:[]},{id:2499,body:(t,e,a,n,i,o,u)=>{t.rampPower=e,t.octaveCount=a,t.octaveDivisions=n,t.contourSpacing=i,t.antialiasing=o,u.dirty=!0},inputs:["shadedParams","rampPower4","octaveCount4","octaveDivisions4","contourSpacing4","antialiasing5","shadedRegl"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2329"),expanded:[],variables:[]},{id:2329,body:(t,e,a)=>{const n=t`<div class="plot-controls"></div>`;function i(u){return n.appendChild(u),e.input(u)}const o={rampPower:2,octaveCount:4,octaveDivisions:5,contourSpacing:1,antialiasing:1};return a(n),{shadedControlsContainer:n,shadedCtrl:i,shadedParams:o}},inputs:["html","Generators","display"],outputs:["shadedControlsContainer","shadedCtrl","shadedParams"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2330"),expanded:[],variables:[]},{id:2330,body:(t,e,a,n)=>{const i=t({layers:[{id:"regl",element:e(a,{extensions:["OES_standard_derivatives"],attributes:{depthStencil:!1,preserveDrawingBuffer:!0}})},{id:"svg",element:({current:u,width:l,height:c})=>(u?n.select(u):n.create("svg")).attr("width",l).attr("height",c).node()}]});i.elements.regl.id="shaded-contours-canvas";const o=i.elements.regl.value;return o.dirty=!0,{shadedStack:i,shadedRegl:o}},inputs:["createElementStack","reglElement","createREGL","d3"],outputs:["shadedStack","shadedRegl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2331"),expanded:[],variables:[]},{id:2331,body:(t,e,a,n)=>({shadedAxes:t({d3:e,element:a.elements.svg,xScale:e.scaleLinear().domain([-2,2]).range([0,100]),yScale:e.scaleLinear().domain([-2,2]).range([100,0]),aspectRatio:1,scaleExtent:[.001,1e3],onChange:()=>{n.dirty=!0}})}),inputs:["createZoomableAxes","d3","shadedStack","shadedRegl"],outputs:["shadedAxes"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-3343"),expanded:[],variables:[]},{id:3343,body:(t,e,a,n,i,o,u,l)=>{const c=t`<figure>
  ${e.element}
  <figcaption>The line contouring code, repurposed for shading. Use mouse wheel to zoom, drag to pan. Hover to adjust the solution.</figcaption>
</figure>`;return a(n(c,{width:i.width,height:i.height,toggleOffset:[-6,-33],controls:".plot-controls:last-of-type",onResize(f,v,p){e.resize(v,p),o.updateScales(u.scaleLinear().domain(o.xDomain).range([0,v]),u.scaleLinear().domain(o.yDomain).range([p,0])),l.dirty=!0}})),{shadedFigure:c}},inputs:["html","shadedStack","display","expandable","largeCanvas","shadedAxes","d3","shadedRegl"],outputs:["shadedFigure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2325"),expanded:[],variables:[]},{id:2325,body:(t,e,a)=>({shadedOctavesGLSL:t(e(`float shadedContours (float f, float minSpacing, float antialiasWidth, float rampPower) {
  // Compile-time constants
  const int octaves = ${a};
  const float fOctaves = ${a.toFixed(1)};

  float screenSpaceGrad = hypot(vec2(dFdx(f), dFdy(f))) / abs(f);

  float localOctave = log2(screenSpaceGrad * minSpacing) / log2(octaveDivisions);
  float contourSpacing = pow(octaveDivisions, ceil(localOctave));

  float plotVar = log2(abs(f)) / contourSpacing;
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
}`))}),inputs:["view","code","octaveCount4"],outputs:["shadedOctavesGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2332"),expanded:[],variables:[]},{id:2332,body:(t,e,a)=>({shadedDrawLoop:function(){const i=t.frame(()=>{try{if(!t.dirty)return;e(),t.dirty=!1}catch{i?.cancel()}});a.then(()=>i?.cancel())}()}),inputs:["shadedRegl","drawShadedField","invalidation"],outputs:["shadedDrawLoop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2334"),expanded:[],variables:[]},{id:2334,body:(t,e,a,n,i,o,u,l,c,f,v)=>{const p={xy:new Float32Array([0,0]),dirty:!0};(function(){const m=t.elements.svg;function h(s){const y=m.getBoundingClientRect(),x=s.clientX-y.left,w=s.clientY-y.top;p.xy[0]=e.xScale.invert(x),p.xy[1]=e.yScale.invert(w),p.dirty=!0,a.dirty=!0}m.addEventListener("mousemove",h),n.then(()=>m.removeEventListener("mousemove",h))})();const r=a({vert:`
    precision highp float;
    attribute vec2 uv;
    varying vec2 xy;
    uniform mat4 viewInverse;
    void main () {
      xy = (viewInverse * vec4(uv, 0, 1)).xy;
      gl_Position = vec4(uv, 0, 1);
    }`,frag:`
    #extension GL_OES_standard_derivatives : enable
    precision highp float;
    uniform float antialiasWidth, octaveDivisions, baselineSpacing, rampPower;
    uniform vec2 mouse;
    varying vec2 xy;

    ${i}
    ${o}
    ${u}
    ${l}
    ${c}

    void main () {
      vec2 f = complexSampleFunction(xy, mouse);

      gl_FragColor = vec4(vec3(
        gammaCorrect(vec3(1.0 - shadedContours(hypot(f), baselineSpacing, antialiasWidth, rampPower)))
      ), 1);
    }`,uniforms:{viewInverse:()=>e.viewInverse,mouse:()=>p.xy,octaveDivisions:()=>f.octaveDivisions,rampPower:()=>f.rampPower,baselineSpacing:g=>f.contourSpacing*g.pixelRatio,antialiasWidth:()=>Math.max(1e-4,f.antialiasing)},attributes:{uv:[-4,-4,4,-4,0,4]},depth:{enable:!1},scissor:{enable:!0,box:v(e)},viewport:v(e),count:3});return{shadedMouse:p,drawShadedField:r}},inputs:["shadedStack","shadedAxes","shadedRegl","invalidation","glslComplex","gammaCorrectGLSL","contrastFunctionGLSL","complexSampleFunctionGLSL","shadedOctavesGLSL","shadedParams","reglAxesViewport"],outputs:["shadedMouse","drawShadedField"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2649"),expanded:[],variables:[]},{id:2649,body:function(t){return t`<div style="padding-top: 5em"></div>`},inputs:["html"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-432"),expanded:[],variables:[]},{id:432,body:(t,e)=>{function a(n){function i(l,c,f){const v=t.canvas(Math.floor(l*f),Math.floor(c*f));return v.style.width=`${l}px`,v.style.height=`${c}px`,v}const o=i(n.width,n.height,n.pixelRatio),u=e({pixelRatio:n.pixelRatio,canvas:o,extensions:["OES_standard_derivatives"]});return o.value=u,o}return{createREGLContext:a}},inputs:["DOM","createREGL"],outputs:["createREGLContext"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-410"),expanded:[],variables:[]},{id:410,body:()=>({createBlitCmd:function(e){return e({vert:`
      precision highp float;
      attribute vec2 uv;
      varying vec2 xy;
      uniform mat3 view;
      void main () {
        xy = (view * vec3(uv, 1)).xy;
        gl_Position = vec4(uv, 0, 1);
      }`,attributes:{uv:[-4,-4,4,-4,0,4]},count:3,depth:{enable:!1}})}}),inputs:[],outputs:["createBlitCmd"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-340"),expanded:[],variables:[]},{id:340,body:(t,e)=>{function a(n){const i=t();return n({uniforms:{view:n.context("view")},context:{view:(o,u)=>{var l=o.framebufferWidth/o.framebufferHeight,c=!u||u.scale===void 0?2:u.scale;return e(i,-1/(c*l),1/(c*l),-1/c,1/c)}}})}return{createConfigureViewCmd:a}},inputs:["mat3create","mat3ortho"],outputs:["createConfigureViewCmd"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-381"),expanded:[],variables:[]},{id:381,body:t=>({createAttachMouseCmd:function(a,n){const i=a._gl.canvas;let o=!0;const u=[i.clientWidth/2,i.clientHeight/2],l=[0,0,1],c=new Float32Array([0,0]);function f(r){u[0]=r.offsetX,u[1]=r.offsetY,o=!0}const v=a({context:{dirty:()=>o,mouse:r=>{const g=2*r.pixelRatio;return l[0]=-1+g*(u[0]/r.viewportWidth),l[1]=1-g*(u[1]/r.viewportHeight),l[2]=1,t(l,r.view,l),c[0]=l[0],c[1]=l[1],c}},uniforms:{mouse:a.context("mouse")}});i.addEventListener("mousemove",f),n.then(()=>{i.removeEventListener("mousemove",f)});const p=function(g){v(g),o=!1};return p.taint=function(){o=!0},p.reset=function(){u[0]=i.clientWidth/2,u[1]=i.clientHeight/2},p}}),inputs:["mat3multiply"],outputs:["createAttachMouseCmd"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-255"),expanded:[],variables:[]},{id:255,body:t=>{const e={width:Math.min(640,t),height:Math.floor(Math.min(640,t)*.6),pixelRatio:devicePixelRatio},a={width:t,height:Math.max(300,Math.floor(t*.6)),pixelRatio:devicePixelRatio};return{smallCanvas:e,largeCanvas:a}},inputs:["width"],outputs:["smallCanvas","largeCanvas"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2728"),expanded:[],variables:[]},{id:2728,body:()=>{function t(n,i,o){return Math.max(0,Math.min(1,(o-n)/(i-n)))}return{linearstep:t,linearStepGLSL:`
float linearstep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}`,gammaCorrectGLSL:`
vec3 gammaCorrect(vec3 color) {
  // Quick approximate gamma correction
  return pow(color, vec3(0.454));
}`}},inputs:[],outputs:["linearstep","linearStepGLSL","gammaCorrectGLSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-92"),expanded:[],variables:[]},{id:92,body:async(t,e)=>{const[{default:a},{rangeSlider:n},{glslComplex:i},{mat3invert:o,mat3multiply:u,mat3create:l,mat3ortho:c},{createElementStack:f},{reglElement:v,reglAxesViewport:p},{createZoomableAxes:r},{expandable:g}]=await Promise.all([b(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(m=>{if(!("default"in m))throw new SyntaxError("export 'default' not found");return m}),b(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(m=>{const h={},s=t.module(m.default),y=t.module();if(!s.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return y.variable(h.rangeSlider=e()).import("rangeSlider",s),h}),b(()=>import("https://api.observablehq.com/@rreusser/glsl-complex.js?v=4"),[]).then(m=>{const h={},s=t.module(m.default),y=t.module();if(!s.defines("glslComplex"))throw new SyntaxError("export 'glslComplex' not found");return y.variable(h.glslComplex=e()).import("glslComplex",s),h}),b(()=>import("https://api.observablehq.com/@rreusser/gl-mat3.js?v=4"),[]).then(m=>{const h={},s=t.module(m.default),y=t.module();if(!s.defines("mat3invert"))throw new SyntaxError("export 'mat3invert' not found");if(y.variable(h.mat3invert=e()).import("mat3invert",s),!s.defines("mat3multiply"))throw new SyntaxError("export 'mat3multiply' not found");if(y.variable(h.mat3multiply=e()).import("mat3multiply",s),!s.defines("mat3create"))throw new SyntaxError("export 'mat3create' not found");if(y.variable(h.mat3create=e()).import("mat3create",s),!s.defines("mat3ortho"))throw new SyntaxError("export 'mat3ortho' not found");return y.variable(h.mat3ortho=e()).import("mat3ortho",s),h}),b(()=>import("./element-stack-BU40TvN2.js"),[]).then(m=>{if(!("createElementStack"in m))throw new SyntaxError("export 'createElementStack' not found");return m}),b(()=>import("./regl-canvas-4j8SAjSv.js"),[]).then(m=>{if(!("reglElement"in m))throw new SyntaxError("export 'reglElement' not found");if(!("reglAxesViewport"in m))throw new SyntaxError("export 'reglAxesViewport' not found");return m}),b(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(m=>{if(!("createZoomableAxes"in m))throw new SyntaxError("export 'createZoomableAxes' not found");return m}),b(()=>import("./expandable-BBZIy1N7.js"),[]).then(m=>{if(!("expandable"in m))throw new SyntaxError("export 'expandable' not found");return m})]);return{createREGL:a,rangeSlider:n,glslComplex:i,mat3invert:o,mat3multiply:u,mat3create:l,mat3ortho:c,createElementStack:f,reglElement:v,reglAxesViewport:p,createZoomableAxes:r,expandable:g}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["createREGL","rangeSlider","glslComplex","mat3invert","mat3multiply","mat3create","mat3ortho","createElementStack","reglElement","reglAxesViewport","createZoomableAxes","expandable"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-3593"),expanded:[],variables:[]},{id:3593,body:t=>{function e(a,{language:n="glsl"}={}){const i=t`\`\`\`${n}\n${a}\n\`\`\``;return i.value=a,i.style.fontSize="0.9em",i}return{code:e}},inputs:["md"],outputs:["code"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
