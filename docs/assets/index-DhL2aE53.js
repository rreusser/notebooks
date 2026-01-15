import{d as l,_ as w}from"./index-ByB2dbry.js";l({root:document.getElementById("cell-530"),expanded:[],variables:[]},{id:530,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/compound-pendulum-diagram-1-nV_8qU.svg",import.meta.url).href).url()}" alt="Compound double pendulum diagram">
<figcaption>A compound double pendulum with mass distributed along the length of each arm.</figcaption>
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});l({root:document.getElementById("cell-526"),expanded:[],variables:[]},{id:526,body:t=>t("1392357775666159618"),inputs:["tweet"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-610"),expanded:[],variables:[]},{id:610,body:(t,e,n)=>{t==="half float"&&e(n`<p style="color:#a00">Warning! This simulation is using half-float precision and as a result won't be accurate. Try a device which supports the floating point WebGL textures for better results.</p>`)},inputs:["colorType","display","html"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-571"),expanded:[],variables:[]},{id:571,body:(t,e)=>({pendulumType:t(e.radio(["Simple","Compound"],{label:"Pendulum type",value:"Compound"}))}),inputs:["view","Inputs"],outputs:["pendulumType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-289"),expanded:[],variables:[]},{id:289,body:(t,e,n,a,o,d,i,r,u,m,_,c,p,y,v,E,I,h,g,f)=>{const b=t`<figure>
  ${e.element}
  <figcaption>Hover to view pendulum. Scroll to zoom, drag to pan.</figcaption>
</figure>`;return n(a(b,{width:Math.min(o,640),height:Math.min(o,640),toggleOffset:[-6,-33],onResize(T,M,x){e.resize(M,x),d.updateScales(e.elements.plot.scale("x"),e.elements.plot.scale("y"));const s=i(d.xDomain,d.yDomain,M,x);r.x[0]=s.x[0],r.x[1]=s.x[1],r.y[0]=s.y[0],r.y[1]=s.y[1],u(M,x),m.poll(),_[0].use(()=>c(()=>{p({omega0_0:y,omega0_1:v,pendulumType:E,m1:I,m2:h,l1:g,l2:f,debugCheckerboard:!1})})),m.dirty=!0}})),{figure:b}},inputs:["html","stack","display","expandable","width","axes","computeTextureDomain","textureDomain","resizeFBOs","regl","y","blit","initialize","omega0_0","omega0_1","pendulumType","m1","m2","l1","l2"],outputs:["figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-917"),expanded:[],variables:[]},{id:917,body:(t,e)=>({simulate:t(e.checkbox(["Simulate","Show pendulum at point under mouse"],{value:["Simulate","Show pendulum at point under mouse"]}))}),inputs:["view","Inputs"],outputs:["simulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-916"),expanded:[],variables:[]},{id:916,body:(t,e)=>({restart:t(e.button("Restart"))}),inputs:["view","Inputs"],outputs:["restart"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-918"),expanded:[],variables:[]},{id:918,body:(t,e)=>({resetView:t(e.button("Reset View"))}),inputs:["view","Inputs"],outputs:["resetView"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-914"),expanded:[],variables:[]},{id:914,body:(t,e)=>{const n=t(e.range([.1,1],{label:"Mass 1 (m₁)",value:1,step:.01,transform:Math.log})),a=t(e.range([.1,1],{label:"Mass 2 (m₂)",value:1,step:.01,transform:Math.log})),o=t(e.range([.1,1],{label:"Length 1 (l₁)",value:1,step:.01,transform:Math.log})),d=t(e.range([.1,1],{label:"Length 2 (l₂)",value:1,step:.01,transform:Math.log})),i=t(e.range([-2,2],{label:"Initial angular velocity of arm 1",value:0})),r=t(e.range([-2,2],{label:"Initial angular velocity of arm 2",value:0})),u=t(e.range([.001,.1],{label:"Time step",value:.03,transform:Math.log}));return{m1:n,m2:a,l1:o,l2:d,omega0_0:i,omega0_1:r,dt:u}},inputs:["view","Inputs"],outputs:["m1","m2","l1","l2","omega0_0","omega0_1","dt"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-919"),expanded:[],variables:[]},{id:919,body:t=>{function e(n,a,o=[-Math.PI,Math.PI],d=[-Math.PI,Math.PI]){return t.plot({width:n,height:a,marginTop:20,marginRight:10,marginLeft:50,marginBottom:40,style:{backgroundColor:"transparent",maxWidth:"none",position:"absolute"},x:{domain:o,tickSpacing:80,label:"θ₁",labelAnchor:"center"},y:{domain:d,tickSpacing:80,label:"θ₂",labelAnchor:"center"},marks:[]})}return{createPlot:e}},inputs:["Plot"],outputs:["createPlot"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-920"),expanded:[],variables:[]},{id:920,body:(t,e,n,a,o)=>({stack:t({layers:[{id:"regl",element:e(n,{optionalExtensions:["OES_texture_half_float","OES_texture_float","OES_texture_float_linear","OES_texture_half_float_linear","ANGLE_instanced_arrays"],attributes:{antialias:!0,alpha:!1,depthStencil:!1,preserveDrawingBuffer:!0}})},{id:"plot",element:({width:i,height:r})=>a(i,r)},{id:"svg",element:({current:i,width:r,height:u})=>(i?o.select(i):o.create("svg")).attr("width",r).attr("height",u).style("position","absolute").node()}]})}),inputs:["createElementStack","reglElement","createREGL","createPlot","d3"],outputs:["stack"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:t=>({regl:t.elements.regl.value}),inputs:["stack"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-921"),expanded:[],variables:[]},{id:921,body:(t,e,n,a,o,d,i,r,u,m,_,c,p,y,v,E,I)=>{let h=null;const g={x:[-Math.PI,Math.PI],y:[-Math.PI,Math.PI]},f={top:20,right:10,bottom:40,left:50};function b(s,P,D,S){const $=D-f.left-f.right,k=S-f.top-f.bottom,B=(s[1]-s[0])/$,C=(P[1]-P[0])/k;return{x:[s[0]-f.left*B,s[1]+f.right*B],y:[P[0]-f.bottom*C,P[1]+f.top*C]}}function T(){const s=b(x.xDomain,x.yDomain,t.width,t.height);e.x[0]=s.x[0],e.x[1]=s.x[1],e.y[0]=s.y[0],e.y[1]=s.y[1],n(t.width,t.height),a.poll(),o[0].use(()=>d(()=>{i({omega0_0:r,omega0_1:u,pendulumType:m,m1:_,m2:c,l1:p,l2:y,debugCheckerboard:!1})})),a.dirty=!0}function M(){const s=b(g.x,g.y,t.width,t.height);e.x[0]=s.x[0],e.x[1]=s.x[1],e.y[0]=s.y[0],e.y[1]=s.y[1],x.reset()}const x=v({d3:E,element:t.elements.svg,xScale:t.elements.plot.scale("x"),yScale:t.elements.plot.scale("y"),aspectRatio:1,onChange:({xDomain:s,yDomain:P})=>{a.dirty=!0;const D=I(t.width,t.height,s,P);t.elements.plot.replaceWith(D),t.elements.plot=D,t.dispatchEvent(new CustomEvent("update")),clearTimeout(h),h=setTimeout(T,300)}});return{reinitTimeout:h,baselineDomain:g,margins:f,computeTextureDomain:b,reinitialize:T,resetToBaseline:M,axes:x}},inputs:["stack","textureDomain","resizeFBOs","regl","y","blit","initialize","omega0_0","omega0_1","pendulumType","m1","m2","l1","l2","createZoomableAxes","d3","createPlot"],outputs:["reinitTimeout","baselineDomain","margins","computeTextureDomain","reinitialize","resetToBaseline","axes"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-922"),expanded:[],variables:[]},{id:922,body:(t,e)=>{t>0&&e()},inputs:["resetView","resetToBaseline"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-158"),expanded:[],variables:[]},{id:158,body:(t,e,n,a,o,d,i,r,u,m,_,c,p,y,v,E,I)=>{const h=n(a.xDomain,a.yDomain,o.width,o.height);return d.x[0]=h.x[0],d.x[1]=h.x[1],d.y[0]=h.y[0],d.y[1]=h.y[1],i(o.width,o.height),r.poll(),u[0].use(()=>m(()=>{_({omega0_0:c,omega0_1:p,pendulumType:e,m1:y,m2:v,l1:E,l2:I,debugCheckerboard:!1})})),{extended:h,initialized:!0}},inputs:["restart","pendulumType","computeTextureDomain","axes","stack","textureDomain","resizeFBOs","regl","y","blit","initialize","omega0_0","omega0_1","m1","m2","l1","l2"],outputs:["extended","initialized"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:(t,e,n,a,o,d,i,r,u,m,_,c,p,y,v,E,I)=>{const g=~i.indexOf("Simulate"),f=~i.indexOf("Show pendulum at point under mouse"),b=r==="Compound";u.dirty=!0;const T=u.frame(()=>{m(()=>{(u.dirty||g)&&u.clear({color:[1,1,1,1]}),g&&_([{dt:c,src:p[0],dst:p[1],isCompound:b,m1:n,m2:a,l1:o,l2:d},{dt:c,src:p[1],dst:p[0],isCompound:b,m1:n,m2:a,l1:o,l2:d}]),(u.dirty||g)&&(y(),f&&v.active&&E([{y:p,w1:[0,0,0],w2:[0,1,0],l1:o,l2:d},{y:p,w1:[0,1,0],w2:[0,0,1],l1:o,l2:d}]),u.dirty=!1)})});return I.then(()=>T.cancel()),{DEBUG_CHECKERBOARD:!1,run:g,showPen:f,isCompound:b,frame:T}},inputs:["initialized","restart","m1","m2","l1","l2","simulate","pendulumType","regl","blit","update","dt","y","drawMap","mouseHover","drawPendulum","invalidation"],outputs:["DEBUG_CHECKERBOARD","run","showPen","isCompound","frame"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-78"),expanded:[],variables:[]},{id:78,body:(t,e)=>({colorType:t(e,"float")?"float":t(e,"half float")?"half float":"uint8"}),inputs:["canWriteToFBOOfType","regl"],outputs:["colorType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-923"),expanded:[],variables:[]},{id:923,body:()=>({textureDomain:{x:[-Math.PI,Math.PI],y:[-Math.PI,Math.PI]}}),inputs:[],outputs:["textureDomain"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-58"),expanded:[],variables:[]},{id:58,body:(t,e,n,a,o)=>{const d=Math.round(t.width*e),i=Math.round(t.height*e),r=n==="float"&&a.hasExtension("OES_texture_float_linear")||n==="half float"&&a.hasExtension("OES_texture_half_float_linear")||n==="uint8",u="nearest",m=function(){const c=[0,1].map(()=>a.framebuffer({color:a.texture({width:d,height:i,type:n,wrap:"clamp",min:u,mag:u}),depth:!1,stencil:!1}));return o.then(()=>c.forEach(p=>p.destroy())),c}();function _(c,p){const y=Math.round(c*e),v=Math.round(p*e);(m[0].width!==y||m[0].height!==v)&&(m[0].resize(y,v),m[1].resize(y,v))}return{initialWidth:d,initialHeight:i,supportsLinearFilter:r,filterMode:u,y:m,resizeFBOs:_}},inputs:["stack","pixelRatio","colorType","regl","invalidation"],outputs:["initialWidth","initialHeight","supportsLinearFilter","filterMode","y","resizeFBOs"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-113"),expanded:[],variables:[]},{id:113,body:t=>({blit:t({vert:`
    precision mediump float;
    attribute vec2 xy;
    void main () {
      gl_Position = vec4(xy, 0, 1);
    }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{resolution:n=>[n.framebufferWidth,n.framebufferHeight]},count:3,depth:{enable:!1}})}),inputs:["regl"],outputs:["blit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-151"),expanded:[],variables:[]},{id:151,body:(t,e)=>({initialize:t({frag:`
    precision highp float;
    uniform vec2 resolution, omega0;
    uniform vec4 texDomain; // xMin, xMax, yMin, yMax - the domain this texture represents
    uniform bool isCompound;
    uniform float m1, m2, l1, l2;
    uniform bool debugCheckerboard;
    #define PI ${Math.PI}
    void main () {
      // DEBUG: Output checkerboard pattern to verify texture sizing
      // Each checker is 8x8 texture pixels - should appear as perfect squares if 1:1
      if (debugCheckerboard) {
        float checker = mod(floor(gl_FragCoord.x / 8.0) + floor(gl_FragCoord.y / 8.0), 2.0);
        gl_FragColor = vec4(vec3(checker), 1.0);
        return;
      }

      // UV position in texture [0, 1]
      vec2 uv = gl_FragCoord.xy / resolution;

      // Map UV to world coordinates (theta values) based on textureDomain
      vec2 theta = vec2(
        mix(texDomain.x, texDomain.y, uv.x),
        mix(texDomain.z, texDomain.w, uv.y)
      );

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

      // Store normalized: map [-PI, PI] to [0, 1]
      gl_FragColor = (vec4(theta, velocity) + PI) / (2.0 * PI);
    }`,uniforms:{resolution:a=>[a.framebufferWidth,a.framebufferHeight],omega0:(a,o)=>[o.omega0_0,o.omega0_1],texDomain:()=>[e.x[0],e.x[1],e.y[0],e.y[1]],isCompound:(a,o)=>o.pendulumType==="Compound",debugCheckerboard:t.prop("debugCheckerboard"),m1:t.prop("m1"),m2:t.prop("m2"),l1:t.prop("l1"),l2:t.prop("l2")}})}),inputs:["regl","textureDomain"],outputs:["initialize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-176"),expanded:[],variables:[]},{id:176,body:t=>({update:t({frag:`
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
    }`,framebuffer:t.prop("dst"),uniforms:{y:t.prop("src"),resolution:n=>[n.framebufferWidth,n.framebufferHeight],dt:t.prop("dt"),isCompound:t.prop("isCompound"),m1:t.prop("m1"),m2:t.prop("m2"),l1:t.prop("l1"),l2:t.prop("l2")}})}),inputs:["regl"],outputs:["update"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-95"),expanded:[],variables:[]},{id:95,body:(t,e,n,a,o)=>({drawMap:t({frag:`
    precision highp float;
    uniform sampler2D colorscale, y;
    uniform vec4 axesViewport; // x, y, width, height in pixels
    uniform vec4 viewDomain;   // current view: xMin, xMax, yMin, yMax
    uniform vec4 texDomain;    // texture domain: xMin, xMax, yMin, yMax
    uniform bool debugPassthrough;
    #define PI ${Math.PI}
    #define TWOPI ${2*Math.PI}

    vec3 colormap(vec2 uv) {
      uv *= TWOPI;
      return pow(0.5 + 0.5 * vec3(sin(uv.x) * vec2(-cos(uv.y), sin(uv.y)), -cos(uv.x)), vec3(0.75));
    }

    void main () {
      // Map from viewport pixel to normalized position [0,1] within viewport
      vec2 viewportUV = (gl_FragCoord.xy - axesViewport.xy) / axesViewport.zw;

      // Ephemeral transform: map viewportUV to textureUV
      // textureUV = offset + viewportUV * scale
      vec2 viewSize = vec2(viewDomain.y - viewDomain.x, viewDomain.w - viewDomain.z);
      vec2 texSize = vec2(texDomain.y - texDomain.x, texDomain.w - texDomain.z);
      vec2 scale = viewSize / texSize;
      vec2 offset = vec2(viewDomain.x - texDomain.x, viewDomain.z - texDomain.z) / texSize;
      vec2 uv = offset + viewportUV * scale;

      // Check if UV is outside texture bounds - show solid color
      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        gl_FragColor = vec4(0.95, 0.95, 0.95, 1.0); // Light gray for out of bounds
        return;
      }

      // Sample the state at this pixel
      vec4 state = texture2D(y, uv);

      // DEBUG: Pass through raw texture value for checkerboard testing
      if (debugPassthrough) {
        gl_FragColor = vec4(state.rgb, 1.0);
        return;
      }

      // Color it by the projection of the 4D state to 2D (theta1, theta2):
      gl_FragColor = vec4(colormap(state.xy), 1);
    }`,uniforms:{y:()=>e[0],axesViewport:i=>{const r=n(a)(i);return[r.x,r.y,r.width,r.height]},viewDomain:()=>[a.xDomain[0],a.xDomain[1],a.yDomain[0],a.yDomain[1]],texDomain:()=>[o.x[0],o.x[1],o.y[0],o.y[1]],debugPassthrough:!1},scissor:{enable:!0,box:n(a)},viewport:n(a)})}),inputs:["regl","y","reglAxesViewport","axes","textureDomain"],outputs:["drawMap"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-886"),expanded:[],variables:[]},{id:886,body:(t,e,n,a)=>({drawPendulum:t({vert:`
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

  // No aspect correction needed - we use a square viewport for the pendulum

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
    }`,attributes:{line:[.5,0,.5,1,-.5,0,-.5,1]},uniforms:{y:t.prop("y[0]"),w1:t.prop("w1"),w2:t.prop("w2"),hover:()=>e.pt,lineWidth:d=>4*d.pixelRatio/d.viewportWidth,resolution:d=>[d.framebufferWidth,d.framebufferHeight],l1:t.prop("l1"),l2:t.prop("l2")},depth:{enable:!1},scissor:{enable:!0,box:n(a)},viewport:d=>{const i=n(a)(d),r=Math.min(i.width,i.height);return{x:i.x+(i.width-r)/2,y:i.y+(i.height-r)/2,width:r,height:r}},primitive:"triangle strip",count:4})}),inputs:["regl","mouseHover","reglAxesViewport","axes"],outputs:["drawPendulum"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-889"),expanded:[],variables:[]},{id:889,body:(t,e,n)=>{const a={pt:[0,0],active:!1},o=t.elements.svg;function d(u){const m=o.getBoundingClientRect(),_=(u.clientX-m.left)/m.width,c=1-(u.clientY-m.top)/m.height;a.pt[0]=_,a.pt[1]=c,e.dirty=!0}function i(){a.active=!0,e.dirty=!0}function r(){a.active=!1,e.dirty=!0}return o.addEventListener("pointermove",d,!1),o.addEventListener("pointerenter",i,!1),o.addEventListener("pointerleave",r,!1),n.then(()=>{o.removeEventListener("pointermove",d),o.removeEventListener("pointerenter",i),o.removeEventListener("pointerleave",r)}),{mouseHover:a,canvas:o,onPointerMove:d,onPointerEnter:i,onPointerLeave:r}},inputs:["stack","regl","invalidation"],outputs:["mouseHover","canvas","onPointerMove","onPointerEnter","onPointerLeave"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-901"),expanded:[],variables:[]},{id:901,body:async()=>(await w(()=>import("./twttr-CwAUCjW_.js"),[]),{twttr:window.twttr}),inputs:[],outputs:["twttr"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-903"),expanded:[],variables:[]},{id:903,body:t=>{function e(n,a){const o=document.createElement("DIV");return Promise.resolve().then(()=>t.widgets.createTweet(n,o,a)),o}return{tweet:e}},inputs:["twttr"],outputs:["tweet"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:()=>({pixelRatio:window.devicePixelRatio}),inputs:[],outputs:["pixelRatio"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-890"),expanded:[],variables:[]},{id:890,body:async()=>{const[{default:t},{createElementStack:e},{reglElement:n,reglAxesViewport:a},{createZoomableAxes:o},{expandable:d}]=await Promise.all([w(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(i=>{if(!("default"in i))throw new SyntaxError("export 'default' not found");return i}),w(()=>import("./element-stack-U6qmxFVc.js"),[]).then(i=>{if(!("createElementStack"in i))throw new SyntaxError("export 'createElementStack' not found");return i}),w(()=>import("./regl-canvas-Cs3pLjCJ.js"),[]).then(i=>{if(!("reglElement"in i))throw new SyntaxError("export 'reglElement' not found");if(!("reglAxesViewport"in i))throw new SyntaxError("export 'reglAxesViewport' not found");return i}),w(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(i=>{if(!("createZoomableAxes"in i))throw new SyntaxError("export 'createZoomableAxes' not found");return i}),w(()=>import("./expandable-CXgdZO_P.js"),[]).then(i=>{if(!("expandable"in i))throw new SyntaxError("export 'expandable' not found");return i})]);return{createREGL:t,createElementStack:e,reglElement:n,reglAxesViewport:a,createZoomableAxes:o,expandable:d}},inputs:[],outputs:["createREGL","createElementStack","reglElement","reglAxesViewport","createZoomableAxes","expandable"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-485"),expanded:[],variables:[]},{id:485,body:async(t,e)=>{const{canWriteToFBOOfType:n}=await w(()=>import("https://api.observablehq.com/@rreusser/regl-tools.js?v=4"),[]).then(a=>{const o={},d=t.module(a.default),i=t.module();if(!d.defines("canWriteToFBOOfType"))throw new SyntaxError("export 'canWriteToFBOOfType' not found");return i.variable(o.canWriteToFBOOfType=e()).import("canWriteToFBOOfType",d),o});return{canWriteToFBOOfType:n}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["canWriteToFBOOfType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-635"),expanded:[],variables:[]},{id:635,body:async(t,e)=>{const{rangeSlider:n}=await w(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(a=>{const o={},d=t.module(a.default),i=t.module();if(!d.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return i.variable(o.rangeSlider=e()).import("rangeSlider",d),o});return{rangeSlider:n}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["rangeSlider"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-791"),expanded:[],variables:[]},{id:791,body:()=>{function t(e,n,a){return e+a*(n-e)}return{lerp:t}},inputs:[],outputs:["lerp"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-908"),expanded:[],variables:[]},{id:908,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/simple-pendulum-diagram-D0VLgnsg.svg",import.meta.url).href).url()}" alt="Simple double pendulum diagram">
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});l({root:document.getElementById("cell-909"),expanded:[],variables:[]},{id:909,body:(t,e)=>t`Consider a double pendulum with point masses ${e`m_1`} and ${e`m_2`} at distances ${e`l_1`} and ${e`l_2`} from their respective pivots, with angles ${e`\theta_1`} and ${e`\theta_2`} measured from vertical (downward).

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
\end{pmatrix}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-911"),expanded:[],variables:[]},{id:911,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/compound-pendulum-diagram-1-nV_8qU.svg",import.meta.url).href).url()}" alt="Compound double pendulum diagram">
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});l({root:document.getElementById("cell-912"),expanded:[],variables:[]},{id:912,body:(t,e)=>t`For a compound pendulum, the mass is distributed along each arm. Consider uniform rods of lengths ${e`l_1`} and ${e`l_2`} with masses ${e`m_1`} and ${e`m_2`}, and moments of inertia ${e`I_1 = \frac{1}{3}m_1 l_1^2`} and ${e`I_2 = \frac{1}{3}m_2 l_2^2`} about their pivot points.

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
