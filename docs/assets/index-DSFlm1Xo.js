import{d as x,_ as U}from"./index-ByB2dbry.js";x({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(t,e,a)=>{if(!navigator.gpu)throw t(e`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const r=await navigator.gpu.requestAdapter();if(!r)throw new Error("Failed to get WebGPU adapter");const u=await r.requestDevice(),n=navigator.gpu.getPreferredCanvasFormat();return a.then(()=>u.destroy()),{adapter:r,device:u,canvasFormat:n}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(t,e,a,r,u,n,o)=>{const[{createElementStack:m},{expandable:f}]=await Promise.all([U(()=>import("./element-stack-BU40TvN2.js"),[]).then(l=>{if(!("createElementStack"in l))throw new SyntaxError("export 'createElementStack' not found");return l}),U(()=>import("./expandable-goukRGI0.js"),[]).then(l=>{if(!("expandable"in l))throw new SyntaxError("export 'expandable' not found");return l})]),p=window.devicePixelRatio||1,c=Math.min(800,t),i=Math.max(400,c*.6),h=m({width:c,height:i,layers:[{id:"canvas",element:({current:l,width:M,height:B})=>{const P=l||document.createElement("canvas");return P.id="attractor-canvas",P.width=Math.floor(M*p),P.height=Math.floor(B*p),P.style.width=`${M}px`,P.style.height=`${B}px`,P}},{id:"svg",element:({current:l,width:M,height:B})=>(l?e.select(l):e.create("svg")).attr("width",M).attr("height",B).style("cursor","grab").node()}]}),g=h.elements.canvas,v=g.getContext("webgpu");v.configure({device:a,format:r,alphaMode:"premultiplied"});const b=a.createTexture({label:"depth-texture",size:[g.width,g.height],format:"depth24plus",usage:u.RENDER_ATTACHMENT}),y={dirty:!0,depthTexture:b},C=n`<figure style="margin: 0;" id="main-figure">
  ${h.element}
  <figcaption>Click <em>Restart</em> to reinitialize particles.</figcaption>
</figure>`;return o(f(C,{width:c,height:i,controls:".attractor-controls",onResize(l,M,B){h.resize(M,B),g.width=Math.floor(M*p),g.height=Math.floor(B*p),y.depthTexture.destroy(),y.depthTexture=a.createTexture({label:"depth-texture",size:[g.width,g.height],format:"depth24plus",usage:u.RENDER_ATTACHMENT}),y.dirty=!0,h.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:m,expandable:f,dpr:p,canvasWidth:c,canvasHeight:i,stack:h,canvas:g,gpuContext:v,depthTexture:b,renderState:y,figure:C}},inputs:["width","d3","device","canvasFormat","GPUTextureUsage","html","display"],outputs:["createElementStack","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","depthTexture","renderState","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(t,e,a,r)=>{const u=t`<div class="attractor-controls"></div>`;function n(l){return u.appendChild(l),e.input(l)}const o=a.button("Restart"),m=n(o),f=a.toggle({label:"Simulate",value:!0}),p=n(f),c=a.range([1,4096],{value:20,label:"Particle count",step:1}),i=n(c),h=a.range([1,1024],{label:"Track length",value:100,transform:Math.log,step:1}),g=n(h),v=a.range([.001,.1],{value:.02,label:"Time step"}),b=n(v),y=a.range([1,20],{value:5,label:"Line width",step:.5}),C=n(y);return r(u),{controlsContainer:u,ctrl:n,restartInput:o,restart:m,simulateInput:f,simulate:p,particleCountInput:c,particleCount:i,stepCountInput:h,stepCount:g,dtInput:v,dt:b,lineWidthInput:y,lineWidth:C}},inputs:["html","Generators","Inputs","display"],outputs:["controlsContainer","ctrl","restartInput","restart","simulateInput","simulate","particleCountInput","particleCount","stepCountInput","stepCount","dtInput","dt","lineWidthInput","lineWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(t,e)=>t`### The Attractor

A strange attractor is a set of states toward which a dynamical system evolves over time. The [Lorenz System](https://en.wikipedia.org/wiki/Lorenz_system) is the canonical example. The particular attractor we're simulating here is defined by the system of ordinary differential equations:

${e.block`\begin{aligned}
\frac{dx}{dt} &= \alpha x(1 - y) - \beta z \\[0.5em]
\frac{dy}{dt} &= -\gamma y(1 - x^2) \\[0.5em]
\frac{dz}{dt} &= \mu x
\end{aligned}`}

with parameters ${e`\alpha = 3`}, ${e`\beta = 2.2`}, ${e`\gamma = 1`}, ${e`\mu = 1.51`}. These equations exhibit chaotic behavior; nearby trajectories diverge exponentially but remain bounded within the attractor's basin.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});x({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(t,e)=>t`## State Layout

The state of our ordinary differential equation (ODE) is represented by the three-component vector ${e`(x, y, z)`}. We store these in a flat storage buffer as \`vec3f\` elements. The ${e`j^{th}`} time step of the ${e`i^{th}`} particle is represented by the vector:

${e.block`\mathbf{p}_j^{(i)} = (x_j^{(i)}, y_j^{(i)}, z_j^{(i)})`}

### Why Storage Buffers?

The WebGL version used a 2D texture where each row was a particle and each column was a time step. Textures are a natural fit when you need 2D spatial locality or hardware filtering, but for our access pattern, a flat buffer is simpler and more efficient.

Storage buffers offer several advantages over textures for this use case:

- **\`read_write\` access**: Storage buffers can be both read and written in the same compute pass
- **Direct indexing**: Index arithmetic replaces texel coordinate calculations with half-pixel offsets
- **No intermediate resources**: Eliminate a temporary texture needed for the copy step

We use **particle-major ordering**: all time steps for particle 0 come first, then all time steps for particle 1, and so on. The buffer index for a given particle and step is simply \`particle * stepCount + step\`.

### Ring Buffer

As we step the ODE, we compute one new history point for each particle track. To avoid having to shift the entire history on every iteration, we treat each particle's slice as a **ring buffer**. At each time step ${e`j`}, we use the previous position, ${e`p_{j-1}^{(i)}`}, to compute the next, ${e`p_j^{(i)}`}. When we reach the end of the slice, we loop back to the start, overwriting the oldest time step with the newest.

This ring buffer approach means we only write one position per particle per frame, regardless of track length.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});x({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(t,e,a,r,u,n)=>{const o=r.createBuffer({label:"state-buffer",size:t*e*16,usage:u.STORAGE|u.COPY_DST}),m={currentColumn:0,t:0};return n.then(()=>{o.destroy()}),{stateBuffer:o,simState:m}},inputs:["particleCount","stepCount","restart","device","GPUBufferUsage","invalidation"],outputs:["stateBuffer","simState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(t,e,a,r,u,n,o,m)=>{const f=`
@group(0) @binding(0) var<storage, read_write> stateBuffer: array<vec3f>;

struct Uniforms {
  origin: vec3f,
  scale: f32,
  stepCount: u32,
  particleCount: u32,
}
@group(0) @binding(1) var<uniform> uniforms: Uniforms;

// Quasirandom sequence: http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/
fn quasirandom(n: f32) -> vec3f {
  let g = 1.22074408460575947536;
  return fract(0.5 + n * vec3f(1.0 / g, 1.0 / (g * g), 1.0 / (g * g * g))).zyx;
}

fn sphericalRandom(n: f32) -> vec3f {
  let rand = quasirandom(n);
  let u = rand.x * 2.0 - 1.0;
  let theta = 6.283185307179586 * rand.y;
  let r = sqrt(1.0 - u * u);
  return vec3f(r * cos(theta), r * sin(theta), u) * sqrt(rand.z);
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let particle = gid.x;
  if (particle >= uniforms.particleCount) { return; }

  // Initialize all columns for this particle with the same position
  let pos = uniforms.origin + uniforms.scale * sphericalRandom(f32(particle) + 0.5);
  let baseIdx = particle * uniforms.stepCount;
  for (var col = 0u; col < uniforms.stepCount; col++) {
stateBuffer[baseIdx + col] = pos;
  }
}
`,p=t.createShaderModule({label:"init-shader",code:f}),c=t.createComputePipeline({label:"init-pipeline",layout:"auto",compute:{module:p,entryPoint:"main"}}),i=t.createBuffer({label:"init-uniforms",size:32,usage:e.UNIFORM|e.COPY_DST}),h=t.createBindGroup({label:"init-bind-group",layout:c.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:i}}]});function g(){const v=new ArrayBuffer(32),b=new Float32Array(v),y=new Uint32Array(v);b[0]=0,b[1]=1,b[2]=0,b[3]=1,y[4]=r,y[5]=u,t.queue.writeBuffer(i,0,v);const C=t.createCommandEncoder(),l=C.beginComputePass();l.setPipeline(c),l.setBindGroup(0,h),l.dispatchWorkgroups(Math.ceil(u/64)),l.end(),t.queue.submit([C.finish()]),n.currentColumn=0,n.t=0,o.dirty=!0}return g(),m.then(()=>{i.destroy()}),{initShaderCode:f,initShaderModule:p,initPipeline:c,initUniformBuffer:i,initBindGroup:h,initializeState:g}},inputs:["device","GPUBufferUsage","stateBuffer","stepCount","particleCount","simState","renderState","invalidation"],outputs:["initShaderCode","initShaderModule","initPipeline","initUniformBuffer","initBindGroup","initializeState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:()=>({attractorWGSL:`
fn derivative(x: f32, y: f32, z: f32, t: f32) -> vec3f {
  let alpha = 3.0;
  let beta = 2.20;
  let gamma = 1.0;
  let mu = 1.510;
  return vec3f(
alpha * x * (1.0 - y) - beta * z,
-gamma * y * (1.0 - x * x),
mu * x
  );
}
`}),inputs:[],outputs:["attractorWGSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(t,e,a,r,u)=>{const n=`
@group(0) @binding(0) var<storage, read_write> stateBuffer: array<vec3f>;

struct Uniforms {
  dt: f32,
  t: f32,
  srcColumn: u32,
  dstColumn: u32,
  stepCount: u32,
  particleCount: u32,
}
@group(0) @binding(1) var<uniform> uniforms: Uniforms;

${t}

fn deriv(p: vec3f, t: f32) -> vec3f {
  return derivative(p.x, p.y, p.z, t);
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let particle = gid.x;
  if (particle >= uniforms.particleCount) { return; }

  // Read current state from source column
  let readIdx = particle * uniforms.stepCount + uniforms.srcColumn;
  let p = stateBuffer[readIdx];

  // RK4 integration
  let dt = uniforms.dt;
  let t = uniforms.t;
  let k1 = deriv(p, t);
  let k2 = deriv(p + 0.5 * dt * k1, t + 0.5 * dt);
  let k3 = deriv(p + 0.5 * dt * k2, t + 0.5 * dt);
  let k4 = deriv(p + dt * k3, t + dt);

  var newP = p + (dt / 6.0) * (k1 + k4 + 2.0 * (k2 + k3));

  // If particle diverges, reset near origin
  if (dot(newP, newP) > 1e6) {
newP = newP * 0.0001;
  }

  // Write to destination column
  let writeIdx = particle * uniforms.stepCount + uniforms.dstColumn;
  stateBuffer[writeIdx] = newP;
}
`,o=e.createShaderModule({label:"integrate-shader",code:n}),m=e.createComputePipeline({label:"integrate-pipeline",layout:"auto",compute:{module:o,entryPoint:"main"}}),f=e.createBuffer({label:"integrate-uniforms",size:32,usage:a.UNIFORM|a.COPY_DST}),p=e.createBindGroup({label:"integrate-bind-group",layout:m.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:r}},{binding:1,resource:{buffer:f}}]});return u.then(()=>{f.destroy()}),{integrateShaderCode:n,integrateShaderModule:o,integratePipeline:m,integrateUniformBuffer:f,integrateBindGroup:p}},inputs:["attractorWGSL","device","GPUBufferUsage","stateBuffer","invalidation"],outputs:["integrateShaderCode","integrateShaderModule","integratePipeline","integrateUniformBuffer","integrateBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:(t,e)=>t`## Line Rendering

In the timeless words of Matt DesLauriers, *[Drawing Lines is Hard](https://mattdesl.svbtle.com/drawing-lines-is-hard)*. Browsers limit the built-in line primitive to a single pixel width, so for any reasonably well-rendered lines, we need to build our own geometry.

The [webgpu-lines](../webgpu-lines/) module handles this. It renders lines as instanced triangle strips, with one instance per line segment. Each instance draws the segment itself plus portions of the adjacent joins. A four-point sliding window (previous, start, end, next) provides the context needed to compute join geometry.

We don't pass vertex positions directly. Instead, we provide a **vertex function** that the module calls for each point index. The function samples data from the state buffer. The module handles all the complexity of building smooth joins and round caps.

### Buffer Index Lookup

Rather than copying positions to vertex buffers each frame, we sample them directly from the storage buffer in the vertex shader. Each vertex index maps to a buffer index:

${e.block`\text{bufferIdx} = i \cdot M + ((j + \text{offset}) \mod M)`}

where ${e`M`} is the number of time steps, ${e`i`} is the particle index, and ${e`j`} is the step within that particle's track.

To handle the ring buffer, we add an offset to the step index that shifts based on which column was most recently written. The oldest data is always at the "start" of the rendered line, and the newest at the end.

### Line Breaks

Multiple particle tracks are rendered in a single draw call. We separate them using sentinel values of \`w = 0\` in clip space. When the vertex function returns a position with \`w = 0\`, the line renderer interprets this as a break, skipping one instance and reworking adjacent joins into end caps.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});x({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:(t,e,a)=>{const r={phi:.8,theta:.3,distance:7,center:[0,1,0],fov:Math.PI/4,near:.01,far:100};function u(i){const{phi:h,theta:g,distance:v,center:b,fov:y,near:C,far:l}=r,M=b[0]+v*Math.cos(g)*Math.cos(h),B=b[1]+v*Math.sin(g),P=b[2]+v*Math.cos(g)*Math.sin(h),w=[M,B,P],s=[b[0]-M,b[1]-B,b[2]-P],_=Math.sqrt(s[0]**2+s[1]**2+s[2]**2);s[0]/=_,s[1]/=_,s[2]/=_;const I=[0,1,0],d=[s[1]*I[2]-s[2]*I[1],s[2]*I[0]-s[0]*I[2],s[0]*I[1]-s[1]*I[0]],S=Math.sqrt(d[0]**2+d[1]**2+d[2]**2);d[0]/=S,d[1]/=S,d[2]/=S;const E=[d[1]*s[2]-d[2]*s[1],d[2]*s[0]-d[0]*s[2],d[0]*s[1]-d[1]*s[0]],G=new Float32Array([d[0],E[0],-s[0],0,d[1],E[1],-s[1],0,d[2],E[2],-s[2],0,-(d[0]*w[0]+d[1]*w[1]+d[2]*w[2]),-(E[0]*w[0]+E[1]*w[1]+E[2]*w[2]),s[0]*w[0]+s[1]*w[1]+s[2]*w[2],1]),j=1/Math.tan(y/2),z=1/(C-l),W=new Float32Array([j/i,0,0,0,0,j,0,0,0,0,(C+l)*z,-1,0,0,C*l*z*2,0]),A=new Float32Array(16);for(let k=0;k<4;k++)for(let T=0;T<4;T++){let D=0;for(let L=0;L<4;L++)D+=W[k+L*4]*G[L+T*4];A[k+T*4]=D}return A}const n=t.select(e.elements.svg);let o=!1,m=0,f=0;function p(i){if(!o)return;const h=i.clientX-m,g=i.clientY-f;r.phi+=h*.01,r.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,r.theta+g*.01)),m=i.clientX,f=i.clientY,a.dirty=!0}function c(){o&&(o=!1,n.style("cursor","grab"),window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",c))}return n.on("mousedown",i=>{i.preventDefault(),o=!0,m=i.clientX,f=i.clientY,n.style("cursor","grabbing"),window.addEventListener("mousemove",p),window.addEventListener("mouseup",c)}),n.on("wheel",i=>{i.preventDefault(),r.distance*=1+i.deltaY*.001,r.distance=Math.max(1,Math.min(50,r.distance)),a.dirty=!0}),{cameraState:r,getProjectionViewMatrix:u,svg:n,isDragging:o,lastX:m,lastY:f,onMouseMove:p,onMouseUp:c}},inputs:["d3","stack","renderState"],outputs:["cameraState","getProjectionViewMatrix","svg","isDragging","lastX","lastY","onMouseMove","onMouseUp"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:async(t,e,a,r,u)=>{const{createGPULines:n}=await U(()=>import("./webgpu-lines-BjFyL3na.js"),[]).then(h=>{if(!("createGPULines"in h))throw new SyntaxError("export 'createGPULines' not found");return h}),o=`
@group(1) @binding(0) var<storage, read> stateBuffer: array<vec3f>;
@group(1) @binding(1) var<uniform> projViewMatrix: mat4x4f;

struct LineUniforms {
  columnOffset: u32,
  stepCount: u32,
  particleCount: u32,
}
@group(1) @binding(2) var<uniform> lineUniforms: LineUniforms;

struct Vertex {
  position: vec4f,
  width: f32,
  particleId: f32,
}

fn getVertex(index: u32) -> Vertex {
  // Decode buffer index from vertex index
  // Index layout: for each particle, stepCount points, then a break
  let pointsPerParticle = lineUniforms.stepCount + 1u; // +1 for line break
  let particle = index / pointsPerParticle;
  let step = index % pointsPerParticle;

  // Check if this is a line break point
  if (step >= lineUniforms.stepCount) {
return Vertex(vec4f(0.0, 0.0, 0.0, 0.0), 0.0, f32(particle));
  }

  // Compute buffer index with ring buffer offset
  let stepIndex = (step + lineUniforms.columnOffset) % lineUniforms.stepCount;
  let bufferIdx = particle * lineUniforms.stepCount + stepIndex;

  // Sample position from state buffer
  let pos = stateBuffer[bufferIdx];

  // Project to clip space
  let projected = projViewMatrix * vec4f(pos, 1.0);

  // Use particle ID for slight z offset to reduce z-fighting
  var p = projected;
  let w = p.w;
  p = p / w;
  p.z = p.z - 0.0002 * abs(f32(particle) / f32(lineUniforms.particleCount) - 0.5);
  p = p * w;

  return Vertex(p, uniforms.width, f32(particle) / f32(lineUniforms.particleCount));
}
`,m=`
fn getColor(lineCoord: vec2f, particleId: f32) -> vec4f {
  let color1 = vec3f(0.55, 0.89, 0.65);
  let color2 = vec3f(0.11, 0.32, 0.65);
  let baseColor = mix(color1, color2, particleId);

  // 1-pixel border: lineCoord is in [-1, 1], so 1 pixel = 2/width in normalized coords
  let borderWidth = 2.0 / uniforms.width;
  let dist = length(lineCoord.xy);
  let borderColor = vec3f(1.0);
  let color = mix(baseColor, borderColor, smoothstep(1.0 - 2.0 * borderWidth, 1.0 - borderWidth, dist));

  return vec4f(color, 1.0);
}
`,f=n(t,{format:e,depthFormat:"depth24plus",join:"bevel",cap:"round",capResolution:4,vertexShaderBody:o,fragmentShaderBody:m}),p=t.createBuffer({label:"proj-view-matrix",size:64,usage:a.UNIFORM|a.COPY_DST}),c=t.createBuffer({label:"line-uniforms",size:16,usage:a.UNIFORM|a.COPY_DST}),i=t.createBindGroup({layout:f.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:r}},{binding:1,resource:{buffer:p}},{binding:2,resource:{buffer:c}}]});return u.then(()=>{f.destroy(),p.destroy(),c.destroy()}),{createGPULines:n,vertexShaderBody:o,fragmentShaderBody:m,gpuLines:f,projViewBuffer:p,lineUniformBuffer:c,lineBindGroup:i}},inputs:["device","canvasFormat","GPUBufferUsage","stateBuffer","invalidation"],outputs:["createGPULines","vertexShaderBody","fragmentShaderBody","gpuLines","projViewBuffer","lineUniformBuffer","lineBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:async(t,e,a,r,u,n,o,m,f,p,c,i,h,g,v,b,y,C,l,M)=>{const{createFrameLoop:B}=await U(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(w=>{if(!("createFrameLoop"in w))throw new SyntaxError("export 'createFrameLoop' not found");return w}),P=B(()=>{if(e){const w=r.currentColumn,s=(r.currentColumn+1)%u,_=new ArrayBuffer(32),I=new Float32Array(_),d=new Uint32Array(_);I[0]=a,I[1]=r.t,d[2]=w,d[3]=s,d[4]=u,d[5]=n,o.queue.writeBuffer(m,0,_);const S=o.createCommandEncoder(),E=S.beginComputePass();E.setPipeline(f),E.setBindGroup(0,p),E.dispatchWorkgroups(Math.ceil(n/64)),E.end(),o.queue.submit([S.finish()]),r.t+=a,r.currentColumn=s,c.dirty=!0}if(c.dirty){const w=i.width/i.height,s=h(w);o.queue.writeBuffer(g,0,s);const _=new ArrayBuffer(16),I=new Uint32Array(_);I[0]=(r.currentColumn+1)%u,I[1]=u,I[2]=n,o.queue.writeBuffer(v,0,_);const d=o.createCommandEncoder(),S=d.beginRenderPass({colorAttachments:[{view:b.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:1,g:1,b:1,a:1}}],depthStencilAttachment:{view:c.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}}),E=n*(u+1);y.draw(S,{vertexCount:E,width:t*C,resolution:[i.width,i.height]},[l]),S.end(),o.queue.submit([d.finish()]),e||(c.dirty=!1)}});return M.then(()=>P.cancel()),{createFrameLoop:B,loop:P}},inputs:["lineWidth","simulate","dt","simState","stepCount","particleCount","device","integrateUniformBuffer","integratePipeline","integrateBindGroup","renderState","canvas","getProjectionViewMatrix","projViewBuffer","lineUniformBuffer","gpuContext","gpuLines","dpr","lineBindGroup","invalidation"],outputs:["createFrameLoop","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(t,e)=>{e()},inputs:["restart","initializeState"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
