import{d as C,_ as D}from"./index-ByB2dbry.js";C({root:document.getElementById("cell-1"),expanded:[],variables:[]},{id:1,body:(a,i)=>a`

I got inspired this evening when I learned of the [Boötes Void](https://en.wikipedia.org/wiki/Bo%C3%B6tes_Void), a.k.a. the Great Nothing, a massive void nearly two hundred *million* light years across which contains just 60 galaxies where we'd expect nearly 2,000.

So I looked into how to acquire data from the [Sloan Digital Sky Survey](https://www.sdss.org/) (SDSS). The [astroquery](https://astroquery.readthedocs.io/en/latest/) module made pretty short work of it, so this notebook plots over 2.3 million galaxies (${i`z \lesssim 0.7`}) and 750,000 [quasars](https://esahubble.org/wordbank/quasar/) (QSOs) extending to ${i`z \approx 7`}. Data loads progressively in chunks.

Objects are colored by type and redshift. Galaxies range from white (nearby) to red (distant). Quasars appear blue (nearby) fading to red at high redshift, visually separating the two populations. The filamentary structure visible in the nearby universe is the [cosmic web](https://science.nasa.gov/resource/cosmic-web/). Galaxies cluster along dense filaments and sheets surrounding vast, nearly empty voids. At greater distances, the quasar population traces the large-scale structure of the universe across cosmic time, with the most distant objects showing us the universe when it was less than a billion years old.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});C({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async a=>{const{createWebGPUContext:i}=await D(()=>import("./webgpu-canvas-C7AS78hn.js"),[]).then(r=>{if(!("createWebGPUContext"in r))throw new SyntaxError("export 'createWebGPUContext' not found");return r}),{device:d,canvasFormat:m}=await i({optionalFeatures:["shader-f16"]});return a.then(()=>d.destroy()),{createWebGPUContext:i,device:d,canvasFormat:m}},inputs:["invalidation"],outputs:["createWebGPUContext","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(a,i,d,m,r,h,l)=>{const s=a.hostname==="rreusser.github.io"?"https://raw.githubusercontent.com/rreusser/notebooks/main/src/visualizing-sloan-digital-sky-survey-data":".",u=await fetch(`${s}/objects.json`).then(t=>t.json());function p(t){const f=t>>15&1,n=t>>10&31,o=t&1023;return n===0?(f?-1:1)*Math.pow(2,-14)*(o/1024):n===31?o?NaN:f?-1/0:1/0:(f?-1:1)*Math.pow(2,n-15)*(1+o/1024)}const b=1,e=100,y={queue:[],inFlight:new Set,promises:new Map,chunks:new Array(u.chunks.length).fill(null),loadedCount:0,distanceHistogram:new Uint32Array(e),maxDistance:0,request(t){if(this.chunks[t])return Promise.resolve(this.chunks[t]);if(this.promises.has(t))return this.promises.get(t).promise;let f,n;const o=new Promise((g,c)=>{f=g,n=c});return this.promises.set(t,{promise:o,resolve:f,reject:n}),this.queue.push(t),this.processQueue(),o},processQueue(){for(;this.queue.length>0&&this.inFlight.size<b;){const t=this.queue.shift();this.chunks[t]||this.inFlight.has(t)||(this.inFlight.add(t),this.loadChunk(t))}},async loadChunk(t){const f=u.chunks[t];try{const n=await fetch(`${s}/${f.file}`);let o;if(f.file.endsWith(".gz")&&s!=="."){const R=new i("gzip"),E=n.body.pipeThrough(R);o=await new d(E).arrayBuffer()}else o=await n.arrayBuffer();const g=new Uint16Array(o),c=m.createBuffer({label:`galaxy-chunk-${t}`,size:o.byteLength,usage:r.VERTEX|r.COPY_DST});m.queue.writeBuffer(c,0,g);const M=Math.max(Math.abs(u.bounds.min[0]),Math.abs(u.bounds.max[0]),Math.abs(u.bounds.min[1]),Math.abs(u.bounds.max[1]),Math.abs(u.bounds.min[2]),Math.abs(u.bounds.max[2]))*1.5;M>this.maxDistance&&(this.maxDistance=M);for(let R=0;R<g.length;R+=4){const E=p(g[R]),k=p(g[R+1]),L=p(g[R+2]),I=Math.sqrt(E*E+k*k+L*L),F=Math.min(e-1,Math.floor(I/M*e));this.distanceHistogram[F]++}const z={buffer:c,count:f.count};this.chunks[t]=z,this.loadedCount+=z.count,this.inFlight.delete(t);const{resolve:S}=this.promises.get(t);S(z),h.dirty=!0;const w=f.objectClass==="QSO"?"QSOs":"galaxies";console.log(`Loaded chunk ${t+1}/${u.chunks.length}: ${z.count.toLocaleString()} ${w} (z=${f.redshiftRange[0]}-${f.redshiftRange[1]})`),this.processQueue()}catch(n){this.inFlight.delete(t);const{reject:o}=this.promises.get(t);o(n),this.processQueue()}}};function x(t){for(let n=0;n<u.chunks.length;n++){const[o]=u.chunks[n].redshiftRange;o<t-.001&&y.request(n)}}const v={get loadedCount(){return y.loadedCount},get totalCount(){return u.totalCount},get chunks(){return y.chunks},get loadingIndices(){return y.inFlight}};return x(.3),l.then(()=>{for(const t of y.chunks)t&&t.buffer.destroy()}),{dataBaseUrl:s,metadata:u,decodeFloat16:p,CONCURRENCY:b,NUM_DISTANCE_BINS:e,chunkLoader:y,loadChunksForRedshift:x,loadState:v}},inputs:["location","DecompressionStream","Response","device","GPUBufferUsage","renderState","invalidation"],outputs:["dataBaseUrl","metadata","decodeFloat16","CONCURRENCY","NUM_DISTANCE_BINS","chunkLoader","loadChunksForRedshift","loadState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:async(a,i,d,m,r,h)=>{const{expandable:l}=await D(()=>import("./expandable-B9qjFRA-.js"),[]).then(n=>{if(!("expandable"in n))throw new SyntaxError("export 'expandable' not found");return n}),s=window.devicePixelRatio||1,u=1200,p=Math.min(u,window.innerWidth-40),b=Math.round(p*.7),e=document.createElement("canvas");e.id="sdss-canvas",e.width=Math.floor(p*s),e.height=Math.floor(b*s),e.style.width=`${p}px`,e.style.height=`${b}px`,e.style.maxWidth="none",e.style.height="auto",e.style.aspectRatio=`${p} / ${b}`,e.style.background="#1B1714";const y=e.getContext("webgpu");y.configure({device:a,format:i,alphaMode:"premultiplied"});const x={dirty:!0},v=d`<figure style="margin: 0; max-width: none;" id="sdss-figure">
  ${e}
</figure>`;function t(){const n=window.innerWidth,o=Math.min(u,n-40),g=Math.round(o*.7),M=((document.querySelector(".observablehq--cell")?.offsetWidth||840)-o)/2;v.style.width=o+"px",v.style.marginLeft=M+"px",e.style.width=o+"px",e.style.height=g+"px"}t(),window.addEventListener("resize",t),m.then(()=>window.removeEventListener("resize",t)),r(l(v,{width:p,height:b,controls:".sdss-controls",onResize(n,o,g){e.width=Math.floor(o*s),e.height=Math.floor(g*s),e.style.width=`${o}px`,e.style.height=`${g}px`,y.configure({device:a,format:i,alphaMode:"premultiplied"}),x.dirty=!0}}));const f=new h(n=>{for(const o of n){const g=o.contentRect,c=Math.floor(g.width),M=Math.floor(g.height);c>0&&M>0&&(e.width=Math.floor(c*s),e.height=Math.floor(M*s),y.configure({device:a,format:i,alphaMode:"premultiplied"}),x.dirty=!0)}});return f.observe(e),m.then(()=>f.disconnect()),{expandable:l,dpr:s,maxWidth:u,initialWidth:p,initialHeight:b,canvas:e,gpuContext:y,renderState:x,figure:v,updateFigureLayout:t,resizeObserver:f}},inputs:["device","canvasFormat","html","invalidation","display","ResizeObserver"],outputs:["expandable","dpr","maxWidth","initialWidth","initialHeight","canvas","gpuContext","renderState","figure","updateFigureLayout","resizeObserver"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(a,i)=>{const{interval:d}=await D(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(m=>{const r={},h=a.module(m.default),l=a.module();if(!h.defines("interval"))throw new SyntaxError("export 'interval' not found");return l.variable(r.interval=i()).import("interval",h),r});return{interval:d}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["interval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(a,i,d,m,r,h)=>{const l=a`<div class="sdss-controls"></div>`;function s(c){return l.appendChild(c),i.input(c)}const u=d.range([.5,8],{value:1,label:"Point size",step:.1,transform:Math.log}),p=s(u),b=d.range([.01,1],{value:.05,label:"Exposure",step:.001,transform:Math.log}),e=s(b),y=d.range([1,50],{value:20,label:"White point",step:.1,transform:Math.log}),x=s(y),v=d.checkbox(["Galaxies","QSOs"],{value:["Galaxies"],label:"Show"}),t=s(v),f=Math.min(m.galaxyRedshiftRange[0],m.qsoRedshiftRange[0]),n=m.qsoRedshiftRange[1],o=r([+f.toFixed(2),+n.toFixed(1)],{value:[+f.toFixed(2),.3],step:.01,label:"Redshift (z)",transform:Math.log}),g=s(o);return h(l),{controlsContainer:l,ctrl:s,pointSizeInput:u,pointSize:p,exposureInput:b,exposure:e,whitePointInput:y,whitePoint:x,objectTypesInput:v,objectTypes:t,zMin:f,zMax:n,redshiftRangeInput:o,redshiftRange:g}},inputs:["html","Generators","Inputs","metadata","interval","display"],outputs:["controlsContainer","ctrl","pointSizeInput","pointSize","exposureInput","exposure","whitePointInput","whitePoint","objectTypesInput","objectTypes","zMin","zMax","redshiftRangeInput","redshiftRange"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(a,i,d,m)=>{const r=[[0,0],[.02,85],[.05,212],[.1,421],[.15,627],[.2,828],[.25,1025],[.3,1219],[.4,1596],[.5,1960],[.6,2311],[.7,2650],[.8,2977],[1,3395],[2,5765],[5,8715],[10,1e4],[1100,46500]];function h(n){for(let o=1;o<r.length;o++)if(n<=r[o][0]){const[g,c]=r[o-1],[M,z]=r[o],S=(n-g)/(M-g);return c+S*(z-c)}return r[r.length-1][1]}const l=[[0,0],[.02,.27],[.05,.67],[.1,1.29],[.2,2.45],[.3,3.45],[.4,4.32],[.5,5.08],[.6,5.75],[.7,6.34],[.8,6.87],[1,7.79],[2,10.4],[3,11.5],[4,12.1],[5,12.5],[6,12.8],[7,13],[10,13.3],[1100,13.8]];function s(n){for(let o=1;o<l.length;o++)if(n<=l[o][0]){const[g,c]=l[o-1],[M,z]=l[o],S=(n-g)/(M-g);return c+S*(z-c)}return l[l.length-1][1]}const u=13.8,[p,b]=a,e=h(p),y=h(b),x=s(p),v=s(b),t=n=>n>=1e3?`${(n/1e3).toFixed(2)} Gpc`:`${n.toFixed(0)} Mpc`,f=n=>n.toFixed(2);return i(d`<p style="font-size: 14px; color: var(--theme-foreground-muted); line-height: 1.6; max-width: 640px;">
<strong>Current selection:</strong> ${m`z = ${p.toFixed(2)}`} to ${m`z = ${b.toFixed(2)}`}<br>
<strong>Comoving distance:</strong> ${t(e)} to ${t(y)}<br>
<strong>Lookback time:</strong> ${f(x)} to ${f(v)} billion years ago
</p>`),{comovingDistanceTable:r,zToComovingDistance:h,lookbackTimeTable:l,zToLookbackTime:s,UNIVERSE_AGE:u,zLo:p,zHi:b,dLo:e,dHi:y,tLo:x,tHi:v,formatDist:t,formatTime:f}},inputs:["redshiftRange","display","html","tex"],outputs:["comovingDistanceTable","zToComovingDistance","lookbackTimeTable","zToLookbackTime","UNIVERSE_AGE","zLo","zHi","dLo","dHi","tLo","tHi","formatDist","formatTime"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(a,i)=>{i(a[1])},inputs:["redshiftRange","loadChunksForRedshift"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(a,i,d,m,r)=>{const h=a`<div style="font-size: 14px; color: var(--theme-foreground-muted); margin-top: 8px;"></div>`;i(h);let l=0,s=0;const u=setInterval(()=>{const p=d.loadingIndices.size>0;(d.loadedCount!==l||d.loadingIndices.size!==s)&&(l=d.loadedCount,s=d.loadingIndices.size,p?h.textContent=`Loading... ${d.loadedCount.toLocaleString()} objects loaded`:h.textContent=`Loaded ${d.loadedCount.toLocaleString()} objects (${m.galaxyCount.toLocaleString()} galaxies, ${m.qsoCount.toLocaleString()} QSOs)`)},100);return r.then(()=>clearInterval(u)),{progressEl:h,lastLoaded:l,lastLoadingSize:s,updateInterval:u}},inputs:["html","display","loadState","metadata","invalidation"],outputs:["progressEl","lastLoaded","lastLoadingSize","updateInterval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(a,i,d,m,r,h)=>{const l=a`<div id="histogram-container" style="max-width: 640px;"></div>`;i(l);let s=0;const u=setInterval(()=>{if(d.loadedCount===s)return;s=d.loadedCount;const p=d.maxDistance/m,b=Array.from(d.distanceHistogram,(e,y)=>({distance:(y+.5)*p,count:e})).filter(e=>e.count>0);l.innerHTML="",l.appendChild(r.plot({width:640,height:200,marginLeft:60,x:{label:"Distance (Mpc)",tickFormat:e=>e>=1e3?`${(e/1e3).toFixed(1)}k`:e},y:{label:"Object count",tickFormat:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e},marks:[r.rectY(b,{x1:e=>e.distance-p/2,x2:e=>e.distance+p/2,y:"count",fill:"#4a9eff"}),r.ruleY([0])]}))},200);return h.then(()=>clearInterval(u)),{histogramContainer:l,lastCount:s,histogramInterval:u}},inputs:["html","display","chunkLoader","NUM_DISTANCE_BINS","Plot","invalidation"],outputs:["histogramContainer","lastCount","histogramInterval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(a,i,d)=>{const{createCameraController:m}=await D(()=>import("./camera-controller-pVrqfLYf.js"),[]).then(u=>{if(!("createCameraController"in u))throw new SyntaxError("export 'createCameraController' not found");return u}),r=a.bounds,h=Math.max(r.max[0]-r.min[0],r.max[1]-r.min[1],r.max[2]-r.min[2]),l=[0,0,0],s=m(i,{center:l,distance:h*.1,phi:1.2,theta:0,fov:Math.PI/4,near:h*.001,far:h*10});return d.then(()=>s.destroy()),{createCameraController:m,bounds:r,dataRange:h,center:l,cameraController:s}},inputs:["metadata","canvas","invalidation"],outputs:["createCameraController","bounds","dataRange","center","cameraController"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(a,i,d,m,r,h)=>{const l=`
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
`,s=a.createShaderModule({label:"galaxy-shader",code:l}),u=a.createBuffer({label:"galaxy-uniforms",size:128,usage:i.UNIFORM|i.COPY_DST}),p=a.createBindGroupLayout({entries:[{binding:0,visibility:d.VERTEX|d.FRAGMENT,buffer:{type:"uniform"}}]}),b=a.createBindGroup({layout:p,entries:[{binding:0,resource:{buffer:u}}]}),e=a.createPipelineLayout({bindGroupLayouts:[p]}),y=a.createRenderPipeline({label:"galaxy-pipeline",layout:e,vertex:{module:s,entryPoint:"vertexMain",buffers:[{arrayStride:8,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float16x4"}]}]},fragment:{module:s,entryPoint:"fragmentMain",targets:[{format:"rgba16float",blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-strip"}}),x=`
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

  // Blend with background based on accumulated alpha
  let blend = saturate(hdr.a);
  return vec4f(mix(backgroundColor, ldr, blend), 1.0);
}
`,v=a.createShaderModule({label:"tonemap-shader",code:x}),t=a.createBuffer({label:"tonemap-uniforms",size:16,usage:i.UNIFORM|i.COPY_DST}),f=a.createBindGroupLayout({entries:[{binding:0,visibility:d.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:d.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:d.FRAGMENT,buffer:{type:"uniform"}}]}),n=a.createPipelineLayout({bindGroupLayouts:[f]}),o=a.createRenderPipeline({label:"tonemap-pipeline",layout:n,vertex:{module:v,entryPoint:"vertexMain"},fragment:{module:v,entryPoint:"fragmentMain",targets:[{format:m}]},primitive:{topology:"triangle-list"}}),g=a.createSampler({magFilter:"linear",minFilter:"linear"}),c={texture:null,bindGroup:null,width:0,height:0};function M(z,S){c.width===z&&c.height===S&&c.texture||(c.texture&&c.texture.destroy(),c.texture=a.createTexture({label:"hdr-texture",size:[z,S],format:"rgba16float",usage:r.RENDER_ATTACHMENT|r.TEXTURE_BINDING}),c.bindGroup=a.createBindGroup({layout:f,entries:[{binding:0,resource:c.texture.createView()},{binding:1,resource:g},{binding:2,resource:{buffer:t}}]}),c.width=z,c.height=S)}return h.then(()=>{u.destroy(),t.destroy(),c.texture&&c.texture.destroy()}),{shaderCode:l,shaderModule:s,uniformBuffer:u,bindGroupLayout:p,bindGroup:b,pipelineLayout:e,pipeline:y,tonemapShaderCode:x,tonemapShaderModule:v,tonemapUniformBuffer:t,tonemapBindGroupLayout:f,tonemapPipelineLayout:n,tonemapPipeline:o,hdrSampler:g,hdrState:c,ensureHdrTexture:M}},inputs:["device","GPUBufferUsage","GPUShaderStage","canvasFormat","GPUTextureUsage","invalidation"],outputs:["shaderCode","shaderModule","uniformBuffer","bindGroupLayout","bindGroup","pipelineLayout","pipeline","tonemapShaderCode","tonemapShaderModule","tonemapUniformBuffer","tonemapBindGroupLayout","tonemapPipelineLayout","tonemapPipeline","hdrSampler","hdrState","ensureHdrTexture"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:async(a,i,d,m,r,h,l,s,u,p,b,e,y,x,v,t,f,n,o,g,c,M)=>{const{createFrameLoop:z}=await D(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(P=>{if(!("createFrameLoop"in P))throw new SyntaxError("export 'createFrameLoop' not found");return P});h.dirty=!0;const S=new ArrayBuffer(128),w=new Float32Array(S),[R,E]=l.galaxyRedshiftRange,[k,L]=l.qsoRedshiftRange,I=new Float32Array(4),F=s*.8,G=z(()=>{const P=u.width/u.height,{projectionView:$,dirty:q}=p.update(P);if(!h.dirty&&!q||!b.chunks.some(_=>_!==null))return;e(u.width,u.height),w.set($,0),w[16]=a*y,w[17]=.5,w[18]=P,w[19]=p.state.distance,w[20]=F,w[21]=2*y,w[22]=m[0],w[23]=m[1],w[24]=R,w[25]=E,w[26]=k,w[27]=L,w[28]=r.includes("Galaxies")?1:0,w[29]=r.includes("QSOs")?1:0,x.queue.writeBuffer(v,0,S);const O=x.createCommandEncoder(),T=O.beginRenderPass({colorAttachments:[{view:t.texture.createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]});T.setPipeline(f),T.setBindGroup(0,n);for(const _ of b.chunks)_&&(T.setVertexBuffer(0,_.buffer),T.draw(4,_.count));T.end(),I[0]=i,I[1]=d,x.queue.writeBuffer(o,0,I);const B=O.beginRenderPass({colorAttachments:[{view:g.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.106,g:.09,b:.078,a:1}}]});B.setPipeline(c),B.setBindGroup(0,t.bindGroup),B.draw(3),B.end(),x.queue.submit([O.finish()]),h.dirty=!1});return M.then(()=>G.cancel()),{createFrameLoop:z,uniformData:S,uniformF32:w,galaxyZMin:R,galaxyZMax:E,qsoZMin:k,qsoZMax:L,tonemapData:I,referenceDistance:F,loop:G}},inputs:["pointSize","exposure","whitePoint","redshiftRange","objectTypes","renderState","metadata","dataRange","canvas","cameraController","loadState","ensureHdrTexture","dpr","device","uniformBuffer","hdrState","pipeline","bindGroup","tonemapUniformBuffer","gpuContext","tonemapPipeline","invalidation"],outputs:["createFrameLoop","uniformData","uniformF32","galaxyZMin","galaxyZMax","qsoZMin","qsoZMax","tonemapData","referenceDistance","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(a,i)=>a`## Data and methods

Data was fetched from [SDSS DR18](https://skyserver.sdss.org/dr18/) using [astroquery](https://astroquery.readthedocs.io/). The query selects spectroscopically-confirmed objects from the SpecObj table, filtered by \`class='GALAXY'\` or \`class='QSO'\` with \`zWarning=0\`. Queries are split into redshift bins to stay under SDSS's 500k row limit.

Redshifts are converted to 3D Cartesian coordinates using [Astropy](https://www.astropy.org/)'s [Planck 2018](https://arxiv.org/abs/1807.06209) cosmology. Comoving distance ${i`d`} in Mpc is computed from redshift ${i`z`}, then projected: ${i`x = d \cos(\delta)\cos(\alpha)`}, ${i`y = d \cos(\delta)\sin(\alpha)`}, ${i`z = d \sin(\delta)`}, where ${i`\alpha`} and ${i`\delta`} are right ascension and declination.

Each object is stored as four float16 values (x, y, z, color_param). The color parameter encodes both object type and redshift: galaxies map to [0, 0.5) and QSOs to [0.5, 1.0], allowing the shader to distinguish types and interpolate colors. Data is gzip-compressed and loaded progressively by redshift range.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});
