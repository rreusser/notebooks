import{d as S,_ as F}from"./index-ByB2dbry.js";S({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async n=>{const{createWebGPUContext:u}=await F(()=>import("./webgpu-canvas-C7AS78hn.js"),[]).then(a=>{if(!("createWebGPUContext"in a))throw new SyntaxError("export 'createWebGPUContext' not found");return a}),{device:d,canvasFormat:h}=await u({optionalFeatures:["shader-f16"]});return n.then(()=>d.destroy()),{createWebGPUContext:u,device:d,canvasFormat:h}},inputs:["invalidation"],outputs:["createWebGPUContext","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(n,u,d,h,a,f,l)=>{const s=n.hostname==="rreusser.github.io"?"https://raw.githubusercontent.com/rreusser/notebooks/main/src/visualizing-sloan-digital-sky-survey-data":".",r=await fetch(`${s}/objects.json`).then(t=>t.json());function c(t){const p=t>>15&1,i=t>>10&31,o=t&1023;return i===0?(p?-1:1)*Math.pow(2,-14)*(o/1024):i===31?o?NaN:p?-1/0:1/0:(p?-1:1)*Math.pow(2,i-15)*(1+o/1024)}const y=1,e=100,x={queue:[],inFlight:new Set,promises:new Map,chunks:new Array(r.chunks.length).fill(null),loadedCount:0,distanceHistogram:new Uint32Array(e),maxDistance:0,request(t){if(this.chunks[t])return Promise.resolve(this.chunks[t]);if(this.promises.has(t))return this.promises.get(t).promise;let p,i;const o=new Promise((g,w)=>{p=g,i=w});return this.promises.set(t,{promise:o,resolve:p,reject:i}),this.queue.push(t),this.processQueue(),o},processQueue(){for(;this.queue.length>0&&this.inFlight.size<y;){const t=this.queue.shift();this.chunks[t]||this.inFlight.has(t)||(this.inFlight.add(t),this.loadChunk(t))}},async loadChunk(t){const p=r.chunks[t];try{const i=await fetch(`${s}/${p.file}`);let o;if(p.file.endsWith(".gz")&&s!=="."){const m=new u("gzip"),C=i.body.pipeThrough(m);o=await new d(C).arrayBuffer()}else o=await i.arrayBuffer();const g=new Uint16Array(o),w=h.createBuffer({label:`galaxy-chunk-${t}`,size:o.byteLength,usage:a.VERTEX|a.COPY_DST});h.queue.writeBuffer(w,0,g);const z=Math.max(Math.abs(r.bounds.min[0]),Math.abs(r.bounds.max[0]),Math.abs(r.bounds.min[1]),Math.abs(r.bounds.max[1]),Math.abs(r.bounds.min[2]),Math.abs(r.bounds.max[2]))*1.5;z>this.maxDistance&&(this.maxDistance=z);for(let m=0;m<g.length;m+=4){const C=c(g[m]),I=c(g[m+1]),D=c(g[m+2]),_=Math.sqrt(C*C+I*I+D*D),E=Math.min(e-1,Math.floor(_/z*e));this.distanceHistogram[E]++}const R={buffer:w,count:p.count};this.chunks[t]=R,this.loadedCount+=R.count,this.inFlight.delete(t);const{resolve:b}=this.promises.get(t);b(R),f.dirty=!0;const P=p.objectClass==="QSO"?"QSOs":"galaxies";console.log(`Loaded chunk ${t+1}/${r.chunks.length}: ${R.count.toLocaleString()} ${P} (z=${p.redshiftRange[0]}-${p.redshiftRange[1]})`),this.processQueue()}catch(i){this.inFlight.delete(t);const{reject:o}=this.promises.get(t);o(i),this.processQueue()}}};function v(t){for(let i=0;i<r.chunks.length;i++){const[o]=r.chunks[i].redshiftRange;o<t-.001&&x.request(i)}}const M={get loadedCount(){return x.loadedCount},get totalCount(){return r.totalCount},get chunks(){return x.chunks},get loadingIndices(){return x.inFlight}};return v(.3),l.then(()=>{for(const t of x.chunks)t&&t.buffer.destroy()}),{dataBaseUrl:s,metadata:r,decodeFloat16:c,CONCURRENCY:y,NUM_DISTANCE_BINS:e,chunkLoader:x,loadChunksForRedshift:v,loadState:M}},inputs:["location","DecompressionStream","Response","device","GPUBufferUsage","renderState","invalidation"],outputs:["dataBaseUrl","metadata","decodeFloat16","CONCURRENCY","NUM_DISTANCE_BINS","chunkLoader","loadChunksForRedshift","loadState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:async(n,u,d,h,a,f)=>{const{expandable:l}=await F(()=>import("./expandable-B9qjFRA-.js"),[]).then(i=>{if(!("expandable"in i))throw new SyntaxError("export 'expandable' not found");return i}),s=window.devicePixelRatio||1,r=1200,c=Math.min(r,window.innerWidth-40),y=Math.round(c*.7),e=document.createElement("canvas");e.id="sdss-canvas",e.width=Math.floor(c*s),e.height=Math.floor(y*s),e.style.width=`${c}px`,e.style.height=`${y}px`,e.style.maxWidth="none",e.style.height="auto",e.style.aspectRatio=`${c} / ${y}`,e.style.background="#1B1714";const x=e.getContext("webgpu");x.configure({device:n,format:u,alphaMode:"premultiplied"});const v={dirty:!0},M=d`<figure style="margin: 0; max-width: none;" id="sdss-figure">
  ${e}
</figure>`;function t(){const i=window.innerWidth,o=Math.min(r,i-40),g=Math.round(o*.7),z=((document.querySelector(".observablehq--cell")?.offsetWidth||840)-o)/2;M.style.width=o+"px",M.style.marginLeft=z+"px",e.style.width=o+"px",e.style.height=g+"px"}t(),window.addEventListener("resize",t),h.then(()=>window.removeEventListener("resize",t)),a(l(M,{width:c,height:y,controls:".sdss-controls",onResize(i,o,g){e.width=Math.floor(o*s),e.height=Math.floor(g*s),e.style.width=`${o}px`,e.style.height=`${g}px`,x.configure({device:n,format:u,alphaMode:"premultiplied"}),v.dirty=!0}}));const p=new f(i=>{for(const o of i){const g=o.contentRect,w=Math.floor(g.width),z=Math.floor(g.height);w>0&&z>0&&(e.width=Math.floor(w*s),e.height=Math.floor(z*s),x.configure({device:n,format:u,alphaMode:"premultiplied"}),v.dirty=!0)}});return p.observe(e),h.then(()=>p.disconnect()),{expandable:l,dpr:s,maxWidth:r,initialWidth:c,initialHeight:y,canvas:e,gpuContext:x,renderState:v,figure:M,updateFigureLayout:t,resizeObserver:p}},inputs:["device","canvasFormat","html","invalidation","display","ResizeObserver"],outputs:["expandable","dpr","maxWidth","initialWidth","initialHeight","canvas","gpuContext","renderState","figure","updateFigureLayout","resizeObserver"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(n,u)=>{const{interval:d}=await F(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(h=>{const a={},f=n.module(h.default),l=n.module();if(!f.defines("interval"))throw new SyntaxError("export 'interval' not found");return l.variable(a.interval=u()).import("interval",f),a});return{interval:d}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["interval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(n,u,d,h,a,f)=>{const l=n`<div class="sdss-controls"></div>`;function s(o){return l.appendChild(o),u.input(o)}const r=1,c=Math.min(d.galaxyRedshiftRange[0],d.qsoRedshiftRange[0]),y=d.qsoRedshiftRange[1],e=h([+c.toFixed(2),+y.toFixed(1)],{value:[+c.toFixed(2),.3],step:.01,label:"Redshift (z)",transform:Math.log}),x=s(e),v=25,M=a.checkbox(["Galaxies","QSOs"],{value:["Galaxies"],label:"Show"}),t=s(M),p=a.range([.001,1],{value:.02,label:"Exposure",step:.001,transform:Math.log}),i=s(p);return f(l),{controlsContainer:l,ctrl:s,pointSize:r,zMin:c,zMax:y,redshiftRangeInput:e,redshiftRange:x,whitePoint:v,objectTypesInput:M,objectTypes:t,exposureInput:p,exposure:i}},inputs:["html","Generators","metadata","interval","Inputs","display"],outputs:["controlsContainer","ctrl","pointSize","zMin","zMax","redshiftRangeInput","redshiftRange","whitePoint","objectTypesInput","objectTypes","exposureInput","exposure"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,u,d,h)=>{const a=[[0,0],[.02,85],[.05,212],[.1,421],[.15,627],[.2,828],[.25,1025],[.3,1219],[.4,1596],[.5,1960],[.6,2311],[.7,2650],[.8,2977],[1,3395],[2,5765],[5,8715],[10,1e4],[1100,46500]];function f(i){for(let o=1;o<a.length;o++)if(i<=a[o][0]){const[g,w]=a[o-1],[z,R]=a[o],b=(i-g)/(z-g);return w+b*(R-w)}return a[a.length-1][1]}const l=[[0,0],[.02,.27],[.05,.67],[.1,1.29],[.2,2.45],[.3,3.45],[.4,4.32],[.5,5.08],[.6,5.75],[.7,6.34],[.8,6.87],[1,7.79],[2,10.4],[3,11.5],[4,12.1],[5,12.5],[6,12.8],[7,13],[10,13.3],[1100,13.8]];function s(i){for(let o=1;o<l.length;o++)if(i<=l[o][0]){const[g,w]=l[o-1],[z,R]=l[o],b=(i-g)/(z-g);return w+b*(R-w)}return l[l.length-1][1]}const r=13.8,[c,y]=n,e=f(c),x=f(y),v=s(c),M=s(y),t=i=>i>=1e3?`${(i/1e3).toFixed(2)} Gpc`:`${i.toFixed(0)} Mpc`,p=i=>i.toFixed(2);return u(d`<p style="font-size: 14px; color: var(--theme-foreground-muted); line-height: 1.6; max-width: 640px;">
<strong>Current selection:</strong> ${h`z = ${c.toFixed(2)}`} to ${h`z = ${y.toFixed(2)}`}<br>
<strong>Comoving distance:</strong> ${t(e)} to ${t(x)}<br>
<strong>Lookback time:</strong> ${p(v)} to ${p(M)} billion years ago
</p>`),{comovingDistanceTable:a,zToComovingDistance:f,lookbackTimeTable:l,zToLookbackTime:s,UNIVERSE_AGE:r,zLo:c,zHi:y,dLo:e,dHi:x,tLo:v,tHi:M,formatDist:t,formatTime:p}},inputs:["redshiftRange","display","html","tex"],outputs:["comovingDistanceTable","zToComovingDistance","lookbackTimeTable","zToLookbackTime","UNIVERSE_AGE","zLo","zHi","dLo","dHi","tLo","tHi","formatDist","formatTime"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(n,u)=>{u(n[1])},inputs:["redshiftRange","loadChunksForRedshift"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,u,d,h,a)=>{const f=n`<div style="font-size: 14px; color: var(--theme-foreground-muted); margin-top: 8px;"></div>`;u(f);let l=0,s=0;const r=setInterval(()=>{const c=d.loadingIndices.size>0;(d.loadedCount!==l||d.loadingIndices.size!==s)&&(l=d.loadedCount,s=d.loadingIndices.size,c?f.textContent=`Loading... ${d.loadedCount.toLocaleString()} objects loaded`:f.textContent=`Loaded ${d.loadedCount.toLocaleString()} objects (${h.galaxyCount.toLocaleString()} galaxies, ${h.qsoCount.toLocaleString()} QSOs)`)},100);return a.then(()=>clearInterval(r)),{progressEl:f,lastLoaded:l,lastLoadingSize:s,updateInterval:r}},inputs:["html","display","loadState","metadata","invalidation"],outputs:["progressEl","lastLoaded","lastLoadingSize","updateInterval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,u,d,h,a,f)=>{const l=n`<div id="histogram-container" style="max-width: 640px;"></div>`;u(l);let s=0;const r=setInterval(()=>{if(d.loadedCount===s)return;s=d.loadedCount;const c=d.maxDistance/h,y=Array.from(d.distanceHistogram,(e,x)=>({distance:(x+.5)*c,count:e})).filter(e=>e.count>0);l.innerHTML="",l.appendChild(a.plot({width:640,height:200,marginLeft:60,x:{label:"Distance (Mpc)",tickFormat:e=>e>=1e3?`${(e/1e3).toFixed(1)}k`:e},y:{label:"Object count",tickFormat:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e},marks:[a.rectY(y,{x1:e=>e.distance-c/2,x2:e=>e.distance+c/2,y:"count",fill:"#4a9eff"}),a.ruleY([0])]}))},200);return f.then(()=>clearInterval(r)),{histogramContainer:l,lastCount:s,histogramInterval:r}},inputs:["html","display","chunkLoader","NUM_DISTANCE_BINS","Plot","invalidation"],outputs:["histogramContainer","lastCount","histogramInterval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(n,u,d)=>{const{createCameraController:h}=await F(()=>import("./camera-controller-r0T2u4VH.js"),[]).then(r=>{if(!("createCameraController"in r))throw new SyntaxError("export 'createCameraController' not found");return r}),a=n.bounds,f=Math.max(a.max[0]-a.min[0],a.max[1]-a.min[1],a.max[2]-a.min[2]),l=[0,0,0],s=h(u,{center:l,distance:f*.1,phi:1.2,theta:0,fov:Math.PI/4,near:f*.001,far:f*10});return d.then(()=>s.destroy()),{createCameraController:h,bounds:a,dataRange:f,center:l,cameraController:s}},inputs:["metadata","canvas","invalidation"],outputs:["createCameraController","bounds","dataRange","center","cameraController"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(n,u,d,h,a,f)=>{const l=`
struct Uniforms {
  projectionView: mat4x4f,
  pointSize: f32,
  brightness: f32,
  aspectRatio: f32,
  cameraDistance: f32,
  referenceDistance: f32,
  referencePointSize: f32,
  minRedshift: f32,      // User-selected min z for filtering
  maxRedshift: f32,      // User-selected max z for filtering
  galaxyZMin: f32,       // Galaxy z range for decoding color_param
  galaxyZMax: f32,
  qsoZMin: f32,          // QSO z range for decoding color_param
  qsoZMax: f32,
  showGalaxies: f32,     // 1.0 = show, 0.0 = hide
  showQSOs: f32,         // 1.0 = show, 0.0 = hide
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) redshift: f32,
  @location(1) uv: vec2f,
}

// Quad vertices for triangle strip: 4 vertices make a quad
const quadVertices = array<vec2f, 4>(
  vec2f(-1.0, -1.0),
  vec2f( 1.0, -1.0),
  vec2f(-1.0,  1.0),
  vec2f( 1.0,  1.0)
);

@vertex
fn vertexMain(
  @builtin(vertex_index) vertexIndex: u32,
  // Instance data: float16x4 (x, y, z, normalized_redshift)
  @location(0) instanceData: vec4<f32>
) -> VertexOutput {
  var output: VertexOutput;

  // Get quad corner from vertex index
  let corner = quadVertices[vertexIndex];

  // Transform galaxy position to clip space
  let worldPos = vec4f(instanceData.xyz, 1.0);
  let clipPos = uniforms.projectionView * worldPos;

  // Expand quad in screen space (size in pixels)
  let size = uniforms.pointSize / vec2f(uniforms.aspectRatio, 1.0);
  let offset = corner * size * clipPos.w * 0.001;

  output.position = clipPos + vec4f(offset, 0.0, 0.0);
  output.redshift = instanceData.w;
  output.uv = corner;

  return output;
}

// Color by object type and redshift using the precomputed color_param:
// [0, 0.5): galaxies — warm white (nearby) → red (distant)
// [0.5, 1.0]: quasars — bright blue (nearby) → orange-red (distant)
fn objectColor(colorParam: f32) -> vec3f {
  if (colorParam < 0.5) {
// Galaxies: warm off-white to red (original brightness)
let t = colorParam * 2.0;
let white = vec3f(1.0, 0.95, 0.9);
let red = vec3f(1.0, 0.15, 0.05);
return mix(white, red, pow(t, 0.6));
  } else {
// Quasars: bright blue to orange-red (10x brighter to stand out)
let t = (colorParam - 0.5) * 2.0;
let blue = vec3f(4.0, 7.0, 10.0);
let red = vec3f(10.0, 4.0, 1.0);
return mix(blue, red, pow(t, 0.5));
  }
}

// Decode color_param back to actual redshift for filtering
fn decodeRedshift(colorParam: f32) -> f32 {
  if (colorParam < 0.5) {
// Galaxy: decode from [0, 0.5) range
let t = colorParam * 2.0;
return uniforms.galaxyZMin + t * (uniforms.galaxyZMax - uniforms.galaxyZMin);
  } else {
// QSO: decode from [0.5, 1.0] range
let t = (colorParam - 0.5) * 2.0;
return uniforms.qsoZMin + t * (uniforms.qsoZMax - uniforms.qsoZMin);
  }
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  // Filter by object type (colorParam < 0.5 = galaxy, >= 0.5 = QSO)
  let isGalaxy = input.redshift < 0.5;
  if (isGalaxy && uniforms.showGalaxies < 0.5) { discard; }
  if (!isGalaxy && uniforms.showQSOs < 0.5) { discard; }

  // Decode color_param to actual redshift and filter
  let z = decodeRedshift(input.redshift);
  if (z < uniforms.minRedshift || z > uniforms.maxRedshift) {
discard;
  }

  // For sub-pixel points, skip shape calculations
  var falloff = 1.0;
  if (uniforms.pointSize >= 1.0) {
let dist2 = dot(input.uv, input.uv);
if (dist2 > 1.0) {
  discard;
}
let t = 1.0 - dist2;
falloff = t * t;
  }

  // Scale brightness by camera distance to maintain perceived brightness when zooming
  // As we zoom out, points become denser on screen, so reduce brightness to compensate
  // Use gamma-aware scaling: perceived brightness ~ luminance^(1/gamma)
  let distanceRatio = uniforms.cameraDistance / uniforms.referenceDistance;
  let distanceScale = pow(distanceRatio, -0.9);  // Inverse: dimmer when zoomed out

  // Compensate for point size: use linear scaling rather than area (size²)
  // because the gaussian falloff concentrates perceived brightness at the center
  let sizeRatio = uniforms.pointSize / uniforms.referencePointSize;
  let sizeScale = 1.0 / sizeRatio;

  let color = objectColor(input.redshift);
  let intensity = uniforms.brightness * falloff * distanceScale * sizeScale;

  return vec4f(color * intensity, intensity);
}
`,s=n.createShaderModule({label:"galaxy-shader",code:l}),r=n.createBuffer({label:"galaxy-uniforms",size:128,usage:u.UNIFORM|u.COPY_DST}),c=n.createBindGroupLayout({entries:[{binding:0,visibility:d.VERTEX|d.FRAGMENT,buffer:{type:"uniform"}}]}),y=n.createBindGroup({layout:c,entries:[{binding:0,resource:{buffer:r}}]}),e=n.createPipelineLayout({bindGroupLayouts:[c]}),x=n.createRenderPipeline({label:"galaxy-quad-pipeline",layout:e,vertex:{module:s,entryPoint:"vertexMain",buffers:[{arrayStride:8,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float16x4"}]}]},fragment:{module:s,entryPoint:"fragmentMain",targets:[{format:"rgba16float",blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-strip"}}),v=`
struct Uniforms {
  projectionView: mat4x4f,
  pointSize: f32,
  brightness: f32,
  aspectRatio: f32,
  cameraDistance: f32,
  referenceDistance: f32,
  referencePointSize: f32,
  minRedshift: f32,
  maxRedshift: f32,
  galaxyZMin: f32,
  galaxyZMax: f32,
  qsoZMin: f32,
  qsoZMax: f32,
  showGalaxies: f32,
  showQSOs: f32,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) redshift: f32,
}

@vertex
fn vertexMain(@location(0) data: vec4<f32>) -> VertexOutput {
  var output: VertexOutput;
  output.position = uniforms.projectionView * vec4f(data.xyz, 1.0);
  output.redshift = data.w;
  return output;
}

fn objectColor(colorParam: f32) -> vec3f {
  if (colorParam < 0.5) {
let t = colorParam * 2.0;
let white = vec3f(1.0, 0.95, 0.9);
let red = vec3f(1.0, 0.15, 0.05);
return mix(white, red, pow(t, 0.6));
  } else {
let t = (colorParam - 0.5) * 2.0;
let blue = vec3f(4.0, 7.0, 10.0);
let red = vec3f(10.0, 4.0, 1.0);
return mix(blue, red, pow(t, 0.5));
  }
}

fn decodeRedshift(colorParam: f32) -> f32 {
  if (colorParam < 0.5) {
let t = colorParam * 2.0;
return uniforms.galaxyZMin + t * (uniforms.galaxyZMax - uniforms.galaxyZMin);
  } else {
let t = (colorParam - 0.5) * 2.0;
return uniforms.qsoZMin + t * (uniforms.qsoZMax - uniforms.qsoZMin);
  }
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let isGalaxy = input.redshift < 0.5;
  if (isGalaxy && uniforms.showGalaxies < 0.5) { discard; }
  if (!isGalaxy && uniforms.showQSOs < 0.5) { discard; }

  let z = decodeRedshift(input.redshift);
  if (z < uniforms.minRedshift || z > uniforms.maxRedshift) { discard; }

  let distanceRatio = uniforms.cameraDistance / uniforms.referenceDistance;
  let distanceScale = pow(distanceRatio, -0.9);
  let sizeRatio = uniforms.pointSize / uniforms.referencePointSize;
  let sizeScale = 1.0 / sizeRatio;

  let color = objectColor(input.redshift);
  let intensity = uniforms.brightness * distanceScale * sizeScale;

  return vec4f(color * intensity, intensity);
}
`,M=n.createShaderModule({label:"galaxy-point-shader",code:v}),t=n.createRenderPipeline({label:"galaxy-point-pipeline",layout:e,vertex:{module:M,entryPoint:"vertexMain",buffers:[{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:0,offset:0,format:"float16x4"}]}]},fragment:{module:M,entryPoint:"fragmentMain",targets:[{format:"rgba16float",blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"point-list"}}),p=`
@group(0) @binding(0) var hdrTexture: texture_2d<f32>;
@group(0) @binding(1) var texSampler: sampler;
@group(0) @binding(2) var<uniform> tonemapParams: vec4f;  // x=exposure, y=whitePoint, z/w unused

const backgroundColor = vec3f(0.106, 0.090, 0.078);  // #1B1714

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  // Fullscreen triangle
  var pos = array<vec2f, 3>(
vec2f(-1.0, -1.0),
vec2f( 3.0, -1.0),
vec2f(-1.0,  3.0)
  );
  var output: VertexOutput;
  output.position = vec4f(pos[vertexIndex], 0.0, 1.0);
  output.uv = (pos[vertexIndex] + 1.0) * 0.5;
  output.uv.y = 1.0 - output.uv.y;  // Flip Y for texture coordinates
  return output;
}

// Extended Reinhard tonemap on scalar: x * (1 + x/white²) / (1 + x)
fn reinhardExtendedLuminance(x: f32, white: f32) -> f32 {
  let white2 = white * white;
  return x * (1.0 + x / white2) / (1.0 + x);
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let hdr = textureSample(hdrTexture, texSampler, input.uv);

  let exposure = tonemapParams.x;
  let whitePoint = tonemapParams.y;

  // Apply exposure
  let exposed = hdr.rgb * exposure;

  // Compute luminance (Rec. 709 coefficients)
  let luminance = dot(exposed, vec3f(0.2126, 0.7152, 0.0722));

  // Tonemap luminance only, then scale color to preserve saturation
  let tonemappedLum = reinhardExtendedLuminance(luminance, whitePoint);
  let scale = select(tonemappedLum / luminance, 0.0, luminance < 0.0001);
  let ldr = exposed * scale;

  // Add tonemapped light over background
  return vec4f(backgroundColor + ldr, 1.0);
}
`,i=n.createShaderModule({label:"tonemap-shader",code:p}),o=n.createBuffer({label:"tonemap-uniforms",size:16,usage:u.UNIFORM|u.COPY_DST}),g=n.createBindGroupLayout({entries:[{binding:0,visibility:d.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:d.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:d.FRAGMENT,buffer:{type:"uniform"}}]}),w=n.createPipelineLayout({bindGroupLayouts:[g]}),z=n.createRenderPipeline({label:"tonemap-pipeline",layout:w,vertex:{module:i,entryPoint:"vertexMain"},fragment:{module:i,entryPoint:"fragmentMain",targets:[{format:h}]},primitive:{topology:"triangle-list"}}),R=n.createSampler({magFilter:"linear",minFilter:"linear"}),b={texture:null,bindGroup:null,width:0,height:0};function P(m,C){b.width===m&&b.height===C&&b.texture||(b.texture&&b.texture.destroy(),b.texture=n.createTexture({label:"hdr-texture",size:[m,C],format:"rgba16float",usage:a.RENDER_ATTACHMENT|a.TEXTURE_BINDING}),b.bindGroup=n.createBindGroup({layout:g,entries:[{binding:0,resource:b.texture.createView()},{binding:1,resource:R},{binding:2,resource:{buffer:o}}]}),b.width=m,b.height=C)}return f.then(()=>{r.destroy(),o.destroy(),b.texture&&b.texture.destroy()}),{shaderCode:l,shaderModule:s,uniformBuffer:r,bindGroupLayout:c,bindGroup:y,pipelineLayout:e,quadPipeline:x,pointShaderCode:v,pointShaderModule:M,pointPipeline:t,tonemapShaderCode:p,tonemapShaderModule:i,tonemapUniformBuffer:o,tonemapBindGroupLayout:g,tonemapPipelineLayout:w,tonemapPipeline:z,hdrSampler:R,hdrState:b,ensureHdrTexture:P}},inputs:["device","GPUBufferUsage","GPUShaderStage","canvasFormat","GPUTextureUsage","invalidation"],outputs:["shaderCode","shaderModule","uniformBuffer","bindGroupLayout","bindGroup","pipelineLayout","quadPipeline","pointShaderCode","pointShaderModule","pointPipeline","tonemapShaderCode","tonemapShaderModule","tonemapUniformBuffer","tonemapBindGroupLayout","tonemapPipelineLayout","tonemapPipeline","hdrSampler","hdrState","ensureHdrTexture"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:async(n,u,d,h,a,f,l,s,r,c,y,e,x,v,M,t,p,i,o,g,w,z,R)=>{const{createFrameLoop:b}=await F(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(T=>{if(!("createFrameLoop"in T))throw new SyntaxError("export 'createFrameLoop' not found");return T});f.dirty=!0;const P=new ArrayBuffer(128),m=new Float32Array(P),[C,I]=l.galaxyRedshiftRange,[D,_]=l.qsoRedshiftRange,E=new Float32Array(4),G=s*.8,B=b(()=>{const T=r.width/r.height,{projectionView:A,dirty:V}=c.update(T);if(!f.dirty&&!V||!y.chunks.some(k=>k!==null))return;e(r.width,r.height),m.set(A,0),m[16]=n*x,m[17]=.5,m[18]=T,m[19]=c.state.distance,m[20]=G,m[21]=2*x,m[22]=h[0],m[23]=h[1],m[24]=C,m[25]=I,m[26]=D,m[27]=_,m[28]=a.includes("Galaxies")?1:0,m[29]=a.includes("QSOs")?1:0,v.queue.writeBuffer(M,0,P);const O=v.createCommandEncoder(),L=O.beginRenderPass({colorAttachments:[{view:t.texture.createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]}),$=n*x<1;L.setPipeline($?p:i),L.setBindGroup(0,o);for(const k of y.chunks)k&&(L.setVertexBuffer(0,k.buffer),$?L.draw(k.count):L.draw(4,k.count));L.end(),E[0]=u,E[1]=d,v.queue.writeBuffer(g,0,E);const q=O.beginRenderPass({colorAttachments:[{view:w.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.106,g:.09,b:.078,a:1}}]});q.setPipeline(z),q.setBindGroup(0,t.bindGroup),q.draw(3),q.end(),v.queue.submit([O.finish()]),f.dirty=!1});return R.then(()=>B.cancel()),{createFrameLoop:b,uniformData:P,uniformF32:m,galaxyZMin:C,galaxyZMax:I,qsoZMin:D,qsoZMax:_,tonemapData:E,referenceDistance:G,loop:B}},inputs:["pointSize","exposure","whitePoint","redshiftRange","objectTypes","renderState","metadata","dataRange","canvas","cameraController","loadState","ensureHdrTexture","dpr","device","uniformBuffer","hdrState","pointPipeline","quadPipeline","bindGroup","tonemapUniformBuffer","gpuContext","tonemapPipeline","invalidation"],outputs:["createFrameLoop","uniformData","uniformF32","galaxyZMin","galaxyZMax","qsoZMin","qsoZMax","tonemapData","referenceDistance","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(n,u)=>n`## Data and methods

Data was fetched from [SDSS DR18](https://skyserver.sdss.org/dr18/) using [astroquery](https://astroquery.readthedocs.io/). The query selects spectroscopically-confirmed objects from the SpecObj table, filtered by object class with \`zWarning=0\`. Queries are split into redshift bins to stay under SDSS's 500k row limit. The query looks roughly like:

\`\`\`
from astroquery.sdss import SDSS
from astropy.cosmology import Planck18 as cosmo

result = SDSS.query_sql("""
  SELECT s.ra, s.dec, s.z FROM SpecObj s
  WHERE s.class = 'GALAXY'
AND s.z BETWEEN 0.02 AND 0.08
AND s.zWarning = 0
""")
distance = cosmo.comoving_distance(result['z']).to('Mpc').value
\`\`\`

Obtaining the data was surprisingly easy.

Redshifts are converted to 3D Cartesian coordinates using [Astropy](https://www.astropy.org/)'s [Planck 2018](https://arxiv.org/abs/1807.06209) cosmology. Comoving distance ${u`d`} in Mpc is computed from redshift ${u`z`}, then projected: ${u`x = d \cos(\delta)\cos(\alpha)`}, ${u`y = d \cos(\delta)\sin(\alpha)`}, ${u`z = d \sin(\delta)`}, where ${u`\alpha`} and ${u`\delta`} are right ascension and declination.

Each object is stored as four float16 values (x, y, z, color_param). The color parameter encodes both object type and redshift: galaxies map to [0, 0.5) and QSOs to [0.5, 1.0], allowing the shader to distinguish types and interpolate colors. Data is gzip-compressed and loaded progressively by redshift range. It would probably be more efficient to work out positions in the browser, but I opted instead to do the work up front and transfer data in a format that would allow directly uploading to the GPU and piping to the screen.

Rendering uses WebGPU with HDR accumulation and tonemapping. Points are rendered as single-pixel point primitives (there was some quad sprite rendering in place for larger points, but single points seem fine when you have 3M points!). To maintain consistent perceived brightness across zoom levels and point sizes, the shader scales intensity inversely with both camera distance and point size. Without this correction, zooming out would cause the image to blow out as millions of points overlap, while zooming in would make sparse regions too dim.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});
