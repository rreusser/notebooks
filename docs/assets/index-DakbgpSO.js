import{d as $,_ as H}from"./index-ByB2dbry.js";const Ve="/notebooks/assets/06397d180d434869e0902d4b309d5cd3c0a4906d503fde826ba604bbe60bf3c6b524826dadce9f2886e96aaa1b138e6b7db37b30b0d0b5824761344e077ad3da-BbLGDhGs.png",k=new Map([["./files/06397d180d434869e0902d4b309d5cd3c0a4906d503fde826ba604bbe60bf3c6b524826dadce9f2886e96aaa1b138e6b7db37b30b0d0b5824761344e077ad3da.png",Ve]]);$({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:(n,e)=>{n(e`
<figure>
  <img src="./files/2bd5ec5f8ffe634d501442964b31454eb84d22d969110af8735a4195e2a543a9006475ab026c38ca4c936158bd8a9185482332f5d4a7817abf78ae6852d7d785.jpeg" style="width: 600px; max-width: 100%">
  <figcaption>The finished product, composed of 49 recycled toilet paper tubes (and which I realize after building sorta brings things full circle and looks a bit like a coronavirus).</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:(n,e)=>n`## Fabrication

My brand is regular Trader Joe's toilet paper, though I have no reason to believe anything about the brand is particularly important, beyond consistency of diameter—with the exception of those cowards who make tube-free toilet paper rolls. Those won't work. I've considered side-stepping material collection and waiting to buy tag board when shelter-in-place eases, though to be honest, the recycled nature of the raw materials is a primary factor which draws me to this project.

Accumulating raw materials is simple. Flatten the tubes and—if you live with family—stash them somewhere a family member is unlikely to find them, lest you be required to explain yourself. Conversely, you may wish to avoid much wailing and gnashing of teeth and discuss your hoarding early on to prevent your stash from getting casually recycled.

The pattern below illustrates the required cuts. The angle required for three edges to join gracefully is ${e`30°`}, which makes the measurements easy. I've found a far easier method than measuring every tube though is to add opposing marks to one tube and use it as a template. I get about eight strips per tube.

*Update: I've trended toward thicker strips, as it makes the final constructions a bit more robust. The only limit on thickness is they can't be so thick that the joints on opposite ends interfere and prevent linking. Further simplifying, even cutting strips at flat 0° angles produces a visually appealing look and may save a bit of trouble.*`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(n,e)=>{n(e`
<figure>
  <img src="./files/bba3f0212ace95304b9a51f0123c4abc3b62330683f86a642463d991b174d9becbaf99999805bffaac6104b94bb6123ee6ddf74894a51e4d066291e7ddcec820.jpeg" style="width: 400px; max-width: 100%">
  <figcaption>The pattern of cuts illustrated on a flattened toilet paper tube.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:(n,e)=>n`Assembling the joints is straightforward. The pieces lock together in pleasing ${e`120°`} angles, requiring no additional fasteners up until the very last piece of the model, which requires a cut and some tape.

The illustration below shows how the joints interlock. I'd give more instruction, but if you actually want to do this, there's no better way to learn than through experimentation. After some fumbling around, I learned to always attach new pieces by branching off in the same direction, after which it becomes quite repetitive.`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(n,e)=>{n(e`
<figure>
  <img src="./files/9a6266c785181387edd1e4cab63c282ce15797fce68a88b21c6ab716c4a7951d8a4b70cd513e377662bc0d1894b0b3a7b4f53c020e5fd47513a82d2d554e923e.jpeg" style="width: 400px; max-width: 100%">
  <figcaption>Three loops link together to form an interlocked joint.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(n,e)=>{n(e`
<figure>
  <img src="./files/3429461afc80952329592004ff09f1be2a5b3b48e4fa31b56f68fe0337d82c06e0adfad4249735479028522344af6de3df0a999536056b611151122c881db283.jpeg" style="width: 600px; max-width: 100%">
  <figcaption>A semi-completed Y-joint tunnel with rabbit (barely visible, hiding from curious dog) inside.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:async()=>{const[{default:n},{default:e},{Mesh:i},{MeshPhysics:_},{createReglCamera:u},{createMeshRenderer:g},{MeshInteractions:I},{expandable:o}]=await Promise.all([H(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(r=>{if(!("default"in r))throw new SyntaxError("export 'default' not found");return r}),H(()=>import("https://cdn.jsdelivr.net/npm/icosphere@1.0.0/+esm"),[]).then(r=>{if(!("default"in r))throw new SyntaxError("export 'default' not found");return r}),H(()=>import("./mesh-ArZgdxOV.js"),[]).then(r=>{if(!("Mesh"in r))throw new SyntaxError("export 'Mesh' not found");return r}),H(()=>import("./mesh-physics-Bz01nwPL.js"),[]).then(r=>{if(!("MeshPhysics"in r))throw new SyntaxError("export 'MeshPhysics' not found");return r}),H(()=>import("./orbit-camera-BflaeugX.js"),[]).then(r=>{if(!("createReglCamera"in r))throw new SyntaxError("export 'createReglCamera' not found");return r}),H(()=>import("./mesh-renderer-BBEu3vUm.js"),[]).then(r=>{if(!("createMeshRenderer"in r))throw new SyntaxError("export 'createMeshRenderer' not found");return r}),H(()=>import("./mesh-interactions-CWp8kyW8.js"),[]).then(r=>{if(!("MeshInteractions"in r))throw new SyntaxError("export 'MeshInteractions' not found");return r}),H(()=>import("./expandable-dZkDG0zz.js"),[]).then(r=>{if(!("expandable"in r))throw new SyntaxError("export 'expandable' not found");return r})]);return{createREGL:n,createIcosphere:e,Mesh:i,MeshPhysics:_,createReglCamera:u,createMeshRenderer:g,MeshInteractions:I,expandable:o}},inputs:[],outputs:["createREGL","createIcosphere","Mesh","MeshPhysics","createReglCamera","createMeshRenderer","MeshInteractions","expandable"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:async()=>{const n={Starter:"starter.json","Bent Tube":"bent-tube.json","C28 Td[5,6]":"C28-Td[5,6].json","C28[5,7] D7d":"C28[5,7]-D7d.json","C60 Fullerene":"c60-fullerene.json","C120 5d[5,6,7] Peanut Fulleroid":"C120-5d[5,6,7]-peanut-fulleroid.json","C168 D3d[5,6,7] Peanut Fulleroid":"C168-D3d[5,6,7]-peanut-fulleroid.json","C180 Fullerene":"c180-fullerene.json","C240 Torus":"c240-torus.json","C260 I[5,7]":"C260-I[5,7].json","C320 Fullerene":"c320-fullerene.json","C360 Torus":"c360-torus.json","C360 D5h[5,6,7]":"C360-D5h[5,6,7].json","C500 Fullerene":"c500-fullerene.json",Capsule:"capsule.json",Dodecahedron:"dodecahedron.json","Double Torus":"double-torus.json","Genus 3 Torus":"genus-3-torus.json",Metadodecahedron:"metadodecahedron.json"},e=await(async()=>{const i={},_=Object.entries(n),u=await Promise.all(_.map(async([g,I])=>{try{const r=await(await fetch(`./models/${I}`)).json();return[g,r]}catch(o){return console.warn(`Failed to load ${g}:`,o),null}}));for(const g of u)if(g){const[I,o]=g;i[I]=o}return i})();return{presetFiles:n,presetGraphs:e}},inputs:[],outputs:["presetFiles","presetGraphs"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(n,e,i,_,u)=>{const g=n`<div class="controls-panel"></div>`;function I(m){return g.appendChild(m),e.input(m)}const o=I(i.select(Object.keys(_),{label:"Preset",value:"C60 Fullerene"})),r=I(i.button("Reset")),l=I(i.toggle({label:"Simulate",value:!0}));return u(g),{controlsContainer:g,ctrl:I,presetGraph:o,resetButton:r,simulate:l}},inputs:["html","Generators","Inputs","presetGraphs","display"],outputs:["controlsContainer","ctrl","presetGraph","resetButton","simulate"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(n,e,i)=>{const _=n`<div class="controls-panel secondary-controls-panel"></div>`;function u(q){return _.appendChild(q),e.input(q)}const g=u(i.range([0,200],{label:"Iterations per frame",value:5,step:1})),I=u(i.range([0,2],{label:"Axial spring constant",value:1,step:.01})),o=u(i.range([.1,2],{label:"Equilibrium length, l₀",value:1,step:.01})),r=u(i.toggle({label:"Axial strain coloring",value:!1})),l=u(i.range([0,2],{label:"Dihedral spring constant",value:.3,step:.01})),m=u(i.range([1,180],{label:"Equilibrium dihedral angle, θ₀",value:150,step:1})),w=u(i.range([0,.2],{label:"Torsional spring constant",value:.1,step:.01})),T=u(i.range([.5,5],{label:"Vertex size",value:3,step:.5})),F=u(i.range([0,1],{label:"Face opacity",value:.3,step:.05})),b=u(i.range([1,20],{label:"Focus radius (×l₀)",value:7,step:.5}));return{secondaryControlsContainer:_,ctrl2:u,iterations:g,k:I,l0:o,strainColoring:r,kBend:l,theta0:m,kTorsion:w,pointSize:T,faceOpacity:F,depthFalloffWidth:b}},inputs:["html","Generators","Inputs"],outputs:["secondaryControlsContainer","ctrl2","iterations","k","l0","strainColoring","kBend","theta0","kTorsion","pointSize","faceOpacity","depthFalloffWidth"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:()=>({state:{mesh:null,physics:null,interactions:null,renderer:null,camera:null,regl:null,frame:null,dirty:!0,presetName:"",expandedState:{expanded:!1},meshVersion:0,meshVersionListeners:new Set,lastResetCount:0,renderParams:{simulate:!0,iterations:1,pointSize:3,strainColoring:0,showFaces:!0,faceOpacity:.3,depthFalloffWidth:7}}}),inputs:[],outputs:["state"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:(n,e,i,_,u)=>{const g=n,I=e||"Starter",o=g!==i.lastResetCount;if(I!==i.presetName||!i.mesh||o){i.lastResetCount=g,i.presetName=I;const r=_[I];r&&(i.mesh=u.fromJSON(r),i.mesh.center(),i.physics&&(i.physics.mesh=i.mesh),i.interactions&&(i.interactions.mesh=i.mesh,i.interactions.selectedVertexIndex=-1,i.interactions.hoverVertexIndex=-1),i.dirty=!0,i.meshVersion++,i.meshVersionListeners.forEach(l=>l()))}return{resetCount:g,currentPreset:I,shouldReset:o}},inputs:["resetButton","presetGraph","state","presetGraphs","Mesh"],outputs:["resetCount","currentPreset","shouldReset"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:(n,e,i,_,u,g)=>{n.physics&&(n.physics.k=e,n.physics.l0=i,n.physics.theta0=_,n.physics.kBend=u*i*i,n.physics.kTorsion=g*i*i)},inputs:["state","k","l0","theta0","kBend","kTorsion"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(n,e,i,_,u,g,I,o)=>{n.renderParams.simulate=e,n.renderParams.iterations=i,n.renderParams.pointSize=_,n.renderParams.strainColoring=u?1.5:0,n.renderParams.showFaces=g>0,n.renderParams.faceOpacity=g,n.renderParams.depthFalloffWidth=I*o,n.dirty=!0},inputs:["state","simulate","iterations","pointSize","strainColoring","faceOpacity","depthFalloffWidth","l0"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:(n,e,i,_,u,g,I,o,r,l,m,w,T)=>{const F=n`<div id="mesh-canvas" style="width: 100%; height: 100%;"></div>`;if(!e.regl){e.regl=i({container:F,pixelRatio:devicePixelRatio,extensions:["ANGLE_instanced_arrays"],attributes:{preserveDrawingBuffer:!0}});const V=_(1);e.camera=u(e.regl,{eye:[0,1,-20]}),e.renderer=g(e.regl,V),e.physics=new I(e.mesh),e.interactions=new o(e.regl._gl.canvas,e.mesh,e.camera.camera,{projectionView:e.camera.projectionView,onChange:()=>{e.dirty=!0,e.meshVersion++,e.meshVersionListeners.forEach(S=>S())}})}const b=()=>{if(!e.regl)return;const V=e.regl._gl.canvas,S=F.getBoundingClientRect(),a=devicePixelRatio,p=Math.floor(S.width*a),y=Math.floor(S.height*a);(V.width!==p||V.height!==y)&&(V.width=p,V.height=y,e.dirty=!0,e.camera?.taint())},q=new r(b);q.observe(F);let z=!0;const A=new l(V=>{z=V[0].intersectionRatio>0});A.observe(F),e.frame&&(e.frame.cancel(),e.frame=null),e.frame=e.regl.frame(()=>{!z||!e.mesh||e.camera.tick(({dirty:V})=>{if(!(e.renderParams.simulate||e.dirty||V||e.interactions?.dirty))return;if(e.renderParams.simulate&&e.physics){e.physics.frozenVertex=e.interactions?.activeVertexIndex??-1;for(let c=0;c<e.renderParams.iterations;c++)e.physics.iterate()}e.regl.clear({color:[1,1,1,1],depth:1});const a=e.interactions?.selectedVertexIndex??-1,p=a>=0,y=p?e.mesh.getPosition(a):[0,0,0];e.renderer?.render(e.mesh,e.physics,{pointSize:e.renderParams.pointSize,strainColoring:e.renderParams.strainColoring,showFaces:e.renderParams.showFaces,faceOpacity:e.renderParams.faceOpacity,selectedVertexIndex:a,hoverVertexIndex:e.interactions?.hoverVertexIndex??-1,depthFalloff:p,depthFalloffWidth:e.renderParams.depthFalloffWidth,focusCenter:y}),e.dirty=!1,e.interactions&&(e.interactions.dirty=!1)})}),m.then(()=>{e.frame&&(e.frame.cancel(),e.frame=null),q.disconnect(),A.disconnect()});const O=n`
  <figure id="main-figure" style="max-width: none; margin: 0; height: 100%;">
${F}
<figcaption style="padding:0 10px">
  Click a vertex to select, then click to add a new vertex or click an existing vertex to create a connection.
  <kbd>Space</kbd> to deselect.
  <kbd>Backspace</kbd> deletes vertices, <kbd>s</kbd>/<kbd>c</kbd> splits/collapses vertices of degree 2.
  <kbd>e</kbd> to explode a vertex.
  Drag to rotate, <kbd>Shift</kbd> + drag to pan, <kbd>a</kbd> to aim camera at selected vertex.
</figcaption>
  </figure>
`;return w(T(O,{width:640,height:576,padding:[0,0],controls:".controls-panel",state:e.expandedState,onResize:(V,S,a,p)=>{F.style.width=`${S}px`,F.style.height=p?`${a-60}px`:`${a}px`,b()}})),{container:F,resizeCanvas:b,resizeObserver:q,visible:z,intersectionObserver:A,figure:O}},inputs:["html","state","createREGL","createIcosphere","createReglCamera","createMeshRenderer","MeshPhysics","MeshInteractions","ResizeObserver","IntersectionObserver","invalidation","display","expandable"],outputs:["container","resizeCanvas","resizeObserver","visible","intersectionObserver","figure"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(n,e)=>{n(e)},inputs:["display","secondaryControlsContainer"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:(n,e)=>({meshVersion:n.observe(_=>{const u=()=>_(e.meshVersion);return e.meshVersionListeners.add(u),_(e.meshVersion),()=>e.meshVersionListeners.delete(u)})}),inputs:["Generators","state"],outputs:["meshVersion"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:(n,e,i,_)=>{const u=(()=>{if(!e.mesh)return null;const g=e.mesh,I=[];for(let w=0;w<g.vertexCount;w++){const T=g.getPosition(w);I.push({index:w,position:[T[0].toFixed(2),T[1].toFixed(2),T[2].toFixed(2)],degree:g.degree(w),neighbors:g.getNeighbors(w)})}const o=[];for(let w=0;w<g.edgeCount;w++)o.push([g.edges[w*2],g.edges[w*2+1]]);const r=g.extractFaces(),l=r.map(w=>({vertices:w,length:w.length})),m={};for(const w of r)m[w.length]=(m[w.length]||0)+1;return{vertexCount:g.vertexCount,edgeCount:g.edgeCount,vertices:I,edges:o,faces:l,faceCounts:m}})();return i(_`<details>
  <summary>Debug: Mesh Data (${e.mesh?.vertexCount??0} vertices, ${e.mesh?.edgeCount??0} edges, ${u?.faces?.length??0} faces)</summary>
  <pre style="max-height: 300px; overflow: auto; font-size: 11px;">${JSON.stringify(u,null,2)}</pre>
</details>`),{debugData:u}},inputs:["meshVersion","state","display","html"],outputs:["debugData"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(n,e)=>{n(e`
<figure>
  <img src="./files/19f229d9bfb51c5702f7764d7a81c56abb93cd141312e01034d3152fc1e9a42a90151707f573b16d1b7c04169a26c71e15b6b2f82fafdeb3ba5011148aee5885.png" style="width: 400px; max-width: 100%">
  <figcaption>Gradient descent minimizes energy by taking incremental steps downhill.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-25"),expanded:[],variables:[]},{id:25,body:(n,e)=>n`### Mathematical Statement

We write an arbitrary energy function for our graph that maps the configuration to a single real number,
${e.block`E = E(v_i, e_j) \in \mathbb{R}`}
where ${e`v_i`} and ${e`e_j`} are the ${e`i^{th}`} vertex and ${e`j^{th}`} edge of the graph, respectively. ${e`E`} here is any useful function, picked out of the sky, such that it's minimized when the graph reaches a desirable configuration. We compute the gradient with respect to the *x-y-z* coordinates of all ${e`N`} vertex positions,
${e.block`\nabla E = \left(\frac{\partial E}{\partial v_{0,x}}, \frac{\partial E}{\partial v_{0,y}}, \frac{\partial E}{\partial v_{0,z}}, \frac{\partial E}{\partial v_{1,x}}, \ldots, \frac{\partial E}{\partial v_{N - 1,z}}\right).`}
In the sense of rolling down a hill, this gradient points uphill so that we update the solution in the direction of a small downhill step. We compute the ${e`n + 1^{th}`} step of vertex ${e`v_i`} as
${e.block`v_i^{n + 1} = v_i^n - \gamma \frac{\partial E}{\partial v_i}`}
where ${e`\gamma`} is some small number.

It's no more complicated than that, but we must now select a function ${e`E`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(n,e)=>n`## Axial stiffness

We start simple and add lengthwise (axial) stiffness to enforce uniform length. Given an edge connecting vertices ${e`a`} and ${e`b`}, we denote the length of the edge ${e`r_{ab}`} and the equilibrium length ${e`r_0`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:(n,e)=>{n(e`
<figure>
  <img src="./files/108bab81caf1bb59f7a55d16ec43bcb7b6ae442d7712a2add0c7a2410dfbbbf8d67385f03e158e0fee1ba8f7a486d8728a6440b50e4a0666cc6f4bd142ed81b5.png" style="width: 300px; max-width: 100%">
  <figcaption>Points a and b are separated by radius r<sub>ab</sub>.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-28"),expanded:[],variables:[]},{id:28,body:(n,e)=>n`The minimum-energy configuration occurs when ${e`r_{ab} = r_0`}, so we construct an energy function
${e.block`E_{axial} = k_{axial} (r_{ab} - r_0)^2`}
where ${e`k_{axial}`} is the axial stiffness. Note that ${e`E_{axial} = 0`} when ${e`r_{ab} = r_0`}. Since ${e`E_{axial}`} is strictly non-negative, this is just fancy way of saying that the energy can't get any lower than when the length is equal to the desired length; it's the bottom of the hill.

If we differentiate this function with respect to the position of the two endpoints, then we obtain the gradient. For example, the energy gradient with respect to the coordinates of vertex ${e`a`} is

${e.block`\frac{\partial E}{\partial v_{a, x}} = k_{axial}  \left(1 - \frac{r_0}{r_{ab}}\right) \left(v_{a,x} - v_{b, x}\right)`}

${e.block`\frac{\partial E}{\partial v_{a, y}} = k_{axial}  \left(1 - \frac{r_0}{r_{ab}}\right) \left(v_{a,y} - v_{b, y}\right)`}

${e.block`\frac{\partial E}{\partial v_{a, z}} = k_{axial}  \left(1 - \frac{r_0}{r_{ab}}\right) \left(v_{a,z} - v_{b, z}\right)`}

The gradient with respect to the coordinates of vertex ${e`b`} are equal and opposite.`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:(n,e)=>{const i=n`<div class="demo-controls"></div>`,_=e.range([.3,1.5],{label:"Equilibrium length",value:1,step:.01});i.appendChild(_);const u=e.range([0,2],{label:"Axial spring constant",value:1,step:.01});return i.appendChild(u),{axialControlsContainer:i,axialL0Input:_,axialKInput:u}},inputs:["html","Inputs"],outputs:["axialControlsContainer","axialL0Input","axialKInput"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(n,e,i,_,u,g,I)=>{const o=n`<canvas id="axial-canvas" width="600" height="400"></canvas>`,r=o.getContext("2d"),l={vertices:[[-1,0],[-.5,-.866],[.5,-.866],[1,0],[.5,.866],[-.5,.866]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},m={dragging:-1,hoverIndex:-1};function w(a,p){const y=a[0]-p[0],c=a[1]-p[1];return Math.sqrt(y*y+c*c)}function T(a,p,y,c=.1){const B=new Array(a.vertices.length).fill(null).map(()=>[0,0]);for(const[E,d]of a.edges){const j=a.vertices[E],M=a.vertices[d],t=w(j,M);if(t<.001)continue;const s=y*(1-p/t),v=s*(j[0]-M[0]),h=s*(j[1]-M[1]);B[E][0]+=v,B[E][1]+=h,B[d][0]-=v,B[d][1]-=h}for(let E=0;E<a.vertices.length;E++)E!==m.dragging&&(a.vertices[E][0]-=B[E][0]*c,a.vertices[E][1]-=B[E][1]*c)}function F(){const a=r,p=o.width,y=o.height,c=120,B=p/2,E=y/2;a.fillStyle="#fff",a.fillRect(0,0,p,y);for(const[d,j]of l.edges){const M=l.vertices[d],t=l.vertices[j],v=w(M,t)/e.value-1,h=Math.max(0,Math.min(255,128+v*300)),C=Math.max(0,Math.min(255,128-v*300));a.strokeStyle=`rgb(${h}, 80, ${C})`,a.lineWidth=3,a.beginPath(),a.moveTo(B+M[0]*c,E-M[1]*c),a.lineTo(B+t[0]*c,E-t[1]*c),a.stroke()}for(let d=0;d<l.vertices.length;d++){const j=l.vertices[d],M=d===m.hoverIndex,t=d===m.dragging;a.fillStyle=t?"#f00":M?"#0a0":"#2366af",a.beginPath(),a.arc(B+j[0]*c,E-j[1]*c,8,0,Math.PI*2),a.fill()}}function b(a,p){const y=o.width,c=o.height,B=120,E=y/2,d=c/2;for(let j=0;j<l.vertices.length;j++){const M=l.vertices[j],t=E+M[0]*B,s=d-M[1]*B,v=a-t,h=p-s;if(v*v+h*h<400)return j}return-1}o.addEventListener("mousedown",a=>{const p=o.getBoundingClientRect(),y=a.clientX-p.left,c=a.clientY-p.top;m.dragging=b(y,c)});function q(a){const p=o.getBoundingClientRect(),y=a.clientX-p.left,c=a.clientY-p.top;if(m.dragging>=0){const B=o.width,E=o.height,d=120,j=B/2,M=E/2;l.vertices[m.dragging][0]=(y-j)/d,l.vertices[m.dragging][1]=-(c-M)/d}else m.hoverIndex=b(y,c),o.style.cursor=m.hoverIndex>=0?"move":"default"}o.addEventListener("mousemove",q),window.addEventListener("mousemove",a=>{m.dragging>=0&&q(a)}),window.addEventListener("mouseup",()=>{m.dragging=-1});let z=!0,A=!1;function O(){z&&(A&&(T(l,e.value,i.value),F()),requestAnimationFrame(O))}O();const V=n`
<figure id="axial-figure">
  ${_}
  ${o}
  <figcaption>Axial stiffness enforces edge length but doesn't adequately constrain the structure. Move the points and observe that the structure is not maintained.</figcaption>
</figure>`,S=new u(a=>{A=a[0].intersectionRatio>0});return S.observe(V),g.then(()=>{z=!1,S.disconnect()}),I(V),{axialCanvas:o,axialCtx2D:r,axialGraph:l,axialInteraction:m,axialDist:w,axialIterate:T,axialDraw:F,axialGetVertex:b,axialMouseMove:q,axialRunning:z,axialVisible:A,axialLoop:O,axialFigure:V,axialObserver:S}},inputs:["html","axialL0Input","axialKInput","axialControlsContainer","IntersectionObserver","invalidation","display"],outputs:["axialCanvas","axialCtx2D","axialGraph","axialInteraction","axialDist","axialIterate","axialDraw","axialGetVertex","axialMouseMove","axialRunning","axialVisible","axialLoop","axialFigure","axialObserver"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-32"),expanded:[],variables:[]},{id:32,body:(n,e)=>{n(e`
<figure>
  <img src="./files/ba8cea49ce0f777b3b5bcf52ba928eac0ca2ca6e4f37deb6a04068064c5111d8bc378d66692083d12b4f07431e23da7bcfe8a45e2a859dd6378d3f040d9908c7.png" style="width: 400px; max-width: 100%">
  <figcaption>The segment connecting a, b, and c form angle θ.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-33"),expanded:[],variables:[]},{id:33,body:(n,e)=>n`Axial stiffness alone clearly does not accomplish our goal of maintaining pleasant configurations. We now add an additional type of stiffness: *dihedral stiffness*. The rationale is that edges meet at a preferred angle, ${e`\theta_0`}. We therefore define the energy function
${e.block`E_{dihedral} = k_{dihedral}(\theta - \theta_0)^2.`}
I'm sure chemistry has a lot to say about this topic, but it seems to be the case based on the structures produced that ${e`180°`} is the desired pairwise dihedral angle, and that angles of ${e`120°`} are simply the resulting compromise wherever three edges meet a vertex and result in three pairwise dihedral angles.`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-34"),expanded:[],variables:[]},{id:34,body:(n,e)=>{const i=n`<div class="demo-controls"></div>`,_=e.range([0,2],{label:"Bending spring constant",value:.3,step:.01});i.appendChild(_);const u=e.range([60,180],{label:"Equilibrium angle, θ₀",value:120,step:1});return i.appendChild(u),{dihedralControlsContainer:i,dihedralKBendInput:_,dihedralTheta0Input:u}},inputs:["html","Inputs"],outputs:["dihedralControlsContainer","dihedralKBendInput","dihedralTheta0Input"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-35"),expanded:[],variables:[]},{id:35,body:(n,e,i,_,u,g,I)=>{const o=n`<canvas id="dihedral-canvas" width="600" height="400"></canvas>`,r=o.getContext("2d"),l={vertices:[[-1,0],[-.5,-.866],[.5,-.866],[1,0],[.5,.866],[-.5,.866]],edges:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]},m={dragging:-1,hoverIndex:-1};function w(a,p){const y=a[0]-p[0],c=a[1]-p[1];return Math.sqrt(y*y+c*c)}function T(a,p,y,c,B,E=.1){const d=new Array(a.vertices.length).fill(null).map(()=>[0,0]);for(const[t,s]of a.edges){const v=a.vertices[t],h=a.vertices[s],C=w(v,h);if(C<.001)continue;const R=y*(1-p/C),x=R*(v[0]-h[0]),f=R*(v[1]-h[1]);d[t][0]+=x,d[t][1]+=f,d[s][0]-=x,d[s][1]-=f}const j=Math.cos(c*Math.PI/180),M=a.vertices.length;for(let t=0;t<M;t++){const s=t,v=(t+1)%M,h=(t+2)%M,C=a.vertices[s],R=a.vertices[v],x=a.vertices[h],f=C[0]-R[0],P=C[1]-R[1],L=x[0]-R[0],W=x[1]-R[1],X=Math.sqrt(f*f+P*P),Y=Math.sqrt(L*L+W*W);if(X<.001||Y<.001)continue;const J=(f*L+P*W)/(X*Y),Z=B*2*(J-j)/(X*Y),ee=X/Y,le=Z*(L-J/ee*f),de=Z*(W-J/ee*P),ce=Z*(f-J*ee*L),ue=Z*(P-J*ee*W);d[s][0]+=le,d[s][1]+=de,d[v][0]-=le+ce,d[v][1]-=de+ue,d[h][0]+=ce,d[h][1]+=ue}for(let t=0;t<a.vertices.length;t++)t!==m.dragging&&(a.vertices[t][0]-=d[t][0]*E,a.vertices[t][1]-=d[t][1]*E)}function F(){const a=r,p=o.width,y=o.height,c=120,B=p/2,E=y/2;a.fillStyle="#fff",a.fillRect(0,0,p,y),a.strokeStyle="#333",a.lineWidth=3;for(const[d,j]of l.edges){const M=l.vertices[d],t=l.vertices[j];a.beginPath(),a.moveTo(B+M[0]*c,E-M[1]*c),a.lineTo(B+t[0]*c,E-t[1]*c),a.stroke()}for(let d=0;d<l.vertices.length;d++){const j=l.vertices[d],M=d===m.hoverIndex,t=d===m.dragging;a.fillStyle=t?"#f00":M?"#0a0":"#2366af",a.beginPath(),a.arc(B+j[0]*c,E-j[1]*c,8,0,Math.PI*2),a.fill()}}function b(a,p){const y=o.width,c=o.height,B=120,E=y/2,d=c/2;for(let j=0;j<l.vertices.length;j++){const M=l.vertices[j],t=E+M[0]*B,s=d-M[1]*B,v=a-t,h=p-s;if(v*v+h*h<400)return j}return-1}o.addEventListener("mousedown",a=>{const p=o.getBoundingClientRect(),y=a.clientX-p.left,c=a.clientY-p.top;m.dragging=b(y,c)});function q(a){const p=o.getBoundingClientRect(),y=a.clientX-p.left,c=a.clientY-p.top;if(m.dragging>=0){const B=o.width,E=o.height,d=120,j=B/2,M=E/2;l.vertices[m.dragging][0]=(y-j)/d,l.vertices[m.dragging][1]=-(c-M)/d}else m.hoverIndex=b(y,c),o.style.cursor=m.hoverIndex>=0?"move":"default"}o.addEventListener("mousemove",q),window.addEventListener("mousemove",a=>{m.dragging>=0&&q(a)}),window.addEventListener("mouseup",()=>{m.dragging=-1});let z=!0,A=!1;function O(){z&&(A&&(T(l,1,1,e.value,i.value),F()),requestAnimationFrame(O))}O();const V=n`
<figure id="dihedral-figure">
  ${_}
  ${o}
  <figcaption>The combination of dihedral and axial stiffness is enough to maintain structure. Move the points and observe that the ring maintains its structure.</figcaption>
</figure>`,S=new u(a=>{A=a[0].intersectionRatio>0});return S.observe(V),g.then(()=>{z=!1,S.disconnect()}),I(V),{dihedralCanvas:o,dihedralCtx2D:r,dihedralGraph:l,dihedralInteraction:m,dihedralDist:w,dihedralIterate:T,dihedralDraw:F,dihedralGetVertex:b,dihedralMouseMove:q,dihedralRunning:z,dihedralVisible:A,dihedralLoop:O,dihedralFigure:V,dihedralObserver:S}},inputs:["html","dihedralTheta0Input","dihedralKBendInput","dihedralControlsContainer","IntersectionObserver","invalidation","display"],outputs:["dihedralCanvas","dihedralCtx2D","dihedralGraph","dihedralInteraction","dihedralDist","dihedralIterate","dihedralDraw","dihedralGetVertex","dihedralMouseMove","dihedralRunning","dihedralVisible","dihedralLoop","dihedralFigure","dihedralObserver"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-37"),expanded:[],variables:[]},{id:37,body:(n,e)=>{n(e`
<figure>
  <img src="./files/215010cb67fc5d9382293f1b124f4795cca60c3a5e83d3737607af3569b50a45187ead920dd062ce09406f0c4462bd9cffb2aacb2445c295bdbce85f892b7d46.png" style="width: 400px; max-width: 100%">
  <figcaption>Stiffness of the cardboard from which we construct the model generates a moment which pushes the six vertices toward a flat configuration.</figcaption>
</figure>
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-38"),expanded:[],variables:[]},{id:38,body:(n,e)=>n`The figure above shows six adjacent vertices connected by an edge. Torsional stiffness of the cardboard produces a rotational force which causes vertices ${e`c`}, ${e`d`}, ${e`e`}, and ${e`f`} to rotate toward flat.`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-39"),expanded:[],variables:[]},{id:39,body:(n,e)=>n`Without the sort of physical justification required for a scientifically valid molecular dynamics simulation, we simply pick an energy function that's minimized when the outer vertices are not twisted. We therefore define the unit vectors ${e`\vec{\alpha}`}, ${e`\vec{\beta}`}, and ${e`\vec{\gamma}`}:

${e.block`\vec{\alpha} \equiv \frac{\vec{b} - \vec{a}}{|\vec{b} - \vec{a}|},\;\;\;\vec{\beta} \equiv \frac{\vec{d} - \vec{c}}{|\vec{d} - \vec{c}|},\;\;\;\vec{\gamma} \equiv \frac{\vec{f} - \vec{e}}{|\vec{f} - \vec{e}|}`}

and define the energy function:

${e.block`E_{torsion} = -((\vec{\alpha} \times \vec{\beta}) \cdot (\vec{\alpha} \times \vec{\gamma}))^2.`}

Due to the square, this function takes the value ${e`-1`} when ${e`\vec{\alpha} \times \vec{\beta}`} is either parallel *or* antiparallel to ${e`\vec{\alpha} \times \vec{\gamma}`}. In words, this means that the value is minimized when vertices ${e`c`}, ${e`d`}, ${e`e`}, and ${e`f`} exhibit no rotation relative to the central edge, ${e`e_{ab}`}.

Note importantly that if we did not normalize vectors ${e`\vec{\alpha}`}, ${e`\vec{\beta}`}, and ${e`\vec{\gamma}`}, then ${e`E_{torsion}`} would depend upon the distance between the vertices, and the simulation would either blow up or collapse to a point, depending on the sign of ${e`E_{torsion}`}. As it stands though, the constraint that ${e`\vec{\alpha}`}, ${e`\vec{\beta}`}, and ${e`\vec{\gamma}`} are unit vectors produces a strictly torsional force.

Computing the gradient of the above function without an explosion of terms is a bit challenging. I spent a couple sheets of paper giving it a try before recalling why [Einstein summation notation](https://en.wikipedia.org/wiki/Einstein_notation) is so useful in vector calculus.`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-40"),expanded:[],variables:[]},{id:40,body:(n,e)=>n`<details>
<summary>Full derivation of the torsional energy gradient</summary>

### Setup

Consider an edge connecting vertices ${e`a`} and ${e`b`}, with additional vertices ${e`c`}, ${e`d`} adjacent to ${e`a`}, and vertices ${e`e`}, ${e`f`} adjacent to ${e`b`}:

<figure>
  <img src="./files/06397d180d434869e0902d4b309d5cd3c0a4906d503fde826ba604bbe60bf3c6b524826dadce9f2886e96aaa1b138e6b7db37b30b0d0b5824761344e077ad3da.png" style="width: 500px; max-width: 100%">
  <figcaption>Unit vectors α, β, and γ based on the six adjacent vertices.</figcaption>
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

where ${e`\delta_{ij}`} is the Kronecker delta. The analogous expressions hold for ${e`\vec{\beta}`} and ${e`\vec{\gamma}.`}

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

</details>`,inputs:["md","tex"],outputs:[],output:void 0,assets:k,autodisplay:!0,autoview:!1,automutable:void 0});$({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:(n,e)=>{const i=n`<div class="demo-controls"></div>`,_=e.range([0,.05],{label:"Torsional spring constant",value:.025,step:.001});return i.appendChild(_),{torsionControlsContainer:i,torsionKTorsionInput:_}},inputs:["html","Inputs"],outputs:["torsionControlsContainer","torsionKTorsionInput"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-42"),expanded:[],variables:[]},{id:42,body:async(n,e,i,_,u,g)=>{const{mat4:I,vec3:o,quat:r}=await H(()=>import("https://cdn.jsdelivr.net/npm/gl-matrix@3.4.3/+esm"),[]).then(t=>{if(!("mat4"in t))throw new SyntaxError("export 'mat4' not found");if(!("vec3"in t))throw new SyntaxError("export 'vec3' not found");if(!("quat"in t))throw new SyntaxError("export 'quat' not found");return t}),l=n`<canvas id="torsion-canvas" width="600" height="400"></canvas>`,m=l.getContext("2d"),w={vertices:[[-1,.5,.3],[-1,-.5,-.3],[-.5,0,0],[.5,0,0],[1,-.5,-.2],[1,.5,.2]],edges:[[0,2],[1,2],[2,3],[3,4],[3,5]]},T={rotation:r.create(),distance:5,center:o.fromValues(0,0,0),viewMatrix:I.create(),projMatrix:I.create(),rotate(t,s){const v=r.create(),h=r.create();r.setAxisAngle(v,[0,1,0],-t*.01),r.setAxisAngle(h,[1,0,0],-s*.01),r.multiply(this.rotation,v,this.rotation),r.multiply(this.rotation,this.rotation,h),r.normalize(this.rotation,this.rotation)},getViewMatrix(){const t=o.fromValues(0,0,this.distance);return o.transformQuat(t,t,this.rotation),o.add(t,t,this.center),I.lookAt(this.viewMatrix,t,this.center,[0,1,0]),this.viewMatrix},project(t,s,v){const h=o.fromValues(t[0],t[1],t[2]);o.transformMat4(h,h,this.getViewMatrix());const C=.8,R=-h[2],x=v/2/(R*Math.tan(C/2));return[s/2+h[0]*x,v/2-h[1]*x,R]}};r.setAxisAngle(T.rotation,[1,0,0],.3);const F=r.create();r.setAxisAngle(F,[0,1,0],.5),r.multiply(T.rotation,F,T.rotation);const b={orbitDragging:!1,vertexDragging:-1,hoverVertex:-1,lastX:0,lastY:0};function q(t,s){const v=l.width,h=l.height;for(let C=0;C<w.vertices.length;C++){const[R,x]=T.project(w.vertices[C],v,h),f=t-R,P=s-x;if(f*f+P*P<200)return C}return-1}function z(t,s){const v=t[0]-s[0],h=t[1]-s[1],C=t[2]-s[2];return Math.sqrt(v*v+h*h+C*C)}function A(t){const s=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);return s<1e-4?[0,0,0]:[t[0]/s,t[1]/s,t[2]/s]}function O(t,s){return[t[1]*s[2]-t[2]*s[1],t[2]*s[0]-t[0]*s[2],t[0]*s[1]-t[1]*s[0]]}function V(t,s){return t[0]*s[0]+t[1]*s[1]+t[2]*s[2]}function S(t,s){return[t[0]-s[0],t[1]-s[1],t[2]-s[2]]}function a(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2])}function p(t,s,v,h,C,R,x=.1){const f=t.vertices.map(()=>[0,0,0]);for(const[D,G]of t.edges){const Q=t.vertices[D],N=t.vertices[G],oe=z(Q,N);if(oe<.001)continue;const he=v*(1-s/oe);for(let K=0;K<3;K++){const pe=he*(Q[K]-N[K]);f[D][K]+=pe,f[G][K]-=pe}}const P=Math.cos(h*Math.PI/180),L=[{center:2,neighbors:[0,1,3]},{center:3,neighbors:[2,4,5]}];for(const{center:D,neighbors:G}of L){const Q=t.vertices[D];for(let N=0;N<G.length;N++)for(let oe=N+1;oe<G.length;oe++){const he=G[N],K=G[oe],pe=t.vertices[he],Te=t.vertices[K],fe=S(pe,Q),ge=S(Te,Q),me=a(fe),be=a(ge);if(me<.001||be<.001)continue;const $e=V(fe,ge)/(me*be),Ie=C*2*($e-P)/(me*be),je=me/be;for(let U=0;U<3;U++){const Me=Ie*(ge[U]-$e/je*fe[U]),De=Ie*(fe[U]-$e*je*ge[U]);f[he][U]+=Me,f[D][U]-=Me+De,f[K][U]+=De}}}const W=2,X=3,Y=0,ve=1,J=4,Z=5,ee=t.vertices[W],le=t.vertices[X],de=t.vertices[Y],ce=t.vertices[ve],ue=t.vertices[J],Be=t.vertices[Z],ke=S(le,ee),ye=a(ke);if(ye<.001)return;const te=A(ke),Ee=S(ce,de),_e=a(Ee);if(_e<.001)return;const ae=A(Ee),Ce=S(Be,ue),we=a(Ce);if(we<.001)return;const ne=A(Ce),re=V(te,ae),se=V(te,ne),xe=V(ae,ne),ie=2*(xe-re*se)*R;for(let D=0;D<3;D++){const G=(te[D]*re-ae[D])*se+re*(te[D]*se-ne[D]);f[W][D]+=ie*G/ye,f[X][D]-=ie*G/ye;const Q=ne[D]-xe*ae[D]-se*(te[D]-re*ae[D]);f[Y][D]+=ie*Q/_e,f[ve][D]-=ie*Q/_e;const N=ae[D]-xe*ne[D]-re*(te[D]-se*ne[D]);f[J][D]+=ie*N/we,f[Z][D]-=ie*N/we}for(let D=0;D<t.vertices.length;D++)if(D!==b.vertexDragging)for(let G=0;G<3;G++)t.vertices[D][G]-=f[D][G]*x}function y(){const t=m,s=l.width,v=l.height;t.fillStyle="#fff",t.fillRect(0,0,s,v);const h=w.vertices.map(x=>T.project(x,s,v)),C=w.edges.map(([x,f])=>({i0:x,i1:f,depth:(h[x][2]+h[f][2])/2}));C.sort((x,f)=>f.depth-x.depth),t.lineWidth=3;for(const{i0:x,i1:f}of C){const P=h[x],L=h[f],W=(P[2]+L[2])/2,X=Math.max(50,Math.min(200,150-W*20));t.strokeStyle=`rgb(${X}, ${X}, ${X})`,t.beginPath(),t.moveTo(P[0],P[1]),t.lineTo(L[0],L[1]),t.stroke()}const R=h.map((x,f)=>({p:x,i:f,depth:x[2]}));R.sort((x,f)=>f.depth-x.depth);for(const{p:x,i:f,depth:P}of R){const L=Math.max(4,10-P),W=f===b.hoverVertex;if(f===b.vertexDragging)t.fillStyle="#f00";else if(W)t.fillStyle="#0a0";else{const Y=Math.max(30,Math.min(200,100-P*15));t.fillStyle=`rgb(${Y}, ${Y+50}, ${Y+100})`}t.beginPath(),t.arc(x[0],x[1],L,0,Math.PI*2),t.fill(),t.strokeStyle="#333",t.lineWidth=1,t.stroke()}}l.addEventListener("mousedown",t=>{const s=l.getBoundingClientRect(),v=t.clientX-s.left,h=t.clientY-s.top,C=q(v,h);C>=0?(b.vertexDragging=C,l.style.cursor="move"):(b.orbitDragging=!0,l.style.cursor="grabbing"),b.lastX=t.clientX,b.lastY=t.clientY});function c(t){const s=l.getBoundingClientRect(),v=t.clientX-s.left,h=t.clientY-s.top;if(b.vertexDragging>=0){const C=(t.clientX-b.lastX)*.01,R=-(t.clientY-b.lastY)*.01,x=T.getViewMatrix(),f=[x[0],x[4],x[8]],P=[x[1],x[5],x[9]],L=w.vertices[b.vertexDragging];L[0]+=f[0]*C+P[0]*R,L[1]+=f[1]*C+P[1]*R,L[2]+=f[2]*C+P[2]*R,b.lastX=t.clientX,b.lastY=t.clientY}else if(b.orbitDragging){const C=t.clientX-b.lastX,R=t.clientY-b.lastY;T.rotate(C,R),b.lastX=t.clientX,b.lastY=t.clientY}else{const C=q(v,h);b.hoverVertex=C,l.style.cursor=C>=0?"move":"grab"}}l.addEventListener("mousemove",c),window.addEventListener("mousemove",t=>{(b.vertexDragging>=0||b.orbitDragging)&&c(t)}),window.addEventListener("mouseup",()=>{b.orbitDragging=!1,b.vertexDragging=-1,l.style.cursor=b.hoverVertex>=0?"move":"grab"}),l.addEventListener("wheel",t=>{t.preventDefault(),T.distance*=Math.exp(t.deltaY*.001),T.distance=Math.max(2,Math.min(20,T.distance))}),l.style.cursor="grab";let B=!0,E=!1;function d(){B&&(E&&(p(w,1,1,180,.5,e.value),y()),requestAnimationFrame(d))}d();const j=n`
<figure id="torsion-figure">
  ${i}
  ${l}
  <figcaption>Drag vertices to move them, drag elsewhere to rotate. The torsional spring drives the structure toward a planar configuration. Scroll to zoom.</figcaption>
</figure>`,M=new _(t=>{E=t[0].intersectionRatio>0});return M.observe(j),u.then(()=>{B=!1,M.disconnect()}),g(j),{mat4:I,vec3:o,quat:r,torsionCanvas:l,torsionCtx2D:m,torsionGraph:w,torsionCamera:T,qy:F,torsionInteraction:b,torsionGetVertex:q,vec3Dist:z,vec3Normalize:A,vec3Cross:O,vec3Dot:V,vec3Sub:S,vec3Len:a,torsionIterate3D:p,torsionDraw3D:y,torsionMouseMove:c,torsionRunning:B,torsionVisible:E,torsionLoop:d,torsionFigure:j,torsionObserver:M}},inputs:["html","torsionKTorsionInput","torsionControlsContainer","IntersectionObserver","invalidation","display"],outputs:["mat4","vec3","quat","torsionCanvas","torsionCtx2D","torsionGraph","torsionCamera","qy","torsionInteraction","torsionGetVertex","vec3Dist","vec3Normalize","vec3Cross","vec3Dot","vec3Sub","vec3Len","torsionIterate3D","torsionDraw3D","torsionMouseMove","torsionRunning","torsionVisible","torsionLoop","torsionFigure","torsionObserver"],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});$({root:document.getElementById("cell-43"),expanded:[],variables:[]},{id:43,body:(n,e)=>{n(e`
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
`)},inputs:["display","html"],outputs:[],output:void 0,assets:k,autodisplay:!1,autoview:void 0,automutable:void 0});
