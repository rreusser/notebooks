import{_ as w,d as i}from"./index-Bvdv0JJ6.js";(window.location.hostname==="localhost"||window.location.hostname.match(/127\.0\.0\.1/))&&w(async()=>{const{main:t}=await import("./index-Bvdv0JJ6.js").then(e=>e.i);return{main:t}},[]).then(({main:t})=>{window.__observableRuntime=t,console.log("[DebugClient] Runtime module exposed as window.__observableRuntime"),w(()=>import("./debug-client-BJyqFSh-.js"),[])});i({root:document.getElementById("cell-530"),expanded:[],variables:[]},{id:530,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/compound-pendulum-diagram-1-nV_8qU.svg",import.meta.url).href).url()}" alt="Compound double pendulum diagram">
<figcaption>A compound double pendulum with mass distributed along the length of each arm.</figcaption>
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});i({root:document.getElementById("cell-526"),expanded:[],variables:[]},{id:526,body:t=>t("1392357775666159618"),inputs:["tweet"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-610"),expanded:[],variables:[]},{id:610,body:(t,e,a)=>{t==="half float"&&e(a`<p style="color:#a00">Warning! This simulation is using half-float precision and as a result won't be accurate. Try a device which supports the floating point WebGL textures for better results.</p>`)},inputs:["colorType","display","html"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-571"),expanded:[],variables:[]},{id:571,body:(t,e)=>({pendulumType:t(e.radio(["Simple","Compound"],{label:"Pendulum type",value:"Compound"}))}),inputs:["view","Inputs"],outputs:["pendulumType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-915"),expanded:[],variables:[]},{id:915,body:(t,e,a)=>t`${e`\theta_1 \in [${(a.center[0]-a.scale[0]/2).toFixed(8)}, ${(a.center[0]+a.scale[0]/2).toFixed(8)}]`}<br>${e`\theta_2 \in [${(a.center[1]-a.scale[1]/2).toFixed(8)}, ${(a.center[1]+a.scale[1]/2).toFixed(8)}]`}`,inputs:["md","tex","zoomBox"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-289"),expanded:[],variables:[]},{id:289,body:function(e,a){return e`<figure>
<div style="position:relative;">
${a._gl.canvas}
<div id="zoombox" style="display:none"></div>
</div>
<figcaption>Hover to view pendulum at current point. Click and drag to zoom. Double click to return to initial view</figcaption>
</figure>`},inputs:["html","regl"],outputs:void 0,output:"viz",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});i({root:document.getElementById("cell-917"),expanded:[],variables:[]},{id:917,body:(t,e)=>({simulate:t(e.checkbox(["Simulate","Show pendulum at point under mouse"],{value:["Simulate","Show pendulum at point under mouse"]}))}),inputs:["view","Inputs"],outputs:["simulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-916"),expanded:[],variables:[]},{id:916,body:(t,e)=>({restart:t(e.button("Restart"))}),inputs:["view","Inputs"],outputs:["restart"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-914"),expanded:[],variables:[]},{id:914,body:(t,e)=>{const a=t(e.range([.1,1],{label:"Mass 1 (m₁)",value:1,step:.01,transform:Math.log})),o=t(e.range([.1,1],{label:"Mass 2 (m₂)",value:1,step:.01,transform:Math.log})),n=t(e.range([.1,1],{label:"Length 1 (l₁)",value:1,step:.01,transform:Math.log})),d=t(e.range([.1,1],{label:"Length 2 (l₂)",value:1,step:.01,transform:Math.log})),r=t(e.range([-2,2],{label:"Initial angular velocity of arm 1",value:0})),f=t(e.range([-2,2],{label:"Initial angular velocity of arm 2",value:0})),h=t(e.range([.001,.1],{label:"Time step",value:.03,transform:Math.log}));return{m1:a,m2:o,l1:n,l2:d,omega0_0:r,omega0_1:f,dt:h}},inputs:["view","Inputs"],outputs:["m1","m2","l1","l2","omega0_0","omega0_1","dt"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(t,e)=>({regl:function(){var o=document.createElement("canvas");return t({optionalExtensions:["OES_texture_half_float","OES_texture_float","ANGLE_instanced_arrays"],canvas:o,pixelRatio:e,attributes:{antialias:!0,alpha:!1,depthStencil:!1,preserveDrawingBuffer:!1}})}()}),inputs:["createREGL","pixelRatio"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-47"),expanded:[],variables:[]},{id:47,body:(t,e,a)=>({resizeContext:function(){const n=t._gl.canvas;var d=e,r=e;n.style.width=`${Math.floor(d/a)}px`,n.style.height=`${Math.floor(r/a)}px`,n.width=d,n.height=r}()}),inputs:["regl","radius","pixelRatio"],outputs:["resizeContext"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-158"),expanded:[],variables:[]},{id:158,body:(t,e,a,o,n,d,r,f,h,_,u,s,l)=>{o.poll(),n[0].use(()=>d(()=>{r({omega0_0:f,omega0_1:h,zoomBox:t,pendulumType:a,m1:_,m2:u,l1:s,l2:l})}))},inputs:["zoomBox","restart","pendulumType","regl","y","blit","initialize","omega0_0","omega0_1","m1","m2","l1","l2"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:(t,e,a,o,n,d,r,f,h,_,u,s,l,m,v,I,E)=>{const p=~r.indexOf("Simulate"),y=~r.indexOf("Show pendulum at point under mouse"),b=f==="Compound";let g=!0;const x=h.frame(()=>{_(()=>{p&&u([{dt:s,src:l[0],dst:l[1],isCompound:b,m1:a,m2:o,l1:n,l2:d},{dt:s,src:l[1],dst:l[0],isCompound:b,m1:a,m2:o,l1:n,l2:d}]),g&&(m({y:l[0]}),y&&v.active&&!v.boxActive&&I([{y:l,w1:[0,0,0],w2:[0,1,0],l1:n,l2:d},{y:l,w1:[0,1,0],w2:[0,0,1],l1:n,l2:d}])),g=!!p})});return E.then(()=>x.cancel()),{run:p,showPen:y,isCompound:b,needsDraw:g,frame:x}},inputs:["restart","zoomBox","m1","m2","l1","l2","simulate","pendulumType","regl","blit","update","dt","y","drawMap","mouseHover","drawPendulum","invalidation"],outputs:["run","showPen","isCompound","needsDraw","frame"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-78"),expanded:[],variables:[]},{id:78,body:(t,e)=>({colorType:t(e,"float")?"float":t(e,"half float")?"half float":"uint8"}),inputs:["canWriteToFBOOfType","regl"],outputs:["colorType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-58"),expanded:[],variables:[]},{id:58,body:(t,e,a,o)=>({y:function(){const d=[0,1].map(()=>t.framebuffer({colorType:e,radius:a,depth:!1,stencil:!1}));return o.then(()=>d.forEach(r=>r.destroy())),d}()}),inputs:["regl","colorType","radius","invalidation"],outputs:["y"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-113"),expanded:[],variables:[]},{id:113,body:t=>({blit:t({vert:`
    precision mediump float;
    attribute vec2 xy;
    void main () {
      gl_Position = vec4(xy, 0, 1);
    }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{resolution:a=>[a.framebufferWidth,a.framebufferHeight]},count:3,depth:{enable:!1}})}),inputs:["regl"],outputs:["blit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-151"),expanded:[],variables:[]},{id:151,body:t=>({initialize:t({frag:`
    precision highp float;
    uniform sampler2D colorscale;
    uniform vec2 resolution, omega0, center, scale;
    uniform bool isCompound;
    uniform float m1, m2, l1, l2;
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
        // Mass matrix from Lagrangian: p = M*theta_dot
        float cosTheta12 = cos(theta.x - theta.y);
        float m11 = ((m1 / 3.0) + m2) * l1 * l1;
        float m22 = (m2 / 3.0) * l2 * l2;
        float m12 = 0.5 * m2 * l1 * l2 * cosTheta12;
        velocity = vec2(
          m11 * omega0.x + m12 * omega0.y,
          m12 * omega0.x + m22 * omega0.y
        );
      } else {
        // For simple pendulum, also use generalized momenta
        // Mass matrix: p = M*theta_dot
        float cosTheta12 = cos(theta.x - theta.y);
        float m11 = (m1 + m2) * l1 * l1;
        float m22 = m2 * l2 * l2;
        float m12 = m2 * l1 * l2 * cosTheta12;
        velocity = vec2(
          m11 * omega0.x + m12 * omega0.y,
          m12 * omega0.x + m22 * omega0.y
        );
      }

      gl_FragColor = (vec4(theta, velocity) + PI) / (2.0 * PI);
    }`,uniforms:{omega0:(a,o)=>[o.omega0_0,o.omega0_1],center:(a,o)=>o.zoomBox.center.map(n=>n*.5/Math.PI),scale:(a,o)=>[o.zoomBox.scale[0]/(Math.PI*2),o.zoomBox.scale[1]/(Math.PI*2)],isCompound:(a,o)=>o.pendulumType==="Compound",m1:t.prop("m1"),m2:t.prop("m2"),l1:t.prop("l1"),l2:t.prop("l2")}})}),inputs:["regl"],outputs:["initialize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-176"),expanded:[],variables:[]},{id:176,body:t=>({update:t({frag:`
    precision highp float;
    uniform sampler2D y;
    uniform vec2 resolution;
    uniform float dt;
    uniform bool isCompound;
    uniform float m1, m2, l1, l2;
    #define PI ${Math.PI}
    #define g 1.0

    // Compound double pendulum (distributed mass)
    // State: (θ₁, θ₂, p_θ₁, p_θ₂) where p_θ are generalized momenta
    vec4 derivativeCompound (vec4 state) {
      vec2 theta = state.xy;
      vec2 pTheta = state.zw;
      float cosTheta12 = cos(theta.x - theta.y);

      // Mass matrix from Lagrangian formulation
      float m11 = ((m1 / 3.0) + m2) * l1 * l1;
      float m22 = (m2 / 3.0) * l2 * l2;
      float m12 = 0.5 * m2 * l1 * l2 * cosTheta12;

      // Invert mass matrix to get θ̇ from p (where p = M*θ̇)
      float det = m11 * m22 - m12 * m12;
      vec2 thetaDot = vec2(
        (m22 * pTheta.x - m12 * pTheta.y) / det,
        (m11 * pTheta.y - m12 * pTheta.x) / det
      );

      float thetaDot12sinTheta12 = thetaDot.x * thetaDot.y * sin(theta.x - theta.y);
      vec2 pThetaDot = vec2(
        -0.5 * m2 * l1 * l2 * thetaDot12sinTheta12 - 0.5 * (m1 + 2.0 * m2) * g * l1 * sin(theta.x),
         0.5 * m2 * l1 * l2 * thetaDot12sinTheta12 - 0.5 * m2 * g * l2 * sin(theta.y)
      );
      return vec4(thetaDot, pThetaDot);
    }

    // Simple double pendulum (point masses)
    // State: (θ₁, θ₂, p_θ₁, p_θ₂) where p_θ are generalized momenta
    vec4 derivativeSimple (vec4 state) {
      vec2 theta = state.xy;
      vec2 pTheta = state.zw;
      float cosTheta12 = cos(theta.x - theta.y);

      // Mass matrix for simple pendulum
      float m11 = (m1 + m2) * l1 * l1;
      float m22 = m2 * l2 * l2;
      float m12 = m2 * l1 * l2 * cosTheta12;

      // Invert mass matrix to get θ̇ from p
      float det = m11 * m22 - m12 * m12;
      vec2 thetaDot = vec2(
        (m22 * pTheta.x - m12 * pTheta.y) / det,
        (m11 * pTheta.y - m12 * pTheta.x) / det
      );

      // Momentum time derivatives
      float thetaDot12sinTheta12 = thetaDot.x * thetaDot.y * sin(theta.x - theta.y);
      vec2 pThetaDot = vec2(
        -m2 * l1 * l2 * thetaDot12sinTheta12 - (m1 + m2) * g * l1 * sin(theta.x),
         m2 * l1 * l2 * thetaDot12sinTheta12 - m2 * g * l2 * sin(theta.y)
      );

      return vec4(thetaDot, pThetaDot);
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
    }`,framebuffer:t.prop("dst"),uniforms:{y:t.prop("src"),dt:t.prop("dt"),isCompound:t.prop("isCompound"),m1:t.prop("m1"),m2:t.prop("m2"),l1:t.prop("l1"),l2:t.prop("l2")}})}),inputs:["regl"],outputs:["update"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-95"),expanded:[],variables:[]},{id:95,body:t=>({drawMap:t({frag:`
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
    }`,uniforms:{y:t.prop("y")}})}),inputs:["regl"],outputs:["drawMap"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-886"),expanded:[],variables:[]},{id:886,body:(t,e)=>({drawPendulum:t({vert:`
precision mediump float;
attribute vec2 line;
uniform vec2 resolution;
uniform vec3 w1, w2;
uniform vec2 hover;
uniform float lineWidth;
uniform sampler2D y;
uniform float l1, l2;
#define PI ${Math.PI}
void main () {
  // Sample the state directly from the texture by passing the hovered
  // point as a uniform, so that the data never leaves the GPU.
  vec2 state = texture2D(y, hover).xy * (2.0 * PI) - PI;

  // Vectors representing the directions of the arms of the pendulum (scaled by lengths)
  vec2 v1 = l1 * vec2(sin(state.x), -cos(state.x));
  vec2 v2 = l2 * vec2(sin(state.y), -cos(state.y));

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
    }`,attributes:{line:[.5,0,.5,1,-.5,0,-.5,1]},uniforms:{y:t.prop("y[0]"),w1:t.prop("w1"),w2:t.prop("w2"),hover:()=>e.pt,lineWidth:o=>4*o.pixelRatio/o.framebufferWidth,resolution:o=>[o.framebufferWidth,o.framebufferHeight],l1:t.prop("l1"),l2:t.prop("l2")},depth:{enable:!1},primitive:"triangle strip",count:4})}),inputs:["regl","mouseHover"],outputs:["drawPendulum"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-889"),expanded:[],variables:[]},{id:889,body:()=>({mouseHover:{pt:[0,0],active:!1,boxActive:!1}}),inputs:[],outputs:["mouseHover"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-619"),expanded:[],variables:[]},{id:619,body:(t,e,a,o,n,d,r,f)=>({zoomBox:t(function(){const _=a`<span></span>`,u={center:[0,0],scale:[Math.PI*2,Math.PI*2]},s=o._gl.canvas;let l={x:NaN,y:NaN},m={x:NaN,y:NaN},v=!1;function I(){_.dispatchEvent(new CustomEvent("input"))}function E(){u.center[0]=0,u.center[1]=0,u.scale[0]=Math.PI*2,u.scale[1]=Math.PI*2,I()}s.addEventListener("dblclick",E,!1);const p=document.getElementById("zoombox");p.style.position="absolute",p.style.border="1px solid rgba(0,0,0,0.6)",p.style.backgroundColor="rgba(255,255,255,0.2)",p.style.pointerEvents="none";function y(){p.style.left=`${Math.min(l.x,m.x)}px`,p.style.top=`${Math.min(l.y,m.y)}px`,p.style.width=`${Math.abs(m.x-l.x)}px`,p.style.height=`${Math.abs(m.y-l.y)}px`}function b(c){v=!0,l.x=c.offsetX,l.y=c.offsetY,m.x=c.offsetX,m.y=c.offsetY,s.setPointerCapture(c.pointerId),p.style.display="block",y(),n.boxActive=!0}function g(c){n.pt[0]=c.offsetX/d,n.pt[1]=1-c.offsetY/d,n.boxActive=!1,v&&(m.x=c.offsetX,m.y=c.offsetY,y(),n.boxActive=!0)}function x(c){if(p.style.display="none",v=!1,m.x=c.offsetX,m.y=c.offsetY,m.x===l.x||m.y===l.y)return;let P=u.center[0]-u.scale[0]*.5,M=u.center[0]+u.scale[0]*.5,k=u.center[1]-u.scale[1]*.5,B=u.center[1]+u.scale[1]*.5,L=.5*(l.x+m.x)/d,C=.5*(l.y+m.y)/d,D=Math.abs(m.x-l.x)/d,z=Math.abs(m.y-l.y)/d;u.center[0]=r(P,M,L),u.center[1]=r(k,B,C),u.scale[0]*=D,u.scale[1]*=z,s.releasePointerCapture(c.pointerId),y(),I(),n.boxActive=!1}function T(){n.active=!0}function $(){n.active=!1}return s.addEventListener("pointerdown",b,!1),s.addEventListener("pointermove",g,!1),s.addEventListener("pointerup",x,!1),s.addEventListener("pointerenter",T,!1),s.addEventListener("pointerleave",$,!1),f.then(()=>{s.addEventListener("dblclick",E,!1),s.removeEventListener("pointerdown",b),s.removeEventListener("pointermove",g),s.removeEventListener("pointerup",x),s.removeEventListener("pointerenter",T),s.removeEventListener("pointerleave",$)}),_.value=u,_}())}),inputs:["view","viz","html","regl","mouseHover","dimension","lerp","invalidation"],outputs:["zoomBox"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-901"),expanded:[],variables:[]},{id:901,body:async()=>(await w(()=>import("./twttr-CwAUCjW_.js"),[]),{twttr:window.twttr}),inputs:[],outputs:["twttr"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-903"),expanded:[],variables:[]},{id:903,body:t=>{function e(a,o){const n=document.createElement("DIV");return Promise.resolve().then(()=>t.widgets.createTweet(a,n,o)),n}return{tweet:e}},inputs:["twttr"],outputs:["tweet"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-766"),expanded:[],variables:[]},{id:766,body:t=>({dimension:t}),inputs:["width"],outputs:["dimension"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-82"),expanded:[],variables:[]},{id:82,body:(t,e)=>({radius:Math.floor(t*e)}),inputs:["dimension","pixelRatio"],outputs:["radius"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:()=>({pixelRatio:window.devicePixelRatio}),inputs:[],outputs:["pixelRatio"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-890"),expanded:[],variables:[]},{id:890,body:async()=>{const{default:t}=await w(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(e=>{if(!("default"in e))throw new SyntaxError("export 'default' not found");return e});return{createREGL:t}},inputs:[],outputs:["createREGL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-485"),expanded:[],variables:[]},{id:485,body:async(t,e)=>{const{canWriteToFBOOfType:a}=await w(()=>import("https://api.observablehq.com/@rreusser/regl-tools.js?v=4"),[]).then(o=>{const n={},d=t.module(o.default),r=t.module();if(!d.defines("canWriteToFBOOfType"))throw new SyntaxError("export 'canWriteToFBOOfType' not found");return r.variable(n.canWriteToFBOOfType=e()).import("canWriteToFBOOfType",d),n});return{canWriteToFBOOfType:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["canWriteToFBOOfType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-635"),expanded:[],variables:[]},{id:635,body:async(t,e)=>{const{rangeSlider:a}=await w(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(o=>{const n={},d=t.module(o.default),r=t.module();if(!d.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return r.variable(n.rangeSlider=e()).import("rangeSlider",d),n});return{rangeSlider:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["rangeSlider"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-791"),expanded:[],variables:[]},{id:791,body:()=>{function t(e,a,o){return e+o*(a-e)}return{lerp:t}},inputs:[],outputs:["lerp"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});i({root:document.getElementById("cell-908"),expanded:[],variables:[]},{id:908,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/simple-pendulum-diagram-D0VLgnsg.svg",import.meta.url).href).url()}" alt="Simple double pendulum diagram">
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});i({root:document.getElementById("cell-909"),expanded:[],variables:[]},{id:909,body:(t,e)=>t`Consider a double pendulum with point masses ${e`m_1`} and ${e`m_2`} at distances ${e`l_1`} and ${e`l_2`} from their respective pivots, with angles ${e`\theta_1`} and ${e`\theta_2`} measured from vertical (downward).

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

#### Generalized Momenta

The generalized momenta are:

${e.block`\begin{aligned}
p_{\theta_1} &= \frac{\partial L}{\partial \dot{\theta}_1} = (m_1 + m_2) l_1^2 \dot{\theta}_1 + m_2 l_1 l_2 \dot{\theta}_2 \cos(\theta_1 - \theta_2) \\
p_{\theta_2} &= \frac{\partial L}{\partial \dot{\theta}_2} = m_2 l_2^2 \dot{\theta}_2 + m_2 l_1 l_2 \dot{\theta}_1 \cos(\theta_1 - \theta_2)
\end{aligned}`}

In matrix form ${e`\mathbf{p} = M(\theta) \dot{\boldsymbol{\theta}}`} where:

${e.block`M = \begin{pmatrix}
(m_1 + m_2) l_1^2 & m_2 l_1 l_2 \cos(\theta_1 - \theta_2) \\
m_2 l_1 l_2 \cos(\theta_1 - \theta_2) & m_2 l_2^2
\end{pmatrix}`}

Inverting to get ${e`\dot{\boldsymbol{\theta}} = M^{-1} \mathbf{p}`} and computing ${e`\dot{\mathbf{p}} = \frac{\partial L}{\partial \boldsymbol{\theta}}`}:

${e.block`\begin{aligned}
\dot{p}_{\theta_1} &= -m_2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \sin(\theta_1 - \theta_2) - (m_1 + m_2) g l_1 \sin\theta_1 \\
\dot{p}_{\theta_2} &= m_2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \sin(\theta_1 - \theta_2) - m_2 g l_2 \sin\theta_2
\end{aligned}`}

As a first-order system with state ${e`\mathbf{y} = (\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2})^T`}:

${e.block`\frac{d\mathbf{y}}{dt} = \begin{pmatrix}
\dot{\theta}_1(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{\theta}_2(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{p}_{\theta_1}(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{p}_{\theta_2}(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2})
\end{pmatrix}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});i({root:document.getElementById("cell-911"),expanded:[],variables:[]},{id:911,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/compound-pendulum-diagram-1-nV_8qU.svg",import.meta.url).href).url()}" alt="Compound double pendulum diagram">
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});i({root:document.getElementById("cell-912"),expanded:[],variables:[]},{id:912,body:(t,e)=>t`For a compound pendulum, the mass is distributed along each arm. Consider uniform rods of lengths ${e`l_1`} and ${e`l_2`} with masses ${e`m_1`} and ${e`m_2`}, and moments of inertia ${e`I_1 = \frac{1}{3}m_1 l_1^2`} and ${e`I_2 = \frac{1}{3}m_2 l_2^2`} about their pivot points.

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

#### Generalized Momenta

The generalized momenta are:

${e.block`\begin{aligned}
p_{\theta_1} &= \frac{\partial L}{\partial \dot{\theta}_1} = \left(\frac{m_1}{3} + m_2\right) l_1^2 \dot{\theta}_1 + \frac{m_2}{2} l_1 l_2 \dot{\theta}_2 \cos(\theta_1 - \theta_2) \\
p_{\theta_2} &= \frac{\partial L}{\partial \dot{\theta}_2} = \frac{m_2}{3} l_2^2 \dot{\theta}_2 + \frac{m_2}{2} l_1 l_2 \dot{\theta}_1 \cos(\theta_1 - \theta_2)
\end{aligned}`}

In matrix form ${e`\mathbf{p} = M(\theta) \dot{\boldsymbol{\theta}}`} where:

${e.block`M = \begin{pmatrix}
\left(\frac{m_1}{3} + m_2\right) l_1^2 & \frac{m_2}{2} l_1 l_2 \cos(\theta_1 - \theta_2) \\
\frac{m_2}{2} l_1 l_2 \cos(\theta_1 - \theta_2) & \frac{m_2}{3} l_2^2
\end{pmatrix}`}

Inverting to get ${e`\dot{\boldsymbol{\theta}} = M^{-1} \mathbf{p}`} and computing ${e`\dot{\mathbf{p}} = \frac{\partial L}{\partial \boldsymbol{\theta}}`}:

${e.block`\begin{aligned}
\dot{p}_{\theta_1} &= -\frac{m_2}{2} l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \sin(\theta_1 - \theta_2) - \left(\frac{m_1}{2} + m_2\right) g l_1 \sin\theta_1 \\
\dot{p}_{\theta_2} &= \frac{m_2}{2} l_1 l_2 \dot{\theta}_1 \dot{\theta}_2 \sin(\theta_1 - \theta_2) - \frac{m_2}{2} g l_2 \sin\theta_2
\end{aligned}`}

As a first-order system with state ${e`\mathbf{y} = (\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2})^T`}:

${e.block`\frac{d\mathbf{y}}{dt} = \begin{pmatrix}
\dot{\theta}_1(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{\theta}_2(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{p}_{\theta_1}(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2}) \\
\dot{p}_{\theta_2}(\theta_1, \theta_2, p_{\theta_1}, p_{\theta_2})
\end{pmatrix}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});
