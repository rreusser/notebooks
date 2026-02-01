import{d as C,_ as P}from"./index-ByB2dbry.js";C({root:document.getElementById("cell-1"),expanded:[],variables:[]},{id:1,body:(o,a)=>o`
This notebook visualizes spectroscopically-confirmed objects from the [Sloan Digital Sky Survey](https://www.sdss.org/) (SDSS), including over 2.3 million galaxies (${a`z \lesssim 0.7`}) and 750,000 [quasars](https://esahubble.org/wordbank/quasar/) (QSOs) extending to ${a`z \approx 7`}. Data loads progressively in chunks.

Objects are colored by type and redshift. Galaxies range from white (nearby) to red (distant). Quasars appear blue (nearby) fading to red at high redshift, visually separating the two populations. The filamentary structure visible in the nearby universe is the [cosmic web](https://science.nasa.gov/resource/cosmic-web/). Galaxies cluster along dense filaments and sheets surrounding vast, nearly empty voids. (I created this notebook just today after learning of the [Boötes Void](https://en.wikipedia.org/wiki/Bo%C3%B6tes_Void), a.k.a. the Great Nothing!) At greater distances, the quasar population traces the large-scale structure of the universe across cosmic time, with the most distant objects showing us the universe when it was less than a billion years old.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});C({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async o=>{const{createWebGPUContext:a}=await P(()=>import("./webgpu-canvas-C7AS78hn.js"),[]).then(s=>{if(!("createWebGPUContext"in s))throw new SyntaxError("export 'createWebGPUContext' not found");return s}),{device:r,canvasFormat:b}=await a({optionalFeatures:["shader-f16"]});return o.then(()=>r.destroy()),{createWebGPUContext:a,device:r,canvasFormat:b}},inputs:["invalidation"],outputs:["createWebGPUContext","device","canvasFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:async(o,a,r,b,s)=>{const c=o.hostname==="rreusser.github.io"?"https://raw.githubusercontent.com/rreusser/notebooks/main/src/visualizing-sloan-digital-sky-survey-data":".",t=await fetch(`${c}/objects.json`).then(n=>n.json());function i(n){const m=n>>15&1,f=n>>10&31,h=n&1023;return f===0?(m?-1:1)*Math.pow(2,-14)*(h/1024):f===31?h?NaN:m?-1/0:1/0:(m?-1:1)*Math.pow(2,f-15)*(1+h/1024)}const g=1,p=100,y={queue:[],inFlight:new Set,promises:new Map,chunks:new Array(t.chunks.length).fill(null),loadedCount:0,distanceHistogram:new Uint32Array(p),maxDistance:0,request(n){if(this.chunks[n])return Promise.resolve(this.chunks[n]);if(this.promises.has(n))return this.promises.get(n).promise;let m,f;const h=new Promise((u,d)=>{m=u,f=d});return this.promises.set(n,{promise:h,resolve:m,reject:f}),this.queue.push(n),this.processQueue(),h},processQueue(){for(;this.queue.length>0&&this.inFlight.size<g;){const n=this.queue.shift();this.chunks[n]||this.inFlight.has(n)||(this.inFlight.add(n),this.loadChunk(n))}},async loadChunk(n){const m=t.chunks[n];try{const h=await(await fetch(`${c}/${m.file}`)).arrayBuffer(),u=new Uint16Array(h),d=a.createBuffer({label:`galaxy-chunk-${n}`,size:h.byteLength,usage:r.VERTEX|r.COPY_DST});a.queue.writeBuffer(d,0,u);const x=Math.max(Math.abs(t.bounds.min[0]),Math.abs(t.bounds.max[0]),Math.abs(t.bounds.min[1]),Math.abs(t.bounds.max[1]),Math.abs(t.bounds.min[2]),Math.abs(t.bounds.max[2]))*1.5;x>this.maxDistance&&(this.maxDistance=x);for(let M=0;M<u.length;M+=4){const w=i(u[M]),R=i(u[M+1]),E=i(u[M+2]),T=Math.sqrt(w*w+R*R+E*E),_=Math.min(p-1,Math.floor(T/x*p));this.distanceHistogram[_]++}const l={buffer:d,count:m.count};this.chunks[n]=l,this.loadedCount+=l.count,this.inFlight.delete(n);const{resolve:z}=this.promises.get(n);z(l),b.dirty=!0;const S=m.objectClass==="QSO"?"QSOs":"galaxies";console.log(`Loaded chunk ${n+1}/${t.chunks.length}: ${l.count.toLocaleString()} ${S} (z=${m.redshiftRange[0]}-${m.redshiftRange[1]})`),this.processQueue()}catch(f){this.inFlight.delete(n);const{reject:h}=this.promises.get(n);h(f),this.processQueue()}}};function e(n){for(let f=0;f<t.chunks.length;f++){const[h]=t.chunks[f].redshiftRange;h<n-.001&&y.request(f)}}const v={get loadedCount(){return y.loadedCount},get totalCount(){return t.totalCount},get chunks(){return y.chunks},get loadingIndices(){return y.inFlight}};return e(.3),s.then(()=>{for(const n of y.chunks)n&&n.buffer.destroy()}),{dataBaseUrl:c,metadata:t,decodeFloat16:i,CONCURRENCY:g,NUM_DISTANCE_BINS:p,chunkLoader:y,loadChunksForRedshift:e,loadState:v}},inputs:["location","device","GPUBufferUsage","renderState","invalidation"],outputs:["dataBaseUrl","metadata","decodeFloat16","CONCURRENCY","NUM_DISTANCE_BINS","chunkLoader","loadChunksForRedshift","loadState"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:async(o,a,r,b,s,c)=>{const{expandable:t}=await P(()=>import("./expandable-B9qjFRA-.js"),[]).then(u=>{if(!("expandable"in u))throw new SyntaxError("export 'expandable' not found");return u}),i=window.devicePixelRatio||1,g=1200,p=Math.min(g,window.innerWidth-40),y=Math.round(p*.7),e=document.createElement("canvas");e.id="sdss-canvas",e.width=Math.floor(p*i),e.height=Math.floor(y*i),e.style.width=`${p}px`,e.style.height=`${y}px`,e.style.maxWidth="none",e.style.height="auto",e.style.aspectRatio=`${p} / ${y}`,e.style.background="#1B1714";const v=e.getContext("webgpu");v.configure({device:o,format:a,alphaMode:"premultiplied"});const n={dirty:!0},m=r`<figure style="margin: 0; max-width: none;" id="sdss-figure">
  ${e}
</figure>`;function f(){const u=window.innerWidth,d=Math.min(g,u-40),x=Math.round(d*.7),z=((document.querySelector(".observablehq--cell")?.offsetWidth||840)-d)/2;m.style.width=d+"px",m.style.marginLeft=z+"px",e.style.width=d+"px",e.style.height=x+"px"}f(),window.addEventListener("resize",f),b.then(()=>window.removeEventListener("resize",f)),s(t(m,{width:p,height:y,controls:".sdss-controls",onResize(u,d,x){e.width=Math.floor(d*i),e.height=Math.floor(x*i),e.style.width=`${d}px`,e.style.height=`${x}px`,v.configure({device:o,format:a,alphaMode:"premultiplied"}),n.dirty=!0}}));const h=new c(u=>{for(const d of u){const x=d.contentRect,l=Math.floor(x.width),z=Math.floor(x.height);l>0&&z>0&&(e.width=Math.floor(l*i),e.height=Math.floor(z*i),v.configure({device:o,format:a,alphaMode:"premultiplied"}),n.dirty=!0)}});return h.observe(e),b.then(()=>h.disconnect()),{expandable:t,dpr:i,maxWidth:g,initialWidth:p,initialHeight:y,canvas:e,gpuContext:v,renderState:n,figure:m,updateFigureLayout:f,resizeObserver:h}},inputs:["device","canvasFormat","html","invalidation","display","ResizeObserver"],outputs:["expandable","dpr","maxWidth","initialWidth","initialHeight","canvas","gpuContext","renderState","figure","updateFigureLayout","resizeObserver"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:async(o,a)=>{const{interval:r}=await P(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(b=>{const s={},c=o.module(b.default),t=o.module();if(!c.defines("interval"))throw new SyntaxError("export 'interval' not found");return t.variable(s.interval=a()).import("interval",c),s});return{interval:r}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["interval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(o,a,r,b,s,c)=>{const t=o`<div class="sdss-controls"></div>`;function i(l){return t.appendChild(l),a.input(l)}const g=r.range([.5,8],{value:1,label:"Point size",step:.1,transform:Math.log}),p=i(g),y=r.range([.01,1],{value:.05,label:"Exposure",step:.001,transform:Math.log}),e=i(y),v=r.range([1,50],{value:20,label:"White point",step:.1,transform:Math.log}),n=i(v),m=r.checkbox(["Galaxies","QSOs"],{value:["Galaxies"],label:"Show"}),f=i(m),h=Math.min(b.galaxyRedshiftRange[0],b.qsoRedshiftRange[0]),u=b.qsoRedshiftRange[1],d=s([+h.toFixed(2),+u.toFixed(1)],{value:[+h.toFixed(2),.3],step:.01,label:"Redshift (z)",transform:Math.log}),x=i(d);return c(t),{controlsContainer:t,ctrl:i,pointSizeInput:g,pointSize:p,exposureInput:y,exposure:e,whitePointInput:v,whitePoint:n,objectTypesInput:m,objectTypes:f,zMin:h,zMax:u,redshiftRangeInput:d,redshiftRange:x}},inputs:["html","Generators","Inputs","metadata","interval","display"],outputs:["controlsContainer","ctrl","pointSizeInput","pointSize","exposureInput","exposure","whitePointInput","whitePoint","objectTypesInput","objectTypes","zMin","zMax","redshiftRangeInput","redshiftRange"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(o,a,r,b)=>{const s=[[0,0],[.02,85],[.05,212],[.1,421],[.15,627],[.2,828],[.25,1025],[.3,1219],[.4,1596],[.5,1960],[.6,2311],[.7,2650],[.8,2977],[1,3395],[2,5765],[5,8715],[10,1e4],[1100,46500]];function c(u){for(let d=1;d<s.length;d++)if(u<=s[d][0]){const[x,l]=s[d-1],[z,S]=s[d],M=(u-x)/(z-x);return l+M*(S-l)}return s[s.length-1][1]}const t=[[0,0],[.02,.27],[.05,.67],[.1,1.29],[.2,2.45],[.3,3.45],[.4,4.32],[.5,5.08],[.6,5.75],[.7,6.34],[.8,6.87],[1,7.79],[2,10.4],[3,11.5],[4,12.1],[5,12.5],[6,12.8],[7,13],[10,13.3],[1100,13.8]];function i(u){for(let d=1;d<t.length;d++)if(u<=t[d][0]){const[x,l]=t[d-1],[z,S]=t[d],M=(u-x)/(z-x);return l+M*(S-l)}return t[t.length-1][1]}const g=13.8,[p,y]=o,e=c(p),v=c(y),n=i(p),m=i(y),f=u=>u>=1e3?`${(u/1e3).toFixed(2)} Gpc`:`${u.toFixed(0)} Mpc`,h=u=>u.toFixed(2);return a(r`<p style="font-size: 14px; color: var(--theme-foreground-muted); line-height: 1.6; max-width: 640px;">
<strong>Current selection:</strong> ${b`z = ${p.toFixed(2)}`} to ${b`z = ${y.toFixed(2)}`}<br>
<strong>Comoving distance:</strong> ${f(e)} to ${f(v)}<br>
<strong>Lookback time:</strong> ${h(n)} to ${h(m)} billion years ago
</p>`),{comovingDistanceTable:s,zToComovingDistance:c,lookbackTimeTable:t,zToLookbackTime:i,UNIVERSE_AGE:g,zLo:p,zHi:y,dLo:e,dHi:v,tLo:n,tHi:m,formatDist:f,formatTime:h}},inputs:["redshiftRange","display","html","tex"],outputs:["comovingDistanceTable","zToComovingDistance","lookbackTimeTable","zToLookbackTime","UNIVERSE_AGE","zLo","zHi","dLo","dHi","tLo","tHi","formatDist","formatTime"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(o,a)=>{a(o[1])},inputs:["redshiftRange","loadChunksForRedshift"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(o,a,r,b,s)=>{const c=o`<div style="font-size: 14px; color: var(--theme-foreground-muted); margin-top: 8px;"></div>`;a(c);let t=0,i=0;const g=setInterval(()=>{const p=r.loadingIndices.size>0;(r.loadedCount!==t||r.loadingIndices.size!==i)&&(t=r.loadedCount,i=r.loadingIndices.size,p?c.textContent=`Loading... ${r.loadedCount.toLocaleString()} objects loaded`:c.textContent=`Loaded ${r.loadedCount.toLocaleString()} objects (${b.galaxyCount.toLocaleString()} galaxies, ${b.qsoCount.toLocaleString()} QSOs)`)},100);return s.then(()=>clearInterval(g)),{progressEl:c,lastLoaded:t,lastLoadingSize:i,updateInterval:g}},inputs:["html","display","loadState","metadata","invalidation"],outputs:["progressEl","lastLoaded","lastLoadingSize","updateInterval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(o,a,r,b,s,c)=>{const t=o`<div id="histogram-container" style="max-width: 640px;"></div>`;a(t);let i=0;const g=setInterval(()=>{if(r.loadedCount===i)return;i=r.loadedCount;const p=r.maxDistance/b,y=Array.from(r.distanceHistogram,(e,v)=>({distance:(v+.5)*p,count:e})).filter(e=>e.count>0);t.innerHTML="",t.appendChild(s.plot({width:640,height:200,marginLeft:60,x:{label:"Distance (Mpc)",tickFormat:e=>e>=1e3?`${(e/1e3).toFixed(1)}k`:e},y:{label:"Object count",tickFormat:e=>e>=1e3?`${(e/1e3).toFixed(0)}k`:e},marks:[s.rectY(y,{x1:e=>e.distance-p/2,x2:e=>e.distance+p/2,y:"count",fill:"#4a9eff"}),s.ruleY([0])]}))},200);return c.then(()=>clearInterval(g)),{histogramContainer:t,lastCount:i,histogramInterval:g}},inputs:["html","display","chunkLoader","NUM_DISTANCE_BINS","Plot","invalidation"],outputs:["histogramContainer","lastCount","histogramInterval"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(o,a,r)=>{const{createCameraController:b}=await P(()=>import("./camera-controller-pVrqfLYf.js"),[]).then(g=>{if(!("createCameraController"in g))throw new SyntaxError("export 'createCameraController' not found");return g}),s=o.bounds,c=Math.max(s.max[0]-s.min[0],s.max[1]-s.min[1],s.max[2]-s.min[2]),t=[0,0,0],i=b(a,{center:t,distance:c*.1,phi:1.2,theta:0,fov:Math.PI/4,near:c*.001,far:c*10});return r.then(()=>i.destroy()),{createCameraController:b,bounds:s,dataRange:c,center:t,cameraController:i}},inputs:["metadata","canvas","invalidation"],outputs:["createCameraController","bounds","dataRange","center","cameraController"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(o,a,r,b,s,c)=>{const t=`
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
`,i=o.createShaderModule({label:"galaxy-shader",code:t}),g=o.createBuffer({label:"galaxy-uniforms",size:128,usage:a.UNIFORM|a.COPY_DST}),p=o.createBindGroupLayout({entries:[{binding:0,visibility:r.VERTEX|r.FRAGMENT,buffer:{type:"uniform"}}]}),y=o.createBindGroup({layout:p,entries:[{binding:0,resource:{buffer:g}}]}),e=o.createPipelineLayout({bindGroupLayouts:[p]}),v=o.createRenderPipeline({label:"galaxy-pipeline",layout:e,vertex:{module:i,entryPoint:"vertexMain",buffers:[{arrayStride:8,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float16x4"}]}]},fragment:{module:i,entryPoint:"fragmentMain",targets:[{format:"rgba16float",blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-strip"}}),n=`
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
`,m=o.createShaderModule({label:"tonemap-shader",code:n}),f=o.createBuffer({label:"tonemap-uniforms",size:16,usage:a.UNIFORM|a.COPY_DST}),h=o.createBindGroupLayout({entries:[{binding:0,visibility:r.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:r.FRAGMENT,sampler:{type:"filtering"}},{binding:2,visibility:r.FRAGMENT,buffer:{type:"uniform"}}]}),u=o.createPipelineLayout({bindGroupLayouts:[h]}),d=o.createRenderPipeline({label:"tonemap-pipeline",layout:u,vertex:{module:m,entryPoint:"vertexMain"},fragment:{module:m,entryPoint:"fragmentMain",targets:[{format:b}]},primitive:{topology:"triangle-list"}}),x=o.createSampler({magFilter:"linear",minFilter:"linear"}),l={texture:null,bindGroup:null,width:0,height:0};function z(S,M){l.width===S&&l.height===M&&l.texture||(l.texture&&l.texture.destroy(),l.texture=o.createTexture({label:"hdr-texture",size:[S,M],format:"rgba16float",usage:s.RENDER_ATTACHMENT|s.TEXTURE_BINDING}),l.bindGroup=o.createBindGroup({layout:h,entries:[{binding:0,resource:l.texture.createView()},{binding:1,resource:x},{binding:2,resource:{buffer:f}}]}),l.width=S,l.height=M)}return c.then(()=>{g.destroy(),f.destroy(),l.texture&&l.texture.destroy()}),{shaderCode:t,shaderModule:i,uniformBuffer:g,bindGroupLayout:p,bindGroup:y,pipelineLayout:e,pipeline:v,tonemapShaderCode:n,tonemapShaderModule:m,tonemapUniformBuffer:f,tonemapBindGroupLayout:h,tonemapPipelineLayout:u,tonemapPipeline:d,hdrSampler:x,hdrState:l,ensureHdrTexture:z}},inputs:["device","GPUBufferUsage","GPUShaderStage","canvasFormat","GPUTextureUsage","invalidation"],outputs:["shaderCode","shaderModule","uniformBuffer","bindGroupLayout","bindGroup","pipelineLayout","pipeline","tonemapShaderCode","tonemapShaderModule","tonemapUniformBuffer","tonemapBindGroupLayout","tonemapPipelineLayout","tonemapPipeline","hdrSampler","hdrState","ensureHdrTexture"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:async(o,a,r,b,s,c,t,i,g,p,y,e,v,n,m,f,h,u,d,x,l,z)=>{const{createFrameLoop:S}=await P(()=>import("./frame-loop-QkwpdSbZ.js"),[]).then(k=>{if(!("createFrameLoop"in k))throw new SyntaxError("export 'createFrameLoop' not found");return k});c.dirty=!0;const M=new ArrayBuffer(128),w=new Float32Array(M),[R,E]=t.galaxyRedshiftRange,[T,_]=t.qsoRedshiftRange,F=new Float32Array(4),O=i*.8,G=S(()=>{const k=g.width/g.height,{projectionView:$,dirty:q}=p.update(k);if(!c.dirty&&!q||!y.chunks.some(L=>L!==null))return;e(g.width,g.height),w.set($,0),w[16]=o*v,w[17]=.5,w[18]=k,w[19]=p.state.distance,w[20]=O,w[21]=2*v,w[22]=b[0],w[23]=b[1],w[24]=R,w[25]=E,w[26]=T,w[27]=_,w[28]=s.includes("Galaxies")?1:0,w[29]=s.includes("QSOs")?1:0,n.queue.writeBuffer(m,0,M);const B=n.createCommandEncoder(),I=B.beginRenderPass({colorAttachments:[{view:f.texture.createView(),loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]});I.setPipeline(h),I.setBindGroup(0,u);for(const L of y.chunks)L&&(I.setVertexBuffer(0,L.buffer),I.draw(4,L.count));I.end(),F[0]=a,F[1]=r,n.queue.writeBuffer(d,0,F);const D=B.beginRenderPass({colorAttachments:[{view:x.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:{r:.106,g:.09,b:.078,a:1}}]});D.setPipeline(l),D.setBindGroup(0,f.bindGroup),D.draw(3),D.end(),n.queue.submit([B.finish()]),c.dirty=!1});return z.then(()=>G.cancel()),{createFrameLoop:S,uniformData:M,uniformF32:w,galaxyZMin:R,galaxyZMax:E,qsoZMin:T,qsoZMax:_,tonemapData:F,referenceDistance:O,loop:G}},inputs:["pointSize","exposure","whitePoint","redshiftRange","objectTypes","renderState","metadata","dataRange","canvas","cameraController","loadState","ensureHdrTexture","dpr","device","uniformBuffer","hdrState","pipeline","bindGroup","tonemapUniformBuffer","gpuContext","tonemapPipeline","invalidation"],outputs:["createFrameLoop","uniformData","uniformF32","galaxyZMin","galaxyZMax","qsoZMin","qsoZMax","tonemapData","referenceDistance","loop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});C({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(o,a)=>o`## Data and methods

Data was fetched from [SDSS DR18](https://skyserver.sdss.org/dr18/) using [astroquery](https://astroquery.readthedocs.io/). The query selects spectroscopically-confirmed objects from the SpecObj table, filtered by \`class='GALAXY'\` or \`class='QSO'\` with \`zWarning=0\`. Queries are split into redshift bins to stay under SDSS's 500k row limit.

Redshifts are converted to 3D Cartesian coordinates using [Astropy](https://www.astropy.org/)'s [Planck 2018](https://arxiv.org/abs/1807.06209) cosmology. Comoving distance ${a`d`} in Mpc is computed from redshift ${a`z`}, then projected: ${a`x = d \cos(\delta)\cos(\alpha)`}, ${a`y = d \cos(\delta)\sin(\alpha)`}, ${a`z = d \sin(\delta)`}, where ${a`\alpha`} and ${a`\delta`} are right ascension and declination.

Each object is stored as four float16 values (x, y, z, color_param). The color parameter encodes both object type and redshift: galaxies map to [0, 0.5) and QSOs to [0.5, 1.0], allowing the shader to distinguish types and interpolate colors. Data is gzip-compressed and loaded progressively by redshift range.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});
