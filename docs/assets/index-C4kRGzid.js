import{d as M,_ as z}from"./index-ByB2dbry.js";M({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(i,t,a)=>{if(!navigator.gpu)throw i(t`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const n=await navigator.gpu.requestAdapter();if(!n)throw new Error("Failed to get WebGPU adapter");const d=await n.requestDevice(),r=navigator.gpu.getPreferredCanvasFormat();return a.then(()=>d.destroy()),{adapter:n,device:d,canvasFormat:r}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(i,t,a,n,d,r,o)=>{const[{createElementStack:p},{expandable:l}]=await Promise.all([z(()=>import("./element-stack-BU40TvN2.js"),[]).then(f=>{if(!("createElementStack"in f))throw new SyntaxError("export 'createElementStack' not found");return f}),z(()=>import("./expandable-goukRGI0.js"),[]).then(f=>{if(!("expandable"in f))throw new SyntaxError("export 'expandable' not found");return f})]),b=window.devicePixelRatio||1,h=Math.min(800,i),m=Math.max(400,h*.6),e=p({width:h,height:m,layers:[{id:"canvas",element:({current:f,width:C,height:B})=>{const P=f||document.createElement("canvas");return P.id="attractor-canvas",P.width=Math.floor(C*b),P.height=Math.floor(B*b),P.style.width=`${C}px`,P.style.height=`${B}px`,P}},{id:"svg",element:({current:f,width:C,height:B})=>(f?t.select(f):t.create("svg")).attr("width",C).attr("height",B).style("cursor","grab").node()}]}),u=e.elements.canvas,c=u.getContext("webgpu");c.configure({device:a,format:n,alphaMode:"premultiplied"});const w=a.createTexture({label:"depth-texture",size:[u.width,u.height],format:"depth24plus",usage:d.RENDER_ATTACHMENT}),y={dirty:!0,depthTexture:w},I=r`<figure style="margin: 0;" id="main-figure">
  ${e.element}
</figure>`;return o(l(I,{width:h,height:m,controls:".attractor-controls",onResize(f,C,B){e.resize(C,B),u.width=Math.floor(C*b),u.height=Math.floor(B*b),y.depthTexture.destroy(),y.depthTexture=a.createTexture({label:"depth-texture",size:[u.width,u.height],format:"depth24plus",usage:d.RENDER_ATTACHMENT}),y.dirty=!0,e.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:p,expandable:l,dpr:b,canvasWidth:h,canvasHeight:m,stack:e,canvas:u,gpuContext:c,depthTexture:w,renderState:y,figure:I}},inputs:["width","d3","device","canvasFormat","GPUTextureUsage","html","display"],outputs:["createElementStack","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","depthTexture","renderState","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(i,t,a,n)=>{const d=i`<div class="attractor-controls"></div>`;function r(f){return d.appendChild(f),t.input(f)}const o=a.button("Restart"),p=r(o),l=a.toggle({label:"Simulate",value:!0}),b=r(l),h=a.range([1,4096],{value:20,label:"Particle count",step:1}),m=r(h),e=a.range([1,1024],{label:"Track length",value:100,transform:Math.log,step:1}),u=r(e),c=a.range([.001,.1],{value:.02,label:"Time step"}),w=r(c),y=a.range([1,20],{value:5,label:"Line width",step:.5}),I=r(y);return n(d),{controlsContainer:d,ctrl:r,restartInput:o,restart:p,simulateInput:l,simulate:b,particleCountInput:h,particleCount:m,stepCountInput:e,stepCount:u,dtInput:c,dt:w,lineWidthInput:y,lineWidth:I}},inputs:["html","Generators","Inputs","display"],outputs:["controlsContainer","ctrl","restartInput","restart","simulateInput","simulate","particleCountInput","particleCount","stepCountInput","stepCount","dtInput","dt","lineWidthInput","lineWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(i,t)=>i`### The Attractor

A strange attractor is a set of states toward which a dynamical system evolves over time. The [Lorenz System](https://en.wikipedia.org/wiki/Lorenz_system) is the canonical example. The particular attractor we're simulating here is the *Bouali Attractor*, described by Safieddine Bouali in [A 3D Strange Attractor with a Distinctive Silhouette. The Butterfly Effect Revisited](https://arxiv.org/abs/1311.6128). It is defined by the system of ordinary differential equations:

${t.block`\begin{aligned}
\frac{dx}{dt} &= \alpha x(1 - y) - \beta z \\[0.5em]
\frac{dy}{dt} &= -\gamma y(1 - x^2) \\[0.5em]
\frac{dz}{dt} &= \mu x
\end{aligned}`}

with parameters ${t`\alpha = 3`}, ${t`\beta = 2.2`}, ${t`\gamma = 1`}, ${t`\mu = 1.51`}. These equations exhibit chaotic behavior; nearby trajectories diverge exponentially but remain bounded within the attractor's basin.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});M({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(i,t)=>i`## State Layout

The state of our ordinary differential equation (ODE) is represented by the three-component vector ${t`(x, y, z)`}. We store these in a flat storage buffer as \`vec3f\` elements. The ${t`j^{th}`} time step of the ${t`i^{th}`} particle is represented by the vector:

${t.block`\mathbf{p}_j^{(i)} = (x_j^{(i)}, y_j^{(i)}, z_j^{(i)})`}

We use **particle-major ordering**: all time steps for particle 0 come first, then all time steps for particle 1, and so on. The buffer index for a given particle and step is \`particle * stepCount + step\`.

As we step the ODE, we compute one new history point for each particle track. To avoid shifting the entire history on every iteration, we treat each particle's slice as a **ring buffer**. At each time step ${t`j`}, we use the previous position, ${t`p_{j-1}^{(i)}`}, to compute the next, ${t`p_j^{(i)}`}. When we reach the end of the slice, we loop back to the start, overwriting the oldest time step with the newest.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});M({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(i,t,a,n,d,r)=>{const o=n.createBuffer({label:"state-buffer",size:i*t*16,usage:d.STORAGE|d.COPY_DST}),p={currentColumn:0,t:0};return r.then(()=>{o.destroy()}),{stateBuffer:o,simState:p}},inputs:["particleCount","stepCount","restart","device","GPUBufferUsage","invalidation"],outputs:["stateBuffer","simState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(i,t,a,n,d,r,o,p)=>{const l=`
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
`,b=i.createShaderModule({label:"init-shader",code:l}),h=i.createComputePipeline({label:"init-pipeline",layout:"auto",compute:{module:b,entryPoint:"main"}}),m=i.createBuffer({label:"init-uniforms",size:32,usage:t.UNIFORM|t.COPY_DST}),e=i.createBindGroup({label:"init-bind-group",layout:h.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:m}}]});function u(){const c=new ArrayBuffer(32),w=new Float32Array(c),y=new Uint32Array(c);w[0]=0,w[1]=1,w[2]=0,w[3]=1,y[4]=n,y[5]=d,i.queue.writeBuffer(m,0,c);const I=i.createCommandEncoder(),f=I.beginComputePass();f.setPipeline(h),f.setBindGroup(0,e),f.dispatchWorkgroups(Math.ceil(d/64)),f.end(),i.queue.submit([I.finish()]),r.currentColumn=0,r.t=0,o.dirty=!0}return u(),p.then(()=>{m.destroy()}),{initShaderCode:l,initShaderModule:b,initPipeline:h,initUniformBuffer:m,initBindGroup:e,initializeState:u}},inputs:["device","GPUBufferUsage","stateBuffer","stepCount","particleCount","simState","renderState","invalidation"],outputs:["initShaderCode","initShaderModule","initPipeline","initUniformBuffer","initBindGroup","initializeState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:()=>({attractorWGSL:`
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
`}),inputs:[],outputs:["attractorWGSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(i,t,a,n,d)=>{const r=`
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

${i}

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
`,o=t.createShaderModule({label:"integrate-shader",code:r}),p=t.createComputePipeline({label:"integrate-pipeline",layout:"auto",compute:{module:o,entryPoint:"main"}}),l=t.createBuffer({label:"integrate-uniforms",size:32,usage:a.UNIFORM|a.COPY_DST}),b=t.createBindGroup({label:"integrate-bind-group",layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:n}},{binding:1,resource:{buffer:l}}]});return d.then(()=>{l.destroy()}),{integrateShaderCode:r,integrateShaderModule:o,integratePipeline:p,integrateUniformBuffer:l,integrateBindGroup:b}},inputs:["attractorWGSL","device","GPUBufferUsage","stateBuffer","invalidation"],outputs:["integrateShaderCode","integrateShaderModule","integratePipeline","integrateUniformBuffer","integrateBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:(i,t,a)=>{const n={phi:.8,theta:.3,distance:7,center:[0,2,0],fov:Math.PI/4,near:.01,far:100};function d(e){const{phi:u,theta:c,distance:w,center:y,fov:I,near:f,far:C}=n,B=y[0]+w*Math.cos(c)*Math.cos(u),P=y[1]+w*Math.sin(c),S=y[2]+w*Math.cos(c)*Math.sin(u),v=[B,P,S],s=[y[0]-B,y[1]-P,y[2]-S],E=Math.sqrt(s[0]**2+s[1]**2+s[2]**2);s[0]/=E,s[1]/=E,s[2]/=E;const x=[0,1,0],g=[s[1]*x[2]-s[2]*x[1],s[2]*x[0]-s[0]*x[2],s[0]*x[1]-s[1]*x[0]],_=Math.sqrt(g[0]**2+g[1]**2+g[2]**2);g[0]/=_,g[1]/=_,g[2]/=_;const T=[g[1]*s[2]-g[2]*s[1],g[2]*s[0]-g[0]*s[2],g[0]*s[1]-g[1]*s[0]],R=new Float32Array([g[0],T[0],-s[0],0,g[1],T[1],-s[1],0,g[2],T[2],-s[2],0,-(g[0]*v[0]+g[1]*v[1]+g[2]*v[2]),-(T[0]*v[0]+T[1]*v[1]+T[2]*v[2]),s[0]*v[0]+s[1]*v[1]+s[2]*v[2],1]),A=1/Math.tan(I/2),D=1/(f-C),q=new Float32Array([A/e,0,0,0,0,A,0,0,0,0,(f+C)*D,-1,0,0,f*C*D*2,0]),G=new Float32Array(16);for(let U=0;U<4;U++)for(let k=0;k<4;k++){let j=0;for(let L=0;L<4;L++)j+=q[U+L*4]*R[L+k*4];G[U+k*4]=j}return G}const r=i.select(t.elements.svg);let o=!1,p=0,l=0;function b(e){if(!o)return;const u=e.clientX-p,c=e.clientY-l;n.phi+=u*.01,n.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,n.theta+c*.01)),p=e.clientX,l=e.clientY,a.dirty=!0}function h(){o&&(o=!1,r.style("cursor","grab"),window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",h))}r.on("mousedown",e=>{e.preventDefault(),o=!0,p=e.clientX,l=e.clientY,r.style("cursor","grabbing"),window.addEventListener("mousemove",b),window.addEventListener("mouseup",h)}),r.on("wheel",e=>{e.preventDefault(),n.distance*=1+e.deltaY*.001,n.distance=Math.max(1,Math.min(50,n.distance)),a.dirty=!0});let m=0;return r.on("touchstart",e=>{if(e.preventDefault(),e.touches.length===1)o=!0,p=e.touches[0].clientX,l=e.touches[0].clientY;else if(e.touches.length===2){const u=e.touches[1].clientX-e.touches[0].clientX,c=e.touches[1].clientY-e.touches[0].clientY;m=Math.sqrt(u*u+c*c)}}),r.on("touchmove",e=>{if(e.preventDefault(),e.touches.length===1&&o){const u=e.touches[0].clientX-p,c=e.touches[0].clientY-l;n.phi+=u*.01,n.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,n.theta+c*.01)),p=e.touches[0].clientX,l=e.touches[0].clientY,a.dirty=!0}else if(e.touches.length===2){const u=e.touches[1].clientX-e.touches[0].clientX,c=e.touches[1].clientY-e.touches[0].clientY,w=Math.sqrt(u*u+c*c);if(m>0){const y=m/w;n.distance*=y,n.distance=Math.max(1,Math.min(50,n.distance)),a.dirty=!0}m=w}}),r.on("touchend",e=>{o=!1,m=0}),{cameraState:n,getProjectionViewMatrix:d,svg:r,isDragging:o,lastX:p,lastY:l,onMouseMove:b,onMouseUp:h,lastTouchDist:m}},inputs:["d3","stack","renderState"],outputs:["cameraState","getProjectionViewMatrix","svg","isDragging","lastX","lastY","onMouseMove","onMouseUp","lastTouchDist"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:async(i,t,a,n,d)=>{const{createGPULines:r}=await z(()=>import("./webgpu-lines-BjFyL3na.js"),[]).then(e=>{if(!("createGPULines"in e))throw new SyntaxError("export 'createGPULines' not found");return e}),o=`
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
`,p=`
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
`,l=r(i,{format:t,depthFormat:"depth24plus",join:"bevel",cap:"round",capResolution:4,vertexShaderBody:o,fragmentShaderBody:p}),b=i.createBuffer({label:"proj-view-matrix",size:64,usage:a.UNIFORM|a.COPY_DST}),h=i.createBuffer({label:"line-uniforms",size:16,usage:a.UNIFORM|a.COPY_DST}),m=i.createBindGroup({layout:l.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:n}},{binding:1,resource:{buffer:b}},{binding:2,resource:{buffer:h}}]});return d.then(()=>{l.destroy(),b.destroy(),h.destroy()}),{createGPULines:r,vertexShaderBody:o,fragmentShaderBody:p,gpuLines:l,projViewBuffer:b,lineUniformBuffer:h,lineBindGroup:m}},inputs:["device","canvasFormat","GPUBufferUsage","stateBuffer","invalidation"],outputs:["createGPULines","vertexShaderBody","fragmentShaderBody","gpuLines","projViewBuffer","lineUniformBuffer","lineBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:async(i,t,a,n,d,r,o,p,l,b,h,m,e,u,c,w,y,I,f,C)=>{const{createFrameLoop:B}=await z(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(S=>{if(!("createFrameLoop"in S))throw new SyntaxError("export 'createFrameLoop' not found");return S}),P=B(()=>{if(t){const S=n.currentColumn,v=(n.currentColumn+1)%d,s=new ArrayBuffer(32),E=new Float32Array(s),x=new Uint32Array(s);E[0]=a,E[1]=n.t,x[2]=S,x[3]=v,x[4]=d,x[5]=r,o.queue.writeBuffer(p,0,s);const g=o.createCommandEncoder(),_=g.beginComputePass();_.setPipeline(l),_.setBindGroup(0,b),_.dispatchWorkgroups(Math.ceil(r/64)),_.end(),o.queue.submit([g.finish()]),n.t+=a,n.currentColumn=v,h.dirty=!0}if(h.dirty){const S=m.width/m.height,v=e(S);o.queue.writeBuffer(u,0,v);const s=new ArrayBuffer(16),E=new Uint32Array(s);E[0]=(n.currentColumn+1)%d,E[1]=d,E[2]=r,o.queue.writeBuffer(c,0,s);const x=o.createCommandEncoder(),g=x.beginRenderPass({colorAttachments:[{view:w.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:1,g:1,b:1,a:1}}],depthStencilAttachment:{view:h.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}}),_=r*(d+1);y.draw(g,{vertexCount:_,width:i*I,resolution:[m.width,m.height]},[f]),g.end(),o.queue.submit([x.finish()]),t||(h.dirty=!1)}});return C.then(()=>P.cancel()),{createFrameLoop:B,loop:P}},inputs:["lineWidth","simulate","dt","simState","stepCount","particleCount","device","integrateUniformBuffer","integratePipeline","integrateBindGroup","renderState","canvas","getProjectionViewMatrix","projViewBuffer","lineUniformBuffer","gpuContext","gpuLines","dpr","lineBindGroup","invalidation"],outputs:["createFrameLoop","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});M({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:(i,t)=>{t()},inputs:["restart","initializeState"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
