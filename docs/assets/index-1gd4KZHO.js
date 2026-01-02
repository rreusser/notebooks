import{d as b,_ as w}from"./index-ByB2dbry.js";b({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async()=>{const[{getTerrainTile:n,readImageData:i,decodeTerrainData:r},{getTileSet:s},{createWebGPUContext:o},{createLightingPipeline:e},{computeTileLighting:t}]=await Promise.all([w(()=>import("./main-B7vTJ1AF.js"),[]).then(a=>{if(!("getTerrainTile"in a))throw new SyntaxError("export 'getTerrainTile' not found");if(!("readImageData"in a))throw new SyntaxError("export 'readImageData' not found");if(!("decodeTerrainData"in a))throw new SyntaxError("export 'decodeTerrainData' not found");return a}),w(()=>import("./tile-hierarchy-DpM0M6gN.js"),[]).then(a=>{if(!("getTileSet"in a))throw new SyntaxError("export 'getTileSet' not found");return a}),w(()=>import("./webgpu-context-DZ_3bofO.js"),[]).then(a=>{if(!("createWebGPUContext"in a))throw new SyntaxError("export 'createWebGPUContext' not found");return a}),w(()=>import("./pipeline-c9KGe_7x.js"),[]).then(a=>{if(!("createLightingPipeline"in a))throw new SyntaxError("export 'createLightingPipeline' not found");return a}),w(()=>import("./execute-C-YjLXhg.js"),[]).then(a=>{if(!("computeTileLighting"in a))throw new SyntaxError("export 'computeTileLighting' not found");return a})]);return{getTerrainTile:n,readImageData:i,decodeTerrainData:r,getTileSet:s,createWebGPUContext:o,createLightingPipeline:e,computeTileLighting:t}},inputs:[],outputs:["getTerrainTile","readImageData","decodeTerrainData","getTileSet","createWebGPUContext","createLightingPipeline","computeTileLighting"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:()=>({coords:{x:795,y:1594,z:12}}),inputs:[],outputs:["coords"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(n,i,r,s)=>{const o=n(i),e=r`<div style="font-family: monospace; font-size: 13px;">
  <strong>Target tile:</strong> ${i.z}/${i.x}/${i.y}<br>
  <strong>Tiles needed for hierarchical computation:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px;">
    ${o.map(t=>r`<li>
      <span style="color: ${t.role==="target"?"#ca4747":"#666"}">
        ${t.role}
      </span>: ${t.z}/${t.x}/${t.y}
    </li>`)}
  </ul>
  <em style="color: #666;">Parent tiles at z-1 provide boundary data for edge handling</em>
</div>`;return s(e),{tiles:o,container:e}},inputs:["getTileSet","coords","html","display"],outputs:["tiles","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,i,r)=>{const s=Math.min(n.z,4),o=i.range([-s,-1],{value:-1,step:1,label:"Δz (parent zoom offset)"}),e=r(o);return{maxDeltaZ:s,input:o,deltaZ:e}},inputs:["coords","Inputs","view"],outputs:["maxDeltaZ","input","deltaZ"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:async(n,i,r,s,o,e,t)=>{const{getParentTilesAtLevel:a,assembleParentTileBufferMultiLevel:g}=await w(()=>import("./parent-tile-assembly-multi-level-BLQz1Vio.js"),[]).then(f=>{if(!("getParentTilesAtLevel"in f))throw new SyntaxError("export 'getParentTilesAtLevel' not found");if(!("assembleParentTileBufferMultiLevel"in f))throw new SyntaxError("export 'assembleParentTileBufferMultiLevel' not found");return f}),d=a(n,i),p=n.z+i;r(s`<div style="font-family: sans-serif; font-size: 13px; color: #666; margin-bottom: 12px;">
  <strong>Parent zoom level:</strong> z${p} (Δz = ${i})<br>
  <strong>Fetching ${d.length} parent tiles...</strong>
</div>`);const m=[];for(const f of d){const h=await o(f),T=e(h.img),E=t(T);m.push({data:E,width:h.width,height:h.height,tileSize:h.tileSize,role:f.role})}const x=g({targetTile:n,parentTiles:m,deltaZ:i,tileSize:512}),{buffer:y,size:v,targetOffset:c,scale:u,targetSizeAtParent:l}=x;return{getParentTilesAtLevel:a,assembleParentTileBufferMultiLevel:g,parentTileCoords:d,parentZ:p,parentTiles:m,assembled:x,parentBuffer:y,parentSize:v,targetOffset:c,scale:u,targetSizeAtParent:l}},inputs:["coords","deltaZ","display","html","getTerrainTile","readImageData","decodeTerrainData"],outputs:["getParentTilesAtLevel","assembleParentTileBufferMultiLevel","parentTileCoords","parentZ","parentTiles","assembled","parentBuffer","parentSize","targetOffset","scale","targetSizeAtParent"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,i,r,s,o,e,t,a)=>{const g=document.createElement("canvas");g.width=n,g.height=n;const d=g.getContext("2d"),p=d.createImageData(n,n),m=Math.pow(2,Math.abs(i));let x=1/0,y=-1/0;for(let u=0;u<r.length;u++)r[u]<x&&(x=r[u]),r[u]>y&&(y=r[u]);for(let u=0;u<n;u++)for(let l=0;l<n;l++){const f=u*n+l,h=(r[f]-x)/(y-x),T=Math.floor(h*180+75),E=Math.floor(h*140+80),z=Math.floor((1-h)*120+60);p.data[f*4]=T,p.data[f*4+1]=E,p.data[f*4+2]=z,p.data[f*4+3]=255}d.putImageData(p,0,0),d.strokeStyle="#ca4747",d.lineWidth=3,d.strokeRect(s[0],s[1],o,o),d.fillStyle="#ca4747",d.font="bold 14px sans-serif",d.fillText("Target Tile",s[0]+5,s[1]+20);const v=Math.round(n/(512/m)),c=e`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Parent Buffer Assembly (${n}×${n} at z${t.z+i} resolution)</strong><br>
    Red box shows target tile region (${o.toFixed(0)}×${o.toFixed(0)} at parent resolution)<br>
    Coverage: ${v}×${v} tiles at z${t.z} | Scale: ${m}:1<br>
    Elevation range: ${x.toFixed(1)}m to ${y.toFixed(1)}m
  </div>
  ${g}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 12px; color: #888;">
    <strong>Key insight:</strong> The ${n}×${n} parent buffer covers a ${v}×${v} block of z${t.z} tiles,
    providing terrain context for horizon initialization in all sweep directions.
    As Δz increases (coarser parents), coverage expands but resolution decreases.
  </div>
</div>`;return a(c),{canvas:g,ctx:d,imageData:p,scale:m,min:x,max:y,tileCoverage:v,container:c}},inputs:["parentSize","deltaZ","parentBuffer","targetOffset","targetSizeAtParent","html","coords","display"],outputs:["canvas","ctx","imageData","scale","min","max","tileCoverage","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,i,r,s)=>{const o=document.createElement("canvas");o.width=800,o.height=400;const e=o.getContext("2d");e.fillStyle="#f9f9f9",e.fillRect(0,0,800,400),e.save(),e.translate(50,50);const t=300/768;e.fillStyle="#e0e0e0",e.fillRect(0,0,768*t,768*t),e.strokeStyle="#999",e.lineWidth=1,e.strokeRect(0,0,768*t,768*t),e.fillStyle="rgba(202, 71, 71, 0.2)",e.fillRect(n[0]*t,n[1]*t,256*t,256*t),e.strokeStyle="#ca4747",e.lineWidth=2,e.strokeRect(n[0]*t,n[1]*t,256*t,256*t),e.fillStyle="#333",e.font="bold 14px sans-serif",e.fillText("Parent Buffer",10,-10),e.font="12px sans-serif",e.fillText("768×768 @ z-1",10,8),e.fillStyle="#ca4747",e.font="bold 12px sans-serif",e.fillText("Target",n[0]*t+5,n[1]*t+20),e.font="11px sans-serif",e.fillText(`[${n[0]}, ${n[1]}]`,n[0]*t+5,n[1]*t+35),e.restore(),e.fillStyle="#666",e.font="20px sans-serif",e.fillText("→",370,230),e.font="12px sans-serif",e.fillText("×2 resolution",350,250),e.save(),e.translate(450,50);const a=300/512;e.fillStyle="rgba(202, 71, 71, 0.3)",e.fillRect(0,0,512*a,512*a),e.strokeStyle="#ca4747",e.lineWidth=2,e.strokeRect(0,0,512*a,512*a),e.fillStyle="#333",e.font="bold 14px sans-serif",e.fillText("Target Tile",10,-10),e.font="12px sans-serif",e.fillText(`512×512 @ z${i.z}`,10,8),e.restore(),e.save(),e.translate(50+768*t/2,50+768*t/2);const g=[{dx:1,dy:0,label:"E",color:"#e74c3c"},{dx:-1,dy:0,label:"W",color:"#3498db"},{dx:0,dy:1,label:"S",color:"#2ecc71"},{dx:0,dy:-1,label:"N",color:"#f39c12"}];g.forEach(({dx:p,dy:m,label:x,color:y})=>{e.beginPath(),e.moveTo(0,0),e.lineTo(p*40,m*40),e.strokeStyle=y,e.lineWidth=2,e.stroke(),e.fillStyle=y,e.font="bold 12px sans-serif",e.fillText(x,p*50-5,m*50+5)}),e.restore();const d=r`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <strong>Coordinate Mapping & Sweep Directions</strong>
  </div>
  ${o}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 12px; color: #888;">
    Each sweep starts at the parent buffer edge, builds the horizon through parent terrain,
    then continues through the target tile to compute ambient occlusion.
  </div>
</div>`;return s(d),{diagramCanvas:o,ctx:e,scale:t,targetScale:a,arrows:g,container:d}},inputs:["targetOffset","coords","html","display"],outputs:["diagramCanvas","ctx","scale","targetScale","arrows","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:async(n,i,r,s)=>{const o=await n(i),e=r`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    Mapbox Terrain RGB encoding: ${o.width}×${o.height}
    (${o.tileSize}×${o.tileSize} + ${o.buffer}px buffer)
  </div>
  ${o.img}
</div>`;return s(e),{targetTile:o,container:e}},inputs:["getTerrainTile","coords","html","display"],outputs:["targetTile","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(n,i,r,s,o)=>{const e=n(i.img),t=r(e),a=document.createElement("canvas");a.width=i.tileSize,a.height=i.tileSize;const g=a.getContext("2d"),d=g.createImageData(i.tileSize,i.tileSize);let p=1/0,m=-1/0;for(let l=0;l<t.length;l++){const f=t[l];f<p&&(p=f),f>m&&(m=f)}for(let l=0;l<i.tileSize;l++)for(let f=0;f<i.tileSize;f++){const h=(l+i.buffer)*i.width+(f+i.buffer),T=l*i.tileSize+f,E=(t[h]-p)/(m-p),z=Math.floor(E*180+75),$=Math.floor(E*140+80),S=Math.floor((1-E)*120+60);d.data[T*4]=z,d.data[T*4+1]=$,d.data[T*4+2]=S,d.data[T*4+3]=255}g.putImageData(d,0,0);const x=s`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    Elevation range: ${p.toFixed(1)}m to ${m.toFixed(1)}m
  </div>
  ${a}
</div>`;o(x);const y=512,v=1,c=y+2*v,u=new Float32Array(c*c);for(let l=0;l<y;l++)for(let f=0;f<y;f++){const h=(l+i.buffer)*i.width+(f+i.buffer),T=(l+v)*c+(f+v);u[T]=t[h]}for(let l=0;l<c;l++)u[l]=u[c+l],u[(c-1)*c+l]=u[(c-2)*c+l];for(let l=0;l<c;l++)u[l*c]=u[l*c+1],u[l*c+(c-1)]=u[l*c+(c-2)];return{imageData:e,elevations:t,canvas:a,ctx:g,imgData:d,min:p,max:m,container:x,tileSize:y,buffer:v,bufferedSize:c,bufferedData:u}},inputs:["readImageData","targetTile","decodeTerrainData","html","display"],outputs:["imageData","elevations","canvas","ctx","imgData","min","max","container","tileSize","buffer","bufferedSize","bufferedData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:async(n,i,r,s)=>{const{device:o,adapter:e}=await n(),t=i`<div style="font-family: monospace; font-size: 13px;">
  <strong>WebGPU Context:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ Adapter acquired</li>
    <li>✓ Device created</li>
    <li>✓ Ready for compute operations</li>
  </ul>
</div>`;return r(t),s.then(()=>o.destroy()),{device:o,adapter:e,info:t}},inputs:["createWebGPUContext","html","display","invalidation"],outputs:["device","adapter","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:(n,i,r,s)=>{const{pipeline:o,bindGroupLayout:e}=n(i,{tileSize:512,tileBuffer:1}),t=r`<div style="font-family: monospace; font-size: 13px;">
  <strong>Compute Pipeline:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ WGSL shader compiled</li>
    <li>✓ Bind group layout created (3 bindings)</li>
    <li>✓ Compute pipeline ready</li>
    <li style="margin-top: 4px; color: #666;">→ Workgroup size: 16×16</li>
    <li style="color: #666;">→ Algorithm: Normal-based directional lighting</li>
  </ul>
</div>`;return s(t),{pipeline:o,bindGroupLayout:e,info:t}},inputs:["createLightingPipeline","device","html","display"],outputs:["pipeline","bindGroupLayout","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:async(n,i,r,s,o,e,t,a)=>{const d=78271.517578125/Math.pow(2,n.z),p=await i({device:r,pipeline:s,bindGroupLayout:o,terrainData:e,tileSize:512,pixelSize:d});let m=1/0,x=-1/0,y=0;for(let u=0;u<p.length;u++){const l=p[u];l<m&&(m=l),l>x&&(x=l),y+=l}const v={min:m,max:x,mean:y/p.length},c=t`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  Lighting values: min=${v.min.toFixed(3)}, max=${v.max.toFixed(3)}, mean=${v.mean.toFixed(3)}<br>
  Pixel size: ${d.toFixed(3)}m (zoom ${n.z})
</div>`;return a(c),{EARTH_CIRCUMFERENCE:40075017,pixelSize:d,result:p,min:m,max:x,sum:y,stats:v,info:c}},inputs:["coords","computeTileLighting","device","pipeline","bindGroupLayout","bufferedData","html","display"],outputs:["EARTH_CIRCUMFERENCE","pixelSize","result","min","max","sum","stats","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});b({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(n,i,r)=>{const s=document.createElement("canvas");s.width=512,s.height=512;const o=s.getContext("2d"),e=o.createImageData(512,512);for(let a=0;a<n.length;a++){const g=Math.floor(Math.min(Math.max(n[a],0),1)*255);e.data[a*4]=g,e.data[a*4+1]=g,e.data[a*4+2]=g,e.data[a*4+3]=255}o.putImageData(e,0,0);const t=i`<div>
  ${s}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Directional lighting from northwest at 45° elevation</em>
  </div>
</div>`;return r(t),{canvas:s,ctx:o,imageData:e,container:t}},inputs:["result","html","display"],outputs:["canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
