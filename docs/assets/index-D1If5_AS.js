const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/demo-renderer-CcTZQ-UQ.js","assets/webgpu-lines-D6bO6C4k.js"])))=>i.map(i=>d[i]);
import{d as x,_ as E}from"./index-ByB2dbry.js";x({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(n,i,t)=>{if(!navigator.gpu)throw n(i`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("Failed to get WebGPU adapter");const a=await e.requestDevice(),s=navigator.gpu.getPreferredCanvasFormat();return t.then(()=>a.destroy()),{adapter:e,device:a,canvasFormat:s}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async n=>{const{initDemoRenderer:i}=await E(()=>import("./demo-renderer-CcTZQ-UQ.js"),__vite__mapDeps([0,1])).then(e=>{if(!("initDemoRenderer"in e))throw new SyntaxError("export 'initDemoRenderer' not found");return e}),t=await i();return n.then(()=>t.destroy()),{initDemoRenderer:i,demoRenderer:t}},inputs:["invalidation"],outputs:["initDemoRenderer","demoRenderer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(n,i,t,e,a,s)=>{const[{createElementStack:r},{createZoomableAxes:d},{expandable:l}]=await Promise.all([E(()=>import("./element-stack-BU40TvN2.js"),[]).then(h=>{if(!("createElementStack"in h))throw new SyntaxError("export 'createElementStack' not found");return h}),E(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(h=>{if(!("createZoomableAxes"in h))throw new SyntaxError("export 'createZoomableAxes' not found");return h}),E(()=>import("./expandable-BdDyAI5Z.js"),[]).then(h=>{if(!("expandable"in h))throw new SyntaxError("export 'expandable' not found");return h})]),o=window.devicePixelRatio||1,c=Math.min(640,n),m=480,f=r({width:c,height:m,layers:[{id:"canvas",element:({current:h,width:p,height:g})=>{const u=h||document.createElement("canvas");return u.id="lines-canvas",u.width=Math.floor(p*o),u.height=Math.floor(g*o),u.style.width=`${p}px`,u.style.height=`${g}px`,u}},{id:"svg",element:({current:h,width:p,height:g})=>(h?i.select(h):i.create("svg")).attr("width",p).attr("height",g).style("cursor","grab").node()}]}),y=f.elements.canvas,b=y.getContext("webgpu");b.configure({device:t,format:e,alphaMode:"premultiplied"});const $={dirty:!0},I=d({d3:i,element:f.elements.svg,xScale:i.scaleLinear().domain([-1,1]).range([0,c]),yScale:i.scaleLinear().domain([-1,1]).range([m,0]),aspectRatio:1,onChange:()=>{$.dirty=!0,f.dispatchEvent(new CustomEvent("update"))}}),B=a`<figure style="margin: 0;">
  ${f.element}
  <figcaption>Drag handles to edit vertices. Drag background to pan, scroll to zoom.</figcaption>
</figure>`;return s(l(B,{width:c,height:m,controls:".lines-controls",onResize(h,p,g){f.resize(p,g),I.updateScales(i.scaleLinear().domain([-1,1]).range([0,p]),i.scaleLinear().domain([-1,1]).range([g,0])),$.dirty=!0,f.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:r,createZoomableAxes:d,expandable:l,dpr:o,canvasWidth:c,canvasHeight:m,stack:f,canvas:y,gpuContext:b,renderState:$,axes:I,figure:B}},inputs:["width","d3","device","canvasFormat","html","display"],outputs:["createElementStack","createZoomableAxes","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","renderState","axes","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(n,i)=>{const t=n.range([1,200],{label:"Line width",value:50,step:.5}),e=i(t),a=n.select(["bevel","miter","round"],{label:"Join type",value:"miter"}),s=i(a),r=n.select(["round","square","none"],{label:"Cap type",value:"round"}),d=i(r),l=n.select(["wave","zigzag","spiral"],{label:"Pattern",value:"zigzag"}),o=i(l),c=n.range([0,15],{label:"SDF stroke width",value:0,step:.5}),m=i(c),f=n.range([0,1],{label:"Alpha",value:1,step:.01}),y=i(f),b=n.toggle({label:"Line break",value:!1}),$=i(b),I=n.toggle({label:"Stripes",value:!1}),B=i(I),h=n.toggle({label:"Varying width",value:!1}),p=i(h);return{lineWidthInput:t,lineWidth:e,joinTypeInput:a,joinType:s,capTypeInput:r,capType:d,patternInput:l,pattern:o,sdfStrokeWidthInput:c,sdfStrokeWidth:m,alphaInput:f,alpha:y,lineBreakInput:b,lineBreak:$,stripesInput:I,stripes:B,varyingWidthInput:h,varyingWidth:p}},inputs:["Inputs","view"],outputs:["lineWidthInput","lineWidth","joinTypeInput","joinType","capTypeInput","capType","patternInput","pattern","sdfStrokeWidthInput","sdfStrokeWidth","alphaInput","alpha","lineBreakInput","lineBreak","stripesInput","stripes","varyingWidthInput","varyingWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,i,t)=>{const e=n.range([1,10],{label:"Miter limit",value:4,step:.1,disabled:i!=="miter"}),a=t(e);return{miterLimitInput:e,miterLimit:a}},inputs:["Inputs","joinType","view"],outputs:["miterLimitInput","miterLimit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(n,i,t)=>{const e=n.range([2,16],{label:"Round join resolution",value:8,step:1,disabled:i!=="round"}),a=t(e);return{joinResolutionInput:e,joinResolution:a}},inputs:["Inputs","joinType","view"],outputs:["joinResolutionInput","joinResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,i,t)=>{const e=n.range([2,16],{label:"Round cap resolution",value:8,step:1,disabled:i!=="round"}),a=t(e);return{capResolutionInput:e,capResolution:a}},inputs:["Inputs","capType","view"],outputs:["capResolutionInput","capResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,i,t,e,a,s,r,d,l,o,c,m,f,y)=>{n(i`<div class="lines-controls" style="display: flex; gap: 20px; flex-wrap: wrap;">
  ${t}
  ${e}
  ${a}
  ${s}
  ${r}
  ${d}
  ${l}
  ${o}
  ${c}
  ${m}
  ${f}
  ${y}
</div>`)},inputs:["display","html","lineWidthInput","joinTypeInput","capTypeInput","patternInput","miterLimitInput","joinResolutionInput","capResolutionInput","sdfStrokeWidthInput","alphaInput","lineBreakInput","stripesInput","varyingWidthInput"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(n,i,t,e,a,s)=>{const{createGPULines:r}=await E(()=>import("./webgpu-lines-D6bO6C4k.js"),[]).then(p=>{if(!("createGPULines"in p))throw new SyntaxError("export 'createGPULines' not found");return p});function d(p,g){let u;if(p==="zigzag"){u=[];for(let v=0;v<6;v++){const k=-.6+v/5*1.2,W=v%2===0?.2:-.2;u.push({x:k,y:W,z:0,w:1})}}else if(p==="spiral"){u=[];for(let v=0;v<80;v++){const C=v/79,k=C*Math.PI*6,W=.1+C*.6;u.push({x:W*Math.cos(k),y:W*Math.sin(k),z:0,w:1})}}else{u=[];for(let v=0;v<100;v++){const C=v/99,k=-.8+C*1.6,W=.3*Math.sin(C*Math.PI*4)+.2*Math.cos(C*Math.PI*7);u.push({x:k,y:W,z:0,w:1})}}if(g){const w=Math.floor(u.length/2);u.splice(w,0,{x:0,y:0,z:0,w:0})}return u}const l=d(n,i),o=l.length;function c(p){const g=new Float32Array(p.length*4);for(let u=0;u<p.length;u++)g[u*4+0]=p[u].x,g[u*4+1]=p[u].y,g[u*4+2]=p[u].z,g[u*4+3]=p[u].w;return g}function m(p){const g=new Float32Array(p.length);let u=0;for(let w=0;w<p.length;w++){if(p[w].w===0)u=0;else if(w>0&&p[w-1].w!==0){const v=p[w].x-p[w-1].x,C=p[w].y-p[w-1].y;u+=Math.sqrt(v*v+C*C)}g[w]=u}return g}const f=c(l),y=m(l),b=Math.max(...y),$=t.createBuffer({label:"line-positions",size:f.byteLength,usage:e.STORAGE|e.COPY_DST});t.queue.writeBuffer($,0,f);const I=t.createBuffer({label:"line-distances",size:y.byteLength,usage:e.STORAGE|e.COPY_DST});t.queue.writeBuffer(I,0,y);const B=t.createBuffer({label:"total-distance",size:4,usage:e.UNIFORM|e.COPY_DST});t.queue.writeBuffer(B,0,new Float32Array([b]));function h(){const p=c(l),g=m(l),u=Math.max(...g);t.queue.writeBuffer($,0,p),t.queue.writeBuffer(I,0,g),t.queue.writeBuffer(B,0,new Float32Array([u])),a.dirty=!0}return s.then(()=>{$.destroy(),I.destroy(),B.destroy()}),{createGPULines:r,generatePattern:d,points:l,numPoints:o,pointsToFloat32Array:c,computeDistances:m,positions:f,distances:y,totalDistance:b,positionBuffer:$,distanceBuffer:I,totalDistanceBuffer:B,updateBuffers:h}},inputs:["pattern","lineBreak","device","GPUBufferUsage","renderState","invalidation"],outputs:["createGPULines","generatePattern","points","numPoints","pointsToFloat32Array","computeDistances","positions","distances","totalDistance","positionBuffer","distanceBuffer","totalDistanceBuffer","updateBuffers"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(n,i,t,e,a)=>{const s=n.select(i.elements.svg),r=t.map((o,c)=>({point:o,index:c})).filter(o=>o.point.w!==0),d=s.selectAll("circle.vertex-handle").data(r,o=>o.index).join("circle").attr("class","vertex-handle").attr("r",5).attr("fill","white").attr("stroke","#333").attr("stroke-width",1.5).attr("cursor","move").call(n.drag().on("start",function(){n.select(this).attr("stroke","#0066cc").attr("stroke-width",2)}).on("drag",function(o,c){c.point.x=e.xScale.invert(o.x),c.point.y=e.yScale.invert(o.y),n.select(this).attr("cx",o.x).attr("cy",o.y),a()}).on("end",function(){n.select(this).attr("stroke","#333").attr("stroke-width",1.5)}));function l(){d.attr("cx",o=>e.xScale(o.point.x)).attr("cy",o=>e.yScale(o.point.y))}return l(),i.addEventListener("update",l),{svg:s,editablePoints:r,circles:d,updateHandlePositions:l}},inputs:["d3","stack","points","axes","updateBuffers"],outputs:["svg","editablePoints","circles","updateHandlePositions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(n,i,t,e,a,s,r,d,l,o,c,m,f,y,b,$,I)=>{const B=s>0,h=B||r<1,p=`
  @group(1) @binding(0) var<storage, read> positions: array<vec4f>;
  @group(1) @binding(1) var<storage, read> distances: array<f32>;
  @group(1) @binding(2) var<uniform> viewMatrix: mat4x4f;
  @group(1) @binding(3) var<uniform> totalDistance: f32;

  struct Vertex {
    position: vec4f,
    width: f32,
    dist: f32,      // cumulative distance along line
    lineWidth: f32, // interpolated width for fragment shader
  }

  fn getVertex(index: u32) -> Vertex {
    let p = positions[index];
    let d = distances[index];
    let projected = viewMatrix * vec4f(p.xyz, 1.0);
    // Reference totalDistance to ensure it's included in bind group layout
    let normalizedDist = d / totalDistance;
    let w = ${l?"uniforms.width * (0.5 + 1.5 * normalizedDist)":"uniforms.width"};
    return Vertex(vec4f(projected.xyz, p.w * projected.w), w, d, w);
  }
`,g=d?`
  fn getColor(lineCoord: vec2f, dist: f32, lineWidth: f32) -> vec4f {
    let stripeFreq = 20.0;  // stripes per unit distance
    let stripe = step(0.5, fract(dist * stripeFreq));
    let baseColor = vec3f(0.4, 0.7, 1.0);
    let stripeColor = vec3f(0.1, 0.2, 0.4);
    let color = mix(baseColor, stripeColor, stripe);
    return vec4f(color, ${r.toFixed(2)});
  }
`:`
  fn getColor(lineCoord: vec2f, dist: f32, lineWidth: f32) -> vec4f {
    return vec4f(0.4, 0.7, 1.0, ${r.toFixed(2)});
  }
`,u=e==="square"?"max(abs(lineCoord.x), abs(lineCoord.y))":"length(lineCoord.xy)",w=d?`
  fn linearstep(a: f32, b: f32, x: f32) -> f32 {
    return clamp((x - a) / (b - a), 0.0, 1.0);
  }
  fn getColor(lineCoord: vec2f, dist: f32, lineWidth: f32) -> vec4f {
    let strokeWidth = ${s.toFixed(1)};
    let sdf = 0.5 * lineWidth * ${u};
    let aa = linearstep(lineWidth * 0.5, lineWidth * 0.5 - 1.0, sdf) * ${r.toFixed(2)};
    let strokeMask = linearstep(lineWidth * 0.5 - strokeWidth - 0.5, lineWidth * 0.5 - strokeWidth + 0.5, sdf);
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
  fn getColor(lineCoord: vec2f, dist: f32, lineWidth: f32) -> vec4f {
    let strokeWidth = ${s.toFixed(1)};
    let sdf = 0.5 * lineWidth * ${u};
    let aa = linearstep(lineWidth * 0.5, lineWidth * 0.5 - 1.0, sdf) * ${r.toFixed(2)};
    let strokeMask = linearstep(lineWidth * 0.5 - strokeWidth - 0.5, lineWidth * 0.5 - strokeWidth + 0.5, sdf);
    let fillColor = vec3f(0.4, 0.7, 1.0);
    let strokeColor = vec3f(0.1, 0.2, 0.4);
    let color = mix(fillColor, strokeColor, strokeMask);
    return vec4f(color, aa);
  }
`,v=o(c,{format:m,join:n,joinResolution:i,miterLimit:t,cap:e,capResolution:a,vertexShaderBody:p,fragmentShaderBody:B?w:g,blend:h?{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}:null}),C=c.createBuffer({label:"view-matrix",size:64,usage:f.UNIFORM|f.COPY_DST}),k=c.createBindGroup({layout:v.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:y}},{binding:1,resource:{buffer:b}},{binding:2,resource:{buffer:C}},{binding:3,resource:{buffer:$}}]});return I.then(()=>{v.destroy(),C.destroy()}),{useSdfMode:B,useBlend:h,vertexShaderBody:p,standardFragmentShader:g,sdfDistFn:u,sdfFragmentShader:w,gpuLines:v,viewMatrixBuffer:C,dataBindGroup:k}},inputs:["joinType","joinResolution","miterLimit","capType","capResolution","sdfStrokeWidth","alpha","stripes","varyingWidth","createGPULines","device","canvasFormat","GPUBufferUsage","positionBuffer","distanceBuffer","totalDistanceBuffer","invalidation"],outputs:["useSdfMode","useBlend","vertexShaderBody","standardFragmentShader","sdfDistFn","sdfFragmentShader","gpuLines","viewMatrixBuffer","dataBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:async(n,i,t,e,a,s,r,d,l,o,c)=>{const{createFrameLoop:m}=await E(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(y=>{if(!("createFrameLoop"in y))throw new SyntaxError("export 'createFrameLoop' not found");return y});i.dirty=!0;const f=m(()=>{if(i.dirty){t.queue.writeBuffer(e,0,a.view);const y=t.createCommandEncoder(),b=y.beginRenderPass({colorAttachments:[{view:s.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.95,g:.95,b:.95,a:1}}]});r.draw(b,{vertexCount:d,width:n,resolution:[l.width,l.height]},[o]),b.end(),t.queue.submit([y.finish()]),i.dirty=!1}});return c.then(()=>f.cancel()),{createFrameLoop:m,loop:f}},inputs:["lineWidth","renderState","device","viewMatrixBuffer","axes","gpuContext","gpuLines","numPoints","canvas","dataBindGroup","invalidation"],outputs:["createFrameLoop","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:async(n,i,t)=>{{const e=(l,o=200,c=120)=>n`<canvas id="${l}" style="width: ${o}px; height: ${c}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-join-bevel"),s=e("demo-join-miter"),r=e("demo-join-round");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
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
  </div>`);const d={pattern:"join-demo",lineWidth:25,cap:"round",miterLimit:10,width:200,height:120};await t.renderToCanvas(a,{...d,join:"bevel"}),await t.renderToCanvas(s,{...d,join:"miter"}),await t.renderToCanvas(r,{...d,join:"round"})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:async(n,i,t)=>{{const e=(l,o=200,c=120)=>n`<canvas id="${l}" style="width: ${o}px; height: ${c}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-cap-round"),s=e("demo-cap-square"),r=e("demo-cap-none");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
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
  </div>`);const d={pattern:"cap-demo",lineWidth:35,width:200,height:120};await t.renderToCanvas(a,{...d,cap:"round"}),await t.renderToCanvas(s,{...d,cap:"square"}),await t.renderToCanvas(r,{...d,cap:"none"})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:async(n,i,t)=>{{const e=(l,o=200,c=120)=>n`<canvas id="${l}" style="width: ${o}px; height: ${c}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-miter-1"),s=e("demo-miter-4"),r=e("demo-miter-10");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
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
  </div>`);const d={pattern:"miter-demo",lineWidth:28,join:"miter",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...d,miterLimit:1}),await t.renderToCanvas(s,{...d,miterLimit:4}),await t.renderToCanvas(r,{...d,miterLimit:10})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-25"),expanded:[],variables:[]},{id:25,body:async(n,i,t)=>{{const e=(l,o=200,c=120)=>n`<canvas id="${l}" style="width: ${o}px; height: ${c}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-res-2"),s=e("demo-res-4"),r=e("demo-res-16");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
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
  </div>`);const d={pattern:"resolution-demo",lineWidth:35,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...d,joinResolution:2}),await t.renderToCanvas(s,{...d,joinResolution:4}),await t.renderToCanvas(r,{...d,joinResolution:16})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:async(n,i,t)=>{{const e=(d,l=200,o=120)=>n`<canvas id="${d}" style="width: ${l}px; height: ${o}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-continuous"),s=e("demo-with-break");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption>Continuous line</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption>With line break (<code>w: 0</code>)</figcaption>
    </figure>
  </div>`);const r={pattern:"break-demo",lineWidth:22,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...r,lineBreak:!1}),await t.renderToCanvas(s,{...r,lineBreak:!0})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-31"),expanded:[],variables:[]},{id:31,body:async(n,i,t)=>{{const e=(c,m=200,f=120)=>n`<canvas id="${c}" style="width: ${m}px; height: ${f}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-lc-x"),s=e("demo-lc-y");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
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
  `,l={pattern:"cap-demo",lineWidth:35,join:"round",cap:"round",width:200,height:120},o={pattern:"shader-demo",lineWidth:28,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...l,fragmentShaderBody:r}),await t.renderToCanvas(s,{...o,fragmentShaderBody:d})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-33"),expanded:[],variables:[]},{id:33,body:async(n,i,t)=>{{const e=(f,y=200,b=120)=>n`<canvas id="${f}" style="width: ${y}px; height: ${b}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-stripes"),s=e("demo-gradient"),r=e("demo-sdf-stroke");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px;">
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
  `,c={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},m={pattern:"shader-demo",join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...m,lineWidth:28,fragmentShaderBody:d}),await t.renderToCanvas(s,{...m,lineWidth:28,fragmentShaderBody:l}),await t.renderToCanvas(r,{...m,lineWidth:28,fragmentShaderBody:o,blend:c})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
