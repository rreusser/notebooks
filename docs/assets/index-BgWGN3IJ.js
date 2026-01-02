import{d as y,_ as E}from"./index-ByB2dbry.js";y({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:async()=>{const[{getTerrainTile:l,readImageData:i,decodeTerrainData:s},{getTileSet:r},{createWebGPUContext:n},{createLightingPipeline:o},{computeTileLighting:a}]=await Promise.all([E(()=>import("./main-B7vTJ1AF.js"),[]).then(t=>{if(!("getTerrainTile"in t))throw new SyntaxError("export 'getTerrainTile' not found");if(!("readImageData"in t))throw new SyntaxError("export 'readImageData' not found");if(!("decodeTerrainData"in t))throw new SyntaxError("export 'decodeTerrainData' not found");return t}),E(()=>import("./tile-hierarchy-DpM0M6gN.js"),[]).then(t=>{if(!("getTileSet"in t))throw new SyntaxError("export 'getTileSet' not found");return t}),E(()=>import("./webgpu-context-DZ_3bofO.js"),[]).then(t=>{if(!("createWebGPUContext"in t))throw new SyntaxError("export 'createWebGPUContext' not found");return t}),E(()=>import("./pipeline-c9KGe_7x.js"),[]).then(t=>{if(!("createLightingPipeline"in t))throw new SyntaxError("export 'createLightingPipeline' not found");return t}),E(()=>import("./execute-C-YjLXhg.js"),[]).then(t=>{if(!("computeTileLighting"in t))throw new SyntaxError("export 'computeTileLighting' not found");return t})]);return{getTerrainTile:l,readImageData:i,decodeTerrainData:s,getTileSet:r,createWebGPUContext:n,createLightingPipeline:o,computeTileLighting:a}},inputs:[],outputs:["getTerrainTile","readImageData","decodeTerrainData","getTileSet","createWebGPUContext","createLightingPipeline","computeTileLighting"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:()=>({coords:{x:795,y:1594,z:12}}),inputs:[],outputs:["coords"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(l,i,s,r)=>{const n=l(i),o=s`<div style="font-family: monospace; font-size: 13px;">
  <strong>Target tile:</strong> ${i.z}/${i.x}/${i.y}<br>
  <strong>Tiles needed for hierarchical computation:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px;">
    ${n.map(a=>s`<li>
      <span style="color: ${a.role==="target"?"#ca4747":"#666"}">
        ${a.role}
      </span>: ${a.z}/${a.x}/${a.y}
    </li>`)}
  </ul>
  <em style="color: #666;">Parent tiles at z-1 provide boundary data for edge handling</em>
</div>`;return r(o),{tiles:n,container:o}},inputs:["getTileSet","coords","html","display"],outputs:["tiles","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:async(l,i,s,r)=>{const n=await l(i),o=s`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    Mapbox Terrain RGB encoding: ${n.width}×${n.height}
    (${n.tileSize}×${n.tileSize} + ${n.buffer}px buffer)
  </div>
  ${n.img}
</div>`;return r(o),{targetTile:n,container:o}},inputs:["getTerrainTile","coords","html","display"],outputs:["targetTile","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(l,i,s,r,n)=>{const o=l(i.img),a=s(o),t=document.createElement("canvas");t.width=i.tileSize,t.height=i.tileSize;const x=t.getContext("2d"),p=x.createImageData(i.tileSize,i.tileSize);let c=1/0,m=-1/0;for(let e=0;e<a.length;e++){const f=a[e];f<c&&(c=f),f>m&&(m=f)}for(let e=0;e<i.tileSize;e++)for(let f=0;f<i.tileSize;f++){const w=(e+i.buffer)*i.width+(f+i.buffer),h=e*i.tileSize+f,I=(a[w]-c)/(m-c),z=Math.floor(I*180+75),_=Math.floor(I*140+80),D=Math.floor((1-I)*120+60);p.data[h*4]=z,p.data[h*4+1]=_,p.data[h*4+2]=D,p.data[h*4+3]=255}x.putImageData(p,0,0);const b=r`<div>
  <div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    Elevation range: ${c.toFixed(1)}m to ${m.toFixed(1)}m
  </div>
  ${t}
</div>`;n(b);const v=512,g=1,d=v+2*g,u=new Float32Array(d*d);for(let e=0;e<v;e++)for(let f=0;f<v;f++){const w=(e+i.buffer)*i.width+(f+i.buffer),h=(e+g)*d+(f+g);u[h]=a[w]}for(let e=0;e<d;e++)u[e]=u[d+e],u[(d-1)*d+e]=u[(d-2)*d+e];for(let e=0;e<d;e++)u[e*d]=u[e*d+1],u[e*d+(d-1)]=u[e*d+(d-2)];return{imageData:o,elevations:a,canvas:t,ctx:x,imgData:p,min:c,max:m,container:b,tileSize:v,buffer:g,bufferedSize:d,bufferedData:u}},inputs:["readImageData","targetTile","decodeTerrainData","html","display"],outputs:["imageData","elevations","canvas","ctx","imgData","min","max","container","tileSize","buffer","bufferedSize","bufferedData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async(l,i,s,r)=>{const{device:n,adapter:o}=await l(),a=i`<div style="font-family: monospace; font-size: 13px;">
  <strong>WebGPU Context:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ Adapter acquired</li>
    <li>✓ Device created</li>
    <li>✓ Ready for compute operations</li>
  </ul>
</div>`;return s(a),r.then(()=>n.destroy()),{device:n,adapter:o,info:a}},inputs:["createWebGPUContext","html","display","invalidation"],outputs:["device","adapter","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(l,i,s,r)=>{const{pipeline:n,bindGroupLayout:o}=l(i,{tileSize:512,tileBuffer:1}),a=s`<div style="font-family: monospace; font-size: 13px;">
  <strong>Compute Pipeline:</strong><br>
  <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
    <li>✓ WGSL shader compiled</li>
    <li>✓ Bind group layout created (3 bindings)</li>
    <li>✓ Compute pipeline ready</li>
    <li style="margin-top: 4px; color: #666;">→ Workgroup size: 16×16</li>
    <li style="color: #666;">→ Algorithm: Normal-based directional lighting</li>
  </ul>
</div>`;return r(a),{pipeline:n,bindGroupLayout:o,info:a}},inputs:["createLightingPipeline","device","html","display"],outputs:["pipeline","bindGroupLayout","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:async(l,i,s,r,n,o,a,t)=>{const p=78271.517578125/Math.pow(2,l.z),c=await i({device:s,pipeline:r,bindGroupLayout:n,terrainData:o,tileSize:512,pixelSize:p});let m=1/0,b=-1/0,v=0;for(let u=0;u<c.length;u++){const e=c[u];e<m&&(m=e),e>b&&(b=e),v+=e}const g={min:m,max:b,mean:v/c.length},d=a`<div style="margin-bottom: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
  Lighting values: min=${g.min.toFixed(3)}, max=${g.max.toFixed(3)}, mean=${g.mean.toFixed(3)}<br>
  Pixel size: ${p.toFixed(3)}m (zoom ${l.z})
</div>`;return t(d),{EARTH_CIRCUMFERENCE:40075017,pixelSize:p,result:c,min:m,max:b,sum:v,stats:g,info:d}},inputs:["coords","computeTileLighting","device","pipeline","bindGroupLayout","bufferedData","html","display"],outputs:["EARTH_CIRCUMFERENCE","pixelSize","result","min","max","sum","stats","info"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:(l,i,s)=>{const r=document.createElement("canvas");r.width=512,r.height=512;const n=r.getContext("2d"),o=n.createImageData(512,512);for(let t=0;t<l.length;t++){const x=Math.floor(Math.min(Math.max(l[t],0),1)*255);o.data[t*4]=x,o.data[t*4+1]=x,o.data[t*4+2]=x,o.data[t*4+3]=255}n.putImageData(o,0,0);const a=i`<div>
  ${r}
  <div style="margin-top: 8px; font-family: sans-serif; font-size: 13px; color: #666;">
    <em>Directional lighting from northwest at 45° elevation</em>
  </div>
</div>`;return s(a),{canvas:r,ctx:n,imageData:o,container:a}},inputs:["result","html","display"],outputs:["canvas","ctx","imageData","container"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
