import{d as o,_ as b}from"./index-ByB2dbry.js";o({root:document.getElementById("cell-530"),expanded:[],variables:[]},{id:530,body:async function(t,e){return t`<figure>
<img width="300" src="${await e(new URL("/notebooks/assets/1920px-Double-compound-pendulum-dimensioned.svg-D3Fofwsq.png",import.meta.url).href).url()}">
<figcaption>Source: <a href="https://commons.wikimedia.org/wiki/File:Double-compound-pendulum-dimensioned.svg">Wikimedia commons</a>
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-526"),expanded:[],variables:[]},{id:526,body:t=>t("1392357775666159618"),inputs:["tweet"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-610"),expanded:[],variables:[]},{id:610,body:(t,e,a)=>{t==="half float"&&e(a`<p style="color:#a00">Warning! This simulation is using half-float precision and as a result won't be accurate. Try a device which supports the floating point WebGL textures for better results.</p>`)},inputs:["colorType","display","html"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-571"),expanded:[],variables:[]},{id:571,body:(t,e)=>({pendulumType:t(e.radio(["Simple","Compound"],{label:"Pendulum type",value:"Compound"}))}),inputs:["view","Inputs"],outputs:["pendulumType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-573"),expanded:[],variables:[]},{id:573,body:(t,e)=>({omega0_0:t(e.range([-2,2],{label:"Initial angular velocity of arm 1",value:0}))}),inputs:["view","Inputs"],outputs:["omega0_0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-576"),expanded:[],variables:[]},{id:576,body:(t,e)=>({omega0_1:t(e.range([-2,2],{label:"Initial angular velocity of arm 2",value:0}))}),inputs:["view","Inputs"],outputs:["omega0_1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-313"),expanded:[],variables:[]},{id:313,body:(t,e)=>({dt:t(e.range([.001,.1],{label:"Time step",value:.03,transform:Math.log}))}),inputs:["view","Inputs"],outputs:["dt"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-281"),expanded:[],variables:[]},{id:281,body:(t,e)=>({simulate:t(e.checkbox(["Simulate","Show pendulum at point under mouse"],{value:["Simulate","Show pendulum at point under mouse"]}))}),inputs:["view","Inputs"],outputs:["simulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-300"),expanded:[],variables:[]},{id:300,body:(t,e)=>({restart:t(e.button("Restart"))}),inputs:["view","Inputs"],outputs:["restart"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-289"),expanded:[],variables:[]},{id:289,body:function(e,a){return e`<figure>
<div style="position:relative;">
${a._gl.canvas}
<div id="zoombox" style="display:none"></div>
</div>
<figcaption>Hover to view pendulum at current point. Click and drag to zoom. Double click to return to initial view</figcaption>
</figure>`},inputs:["html","regl"],outputs:void 0,output:"viz",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-814"),expanded:[],variables:[]},{id:814,body:function(t,e,a){return t`${e`\theta_1 \in [${(a.center[0]-a.scale[0]/2).toFixed(8)}, ${(a.center[0]+a.scale[0]/2).toFixed(8)}]`}<br>${e`\theta_2 \in [${(a.center[1]-a.scale[1]/2).toFixed(8)}, ${(a.center[1]+a.scale[1]/2).toFixed(8)}]`}`},inputs:["md","tex","zoomBox"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(t,e)=>({regl:function(){var n=document.createElement("canvas");return t({optionalExtensions:["OES_texture_half_float","OES_texture_float","ANGLE_instanced_arrays"],canvas:n,pixelRatio:e,attributes:{antialias:!0,alpha:!1,depthStencil:!1,preserveDrawingBuffer:!1}})}()}),inputs:["createREGL","pixelRatio"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-47"),expanded:[],variables:[]},{id:47,body:(t,e,a)=>({resizeContext:function(){const i=t._gl.canvas;var d=e,r=e;i.style.width=`${Math.floor(d/a)}px`,i.style.height=`${Math.floor(r/a)}px`,i.width=d,i.height=r}()}),inputs:["regl","radius","pixelRatio"],outputs:["resizeContext"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-158"),expanded:[],variables:[]},{id:158,body:(t,e,a,n,i,d,r,_,p)=>{n.poll(),i[0].use(()=>d(()=>{r({omega0_0:_,omega0_1:p,zoomBox:t,pendulumType:a})}))},inputs:["zoomBox","restart","pendulumType","regl","y","blit","initialize","omega0_0","omega0_1"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:(t,e,a,n,i,d,r,_,p,g,u,s,c)=>{const l=~a.indexOf("Simulate"),h=~a.indexOf("Show pendulum at point under mouse"),v=n==="Compound";let y=!0;const f=i.frame(()=>{d(()=>{l&&r([{dt:_,src:p[0],dst:p[1],isCompound:v},{dt:_,src:p[1],dst:p[0],isCompound:v}]),y&&(g({y:p[0]}),h&&u.active&&!u.boxActive&&s([{y:p,w1:[0,0,0],w2:[0,1,0]},{y:p,w1:[0,1,0],w2:[0,0,1]}])),y=!!l})});return c.then(()=>f.cancel()),{run:l,showPen:h,isCompound:v,needsDraw:y,frame:f}},inputs:["restart","zoomBox","simulate","pendulumType","regl","blit","update","dt","y","drawMap","mouseHover","drawPendulum","invalidation"],outputs:["run","showPen","isCompound","needsDraw","frame"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-78"),expanded:[],variables:[]},{id:78,body:(t,e)=>({colorType:t(e,"float")?"float":t(e,"half float")?"half float":"uint8"}),inputs:["canWriteToFBOOfType","regl"],outputs:["colorType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-58"),expanded:[],variables:[]},{id:58,body:(t,e,a,n)=>({y:function(){const d=[0,1].map(()=>t.framebuffer({colorType:e,radius:a,depth:!1,stencil:!1}));return n.then(()=>d.forEach(r=>r.destroy())),d}()}),inputs:["regl","colorType","radius","invalidation"],outputs:["y"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-113"),expanded:[],variables:[]},{id:113,body:t=>({blit:t({vert:`
    precision mediump float;
    attribute vec2 xy;
    void main () {
      gl_Position = vec4(xy, 0, 1);
    }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{resolution:a=>[a.framebufferWidth,a.framebufferHeight]},count:3,depth:{enable:!1}})}),inputs:["regl"],outputs:["blit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-151"),expanded:[],variables:[]},{id:151,body:t=>({initialize:t({frag:`
    precision highp float;
    uniform sampler2D colorscale;
    uniform vec2 resolution, omega0, center, scale;
    uniform bool isCompound;
    #define PI ${Math.PI}
    void main () {
      // Really just the full spectrum of angles for the two parts of the pendulum,
      // [0, 2pi] x [0, 2pi], with zero velocity, but we center it about 0.5 to
      // slightly improve how well it works with half float precision
      vec2 theta0 = center + (0.5 + scale * ((vec2(0, 1) + vec2(1, -1) * gl_FragCoord.xy / resolution) - 0.5));
      vec2 theta = theta0 * (2.0 * PI) - PI;
      vec2 velocity;

      if (isCompound) {
        // Convert angular velocities to generalized momenta for compound pendulum
        // p_θ₁ = (2/3)ω₁ + (1/2)ω₂cos(θ₁-θ₂)
        // p_θ₂ = (1/3)ω₂ + (1/2)ω₁cos(θ₁-θ₂)
        float cosTheta12 = cos(theta.x - theta.y);
        velocity = vec2(
          (2.0/3.0) * omega0.x + 0.5 * omega0.y * cosTheta12,
          (1.0/3.0) * omega0.y + 0.5 * omega0.x * cosTheta12
        );
      } else {
        // For simple pendulum, use angular velocities directly
        velocity = omega0;
      }

      gl_FragColor = (vec4(theta, velocity) + PI) / (2.0 * PI);
    }`,uniforms:{omega0:(a,n)=>[n.omega0_0,n.omega0_1],center:(a,n)=>n.zoomBox.center.map(i=>i*.5/Math.PI),scale:(a,n)=>[n.zoomBox.scale[0]/(Math.PI*2),n.zoomBox.scale[1]/(Math.PI*2)],isCompound:(a,n)=>n.pendulumType==="Compound"}})}),inputs:["regl"],outputs:["initialize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-176"),expanded:[],variables:[]},{id:176,body:t=>({update:t({frag:`
    precision highp float;
    uniform sampler2D y;
    uniform vec2 resolution;
    uniform float dt;
    uniform bool isCompound;
    #define PI ${Math.PI}

    // Compound double pendulum (distributed mass)
    // State: (θ₁, θ₂, p_θ₁, p_θ₂) where p_θ are generalized momenta
    vec4 derivativeCompound (vec4 state) {
      vec2 theta = state.xy;
      vec2 pTheta = state.zw;
      float threeCosTheta12 = 3.0 * cos(theta.x - theta.y);
      vec2 thetaDot = 6.0 * (
        vec2(
          2.0 * pTheta.x - threeCosTheta12 * pTheta.y,
          8.0 * pTheta.y - threeCosTheta12 * pTheta.x
        ) / (16.0 - threeCosTheta12 * threeCosTheta12)
      );
      float thetaDot12sinTheta12 = thetaDot.x * thetaDot.y * sin(theta.x - theta.y);
      vec2 pThetaDot = -0.5 * vec2(
         thetaDot12sinTheta12 + 3.0 * sin(theta.x),
        -thetaDot12sinTheta12 + sin(theta.y)
      );
      return vec4(thetaDot, pThetaDot);
    }

    // Simple double pendulum (point masses)
    // State: (θ₁, θ₂, ω₁, ω₂) where ω are angular velocities
    // Using equal masses m₁=m₂=1 and equal lengths l₁=l₂=1, g=1
    vec4 derivativeSimple (vec4 state) {
      vec2 theta = state.xy;
      vec2 omega = state.zw;
      float delta = theta.x - theta.y;
      float sinDelta = sin(delta);
      float cosDelta = cos(delta);
      float denom = 3.0 - cos(2.0 * delta);

      // θ̈₁ = (-g(2m₁+m₂)sinθ₁ - m₂g·sin(θ₁-2θ₂) - 2sin(θ₁-θ₂)m₂(ω₂²l₂ + ω₁²l₁cos(θ₁-θ₂))) / (l₁(2m₁+m₂-m₂cos(2θ₁-2θ₂)))
      // With m₁=m₂=1, l₁=l₂=1, g=1:
      float thetaDDot1 = (
        -3.0 * sin(theta.x)
        - sin(theta.x - 2.0 * theta.y)
        - 2.0 * sinDelta * (omega.y * omega.y + omega.x * omega.x * cosDelta)
      ) / denom;

      // θ̈₂ = 2sin(θ₁-θ₂)(ω₁²l₁(m₁+m₂) + g(m₁+m₂)cosθ₁ + ω₂²l₂m₂cos(θ₁-θ₂)) / (l₂(2m₁+m₂-m₂cos(2θ₁-2θ₂)))
      // With m₁=m₂=1, l₁=l₂=1, g=1:
      float thetaDDot2 = (
        2.0 * sinDelta * (
          2.0 * omega.x * omega.x
          + 2.0 * cos(theta.x)
          + omega.y * omega.y * cosDelta
        )
      ) / denom;

      return vec4(omega.x, omega.y, thetaDDot1, thetaDDot2);
    }

    vec4 derivative (vec4 state) {
      if (isCompound) {
        return derivativeCompound(state);
      } else {
        return derivativeSimple(state);
      }
    }

    void main () {
      // Read the state (theta1, theta2, velocity1, velocity2) from the rgba texture
      vec4 yn = texture2D(y, gl_FragCoord.xy / resolution);

      // Convert from [0, 1] to [-PI, PI]:
      yn = yn * (2.0 * PI) - PI;

      // RK4 integration
      vec4 k1 = dt * derivative(yn);
      vec4 k2 = dt * derivative(yn + 0.5 * k1);
      vec4 k3 = dt * derivative(yn + 0.5 * k2);
      vec4 k4 = dt * derivative(yn + k3);
      yn += (k1 + k4 + 2.0 * (k2 + k3)) / 6.0;

      // Convert back from [-PI, PI] to [0, 1]:
      yn = (yn + PI) / (2.0 * PI);

      // Loop angles if they exceed the range
      yn.xy = fract(yn.xy);

      // Output the state to the four color channels
      gl_FragColor = yn;
    }`,framebuffer:t.prop("dst"),uniforms:{y:t.prop("src"),dt:t.prop("dt"),isCompound:t.prop("isCompound")}})}),inputs:["regl"],outputs:["update"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-95"),expanded:[],variables:[]},{id:95,body:t=>({drawMap:t({frag:`
    precision highp float;
    uniform sampler2D colorscale, y;
    uniform vec2 resolution;
    #define TWOPI ${2*Math.PI}

    vec3 colormap(vec2 uv) {
      uv *= TWOPI;
      return pow(0.5 + 0.5 * vec3(sin(uv.x) * vec2(-cos(uv.y), sin(uv.y)), -cos(uv.x)), vec3(0.75));
    }

    void main () {
      // Sample the state at this pixel
      vec4 state = texture2D(y, gl_FragCoord.xy / resolution);

      // Color it by the projection of the 4D state to 2D (theta1, theta2):
      gl_FragColor = vec4(colormap(state.xy), 1);
    }`,uniforms:{y:t.prop("y")}})}),inputs:["regl"],outputs:["drawMap"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-886"),expanded:[],variables:[]},{id:886,body:(t,e)=>({drawPendulum:t({vert:`
precision mediump float;
attribute vec2 line;
uniform vec2 resolution;
uniform vec3 w1, w2;
uniform vec2 hover;
uniform float lineWidth;
uniform sampler2D y;
#define PI ${Math.PI}
void main () {
  // Sample the state directly from the texture by passing the hovered
  // point as a uniform, so that the data never leaves the GPU.
  vec2 state = texture2D(y, hover).xy * (2.0 * PI) - PI;

  // Vectors representing the directions of the arms of the pendulum
  vec2 v1 = vec2(sin(state.x), -cos(state.x));
  vec2 v2 = vec2(sin(state.y), -cos(state.y));

  // Points representing the joints of the pendulum (and the end)
  vec2 p0 = vec2(0);
  vec2 p1 = v1;
  vec2 p2 = p1 + v2;

  // Select two of the three above (arm1 or arm2) as endpoints of
  // the line to be rendered
  vec2 a = w1.x * p0 + w1.y * p1 + w1.z * p2;
  vec2 b = w2.x * p0 + w2.y * p1 + w2.z * p2;

  // Normal and tangential vectors
  vec2 t = normalize(b - a);
  vec2 n = vec2(-t.y, t.x);

  // Select which end of line we're at
  vec2 p = mix(a, b, line.y) * 0.5;

  // Offset normal to the line by the line width
  p += n * line.x * lineWidth;

  gl_Position = vec4(p, 0, 1);
}`,frag:`
    precision lowp float;
    void main () {
      gl_FragColor = vec4(0, 0, 0, 1);
    }`,attributes:{line:[.5,0,.5,1,-.5,0,-.5,1]},uniforms:{y:t.prop("y[0]"),w1:t.prop("w1"),w2:t.prop("w2"),hover:()=>e.pt,lineWidth:n=>4*n.pixelRatio/n.framebufferWidth,resolution:n=>[n.framebufferWidth,n.framebufferHeight]},depth:{enable:!1},primitive:"triangle strip",count:4})}),inputs:["regl","mouseHover"],outputs:["drawPendulum"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-889"),expanded:[],variables:[]},{id:889,body:()=>({mouseHover:{pt:[0,0],active:!1,boxActive:!1}}),inputs:[],outputs:["mouseHover"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-619"),expanded:[],variables:[]},{id:619,body:(t,e,a,n,i,d,r,_)=>({zoomBox:t(function(){const g=a`<span></span>`,u={center:[0,0],scale:[Math.PI*2,Math.PI*2]},s=n._gl.canvas;let c={x:NaN,y:NaN},l={x:NaN,y:NaN},h=!1;function v(){g.dispatchEvent(new CustomEvent("input"))}function y(){u.center[0]=0,u.center[1]=0,u.scale[0]=Math.PI*2,u.scale[1]=Math.PI*2,v()}s.addEventListener("dblclick",y,!1);const f=document.getElementById("zoombox");f.style.position="absolute",f.style.border="1px solid rgba(0,0,0,0.6)",f.style.backgroundColor="rgba(255,255,255,0.2)",f.style.pointerEvents="none";function w(){f.style.left=`${Math.min(c.x,l.x)}px`,f.style.top=`${Math.min(c.y,l.y)}px`,f.style.width=`${Math.abs(l.x-c.x)}px`,f.style.height=`${Math.abs(l.y-c.y)}px`}function x(m){h=!0,c.x=m.offsetX,c.y=m.offsetY,l.x=m.offsetX,l.y=m.offsetY,s.setPointerCapture(m.pointerId),f.style.display="block",w(),i.boxActive=!0}function I(m){i.pt[0]=m.offsetX/d,i.pt[1]=1-m.offsetY/d,i.boxActive=!1,h&&(l.x=m.offsetX,l.y=m.offsetY,w(),i.boxActive=!0)}function E(m){if(f.style.display="none",h=!1,l.x=m.offsetX,l.y=m.offsetY,l.x===c.x||l.y===c.y)return;let P=u.center[0]-u.scale[0]*.5,D=u.center[0]+u.scale[0]*.5,k=u.center[1]-u.scale[1]*.5,B=u.center[1]+u.scale[1]*.5,C=.5*(c.x+l.x)/d,L=.5*(c.y+l.y)/d,S=Math.abs(l.x-c.x)/d,z=Math.abs(l.y-c.y)/d;u.center[0]=r(P,D,C),u.center[1]=r(k,B,L),u.scale[0]*=S,u.scale[1]*=z,s.releasePointerCapture(m.pointerId),w(),v(),i.boxActive=!1}function T(){i.active=!0}function $(){i.active=!1}return s.addEventListener("pointerdown",x,!1),s.addEventListener("pointermove",I,!1),s.addEventListener("pointerup",E,!1),s.addEventListener("pointerenter",T,!1),s.addEventListener("pointerleave",$,!1),_.then(()=>{s.addEventListener("dblclick",y,!1),s.removeEventListener("pointerdown",x),s.removeEventListener("pointermove",I),s.removeEventListener("pointerup",E),s.removeEventListener("pointerenter",T),s.removeEventListener("pointerleave",$)}),g.value=u,g}())}),inputs:["view","viz","html","regl","mouseHover","dimension","lerp","invalidation"],outputs:["zoomBox"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-901"),expanded:[],variables:[]},{id:901,body:async()=>(await b(()=>import("./twttr-CwAUCjW_.js"),[]),{twttr:window.twttr}),inputs:[],outputs:["twttr"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-903"),expanded:[],variables:[]},{id:903,body:t=>{function e(a,n){const i=document.createElement("DIV");return Promise.resolve().then(()=>t.widgets.createTweet(a,i,n)),i}return{tweet:e}},inputs:["twttr"],outputs:["tweet"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-766"),expanded:[],variables:[]},{id:766,body:t=>({dimension:t}),inputs:["width"],outputs:["dimension"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-82"),expanded:[],variables:[]},{id:82,body:(t,e)=>({radius:Math.floor(t*e)}),inputs:["dimension","pixelRatio"],outputs:["radius"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:()=>({pixelRatio:window.devicePixelRatio}),inputs:[],outputs:["pixelRatio"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-890"),expanded:[],variables:[]},{id:890,body:async()=>{const{default:t}=await b(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(e=>{if(!("default"in e))throw new SyntaxError("export 'default' not found");return e});return{createREGL:t}},inputs:[],outputs:["createREGL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-485"),expanded:[],variables:[]},{id:485,body:async(t,e)=>{const{canWriteToFBOOfType:a}=await b(()=>import("https://api.observablehq.com/@rreusser/regl-tools.js?v=4"),[]).then(n=>{const i={},d=t.module(n.default),r=t.module();if(!d.defines("canWriteToFBOOfType"))throw new SyntaxError("export 'canWriteToFBOOfType' not found");return r.variable(i.canWriteToFBOOfType=e()).import("canWriteToFBOOfType",d),i});return{canWriteToFBOOfType:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["canWriteToFBOOfType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-635"),expanded:[],variables:[]},{id:635,body:async(t,e)=>{const{rangeSlider:a}=await b(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(n=>{const i={},d=t.module(n.default),r=t.module();if(!d.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return r.variable(i.rangeSlider=e()).import("rangeSlider",d),i});return{rangeSlider:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["rangeSlider"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-791"),expanded:[],variables:[]},{id:791,body:()=>{function t(e,a,n){return e+n*(a-e)}return{lerp:t}},inputs:[],outputs:["lerp"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-907"),expanded:[],variables:[]},{id:907,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/simple-pendulum-diagram-D0VLgnsg.svg",import.meta.url).href).url()}" alt="Simple double pendulum diagram">
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-908"),expanded:[],variables:[]},{id:908,body:(t,e)=>t`Consider a double pendulum with point masses ${e`m_1`} and ${e`m_2`} at distances ${e`l_1`} and ${e`l_2`} from their respective pivots, with angles ${e`\theta_1`} and ${e`\theta_2`} measured from vertical (downward).

#### Coordinates

The position of mass 1:

${e.block`\begin{aligned}
x_1 &= l_1 \sin \theta_1 \\
y_1 &= -l_1 \cos \theta_1
\end{aligned}`}

The position of mass 2:

${e.block`\begin{aligned}
x_2 &= l_1 \sin \theta_1 + l_2 \sin \theta_2 \\
y_2 &= -l_1 \cos \theta_1 - l_2 \cos \theta_2
\end{aligned}`}

#### Kinetic Energy

Taking time derivatives:

${e.block`\begin{aligned}
\dot{x}_1 &= l_1 \dot{\theta}_1 \cos \theta_1 \\
\dot{y}_1 &= l_1 \dot{\theta}_1 \sin \theta_1 \\
\dot{x}_2 &= l_1 \dot{\theta}_1 \cos \theta_1 + l_2 \dot{\theta}_2 \cos \theta_2 \\
\dot{y}_2 &= l_1 \dot{\theta}_1 \sin \theta_1 + l_2 \dot{\theta}_2 \sin \theta_2
\end{aligned}`}

The kinetic energy is:

${e.block`\begin{aligned}
T &= \frac{1}{2} m_1 (\dot{x}_1^2 + \dot{y}_1^2) + \frac{1}{2} m_2 (\dot{x}_2^2 + \dot{y}_2^2) \\
&= \frac{1}{2} m_1 l_1^2 \dot{\theta}_1^2 + \frac{1}{2} m_2 \left[ l_1^2 \dot{\theta}_1^2 + l_2^2 \dot{\theta}_2^2 + 2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2) \right]
\end{aligned}`}

#### Potential Energy

${e.block`V = -m_1 g l_1 \cos \theta_1 - m_2 g (l_1 \cos \theta_1 + l_2 \cos \theta_2)`}

#### Lagrangian

${e.block`L = T - V`}

#### Euler-Lagrange Equations

The Euler-Lagrange equations ${e`\frac{d}{dt}\frac{\partial L}{\partial \dot{\theta}_i} - \frac{\partial L}{\partial \theta_i} = 0`} yield (after simplification):

${e.block`\begin{aligned}
(m_1 + m_2) l_1^2 \ddot{\theta}_1 + m_2 l_1 l_2 \ddot{\theta}_2 \cos(\theta_1 - \theta_2) &= -m_2 l_1 l_2 \dot{\theta}_2^2 \sin(\theta_1 - \theta_2) - (m_1 + m_2) g l_1 \sin \theta_1 \\
m_2 l_2^2 \ddot{\theta}_2 + m_2 l_1 l_2 \ddot{\theta}_1 \cos(\theta_1 - \theta_2) &= m_2 l_1 l_2 \dot{\theta}_1^2 \sin(\theta_1 - \theta_2) - m_2 g l_2 \sin \theta_2
\end{aligned}`}

#### ODEs for Numerical Integration

Solving for ${e`\ddot{\theta}_1`} and ${e`\ddot{\theta}_2`}:

${e.block`\begin{aligned}
\ddot{\theta}_1 &= \frac{-g(2m_1 + m_2)\sin\theta_1 - m_2 g \sin(\theta_1 - 2\theta_2) - 2\sin(\theta_1-\theta_2)m_2(\dot{\theta}_2^2 l_2 + \dot{\theta}_1^2 l_1 \cos(\theta_1-\theta_2))}{l_1(2m_1 + m_2 - m_2\cos(2\theta_1 - 2\theta_2))} \\
\ddot{\theta}_2 &= \frac{2\sin(\theta_1-\theta_2)(\dot{\theta}_1^2 l_1 (m_1+m_2) + g(m_1+m_2)\cos\theta_1 + \dot{\theta}_2^2 l_2 m_2 \cos(\theta_1-\theta_2))}{l_2(2m_1 + m_2 - m_2\cos(2\theta_1-2\theta_2))}
\end{aligned}`}

As a first-order system with state ${e`\mathbf{y} = (\theta_1, \theta_2, \omega_1, \omega_2)^T`} where ${e`\omega_i = \dot{\theta}_i`}:

${e.block`\frac{d\mathbf{y}}{dt} = \begin{pmatrix} \omega_1 \\ \omega_2 \\ \ddot{\theta}_1(\theta_1, \theta_2, \omega_1, \omega_2) \\ \ddot{\theta}_2(\theta_1, \theta_2, \omega_1, \omega_2) \end{pmatrix}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});o({root:document.getElementById("cell-910"),expanded:[],variables:[]},{id:910,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/compound-pendulum-diagram-1-nV_8qU.svg",import.meta.url).href).url()}" alt="Compound double pendulum diagram">
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-911"),expanded:[],variables:[]},{id:911,body:(t,e)=>t`For a compound pendulum, the mass is distributed along each arm. Consider uniform rods of lengths ${e`l_1`} and ${e`l_2`} with masses ${e`m_1`} and ${e`m_2`}, and moments of inertia ${e`I_1 = \frac{1}{3}m_1 l_1^2`} and ${e`I_2 = \frac{1}{3}m_2 l_2^2`} about their pivot points.

#### Center of Mass Positions

The centers of mass are located at the midpoints:

${e.block`\begin{aligned}
x_{c1} &= \frac{l_1}{2} \sin \theta_1, \quad y_{c1} = -\frac{l_1}{2} \cos \theta_1 \\
x_{c2} &= l_1 \sin \theta_1 + \frac{l_2}{2} \sin \theta_2, \quad y_{c2} = -l_1 \cos \theta_1 - \frac{l_2}{2} \cos \theta_2
\end{aligned}`}

#### Kinetic Energy

The kinetic energy includes both translational and rotational components:

${e.block`T = \frac{1}{2} I_1 \dot{\theta}_1^2 + \frac{1}{2} m_1 (\dot{x}_{c1}^2 + \dot{y}_{c1}^2) + \frac{1}{2} I_2 \dot{\theta}_2^2 + \frac{1}{2} m_2 (\dot{x}_{c2}^2 + \dot{y}_{c2}^2)`}

For a uniform rod rotating about its end, ${e`I_1 = \frac{1}{3}m_1 l_1^2`} and ${e`I_2 = \frac{1}{3}m_2 l_2^2`}. The translational kinetic energies are:

${e.block`\begin{aligned}
\frac{1}{2} m_1 (\dot{x}_{c1}^2 + \dot{y}_{c1}^2) &= \frac{1}{2} m_1 \frac{l_1^2}{4} \dot{\theta}_1^2 \\
\frac{1}{2} m_2 (\dot{x}_{c2}^2 + \dot{y}_{c2}^2) &= \frac{1}{2} m_2 \left[ l_1^2 \dot{\theta}_1^2 + \frac{l_2^2}{4} \dot{\theta}_2^2 + l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2) \right]
\end{aligned}`}

Thus:

${e.block`T = \frac{1}{6} m_1 l_1^2 \dot{\theta}_1^2 + \frac{1}{2} m_2 l_1^2 \dot{\theta}_1^2 + \frac{1}{6} m_2 l_2^2 \dot{\theta}_2^2 + \frac{1}{2} m_2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \cos(\theta_1 - \theta_2)`}

#### Potential Energy

${e.block`V = -m_1 g \frac{l_1}{2} \cos \theta_1 - m_2 g \left( l_1 \cos \theta_1 + \frac{l_2}{2} \cos \theta_2 \right)`}

#### Euler-Lagrange Equations

Applying the Euler-Lagrange equations and simplifying (for equal masses ${e`m_1 = m_2 = m`} and equal lengths ${e`l_1 = l_2 = l`}):

${e.block`\begin{aligned}
\frac{2ml^2}{3} \ddot{\theta}_1 + \frac{ml^2}{2} \ddot{\theta}_2 \cos(\theta_1 - \theta_2) &= -\frac{ml^2}{2} \dot{\theta}_2^2 \sin(\theta_1 - \theta_2) - \frac{3mgl}{2} \sin \theta_1 \\
\frac{ml^2}{3} \ddot{\theta}_2 + \frac{ml^2}{2} \ddot{\theta}_1 \cos(\theta_1 - \theta_2) &= \frac{ml^2}{2} \dot{\theta}_1^2 \sin(\theta_1 - \theta_2) - \frac{mgl}{2} \sin \theta_2
\end{aligned}`}

#### ODEs for Numerical Integration

Introducing generalized momenta ${e`p_{\theta_1} = \frac{\partial L}{\partial \dot{\theta}_1}`} and ${e`p_{\theta_2} = \frac{\partial L}{\partial \dot{\theta}_2}`} and normalizing by ${e`ml^2`}:

${e.block`\begin{aligned}
p_{\theta_1} &= \frac{2}{3} \dot{\theta}_1 + \frac{1}{2} \dot{\theta}_2 \cos(\theta_1 - \theta_2) \\
p_{\theta_2} &= \frac{1}{3} \dot{\theta}_2 + \frac{1}{2} \dot{\theta}_1 \cos(\theta_1 - \theta_2)
\end{aligned}`}

Inverting to solve for ${e`\dot{\theta}_1`} and ${e`\dot{\theta}_2`} (with ${e`\Delta = \theta_1 - \theta_2`}):

${e.block`\begin{aligned}
\dot{\theta}_1 &= \frac{6}{ml^2} \frac{2 p_{\theta_1} - 3\cos\Delta \cdot p_{\theta_2}}{16 - 9\cos^2\Delta} \\
\dot{\theta}_2 &= \frac{6}{ml^2} \frac{8 p_{\theta_2} - 3\cos\Delta \cdot p_{\theta_1}}{16 - 9\cos^2\Delta}
\end{aligned}`}

The time derivatives of the momenta are:

${e.block`\begin{aligned}
\dot{p}_{\theta_1} &= -\frac{ml^2}{2} \dot{\theta}_1 \dot{\theta}_2 \sin\Delta - \frac{3mgl}{2} \sin\theta_1 \\
\dot{p}_{\theta_2} &= \frac{ml^2}{2} \dot{\theta}_1 \dot{\theta}_2 \sin\Delta - \frac{mgl}{2} \sin\theta_2
\end{aligned}`}

As a first-order system with state ${e`\mathbf{y} = (\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2})^T`}:

${e.block`\frac{d\mathbf{y}}{dt} = \begin{pmatrix}
\dot{\theta}_1(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{\theta}_2(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{p}_{\theta_1}(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{p}_{\theta_2}(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2})
\end{pmatrix}`}

This is the formulation used in the simulation above, with normalized units (${e`m = l = g = 1`}).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});
