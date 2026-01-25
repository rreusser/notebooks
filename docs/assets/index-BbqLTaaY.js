import{d as y,_ as Z}from"./index-ByB2dbry.js";const ge="/notebooks/assets/19f229d9bfb51c5702f7764d7a81c56abb93cd141312e01034d3152fc1e9a42a90151707f573b16d1b7c04169a26c71e15b6b2f82fafdeb3ba5011148aee5885-xeFWATvb.png",_=new Map([["./files/19f229d9bfb51c5702f7764d7a81c56abb93cd141312e01034d3152fc1e9a42a90151707f573b16d1b7c04169a26c71e15b6b2f82fafdeb3ba5011148aee5885.png",ge]]);y({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:(t,e)=>{t(e`
<figure>
  <img src="./files/2bd5ec5f8ffe634d501442964b31454eb84d22d969110af8735a4195e2a543a9006475ab026c38ca4c936158bd8a9185482332f5d4a7817abf78ae6852d7d785.jpeg" style="max-width: min(100%, 600px)">
  <figcaption>The finished product, composed of 49 recycled toilet paper tubes (and which I realize after building sorta brings things full circle and looks a bit like a coronavirus).</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:(t,e)=>t`## Fabrication

My brand is regular Trader Joe's toilet paper, though I have no reason to believe anything about the brand is particularly important, beyond consistency of diameter—with the exception of those cowards who make tube-free toilet paper rolls. Those won't work. I've considered side-stepping material collection and waiting to buy tag board when shelter-in-place eases, though to be honest, the recycled nature of the raw materials is a primary factor which draws me to this project.

Accumulating raw materials is simple. Flatten the tubes and—if you live with family—stash them somewhere a family member is unlikely to find them, lest you be required to explain yourself. Conversely, you may wish to avoid much wailing and gnashing of teeth and discuss your hoarding early on to prevent your stash from getting casually recycled.

The pattern below illustrates the required cuts. The angle required for three edges to join gracefully is ${e`30°`}, which makes the measurements easy. I've found a far easier method than measuring every tube though is to add opposing marks to one tube and use it as a template. I get about eight strips per tube.

*Update: I've trended toward thicker strips, as it makes the final constructions a bit more robust. The only limit on thickness is they can't be so thick that the joints on opposite ends interfere and prevent linking. Further simplifying, even cutting strips at flat 0° angles produces a visually appealing look and may save a bit of trouble.*`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(t,e)=>{t(e`
<figure>
  <img src="./files/9a6266c785181387edd1e4cab63c282ce15797fce68a88b21c6ab716c4a7951d8a4b70cd513e377662bc0d1894b0b3a7b4f53c020e5fd47513a82d2d554e923e.jpeg" style="max-width: min(100%, 400px)">
  <figcaption>The pattern of cuts illustrated on a flattened toilet paper tube.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(t,e)=>t`Assembling the joints is straightforward. The pieces lock together in pleasing ${e`120°`} angles, requiring no additional fasteners up until the very last piece of the model, which requires a cut and some tape.

The illustration below shows how the joints interlock. I'd give more instruction, but if you actually want to do this, there's no better way to learn than through experimentation. After some fumbling around, I learned to always attach new pieces by branching off in the same direction, after which it becomes quite repetitive.`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(t,e)=>{t(e`
<figure>
  <img src="./files/bba3f0212ace95304b9a51f0123c4abc3b62330683f86a642463d991b174d9becbaf99999805bffaac6104b94bb6123ee6ddf74894a51e4d066291e7ddcec820.jpeg" style="max-width: min(100%, 400px)">
  <figcaption>Three loops link together to form an interlocked joint.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(t,e)=>{t(e`
<figure>
  <img src="./files/684aea6362248aa27e8c96c490f94030bf98bf3a3d243d8e42779ebd98fd304718752bfaa08668d051946cf14125f2c1fc9e52f8368cab372a904bdc120ffbae.jpeg" style="max-width: min(100%, 600px)">
  <figcaption>A semi-completed Y-joint tunnel with rabbit (barely visible, hiding from curious dog) inside.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async()=>{const[{default:t},{default:e},{Mesh:n},{MeshPhysics:x},{createReglCamera:k},{createMeshRenderer:b},{MeshInteractions:c},{expandable:f}]=await Promise.all([Z(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(l=>{if(!("default"in l))throw new SyntaxError("export 'default' not found");return l}),Z(()=>import("https://cdn.jsdelivr.net/npm/icosphere@1.0.0/+esm"),[]).then(l=>{if(!("default"in l))throw new SyntaxError("export 'default' not found");return l}),Z(()=>import("./mesh-ArZgdxOV.js"),[]).then(l=>{if(!("Mesh"in l))throw new SyntaxError("export 'Mesh' not found");return l}),Z(()=>import("./mesh-physics-Bz01nwPL.js"),[]).then(l=>{if(!("MeshPhysics"in l))throw new SyntaxError("export 'MeshPhysics' not found");return l}),Z(()=>import("./orbit-camera-BflaeugX.js"),[]).then(l=>{if(!("createReglCamera"in l))throw new SyntaxError("export 'createReglCamera' not found");return l}),Z(()=>import("./mesh-renderer-BBEu3vUm.js"),[]).then(l=>{if(!("createMeshRenderer"in l))throw new SyntaxError("export 'createMeshRenderer' not found");return l}),Z(()=>import("./mesh-interactions-BTSnxBEc.js"),[]).then(l=>{if(!("MeshInteractions"in l))throw new SyntaxError("export 'MeshInteractions' not found");return l}),Z(()=>import("./expandable-dZkDG0zz.js"),[]).then(l=>{if(!("expandable"in l))throw new SyntaxError("export 'expandable' not found");return l})]);return{createREGL:t,createIcosphere:e,Mesh:n,MeshPhysics:x,createReglCamera:k,createMeshRenderer:b,MeshInteractions:c,expandable:f}},inputs:[],outputs:["createREGL","createIcosphere","Mesh","MeshPhysics","createReglCamera","createMeshRenderer","MeshInteractions","expandable"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:async()=>{const t={"C60 Fullerene":"285549ab8794137fcd23df05ec4e9092c4a9fa65e3b32c2c6a22ddf0320eca5e14553c6508e4977271b82a1225eda231cec6f30a027bb8440ed879d1d3431ef6.json","C180 Fullerene":"89e6cd62cbc3ba07f7f8e42357d426f9fbb8f9f607e3e0f11c7036fcc512d9dab8712b3fe3c272f93865bcaf88ab02918e2ddb226129ee9efa669eab89f9b7f3.json","C320 Fullerene":"40df7e811a5f2b9b46905da0db746bc46aff5c9ce62808034f8346d3daf566feb14aacf6cd1015d5ee97dc1ed27f42920c248bb71d1b0a211641d03126d8bfaf.json","C500 Fullerene":"85c5997bcd60d3500b3769a5790c1575b144161f77eb1f4f0a11ca567a5dbaae4750d466914794e6932be17f888982a24d5e65a9a2ba3e271d2afc9a179f675d.json",Dodecahedron:"5c4ad379870a7172f016427cfeb62e60bcc3fac83d22395ab102f8d0e94eaf6a4241a0d27b5d8ce5749698c05b0ee630b20582182e745050f0a5d9f2e9d37b0e.json","C240 Torus":"3ecdf5c8f9be6ac3a837d7b6dd37485f7017be2ed7fc94d304c2b4f67d01bea5dc9528dd5b4c0507a3bb21fa38c2d7f30c4cd0decc7a6077c18e2ce3354780b1.json","C360 Torus":"8c59424c3fbed403e573864733e1bf196fd469dd63f88893629a9dbebf68820ade9bded97d440903bf482e29b642cd27191fd9154384756152c414402b12f9d1.json","C260-I[5,7]":"a139509092ab0080b3c1241f830977069dc68e4a7ea9834d668f9d9d760961b792b8e23f0f9212337cbd94d436a85d99a788b2fc4d6ef13d562b49b2ef35a310.json","C28[5,7]-D7d":"359455189eea4a1145be307cc8807dcca71442982915a220265a52dec420ca5a42106a8488dbf449491da526f91a1f60798d599661aa0be7eb477ebb3b77d33e.json","C28-Td[5,6]":"f5e02e4b9d7f7a440b3231d45943410bfdc50ac98c4b7275dfe17f746609d7871c653b0901c2fead87d894b52cdf4caa2e523aa5e5ac2848936a9bb4790f9021.json","C120 Peanut Fulleroid":"ee4ed30808162fdbff7f048268befca6b331881585e4e5e31ea05d66aafeb6190f622b2cffad4712f835b87b364fa35de96bbaf7c7a134b279f45a877d1cf038.json","C168 Peanut Fulleroid":"b31fdfb8b21f79a14cf81320b73fa344c07421f154e7d0dbfaded7dfa5ae73ed3007ffc9ed572e262de9b4bcd031823de18f474891190a2401eb6448c5898f47.json","Double Torus":"1176e7fad2a420d228f5df155bfd24be06983f5fbf4234124abf8cfd514d24993f9e184cbdbc36ff0fecb010739e8ff5a713247944c186fdf82b877a42bf85ee.json",Capsule:"dff7700c3743989f282f9e58f71ae9d7596f5c78efa149c5e9a7717a7066a9c6b1870085b4aa7922288c7f3cdce4660b82fb0de5923185c165c3469d5b784037.json","C360-D5h[5,6,7]":"89dccf254f8755ae6a0d1910af95cf8f08d32820ad0a1bba395b71bbdfaf4f97d469ee5775e7e49552bcbf1baab5f0109a2e57ee4b02ca988358e9686ce700ad.json","Genus-3 Torus":"a148f1c143188de55a41b12791380026e0c0a5420e9d65070d034aa3dd6f7f5f914d91fc0d3ac67e70a62340eaeb466a7aeb624becb3c83f1995234c429728cc.json","Klein Quartic":"f220e2d7f29b956c39640b7dc4173f211fa43c14d7dec7b30d4dab14b4082356e621ae77b433221941bef90638b84398458b1ed0cf49ebe17151721aa0be53f8.json",Metadodecahedron:"e0e175da2922fa1d47825c0a0001cd3b6db9f9d6e872c04abf2fa068c0649cf37f8a4084ab85eac11359d01d464350f3b9b33d7a0d682b526999b95063a4ecf5.json","Genus-3 Extended":"e1fa5b0e879607a25bbbc2ffcb0170fca6ba4b5b2652a0f0df3775c751c6ccf0bbaa30687d6c2d9bfeefa71c27d394f8aac824f330620995a5d647d57ad84777.json"},e=await(async()=>{const n={Starter:{vertices:[[-1,-1,0],[-1,1,0],[-.5,0,0],[.5,0,0],[1,-1,0],[1,1,0]],edges:[[0,2],[1,2],[2,3],[3,4],[3,5]]}},x=Object.entries(t),k=await Promise.all(x.map(async([b,c])=>{try{const l=await(await fetch(`./files/${c}`)).json();return[b,l]}catch(f){return console.warn(`Failed to load ${b}:`,f),null}}));for(const b of k)if(b){const[c,f]=b;n[c]=f}return n})();return{presetFiles:t,presetGraphs:e}},inputs:[],outputs:["presetFiles","presetGraphs"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(t,e,n,x,k)=>{const b=t`<div class="controls-panel"></div>`;function c(r){return b.appendChild(r),e.input(r)}const f=c(n.select(Object.keys(x),{label:"Preset",value:"C260-I[5,7]"})),l=c(n.button("Reset")),h=c(n.toggle({label:"Simulate",value:!0})),w=c(n.range([0,200],{label:"Iterations per frame",value:1,step:1})),$=c(n.range([0,2],{label:"Axial spring constant",value:1,step:.01})),V=c(n.range([.1,2],{label:"Equilibrium length, l₀",value:1,step:.01})),C=c(n.range([1,180],{label:"Equilibrium bending angle, θ₀",value:150,step:1})),M=c(n.range([0,2],{label:"Bending spring constant",value:.3,step:.01})),P=c(n.range([0,.2],{label:"Torsional spring constant",value:.1,step:.01})),F=c(n.toggle({label:"Axial strain coloring",value:!1})),R=c(n.range([.5,5],{label:"Vertex size",value:3,step:.5})),D=c(n.toggle({label:"Show faces",value:!0})),o=c(n.range([0,1],{label:"Face opacity",value:.3,step:.05})),a=c(n.range([1,20],{label:"Focus radius (×l₀)",value:7,step:.5}));return k(b),{controlsContainer:b,ctrl:c,presetGraph:f,resetButton:l,simulate:h,iterations:w,k:$,l0:V,theta0:C,kBend:M,kTorsion:P,strainColoring:F,pointSize:R,showFaces:D,faceOpacity:o,depthFalloffWidth:a}},inputs:["html","Generators","Inputs","presetGraphs","display"],outputs:["controlsContainer","ctrl","presetGraph","resetButton","simulate","iterations","k","l0","theta0","kBend","kTorsion","strainColoring","pointSize","showFaces","faceOpacity","depthFalloffWidth"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:()=>({state:{mesh:null,physics:null,interactions:null,renderer:null,camera:null,regl:null,frame:null,dirty:!0,presetName:"",expandedState:{expanded:!1},meshVersion:0,meshVersionListeners:new Set,renderParams:{simulate:!0,iterations:1,pointSize:3,strainColoring:0,showFaces:!0,faceOpacity:.3,depthFalloffWidth:7}}}),inputs:[],outputs:["state"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:(t,e,n,x,k)=>{const b=e||"Starter";if(b!==n.presetName||!n.mesh){n.presetName=b;const c=x[b];c&&(n.mesh=k.fromJSON(c),n.mesh.center(),n.physics&&(n.physics.mesh=n.mesh),n.interactions&&(n.interactions.mesh=n.mesh,n.interactions.selectedVertexIndex=-1,n.interactions.hoverVertexIndex=-1),n.dirty=!0,n.meshVersion++,n.meshVersionListeners.forEach(f=>f()))}return{currentPreset:b}},inputs:["resetButton","presetGraph","state","presetGraphs","Mesh"],outputs:["currentPreset"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:(t,e,n,x,k,b)=>{t.physics&&(t.physics.k=e,t.physics.l0=n,t.physics.theta0=x,t.physics.kBend=k*n*n,t.physics.kTorsion=b*n*n)},inputs:["state","k","l0","theta0","kBend","kTorsion"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:(t,e,n,x,k,b,c,f,l)=>{t.renderParams.simulate=e,t.renderParams.iterations=n,t.renderParams.pointSize=x,t.renderParams.strainColoring=k?1.5:0,t.renderParams.showFaces=b,t.renderParams.faceOpacity=c,t.renderParams.depthFalloffWidth=f*l,t.dirty=!0},inputs:["state","simulate","iterations","pointSize","strainColoring","showFaces","faceOpacity","depthFalloffWidth","l0"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(t,e,n,x,k,b,c,f,l,h,w,$,V)=>{const C=t`<div id="mesh-canvas" style="width: 100%; height: 100%;"></div>`;if(!e.regl){e.regl=n({container:C,pixelRatio:devicePixelRatio,extensions:["ANGLE_instanced_arrays"],attributes:{preserveDrawingBuffer:!0}});const o=x(1);e.camera=k(e.regl,{eye:[0,1,-20]}),e.renderer=b(e.regl,o),e.physics=new c(e.mesh),e.interactions=new f(e.regl._gl.canvas,e.mesh,e.camera.camera,{projectionView:e.camera.projectionView,onChange:()=>{e.dirty=!0,e.meshVersion++,e.meshVersionListeners.forEach(a=>a())}})}const M=()=>{if(!e.regl)return;const o=e.regl._gl.canvas,a=C.getBoundingClientRect(),r=devicePixelRatio,s=Math.floor(a.width*r),d=Math.floor(a.height*r);(o.width!==s||o.height!==d)&&(o.width=s,o.height=d,e.dirty=!0,e.camera?.taint())},P=new l(M);P.observe(C);let F=!0;const R=new h(o=>{F=o[0].intersectionRatio>0});R.observe(C),e.frame&&(e.frame.cancel(),e.frame=null),e.frame=e.regl.frame(()=>{!F||!e.mesh||e.camera.tick(({dirty:o})=>{if(!(e.renderParams.simulate||e.dirty||o||e.interactions?.dirty))return;if(e.renderParams.simulate&&e.physics){e.physics.frozenVertex=e.interactions?.activeVertexIndex??-1;for(let g=0;g<e.renderParams.iterations;g++)e.physics.iterate()}e.regl.clear({color:[1,1,1,1],depth:1});const r=e.interactions?.selectedVertexIndex??-1,s=r>=0,d=s?e.mesh.getPosition(r):[0,0,0];e.renderer?.render(e.mesh,e.physics,{pointSize:e.renderParams.pointSize,strainColoring:e.renderParams.strainColoring,showFaces:e.renderParams.showFaces,faceOpacity:e.renderParams.faceOpacity,selectedVertexIndex:r,hoverVertexIndex:e.interactions?.hoverVertexIndex??-1,depthFalloff:s,depthFalloffWidth:e.renderParams.depthFalloffWidth,focusCenter:d}),e.dirty=!1,e.interactions&&(e.interactions.dirty=!1)})}),w.then(()=>{e.frame&&(e.frame.cancel(),e.frame=null),P.disconnect(),R.disconnect()});const D=t`
  <figure id="main-figure" style="max-width: none; margin: 0; height: 100%;">
${C}
<figcaption>
  Click a vertex to select, then click to add a new vertex or click an existing vertex to create a connection.
  <kbd>Space</kbd> to deselect.
  <kbd>Backspace</kbd> deletes vertices, <kbd>s</kbd>/<kbd>c</kbd> splits/collapses vertices of degree 2.
  <kbd>e</kbd> to explode a vertex.
  Drag to rotate, <kbd>Shift</kbd> + drag to pan, <kbd>a</kbd> to aim camera at selected vertex.
</figcaption>
  </figure>
`;return $(V(D,{width:640,height:576,padding:[0,0],controls:".controls-panel",state:e.expandedState,onResize:(o,a,r,s)=>{C.style.width=`${a}px`,C.style.height=s?`${r-60}px`:`${r}px`,M()}})),{container:C,resizeCanvas:M,resizeObserver:P,visible:F,intersectionObserver:R,figure:D}},inputs:["html","state","createREGL","createIcosphere","createReglCamera","createMeshRenderer","MeshPhysics","MeshInteractions","ResizeObserver","IntersectionObserver","invalidation","display","expandable"],outputs:["container","resizeCanvas","resizeObserver","visible","intersectionObserver","figure"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:(t,e)=>({meshVersion:t.observe(x=>{const k=()=>x(e.meshVersion);return e.meshVersionListeners.add(k),x(e.meshVersion),()=>e.meshVersionListeners.delete(k)})}),inputs:["Generators","state"],outputs:["meshVersion"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(t,e,n,x)=>{const k=(()=>{if(!e.mesh)return null;const b=e.mesh,c=[];for(let $=0;$<b.vertexCount;$++){const V=b.getPosition($);c.push({index:$,position:[V[0].toFixed(2),V[1].toFixed(2),V[2].toFixed(2)],degree:b.degree($),neighbors:b.getNeighbors($)})}const f=[];for(let $=0;$<b.edgeCount;$++)f.push([b.edges[$*2],b.edges[$*2+1]]);const l=b.extractFaces(),h=l.map($=>({vertices:$,length:$.length})),w={};for(const $ of l)w[$.length]=(w[$.length]||0)+1;return{vertexCount:b.vertexCount,edgeCount:b.edgeCount,vertices:c,edges:f,faces:h,faceCounts:w}})();return n(x`<details>
  <summary>Debug: Mesh Data (${e.mesh?.vertexCount??0} vertices, ${e.mesh?.edgeCount??0} edges, ${k?.faces?.length??0} faces)</summary>
  <pre style="max-height: 300px; overflow: auto; font-size: 11px;">${JSON.stringify(k,null,2)}</pre>
</details>`),{debugData:k}},inputs:["meshVersion","state","display","html"],outputs:["debugData"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:(t,e)=>{t(e`
<figure>
  <img src="./files/06397d180d434869e0902d4b309d5cd3c0a4906d503fde826ba604bbe60bf3c6b524826dadce9f2886e96aaa1b138e6b7db37b30b0d0b5824761344e077ad3da.png" style="max-width: min(100%, 500px)">
  <figcaption>Gradient descent minimizes energy by taking incremental steps downhill.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:(t,e)=>t`### Mathematical Statement

We write an arbitrary energy function for our graph that maps the configuration to a single real number,
${e.block`E = E(v_i, e_j) \in \mathbb{R}`}
where ${e`v_i`} and ${e`e_j`} are the ${e`i^{th}`} vertex and ${e`j^{th}`} edge of the graph, respectively. ${e`E`} here is any useful function, picked out of the sky, such that it's minimized when the graph reaches a desirable configuration. We compute the gradient with respect to the *x-y-z* coordinates of all ${e`N`} vertex positions,
${e.block`\nabla E = \left(\frac{\partial E}{\partial v_{0,x}}, \frac{\partial E}{\partial v_{0,y}}, \frac{\partial E}{\partial v_{0,z}}, \frac{\partial E}{\partial v_{1,x}}, \ldots, \frac{\partial E}{\partial v_{N - 1,z}}\right).`}
In the sense of rolling down a hill, this gradient points uphill so that we update the solution in the direction of a small downhill step. We compute the ${e`n + 1^{th}`} step of vertex ${e`v_i`} as
${e.block`v_i^{n + 1} = v_i^n - \gamma \frac{\partial E}{\partial v_i}`}
where ${e`\gamma`} is some small number.

It's no more complicated than that, but we must now select a function ${e`E`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(t,e)=>t`## Axial stiffness

We start simple and add lengthwise (axial) stiffness to enforce uniform length. Given an edge connecting vertices ${e`a`} and ${e`b`}, we denote the length of the edge ${e`r_{ab}`} and the equilibrium length ${e`r_0`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-25"),expanded:[],variables:[]},{id:25,body:(t,e)=>{t(e`
<figure>
  <img src="./files/108bab81caf1bb59f7a55d16ec43bcb7b6ae442d7712a2add0c7a2410dfbbbf8d67385f03e158e0fee1ba8f7a486d8728a6440b50e4a0666cc6f4bd142ed81b5.png" style="max-width: min(100%, 300px)">
  <figcaption>Points a and b are separated by radius r<sub>ab</sub>.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(t,e)=>t`The minimum-energy configuration occurs when ${e`r_{ab} = r_0`}, so we construct an energy function
${e.block`E_{axial} = k_{axial} (r_{ab} - r_0)^2`}
where ${e`k_{axial}`} is the axial stiffness. Note that ${e`E_{axial} = 0`} when ${e`r_{ab} = r_0`}. Since ${e`E_{axial}`} is strictly non-negative, this is just fancy way of saying that the energy can't get any lower than when the length is equal to the desired length; it's the bottom of the hill.

If we differentiate this function with respect to the position of the two endpoints, then we obtain the gradient. For example, the energy gradient with respect to the coordinates of vertex ${e`a`} is

${e.block`\frac{\partial E}{\partial v_{a, x}} = k_{axial}  \left(1 - \frac{r_0}{r_{ab}}\right) \left(v_{a,x} - v_{b, x}\right)`}

${e.block`\frac{\partial E}{\partial v_{a, y}} = k_{axial}  \left(1 - \frac{r_0}{r_{ab}}\right) \left(v_{a,y} - v_{b, y}\right)`}

${e.block`\frac{\partial E}{\partial v_{a, z}} = k_{axial}  \left(1 - \frac{r_0}{r_{ab}}\right) \left(v_{a,z} - v_{b, z}\right)`}

The gradient with respect to the coordinates of vertex ${e`b`} are equal and opposite.`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:(t,e)=>{const n=t`<div class="demo-controls"></div>`,x=e.range([.3,1.5],{label:"Equilibrium length",value:1,step:.01});n.appendChild(x);const k=e.range([0,2],{label:"Axial spring constant",value:1,step:.01});return n.appendChild(k),{axialControlsContainer:n,axialL0Input:x,axialKInput:k}},inputs:["html","Inputs"],outputs:["axialControlsContainer","axialL0Input","axialKInput"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-28"),expanded:[],variables:[]},{id:28,body:(t,e,n,x,k,b,c)=>{const f=t`<canvas id="axial-canvas" width="600" height="400"></canvas>`,l=f.getContext("2d"),h={vertices:[[-1,0],[-.5,-.866],[.5,-.866],[1,0],[.5,.866],[-.5,.866]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},w={dragging:-1,hoverIndex:-1};function $(a,r){const s=a[0]-r[0],d=a[1]-r[1];return Math.sqrt(s*s+d*d)}function V(a,r,s,d=.1){const g=new Array(a.vertices.length).fill(null).map(()=>[0,0]);for(const[u,i]of a.edges){const p=a.vertices[u],v=a.vertices[i],m=$(p,v);if(m<.001)continue;const B=s*(1-r/m),I=B*(p[0]-v[0]),j=B*(p[1]-v[1]);g[u][0]+=I,g[u][1]+=j,g[i][0]-=I,g[i][1]-=j}for(let u=0;u<a.vertices.length;u++)u!==w.dragging&&(a.vertices[u][0]-=g[u][0]*d,a.vertices[u][1]-=g[u][1]*d)}function C(){const a=l,r=f.width,s=f.height,d=120,g=r/2,u=s/2;a.fillStyle="#fff",a.fillRect(0,0,r,s);for(const[i,p]of h.edges){const v=h.vertices[i],m=h.vertices[p],I=$(v,m)/e.value-1,j=Math.max(0,Math.min(255,128+I*300)),A=Math.max(0,Math.min(255,128-I*300));a.strokeStyle=`rgb(${j}, 80, ${A})`,a.lineWidth=3,a.beginPath(),a.moveTo(g+v[0]*d,u-v[1]*d),a.lineTo(g+m[0]*d,u-m[1]*d),a.stroke()}for(let i=0;i<h.vertices.length;i++){const p=h.vertices[i],v=i===w.hoverIndex,m=i===w.dragging;a.fillStyle=m?"#f00":v?"#0a0":"#2366af",a.beginPath(),a.arc(g+p[0]*d,u-p[1]*d,8,0,Math.PI*2),a.fill()}}function M(a,r){const s=f.width,d=f.height,g=120,u=s/2,i=d/2;for(let p=0;p<h.vertices.length;p++){const v=h.vertices[p],m=u+v[0]*g,B=i-v[1]*g,I=a-m,j=r-B;if(I*I+j*j<400)return p}return-1}f.addEventListener("mousedown",a=>{const r=f.getBoundingClientRect(),s=a.clientX-r.left,d=a.clientY-r.top;w.dragging=M(s,d)}),f.addEventListener("mousemove",a=>{const r=f.getBoundingClientRect(),s=a.clientX-r.left,d=a.clientY-r.top;if(w.dragging>=0){const g=f.width,u=f.height,i=120,p=g/2,v=u/2;h.vertices[w.dragging][0]=(s-p)/i,h.vertices[w.dragging][1]=-(d-v)/i}else w.hoverIndex=M(s,d),f.style.cursor=w.hoverIndex>=0?"move":"default"}),window.addEventListener("mouseup",()=>{w.dragging=-1});let P=!0,F=!1;function R(){P&&(F&&(V(h,e.value,n.value),C()),requestAnimationFrame(R))}R();const D=t`
<figure id="axial-figure">
  ${x}
  ${f}
  <figcaption>Axial stiffness enforces edge length but doesn't adequately constrain the structure. Move the points and observe that the structure is not maintained.</figcaption>
</figure>`,o=new k(a=>{F=a[0].intersectionRatio>0});return o.observe(D),b.then(()=>{P=!1,o.disconnect()}),c(D),{axialCanvas:f,axialCtx2D:l,axialGraph:h,axialInteraction:w,axialDist:$,axialIterate:V,axialDraw:C,axialGetVertex:M,axialRunning:P,axialVisible:F,axialLoop:R,axialFigure:D,axialObserver:o}},inputs:["html","axialL0Input","axialKInput","axialControlsContainer","IntersectionObserver","invalidation","display"],outputs:["axialCanvas","axialCtx2D","axialGraph","axialInteraction","axialDist","axialIterate","axialDraw","axialGetVertex","axialRunning","axialVisible","axialLoop","axialFigure","axialObserver"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(t,e)=>{t(e`
<figure>
  <img src="./files/ba8cea49ce0f777b3b5bcf52ba928eac0ca2ca6e4f37deb6a04068064c5111d8bc378d66692083d12b4f07431e23da7bcfe8a45e2a859dd6378d3f040d9908c7.png" style="max-width: min(100%, 400px)">
  <figcaption>The segment connecting a, b, and c form angle θ.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-31"),expanded:[],variables:[]},{id:31,body:(t,e)=>t`Axial stiffness alone clearly does not accomplish our goal of maintaining pleasant configurations. We now add an additional type of stiffness: *dihedral stiffness*. The rationale is that edges meet at a preferred angle, ${e`\theta_0`}. We therefore define the energy function
${e.block`E_{dihedral} = k_{dihedral}(\theta - \theta_0)^2.`}
I'm sure chemistry has a lot to say about this topic, but it seems to be the case based on the structures produced that ${e`180°`} is the desired pairwise dihedral angle, and that angles of ${e`120°`} are simply the resulting compromise wherever three edges meet a vertex and result in three pairwise dihedral angles.`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-32"),expanded:[],variables:[]},{id:32,body:(t,e)=>{const n=t`<div class="demo-controls"></div>`,x=e.range([0,2],{label:"Bending spring constant",value:.3,step:.01});n.appendChild(x);const k=e.range([60,180],{label:"Equilibrium angle, θ₀",value:120,step:1});return n.appendChild(k),{dihedralControlsContainer:n,dihedralKBendInput:x,dihedralTheta0Input:k}},inputs:["html","Inputs"],outputs:["dihedralControlsContainer","dihedralKBendInput","dihedralTheta0Input"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-33"),expanded:[],variables:[]},{id:33,body:(t,e,n,x,k,b,c)=>{const f=t`<canvas id="dihedral-canvas" width="600" height="400"></canvas>`,l=f.getContext("2d"),h={vertices:[[-1,0],[-.5,-.866],[.5,-.866],[1,0],[.5,.866],[-.5,.866]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},w={dragging:-1,hoverIndex:-1};function $(a,r){const s=a[0]-r[0],d=a[1]-r[1];return Math.sqrt(s*s+d*d)}function V(a,r,s,d,g,u=.1){const i=new Array(a.vertices.length).fill(null).map(()=>[0,0]);for(const[m,B]of a.edges){const I=a.vertices[m],j=a.vertices[B],A=$(I,j);if(A<.001)continue;const z=s*(1-r/A),Y=z*(I[0]-j[0]),W=z*(I[1]-j[1]);i[m][0]+=Y,i[m][1]+=W,i[B][0]-=Y,i[B][1]-=W}const p=Math.cos(d*Math.PI/180),v=a.vertices.length;for(let m=0;m<v;m++){const B=m,I=(m+1)%v,j=(m+2)%v,A=a.vertices[B],z=a.vertices[I],Y=a.vertices[j],W=A[0]-z[0],H=A[1]-z[1],U=Y[0]-z[0],J=Y[1]-z[1],ee=Math.sqrt(W*W+H*H),Q=Math.sqrt(U*U+J*J);if(ee<.001||Q<.001)continue;const K=(W*U+H*J)/(ee*Q),E=g*2*(K-p)/(ee*Q),T=ee/Q,q=E*(U-K/T*W),L=E*(J-K/T*H),S=E*(W-K*T*U),O=E*(H-K*T*J);i[B][0]+=q,i[B][1]+=L,i[I][0]-=q+S,i[I][1]-=L+O,i[j][0]+=S,i[j][1]+=O}for(let m=0;m<a.vertices.length;m++)m!==w.dragging&&(a.vertices[m][0]-=i[m][0]*u,a.vertices[m][1]-=i[m][1]*u)}function C(){const a=l,r=f.width,s=f.height,d=120,g=r/2,u=s/2;a.fillStyle="#fff",a.fillRect(0,0,r,s),a.strokeStyle="#333",a.lineWidth=3;for(const[i,p]of h.edges){const v=h.vertices[i],m=h.vertices[p];a.beginPath(),a.moveTo(g+v[0]*d,u-v[1]*d),a.lineTo(g+m[0]*d,u-m[1]*d),a.stroke()}for(let i=0;i<h.vertices.length;i++){const p=h.vertices[i],v=i===w.hoverIndex,m=i===w.dragging;a.fillStyle=m?"#f00":v?"#0a0":"#2366af",a.beginPath(),a.arc(g+p[0]*d,u-p[1]*d,8,0,Math.PI*2),a.fill()}}function M(a,r){const s=f.width,d=f.height,g=120,u=s/2,i=d/2;for(let p=0;p<h.vertices.length;p++){const v=h.vertices[p],m=u+v[0]*g,B=i-v[1]*g,I=a-m,j=r-B;if(I*I+j*j<400)return p}return-1}f.addEventListener("mousedown",a=>{const r=f.getBoundingClientRect(),s=a.clientX-r.left,d=a.clientY-r.top;w.dragging=M(s,d)}),f.addEventListener("mousemove",a=>{const r=f.getBoundingClientRect(),s=a.clientX-r.left,d=a.clientY-r.top;if(w.dragging>=0){const g=f.width,u=f.height,i=120,p=g/2,v=u/2;h.vertices[w.dragging][0]=(s-p)/i,h.vertices[w.dragging][1]=-(d-v)/i}else w.hoverIndex=M(s,d),f.style.cursor=w.hoverIndex>=0?"move":"default"}),window.addEventListener("mouseup",()=>{w.dragging=-1});let P=!0,F=!1;function R(){P&&(F&&(V(h,1,1,e.value,n.value),C()),requestAnimationFrame(R))}R();const D=t`
<figure id="dihedral-figure">
  ${x}
  ${f}
  <figcaption>The combination of dihedral and axial stiffness is enough to maintain structure. Move the points and observe that the ring maintains its structure.</figcaption>
</figure>`,o=new k(a=>{F=a[0].intersectionRatio>0});return o.observe(D),b.then(()=>{P=!1,o.disconnect()}),c(D),{dihedralCanvas:f,dihedralCtx2D:l,dihedralGraph:h,dihedralInteraction:w,dihedralDist:$,dihedralIterate:V,dihedralDraw:C,dihedralGetVertex:M,dihedralRunning:P,dihedralVisible:F,dihedralLoop:R,dihedralFigure:D,dihedralObserver:o}},inputs:["html","dihedralTheta0Input","dihedralKBendInput","dihedralControlsContainer","IntersectionObserver","invalidation","display"],outputs:["dihedralCanvas","dihedralCtx2D","dihedralGraph","dihedralInteraction","dihedralDist","dihedralIterate","dihedralDraw","dihedralGetVertex","dihedralRunning","dihedralVisible","dihedralLoop","dihedralFigure","dihedralObserver"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-35"),expanded:[],variables:[]},{id:35,body:(t,e)=>{t(e`
<figure>
  <img src="./files/215010cb67fc5d9382293f1b124f4795cca60c3a5e83d3737607af3569b50a45187ead920dd062ce09406f0c4462bd9cffb2aacb2445c295bdbce85f892b7d46.png" style="max-width: min(100%, 400px)">
  <figcaption>Stiffness of the cardboard from which we construct the model generates a moment which pushes the six vertices toward a flat configuration.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-36"),expanded:[],variables:[]},{id:36,body:(t,e)=>t`The figure above shows six adjacent vertices connected by an edge. Torsional stiffness of the cardboard produces a rotational force which causes vertices ${e`c`}, ${e`d`}, ${e`e`}, and ${e`f`} to rotate toward flat.`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-37"),expanded:[],variables:[]},{id:37,body:(t,e)=>{t(e`
<figure>
  <img src="./files/19f229d9bfb51c5702f7764d7a81c56abb93cd141312e01034d3152fc1e9a42a90151707f573b16d1b7c04169a26c71e15b6b2f82fafdeb3ba5011148aee5885.png" style="max-width: min(100%, 600px)">
  <figcaption>We define unit vectors α, β, and γ based on the six adjacent vertices.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-38"),expanded:[],variables:[]},{id:38,body:(t,e)=>t`Without the sort of physical justification required for a scientifically valid molecular dynamics simulation, we simply pick an energy function that's minimized when the outer vertices are not twisted. We therefore define the unit vectors ${e`\vec{\alpha}`}, ${e`\vec{\beta}`}, and ${e`\vec{\gamma}`}:

${e.block`\vec{\alpha} \equiv \frac{\vec{b} - \vec{a}}{|\vec{b} - \vec{a}|} = \alpha(a, b),\;\;\;\vec{\beta} \equiv \frac{\vec{d} - \vec{c}}{|\vec{d} - \vec{c}|} = \beta(c, d),\;\;\;\vec{\gamma} \equiv \frac{\vec{f} - \vec{e}}{|\vec{f} - \vec{e}|} = \gamma(e, f)`}

and define the energy function:

${e.block`E_{torsion} = -((\vec{\alpha} \times \vec{\beta}) \cdot (\vec{\alpha} \times \vec{\gamma}))^2.`}

Due to the square, this function takes the value ${e`-1`} when ${e`\vec{\alpha} \times \vec{\beta}`} is either parallel *or* antiparallel to ${e`\vec{\alpha} \times \vec{\gamma}`}. In words, this means that the value is minimized when vertices ${e`c`}, ${e`d`}, ${e`e`}, and ${e`f`} exhibit no rotation relative to the central edge, ${e`e_{ab}`}.

Note importantly that if we did not normalize vectors ${e`\vec{\alpha}`}, ${e`\vec{\beta}`}, and ${e`\vec{\gamma}`}, then ${e`E_{torsion}`} would depend upon the distance between the vertices, and the simulation would either blow up or collapse to a point, depending on the sign of ${e`E_{torsion}`}. As it stands though, the constraint that ${e`\vec{\alpha}`}, ${e`\vec{\beta}`}, and ${e`\vec{\gamma}`} are unit vectors produces a strictly torsional force.

Computing the gradient of the above function without an explosion of terms is a bit challenging. I spent a couple sheets of paper giving it a try before recalling why [Einstein summation notation](https://en.wikipedia.org/wiki/Einstein_notation) is so useful in vector calculus.

The page below illustrates the full derivation of all eighteen components of the gradient.`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-39"),expanded:[],variables:[]},{id:39,body:(t,e)=>{t(e`
<figure>
  <a href="./files/3429461afc80952329592004ff09f1be2a5b3b48e4fa31b56f68fe0337d82c06e0adfad4249735479028522344af6de3df0a999536056b611151122c881db283.jpeg" target="_blank">
<img src="./files/3429461afc80952329592004ff09f1be2a5b3b48e4fa31b56f68fe0337d82c06e0adfad4249735479028522344af6de3df0a999536056b611151122c881db283.jpeg" style="max-width: min(100%, 600px)">
  </a>
  <figcaption>The full derivation of the torsional energy gradient (click to enlarge).</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-40"),expanded:[],variables:[]},{id:40,body:(t,e)=>t`<details>
<summary>Full derivation of the torsional energy gradient</summary>

### Setup

Consider an edge connecting vertices ${e`a`} and ${e`b`}, with additional vertices ${e`c`}, ${e`d`} adjacent to ${e`a`}, and vertices ${e`e`}, ${e`f`} adjacent to ${e`b`}:

<figure style="margin: 1em 0;">
  <img src="./files/19f229d9bfb51c5702f7764d7a81c56abb93cd141312e01034d3152fc1e9a42a90151707f573b16d1b7c04169a26c71e15b6b2f82fafdeb3ba5011148aee5885.png" style="max-width: min(100%, 500px)">
</figure>

We define unit vectors along each edge:

${e.block`\vec{\alpha} \equiv \frac{\vec{b} - \vec{a}}{r_{ab}},\quad \vec{\beta} \equiv \frac{\vec{d} - \vec{c}}{r_{cd}},\quad \vec{\gamma} \equiv \frac{\vec{f} - \vec{e}}{r_{ef}}`}

where ${e`r_{ab} = |\vec{b} - \vec{a}|`}, etc.

### Energy Function

The torsional energy measures misalignment between the planes defined by branches on either side of the central edge. We define:

${e.block`E = -((\vec{\alpha} \times \vec{\beta}) \cdot (\vec{\alpha} \times \vec{\gamma}))^2`}

This is minimized (equals ${e`-1`}) when ${e`\vec{\alpha} \times \vec{\beta}`} is parallel or antiparallel to ${e`\vec{\alpha} \times \vec{\gamma}`}, meaning the branches are coplanar.

### Simplification Using BAC-CAB

Using the [BAC-CAB identity](https://en.wikipedia.org/wiki/Triple_product#Vector_triple_product) for the scalar triple product:

${e.block`(\vec{\alpha} \times \vec{\beta}) \cdot (\vec{\alpha} \times \vec{\gamma}) = (\vec{\alpha} \cdot \vec{\alpha})(\vec{\beta} \cdot \vec{\gamma}) - (\vec{\alpha} \cdot \vec{\beta})(\vec{\alpha} \cdot \vec{\gamma})`}

Since ${e`\vec{\alpha}`} is a unit vector (${e`|\vec{\alpha}| = 1`}), this simplifies to:

${e.block`E_0 \equiv (\vec{\beta} \cdot \vec{\gamma}) - (\vec{\alpha} \cdot \vec{\beta})(\vec{\alpha} \cdot \vec{\gamma})`}

so that ${e`E = -E_0^2`}.

In Einstein summation notation (repeated indices imply summation):

${e.block`\boxed{E_0 = \gamma_i \beta_i - (\alpha_j \beta_j)(\alpha_k \gamma_k)}`}

### Derivatives of Unit Vectors

To compute gradients, we need the derivatives of unit vectors with respect to their endpoint positions. For ${e`\vec{\alpha} = (\vec{b} - \vec{a}) / r_{ab}`}:

${e.block`\frac{\partial \alpha_i}{\partial a_j} = \frac{1}{r_{ab}}(\alpha_i \alpha_j - \delta_{ij})`}

${e.block`\frac{\partial \alpha_i}{\partial b_j} = \frac{1}{r_{ab}}(\delta_{ij} - \alpha_i \alpha_j)`}

where ${e`\delta_{ij}`} is the Kronecker delta. The analogous expressions hold for ${e`\vec{\beta}`} and ${e`\vec{\gamma}`}.

### Gradient Computation

Applying the chain rule to ${e`E = -E_0^2`}:

${e.block`\frac{\partial E}{\partial x} = -2 E_0 \frac{\partial E_0}{\partial x}`}

Since ${e`E_0 = \gamma_i \beta_i - (\alpha_j \beta_j)(\alpha_k \gamma_k)`}, we differentiate term by term.

**Gradient with respect to ${e`a_\ell`}:**

Only ${e`\vec{\alpha}`} depends on ${e`\vec{a}`}:

${e.block`\frac{\partial E_0}{\partial a_\ell} = -\frac{\partial \alpha_j}{\partial a_\ell} \beta_j (\alpha_k \gamma_k) - (\alpha_j \beta_j) \frac{\partial \alpha_k}{\partial a_\ell} \gamma_k`}

Substituting the derivative:

${e.block`= -\frac{1}{r_{ab}}(\alpha_j \alpha_\ell - \delta_{j\ell}) \beta_j (\alpha_k \gamma_k) - (\alpha_j \beta_j) \frac{1}{r_{ab}}(\alpha_k \alpha_\ell - \delta_{k\ell}) \gamma_k`}

${e.block`= \frac{1}{r_{ab}}\left[(\beta_\ell - \alpha_\ell(\alpha_j\beta_j))(\alpha_k\gamma_k) + (\alpha_j\beta_j)(\gamma_\ell - \alpha_\ell(\alpha_k\gamma_k))\right]`}

Multiplying by ${e`-2E_0`} and rearranging terms (noting that ${e`(\beta_\ell - X) = -(X - \beta_\ell)`}):

${e.block`\boxed{\frac{\partial E}{\partial a_\ell} = \frac{2E_0}{r_{ab}}\left[(\alpha_\ell(\alpha_j\beta_j) - \beta_\ell)(\alpha_k\gamma_k) + (\alpha_j\beta_j)(\alpha_\ell(\alpha_k\gamma_k) - \gamma_\ell)\right]}`}

**Gradient with respect to ${e`b_\ell`}:**

The derivative ${e`\partial \alpha_i / \partial b_j`} has opposite sign:

${e.block`\boxed{\frac{\partial E}{\partial b_\ell} = \frac{2E_0}{r_{ab}}\left[(\beta_\ell - \alpha_\ell(\alpha_j\beta_j))(\alpha_k\gamma_k) + (\alpha_j\beta_j)(\gamma_\ell - \alpha_\ell(\alpha_k\gamma_k))\right]}`}

Note that ${e`\frac{\partial E}{\partial a_\ell} = -\frac{\partial E}{\partial b_\ell}`}, as expected since shifting both ${e`a`} and ${e`b`} together should not change the energy.

**Gradient with respect to ${e`c_\ell`}:**

Only ${e`\vec{\beta}`} depends on ${e`\vec{c}`}. Since ${e`\vec{\beta} = (\vec{d} - \vec{c})/r_{cd}`}:

${e.block`\frac{\partial \beta_i}{\partial c_j} = \frac{1}{r_{cd}}(\beta_i\beta_j - \delta_{ij})`}

${e.block`\frac{\partial E_0}{\partial c_\ell} = \gamma_i \frac{\partial \beta_i}{\partial c_\ell} - \alpha_j \frac{\partial \beta_j}{\partial c_\ell} (\alpha_k \gamma_k)`}

${e.block`= \frac{1}{r_{cd}}\left[(\gamma_i\beta_i)\beta_\ell - \gamma_\ell - (\alpha_k\gamma_k)((\alpha_j\beta_j)\beta_\ell - \alpha_\ell)\right]`}

Multiplying by ${e`-2E_0`} and simplifying:

${e.block`\boxed{\frac{\partial E}{\partial c_\ell} = \frac{2E_0}{r_{cd}}\left[\gamma_\ell - (\gamma_i\beta_i)\beta_\ell + (\alpha_k\gamma_k)((\alpha_j\beta_j)\beta_\ell - \alpha_\ell)\right]}`}

**Gradient with respect to ${e`d_\ell`}:**

Since ${e`\frac{\partial \beta_i}{\partial d_j} = -\frac{\partial \beta_i}{\partial c_j}`}, we have ${e`\frac{\partial E}{\partial d_\ell} = -\frac{\partial E}{\partial c_\ell}`}:

${e.block`\boxed{\frac{\partial E}{\partial d_\ell} = \frac{2E_0}{r_{cd}}\left[(\gamma_i\beta_i)\beta_\ell - \gamma_\ell - (\alpha_k\gamma_k)((\alpha_j\beta_j)\beta_\ell - \alpha_\ell)\right]}`}

**Gradient with respect to ${e`e_\ell`}:**

Only ${e`\vec{\gamma}`} depends on ${e`\vec{e}`}. Since ${e`\vec{\gamma} = (\vec{f} - \vec{e})/r_{ef}`}:

${e.block`\frac{\partial \gamma_i}{\partial e_j} = \frac{1}{r_{ef}}(\gamma_i\gamma_j - \delta_{ij})`}

${e.block`\frac{\partial E_0}{\partial e_\ell} = \beta_i \frac{\partial \gamma_i}{\partial e_\ell} - (\alpha_j\beta_j)\alpha_k\frac{\partial \gamma_k}{\partial e_\ell}`}

${e.block`= \frac{1}{r_{ef}}\left[(\beta_i\gamma_i)\gamma_\ell - \beta_\ell - (\alpha_j\beta_j)((\alpha_k\gamma_k)\gamma_\ell - \alpha_\ell)\right]`}

Multiplying by ${e`-2E_0`} and simplifying:

${e.block`\boxed{\frac{\partial E}{\partial e_\ell} = \frac{2E_0}{r_{ef}}\left[\beta_\ell - (\beta_i\gamma_i)\gamma_\ell + (\alpha_j\beta_j)((\alpha_k\gamma_k)\gamma_\ell - \alpha_\ell)\right]}`}

**Gradient with respect to ${e`f_\ell`}:**

Since ${e`\frac{\partial \gamma_i}{\partial f_j} = -\frac{\partial \gamma_i}{\partial e_j}`}, we have ${e`\frac{\partial E}{\partial f_\ell} = -\frac{\partial E}{\partial e_\ell}`}:

${e.block`\boxed{\frac{\partial E}{\partial f_\ell} = \frac{2E_0}{r_{ef}}\left[(\beta_i\gamma_i)\gamma_\ell - \beta_\ell - (\alpha_j\beta_j)((\alpha_k\gamma_k)\gamma_\ell - \alpha_\ell)\right]}`}

### Summary

These eighteen gradient components (three spatial coordinates for each of six vertices) drive the simulation toward configurations where the branches on either side of each edge are coplanar. The normalization of ${e`\vec{\alpha}`}, ${e`\vec{\beta}`}, and ${e`\vec{\gamma}`} ensures that these forces are purely torsional and do not depend on edge lengths.

</details>`,inputs:["md","tex"],outputs:[],output:void 0,assets:_,autodisplay:!0,autoview:!1,automutable:void 0});y({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:(t,e)=>{const n=t`<div class="demo-controls"></div>`,x=e.range([0,.05],{label:"Torsional spring constant",value:.025,step:.001});return n.appendChild(x),{torsionControlsContainer:n,torsionKTorsionInput:x}},inputs:["html","Inputs"],outputs:["torsionControlsContainer","torsionKTorsionInput"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-42"),expanded:[],variables:[]},{id:42,body:(t,e,n,x,k,b)=>{const c=t`<canvas id="torsion-canvas" width="600" height="400"></canvas>`,f=c.getContext("2d"),l={vertices:[[-1,.5],[-1,-.5],[-.5,0],[.5,0],[1,-.5],[1,.5]],edges:[[0,2],[1,2],[2,3],[3,4],[3,5]]},h={dragging:-1,hoverIndex:-1};function w(o,a){const r=o[0]-a[0],s=o[1]-a[1];return Math.sqrt(r*r+s*s)}function $(o,a,r,s,d,g,u=.1){const i=new Array(o.vertices.length).fill(null).map(()=>[0,0]);for(const[E,T]of o.edges){const q=o.vertices[E],L=o.vertices[T],S=w(q,L);if(S<.001)continue;const O=r*(1-a/S),N=O*(q[0]-L[0]),G=O*(q[1]-L[1]);i[E][0]+=N,i[E][1]+=G,i[T][0]-=N,i[T][1]-=G}const p=Math.cos(s*Math.PI/180),v=[{center:2,neighbors:[0,1,3]},{center:3,neighbors:[2,4,5]}];for(const{center:E,neighbors:T}of v){const q=o.vertices[E];for(let L=0;L<T.length;L++)for(let S=L+1;S<T.length;S++){const O=T[L],N=T[S],G=o.vertices[O],le=o.vertices[N],ae=G[0]-q[0],te=G[1]-q[1],ie=le[0]-q[0],ne=le[1]-q[1],oe=Math.sqrt(ae*ae+te*te),re=Math.sqrt(ie*ie+ne*ne);if(oe<.001||re<.001)continue;const se=(ae*ie+te*ne)/(oe*re),ce=d*2*(se-p)/(oe*re),fe=oe/re,ue=ce*(ie-se/fe*ae),he=ce*(ne-se/fe*te),pe=ce*(ae-se*fe*ie),be=ce*(te-se*fe*ne);i[O][0]+=ue,i[O][1]+=he,i[E][0]-=ue+pe,i[E][1]-=he+be,i[N][0]+=pe,i[N][1]+=be}}const m=2,B=3,I=0,j=1,A=4,z=5,Y=o.vertices[m],W=o.vertices[B],H=o.vertices[I],U=o.vertices[j],J=o.vertices[A],ee=o.vertices[z],Q=W[0]-Y[0],de=W[1]-Y[1],K=Math.sqrt(Q*Q+de*de);if(K>.001){const E=Q/K,T=de/K,q=U[0]-H[0],L=U[1]-H[1],S=Math.sqrt(q*q+L*L),O=ee[0]-J[0],N=ee[1]-J[1],G=Math.sqrt(O*O+N*N);if(S>.001&&G>.001){const le=q/S,ae=L/S,te=O/G,ie=N/G,ne=E*ae-T*le,oe=E*ie-T*te,X=ne*oe*g*2;i[I][0]+=X*T/S,i[I][1]-=X*E/S,i[j][0]-=X*T/S,i[j][1]+=X*E/S,i[A][0]-=X*T/G,i[A][1]+=X*E/G,i[z][0]+=X*T/G,i[z][1]-=X*E/G}}for(let E=0;E<o.vertices.length;E++)E!==h.dragging&&(o.vertices[E][0]-=i[E][0]*u,o.vertices[E][1]-=i[E][1]*u)}function V(){const o=f,a=c.width,r=c.height,s=150,d=a/2,g=r/2;o.fillStyle="#fff",o.fillRect(0,0,a,r),o.strokeStyle="#333",o.lineWidth=3;for(const[u,i]of l.edges){const p=l.vertices[u],v=l.vertices[i];o.beginPath(),o.moveTo(d+p[0]*s,g-p[1]*s),o.lineTo(d+v[0]*s,g-v[1]*s),o.stroke()}for(let u=0;u<l.vertices.length;u++){const i=l.vertices[u],p=u===h.hoverIndex,v=u===h.dragging;o.fillStyle=v?"#f00":p?"#0a0":"#2366af",o.beginPath(),o.arc(d+i[0]*s,g-i[1]*s,8,0,Math.PI*2),o.fill()}}function C(o,a){const r=c.width,s=c.height,d=150,g=r/2,u=s/2;for(let i=0;i<l.vertices.length;i++){const p=l.vertices[i],v=g+p[0]*d,m=u-p[1]*d,B=o-v,I=a-m;if(B*B+I*I<400)return i}return-1}c.addEventListener("mousedown",o=>{const a=c.getBoundingClientRect(),r=o.clientX-a.left,s=o.clientY-a.top;h.dragging=C(r,s)}),c.addEventListener("mousemove",o=>{const a=c.getBoundingClientRect(),r=o.clientX-a.left,s=o.clientY-a.top;if(h.dragging>=0){const d=c.width,g=c.height,u=150,i=d/2,p=g/2;l.vertices[h.dragging][0]=(r-i)/u,l.vertices[h.dragging][1]=-(s-p)/u}else h.hoverIndex=C(r,s),c.style.cursor=h.hoverIndex>=0?"move":"default"}),window.addEventListener("mouseup",()=>{h.dragging=-1});let M=!0,P=!1;function F(){M&&(P&&($(l,1,1,180,.5,e.value),V()),requestAnimationFrame(F))}F();const R=t`
<figure id="torsion-figure">
  ${n}
  ${c}
  <figcaption>Move the vertices above and observe that the addition of torsional stiffness keeps the above structure planar.</figcaption>
</figure>`,D=new x(o=>{P=o[0].intersectionRatio>0});return D.observe(R),k.then(()=>{M=!1,D.disconnect()}),b(R),{torsionCanvas:c,torsionCtx2D:f,torsionGraph:l,torsionInteraction:h,torsionDist:w,torsionIterate:$,torsionDraw:V,torsionGetVertex:C,torsionRunning:M,torsionVisible:P,torsionLoop:F,torsionFigure:R,torsionObserver:D}},inputs:["html","torsionKTorsionInput","torsionControlsContainer","IntersectionObserver","invalidation","display"],outputs:["torsionCanvas","torsionCtx2D","torsionGraph","torsionInteraction","torsionDist","torsionIterate","torsionDraw","torsionGetVertex","torsionRunning","torsionVisible","torsionLoop","torsionFigure","torsionObserver"],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});y({root:document.getElementById("cell-43"),expanded:[],variables:[]},{id:43,body:(t,e)=>{t(e`
  <style>
kbd {
  background-color: #eee;
  border-radius: 3px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset;
  color: #333;
  display: inline-block;
  font-size: .85em;
  font-weight: 700;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
}
  </style>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:_,autodisplay:!1,autoview:void 0,automutable:void 0});
