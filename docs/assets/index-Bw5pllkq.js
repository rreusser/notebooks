const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/demo-renderer-CcTZQ-UQ.js","assets/webgpu-lines-D6bO6C4k.js"])))=>i.map(i=>d[i]);
import{d as y,_ as I}from"./index-ByB2dbry.js";y({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(n,i,t)=>{if(!navigator.gpu)throw n(i`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("Failed to get WebGPU adapter");const a=await e.requestDevice(),s=navigator.gpu.getPreferredCanvasFormat();return t.then(()=>a.destroy()),{adapter:e,device:a,canvasFormat:s}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async n=>{const{initDemoRenderer:i}=await I(()=>import("./demo-renderer-CcTZQ-UQ.js"),__vite__mapDeps([0,1])).then(e=>{if(!("initDemoRenderer"in e))throw new SyntaxError("export 'initDemoRenderer' not found");return e}),t=await i();return n.then(()=>t.destroy()),{initDemoRenderer:i,demoRenderer:t}},inputs:["invalidation"],outputs:["initDemoRenderer","demoRenderer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(n,i,t,e,a,s)=>{const[{createElementStack:r},{createZoomableAxes:d},{expandable:l}]=await Promise.all([I(()=>import("./element-stack-BU40TvN2.js"),[]).then(f=>{if(!("createElementStack"in f))throw new SyntaxError("export 'createElementStack' not found");return f}),I(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(f=>{if(!("createZoomableAxes"in f))throw new SyntaxError("export 'createZoomableAxes' not found");return f}),I(()=>import("./expandable-BdDyAI5Z.js"),[]).then(f=>{if(!("expandable"in f))throw new SyntaxError("export 'expandable' not found");return f})]),o=window.devicePixelRatio||1,c=Math.min(640,n),v=480,h=r({width:c,height:v,layers:[{id:"canvas",element:({current:f,width:u,height:g})=>{const m=f||document.createElement("canvas");return m.id="lines-canvas",m.width=Math.floor(u*o),m.height=Math.floor(g*o),m.style.width=`${u}px`,m.style.height=`${g}px`,m}},{id:"svg",element:({current:f,width:u,height:g})=>(f?i.select(f):i.create("svg")).attr("width",u).attr("height",g).style("cursor","grab").node()}]}),x=h.elements.canvas,w=x.getContext("webgpu");w.configure({device:t,format:e,alphaMode:"premultiplied"});const b={dirty:!0},B=d({d3:i,element:h.elements.svg,xScale:i.scaleLinear().domain([-1,1]).range([0,c]),yScale:i.scaleLinear().domain([-1,1]).range([v,0]),aspectRatio:1,onChange:()=>{b.dirty=!0,h.dispatchEvent(new CustomEvent("update"))}}),p=a`<figure style="margin: 0;">
  ${h.element}
  <figcaption>Drag handles to edit vertices. Drag background to pan, scroll to zoom.</figcaption>
</figure>`;return s(l(p,{width:c,height:v,controls:".lines-controls",onResize(f,u,g){h.resize(u,g),B.updateScales(i.scaleLinear().domain([-1,1]).range([0,u]),i.scaleLinear().domain([-1,1]).range([g,0])),b.dirty=!0,h.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:r,createZoomableAxes:d,expandable:l,dpr:o,canvasWidth:c,canvasHeight:v,stack:h,canvas:x,gpuContext:w,renderState:b,axes:B,figure:p}},inputs:["width","d3","device","canvasFormat","html","display"],outputs:["createElementStack","createZoomableAxes","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","renderState","axes","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(n,i)=>{const t=n.range([1,200],{label:"Line width",value:50,step:.5}),e=i(t),a=n.select(["bevel","miter","round"],{label:"Join type",value:"miter"}),s=i(a),r=n.select(["round","square","none"],{label:"Cap type",value:"round"}),d=i(r),l=n.select(["wave","zigzag","spiral"],{label:"Pattern",value:"zigzag"}),o=i(l),c=n.range([0,15],{label:"SDF stroke width",value:0,step:.5}),v=i(c),h=n.range([0,1],{label:"Alpha",value:1,step:.01}),x=i(h),w=n.toggle({label:"Line break",value:!1}),b=i(w),B=n.toggle({label:"Stripes",value:!1}),p=i(B);return{lineWidthInput:t,lineWidth:e,joinTypeInput:a,joinType:s,capTypeInput:r,capType:d,patternInput:l,pattern:o,sdfStrokeWidthInput:c,sdfStrokeWidth:v,alphaInput:h,alpha:x,lineBreakInput:w,lineBreak:b,stripesInput:B,stripes:p}},inputs:["Inputs","view"],outputs:["lineWidthInput","lineWidth","joinTypeInput","joinType","capTypeInput","capType","patternInput","pattern","sdfStrokeWidthInput","sdfStrokeWidth","alphaInput","alpha","lineBreakInput","lineBreak","stripesInput","stripes"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,i,t)=>{const e=n.range([1,10],{label:"Miter limit",value:4,step:.1,disabled:i!=="miter"}),a=t(e);return{miterLimitInput:e,miterLimit:a}},inputs:["Inputs","joinType","view"],outputs:["miterLimitInput","miterLimit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(n,i,t)=>{const e=n.range([2,16],{label:"Round join resolution",value:8,step:1,disabled:i!=="round"}),a=t(e);return{joinResolutionInput:e,joinResolution:a}},inputs:["Inputs","joinType","view"],outputs:["joinResolutionInput","joinResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,i,t)=>{const e=n.range([2,16],{label:"Round cap resolution",value:8,step:1,disabled:i!=="round"}),a=t(e);return{capResolutionInput:e,capResolution:a}},inputs:["Inputs","capType","view"],outputs:["capResolutionInput","capResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,i,t,e,a,s,r,d,l,o,c,v,h)=>{n(i`<div class="lines-controls" style="display: flex; gap: 20px; flex-wrap: wrap;">
  ${t}
  ${e}
  ${a}
  ${s}
  ${r}
  ${d}
  ${l}
  ${o}
  ${c}
  ${v}
  ${h}
</div>`)},inputs:["display","html","lineWidthInput","joinTypeInput","capTypeInput","patternInput","miterLimitInput","joinResolutionInput","capResolutionInput","sdfStrokeWidthInput","alphaInput","lineBreakInput","stripesInput"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(n,i,t,e,a,s)=>{const{createGPULines:r}=await I(()=>import("./webgpu-lines-D6bO6C4k.js"),[]).then(p=>{if(!("createGPULines"in p))throw new SyntaxError("export 'createGPULines' not found");return p});function d(p,f){let u;if(p==="zigzag"){u=[];for(let m=0;m<6;m++){const $=-.6+m/5*1.2,k=m%2===0?.2:-.2;u.push({x:$,y:k,z:0,w:1})}}else if(p==="spiral"){u=[];for(let m=0;m<80;m++){const C=m/79,$=C*Math.PI*6,k=.1+C*.6;u.push({x:k*Math.cos($),y:k*Math.sin($),z:0,w:1})}}else{u=[];for(let m=0;m<100;m++){const C=m/99,$=-.8+C*1.6,k=.3*Math.sin(C*Math.PI*4)+.2*Math.cos(C*Math.PI*7);u.push({x:$,y:k,z:0,w:1})}}if(f){const g=Math.floor(u.length/2);u.splice(g,0,{x:0,y:0,z:0,w:0})}return u}const l=d(n,i),o=l.length;function c(p){const f=new Float32Array(p.length*4);for(let u=0;u<p.length;u++)f[u*4+0]=p[u].x,f[u*4+1]=p[u].y,f[u*4+2]=p[u].z,f[u*4+3]=p[u].w;return f}function v(p){const f=new Float32Array(p.length);let u=0;for(let g=0;g<p.length;g++){if(p[g].w===0)u=0;else if(g>0&&p[g-1].w!==0){const m=p[g].x-p[g-1].x,C=p[g].y-p[g-1].y;u+=Math.sqrt(m*m+C*C)}f[g]=u}return f}const h=c(l),x=v(l),w=t.createBuffer({label:"line-positions",size:h.byteLength,usage:e.STORAGE|e.COPY_DST});t.queue.writeBuffer(w,0,h);const b=t.createBuffer({label:"line-distances",size:x.byteLength,usage:e.STORAGE|e.COPY_DST});t.queue.writeBuffer(b,0,x);function B(){const p=c(l),f=v(l);t.queue.writeBuffer(w,0,p),t.queue.writeBuffer(b,0,f),a.dirty=!0}return s.then(()=>{w.destroy(),b.destroy()}),{createGPULines:r,generatePattern:d,points:l,numPoints:o,pointsToFloat32Array:c,computeDistances:v,positions:h,distances:x,positionBuffer:w,distanceBuffer:b,updateBuffers:B}},inputs:["pattern","lineBreak","device","GPUBufferUsage","renderState","invalidation"],outputs:["createGPULines","generatePattern","points","numPoints","pointsToFloat32Array","computeDistances","positions","distances","positionBuffer","distanceBuffer","updateBuffers"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(n,i,t,e,a)=>{const s=n.select(i.elements.svg),r=t.map((o,c)=>({point:o,index:c})).filter(o=>o.point.w!==0),d=s.selectAll("circle.vertex-handle").data(r,o=>o.index).join("circle").attr("class","vertex-handle").attr("r",5).attr("fill","white").attr("stroke","#333").attr("stroke-width",1.5).attr("cursor","move").call(n.drag().on("start",function(){n.select(this).attr("stroke","#0066cc").attr("stroke-width",2)}).on("drag",function(o,c){c.point.x=e.xScale.invert(o.x),c.point.y=e.yScale.invert(o.y),n.select(this).attr("cx",o.x).attr("cy",o.y),a()}).on("end",function(){n.select(this).attr("stroke","#333").attr("stroke-width",1.5)}));function l(){d.attr("cx",o=>e.xScale(o.point.x)).attr("cy",o=>e.yScale(o.point.y))}return l(),i.addEventListener("update",l),{svg:s,editablePoints:r,circles:d,updateHandlePositions:l}},inputs:["d3","stack","points","axes","updateBuffers"],outputs:["svg","editablePoints","circles","updateHandlePositions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(n,i,t,e,a,s,r,d,l,o,c,v,h,x,w)=>{const b=s>0,B=b||r<1,p=`
  @group(1) @binding(0) var<storage, read> positions: array<vec4f>;
  @group(1) @binding(1) var<storage, read> distances: array<f32>;
  @group(1) @binding(2) var<uniform> viewMatrix: mat4x4f;

  struct Vertex {
    position: vec4f,
    width: f32,
    dist: f32,  // cumulative distance along line - becomes a varying
  }

  fn getVertex(index: u32) -> Vertex {
    let p = positions[index];
    let d = distances[index];
    let projected = viewMatrix * vec4f(p.xyz, 1.0);
    return Vertex(vec4f(projected.xyz, p.w * projected.w), uniforms.width, d);
  }
`,f=d?`
  fn getColor(lineCoord: vec2f, dist: f32) -> vec4f {
    let stripeFreq = 20.0;  // stripes per unit distance
    let stripe = step(0.5, fract(dist * stripeFreq));
    let baseColor = vec3f(0.4, 0.7, 1.0);
    let stripeColor = vec3f(0.1, 0.2, 0.4);
    let color = mix(baseColor, stripeColor, stripe);
    return vec4f(color, ${r.toFixed(2)});
  }
`:`
  fn getColor(lineCoord: vec2f, dist: f32) -> vec4f {
    return vec4f(0.4, 0.7, 1.0, ${r.toFixed(2)});
  }
`,u=e==="square"?"max(abs(lineCoord.x), abs(lineCoord.y))":"length(lineCoord.xy)",g=d?`
  fn linearstep(a: f32, b: f32, x: f32) -> f32 {
    return clamp((x - a) / (b - a), 0.0, 1.0);
  }
  fn getColor(lineCoord: vec2f, dist: f32) -> vec4f {
    let width = uniforms.width;
    let strokeWidth = ${s.toFixed(1)};
    let sdf = 0.5 * width * ${u};
    let aa = linearstep(width * 0.5, width * 0.5 - 1.0, sdf) * ${r.toFixed(2)};
    let strokeMask = linearstep(width * 0.5 - strokeWidth - 0.5, width * 0.5 - strokeWidth + 0.5, sdf);
    // Stripes based on distance
    let stripeFreq = 20.0;
    let stripe = step(0.5, fract(dist * stripeFreq));
    let fillColor = mix(vec3f(0.4, 0.7, 1.0), vec3f(0.1, 0.2, 0.4), stripe);
    let strokeColor = vec3f(0.1, 0.2, 0.4);
    let color = mix(fillColor, strokeColor, strokeMask);
    return vec4f(color, aa);
  }
`:`
  fn linearstep(a: f32, b: f32, x: f32) -> f32 {
    return clamp((x - a) / (b - a), 0.0, 1.0);
  }
  fn getColor(lineCoord: vec2f, dist: f32) -> vec4f {
    let width = uniforms.width;
    let strokeWidth = ${s.toFixed(1)};
    let sdf = 0.5 * width * ${u};
    let aa = linearstep(width * 0.5, width * 0.5 - 1.0, sdf) * ${r.toFixed(2)};
    let strokeMask = linearstep(width * 0.5 - strokeWidth - 0.5, width * 0.5 - strokeWidth + 0.5, sdf);
    let fillColor = vec3f(0.4, 0.7, 1.0);
    let strokeColor = vec3f(0.1, 0.2, 0.4);
    let color = mix(fillColor, strokeColor, strokeMask);
    return vec4f(color, aa);
  }
`,m=l(o,{format:c,join:n,joinResolution:i,miterLimit:t,cap:e,capResolution:a,vertexShaderBody:p,fragmentShaderBody:b?g:f,blend:B?{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}:null}),C=o.createBuffer({label:"view-matrix",size:64,usage:v.UNIFORM|v.COPY_DST}),$=o.createBindGroup({layout:m.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:{buffer:x}},{binding:2,resource:{buffer:C}}]});return w.then(()=>{m.destroy(),C.destroy()}),{useSdfMode:b,useBlend:B,vertexShaderBody:p,standardFragmentShader:f,sdfDistFn:u,sdfFragmentShader:g,gpuLines:m,viewMatrixBuffer:C,dataBindGroup:$}},inputs:["joinType","joinResolution","miterLimit","capType","capResolution","sdfStrokeWidth","alpha","stripes","createGPULines","device","canvasFormat","GPUBufferUsage","positionBuffer","distanceBuffer","invalidation"],outputs:["useSdfMode","useBlend","vertexShaderBody","standardFragmentShader","sdfDistFn","sdfFragmentShader","gpuLines","viewMatrixBuffer","dataBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:async(n,i,t,e,a,s,r,d,l,o,c)=>{const{createFrameLoop:v}=await I(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(x=>{if(!("createFrameLoop"in x))throw new SyntaxError("export 'createFrameLoop' not found");return x});i.dirty=!0;const h=v(()=>{if(i.dirty){t.queue.writeBuffer(e,0,a.view);const x=t.createCommandEncoder(),w=x.beginRenderPass({colorAttachments:[{view:s.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.95,g:.95,b:.95,a:1}}]});r.draw(w,{vertexCount:d,width:n,resolution:[l.width,l.height]},[o]),w.end(),t.queue.submit([x.finish()]),i.dirty=!1}});return c.then(()=>h.cancel()),{createFrameLoop:v,loop:h}},inputs:["lineWidth","renderState","device","viewMatrixBuffer","axes","gpuContext","gpuLines","numPoints","canvas","dataBindGroup","invalidation"],outputs:["createFrameLoop","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:async(n,i,t)=>{{const e=(l,o=200,c=120)=>n`<canvas id="${l}" style="width: ${o}px; height: ${c}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-join-bevel"),s=e("demo-join-miter"),r=e("demo-join-round");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>join: 'bevel'</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>join: 'miter'</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${r}
      <figcaption><code>join: 'round'</code></figcaption>
    </figure>
  </div>`);const d={pattern:"join-demo",lineWidth:25,cap:"round",miterLimit:10,width:200,height:120};await t.renderToCanvas(a,{...d,join:"bevel"}),await t.renderToCanvas(s,{...d,join:"miter"}),await t.renderToCanvas(r,{...d,join:"round"})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:async(n,i,t)=>{{const e=(l,o=200,c=120)=>n`<canvas id="${l}" style="width: ${o}px; height: ${c}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-cap-round"),s=e("demo-cap-square"),r=e("demo-cap-none");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>cap: 'round'</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>cap: 'square'</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${r}
      <figcaption><code>cap: 'none'</code></figcaption>
    </figure>
  </div>`);const d={pattern:"cap-demo",lineWidth:35,width:200,height:120};await t.renderToCanvas(a,{...d,cap:"round"}),await t.renderToCanvas(s,{...d,cap:"square"}),await t.renderToCanvas(r,{...d,cap:"none"})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:async(n,i,t)=>{{const e=(l,o=200,c=120)=>n`<canvas id="${l}" style="width: ${o}px; height: ${c}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-miter-1"),s=e("demo-miter-4"),r=e("demo-miter-10");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>miterLimit: 1</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>miterLimit: 4</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${r}
      <figcaption><code>miterLimit: 10</code></figcaption>
    </figure>
  </div>`);const d={pattern:"miter-demo",lineWidth:28,join:"miter",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...d,miterLimit:1}),await t.renderToCanvas(s,{...d,miterLimit:4}),await t.renderToCanvas(r,{...d,miterLimit:10})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:async(n,i,t)=>{{const e=(l,o=200,c=120)=>n`<canvas id="${l}" style="width: ${o}px; height: ${c}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-res-2"),s=e("demo-res-4"),r=e("demo-res-16");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>joinResolution: 2</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>joinResolution: 4</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${r}
      <figcaption><code>joinResolution: 16</code></figcaption>
    </figure>
  </div>`);const d={pattern:"resolution-demo",lineWidth:35,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...d,joinResolution:2}),await t.renderToCanvas(s,{...d,joinResolution:4}),await t.renderToCanvas(r,{...d,joinResolution:16})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:async(n,i,t)=>{{const e=(d,l=200,o=120)=>n`<canvas id="${d}" style="width: ${l}px; height: ${o}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-continuous"),s=e("demo-with-break");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption>Continuous line</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption>With line break (<code>w: 0</code>)</figcaption>
    </figure>
  </div>`);const r={pattern:"break-demo",lineWidth:22,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...r,lineBreak:!1}),await t.renderToCanvas(s,{...r,lineBreak:!0})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:async(n,i,t)=>{{const e=(c,v=200,h=120)=>n`<canvas id="${c}" style="width: ${v}px; height: ${h}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-lc-x"),s=e("demo-lc-y");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>lineCoord.x</code> (0 on segments, varies in caps)</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>lineCoord.y</code> (across line)</figcaption>
    </figure>
  </div>`);const r=`
    fn getColor(lineCoord: vec2f) -> vec4f {
      // lineCoord.x is 0 for segments, varies in caps (sin(theta))
      let t = abs(lineCoord.x);
      // Blue for segments (x=0), orange gradient in caps
      return vec4f(t, 0.4 * (1.0 - t), 1.0 - t, 1.0);
    }
  `,d=`
    fn getColor(lineCoord: vec2f) -> vec4f {
      let t = lineCoord.y * 0.5 + 0.5;
      return vec4f(t, 0.3, 1.0 - t, 1.0);
    }
  `,l={pattern:"cap-demo",lineWidth:35,join:"round",cap:"round",width:200,height:120},o={pattern:"shader-demo",lineWidth:28,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...l,fragmentShaderBody:r}),await t.renderToCanvas(s,{...o,fragmentShaderBody:d})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-32"),expanded:[],variables:[]},{id:32,body:async(n,i,t)=>{{const e=(h,x=200,w=120)=>n`<canvas id="${h}" style="width: ${x}px; height: ${w}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-stripes"),s=e("demo-gradient"),r=e("demo-sdf-stroke");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption>Cross-line stripes</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption>Cross-line gradient</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${r}
      <figcaption>SDF stroke</figcaption>
    </figure>
  </div>`);const d=`
    fn getColor(lineCoord: vec2f) -> vec4f {
      // Cross-line stripes using lineCoord.y
      let stripe = step(0.0, lineCoord.y);
      return vec4f(stripe * 0.2, 0.5, 0.9 - stripe * 0.4, 1.0);
    }
  `,l=`
    fn getColor(lineCoord: vec2f) -> vec4f {
      let t = lineCoord.y * 0.5 + 0.5;
      let top = vec3f(1.0, 0.4, 0.2);
      let bottom = vec3f(0.2, 0.4, 1.0);
      let color = mix(bottom, top, t);
      return vec4f(color, 1.0);
    }
  `,o=`
    fn linearstep(a: f32, b: f32, x: f32) -> f32 {
      return clamp((x - a) / (b - a), 0.0, 1.0);
    }
    fn getColor(lineCoord: vec2f) -> vec4f {
      let width = 28.0;
      let strokeWidth = 5.0;
      // For SDF, use abs(y) which is -1 to 1 across the line
      let dist = abs(lineCoord.y);
      let sdf = 0.5 * width * dist;
      let aa = linearstep(width * 0.5, width * 0.5 - 1.0, sdf);
      let strokeMask = linearstep(width * 0.5 - strokeWidth - 0.5, width * 0.5 - strokeWidth + 0.5, sdf);
      let fillColor = vec3f(0.4, 0.7, 1.0);
      let strokeColor = vec3f(0.1, 0.3, 0.6);
      let color = mix(fillColor, strokeColor, strokeMask);
      return vec4f(color, aa);
    }
  `,c={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},v={pattern:"shader-demo",join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...v,lineWidth:28,fragmentShaderBody:d}),await t.renderToCanvas(s,{...v,lineWidth:28,fragmentShaderBody:l}),await t.renderToCanvas(r,{...v,lineWidth:28,fragmentShaderBody:o,blend:c})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
