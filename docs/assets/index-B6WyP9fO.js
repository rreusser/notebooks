import{d as S,_ as F}from"./index-ByB2dbry.js";S({root:document.getElementById("cell-1"),expanded:[],variables:[]},{id:1,body:(o,a)=>o`

I got inspired this evening when I learned of the [Boötes Void](https://en.wikipedia.org/wiki/Bo%C3%B6tes_Void), a.k.a. the Great Nothing, a massive void in the distribution of galaxies nearly *two hundred million light years* across which contains just 60 galaxies where we'd expect about 2,000.

I thought it would be neat to visualize some galaxies, so I looked into how to acquire data from the [Sloan Digital Sky Survey](https://www.sdss.org/) (SDSS). The [astroquery](https://astroquery.readthedocs.io/en/latest/) module made pretty short work of it, so this notebook plots over 2.3 million galaxies (redshift ${a`z \lesssim 0.7`}) and 750,000 [quasars](https://esahubble.org/wordbank/quasar/) (QSOs) extending to ${a`z \approx 7`}. Data loads progressively in chunks.

Objects are colored by type and redshift. Galaxies range from white (nearby) to red (distant). Quasars appear blue (nearby) fading to red at high redshift. The filamentary structure visible in the nearby universe is the [cosmic web](https://science.nasa.gov/resource/cosmic-web/). Galaxies cluster along dense filaments and sheets surrounding vast, nearly empty voids. At greater distances, the quasar population traces the large-scale structure of the universe across cosmic time, with the most distant objects showing us the universe when it was less than a billion years old.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});S({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async o=>{const{createWebGPUContext:a}=await F(()=>import("./webgpu-canvas-C7AS78hn.js"),[]).then(r=>{if(!("createWebGPUContext"in r))throw new SyntaxError("export 'createWebGPUContext' not found");return r}),{device:d,canvasFormat:h}=await a({optionalFeatures:["shader-f16"]});return o.then(()=>d.destroy()),{createWebGPUContext:a,device:d,canvasFormat:h}},inputs:["invalidation"],outputs:["createWebGPUContext","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(o,a,d,h,r,p,l)=>{const s=o.hostname==="rreusser.github.io"?"https://raw.githubusercontent.com/rreusser/notebooks/main/src/visualizing-sloan-digital-sky-survey-data":".",u=await fetch(`${s}/objects.json`).then(t=>t.json());function c(t){const f=t>>15&1,i=t>>10&31,n=t&1023;return i===0?(f?-1:1)*Math.pow(2,-14)*(n/1024):i===31?n?NaN:f?-1/0:1/0:(f?-1:1)*Math.pow(2,i-15)*(1+n/1024)}const y=1,e=100,x={queue:[],inFlight:new Set,promises:new Map,chunks:new Array(u.chunks.length).fill(null),loadedCount:0,distanceHistogram:new Uint32Array(e),maxDistance:0,request(t){if(this.chunks[t])return Promise.resolve(this.chunks[t]);if(this.promises.has(t))return this.promises.get(t).promise;let f,i;const n=new Promise((m,b)=>{f=m,i=b});return this.promises.set(t,{promise:n,resolve:f,reject:i}),this.queue.push(t),this.processQueue(),n},processQueue(){for(;this.queue.length>0&&this.inFlight.size<y;){const t=this.queue.shift();this.chunks[t]||this.inFlight.has(t)||(this.inFlight.add(t),this.loadChunk(t))}},async loadChunk(t){const f=u.chunks[t];try{const i=await fetch(`${s}/${f.file}`);let n;if(f.file.endsWith(".gz")&&s!=="."){const g=new a("gzip"),C=i.body.pipeThrough(g);n=await new d(C).arrayBuffer()}else n=await i.arrayBuffer();const m=new Uint16Array(n),b=h.createBuffer({label:`galaxy-chunk-${t}`,size:n.byteLength,usage:r.VERTEX|r.COPY_DST});h.queue.writeBuffer(b,0,m);const z=Math.max(Math.abs(u.bounds.min[0]),Math.abs(u.bounds.max[0]),Math.abs(u.bounds.min[1]),Math.abs(u.bounds.max[1]),Math.abs(u.bounds.min[2]),Math.abs(u.bounds.max[2]))*1.5;z>this.maxDistance&&(this.maxDistance=z);for(let g=0;g<m.length;g+=4){const C=c(m[g]),D=c(m[g+1]),L=c(m[g+2]),_=Math.sqrt(C*C+D*D+L*L),E=Math.min(e-1,Math.floor(_/z*e));this.distanceHistogram[E]++}const R={buffer:b,count:f.count};this.chunks[t]=R,this.loadedCount+=R.count,this.inFlight.delete(t);const{resolve:v}=this.promises.get(t);v(R),p.dirty=!0;const P=f.objectClass==="QSO"?"QSOs":"galaxies";console.log(`Loaded chunk ${t+1}/${u.chunks.length}: ${R.count.toLocaleString()} ${P} (z=${f.redshiftRange[0]}-${f.redshiftRange[1]})`),this.processQueue()}catch(i){this.inFlight.delete(t);const{reject:n}=this.promises.get(t);n(i),this.processQueue()}}};function w(t){for(let i=0;i<u.chunks.length;i++){const[n]=u.chunks[i].redshiftRange;n<t-.001&&x.request(i)}}const M={get loadedCount(){return x.loadedCount},get totalCount(){return u.totalCount},get chunks(){return x.chunks},get loadingIndices(){return x.inFlight}};return w(.3),l.then(()=>{for(const t of x.chunks)t&&t.buffer.destroy()}),{dataBaseUrl:s,metadata:u,decodeFloat16:c,CONCURRENCY:y,NUM_DISTANCE_BINS:e,chunkLoader:x,loadChunksForRedshift:w,loadState:M}},inputs:["location","DecompressionStream","Response","device","GPUBufferUsage","renderState","invalidation"],outputs:["dataBaseUrl","metadata","decodeFloat16","CONCURRENCY","NUM_DISTANCE_BINS","chunkLoader","loadChunksForRedshift","loadState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:async(o,a,d,h,r,p)=>{const{expandable:l}=await F(()=>import("./expandable-B9qjFRA-.js"),[]).then(i=>{if(!("expandable"in i))throw new SyntaxError("export 'expandable' not found");return i}),s=window.devicePixelRatio||1,u=1200,c=Math.min(u,window.innerWidth-40),y=Math.round(c*.7),e=document.createElement("canvas");e.id="sdss-canvas",e.width=Math.floor(c*s),e.height=Math.floor(y*s),e.style.width=`${c}px`,e.style.height=`${y}px`,e.style.maxWidth="none",e.style.height="auto",e.style.aspectRatio=`${c} / ${y}`,e.style.background="#1B1714";const x=e.getContext("webgpu");x.configure({device:o,format:a,alphaMode:"premultiplied"});const w={dirty:!0},M=d`<figure style="margin: 0; max-width: none;" id="sdss-figure">
  ${e}
</figure>`;function t(){const i=window.innerWidth,n=Math.min(u,i-40),m=Math.round(n*.7),z=((document.querySelector(".observablehq--cell")?.offsetWidth||840)-n)/2;M.style.width=n+"px",M.style.marginLeft=z+"px",e.style.width=n+"px",e.style.height=m+"px"}t(),window.addEventListener("resize",t),h.then(()=>window.removeEventListener("resize",t)),r(l(M,{width:c,height:y,controls:".sdss-controls",onResize(i,n,m){e.width=Math.floor(n*s),e.height=Math.floor(m*s),e.style.width=`${n}px`,e.style.height=`${m}px`,x.configure({device:o,format:a,alphaMode:"premultiplied"}),w.dirty=!0}}));const f=new p(i=>{for(const n of i){const m=n.contentRect,b=Math.floor(m.width),z=Math.floor(m.height);b>0&&z>0&&(e.width=Math.floor(b*s),e.height=Math.floor(z*s),x.configure({device:o,format:a,alphaMode:"premultiplied"}),w.dirty=!0)}});return f.observe(e),h.then(()=>f.disconnect()),{expandable:l,dpr:s,maxWidth:u,initialWidth:c,initialHeight:y,canvas:e,gpuContext:x,renderState:w,figure:M,updateFigureLayout:t,resizeObserver:f}},inputs:["device","canvasFormat","html","invalidation","display","ResizeObserver"],outputs:["expandable","dpr","maxWidth","initialWidth","initialHeight","canvas","gpuContext","renderState","figure","updateFigureLayout","resizeObserver"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(o,a)=>{const{interval:d}=await F(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(h=>{const r={},p=o.module(h.default),l=o.module();if(!p.defines("interval"))throw new SyntaxError("export 'interval' not found");return l.variable(r.interval=a()).import("interval",p),r});return{interval:d}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["interval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(o,a,d,h,r,p)=>{const l=o`<div class="sdss-controls"></div>`;function s(b){return l.appendChild(b),a.input(b)}const u=d.range([.5,8],{value:1,label:"Point size",step:.1,transform:Math.log}),c=s(u),y=d.range([.01,1],{value:.05,label:"Exposure",step:.001,transform:Math.log}),e=s(y),x=d.range([1,50],{value:20,label:"White point",step:.1,transform:Math.log}),w=s(x),M=d.checkbox(["Galaxies","QSOs"],{value:["Galaxies"],label:"Show"}),t=s(M),f=Math.min(h.galaxyRedshiftRange[0],h.qsoRedshiftRange[0]),i=h.qsoRedshiftRange[1],n=r([+f.toFixed(2),+i.toFixed(1)],{value:[+f.toFixed(2),.3],step:.01,label:"Redshift (z)",transform:Math.log}),m=s(n);return p(l),{controlsContainer:l,ctrl:s,pointSizeInput:u,pointSize:c,exposureInput:y,exposure:e,whitePointInput:x,whitePoint:w,objectTypesInput:M,objectTypes:t,zMin:f,zMax:i,redshiftRangeInput:n,redshiftRange:m}},inputs:["html","Generators","Inputs","metadata","interval","display"],outputs:["controlsContainer","ctrl","pointSizeInput","pointSize","exposureInput","exposure","whitePointInput","whitePoint","objectTypesInput","objectTypes","zMin","zMax","redshiftRangeInput","redshiftRange"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(o,a,d,h)=>{const r=[[0,0],[.02,85],[.05,212],[.1,421],[.15,627],[.2,828],[.25,1025],[.3,1219],[.4,1596],[.5,1960],[.6,2311],[.7,2650],[.8,2977],[1,3395],[2,5765],[5,8715],[10,1e4],[1100,46500]];function p(i){for(let n=1;n<r.length;n++)if(i<=r[n][0]){const[m,b]=r[n-1],[z,R]=r[n],v=(i-m)/(z-m);return b+v*(R-b)}return r[r.length-1][1]}const l=[[0,0],[.02,.27],[.05,.67],[.1,1.29],[.2,2.45],[.3,3.45],[.4,4.32],[.5,5.08],[.6,5.75],[.7,6.34],[.8,6.87],[1,7.79],[2,10.4],[3,11.5],[4,12.1],[5,12.5],[6,12.8],[7,13],[10,13.3],[1100,13.8]];function s(i){for(let n=1;n<l.length;n++)if(i<=l[n][0]){const[m,b]=l[n-1],[z,R]=l[n],v=(i-m)/(z-m);return b+v*(R-b)}return l[l.length-1][1]}const u=13.8,[c,y]=o,e=p(c),x=p(y),w=s(c),M=s(y),t=i=>i>=1e3?`${(i/1e3).toFixed(2)} Gpc`:`${i.toFixed(0)} Mpc`,f=i=>i.toFixed(2);return a(d`<p style="font-size: 14px; color: var(--theme-foreground-muted); line-height: 1.6; max-width: 640px;">
<strong>Current selection:</strong> ${h`z = ${c.toFixed(2)}`} to ${h`z = ${y.toFixed(2)}`}<br>
<strong>Comoving distance:</strong> ${t(e)} to ${t(x)}<br>
<strong>Lookback time:</strong> ${f(w)} to ${f(M)} billion years ago
</p>`),{comovingDistanceTable:r,zToComovingDistance:p,lookbackTimeTable:l,zToLookbackTime:s,UNIVERSE_AGE:u,zLo:c,zHi:y,dLo:e,dHi:x,tLo:w,tHi:M,formatDist:t,formatTime:f}},inputs:["redshiftRange","display","html","tex"],outputs:["comovingDistanceTable","zToComovingDistance","lookbackTimeTable","zToLookbackTime","UNIVERSE_AGE","zLo","zHi","dLo","dHi","tLo","tHi","formatDist","formatTime"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(o,a)=>{a(o[1])},inputs:["redshiftRange","loadChunksForRedshift"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(o,a,d,h,r)=>{const p=o`<div style="font-size: 14px; color: var(--theme-foreground-muted); margin-top: 8px;"></div>`;a(p);let l=0,s=0;const u=setInterval(()=>{const c=d.loadingIndices.size>0;(d.loadedCount!==l||d.loadingIndices.size!==s)&&(l=d.loadedCount,s=d.loadingIndices.size,c?p.textContent=`Loading... ${d.loadedCount.toLocaleString()} objects loaded`:p.textContent=`Loaded ${d.loadedCount.toLocaleString()} objects (${h.galaxyCount.toLocaleString()} galaxies, ${h.qsoCount.toLocaleString()} QSOs)`)},100);return r.then(()=>clearInterval(u)),{progressEl:p,lastLoaded:l,lastLoadingSize:s,updateInterval:u}},inputs:["html","display","loadState","metadata","invalidation"],outputs:["progressEl","lastLoaded","lastLoadingSize","updateInterval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(o,a,d,h,r,p)=>{const l=o`<div id="histogram-container" style="max-width: 640px;"></div>`;a(l);let s=0;const u=setInterval(()=>{if(d.loadedCount===s)return;s=d.loadedCount;const c=d.maxDistance/h,y=Array.from(d.distanceHistogram,(e,x)=>({distance:(x+.5)*c,count:e})).filter(e=>e.count>0);l.innerHTML="",l.appendChild(r.plot({width:640,height:200,marginLeft:60,x:{label:"Distance (Mpc)",tickFormat:e=>e>=1e3?`${(e/1e3).toFixed(1)}k`:e},y:{label:"Object count",tickFormat:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e},marks:[r.rectY(y,{x1:e=>e.distance-c/2,x2:e=>e.distance+c/2,y:"count",fill:"#4a9eff"}),r.ruleY([0])]}))},200);return p.then(()=>clearInterval(u)),{histogramContainer:l,lastCount:s,histogramInterval:u}},inputs:["html","display","chunkLoader","NUM_DISTANCE_BINS","Plot","invalidation"],outputs:["histogramContainer","lastCount","histogramInterval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(o,a,d)=>{const{createCameraController:h}=await F(()=>import("./camera-controller-pVrqfLYf.js"),[]).then(u=>{if(!("createCameraController"in u))throw new SyntaxError("export 'createCameraController' not found");return u}),r=o.bounds,p=Math.max(r.max[0]-r.min[0],r.max[1]-r.min[1],r.max[2]-r.min[2]),l=[0,0,0],s=h(a,{center:l,distance:p*.1,phi:1.2,theta:0,fov:Math.PI/4,near:p*.001,far:p*10});return d.then(()=>s.destroy()),{createCameraController:h,bounds:r,dataRange:p,center:l,cameraController:s}},inputs:["metadata","canvas","invalidation"],outputs:["createCameraController","bounds","dataRange","center","cameraController"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(o,a,d,h,r,p)=>{const l=`
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
`,s=o.createShaderModule({label:"galaxy-shader",code:l}),u=o.createBuffer({label:"galaxy-uniforms",size:128,usage:a.UNIFORM|a.COPY_DST}),c=o.createBindGroupLayout({entries:[{binding:0,visibility:d.VERTEX|d.FRAGMENT,buffer:{type:"uniform"}}]}),y=o.createBindGroup({layout:c,entries:[{binding:0,resource:{buffer:u}}]}),e=o.createPipelineLayout({bindGroupLayouts:[c]}),x=o.createRenderPipeline({label:"galaxy-quad-pipeline",layout:e,vertex:{module:s,entryPoint:"vertexMain",buffers:[{arrayStride:8,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float16x4"}]}]},fragment:{module:s,entryPoint:"fragmentMain",targets:[{format:"rgba16float",blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-strip"}}),w=`
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
`,M=o.createShaderModule({label:"galaxy-point-shader",code:w}),t=o.createRenderPipeline({label:"galaxy-point-pipeline",layout:e,vertex:{module:M,entryPoint:"vertexMain",buffers:[{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:0,offset:0,format:"float16x4"}]}]},fragment:{module:M,entryPoint:"fragmentMain",targets:[{format:"rgba16float",blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"point-list"}}),f=`
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
`,i=o.createShaderModule({label:"tonemap-shader",code:f}),n=o.createBuffer({label:"tonemap-uniforms",size:16,usage:a.UNIFORM|a.COPY_DST}),m=o.createBindGroupLayout({entries:[{binding:0,visibility:d.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:d.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:d.FRAGMENT,buffer:{type:"uniform"}}]}),b=o.createPipelineLayout({bindGroupLayouts:[m]}),z=o.createRenderPipeline({label:"tonemap-pipeline",layout:b,vertex:{module:i,entryPoint:"vertexMain"},fragment:{module:i,entryPoint:"fragmentMain",targets:[{format:h}]},primitive:{topology:"triangle-list"}}),R=o.createSampler({magFilter:"linear",minFilter:"linear"}),v={texture:null,bindGroup:null,width:0,height:0};function P(g,C){v.width===g&&v.height===C&&v.texture||(v.texture&&v.texture.destroy(),v.texture=o.createTexture({label:"hdr-texture",size:[g,C],format:"rgba16float",usage:r.RENDER_ATTACHMENT|r.TEXTURE_BINDING}),v.bindGroup=o.createBindGroup({layout:m,entries:[{binding:0,resource:v.texture.createView()},{binding:1,resource:R},{binding:2,resource:{buffer:n}}]}),v.width=g,v.height=C)}return p.then(()=>{u.destroy(),n.destroy(),v.texture&&v.texture.destroy()}),{shaderCode:l,shaderModule:s,uniformBuffer:u,bindGroupLayout:c,bindGroup:y,pipelineLayout:e,quadPipeline:x,pointShaderCode:w,pointShaderModule:M,pointPipeline:t,tonemapShaderCode:f,tonemapShaderModule:i,tonemapUniformBuffer:n,tonemapBindGroupLayout:m,tonemapPipelineLayout:b,tonemapPipeline:z,hdrSampler:R,hdrState:v,ensureHdrTexture:P}},inputs:["device","GPUBufferUsage","GPUShaderStage","canvasFormat","GPUTextureUsage","invalidation"],outputs:["shaderCode","shaderModule","uniformBuffer","bindGroupLayout","bindGroup","pipelineLayout","quadPipeline","pointShaderCode","pointShaderModule","pointPipeline","tonemapShaderCode","tonemapShaderModule","tonemapUniformBuffer","tonemapBindGroupLayout","tonemapPipelineLayout","tonemapPipeline","hdrSampler","hdrState","ensureHdrTexture"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:async(o,a,d,h,r,p,l,s,u,c,y,e,x,w,M,t,f,i,n,m,b,z,R)=>{const{createFrameLoop:v}=await F(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(T=>{if(!("createFrameLoop"in T))throw new SyntaxError("export 'createFrameLoop' not found");return T});p.dirty=!0;const P=new ArrayBuffer(128),g=new Float32Array(P),[C,D]=l.galaxyRedshiftRange,[L,_]=l.qsoRedshiftRange,E=new Float32Array(4),B=s*.8,G=v(()=>{const T=u.width/u.height,{projectionView:j,dirty:V}=c.update(T);if(!p.dirty&&!V||!y.chunks.some(I=>I!==null))return;e(u.width,u.height),g.set(j,0),g[16]=o*x,g[17]=.5,g[18]=T,g[19]=c.state.distance,g[20]=B,g[21]=2*x,g[22]=h[0],g[23]=h[1],g[24]=C,g[25]=D,g[26]=L,g[27]=_,g[28]=r.includes("Galaxies")?1:0,g[29]=r.includes("QSOs")?1:0,w.queue.writeBuffer(M,0,P);const O=w.createCommandEncoder(),k=O.beginRenderPass({colorAttachments:[{view:t.texture.createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]}),$=o*x<1;k.setPipeline($?f:i),k.setBindGroup(0,n);for(const I of y.chunks)I&&(k.setVertexBuffer(0,I.buffer),$?k.draw(I.count):k.draw(4,I.count));k.end(),E[0]=a,E[1]=d,w.queue.writeBuffer(m,0,E);const q=O.beginRenderPass({colorAttachments:[{view:b.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.106,g:.09,b:.078,a:1}}]});q.setPipeline(z),q.setBindGroup(0,t.bindGroup),q.draw(3),q.end(),w.queue.submit([O.finish()]),p.dirty=!1});return R.then(()=>G.cancel()),{createFrameLoop:v,uniformData:P,uniformF32:g,galaxyZMin:C,galaxyZMax:D,qsoZMin:L,qsoZMax:_,tonemapData:E,referenceDistance:B,loop:G}},inputs:["pointSize","exposure","whitePoint","redshiftRange","objectTypes","renderState","metadata","dataRange","canvas","cameraController","loadState","ensureHdrTexture","dpr","device","uniformBuffer","hdrState","pointPipeline","quadPipeline","bindGroup","tonemapUniformBuffer","gpuContext","tonemapPipeline","invalidation"],outputs:["createFrameLoop","uniformData","uniformF32","galaxyZMin","galaxyZMax","qsoZMin","qsoZMax","tonemapData","referenceDistance","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});S({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(o,a)=>o`## Data and methods

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

Redshifts are converted to 3D Cartesian coordinates using [Astropy](https://www.astropy.org/)'s [Planck 2018](https://arxiv.org/abs/1807.06209) cosmology. Comoving distance ${a`d`} in Mpc is computed from redshift ${a`z`}, then projected: ${a`x = d \cos(\delta)\cos(\alpha)`}, ${a`y = d \cos(\delta)\sin(\alpha)`}, ${a`z = d \sin(\delta)`}, where ${a`\alpha`} and ${a`\delta`} are right ascension and declination.

Each object is stored as four float16 values (x, y, z, color_param). The color parameter encodes both object type and redshift: galaxies map to [0, 0.5) and QSOs to [0.5, 1.0], allowing the shader to distinguish types and interpolate colors. Data is gzip-compressed and loaded progressively by redshift range.

Rendering uses WebGPU with HDR accumulation and tonemapping. Points are rendered as instanced quads with soft falloff, switching to single-pixel point primitives when sub-pixel. To maintain consistent perceived brightness across zoom levels and point sizes, the shader scales intensity inversely with both camera distance and point size. Without this correction, zooming out would cause the image to blow out as millions of points overlap, while zooming in would make sparse regions too dim.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});
