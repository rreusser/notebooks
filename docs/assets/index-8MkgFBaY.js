import{d as l,_ as x}from"./index-ByB2dbry.js";l({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:(t,e,u,a,n,i,c,r,p)=>{const s=t({container:e,width:Math.min(u,640),height:Math.min(640,u),layers:{regl:({current:o,width:d,height:m})=>{const y=devicePixelRatio;return o=o||a(n,{attributes:{depthStencil:!1},pixelRatio:y}),o.style.width=`${d}px`,o.style.height=`${m}px`,o.width=d*y,o.height=m*y,o},plot:({width:o,height:d})=>i.plot({width:o,height:d,aspectRatio:1,marginTop:0,marginRight:5,marginLeft:22,marginBottom:20,style:{backgroundColor:"transparent",maxWidth:"none"},x:{domain:[-3,3],grid:!0,tickSpacing:100},y:{domain:[-2.9*d/o,2.9*d/o],grid:!0,tickSpacing:100}}),svg:({width:o,height:d})=>c.create("svg").attr("width",o).attr("height",d).node()}}),f=s.value;return r(p`<figure>
  ${s}
  <figcaption>Drag points to adjust magnet positions.</figcaption>
</figure>`),{el:s,stack:f}},inputs:["createElementStack","stackEl","width","reglCanvas","createREGL","Plot","d3","display","html"],outputs:["el","stack"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(t,e)=>{const u=t(e.range([0,1],{label:"pendulum height, h",value:.5})),a=t(e.range([1e-8,1],{label:"friction",value:.15})),n=t(e.range([1e-6,.01],{transform:Math.log,label:"tolerance",value:3e-4})),i=t(e.range([0,200],{label:"integration steps",value:120,step:1})),c=t(e.checkbox(["Draw trajectory"],{value:["Draw trajectory","Use steps which exceed tolerance"]}));return{h:u,b:a,tolerance:n,steps:i,opts:c}},inputs:["view","Inputs"],outputs:["h","b","tolerance","steps","opts"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(t,e)=>t`For two-dimensional position ${e`\mathbf{x}`}, friction ${e`b`}, and magnets ${e`\mathbf{X}_n`}, the pendulum moves according to the equations`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(t,e)=>t`${e.block`
\frac{d^2 \mathbf{x}}{dt^2} + b \frac{d\mathbf{x}}{dt} + \mathbf{x} = \sum_{n=1}^{3} \frac{\mathbf{X}_n - x}{\left(|\mathbf{X}_n - \mathbf{x}|^2 + h^2\right)^{5/2}}.
`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(t,e)=>t`Pendulum height ${e`h`} means the bottom of the pendulum is elevated slightly above the magnets so that it doesn't experience infinite acceleration when it gets close.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-43"),expanded:[],variables:[]},{id:43,body:(t,e)=>t`Given zero velocity and starting position \`xy\`, the final iteration loop is reproduced below. We start by packing the state into a \`vec4\`. We update the state ${e} times, overwriting the state and mutating \`dt\` on each step. The iteration is quite straightfoward, but GLSL 1.00 does not permit loop bounds to be computed at runtime, so we have to hard-code the loop extents into the shader.`,inputs:["md","steps"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-45"),expanded:[],variables:[]},{id:45,body:(t,e)=>t`\`\`\`glsl
vec4 y = vec4(xy, vec2(0));
float dt = 0.01;
for (int i = 0; i < ${e}; i++) y = ode45(y, dt);
\`\`\``,inputs:["md","steps"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:async(t,e)=>{const[{mat4:u},{default:a},{ode45:n}]=await Promise.all([x(()=>import("https://cdn.jsdelivr.net/npm/gl-matrix/+esm"),[]).then(i=>{if(!("mat4"in i))throw new SyntaxError("export 'mat4' not found");return i}),x(()=>import("https://cdn.jsdelivr.net/npm/regl/+esm"),[]).then(i=>{if(!("default"in i))throw new SyntaxError("export 'default' not found");return i}),x(()=>import("https://api.observablehq.com/@rreusser/integration.js?v=4"),[]).then(i=>{const c={},r=t.module(i.default),p=t.module();if(!r.defines("ode45"))throw new SyntaxError("export 'ode45' not found");return p.variable(c.ode45=e()).import("ode45",r),c})]);return{mat4:u,createREGL:a,ode45:n}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["mat4","createREGL","ode45"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async()=>{const[{initializeElementStack:t,createElementStack:e,createAxisConfiguration:u},{reglCanvas:a}]=await Promise.all([x(()=>import("./element-stack--iI8y0aQ.js"),[]).then(n=>{if(!("initializeElementStack"in n))throw new SyntaxError("export 'initializeElementStack' not found");if(!("createElementStack"in n))throw new SyntaxError("export 'createElementStack' not found");if(!("createAxisConfiguration"in n))throw new SyntaxError("export 'createAxisConfiguration' not found");return n}),x(()=>import("./regl-canvas-DbKbmlCP.js"),[]).then(n=>{if(!("reglCanvas"in n))throw new SyntaxError("export 'reglCanvas' not found");return n})]);return{initializeElementStack:t,createElementStack:e,createAxisConfiguration:u,reglCanvas:a}},inputs:[],outputs:["initializeElementStack","createElementStack","createAxisConfiguration","reglCanvas"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:t=>({stackEl:t()}),inputs:["initializeElementStack"],outputs:["stackEl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:t=>{const e=t.regl.value,u=t.svg.value;return{regl:e,svg:u,state:{dirty:!1}}},inputs:["stack"],outputs:["regl","svg","state"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:()=>({magnets:[{index:0,x:-Math.sqrt(3)*.5,y:-.5},{index:1,x:Math.sqrt(3)*.5,y:-.5},{index:2,x:0,y:1}]}),inputs:[],outputs:["magnets"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(t,e,u,a,n)=>{function i(r,[p,s,f,o]){const[d,m,y]=t,v=d.x-p,h=d.y-s,g=m.x-p,b=m.y-s,w=y.x-p,k=y.y-s,E=v*v+h*h+e*e,_=g*g+b*b+e*e,A=w*w+k*k+e*e,S=1/(E*E*Math.sqrt(E)),I=1/(_*_*Math.sqrt(_)),B=1/(A*A*Math.sqrt(A)),C=v*S+g*I+w*B,M=h*S+b*I+k*B;r[0]=f,r[1]=o,r[2]=C-u*f-p,r[3]=M-u*o-s}function c([r,p]){if(!~a.indexOf("Draw trajectory")||isNaN(r))return[];const s={y:[r,p,0,0],t:0},f=[{x:s.y[0],y:s.y[1]}];for(let o=0;o<2e3&&!s.limitReached;o++)n(s,i,{tLimit:50,tolerance:2e-6}),f.push({x:s.y[0],y:s.y[1]});return f}return{deriv:i,computeTrajectory:c}},inputs:["magnets","h","b","opts","ode45"],outputs:["deriv","computeTrajectory"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(t,e,u,a,n)=>{const i=t.plot.scale("x"),c=t.plot.scale("y"),r=e.select(t.svg).style("cursor","crosshair");e.selectAll("circle").remove(),r.on("mousemove",o=>{s(u([i.invert(o.offsetX),c.invert(o.offsetY)]))});const p=e.line().x(({x:o})=>i.apply(o)).y(({y:o})=>c.apply(o));function s(o){r.selectAll(".trajectory").data([o||[]]).join(d=>d.append("path").style("fill","none").style("stroke-width",1).style("stroke","black").attr("class","trajectory").attr("d",p),d=>d.attr("d",p))}function f(o){o.attr("r",5).attr("cx",({x:d})=>i.apply(d)).attr("cy",({y:d})=>c.apply(d))}return s([]),r.selectAll("circle").data(a).join(o=>o.append("circle").style("fill","black").style("stroke","white").style("stroke-width",2).style("cursor","move").call(f).call(e.drag().on("drag",d=>{let{sourceEvent:{offsetX:m,offsetY:y,touches:v},subject:{index:h}}=d;if(v?.length){const{x:g,y:b}=r.node().getBoundingClientRect();m=v[0].clientX-g,y=v[0].clientY-b}a[h].x=i.invert(m),a[h].y=c.invert(y),r.selectAll("circle").call(f),n.dirty=!0})),o=>o.call(f)),{xScale:i,yScale:c,svg:r,makeline:p,updateTrajectory:s,updatePositions:f}},inputs:["stack","d3","computeTrajectory","magnets","state"],outputs:["xScale","yScale","svg","makeline","updateTrajectory","updatePositions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(t,e,u,a,n,i,c,r,p,s,f)=>{t.dirty=!0;let o=e.frame(({time:d})=>{if(t.dirty)try{u(a.plot.scale("x"),a.plot.scale("y"),()=>{e.clear({color:[1,0,0,1]}),n({h:i,b:c,magnets:r,tolerance:p,discard:!s.includes("Use steps which exceed tolerance")})}),t.dirty=!1}catch(m){console.error(m),o&&o.cancel(),o=null}});return f.then(()=>{o&&o.cancel(),o=null}),{loop:o}},inputs:["state","regl","configureAxes","stack","drawField","h","b","magnets","tolerance","opts","invalidation"],outputs:["loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:(t,e,u)=>({configureAxes:t(e,u)}),inputs:["createAxisConfiguration","mat4","regl"],outputs:["configureAxes"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:(t,e)=>({drawField:t({vert:`
    precision highp float;
    attribute vec2 uv;
    varying vec2 xy;
    uniform mat4 viewInverse;
    void main () {
      xy = (viewInverse * vec4(uv, 0, 1)).xy;
      gl_Position = vec4(uv, 0, 1);
    }`,frag:`
    precision highp float;
    varying vec2 xy;
    uniform float h2, b, tol2;
    uniform vec2 p0, p1, p2;
    uniform bool discardFails;

    vec4 deriv (vec4 y) {
      vec2 pos = y.xy;
      vec2 vel = y.zw;
      vec2 r0 = p0 - pos;
      vec2 r1 = p1 - pos;
      vec2 r2 = p2 - pos;
      float d0 = dot(r0, r0) + h2;
      float d1 = dot(r1, r1) + h2;
      float d2 = dot(r2, r2) + h2;
      vec2 force = r0 / (d0 * d0 * sqrt(d0)) +
                   r1 / (d1 * d1 * sqrt(d1)) +
                   r2 / (d2 * d2 * sqrt(d2));
      // Derivative of first two components (pos) is vel
      // Derivative of second two components (vel) is accel,
      // which comes from putting everything on RHS of the ODE
      return vec4(vel, force - b * vel - pos);
    }

    const float safety = 0.95;
    const float maxDecrease = 0.02;
    const float maxIncrease = 50.0;

    vec4 rk45 (vec4 y, inout float dt) {
      // Fifth order estimate using constants for the Cash-Karp method
      vec4 k1 = deriv(y);
      vec4 k2 = deriv(y + dt * 0.2 * k1);
      vec4 k3 = deriv(y + dt * (0.075 * k1 + 0.225 * k2));
      vec4 k4 = deriv(y + dt * (0.3 * k1 - 0.9 * k2 + 1.2 * k3));
      vec4 k5 = deriv(y + dt * (-0.203703703703703703 * k1 + 2.5 * k2 - 2.592592592592592592 * k3 + 1.296296296296296296 * k4));
      vec4 k6 = deriv(y + dt * (0.029495804398148148 * k1 + 0.341796875 * k2 + 0.041594328703703703 * k3 + 0.400345413773148148 * k4 + 0.061767578125 * k5));

      // Estimate the error using the embedded fourth order method
      vec4 tmp = dt * (0.004293774801587301 * k1 - 0.018668586093857832 * k3 + 0.034155026830808080 * k4 + 0.019321986607142857 * k5 - 0.039102202145680406 * k6);
      float err2 = dot(tmp, tmp);

      // Wasteful, but only accept the step if error is within tolerance
      bool accept = err2 <= tol2;
      if (accept || !discardFails) y += dt * (0.097883597883597883 * k1 + 0.402576489533011272 * k3 + 0.210437710437710437 * k4 + 0.289102202145680406 * k6);

      // Either way, adjust dt according to the estimate
      dt *= clamp(safety * pow(tol2 / err2, accept ? 0.125 : 0.1), maxDecrease, maxIncrease);

      return y;
    }

    const float GAMMA = 2.2;
    const vec3 col0 = pow(vec3(0.9, 0.2, 0.6), vec3(GAMMA));
    const vec3 col1 = pow(vec3(0.6, 0.9, 0.2), vec3(GAMMA));
    const vec3 col2 = pow(vec3(0.2, 0.6, 0.9), vec3(GAMMA));

    vec3 computeWeightedColor (vec2 y) {
      vec2 r0 = y - p0;
      vec2 r1 = y - p1;
      vec2 r2 = y - p2;
      float w0 = 1.0 / dot(r0, r0);
      float w1 = 1.0 / dot(r1, r1);
      float w2 = 1.0 / dot(r2, r2);

      // Alternatively, don't weight and return the nearest
      // return w0 > w1 ? (w2 > w0 ? col2 : col0) : (w2 > w1 ? col2 : col1);

      return (w0 * col0 + w1 * col1 + w2 * col2) / (w0 + w1 + w2);
    }

    void main () {
      vec4 y = vec4(xy, vec2(0));
      float dtCurrent = 0.01;
      for (int i = 0; i < ${e}; i++) y = rk45(y, dtCurrent);
      gl_FragColor = vec4(pow(computeWeightedColor(y.xy), vec3(1.0 / GAMMA)), 1);
    }`,attributes:{uv:[-4,-4,4,-4,0,4]},uniforms:{h2:(a,{h:n})=>n*n,b:t.prop("b"),tol2:(a,{tolerance:n})=>n*n,p0:(a,{magnets:n})=>[n[0].x,n[0].y],p1:(a,{magnets:n})=>[n[1].x,n[1].y],p2:(a,{magnets:n})=>[n[2].x,n[2].y],discardFails:t.prop("discard")},count:3,depth:{enable:!1}})}),inputs:["regl","steps"],outputs:["drawField"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
