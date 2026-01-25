import{d as E,_ as C}from"./index-ByB2dbry.js";E({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(n,t,i)=>{if(!navigator.gpu)throw n(t`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const a=await navigator.gpu.requestAdapter();if(!a)throw new Error("Failed to get WebGPU adapter");const p=await a.requestDevice(),m=navigator.gpu.getPreferredCanvasFormat();return i.then(()=>p.destroy()),{adapter:a,device:p,canvasFormat:m}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(n,t,i,a,p,m)=>{const[{createElementStack:u},{createZoomableAxes:y},{expandable:s}]=await Promise.all([C(()=>import("./element-stack-BU40TvN2.js"),[]).then(h=>{if(!("createElementStack"in h))throw new SyntaxError("export 'createElementStack' not found");return h}),C(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(h=>{if(!("createZoomableAxes"in h))throw new SyntaxError("export 'createZoomableAxes' not found");return h}),C(()=>import("./expandable-dZkDG0zz.js"),[]).then(h=>{if(!("expandable"in h))throw new SyntaxError("export 'expandable' not found");return h})]),d=window.devicePixelRatio||1,c=Math.min(640,n),x=480,l=u({width:c,height:x,layers:[{id:"canvas",element:({current:h,width:o,height:r})=>{const e=h||document.createElement("canvas");return e.id="lines-canvas",e.width=Math.floor(o*d),e.height=Math.floor(r*d),e.style.width=`${o}px`,e.style.height=`${r}px`,e.style.border="1px solid rgba(0,0,0,0.2)",e}},{id:"svg",element:({current:h,width:o,height:r})=>(h?t.select(h):t.create("svg")).attr("width",o).attr("height",r).style("cursor","grab").node()}]}),b=l.elements.canvas,D=b.getContext("webgpu");D.configure({device:i,format:a,alphaMode:"premultiplied"});const I={dirty:!0},B=y({d3:t,element:l.elements.svg,xScale:t.scaleLinear().domain([-1,1]).range([0,c]),yScale:t.scaleLinear().domain([-1,1]).range([x,0]),aspectRatio:1,onChange:()=>{I.dirty=!0,l.dispatchEvent(new CustomEvent("update"))}}),S=p`<figure style="margin: 0;">
  ${l.element}
  <figcaption style="margin-top:5px">Drag handles to edit vertices. Drag background to pan, scroll to zoom.</figcaption>
</figure>`;return m(s(S,{width:c,height:x,controls:".lines-controls",onResize(h,o,r){l.resize(o,r),B.updateScales(t.scaleLinear().domain([-1,1]).range([0,o]),t.scaleLinear().domain([-1,1]).range([r,0])),I.dirty=!0,l.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:u,createZoomableAxes:y,expandable:s,dpr:d,canvasWidth:c,canvasHeight:x,stack:l,canvas:b,gpuContext:D,renderState:I,axes:B,figure:S}},inputs:["width","d3","device","canvasFormat","html","display"],outputs:["createElementStack","createZoomableAxes","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","renderState","axes","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(n,t)=>{const i=n.range([1,100],{label:"Line width",value:70,step:.5}),a=t(i),p=n.select(["bevel","miter","round"],{label:"Join type",value:"miter"}),m=t(p),u=n.select(["round","square","butt"],{label:"Cap type",value:"round"}),y=t(u),s=n.select(["wave","zigzag","spiral"],{label:"Pattern",value:"zigzag"}),d=t(s),c=n.range([0,50],{label:"SDF stroke width",value:10,step:.5}),x=t(c),l=n.range([0,1],{label:"Alpha",value:1,step:.01}),b=t(l),D=n.toggle({label:"Line break",value:!1}),I=t(D),B=n.toggle({label:"Stripes",value:!1}),S=t(B),h=n.toggle({label:"Varying width",value:!1}),o=t(h),r=n.toggle({label:"Debug view",value:"Debug view"}),e=t(r),f=n.toggle({label:"Depth test"}),g=t(f),w=n.toggle({label:"Cull back faces"}),v=t(w);return{lineWidthInput:i,lineWidth:a,joinTypeInput:p,joinType:m,capTypeInput:u,capType:y,patternInput:s,pattern:d,sdfStrokeWidthInput:c,sdfStrokeWidth:x,alphaInput:l,alpha:b,lineBreakInput:D,lineBreak:I,stripesInput:B,stripes:S,varyingWidthInput:h,varyingWidth:o,debugViewInput:r,debugView:e,depthTestInput:f,depthTest:g,cullBackFacesInput:w,cullBackFaces:v}},inputs:["Inputs","view"],outputs:["lineWidthInput","lineWidth","joinTypeInput","joinType","capTypeInput","capType","patternInput","pattern","sdfStrokeWidthInput","sdfStrokeWidth","alphaInput","alpha","lineBreakInput","lineBreak","stripesInput","stripes","varyingWidthInput","varyingWidth","debugViewInput","debugView","depthTestInput","depthTest","cullBackFacesInput","cullBackFaces"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,t,i)=>{const a=n.range([1,10],{label:"Miter limit",value:4,step:.1,disabled:t!=="miter"}),p=i(a);return{miterLimitInput:a,miterLimit:p}},inputs:["Inputs","joinType","view"],outputs:["miterLimitInput","miterLimit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(n,t,i)=>{const a=n.range([2,16],{label:"Round join resolution",value:8,step:1,disabled:t!=="round"}),p=i(a);return{joinResolutionInput:a,joinResolution:p}},inputs:["Inputs","joinType","view"],outputs:["joinResolutionInput","joinResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,t,i)=>{const a=n.range([2,16],{label:"Round cap resolution",value:8,step:1,disabled:t!=="round"}),p=i(a),m=n.button("Download PNG"),u=i(m);return{capResolutionInput:a,capResolution:p,downloadButtonInput:m,downloadButton:u}},inputs:["Inputs","capType","view"],outputs:["capResolutionInput","capResolution","downloadButtonInput","downloadButton"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,t,i,a,p,m,u,y,s,d,c,x,l,b,D,I,B,S)=>{n(t`<div class="lines-controls">
  ${i}
  ${a}
  ${p}
  ${m}
  ${u}
  ${y}
  ${s}
  ${d}
  ${c}
  ${x}
  ${l}
  ${b}
  ${D}
  ${I}
  ${B}
  ${S}
</div>`)},inputs:["display","html","lineWidthInput","joinTypeInput","capTypeInput","patternInput","miterLimitInput","joinResolutionInput","capResolutionInput","sdfStrokeWidthInput","alphaInput","lineBreakInput","stripesInput","varyingWidthInput","debugViewInput","depthTestInput","cullBackFacesInput","downloadButtonInput"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(n,t,i,a,p,m)=>{const{createGPULines:u}=await C(()=>import("https://cdn.jsdelivr.net/npm/webgpu-instanced-lines/+esm"),[]).then(o=>{if(!("createGPULines"in o))throw new SyntaxError("export 'createGPULines' not found");return o});function y(o,r){let e;if(o==="zigzag"){e=[];for(let g=0;g<6;g++){const v=-.6+g/5*1.2,k=g%2===0?.2:-.2;e.push({x:v,y:k,z:0,w:1})}}else if(o==="spiral"){e=[];for(let g=0;g<80;g++){const w=g/79,v=w*Math.PI*6,k=.1+w*.6;e.push({x:k*Math.cos(v),y:k*Math.sin(v),z:0,w:1})}}else{e=[];for(let g=0;g<100;g++){const w=g/99,v=-.8+w*1.6,k=.3*Math.sin(w*Math.PI*4)+.2*Math.cos(w*Math.PI*7);e.push({x:v,y:k,z:0,w:1})}}if(r){const f=Math.floor(e.length/2);e.splice(f,0,{x:0,y:0,z:0,w:0})}return e}const s=y(n,t),d=s.length;function c(o){const r=new Float32Array(o.length*4);for(let e=0;e<o.length;e++)r[e*4+0]=o[e].x,r[e*4+1]=o[e].y,r[e*4+2]=o[e].z,r[e*4+3]=o[e].w;return r}function x(o){const r=new Float32Array(o.length);let e=0;for(let f=0;f<o.length;f++){if(o[f].w===0)e=0;else if(f>0&&o[f-1].w!==0){const g=o[f].x-o[f-1].x,w=o[f].y-o[f-1].y;e+=Math.sqrt(g*g+w*w)}r[f]=e}return r}const l=c(s),b=x(s),D=Math.max(...b),I=i.createBuffer({label:"line-positions",size:l.byteLength,usage:a.STORAGE|a.COPY_DST});i.queue.writeBuffer(I,0,l);const B=i.createBuffer({label:"line-distances",size:b.byteLength,usage:a.STORAGE|a.COPY_DST});i.queue.writeBuffer(B,0,b);const S=i.createBuffer({label:"total-distance",size:4,usage:a.UNIFORM|a.COPY_DST});i.queue.writeBuffer(S,0,new Float32Array([D]));function h(){const o=c(s),r=x(s),e=Math.max(...r);i.queue.writeBuffer(I,0,o),i.queue.writeBuffer(B,0,r),i.queue.writeBuffer(S,0,new Float32Array([e])),p.dirty=!0}return m.then(()=>{I.destroy(),B.destroy(),S.destroy()}),{createGPULines:u,generatePattern:y,points:s,numPoints:d,pointsToFloat32Array:c,computeDistances:x,positions:l,distances:b,totalDistance:D,positionBuffer:I,distanceBuffer:B,totalDistanceBuffer:S,updateBuffers:h}},inputs:["pattern","lineBreak","device","GPUBufferUsage","renderState","invalidation"],outputs:["createGPULines","generatePattern","points","numPoints","pointsToFloat32Array","computeDistances","positions","distances","totalDistance","positionBuffer","distanceBuffer","totalDistanceBuffer","updateBuffers"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(n,t,i,a,p)=>{const m=n.select(t.elements.svg),u=i.map((d,c)=>({point:d,index:c})).filter(d=>d.point.w!==0),y=m.selectAll("g.vertex-handle").data(u,d=>d.index).join("g").attr("class","vertex-handle").attr("cursor","move").call(n.drag().on("start",function(){n.select(this).select("circle.visible").attr("stroke","#0066cc").attr("stroke-width",2)}).on("drag",function(d,c){c.point.x=a.xScale.invert(d.x),c.point.y=a.yScale.invert(d.y),n.select(this).attr("transform",`translate(${d.x},${d.y})`),p()}).on("end",function(){n.select(this).select("circle.visible").attr("stroke","#333").attr("stroke-width",1.5)}));y.append("circle").attr("class","hit-area").attr("r",20).attr("fill","transparent"),y.append("circle").attr("class","visible").attr("r",5).attr("fill","white").attr("stroke","#333").attr("stroke-width",1.5).attr("pointer-events","none");function s(){y.attr("transform",d=>`translate(${a.xScale(d.point.x)},${a.yScale(d.point.y)})`)}return s(),t.addEventListener("update",s),{svg:m,editablePoints:u,handleGroups:y,updateHandlePositions:s}},inputs:["d3","stack","points","axes","updateBuffers"],outputs:["svg","editablePoints","handleGroups","updateHandlePositions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(n,t,i,a,p,m,u,y,s,d,c,x,l,b,D,I,B)=>{const S=i>0,h=S||a<1||u,o=y?"depth24plus":null,r=`
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
    let strokeWidth = ${i.toFixed(1)} * debug.dpr;
    let baseAlpha = ${a.toFixed(2)};

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
`,g=h?{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}:void 0,w=d(c,{colorTargets:g?{format:x,blend:g}:{format:x},depthStencil:o?{format:o,depthWriteEnabled:!0,depthCompare:"less"}:void 0,primitive:{cullMode:s?"back":"none"},join:n,maxJoinResolution:16,maxCapResolution:16,cap:t,vertexShaderBody:r,fragmentShaderBody:f}),v=c.createBuffer({label:"view-matrix",size:64,usage:l.UNIFORM|l.COPY_DST}),k=c.createBuffer({label:"debug-uniform",size:8,usage:l.UNIFORM|l.COPY_DST}),T=c.createBuffer({label:"line-width-uniform",size:4,usage:l.UNIFORM|l.COPY_DST}),W=c.createBindGroup({layout:w.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:b}},{binding:1,resource:{buffer:D}},{binding:2,resource:{buffer:v}},{binding:3,resource:{buffer:I}},{binding:4,resource:{buffer:k}},{binding:5,resource:{buffer:T}}]});return B.then(()=>{w.destroy(),v.destroy(),T.destroy(),k.destroy()}),{useSdfMode:S,useBlend:h,depthFormat:o,vertexShaderBody:r,sdfDistFn:e,fragmentShaderBody:f,blend:g,gpuLines:w,viewMatrixBuffer:v,debugBuffer:k,lineWidthBuffer:T,dataBindGroup:W}},inputs:["joinType","capType","sdfStrokeWidth","alpha","stripes","varyingWidth","debugView","depthTest","cullBackFaces","createGPULines","device","canvasFormat","GPUBufferUsage","positionBuffer","distanceBuffer","totalDistanceBuffer","invalidation"],outputs:["useSdfMode","useBlend","depthFormat","vertexShaderBody","sdfDistFn","fragmentShaderBody","blend","gpuLines","viewMatrixBuffer","debugBuffer","lineWidthBuffer","dataBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:async(n,t,i,a,p,m,u,y,s,d,c,x,l,b,D,I,B,S,h,o)=>{const{createFrameLoop:r}=await C(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(v=>{if(!("createFrameLoop"in v))throw new SyntaxError("export 'createFrameLoop' not found");return v});m.dirty=!0;let e=null,f=0,g=0;const w=r(()=>{if(m.dirty){u.queue.writeBuffer(y,0,s.view);const v=new ArrayBuffer(8);new Uint32Array(v,0,1)[0]=t?1:0,new Float32Array(v,4,1)[0]=d,u.queue.writeBuffer(c,0,v),u.queue.writeBuffer(x,0,new Float32Array([n*d])),l&&(!e||f!==b.width||g!==b.height)&&(e&&e.destroy(),e=u.createTexture({size:[b.width,b.height],format:l,usage:D.RENDER_ATTACHMENT}),f=b.width,g=b.height);const k=u.createCommandEncoder(),T={colorAttachments:[{view:I.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]};l&&e&&(T.depthStencilAttachment={view:e.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"});const W=k.beginRenderPass(T);B.draw(W,{vertexCount:S,resolution:[b.width,b.height],miterLimit:i,joinResolution:a,capResolution:p},[h]),W.end(),u.queue.submit([k.finish()]),m.dirty=!1}});return o.then(()=>{w.cancel(),e&&e.destroy()}),{createFrameLoop:r,depthTexture:e,depthTextureWidth:f,depthTextureHeight:g,loop:w}},inputs:["lineWidth","debugView","miterLimit","joinResolution","capResolution","renderState","device","viewMatrixBuffer","axes","dpr","debugBuffer","lineWidthBuffer","depthFormat","canvas","GPUTextureUsage","gpuContext","gpuLines","numPoints","dataBindGroup","invalidation"],outputs:["createFrameLoop","depthTexture","depthTextureWidth","depthTextureHeight","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});E({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:async(n,t,i,a)=>{if(n>0){let p=function(u,y){const s=document.createElement("a");s.target="_blank",s.download=y,s.href=u,document.body.appendChild(s),s.click(),document.body.removeChild(s)};t.dirty=!0,await new Promise(u=>requestAnimationFrame(u)),await i.queue.onSubmittedWorkDone();const m=a.toDataURL("image/png");p(m,"webgpu-lines-demo.png")}},inputs:["downloadButton","renderState","device","canvas"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
