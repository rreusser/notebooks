const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/lsao-simple-execute-DNkQQO8C.js","assets/lsao-simple-pipeline-BJYmQjK3.js"])))=>i.map(i=>d[i]);
import{d as h,_ as w}from"./index-ByB2dbry.js";h({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async()=>{const[{getTerrainTile:n,readImageData:l,decodeTerrainData:c},{getTileSet:u},{createWebGPUContext:s},{createLightingPipeline:e},{computeTileLighting:t},{createSimpleLSAOPipeline:a},{computeSimpleLSAO:r},{createNormalMapPipeline:i},{computeNormalMap:f}]=await Promise.all([w(()=>import("./main-B7vTJ1AF.js"),[]).then(o=>{if(!("getTerrainTile"in o))throw new SyntaxError("export 'getTerrainTile' not found");if(!("readImageData"in o))throw new SyntaxError("export 'readImageData' not found");if(!("decodeTerrainData"in o))throw new SyntaxError("export 'decodeTerrainData' not found");return o}),w(()=>import("./tile-hierarchy-DpM0M6gN.js"),[]).then(o=>{if(!("getTileSet"in o))throw new SyntaxError("export 'getTileSet' not found");return o}),w(()=>import("./webgpu-context-DZ_3bofO.js"),[]).then(o=>{if(!("createWebGPUContext"in o))throw new SyntaxError("export 'createWebGPUContext' not found");return o}),w(()=>import("./pipeline-c9KGe_7x.js"),[]).then(o=>{if(!("createLightingPipeline"in o))throw new SyntaxError("export 'createLightingPipeline' not found");return o}),w(()=>import("./execute-C-YjLXhg.js"),[]).then(o=>{if(!("computeTileLighting"in o))throw new SyntaxError("export 'computeTileLighting' not found");return o}),w(()=>import("./lsao-simple-pipeline-BJYmQjK3.js"),[]).then(o=>{if(!("createSimpleLSAOPipeline"in o))throw new SyntaxError("export 'createSimpleLSAOPipeline' not found");return o}),w(()=>import("./lsao-simple-execute-DNkQQO8C.js"),__vite__mapDeps([0,1])).then(o=>{if(!("computeSimpleLSAO"in o))throw new SyntaxError("export 'computeSimpleLSAO' not found");return o}),w(()=>import("./normal-map-pipeline-qrtDypef.js"),[]).then(o=>{if(!("createNormalMapPipeline"in o))throw new SyntaxError("export 'createNormalMapPipeline' not found");return o}),w(()=>import("./normal-map-execute-BbFluDZz.js"),[]).then(o=>{if(!("computeNormalMap"in o))throw new SyntaxError("export 'computeNormalMap' not found");return o})]);return{getTerrainTile:n,readImageData:l,decodeTerrainData:c,getTileSet:u,createWebGPUContext:s,createLightingPipeline:e,computeTileLighting:t,createSimpleLSAOPipeline:a,computeSimpleLSAO:r,createNormalMapPipeline:i,computeNormalMap:f}},inputs:[],outputs:["getTerrainTile","readImageData","decodeTerrainData","getTileSet","createWebGPUContext","createLightingPipeline","computeTileLighting","createSimpleLSAOPipeline","computeSimpleLSAO","createNormalMapPipeline","computeNormalMap"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:()=>({coords:{x:795,y:1594,z:12}}),inputs:[],outputs:["coords"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(n,l,c,u)=>{const s=n(l),e=c`<div style="font-family: monospace; font-size: 13px;">
  <strong>Target tile:</strong> ${l.z}/${l.x}/${l.y}<br>
  <strong>Tiles needed for hierarchical computation:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px;">
    ${s.map(t=>c`<li>
      <span style="color: ${t.role==="target"?"#ca4747":"#666"}">
        ${t.role}
      </span>: ${t.z}/${t.x}/${t.y}
    </li>`)}
  </ul>
  <em style="color: #666;">Parent tiles at z-1 provide boundary data for edge handling</em>
</div>`;return u(e),{tiles:s,container:e}},inputs:["getTileSet","coords","html","display"],outputs:["tiles","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,l,c)=>{const u=Math.min(n.z,4),s=l.range([-u,-1],{value:-1,step:1,label:"Δz (parent zoom offset)"}),e=c(s);return{maxDeltaZ:u,input:s,deltaZ:e}},inputs:["coords","Inputs","view"],outputs:["maxDeltaZ","input","deltaZ"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:async(n,l,c,u,s,e,t)=>{const{getParentTilesAtLevel:a,assembleParentTileBufferMultiLevel:r}=await w(()=>import("./parent-tile-assembly-multi-level-CF4pr_Fo.js"),[]).then(g=>{if(!("getParentTilesAtLevel"in g))throw new SyntaxError("export 'getParentTilesAtLevel' not found");if(!("assembleParentTileBufferMultiLevel"in g))throw new SyntaxError("export 'assembleParentTileBufferMultiLevel' not found");return g}),i=a(n,l),f=n.z+l;c(u`<div style="font-family: sans-serif; font-size: 13px; color: #666; margin-bottom: 12px;">
  <strong>Parent zoom level:</strong> z${f} (Δz = ${l})<br>
  <strong>Fetching ${i.length} parent tiles...</strong>
</div>`);const o=[];for(const g of i){const p=await s(g),v=e(p.img),b=t(v);o.push({data:b,width:p.width,height:p.height,tileSize:p.tileSize,role:g.role})}const d=r({targetTile:n,parentTiles:o,deltaZ:l,tileSize:512}),{buffer:m,size:y,targetOffset:x}=d;return{getParentTilesAtLevel:a,assembleParentTileBufferMultiLevel:r,parentTileCoords:i,parentZ:f,parentTiles:o,assembled:d,parentBuffer:m,parentSize:y,targetOffset:x}},inputs:["coords","deltaZ","display","html","getTerrainTile","readImageData","decodeTerrainData"],outputs:["getParentTilesAtLevel","assembleParentTileBufferMultiLevel","parentTileCoords","parentZ","parentTiles","assembled","parentBuffer","parentSize","targetOffset"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,l,c,u,s,e,t)=>{const a=document.createElement("canvas");a.width=n,a.height=n;const r=a.getContext("2d"),i=r.createImageData(n,n),f=Math.pow(2,Math.abs(l)),o=512/f;let d=1/0,m=-1/0;for(let g=0;g<c.length;g++)c[g]<d&&(d=c[g]),c[g]>m&&(m=c[g]);for(let g=0;g<n;g++)for(let p=0;p<n;p++){const v=g*n+p,b=(c[v]-d)/(m-d),E=Math.floor(b*180+75),z=Math.floor(b*140+80),S=Math.floor((1-b)*120+60);i.data[v*4]=E,i.data[v*4+1]=z,i.data[v*4+2]=S,i.data[v*4+3]=255}r.putImageData(i,0,0),r.strokeStyle="#ca4747",r.lineWidth=3,r.strokeRect(u[0],u[1],o,o),r.fillStyle="#ca4747",r.font="bold 14px sans-serif",r.fillText("Target Tile",u[0]+5,u[1]+20);const y=Math.round(n/(512/f)),x=s`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Parent Buffer Assembly (${n}×${n} at z${e.z+l} resolution)</strong><br>
    Red box shows target tile region (${o.toFixed(0)}×${o.toFixed(0)} at parent resolution)<br>
    Coverage: ${y}×${y} tiles at z${e.z} | Scale: ${f}:1<br>
    Elevation range: ${d.toFixed(1)}m to ${m.toFixed(1)}m
  </div>
  ${a}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 12px; color: #888;">
    <strong>Key insight:</strong> The ${n}×${n} parent buffer covers a ${y}×${y} block of z${e.z} tiles,
    providing terrain context for horizon initialization in all sweep directions.
    As Δz increases (coarser parents), coverage expands but resolution decreases.
  </div>
</div>`;return t(x),{canvas:a,ctx:r,imageData:i,scale:f,targetSizeAtParent:o,min:d,max:m,tileCoverage:y,container:x}},inputs:["parentSize","deltaZ","parentBuffer","targetOffset","html","coords","display"],outputs:["canvas","ctx","imageData","scale","targetSizeAtParent","min","max","tileCoverage","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,l,c,u)=>{const s=document.createElement("canvas");s.width=800,s.height=400;const e=s.getContext("2d");e.fillStyle="#f9f9f9",e.fillRect(0,0,800,400),e.save(),e.translate(50,50);const t=300/768;e.fillStyle="#e0e0e0",e.fillRect(0,0,768*t,768*t),e.strokeStyle="#999",e.lineWidth=1,e.strokeRect(0,0,768*t,768*t),e.fillStyle="rgba(202, 71, 71, 0.2)",e.fillRect(n[0]*t,n[1]*t,256*t,256*t),e.strokeStyle="#ca4747",e.lineWidth=2,e.strokeRect(n[0]*t,n[1]*t,256*t,256*t),e.fillStyle="#333",e.font="bold 14px sans-serif",e.fillText("Parent Buffer",10,-10),e.font="12px sans-serif",e.fillText("768×768 @ z-1",10,8),e.fillStyle="#ca4747",e.font="bold 12px sans-serif",e.fillText("Target",n[0]*t+5,n[1]*t+20),e.font="11px sans-serif",e.fillText(`[${n[0]}, ${n[1]}]`,n[0]*t+5,n[1]*t+35),e.restore(),e.fillStyle="#666",e.font="20px sans-serif",e.fillText("→",370,230),e.font="12px sans-serif",e.fillText("×2 resolution",350,250),e.save(),e.translate(450,50);const a=300/512;e.fillStyle="rgba(202, 71, 71, 0.3)",e.fillRect(0,0,512*a,512*a),e.strokeStyle="#ca4747",e.lineWidth=2,e.strokeRect(0,0,512*a,512*a),e.fillStyle="#333",e.font="bold 14px sans-serif",e.fillText("Target Tile",10,-10),e.font="12px sans-serif",e.fillText(`512×512 @ z${l.z}`,10,8),e.restore(),e.save(),e.translate(50+768*t/2,50+768*t/2);const r=[{dx:1,dy:0,label:"E",color:"#e74c3c"},{dx:-1,dy:0,label:"W",color:"#3498db"},{dx:0,dy:1,label:"S",color:"#2ecc71"},{dx:0,dy:-1,label:"N",color:"#f39c12"}];r.forEach(({dx:f,dy:o,label:d,color:m})=>{e.beginPath(),e.moveTo(0,0),e.lineTo(f*40,o*40),e.strokeStyle=m,e.lineWidth=2,e.stroke(),e.fillStyle=m,e.font="bold 12px sans-serif",e.fillText(d,f*50-5,o*50+5)}),e.restore();const i=c`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Coordinate Mapping & Sweep Directions</strong>
  </div>
  ${s}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 12px; color: #888;">
    Each sweep starts at the parent buffer edge, builds the horizon through parent terrain,
    then continues through the target tile to compute ambient occlusion.
  </div>
</div>`;return u(i),{diagramCanvas:s,ctx:e,scale:t,targetScale:a,arrows:r,container:i}},inputs:["targetOffset","coords","html","display"],outputs:["diagramCanvas","ctx","scale","targetScale","arrows","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:async(n,l,c,u)=>{const s=await n(l),e=c`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    Mapbox Terrain RGB encoding: ${s.width}×${s.height}
    (${s.tileSize}×${s.tileSize} + ${s.buffer}px buffer)
  </div>
  ${s.img}
</div>`;return u(e),{targetTile:s,container:e}},inputs:["getTerrainTile","coords","html","display"],outputs:["targetTile","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(n,l,c,u,s)=>{const e=n(l.img),t=c(e),a=document.createElement("canvas");a.width=l.tileSize,a.height=l.tileSize;const r=a.getContext("2d"),i=r.createImageData(l.tileSize,l.tileSize);let f=1/0,o=-1/0;for(let p=0;p<t.length;p++){const v=t[p];v<f&&(f=v),v>o&&(o=v)}for(let p=0;p<l.tileSize;p++)for(let v=0;v<l.tileSize;v++){const b=(p+l.buffer)*l.width+(v+l.buffer),E=p*l.tileSize+v,z=(t[b]-f)/(o-f),S=Math.floor(z*180+75),I=Math.floor(z*140+80),T=Math.floor((1-z)*120+60);i.data[E*4]=S,i.data[E*4+1]=I,i.data[E*4+2]=T,i.data[E*4+3]=255}r.putImageData(i,0,0);const d=u`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    Elevation range: ${f.toFixed(1)}m to ${o.toFixed(1)}m
  </div>
  ${a}
</div>`;s(d);const m=512,y=1,x=m+2*y,g=new Float32Array(x*x);for(let p=0;p<m;p++)for(let v=0;v<m;v++){const b=(p+l.buffer)*l.width+(v+l.buffer),E=(p+y)*x+(v+y);g[E]=t[b]}for(let p=0;p<x;p++)g[p]=g[x+p],g[(x-1)*x+p]=g[(x-2)*x+p];for(let p=0;p<x;p++)g[p*x]=g[p*x+1],g[p*x+(x-1)]=g[p*x+(x-2)];return{imageData:e,elevations:t,canvas:a,ctx:r,imgData:i,min:f,max:o,container:d,tileSize:m,buffer:y,bufferedSize:x,bufferedData:g}},inputs:["readImageData","targetTile","decodeTerrainData","html","display"],outputs:["imageData","elevations","canvas","ctx","imgData","min","max","container","tileSize","buffer","bufferedSize","bufferedData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:async(n,l,c,u)=>{const{device:s,adapter:e}=await n(),t=l`<div style="font-family: monospace; font-size: 13px;">
  <strong>WebGPU Context:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ Adapter acquired</li>
    <li>✓ Device created</li>
    <li>✓ Ready for compute operations</li>
  </ul>
</div>`;return c(t),u.then(()=>s.destroy()),{device:s,adapter:e,info:t}},inputs:["createWebGPUContext","html","display","invalidation"],outputs:["device","adapter","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:(n,l,c,u)=>{const{pipeline:s,bindGroupLayout:e}=n(l,{tileSize:512,tileBuffer:1}),t=c`<div style="font-family: monospace; font-size: 13px;">
  <strong>Compute Pipeline:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ WGSL shader compiled</li>
    <li>✓ Bind group layout created (3 bindings)</li>
    <li>✓ Compute pipeline ready</li>
    <li style="margin-top: 4px; color: #666;">→ Workgroup size: 16×16</li>
    <li style="color: #666;">→ Algorithm: Normal-based directional lighting</li>
  </ul>
</div>`;return u(t),{pipeline:s,bindGroupLayout:e,info:t}},inputs:["createLightingPipeline","device","html","display"],outputs:["pipeline","bindGroupLayout","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:async(n,l,c,u,s,e,t,a)=>{const i=78271.517578125/Math.pow(2,n.z),f=await l({device:c,pipeline:u,bindGroupLayout:s,terrainData:e,tileSize:512,pixelSize:i});let o=1/0,d=-1/0,m=0;for(let g=0;g<f.length;g++){const p=f[g];p<o&&(o=p),p>d&&(d=p),m+=p}const y={min:o,max:d,mean:m/f.length},x=t`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  Lighting values: min=${y.min.toFixed(3)}, max=${y.max.toFixed(3)}, mean=${y.mean.toFixed(3)}<br>
  Pixel size: ${i.toFixed(3)}m (zoom ${n.z})
</div>`;return a(x),{EARTH_CIRCUMFERENCE:40075017,pixelSize:i,result:f,min:o,max:d,sum:m,stats:y,info:x}},inputs:["coords","computeTileLighting","device","pipeline","bindGroupLayout","bufferedData","html","display"],outputs:["EARTH_CIRCUMFERENCE","pixelSize","result","min","max","sum","stats","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(n,l,c)=>{const u=document.createElement("canvas");u.width=512,u.height=512;const s=u.getContext("2d"),e=s.createImageData(512,512);for(let a=0;a<n.length;a++){const r=Math.floor(Math.min(Math.max(n[a],0),1)*255);e.data[a*4]=r,e.data[a*4+1]=r,e.data[a*4+2]=r,e.data[a*4+3]=255}s.putImageData(e,0,0);const t=l`<div>
  ${u}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Directional lighting from northwest at 45° elevation</em>
  </div>
</div>`;return c(t),{canvas:u,ctx:s,imageData:e,container:t}},inputs:["result","html","display"],outputs:["canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:(n,l,c,u)=>{const{pipeline:s,bindGroupLayout:e}=n(l,{tileSize:512,tileBuffer:1,workgroupSize:128}),t=c`<div style="font-family: monospace; font-size: 13px;">
  <strong>LSAO Compute Pipeline:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ LSAO shader compiled</li>
    <li>✓ Bind group layout created</li>
    <li>✓ Pipeline ready for 4-direction sweep</li>
    <li style="margin-top: 4px; color: #666;">→ Workgroup size: 128 (scanline parallelism)</li>
    <li style="color: #666;">→ Algorithm: Line-sweep horizon tracking</li>
  </ul>
</div>`;return u(t),{lsaoPipeline:s,lsaoBindGroupLayout:e,info:t}},inputs:["createSimpleLSAOPipeline","device","html","display"],outputs:["lsaoPipeline","lsaoBindGroupLayout","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:async(n,l,c,u,s,e,t,a)=>{const i=78271.517578125/Math.pow(2,n.z),f=performance.now(),o=await l({device:c,pipeline:u,bindGroupLayout:s,terrainData:e,tileSize:512,pixelSize:i,workgroupSize:128,directions:[[1,0],[-1,0],[0,1],[0,-1]]}),d=performance.now()-f;let m=1/0,y=-1/0,x=0;for(let v=0;v<o.length;v++){const b=o[v];b<m&&(m=b),b>y&&(y=b),x+=b}const g={min:m,max:y,mean:x/o.length},p=t`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  LSAO values: min=${g.min.toFixed(3)}, max=${g.max.toFixed(3)}, mean=${g.mean.toFixed(3)}<br>
  Computation time: ${d.toFixed(1)}ms (4 direction sweeps)<br>
  Pixel size: ${i.toFixed(3)}m
</div>`;return a(p),{EARTH_CIRCUMFERENCE:40075017,pixelSize:i,startTime:f,lsaoResult:o,elapsed:d,min:m,max:y,sum:x,lsaoStats:g,info:p}},inputs:["coords","computeSimpleLSAO","device","lsaoPipeline","lsaoBindGroupLayout","bufferedData","html","display"],outputs:["EARTH_CIRCUMFERENCE","pixelSize","startTime","lsaoResult","elapsed","min","max","sum","lsaoStats","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(n,l,c,u)=>{const s=new Float32Array(n.length);for(let i=0;i<n.length;i++)s[i]=(n[i]-l.min)/(l.max-l.min);const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d"),a=t.createImageData(512,512);for(let i=0;i<s.length;i++){const f=Math.floor(Math.min(Math.max(s[i],0),1)*255);a.data[i*4]=f,a.data[i*4+1]=f,a.data[i*4+2]=f,a.data[i*4+3]=255}t.putImageData(a,0,0);const r=c`<div>
  ${e}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Pure ambient occlusion (normalized for display)</em>
  </div>
</div>`;return u(r),{lsaoNormalized:s,canvas:e,ctx:t,imageData:a,container:r}},inputs:["lsaoResult","lsaoStats","html","display"],outputs:["lsaoNormalized","canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(n,l,c,u,s,e)=>{let t=1/0,a=-1/0;for(let d=0;d<n.length;d++){const m=n[d];m<t&&(t=m),m>a&&(a=m)}const r=document.createElement("canvas");r.width=512,r.height=512;const i=r.getContext("2d"),f=i.createImageData(512,512);for(let d=0;d<512;d++)for(let m=0;m<512;m++){const y=d*512+m,x=(d+1)*l.width+(m+1),g=(n[x]-t)/(a-t),p=(c[y]-u.min)/(u.max-u.min),v=g*p,b=Math.floor(v*180+75),E=Math.floor(v*140+80),z=Math.floor((1-v)*120+60);f.data[y*4]=b,f.data[y*4+1]=E,f.data[y*4+2]=z,f.data[y*4+3]=255}i.putImageData(f,0,0);const o=s`<div>
  ${r}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Shaded relief: LSAO × normalized elevation with terrain colors</em>
  </div>
</div>`;return e(o),{elevMin:t,elevMax:a,canvas:r,ctx:i,imageData:f,container:o}},inputs:["elevations","targetTile","lsaoResult","lsaoStats","html","display"],outputs:["elevMin","elevMax","canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-28"),expanded:[],variables:[]},{id:28,body:(n,l,c,u)=>{const{pipeline:s,bindGroupLayout:e}=n(l,{tileSize:512,tileBuffer:1}),t=c`<div style="font-family: monospace; font-size: 13px;">
  <strong>Normal Map Pipeline:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ Normal map shader compiled</li>
    <li>✓ Web Mercator distortion correction enabled</li>
    <li>✓ Physically-correct normal vectors</li>
    <li style="margin-top: 4px; color: #666;">→ Workgroup size: 16×16</li>
    <li style="color: #666;">→ Output: RGB (R=ny, G=reserved, B=nx)</li>
  </ul>
</div>`;return u(t),{normalPipeline:s,normalBindGroupLayout:e,info:t}},inputs:["createNormalMapPipeline","device","html","display"],outputs:["normalPipeline","normalBindGroupLayout","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:async(n,l,c,u,s,e,t,a)=>{const r=await n({device:l,pipeline:c,bindGroupLayout:u,terrainData:s,tileX:e.x,tileY:e.y,tileZ:e.z,tileSize:512}),i=t`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  Normal map computed (${r.length/4} pixels, vec3 per pixel with 16-byte alignment)
</div>`;return a(i),{normalMapData:r,info:i}},inputs:["computeNormalMap","device","normalPipeline","normalBindGroupLayout","bufferedData","coords","html","display"],outputs:["normalMapData","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(n,l,c,u,s)=>{const e=document.createElement("canvas");e.width=512,e.height=512;const t=e.getContext("2d"),a=t.createImageData(512,512);for(let i=0;i<512*512;i++){const f=(n[i]-l.min)/(l.max-l.min),o=c[i*4+0],d=c[i*4+2],m=f;a.data[i*4+0]=Math.floor(Math.min(Math.max(o,0),1)*255),a.data[i*4+1]=Math.floor(Math.min(Math.max(m,0),1)*255),a.data[i*4+2]=Math.floor(Math.min(Math.max(d,0),1)*255),a.data[i*4+3]=255}t.putImageData(a,0,0);const r=u`<div>
  ${e}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Final Lighting Map</strong><br>
    R: Normal Y (fy = 0.5 + 0.5×ny) | G: Ambient Occlusion | B: Normal X (fx = 0.5 - 0.5×nx)
  </div>
</div>`;return s(r),{canvas:e,ctx:t,imageData:a,container:r}},inputs:["lsaoResult","lsaoStats","normalMapData","html","display"],outputs:["canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-32"),expanded:[],variables:[]},{id:32,body:(n,l,c,u,s)=>{const e=[],t=document.createElement("canvas");t.width=512,t.height=512;let a=t.getContext("2d"),r=a.createImageData(512,512);for(let d=0;d<512*512;d++){const m=Math.floor(n[d*4+0]*255);r.data[d*4+0]=m,r.data[d*4+1]=m,r.data[d*4+2]=m,r.data[d*4+3]=255}a.putImageData(r,0,0);const i=document.createElement("canvas");i.width=512,i.height=512,a=i.getContext("2d"),r=a.createImageData(512,512);for(let d=0;d<512*512;d++){const m=(l[d]-c.min)/(c.max-c.min),y=Math.floor(m*255);r.data[d*4+0]=y,r.data[d*4+1]=y,r.data[d*4+2]=y,r.data[d*4+3]=255}a.putImageData(r,0,0);const f=document.createElement("canvas");f.width=512,f.height=512,a=f.getContext("2d"),r=a.createImageData(512,512);for(let d=0;d<512*512;d++){const m=Math.floor(n[d*4+2]*255);r.data[d*4+0]=m,r.data[d*4+1]=m,r.data[d*4+2]=m,r.data[d*4+3]=255}a.putImageData(r,0,0);const o=u`<div>
  <div>
    ${t}
    <div style="margin-top: 4px; font-family: sans-serif; font-size: 12px; color: #e74c3c; text-align: center;">
      <strong>Red Channel</strong><br>
      Normal Y (fy)
    </div>
  </div>
  <div>
    ${i}
    <div style="margin-top: 4px; font-family: sans-serif; font-size: 12px; color: #27ae60; text-align: center;">
      <strong>Green Channel</strong><br>
      Ambient Occlusion
    </div>
  </div>
  <div>
    ${f}
    <div style="margin-top: 4px; font-family: sans-serif; font-size: 12px; color: #3498db; text-align: center;">
      <strong>Blue Channel</strong><br>
      Normal X (fx)
    </div>
  </div>
</div>`;return s(o),{canvases:e,canvasR:t,ctx:a,imgData:r,canvasG:i,canvasB:f,container:o}},inputs:["normalMapData","lsaoResult","lsaoStats","html","display"],outputs:["canvases","canvasR","ctx","imgData","canvasG","canvasB","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
