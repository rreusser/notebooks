import{d as o,_}from"./index-ByB2dbry.js";o({root:document.getElementById("cell-453"),expanded:[],variables:[]},{id:453,body:function(t){return t`# Strange Attractors on the GPU, Part 1: Implementation

This notebook walks through simulating a strange attractor on the GPU and then rendering particle tracks as lines. We do this without any of the data ever touching the CPU!

The notebook presents the details below, but the high level summary is that the state of all particle tracks is stored in a single WebGL texture where each row of the texture is a ring buffer representing the history of each particle. On each frame we step a differential equation and overwrite the oldest element of each particle's history with a new value. Finally, we render particle tracks directly from the texture data.

Each frame of the simulation incurs just four draw calls:

1. Integrate the differential equation, writing a column containing the new state of all particles into a temporary texture.
2. Copy the temporary slice back into full state texture, overwriting the oldest values.
3. Draw all line segments and line joins using instanced triangle strip geometry. Sentinel values separate the lines into multiple contiguous segments.
4. Draw all line caps, using instanced triangle geometry.

Doing this requires being fancy about how we move data around, but I think the end result is actually pretty extensible and reusable for both 2D and 3D high performance line rendering. The line rendering itself is implemented in the [regl-gpu-lines](https://github.com/rreusser/regl-gpu-lines) npm module.

This notebook walks through all of the above steps in detail. To see more interesting attractors in action, see the companion notebook, [Strange Attractors on the GPU, Part 2: Fun! 🔗](https://observablehq.com/d/df2e1a97f7ab9a46).`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-697"),expanded:[],variables:[]},{id:697,body:function(e,a,n,i){return e(this,{width:a,height:Math.max(400,a*.6),pixelRatio:n,attributes:{antialias:~i.indexOf("Antialiasing")},extensions:["ANGLE_instanced_arrays","OES_texture_float"]})},inputs:["reglCanvas","width","pixelRatio","contextOpts"],outputs:void 0,output:"viewof$regl",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-215"),expanded:[],variables:[]},{id:215,body:function(e){return e.button("Restart")},inputs:["Inputs"],outputs:void 0,output:"viewof$restart",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-199"),expanded:[],variables:[]},{id:199,body:function(e){return e.checkbox(["Simulate"],{value:["Simulate"]})},inputs:["Inputs"],outputs:void 0,output:"viewof$opts",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-40"),expanded:[],variables:[]},{id:40,body:function(e){return e.range([1,4096],{value:20,label:"Particle count",step:1})},inputs:["Inputs"],outputs:void 0,output:"viewof$particleCount",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:function(e){return e.range([1,1024],{label:"Track length",value:100,transform:Math.log,step:1})},inputs:["Inputs"],outputs:void 0,output:"viewof$stepCount",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-174"),expanded:[],variables:[]},{id:174,body:function(e,a,n){return e.range([.001,.1],{value:.02,label:a`Time step, ${n`\Delta t`}`})},inputs:["Inputs","html","tex"],outputs:void 0,output:"viewof$dt",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-590"),expanded:[],variables:[]},{id:590,body:function(e){return e.checkbox(["Antialiasing"],{value:["Antialiasing"]})},inputs:["Inputs"],outputs:void 0,output:"viewof$contextOpts",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-349"),expanded:[],variables:[]},{id:349,body:function(e){return e`## Simulation method

To simulate strange attractors, here we use the [regl](https://github.com/regl-project/regl) WebGL library. I like \`regl\` because it's mostly just a convenience wrapper around the low-level WebGL API, adding few of its own abstractions while making WebGL fun and easy to use—especially for creative simulations like this.

However, there's a big downside. When you rely on low-level graphics APIs, even simple things can become very difficult. Lines are a good example. All browsers these days limit the built-in [OpenGL line primitive](https://www.khronos.org/opengl/wiki/Primitive#Line_primitives) to a single pixel width, so if you want any reasonably well-rendered lines, you really just have to implement it yourself.

Thus we have two challenges: to simulate the equations and to draw lines.`},inputs:["md"],outputs:void 0,output:"section_problemSetup",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-363"),expanded:[],variables:[]},{id:363,body:function(t){return t`## WebGL context creation

To get started, we import a helper for instantiating the [\`regl\`](https://github.com/regl-project/regl) library and create a context in the [\`regl\`](#regl) cell above (i.e. the main visualization).`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-688"),expanded:[],variables:[]},{id:688,body:async(t,e)=>{const{reglCanvas:a}=await _(()=>import("https://api.observablehq.com/@rreusser/regl-canvas.js?v=4"),[]).then(n=>{const i={},s=t.module(n.default),c=t.module();if(!s.defines("reglCanvas"))throw new SyntaxError("export 'reglCanvas' not found");return c.variable(i.reglCanvas=e()).import("reglCanvas",s),i});return{reglCanvas:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["reglCanvas"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:function(){return window.devicePixelRatio},inputs:[],outputs:void 0,output:"pixelRatio",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-353"),expanded:[],variables:[]},{id:353,body:function(t){return t`The reason for this helper is that browsers limit the total number of WebGL contexts before the oldest start getting removed—usually 8 or 16 contexts. If we're not careful, dependence on the notebook's \`width\` value will trigger instantiaton of tens of new contexts when we resize the page, causing figures to start to go blank. To avoid this, the \`reglCanvas\` helper prevents recreating the context when only the size has changed.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-472"),expanded:[],variables:[]},{id:472,body:function(t){return t`Next, we instantiate a camera. I wish I had a better camera module to offer, but the only module I have on hand is the [inertial-turntable-camera](https://github.com/standardCyborg/inertial-turntable-camera) module I wrote some time ago, and for which I have a lot of regrets. It needs a major overhaul which I haven't yet attacked. Really though, any camera model which exposes a standard, combined projection-view matrix would do just fine.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:async(t,e)=>{const{createReglCamera:a,createInteractions:n}=await _(()=>import("https://api.observablehq.com/@rreusser/regl-tools.js?v=4"),[]).then(i=>{const s={},c=t.module(i.default),d=t.module();if(!c.defines("createReglCamera"))throw new SyntaxError("export 'createReglCamera' not found");if(d.variable(s.createReglCamera=e()).import("createReglCamera",c),!c.defines("createInteractions"))throw new SyntaxError("export 'createInteractions' not found");return d.variable(s.createInteractions=e()).import("createInteractions",c),s});return{createReglCamera:a,createInteractions:n}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["createReglCamera","createInteractions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:function(e,a,n,i){const s=a(n,{distance:7,near:.01,far:100,phi:0,theta:-1,center:[0,2,0]});return i(s),s},inputs:["restart","createReglCamera","regl","createInteractions"],outputs:void 0,output:"camera",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-726"),expanded:[],variables:[]},{id:726,body:function(e,a,n,i){const s=n.width/n.height;i.resize(s)},inputs:["width","regl","viewof$regl","camera"],outputs:void 0,output:"updateCameraOnResize",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-356"),expanded:[],variables:[]},{id:356,body:function(e,a){return e`## State layout
Next, we define how we represent particle track data in a WebGL texture. The state of our ordinary differential equation (ODE) is represented by the three-component vector ${a`(x, y, z)`}. WebGL generally gives us four color channels to work with, so we choose to represent the state in a four-channel floating point texture. The ${a`j^{th}`} time step of the ${a`i^{th}`} particle is thus represented by the four-component vector, ${a.block`\mathbf{p}_j^{(i)} = (x_j^{(i)}, y_j^{(i)}, z_j^{(i)}, 1).`}

We pack these vectors into a texture, each row representing the history of a single particle. `},inputs:["md","tex"],outputs:void 0,output:"section_dataModel",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-332"),expanded:[],variables:[]},{id:332,body:function(t,e,a,n,i){const s=Math.min(600,t),c=150,d=e.select(a.svg(s,c)),p=["#cc2255","#2255dd"],b=e.scaleLinear().domain([-2.5,2.5]).range([0,s]),h=e.scaleLinear().domain([-.5,.9]).range([c,0]),g=e.line(l=>b(l[0]),l=>h(l[1])).defined(l=>!!l&&!isNaN(l[0])),f=5,y=[[-2,-.2],[-1.5,.5],[-1,.2],[-.5,.2],[0,.6],null,[0,-.2],[.5,-.1],[1,.2],[1.5,.3],[2,.1]];d.append("path").attr("stroke",p[0]).attr("fill","none").attr("d",g(y.slice(0,f))),d.append("path").attr("stroke",p[1]).attr("fill","none").attr("d",g(y.slice(f+1))),d.append("g").selectAll("circle").data(y.filter(l=>l)).enter().append("circle").attr("cx",l=>b(l[0])).attr("cy",l=>h(l[1])).attr("r",2.5).attr("fill",(l,r)=>p[Math.floor(r/f)]);const w=d.append("g").selectAll("text").data(y.filter(l=>l)).enter().append("text").attr("x",l=>b(l[0])).attr("y",l=>h(l[1])).attr("dy",l=>7).text("p").attr("dominant-baseline",l=>"hanging").attr("font-family","KaTeX_Main,Times New Roman,serif").attr("text-anchor",l=>"start").attr("font-weight",700).attr("fill",(l,r)=>p[Math.floor(r/f)]);w.append("tspan").attr("font-weight",400).attr("font-size",".8em").attr("dy","-.4em").text((l,r)=>`(${Math.floor(r/f)})`),w.append("tspan").attr("font-weight",400).attr("font-size",".8em").attr("dy","1.4em").attr("dx","-1.1em").text((l,r)=>r%f);const $=3,k=5,x=n`<div style="display:flex;flex-direction:row;justify-content:center;align-items:center">
    <div style="width:30px;transform:rotate(-90deg) translate(-150%,0)">&larr;&nbsp;particle&nbsp;&nbsp;<em>i</em></div>
    <div>step ${i`j`} &rarr;<br>
    <table class="texture1"><tbody>${[...Array($).keys()].map((l,r)=>n`<tr style="color:${p[l]}">${[...Array(k).keys()].map(m=>{if(l===2)return n`<td>${i`\vdots`}</td>`;let v;return v=i`\mathbf{p}_${m}^{(${l})}`,n`<td>${v}</td>`})}</tr>`)}</tbody></table>
    </div>
  </div>`,I=[0,1,2,4,3,2,0,1,2,4,3,2];n`
  <table class="buffers" style="margin-bottom:1em">
    <tbody>
      <tr>
        <td style="background-color:#eee">vertices</td>${[...Array(y.length).keys()].map(l=>{const r=Math.floor(l/(f+1)),m=l%(f+1);if(m===f)return n`<td style="background-color:#eee">${i`\textsf{NaN}`}</td>`;const v=`color:${p[r]}`;return n`<td style="${v}">${i`uv_{${m}}^{(${r})}`}</td>`})}
      </tr>
    </tbody>
  </table>
  <table class="buffers">
    <tbody>
      <tr>
        <td style="background-color:#eee">endpoints</td>${I.map((l,r)=>{const m=Math.floor(r/6),v=`color:${p[m]};background-color:${Math.floor(r/3)%2===0?"none":"#eee"}`;return n`<td style="${v}">${i`uv_{${l}}^{(${m})}`}</td>`})}
      </tr>
      <tr>
        <td style="background-color:#eee">isstart</td>${[1,0,1,0].map((l,r)=>{const m=`color:${p[Math.floor(r/2)]};background-color:${l?"none":"#eee"}`;return n`<td colspan="3" style=${m}>${i`${l}`}</td>`})}
      </tr>
    </tbody>
  </table>`;const u=n`<style>
    .observablehq .buffers {
      margin:auto;
      border: 1px solid #aaa;
      width: auto;
    }
    .observablehq .buffers td:not(:last-child) {
      border-right: 1px solid #aaa;
    }
    .observablehq .buffers tr:not(:last-child) {
      border-bottom: 1px solid #aaa;
    }
    .observablehq .buffers td {
      width: 30px;
      height: 30px;
      padding: 5px;
      text-align: center;
    }

    .observablehq .texture1 {
      margin: auto;
      border: 1px solid #aaa;
      width: auto;
    }
    .observablehq .texture1 tr:nth-child(even) {
      background-color: #eee;
    }
    .observablehq .texture1 td:not(:last-child) {
      border-right: 1px solid #aaa;
    }
    .observablehq .texture1 tr:not(:last-child) {
      border-bottom: 1px solid #aaa;
    }
    .observablehq .texture1 td {
      width: 30px;
      height: 30px;
      padding: 5px;
      text-align: center;
    }
  </style>`;return n`
  <figure style="max-width: 640px;text-align:center;">
    ${d.node()}
    <h4 style="margin-bottom:3em;">Line geometry</h4>
    ${x}
    <h4 style="margin-bottom:1em;margin-top:1em;">State texture representation</h4>
    ${u}
    <figcaption>The layout of the ${i`j^{th}`} step of particle ${i`i`}, ${i`p_j^{(i)}`}, in a WebGL texture.</figcaption>
  </figure>`},inputs:["width","d3","DOM","html","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-370"),expanded:[],variables:[]},{id:370,body:function(t,e){return t`As we step the ODE, we compute one new history point for each particle track. To avoid having to shift the entire history over one texel on every iteration just to append a new step, we instead treat each row as a ring buffer. At each time step ${e`j`}, we use the previous column of the history, ${e`p_{j-1}^{(i)}`}, to compute the next time step, ${e`p_{j}^{(i)}`}. When we reach the end of the row, we loop back to the start, at each step overwriting the oldest time step with the newest.

The cells below define empty textures which will hold our state data.`},inputs:["md","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-38"),expanded:[],variables:[]},{id:38,body:function(e,a,n,i){const s=e.framebuffer({depthStencil:!1,width:a,height:n,colorType:"float",colorFormat:"rgba"});return i.then(()=>s.destroy()),s},inputs:["regl","stepCount","particleCount","invalidation"],outputs:void 0,output:"state",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-66"),expanded:[],variables:[]},{id:66,body:function(e,a,n){const i=e.framebuffer({depthStencil:!1,width:1,height:a,colorType:"float",colorFormat:"rgba"});return n.then(()=>i.destroy()),i},inputs:["regl","particleCount","invalidation"],outputs:void 0,output:"tmpStateColumn",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-84"),expanded:[],variables:[]},{id:84,body:function(){return 0},inputs:[],outputs:void 0,output:"mutable currentColumn",assets:void 0,autodisplay:!0,autoview:!1,automutable:!0});o({root:document.getElementById("cell-149"),expanded:[],variables:[]},{id:149,body:function(){return 0},inputs:[],outputs:void 0,output:"mutable t",assets:void 0,autodisplay:!0,autoview:!1,automutable:!0});o({root:document.getElementById("cell-286"),expanded:[],variables:[]},{id:286,body:function(t){return t`## Computation

We now define our WebGL drawing commands. Our fundamental computational primitive will be similar to a *map* operation. WebGL 1 can't modify textures in-place, so this operation will read from one texture (or zero or two textures, if we like), perform some computation in a fragment shader, and write to an output texture.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-329"),expanded:[],variables:[]},{id:329,body:function(t,e,a,n,i){const s=Math.min(400,t),c=s*3/4,d=e.select(a.svg(s,c)),p=e.scaleLinear().domain([-5*s/c,5*s/c]).range([0,s]),b=e.scaleLinear().domain([-5,5]).range([c,0]),h=e.line(u=>p(u[0]),u=>b(u[1])).defined(u=>!!u),g=d.append("g");g.append("path").attr("stroke","black").attr("d",h([[-6,0],[6,0]])),g.append("path").attr("stroke","black").attr("d",h([[0,-5],[0,5]]));const f=[[-1,-1],[1,-1],[1,1],[-1,1]];d.append("path").attr("stroke","#888888").attr("fill","rgba(0,0,0,0.05)").attr("d",h(f)+"Z");const y=12,w=[...Array(y-1).keys()].map(u=>(u+1)/y*2-1),$=w.map(u=>[[-1,u],[1,u],null]).flat(),k=w.map(u=>[[u,-1],[u,1],null]).flat();d.append("path").attr("stroke","rgba(0,0,0,0.2)").attr("fill","none").attr("d",h(k)),d.append("path").attr("stroke","rgba(0,0,0,0.2)").attr("fill","none").attr("d",h($));const x=[[-4,-4],[4,-4],[0,4]];d.append("path").attr("stroke","rgba(128,0,0,0.5)").attr("fill","rgba(255,0,0,0.05)").attr("d",h(x)+"Z"),d.append("g").selectAll("circle").data(x).enter().append("circle").attr("cx",u=>p(u[0])).attr("cy",u=>b(u[1])).attr("r",2.5).attr("fill","red"),d.append("g").selectAll("circle").data(f).enter().append("circle").attr("cx",u=>p(u[0])).attr("cy",u=>b(u[1])).attr("r",2.5).attr("fill","black");const I=[{text:"(4, -4)",loc:[4,-4],baseline:"hanging",anchor:"start"},{text:"(-4, -4)",loc:[-4,-4],baseline:"hanging",anchor:"end"},{text:"(0, 4)",loc:[0,4],baseline:"auto",anchor:"start"},{text:"(-1, -1)",loc:[-1,-1],baseline:"hanging",anchor:"end"},{text:"(1,1)",loc:[1,1],baseline:"auto",anchor:"start"}];return d.append("g").selectAll("text").data(I).enter().append("text").attr("x",u=>p(u.loc[0])).attr("y",u=>b(u.loc[1])).attr("dx",u=>u.anchor==="start"?5:-5).attr("dy",u=>u.dy||0).text(u=>u.text).attr("dominant-baseline",u=>u.baseline||"auto").attr("text-anchor",u=>u.anchor||"start"),n`
  <figure style="max-width: 640px;text-align: center;">
    ${d.node()}
    <figcaption style="width:500px;max-width:100%;margin:auto">A single big triangle covers the entire ${i`[-1, 1] \times [-1, 1]`} viewport in the ${i`x-y`} plane of <a href="https://learnopengl.com/Getting-started/Coordinate-Systems">Normalized Device Coordinates</a> (NDC), triggering processing of all fragments. This forms our basic map operation for texture-based computation.</figcaption>
  </figure>`},inputs:["width","d3","DOM","html","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-378"),expanded:[],variables:[]},{id:378,body:function(t){return t`Modern graphics APIs more directly treat data as data, but in WebGL 1 we must deal with data as if it's colors, triangles, and textures. So in order to step the ODE and update the state, we therefore need to draw some sort of geometric primitive and assign each state texel a color. Many people use a fullscreen quad composed of two triangles for this operation, but I find it simpler (and [potentially better for performance](https://www.npmjs.com/package/a-big-triangle)) to use a single big triangle which covers the entire viewport.

Whichever you prefer, when we write such commands, in a sense we need to think backwards: we focus on the *output* texture we're evaluating and then work backward, sampling our input textures as needed and executing a fragment shader to determine the resulting output color.

Thus, the *vertex shader* will trivially position this triangle, and the *fragment shader* is where we will perform the real computation.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-381"),expanded:[],variables:[]},{id:381,body:function(e){return e`### Initialization

We start with a simple draw command. Initialization uniformly assigns each row of the state texture (all of a particle's history) to some random location within a sphere. Generating good pseudorandom numbers on a GPU is tricky, so to initialize our state, we use a low-discrepancy quasirandom number generator described by Martin Roberts in *[The Unreasonable Effectiveness
of Quasirandom Sequences](http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/)*.

The command below implements this step and writes the result to an output framebuffer.`},inputs:["md"],outputs:void 0,output:"section_initialization",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-45"),expanded:[],variables:[]},{id:45,body:function(e){return e({vert:`
    precision mediump float;
    attribute vec2 xy;
    varying vec2 uv;
    void main () {
      uv = 0.5 * xy + 0.5;
      gl_Position = vec4(xy, 0, 1);
    }`,frag:`
    precision mediump float;
    varying vec2 uv;
    uniform vec2 resolution;
    uniform vec3 origin;
    uniform float scale;
    uniform sampler2D src;

    // http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/
    vec3 quasirandom (float n) {
      const float g = 1.22074408460575947536;
      return fract(0.5 + n * vec3(1.0 / g, 1.0 / (g * g), 1.0 / (g * g * g))).zyx;
    }

    vec3 sphericalRandom (float n) {
      vec3 rand = quasirandom(n);
      float u = rand.x * 2.0 - 1.0;
      float theta = (2.0 * ${Math.PI}) * rand.y;
      return vec3(sqrt(1.0 - u * u) * vec2(cos(theta), sin(theta)), u) * sqrt(rand.z);
    }

    void main () {
      // gl_FragCoord is offset by a half-texel, but it's actually nice to avoid
      // identically zero states, since they tend to get stuck along zero
      // axes and follow unstable paths off to infinity.
      float particle = gl_FragCoord.y;

      // Output (x, y, z, 1):
      gl_FragColor = vec4(origin + scale * sphericalRandom(particle), 1);
    }`,uniforms:{resolution:a=>[a.framebufferWidth,a.framebufferHeight],origin:(a,n)=>[0,1,0],scale:(a,n)=>1},attributes:{xy:[[-4,-4],[0,4],[4,-4]]},framebuffer:e.prop("dst"),count:3})},inputs:["regl"],outputs:void 0,output:"initializeState",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-47"),expanded:[],variables:[]},{id:47,body:function(e,a,n,i,s,c){a.poll(),n.value=0,i.value=0,s({dst:c})},inputs:["restart","regl","mutable$currentColumn","mutable$t","initializeState","state"],outputs:void 0,output:"triggerInitialization",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-386"),expanded:[],variables:[]},{id:386,body:function(e){return e`### Integration
Next, we define a shader to integrate the ODE. Our output destination is a texture just large enough to hold the single time step we are computing. Its dimension is therefore 1 texel wide and \`particleCount\` texels tall. In the fragment shader, we sample the current state from our full state texture, perform an integration step, and output the updated state as the fragment color. Finally, we invoke an additional \`copyStateColumn\` draw command to transfer this single history slice back into our main state texture.

For integration, we use the [fourth-order Runge-Kutta](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods#The_Runge%E2%80%93Kutta_method) (RK4) method and directly substitute a GLSL derivative function into the shader.`},inputs:["md"],outputs:void 0,output:"section_integration",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-144"),expanded:[],variables:[]},{id:144,body:function(){return`
vec3 derivative (float x, float y, float z, float t) {
  const float alpha = 3.0;
  const float beta = 2.20;
  const float gamma = 1.0;
  const float mu = 1.510;
  return vec3(
    alpha * x * (1.0 - y) - beta * z,
    -gamma * y * (1.0 - x * x),
    mu * x
  );
}`},inputs:[],outputs:void 0,output:"attractorGLSL",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-69"),expanded:[],variables:[]},{id:69,body:function(e,a,n){return e({vert:`
    precision highp float;
    attribute vec2 xy;
    varying vec2 srcTexCoord;
    uniform float srcTexCoordU;
    void main () {
      // Map clip coords ([-1, 1] x [-1, 1]) to texture coords
      // ([0, 1] x [0, 1]) and store in a varying to be used
      // in the fragment shader:
      srcTexCoord = vec2(srcTexCoordU, 0.5 * xy.y + 0.5);
      gl_Position = vec4(xy, 0, 1);
    }`,frag:`
    precision highp float;
    uniform sampler2D srcTex;
    uniform float dt, t;
    varying vec2 srcTexCoord;

    ${a}

    vec3 deriv (vec3 p, float t) {
      // Unpack, for convenience
      return derivative(p.x, p.y, p.z, t);
    }

    void main () {
      vec3 p = texture2D(srcTex, srcTexCoord).xyz;

      // Runge-Kutta 4th order integration
      vec3 k1 = deriv(p, t);
      vec3 k2 = deriv(p + (0.5 * dt) * k1, t + 0.5 * dt);
      vec3 k3 = deriv(p + (0.5 * dt) * k2, t + 0.5 * dt);
      vec3 k4 = deriv(p + dt * k3, t + dt);

      // Evaluate the derivative there and use for a whole step:
      gl_FragColor = vec4(p + (dt / 6.0) * (k1 + k4 + 2.0 * (k2 + k3)), 1);

      // If the particle diverges off to infinity, place it back near the origin
      if (dot(gl_FragColor.xyz, gl_FragColor.xyz) > 1e6) {
        gl_FragColor.xyz *= 0.0001;
      }
    }`,attributes:{xy:[[-4,-4],[0,4],[4,-4]]},uniforms:{dt:e.prop("dt"),t:e.prop("t"),srcTex:e.prop("src"),srcTexCoordU:(i,s)=>(s.srcColumn+.5)/n},framebuffer:e.prop("dst"),count:3})},inputs:["regl","attractorGLSL","stepCount"],outputs:void 0,output:"integrate",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-389"),expanded:[],variables:[]},{id:389,body:function(t){return t`After running this command, we will have computed our updated state, except it will be in the the wrong place—our temporary texture. The following command implements the copy operation so that we can transfer it back to the correct place in our state texture. It uses scissoring to limit this copy to a single column, and we use a mutable counter to track the current time step column.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-80"),expanded:[],variables:[]},{id:80,body:function(e,a){return e({vert:`
    precision mediump float;
    attribute vec2 xy;
    varying vec2 uv;
    void main () {
      uv = 0.5 * xy + 0.5;
      gl_Position = vec4(xy, 0, 1);
    }`,frag:`
    precision mediump float;
    varying vec2 uv;
    uniform sampler2D srcTex;
    void main () {
      gl_FragColor = texture2D(srcTex, uv);
    }`,attributes:{xy:[[-4,-4],[0,4],[4,-4]]},uniforms:{srcTex:e.prop("src")},framebuffer:e.prop("dst"),scissor:{enable:!0,box:{x:e.prop("dstColumn"),y:0,height:a,width:1}},count:3})},inputs:["regl","particleCount"],outputs:void 0,output:"copyStateColumn",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-340"),expanded:[],variables:[]},{id:340,body:function(t){return t`## Line Rendering

In the timeless words of Matt DesLauriers, *[Drawing Lines is Hard](https://mattdesl.svbtle.com/drawing-lines-is-hard)*. This notebook didn't really come together until [Rye Terrell](https://twitter.com/wwwtyro)'s post, *[Instanced Line Rendering Part II: Alpha blending](https://wwwtyro.net/2021/10/01/instanced-lines-part-2.html)*, spurred me to resurrect my long-running attempts to come up with a clean solution for line rendering.

The resulting module is published as [regl-gpu-lines](https://github.com/rreusser/regl-gpu-lines). At the end of the day, it's really nothing more than a basic line rendering function, but it's written to be as general possible so that you can connect \`attribute\` and \`varying\` inputs to your data in the particular way which is meaningful to you.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-167"),expanded:[],variables:[]},{id:167,body:function(e){return e("https://unpkg.com/regl-gpu-lines@2.2.0")},inputs:["require"],outputs:void 0,output:"reglLines",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-423"),expanded:[],variables:[]},{id:423,body:function(t,e){return t`The general flow of vertex data required to render lines is illustrated below. Instead of particle positions in the vertex attributes, we instead store *texture coordinates*. Then in the vertex shader, we perform a texture lookup to retrieve the corresponding state vector, which we plot as the vertex position. 

The texture coordinates of the ${e`i^{th}`} particle at the ${e`j^{th}`} step are ${e`(u_j^{(i)}, v_j^{(i)})`}, denoted ${e`\mathbf{u}_j^{(i)}`}. They are equal to

${e.block`\mathbf{u}_j^{(i)} = \left(\frac{j + \frac{1}{2}}{M}, \frac{i + \frac{1}{2}}{N}\right),`}
where there are ${e`M`} total time steps and ${e`N`} total particle tracks. Texture sampler coordinates are located at the center of each texel, accounting for the half-texel offset.

`},inputs:["md","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-323"),expanded:[],variables:[]},{id:323,body:function(t,e,a,n,i){const s=Math.min(600,t),c=150,d=e.select(a.svg(s,c)),p=["#cc2255","#2255dd"],b=e.scaleLinear().domain([-2.5,2.5]).range([0,s]),h=e.scaleLinear().domain([-.5,.9]).range([c,0]),g=e.line(r=>b(r[0]),r=>h(r[1])).defined(r=>!!r&&!isNaN(r[0])),f=5,y=[[-2,-.2],[-1.5,.5],[-1,.2],[-.5,.2],[0,.6],null,[0,-.2],[.5,-.1],[1,.2],[1.5,.3],[2,.1]];d.append("path").attr("stroke",p[0]).attr("fill","none").attr("d",g(y.slice(0,f))),d.append("path").attr("stroke",p[1]).attr("fill","none").attr("d",g(y.slice(f+1))),d.append("g").selectAll("circle").data(y.filter(r=>r)).enter().append("circle").attr("cx",r=>b(r[0])).attr("cy",r=>h(r[1])).attr("r",2.5).attr("fill",(r,m)=>p[Math.floor(m/f)]);const w=d.append("g").selectAll("text").data(y.filter(r=>r)).enter().append("text").attr("x",r=>b(r[0])).attr("y",r=>h(r[1])).attr("dy",r=>7).attr("dy",18).attr("dominant-baseline",r=>"auto").attr("font-family","KaTeX_Main,Times New Roman,serif").attr("text-anchor",r=>"start").attr("fill",(r,m)=>p[Math.floor(m/f)]);w.append("tspan").text("p").attr("font-weight",700),w.append("tspan").text("("),w.append("tspan").text("u").attr("font-weight",700).attr("dx","-0.1em"),w.append("tspan").attr("font-size",".6em").attr("dy","-.8em").text((r,m)=>`(${Math.floor(m/f)})`),w.append("tspan").attr("font-size",".6em").attr("dy","1.2em").attr("dx","-1.1em").text((r,m)=>m%f),w.append("tspan").attr("dx","0.35em").attr("dy","-0.25em").text(")");const $=2,k=5,x=n`<div style="display:flex;flex-direction:row;justify-content:center;align-items:center;">
    <div style="width:30px;transform:rotate(-90deg) translate(-50%,0)">&larr;<em>v</em></div>
    <div>texture coord <em>u</em>&rarr;<br>
    <table class="texture2"><tbody>${[...Array($).keys()].map((r,m)=>n`<tr style="color:${p[r]}">${[...Array(k).keys()].map(v=>{let E;return E=i`\mathbf{u}_${v}^{(${r})}`,n`<td>${E}</td>`})}</tr>`)}</tbody></table>
    </div>
  </div>`,I=[0,1,2,4,3,2,0,1,2,4,3,2],u=n`
  <table class="buffers" style="margin-bottom:1em">
    <tbody>
      <tr>
        <td style="background-color:#eee">vertex</td>${[...Array(y.length).keys()].map(r=>{const m=Math.floor(r/(f+1)),v=r%(f+1);if(v===f)return n`<td style="background-color:#eee">${i`\textsf{NaN}`}</td>`;const E=`color:${p[m]}`;return n`<td style="${E}">${i`\mathbf{u}_{${v}}^{(${m})}`}</td>`})}
      </tr>
    </tbody>
  </table>
  <table class="buffers">
    <tbody>
      <tr>
        <td style="background-color:#eee">endpoint</td>${I.map((r,m)=>{const v=Math.floor(m/6),E=`color:${p[v]};background-color:${Math.floor(m/3)%2===0?"none":"#eee"}`;return n`<td style="${E}">${i`\mathbf{u}_{${r}}^{(${v})}`}</td>`})}
      </tr>
      <tr>
        <td style="background-color:#eee">isstart</td>${[1,0,1,0].map((r,m)=>{const v=`color:${p[Math.floor(m/2)]};background-color:${r?"none":"#eee"}`;return n`<td colspan="3" style=${v}>${i`${r}`}</td>`})}
      </tr>
    </tbody>
  </table>`,l=n`<style>
    .observablehq .buffers {
      margin:auto;
      border: 1px solid #aaa;
      width: auto;
    }
    .observablehq .buffers td:not(:last-child) {
      border-right: 1px solid #aaa;
    }
    .observablehq .buffers tr:not(:last-child) {
      border-bottom: 1px solid #aaa;
    }
    .observablehq .buffers td {
      width: 30px;
      height: 30px;
      padding: 5px;
      text-align: center;
    }

    .observablehq .texture2 {
      margin: auto;
      border: 1px solid #aaa;
      width: auto;
    }
    .observablehq .texture2 tr:nth-child(even) {
      background-color: #eee;
    }
    .observablehq .texture2 td:not(:last-child) {
      border-right: 1px solid #aaa;
    }
    .observablehq .texture2 tr:not(:last-child) {
      border-bottom: 1px solid #aaa;
    }
    .observablehq .texture2 td {
      width: 30px;
      height: 30px;
      padding: 5px;
      text-align: center;
    }
  </style>`;return n`
  <figure style="max-width: 640px;text-align:center;">
    ${u}
    <h4 style="margin-top:1em;margin-bottom:2em">Texture lookup vertex attribute buffers</h3>
    ${x}
    <h4 style="margin-bottom:3em;margin-top:1em;">State texture coordinates</h3>
    ${d.node()}
    <h4 style="margin-bottom:3em;">Line geometry</h3>
    ${l}
    <figcaption style="width:500px;max-width:100%;margin:auto">Data layout for line rendering. We start with vertex attributes containing texture coordinates and sample the state texture in the line drawing vertex shader to position line vertices.</figcaption>
  </figure>`},inputs:["width","d3","DOM","html","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-426"),expanded:[],variables:[]},{id:426,body:function(t,e){return t`Drawing lines proceeds in two steps. First, we draw interior segments. For this step, we pass the *vertex* attribute above. Each contiguous particle track is separated by a sentinel value. (Here I've called that \`NaN\`, though GLSL is not particularly IEEE754 compliant, so what I've *acutally* done is to pass it the out-of-bounds texture coordinate ${e`(-1, -1)`} which is then converted into a \`vec4\` position with \`w = 0.0\`, which the function interprets as a line break.) Rendering is accomplished by passing the same attribute aliased *four* times with a different offset. At each vertex we draw a segment and one adjacent join, sliding a window along the line and drawing a separate geometry instance for each segment. [Rye Terrell](https://wwwtyro.net/2021/10/01/instanced-lines-part-2.html) has an excellent post which walks through this process very clearly.

The second step is to draw end caps. For this step, we have to be a bit more clever and pass blocks of the three points nearest each end cap. Since GLSL ES 1.00 lacks the \`gl_InstanceID\` keyword, we're a bit limited in our options and need to pass a second per-endpoint-instance attribute which defines whether it's a starting or ending cap.

The demo below illustrates the resulting geometry, importing its implementation from the [\`regl\` Instanced Lines](https://observablehq.com/d/a5f8f4c894c77aaf) notebook. Line segments from the first pass are illustrated in blue, while line caps from the second pass are illustrated in red.`},inputs:["md","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-747"),expanded:[],variables:[]},{id:747,body:function(t){return t._gl.canvas},inputs:["lineExampleRegl"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-437"),expanded:[],variables:[]},{id:437,body:function(e,a){return e({join:a.select(["bevel","miter","round"],{value:"miter",label:"Joins"}),cap:a.select(["none","square","round"],{value:"round",label:"Caps"}),capResolution:a.range([1,10],{value:4,label:"Cap resolution",step:1}),joinResolution:a.range([1,10],{value:3,label:"Join resolution",step:1}),miterLimit:a.range([1,8],{value:2,step:.1,label:"Miter limit"})},{label:"Line parameters",open:!0})},inputs:["multiplexInputs","Inputs"],outputs:void 0,output:"viewof$lineParams",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});o({root:document.getElementById("cell-759"),expanded:[],variables:[]},{id:759,body:function(e,a){return e(a)},inputs:["renderLineExample","lineParams"],outputs:void 0,output:"renderExample",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-469"),expanded:[],variables:[]},{id:469,body:function(t){return t`One small trick is to use the texture coordinate corresponding to the particle ID to offset the [Normalized Device Coordinates](https://learnopengl.com/Getting-started/Coordinate-Systems) z-coordinate of the projected line vertices. At the cost of strictly correct z-ordering, this prevents a bit of the excessive z-fighting which we otherwise encounter.

The function below defines the line rendering command. The \`#pragma\` statements are just something I've made up as a means of defining how it connects to the attribute inputs and converts those to positions and widths.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-170"),expanded:[],variables:[]},{id:170,body:function(e,a){return e(a,{vert:`
    precision highp float;

    #pragma lines: attribute vec2 lookupCoord;
    #pragma lines: attribute float orientation;
    #pragma lines: position = projectPoint(lookupCoord);
    #pragma lines: width = pointWidth(lookupCoord);
    #pragma lines: varying vec3 color = getColor(lookupCoord);
    #pragma lines: orientation = getCapOrientation(orientation);

    uniform mat4 uProjectionView;
    uniform sampler2D src;
    uniform float scale, texOffset, width, pixelRatio, particleCount;

    vec4 projectPoint (vec2 point) {
      if (point.x < 0.0) return vec4(0);
      vec3 xyz = texture2D(src, fract(point.xy + vec2(texOffset, 0))).xyz;
      vec4 p = uProjectionView * vec4(xyz, 1);
      float w = p.w;
      p /= w;
      p.z -= 0.0002 * abs(point.y - 0.5);
      return p * w;
    }

    float getCapOrientation(float orientation) {
      return orientation;
    }

    float pointWidth (vec2 point) {
      return width;
    }

    vec3 getColor (vec2 point) {
      const vec3 color1 = vec3(0.55, 0.89, 0.65);
      const vec3 color2 = vec3(0.11, 0.32, 0.65);
      return mix(color1, color2, point.y);
    }`,frag:`
    precision highp float;
    varying vec3 lineCoord;
    varying vec3 color;
    void main () {
      const vec3 borderColor = vec3(1);
      gl_FragColor = vec4(mix(
        color,
        borderColor,
        smoothstep(0.5, 0.9, length(lineCoord.xy))
      ), 1);
    }`,uniforms:{width:(n,i)=>n.pixelRatio*5,src:a.prop("src"),texOffset:a.prop("texOffset")},depth:{enable:!0},cull:{enable:!1}})},inputs:["reglLines","regl"],outputs:void 0,output:"drawLines",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-465"),expanded:[],variables:[]},{id:465,body:function(t){return t`The lines below construct the vertex attributes containing texture coordinate which the line drawing command uses to sample our state texture.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-90"),expanded:[],variables:[]},{id:90,body:function(e,a,n,i){const s=[];for(let d=0;d<e;d++){for(let p=0;p<a;p++)s.push([(p+.5)/a,(d+.5)/e]);d<e-1&&s.push([-1,-1])}let c=n.buffer(s);return i.then(()=>c.destroy()),{lookupCoord:c,count:s.length}},inputs:["particleCount","stepCount","regl","invalidation"],outputs:void 0,output:"vertexAttributes",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-92"),expanded:[],variables:[]},{id:92,body:function(e,a,n,i,s){const c=[],d=[];let p=0;for(let g=0;g<e;g++){for(let f=0;f<3;f++)c.push([(f+.5)/a,(g+.5)/e]);for(let f=a-1;f>=a-3;f--)c.push([(f+.5)/a,(g+.5)/e]);d.push(n.START_CAP,n.END_CAP),p+=2}let b=i.buffer(c),h=i.buffer(new Uint8Array(d));return s.then(()=>{b.destroy(),h.destroy()}),{lookupCoord:b,orientation:h,count:p}},inputs:["particleCount","stepCount","reglLines","regl","invalidation"],outputs:void 0,output:"endpointAttributes",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-100"),expanded:[],variables:[]},{id:100,body:function(e,a){return{cap:"round",join:"bevel",capResolution:4,vertexAttributes:e,endpointAttributes:a,vertexCount:e.count,endpointCount:a.count}},inputs:["vertexAttributes","endpointAttributes"],outputs:void 0,output:"lineData",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-834"),expanded:[],variables:[]},{id:834,body:function(t){return t`## Draw loop`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-396"),expanded:[],variables:[]},{id:396,body:function(t){return t`Finally we put it all together into a main drawing loop which performs a full step of the ODE and then configures the camera and renders lines.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-189"),expanded:[],variables:[]},{id:189,body:function(e,a,n,i,s,c,d,p,b,h,g,f,y,w,$){a.taint();const k=~n.indexOf("Simulate");let x=i.frame(()=>{try{k&&(s({src:c,dst:d,srcColumn:p.value,dt:b,t:h.value}),h.value+=b,p.value=(p.value+1)%g,f({src:d,dst:c,dstColumn:p.value})),a(({dirty:I})=>{!k&&!I||(i.clear({color:[1,1,1,1],depth:1}),y({...w,src:c,texOffset:(p.value-g+1)/g}))})}catch(I){console.error(I),x&&x.cancel(),x=null}});$.then(()=>{x&&x.cancel(),x=null})},inputs:["initializeState","camera","opts","regl","integrate","state","tmpStateColumn","mutable$currentColumn","dt","mutable$t","stepCount","copyStateColumn","drawLines","lineData","invalidation"],outputs:void 0,output:"mainDrawLoop",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-475"),expanded:[],variables:[]},{id:475,body:function(t){return t`And that's it! You can see the result at the top of this page. Stay tuned for [Strange Attractors on the GPU, Part 2 🔗](https://observablehq.com/d/df2e1a97f7ab9a46), in which we copy/paste the exact same code, except focusing on making it look as good as possible rather than clear exposition.`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-415"),expanded:[],variables:[]},{id:415,body:function(t){return t`## Imports`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});o({root:document.getElementById("cell-439"),expanded:[],variables:[]},{id:439,body:async(t,e)=>{const{multiplexInputs:a}=await _(()=>import("https://api.observablehq.com/@rreusser/multiplex-inputs.js?v=4"),[]).then(n=>{const i={},s=t.module(n.default),c=t.module();if(!s.defines("multiplexInputs"))throw new SyntaxError("export 'multiplexInputs' not found");return c.variable(i.multiplexInputs=e()).import("multiplexInputs",s),i});return{multiplexInputs:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["multiplexInputs"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});o({root:document.getElementById("cell-435"),expanded:[],variables:[]},{id:435,body:async(t,e)=>{const{regl2:a,renderExample:n}=await _(()=>import("https://api.observablehq.com/a5f8f4c894c77aaf.js?v=4"),[]).then(i=>{const s={},c=t.module(i.default),d=t.module();if(!c.defines("regl2"))throw new SyntaxError("export 'regl2' not found");if(d.variable(s.regl2=e()).import("regl2",c),!c.defines("renderExample"))throw new SyntaxError("export 'renderExample' not found");return d.variable(s.renderExample=e()).import("renderExample",c),s});return{lineExampleRegl:a,renderLineExample:n}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["lineExampleRegl","renderLineExample"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
