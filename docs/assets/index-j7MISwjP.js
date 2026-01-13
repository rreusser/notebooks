import{d as p,_ as h}from"./index-ByB2dbry.js";import"./comments-I77vOiCB.js";p({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:(e,t,o,n,d,i,l,s,c)=>{const u=e({container:t,width:Math.min(o,640),height:Math.min(640,o),layers:{regl:({current:a,width:r,height:y})=>{const m=devicePixelRatio;return a=a||n(d,{attributes:{depthStencil:!1},pixelRatio:m}),a.style.width=`${r}px`,a.style.height=`${y}px`,a.width=r*m,a.height=y*m,a},plot:({width:a,height:r})=>i.plot({width:a,height:r,aspectRatio:1,marginTop:0,marginRight:5,marginLeft:22,marginBottom:20,style:{backgroundColor:"transparent",maxWidth:"none"},x:{domain:[-3,3],grid:!0,tickSpacing:100},y:{domain:[-2.9*r/a,2.9*r/a],grid:!0,tickSpacing:100}}),svg:({width:a,height:r})=>l.create("svg").attr("width",a).attr("height",r).node()}}),f=u.value;return s(c`<figure>
  ${u}
  <figcaption>Drag points to adjust magnet positions.</figcaption>
</figure>`),{el:u,stack:f}},inputs:["createElementStack","stackEl","width","reglCanvas","createREGL","Plot","d3","display","html"],outputs:["el","stack"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(e,t)=>{const o=e(t.range([0,1],{label:"pendulum height, h",value:.5})),n=e(t.range([1e-8,1],{label:"friction",value:.2})),d=e(t.range([1e-6,.01],{transform:Math.log,label:"tolerance",value:3e-4})),i=e(t.range([0,200],{label:"integration steps",value:120,step:1})),l=e(t.range([2,10],{label:"Magnet count",value:3,step:1})),s=e(t.checkbox(["Draw trajectory"],{value:["Draw trajectory","Use steps which exceed tolerance"]}));return{h:o,b:n,tolerance:d,steps:i,N:l,opts:s}},inputs:["view","Inputs"],outputs:["h","b","tolerance","steps","N","opts"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(e,t)=>e`For two-dimensional position ${t`\mathbf{x}`}, friction ${t`b`}, and magnets ${t`\mathbf{X}_n`}, the pendulum moves according to the equations`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});p({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(e,t,o)=>e`${t.block`
\frac{d^2 \mathbf{x}}{dt^2} + b \frac{d\mathbf{x}}{dt} + \mathbf{x} = \sum_{n=1}^{${o}} \frac{\mathbf{X}_n - x}{\left(|\mathbf{X}_n - \mathbf{x}|^2 + h^2\right)^{5/2}}.
`}`,inputs:["md","tex","N"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});p({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(e,t)=>e`Pendulum height ${t`h`} means the bottom of the pendulum is elevated slightly above the magnets so that it doesn't experience infinite acceleration when it gets close.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});p({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:e=>{const t=Array.from({length:e}).map((n,d)=>d),o=`vec4 deriv (vec4 y) {
  vec2 pos = y.xy;
  vec2 vel = y.zw;
  ${t.map(n=>`vec2 r${n} = p${n} - pos;`).join(`
  `)}
  ${t.map(n=>`float d${n} = dot(r${n}, r${n}) + h2;`).join(`
  `)}
  vec2 force = ${t.map(n=>`r${n} / (d${n} * d${n} * sqrt(d${n}))`).join(` +
               `)};
  return vec4(vel, force - b * vel - pos);
}`;return{i:t,glslDeriv:o}},inputs:["N"],outputs:["i","glslDeriv"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-55"),expanded:[],variables:[]},{id:55,body:(e,t)=>e`\`\`\`glsl
${t}
\`\`\``,inputs:["md","glslDeriv"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});p({root:document.getElementById("cell-43"),expanded:[],variables:[]},{id:43,body:(e,t)=>e`Given zero velocity and starting position \`xy\`, the final iteration loop is reproduced below. We start by packing the state into a \`vec4\`. We update the state ${t} times, overwriting the state and mutating \`dt\` on each step. The iteration is quite straightfoward, but GLSL 1.00 does not permit loop bounds to be computed at runtime, so we have to hard-code the loop extents into the shader.`,inputs:["md","steps"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});p({root:document.getElementById("cell-45"),expanded:[],variables:[]},{id:45,body:(e,t)=>e`\`\`\`glsl
vec4 y = vec4(xy, vec2(0));
float dt = 0.01;
for (int i = 0; i < ${t}; i++) y = ode45(y, dt);
\`\`\``,inputs:["md","steps"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});p({root:document.getElementById("cell-67"),expanded:[],variables:[]},{id:67,body:e=>{const t=Array.from({length:e}).map((d,i)=>i),o=`float quasirandom (int n) {
  return fract(0.5 + ${1/1.618033988749895} * float(n));
}
vec3 palette(float t) {
  const vec3 a = vec3(0.5, 0.5, 0.5);
  const vec3 b = vec3(0.5, 0.5, 0.5);
  const vec3 c = vec3(1.0, 1.0, 1.0);
  const vec3 d = vec3(0.00, 0.33, 0.67);
  return a + b * cos(6.283185 * (c * t + d));
}`,n=`vec3 computeWeightedColor (vec2 y) {
  ${t.map(d=>`vec2 r${d} = y - p${d};`).join(`
  `)}
  ${t.map(d=>`float w${d} = 1.0 / dot(r${d}, r${d}); w${d} *= w${d};`).join(`
  `)}
  return (
    ${t.map(d=>`w${d} * mix(palette(0.63 + quasirandom(${d})), vec3(0.9), 0.35)`).join(` +
    `)}
  ) / (${t.map(d=>`w${d}`).join(" + ")});
}`;return{i:t,glslPalette:o,glslScheme:n}},inputs:["N"],outputs:["i","glslPalette","glslScheme"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-68"),expanded:[],variables:[]},{id:68,body:(e,t)=>e`\`\`\`glsl
${t}
\`\`\``,inputs:["md","glslPalette"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});p({root:document.getElementById("cell-69"),expanded:[],variables:[]},{id:69,body:(e,t)=>e`\`\`\`glsl
${t}
\`\`\``,inputs:["md","glslScheme"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});p({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:async(e,t)=>{const[{mat4:o},{default:n},{ode45:d}]=await Promise.all([h(()=>import("https://cdn.jsdelivr.net/npm/gl-matrix/+esm"),[]).then(i=>{if(!("mat4"in i))throw new SyntaxError("export 'mat4' not found");return i}),h(()=>import("https://cdn.jsdelivr.net/npm/regl/+esm"),[]).then(i=>{if(!("default"in i))throw new SyntaxError("export 'default' not found");return i}),h(()=>import("https://api.observablehq.com/@rreusser/integration.js?v=4"),[]).then(i=>{const l={},s=e.module(i.default),c=e.module();if(!s.defines("ode45"))throw new SyntaxError("export 'ode45' not found");return c.variable(l.ode45=t()).import("ode45",s),l})]);return{mat4:o,createREGL:n,ode45:d}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["mat4","createREGL","ode45"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async()=>{const[{initializeElementStack:e,createElementStack:t,createAxisConfiguration:o},{reglCanvas:n}]=await Promise.all([h(()=>import("./element-stack--iI8y0aQ.js"),[]).then(d=>{if(!("initializeElementStack"in d))throw new SyntaxError("export 'initializeElementStack' not found");if(!("createElementStack"in d))throw new SyntaxError("export 'createElementStack' not found");if(!("createAxisConfiguration"in d))throw new SyntaxError("export 'createAxisConfiguration' not found");return d}),h(()=>import("./regl-canvas-DbKbmlCP.js"),[]).then(d=>{if(!("reglCanvas"in d))throw new SyntaxError("export 'reglCanvas' not found");return d})]);return{initializeElementStack:e,createElementStack:t,createAxisConfiguration:o,reglCanvas:n}},inputs:[],outputs:["initializeElementStack","createElementStack","createAxisConfiguration","reglCanvas"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:e=>({stackEl:e()}),inputs:["initializeElementStack"],outputs:["stackEl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:e=>{const t=e.regl.value,o=e.svg.value;return{regl:t,svg:o,state:{dirty:!1}}},inputs:["stack"],outputs:["regl","svg","state"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:e=>({magnets:Array.from({length:e}).map((o,n)=>({index:n,x:Math.sin(2*Math.PI*n/e),y:Math.cos(2*Math.PI*n/e)}))}),inputs:["N"],outputs:["magnets"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(e,t,o,n,d)=>{function i(s,[c,u,f,a]){let r=0,y=0;for(let m=0;m<e.length;m++){const v=e[m].x-c,g=e[m].y-u,b=v*v+g*g+t*t,x=1/(b*b*Math.sqrt(b));r+=v*x,y+=g*x}s[0]=f,s[1]=a,s[2]=r-o*f-c,s[3]=y-o*a-u}function l([s,c]){if(!~n.indexOf("Draw trajectory")||isNaN(s))return[];const u={y:[s,c,0,0],t:0},f=[{x:u.y[0],y:u.y[1]}];for(let a=0;a<2e3&&!u.limitReached;a++)d(u,i,{tLimit:50,tolerance:2e-6}),f.push({x:u.y[0],y:u.y[1]});return f}return{deriv:i,computeTrajectory:l}},inputs:["magnets","h","b","opts","ode45"],outputs:["deriv","computeTrajectory"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(e,t,o,n,d)=>{const i=e.plot.scale("x"),l=e.plot.scale("y"),s=t.select(e.svg).style("cursor","crosshair");s.selectAll("circle").remove(),s.on("mousemove",a=>{u(o([i.invert(a.offsetX),l.invert(a.offsetY)]))});const c=t.line().x(({x:a})=>i.apply(a)).y(({y:a})=>l.apply(a));function u(a){s.selectAll(".trajectorybg").data([a||[]]).join(r=>r.append("path").style("fill","none").style("stroke-width",5).style("stroke","rgba(255,255,255,0.6)").attr("class","trajectorybg").attr("d",c),r=>r.attr("d",c)),s.selectAll(".trajectory").data([a||[]]).join(r=>r.append("path").style("fill","none").style("stroke-width",2).style("stroke","blue").attr("class","trajectory").attr("d",c),r=>r.attr("d",c))}function f(a){a.attr("r",5).attr("cx",({x:r})=>i.apply(r)).attr("cy",({y:r})=>l.apply(r))}return u([]),s.selectAll("circle").data(n).join(a=>a.append("circle").style("fill","black").style("stroke","white").style("stroke-width",2).style("cursor","move").call(f).call(t.drag().on("drag",r=>{let{sourceEvent:{offsetX:y,offsetY:m,touches:v},subject:{index:g}}=r;if(v?.length){const{x:b,y:x}=s.node().getBoundingClientRect();y=v[0].clientX-b,m=v[0].clientY-x}n[g].x=i.invert(y),n[g].y=l.invert(m),s.selectAll("circle").call(f),d.dirty=!0})),a=>a.call(f)),{xScale:i,yScale:l,svg:s,makeline:c,updateTrajectory:u,updatePositions:f}},inputs:["stack","d3","computeTrajectory","magnets","state"],outputs:["xScale","yScale","svg","makeline","updateTrajectory","updatePositions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(e,t,o,n,d,i,l,s,c,u,f)=>{e.dirty=!0;let a=t.frame(({time:r})=>{if(e.dirty)try{o(n.plot.scale("x"),n.plot.scale("y"),()=>{t.clear({color:[1,0,0,1]}),d({h:i,b:l,magnets:s,tolerance:c,discard:!u.includes("Use steps which exceed tolerance")})}),e.dirty=!1}catch(y){console.error(y),a&&a.cancel(),a=null}});return f.then(()=>{a&&a.cancel(),a=null}),{loop:a}},inputs:["state","regl","configureAxes","stack","drawField","h","b","magnets","tolerance","opts","invalidation"],outputs:["loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:(e,t,o)=>({configureAxes:e(t,o)}),inputs:["createAxisConfiguration","mat4","regl"],outputs:["configureAxes"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:(e,t,o,n,d,i)=>{const l={};for(let c=0;c<e;c++)l[`p${c}`]=(u,{magnets:f})=>[f[c].x,f[c].y];const s=t({vert:`
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
    uniform vec2 ${Object.keys(l).join(", ")};
    uniform bool discardFails;

    ${o}

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

    ${n}
    ${d}

    void main () {
      vec4 y = vec4(xy, vec2(0));
      float dtCurrent = 0.01;
      for (int i = 0; i < ${i}; i++) y = rk45(y, dtCurrent);
      gl_FragColor = vec4(computeWeightedColor(y.xy), 1);
    }`,attributes:{uv:[-4,-4,4,-4,0,4]},uniforms:{h2:(c,{h:u})=>u*u,b:t.prop("b"),tol2:(c,{tolerance:u})=>u*u,discardFails:t.prop("discard"),...l},count:3,depth:{enable:!1}});return{magnetUniforms:l,drawField:s}},inputs:["N","regl","glslDeriv","glslPalette","glslScheme","steps"],outputs:["magnetUniforms","drawField"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-59"),expanded:[],variables:[]},{id:59,body:()=>{function e(o){return o<=.04045?o/12.92:Math.pow((o+.055)/1.055,2.4)}function t(o){o=o.replace(/^#/,""),o.length===3&&(o=o.split("").map(l=>l+l).join(""));const n=e(parseInt(o.slice(0,2),16)/255),d=e(parseInt(o.slice(2,4),16)/255),i=e(parseInt(o.slice(4,6),16)/255);return[n,d,i]}return{srgbToLinear:e,hexToLinearRgb:t}},inputs:[],outputs:["srgbToLinear","hexToLinearRgb"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});p({root:document.getElementById("cell-60"),expanded:[],variables:[]},{id:60,body:(e,t)=>({colorScheme:e.schemeCategory10.map(t).map(([n,d,i])=>`vec3(${n},${d},${i})`)}),inputs:["d3","hexToLinearRgb"],outputs:["colorScheme"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
