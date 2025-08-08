import{_ as L}from"./index-DLwE0_Ng.js";import{d as s}from"./define-D1bHXsD4.js";s({root:document.getElementById("cell-713"),expanded:[],variables:[]},{id:713,body:(e,t)=>e`The easiest way to think of this is as a <a href="https://en.wikipedia.org/wiki/Pendulum_(mechanics)#Simple_gravity_pendulum">simple gravity pendulum</a> with a rigid, massless bar, and which starts at the unstable equilibrium directly above the pivot before being slightly disturbed and falling. Then our goal is to find the point at which it reaches the maximum horizontal velocity on its way down.

This problem may be solved with a straightforward energy argument, but let's brute force it from the equations of motion instead! This is essentially a Calculus I problem: compute the horizontal position as a function of time, then differentiate twice and compute the zeros to determine the time at which velocity is maximized. Then plug the computed time back in to determine the position.

Now I just want to be clear; what you'll find in this notebook is a _bad approach_. A basic energy argument turns this problem into a couple lines of algebra. Energy arguments often simplify problems dramatically. Use them. Love them. See, for example, Josh Silverman's solution, [Speedy Hammer](https://joshmaxsilverman.github.io/2022-11-13-hammer-flop/).

But let's disregard this advice and start off our brute force solution by considering our pendulum. The force diagram below illustrates the problem setup. Parameter ${t`k`} parameterizes the kinetic energy of the pendulum, from rest (${t`k = 0`}) to a pendulum with exactly enough energy to start at the bottom and come to rest at the top (${t`k = 1`}).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-671"),expanded:[],variables:[]},{id:671,body:function(e,t,n,u,a,r,c,b,w){const y=e`The physical setup for a simple gravity pendulum with kinetic energy parameter ${t`k = ${n}`}.`,k=1e3,f=1,m=9.98;function $(d){return 2*Math.asin(n*u(d*Math.sqrt(m/f),n*n))}const x=Math.min(a,640),o=80,l=m/9.81,v=300,h=r.create("svg").attr("width",x).attr("height",v+o).attr("style","border:1px solid #eee;cursor:move"),g=h.append("g").attr("transform",`translate(${x/2},${v/2})`);g.append("line").attr("y2",50).attr("stroke","#555").attr("stroke-dasharray","3,3");const q="#25e",K=g.append("path").attr("fill","#555");g.append("circle").attr("r",v/2*f*.9).style("stroke","#aaa").style("fill","none").style("stroke-dasharray","4,4");const V=g.append("path").attr("fill","#555"),C=g.append("text").text("θ").attr("dx",2).attr("dy",15).style("font-family","KaTeX_Math"),M=[$].map(d=>{const i={theta:d,line:g.append("line").attr("y2",v/2*f*.9).style("stroke",d===$?"#444":"#ccc").style("stroke-width",3).style("stroke-linecap","round"),mass:g.append("g").attr("transform",`translate(0,${v/2*f*.9})`)};return i.radArrowhead=i.mass.append("path").attr("fill",q),i.radialForce=i.mass.append("line").attr("x2",0).attr("y2",o*l).attr("stroke",q).attr("stroke-width",2),i.force=i.mass.append("line").attr("x2",0).attr("y2",o*l-5).attr("stroke","#e25").attr("stroke-width",2),i.gArrowhead=i.mass.append("path").attr("fill","#e25").attr("d",c(0,0,0,o*l)),i.tanArrowhead=i.mass.append("path").attr("fill",q),i.torqueForce=i.mass.append("line").attr("x2",0).attr("y2",o*l).attr("stroke",q).attr("stroke-width",2),i.circle=i.mass.append("circle").attr("r",10).style("stroke","white").style("stroke-width",1).style("fill",d===$?"#e25":"#ccc"),i.text=i.mass.append("text").text("-mg").style("font-family","KaTeX_Math").attr("dy",10).style("text-anchor","middle").attr("y",o*l),i.lText=g.append("text").text("l").style("font-family","KaTeX_Math").style("visibility","hidden"),i.sinText=i.mass.append("text").style("font-family","KaTeX_Math").attr("dx",3).attr("dy",-3),i.sinText.style("visibility","hidden"),i.sinText.append("tspan").text("-mg "),i.sinText.append("tspan").style("font-family","KaTeX_Main").text("sin"),i.sinText.append("tspan").text(" θ"),i});h.append("g");const J=$;function E(d,i=null){const F=d/k;M.forEach(T=>{const B=i===null?J(F):i,[I,p]=[Math.cos(B),Math.sin(B)],j=v/2*f*.9*p,Y=v/2*(f*.9*I);T.line.attr("x2",j).attr("y2",Y),T.mass.attr("transform",`translate(${j},${Y})`),T.lText.attr("x",j/2).attr("y",Y/2).attr("dx",10*-I).attr("dy",15*p).attr("text-anchor","middle").attr("alignment-baseline","middle");const S=Math.sign(-p*I);T.radialForce.attr("x1",S*p*p*l*5).attr("y1",S*I*p*l*5+o*l).attr("x2",-o*p*I*l).attr("y2",o*p*p*l),T.torqueForce.attr("x2",-75*I*p*l).attr("y2",(o-5)*p*p*l),T.tanArrowhead.attr("d",c(0,0,-o*I*p*l,o*p*p*l)),T.radArrowhead.attr("d",c(-o*I*p*l,o*p*p*l,0,o*l));const H=p;T.sinText.attr("x",-o*H*I*l).attr("y",o*H*p*l).attr("dx",S>0?3:-3).attr("text-anchor",S>0?"start":"end");const R=Math.cos(Math.max(B,0)),X=Math.sin(Math.max(B,0));V.attr("d",c(X*15.25-R,R*15.25+X,X*15.5,R*15.5,{length:8,width:7,inset:1.5}));const U=Math.max(B,0)*.5;C.attr("x",Math.sin(U)*15.5).attr("y",Math.cos(U)*15.5)}),K.attr("d",r.arc().innerRadius(15).outerRadius(16).startAngle(Math.PI).endAngle(Math.PI-(i===null?J(F):i))),i===null&&(_=requestAnimationFrame(E))}function z(d){const i=h.node().getBoundingClientRect(),F=d.clientX-i.left-x/2,T=d.clientY-i.top-v/2;E(null,Math.atan2(F,T))}function D(){h.node().addEventListener("mousemove",z),M[0].sinText.style("visibility","visible"),M[0].lText.style("visibility","visible"),cancelAnimationFrame(_),_=null}function O(){M[0].sinText.style("visibility","hidden"),M[0].lText.style("visibility","hidden"),h.node().removeEventListener("mousemove",z),_===null&&(_=requestAnimationFrame(E))}function W(d){D(),d.preventDefault(),d.stopPropagation(),z({clientX:d.touches[0].clientX,clientY:d.touches[0].clientY})}function P(d){d.preventDefault(),d.stopPropagation(),z({clientX:d.touches[0].clientX,clientY:d.touches[0].clientY})}function N(d){d.touches.length||O()}h.node().addEventListener("mouseover",D),h.node().addEventListener("mouseout",O),h.node().addEventListener("touchstart",W),h.node().addEventListener("touchmove",P),h.node().addEventListener("touchend",N);let A;setTimeout(()=>{A=new b(function([d]){d.isIntersecting?_||(_=requestAnimationFrame(E)):(cancelAnimationFrame(_),_=null)}),A.observe(h.node())},1),w.then(()=>{cancelAnimationFrame(_),A&&A.disconnect()});let _=requestAnimationFrame(E);return e`<figure>
    ${h.node()}
  <figcaption>${y}</figcaption>
  </figure>`},inputs:["html","tex","k","sn","width","d3","arrowhead","IntersectionObserver","invalidation"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-719"),expanded:[],variables:[]},{id:719,body:function(t,n){return t.range([1e-5,.999999],{label:n`k`,step:1e-6,value:.999999})},inputs:["Inputs","tex"],outputs:void 0,output:"viewof$k",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});s({root:document.getElementById("cell-264"),expanded:[],variables:[]},{id:264,body:(e,t)=>e`Upon working out forces in the above diagram, the governing equation of motion for a simple gravity pendulum is

${t.block`
\frac{d^2 \theta}{dt^2} + \frac{g}{l}\sin \theta = 0.
`}

Although we call it a "simple" gravity pendulum, we sort of have the sense that a pendulum is only really simple in the linear regime at the bottom where ${t`\mathrm{sin}(\theta) \approx \theta`} and the solution is just a sine wave. Once the swing gets large, the simplicity goes away. The pendulum may even get totally stuck at the top. At least in any class I ever took, we throw our hands up in frustration and look the other way.

However we can represent the solution exactly, just not with the functions we're probably most familiar with. The solution of the above equation can be expressed as

${t.block`\theta(t) = 2 \sin^{-1}\left(k\,\mathrm{sn}\left(t \sqrt{g\over l}  \mid  m\right)\right)`}
Here, ${t`\mathrm{sn(u \mid m)}`} is the [Jacobi elliptic function](https://en.wikipedia.org/wiki/Jacobi_elliptic_functions) with ${t`m = k^2`}. Unfortunately we have a bit too much work ahead of us to work through the derivation of this solution and subsequent discovery of elliptic functions, but that needn't stop us from using it. (It's actually quite an interesting story. If we throw our usual differential equation tools at it, we find that we quite accidentally solve for _time_ as a function of _position_ rather than position as a function of time, and it takes a bit of work to rectify the situation!)

The use of Jacobi elliptic functions requires an extra word or two. There are three Jacobi elliptic functions, ${t`\mathrm{sn}(u \mid m),`} ${t`\mathrm{cn}(u \mid m),`} and ${t`\mathrm{dn}(u \mid m).`} They take argument ${t`u`} and parameter ${t`m`}. They are similar in behavior to the trigonometric functions, and in fact for ${t`m = 0`} reduce to them:
${t.block`
\begin{aligned}
\mathrm{sn}(u \mid  0) &= \mathrm{sin}(u), \\
\mathrm{cn}(u \mid  0) &= \mathrm{cos}(u), \\
\mathrm{dn}(u \mid  0) &= 1.
\end{aligned}
`}
This shouldn't be too surprising since in the small-displacement linear regime, a pendulum oscillates as a plain old sine wave. On the other end of the spectrum for ${t`m = 1`},

${t.block`
\begin{aligned}
\mathrm{sn}(u \mid  1) &= \mathrm{tanh}(u), \\
\mathrm{cn}(u \mid  1) &= \mathrm{sech}(u), \\
\mathrm{dn}(u \mid  1) &= \mathrm{sech}(u).
\end{aligned}
`}

Recall that ${t`\mathrm{sech}(u) \equiv 1/\mathrm{cosh}(u).`} So in this sense they sort of interpolate between the [trigonometric](https://en.wikipedia.org/wiki/Trigonometric_functions) and [hyperbolic](https://en.wikipedia.org/wiki/Hyperbolic_functions) functions. Very cool. See [Jacobi Elliptic Functions in the Complex Plane](https://observablehq.com/@rreusser/jacobi-elliptic-functions-in-the-complex-plane) for an even lovelier view of how this generalization works.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-769"),expanded:[],variables:[]},{id:769,body:(e,t,n,u,a,r,c,b,w,y,k)=>{let f;e<1?f=t(e):e===1?f=10:f=t(1/e)/Math.sqrt(e);const m=501,$=[...Array(m).keys()].map(o=>(o/(m-1)*5-.5)*f),x=$.map(o=>{const l=o/f;let v,h,g;v=n(o,e),h=u(o,e),g=a(o,e);const q=r(o,e),K=h*h+(1-e)*v*v-g*g;return{am:q,uK:l,u:o,sn:v,cn:h,dn:g,am:q,checksum:K}});return c(b.html`<figure style="max-width:100%">${w.plot({width:Math.min(640,y),height:300,grid:!0,x:{label:"u / K →",ticks:4},y:{},marks:[w.ruleY([0]),w.line(x,{x:"uK",y:"sn",stroke:"#c39"}),w.line(x,{x:"uK",y:"cn",stroke:"#9c3"}),w.line(x,{x:"uK",y:"dn",stroke:"#39c"})].filter(o=>o)})}<figcaption>

<svg width="25" height="10" viewBox="0 0 25 10">
  <line x1="0" x2="25" y1="5" y2="5" style="stroke-width:2;stroke:#c39"/>
</svg> <span style="margin-right:1em">${k`sn(u| m)`}</span>

<svg width="25" height="10" viewBox="0 0 25 10">
  <line x1="0" x2="25" y1="5" y2="5" style="stroke-width:2;stroke:#9c3"/>
</svg> <span style="margin-right:1em">${k`cn(u| m)`}</span>

<svg width="25" height="10" viewBox="0 0 25 10">
  <line x1="0" x2="25" y1="5" y2="5" style="stroke-width:2;stroke:#39c"/>
</svg> <span>${k`dn(u| m)`}</span>

</figcaption>
</figure>
`),{K:f,n:m,u:$,sncndn:x}},inputs:["m","ellipk","sn","cn","dn","am","display","htl","Plot","width","tex"],outputs:["K","n","u","sncndn"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-772"),expanded:[],variables:[]},{id:772,body:(e,t)=>{const n=.9990000099900002,u=e(t.range([0,.99999999],{label:"m",value:.5,transform:a=>1-Math.log(1-a*n),invert:a=>(1-Math.exp(1-a))/n}));return{fac:n,m:u}},inputs:["view","Inputs"],outputs:["fac","m"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-590"),expanded:[],variables:[]},{id:590,body:(e,t)=>e`So we've succeeded in writing down the solution, but transcendental functions aren't inherently interesting. We can take any old problem for which we can't express a closed form solution and, as long as we can _somehow_ express its solution, assign it a name and deem it a function. I mean that's how sine and cosine work, right? Such functions only become interesting when they solve a variety of problems and open the door to new insights. To that end, the Jacobi elliptic functions are _very_ interesting.

The Jacobi elliptic functions solve a wide variety of problems, from number theory to astrodynamics. They have half-angle formulas, double-angle formulas, addition formulas, and many more relationships. It's a deep rabbit hole. In this notebook we'll stick to what we need, starting with the trigonometry-like identities,

${t.block`
\begin{aligned}
&\mathrm{cn}^2 + \mathrm{sn}^2 = 1 \\
&\mathrm{dn}^2 + m\,\mathrm{sn}^2 = 1.
\end{aligned}
`}

As is customary when unambiguous, I've omitted the parameters, writing ${t`\mathrm{sn}`} in place of ${t`\mathrm{sn}(u|m)`} and so forth.

They also have nice trigonometry-like derivatives,
${t.block`
\begin{aligned}
\frac{d}{du}\mathrm{sn} &= \mathrm{cn}\,\mathrm{dn} \\
\frac{d}{du}\mathrm{cn} &= -\mathrm{sn}\,\mathrm{dn} \\
\frac{d}{du}\mathrm{dn} &= -m\,\mathrm{sn}\,\mathrm{cn}. \\
\end{aligned}
`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-556"),expanded:[],variables:[]},{id:556,body:(e,t)=>e`Returning to the equation of motion of the pendulum, for simplicity we'll write the elliptic function term as

${t.block`\mathrm{sn}\left(t \sqrt{g\over l} \mid m\right) \equiv \mathrm{sn}(u),`}

rescaling time to write ${t`u = t\sqrt{g/l}`} and with the dependence on ${t`m`} implied. Then the trajectory of the pendulum is given by

${t.block`\theta(u) = 2 \sin^{-1}\left(k\,\mathrm{sn}(u)\right)`}

Let's plot it!`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:function(t){return t`g = ${9.81} m/s²`},inputs:["fmt"],outputs:void 0,output:"viewof$g",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});s({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:function(t){return t`l = ${100*(12*.0254)} m`},inputs:["fmt"],outputs:void 0,output:"viewof$l",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});s({root:document.getElementById("cell-48"),expanded:[],variables:[]},{id:48,body:function(t,n,u,a,r,c,b,w){const y=t*t,k=y===1?2:n(y),f=Math.sqrt(u/a);return[...r(0,4*k,401)].map(m=>({u:m,t:m*Math.sqrt(a/u),uK:m/k,theta:2*Math.asin(t*c(m,y)),dtheta:2*t*b(m,y),x:2*t*a*c(m,y)*w(m,y),xdot:2*t*a*b(m,y)*(2*w(m,y)**2-1)*f,xddot:-2*t*a*c(m,y)*w(m,y)*(6*w(m,y)**2+4*y-5)*f**2}))},inputs:["k","ellipk","g","l","linspace","sn","cn","dn"],outputs:void 0,output:"trajectory",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:function(e,t,n,u,a){return e.html`<figure>${t.plot({width:Math.min(n,640),height:200,grid:!0,x:{label:"t →"},y:{label:"θ(t) ↑",domain:[-Math.PI,Math.PI]},marks:[t.ruleY([0]),t.ruleY([-Math.PI,Math.PI],{strokeDasharray:"4,4"}),t.line(u,{x:"t",y:"theta",stroke:"#c39"})]})}<figcaption>Angle ${a`\theta`} of a pendulum which starts at ${a`\theta(t = 0) = 0`} with an initial velocity.</figcaption></figure>`},inputs:["htl","Plot","width","trajectory","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-32"),expanded:[],variables:[]},{id:32,body:function(e,t,n){return e.bind(e.range([0,.9999999],{label:t`k \;\;(= \sqrt{m})`,step:1e-7}),n)},inputs:["Inputs","tex","viewof$k"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-283"),expanded:[],variables:[]},{id:283,body:(e,t)=>e`Note that as ${t`k`} approaches ${t`1`}, the period diverges to infinity. This just reflects the fact that if the pendulum (asymptotically) makes it all the way to the top, ${t`\theta = \pm \pi`}, it takes forever to get there, equivalent to an infinitely long period.

So our goal is to compute the horizontal component of the velocity, then maximize it. Using trig identities and above elliptic function identities we can simplify 

${t.block`
\begin{aligned}
x &= l \sin(\theta) \\
&= l \sin(2 \sin^{-1}(k \,\mathrm{sn}(u))) \\
&= 2l (k\,\mathrm{sn}(u)) \sqrt{1 - k^2 \,\mathrm{sn}^2(u)} \\
&= 2kl \,\mathrm{sn}(u) \,\mathrm{dn}(u).
\end{aligned}
`}
A promising start! Differentiating to find the horizontal velocity, we find

${t.block`
\begin{aligned}
\frac{dx}{du} &= 2kl\left( (\mathrm{cn}(u) \,\mathrm{dn}(u))\,\mathrm{dn}(u) + \mathrm{sn}(u)(-m\,\mathrm{sn}(u)\,\mathrm{cn}(u)) \right) \\
&= 2kl \,\mathrm{cn}(u)(2\,\mathrm{dn}^2(u) - 1)
\end{aligned}
`}

To maximize this horizontal velocity, we differentiate once more, yielding

${t.block`
\begin{aligned}
\frac{d^2x}{du^2} &= -2kl \,\mathrm{sn}(u)\,\mathrm{dn}(u)(6\,\mathrm{dn}^2(u) + 4m - 5)
\end{aligned}
`}

It's still not intractable! The plot below shows the horizontal position along with its first and second derivatives. Recall that the extrema of a function correspond to zeros of its derivative, thus the horizontal velocity extrema correspond to zeros of the third plot.
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-80"),expanded:[],variables:[]},{id:80,body:function(e,t,n,u){return e.html`<figure>${t.plot({width:Math.min(n,640),height:150,grid:!0,marginBottom:5,x:{label:"",tickFormat:null,tickSize:0},y:{label:"x(t)"},marks:[t.ruleY([0]),t.line(u,{x:"t",y:"x",stroke:"#c39"})]})}
${t.plot({width:Math.min(n,640),height:150,grid:!0,marginBottom:5,x:{label:"",tickFormat:null,tickSize:0},y:{label:"dx(t)/dt"},marks:[t.ruleY([0]),t.line(u,{x:"t",y:"xdot",stroke:"#c39"})]})}
${t.plot({width:Math.min(n,640),height:150,grid:!0,x:{label:"t →"},y:{label:"d²x(t)/dt²"},marks:[t.ruleY([0]),t.line(u,{x:"t",y:"xddot",stroke:"#c39"})]})}
<figcaption>Horizontal position along with its first and second derivatives. </figcaption></figure>`},inputs:["htl","Plot","width","trajectory"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-183"),expanded:[],variables:[]},{id:183,body:function(e,t,n){return e.bind(e.range([1e-4,.999999],{label:t`k`,step:1e-6}),n)},inputs:["Inputs","tex","viewof$k"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-443"),expanded:[],variables:[]},{id:443,body:(e,t)=>e`<figcaption>The horizontal position (top) and horizontal velocity (bottom) of a pendulum with the specified amount of kinetic energy ${t`k`}.</figcaption>`,inputs:["html","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-186"),expanded:[],variables:[]},{id:186,body:(e,t)=>e`It's not lost on me that our pendulum so far starts at the bottom of its swing with nonzero velocity, when what the orcs want is for it to start at the top of its swing with zero velocity. Fortunately, we can consider ${t`k = 1`} when the pendulum starts at the bottom and has exactly enough energy to approach unstable equilibrium at the top of the swing and come to a rest. We simply consider the same motion in reverse. Mathematically speaking it then takes an infinite amount of time for the pendulum to move away from its initial unstable equilibrium at the top of its swing, though realistically it would of course only take the tiniest push to get things started. The time of maximum velocity is not requested, so we thus set ${t`k = 1`} and continue our goal of finding the maximum horizontal velocity.

We've fought this for a long time, but to make further progress, we must finally start to simplify. We substitute ${t`k = 1`}, therefore replacing Jacobi elliptic functions with hyperbolic functions using the above identities

${t.block`
\begin{aligned}
\mathrm{sn}(u \mid 1) &= \mathrm{tanh}(u), \\
\mathrm{cn}(u \mid 1) &= \mathrm{sech}(u), \\
\mathrm{dn}(u \mid 1) &= \mathrm{sech}(u).
\end{aligned}
`}

The second derivative is thus

${t.block`
\begin{aligned}
\frac{d^2x}{du^2} &= -2kl \,\mathrm{sech}(u) \,\mathrm{tanh}(u)(6\,\mathrm{sech}^2(u) - 1) \\
\end{aligned}
`}

The situation looks grim, so we pull on the most tenuous of threads by setting this equal to zero and factoring into

${t.block`
0 = -2kl \,\mathrm{sech}(u) \,\mathrm{tanh}(u)(\sqrt{6}\,\mathrm{sech}(u) + 1)(\sqrt{6}\,\mathrm{sech}(u) - 1)
`}

Seizing upon the last term (and recalling ${t`\operatorname{sech}(u)`} = ${t`1 / \operatorname{cosh}(u)`}), the most likely candidate for an interesting horizontal velocity extremum looks like

${t.block`
\sqrt{6} = \mathrm{cosh}(u_{\dot{x}_{max}}).
`}

Using the inverse hyperbolic cosine ${t`\mathrm{cosh}^{-1}(x) = \ln\left(x + \sqrt{x^2 - 1}\right)`}, we have

${t.block`
\begin{aligned}
u_{\dot{x}_{max}} &= \mathrm{cosh}^{-1}\sqrt{6} \\
&= \ln\left( \sqrt{6} + \sqrt{(\sqrt{6})^2 - 1} \right) \\
&= \ln\left( \sqrt{6} + \sqrt{5} \right)
\end{aligned}
`}

Let's plot in terms of scaled time ${t`u`} to see if this looks plausible.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-336"),expanded:[],variables:[]},{id:336,body:function(){return Math.log(Math.sqrt(6)+Math.sqrt(5))},inputs:[],outputs:void 0,output:"u_max",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-299"),expanded:[],variables:[]},{id:299,body:function(t,n,u,a){return[...t(0,4,201)].map(r=>({u:r,t:r*Math.sqrt(n/u),uK:r,xdot:2*a*n/Math.cosh(r)*(2/Math.cosh(r)**2-1)}))},inputs:["linspace","l","g","k"],outputs:void 0,output:"upswing",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-303"),expanded:[],variables:[]},{id:303,body:function(e,t,n,u,a,r,c,b){const w=2*e*t/Math.cosh(n)*(2/Math.cosh(n)**2-1);return u.html`<figure>${a.plot({width:Math.min(r,640),height:200,grid:!0,x:{label:"u →"},y:{label:"dx(u)/dt ↑"},marks:[a.ruleY([0]),a.line(c,{x:"uK",y:"xdot",stroke:"#c39"}),a.dot([{x:n,y:w}],{x:"x",y:"y",stroke:"#c39",fill:"#c39"})]})}<figcaption>Horizontal velocity for an upswinging pendulum with ${b`k = 1`}, with a dot representing the extremum at ${b`u = \ln\left(\sqrt{6} + \sqrt{5}\right)`}.</figcaption></figure>`},inputs:["k","l","u_max","htl","Plot","width","upswing","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-330"),expanded:[],variables:[]},{id:330,body:(e,t)=>e`Success! That looks like an extremum in the horizontal velocity! And so we arrive at the endgame. At last, we plug scaled time ${t`u`} into the equation for ${t`\theta(u)`} to compute the angle at which the horizontal velocity is maximized. For ${t`k = 1`}, the equation of motion is

${t.block`
\theta(u) = 2 \sin^{-1}(\mathrm{sech}\,{u})
`}

Then substituting ${t`u = u_{\dot{x}_{max}} = \ln\left(\sqrt{6} + \sqrt{5}\right),`}
${t.block`
\begin{aligned}
\theta\left(\ln\left(\sqrt{6} + \sqrt{5}\right)\right) &= 2 \sin^{-1}(\mathrm{sech}\,{u}) \\
&= 2\sin^{-1}\left(\frac{2}{\sqrt{5} + \sqrt{6} + \frac{1}{\sqrt{5} + \sqrt{6}}}\right) \\
&= 2\sin^{-1} \left(\frac{\sqrt{5} + \sqrt{6}}{\sqrt{5}{\sqrt{6} + 6}}\right)
\end{aligned}
`}

This is the angle at which we reach maximum horizontal velocity. To compute the horizontal component of position, we multiply by ${t`l`} and take the sine, applying along the way the double angle formula ${t`\sin 2\theta = 2\sin \theta \cos \theta`}.

${t.block`
\begin{aligned}
x_{\dot{x}_{max}} &= l\sin\left(\theta_{\dot{x}_{max}}\right) \\
&= l \sin\left( 2\sin^{-1} \left(\frac{\sqrt{5} + \sqrt{6}}{\sqrt{5}{\sqrt{6} + 6}}\right) \right) \\
&= 2l \left(\frac{\sqrt{5} + \sqrt{6}}{\sqrt{5}{\sqrt{6} + 6}}\right) \sqrt{1 - \left(\frac{\sqrt{5} + \sqrt{6}}{\sqrt{5}{\sqrt{6} + 6}}\right)^2} \\
&= 2l \left(\frac{\sqrt{5} + \sqrt{6}}{\sqrt{5}{\sqrt{6} + 6}}\right) \sqrt{\frac{5}{6}} \\
&= l\sqrt{1 - (2/3)^2} \\
&= \frac{\sqrt{5}}{3} l
\end{aligned}
`}

This is the horizontal distance from the pivot to the mass when the mass reaches its maximum horizontal velocity. This is also therefore the distance from the gates at which we—er, the _orcs_—should place the pivot of the pole. Substituting some numbers, we get`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-395"),expanded:[],variables:[]},{id:395,body:function(t,n){return t`d_initial = ${n*Math.sqrt(1-4/9)} m`},inputs:["fmt","l"],outputs:void 0,output:"viewof$d_initial",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});s({root:document.getElementById("cell-761"),expanded:[],variables:[]},{id:761,body:async()=>{const{default:e}=await L(()=>import("https://cdn.jsdelivr.net/npm/@stdlib/array-linspace/+esm"),[]).then(t=>{if(!("default"in t))throw new SyntaxError("export 'default' not found");return t});return{linspace:e}},inputs:[],outputs:["linspace"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:async()=>{const{default:e}=await L(()=>import("https://cdn.jsdelivr.net/npm/@stdlib/math-base-special-ellipk/+esm"),[]).then(t=>{if(!("default"in t))throw new SyntaxError("export 'default' not found");return t});return{ellipk:e}},inputs:[],outputs:["ellipk"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-773"),expanded:[],variables:[]},{id:773,body:async()=>{const{default:e}=await L(()=>import("https://cdn.jsdelivr.net/npm/@stdlib/math-base-special-ellipj/+esm"),[]).then(r=>{if(!("default"in r))throw new SyntaxError("export 'default' not found");return r}),{sn:t,cn:n,dn:u,am:a}=e;return{jacobi:e,sn:t,cn:n,dn:u,am:a}},inputs:[],outputs:["jacobi","sn","cn","dn","am"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:function(t){return t(".3f")},inputs:["createFmt"],outputs:void 0,output:"fmt",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:async(e,t)=>{const{fmt:n,sci:u}=await L(()=>import("https://api.observablehq.com/@rreusser/fmt.js?v=4"),[]).then(a=>{const r={},c=e.module(a.default),b=e.module();if(!c.defines("fmt"))throw new SyntaxError("export 'fmt' not found");if(b.variable(r.fmt=t()).import("fmt",c),!c.defines("sci"))throw new SyntaxError("export 'sci' not found");return b.variable(r.sci=t()).import("sci",c),r});return{createFmt:n,sci:u}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["createFmt","sci"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-676"),expanded:[],variables:[]},{id:676,body:function(){return function(n,u,a,r,{length:c=10,width:b=8,shift:w=0,inset:y=2}={}){const k=a-n,f=r-u,m=Math.sqrt(k*k+f*f),$=k/m,x=f/m,o=-x,l=$,v=a-c*$,h=r-c*x,g=w*$,q=w*x;return`M${a+g},${r+q}L${v+o*b/2+g},${h+l*b/2+q}L${v+y*$+g},${h+y*x+q}L${v-o*b/2+g},${h-l*b/2+q}Z`}},inputs:[],outputs:void 0,output:"arrowhead",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});
