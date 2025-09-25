import{_ as x}from"./index-DLwE0_Ng.js";import{d as i}from"./define-D1bHXsD4.js";i({root:document.getElementById("cell-530"),expanded:[],variables:[]},{id:530,body:async function(e,n){return e`<figure>
<img width="300" src="${await n(new URL("/notebooks/assets/1920px-Double-compound-pendulum-dimensioned.svg-D3Fofwsq.png",import.meta.url).href).url()}">
<figcaption>Source: <a href="https://commons.wikimedia.org/wiki/File:Double-compound-pendulum-dimensioned.svg">Wikimedia commons</a>
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});i({root:document.getElementById("cell-526"),expanded:[],variables:[]},{id:526,body:e=>e("1392357775666159618"),inputs:["tweet"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-910"),expanded:[],variables:[]},{id:910,body:()=>{function e(n,t,o,a){return function(u,r,l,b){const m=o*a/2*Math.cos(u-r);return[n/3*o**2*l+t*o**2*l+n*b*m,t/3*a**2*b+t*l*m]}}return{computeMomentum:e}},inputs:[],outputs:["computeMomentum"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-911"),expanded:[],variables:[]},{id:911,body:()=>{function e(n,t,o,a,u=1){return function([r,l,b,m]){const d=Math.cos(r-l),f=Math.sin(r-l),p=1/(4*(n+3*t)-9*t*d**2),s=6/o**2*(2*b-3*o/a*d*b)*p,v=6/(t*a**2)*(2*m*(n+3*t)-3*t*a/o*d*b)*p,h=-t/2*o*a*s*v*f-(n/2+t)*u*o*Math.sin(r),g=t/2*o*a*s*v*f-t/2*u*a*Math.sin(l);return[s,v,h,g]}}return{derivative:e}},inputs:[],outputs:["derivative"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-912"),expanded:[],variables:[]},{id:912,body:(e,n)=>{const t=e.create("svg").attr("width",640).attr("height",480);return n(t.node()),{svg:t}},inputs:["d3","display"],outputs:["svg"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-610"),expanded:[],variables:[]},{id:610,body:(e,n,t)=>{e==="half float"&&n(t`<p style="color:#a00">Warning! This simulation is using half-float precision and as a result won't be accurate. Try a device which supports the floating point WebGL textures for better results.</p>`)},inputs:["colorType","display","html"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-573"),expanded:[],variables:[]},{id:573,body:(e,n)=>({omega0_0:e(n.range([-2,2],{label:"Initial angular velocity of arm 1",value:0}))}),inputs:["view","Inputs"],outputs:["omega0_0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-576"),expanded:[],variables:[]},{id:576,body:(e,n)=>({omega0_1:e(n.range([-2,2],{label:"Initial angular velocity of arm 2",value:0}))}),inputs:["view","Inputs"],outputs:["omega0_1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-313"),expanded:[],variables:[]},{id:313,body:(e,n)=>({dt:e(n.range([.001,.1],{label:"Time step",value:.03,transform:Math.log}))}),inputs:["view","Inputs"],outputs:["dt"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-281"),expanded:[],variables:[]},{id:281,body:(e,n)=>({simulate:e(n.checkbox(["Simulate","Show pendulum at point under mouse"],{value:["Simulate","Show pendulum at point under mouse"]}))}),inputs:["view","Inputs"],outputs:["simulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-300"),expanded:[],variables:[]},{id:300,body:(e,n)=>({restart:e(n.button("Restart"))}),inputs:["view","Inputs"],outputs:["restart"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-289"),expanded:[],variables:[]},{id:289,body:function(n,t){return n`<figure>
<div style="position:relative;">
${t._gl.canvas}
<div id="zoombox" style="display:none"></div>
</div>
<figcaption>Hover to view pendulum at current point. Click and drag to zoom. Double click to return to initial view</figcaption>
</figure>`},inputs:["html","regl"],outputs:void 0,output:"viz",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});i({root:document.getElementById("cell-814"),expanded:[],variables:[]},{id:814,body:function(e,n,t){return e`${n`\theta_1 \in [${(t.center[0]-t.scale[0]/2).toFixed(8)}, ${(t.center[0]+t.scale[0]/2).toFixed(8)}]`}<br>${n`\theta_2 \in [${(t.center[1]-t.scale[1]/2).toFixed(8)}, ${(t.center[1]+t.scale[1]/2).toFixed(8)}]`}`},inputs:["md","tex","zoomBox"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});i({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(e,n)=>({regl:function(){var o=document.createElement("canvas");return e({optionalExtensions:["OES_texture_half_float","OES_texture_float","ANGLE_instanced_arrays"],canvas:o,pixelRatio:n,attributes:{antialias:!0,alpha:!1,depthStencil:!1,preserveDrawingBuffer:!1}})}()}),inputs:["createREGL","pixelRatio"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-47"),expanded:[],variables:[]},{id:47,body:(e,n,t)=>({resizeContext:function(){const a=e._gl.canvas;var u=n,r=n;a.style.width=`${Math.floor(u/t)}px`,a.style.height=`${Math.floor(r/t)}px`,a.width=u,a.height=r}()}),inputs:["regl","radius","pixelRatio"],outputs:["resizeContext"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-158"),expanded:[],variables:[]},{id:158,body:(e,n,t,o,a,u,r,l)=>{t.poll(),o[0].use(()=>a(()=>{u({omega0_0:r,omega0_1:l,zoomBox:e})}))},inputs:["zoomBox","restart","regl","y","blit","initialize","omega0_0","omega0_1"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:(e,n,t,o,a,u,r,l,b,m,d,f)=>{const p=~t.indexOf("Simulate"),s=~t.indexOf("Show pendulum at point under mouse");let v=!0;const h=o.frame(()=>{a(()=>{p&&u([{dt:r,src:l[0],dst:l[1]},{dt:r,src:l[1],dst:l[0]}]),v&&(b({y:l[0]}),s&&m.active&&!m.boxActive&&d([{y:l,w1:[0,0,0],w2:[0,1,0]},{y:l,w1:[0,1,0],w2:[0,0,1]}])),v=!!p})});return f.then(()=>h.cancel()),{run:p,showPen:s,needsDraw:v,frame:h}},inputs:["restart","zoomBox","simulate","regl","blit","update","dt","y","drawMap","mouseHover","drawPendulum","invalidation"],outputs:["run","showPen","needsDraw","frame"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-78"),expanded:[],variables:[]},{id:78,body:(e,n)=>({colorType:e(n,"float")?"float":e(n,"half float")?"half float":"uint8"}),inputs:["canWriteToFBOOfType","regl"],outputs:["colorType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-58"),expanded:[],variables:[]},{id:58,body:(e,n,t,o)=>({y:function(){const u=[0,1].map(()=>e.framebuffer({colorType:n,radius:t,depth:!1,stencil:!1}));return o.then(()=>u.forEach(r=>r.destroy())),u}()}),inputs:["regl","colorType","radius","invalidation"],outputs:["y"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-113"),expanded:[],variables:[]},{id:113,body:e=>({blit:e({vert:`
    precision mediump float;
    attribute vec2 xy;
    void main () {
      gl_Position = vec4(xy, 0, 1);
    }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{resolution:t=>[t.framebufferWidth,t.framebufferHeight]},count:3,depth:{enable:!1}})}),inputs:["regl"],outputs:["blit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-151"),expanded:[],variables:[]},{id:151,body:e=>({initialize:e({frag:`
    precision highp float;
    uniform sampler2D colorscale;
    uniform vec2 resolution, omega0, center, scale;
    #define PI ${Math.PI}
    void main () {
      // Really just the full spectrum of angles for the two parts of the pendulum,
      // [0, 2pi] x [0, 2pi], with zero velocity, but we center it about 0.5 to
      // slightly improve how well it works with half float precision
      vec2 theta0 = center + (0.5 + scale * ((vec2(0, 1) + vec2(1, -1) * gl_FragCoord.xy / resolution) - 0.5));
      gl_FragColor = (vec4(theta0 * (2.0 * PI) - PI, omega0) + PI) / (2.0 * PI);
    }`,uniforms:{omega0:(t,o)=>[o.omega0_0,o.omega0_1],center:(t,o)=>o.zoomBox.center.map(a=>a*.5/Math.PI),scale:(t,o)=>[o.zoomBox.scale[0]/(Math.PI*2),o.zoomBox.scale[1]/(Math.PI*2)]}})}),inputs:["regl"],outputs:["initialize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-176"),expanded:[],variables:[]},{id:176,body:e=>({update:e({frag:`
    precision highp float;
    uniform sampler2D y;
    uniform vec2 resolution;
    uniform float dt;
    #define PI ${Math.PI}

    // From: https://en.wikipedia.org/wiki/Double_pendulum#Lagrangian
    vec4 derivative (vec4 state) {
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
    }`,framebuffer:e.prop("dst"),uniforms:{y:e.prop("src"),dt:e.prop("dt")}})}),inputs:["regl"],outputs:["update"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-95"),expanded:[],variables:[]},{id:95,body:e=>({drawMap:e({frag:`
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
    }`,uniforms:{y:e.prop("y")}})}),inputs:["regl"],outputs:["drawMap"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-886"),expanded:[],variables:[]},{id:886,body:(e,n)=>({drawPendulum:e({vert:`
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
    }`,attributes:{line:[.5,0,.5,1,-.5,0,-.5,1]},uniforms:{y:e.prop("y[0]"),w1:e.prop("w1"),w2:e.prop("w2"),hover:()=>n.pt,lineWidth:o=>4*o.pixelRatio/o.framebufferWidth,resolution:o=>[o.framebufferWidth,o.framebufferHeight]},depth:{enable:!1},primitive:"triangle strip",count:4})}),inputs:["regl","mouseHover"],outputs:["drawPendulum"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-889"),expanded:[],variables:[]},{id:889,body:()=>({mouseHover:{pt:[0,0],active:!1,boxActive:!1}}),inputs:[],outputs:["mouseHover"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-619"),expanded:[],variables:[]},{id:619,body:(e,n,t,o,a,u,r,l)=>({zoomBox:e(function(){const m=t`<span></span>`,d={center:[0,0],scale:[Math.PI*2,Math.PI*2]},f=o._gl.canvas;let p={x:NaN,y:NaN},s={x:NaN,y:NaN},v=!1;function h(){m.dispatchEvent(new CustomEvent("input"))}function g(){d.center[0]=0,d.center[1]=0,d.scale[0]=Math.PI*2,d.scale[1]=Math.PI*2,h()}f.addEventListener("dblclick",g,!1);const y=document.getElementById("zoombox");y.style.position="absolute",y.style.border="1px solid rgba(0,0,0,0.6)",y.style.backgroundColor="rgba(255,255,255,0.2)",y.style.pointerEvents="none";function w(){y.style.left=`${Math.min(p.x,s.x)}px`,y.style.top=`${Math.min(p.y,s.y)}px`,y.style.width=`${Math.abs(s.x-p.x)}px`,y.style.height=`${Math.abs(s.y-p.y)}px`}function I(c){v=!0,p.x=c.offsetX,p.y=c.offsetY,s.x=c.offsetX,s.y=c.offsetY,f.setPointerCapture(c.pointerId),y.style.display="block",w(),a.boxActive=!0}function E(c){a.pt[0]=c.offsetX/u,a.pt[1]=1-c.offsetY/u,a.boxActive=!1,v&&(s.x=c.offsetX,s.y=c.offsetY,w(),a.boxActive=!0)}function _(c){if(y.style.display="none",v=!1,s.x=c.offsetX,s.y=c.offsetY,s.x===p.x||s.y===p.y)return;let T=d.center[0]-d.scale[0]*.5,D=d.center[0]+d.scale[0]*.5,M=d.center[1]-d.scale[1]*.5,k=d.center[1]+d.scale[1]*.5,L=.5*(p.x+s.x)/u,C=.5*(p.y+s.y)/u,O=Math.abs(s.x-p.x)/u,z=Math.abs(s.y-p.y)/u;d.center[0]=r(T,D,L),d.center[1]=r(M,k,C),d.scale[0]*=O,d.scale[1]*=z,f.releasePointerCapture(c.pointerId),w(),h(),a.boxActive=!1}function P(){a.active=!0}function B(){a.active=!1}return f.addEventListener("pointerdown",I,!1),f.addEventListener("pointermove",E,!1),f.addEventListener("pointerup",_,!1),f.addEventListener("pointerenter",P,!1),f.addEventListener("pointerleave",B,!1),l.then(()=>{f.addEventListener("dblclick",g,!1),f.removeEventListener("pointerdown",I),f.removeEventListener("pointermove",E),f.removeEventListener("pointerup",_),f.removeEventListener("pointerenter",P),f.removeEventListener("pointerleave",B)}),m.value=d,m}())}),inputs:["view","viz","html","regl","mouseHover","dimension","lerp","invalidation"],outputs:["zoomBox"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-901"),expanded:[],variables:[]},{id:901,body:async()=>(await x(()=>import("./twttr-CwAUCjW_.js"),[]),{twttr:window.twttr}),inputs:[],outputs:["twttr"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-903"),expanded:[],variables:[]},{id:903,body:e=>{function n(t,o){const a=document.createElement("DIV");return Promise.resolve().then(()=>e.widgets.createTweet(t,a,o)),a}return{tweet:n}},inputs:["twttr"],outputs:["tweet"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-766"),expanded:[],variables:[]},{id:766,body:e=>({dimension:e}),inputs:["width"],outputs:["dimension"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-82"),expanded:[],variables:[]},{id:82,body:(e,n)=>({radius:Math.floor(e*n)}),inputs:["dimension","pixelRatio"],outputs:["radius"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:()=>({pixelRatio:window.devicePixelRatio}),inputs:[],outputs:["pixelRatio"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-890"),expanded:[],variables:[]},{id:890,body:async()=>{const{default:e}=await x(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(n=>{if(!("default"in n))throw new SyntaxError("export 'default' not found");return n});return{createREGL:e}},inputs:[],outputs:["createREGL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-485"),expanded:[],variables:[]},{id:485,body:async(e,n)=>{const{canWriteToFBOOfType:t}=await x(()=>import("https://api.observablehq.com/@rreusser/regl-tools.js?v=4"),[]).then(o=>{const a={},u=e.module(o.default),r=e.module();if(!u.defines("canWriteToFBOOfType"))throw new SyntaxError("export 'canWriteToFBOOfType' not found");return r.variable(a.canWriteToFBOOfType=n()).import("canWriteToFBOOfType",u),a});return{canWriteToFBOOfType:t}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["canWriteToFBOOfType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-635"),expanded:[],variables:[]},{id:635,body:async(e,n)=>{const{rangeSlider:t}=await x(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(o=>{const a={},u=e.module(o.default),r=e.module();if(!u.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return r.variable(a.rangeSlider=n()).import("rangeSlider",u),a});return{rangeSlider:t}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["rangeSlider"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-791"),expanded:[],variables:[]},{id:791,body:()=>{function e(n,t,o){return n+o*(t-n)}return{lerp:e}},inputs:[],outputs:["lerp"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
