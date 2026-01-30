import{d as T,_ as te}from"./index-ByB2dbry.js";T({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async(t,r,l)=>{if(!navigator.gpu)throw t(r`<p style="color: red;">WebGPU is not supported in this browser.</p>`),new Error("WebGPU not supported");const p=await navigator.gpu.requestAdapter();if(!p)throw new Error("Failed to get WebGPU adapter");const s=await p.requestDevice(),a=navigator.gpu.getPreferredCanvasFormat();return l.then(()=>s.destroy()),{adapter:p,device:s,canvasFormat:a}},inputs:["display","html","invalidation"],outputs:["adapter","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:(t,r,l,p,s)=>{const a=window.devicePixelRatio||1,d=Math.min(800,t),f=Math.max(Math.floor(d*.7),400),n=document.createElement("canvas");n.id="torus-canvas",n.width=Math.floor(d*a),n.height=Math.floor(f*a),n.style.width=`${d}px`,n.style.height=`${f}px`;const x=n.getContext("webgpu");x.configure({device:r,format:l,alphaMode:"opaque"}),p(s`<figure style="margin: 0;" id="torus-figure">${n}</figure>`);const v={x:-1,y:-1,hovering:!1};return n.addEventListener("mousemove",e=>{const i=n.getBoundingClientRect();v.x=(e.clientX-i.left)*a,v.y=(e.clientY-i.top)*a,v.hovering=!0}),n.addEventListener("mouseleave",()=>{v.hovering=!1}),{dpr:a,canvasWidth:d,canvasHeight:f,canvas:n,gpuContext:x,mouseState:v}},inputs:["width","device","canvasFormat","display","html"],outputs:["dpr","canvasWidth","canvasHeight","canvas","gpuContext","mouseState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(t,r,l)=>{const p=t.range([1,11],{value:8,label:"JFA passes",step:1}),s=r.input(p);return l(p),{jfaPassesInput:p,jfaPasses:s}},inputs:["Inputs","Generators","display"],outputs:["jfaPassesInput","jfaPasses"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(t,r,l,p)=>{const s=Math.pow(2,t-1),a=r.range([1,s],{value:s,label:"Outline width",transform:Math.log,step:1}),d=l.input(a);return p(a),{maxOutlineWidth:s,outlineWidthInput:a,outlineWidth:d}},inputs:["jfaPasses","Inputs","Generators","display"],outputs:["maxOutlineWidth","outlineWidthInput","outlineWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:()=>{function t(p,s,a,d,f,n,x=0){const v=[],e=[],i=[];function c(o){const u=Math.cos(o+x),h=Math.sin(o+x),b=s/p*o,m=Math.cos(b),g=Math.sin(b),j=a*(2+m);return[j*u,j*h,a*g]}function w(o){const h=c(o-1e-4),b=c(o+1e-4),m=[b[0]-h[0],b[1]-h[1],b[2]-h[2]],g=Math.sqrt(m[0]*m[0]+m[1]*m[1]+m[2]*m[2]);return[m[0]/g,m[1]/g,m[2]/g]}function I(o,u){return[o[1]*u[2]-o[2]*u[1],o[2]*u[0]-o[0]*u[2],o[0]*u[1]-o[1]*u[0]]}function D(o){const u=Math.sqrt(o[0]*o[0]+o[1]*o[1]+o[2]*o[2]);return[o[0]/u,o[1]/u,o[2]/u]}function M(o,u){return o[0]*u[0]+o[1]*u[1]+o[2]*u[2]}for(let o=0;o<=f;o++){const u=o/f*Math.PI*2*p,h=c(u),b=w(u);let m=[0,0,1];Math.abs(M(b,m))>.9&&(m=[1,0,0]);const g=D(I(b,m)),j=I(b,g);for(let B=0;B<=n;B++){const y=B/n*Math.PI*2,E=Math.cos(y),P=Math.sin(y),V=E*g[0]+P*j[0],F=E*g[1]+P*j[1],A=E*g[2]+P*j[2];v.push(h[0]+d*V,h[1]+d*F,h[2]+d*A),e.push(V,F,A)}}for(let o=0;o<f;o++)for(let u=0;u<n;u++){const h=o*(n+1)+u,b=h+n+1,m=h+1,g=b+1;i.push(h,b,m),i.push(m,b,g)}return{positions:new Float32Array(v),normals:new Float32Array(e),indices:new Uint32Array(i)}}const r=t(2,3,.5,.15,128,24,0),l=t(2,3,.5,.15,128,24,Math.PI/3);return console.log("Knot vertices:",r.positions.length/3,"triangles:",r.indices.length/3),{createTorusKnot:t,knot1:r,knot2:l}},inputs:[],outputs:["createTorusKnot","knot1","knot2"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(t,r,l,p,s)=>{function a(n,x){const v=t.createBuffer({label:`${x}-positions`,size:n.positions.byteLength,usage:r.VERTEX|r.COPY_DST});t.queue.writeBuffer(v,0,n.positions);const e=t.createBuffer({label:`${x}-normals`,size:n.normals.byteLength,usage:r.VERTEX|r.COPY_DST});t.queue.writeBuffer(e,0,n.normals);const i=t.createBuffer({label:`${x}-indices`,size:n.indices.byteLength,usage:r.INDEX|r.COPY_DST});return t.queue.writeBuffer(i,0,n.indices),{positionBuffer:v,normalBuffer:e,indexBuffer:i,indexCount:n.indices.length}}const d=a(l,"knot1"),f=a(p,"knot2");return s.then(()=>{d.positionBuffer.destroy(),d.normalBuffer.destroy(),d.indexBuffer.destroy(),f.positionBuffer.destroy(),f.normalBuffer.destroy(),f.indexBuffer.destroy()}),{createGeometryBuffers:a,knot1Buffers:d,knot2Buffers:f}},inputs:["device","GPUBufferUsage","knot1","knot2","invalidation"],outputs:["createGeometryBuffers","knot1Buffers","knot2Buffers"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(t,r,l,p)=>{function s(d,f){const n=t.createTexture({label:"object-id-texture",size:[d,f],format:"rgba32uint",usage:r.RENDER_ATTACHMENT|r.TEXTURE_BINDING|r.STORAGE_BINDING|r.COPY_SRC}),x=t.createTexture({label:"depth-texture",size:[d,f],format:"depth24plus",usage:r.RENDER_ATTACHMENT}),v=t.createTexture({label:"color-texture",size:[d,f],format:"rgba8unorm",usage:r.RENDER_ATTACHMENT|r.TEXTURE_BINDING}),e=[0,1].map(i=>t.createTexture({label:`jfa-texture-${i}`,size:[d,f],format:"rgba32uint",usage:r.TEXTURE_BINDING|r.STORAGE_BINDING|r.COPY_DST}));return{objectIdTexture:n,depthTexture:x,colorTexture:v,jfaTextures:e}}let a=s(l.width,l.height);return p.then(()=>{a.objectIdTexture.destroy(),a.depthTexture.destroy(),a.colorTexture.destroy(),a.jfaTextures.forEach(d=>d.destroy())}),{createTextures:s,textures:a}},inputs:["device","GPUTextureUsage","canvas","invalidation"],outputs:["createTextures","textures"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(t,r,l,p)=>{const s=`
struct Uniforms {
  projViewMatrix: mat4x4f,
  modelMatrix: mat4x4f,
  normalMatrix: mat4x4f,
  color: vec3f,
  objectId: u32,
  lightDir: vec3f,
  _pad: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexInput {
  @location(0) position: vec3f,
  @location(1) normal: vec3f,
}

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) worldNormal: vec3f,
  @location(1) worldPos: vec3f,
}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  let worldPos = uniforms.modelMatrix * vec4f(input.position, 1.0);
  let worldNormal = (uniforms.normalMatrix * vec4f(input.normal, 0.0)).xyz;

  var output: VertexOutput;
  output.position = uniforms.projViewMatrix * worldPos;
  output.worldNormal = worldNormal;
  output.worldPos = worldPos.xyz;
  return output;
}

struct FragmentOutput {
  @location(0) color: vec4f,
  @location(1) objectId: vec4u,
}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  let N = normalize(input.worldNormal);
  let L = normalize(uniforms.lightDir);

  // Simple diffuse + ambient
  let ambient = 0.3;
  let diffuse = max(dot(N, L), 0.0) * 0.7;
  let color = uniforms.color * (ambient + diffuse);

  var output: FragmentOutput;
  output.color = vec4f(color, 1.0);

  // Store object ID and screen position for JFA
  let screenPos = vec2u(input.position.xy);
  output.objectId = vec4u(screenPos.x + 1u, screenPos.y + 1u, uniforms.objectId, 0u);

  return output;
}
`,a=t.createShaderModule({label:"geometry-shader",code:s}),d=t.createRenderPipeline({label:"geometry-pipeline",layout:"auto",vertex:{module:a,entryPoint:"vertexMain",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]},{arrayStride:12,attributes:[{shaderLocation:1,offset:0,format:"float32x3"}]}]},fragment:{module:a,entryPoint:"fragmentMain",targets:[{format:"rgba8unorm"},{format:"rgba32uint"}]},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},primitive:{topology:"triangle-list",cullMode:"none"}}),f=`
struct Uniforms {
  projViewMatrix: mat4x4f,
  modelMatrix: mat4x4f,
  normalMatrix: mat4x4f,
  color: vec3f,
  objectId: u32,
  lightDir: vec3f,
  _pad: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexInput {
  @location(0) position: vec3f,
  @location(1) normal: vec3f,
}

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) normal: vec3f,
}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  let worldPos = uniforms.modelMatrix * vec4f(input.position, 1.0);
  output.position = uniforms.projViewMatrix * worldPos;
  output.normal = (uniforms.normalMatrix * vec4f(input.normal, 0.0)).xyz;
  return output;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let N = normalize(input.normal);
  let L = normalize(uniforms.lightDir);
  let diffuse = max(dot(N, L), 0.0) * 0.7 + 0.3;
  return vec4f(uniforms.color * diffuse, 1.0);
}
`,n=t.createShaderModule({label:"debug-shader",code:f}),x=t.createRenderPipeline({label:"debug-pipeline",layout:"auto",vertex:{module:n,entryPoint:"vertexMain",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]},{arrayStride:12,attributes:[{shaderLocation:1,offset:0,format:"float32x3"}]}]},fragment:{module:n,entryPoint:"fragmentMain",targets:[{format:r}]},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},primitive:{topology:"triangle-list",cullMode:"none"}}),v=256,e=t.createBuffer({label:"knot1-uniforms",size:v,usage:l.UNIFORM|l.COPY_DST}),i=t.createBuffer({label:"knot2-uniforms",size:v,usage:l.UNIFORM|l.COPY_DST}),c=t.createBindGroup({layout:d.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e}}]}),w=t.createBindGroup({layout:d.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:i}}]});return p.then(()=>{e.destroy(),i.destroy()}),{geometryShaderCode:s,geometryModule:a,geometryPipeline:d,debugShaderCode:f,debugModule:n,debugPipeline:x,uniformBufferSize:v,knot1UniformBuffer:e,knot2UniformBuffer:i,knot1BindGroup:c,knot2BindGroup:w}},inputs:["device","canvasFormat","GPUBufferUsage","invalidation"],outputs:["geometryShaderCode","geometryModule","geometryPipeline","debugShaderCode","debugModule","debugPipeline","uniformBufferSize","knot1UniformBuffer","knot2UniformBuffer","knot1BindGroup","knot2BindGroup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(t,r,l)=>{const p=`
@group(0) @binding(0) var srcTexture: texture_2d<u32>;
@group(0) @binding(1) var dstTexture: texture_storage_2d<rgba32uint, write>;

struct Uniforms {
  resolution: vec2f,
  stepSize: f32,
  _padding: f32,
}
@group(0) @binding(2) var<uniform> uniforms: Uniforms;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let coord = vec2i(gid.xy);
  let resolution = vec2i(uniforms.resolution);

  if (coord.x >= resolution.x || coord.y >= resolution.y) { return; }

  let stepSize = i32(uniforms.stepSize);
  let invRes = 1.0 / max(uniforms.resolution.x, uniforms.resolution.y);

  var bestSeed = vec4u(0u);
  var bestDist = 1e10;

  for (var i = -1; i <= 1; i++) {
for (var j = -1; j <= 1; j++) {
  let sampleCoord = coord + vec2i(i, j) * stepSize;

  if (sampleCoord.x < 0 || sampleCoord.x >= resolution.x ||
      sampleCoord.y < 0 || sampleCoord.y >= resolution.y) {
    continue;
  }

  let seed = textureLoad(srcTexture, sampleCoord, 0);

  if (seed.x == 0u && seed.y == 0u) { continue; }

  let seedPos = vec2f(f32(seed.x - 1u), f32(seed.y - 1u));
  let currentPos = vec2f(gid.xy);

  let dxy = (seedPos - currentPos) * invRes;
  let dist = dot(dxy, dxy);

  if (dist < bestDist) {
    bestDist = dist;
    bestSeed = seed;
  }
}
  }

  textureStore(dstTexture, coord, bestSeed);
}
`,s=t.createShaderModule({label:"jfa-shader",code:p}),a=t.createComputePipeline({label:"jfa-pipeline",layout:"auto",compute:{module:s,entryPoint:"main"}}),d=12,f=[];for(let n=0;n<d;n++)f.push(t.createBuffer({label:`jfa-uniforms-${n}`,size:16,usage:r.UNIFORM|r.COPY_DST}));return l.then(()=>{f.forEach(n=>n.destroy())}),{jfaShaderCode:p,jfaModule:s,jfaPipeline:a,maxJfaPasses:d,jfaUniformBuffers:f}},inputs:["device","GPUBufferUsage","invalidation"],outputs:["jfaShaderCode","jfaModule","jfaPipeline","maxJfaPasses","jfaUniformBuffers"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(t,r,l,p)=>{const s=`
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var pos = array<vec2f, 3>(
vec2f(-1.0, -1.0),
vec2f(3.0, -1.0),
vec2f(-1.0, 3.0)
  );
  var output: VertexOutput;
  output.position = vec4f(pos[vertexIndex], 0.0, 1.0);
  output.uv = (pos[vertexIndex] + 1.0) * 0.5;
  return output;
}

@group(0) @binding(0) var colorTexture: texture_2d<f32>;
@group(0) @binding(1) var jfaTexture: texture_2d<u32>;
@group(0) @binding(2) var objectIdTexture: texture_2d<u32>;

struct Uniforms {
  resolution: vec2f,
  outlineWidth: f32,
  hovering: f32,
  mousePos: vec2f,
  _padding: vec2f,
}
@group(0) @binding(3) var<uniform> uniforms: Uniforms;

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let pixelCoord = vec2i(input.uv * uniforms.resolution);
  let flippedCoord = vec2i(pixelCoord.x, i32(uniforms.resolution.y) - 1 - pixelCoord.y);

  // Sample textures
  let color = textureLoad(colorTexture, flippedCoord, 0);
  let jfaData = textureLoad(jfaTexture, flippedCoord, 0);
  let objectData = textureLoad(objectIdTexture, flippedCoord, 0);

  // Get hovered object ID by sampling JFA texture at mouse position (after expansion)
  // Only select object if mouse is within outline width of that object
  let mouseCoord = vec2i(i32(uniforms.mousePos.x), i32(uniforms.mousePos.y));
  let mouseJfaData = textureLoad(jfaTexture, mouseCoord, 0);
  let mouseObjectData = textureLoad(objectIdTexture, mouseCoord, 0);

  // Check distance from mouse to nearest seed
  var mouseDist = 1e10;
  if (mouseJfaData.x > 0u || mouseJfaData.y > 0u) {
let mouseSeedPos = vec2f(f32(mouseJfaData.x - 1u), f32(mouseJfaData.y - 1u));
let mousePos = vec2f(mouseCoord);
mouseDist = distance(mouseSeedPos, mousePos);
  }

  // Only hover if: directly on object OR within outline width of object
  let mouseOnObject = (mouseObjectData.x > 0u || mouseObjectData.y > 0u);
  let mouseNearObject = mouseDist < uniforms.outlineWidth;
  let hoveredObjectId = select(0u, mouseJfaData.z, uniforms.hovering > 0.5 && (mouseOnObject || mouseNearObject));

  // Get distance to nearest seed
  var dist = 0.0;
  if (jfaData.x > 0u || jfaData.y > 0u) {
let seedPos = vec2f(f32(jfaData.x - 1u), f32(jfaData.y - 1u));
let currentPos = vec2f(flippedCoord);
dist = distance(seedPos, currentPos);
  }

  // Get object IDs
  let currentObjectId = objectData.z;
  let nearestObjectId = jfaData.z;

  // Determine if this is an outline pixel:
  // We're on an outline if we're close to a boundary between different objects
  let isBackground = (objectData.x == 0u && objectData.y == 0u);
  let nearDifferentObject = (currentObjectId != nearestObjectId) && (jfaData.x > 0u || jfaData.y > 0u);

  // Hard cutoff for outline
  let inOutline = nearDifferentObject && dist < uniforms.outlineWidth;

  // Check if this pixel belongs to or is near the hovered object (respecting outline width)
  let isHoveredObject = (currentObjectId == hoveredObjectId) && (hoveredObjectId > 0u);
  let isNearHoveredObject = (nearestObjectId == hoveredObjectId) && (hoveredObjectId > 0u) && (dist < uniforms.outlineWidth);

  // Outline color based on the nearest object
  var outlineColor = vec3f(0.0);
  if (nearestObjectId == 1u) {
outlineColor = vec3f(0.4, 0.7, 1.0); // Blue outline for knot 1
  } else if (nearestObjectId == 2u) {
outlineColor = vec3f(1.0, 0.6, 0.3); // Orange outline for knot 2
  }

  // Highlight color for hover (lighter version of the object's color)
  var hoverOutlineColor = vec3f(0.7, 0.85, 1.0); // Light blue default
  if (hoveredObjectId == 1u) {
hoverOutlineColor = vec3f(0.7, 0.85, 1.0); // Light blue for knot 1
  } else if (hoveredObjectId == 2u) {
hoverOutlineColor = vec3f(1.0, 0.8, 0.6); // Light orange for knot 2
  }

  // Sawtooth ramp based on distance (creates repeating bands)
  let bandWidth = 32.0; // pixels per band
  let ramp = fract(dist / bandWidth);
  let bandShade = 0.9 + 0.1 * ramp; // gentle variation from 0.85 to 1.0

  // Apply outline with hard cutoff
  var finalColor = color.rgb;
  if (isBackground) {
finalColor = vec3f(0.95); // Light gray background
if (inOutline) {
  // Use hover color if this outline belongs to hovered object
  let baseOutline = select(outlineColor, hoverOutlineColor, isNearHoveredObject);
  finalColor = baseOutline * bandShade;
}
  } else {
// Darken edges where objects meet
if (inOutline) {
  finalColor = finalColor * 0.5 * bandShade;
}
  }

  // Highlight hovered object with a lighter tint of its own color
  if (isHoveredObject) {
finalColor = mix(finalColor, hoverOutlineColor, 0.3) * 1.15;
  }

  return vec4f(finalColor, 1.0);
}
`,a=t.createShaderModule({label:"composite-shader",code:s}),d=t.createRenderPipeline({label:"composite-pipeline",layout:"auto",vertex:{module:a,entryPoint:"vertexMain"},fragment:{module:a,entryPoint:"fragmentMain",targets:[{format:r}]},primitive:{topology:"triangle-list"}}),f=t.createBuffer({label:"composite-uniforms",size:32,usage:l.UNIFORM|l.COPY_DST});return p.then(()=>{f.destroy()}),{compositeShaderCode:s,compositeModule:a,compositePipeline:d,compositeUniformBuffer:f}},inputs:["device","canvasFormat","GPUBufferUsage","invalidation"],outputs:["compositeShaderCode","compositeModule","compositePipeline","compositeUniformBuffer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:()=>{const t={distance:4,fov:Math.PI/3,near:.1,far:100};function r(e){const i=1/Math.tan(t.fov/2),c=1/(t.near-t.far);return new Float32Array([i/e,0,0,0,0,i,0,0,0,0,t.far*c,-1,0,0,t.near*t.far*c,0])}function l(e,i){const c=1/Math.tan(t.fov/2),w=1/(t.near-t.far);e[0]=c/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=c,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t.far*w,e[11]=-1,e[12]=0,e[13]=0,e[14]=t.near*t.far*w,e[15]=0}function p(e){const i=new Float32Array(16);return s(i,e),i}function s(e,i){const c=i*.3,w=0,I=t.distance*Math.cos(c)*Math.cos(w),D=t.distance*Math.sin(w),M=t.distance*Math.sin(c)*Math.cos(w);let o=-I,u=-D,h=-M,b=Math.sqrt(o*o+u*u+h*h);o/=b,u/=b,h/=b;let m=u*0-h*1,g=h*0-o*0,j=o*1-u*0,B=Math.sqrt(m*m+g*g+j*j);m/=B,g/=B,j/=B;const y=g*h-j*u,E=j*o-m*h,P=m*u-g*o;e[0]=m,e[1]=y,e[2]=-o,e[3]=0,e[4]=g,e[5]=E,e[6]=-u,e[7]=0,e[8]=j,e[9]=P,e[10]=-h,e[11]=0,e[12]=-(m*I+g*D+j*M),e[13]=-(y*I+E*D+P*M),e[14]=-(-o*I-u*D-h*M),e[15]=1}function a(e,i){const c=new Float32Array(16);return d(c,e,i),c}function d(e,i,c){for(let w=0;w<4;w++)for(let I=0;I<4;I++){let D=0;for(let M=0;M<4;M++)D+=i[w+M*4]*c[M+I*4];e[w+I*4]=D}}function f(e){const i=Math.cos(e),c=Math.sin(e);return new Float32Array([1,0,0,0,0,i,c,0,0,-c,i,0,0,0,0,1])}function n(e){const i=Math.cos(e),c=Math.sin(e);return new Float32Array([i,0,-c,0,0,1,0,0,c,0,i,0,0,0,0,1])}function x(e){const i=Math.cos(e),c=Math.sin(e);return new Float32Array([i,c,0,0,-c,i,0,0,0,0,1,0,0,0,0,1])}function v(){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return{camera:t,getProjectionMatrix:r,getProjectionMatrixInto:l,getViewMatrix:p,getViewMatrixInto:s,multiplyMatrices:a,multiplyMatricesInto:d,rotationMatrixX:f,rotationMatrixY:n,rotationMatrixZ:x,identityMatrix:v}},inputs:[],outputs:["camera","getProjectionMatrix","getProjectionMatrixInto","getViewMatrix","getViewMatrixInto","multiplyMatrices","multiplyMatricesInto","rotationMatrixX","rotationMatrixY","rotationMatrixZ","identityMatrix"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});T({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:async(t,r,l,p,s,a,d,f,n,x,v,e,i,c,w,I,D,M,o,u,h,b,m,g)=>{const{createFrameLoop:j}=await te(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(O=>{if(!("createFrameLoop"in O))throw new SyntaxError("export 'createFrameLoop' not found");return O}),B=new ArrayBuffer(256),y=new Float32Array(B),E=new Uint32Array(B),P=new Float32Array(4),V=new Float32Array(8),F=new Float32Array(16),A=new Float32Array(16),G=new Float32Array(16),W=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),q=l.colorTexture.createView(),J=l.objectIdTexture.createView(),U=l.depthTexture.createView(),N=l.jfaTextures.map(O=>O.createView()),Y=[];for(let O=0;O<2;O++){const z=[];for(let S=0;S<p;S++)z.push(s.createBindGroup({layout:a.getBindGroupLayout(0),entries:[{binding:0,resource:N[O]},{binding:1,resource:N[1-O]},{binding:2,resource:{buffer:d[S]}}]}));Y.push(z)}const $=[0,1].map(O=>s.createBindGroup({layout:f.getBindGroupLayout(0),entries:[{binding:0,resource:q},{binding:1,resource:N[O]},{binding:2,resource:J},{binding:3,resource:{buffer:n}}]}));let H=-1;const K=j(O=>{const z=O/1e3,S=s.createCommandEncoder(),Z=x.width/x.height;v(F,Z),e(A,z),i(G,F,A);const X=[.5,.8,.3];y.set(G,0),y.set(W,16),y.set(W,32),y[48]=.3,y[49]=.5,y[50]=.9,E[51]=1,y[52]=X[0],y[53]=X[1],y[54]=X[2],s.queue.writeBuffer(c,0,B,0,224),y[48]=.9,y[49]=.5,y[50]=.2,E[51]=2,s.queue.writeBuffer(w,0,B,0,224);const C=S.beginRenderPass({colorAttachments:[{view:q,loadOp:"clear",storeOp:"store",clearValue:{r:.95,g:.95,b:.95,a:1}},{view:J,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}],depthStencilAttachment:{view:U,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});if(C.setPipeline(I),C.setBindGroup(0,D),C.setVertexBuffer(0,M.positionBuffer),C.setVertexBuffer(1,M.normalBuffer),C.setIndexBuffer(M.indexBuffer,"uint32"),C.drawIndexed(M.indexCount),C.setBindGroup(0,o),C.setVertexBuffer(0,u.positionBuffer),C.setVertexBuffer(1,u.normalBuffer),C.setIndexBuffer(u.indexBuffer,"uint32"),C.drawIndexed(u.indexCount),C.end(),S.copyTextureToTexture({texture:l.objectIdTexture},{texture:l.jfaTextures[0]},[x.width,x.height]),r!==H){P[0]=x.width,P[1]=x.height;for(let _=0;_<r;_++){const k=Math.pow(2,r-1-_);P[2]=k,s.queue.writeBuffer(d[_],0,P)}H=r}let L=0;for(let _=0;_<r;_++){const k=S.beginComputePass();k.setPipeline(a),k.setBindGroup(0,Y[L][_]),k.dispatchWorkgroups(Math.ceil(x.width/8),Math.ceil(x.height/8)),k.end(),L=1-L}const Q=L;V[0]=x.width,V[1]=x.height,V[2]=t*h,V[3]=b.hovering?1:0,V[4]=b.x,V[5]=b.y,s.queue.writeBuffer(n,0,V);const ee=$[Q],R=S.beginRenderPass({colorAttachments:[{view:m.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:1,g:1,b:1,a:1}}]});R.setPipeline(f),R.setBindGroup(0,ee),R.draw(3),R.end(),s.queue.submit([S.finish()])});return g.then(()=>K.cancel()),{createFrameLoop:j,uniformData:B,uniformF32:y,uniformU32:E,jfaUniformData:P,compositeUniformData:V,projMatrix:F,viewMatrix:A,projViewMatrix:G,identityMat:W,colorTextureView:q,objectIdTextureView:J,depthTextureView:U,jfaTextureViews:N,jfaBindGroupsPrebuilt:Y,compositeBindGroupsPrebuilt:$,lastJfaPasses:H,loop:K}},inputs:["outlineWidth","jfaPasses","textures","maxJfaPasses","device","jfaPipeline","jfaUniformBuffers","compositePipeline","compositeUniformBuffer","canvas","getProjectionMatrixInto","getViewMatrixInto","multiplyMatricesInto","knot1UniformBuffer","knot2UniformBuffer","geometryPipeline","knot1BindGroup","knot1Buffers","knot2BindGroup","knot2Buffers","dpr","mouseState","gpuContext","invalidation"],outputs:["createFrameLoop","uniformData","uniformF32","uniformU32","jfaUniformData","compositeUniformData","projMatrix","viewMatrix","projViewMatrix","identityMat","colorTextureView","objectIdTextureView","depthTextureView","jfaTextureViews","jfaBindGroupsPrebuilt","compositeBindGroupsPrebuilt","lastJfaPasses","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
