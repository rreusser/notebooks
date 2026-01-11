const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/lsao-simple-execute-DNkQQO8C.js","assets/lsao-simple-pipeline-BJYmQjK3.js","assets/lsao-execute-CJ42CoD8.js","assets/lsao-pipeline-DMZya29M.js"])))=>i.map(i=>d[i]);
import{_ as w,d as b}from"./index-Bvdv0JJ6.js";(window.location.hostname==="localhost"||window.location.hostname.match(/127\.0\.0\.1/))&&w(async()=>{const{main:i}=await import("./index-Bvdv0JJ6.js").then(u=>u.i);return{main:i}},[]).then(({main:i})=>{window.__observableRuntime=i,console.log("[DebugClient] Runtime module exposed as window.__observableRuntime"),w(()=>import("./debug-client-BJyqFSh-.js"),[])});b({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async()=>{const[{getTerrainTile:i,readImageData:u,decodeTerrainData:m},{getTileSet:f},{createWebGPUContext:d},{createLightingPipeline:e},{computeTileLighting:t},{createSimpleLSAOPipeline:a},{computeSimpleLSAO:o},{computeSimpleLSAOCPU:n},{createLSAOPipeline:c,calculateLevelInfo:r},{computeLSAO:l},{computeLSAOCPU:g},{createNormalMapPipeline:v},{computeNormalMap:x}]=await Promise.all([w(()=>import("./main-D-GlyvSx.js"),[]).then(s=>{if(!("getTerrainTile"in s))throw new SyntaxError("export 'getTerrainTile' not found");if(!("readImageData"in s))throw new SyntaxError("export 'readImageData' not found");if(!("decodeTerrainData"in s))throw new SyntaxError("export 'decodeTerrainData' not found");return s}),w(()=>import("./tile-hierarchy-DpM0M6gN.js"),[]).then(s=>{if(!("getTileSet"in s))throw new SyntaxError("export 'getTileSet' not found");return s}),w(()=>import("./webgpu-context-C7RS1Jcc.js"),[]).then(s=>{if(!("createWebGPUContext"in s))throw new SyntaxError("export 'createWebGPUContext' not found");return s}),w(()=>import("./pipeline-c9KGe_7x.js"),[]).then(s=>{if(!("createLightingPipeline"in s))throw new SyntaxError("export 'createLightingPipeline' not found");return s}),w(()=>import("./execute-C0dM5fY0.js"),[]).then(s=>{if(!("computeTileLighting"in s))throw new SyntaxError("export 'computeTileLighting' not found");return s}),w(()=>import("./lsao-simple-pipeline-BJYmQjK3.js"),[]).then(s=>{if(!("createSimpleLSAOPipeline"in s))throw new SyntaxError("export 'createSimpleLSAOPipeline' not found");return s}),w(()=>import("./lsao-simple-execute-DNkQQO8C.js"),__vite__mapDeps([0,1])).then(s=>{if(!("computeSimpleLSAO"in s))throw new SyntaxError("export 'computeSimpleLSAO' not found");return s}),w(()=>import("./lsao-simple-cpu-Dlww0_AN.js"),[]).then(s=>{if(!("computeSimpleLSAOCPU"in s))throw new SyntaxError("export 'computeSimpleLSAOCPU' not found");return s}),w(()=>import("./lsao-pipeline-DMZya29M.js"),[]).then(s=>{if(!("createLSAOPipeline"in s))throw new SyntaxError("export 'createLSAOPipeline' not found");if(!("calculateLevelInfo"in s))throw new SyntaxError("export 'calculateLevelInfo' not found");return s}),w(()=>import("./lsao-execute-CJ42CoD8.js"),__vite__mapDeps([2,3])).then(s=>{if(!("computeLSAO"in s))throw new SyntaxError("export 'computeLSAO' not found");return s}),w(()=>import("./lsao-cpu-D5hqpa4b.js"),[]).then(s=>{if(!("computeLSAOCPU"in s))throw new SyntaxError("export 'computeLSAOCPU' not found");return s}),w(()=>import("./normal-map-pipeline-qrtDypef.js"),[]).then(s=>{if(!("createNormalMapPipeline"in s))throw new SyntaxError("export 'createNormalMapPipeline' not found");return s}),w(()=>import("./normal-map-execute-BbFluDZz.js"),[]).then(s=>{if(!("computeNormalMap"in s))throw new SyntaxError("export 'computeNormalMap' not found");return s})]);return{getTerrainTile:i,readImageData:u,decodeTerrainData:m,getTileSet:f,createWebGPUContext:d,createLightingPipeline:e,computeTileLighting:t,createSimpleLSAOPipeline:a,computeSimpleLSAO:o,computeSimpleLSAOCPU:n,createLSAOPipeline:c,calculateLevelInfo:r,computeLSAO:l,computeLSAOCPU:g,createNormalMapPipeline:v,computeNormalMap:x}},inputs:[],outputs:["getTerrainTile","readImageData","decodeTerrainData","getTileSet","createWebGPUContext","createLightingPipeline","computeTileLighting","createSimpleLSAOPipeline","computeSimpleLSAO","computeSimpleLSAOCPU","createLSAOPipeline","calculateLevelInfo","computeLSAO","computeLSAOCPU","createNormalMapPipeline","computeNormalMap"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:()=>({coords:{x:795,y:1594,z:12}}),inputs:[],outputs:["coords"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(i,u,m,f)=>{const d=i(u),e=m`<div style="font-family: monospace; font-size: 13px;">
  <strong>Target tile:</strong> ${u.z}/${u.x}/${u.y}<br>
  <strong>Tiles needed for hierarchical computation:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px;">
    ${d.map(t=>m`<li>
      <span style="color: ${t.role==="target"?"#ca4747":"#666"}">
        ${t.role}
      </span>: ${t.z}/${t.x}/${t.y}
    </li>`)}
  </ul>
  <em style="color: #666;">Parent tiles at z-1 provide boundary data for edge handling</em>
</div>`;return f(e),{tiles:d,container:e}},inputs:["getTileSet","coords","html","display"],outputs:["tiles","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(i,u,m)=>{const f=Math.min(i.z,4),d=u.range([-f,-1],{value:-1,step:1,label:"Δz (parent zoom offset)"}),e=m(d);return{maxDeltaZ:f,input:d,deltaZ:e}},inputs:["coords","Inputs","view"],outputs:["maxDeltaZ","input","deltaZ"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:async(i,u,m,f,d,e,t)=>{const{getParentTilesAtLevel:a,assembleParentTileBufferMultiLevel:o}=await w(()=>import("./parent-tile-assembly-multi-level-BPsu5Z-Z.js"),[]).then(s=>{if(!("getParentTilesAtLevel"in s))throw new SyntaxError("export 'getParentTilesAtLevel' not found");if(!("assembleParentTileBufferMultiLevel"in s))throw new SyntaxError("export 'assembleParentTileBufferMultiLevel' not found");return s}),n=a(i,u),c=i.z+u;m(f`<div style="font-family: sans-serif; font-size: 13px; color: #666; margin-bottom: 12px;">
  <strong>Parent zoom level:</strong> z${c} (Δz = ${u})<br>
  <strong>Fetching ${n.length} parent tiles...</strong>
</div>`);const r=[];for(const s of n){const p=await d(s),y=e(p.img),h=t(y);r.push({data:h,width:p.width,height:p.height,tileSize:p.tileSize,role:s.role})}const l=o({targetTile:i,parentTiles:r,deltaZ:u,tileSize:512}),{buffer:g,size:v,targetOffset:x}=l;return{getParentTilesAtLevel:a,assembleParentTileBufferMultiLevel:o,parentTileCoords:n,parentZ:c,parentTiles:r,assembled:l,parentBuffer:g,parentSize:v,targetOffset:x}},inputs:["coords","deltaZ","display","html","getTerrainTile","readImageData","decodeTerrainData"],outputs:["getParentTilesAtLevel","assembleParentTileBufferMultiLevel","parentTileCoords","parentZ","parentTiles","assembled","parentBuffer","parentSize","targetOffset"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(i,u,m,f,d,e,t)=>{const a=document.createElement("canvas");a.width=i,a.height=i;const o=a.getContext("2d"),n=o.createImageData(i,i),c=Math.pow(2,Math.abs(u)),r=512/c;let l=1/0,g=-1/0;for(let s=0;s<m.length;s++)m[s]<l&&(l=m[s]),m[s]>g&&(g=m[s]);for(let s=0;s<i;s++)for(let p=0;p<i;p++){const y=s*i+p,h=(m[y]-l)/(g-l),S=Math.floor(h*180+75),E=Math.floor(h*140+80),I=Math.floor((1-h)*120+60);n.data[y*4]=S,n.data[y*4+1]=E,n.data[y*4+2]=I,n.data[y*4+3]=255}o.putImageData(n,0,0),o.strokeStyle="#ca4747",o.lineWidth=3,o.strokeRect(f[0],f[1],r,r),o.fillStyle="#ca4747",o.font="bold 14px sans-serif",o.fillText("Target Tile",f[0]+5,f[1]+20);const v=Math.round(i/(512/c)),x=d`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Parent Buffer Assembly (${i}×${i} at z${e.z+u} resolution)</strong><br>
    Red box shows target tile region (${r.toFixed(0)}×${r.toFixed(0)} at parent resolution)<br>
    Coverage: ${v}×${v} tiles at z${e.z} | Scale: ${c}:1<br>
    Elevation range: ${l.toFixed(1)}m to ${g.toFixed(1)}m
  </div>
  ${a}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 12px; color: #888;">
    <strong>Key insight:</strong> The ${i}×${i} parent buffer covers a ${v}×${v} block of z${e.z} tiles,
    providing terrain context for horizon initialization in all sweep directions.
    As Δz increases (coarser parents), coverage expands but resolution decreases.
  </div>
</div>`;return t(x),{canvas:a,ctx:o,imageData:n,scale:c,targetSizeAtParent:r,min:l,max:g,tileCoverage:v,container:x}},inputs:["parentSize","deltaZ","parentBuffer","targetOffset","html","coords","display"],outputs:["canvas","ctx","imageData","scale","targetSizeAtParent","min","max","tileCoverage","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(i,u,m,f)=>{const d=document.createElement("canvas");d.width=800,d.height=400;const e=d.getContext("2d");e.fillStyle="#f9f9f9",e.fillRect(0,0,800,400),e.save(),e.translate(50,50);const t=300/768;e.fillStyle="#e0e0e0",e.fillRect(0,0,768*t,768*t),e.strokeStyle="#999",e.lineWidth=1,e.strokeRect(0,0,768*t,768*t),e.fillStyle="rgba(202, 71, 71, 0.2)",e.fillRect(i[0]*t,i[1]*t,256*t,256*t),e.strokeStyle="#ca4747",e.lineWidth=2,e.strokeRect(i[0]*t,i[1]*t,256*t,256*t),e.fillStyle="#333",e.font="bold 14px sans-serif",e.fillText("Parent Buffer",10,-10),e.font="12px sans-serif",e.fillText("768×768 @ z-1",10,8),e.fillStyle="#ca4747",e.font="bold 12px sans-serif",e.fillText("Target",i[0]*t+5,i[1]*t+20),e.font="11px sans-serif",e.fillText(`[${i[0]}, ${i[1]}]`,i[0]*t+5,i[1]*t+35),e.restore(),e.fillStyle="#666",e.font="20px sans-serif",e.fillText("→",370,230),e.font="12px sans-serif",e.fillText("×2 resolution",350,250),e.save(),e.translate(450,50);const a=300/512;e.fillStyle="rgba(202, 71, 71, 0.3)",e.fillRect(0,0,512*a,512*a),e.strokeStyle="#ca4747",e.lineWidth=2,e.strokeRect(0,0,512*a,512*a),e.fillStyle="#333",e.font="bold 14px sans-serif",e.fillText("Target Tile",10,-10),e.font="12px sans-serif",e.fillText(`512×512 @ z${u.z}`,10,8),e.restore(),e.save(),e.translate(50+768*t/2,50+768*t/2);const o=[{dx:1,dy:0,label:"E",color:"#e74c3c"},{dx:-1,dy:0,label:"W",color:"#3498db"},{dx:0,dy:1,label:"S",color:"#2ecc71"},{dx:0,dy:-1,label:"N",color:"#f39c12"}];o.forEach(({dx:c,dy:r,label:l,color:g})=>{e.beginPath(),e.moveTo(0,0),e.lineTo(c*40,r*40),e.strokeStyle=g,e.lineWidth=2,e.stroke(),e.fillStyle=g,e.font="bold 12px sans-serif",e.fillText(l,c*50-5,r*50+5)}),e.restore();const n=m`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Coordinate Mapping & Sweep Directions</strong>
  </div>
  ${d}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 12px; color: #888;">
    Each sweep starts at the parent buffer edge, builds the horizon through parent terrain,
    then continues through the target tile to compute ambient occlusion.
  </div>
</div>`;return f(n),{diagramCanvas:d,ctx:e,scale:t,targetScale:a,arrows:o,container:n}},inputs:["targetOffset","coords","html","display"],outputs:["diagramCanvas","ctx","scale","targetScale","arrows","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:async(i,u,m,f)=>{const d=await i(u),e=m`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    Mapbox Terrain RGB encoding: ${d.width}×${d.height}
    (${d.tileSize}×${d.tileSize} + ${d.buffer}px buffer)
  </div>
  ${d.img}
</div>`;return f(e),{targetTile:d,container:e}},inputs:["getTerrainTile","coords","html","display"],outputs:["targetTile","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(i,u,m,f,d)=>{const e=i(u.img),t=m(e),a=document.createElement("canvas");a.width=u.tileSize,a.height=u.tileSize;const o=a.getContext("2d"),n=o.createImageData(u.tileSize,u.tileSize);let c=1/0,r=-1/0;for(let p=0;p<t.length;p++){const y=t[p];y<c&&(c=y),y>r&&(r=y)}for(let p=0;p<u.tileSize;p++)for(let y=0;y<u.tileSize;y++){const h=(p+u.buffer)*u.width+(y+u.buffer),S=p*u.tileSize+y,E=(t[h]-c)/(r-c),I=Math.floor(E*180+75),M=Math.floor(E*140+80),D=Math.floor((1-E)*120+60);n.data[S*4]=I,n.data[S*4+1]=M,n.data[S*4+2]=D,n.data[S*4+3]=255}o.putImageData(n,0,0);const l=f`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    Elevation range: ${c.toFixed(1)}m to ${r.toFixed(1)}m
  </div>
  ${a}
</div>`;d(l);const g=512,v=1,x=g+2*v,s=new Float32Array(x*x);for(let p=0;p<g;p++)for(let y=0;y<g;y++){const h=(p+u.buffer)*u.width+(y+u.buffer),S=(p+v)*x+(y+v);s[S]=t[h]}for(let p=0;p<x;p++)s[p]=s[x+p],s[(x-1)*x+p]=s[(x-2)*x+p];for(let p=0;p<x;p++)s[p*x]=s[p*x+1],s[p*x+(x-1)]=s[p*x+(x-2)];return{imageData:e,elevations:t,canvas:a,ctx:o,imgData:n,min:c,max:r,container:l,tileSize:g,buffer:v,bufferedSize:x,bufferedData:s}},inputs:["readImageData","targetTile","decodeTerrainData","html","display"],outputs:["imageData","elevations","canvas","ctx","imgData","min","max","container","tileSize","buffer","bufferedSize","bufferedData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:async(i,u,m,f)=>{const{device:d,adapter:e}=await i(),t=u`<div style="font-family: monospace; font-size: 13px;">
  <strong>WebGPU Context:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ Adapter acquired</li>
    <li>✓ Device created</li>
    <li>✓ Ready for compute operations</li>
  </ul>
</div>`;return m(t),f.then(()=>d.destroy()),{device:d,adapter:e,info:t}},inputs:["createWebGPUContext","html","display","invalidation"],outputs:["device","adapter","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:(i,u,m,f)=>{const{pipeline:d,bindGroupLayout:e}=i(u,{tileSize:512,tileBuffer:1}),t=m`<div style="font-family: monospace; font-size: 13px;">
  <strong>Compute Pipeline:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ WGSL shader compiled</li>
    <li>✓ Bind group layout created (3 bindings)</li>
    <li>✓ Compute pipeline ready</li>
    <li style="margin-top: 4px; color: #666;">→ Workgroup size: 16×16</li>
    <li style="color: #666;">→ Algorithm: Normal-based directional lighting</li>
  </ul>
</div>`;return f(t),{pipeline:d,bindGroupLayout:e,info:t}},inputs:["createLightingPipeline","device","html","display"],outputs:["pipeline","bindGroupLayout","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:async(i,u,m,f,d,e,t,a)=>{const n=78271.517578125/Math.pow(2,i.z),c=await u({device:m,pipeline:f,bindGroupLayout:d,terrainData:e,tileSize:512,pixelSize:n});let r=1/0,l=-1/0,g=0;for(let s=0;s<c.length;s++){const p=c[s];p<r&&(r=p),p>l&&(l=p),g+=p}const v={min:r,max:l,mean:g/c.length},x=t`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  Lighting values: min=${v.min.toFixed(3)}, max=${v.max.toFixed(3)}, mean=${v.mean.toFixed(3)}<br>
  Pixel size: ${n.toFixed(3)}m (zoom ${i.z})
</div>`;return a(x),{EARTH_CIRCUMFERENCE:40075017,pixelSize:n,result:c,min:r,max:l,sum:g,stats:v,info:x}},inputs:["coords","computeTileLighting","device","pipeline","bindGroupLayout","bufferedData","html","display"],outputs:["EARTH_CIRCUMFERENCE","pixelSize","result","min","max","sum","stats","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(i,u,m)=>{const f=document.createElement("canvas");f.width=512,f.height=512;const d=f.getContext("2d"),e=d.createImageData(512,512);for(let a=0;a<i.length;a++){const o=Math.floor(Math.min(Math.max(i[a],0),1)*255);e.data[a*4]=o,e.data[a*4+1]=o,e.data[a*4+2]=o,e.data[a*4+3]=255}d.putImageData(e,0,0);const t=u`<div>
  ${f}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Directional lighting from northwest at 45° elevation</em>
  </div>
</div>`;return m(t),{canvas:f,ctx:d,imageData:e,container:t}},inputs:["result","html","display"],outputs:["canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:(i,u,m,f)=>{const{pipeline:d,bindGroupLayout:e}=i(u,{tileSize:512,tileBuffer:1,workgroupSize:128}),t=m`<div style="font-family: monospace; font-size: 13px;">
  <strong>LSAO Compute Pipeline:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ LSAO shader compiled</li>
    <li>✓ Bind group layout created</li>
    <li>✓ Pipeline ready for 4-direction sweep</li>
    <li style="margin-top: 4px; color: #666;">→ Workgroup size: 128 (scanline parallelism)</li>
    <li style="color: #666;">→ Algorithm: Line-sweep horizon tracking</li>
  </ul>
</div>`;return f(t),{lsaoPipeline:d,lsaoBindGroupLayout:e,info:t}},inputs:["createSimpleLSAOPipeline","device","html","display"],outputs:["lsaoPipeline","lsaoBindGroupLayout","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:async(i,u,m,f,d,e,t,a)=>{const n=78271.517578125/Math.pow(2,i.z),c=performance.now(),r=await u({device:m,pipeline:f,bindGroupLayout:d,terrainData:e,tileSize:512,pixelSize:n,workgroupSize:128,directions:[[1,0],[-1,0],[0,1],[0,-1]]}),l=performance.now()-c;let g=1/0,v=-1/0,x=0;for(let y=0;y<r.length;y++){const h=r[y];h<g&&(g=h),h>v&&(v=h),x+=h}const s={min:g,max:v,mean:x/r.length},p=t`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  LSAO values: min=${s.min.toFixed(3)}, max=${s.max.toFixed(3)}, mean=${s.mean.toFixed(3)}<br>
  Computation time: ${l.toFixed(1)}ms (4 direction sweeps)<br>
  Pixel size: ${n.toFixed(3)}m
</div>`;return a(p),{EARTH_CIRCUMFERENCE:40075017,pixelSize:n,startTime:c,lsaoResult:r,elapsed:l,min:g,max:v,sum:x,lsaoStats:s,info:p}},inputs:["coords","computeSimpleLSAO","device","lsaoPipeline","lsaoBindGroupLayout","bufferedData","html","display"],outputs:["EARTH_CIRCUMFERENCE","pixelSize","startTime","lsaoResult","elapsed","min","max","sum","lsaoStats","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(i,u,m)=>{const f=document.createElement("canvas");f.width=512,f.height=512;const d=f.getContext("2d"),e=d.createImageData(512,512);for(let a=0;a<i.length;a++){const o=Math.floor(Math.min(Math.max(i[a],0),1)*255);e.data[a*4]=o,e.data[a*4+1]=o,e.data[a*4+2]=o,e.data[a*4+3]=255}d.putImageData(e,0,0);const t=u`<div>
  ${f}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Simple LSAO result (raw values, no normalization)</em>
  </div>
</div>`;return m(t),{canvas:f,ctx:d,imageData:e,container:t}},inputs:["lsaoResult","html","display"],outputs:["canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(i,u,m,f,d)=>{let e=1/0,t=-1/0;for(let r=0;r<i.length;r++){const l=i[r];l<e&&(e=l),l>t&&(t=l)}const a=document.createElement("canvas");a.width=512,a.height=512;const o=a.getContext("2d"),n=o.createImageData(512,512);for(let r=0;r<512;r++)for(let l=0;l<512;l++){const g=r*512+l,v=(r+1)*u.width+(l+1),x=(i[v]-e)/(t-e),s=Math.min(Math.max(m[g],0),1),p=x*s,y=Math.floor(p*180+75),h=Math.floor(p*140+80),S=Math.floor((1-p)*120+60);n.data[g*4]=y,n.data[g*4+1]=h,n.data[g*4+2]=S,n.data[g*4+3]=255}o.putImageData(n,0,0);const c=f`<div>
  ${a}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Shaded relief: LSAO × normalized elevation with terrain colors</em>
  </div>
</div>`;return d(c),{elevMin:e,elevMax:t,canvas:a,ctx:o,imageData:n,container:c}},inputs:["elevations","targetTile","lsaoResult","html","display"],outputs:["elevMin","elevMax","canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-28"),expanded:[],variables:[]},{id:28,body:(i,u,m,f)=>{const{pipeline:d,bindGroupLayout:e}=i(u,{tileSize:512,tileBuffer:1}),t=m`<div style="font-family: monospace; font-size: 13px;">
  <strong>Normal Map Pipeline:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ Normal map shader compiled</li>
    <li>✓ Web Mercator distortion correction enabled</li>
    <li>✓ Physically-correct normal vectors</li>
    <li style="margin-top: 4px; color: #666;">→ Workgroup size: 16×16</li>
    <li style="color: #666;">→ Output: RGB (R=ny, G=reserved, B=nx)</li>
  </ul>
</div>`;return f(t),{normalPipeline:d,normalBindGroupLayout:e,info:t}},inputs:["createNormalMapPipeline","device","html","display"],outputs:["normalPipeline","normalBindGroupLayout","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:async(i,u,m,f,d,e,t,a)=>{const o=await i({device:u,pipeline:m,bindGroupLayout:f,terrainData:d,tileX:e.x,tileY:e.y,tileZ:e.z,tileSize:512}),n=t`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  Normal map computed (${o.length/4} pixels, vec3 per pixel with 16-byte alignment)
</div>`;return a(n),{normalMapData:o,info:n}},inputs:["computeNormalMap","device","normalPipeline","normalBindGroupLayout","bufferedData","coords","html","display"],outputs:["normalMapData","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(i,u,m,f,d)=>{const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d"),a=t.createImageData(512,512);for(let n=0;n<512*512;n++){const c=(i[n]-u.min)/(u.max-u.min),r=m[n*4+0],l=m[n*4+2],g=c;a.data[n*4+0]=Math.floor(Math.min(Math.max(r,0),1)*255),a.data[n*4+1]=Math.floor(Math.min(Math.max(g,0),1)*255),a.data[n*4+2]=Math.floor(Math.min(Math.max(l,0),1)*255),a.data[n*4+3]=255}t.putImageData(a,0,0);const o=f`<div>
  ${e}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Final Lighting Map</strong><br>
    R: Normal Y (fy = 0.5 + 0.5×ny) | G: Ambient Occlusion | B: Normal X (fx = 0.5 - 0.5×nx)
  </div>
</div>`;return d(o),{canvas:e,ctx:t,imageData:a,container:o}},inputs:["lsaoResult","lsaoStats","normalMapData","html","display"],outputs:["canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-32"),expanded:[],variables:[]},{id:32,body:(i,u,m,f,d)=>{const e=[],t=document.createElement("canvas");t.width=512,t.height=512;let a=t.getContext("2d"),o=a.createImageData(512,512);for(let l=0;l<512*512;l++){const g=Math.floor(i[l*4+0]*255);o.data[l*4+0]=g,o.data[l*4+1]=g,o.data[l*4+2]=g,o.data[l*4+3]=255}a.putImageData(o,0,0);const n=document.createElement("canvas");n.width=512,n.height=512,a=n.getContext("2d"),o=a.createImageData(512,512);for(let l=0;l<512*512;l++){const g=(u[l]-m.min)/(m.max-m.min),v=Math.floor(g*255);o.data[l*4+0]=v,o.data[l*4+1]=v,o.data[l*4+2]=v,o.data[l*4+3]=255}a.putImageData(o,0,0);const c=document.createElement("canvas");c.width=512,c.height=512,a=c.getContext("2d"),o=a.createImageData(512,512);for(let l=0;l<512*512;l++){const g=Math.floor(i[l*4+2]*255);o.data[l*4+0]=g,o.data[l*4+1]=g,o.data[l*4+2]=g,o.data[l*4+3]=255}a.putImageData(o,0,0);const r=f`<div>
  <div>
    ${t}
    <div style="margin-top: 4px; font-family: sans-serif; font-size: 12px; color: #e74c3c; text-align: center;">
      <strong>Red Channel</strong><br>
      Normal Y (fy)
    </div>
  </div>
  <div>
    ${n}
    <div style="margin-top: 4px; font-family: sans-serif; font-size: 12px; color: #27ae60; text-align: center;">
      <strong>Green Channel</strong><br>
      Ambient Occlusion
    </div>
  </div>
  <div>
    ${c}
    <div style="margin-top: 4px; font-family: sans-serif; font-size: 12px; color: #3498db; text-align: center;">
      <strong>Blue Channel</strong><br>
      Normal X (fx)
    </div>
  </div>
</div>`;return d(r),{canvases:e,canvasR:t,ctx:a,imgData:o,canvasG:n,canvasB:c,container:r}},inputs:["normalMapData","lsaoResult","lsaoStats","html","display"],outputs:["canvases","canvasR","ctx","imgData","canvasG","canvasB","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-34"),expanded:[],variables:[]},{id:34,body:(i,u)=>{function m(t){const a=new Float32Array(t*t);return a.fill(0),a}function f(){const a=new Float32Array(589824);for(let o=0;o<768;o++)for(let n=0;n<768;n++)if(n<128)a[o*768+n]=100;else if(n<256){const c=(n-128)/128;a[o*768+n]=100*(1-c)}else a[o*768+n]=0;return a}const d=m(514),e=f();return i(u`<div style="font-family: sans-serif; font-size: 13px; color: #666; margin-bottom: 12px;">
  ✓ Created synthetic test data<br>
  • Target: 514×514 flat terrain (z=0)<br>
  • Parent: 768×768 with elevated ridge to west (z=100)
</div>`),{createSyntheticTarget:m,createSyntheticParent768:f,syntheticTarget:d,syntheticParent:e}},inputs:["display","html"],outputs:["createSyntheticTarget","createSyntheticParent768","syntheticTarget","syntheticParent"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-35"),expanded:[],variables:[]},{id:35,body:(i,u,m)=>{const f=document.createElement("canvas");f.width=768,f.height=200;const d=f.getContext("2d"),e=d.createImageData(768,200);for(let t=0;t<200;t++)for(let a=0;a<768;a++){const n=i[t*768+a]/100,c=Math.floor(n*255);e.data[(t*768+a)*4]=c,e.data[(t*768+a)*4+1]=c,e.data[(t*768+a)*4+2]=c,e.data[(t*768+a)*4+3]=255}return d.putImageData(e,0,0),d.strokeStyle="#ca4747",d.lineWidth=2,d.strokeRect(128,0,512,200),u(m`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Parent Buffer Terrain</strong> (768×768, showing top 200 rows)<br>
    White = elevated (z=100), Black = flat (z=0), Red box = target tile region
  </div>
  ${f}
</div>`),{canvas:f,ctx:d,imageData:e}},inputs:["syntheticParent","display","html"],outputs:["canvas","ctx","imageData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-36"),expanded:[],variables:[]},{id:36,body:async(i,u,m,f,d,e)=>{const{pipeline:t,bindGroupLayout:a}=i(u,{tileSize:512,tileBuffer:1,workgroupSize:128}),o=await m({device:u,pipeline:t,bindGroupLayout:a,terrainData:f,tileSize:512,pixelSize:19.1,workgroupSize:128,directions:[[1,0]]});let n=0;for(let v=0;v<512;v++)n+=o[v*512];const c=n/512;d(e`<div style="font-family: sans-serif; font-size: 13px; color: #666;">
  <strong>Simple LSAO (no parent data):</strong><br>
  West edge mean: ${c.toFixed(4)}<br>
  <em>Should be ~1.0 (no occlusion) since it can't see the elevated parent terrain</em>
</div>`);const r=document.createElement("canvas");r.width=512,r.height=200;const l=r.getContext("2d"),g=l.createImageData(512,200);for(let v=0;v<200;v++)for(let x=0;x<512;x++){const s=Math.floor(o[v*512+x]*255);g.data[(v*512+x)*4]=s,g.data[(v*512+x)*4+1]=s,g.data[(v*512+x)*4+2]=s,g.data[(v*512+x)*4+3]=255}return l.putImageData(g,0,0),d(r),{synthSimplePipeline:t,synthSimpleBindGroup:a,synthSimpleResult:o,westEdgeSum:n,westEdgeMean:c,canvasSimple:r,ctxSimple:l,imgSimple:g}},inputs:["createSimpleLSAOPipeline","device","computeSimpleLSAO","syntheticTarget","display","html"],outputs:["synthSimplePipeline","synthSimpleBindGroup","synthSimpleResult","westEdgeSum","westEdgeMean","canvasSimple","ctxSimple","imgSimple"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-37"),expanded:[],variables:[]},{id:37,body:async(i,u,m,f,d,e,t,a)=>{const o=[i(-1,512)],{pipeline:n,bindGroupLayout:c}=u(m,{tileSize:512,tileBuffer:1,numLevels:1,workgroupSize:128}),r=await f({device:m,pipeline:n,bindGroupLayout:c,targetData:d,parentLevels:[e],levelInfo:o,tileSize:512,pixelSize:19.1,workgroupSize:128,directions:[[1,0]]});let l=0;for(let p=0;p<512;p++)l+=r[p*512];const g=l/512;t(a`<div style="font-family: sans-serif; font-size: 13px; color: #666;">
  <strong>Multi-Level LSAO (with parent data):</strong><br>
  West edge mean: ${g.toFixed(4)}<br>
  <em>Should be significantly &lt; 1.0 (strong occlusion from elevated ridge)</em>
</div>`);const v=document.createElement("canvas");v.width=512,v.height=200;const x=v.getContext("2d"),s=x.createImageData(512,200);for(let p=0;p<200;p++)for(let y=0;y<512;y++){const h=Math.floor(r[p*512+y]*255);s.data[(p*512+y)*4]=h,s.data[(p*512+y)*4+1]=h,s.data[(p*512+y)*4+2]=h,s.data[(p*512+y)*4+3]=255}return x.putImageData(s,0,0),t(v),{synthLevelInfo:o,synthMultiPipeline:n,synthMultiBindGroup:c,synthMultiResult:r,westEdgeSum:l,westEdgeMean:g,canvasMulti:v,ctxMulti:x,imgMulti:s}},inputs:["calculateLevelInfo","createLSAOPipeline","device","computeLSAO","syntheticTarget","syntheticParent","display","html"],outputs:["synthLevelInfo","synthMultiPipeline","synthMultiBindGroup","synthMultiResult","westEdgeSum","westEdgeMean","canvasMulti","ctxMulti","imgMulti"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-38"),expanded:[],variables:[]},{id:38,body:(i,u,m,f)=>{const d=document.createElement("canvas");d.width=512,d.height=100;const e=d.getContext("2d"),t=e.createImageData(512,100);for(let a=0;a<100;a++)for(let o=0;o<512;o++){const n=a*512+o,c=i[n]-u[n],r=Math.floor(Math.min(Math.max(c*2,0),1)*255),l=Math.floor(Math.min(Math.max(-c*2,0),1)*255);t.data[n*4]=r,t.data[n*4+1]=0,t.data[n*4+2]=l,t.data[n*4+3]=255}return e.putImageData(t,0,0),m(f`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Difference Map (Simple - Multi)</strong> - Top 100 rows<br>
    <span style="color: #e74c3c;">■</span> Red = Multi-level shows MORE shadow (correct)<br>
    <span style="color: #3498db;">■</span> Blue = Multi-level shows LESS shadow (incorrect)
  </div>
  ${d}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Expected:</strong> West edge (left) should be RED (multi-level sees elevated parent terrain)<br>
    <strong>If blue on west edge:</strong> Bug - multi-level is not correctly sampling parent data
  </div>
</div>`),{canvas:d,ctx:e,imageData:t}},inputs:["synthSimpleResult","synthMultiResult","display","html"],outputs:["canvas","ctx","imageData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-40"),expanded:[],variables:[]},{id:40,body:(i,u)=>{const m=i.range([1,3],{value:2,step:1,label:"Number of parent levels"}),f=u(m);return{numLevelsInput:m,numLevels:f}},inputs:["Inputs","view"],outputs:["numLevelsInput","numLevels"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:async(i,u,m,f,d,e,t,a)=>{const{getParentTilesAtLevel:o,assembleParentTileBufferMultiLevel:n}=await w(()=>import("./parent-tile-assembly-multi-level-BPsu5Z-Z.js"),[]).then(l=>{if(!("getParentTilesAtLevel"in l))throw new SyntaxError("export 'getParentTilesAtLevel' not found");if(!("assembleParentTileBufferMultiLevel"in l))throw new SyntaxError("export 'assembleParentTileBufferMultiLevel' not found");return l});i(u`<div style="font-family: sans-serif; font-size: 13px; color: #666; margin-bottom: 12px;">
  <strong>Fetching parent tiles for ${m} level${m>1?"s":""}...</strong>
</div>`);const c=[],r=[];for(let l=1;l<=m;l++){const g=-l,v=o(f,g),x=[];for(const p of v){const y=await d(p),h=e(y.img),S=t(h);x.push({data:S,width:y.width,height:y.height,tileSize:y.tileSize,role:p.role})}const s=n({targetTile:f,parentTiles:x,deltaZ:g,tileSize:512});c.push(s.buffer),r.push(a(g,512))}return i(u`<div style="font-family: sans-serif; font-size: 13px; color: #666; margin-bottom: 12px;">
  ✓ Assembled ${m} parent level${m>1?"s":""}:<br>
  ${r.map((l,g)=>u`
    <span style="margin-left: 12px;">• Level ${g}: ${l.bufferSize}×${l.bufferSize} (Δz=${-(g+1)})</span><br>
  `)}
</div>`),{getParentTilesAtLevel:o,assembleParentTileBufferMultiLevel:n,parentLevelsData:c,levelInfo:r}},inputs:["display","html","numLevels","coords","getTerrainTile","readImageData","decodeTerrainData","calculateLevelInfo"],outputs:["getParentTilesAtLevel","assembleParentTileBufferMultiLevel","parentLevelsData","levelInfo"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-42"),expanded:[],variables:[]},{id:42,body:(i,u,m,f,d)=>{const{pipeline:e,bindGroupLayout:t}=i(u,{tileSize:512,tileBuffer:1,numLevels:m,workgroupSize:128});return f(d`<div style="font-family: sans-serif; font-size: 13px; color: #666; margin-bottom: 12px;">
  ✓ Created multi-level LSAO pipeline (${m} levels)
</div>`),{multiLevelPipeline:e,multiLevelBindGroupLayout:t}},inputs:["createLSAOPipeline","device","numLevels","display","html"],outputs:["multiLevelPipeline","multiLevelBindGroupLayout"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-43"),expanded:[],variables:[]},{id:43,body:async(i,u,m,f,d,e,t,a,o,n,c,r,l)=>{const v=78271.517578125/Math.pow(2,i.z),x=performance.now(),s=await u({device:m,pipeline:f,bindGroupLayout:d,targetData:e,parentLevels:t,levelInfo:a,tileSize:512,pixelSize:v,workgroupSize:128,directions:[[1,0],[-1,0],[0,1],[0,-1]]}),p=performance.now()-x;let y=1/0,h=-1/0,S=0;for(let L=0;L<s.length;L++){const z=s[L];z<y&&(y=z),z>h&&(h=z),S+=z}const E={min:y,max:h,mean:S/s.length};let I=0,M=0;for(let L=0;L<s.length;L++){const z=Math.abs(s[L]-o[L]);I+=z,M=Math.max(M,z)}const D=I/s.length,P=D/n.mean*100,C=c`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  <strong>Multi-Level LSAO Results:</strong><br>
  Values: min=${E.min.toFixed(3)}, max=${E.max.toFixed(3)}, mean=${E.mean.toFixed(3)}<br>
  Computation time: ${p.toFixed(1)}ms (4 direction sweeps × ${r} level${r>1?"s":""})<br>
  Status: ${y>=0&&h<=1.1?"✓ Values in expected range":"⚠️ Values outside expected range"}<br>
  <br>
  <strong>Comparison to Simple LSAO:</strong><br>
  Simple LSAO mean: ${n.mean.toFixed(3)}<br>
  Mean difference: ${D.toFixed(4)} (${P.toFixed(1)}%)<br>
  Max difference: ${M.toFixed(4)}<br>
  ${P>10?'<span style="color: #ca4747;">⚠️ Large difference suggests possible bug</span>':'<span style="color: #27ae60;">✓ Difference within expected range</span>'}
</div>`;return l(C),{EARTH_CIRCUMFERENCE:40075017,pixelSize:v,startTime:x,multiLevelResult:s,elapsed:p,min:y,max:h,sum:S,multiLevelStats:E,totalDiff:I,maxDiff:M,meanDiff:D,meanDiffPercent:P,info:C}},inputs:["coords","computeLSAO","device","multiLevelPipeline","multiLevelBindGroupLayout","bufferedData","parentLevelsData","levelInfo","lsaoResult","lsaoStats","html","numLevels","display"],outputs:["EARTH_CIRCUMFERENCE","pixelSize","startTime","multiLevelResult","elapsed","min","max","sum","multiLevelStats","totalDiff","maxDiff","meanDiff","meanDiffPercent","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-44"),expanded:[],variables:[]},{id:44,body:(i,u,m,f)=>{const d=document.createElement("canvas");d.width=512,d.height=512;const e=d.getContext("2d"),t=e.createImageData(512,512);for(let o=0;o<i.length;o++){const n=Math.floor(Math.min(Math.max(i[o],0),1)*255);t.data[o*4]=n,t.data[o*4+1]=n,t.data[o*4+2]=n,t.data[o*4+3]=255}e.putImageData(t,0,0);const a=u`<div>
  ${d}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Multi-level LSAO result (${m} parent level${m>1?"s":""}, raw values, no normalization)</em><br>
    <strong>Benefit:</strong> Parent tiles provide proper horizon initialization, eliminating boundary artifacts
  </div>
</div>`;return f(a),{canvas:d,ctx:e,imageData:t,container:a}},inputs:["multiLevelResult","html","numLevels","display"],outputs:["canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-46"),expanded:[],variables:[]},{id:46,body:(i,u,m,f,d)=>{const e=document.createElement("canvas");e.width=512,e.height=512;let t=e.getContext("2d"),a=t.createImageData(512,512);for(let r=0;r<i.length;r++){const l=Math.floor(Math.min(Math.max(i[r],0),1)*255);a.data[r*4]=l,a.data[r*4+1]=l,a.data[r*4+2]=l,a.data[r*4+3]=255}t.putImageData(a,0,0);const o=document.createElement("canvas");o.width=512,o.height=512,t=o.getContext("2d"),a=t.createImageData(512,512);for(let r=0;r<u.length;r++){const l=Math.floor(Math.min(Math.max(u[r],0),1)*255);a.data[r*4]=l,a.data[r*4+1]=l,a.data[r*4+2]=l,a.data[r*4+3]=255}t.putImageData(a,0,0);const n=document.createElement("canvas");n.width=512,n.height=512,t=n.getContext("2d"),a=t.createImageData(512,512);for(let r=0;r<i.length;r++){const l=Math.abs(u[r]-i[r]),g=Math.floor(l*512);a.data[r*4]=Math.min(g,255),a.data[r*4+1]=Math.min(g,255),a.data[r*4+2]=Math.min(g,255),a.data[r*4+3]=255}t.putImageData(a,0,0);const c=m`<div style="display: flex; flex-direction: column; gap: 24px;">
  <div>
    <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
      <strong>Simple LSAO</strong> (target tile only)
    </div>
    ${e}
  </div>
  <div>
    <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
      <strong>Multi-Level LSAO</strong> (${f} parent level${f>1?"s":""})
    </div>
    ${o}
  </div>
  <div>
    <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
      <strong>Difference (×2)</strong> - Edge improvements highlighted
    </div>
    ${n}
  </div>
</div>`;return d(c),{canvasSimple:e,ctx:t,imgData:a,canvasMulti:o,canvasDiff:n,container:c}},inputs:["lsaoResult","multiLevelResult","html","numLevels","display"],outputs:["canvasSimple","ctx","imgData","canvasMulti","canvasDiff","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-48"),expanded:[],variables:[]},{id:48,body:(i,u,m,f,d,e)=>{const t=performance.now(),a=40075017,o=a/512/Math.pow(2,i.z),n=u({terrainData:m,tileSize:512,pixelSize:o,directions:[[1,0],[-1,0],[0,1],[0,-1]]}),c=performance.now()-t;let r=1/0,l=-1/0,g=0;for(let S=0;S<n.length;S++){const E=n[S];E<r&&(r=E),E>l&&(l=E),g+=E}const v={min:r,max:l,mean:g/n.length};let x=0,s=0,p=0;for(let S=0;S<n.length;S++){const E=Math.abs(n[S]-f[S]);x+=E,s=Math.max(s,E),E>.001&&p++}const y=x/n.length,h=d`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  <strong>Simple LSAO - CPU Implementation:</strong><br>
  Values: min=${v.min.toFixed(3)}, max=${v.max.toFixed(3)}, mean=${v.mean.toFixed(3)}<br>
  Computation time: ${c.toFixed(1)}ms<br>
  <br>
  <strong>CPU vs GPU Comparison:</strong><br>
  Mean absolute difference: ${y.toFixed(6)}<br>
  Max absolute difference: ${s.toFixed(6)}<br>
  Pixels with diff > 0.001: ${p} (${(p/n.length*100).toFixed(2)}%)<br>
  ${y<1e-4?'<span style="color: #27ae60;">✓ Excellent match - implementations are equivalent</span>':y<.001?'<span style="color: #f39c12;">⚠️ Small differences - likely floating-point precision</span>':'<span style="color: #ca4747;">⚠️ Large differences - possible bug!</span>'}
</div>`;return e(h),{cpuStartTime:t,EARTH_CIRCUMFERENCE:a,cpuPixelSize:o,cpuSimpleResult:n,cpuElapsed:c,min:r,max:l,sum:g,cpuStats:v,totalDiff:x,maxDiff:s,diffCount:p,meanDiff:y,info:h}},inputs:["coords","computeSimpleLSAOCPU","bufferedData","lsaoResult","html","display"],outputs:["cpuStartTime","EARTH_CIRCUMFERENCE","cpuPixelSize","cpuSimpleResult","cpuElapsed","min","max","sum","cpuStats","totalDiff","maxDiff","diffCount","meanDiff","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:(i,u,m,f)=>{const d=document.createElement("canvas");d.width=512,d.height=512;let e=d.getContext("2d"),t=e.createImageData(512,512);for(let n=0;n<i.length;n++){const c=Math.floor(Math.min(Math.max(i[n],0),1)*255);t.data[n*4]=c,t.data[n*4+1]=c,t.data[n*4+2]=c,t.data[n*4+3]=255}e.putImageData(t,0,0);const a=document.createElement("canvas");a.width=512,a.height=512,e=a.getContext("2d"),t=e.createImageData(512,512);for(let n=0;n<i.length;n++){const c=Math.abs(i[n]-u[n]),r=Math.floor(Math.min(c*1e3,1)*255);t.data[n*4]=r,t.data[n*4+1]=r,t.data[n*4+2]=r,t.data[n*4+3]=255}e.putImageData(t,0,0);const o=m`<div style="display: flex; flex-direction: column; gap: 24px;">
  <div>
    <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
      <strong>CPU Result</strong>
    </div>
    ${d}
  </div>
  <div>
    <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
      <strong>Absolute Difference (×1000)</strong> - White = larger difference
    </div>
    ${a}
  </div>
</div>`;return f(o),{canvasCPU:d,ctx:e,imgData:t,canvasDiff:a,container:o}},inputs:["cpuSimpleResult","lsaoResult","html","display"],outputs:["canvasCPU","ctx","imgData","canvasDiff","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-50"),expanded:[],variables:[]},{id:50,body:(i,u,m,f,d,e,t,a,o)=>{const n=performance.now(),c=40075017,r=c/512/Math.pow(2,i.z),l=u({targetData:m,parentLevels:f,levelInfo:d,tileSize:512,pixelSize:r,directions:[[1,0],[-1,0],[0,1],[0,-1]]}),g=performance.now()-n;let v=1/0,x=-1/0,s=0;for(let M=0;M<l.length;M++){const D=l[M];D<v&&(v=D),D>x&&(x=D),s+=D}const p={min:v,max:x,mean:s/l.length};let y=0,h=0,S=0;for(let M=0;M<l.length;M++){const D=Math.abs(l[M]-e[M]);y+=D,h=Math.max(h,D),D>.001&&S++}const E=y/l.length,I=t`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  <strong>Multi-Level LSAO - CPU Implementation (${a} levels):</strong><br>
  Values: min=${p.min.toFixed(3)}, max=${p.max.toFixed(3)}, mean=${p.mean.toFixed(3)}<br>
  Computation time: ${g.toFixed(1)}ms<br>
  <br>
  <strong>CPU vs GPU Comparison:</strong><br>
  Mean absolute difference: ${E.toFixed(6)}<br>
  Max absolute difference: ${h.toFixed(6)}<br>
  Pixels with diff > 0.001: ${S} (${(S/l.length*100).toFixed(2)}%)<br>
  ${E<1e-4?'<span style="color: #27ae60;">✓ Excellent match - implementations are equivalent</span>':E<.001?'<span style="color: #f39c12;">⚠️ Small differences - likely floating-point precision</span>':'<span style="color: #ca4747;">⚠️ Large differences - possible bug!</span>'}
</div>`;return o(I),{cpuMultiStartTime:n,EARTH_CIRCUMFERENCE:c,cpuMultiPixelSize:r,cpuMultiResult:l,cpuMultiElapsed:g,min:v,max:x,sum:s,cpuMultiStats:p,totalDiff:y,maxDiff:h,diffCount:S,meanDiff:E,info:I}},inputs:["coords","computeLSAOCPU","bufferedData","parentLevelsData","levelInfo","multiLevelResult","html","numLevels","display"],outputs:["cpuMultiStartTime","EARTH_CIRCUMFERENCE","cpuMultiPixelSize","cpuMultiResult","cpuMultiElapsed","min","max","sum","cpuMultiStats","totalDiff","maxDiff","diffCount","meanDiff","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-51"),expanded:[],variables:[]},{id:51,body:(i,u,m,f,d)=>{const e=document.createElement("canvas");e.width=512,e.height=512;let t=e.getContext("2d"),a=t.createImageData(512,512);for(let c=0;c<i.length;c++){const r=Math.floor(Math.min(Math.max(i[c],0),1)*255);a.data[c*4]=r,a.data[c*4+1]=r,a.data[c*4+2]=r,a.data[c*4+3]=255}t.putImageData(a,0,0);const o=document.createElement("canvas");o.width=512,o.height=512,t=o.getContext("2d"),a=t.createImageData(512,512);for(let c=0;c<i.length;c++){const r=Math.abs(i[c]-u[c]),l=Math.floor(Math.min(r*1e3,1)*255);a.data[c*4]=l,a.data[c*4+1]=l,a.data[c*4+2]=l,a.data[c*4+3]=255}t.putImageData(a,0,0);const n=m`<div style="display: flex; flex-direction: column; gap: 24px;">
  <div>
    <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
      <strong>CPU Result (${f} levels)</strong>
    </div>
    ${e}
  </div>
  <div>
    <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
      <strong>Absolute Difference (×1000)</strong> - White = larger difference
    </div>
    ${o}
  </div>
</div>`;return d(n),{canvasCPU:e,ctx:t,imgData:a,canvasDiff:o,container:n}},inputs:["cpuMultiResult","multiLevelResult","html","numLevels","display"],outputs:["canvasCPU","ctx","imgData","canvasDiff","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
