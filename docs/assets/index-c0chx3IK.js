import{d as E,_ as T}from"./index-ByB2dbry.js";E({root:document.getElementById("cell-1"),expanded:[],variables:[]},{id:1,body:(n,t)=>{const o=n`<a href="https://github.com/rreusser/webgpu-instanced-lines" target="_blank" style="
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #24292e;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  float: right;
  margin: 0 0 10px 10px;
">
  <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
  View on GitHub
</a>`;return t(o),{link:o}},inputs:["html","display"],outputs:["link"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(n,t,o)=>{if(!navigator.gpu)throw n(t`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const i=await navigator.gpu.requestAdapter();if(!i)throw new Error("Failed to get WebGPU adapter");const p=await i.requestDevice(),m=navigator.gpu.getPreferredCanvasFormat();return o.then(()=>p.destroy()),{adapter:i,device:p,canvasFormat:m}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(n,t,o,i,p,m)=>{const[{createElementStack:u},{createZoomableAxes:y},{expandable:s}]=await Promise.all([T(()=>import("./element-stack-BU40TvN2.js"),[]).then(h=>{if(!("createElementStack"in h))throw new SyntaxError("export 'createElementStack' not found");return h}),T(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(h=>{if(!("createZoomableAxes"in h))throw new SyntaxError("export 'createZoomableAxes' not found");return h}),T(()=>import("./expandable-dZkDG0zz.js"),[]).then(h=>{if(!("expandable"in h))throw new SyntaxError("export 'expandable' not found");return h})]),d=window.devicePixelRatio||1,c=Math.min(640,n),v=480,l=u({width:c,height:v,layers:[{id:"canvas",element:({current:h,width:a,height:r})=>{const e=h||document.createElement("canvas");return e.id="lines-canvas",e.width=Math.floor(a*d),e.height=Math.floor(r*d),e.style.width=`${a}px`,e.style.height=`${r}px`,e.style.border="1px solid rgba(0,0,0,0.2)",e}},{id:"svg",element:({current:h,width:a,height:r})=>(h?t.select(h):t.create("svg")).attr("width",a).attr("height",r).style("cursor","grab").node()}]}),b=l.elements.canvas,S=b.getContext("webgpu");S.configure({device:o,format:i,alphaMode:"premultiplied"});const I={dirty:!0},B=y({d3:t,element:l.elements.svg,xScale:t.scaleLinear().domain([-1,1]).range([0,c]),yScale:t.scaleLinear().domain([-1,1]).range([v,0]),aspectRatio:1,onChange:()=>{I.dirty=!0,l.dispatchEvent(new CustomEvent("update"))}}),k=p`<figure style="margin: 0;">
  ${l.element}
  <figcaption style="margin-top:5px">Drag handles to edit vertices. Drag background to pan, scroll to zoom.</figcaption>
</figure>`;return m(s(k,{width:c,height:v,controls:".lines-controls",onResize(h,a,r){l.resize(a,r),B.updateScales(t.scaleLinear().domain([-1,1]).range([0,a]),t.scaleLinear().domain([-1,1]).range([r,0])),I.dirty=!0,l.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:u,createZoomableAxes:y,expandable:s,dpr:d,canvasWidth:c,canvasHeight:v,stack:l,canvas:b,gpuContext:S,renderState:I,axes:B,figure:k}},inputs:["width","d3","device","canvasFormat","html","display"],outputs:["createElementStack","createZoomableAxes","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","renderState","axes","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(n,t)=>{const o=n.range([1,100],{label:"Line width",value:70,step:.5}),i=t(o),p=n.select(["bevel","miter","round"],{label:"Join type",value:"miter"}),m=t(p),u=n.select(["round","square","butt"],{label:"Cap type",value:"round"}),y=t(u),s=n.select(["wave","zigzag","spiral"],{label:"Pattern",value:"zigzag"}),d=t(s),c=n.range([0,50],{label:"SDF stroke width",value:10,step:.5}),v=t(c),l=n.range([0,1],{label:"Alpha",value:1,step:.01}),b=t(l),S=n.toggle({label:"Line break",value:!1}),I=t(S),B=n.toggle({label:"Stripes",value:!1}),k=t(B),h=n.toggle({label:"Varying width",value:!1}),a=t(h),r=n.toggle({label:"Debug view",value:"Debug view"}),e=t(r),f=n.toggle({label:"Depth test"}),g=t(f),w=n.toggle({label:"Cull back faces"}),x=t(w);return{lineWidthInput:o,lineWidth:i,joinTypeInput:p,joinType:m,capTypeInput:u,capType:y,patternInput:s,pattern:d,sdfStrokeWidthInput:c,sdfStrokeWidth:v,alphaInput:l,alpha:b,lineBreakInput:S,lineBreak:I,stripesInput:B,stripes:k,varyingWidthInput:h,varyingWidth:a,debugViewInput:r,debugView:e,depthTestInput:f,depthTest:g,cullBackFacesInput:w,cullBackFaces:x}},inputs:["Inputs","view"],outputs:["lineWidthInput","lineWidth","joinTypeInput","joinType","capTypeInput","capType","patternInput","pattern","sdfStrokeWidthInput","sdfStrokeWidth","alphaInput","alpha","lineBreakInput","lineBreak","stripesInput","stripes","varyingWidthInput","varyingWidth","debugViewInput","debugView","depthTestInput","depthTest","cullBackFacesInput","cullBackFaces"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,t,o)=>{const i=n.range([1,10],{label:"Miter limit",value:4,step:.1,disabled:t!=="miter"}),p=o(i);return{miterLimitInput:i,miterLimit:p}},inputs:["Inputs","joinType","view"],outputs:["miterLimitInput","miterLimit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(n,t,o)=>{const i=n.range([2,16],{label:"Round join resolution",value:8,step:1,disabled:t!=="round"}),p=o(i);return{joinResolutionInput:i,joinResolution:p}},inputs:["Inputs","joinType","view"],outputs:["joinResolutionInput","joinResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,t,o)=>{const i=n.range([2,16],{label:"Round cap resolution",value:8,step:1,disabled:t!=="round"}),p=o(i),m=n.button("Download PNG"),u=o(m);return{capResolutionInput:i,capResolution:p,downloadButtonInput:m,downloadButton:u}},inputs:["Inputs","capType","view"],outputs:["capResolutionInput","capResolution","downloadButtonInput","downloadButton"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,t,o,i,p,m,u,y,s,d,c,v,l,b,S,I,B,k)=>{n(t`<div class="lines-controls">
  ${o}
  ${i}
  ${p}
  ${m}
  ${u}
  ${y}
  ${s}
  ${d}
  ${c}
  ${v}
  ${l}
  ${b}
  ${S}
  ${I}
  ${B}
  ${k}
</div>`)},inputs:["display","html","lineWidthInput","joinTypeInput","capTypeInput","patternInput","miterLimitInput","joinResolutionInput","capResolutionInput","sdfStrokeWidthInput","alphaInput","lineBreakInput","stripesInput","varyingWidthInput","debugViewInput","depthTestInput","cullBackFacesInput","downloadButtonInput"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(n,t,o,i,p,m)=>{const{createGPULines:u}=await T(()=>import("https://cdn.jsdelivr.net/npm/webgpu-instanced-lines/+esm"),[]).then(a=>{if(!("createGPULines"in a))throw new SyntaxError("export 'createGPULines' not found");return a});function y(a,r){let e;if(a==="zigzag"){e=[];for(let g=0;g<6;g++){const x=-.6+g/5*1.2,D=g%2===0?.2:-.2;e.push({x,y:D,z:0,w:1})}}else if(a==="spiral"){e=[];for(let g=0;g<80;g++){const w=g/79,x=w*Math.PI*6,D=.1+w*.6;e.push({x:D*Math.cos(x),y:D*Math.sin(x),z:0,w:1})}}else{e=[];for(let g=0;g<100;g++){const w=g/99,x=-.8+w*1.6,D=.3*Math.sin(w*Math.PI*4)+.2*Math.cos(w*Math.PI*7);e.push({x,y:D,z:0,w:1})}}if(r){const f=Math.floor(e.length/2);e.splice(f,0,{x:0,y:0,z:0,w:0})}return e}const s=y(n,t),d=s.length;function c(a){const r=new Float32Array(a.length*4);for(let e=0;e<a.length;e++)r[e*4+0]=a[e].x,r[e*4+1]=a[e].y,r[e*4+2]=a[e].z,r[e*4+3]=a[e].w;return r}function v(a){const r=new Float32Array(a.length);let e=0;for(let f=0;f<a.length;f++){if(a[f].w===0)e=0;else if(f>0&&a[f-1].w!==0){const g=a[f].x-a[f-1].x,w=a[f].y-a[f-1].y;e+=Math.sqrt(g*g+w*w)}r[f]=e}return r}const l=c(s),b=v(s),S=Math.max(...b),I=o.createBuffer({label:"line-positions",size:l.byteLength,usage:i.STORAGE|i.COPY_DST});o.queue.writeBuffer(I,0,l);const B=o.createBuffer({label:"line-distances",size:b.byteLength,usage:i.STORAGE|i.COPY_DST});o.queue.writeBuffer(B,0,b);const k=o.createBuffer({label:"total-distance",size:4,usage:i.UNIFORM|i.COPY_DST});o.queue.writeBuffer(k,0,new Float32Array([S]));function h(){const a=c(s),r=v(s),e=Math.max(...r);o.queue.writeBuffer(I,0,a),o.queue.writeBuffer(B,0,r),o.queue.writeBuffer(k,0,new Float32Array([e])),p.dirty=!0}return m.then(()=>{I.destroy(),B.destroy(),k.destroy()}),{createGPULines:u,generatePattern:y,points:s,numPoints:d,pointsToFloat32Array:c,computeDistances:v,positions:l,distances:b,totalDistance:S,positionBuffer:I,distanceBuffer:B,totalDistanceBuffer:k,updateBuffers:h}},inputs:["pattern","lineBreak","device","GPUBufferUsage","renderState","invalidation"],outputs:["createGPULines","generatePattern","points","numPoints","pointsToFloat32Array","computeDistances","positions","distances","totalDistance","positionBuffer","distanceBuffer","totalDistanceBuffer","updateBuffers"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(n,t,o,i,p)=>{const m=n.select(t.elements.svg),u=o.map((d,c)=>({point:d,index:c})).filter(d=>d.point.w!==0),y=m.selectAll("g.vertex-handle").data(u,d=>d.index).join("g").attr("class","vertex-handle").attr("cursor","move").call(n.drag().on("start",function(){n.select(this).select("circle.visible").attr("stroke","#0066cc").attr("stroke-width",2)}).on("drag",function(d,c){c.point.x=i.xScale.invert(d.x),c.point.y=i.yScale.invert(d.y),n.select(this).attr("transform",`translate(${d.x},${d.y})`),p()}).on("end",function(){n.select(this).select("circle.visible").attr("stroke","#333").attr("stroke-width",1.5)}));y.append("circle").attr("class","hit-area").attr("r",20).attr("fill","transparent"),y.append("circle").attr("class","visible").attr("r",5).attr("fill","white").attr("stroke","#333").attr("stroke-width",1.5).attr("pointer-events","none");function s(){y.attr("transform",d=>`translate(${i.xScale(d.point.x)},${i.yScale(d.point.y)})`)}return s(),t.addEventListener("update",s),{svg:m,editablePoints:u,handleGroups:y,updateHandlePositions:s}},inputs:["d3","stack","points","axes","updateBuffers"],outputs:["svg","editablePoints","handleGroups","updateHandlePositions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(n,t,o,i,p,m,u,y,s,d,c,v,l,b,S,I,B)=>{const k=o>0,h=k||i<1||u,a=y?"depth24plus":null,r=`
  @group(1) @binding(0) var<storage, read> positions: array<vec4f>;
  @group(1) @binding(1) var<storage, read> distances: array<f32>;
  @group(1) @binding(2) var<uniform> viewMatrix: mat4x4f;
  @group(1) @binding(3) var<uniform> totalDistance: f32;
  struct DebugUniforms {
    enabled: u32,
    dpr: f32,
  }
  @group(1) @binding(4) var<uniform> debug: DebugUniforms;
  @group(1) @binding(5) var<uniform> lineWidthUniform: f32;

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
    let w = ${m?"lineWidthUniform * (0.5 + 1.5 * normalizedDist)":"lineWidthUniform"};
    return Vertex(vec4f(projected.xyz, p.w * projected.w), w, d, w);
  }
`,e=t==="square"?"max(abs(lineCoord.x), abs(lineCoord.y))":"length(lineCoord.xy)",f=`
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
    let strokeWidth = ${o.toFixed(1)} * debug.dpr;
    let baseAlpha = ${i.toFixed(2)};

    // Compute SDF values
    let sdf = 0.5 * lineWidth * ${e};
    let aa = select(baseAlpha, linearstep(lineWidth * 0.5, lineWidth * 0.5 - 1.0, sdf) * baseAlpha, strokeWidth > 0.0);
    let strokeMask = select(0.0, linearstep(lineWidth * 0.5 - strokeWidth - 0.5, lineWidth * 0.5 - strokeWidth + 0.5, sdf), strokeWidth > 0.0);

    // Layer 1: Base fill color (debug instance color or normal color)
    var baseColor: vec3f;
    if (debug.enabled == 1u) {
      // instanceID encodes: non-negative = segment index, negative = cap with index (-id - 1)
      let isCap = instanceID < 0.0;
      let segmentIndex = select(instanceID, -instanceID - 1.0, isCap);
      let iSegmentIndex = i32(floor(segmentIndex + 0.5));
      baseColor = select(vec3f(0.8, 0.1, 0.4), vec3f(0.1, 0.7, 1.0), iSegmentIndex % 2 == 0);
    } else {
      baseColor = vec3f(0.1, 0.7, 1.0);
    }

    // Layer 2: Apply stripes on top of base color
    let stripeFreq = 20.0;
    let stripe = step(0.5, fract(dist * stripeFreq));
    let stripeColor = baseColor * 0.4;  // Darker version of base
    var color = ${p?"mix(baseColor, stripeColor, stripe)":"baseColor"};

    // Layer 2.5: Tint caps - green for start cap (x < 0), purple for end cap (x > 0)
    // Only show in debug mode
    if (debug.enabled == 1u) {
      let green = vec3f(0.2, 0.9, 0.3);
      let purple = vec3f(0.8, 0.3, 0.9);
      let isStart = step(lineCoord.x, -0.01);  // 1 if x < -0.01
      let isEnd = step(0.01, lineCoord.x);     // 1 if x > 0.01
      color = mix(color, green, isStart * 0.5);
      color = mix(color, purple, isEnd * 0.5);
    }

    // Layer 3: Apply stroke (50% black in debug mode, dark blue in normal mode)
    color = mix(color, vec3f(0.0), strokeMask * 0.7);

    // Layer 4: Wireframe gridlines (debug only)
    if (debug.enabled == 1u) {
      let wire = grid(vec3f(triStripCoord, triStripCoord.x + triStripCoord.y), 0.5 * debug.dpr, 1.0);
      color = mix(vec3f(1.0), color, wire);
    }

    return vec4f(color, aa);
  }
`,g=h?{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}:void 0,w=d(c,{colorTargets:g?{format:v,blend:g}:{format:v},depthStencil:a?{format:a,depthWriteEnabled:!0,depthCompare:"less"}:void 0,primitive:{cullMode:s?"back":"none"},join:n,maxJoinResolution:16,maxCapResolution:16,cap:t,vertexShaderBody:r,fragmentShaderBody:f}),x=c.createBuffer({label:"view-matrix",size:64,usage:l.UNIFORM|l.COPY_DST}),D=c.createBuffer({label:"debug-uniform",size:8,usage:l.UNIFORM|l.COPY_DST}),C=c.createBuffer({label:"line-width-uniform",size:4,usage:l.UNIFORM|l.COPY_DST}),W=c.createBindGroup({layout:w.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:b}},{binding:1,resource:{buffer:S}},{binding:2,resource:{buffer:x}},{binding:3,resource:{buffer:I}},{binding:4,resource:{buffer:D}},{binding:5,resource:{buffer:C}}]});return B.then(()=>{w.destroy(),x.destroy(),C.destroy(),D.destroy()}),{useSdfMode:k,useBlend:h,depthFormat:a,vertexShaderBody:r,sdfDistFn:e,fragmentShaderBody:f,blend:g,gpuLines:w,viewMatrixBuffer:x,debugBuffer:D,lineWidthBuffer:C,dataBindGroup:W}},inputs:["joinType","capType","sdfStrokeWidth","alpha","stripes","varyingWidth","debugView","depthTest","cullBackFaces","createGPULines","device","canvasFormat","GPUBufferUsage","positionBuffer","distanceBuffer","totalDistanceBuffer","invalidation"],outputs:["useSdfMode","useBlend","depthFormat","vertexShaderBody","sdfDistFn","fragmentShaderBody","blend","gpuLines","viewMatrixBuffer","debugBuffer","lineWidthBuffer","dataBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:async(n,t,o,i,p,m,u,y,s,d,c,v,l,b,S,I,B,k,h,a)=>{const{createFrameLoop:r}=await T(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(x=>{if(!("createFrameLoop"in x))throw new SyntaxError("export 'createFrameLoop' not found");return x});m.dirty=!0;let e=null,f=0,g=0;const w=r(()=>{if(m.dirty){u.queue.writeBuffer(y,0,s.view);const x=new ArrayBuffer(8);new Uint32Array(x,0,1)[0]=t?1:0,new Float32Array(x,4,1)[0]=d,u.queue.writeBuffer(c,0,x),u.queue.writeBuffer(v,0,new Float32Array([n*d])),l&&(!e||f!==b.width||g!==b.height)&&(e&&e.destroy(),e=u.createTexture({size:[b.width,b.height],format:l,usage:S.RENDER_ATTACHMENT}),f=b.width,g=b.height);const D=u.createCommandEncoder(),C={colorAttachments:[{view:I.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]};l&&e&&(C.depthStencilAttachment={view:e.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"});const W=D.beginRenderPass(C);B.draw(W,{vertexCount:k,resolution:[b.width,b.height],miterLimit:o,joinResolution:i,capResolution:p},[h]),W.end(),u.queue.submit([D.finish()]),m.dirty=!1}});return a.then(()=>{w.cancel(),e&&e.destroy()}),{createFrameLoop:r,depthTexture:e,depthTextureWidth:f,depthTextureHeight:g,loop:w}},inputs:["lineWidth","debugView","miterLimit","joinResolution","capResolution","renderState","device","viewMatrixBuffer","axes","dpr","debugBuffer","lineWidthBuffer","depthFormat","canvas","GPUTextureUsage","gpuContext","gpuLines","numPoints","dataBindGroup","invalidation"],outputs:["createFrameLoop","depthTexture","depthTextureWidth","depthTextureHeight","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:async(n,t,o,i)=>{if(n>0){let p=function(u,y){const s=document.createElement("a");s.target="_blank",s.download=y,s.href=u,document.body.appendChild(s),s.click(),document.body.removeChild(s)};t.dirty=!0,await new Promise(u=>requestAnimationFrame(u)),await o.queue.onSubmittedWorkDone();const m=i.toDataURL("image/png");p(m,"webgpu-lines-demo.png")}},inputs:["downloadButton","renderState","device","canvas"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
