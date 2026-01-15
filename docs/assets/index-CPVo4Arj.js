import{d as l,_ as w}from"./index-ByB2dbry.js";l({root:document.getElementById("cell-530"),expanded:[],variables:[]},{id:530,body:async function(t,e){return t`<figure style="text-align: center;">
<img width="350" src="${await e(new URL("/notebooks/assets/compound-pendulum-diagram-1-nV_8qU.svg",import.meta.url).href).url()}" alt="Compound double pendulum diagram">
<figcaption>A compound double pendulum with mass distributed along the length of each arm.</figcaption>
</figure>`},inputs:["html","FileAttachment"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});l({root:document.getElementById("cell-526"),expanded:[],variables:[]},{id:526,body:t=>t("1392357775666159618"),inputs:["tweet"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-610"),expanded:[],variables:[]},{id:610,body:(t,e,a)=>{t==="half float"&&e(a`<p style="color:#a00">Warning! This simulation is using half-float precision and as a result won't be accurate. Try a device which supports the floating point WebGL textures for better results.</p>`)},inputs:["colorType","display","html"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-571"),expanded:[],variables:[]},{id:571,body:(t,e)=>({pendulumType:t(e.radio(["Simple","Compound"],{label:"Pendulum type",value:"Compound"}))}),inputs:["view","Inputs"],outputs:["pendulumType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-289"),expanded:[],variables:[]},{id:289,body:(t,e,a,n,o,d,u,i,p,c,_,s,r,m,h,x,P,g,y,v)=>{const b=t`<figure>
  ${e.element}
  <figcaption>Hover to view pendulum. Scroll to zoom, drag to pan.</figcaption>
</figure>`;return a(n(b,{width:Math.min(o,640),height:Math.min(o,640),toggleOffset:[-6,-33],onResize(I,D,E){e.resize(D,E),d.updateScales(e.elements.plot.scale("x"),e.elements.plot.scale("y"));const f=u(d.xDomain,d.yDomain,D,E);i.x[0]=f.x[0],i.x[1]=f.x[1],i.y[0]=f.y[0],i.y[1]=f.y[1],p(D,E),c.poll(),_[0].use(()=>s(()=>{r({omega0_0:m,omega0_1:h,pendulumType:x,m1:P,m2:g,l1:y,l2:v,debugCheckerboard:!1})})),c.dirty=!0}})),{figure:b}},inputs:["html","stack","display","expandable","width","axes","computeTextureDomain","textureDomain","resizeFBOs","regl","y","blit","initialize","omega0_0","omega0_1","pendulumType","m1","m2","l1","l2"],outputs:["figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-917"),expanded:[],variables:[]},{id:917,body:(t,e)=>({simulate:t(e.checkbox(["Simulate","Show pendulum at point under mouse"],{value:["Simulate","Show pendulum at point under mouse"]}))}),inputs:["view","Inputs"],outputs:["simulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-916"),expanded:[],variables:[]},{id:916,body:(t,e)=>({restart:t(e.button("Restart"))}),inputs:["view","Inputs"],outputs:["restart"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-918"),expanded:[],variables:[]},{id:918,body:(t,e)=>({resetView:t(e.button("Reset View"))}),inputs:["view","Inputs"],outputs:["resetView"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-914"),expanded:[],variables:[]},{id:914,body:(t,e)=>{const a=t(e.range([.1,1],{label:"Mass 1 (m₁)",value:1,step:.01,transform:Math.log})),n=t(e.range([.1,1],{label:"Mass 2 (m₂)",value:1,step:.01,transform:Math.log})),o=t(e.range([.1,1],{label:"Length 1 (l₁)",value:1,step:.01,transform:Math.log})),d=t(e.range([.1,1],{label:"Length 2 (l₂)",value:1,step:.01,transform:Math.log})),u=t(e.range([-2,2],{label:"Initial angular velocity of arm 1",value:0})),i=t(e.range([-2,2],{label:"Initial angular velocity of arm 2",value:0})),p=t(e.range([.001,.1],{label:"Time step",value:.03,transform:Math.log}));return{m1:a,m2:n,l1:o,l2:d,omega0_0:u,omega0_1:i,dt:p}},inputs:["view","Inputs"],outputs:["m1","m2","l1","l2","omega0_0","omega0_1","dt"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-919"),expanded:[],variables:[]},{id:919,body:t=>{function e(a,n,o=[-Math.PI,Math.PI],d=[-Math.PI,Math.PI]){return t.plot({width:a,height:n,marginTop:20,marginRight:10,marginLeft:50,marginBottom:40,style:{backgroundColor:"transparent",maxWidth:"none",position:"absolute"},x:{domain:o,tickSpacing:80,label:"θ₁",labelAnchor:"center"},y:{domain:d,tickSpacing:80,label:"θ₂",labelAnchor:"center"},marks:[]})}return{createPlot:e}},inputs:["Plot"],outputs:["createPlot"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-920"),expanded:[],variables:[]},{id:920,body:(t,e,a,n,o)=>({stack:t({layers:[{id:"regl",element:e(a,{optionalExtensions:["OES_texture_half_float","OES_texture_float","OES_texture_float_linear","OES_texture_half_float_linear","ANGLE_instanced_arrays"],attributes:{antialias:!0,alpha:!1,depthStencil:!1,preserveDrawingBuffer:!0}})},{id:"plot",element:({width:u,height:i})=>n(u,i)},{id:"svg",element:({current:u,width:i,height:p})=>(u?o.select(u):o.create("svg")).attr("width",i).attr("height",p).style("position","absolute").node()}]})}),inputs:["createElementStack","reglElement","createREGL","createPlot","d3"],outputs:["stack"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:t=>({regl:t.elements.regl.value}),inputs:["stack"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-921"),expanded:[],variables:[]},{id:921,body:(t,e,a,n,o,d,u,i,p,c,_,s,r,m,h,x,P)=>{let g=null;const y={x:[-Math.PI,Math.PI],y:[-Math.PI,Math.PI]},v={top:20,right:10,bottom:40,left:50};function b(f,T,C,B){const k=C-v.left-v.right,z=B-v.top-v.bottom,S=(f[1]-f[0])/k,M=(T[1]-T[0])/z;return{x:[f[0]-v.left*S,f[1]+v.right*S],y:[T[0]-v.bottom*M,T[1]+v.top*M]}}function I(){const f=b(E.xDomain,E.yDomain,t.width,t.height);e.x[0]=f.x[0],e.x[1]=f.x[1],e.y[0]=f.y[0],e.y[1]=f.y[1],a(t.width,t.height),n.poll(),o[0].use(()=>d(()=>{u({omega0_0:i,omega0_1:p,pendulumType:c,m1:_,m2:s,l1:r,l2:m,debugCheckerboard:!1})})),n.dirty=!0}function D(){const f=b(y.x,y.y,t.width,t.height);e.x[0]=f.x[0],e.x[1]=f.x[1],e.y[0]=f.y[0],e.y[1]=f.y[1],E.reset()}const E=h({d3:x,element:t.elements.svg,xScale:t.elements.plot.scale("x"),yScale:t.elements.plot.scale("y"),aspectRatio:1,scaleExtent:[.1,1e3],onChange:({xDomain:f,yDomain:T})=>{n.dirty=!0;const C=P(t.width,t.height,f,T);t.elements.plot.replaceWith(C),t.elements.plot=C,t.dispatchEvent(new CustomEvent("update")),clearTimeout(g),g=setTimeout(I,300)}});return{reinitTimeout:g,baselineDomain:y,margins:v,computeTextureDomain:b,reinitialize:I,resetToBaseline:D,axes:E}},inputs:["stack","textureDomain","resizeFBOs","regl","y","blit","initialize","omega0_0","omega0_1","pendulumType","m1","m2","l1","l2","createZoomableAxes","d3","createPlot"],outputs:["reinitTimeout","baselineDomain","margins","computeTextureDomain","reinitialize","resetToBaseline","axes"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-922"),expanded:[],variables:[]},{id:922,body:(t,e)=>{t>0&&e()},inputs:["resetView","resetToBaseline"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-158"),expanded:[],variables:[]},{id:158,body:(t,e,a,n,o,d,u,i,p,c,_,s,r,m,h,x,P)=>{const g=a(n.xDomain,n.yDomain,o.width,o.height);return d.x[0]=g.x[0],d.x[1]=g.x[1],d.y[0]=g.y[0],d.y[1]=g.y[1],u(o.width,o.height),i.poll(),p[0].use(()=>c(()=>{_({omega0_0:s,omega0_1:r,pendulumType:e,m1:m,m2:h,l1:x,l2:P,debugCheckerboard:!1})})),{extended:g,initialized:!0}},inputs:["restart","pendulumType","computeTextureDomain","axes","stack","textureDomain","resizeFBOs","regl","y","blit","initialize","omega0_0","omega0_1","m1","m2","l1","l2"],outputs:["extended","initialized"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:(t,e,a,n,o,d,u,i,p,c,_,s,r,m,h,x,P)=>{const y=~u.indexOf("Simulate"),v=~u.indexOf("Show pendulum at point under mouse"),b=i==="Compound";p.dirty=!0;const I=p.frame(()=>{c(()=>{(p.dirty||y)&&p.clear({color:[1,1,1,1]}),y&&_([{dt:s,src:r[0],dst:r[1],isCompound:b,m1:a,m2:n,l1:o,l2:d},{dt:s,src:r[1],dst:r[0],isCompound:b,m1:a,m2:n,l1:o,l2:d}]),(p.dirty||y)&&(m(),v&&h.active&&x({state:r[0],l1:o,l2:d,isCompound:b}),p.dirty=!1)})});return P.then(()=>I.cancel()),{DEBUG_CHECKERBOARD:!1,run:y,showPen:v,isCompound:b,frame:I}},inputs:["initialized","restart","m1","m2","l1","l2","simulate","pendulumType","regl","blit","update","dt","y","drawMap","mouseHover","drawPendulum","invalidation"],outputs:["DEBUG_CHECKERBOARD","run","showPen","isCompound","frame"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-78"),expanded:[],variables:[]},{id:78,body:(t,e)=>({colorType:t(e,"float")?"float":t(e,"half float")?"half float":"uint8"}),inputs:["canWriteToFBOOfType","regl"],outputs:["colorType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-923"),expanded:[],variables:[]},{id:923,body:()=>({textureDomain:{x:[-Math.PI,Math.PI],y:[-Math.PI,Math.PI]}}),inputs:[],outputs:["textureDomain"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-58"),expanded:[],variables:[]},{id:58,body:(t,e,a,n,o)=>{const d=Math.round(t.width*e),u=Math.round(t.height*e),i=a==="float"&&n.hasExtension("OES_texture_float_linear")||a==="half float"&&n.hasExtension("OES_texture_half_float_linear")||a==="uint8",p="nearest",c=function(){const s=[0,1].map(()=>n.framebuffer({color:n.texture({width:d,height:u,type:a,wrap:"clamp",min:p,mag:p}),depth:!1,stencil:!1}));return o.then(()=>s.forEach(r=>r.destroy())),s}();function _(s,r){const m=Math.round(s*e),h=Math.round(r*e);(c[0].width!==m||c[0].height!==h)&&(c[0].resize(m,h),c[1].resize(m,h))}return{initialWidth:d,initialHeight:u,supportsLinearFilter:i,filterMode:p,y:c,resizeFBOs:_}},inputs:["stack","pixelRatio","colorType","regl","invalidation"],outputs:["initialWidth","initialHeight","supportsLinearFilter","filterMode","y","resizeFBOs"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-113"),expanded:[],variables:[]},{id:113,body:t=>({blit:t({vert:`
    precision mediump float;
    attribute vec2 xy;
    void main () {
      gl_Position = vec4(xy, 0, 1);
    }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{resolution:a=>[a.framebufferWidth,a.framebufferHeight]},count:3,depth:{enable:!1}})}),inputs:["regl"],outputs:["blit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-151"),expanded:[],variables:[]},{id:151,body:(t,e)=>({initialize:t({frag:`
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
    }`,uniforms:{resolution:n=>[n.framebufferWidth,n.framebufferHeight],omega0:(n,o)=>[o.omega0_0,o.omega0_1],texDomain:()=>[e.x[0],e.x[1],e.y[0],e.y[1]],isCompound:(n,o)=>o.pendulumType==="Compound",debugCheckerboard:t.prop("debugCheckerboard"),m1:t.prop("m1"),m2:t.prop("m2"),l1:t.prop("l1"),l2:t.prop("l2")}})}),inputs:["regl","textureDomain"],outputs:["initialize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-176"),expanded:[],variables:[]},{id:176,body:t=>({update:t({frag:`
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
    }`,framebuffer:t.prop("dst"),uniforms:{y:t.prop("src"),resolution:a=>[a.framebufferWidth,a.framebufferHeight],dt:t.prop("dt"),isCompound:t.prop("isCompound"),m1:t.prop("m1"),m2:t.prop("m2"),l1:t.prop("l1"),l2:t.prop("l2")}})}),inputs:["regl"],outputs:["update"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-95"),expanded:[],variables:[]},{id:95,body:(t,e,a,n,o)=>({drawMap:t({frag:`
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
    }`,uniforms:{y:()=>e[0],axesViewport:u=>{const i=a(n)(u);return[i.x,i.y,i.width,i.height]},viewDomain:()=>[n.xDomain[0],n.xDomain[1],n.yDomain[0],n.yDomain[1]],texDomain:()=>[o.x[0],o.x[1],o.y[0],o.y[1]],debugPassthrough:!1},scissor:{enable:!0,box:a(n)},viewport:a(n)})}),inputs:["regl","y","reglAxesViewport","axes","textureDomain"],outputs:["drawMap"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-886"),expanded:[],variables:[]},{id:886,body:(t,e,a,n,o)=>{const d=t(e,{vert:`
    precision highp float;

    #pragma lines: attribute float index;
    #pragma lines: position = getPosition(index);
    #pragma lines: width = getWidth();

    uniform sampler2D state;
    uniform vec2 hover;
    uniform float l1, l2, width;

    #define PI ${Math.PI}

    vec4 getPosition(float idx) {
      // Sample state from texture
      vec2 theta = texture2D(state, hover).xy * (2.0 * PI) - PI;

      // Compute pendulum positions
      vec2 v1 = l1 * vec2(sin(theta.x), -cos(theta.x));
      vec2 v2 = l2 * vec2(sin(theta.y), -cos(theta.y));

      vec2 p0 = vec2(0);
      vec2 p1 = v1;
      vec2 p2 = p1 + v2;

      // Select position based on index
      vec2 pos = idx < 0.5 ? p0 : (idx < 1.5 ? p1 : p2);

      // Scale to fit in clip space
      return vec4(pos * 0.45, 0, 1);
    }

    float getWidth() { return width; }
  `,frag:`
    precision lowp float;
    uniform vec3 color;
    void main () {
      gl_FragColor = vec4(color, 1);
    }
  `,uniforms:{state:e.prop("state"),hover:()=>a.pt,l1:e.prop("l1"),l2:e.prop("l2"),width:(s,r)=>s.pixelRatio*r.width,color:e.prop("color")},depth:{enable:!1},scissor:{enable:!0,box:n(o)},viewport:s=>{const r=n(o)(s),m=Math.min(r.width,r.height);return{x:r.x+(r.width-m)/2,y:r.y+(r.height-m)/2,width:m,height:m}}}),u=e({vert:`
    precision highp float;
    attribute float pointIndex;
    uniform sampler2D state;
    uniform vec2 hover;
    uniform float l1, l2, pointSize;
    varying float vPointSize;

    #define PI ${Math.PI}

    void main() {
      vec2 theta = texture2D(state, hover).xy * (2.0 * PI) - PI;

      vec2 v1 = l1 * vec2(sin(theta.x), -cos(theta.x));
      vec2 v2 = l2 * vec2(sin(theta.y), -cos(theta.y));

      vec2 p0 = vec2(0);
      vec2 p1 = v1;
      vec2 p2 = p1 + v2;

      vec2 pos = pointIndex < 0.5 ? p0 : (pointIndex < 1.5 ? p1 : p2);

      gl_Position = vec4(pos * 0.45, 0, 1);
      gl_PointSize = pointSize;
      vPointSize = pointSize;
    }
  `,frag:`
    precision highp float;
    uniform vec3 fillColor;
    uniform vec3 strokeColor;
    uniform float strokeWidthPx;
    varying float vPointSize;

    void main() {
      // Distance from center in pixels
      float distPx = length(gl_PointCoord - 0.5) * vPointSize;
      float radius = vPointSize * 0.5;

      // Smooth edges with 1px anti-aliasing
      float outerEdge = smoothstep(radius, radius - 1.0, distPx);
      float innerEdge = smoothstep(radius - strokeWidthPx, radius - strokeWidthPx - 1.0, distPx);

      // Blend stroke (outside) and fill (inside)
      vec3 color = mix(strokeColor, fillColor, innerEdge);
      gl_FragColor = vec4(color, outerEdge);
    }
  `,attributes:{pointIndex:[0,1,2]},uniforms:{state:e.prop("state"),hover:()=>a.pt,l1:e.prop("l1"),l2:e.prop("l2"),pointSize:(s,r)=>s.pixelRatio*r.pointSize,fillColor:e.prop("fillColor"),strokeColor:e.prop("strokeColor"),strokeWidthPx:(s,r)=>s.pixelRatio*r.strokeWidthPx},primitive:"points",count:3,depth:{enable:!1},blend:{enable:!0,func:{srcRGB:"src alpha",srcAlpha:1,dstRGB:"one minus src alpha",dstAlpha:1},equation:{rgb:"add",alpha:"add"},color:[0,0,0,0]},scissor:{enable:!0,box:n(o)},viewport:s=>{const r=n(o)(s),m=Math.min(r.width,r.height);return{x:r.x+(r.width-m)/2,y:r.y+(r.height-m)/2,width:m,height:m}}}),i=e.buffer([0,1,2]),p=e.buffer([[0,1,2],[2,1,0]]),c={join:"round",cap:"round",vertexCount:3,vertexAttributes:{index:i},endpointCount:2,endpointAttributes:{index:p}};function _(s){const{state:r,l1:m,l2:h,isCompound:x}=s;x?(d({...c,state:r,l1:m,l2:h,width:14,color:[.75,.22,.17]}),u({state:r,l1:m,l2:h,pointSize:12,fillColor:[.4,.4,.4],strokeColor:[.25,.25,.25],strokeWidthPx:1.5})):(d({...c,state:r,l1:m,l2:h,width:3,color:[.35,.35,.35]}),u({state:r,l1:m,l2:h,pointSize:18,fillColor:[.91,.3,.24],strokeColor:[.6,.15,.1],strokeWidthPx:1.5}))}return{drawPendulumLine:d,drawPendulumPoints:u,lineVertexBuffer:i,lineEndpointBuffer:p,lineData:c,drawPendulum:_}},inputs:["reglLines","regl","mouseHover","reglAxesViewport","axes"],outputs:["drawPendulumLine","drawPendulumPoints","lineVertexBuffer","lineEndpointBuffer","lineData","drawPendulum"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-889"),expanded:[],variables:[]},{id:889,body:(t,e,a,n)=>{const o={pt:[0,0],active:!1,dragging:!1},d=t.elements.svg;function u(s){const r=d.getBoundingClientRect(),m=(s.clientX-r.left)/r.width,h=1-(s.clientY-r.top)/r.height;o.pt[0]=m,o.pt[1]=h,e.dirty=!0}function i(){o.active=!0,e.dirty=!0}function p(){o.active=!1,e.dirty=!0}function c(){o.dragging=!0,d.classList.remove("crosshair-cursor")}function _(){o.dragging=!1,a.includes("Show pendulum at point under mouse")&&d.classList.add("crosshair-cursor")}return d.addEventListener("pointermove",u,!1),d.addEventListener("pointerenter",i,!1),d.addEventListener("pointerleave",p,!1),d.addEventListener("pointerdown",c,!1),window.addEventListener("pointerup",_,!1),n.then(()=>{d.removeEventListener("pointermove",u),d.removeEventListener("pointerenter",i),d.removeEventListener("pointerleave",p),d.removeEventListener("pointerdown",c),window.removeEventListener("pointerup",_)}),{mouseHover:o,canvas:d,onPointerMove:u,onPointerEnter:i,onPointerLeave:p,onPointerDown:c,onPointerUp:_}},inputs:["stack","regl","simulate","invalidation"],outputs:["mouseHover","canvas","onPointerMove","onPointerEnter","onPointerLeave","onPointerDown","onPointerUp"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-925"),expanded:[],variables:[]},{id:925,body:(t,e)=>{const a=t.elements.svg;return e.includes("Show pendulum at point under mouse")?a.classList.add("crosshair-cursor"):a.classList.remove("crosshair-cursor"),{svgEl:a}},inputs:["stack","simulate"],outputs:["svgEl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-901"),expanded:[],variables:[]},{id:901,body:async()=>(await w(()=>import("./twttr-CwAUCjW_.js"),[]),{twttr:window.twttr}),inputs:[],outputs:["twttr"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-903"),expanded:[],variables:[]},{id:903,body:t=>{function e(a,n){const o=document.createElement("DIV");return Promise.resolve().then(()=>t.widgets.createTweet(a,o,n)),o}return{tweet:e}},inputs:["twttr"],outputs:["tweet"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:()=>({pixelRatio:window.devicePixelRatio}),inputs:[],outputs:["pixelRatio"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-890"),expanded:[],variables:[]},{id:890,body:async()=>{const[{default:t},{default:e},{createElementStack:a},{reglElement:n,reglAxesViewport:o},{createZoomableAxes:d},{expandable:u}]=await Promise.all([w(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(i=>{if(!("default"in i))throw new SyntaxError("export 'default' not found");return i}),w(()=>import("https://cdn.jsdelivr.net/npm/regl-gpu-lines@2.4.1/+esm"),[]).then(i=>{if(!("default"in i))throw new SyntaxError("export 'default' not found");return i}),w(()=>import("./element-stack-U6qmxFVc.js"),[]).then(i=>{if(!("createElementStack"in i))throw new SyntaxError("export 'createElementStack' not found");return i}),w(()=>import("./regl-canvas-Cs3pLjCJ.js"),[]).then(i=>{if(!("reglElement"in i))throw new SyntaxError("export 'reglElement' not found");if(!("reglAxesViewport"in i))throw new SyntaxError("export 'reglAxesViewport' not found");return i}),w(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(i=>{if(!("createZoomableAxes"in i))throw new SyntaxError("export 'createZoomableAxes' not found");return i}),w(()=>import("./expandable-CXgdZO_P.js"),[]).then(i=>{if(!("expandable"in i))throw new SyntaxError("export 'expandable' not found");return i})]);return{createREGL:t,reglLines:e,createElementStack:a,reglElement:n,reglAxesViewport:o,createZoomableAxes:d,expandable:u}},inputs:[],outputs:["createREGL","reglLines","createElementStack","reglElement","reglAxesViewport","createZoomableAxes","expandable"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-485"),expanded:[],variables:[]},{id:485,body:async(t,e)=>{const{canWriteToFBOOfType:a}=await w(()=>import("https://api.observablehq.com/@rreusser/regl-tools.js?v=4"),[]).then(n=>{const o={},d=t.module(n.default),u=t.module();if(!d.defines("canWriteToFBOOfType"))throw new SyntaxError("export 'canWriteToFBOOfType' not found");return u.variable(o.canWriteToFBOOfType=e()).import("canWriteToFBOOfType",d),o});return{canWriteToFBOOfType:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["canWriteToFBOOfType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-635"),expanded:[],variables:[]},{id:635,body:async(t,e)=>{const{rangeSlider:a}=await w(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(n=>{const o={},d=t.module(n.default),u=t.module();if(!d.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return u.variable(o.rangeSlider=e()).import("rangeSlider",d),o});return{rangeSlider:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["rangeSlider"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-791"),expanded:[],variables:[]},{id:791,body:()=>{function t(e,a,n){return e+n*(a-e)}return{lerp:t}},inputs:[],outputs:["lerp"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-908"),expanded:[],variables:[]},{id:908,body:async function(t,e){return t`<figure style="text-align: center;">
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
