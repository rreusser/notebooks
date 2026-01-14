import{d as l,_ as h}from"./index-ByB2dbry.js";import"./comments-I77vOiCB.js";l({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(t,e,a,n,o,d,i)=>{const r=t`<figure>
  ${e.element}
  <figcaption>Drag points to adjust magnet positions. Use mouse wheel to zoom, drag background to pan.</figcaption>
</figure>`;return a(n(r,{width:Math.min(o,640),height:Math.min(640,o),toggleOffset:[-3,-14],onResize(p,u,c){e.resize(u,c),d.updateScales(e.elements.plot.scale("x"),e.elements.plot.scale("y")),i.dirty=!0}})),{figure:r}},inputs:["html","stack","display","expandable","width","axes","regl"],outputs:["figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(t,e)=>{const a=t(e.range([0,1],{label:"pendulum height, h",value:.5})),n=t(e.range([1e-8,1],{label:"friction",value:.2})),o=t(e.range([1e-6,.01],{transform:Math.log,label:"tolerance",value:3e-4})),d=t(e.range([0,200],{label:"integration steps",value:120,step:1})),i=t(e.range([2,10],{label:"Magnet count",value:3,step:1})),r=t(e.checkbox(["Draw trajectory"],{value:["Draw trajectory"]}));return{h:a,b:n,tolerance:o,steps:d,N:i,opts:r}},inputs:["view","Inputs"],outputs:["h","b","tolerance","steps","N","opts"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(t,e)=>t`For two-dimensional position ${e`\mathbf{x}`}, friction ${e`b`}, and magnets ${e`\mathbf{X}_n`}, the pendulum moves according to the equations`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(t,e,a)=>t`${e.block`
\frac{d^2 \mathbf{x}}{dt^2} + b \frac{d\mathbf{x}}{dt} + \mathbf{x} = \sum_{n=1}^{${a}} \frac{\mathbf{X}_n - x}{\left(|\mathbf{X}_n - \mathbf{x}|^2 + h^2\right)^{5/2}}.
`}`,inputs:["md","tex","N"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(t,e)=>t`Pendulum height ${e`h`} means the bottom of the pendulum is elevated slightly above the magnets so that it doesn't experience infinite acceleration when it gets close.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:t=>{const e=Array.from({length:t}).map((n,o)=>o),a=`vec4 deriv (vec4 y) {
  vec2 pos = y.xy;
  vec2 vel = y.zw;
  ${e.map(n=>`vec2 r${n} = p${n} - pos;`).join(`
  `)}
  ${e.map(n=>`float d${n} = dot(r${n}, r${n}) + h2;`).join(`
  `)}
  vec2 force = ${e.map(n=>`r${n} / (d${n} * d${n} * sqrt(d${n}))`).join(` +
               `)};
  return vec4(vel, force - b * vel - pos);
}`;return{iDeriv:e,glslDeriv:a}},inputs:["N"],outputs:["iDeriv","glslDeriv"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-55"),expanded:[],variables:[]},{id:55,body:(t,e)=>t`\`\`\`glsl
${e}
\`\`\``,inputs:["md","glslDeriv"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-43"),expanded:[],variables:[]},{id:43,body:(t,e)=>t`Given zero velocity and starting position \`xy\`, the final iteration loop is reproduced below. We start by packing the state into a \`vec4\`. We update the state ${e} times, overwriting the state and mutating \`dt\` on each step. The iteration is quite straightfoward, but GLSL 1.00 does not permit loop bounds to be computed at runtime, so we have to hard-code the loop extents into the shader.`,inputs:["md","steps"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-45"),expanded:[],variables:[]},{id:45,body:(t,e)=>t`\`\`\`glsl
vec4 y = vec4(xy, vec2(0));
float dt = 0.01;
for (int i = 0; i < ${e}; i++) y = ode45(y, dt);
\`\`\``,inputs:["md","steps"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-67"),expanded:[],variables:[]},{id:67,body:t=>{const e=Array.from({length:t}).map((o,d)=>d),a=`float quasirandom (int n) {
  return fract(0.5 + ${1/1.618033988749895} * float(n));
}
vec3 palette(float t) {
  const vec3 a = vec3(0.5, 0.5, 0.5);
  const vec3 b = vec3(0.5, 0.5, 0.5);
  const vec3 c = vec3(1.0, 1.0, 1.0);
  const vec3 d = vec3(0.00, 0.33, 0.67);
  return a + b * cos(6.283185 * (c * t + d));
}`,n=`vec3 computeWeightedColor (vec2 y) {
  ${e.map(o=>`vec2 r${o} = y - p${o};`).join(`
  `)}
  ${e.map(o=>`float w${o} = 1.0 / dot(r${o}, r${o}); w${o} *= w${o};`).join(`
  `)}
  return (
    ${e.map(o=>`w${o} * mix(palette(0.63 + quasirandom(${o})), vec3(0.9), 0.35)`).join(` +
    `)}
  ) / (${e.map(o=>`w${o}`).join(" + ")});
}`;return{iPalette:e,glslPalette:a,glslScheme:n}},inputs:["N"],outputs:["iPalette","glslPalette","glslScheme"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-68"),expanded:[],variables:[]},{id:68,body:(t,e)=>t`\`\`\`glsl
${e}
\`\`\``,inputs:["md","glslPalette"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-69"),expanded:[],variables:[]},{id:69,body:(t,e)=>t`\`\`\`glsl
${e}
\`\`\``,inputs:["md","glslScheme"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});l({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:async(t,e)=>{const[{default:a},{ode45:n}]=await Promise.all([h(()=>import("https://cdn.jsdelivr.net/npm/regl/+esm"),[]).then(o=>{if(!("default"in o))throw new SyntaxError("export 'default' not found");return o}),h(()=>import("https://api.observablehq.com/@rreusser/integration.js?v=4"),[]).then(o=>{const d={},i=t.module(o.default),r=t.module();if(!i.defines("ode45"))throw new SyntaxError("export 'ode45' not found");return r.variable(d.ode45=e()).import("ode45",i),d})]);return{createREGL:a,ode45:n}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["createREGL","ode45"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async()=>{const[{createElementStack:t},{reglElement:e,reglAxesViewport:a},{createZoomableAxes:n},{expandable:o}]=await Promise.all([h(()=>import("./element-stack-p4nrtAyJ.js"),[]).then(d=>{if(!("createElementStack"in d))throw new SyntaxError("export 'createElementStack' not found");return d}),h(()=>import("./regl-canvas-Cs3pLjCJ.js"),[]).then(d=>{if(!("reglElement"in d))throw new SyntaxError("export 'reglElement' not found");if(!("reglAxesViewport"in d))throw new SyntaxError("export 'reglAxesViewport' not found");return d}),h(()=>import("./zoomable-axes-C3xaHfY0.js"),[]).then(d=>{if(!("createZoomableAxes"in d))throw new SyntaxError("export 'createZoomableAxes' not found");return d}),h(()=>import("./expandable-BgcqCFlA.js"),[]).then(d=>{if(!("expandable"in d))throw new SyntaxError("export 'expandable' not found");return d})]);return{createElementStack:t,reglElement:e,reglAxesViewport:a,createZoomableAxes:n,expandable:o}},inputs:[],outputs:["createElementStack","reglElement","reglAxesViewport","createZoomableAxes","expandable"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:t=>{function e(a,n,o=[-3,3],d=[-3,3]){return t.plot({width:a,height:n,marginTop:5,marginRight:10,marginLeft:30,marginBottom:20,style:{backgroundColor:"transparent",maxWidth:"none",position:"absolute"},x:{domain:o,grid:!0,tickSpacing:100},y:{domain:d,grid:!0,tickSpacing:100}})}return{createPlot:e}},inputs:["Plot"],outputs:["createPlot"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(t,e,a,n,o)=>({stack:t({layers:[{id:"regl",element:e(a,{attributes:{depthStencil:!1,preserveDrawingBuffer:!0}})},{id:"plot",element:({width:i,height:r})=>n(i,r)},{id:"svg",element:({current:i,width:r,height:p})=>(i?o.select(i):o.create("svg")).attr("width",r).attr("height",p).node()}]})}),inputs:["createElementStack","reglElement","createREGL","createPlot","d3"],outputs:["stack"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(t,e,a,n,o)=>({axes:t({d3:e,element:a.elements.svg,xScale:a.elements.plot.scale("x"),yScale:a.elements.plot.scale("y"),aspectRatio:1,onChange:({xDomain:i,yDomain:r})=>{n.dirty=!0;const p=o(a.width,a.height,i,r);a.elements.plot.replaceWith(p),a.elements.plot=p,a.dispatchEvent(new CustomEvent("update"))}})}),inputs:["createZoomableAxes","d3","stack","regl","createPlot"],outputs:["axes"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:t=>{const e=t.elements.regl.value;return e.dirty=!0,{regl:e}},inputs:["stack"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:t=>({magnets:Array.from({length:t}).map((a,n)=>({index:n,x:Math.sin(2*Math.PI*n/t),y:Math.cos(2*Math.PI*n/t)}))}),inputs:["N"],outputs:["magnets"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(t,e,a,n,o)=>{function d(r,[p,u,c,f]){let v=0,m=0;for(let s=0;s<t.length;s++){const y=t[s].x-p,g=t[s].y-u,b=y*y+g*g+e*e,x=1/(b*b*Math.sqrt(b));v+=y*x,m+=g*x}r[0]=c,r[1]=f,r[2]=v-a*c-p,r[3]=m-a*f-u}function i([r,p]){if(!~n.indexOf("Draw trajectory")||isNaN(r))return[];const u={y:[r,p,0,0],t:0},c=[{x:u.y[0],y:u.y[1]}];for(let f=0;f<2e3&&!u.limitReached;f++)o(u,d,{tLimit:50,tolerance:2e-6}),c.push({x:u.y[0],y:u.y[1]});return c}return{deriv:d,computeTrajectory:i}},inputs:["magnets","h","b","opts","ode45"],outputs:["deriv","computeTrajectory"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(t,e,a,n,o,d)=>{{let c=function(m){return t.line().x(({x:s})=>n.xScale(s)).y(({y:s})=>n.yScale(s))(m)},f=function(m){u.selectAll(".trajectorybg").data([m||[]]).join(s=>s.append("path").style("fill","none").style("stroke-width",5).style("stroke","rgba(255,255,255,0.6)").attr("class","trajectorybg").attr("d",c),s=>s.attr("d",c)),u.selectAll(".trajectory").data([m||[]]).join(s=>s.append("path").style("fill","none").style("stroke-width",2).style("stroke","blue").attr("class","trajectory").attr("d",c),s=>s.attr("d",c))},v=function(){const[m,s]=n.xRange,[y,g]=n.yRange;p.attr("x",Math.min(m,s)).attr("y",Math.min(y,g)).attr("width",Math.abs(s-m)).attr("height",Math.abs(g-y)),u.selectAll("circle.magnet").attr("cx",b=>n.xScale(b.x)).attr("cy",b=>n.yScale(b.y))};const i=t.select(e.elements.svg),p=i.selectAll("defs").data([0]).join("defs").selectAll("clipPath#viewport-clip").data([0]).join("clipPath").attr("id","viewport-clip").selectAll("rect").data([0]).join("rect"),u=i.selectAll("g.clipped").data([0]).join("g").attr("class","clipped").attr("clip-path","url(#viewport-clip)");i.on("mousemove",m=>{f(a([n.xScale.invert(m.offsetX),n.yScale.invert(m.offsetY)]))}),f([]),u.selectAll("circle.magnet").data(o).join(m=>m.append("circle").attr("class","magnet").attr("r",5).style("fill","black").style("stroke","white").style("stroke-width",2).style("cursor","move").call(t.drag().subject(function(s,y){return{x:n.xScale(y.x),y:n.yScale(y.y)}}).on("start",function(){t.select(this).attr("cursor","grabbing")}).on("drag",function(s,y){y.x=n.xScale.invert(s.x),y.y=n.yScale.invert(s.y),v(),f([]),d.dirty=!0}).on("end",function(){t.select(this).attr("cursor","move")}))),v(),e.addEventListener("update",()=>{v(),f([])})}},inputs:["d3","stack","computeTrajectory","axes","magnets","regl"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:(t,e,a,n,o,d,i,r)=>{const p={};for(let c=0;c<t;c++)p[`p${c}`]=(f,{magnets:v})=>[v[c].x,v[c].y];const u=e({vert:`
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
    uniform vec2 ${Object.keys(p).join(", ")};
    uniform bool discardFails;

    ${a}

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
    ${o}

    void main () {
      vec4 y = vec4(xy, vec2(0));
      float dtCurrent = 0.01;
      for (int i = 0; i < ${d}; i++) y = rk45(y, dtCurrent);
      gl_FragColor = vec4(computeWeightedColor(y.xy), 1);
    }`,attributes:{uv:[-4,-4,4,-4,0,4]},uniforms:{viewInverse:e.prop("viewInverse"),h2:(c,{h:f})=>f*f,b:e.prop("b"),tol2:(c,{tolerance:f})=>f*f,discardFails:e.prop("discard"),...p},depth:{enable:!1},scissor:{enable:!0,box:i(r)},viewport:i(r),count:3});return{magnetUniforms:p,drawField:u}},inputs:["N","regl","glslDeriv","glslPalette","glslScheme","steps","reglAxesViewport","axes"],outputs:["magnetUniforms","drawField"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(t,e,a,n,o,d,i,r,p)=>{t.dirty=!0;let u=t.frame(()=>{if(t.dirty)try{e({viewInverse:a.viewInverse,h:n,b:o,magnets:d,tolerance:i,discard:!r.includes("Use steps which exceed tolerance")}),t.dirty=!1}catch(c){console.error(c),u&&u.cancel(),u=null}});return p.then(()=>{u&&u.cancel(),u=null}),{loop:u}},inputs:["regl","drawField","axes","h","b","magnets","tolerance","opts","invalidation"],outputs:["loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-59"),expanded:[],variables:[]},{id:59,body:()=>{function t(a){return a<=.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)}function e(a){a=a.replace(/^#/,""),a.length===3&&(a=a.split("").map(i=>i+i).join(""));const n=t(parseInt(a.slice(0,2),16)/255),o=t(parseInt(a.slice(2,4),16)/255),d=t(parseInt(a.slice(4,6),16)/255);return[n,o,d]}return{srgbToLinear:t,hexToLinearRgb:e}},inputs:[],outputs:["srgbToLinear","hexToLinearRgb"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});l({root:document.getElementById("cell-60"),expanded:[],variables:[]},{id:60,body:(t,e)=>({colorScheme:t.schemeCategory10.map(e).map(([n,o,d])=>`vec3(${n},${o},${d})`)}),inputs:["d3","hexToLinearRgb"],outputs:["colorScheme"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
