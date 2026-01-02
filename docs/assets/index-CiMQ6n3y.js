import{d as n,_ as E}from"./index-ByB2dbry.js";n({root:document.getElementById("cell-873"),expanded:[],variables:[]},{id:873,body:async()=>{const[{reglCanvas:e},{default:t}]=await Promise.all([E(()=>import("./regl-canvas-DbKbmlCP.js"),[]).then(a=>{if(!("reglCanvas"in a))throw new SyntaxError("export 'reglCanvas' not found");return a}),E(()=>import("https://cdn.jsdelivr.net/npm/regl@2.1.1/+esm"),[]).then(a=>{if(!("default"in a))throw new SyntaxError("export 'default' not found");return a})]);return{reglCanvas:e,createREGL:t}},inputs:[],outputs:["reglCanvas","createREGL"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-876"),expanded:[],variables:[]},{id:876,body:(e,t)=>({regl:e.attachResize(t[0],t[1])}),inputs:["_regl","dimensions"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-875"),expanded:[],variables:[]},{id:875,body:(e,t,a)=>({_regl:e(t(a,{extensions:["ANGLE_instanced_arrays"]}))}),inputs:["view","reglCanvas","createREGL"],outputs:["_regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-391"),expanded:[],variables:[]},{id:391,body:function(t){return t.button("Restart")},inputs:["Inputs"],outputs:void 0,output:"viewof$restart",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});n({root:document.getElementById("cell-31"),expanded:[],variables:[]},{id:31,body:function(t){return t.range([2,200],{step:1,transform:Math.log,label:"Buckets",value:20})},inputs:["Inputs"],outputs:void 0,output:"viewof$n",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});n({root:document.getElementById("cell-312"),expanded:[],variables:[]},{id:312,body:function(t){return t.range([1,4],{label:"Friction",value:2.2,transform:Math.log})},inputs:["Inputs"],outputs:void 0,output:"viewof$friction",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});n({root:document.getElementById("cell-52"),expanded:[],variables:[]},{id:52,body:function(t){return t.range([0,1],{label:"Fill rate",value:.62})},inputs:["Inputs"],outputs:void 0,output:"viewof$fillRate",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});n({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:function(t){return t.range([0,.2],{label:"Drain rate",value:.11,step:.001})},inputs:["Inputs"],outputs:void 0,output:"viewof$drainRate",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});n({root:document.getElementById("cell-637"),expanded:[],variables:[]},{id:637,body:function(t){return t.select(["Exponential","Constant rate"],{label:"Draining"})},inputs:["Inputs"],outputs:void 0,output:"viewof$drainType",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});n({root:document.getElementById("cell-355"),expanded:[],variables:[]},{id:355,body:function(t){return t.range([.01,2],{transform:Math.log,label:"Time step",value:.05})},inputs:["Inputs"],outputs:void 0,output:"viewof$dt",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});n({root:document.getElementById("cell-434"),expanded:[],variables:[]},{id:434,body:function(t){return t.range([.1,10],{transform:Math.log,label:"Fill scale",value:.5})},inputs:["Inputs"],outputs:void 0,output:"viewof$drawScale",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});n({root:document.getElementById("cell-878"),expanded:[],variables:[]},{id:878,body:(e,t)=>e`The function below defines the derivative function which we integrate to simulate the system. The state variables of the system are the bucket fill amounts as well as the angular position and velocity of the system. For the sake of using an off-the-shelf ODE routine, we pack these into the vector ${t`\mathbf{y}`}. The system itself is just a wheel with inertia, friction, and the moment about the axis of rotation by the buckets.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});n({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(e,t,a,o,i,u,f)=>{function s(d,l,w){const p=l[e],v=l[e+1];let m=1,b=0;for(let r=0;r<e;r++)t?d[r]=-l[r]*a:d[r]=l[r]<0?-l[r]*a:-a,b+=l[r]*Math.sin(p+Math.PI*2*(r/e)),m+=l[r];const y=o(Math.floor(e*o(-p/(2*Math.PI),1)+.5),e);d[y]+=i,u.activeBucket=y,d[e]=v,d[e+1]=(b-v*f)/m}return{derivative:s}},inputs:["n","isExponentialDraining","drainRate","mod","fillRate","mutables","friction"],outputs:["derivative"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-877"),expanded:[],variables:[]},{id:877,body:()=>({mutables:{activeBucket:-1,step:0}}),inputs:[],outputs:["mutables"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-102"),expanded:[],variables:[]},{id:102,body:(e,t,a,o,i,u,f,s,d,l,w,p,v,m,b,y)=>({simulationLoop:function(){const _=e.frame(()=>{let B=10;for(let c=0;c<B;c++)t(a,a,o,i/B);let h=0,g=0;const P=a[u];let x=0;for(let c=0;c<u;c++){const S=P+Math.PI*2*(c/u);h+=a[c]*Math.sin(S),g+=a[c]*Math.cos(S),x+=a[c]}h/=x,g/=x;let I=f(2*s.step,d.length);d[I]=h,d[I+1]=g,l.subdata(d),w.subdata(a),e.clear({color:[1,1,1,1]}),p({y:w,theta:a[u],drawScale:v*(u/15),activeBucket:s.activeBucket}),m({trajectoryScale:.9,cmHistoryBuffer:l,n:Math.min(s.step,d.length/2)}),b([{trajectoryScale:.9,pointSize:7,state:[h,g],color:[.3,.5,.9]},{trajectoryScale:.9,pointSize:4,state:[0,0],color:[0,0,0]}]),s.step=(s.step+1)%(d.length/2)});y.then(()=>_.cancel())}()}),inputs:["regl","odeRK4","y","derivative","dt","n","mod","mutables","centerOfMassHistory","cmHistoryBuffer","yBuffer","drawBuckets","drawScale","drawTrajectory","drawPoint","invalidation"],outputs:["simulationLoop"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-468"),expanded:[],variables:[]},{id:468,body:(e,t)=>{t.step=0},inputs:["restartTrigger","mutables"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-520"),expanded:[],variables:[]},{id:520,body:(e,t,a,o,i,u)=>({restartTrigger:function(){}()}),inputs:["restart","n","fillRate","drainRate","friction","drainType"],outputs:["restartTrigger"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-643"),expanded:[],variables:[]},{id:643,body:e=>({isExponentialDraining:e==="Exponential"}),inputs:["drainType"],outputs:["isExponentialDraining"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-141"),expanded:[],variables:[]},{id:141,body:(e,t)=>({y:function(){const o=new Float32Array(t+2);return o[t]=Math.PI*2*.5/t-.01,o[t+1]=0,o}()}),inputs:["restart","n"],outputs:["y"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-111"),expanded:[],variables:[]},{id:111,body:(e,t,a)=>({yBuffer:function(){const i=e.buffer(t);return a.then(()=>i.destroy()),i}()}),inputs:["regl","y","invalidation"],outputs:["yBuffer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-461"),expanded:[],variables:[]},{id:461,body:e=>({centerOfMassHistory:function(){return new Float32Array(2e5)}()}),inputs:["restartTrigger"],outputs:["centerOfMassHistory"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-460"),expanded:[],variables:[]},{id:460,body:(e,t,a)=>({cmHistoryBuffer:function(){const i=e.buffer(t);return a.then(()=>i.destroy()),i}()}),inputs:["regl","centerOfMassHistory","invalidation"],outputs:["cmHistoryBuffer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-100"),expanded:[],variables:[]},{id:100,body:(e,t)=>{const o=e({vert:`
    precision highp float;
    attribute vec2 uv;
    attribute float y, index;
    uniform float n;
    uniform float theta, activeBucketIndex;
    varying vec2 vuv;
    varying float vy, isActive;
    uniform float scale;
    #define PI 3.14159265358979

    // Use an instanced quad to render each bucket, coloring the glass
    // and water level based on the position in the quad. Not fancy, but
    // super easy.

    void main () {
      float size = clamp(4.0 / n, 0.05, 0.12);
      vy = y * scale * 0.7;
      vuv = uv * 2.0 - 1.0;
      vec2 uv0 = (uv - 0.5) * size;
      uv0.x *= (1.0 + 2.0 * uv0.y);
      float bucketTheta = index * (PI * 2.0) / n;
      vec2 pos = 0.9 * vec2(sin(bucketTheta + theta), cos(bucketTheta + theta));
      isActive = activeBucketIndex == index ? 1.0 : 0.0;
      gl_Position = vec4(pos + uv0, 0, 1);
    }`,frag:`
    precision highp float;
    varying vec2 vuv;
    varying float vy, isActive;
    void main () {
      // This is all somewhat opaque, but here's where draw the water level
      // and glass as color of the single quad rather than separate elements.
      // RIP antialiasing.

      bool isbucket = abs(vuv.x) > 1.0 || abs(vuv.y) > 1.0;
      float level = 0.5 + 0.5 * vuv.y - vy;
      vec3 col = level < 0.0 ? vec3(0.3, 0.5, 0.9) : vec3(1);
      vec3 bucketCol = isActive > 0.0 ? vec3(0.9, 0.2, 0.2) : vec3(0);
      if (!isbucket && level > 0.0) discard;
      gl_FragColor = vec4(isbucket ? bucketCol : col, 1);
    }`,attributes:{uv:{buffer:[[1.06,-.06],[1.06,.94],[-.06,-.06],[-.06,.94]],divisor:0},y:{buffer:e.prop("y"),divisor:1},index:{buffer:new Array(t).fill(0).map((f,s)=>s),divisor:1}},uniforms:{n:t,theta:e.prop("theta"),scale:e.prop("drawScale"),activeBucketIndex:e.prop("activeBucket")},depth:{enable:!1},primitive:"triangle strip",instances:t,count:4}),i=e({vert:`
    precision highp float;
    attribute vec2 xy;
    uniform float scale;
    void main () {
      gl_Position = vec4(xy * scale, 0, 1);
      gl_PointSize = 2.0;
    }`,frag:`
    precision highp float;
    void main () {
      gl_FragColor = vec4(1.0 - 0.6 * vec3(0.3, 0.5, 0.9), 0.7);
    }`,attributes:{xy:e.prop("cmHistoryBuffer")},uniforms:{scale:e.prop("trajectoryScale")},blend:{enable:!0,func:{srcRGB:"src alpha",dstRGB:1,srcAlpha:1,dstAlpha:1},equation:{rgb:"reverse subtract",alpha:"add"}},depth:{enable:!1},primitive:"line strip",count:e.prop("n")}),u=e({vert:`
    precision highp float;
    attribute float dummy;
    uniform vec2 state;
    uniform float scale;
    uniform float pointSize;
    void main () {
      gl_Position = vec4(state * scale + dummy, 0, 1);
      gl_PointSize = pointSize;
    }`,frag:`
    precision highp float;
    uniform float pointSize;
    uniform vec3 color;
    void main () {
      vec2 uv = gl_PointCoord.xy * 2.0 - 1.0;
      float p = length(uv) * pointSize;
      float alpha = smoothstep(pointSize, pointSize - 1.5, p);
      vec3 color = mix(vec3(0), color, smoothstep(pointSize - 3.0, pointSize - 5.0, p));
      gl_FragColor = vec4(color, alpha);
    }`,attributes:{dummy:[0]},uniforms:{scale:e.prop("trajectoryScale"),state:e.prop("state"),pointSize:(f,s)=>s.pointSize*f.pixelRatio,color:e.prop("color")},blend:{enable:!0,func:{srcRGB:"src alpha",dstRGB:"one minus src alpha",srcAlpha:1,dstAlpha:1},equation:{rgb:"add",alpha:"add"}},depth:{enable:!1},primitive:"points",count:1});return{EPS:.06,drawBuckets:o,drawTrajectory:i,drawPoint:u}},inputs:["regl","n"],outputs:["EPS","drawBuckets","drawTrajectory","drawPoint"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-89"),expanded:[],variables:[]},{id:89,body:e=>{const t=Math.min(e,512);return{w:t,dimensions:[t,t]}},inputs:["width"],outputs:["w","dimensions"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-38"),expanded:[],variables:[]},{id:38,body:()=>{function e(t,a){return(t%a+a)%a}return{mod:e}},inputs:[],outputs:["mod"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});n({root:document.getElementById("cell-872"),expanded:[],variables:[]},{id:872,body:async(e,t)=>{const{odeRK4:a}=await E(()=>import("https://api.observablehq.com/@rreusser/integration.js?v=4"),[]).then(o=>{const i={},u=e.module(o.default),f=e.module();if(!u.defines("odeRK4"))throw new SyntaxError("export 'odeRK4' not found");return f.variable(i.odeRK4=t()).import("odeRK4",u),i});return{odeRK4:a}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["odeRK4"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
