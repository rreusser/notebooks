import{d as w,_ as R}from"./index-ByB2dbry.js";w({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(i,e,o)=>{if(!navigator.gpu)throw i(e`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const a=await navigator.gpu.requestAdapter();if(!a)throw new Error("Failed to get WebGPU adapter");const r=await a.requestDevice(),t=navigator.gpu.getPreferredCanvasFormat();return o.then(()=>r.destroy()),{adapter:a,device:r,canvasFormat:t}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(i,e,o,a,r,t,s)=>{const[{createElementStack:b},{expandable:c}]=await Promise.all([R(()=>import("./element-stack-BU40TvN2.js"),[]).then(u=>{if(!("createElementStack"in u))throw new SyntaxError("export 'createElementStack' not found");return u}),R(()=>import("./expandable-goukRGI0.js"),[]).then(u=>{if(!("expandable"in u))throw new SyntaxError("export 'expandable' not found");return u})]),p=window.devicePixelRatio||1,l=Math.min(800,i),f=Math.max(400,l*.6),v=b({width:l,height:f,layers:[{id:"canvas",element:({current:u,width:y,height:_})=>{const x=u||document.createElement("canvas");return x.id="attractor-canvas",x.width=Math.floor(y*p),x.height=Math.floor(_*p),x.style.width=`${y}px`,x.style.height=`${_}px`,x}},{id:"svg",element:({current:u,width:y,height:_})=>(u?e.select(u):e.create("svg")).attr("width",y).attr("height",_).style("cursor","grab").node()}]}),m=v.elements.canvas,g=m.getContext("webgpu");g.configure({device:o,format:a,alphaMode:"premultiplied"});const n=o.createTexture({label:"depth-texture",size:[m.width,m.height],format:"depth24plus",usage:r.RENDER_ATTACHMENT}),d={dirty:!0,depthTexture:n},h=t`<figure style="margin: 0;" id="main-figure">
  ${v.element}
</figure>`;return s(c(h,{width:l,height:f,controls:".attractor-controls",onResize(u,y,_){v.resize(y,_),m.width=Math.floor(y*p),m.height=Math.floor(_*p),d.depthTexture.destroy(),d.depthTexture=o.createTexture({label:"depth-texture",size:[m.width,m.height],format:"depth24plus",usage:r.RENDER_ATTACHMENT}),d.dirty=!0,v.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:b,expandable:c,dpr:p,canvasWidth:l,canvasHeight:f,stack:v,canvas:m,gpuContext:g,depthTexture:n,renderState:d,figure:h}},inputs:["width","d3","device","canvasFormat","GPUTextureUsage","html","display"],outputs:["createElementStack","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","depthTexture","renderState","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(i,e,o,a)=>{const r=i`<div class="attractor-controls"></div>`;function t(u){return r.appendChild(u),e.input(u)}const s=o.button("Restart"),b=t(s),c=o.toggle({label:"Simulate",value:!0}),p=t(c),l=o.range([1,4096],{value:200,label:"Particle count",step:1}),f=t(l),v=o.range([1,1024],{label:"Track length",value:50,transform:Math.log,step:1}),m=t(v),g=o.range([.001,.1],{value:.02,label:"Time step"}),n=t(g),d=o.range([1,20],{value:5,label:"Line width",step:.5}),h=t(d);return a(r),{controlsContainer:r,ctrl:t,restartInput:s,restart:b,simulateInput:c,simulate:p,particleCountInput:l,particleCount:f,stepCountInput:v,stepCount:m,dtInput:g,dt:n,lineWidthInput:d,lineWidth:h}},inputs:["html","Generators","Inputs","display"],outputs:["controlsContainer","ctrl","restartInput","restart","simulateInput","simulate","particleCountInput","particleCount","stepCountInput","stepCount","dtInput","dt","lineWidthInput","lineWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(i,e)=>i`### The Attractor

A strange attractor is a set of states toward which a dynamical system evolves over time. The [Lorenz System](https://en.wikipedia.org/wiki/Lorenz_system) is the canonical example. The particular attractor we're simulating here is the *Bouali Attractor*, described by Safieddine Bouali in [A 3D Strange Attractor with a Distinctive Silhouette. The Butterfly Effect Revisited](https://arxiv.org/abs/1311.6128). It is defined by the system of ordinary differential equations:

${e.block`\begin{aligned}
\frac{dx}{dt} &= \alpha x(1 - y) - \beta z \\[0.5em]
\frac{dy}{dt} &= -\gamma y(1 - x^2) \\[0.5em]
\frac{dz}{dt} &= \mu x
\end{aligned}`}

with parameters ${e`\alpha = 3`}, ${e`\beta = 2.2`}, ${e`\gamma = 1`}, ${e`\mu = 1.51`}. These equations exhibit chaotic behavior; nearby trajectories diverge exponentially but remain bounded within the attractor's basin.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});w({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:async()=>{const{createGPULines:i}=await R(()=>import("https://cdn.jsdelivr.net/npm/webgpu-instanced-lines/+esm"),[]).then(e=>{if(!("createGPULines"in e))throw new SyntaxError("export 'createGPULines' not found");return e});return{createGPULines:i}},inputs:[],outputs:["createGPULines"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(i,e)=>i`## State Layout

The state of our ordinary differential equation (ODE) is represented by the three-component vector ${e`(x, y, z)`}. We store these in a flat storage buffer as \`vec3f\` elements. The ${e`j^{th}`} time step of the ${e`i^{th}`} particle is represented by the vector:

${e.block`\mathbf{p}_j^{(i)} = (x_j^{(i)}, y_j^{(i)}, z_j^{(i)})`}

We use **particle-major ordering**: all time steps for particle 0 come first, then all time steps for particle 1, and so on. The buffer index for a given particle and step is \`particle * stepCount + step\`.

As we step the ODE, we compute one new history point for each particle track. To avoid shifting the entire history on every iteration, we treat each particle's slice as a **ring buffer**. At each time step ${e`j`}, we use the previous position, ${e`p_{j-1}^{(i)}`}, to compute the next, ${e`p_j^{(i)}`}. When we reach the end of the slice, we loop back to the start, overwriting the oldest time step with the newest.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});w({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(i,e,o,a,r,t)=>{const s=a.createBuffer({label:"state-buffer",size:i*e*16,usage:r.STORAGE|r.COPY_DST}),b={currentStep:0,t:0};return t.then(()=>{s.destroy()}),{stateBuffer:s,simState:b}},inputs:["particleCount","stepCount","restart","device","GPUBufferUsage","invalidation"],outputs:["stateBuffer","simState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(i,e,o,a,r,t,s,b)=>{const c=`
@group(0) @binding(0) var<storage, read_write> state: array<vec4f>;

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

  // Initialize all steps for this particle with the same position
  let pos = uniforms.origin + uniforms.scale * sphericalRandom(f32(particle) + 0.5);
  for (var step = 0u; step < uniforms.stepCount; step++) {
// Buffer index: particle * stepCount + step
let idx = particle * uniforms.stepCount + step;
state[idx] = vec4f(pos, 1.0);
  }
}
`,p=i.createShaderModule({label:"init-shader",code:c}),l=i.createComputePipeline({label:"init-pipeline",layout:"auto",compute:{module:p,entryPoint:"main"}}),f=i.createBuffer({label:"init-uniforms",size:32,usage:e.UNIFORM|e.COPY_DST}),v=i.createBindGroup({label:"init-bind-group",layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}},{binding:1,resource:{buffer:f}}]});function m(){const g=new ArrayBuffer(32),n=new Float32Array(g),d=new Uint32Array(g);n[0]=0,n[1]=1,n[2]=0,n[3]=1,d[4]=a,d[5]=r,i.queue.writeBuffer(f,0,g);const h=i.createCommandEncoder(),u=h.beginComputePass();u.setPipeline(l),u.setBindGroup(0,v),u.dispatchWorkgroups(Math.ceil(r/64)),u.end(),i.queue.submit([h.finish()]),t.currentStep=0,t.t=0,s.dirty=!0}return m(),b.then(()=>{f.destroy()}),{initShaderCode:c,initShaderModule:p,initPipeline:l,initUniformBuffer:f,initBindGroup:v,initializeState:m}},inputs:["device","GPUBufferUsage","stateBuffer","stepCount","particleCount","simState","renderState","invalidation"],outputs:["initShaderCode","initShaderModule","initPipeline","initUniformBuffer","initBindGroup","initializeState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:()=>({attractorWGSL:`
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
`}),inputs:[],outputs:["attractorWGSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:(i,e,o,a,r)=>{const t=`
@group(0) @binding(0) var<storage, read_write> state: array<vec4f>;

struct Uniforms {
  dt: f32,
  t: f32,
  srcStep: u32,
  dstStep: u32,
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

  // Read current state from source step
  let srcIdx = particle * uniforms.stepCount + uniforms.srcStep;
  let p = state[srcIdx].xyz;

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

  // Write to destination step
  let dstIdx = particle * uniforms.stepCount + uniforms.dstStep;
  state[dstIdx] = vec4f(newP, 1.0);
}
`,s=e.createShaderModule({label:"integrate-shader",code:t}),b=e.createComputePipeline({label:"integrate-pipeline",layout:"auto",compute:{module:s,entryPoint:"main"}}),c=e.createBuffer({label:"integrate-uniforms",size:32,usage:o.UNIFORM|o.COPY_DST}),p=e.createBindGroup({label:"integrate-bind-group",layout:b.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:c}}]});return r.then(()=>{c.destroy()}),{integrateShaderCode:t,integrateShaderModule:s,integratePipeline:b,integrateUniformBuffer:c,integrateBindGroup:p}},inputs:["attractorWGSL","device","GPUBufferUsage","stateBuffer","invalidation"],outputs:["integrateShaderCode","integrateShaderModule","integratePipeline","integrateUniformBuffer","integrateBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(i,e,o,a,r,t)=>{const s=i(e,{colorTargets:[{format:o}],depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},join:"bevel",cap:"square",vertexShaderBody:a,fragmentShaderBody:r});return t.then(()=>s.destroy()),{gpuLines:s}},inputs:["createGPULines","device","canvasFormat","vertexShaderBody","fragmentShaderBody","invalidation"],outputs:["gpuLines"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:(i,e,o)=>{const a={phi:.8,theta:.3,distance:7,center:[0,2,0],fov:Math.PI/4,near:.01,far:100},r=new Float32Array(16),t=new Float32Array(16),s=new Float32Array(16);function b(n){const{phi:d,theta:h,distance:u,center:y,fov:_,near:x,far:k}=a,U=y[0]+u*Math.cos(h)*Math.cos(d),T=y[1]+u*Math.sin(h),L=y[2]+u*Math.cos(h)*Math.sin(d),z=U,A=T,M=L;let C=y[0]-U,S=y[1]-T,B=y[2]-L;const I=Math.sqrt(C*C+S*S+B*B);C/=I,S/=I,B/=I;let P=S*0-B*1,E=B*0-C*0,D=C*1-S*0;const F=Math.sqrt(P*P+E*E+D*D);P/=F,E/=F,D/=F;const W=E*B-D*S,q=D*C-P*B,O=P*S-E*C;r[0]=P,r[1]=W,r[2]=-C,r[3]=0,r[4]=E,r[5]=q,r[6]=-S,r[7]=0,r[8]=D,r[9]=O,r[10]=-B,r[11]=0,r[12]=-(P*z+E*A+D*M),r[13]=-(W*z+q*A+O*M),r[14]=C*z+S*A+B*M,r[15]=1;const Y=1/Math.tan(_/2),$=1/(x-k);t[0]=Y/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=Y,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(x+k)*$,t[11]=-1,t[12]=0,t[13]=0,t[14]=x*k*$*2,t[15]=0;for(let j=0;j<4;j++)for(let G=0;G<4;G++){let X=0;for(let V=0;V<4;V++)X+=t[j+V*4]*r[V+G*4];s[j+G*4]=X}return s}const c=i.select(e.elements.svg);let p=!1,l=0,f=0;function v(n){if(!p)return;const d=n.clientX-l,h=n.clientY-f;a.phi+=d*.01,a.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a.theta+h*.01)),l=n.clientX,f=n.clientY,o.dirty=!0}function m(){p&&(p=!1,c.style("cursor","grab"),window.removeEventListener("mousemove",v),window.removeEventListener("mouseup",m))}c.on("mousedown",n=>{n.preventDefault(),p=!0,l=n.clientX,f=n.clientY,c.style("cursor","grabbing"),window.addEventListener("mousemove",v),window.addEventListener("mouseup",m)}),c.on("wheel",n=>{n.preventDefault(),a.distance*=1+n.deltaY*.001,a.distance=Math.max(1,Math.min(50,a.distance)),o.dirty=!0});let g=0;return c.on("touchstart",n=>{if(n.preventDefault(),n.touches.length===1)p=!0,l=n.touches[0].clientX,f=n.touches[0].clientY;else if(n.touches.length===2){const d=n.touches[1].clientX-n.touches[0].clientX,h=n.touches[1].clientY-n.touches[0].clientY;g=Math.sqrt(d*d+h*h)}}),c.on("touchmove",n=>{if(n.preventDefault(),n.touches.length===1&&p){const d=n.touches[0].clientX-l,h=n.touches[0].clientY-f;a.phi+=d*.01,a.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a.theta+h*.01)),l=n.touches[0].clientX,f=n.touches[0].clientY,o.dirty=!0}else if(n.touches.length===2){const d=n.touches[1].clientX-n.touches[0].clientX,h=n.touches[1].clientY-n.touches[0].clientY,u=Math.sqrt(d*d+h*h);if(g>0){const y=g/u;a.distance*=y,a.distance=Math.max(1,Math.min(50,a.distance)),o.dirty=!0}g=u}}),c.on("touchend",n=>{p=!1,g=0}),{cameraState:a,_view:r,_proj:t,_projView:s,getProjectionViewMatrix:b,svg:c,isDragging:p,lastX:l,lastY:f,onMouseMove:v,onMouseUp:m,lastTouchDist:g}},inputs:["d3","stack","renderState"],outputs:["cameraState","_view","_proj","_projView","getProjectionViewMatrix","svg","isDragging","lastX","lastY","onMouseMove","onMouseUp","lastTouchDist"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:()=>({vertexShaderBody:`
@group(1) @binding(0) var<storage, read> state: array<vec4f>;
@group(1) @binding(1) var<uniform> projViewMatrix: mat4x4f;

struct LineUniforms {
  stepOffset: u32,  // Ring buffer offset
  stepCount: u32,
  particleCount: u32,
  width: f32,
}
@group(1) @binding(2) var<uniform> lineUniforms: LineUniforms;

struct Vertex {
  position: vec4f,
  width: f32,
  t: f32,
  velocity: f32,
}

// Bouali attractor derivative for velocity computation
fn attractorDerivative(pos: vec3f) -> vec3f {
  let alpha = 3.0;
  let beta = 2.2;
  let gamma = 1.0;
  let mu = 1.51;
  return vec3f(
alpha * pos.x * (1.0 - pos.y) - beta * pos.z,
-gamma * pos.y * (1.0 - pos.x * pos.x),
mu * pos.x
  );
}

fn getVertex(index: u32) -> Vertex {
  // Decode buffer index from vertex index
  let pointsPerParticle = lineUniforms.stepCount + 1u; // +1 for line break
  let particle = index / pointsPerParticle;
  let step = index % pointsPerParticle;

  // Check if this is a line break point
  if (step >= lineUniforms.stepCount) {
return Vertex(vec4f(0), 0.0, 0.0, 0.0);
  }

  // Compute buffer index with ring buffer offset (modular arithmetic for wrap-around)
  let bufferStep = (step + lineUniforms.stepOffset) % lineUniforms.stepCount;
  let bufferIdx = particle * lineUniforms.stepCount + bufferStep;

  // Load position from state buffer
  let pos = state[bufferIdx].xyz;

  // Compute velocity from attractor derivative
  let speed = length(attractorDerivative(pos));
  let normalizedVelocity = clamp(speed / 10.0, 0.0, 1.0);

  // Progress along the track (0 = oldest, 1 = newest)
  let t = f32(step) / f32(lineUniforms.stepCount - 1u);

  // Project to clip space
  let projected = projViewMatrix * vec4f(pos, 1.0);

  // Line width tapers from thin (old) to thick (new)
  let lineWidth = lineUniforms.width * (0.3 + 0.7 * t);

  return Vertex(projected, lineWidth, t, normalizedVelocity);
}
`,fragmentShaderBody:`
// Rainbow color palette from webgpu-instanced-lines lorenz example
fn rainbow(p: vec2f) -> vec3f {
  let theta = p.x * 6.283185;
  let c = cos(theta);
  let s = sin(theta);
  let m1 = mat3x3f(
0.5230851,  0.56637411, 0.46725319,
0.12769652, 0.14082407, 0.13691271,
   -0.25934743,-0.12121582, 0.2348705
  );
  let m2 = mat3x3f(
0.3555664, -0.11472876,-0.01250831,
0.15243126,-0.03668075, 0.0765231,
   -0.00192128,-0.01350681,-0.0036526
  );
  return m1 * vec3f(1.0, p.y * 2.0 - 1.0, s) +
     m2 * vec3f(c, s * c, c * c - s * s);
}

fn getColor(lineCoord: vec2f, t: f32, velocity: f32) -> vec4f {
  // Discard fragments outside the line
  if (length(lineCoord) > 1.0) {
discard;
  }

  // Rainbow color based on velocity, with saturation from track progress
  let fillColor = rainbow(vec2f(velocity, t));

  // Dark border effect
  let width = 10.0;
  let borderWidth = 1.0;
  let sdf = length(lineCoord) * width * 0.5;
  let borderStart = width * 0.5 - borderWidth;
  let borderMask = smoothstep(borderStart - 0.5, borderStart + 0.5, sdf);
  let color = mix(fillColor, vec3f(0.0), borderMask);

  return vec4f(color, 1.0);
}
`}),inputs:[],outputs:["vertexShaderBody","fragmentShaderBody"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:(i,e,o,a,r)=>{const t=i.createBuffer({label:"proj-view-matrix",size:64,usage:e.UNIFORM|e.COPY_DST}),s=i.createBuffer({label:"line-uniforms",size:16,usage:e.UNIFORM|e.COPY_DST}),b=i.createBindGroup({layout:o.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:t}},{binding:2,resource:{buffer:s}}]});return r.then(()=>{t.destroy(),s.destroy()}),{projViewBuffer:t,lineUniformBuffer:s,lineBindGroup:b}},inputs:["device","GPUBufferUsage","gpuLines","stateBuffer","invalidation"],outputs:["projViewBuffer","lineUniformBuffer","lineBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:(i,e,o)=>{i(e`<pre><code class="language-wgsl">${o}</code></pre>`)},inputs:["display","html","vertexShaderBody"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:async(i,e,o,a,r,t,s,b,c,p,l,f,v,m,g,n,d,h,u,y)=>{const{createFrameLoop:_}=await R(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(M=>{if(!("createFrameLoop"in M))throw new SyntaxError("export 'createFrameLoop' not found");return M}),x=new ArrayBuffer(32),k=new Float32Array(x),U=new Uint32Array(x),T=new ArrayBuffer(16),L=new Uint32Array(T),z=new Float32Array(T),A=_(()=>{const M=a.createCommandEncoder();let C=!1;if(e){const S=r.currentStep,B=(r.currentStep+1)%t;k[0]=o,k[1]=r.t,U[2]=S,U[3]=B,U[4]=t,U[5]=s,a.queue.writeBuffer(b,0,x);const I=M.beginComputePass();I.setPipeline(c),I.setBindGroup(0,p),I.dispatchWorkgroups(Math.ceil(s/64)),I.end(),r.t+=o,r.currentStep=B,l.dirty=!0,C=!0}if(l.dirty){const S=f.width/f.height,B=v(S);a.queue.writeBuffer(m,0,B),L[0]=(r.currentStep+1)%t,L[1]=t,L[2]=s,z[3]=i*g,a.queue.writeBuffer(n,0,T);const P={vertexCount:s*(t+1),width:i*g,resolution:[f.width,f.height]};d.updateUniforms(P);const E=M.beginRenderPass({colorAttachments:[{view:h.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:1,g:1,b:1,a:1}}],depthStencilAttachment:{view:l.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});d.draw(E,{...P,skipUniformUpdate:!0},[u]),E.end(),C=!0,e||(l.dirty=!1)}C&&a.queue.submit([M.finish()])});return y.then(()=>A.cancel()),{createFrameLoop:_,_integrateData:x,_integrateF32:k,_integrateU32:U,_lineData:T,_lineU32:L,_lineF32:z,loop:A}},inputs:["lineWidth","simulate","dt","device","simState","stepCount","particleCount","integrateUniformBuffer","integratePipeline","integrateBindGroup","renderState","canvas","getProjectionViewMatrix","projViewBuffer","dpr","lineUniformBuffer","gpuLines","gpuContext","lineBindGroup","invalidation"],outputs:["createFrameLoop","_integrateData","_integrateF32","_integrateU32","_lineData","_lineU32","_lineF32","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-25"),expanded:[],variables:[]},{id:25,body:(i,e)=>{e()},inputs:["restart","initializeState"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
