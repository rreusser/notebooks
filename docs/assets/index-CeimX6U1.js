import{d as o,_ as b}from"./index-ByB2dbry.js";o({root:document.getElementById("cell-530"),expanded:[],variables:[]},{id:530,body:async function(e,t){return e`<figure>
<img width="300" src="${await t(new URL("/notebooks/assets/1920px-Double-compound-pendulum-dimensioned.svg-D3Fofwsq.png",import.meta.url).href).url()}">
<figcaption>Source: <a href="https://commons.wikimedia.org/wiki/File:Double-compound-pendulum-dimensioned.svg">Wikimedia commons</a>
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-526"),expanded:[],variables:[]},{id:526,body:e=>e("1392357775666159618"),inputs:["tweet"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-610"),expanded:[],variables:[]},{id:610,body:(e,t,n)=>{e==="half float"&&t(n`<p style="color:#a00">Warning! This simulation is using half-float precision and as a result won't be accurate. Try a device which supports the floating point WebGL textures for better results.</p>`)},inputs:["colorType","display","html"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-573"),expanded:[],variables:[]},{id:573,body:(e,t)=>({omega0_0:e(t.range([-2,2],{label:"Initial angular velocity of arm 1",value:0}))}),inputs:["view","Inputs"],outputs:["omega0_0"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-576"),expanded:[],variables:[]},{id:576,body:(e,t)=>({omega0_1:e(t.range([-2,2],{label:"Initial angular velocity of arm 2",value:0}))}),inputs:["view","Inputs"],outputs:["omega0_1"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-313"),expanded:[],variables:[]},{id:313,body:(e,t)=>({dt:e(t.range([.001,.1],{label:"Time step",value:.03,transform:Math.log}))}),inputs:["view","Inputs"],outputs:["dt"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-281"),expanded:[],variables:[]},{id:281,body:(e,t)=>({simulate:e(t.checkbox(["Simulate","Show pendulum at point under mouse"],{value:["Simulate","Show pendulum at point under mouse"]}))}),inputs:["view","Inputs"],outputs:["simulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-300"),expanded:[],variables:[]},{id:300,body:(e,t)=>({restart:e(t.button("Restart"))}),inputs:["view","Inputs"],outputs:["restart"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-289"),expanded:[],variables:[]},{id:289,body:function(t,n){return t`<figure>
<div style="position:relative;">
${n._gl.canvas}
<div id="zoombox" style="display:none"></div>
</div>
<figcaption>Hover to view pendulum at current point. Click and drag to zoom. Double click to return to initial view</figcaption>
</figure>`},inputs:["html","regl"],outputs:void 0,output:"viz",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-814"),expanded:[],variables:[]},{id:814,body:function(e,t,n){return e`${t`\theta_1 \in [${(n.center[0]-n.scale[0]/2).toFixed(8)}, ${(n.center[0]+n.scale[0]/2).toFixed(8)}]`}<br>${t`\theta_2 \in [${(n.center[1]-n.scale[1]/2).toFixed(8)}, ${(n.center[1]+n.scale[1]/2).toFixed(8)}]`}`},inputs:["md","tex","zoomBox"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(e,t)=>({regl:function(){var a=document.createElement("canvas");return e({optionalExtensions:["OES_texture_half_float","OES_texture_float","ANGLE_instanced_arrays"],canvas:a,pixelRatio:t,attributes:{antialias:!0,alpha:!1,depthStencil:!1,preserveDrawingBuffer:!1}})}()}),inputs:["createREGL","pixelRatio"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-47"),expanded:[],variables:[]},{id:47,body:(e,t,n)=>({resizeContext:function(){const i=e._gl.canvas;var u=t,r=t;i.style.width=`${Math.floor(u/n)}px`,i.style.height=`${Math.floor(r/n)}px`,i.width=u,i.height=r}()}),inputs:["regl","radius","pixelRatio"],outputs:["resizeContext"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-158"),expanded:[],variables:[]},{id:158,body:(e,t,n,a,i,u,r,c)=>{n.poll(),a[0].use(()=>i(()=>{u({omega0_0:r,omega0_1:c,zoomBox:e})}))},inputs:["zoomBox","restart","regl","y","blit","initialize","omega0_0","omega0_1"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:(e,t,n,a,i,u,r,c,g,y,d,l)=>{const f=~n.indexOf("Simulate"),s=~n.indexOf("Show pendulum at point under mouse");let v=!0;const h=a.frame(()=>{i(()=>{f&&u([{dt:r,src:c[0],dst:c[1]},{dt:r,src:c[1],dst:c[0]}]),v&&(g({y:c[0]}),s&&y.active&&!y.boxActive&&d([{y:c,w1:[0,0,0],w2:[0,1,0]},{y:c,w1:[0,1,0],w2:[0,0,1]}])),v=!!f})});return l.then(()=>h.cancel()),{run:f,showPen:s,needsDraw:v,frame:h}},inputs:["restart","zoomBox","simulate","regl","blit","update","dt","y","drawMap","mouseHover","drawPendulum","invalidation"],outputs:["run","showPen","needsDraw","frame"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-78"),expanded:[],variables:[]},{id:78,body:(e,t)=>({colorType:e(t,"float")?"float":e(t,"half float")?"half float":"uint8"}),inputs:["canWriteToFBOOfType","regl"],outputs:["colorType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-58"),expanded:[],variables:[]},{id:58,body:(e,t,n,a)=>({y:function(){const u=[0,1].map(()=>e.framebuffer({colorType:t,radius:n,depth:!1,stencil:!1}));return a.then(()=>u.forEach(r=>r.destroy())),u}()}),inputs:["regl","colorType","radius","invalidation"],outputs:["y"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-113"),expanded:[],variables:[]},{id:113,body:e=>({blit:e({vert:`
    precision mediump float;
    attribute vec2 xy;
    void main () {
      gl_Position = vec4(xy, 0, 1);
    }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{resolution:n=>[n.framebufferWidth,n.framebufferHeight]},count:3,depth:{enable:!1}})}),inputs:["regl"],outputs:["blit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-151"),expanded:[],variables:[]},{id:151,body:e=>({initialize:e({frag:`
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
    }`,uniforms:{omega0:(n,a)=>[a.omega0_0,a.omega0_1],center:(n,a)=>a.zoomBox.center.map(i=>i*.5/Math.PI),scale:(n,a)=>[a.zoomBox.scale[0]/(Math.PI*2),a.zoomBox.scale[1]/(Math.PI*2)]}})}),inputs:["regl"],outputs:["initialize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-176"),expanded:[],variables:[]},{id:176,body:e=>({update:e({frag:`
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
    }`,framebuffer:e.prop("dst"),uniforms:{y:e.prop("src"),dt:e.prop("dt")}})}),inputs:["regl"],outputs:["update"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-95"),expanded:[],variables:[]},{id:95,body:e=>({drawMap:e({frag:`
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
    }`,uniforms:{y:e.prop("y")}})}),inputs:["regl"],outputs:["drawMap"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-886"),expanded:[],variables:[]},{id:886,body:(e,t)=>({drawPendulum:e({vert:`
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
    }`,attributes:{line:[.5,0,.5,1,-.5,0,-.5,1]},uniforms:{y:e.prop("y[0]"),w1:e.prop("w1"),w2:e.prop("w2"),hover:()=>t.pt,lineWidth:a=>4*a.pixelRatio/a.framebufferWidth,resolution:a=>[a.framebufferWidth,a.framebufferHeight]},depth:{enable:!1},primitive:"triangle strip",count:4})}),inputs:["regl","mouseHover"],outputs:["drawPendulum"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-889"),expanded:[],variables:[]},{id:889,body:()=>({mouseHover:{pt:[0,0],active:!1,boxActive:!1}}),inputs:[],outputs:["mouseHover"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-619"),expanded:[],variables:[]},{id:619,body:(e,t,n,a,i,u,r,c)=>({zoomBox:e(function(){const y=n`<span></span>`,d={center:[0,0],scale:[Math.PI*2,Math.PI*2]},l=a._gl.canvas;let f={x:NaN,y:NaN},s={x:NaN,y:NaN},v=!1;function h(){y.dispatchEvent(new CustomEvent("input"))}function w(){d.center[0]=0,d.center[1]=0,d.scale[0]=Math.PI*2,d.scale[1]=Math.PI*2,h()}l.addEventListener("dblclick",w,!1);const m=document.getElementById("zoombox");m.style.position="absolute",m.style.border="1px solid rgba(0,0,0,0.6)",m.style.backgroundColor="rgba(255,255,255,0.2)",m.style.pointerEvents="none";function x(){m.style.left=`${Math.min(f.x,s.x)}px`,m.style.top=`${Math.min(f.y,s.y)}px`,m.style.width=`${Math.abs(s.x-f.x)}px`,m.style.height=`${Math.abs(s.y-f.y)}px`}function I(p){v=!0,f.x=p.offsetX,f.y=p.offsetY,s.x=p.offsetX,s.y=p.offsetY,l.setPointerCapture(p.pointerId),m.style.display="block",x(),i.boxActive=!0}function E(p){i.pt[0]=p.offsetX/u,i.pt[1]=1-p.offsetY/u,i.boxActive=!1,v&&(s.x=p.offsetX,s.y=p.offsetY,x(),i.boxActive=!0)}function _(p){if(m.style.display="none",v=!1,s.x=p.offsetX,s.y=p.offsetY,s.x===f.x||s.y===f.y)return;let T=d.center[0]-d.scale[0]*.5,D=d.center[0]+d.scale[0]*.5,k=d.center[1]-d.scale[1]*.5,M=d.center[1]+d.scale[1]*.5,L=.5*(f.x+s.x)/u,C=.5*(f.y+s.y)/u,O=Math.abs(s.x-f.x)/u,z=Math.abs(s.y-f.y)/u;d.center[0]=r(T,D,L),d.center[1]=r(k,M,C),d.scale[0]*=O,d.scale[1]*=z,l.releasePointerCapture(p.pointerId),x(),h(),i.boxActive=!1}function P(){i.active=!0}function B(){i.active=!1}return l.addEventListener("pointerdown",I,!1),l.addEventListener("pointermove",E,!1),l.addEventListener("pointerup",_,!1),l.addEventListener("pointerenter",P,!1),l.addEventListener("pointerleave",B,!1),c.then(()=>{l.addEventListener("dblclick",w,!1),l.removeEventListener("pointerdown",I),l.removeEventListener("pointermove",E),l.removeEventListener("pointerup",_),l.removeEventListener("pointerenter",P),l.removeEventListener("pointerleave",B)}),y.value=d,y}())}),inputs:["view","viz","html","regl","mouseHover","dimension","lerp","invalidation"],outputs:["zoomBox"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-901"),expanded:[],variables:[]},{id:901,body:async()=>(await b(()=>import("./twttr-CwAUCjW_.js"),[]),{twttr:window.twttr}),inputs:[],outputs:["twttr"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-903"),expanded:[],variables:[]},{id:903,body:e=>{function t(n,a){const i=document.createElement("DIV");return Promise.resolve().then(()=>e.widgets.createTweet(n,i,a)),i}return{tweet:t}},inputs:["twttr"],outputs:["tweet"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-766"),expanded:[],variables:[]},{id:766,body:e=>({dimension:e}),inputs:["width"],outputs:["dimension"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-82"),expanded:[],variables:[]},{id:82,body:(e,t)=>({radius:Math.floor(e*t)}),inputs:["dimension","pixelRatio"],outputs:["radius"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:()=>({pixelRatio:window.devicePixelRatio}),inputs:[],outputs:["pixelRatio"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-890"),expanded:[],variables:[]},{id:890,body:async()=>{const{default:e}=await b(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(t=>{if(!("default"in t))throw new SyntaxError("export 'default' not found");return t});return{createREGL:e}},inputs:[],outputs:["createREGL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-485"),expanded:[],variables:[]},{id:485,body:async(e,t)=>{const{canWriteToFBOOfType:n}=await b(()=>import("https://api.observablehq.com/@rreusser/regl-tools.js?v=4"),[]).then(a=>{const i={},u=e.module(a.default),r=e.module();if(!u.defines("canWriteToFBOOfType"))throw new SyntaxError("export 'canWriteToFBOOfType' not found");return r.variable(i.canWriteToFBOOfType=t()).import("canWriteToFBOOfType",u),i});return{canWriteToFBOOfType:n}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["canWriteToFBOOfType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-635"),expanded:[],variables:[]},{id:635,body:async(e,t)=>{const{rangeSlider:n}=await b(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(a=>{const i={},u=e.module(a.default),r=e.module();if(!u.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return r.variable(i.rangeSlider=t()).import("rangeSlider",u),i});return{rangeSlider:n}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["rangeSlider"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-791"),expanded:[],variables:[]},{id:791,body:()=>{function e(t,n,a){return t+a*(n-t)}return{lerp:e}},inputs:[],outputs:["lerp"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
