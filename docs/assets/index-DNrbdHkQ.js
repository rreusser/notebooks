const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/demo-renderer-DSE4mOVn.js","assets/webgpu-lines-DopDqc-X.js"])))=>i.map(i=>d[i]);
import{d as x,_ as S}from"./index-ByB2dbry.js";x({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(n,i,t)=>{if(!navigator.gpu)throw n(i`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("Failed to get WebGPU adapter");const a=await e.requestDevice(),s=navigator.gpu.getPreferredCanvasFormat();return t.then(()=>a.destroy()),{adapter:e,device:a,canvasFormat:s}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async n=>{const{initDemoRenderer:i}=await S(()=>import("./demo-renderer-DSE4mOVn.js"),__vite__mapDeps([0,1])).then(e=>{if(!("initDemoRenderer"in e))throw new SyntaxError("export 'initDemoRenderer' not found");return e}),t=await i();return n.then(()=>t.destroy()),{initDemoRenderer:i,demoRenderer:t}},inputs:["invalidation"],outputs:["initDemoRenderer","demoRenderer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(n,i,t,e,a,s)=>{const[{createElementStack:d},{createZoomableAxes:r},{expandable:u}]=await Promise.all([S(()=>import("./element-stack-BU40TvN2.js"),[]).then(m=>{if(!("createElementStack"in m))throw new SyntaxError("export 'createElementStack' not found");return m}),S(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(m=>{if(!("createZoomableAxes"in m))throw new SyntaxError("export 'createZoomableAxes' not found");return m}),S(()=>import("./expandable-goukRGI0.js"),[]).then(m=>{if(!("expandable"in m))throw new SyntaxError("export 'expandable' not found");return m})]),o=window.devicePixelRatio||1,p=Math.min(640,n),g=480,y=d({width:p,height:g,layers:[{id:"canvas",element:({current:m,width:c,height:f})=>{const l=m||document.createElement("canvas");return l.id="lines-canvas",l.width=Math.floor(c*o),l.height=Math.floor(f*o),l.style.width=`${c}px`,l.style.height=`${f}px`,l}},{id:"svg",element:({current:m,width:c,height:f})=>(m?i.select(m):i.create("svg")).attr("width",c).attr("height",f).style("cursor","grab").node()}]}),h=y.elements.canvas,C=h.getContext("webgpu");C.configure({device:t,format:e,alphaMode:"premultiplied"});const I={dirty:!0},v=r({d3:i,element:y.elements.svg,xScale:i.scaleLinear().domain([-1,1]).range([0,p]),yScale:i.scaleLinear().domain([-1,1]).range([g,0]),aspectRatio:1,onChange:()=>{I.dirty=!0,y.dispatchEvent(new CustomEvent("update"))}}),B=a`<figure style="margin: 0;">
  ${y.element}
  <figcaption>Drag handles to edit vertices. Drag background to pan, scroll to zoom.</figcaption>
</figure>`;return s(u(B,{width:p,height:g,controls:".lines-controls",onResize(m,c,f){y.resize(c,f),v.updateScales(i.scaleLinear().domain([-1,1]).range([0,c]),i.scaleLinear().domain([-1,1]).range([f,0])),I.dirty=!0,y.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:d,createZoomableAxes:r,expandable:u,dpr:o,canvasWidth:p,canvasHeight:g,stack:y,canvas:h,gpuContext:C,renderState:I,axes:v,figure:B}},inputs:["width","d3","device","canvasFormat","html","display"],outputs:["createElementStack","createZoomableAxes","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","renderState","axes","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(n,i)=>{const t=n.range([1,100],{label:"Line width",value:50,step:.5}),e=i(t),a=n.select(["bevel","miter","round"],{label:"Join type",value:"miter"}),s=i(a),d=n.select(["round","square","none"],{label:"Cap type",value:"round"}),r=i(d),u=n.select(["wave","zigzag","spiral"],{label:"Pattern",value:"zigzag"}),o=i(u),p=n.range([0,50],{label:"SDF stroke width",value:10,step:.5}),g=i(p),y=n.range([0,1],{label:"Alpha",value:1,step:.01}),h=i(y),C=n.toggle({label:"Line break",value:!1}),I=i(C),v=n.toggle({label:"Stripes",value:!1}),B=i(v),m=n.toggle({label:"Varying width",value:!1}),c=i(m),f=n.toggle({label:"Debug view",value:"Debug view"}),l=i(f);return{lineWidthInput:t,lineWidth:e,joinTypeInput:a,joinType:s,capTypeInput:d,capType:r,patternInput:u,pattern:o,sdfStrokeWidthInput:p,sdfStrokeWidth:g,alphaInput:y,alpha:h,lineBreakInput:C,lineBreak:I,stripesInput:v,stripes:B,varyingWidthInput:m,varyingWidth:c,debugViewInput:f,debugView:l}},inputs:["Inputs","view"],outputs:["lineWidthInput","lineWidth","joinTypeInput","joinType","capTypeInput","capType","patternInput","pattern","sdfStrokeWidthInput","sdfStrokeWidth","alphaInput","alpha","lineBreakInput","lineBreak","stripesInput","stripes","varyingWidthInput","varyingWidth","debugViewInput","debugView"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,i,t)=>{const e=n.range([1,10],{label:"Miter limit",value:4,step:.1,disabled:i!=="miter"}),a=t(e);return{miterLimitInput:e,miterLimit:a}},inputs:["Inputs","joinType","view"],outputs:["miterLimitInput","miterLimit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(n,i,t)=>{const e=n.range([2,16],{label:"Round join resolution",value:8,step:1,disabled:i!=="round"}),a=t(e);return{joinResolutionInput:e,joinResolution:a}},inputs:["Inputs","joinType","view"],outputs:["joinResolutionInput","joinResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,i,t)=>{const e=n.range([2,16],{label:"Round cap resolution",value:8,step:1,disabled:i!=="round"}),a=t(e);return{capResolutionInput:e,capResolution:a}},inputs:["Inputs","capType","view"],outputs:["capResolutionInput","capResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,i,t,e,a,s,d,r,u,o,p,g,y,h,C)=>{n(i`<div class="lines-controls">
  ${t}
  ${e}
  ${a}
  ${s}
  ${d}
  ${r}
  ${u}
  ${o}
  ${p}
  ${g}
  ${y}
  ${h}
  ${C}
</div>`)},inputs:["display","html","lineWidthInput","joinTypeInput","capTypeInput","patternInput","miterLimitInput","joinResolutionInput","capResolutionInput","sdfStrokeWidthInput","alphaInput","lineBreakInput","stripesInput","varyingWidthInput","debugViewInput"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(n,i,t,e,a,s)=>{const{createGPULines:d}=await S(()=>import("./webgpu-lines-DopDqc-X.js"),[]).then(c=>{if(!("createGPULines"in c))throw new SyntaxError("export 'createGPULines' not found");return c});function r(c,f){let l;if(c==="zigzag"){l=[];for(let b=0;b<6;b++){const D=-.6+b/5*1.2,k=b%2===0?.2:-.2;l.push({x:D,y:k,z:0,w:1})}}else if(c==="spiral"){l=[];for(let b=0;b<80;b++){const $=b/79,D=$*Math.PI*6,k=.1+$*.6;l.push({x:k*Math.cos(D),y:k*Math.sin(D),z:0,w:1})}}else{l=[];for(let b=0;b<100;b++){const $=b/99,D=-.8+$*1.6,k=.3*Math.sin($*Math.PI*4)+.2*Math.cos($*Math.PI*7);l.push({x:D,y:k,z:0,w:1})}}if(f){const w=Math.floor(l.length/2);l.splice(w,0,{x:0,y:0,z:0,w:0})}return l}const u=r(n,i),o=u.length;function p(c){const f=new Float32Array(c.length*4);for(let l=0;l<c.length;l++)f[l*4+0]=c[l].x,f[l*4+1]=c[l].y,f[l*4+2]=c[l].z,f[l*4+3]=c[l].w;return f}function g(c){const f=new Float32Array(c.length);let l=0;for(let w=0;w<c.length;w++){if(c[w].w===0)l=0;else if(w>0&&c[w-1].w!==0){const b=c[w].x-c[w-1].x,$=c[w].y-c[w-1].y;l+=Math.sqrt(b*b+$*$)}f[w]=l}return f}const y=p(u),h=g(u),C=Math.max(...h),I=t.createBuffer({label:"line-positions",size:y.byteLength,usage:e.STORAGE|e.COPY_DST});t.queue.writeBuffer(I,0,y);const v=t.createBuffer({label:"line-distances",size:h.byteLength,usage:e.STORAGE|e.COPY_DST});t.queue.writeBuffer(v,0,h);const B=t.createBuffer({label:"total-distance",size:4,usage:e.UNIFORM|e.COPY_DST});t.queue.writeBuffer(B,0,new Float32Array([C]));function m(){const c=p(u),f=g(u),l=Math.max(...f);t.queue.writeBuffer(I,0,c),t.queue.writeBuffer(v,0,f),t.queue.writeBuffer(B,0,new Float32Array([l])),a.dirty=!0}return s.then(()=>{I.destroy(),v.destroy(),B.destroy()}),{createGPULines:d,generatePattern:r,points:u,numPoints:o,pointsToFloat32Array:p,computeDistances:g,positions:y,distances:h,totalDistance:C,positionBuffer:I,distanceBuffer:v,totalDistanceBuffer:B,updateBuffers:m}},inputs:["pattern","lineBreak","device","GPUBufferUsage","renderState","invalidation"],outputs:["createGPULines","generatePattern","points","numPoints","pointsToFloat32Array","computeDistances","positions","distances","totalDistance","positionBuffer","distanceBuffer","totalDistanceBuffer","updateBuffers"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(n,i,t,e,a)=>{const s=n.select(i.elements.svg),d=t.map((o,p)=>({point:o,index:p})).filter(o=>o.point.w!==0),r=s.selectAll("g.vertex-handle").data(d,o=>o.index).join("g").attr("class","vertex-handle").attr("cursor","move").call(n.drag().on("start",function(){n.select(this).select("circle.visible").attr("stroke","#0066cc").attr("stroke-width",2)}).on("drag",function(o,p){p.point.x=e.xScale.invert(o.x),p.point.y=e.yScale.invert(o.y),n.select(this).attr("transform",`translate(${o.x},${o.y})`),a()}).on("end",function(){n.select(this).select("circle.visible").attr("stroke","#333").attr("stroke-width",1.5)}));r.append("circle").attr("class","hit-area").attr("r",20).attr("fill","transparent"),r.append("circle").attr("class","visible").attr("r",5).attr("fill","white").attr("stroke","#333").attr("stroke-width",1.5).attr("pointer-events","none");function u(){r.attr("transform",o=>`translate(${e.xScale(o.point.x)},${e.yScale(o.point.y)})`)}return u(),i.addEventListener("update",u),{svg:s,editablePoints:d,handleGroups:r,updateHandlePositions:u}},inputs:["d3","stack","points","axes","updateBuffers"],outputs:["svg","editablePoints","handleGroups","updateHandlePositions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(n,i,t,e,a,s,d,r,u,o,p,g,y,h,C,I,v,B)=>{const m=s>0,c=m||d<1||o,f=`
  @group(1) @binding(0) var<storage, read> positions: array<vec4f>;
  @group(1) @binding(1) var<storage, read> distances: array<f32>;
  @group(1) @binding(2) var<uniform> viewMatrix: mat4x4f;
  @group(1) @binding(3) var<uniform> totalDistance: f32;
  struct DebugUniforms {
    enabled: u32,
    dpr: f32,
  }
  @group(1) @binding(4) var<uniform> debug: DebugUniforms;

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
    let w = ${u?"uniforms.width * (0.5 + 1.5 * normalizedDist)":"uniforms.width"};
    return Vertex(vec4f(projected.xyz, p.w * projected.w), w, d, w);
  }
`,l=e==="square"?"max(abs(lineCoord.x), abs(lineCoord.y))":"length(lineCoord.xy)",w=`
  struct DebugUniforms {
    enabled: u32,
    dpr: f32,
  }
  @group(1) @binding(4) var<uniform> debug: DebugUniforms;

  fn linearstep(a: f32, b: f32, x: f32) -> f32 {
    return clamp((x - a) / (b - a), 0.0, 1.0);
  }

  // Unit grid lines for wireframe
  fn grid(parameter: vec3f, width: f32, feather: f32) -> f32 {
    let w1 = width - feather * 0.5;
    let d = fwidth(parameter);
    let looped = 0.5 - abs(parameter % 1.0 - 0.5);
    let a3 = smoothstep(d * w1, d * (w1 + feather), looped);
    return min(min(a3.x, a3.y), a3.z);
  }

  fn getColor(lineCoord: vec2f, dist: f32, lineWidth: f32, instanceID: f32, triStripCoord: vec2f) -> vec4f {
    let strokeWidth = ${s.toFixed(1)} * debug.dpr;
    let baseAlpha = ${d.toFixed(2)};

    // Compute SDF values
    let sdf = 0.5 * lineWidth * ${l};
    let aa = select(baseAlpha, linearstep(lineWidth * 0.5, lineWidth * 0.5 - 1.0, sdf) * baseAlpha, strokeWidth > 0.0);
    let strokeMask = select(0.0, linearstep(lineWidth * 0.5 - strokeWidth - 0.5, lineWidth * 0.5 - strokeWidth + 0.5, sdf), strokeWidth > 0.0);

    // Layer 1: Base fill color (debug instance color or normal color)
    var baseColor: vec3f;
    if (debug.enabled == 1u) {
      let iInstanceID = floor(instanceID + 0.5);
      if (iInstanceID < 0.0) {
        baseColor = vec3f(0.8, 0.1, 0.4);  // Red/pink for caps
      } else {
        baseColor = select(vec3f(0.8, 0.1, 0.4), vec3f(0.1, 0.7, 1.0), i32(iInstanceID) % 2 == 0);
      }
    } else {
      baseColor = vec3f(0.1, 0.7, 1.0);
    }

    // Layer 2: Apply stripes on top of base color
    let stripeFreq = 20.0;
    let stripe = step(0.5, fract(dist * stripeFreq));
    let stripeColor = baseColor * 0.4;  // Darker version of base
    var color = ${r?"mix(baseColor, stripeColor, stripe)":"baseColor"};

    // Layer 3: Apply stroke (50% black in debug mode, dark blue in normal mode)
    color = mix(color, vec3f(0.0), strokeMask * 0.7);

    // Layer 4: Wireframe gridlines (debug only)
    if (debug.enabled == 1u) {
      let wire = grid(vec3f(triStripCoord, triStripCoord.x + triStripCoord.y), 0.5 * debug.dpr, 1.0);
      color = mix(vec3f(1.0), color, wire);
    }

    return vec4f(color, aa);
  }
`,b=p(g,{format:y,join:n,joinResolution:i,miterLimit:t,cap:e,capResolution:a,vertexShaderBody:f,fragmentShaderBody:w,blend:c?{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}:null}),$=g.createBuffer({label:"view-matrix",size:64,usage:h.UNIFORM|h.COPY_DST}),D=g.createBuffer({label:"debug-uniform",size:8,usage:h.UNIFORM|h.COPY_DST}),k=g.createBindGroup({layout:b.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:C}},{binding:1,resource:{buffer:I}},{binding:2,resource:{buffer:$}},{binding:3,resource:{buffer:v}},{binding:4,resource:{buffer:D}}]});return B.then(()=>{b.destroy(),$.destroy(),D.destroy()}),{useSdfMode:m,useBlend:c,vertexShaderBody:f,sdfDistFn:l,fragmentShaderBody:w,gpuLines:b,viewMatrixBuffer:$,debugBuffer:D,dataBindGroup:k}},inputs:["joinType","joinResolution","miterLimit","capType","capResolution","sdfStrokeWidth","alpha","stripes","varyingWidth","debugView","createGPULines","device","canvasFormat","GPUBufferUsage","positionBuffer","distanceBuffer","totalDistanceBuffer","invalidation"],outputs:["useSdfMode","useBlend","vertexShaderBody","sdfDistFn","fragmentShaderBody","gpuLines","viewMatrixBuffer","debugBuffer","dataBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:async(n,i,t,e,a,s,d,r,u,o,p,g,y,h)=>{const{createFrameLoop:C}=await S(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(v=>{if(!("createFrameLoop"in v))throw new SyntaxError("export 'createFrameLoop' not found");return v});t.dirty=!0;const I=C(()=>{if(t.dirty){e.queue.writeBuffer(a,0,s.view);const v=new ArrayBuffer(8);new Uint32Array(v,0,1)[0]=i?1:0,new Float32Array(v,4,1)[0]=d,e.queue.writeBuffer(r,0,v);const B=e.createCommandEncoder(),m=B.beginRenderPass({colorAttachments:[{view:u.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:1,g:1,b:1,a:1}}]});o.draw(m,{vertexCount:p,width:n*d,resolution:[g.width,g.height]},[y]),m.end(),e.queue.submit([B.finish()]),t.dirty=!1}});return h.then(()=>I.cancel()),{createFrameLoop:C,loop:I}},inputs:["lineWidth","debugView","renderState","device","viewMatrixBuffer","axes","dpr","debugBuffer","gpuContext","gpuLines","numPoints","canvas","dataBindGroup","invalidation"],outputs:["createFrameLoop","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:async(n,i,t)=>{{const e=(u,o=200,p=120)=>n`<canvas id="${u}" style="width: ${o}px; height: ${p}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-join-bevel"),s=e("demo-join-miter"),d=e("demo-join-round");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>join: 'bevel'</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>join: 'miter'</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${d}
      <figcaption><code>join: 'round'</code></figcaption>
    </figure>
  </div>`);const r={pattern:"join-demo",lineWidth:50,cap:"round",miterLimit:10,width:200,height:120};await t.renderToCanvas(a,{...r,join:"bevel"}),await t.renderToCanvas(s,{...r,join:"miter"}),await t.renderToCanvas(d,{...r,join:"round"})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:async(n,i,t)=>{{const e=(u,o=200,p=120)=>n`<canvas id="${u}" style="width: ${o}px; height: ${p}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-cap-round"),s=e("demo-cap-square"),d=e("demo-cap-none");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>cap: 'round'</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>cap: 'square'</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${d}
      <figcaption><code>cap: 'none'</code></figcaption>
    </figure>
  </div>`);const r={pattern:"cap-demo",lineWidth:50,width:200,height:120};await t.renderToCanvas(a,{...r,cap:"round"}),await t.renderToCanvas(s,{...r,cap:"square"}),await t.renderToCanvas(d,{...r,cap:"none"})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:async(n,i,t)=>{{const e=(u,o=200,p=120)=>n`<canvas id="${u}" style="width: ${o}px; height: ${p}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-miter-1"),s=e("demo-miter-4"),d=e("demo-miter-10");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>miterLimit: 1</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>miterLimit: 4</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${d}
      <figcaption><code>miterLimit: 10</code></figcaption>
    </figure>
  </div>`);const r={pattern:"miter-demo",lineWidth:50,join:"miter",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...r,miterLimit:1}),await t.renderToCanvas(s,{...r,miterLimit:4}),await t.renderToCanvas(d,{...r,miterLimit:10})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-25"),expanded:[],variables:[]},{id:25,body:async(n,i,t)=>{{const e=(u,o=200,p=120)=>n`<canvas id="${u}" style="width: ${o}px; height: ${p}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-res-2"),s=e("demo-res-4"),d=e("demo-res-16");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption><code>joinResolution: 2</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption><code>joinResolution: 4</code></figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${d}
      <figcaption><code>joinResolution: 16</code></figcaption>
    </figure>
  </div>`);const r={pattern:"resolution-demo",lineWidth:50,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...r,joinResolution:2}),await t.renderToCanvas(s,{...r,joinResolution:4}),await t.renderToCanvas(d,{...r,joinResolution:16})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:async(n,i,t)=>{{const e=(r,u=200,o=120)=>n`<canvas id="${r}" style="width: ${u}px; height: ${o}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-continuous"),s=e("demo-with-break");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption>Continuous line</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption>With line break (<code>w: 0</code>)</figcaption>
    </figure>
  </div>`);const d={pattern:"break-demo",lineWidth:50,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...d,lineBreak:!1}),await t.renderToCanvas(s,{...d,lineBreak:!0})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-31"),expanded:[],variables:[]},{id:31,body:async(n,i,t)=>{{const e=(o,p=200,g=120)=>n`<canvas id="${o}" style="width: ${p}px; height: ${g}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-lc-x"),s=e("demo-lc-y");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start;">
    <figure style="margin: 0; max-width: 200px;">
      ${a}
      <figcaption><code>lineCoord.x</code> (0 on segments, varies in caps)</figcaption>
    </figure>
    <figure style="margin: 0; max-width: 200px;">
      ${s}
      <figcaption><code>lineCoord.y</code> (across line)</figcaption>
    </figure>
  </div>`);const d=`
    fn getColor(lineCoord: vec2f) -> vec4f {
      // lineCoord.x is 0 for segments, varies in caps (sin(theta))
      let t = abs(lineCoord.x);
      // Blue for segments (x=0), orange gradient in caps
      return vec4f(t, 0.4 * (1.0 - t), 1.0 - t, 1.0);
    }
  `,r=`
    fn getColor(lineCoord: vec2f) -> vec4f {
      let t = lineCoord.y * 0.5 + 0.5;
      return vec4f(t, 0.3, 1.0 - t, 1.0);
    }
  `,u={pattern:"cap-demo",lineWidth:50,join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...u,fragmentShaderBody:d}),await t.renderToCanvas(s,{...u,fragmentShaderBody:r})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-33"),expanded:[],variables:[]},{id:33,body:async(n,i,t)=>{{const e=(y,h=200,C=120)=>n`<canvas id="${y}" style="width: ${h}px; height: ${C}px; border: 1px solid #ddd;"></canvas>`,a=e("demo-stripes"),s=e("demo-gradient"),d=e("demo-sdf-stroke");i(n`<div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-start;">
    <figure style="margin: 0; text-align: center;">
      ${a}
      <figcaption>Cross-line stripes</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${s}
      <figcaption>Cross-line gradient</figcaption>
    </figure>
    <figure style="margin: 0; text-align: center;">
      ${d}
      <figcaption>SDF stroke</figcaption>
    </figure>
  </div>`);const r=`
    fn getColor(lineCoord: vec2f) -> vec4f {
      // Cross-line stripes using lineCoord.y
      let stripe = select(0.0, 1.0, lineCoord.y >= 0.0);
      return vec4f(stripe * 0.2, 0.5, 0.9 - stripe * 0.4, 1.0);
    }
  `,u=`
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
      let width = 50.0;
      let strokeWidth = 5.0;
      // Use length(lineCoord) for proper SDF on both segments and caps
      let dist = length(lineCoord);
      let sdf = 0.5 * width * dist;
      let aa = linearstep(width * 0.5, width * 0.5 - 1.0, sdf);
      let strokeMask = linearstep(width * 0.5 - strokeWidth - 0.5, width * 0.5 - strokeWidth + 0.5, sdf);
      let fillColor = vec3f(0.4, 0.7, 1.0);
      let strokeColor = vec3f(0.1, 0.3, 0.6);
      let color = mix(fillColor, strokeColor, strokeMask);
      return vec4f(color, aa);
    }
  `,p={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},g={pattern:"shader-demo",join:"round",cap:"round",width:200,height:120};await t.renderToCanvas(a,{...g,lineWidth:50,fragmentShaderBody:r}),await t.renderToCanvas(s,{...g,lineWidth:50,fragmentShaderBody:u}),await t.renderToCanvas(d,{...g,lineWidth:50,fragmentShaderBody:o,blend:p})}},inputs:["html","display","demoRenderer"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
