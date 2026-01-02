import{d as o,_ as z}from"./index-ByB2dbry.js";o({root:document.getElementById("cell-1094"),expanded:[],variables:[]},{id:1094,body:(a,t)=>a`This notebook contains my first real attempt at implementing something nontrivial in WebGPU. It is a direct port of [Line Sweep Ambient Occlusion in JavaScript](https://observablehq.com/@rreusser/line-sweep-ambient-occlusion) to a WebGPU compute shader.

The original algorithm iterates over all scanlines, first left, then right, then up, then down (and maybe diagonal). The nice thing about the [Line-Sweep Ambient Occlusion algorithm](https://karim.naaji.fr/lsao.html) is that for each direction's pass, we track horizon visibility on a stack and shade as we go so that we only need to touch each pixel exactly once. On the CPU we process these scanlines one at a time. We should be able to parallelize that on the GPU, but years of working with WebGL has taught me that while GPUs are good at evaluating pixels independently, they're not a good fit for this type of sweep algorithm where each pixel depends on all previous pixels.

But hey, WebGPU has arrived and compute shaders play by different rules, so let's go for it. The implementation below dispatches workgroups of ${t} invocations at a time. Each invocation implements a single scanline in a single direction. That means within a single shader invocation, we march all the way across an entire scanline, sampling the terrain data 512 times and shading all 512 pixels of the row or column.

I suspect it's a moderately suboptimal for reasons I don't understand very well, but my hasty benchmarks indicate it's about 20x faster than [the CPU version of the algorithm](https://observablehq.com/@rreusser/line-sweep-ambient-occlusion) and, upon ramping it up to a hundred or so (redundant) passes and taking an average, each scanline processes in less than 0.5ms.

Overall, I'm very happy with the success of translation to WebGPU, and I'm moderately happy with the performance boost. It's not up to feature parity with [Line-Sweep Terrain Lighting](https://observablehq.com/@rreusser/line-sweep-terrain-lighting), but I'd like to get it there.`,inputs:["md","workgroupSize"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});o({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:function(t,e,u){const n=t.canvas(e[0],e[1]),i=Math.min(u,e[0]/1);return n.style.width=`${Math.min(i,e[0]/1)}px`,n.style.height=`${Math.min(i*e[1]/e[0],e[1]/1)}px`,n},inputs:["DOM","shape","width"],outputs:void 0,output:"canvas",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-1285"),expanded:[],variables:[]},{id:1285,body:function(t){return t.range([-1,1],{label:"Brightness"})},inputs:["Inputs"],outputs:void 0,output:"viewof$brightness",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-1121"),expanded:[],variables:[]},{id:1121,body:function(t){return t.range([0,1],{label:"Contrast"})},inputs:["Inputs"],outputs:void 0,output:"viewof$contrast",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-193"),expanded:[],variables:[]},{id:193,body:function(t){return t.select([...Array(9).keys()].map(e=>2**e),{value:128,label:"Workgroup size"})},inputs:["Inputs"],outputs:void 0,output:"viewof$workgroupSize",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-897"),expanded:[],variables:[]},{id:897,body:async function(a,t,e,u,n,i,d,l){if(!a)return t`<span></span>`;await u.mapAsync(n.READ);const f=new i(u.getMappedRange()),r=f[0],s=f[1];u.unmap();const p=d.limits.timestampPeriod??1,c=Number(s-r)*p;return t`GPU execution time (${l.length} direction passes)<code> = </code><code class="observablehq--number">${(c/1e6).toFixed(1)} ms</code>`},inputs:["supportsTimestamps","html","renderToAO","readbackBuffer","GPUMapMode","BigUint64Array","adapter","dirs"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-1232"),expanded:[],variables:[]},{id:1232,body:function(t){return t.button("Re-run")},inputs:["Inputs"],outputs:void 0,output:"viewof$rerun",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-126"),expanded:[],variables:[]},{id:126,body:function(){return function({x:e,y:u,z:n}){const i="pk.eyJ1IjoicnNyZXVzc2VyIiwiYSI6ImNtMjZmejNqczBmYzIya3B6ZjBzZnYwOGgifQ.CWSOe_wStIypz4_snROphQ",d="101pM5uZK0TZt";return new Promise((l,f)=>{const r=new Image;r.src=`https://api.mapbox.com/raster/v1/mapbox.mapbox-terrain-dem-v1/${n}/${e}/${u}.webp?sku=${d}&access_token=${i}`,r.crossOrigin="Anonymous",r.onload=()=>{const s=Math.pow(2,Math.floor(Math.log2(r.width))),p=(r.width-s)/2;l({img:r,width:r.width,height:r.height,tileSize:s,buffer:p})},r.onerror=()=>f("Failed to load terrain tile")})}},inputs:[],outputs:void 0,output:"getTerrainTile",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-146"),expanded:[],variables:[]},{id:146,body:function(t){return function(u){const n=t.element("canvas");n.width=u.width,n.height=u.height;const i=n.getContext("2d");return i.drawImage(u,0,0),i.getImageData(0,0,u.width,u.height).data}},inputs:["DOM"],outputs:void 0,output:"readImageData",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-140"),expanded:[],variables:[]},{id:140,body:function(){return function(e){const u=new Float32Array(e.length/4);for(let n=0;n<e.length;n+=4)u[n>>2]=-1e4+.1*(e[n]<<16|e[n+1]<<8|e[n+2]);return u}},inputs:[],outputs:void 0,output:"decodeTerrainData",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-158"),expanded:[],variables:[]},{id:158,body:function(t,e,u){return t(e(u.img))},inputs:["decodeTerrainData","readImageData","tile"],outputs:void 0,output:"terrainData",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-129"),expanded:[],variables:[]},{id:129,body:function(){return{x:164,y:363,z:10}},inputs:[],outputs:void 0,output:"xyz",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-132"),expanded:[],variables:[]},{id:132,body:function(t,e){return t(e)},inputs:["getTerrainTile","xyz"],outputs:void 0,output:"tile",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-628"),expanded:[],variables:[]},{id:628,body:function(){return 20037508342789244e-9},inputs:[],outputs:void 0,output:"MAXEXTENT",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-627"),expanded:[],variables:[]},{id:627,body:function(t,e,u){return 2*t/e.tileSize/Math.pow(2,u.z)},inputs:["MAXEXTENT","tile","xyz"],outputs:void 0,output:"pixelSize",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-31"),expanded:[],variables:[]},{id:31,body:function(){return[512,512]},inputs:[],outputs:void 0,output:"shape",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:function(){return navigator.gpu?.requestAdapter()},inputs:[],outputs:void 0,output:"adapter",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-1206"),expanded:[],variables:[]},{id:1206,body:function(t){return t.features.has("timestamp-query")},inputs:["adapter"],outputs:void 0,output:"supportsTimestamps",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:function(t,e){return t?.requestDevice({requiredFeatures:e?["timestamp-query"]:[]})},inputs:["adapter","supportsTimestamps"],outputs:void 0,output:"device",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:function(t,e,u){const n=t.getContext("webgpu");return n.configure({device:e,format:u}),n},inputs:["canvas","device","format"],outputs:void 0,output:"context",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-969"),expanded:[],variables:[]},{id:969,body:function(){return navigator.gpu.getPreferredCanvasFormat()},inputs:[],outputs:void 0,output:"format",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-313"),expanded:[],variables:[]},{id:313,body:async(a,t)=>{const{createShaderModule:e}=await z(()=>import("https://api.observablehq.com/@rreusser/webgpu-utils.js?v=4"),[]).then(u=>{const n={},i=a.module(u.default),d=a.module();if(!i.defines("createShaderModule"))throw new SyntaxError("export 'createShaderModule' not found");return d.variable(n.createShaderModule=t()).import("createShaderModule",i),n});return{createShaderModule:e}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["createShaderModule"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-82"),expanded:[],variables:[]},{id:82,body:function(t,e,u,n){const i=t.createBuffer({size:e.byteLength,label:"Terrain data buffer",usage:u.STORAGE|u.COPY_SRC,mappedAtCreation:!0});return new Float32Array(i.getMappedRange()).set(e),i.unmap(),n.then(()=>i.destroy()),i},inputs:["device","terrainData","GPUBufferUsage","invalidation"],outputs:void 0,output:"terrainDataBuffer",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-228"),expanded:[],variables:[]},{id:228,body:function(t,e,u,n){const i=t.createBuffer({size:e.tileSize**2*Uint32Array.BYTES_PER_ELEMENT,label:"Computation buffer",usage:u.STORAGE|u.COPY_SRC|u.COPY_DST,mappedAtCreation:!0});return new Uint32Array(i.getMappedRange()).fill(0),i.unmap(),n.then(()=>i.destroy()),i},inputs:["device","tile","GPUBufferUsage","invalidation"],outputs:void 0,output:"computationBuffer",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-48"),expanded:[],variables:[]},{id:48,body:function(t,e){return t(e,{code:`
override tileSize = 512u;
override tileBuffer = 1u;
override workgroupSize = 128;

struct UniformStruct {
  tilesize: vec2<u32>,
  step: vec2<i32>,
  buffer: i32,
  pixelSize: f32,
  normalization: f32
}

@binding(0) @group(0) var<uniform> uniforms: UniformStruct;
@binding(1) @group(0) var<storage, read> terrainData: array<f32>;
@binding(2) @group(0) var<storage, read_write> outputData: array<f32>;

fn unbufferedIndex(ij: vec2<i32>) -> u32 {
  return (u32(ij.x) % tileSize) + u32(ij.y) * tileSize;
}

fn bufferedIndex(ij: vec2<i32>) -> u32 {
  let w = tileSize + 2u * tileBuffer;
  let ijbuf = vec2<u32>(ij + i32(tileBuffer));
  return (ijbuf.x % w) + (ijbuf.y) * w;
}

@compute @workgroup_size(workgroupSize)
fn main( @builtin(global_invocation_id) coord: vec3u) {

  var ij = vec2<i32>(i32(coord.x), i32(coord.x));
  var dijz: vec3<f32>;

  if (uniforms.step.y == 0) {
    ij.x = select(0i, i32(tileSize - 1), uniforms.step.x < 0i);
  } else if (uniforms.step.x == 0) {
    ij.y = select(0i, i32(tileSize - 1), uniforms.step.y < 0i);
  }


  var hull: array<vec3<f32>, 64>;
  hull[0] = vec3<f32>(vec2<f32>(ij - uniforms.step), terrainData[bufferedIndex(ij - uniforms.step)]);
  var hullPtr = 0u;

  for (var i = 0u; i < tileSize; i = i + 1u) {
    let uidx = unbufferedIndex(ij);
    let bidx = bufferedIndex(ij);
    let z = terrainData[bidx];
    let ijz = vec3<f32>(vec2<f32>(ij), z);

    dijz = hull[hullPtr] - ijz;
    var s0 = dijz.z * dijz.z / dot(dijz, dijz);
    s0 = select(-s0, s0, dijz.z > 0.0);

    while(hullPtr > 0) {
      dijz = hull[hullPtr - 1] - ijz;
      var s1 = dijz.z * dijz.z / dot(dijz, dijz);
      s1 = select(-s1, s1, dijz.z > 0.0);

      if (s0 > s1) { break; }

      s0 = s1;
      hullPtr -= 1u;
    }

    dijz = hull[hullPtr] - ijz;
    dijz = vec3(dijz.xy, dijz.z / uniforms.pixelSize);
    outputData[uidx] = outputData[uidx] + uniforms.normalization * exp(-dijz.z / length(dijz));

    // Fail silently but gracefully if we overflow the stack
    hullPtr = min(hullPtr + 1u, 63u);
    hull[hullPtr] = ijz;

    ij = ij + uniforms.step;
  }
}`})},inputs:["createShaderModule","device"],outputs:void 0,output:"computeShader",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-821"),expanded:[],variables:[]},{id:821,body:function(){return[[1,0],[-1,0],[0,1],[0,-1]]},inputs:[],outputs:void 0,output:"dirs",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-816"),expanded:[],variables:[]},{id:816,body:function(){return 256},inputs:[],outputs:void 0,output:"uniformSizePerDispatch",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-299"),expanded:[],variables:[]},{id:299,body:function(t,e,u,n,i){const d=t.createBuffer({size:e*u.length,usage:n.UNIFORM|n.COPY_DST});return i.then(()=>d.destroy()),d},inputs:["device","uniformSizePerDispatch","dirs","GPUBufferUsage","invalidation"],outputs:void 0,output:"uniformBuffer",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-405"),expanded:[],variables:[]},{id:405,body:function(t){return function([u,n],[i,d],l,f,r){const s=new Uint8Array(t),p=new Int32Array(s.buffer),c=new Uint32Array(s.buffer),y=new Float32Array(s.buffer);return c[0]=u,c[1]=n,p[2]=i,p[3]=d,c[4]=l,y[5]=f,y[6]=r,s}},inputs:["uniformSizePerDispatch"],outputs:void 0,output:"packUniforms",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-55"),expanded:[],variables:[]},{id:55,body:function(t,e){return t.createBindGroupLayout({entries:[{binding:0,visibility:e.COMPUTE,buffer:{type:"uniform",hasDynamicOffset:!0}},{binding:1,visibility:e.COMPUTE,buffer:{type:"read-only-storage"}},{binding:2,visibility:e.COMPUTE,buffer:{type:"storage"}}]})},inputs:["device","GPUShaderStage"],outputs:void 0,output:"bindGroupLayout",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-80"),expanded:[],variables:[]},{id:80,body:function(t,e,u,n,i,d){return t.createBindGroup({layout:e,entries:[{binding:0,resource:{buffer:u,offset:0,size:n}},{binding:1,resource:{buffer:i}},{binding:2,resource:{buffer:d}}]})},inputs:["device","bindGroupLayout","uniformBuffer","uniformSizePerDispatch","terrainDataBuffer","computationBuffer"],outputs:void 0,output:"bindGroup",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-72"),expanded:[],variables:[]},{id:72,body:function(t,e,u,n,i){return t.createComputePipeline({layout:t.createPipelineLayout({bindGroupLayouts:[e]}),compute:{module:u,entryPoint:"main",constants:{workgroupSize:n,tileSize:i.tileSize,tileBuffer:i.buffer}}})},inputs:["device","bindGroupLayout","computeShader","workgroupSize","tile"],outputs:void 0,output:"computePipeline",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-863"),expanded:[],variables:[]},{id:863,body:function(){return 2},inputs:[],outputs:void 0,output:"queryCount",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-857"),expanded:[],variables:[]},{id:857,body:function(t,e,u,n){if(!t)return null;const i=e.createQuerySet({type:"timestamp",count:u});return n.then(()=>i.destroy()),i},inputs:["supportsTimestamps","device","queryCount","invalidation"],outputs:void 0,output:"querySet",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-870"),expanded:[],variables:[]},{id:870,body:function(t,e,u,n){const i=t.createBuffer({size:e*8,usage:u.QUERY_RESOLVE|u.COPY_SRC});return n.then(()=>i.destroy()),i},inputs:["device","queryCount","GPUBufferUsage","invalidation"],outputs:void 0,output:"timestampBuffer",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-872"),expanded:[],variables:[]},{id:872,body:function(t,e,u,n){const i=t.createBuffer({size:e*8,usage:u.MAP_READ|u.COPY_DST});return n.then(()=>i.destroy()),i},inputs:["device","queryCount","GPUBufferUsage","invalidation"],outputs:void 0,output:"readbackBuffer",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-1111"),expanded:[],variables:[]},{id:1111,body:function(t,e,u){const n=t.createBuffer({size:32,usage:e.UNIFORM|e.COPY_DST});return u.then(()=>n.destroy()),n},inputs:["device","GPUBufferUsage","invalidation"],outputs:void 0,output:"rtsUniformBuffer",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-959"),expanded:[],variables:[]},{id:959,body:function(t,e){return t(e,{code:`
struct Uniforms {
  contrast: f32,
  brightness: f32
}

@group(0) @binding(0) var<storage, read> values: array<f32>;
@group(0) @binding(1) var<uniform> uniforms: Uniforms;

const PI = ${Math.PI};

fn getIndex(coord: vec2<u32>) -> u32 {
  return coord.y * 512u + coord.x;
}

@vertex
fn vs_main(@builtin(vertex_index) idx: u32) -> @builtin(position) vec4<f32> {
  var pos = array<vec2<f32>, 3>(
    vec2(-4.0, -4.0),
    vec2(4.0, -4.0),
    vec2(0.0, 4.0)
  );
  return vec4<f32>(pos[idx], 0.0, 1.0);
}


@fragment
fn fs_main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
  let coord = vec2<u32>(pos.xy);
  var value = values[getIndex(coord)];
  value = 0.5 + 0.5 * tanh((value - 1.0) * uniforms.contrast + uniforms.brightness);
  value = pow(value, 0.454);
  return vec4<f32>(value, value, value, 1.0);
}
`})},inputs:["createShaderModule","device"],outputs:void 0,output:"rtsShader",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-966"),expanded:[],variables:[]},{id:966,body:function(t,e,u){return t.createRenderPipeline({layout:"auto",vertex:{module:e,entryPoint:"vs_main"},fragment:{module:e,entryPoint:"fs_main",targets:[{format:u}]},primitive:{topology:"triangle-list"}})},inputs:["device","rtsShader","format"],outputs:void 0,output:"rtsPipeline",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-964"),expanded:[],variables:[]},{id:964,body:function(t,e,u,n){return t.createBindGroup({layout:e.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:u}},{binding:1,resource:{buffer:n}}]})},inputs:["device","rtsPipeline","computationBuffer","rtsUniformBuffer"],outputs:void 0,output:"rtsBindGroup",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-70"),expanded:[],variables:[]},{id:70,body:function(t,e,u,n,i,d,l,f,r,s,p,c,y,w,g,x){e.forEach((b,B)=>u.queue.writeBuffer(n,B*i,d([l.tileSize,l.tileSize],b,l.buffer,f,1/e.length)));const m=u.createCommandEncoder();m.clearBuffer(r);const h={};s&&(h.timestampWrites={querySet:p,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1});const v=m.beginComputePass(h);v.setPipeline(c);for(let b=0;b<e.length;b++)v.setBindGroup(0,y,[b*i]),v.dispatchWorkgroups(Math.floor(l.tileSize/w));v.end(),s&&(m.resolveQuerySet(p,0,2,g,0),m.copyBufferToBuffer(g,0,x,0,16)),u.queue.submit([m.finish()])},inputs:["rerun","dirs","device","uniformBuffer","uniformSizePerDispatch","packUniforms","tile","pixelSize","computationBuffer","supportsTimestamps","querySet","computePipeline","bindGroup","workgroupSize","timestampBuffer","readbackBuffer"],outputs:void 0,output:"renderToAO",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-978"),expanded:[],variables:[]},{id:978,body:function(t,e,u,n,i,d,l,f){const r=e.createCommandEncoder();e.queue.writeBuffer(u,0,new Float32Array([Math.min(100,7*n/(1-n)),Math.max(-30,Math.min(30,Math.tan(Math.PI/2*i)))]));const s=r.beginRenderPass({colorAttachments:[{view:d.getCurrentTexture().createView(),loadOp:"clear",clearValue:[0,0,0,1],storeOp:"store"}]});s.setPipeline(l),s.setBindGroup(0,f),s.draw(3),s.end(),e.queue.submit([r.finish()])},inputs:["renderToAO","device","rtsUniformBuffer","contrast","brightness","context","rtsPipeline","rtsBindGroup"],outputs:void 0,output:"renderToScreen",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});
