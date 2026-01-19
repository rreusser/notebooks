import{d as w,_ as R}from"./index-ByB2dbry.js";w({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(a,n,o)=>{if(!navigator.gpu)throw a(n`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const i=await navigator.gpu.requestAdapter();if(!i)throw new Error("Failed to get WebGPU adapter");const r=await i.requestDevice(),e=navigator.gpu.getPreferredCanvasFormat();return o.then(()=>r.destroy()),{adapter:i,device:r,canvasFormat:e}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(a,n,o,i,r,e,s)=>{const[{createElementStack:m},{expandable:c}]=await Promise.all([R(()=>import("./element-stack-BU40TvN2.js"),[]).then(u=>{if(!("createElementStack"in u))throw new SyntaxError("export 'createElementStack' not found");return u}),R(()=>import("./expandable-goukRGI0.js"),[]).then(u=>{if(!("expandable"in u))throw new SyntaxError("export 'expandable' not found");return u})]),p=window.devicePixelRatio||1,l=Math.min(800,a),f=Math.max(400,l*.6),v=m({width:l,height:f,layers:[{id:"canvas",element:({current:u,width:b,height:_})=>{const x=u||document.createElement("canvas");return x.id="attractor-canvas",x.width=Math.floor(b*p),x.height=Math.floor(_*p),x.style.width=`${b}px`,x.style.height=`${_}px`,x}},{id:"svg",element:({current:u,width:b,height:_})=>(u?n.select(u):n.create("svg")).attr("width",b).attr("height",_).style("cursor","grab").node()}]}),g=v.elements.canvas,y=g.getContext("webgpu");y.configure({device:o,format:i,alphaMode:"premultiplied"});const t=o.createTexture({label:"depth-texture",size:[g.width,g.height],format:"depth24plus",usage:r.RENDER_ATTACHMENT}),d={dirty:!0,depthTexture:t},h=e`<figure style="margin: 0;" id="main-figure">
  ${v.element}
</figure>`;return s(c(h,{width:l,height:f,controls:".attractor-controls",onResize(u,b,_){v.resize(b,_),g.width=Math.floor(b*p),g.height=Math.floor(_*p),d.depthTexture.destroy(),d.depthTexture=o.createTexture({label:"depth-texture",size:[g.width,g.height],format:"depth24plus",usage:r.RENDER_ATTACHMENT}),d.dirty=!0,v.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:m,expandable:c,dpr:p,canvasWidth:l,canvasHeight:f,stack:v,canvas:g,gpuContext:y,depthTexture:t,renderState:d,figure:h}},inputs:["width","d3","device","canvasFormat","GPUTextureUsage","html","display"],outputs:["createElementStack","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","depthTexture","renderState","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(a,n,o,i)=>{const r=a`<div class="attractor-controls"></div>`;function e(u){return r.appendChild(u),n.input(u)}const s=o.button("Restart"),m=e(s),c=o.toggle({label:"Simulate",value:!0}),p=e(c),l=o.range([1,4096],{value:200,label:"Particle count",step:1}),f=e(l),v=o.range([1,1024],{label:"Track length",value:50,transform:Math.log,step:1}),g=e(v),y=o.range([.001,.1],{value:.02,label:"Time step"}),t=e(y),d=o.range([1,20],{value:5,label:"Line width",step:.5}),h=e(d);return i(r),{controlsContainer:r,ctrl:e,restartInput:s,restart:m,simulateInput:c,simulate:p,particleCountInput:l,particleCount:f,stepCountInput:v,stepCount:g,dtInput:y,dt:t,lineWidthInput:d,lineWidth:h}},inputs:["html","Generators","Inputs","display"],outputs:["controlsContainer","ctrl","restartInput","restart","simulateInput","simulate","particleCountInput","particleCount","stepCountInput","stepCount","dtInput","dt","lineWidthInput","lineWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(a,n)=>a`### The Attractor

A strange attractor is a set of states toward which a dynamical system evolves over time. The [Lorenz System](https://en.wikipedia.org/wiki/Lorenz_system) is the canonical example. The particular attractor we're simulating here is the *Bouali Attractor*, described by Safieddine Bouali in [A 3D Strange Attractor with a Distinctive Silhouette. The Butterfly Effect Revisited](https://arxiv.org/abs/1311.6128). It is defined by the system of ordinary differential equations:

${n.block`\begin{aligned}
\frac{dx}{dt} &= \alpha x(1 - y) - \beta z \\[0.5em]
\frac{dy}{dt} &= -\gamma y(1 - x^2) \\[0.5em]
\frac{dz}{dt} &= \mu x
\end{aligned}`}

with parameters ${n`\alpha = 3`}, ${n`\beta = 2.2`}, ${n`\gamma = 1`}, ${n`\mu = 1.51`}. These equations exhibit chaotic behavior; nearby trajectories diverge exponentially but remain bounded within the attractor's basin.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});w({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(a,n)=>a`## State Layout

The state of our ordinary differential equation (ODE) is represented by the three-component vector ${n`(x, y, z)`}. We store these in a flat storage buffer as \`vec3f\` elements. The ${n`j^{th}`} time step of the ${n`i^{th}`} particle is represented by the vector:

${n.block`\mathbf{p}_j^{(i)} = (x_j^{(i)}, y_j^{(i)}, z_j^{(i)})`}

We use **particle-major ordering**: all time steps for particle 0 come first, then all time steps for particle 1, and so on. The buffer index for a given particle and step is \`particle * stepCount + step\`.

As we step the ODE, we compute one new history point for each particle track. To avoid shifting the entire history on every iteration, we treat each particle's slice as a **ring buffer**. At each time step ${n`j`}, we use the previous position, ${n`p_{j-1}^{(i)}`}, to compute the next, ${n`p_j^{(i)}`}. When we reach the end of the slice, we loop back to the start, overwriting the oldest time step with the newest.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});w({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(a,n,o,i,r,e)=>{const s=i.createBuffer({label:"state-buffer",size:a*n*16,usage:r.STORAGE|r.COPY_DST}),m={currentStep:0,t:0};return e.then(()=>{s.destroy()}),{stateBuffer:s,simState:m}},inputs:["particleCount","stepCount","restart","device","GPUBufferUsage","invalidation"],outputs:["stateBuffer","simState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(a,n,o,i,r,e,s,m)=>{const c=`
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
`,p=a.createShaderModule({label:"init-shader",code:c}),l=a.createComputePipeline({label:"init-pipeline",layout:"auto",compute:{module:p,entryPoint:"main"}}),f=a.createBuffer({label:"init-uniforms",size:32,usage:n.UNIFORM|n.COPY_DST}),v=a.createBindGroup({label:"init-bind-group",layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}},{binding:1,resource:{buffer:f}}]});function g(){const y=new ArrayBuffer(32),t=new Float32Array(y),d=new Uint32Array(y);t[0]=0,t[1]=1,t[2]=0,t[3]=1,d[4]=i,d[5]=r,a.queue.writeBuffer(f,0,y);const h=a.createCommandEncoder(),u=h.beginComputePass();u.setPipeline(l),u.setBindGroup(0,v),u.dispatchWorkgroups(Math.ceil(r/64)),u.end(),a.queue.submit([h.finish()]),e.currentStep=0,e.t=0,s.dirty=!0}return g(),m.then(()=>{f.destroy()}),{initShaderCode:c,initShaderModule:p,initPipeline:l,initUniformBuffer:f,initBindGroup:v,initializeState:g}},inputs:["device","GPUBufferUsage","stateBuffer","stepCount","particleCount","simState","renderState","invalidation"],outputs:["initShaderCode","initShaderModule","initPipeline","initUniformBuffer","initBindGroup","initializeState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:()=>({attractorWGSL:`
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
`}),inputs:[],outputs:["attractorWGSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(a,n,o,i,r)=>{const e=`
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

${a}

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
`,s=n.createShaderModule({label:"integrate-shader",code:e}),m=n.createComputePipeline({label:"integrate-pipeline",layout:"auto",compute:{module:s,entryPoint:"main"}}),c=n.createBuffer({label:"integrate-uniforms",size:32,usage:o.UNIFORM|o.COPY_DST}),p=n.createBindGroup({label:"integrate-bind-group",layout:m.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:i}},{binding:1,resource:{buffer:c}}]});return r.then(()=>{c.destroy()}),{integrateShaderCode:e,integrateShaderModule:s,integratePipeline:m,integrateUniformBuffer:c,integrateBindGroup:p}},inputs:["attractorWGSL","device","GPUBufferUsage","stateBuffer","invalidation"],outputs:["integrateShaderCode","integrateShaderModule","integratePipeline","integrateUniformBuffer","integrateBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:async(a,n,o,i,r)=>{const{createGPULines:e}=await R(()=>import("https://cdn.jsdelivr.net/npm/webgpu-instanced-lines/+esm"),[]).then(m=>{if(!("createGPULines"in m))throw new SyntaxError("export 'createGPULines' not found");return m}),s=e(a,{colorTargets:[{format:n}],depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},join:"bevel",cap:"square",vertexShaderBody:o,fragmentShaderBody:i});return r.then(()=>s.destroy()),{createGPULines:e,gpuLines:s}},inputs:["device","canvasFormat","vertexShaderBody","fragmentShaderBody","invalidation"],outputs:["createGPULines","gpuLines"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(a,n,o)=>{const i={phi:.8,theta:.3,distance:7,center:[0,2,0],fov:Math.PI/4,near:.01,far:100},r=new Float32Array(16),e=new Float32Array(16),s=new Float32Array(16);function m(t){const{phi:d,theta:h,distance:u,center:b,fov:_,near:x,far:k}=i,U=b[0]+u*Math.cos(h)*Math.cos(d),T=b[1]+u*Math.sin(h),D=b[2]+u*Math.cos(h)*Math.sin(d),z=U,A=T,M=D;let S=b[0]-U,C=b[1]-T,B=b[2]-D;const I=Math.sqrt(S*S+C*C+B*B);S/=I,C/=I,B/=I;let P=C*0-B*1,E=B*0-S*0,L=S*1-C*0;const F=Math.sqrt(P*P+E*E+L*L);P/=F,E/=F,L/=F;const W=E*B-L*C,q=L*S-P*B,O=P*C-E*S;r[0]=P,r[1]=W,r[2]=-S,r[3]=0,r[4]=E,r[5]=q,r[6]=-C,r[7]=0,r[8]=L,r[9]=O,r[10]=-B,r[11]=0,r[12]=-(P*z+E*A+L*M),r[13]=-(W*z+q*A+O*M),r[14]=S*z+C*A+B*M,r[15]=1;const Y=1/Math.tan(_/2),$=1/(x-k);e[0]=Y/t,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=Y,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=(x+k)*$,e[11]=-1,e[12]=0,e[13]=0,e[14]=x*k*$*2,e[15]=0;for(let j=0;j<4;j++)for(let V=0;V<4;V++){let X=0;for(let G=0;G<4;G++)X+=e[j+G*4]*r[G+V*4];s[j+V*4]=X}return s}const c=a.select(n.elements.svg);let p=!1,l=0,f=0;function v(t){if(!p)return;const d=t.clientX-l,h=t.clientY-f;i.phi+=d*.01,i.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,i.theta+h*.01)),l=t.clientX,f=t.clientY,o.dirty=!0}function g(){p&&(p=!1,c.style("cursor","grab"),window.removeEventListener("mousemove",v),window.removeEventListener("mouseup",g))}c.on("mousedown",t=>{t.preventDefault(),p=!0,l=t.clientX,f=t.clientY,c.style("cursor","grabbing"),window.addEventListener("mousemove",v),window.addEventListener("mouseup",g)}),c.on("wheel",t=>{t.preventDefault(),i.distance*=1+t.deltaY*.001,i.distance=Math.max(1,Math.min(50,i.distance)),o.dirty=!0});let y=0;return c.on("touchstart",t=>{if(t.preventDefault(),t.touches.length===1)p=!0,l=t.touches[0].clientX,f=t.touches[0].clientY;else if(t.touches.length===2){const d=t.touches[1].clientX-t.touches[0].clientX,h=t.touches[1].clientY-t.touches[0].clientY;y=Math.sqrt(d*d+h*h)}}),c.on("touchmove",t=>{if(t.preventDefault(),t.touches.length===1&&p){const d=t.touches[0].clientX-l,h=t.touches[0].clientY-f;i.phi+=d*.01,i.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,i.theta+h*.01)),l=t.touches[0].clientX,f=t.touches[0].clientY,o.dirty=!0}else if(t.touches.length===2){const d=t.touches[1].clientX-t.touches[0].clientX,h=t.touches[1].clientY-t.touches[0].clientY,u=Math.sqrt(d*d+h*h);if(y>0){const b=y/u;i.distance*=b,i.distance=Math.max(1,Math.min(50,i.distance)),o.dirty=!0}y=u}}),c.on("touchend",t=>{p=!1,y=0}),{cameraState:i,_view:r,_proj:e,_projView:s,getProjectionViewMatrix:m,svg:c,isDragging:p,lastX:l,lastY:f,onMouseMove:v,onMouseUp:g,lastTouchDist:y}},inputs:["d3","stack","renderState"],outputs:["cameraState","_view","_proj","_projView","getProjectionViewMatrix","svg","isDragging","lastX","lastY","onMouseMove","onMouseUp","lastTouchDist"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:()=>({vertexShaderBody:`// vertexShaderBody:

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
`}),inputs:[],outputs:["vertexShaderBody","fragmentShaderBody"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(a,n,o,i,r)=>{const e=a.createBuffer({label:"proj-view-matrix",size:64,usage:n.UNIFORM|n.COPY_DST}),s=a.createBuffer({label:"line-uniforms",size:16,usage:n.UNIFORM|n.COPY_DST}),m=a.createBindGroup({layout:o.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:i}},{binding:1,resource:{buffer:e}},{binding:2,resource:{buffer:s}}]});return r.then(()=>{e.destroy(),s.destroy()}),{projViewBuffer:e,lineUniformBuffer:s,lineBindGroup:m}},inputs:["device","GPUBufferUsage","gpuLines","stateBuffer","invalidation"],outputs:["projViewBuffer","lineUniformBuffer","lineBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:(a,n,o)=>{a(n`<pre><code class="language-wgsl">${o}</code></pre>`)},inputs:["display","html","vertexShaderBody"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:async(a,n,o,i,r,e,s,m,c,p,l,f,v,g,y,t,d,h,u,b)=>{const{createFrameLoop:_}=await R(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(M=>{if(!("createFrameLoop"in M))throw new SyntaxError("export 'createFrameLoop' not found");return M}),x=new ArrayBuffer(32),k=new Float32Array(x),U=new Uint32Array(x),T=new ArrayBuffer(16),D=new Uint32Array(T),z=new Float32Array(T),A=_(()=>{const M=i.createCommandEncoder();let S=!1;if(n){const C=r.currentStep,B=(r.currentStep+1)%e;k[0]=o,k[1]=r.t,U[2]=C,U[3]=B,U[4]=e,U[5]=s,i.queue.writeBuffer(m,0,x);const I=M.beginComputePass();I.setPipeline(c),I.setBindGroup(0,p),I.dispatchWorkgroups(Math.ceil(s/64)),I.end(),r.t+=o,r.currentStep=B,l.dirty=!0,S=!0}if(l.dirty){const C=f.width/f.height,B=v(C);i.queue.writeBuffer(g,0,B),D[0]=(r.currentStep+1)%e,D[1]=e,D[2]=s,z[3]=a*y,i.queue.writeBuffer(t,0,T);const P={vertexCount:s*(e+1),width:a*y,resolution:[f.width,f.height]};d.updateUniforms(P);const E=M.beginRenderPass({colorAttachments:[{view:h.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:1,g:1,b:1,a:1}}],depthStencilAttachment:{view:l.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});d.draw(E,{...P,skipUniformUpdate:!0},[u]),E.end(),S=!0,n||(l.dirty=!1)}S&&i.queue.submit([M.finish()])});return b.then(()=>A.cancel()),{createFrameLoop:_,_integrateData:x,_integrateF32:k,_integrateU32:U,_lineData:T,_lineU32:D,_lineF32:z,loop:A}},inputs:["lineWidth","simulate","dt","device","simState","stepCount","particleCount","integrateUniformBuffer","integratePipeline","integrateBindGroup","renderState","canvas","getProjectionViewMatrix","projViewBuffer","dpr","lineUniformBuffer","gpuLines","gpuContext","lineBindGroup","invalidation"],outputs:["createFrameLoop","_integrateData","_integrateF32","_integrateU32","_lineData","_lineU32","_lineF32","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});w({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(a,n)=>{n()},inputs:["restart","initializeState"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
