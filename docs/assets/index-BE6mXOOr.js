import{d as S,_ as L}from"./index-ByB2dbry.js";S({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(o,n,i)=>{if(!navigator.gpu)throw o(n`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("Failed to get WebGPU adapter");const u=await e.requestDevice(),w=navigator.gpu.getPreferredCanvasFormat();return i.then(()=>u.destroy()),{adapter:e,device:u,canvasFormat:w}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(o,n,i,e,u,w)=>{const[{createElementStack:b},{createZoomableAxes:m},{expandable:l}]=await Promise.all([L(()=>import("./element-stack-BU40TvN2.js"),[]).then(d=>{if(!("createElementStack"in d))throw new SyntaxError("export 'createElementStack' not found");return d}),L(()=>import("./zoomable-axes-BfGyq1bg.js"),[]).then(d=>{if(!("createZoomableAxes"in d))throw new SyntaxError("export 'createZoomableAxes' not found");return d}),L(()=>import("./expandable-dZkDG0zz.js"),[]).then(d=>{if(!("expandable"in d))throw new SyntaxError("export 'expandable' not found");return d})]),r=window.devicePixelRatio||1,c=Math.min(640,o),x=480,p=b({width:c,height:x,layers:[{id:"canvas",element:({current:d,width:a,height:s})=>{const t=d||document.createElement("canvas");return t.id="lines-canvas",t.width=Math.floor(a*r),t.height=Math.floor(s*r),t.style.width=`${a}px`,t.style.height=`${s}px`,t}},{id:"svg",element:({current:d,width:a,height:s})=>(d?n.select(d):n.create("svg")).attr("width",a).attr("height",s).style("cursor","grab").node()}]}),h=p.elements.canvas,I=h.getContext("webgpu");I.configure({device:i,format:e,alphaMode:"premultiplied"});const y={dirty:!0},f=m({d3:n,element:p.elements.svg,xScale:n.scaleLinear().domain([-1,1]).range([0,c]),yScale:n.scaleLinear().domain([-1,1]).range([x,0]),aspectRatio:1,onChange:()=>{y.dirty=!0,p.dispatchEvent(new CustomEvent("update"))}}),B=u`<figure style="margin: 0;">
  ${p.element}
  <figcaption>Drag handles to edit vertices. Drag background to pan, scroll to zoom.</figcaption>
</figure>`;return w(l(B,{width:c,height:x,controls:".lines-controls",onResize(d,a,s){p.resize(a,s),f.updateScales(n.scaleLinear().domain([-1,1]).range([0,a]),n.scaleLinear().domain([-1,1]).range([s,0])),y.dirty=!0,p.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:b,createZoomableAxes:m,expandable:l,dpr:r,canvasWidth:c,canvasHeight:x,stack:p,canvas:h,gpuContext:I,renderState:y,axes:f,figure:B}},inputs:["width","d3","device","canvasFormat","html","display"],outputs:["createElementStack","createZoomableAxes","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","renderState","axes","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(o,n)=>{const i=o.range([1,100],{label:"Line width",value:50,step:.5}),e=n(i),u=o.select(["bevel","miter","round"],{label:"Join type",value:"miter"}),w=n(u),b=o.select(["round","square","none"],{label:"Cap type",value:"round"}),m=n(b),l=o.select(["wave","zigzag","spiral"],{label:"Pattern",value:"zigzag"}),r=n(l),c=o.range([0,50],{label:"SDF stroke width",value:10,step:.5}),x=n(c),p=o.range([0,1],{label:"Alpha",value:1,step:.01}),h=n(p),I=o.toggle({label:"Line break",value:!1}),y=n(I),f=o.toggle({label:"Stripes",value:!1}),B=n(f),d=o.toggle({label:"Varying width",value:!1}),a=n(d),s=o.toggle({label:"Debug view",value:"Debug view"}),t=n(s);return{lineWidthInput:i,lineWidth:e,joinTypeInput:u,joinType:w,capTypeInput:b,capType:m,patternInput:l,pattern:r,sdfStrokeWidthInput:c,sdfStrokeWidth:x,alphaInput:p,alpha:h,lineBreakInput:I,lineBreak:y,stripesInput:f,stripes:B,varyingWidthInput:d,varyingWidth:a,debugViewInput:s,debugView:t}},inputs:["Inputs","view"],outputs:["lineWidthInput","lineWidth","joinTypeInput","joinType","capTypeInput","capType","patternInput","pattern","sdfStrokeWidthInput","sdfStrokeWidth","alphaInput","alpha","lineBreakInput","lineBreak","stripesInput","stripes","varyingWidthInput","varyingWidth","debugViewInput","debugView"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(o,n,i)=>{const e=o.range([1,10],{label:"Miter limit",value:4,step:.1,disabled:n!=="miter"}),u=i(e);return{miterLimitInput:e,miterLimit:u}},inputs:["Inputs","joinType","view"],outputs:["miterLimitInput","miterLimit"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(o,n,i)=>{const e=o.range([2,16],{label:"Round join resolution",value:8,step:1,disabled:n!=="round"}),u=i(e);return{joinResolutionInput:e,joinResolution:u}},inputs:["Inputs","joinType","view"],outputs:["joinResolutionInput","joinResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(o,n,i)=>{const e=o.range([2,16],{label:"Round cap resolution",value:8,step:1,disabled:n!=="round"}),u=i(e);return{capResolutionInput:e,capResolution:u}},inputs:["Inputs","capType","view"],outputs:["capResolutionInput","capResolution"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(o,n,i,e,u,w,b,m,l,r,c,x,p,h,I)=>{o(n`<div class="lines-controls">
  ${i}
  ${e}
  ${u}
  ${w}
  ${b}
  ${m}
  ${l}
  ${r}
  ${c}
  ${x}
  ${p}
  ${h}
  ${I}
</div>`)},inputs:["display","html","lineWidthInput","joinTypeInput","capTypeInput","patternInput","miterLimitInput","joinResolutionInput","capResolutionInput","sdfStrokeWidthInput","alphaInput","lineBreakInput","stripesInput","varyingWidthInput","debugViewInput"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(o,n,i,e,u,w)=>{const{createGPULines:b}=await L(()=>import("https://cdn.jsdelivr.net/npm/webgpu-instanced-lines/+esm"),[]).then(a=>{if(!("createGPULines"in a))throw new SyntaxError("export 'createGPULines' not found");return a});function m(a,s){let t;if(a==="zigzag"){t=[];for(let v=0;v<6;v++){const k=-.6+v/5*1.2,E=v%2===0?.2:-.2;t.push({x:k,y:E,z:0,w:1})}}else if(a==="spiral"){t=[];for(let v=0;v<80;v++){const D=v/79,k=D*Math.PI*6,E=.1+D*.6;t.push({x:E*Math.cos(k),y:E*Math.sin(k),z:0,w:1})}}else{t=[];for(let v=0;v<100;v++){const D=v/99,k=-.8+D*1.6,E=.3*Math.sin(D*Math.PI*4)+.2*Math.cos(D*Math.PI*7);t.push({x:k,y:E,z:0,w:1})}}if(s){const g=Math.floor(t.length/2);t.splice(g,0,{x:0,y:0,z:0,w:0})}return t}const l=m(o,n),r=l.length;function c(a){const s=new Float32Array(a.length*4);for(let t=0;t<a.length;t++)s[t*4+0]=a[t].x,s[t*4+1]=a[t].y,s[t*4+2]=a[t].z,s[t*4+3]=a[t].w;return s}function x(a){const s=new Float32Array(a.length);let t=0;for(let g=0;g<a.length;g++){if(a[g].w===0)t=0;else if(g>0&&a[g-1].w!==0){const v=a[g].x-a[g-1].x,D=a[g].y-a[g-1].y;t+=Math.sqrt(v*v+D*D)}s[g]=t}return s}const p=c(l),h=x(l),I=Math.max(...h),y=i.createBuffer({label:"line-positions",size:p.byteLength,usage:e.STORAGE|e.COPY_DST});i.queue.writeBuffer(y,0,p);const f=i.createBuffer({label:"line-distances",size:h.byteLength,usage:e.STORAGE|e.COPY_DST});i.queue.writeBuffer(f,0,h);const B=i.createBuffer({label:"total-distance",size:4,usage:e.UNIFORM|e.COPY_DST});i.queue.writeBuffer(B,0,new Float32Array([I]));function d(){const a=c(l),s=x(l),t=Math.max(...s);i.queue.writeBuffer(y,0,a),i.queue.writeBuffer(f,0,s),i.queue.writeBuffer(B,0,new Float32Array([t])),u.dirty=!0}return w.then(()=>{y.destroy(),f.destroy(),B.destroy()}),{createGPULines:b,generatePattern:m,points:l,numPoints:r,pointsToFloat32Array:c,computeDistances:x,positions:p,distances:h,totalDistance:I,positionBuffer:y,distanceBuffer:f,totalDistanceBuffer:B,updateBuffers:d}},inputs:["pattern","lineBreak","device","GPUBufferUsage","renderState","invalidation"],outputs:["createGPULines","generatePattern","points","numPoints","pointsToFloat32Array","computeDistances","positions","distances","totalDistance","positionBuffer","distanceBuffer","totalDistanceBuffer","updateBuffers"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(o,n,i,e,u)=>{const w=o.select(n.elements.svg),b=i.map((r,c)=>({point:r,index:c})).filter(r=>r.point.w!==0),m=w.selectAll("g.vertex-handle").data(b,r=>r.index).join("g").attr("class","vertex-handle").attr("cursor","move").call(o.drag().on("start",function(){o.select(this).select("circle.visible").attr("stroke","#0066cc").attr("stroke-width",2)}).on("drag",function(r,c){c.point.x=e.xScale.invert(r.x),c.point.y=e.yScale.invert(r.y),o.select(this).attr("transform",`translate(${r.x},${r.y})`),u()}).on("end",function(){o.select(this).select("circle.visible").attr("stroke","#333").attr("stroke-width",1.5)}));m.append("circle").attr("class","hit-area").attr("r",20).attr("fill","transparent"),m.append("circle").attr("class","visible").attr("r",5).attr("fill","white").attr("stroke","#333").attr("stroke-width",1.5).attr("pointer-events","none");function l(){m.attr("transform",r=>`translate(${e.xScale(r.point.x)},${e.yScale(r.point.y)})`)}return l(),n.addEventListener("update",l),{svg:w,editablePoints:b,handleGroups:m,updateHandlePositions:l}},inputs:["d3","stack","points","axes","updateBuffers"],outputs:["svg","editablePoints","handleGroups","updateHandlePositions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(o,n,i,e,u,w,b,m,l,r,c,x,p,h,I,y,f,B,d,a)=>{const s=w>0,t=s||b<1||r,g=c*x,v=`
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
    let normalizedDist = d / totalDistance;
    let w = ${l?`${g.toFixed(1)} * (0.5 + 1.5 * normalizedDist)`:`${g.toFixed(1)}`};
    return Vertex(vec4f(projected.xyz, p.w * projected.w), w, d, w);
  }
`,D=e==="square"?"max(abs(lineCoord.x), abs(lineCoord.y))":"length(lineCoord.xy)",k=`
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
    let strokeWidth = ${w.toFixed(1)} * debug.dpr;
    let baseAlpha = ${b.toFixed(2)};

    // Compute SDF values
    let sdf = 0.5 * lineWidth * ${D};
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
    var color = ${m?"mix(baseColor, stripeColor, stripe)":"baseColor"};

    // Layer 3: Apply stroke (50% black in debug mode, dark blue in normal mode)
    color = mix(color, vec3f(0.0), strokeMask * 0.7);

    // Layer 4: Wireframe gridlines (debug only)
    if (debug.enabled == 1u) {
      let wire = grid(vec3f(triStripCoord, triStripCoord.x + triStripCoord.y), 0.5 * debug.dpr, 1.0);
      color = mix(vec3f(1.0), color, wire);
    }

    return vec4f(color, aa);
  }
`,E=p(h,{colorTargets:[{format:I,blend:t?{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}:void 0}],join:o,joinResolution:n,miterLimit:i,cap:e,capResolution:u,vertexShaderBody:v,fragmentShaderBody:k}),W=h.createBuffer({label:"view-matrix",size:64,usage:y.UNIFORM|y.COPY_DST}),C=h.createBuffer({label:"debug-uniform",size:8,usage:y.UNIFORM|y.COPY_DST}),F=h.createBindGroup({layout:E.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:f}},{binding:1,resource:{buffer:B}},{binding:2,resource:{buffer:W}},{binding:3,resource:{buffer:d}},{binding:4,resource:{buffer:C}}]});return a.then(()=>{E.destroy(),W.destroy(),C.destroy()}),{useSdfMode:s,useBlend:t,baseWidth:g,vertexShaderBody:v,sdfDistFn:D,fragmentShaderBody:k,gpuLines:E,viewMatrixBuffer:W,debugBuffer:C,dataBindGroup:F}},inputs:["joinType","joinResolution","miterLimit","capType","capResolution","sdfStrokeWidth","alpha","stripes","varyingWidth","debugView","lineWidth","dpr","createGPULines","device","canvasFormat","GPUBufferUsage","positionBuffer","distanceBuffer","totalDistanceBuffer","invalidation"],outputs:["useSdfMode","useBlend","baseWidth","vertexShaderBody","sdfDistFn","fragmentShaderBody","gpuLines","viewMatrixBuffer","debugBuffer","dataBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:async(o,n,i,e,u,w,b,m,l,r,c,x,p,h)=>{const{createFrameLoop:I}=await L(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(f=>{if(!("createFrameLoop"in f))throw new SyntaxError("export 'createFrameLoop' not found");return f});i.dirty=!0;const y=I(()=>{if(i.dirty){e.queue.writeBuffer(u,0,w.view);const f=new ArrayBuffer(8);new Uint32Array(f,0,1)[0]=n?1:0,new Float32Array(f,4,1)[0]=b,e.queue.writeBuffer(m,0,f);const B=e.createCommandEncoder(),d=B.beginRenderPass({colorAttachments:[{view:l.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:1,g:1,b:1,a:1}}]});r.draw(d,{vertexCount:c,width:o*b,resolution:[x.width,x.height]},[p]),d.end(),e.queue.submit([B.finish()]),i.dirty=!1}});return h.then(()=>y.cancel()),{createFrameLoop:I,loop:y}},inputs:["lineWidth","debugView","renderState","device","viewMatrixBuffer","axes","dpr","debugBuffer","gpuContext","gpuLines","numPoints","canvas","dataBindGroup","invalidation"],outputs:["createFrameLoop","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
