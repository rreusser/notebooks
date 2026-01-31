import{d as x,_ as W}from"./index-ByB2dbry.js";x({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async i=>{const{createWebGPUContext:n}=await W(()=>import("./webgpu-canvas-C7AS78hn.js"),[]).then(t=>{if(!("createWebGPUContext"in t))throw new SyntaxError("export 'createWebGPUContext' not found");return t}),{device:o,canvasFormat:a}=await n();return i.then(()=>o.destroy()),{createWebGPUContext:n,device:o,canvasFormat:a}},inputs:["invalidation"],outputs:["createWebGPUContext","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(i,n,o,a,t,r,s)=>{const[{createElementStack:g},{expandable:u}]=await Promise.all([W(()=>import("./element-stack-BU40TvN2.js"),[]).then(v=>{if(!("createElementStack"in v))throw new SyntaxError("export 'createElementStack' not found");return v}),W(()=>import("./expandable-dZkDG0zz.js"),[]).then(v=>{if(!("expandable"in v))throw new SyntaxError("export 'expandable' not found");return v})]),p=window.devicePixelRatio||1,d=Math.min(800,i),f=Math.max(400,d*.6),y=g({width:d,height:f,layers:[{id:"canvas",element:({current:v,width:w,height:C})=>{const B=v||document.createElement("canvas");return B.id="attractor-canvas",B.width=Math.floor(w*p),B.height=Math.floor(C*p),B.style.width=`${w}px`,B.style.height=`${C}px`,B}},{id:"svg",element:({current:v,width:w,height:C})=>(v?n.select(v):n.create("svg")).attr("width",w).attr("height",C).style("cursor","grab").node()}]}),h=y.elements.canvas,b=h.getContext("webgpu");b.configure({device:o,format:a,alphaMode:"premultiplied"});const e=4,c=o.createTexture({label:"msaa-color-texture",size:[h.width,h.height],format:a,sampleCount:e,usage:t.RENDER_ATTACHMENT}),m=o.createTexture({label:"depth-texture",size:[h.width,h.height],format:"depth24plus",sampleCount:e,usage:t.RENDER_ATTACHMENT}),l={dirty:!0,depthTexture:m,msaaColorTexture:c,sampleCount:e},S=r`<figure style="margin: 0;" id="main-figure">
  ${y.element}
</figure>`;return s(u(S,{width:d,height:f,controls:".attractor-controls",onResize(v,w,C){y.resize(w,C),h.width=Math.floor(w*p),h.height=Math.floor(C*p),l.msaaColorTexture.destroy(),l.msaaColorTexture=o.createTexture({label:"msaa-color-texture",size:[h.width,h.height],format:a,sampleCount:l.sampleCount,usage:t.RENDER_ATTACHMENT}),l.depthTexture.destroy(),l.depthTexture=o.createTexture({label:"depth-texture",size:[h.width,h.height],format:"depth24plus",sampleCount:l.sampleCount,usage:t.RENDER_ATTACHMENT}),l.dirty=!0,y.dispatchEvent(new CustomEvent("update"))}})),{createElementStack:g,expandable:u,dpr:p,canvasWidth:d,canvasHeight:f,stack:y,canvas:h,gpuContext:b,sampleCount:e,msaaColorTexture:c,depthTexture:m,renderState:l,figure:S}},inputs:["width","d3","device","canvasFormat","GPUTextureUsage","html","display"],outputs:["createElementStack","expandable","dpr","canvasWidth","canvasHeight","stack","canvas","gpuContext","sampleCount","msaaColorTexture","depthTexture","renderState","figure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(i,n,o,a)=>{const t=i`<div class="attractor-controls"></div>`;function r(l){return t.appendChild(l),n.input(l)}const s=o.button("Restart"),g=r(s),u=o.toggle({label:"Simulate",value:!0}),p=r(u),d=o.range([1,4096],{value:200,label:"Particle count",step:1}),f=r(d),y=o.range([1,1024],{label:"Track length",value:50,transform:Math.log,step:1}),h=r(y),b=o.range([.001,.1],{value:.02,label:"Time step"}),e=r(b),c=o.range([1,20],{value:6,label:"Line width",step:.5}),m=r(c);return a(t),{controlsContainer:t,ctrl:r,restartInput:s,restart:g,simulateInput:u,simulate:p,particleCountInput:d,particleCount:f,stepCountInput:y,stepCount:h,dtInput:b,dt:e,lineWidthInput:c,lineWidth:m}},inputs:["html","Generators","Inputs","display"],outputs:["controlsContainer","ctrl","restartInput","restart","simulateInput","simulate","particleCountInput","particleCount","stepCountInput","stepCount","dtInput","dt","lineWidthInput","lineWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(i,n)=>i`### The Attractor

A strange attractor is a set of states toward which a dynamical system evolves over time. The [Lorenz System](https://en.wikipedia.org/wiki/Lorenz_system) is the canonical example. The particular attractor we're simulating here is the *Bouali Attractor*, described by Safieddine Bouali in [A 3D Strange Attractor with a Distinctive Silhouette. The Butterfly Effect Revisited](https://arxiv.org/abs/1311.6128). It is defined by the system of ordinary differential equations:

${n.block`\begin{aligned}
\frac{dx}{dt} &= \alpha x(1 - y) - \beta z \\[0.5em]
\frac{dy}{dt} &= -\gamma y(1 - x^2) \\[0.5em]
\frac{dz}{dt} &= \mu x
\end{aligned}`}

with parameters ${n`\alpha = 3`}, ${n`\beta = 2.2`}, ${n`\gamma = 1`}, ${n`\mu = 1.51`}. These equations exhibit chaotic behavior; nearby trajectories diverge exponentially but remain bounded within the attractor's basin.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});x({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(i,n)=>i`## State Layout

The state of our ordinary differential equation (ODE) is represented by the three-component vector ${n`(x, y, z)`}. We store these in a flat storage buffer as \`vec3f\` elements. The ${n`j^{th}`} time step of the ${n`i^{th}`} particle is represented by the vector:

${n.block`\mathbf{p}_j^{(i)} = (x_j^{(i)}, y_j^{(i)}, z_j^{(i)})`}

We use **particle-major ordering**: all time steps for particle 0 come first, then all time steps for particle 1, and so on. The buffer index for a given particle and step is \`particle * stepCount + step\`.

As we step the ODE, we compute one new history point for each particle track. To avoid shifting the entire history on every iteration, we treat each particle's slice as a **ring buffer**. At each time step ${n`j`}, we use the previous position, ${n`p_{j-1}^{(i)}`}, to compute the next, ${n`p_j^{(i)}`}. When we reach the end of the slice, we loop back to the start, overwriting the oldest time step with the newest.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});x({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(i,n,o,a,t,r)=>{const s=a.createBuffer({label:"state-buffer",size:i*n*16,usage:t.STORAGE|t.COPY_DST}),g={currentStep:0,t:0};return r.then(()=>{s.destroy()}),{stateBuffer:s,simState:g}},inputs:["particleCount","stepCount","restart","device","GPUBufferUsage","invalidation"],outputs:["stateBuffer","simState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(i,n,o,a,t,r,s,g)=>{const u=`
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
`,p=i.createShaderModule({label:"init-shader",code:u}),d=i.createComputePipeline({label:"init-pipeline",layout:"auto",compute:{module:p,entryPoint:"main"}}),f=i.createBuffer({label:"init-uniforms",size:32,usage:n.UNIFORM|n.COPY_DST}),y=i.createBindGroup({label:"init-bind-group",layout:d.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}},{binding:1,resource:{buffer:f}}]});function h(){const b=new ArrayBuffer(32),e=new Float32Array(b),c=new Uint32Array(b);e[0]=0,e[1]=1,e[2]=0,e[3]=1,c[4]=a,c[5]=t,i.queue.writeBuffer(f,0,b);const m=i.createCommandEncoder(),l=m.beginComputePass();l.setPipeline(d),l.setBindGroup(0,y),l.dispatchWorkgroups(Math.ceil(t/64)),l.end(),i.queue.submit([m.finish()]),r.currentStep=0,r.t=0,s.dirty=!0}return h(),g.then(()=>{f.destroy()}),{initShaderCode:u,initShaderModule:p,initPipeline:d,initUniformBuffer:f,initBindGroup:y,initializeState:h}},inputs:["device","GPUBufferUsage","stateBuffer","stepCount","particleCount","simState","renderState","invalidation"],outputs:["initShaderCode","initShaderModule","initPipeline","initUniformBuffer","initBindGroup","initializeState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:()=>({attractorWGSL:`
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
`}),inputs:[],outputs:["attractorWGSL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(i,n,o,a,t)=>{const r=`
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
`,s=n.createShaderModule({label:"integrate-shader",code:r}),g=n.createComputePipeline({label:"integrate-pipeline",layout:"auto",compute:{module:s,entryPoint:"main"}}),u=n.createBuffer({label:"integrate-uniforms",size:32,usage:o.UNIFORM|o.COPY_DST}),p=n.createBindGroup({label:"integrate-bind-group",layout:g.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:u}}]});return t.then(()=>{u.destroy()}),{integrateShaderCode:r,integrateShaderModule:s,integratePipeline:g,integrateUniformBuffer:u,integrateBindGroup:p}},inputs:["attractorWGSL","device","GPUBufferUsage","stateBuffer","invalidation"],outputs:["integrateShaderCode","integrateShaderModule","integratePipeline","integrateUniformBuffer","integrateBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:async(i,n,o,a,t,r)=>{const{createGPULines:s}=await W(()=>import("https://cdn.jsdelivr.net/npm/webgpu-instanced-lines/+esm"),[]).then(u=>{if(!("createGPULines"in u))throw new SyntaxError("export 'createGPULines' not found");return u}),g=s(i,{colorTargets:[{format:n,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}],depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},multisample:{count:o.sampleCount,alphaToCoverageEnabled:!1},join:"bevel",cap:"square",vertexShaderBody:a,fragmentShaderBody:t});return r.then(()=>g.destroy()),{createGPULines:s,gpuLines:g}},inputs:["device","canvasFormat","renderState","vertexShaderBody","fragmentShaderBody","invalidation"],outputs:["createGPULines","gpuLines"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(i,n,o)=>{const a={phi:.8,theta:.3,distance:7,center:[0,2,0],fov:Math.PI/4,near:.01,far:100},t=new Float32Array(16),r=new Float32Array(16),s=new Float32Array(16);function g(e){const{phi:c,theta:m,distance:l,center:S,fov:v,near:w,far:C}=a,B=S[0]+l*Math.cos(m)*Math.cos(c),U=S[1]+l*Math.sin(m),D=S[2]+l*Math.cos(m)*Math.sin(c),z=B,A=U,P=D;let E=S[0]-B,M=S[1]-U,_=S[2]-D;const k=Math.sqrt(E*E+M*M+_*_);E/=k,M/=k,_/=k;let T=M*0-_*1,I=_*0-E*0,L=E*1-M*0;const G=Math.sqrt(T*T+I*I+L*L);T/=G,I/=G,L/=G;const F=I*_-L*M,O=L*E-T*_,Y=T*M-I*E;t[0]=T,t[1]=F,t[2]=-E,t[3]=0,t[4]=I,t[5]=O,t[6]=-M,t[7]=0,t[8]=L,t[9]=Y,t[10]=-_,t[11]=0,t[12]=-(T*z+I*A+L*P),t[13]=-(F*z+O*A+Y*P),t[14]=E*z+M*A+_*P,t[15]=1;const q=1/Math.tan(v/2),$=1/(w-C);r[0]=q/e,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=q,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=(w+C)*$,r[11]=-1,r[12]=0,r[13]=0,r[14]=w*C*$*2,r[15]=0;for(let R=0;R<4;R++)for(let V=0;V<4;V++){let X=0;for(let j=0;j<4;j++)X+=r[R+j*4]*t[j+V*4];s[R+V*4]=X}return s}const u=i.select(n.elements.svg);let p=!1,d=0,f=0;function y(e){if(!p)return;const c=e.clientX-d,m=e.clientY-f;a.phi+=c*.01,a.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a.theta+m*.01)),d=e.clientX,f=e.clientY,o.dirty=!0}function h(){p&&(p=!1,u.style("cursor","grab"),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",h))}u.on("mousedown",e=>{e.preventDefault(),p=!0,d=e.clientX,f=e.clientY,u.style("cursor","grabbing"),window.addEventListener("mousemove",y),window.addEventListener("mouseup",h)}),u.on("wheel",e=>{e.preventDefault(),a.distance*=1+e.deltaY*.001,a.distance=Math.max(1,Math.min(50,a.distance)),o.dirty=!0});let b=0;return u.on("touchstart",e=>{if(e.preventDefault(),e.touches.length===1)p=!0,d=e.touches[0].clientX,f=e.touches[0].clientY;else if(e.touches.length===2){const c=e.touches[1].clientX-e.touches[0].clientX,m=e.touches[1].clientY-e.touches[0].clientY;b=Math.sqrt(c*c+m*m)}}),u.on("touchmove",e=>{if(e.preventDefault(),e.touches.length===1&&p){const c=e.touches[0].clientX-d,m=e.touches[0].clientY-f;a.phi+=c*.01,a.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a.theta+m*.01)),d=e.touches[0].clientX,f=e.touches[0].clientY,o.dirty=!0}else if(e.touches.length===2){const c=e.touches[1].clientX-e.touches[0].clientX,m=e.touches[1].clientY-e.touches[0].clientY,l=Math.sqrt(c*c+m*m);if(b>0){const S=b/l;a.distance*=S,a.distance=Math.max(1,Math.min(50,a.distance)),o.dirty=!0}b=l}}),u.on("touchend",e=>{p=!1,b=0}),{cameraState:a,_view:t,_proj:r,_projView:s,getProjectionViewMatrix:g,svg:u,isDragging:p,lastX:d,lastY:f,onMouseMove:y,onMouseUp:h,lastTouchDist:b}},inputs:["d3","stack","renderState"],outputs:["cameraState","_view","_proj","_projView","getProjectionViewMatrix","svg","isDragging","lastX","lastY","onMouseMove","onMouseUp","lastTouchDist"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:()=>({vertexShaderBody:`// vertexShaderBody:

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
  lineWidth: f32,
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
return Vertex(vec4f(0), 0.0, 0.0, 0.0, 0.0);
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

  return Vertex(projected, lineWidth, t, normalizedVelocity, lineWidth);
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

fn getColor(lineCoord: vec2f, t: f32, velocity: f32, lineWidth: f32) -> vec4f {
  let sdf = length(lineCoord) * lineWidth;
  let isCap = abs(lineCoord.x) > 0.0;

  // Rainbow color based on velocity, with saturation from track progress
  var color = rainbow(vec2f(velocity, t));

  if (isCap && dot(lineCoord, lineCoord) > 1.0) { discard; }

  // Dark border effect
  let borderWidth = 4.0;
  let borderMask = smoothstep(lineWidth - borderWidth - 0.75, lineWidth - borderWidth + 0.75, sdf);
  color = mix(color, vec3f(0.0), borderMask * 0.8);

  return vec4f(color, 1.0);
}
`}),inputs:[],outputs:["vertexShaderBody","fragmentShaderBody"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(i,n,o,a,t)=>{const r=i.createBuffer({label:"proj-view-matrix",size:64,usage:n.UNIFORM|n.COPY_DST}),s=i.createBuffer({label:"line-uniforms",size:16,usage:n.UNIFORM|n.COPY_DST}),g=i.createBindGroup({layout:o.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:r}},{binding:2,resource:{buffer:s}}]});return t.then(()=>{r.destroy(),s.destroy()}),{projViewBuffer:r,lineUniformBuffer:s,lineBindGroup:g}},inputs:["device","GPUBufferUsage","gpuLines","stateBuffer","invalidation"],outputs:["projViewBuffer","lineUniformBuffer","lineBindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:(i,n,o)=>{i(n`<pre><code class="language-wgsl">${o}</code></pre>`)},inputs:["display","html","vertexShaderBody"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:async(i,n,o,a,t,r,s,g,u,p,d,f,y,h,b,e,c,m,l,S)=>{const{createFrameLoop:v}=await W(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(P=>{if(!("createFrameLoop"in P))throw new SyntaxError("export 'createFrameLoop' not found");return P}),w=new ArrayBuffer(32),C=new Float32Array(w),B=new Uint32Array(w),U=new ArrayBuffer(16),D=new Uint32Array(U),z=new Float32Array(U),A=v(()=>{const P=a.createCommandEncoder();let E=!1;if(n){const M=t.currentStep,_=(t.currentStep+1)%r;C[0]=o,C[1]=t.t,B[2]=M,B[3]=_,B[4]=r,B[5]=s,a.queue.writeBuffer(g,0,w);const k=P.beginComputePass();k.setPipeline(u),k.setBindGroup(0,p),k.dispatchWorkgroups(Math.ceil(s/64)),k.end(),t.t+=o,t.currentStep=_,d.dirty=!0,E=!0}if(d.dirty){const M=f.width/f.height,_=y(M);a.queue.writeBuffer(h,0,_),D[0]=(t.currentStep+1)%r,D[1]=r,D[2]=s,z[3]=i*b,a.queue.writeBuffer(e,0,U);const T={vertexCount:s*(r+1),width:i*b,resolution:[f.width,f.height]};c.updateUniforms(T);const I=P.beginRenderPass({colorAttachments:[{view:d.msaaColorTexture.createView(),resolveTarget:m.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:1,g:1,b:1,a:1}}],depthStencilAttachment:{view:d.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});c.draw(I,{...T,skipUniformUpdate:!0},[l]),I.end(),E=!0,n||(d.dirty=!1)}E&&a.queue.submit([P.finish()])});return S.then(()=>A.cancel()),{createFrameLoop:v,_integrateData:w,_integrateF32:C,_integrateU32:B,_lineData:U,_lineU32:D,_lineF32:z,loop:A}},inputs:["lineWidth","simulate","dt","device","simState","stepCount","particleCount","integrateUniformBuffer","integratePipeline","integrateBindGroup","renderState","canvas","getProjectionViewMatrix","projViewBuffer","dpr","lineUniformBuffer","gpuLines","gpuContext","lineBindGroup","invalidation"],outputs:["createFrameLoop","_integrateData","_integrateF32","_integrateU32","_lineData","_lineU32","_lineF32","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});x({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(i,n)=>{n()},inputs:["restart","initializeState"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
