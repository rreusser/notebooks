import{d,_}from"./index-ByB2dbry.js";d({root:document.getElementById("cell-1251"),expanded:[],variables:[]},{id:1251,body:(e,t)=>e`This notebook visualizes the strange attractors of [Clifford Pickover](http://paulbourke.net/fractals/clifford/) and [Peter de Jong](http://paulbourke.net/fractals/peterdejong/). You can pan and zoom with the mouse or a touch screen. Clifford attractors are defined by

${t.block`\begin{aligned}
x_{n + 1} &= \sin(a y_n) + c \cos(a x_n) \\
y_{n + 1} &= \sin(b x_n) + d \cos(b y_n)
\end{aligned}`}

while de Jong attractors are defined by

${t.block`\begin{aligned}
x_{n + 1} &= \sin(a y_n) - c \cos(b x_n) \\
y_{n + 1} &= \sin(c x_n) - d \cos(d y_n).
\end{aligned}`}

A grid of points is randomly offset and iterated many times. The results are accumulated onto a WebGL texture, effectively computing a histogram of the attractor. Single precision isn't quite adequate, so you can switch to CPU mode for a final render if you're willing to wait a bit longer for it to converge. Point density is computed using the formula in [this notebook](https://observablehq.com/@rreusser/selecting-the-right-opacity-for-2d-point-clouds?collection=@rreusser/writeups).

Color comes from the distance traveled by the most recent iteration. Each pixel accumulates both the RGB color and a hit count. Lightness is computed in the [YUV color space](https://en.wikipedia.org/wiki/YUV) from the logarithm of the hit count, while the hue comes from the average accumulated color.

For more on computing attractors in WebGL, Mike Bostock's [Making WebGL Dance](https://observablehq.com/@mbostock/making-webgl-dance) is a great walkthrough. See also his [Clifford Attractor](https://observablehq.com/@mbostock/clifford-attractor) series and Yuri Vishnevsky's [Strange Attractors](https://observablehq.com/@twitter/strange-attractors).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});d({root:document.getElementById("cell-1252"),expanded:[],variables:[]},{id:1252,body:async()=>{const[{reglCanvas:e},{default:t},{default:n},r]=await Promise.all([_(()=>import("./regl-canvas-D7hs0xnk.js"),[]).then(o=>{if(!("reglCanvas"in o))throw new SyntaxError("export 'reglCanvas' not found");return o}),_(()=>import("./fine-range-CNLDYXvU.js"),[]).then(o=>{if(!("default"in o))throw new SyntaxError("export 'default' not found");return o}),_(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(o=>{if(!("default"in o))throw new SyntaxError("export 'default' not found");return o}),_(()=>import("https://cdn.jsdelivr.net/npm/d3@7/+esm"),[])]);return{reglCanvas:e,FineRange:t,createREGL:n,d3:r}},inputs:[],outputs:["reglCanvas","FineRange","createREGL","d3"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-365"),expanded:[],variables:[]},{id:365,body:function(e,t,n){return e`\mathrm{accumulated\;points} = ${(t*n*n).toLocaleString()}`},inputs:["tex","accumulateCount","stateSize"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-81"),expanded:[],variables:[]},{id:81,body:(e,t,n,r)=>{const o=e(t.radio(["Clifford","de Jong"],{label:"Type",value:n.has("type")?n.get("type"):"Clifford"})),a=e(r(t.range,[-2.5,2.5],{value:n.has("a")?+n.get("a"):-1.85,label:"a",step:.001,width:400})),i=e(r(t.range,[-2.5,2.5],{value:n.has("b")?+n.get("b"):-2.5,label:"b",step:.001,width:400})),u=e(r(t.range,[-2.5,2.5],{value:n.has("c")?+n.get("c"):-1.05,label:"c",step:.001,width:400})),s=e(r(t.range,[-2.5,2.5],{value:n.has("d")?+n.get("d"):.585,label:"d",step:.001,width:400})),c=e(t.checkbox(["Simulate"],{value:["Simulate"]}));return{type:o,a,b:i,c:u,d:s,simulate:c}},inputs:["view","Inputs","parsedURL","FineRange"],outputs:["type","a","b","c","d","simulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1253"),expanded:[],variables:[]},{id:1253,body:(e,t,n)=>({_regl:e(t(n,{attributes:{antialias:!1,depthStencil:!1,preserveDrawingBuffer:!0},extensions:["OES_texture_float","OES_texture_half_float"]}))}),inputs:["view","reglCanvas","createREGL"],outputs:["_regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1254"),expanded:[],variables:[]},{id:1254,body:(e,t)=>({regl:function(){const r=e._gl.canvas,o=e.attachResize(t.width,t.height);return r.style.maxWidth="100%",r.style.height="auto",r.style.aspectRatio=`${t.width} / ${t.height}`,r.style.cursor="move",r.style.border="1px solid #ccc",o}()}),inputs:["_regl","viewport"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-649"),expanded:[],variables:[]},{id:649,body:(e,t,n)=>{const r=e(t.checkbox(["Invert","Flip colorscale"],{value:[...n.get("invert")==="true"?["Invert"]:[],...n.get("flip")==="true"?["Flip colorscale"]:[]]})),o=e(t.range([-.5,1.5],{value:n.has("brightness")?+n.get("brightness"):.3,label:"Brightness"})),a=e(t.range([.1,2],{value:n.has("contrast")?+n.get("contrast"):1,label:"Contrast"})),i=e(t.range([0,1],{value:n.has("saturation")?+n.get("saturation"):.8,label:"Saturation"})),u=e(t.range([.1,1],{value:n.has("dynamicRange")?+n.get("dynamicRange"):.2,label:"Dynamic range compression",transform:Math.log})),s=e(t.range([.1,2],{value:n.has("colorSpeed")?+n.get("colorSpeed"):.22,label:"Color speed",transform:Math.log})),c=e(t.range([0,360],{value:n.has("colorPhase")?+n.get("colorPhase"):180,label:"Color phase"})),p=e(t.range([.1,10],{value:n.has("gamma")?+n.get("gamma"):2.2,label:"Gamma",transform:Math.log})),f=e(t.range([5e5,4e6],{value:5e5,label:"Batch size",transform:Math.log,step:2})),m=e(t.range([1,50],{value:25,label:"Iterations",step:1})),b=e(t.range([0,3],{value:1.5,label:"AA Jitter (pixels)",step:.1})),g=t.select(["256 × 256","512 × 512","1024 × 1024","2048 × 2048","1680 × 1050","page width"],{value:"page width",label:`Size (dpi = ${window.devicePixelRatio})`}),l=e(g),h=e(t.radio(["cpu","gpu"],{value:"gpu",label:"Computation mode"}));return{opts:r,brightness:o,contrast:a,saturation:i,dynamicRange:u,colorSpeed:s,colorPhase:c,gamma:p,batchSize:f,iterations:m,jitter:b,sizeInput:g,size:l,mode:h}},inputs:["view","Inputs","parsedURL"],outputs:["opts","brightness","contrast","saturation","dynamicRange","colorSpeed","colorPhase","gamma","batchSize","iterations","jitter","sizeInput","size","mode"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-650"),expanded:[],variables:[]},{id:650,body:(e,t,n,r,o)=>({floatFormat:e(t.radio(["float","half float"],{value:n(r,"float")?"float":"half float",label:o`Floating format<br><em><small>switch to half float on mobile if float doesn't work</small></em>`}))}),inputs:["view","Inputs","canWriteToFBOOfType","regl","html"],outputs:["floatFormat"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1753"),expanded:[],variables:[]},{id:1753,body:function(t,n,r,o,a,i,u,s,c,p,f,m,b){const g=new URL(document.baseURI),l=g.searchParams;return l.set("type",t),l.set("a",n),l.set("b",r),l.set("c",o),l.set("d",a),l.set("brightness",i),l.set("contrast",u),l.set("gamma",s),l.set("saturation",c),l.set("colorSpeed",p),l.set("colorPhase",f),l.set("invert",!!~m.indexOf("Invert")),l.set("flip",!!~m.indexOf("Flip colorscale")),b`<a href="${g.toString()}">🔗 Link to this configuration</a>`},inputs:["type","a","b","c","d","brightness","contrast","gamma","saturation","colorSpeed","colorPhase","opts","html"],outputs:void 0,output:"link",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-1594"),expanded:[],variables:[]},{id:1594,body:function(e,t,n,r,o,a,i,u){const s=e.button("Download PNG"),c=`${t==="Clifford"?"clifford":"de-jong"}_a${n.toFixed(4)}_b${r.toFixed(4)}_c${o.toFixed(4)}_d${a.toFixed(4)}.png`;return s.addEventListener("input",()=>{i(u._gl.canvas.toDataURL(),c)}),s},inputs:["Inputs","type","a","b","c","d","downloadURI","regl"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-162"),expanded:[],variables:[]},{id:162,body:function(t){return t.button("Restart")},inputs:["Inputs"],outputs:void 0,output:"viewof$restart",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});d({root:document.getElementById("cell-157"),expanded:[],variables:[]},{id:157,body:function(){return 0},inputs:[],outputs:void 0,output:"mutable accumulateCount",assets:void 0,autodisplay:!0,autoview:!1,automutable:!0});d({root:document.getElementById("cell-865"),expanded:[],variables:[]},{id:865,body:function(){return!0},inputs:[],outputs:void 0,output:"mutable dirty",assets:void 0,autodisplay:!0,autoview:!1,automutable:!0});d({root:document.getElementById("cell-1767"),expanded:[],variables:[]},{id:1767,body:e=>({parsedURL:new Map(Object.entries(e(document.location.search)))}),inputs:["parseQueryString"],outputs:["parsedURL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1702"),expanded:[],variables:[]},{id:1702,body:(e,t)=>({shape:e==="page width"?[t,t]:e.split("×").map(r=>parseInt(r.trim(),10))}),inputs:["size","width"],outputs:["shape"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1288"),expanded:[],variables:[]},{id:1288,body:function(e,t,n,r,o,a,i){i.value=!0},inputs:["opts","brightness","contrast","gamma","saturation","dynamicRange","mutable$dirty"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-1478"),expanded:[],variables:[]},{id:1478,body:e=>({iterationArray:new Array(e*4).fill(0)}),inputs:["batchSize"],outputs:["iterationArray"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1485"),expanded:[],variables:[]},{id:1485,body:(e,t,n)=>({cpuPositionBuffer:function(){const o=e.buffer(t);return n.then(()=>o.destroy()),o}()}),inputs:["regl","iterationArray","invalidation"],outputs:["cpuPositionBuffer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1473"),expanded:[],variables:[]},{id:1473,body:(e,t,n,r,o)=>{function a(i){let u,s,c,p,f,m;e==="Clifford"?(u=t,s=n,c=t,p=r,f=o,m=r):(u=t,s=-1,c=r,p=n,f=-1,m=o);for(let b=0;b<i.length;b+=4){let g=i[b],l=i[b+1],h=Math.sin(u*l)+s*Math.cos(c*g),y=Math.sin(p*g)+f*Math.cos(m*l),w=h-g,v=y-l;i[b]=h,i[b+1]=y,i[b+2]=Math.sqrt(w*w+v*v),i[b+3]=b>>2}}return{iterate:a}},inputs:["type","a","c","b","d"],outputs:["iterate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1515"),expanded:[],variables:[]},{id:1515,body:(e,t,n,r,o,a)=>{function i(u){let s=Math.random()*2-1,c=Math.random()*2-1,p=Math.sqrt(e),f,m,b,g,l,h;t==="Clifford"?(f=n,m=r,b=n,g=o,l=a,h=o):(f=n,m=-1,b=o,g=r,l=-1,h=a);for(let y=0;y<u.length;y+=4){let w=u.length*Math.random(),v=4*(w/2%p)/p+s,x=4*w/2/p/p+c;for(let S=0;S<15;S++){let I=Math.sin(f*x)+m*Math.cos(b*v),B=Math.sin(g*v)+l*Math.cos(h*x);v=I,x=B}u[y]=v,u[y+1]=x}}return{cpuInitialize:i}},inputs:["batchSize","type","a","c","b","d"],outputs:["cpuInitialize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-1496"),expanded:[],variables:[]},{id:1496,body:(e,t)=>({cpuAccumulate:e({vert:`
  precision highp float;
  attribute vec4 position;
  uniform mat3 view3;
  uniform float colorSpeed, colorPhase, pointSize, colorSign, jitter;
  uniform vec2 resolution;
  varying vec3 color;
  #define PI ${Math.PI}

  vec3 colorscale (float t) {
    return 0.5 + 0.5 * vec3(
      cos((2.0 * PI) * t - colorPhase),
      cos((2.0 * PI) * (t - 1.0 / 3.0) - colorPhase),
      cos((2.0 * PI) * (t - 2.0 / 3.0) - colorPhase)
    );
  }

  const float g = 1.32471795724474602596;
  const vec2 q = vec2(1.0 / g, 1.0/(g*g));
  vec2 qrand2(float n) {
    return fract(0.5 + q * n);
  }

  void main () {    
    color = colorscale(position.z * colorSpeed * colorSign);
    vec2 xy = (view3 * vec3(position.xy, 1)).xy;
    gl_Position = vec4(xy, 0, 1);
    gl_PointSize = pointSize;

    gl_Position.xy += jitter * (qrand2(position.w) - 0.5) / resolution;
  }`,frag:`
  precision lowp float;
  varying vec3 color;
  uniform highp float pointSize;
  void main () {
    gl_FragColor = vec4(1, color) / (pointSize * pointSize);
  }`,attributes:{position:e.prop("cpuBuffer")},uniforms:{resolution:({framebufferWidth:r,framebufferHeight:o})=>[r,o],colorSpeed:e.prop("colorSpeed"),colorPhase:e.prop("colorPhase"),colorSign:e.prop("colorSign"),pointSize:e.prop("pointSize"),jitter:e.prop("jitter")},blend:{enable:!0,func:{srcRGB:1,srcAlpha:1,dstRGB:1,dstAlpha:1},equation:{rgb:"add",alpha:"add"}},framebuffer:e.prop("dst"),primitive:"points",depth:{enable:!1},count:t})}),inputs:["regl","batchSize"],outputs:["cpuAccumulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-906"),expanded:[],variables:[]},{id:906,body:(e,t,n)=>({scales:function(){const o=e.width/e.height,a=t.scaleLinear().range([0,n._gl.canvas.offsetWidth]).domain([-2.2*o,2.2*o]),i=t.scaleLinear().range([n._gl.canvas.offsetWidth,0]).domain([-2.2,2.2]);return{x:a,y:i,xOriginal:a.copy(),yOriginal:i.copy()}}()}),inputs:["viewport","d3","regl"],outputs:["scales"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-824"),expanded:[],variables:[]},{id:824,body:(e,t,n,r)=>({attachZoom:function(){function a(i,u,s,c,p){return e.zoom().on("zoom",function({transform:f}){let m;m=i.range().map(f.invertX,f),i.domain(s.domain()),i.domain(m.map(i.invert,i)),m=u.range().map(f.invertY,f),u.domain(c.domain()),u.domain(m.map(u.invert,u))})}e.select(t._gl.canvas).call(a(n.x,n.y,n.xOriginal,n.yOriginal).on("zoom.clearAccumulator",()=>{t.poll(),r()}))}()}),inputs:["d3","regl","scales","clearAccumulator"],outputs:["attachZoom"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:e=>({stateSize:Math.floor(Math.sqrt(e))}),inputs:["batchSize"],outputs:["stateSize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-754"),expanded:[],variables:[]},{id:754,body:e=>({viewport:{width:e[0],height:e[1],dpi:devicePixelRatio,margin:{t:0,r:0,b:0,l:0}}}),inputs:["shape"],outputs:["viewport"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-934"),expanded:[],variables:[]},{id:934,body:()=>{function e(t){const n=t.x.domain()[1]-t.x.domain()[0],r=t.xOriginal.domain()[1]-t.xOriginal.domain()[0],o=t.y.domain()[1]-t.y.domain()[0],a=t.yOriginal.domain()[1]-t.yOriginal.domain()[0];return n*o/(r*a)}return{scaleFactor:e}},inputs:[],outputs:["scaleFactor"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-875"),expanded:[],variables:[]},{id:875,body:function(t,n,r){return function(){t.use(()=>n.clear({color:[0,0,0,0]})),r.value=0}},inputs:["accumulator","regl","mutable$accumulateCount"],outputs:void 0,output:"clearAccumulator",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-166"),expanded:[],variables:[]},{id:166,body:function(t,n,r,o,a,i,u,s,c,p,f,m,b,g,l,h){m==="cpu"&&b(g),l.poll(),h()},inputs:["restart","iterations","batchSize","jitter","type","a","b","c","d","colorSpeed","colorPhase","mode","cpuInitialize","iterationArray","regl","clearAccumulator"],outputs:void 0,output:"performInitialization",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-71"),expanded:[],variables:[]},{id:71,body:function(t,n,r,o,a,i,u,s,c,p,f,m,b,g,l,h,y,w,v,x,S,I,B,z,E,R,C,F,P,M,V,O,q,T){const A=t.frame(({tick:W})=>{try{(~n.indexOf("Simulate")||r.value===0)&&(r.value===1&&o.use(()=>t.clear({color:[0,0,0,0]})),a==="cpu"&&((r.value+1)%i===0&&u(s),c(s),p.subdata(s)),f(m,k=>{b(g.x,g.y,j=>{(a==="cpu"?l:h)({a:y,b:w,c:v,d:x,cpuBuffer:p,dst:o,colorSpeed:S,jitter:I,colorPhase:B*Math.PI/180,colorSign:~z.indexOf("Flip colorscale")?-1:1,pointSize:r.value===0?2:1})})}),E.value=!0,r.value=r.value+1),E.value&&(R({src:o,opacity:1,brightness:C,contrast:F,accumulatorCount:Math.max(1,r.value),batchSize:P*P,gamma:M,dynamicRange:V,scaleFactor:O(g),invert:!!~z.indexOf("Invert"),saturation:q}),E.value=!1)}catch(k){console.error(k),A.cancel()}});T.then(()=>A.cancel())},inputs:["regl","simulate","mutable$accumulateCount","accumulator","mode","iterations","cpuInitialize","iterationArray","iterate","cpuPositionBuffer","configureViewport","viewport","configureScales","scales","cpuAccumulate","gpuAccumulate","a","b","c","d","colorSpeed","jitter","colorPhase","opts","mutable$dirty","copyToScreen","brightness","contrast","stateSize","gamma","dynamicRange","scaleFactor","saturation","invalidation"],outputs:void 0,output:"performIteration",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});d({root:document.getElementById("cell-1365"),expanded:[],variables:[]},{id:1365,body:(e,t,n)=>({randobuffer:function(){const o=Float32Array.from(Array.from(Array(e).keys())),a=t.buffer(o);return n.then(()=>a.destroy()),a}()}),inputs:["batchSize","regl","invalidation"],outputs:["randobuffer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-59"),expanded:[],variables:[]},{id:59,body:(e,t,n,r,o)=>({gpuAccumulate:e({vert:`
  precision highp float;
  attribute float n;
  uniform mat3 view3;
  uniform float a, b, c, d, jitter;
  uniform float colorSpeed, colorPhase, pointSize, sqrtBatchSize, colorSign;
  uniform vec2 offset, resolution;
  varying vec3 color;
  #define PI ${Math.PI}

${t==="Clifford"?`
      vec2 iterate (vec2 state) {
        return vec2(
          sin(a * state.y) + c * cos(a * state.x),
          sin(b * state.x) + d * cos(b * state.y)
        );
      }
`:`
      vec2 iterate (vec2 state) {
        return vec2(
          sin(a * state.y) - cos(b * state.x),
          sin(c * state.x) - cos(d * state.y)
        );
      }
`}

  vec3 colorscale (float t) {
    return 0.5 + 0.5 * vec3(
      cos((2.0 * PI) * t - colorPhase),
      cos((2.0 * PI) * (t - 1.0 / 3.0) - colorPhase),
      cos((2.0 * PI) * (t - 2.0 / 3.0) - colorPhase)
    );
  }

  const float g = 1.32471795724474602596;
  const vec2 q = vec2(1.0 / g, 1.0/(g*g));
  vec2 qrand2(float n) {
    return fract(0.5 + q * n);
  }


  void main () {
    vec2 p = 4.0 * vec2(mod(n, sqrtBatchSize), floor(n / sqrtBatchSize)) / sqrtBatchSize + offset;

    for (int i = 0; i < ${n-1}; i++) {
      p = iterate(p);
    }
    vec2 pn = iterate(p);
    float dist = length(p - pn);

    color = colorscale(dist * colorSpeed * colorSign);
    vec2 xy = (view3 * vec3(pn, 1)).xy;
    gl_Position = vec4(xy, 0, 1);
    gl_PointSize = pointSize;
    gl_Position.xy += jitter * (qrand2(n) - 0.5) / resolution;
  }`,frag:`
  precision lowp float;
  varying vec3 color;
  uniform highp float pointSize;
  void main () {
    gl_FragColor = vec4(1, color) / (pointSize * pointSize);
  }`,attributes:{n:r},uniforms:{resolution:({framebufferWidth:i,framebufferHeight:u})=>[i,u],offset:()=>[Math.random()*2-1,Math.random()*2-1],colorSpeed:e.prop("colorSpeed"),colorPhase:e.prop("colorPhase"),pointSize:e.prop("pointSize"),colorSign:e.prop("colorSign"),a:e.prop("a"),b:e.prop("b"),c:e.prop("c"),d:e.prop("d"),jitter:e.prop("jitter"),sqrtBatchSize:Math.floor(Math.sqrt(o))},blend:{enable:!0,func:{srcRGB:1,srcAlpha:1,dstRGB:1,dstAlpha:1},equation:{rgb:"add",alpha:"add"}},framebuffer:e.prop("dst"),primitive:"points",depth:{enable:!1},count:o})}),inputs:["regl","type","iterations","randobuffer","batchSize"],outputs:["gpuAccumulate"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-90"),expanded:[],variables:[]},{id:90,body:e=>({copyToScreen:e({vert:`
  precision highp float;
  varying vec2 uv;
  attribute vec2 xy;
  void main () {
    uv = 0.5 + 0.5 * xy;
    gl_Position = vec4(xy, 0, 1);
  }`,frag:`
  precision highp float;
  varying vec2 uv;
  uniform sampler2D src;
  uniform float opacity, brightness, contrast, gamma, scale, saturation, dynamicRange;
  uniform bool invert;

  vec3 rgb2yuv(vec3 rgb) {
    float y = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
    return vec3(y, 0.493 * (rgb.b - y), 0.877 * (rgb.r - y));
  }

  vec3 yuv2rgb(vec3 yuv) {
    return vec3(
      yuv.x + (1.0 / 0.877) * yuv.z,
      yuv.x - 0.39393 * yuv.y - 0.58081 * yuv.z,
      yuv.x + (1.0 / 0.493) * yuv.y
    );
  }

  // power smooth min (k=8)
  float smoothLimit(float x, float k) {
      x = 2.0 * x - 1.0;
      float a = pow(abs(x), 1.0 / k);
      return sign(x) * pow(a / (a + 1.0), k) * 0.5 + 0.5;
  }


  void main () {
    vec4 state = texture2D(src, uv);
    float density = state.r / scale;

    float v = density == 0.0 ? -20.0 : (log(density) - log(1.0)) / (log(1000.0) - log(1.0));
    float value = contrast * v + brightness;
    value = smoothLimit(value, dynamicRange);
    if (!invert) value = 1.0 - value;

    vec3 rgb = state.gba / max(state.r, 1.0);
    vec3 yuv = rgb2yuv(rgb);

    // Use the lightness from the overall density
    yuv.x = value;

    // Fade the saturation to zero at white and black:
    yuv.yz *= saturation * value * (1.0 - value) * 4.0;

    rgb = yuv2rgb(yuv);

    gl_FragColor = vec4(pow(rgb, vec3(1.0 / gamma)), 1.0);
  }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{src:e.prop("src"),scale:(n,r)=>{const o=n.framebufferWidth*n.framebufferHeight;return r.accumulatorCount*r.batchSize/o*r.scaleFactor},brightness:(n,r)=>r.invert?r.brightness:1-r.brightness,dynamicRange:e.prop("dynamicRange"),contrast:e.prop("contrast"),opacity:e.prop("opacity"),gamma:e.prop("gamma"),invert:e.prop("invert"),saturation:e.prop("saturation")},count:3,depth:{enable:!1}})}),inputs:["regl"],outputs:["copyToScreen"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(e,t)=>({accumulator:e.framebuffer({width:e._gl.canvas.width,height:e._gl.canvas.height,colorType:t,colorFormat:"rgba",depthStencil:!1})}),inputs:["regl","floatFormat"],outputs:["accumulator"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-752"),expanded:[],variables:[]},{id:752,body:(e,t)=>({configureViewport:e(t)}),inputs:["createReglViewportConfiguration","regl"],outputs:["configureViewport"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-748"),expanded:[],variables:[]},{id:748,body:(e,t)=>({configureScales:e(t)}),inputs:["createReglLinearScaleConfiguration","regl"],outputs:["configureScales"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:()=>{function e(t,n,r){r=r||2;for(var o=t*n*r,a=new Float32Array(o),i=0,u=0;u<o;i++,u+=r)a[u]=(i%t+.5)/t,a[u+1]=((i/t|0)+.5)/n;return a}return{createTextureLookupTable:e}},inputs:[],outputs:["createTextureLookupTable"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-790"),expanded:[],variables:[]},{id:790,body:(e,t,n,r,o)=>{function a(i){const u={view3:e(),inverseView3:e(),view:t(),inverseView:t()},s=i({context:{view3:i.prop("view3"),inverseView3:i.prop("inverseView3"),view:i.prop("view"),inverseView:i.prop("inverseView")},uniforms:{view3:i.prop("view3"),inverseView3:i.prop("inverseView3"),view:i.prop("view"),inverseView:i.prop("inverseView")}});return function(c,p,f){n(u.view3,c,p),r(u.inverseView3,u.view3),o(u.view,u.view3),o(u.inverseView,u.inverseView3),s(u,f)}}return{createReglLinearScaleConfiguration:a}},inputs:["mat3create","mat4create","mat3fromLinearScales","mat3invert","mat4fromMat3"],outputs:["createReglLinearScaleConfiguration"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-780"),expanded:[],variables:[]},{id:780,body:e=>{function t(n){e();let r=n({scissor:{enable:!0,box:{x:(o,a)=>o.pixelRatio*a.margin.l,y:(o,a)=>o.pixelRatio*a.margin.b,width:(o,a)=>o.framebufferWidth-o.pixelRatio*(a.margin.r+a.margin.l),height:(o,a)=>o.framebufferHeight-o.pixelRatio*(a.margin.t+a.margin.b)}},viewport:{x:(o,a)=>o.pixelRatio*a.margin.l,y:(o,a)=>o.pixelRatio*a.margin.b,width:(o,a)=>o.framebufferWidth-o.pixelRatio*(a.margin.r+a.margin.l),height:(o,a)=>o.framebufferHeight-o.pixelRatio*(a.margin.t+a.margin.b)},uniforms:{viewportResolution:(o,a)=>[o.viewportWidth,o.viewportHeight],framebufferResolution:o=>[o.framebufferWidth,o.framebufferHeight],inverseViewportResolution:(o,a)=>[1/o.viewportWidth,1/o.viewportHeight],inverseFramebufferResolution:o=>[1/o.framebufferWidth,1/o.framebufferHeight]}});return function(o,a){r(o,a)}}return{createReglViewportConfiguration:t}},inputs:["mat3create"],outputs:["createReglViewportConfiguration"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2118"),expanded:[],variables:[]},{id:2118,body:()=>{function e(){return new Float32Array([1,0,0,0,1,0,0,0,1])}function t(a,i){const u=i[0],s=i[1],c=i[2],p=i[3],f=i[4],m=i[5],b=i[6],g=i[7],l=i[8],h=l*f-m*g,y=-l*p+m*b,w=g*p-f*b;let v=u*h+s*y+c*w;return v?(v=1/v,a[0]=h*v,a[1]=(-l*s+c*g)*v,a[2]=(m*s-c*f)*v,a[3]=y*v,a[4]=(l*u-c*b)*v,a[5]=(-m*u+c*p)*v,a[6]=w*v,a[7]=(-g*u+s*b)*v,a[8]=(f*u-s*p)*v,a):null}function n(){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function r(a,i){return a[0]=i[0],a[1]=i[1],a[2]=i[2],a[3]=0,a[4]=i[3],a[5]=i[4],a[6]=i[5],a[7]=0,a[8]=i[6],a[9]=i[7],a[10]=i[8],a[11]=0,a[12]=0,a[13]=0,a[14]=0,a[15]=1,a}function o(a,i,u){let s=i.domain(),c=u.domain(),p=2/(s[1]-s[0]),f=2/(c[1]-c[0]);return a[0]=p,a[1]=0,a[2]=0,a[3]=0,a[4]=f,a[5]=0,a[6]=-1-p*s[0],a[7]=-1-f*c[0],a[8]=1,a}return{mat3create:e,mat3invert:t,mat4create:n,mat4fromMat3:r,mat3fromLinearScales:o}},inputs:[],outputs:["mat3create","mat3invert","mat4create","mat4fromMat3","mat3fromLinearScales"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});d({root:document.getElementById("cell-2119"),expanded:[],variables:[]},{id:2119,body:e=>{function t(o,a){const i=document.createElement("a");i.download=a,i.href=o,document.body.appendChild(i),i.click(),document.body.removeChild(i)}function n(o){return o?Object.fromEntries(new e(o.startsWith("?")?o.slice(1):o)):{}}function r(o,a){try{return o.framebuffer({width:1,height:1,colorType:a}).destroy(),!0}catch{return!1}}return{downloadURI:t,parseQueryString:n,canWriteToFBOOfType:r}},inputs:["URLSearchParams"],outputs:["downloadURI","parseQueryString","canWriteToFBOOfType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
