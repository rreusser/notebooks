import{_ as K}from"./index-DLwE0_Ng.js";import{d as s}from"./define-D1bHXsD4.js";s({root:document.getElementById("cell-713"),expanded:[],variables:[]},{id:713,body:(e,t)=>e`The easiest way to think of this is as a <a href="https://en.wikipedia.org/wiki/Pendulum_(mechanics)#Simple_gravity_pendulum">simple gravity pendulum</a> with a rigid, massless bar, and which starts at the unstable equilibrium directly above the pivot before being slightly disturbed and falling. Then our goal is to find the point at which it reaches the maximum horizontal velocity on its way down.

This problem may be solved with a straightforward energy argument, but let's brute force it from the equations of motion instead! This is essentially a Calculus I problem: compute the horizontal position as a function of time, then differentiate twice and compute the zeros to determine the time at which velocity is maximized. Then plug the computed time back in to determine the position.

Now I just want to be clear; what you'll find in this notebook is a _bad approach_. A basic energy argument turns this problem into a couple lines of algebra. Energy arguments often simplify problems dramatically. Use them. Love them. See, for example, Josh Silverman's solution, [Speedy Hammer](https://joshmaxsilverman.github.io/2022-11-13-hammer-flop/).

But let's disregard this advice and start off our brute force solution by considering our pendulum. The force diagram below illustrates the problem setup. Parameter ${t`k`} parameterizes the kinetic energy of the pendulum, from rest (${t`k = 0`}) to a pendulum with exactly enough energy to start at the bottom and come to rest at the top (${t`k = 1`}).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-671"),expanded:[],variables:[]},{id:671,body:function(e,t,n,d,o,r,f,g,x){const h=e`The physical setup for a simple gravity pendulum with kinetic energy parameter ${t`k = ${n}`}.`,q=1e3,b=1,u=9.98;function k(m){return 2*Math.asin(n*d(m*Math.sqrt(u/b),n*n))}const $=Math.min(o,640),l=80,i=u/9.81,w=300,c=r.create("svg").attr("width",$).attr("height",w+l).attr("style","border:1px solid #eee;cursor:move"),y=c.append("g").attr("transform",`translate(${$/2},${w/2})`);y.append("line").attr("y2",50).attr("stroke","#555").attr("stroke-dasharray","3,3");const v="#25e",z=y.append("path").attr("fill","#555");y.append("circle").attr("r",w/2*b*.9).style("stroke","#aaa").style("fill","none").style("stroke-dasharray","4,4");const j=y.append("path").attr("fill","#555"),C=y.append("text").text("θ").attr("dx",2).attr("dy",15).style("font-family","KaTeX_Math"),E=[k].map(m=>{const a={theta:m,line:y.append("line").attr("y2",w/2*b*.9).style("stroke",m===k?"#444":"#ccc").style("stroke-width",3).style("stroke-linecap","round"),mass:y.append("g").attr("transform",`translate(0,${w/2*b*.9})`)};return a.radArrowhead=a.mass.append("path").attr("fill",v),a.radialForce=a.mass.append("line").attr("x2",0).attr("y2",l*i).attr("stroke",v).attr("stroke-width",2),a.force=a.mass.append("line").attr("x2",0).attr("y2",l*i-5).attr("stroke","#e25").attr("stroke-width",2),a.gArrowhead=a.mass.append("path").attr("fill","#e25").attr("d",f(0,0,0,l*i)),a.tanArrowhead=a.mass.append("path").attr("fill",v),a.torqueForce=a.mass.append("line").attr("x2",0).attr("y2",l*i).attr("stroke",v).attr("stroke-width",2),a.circle=a.mass.append("circle").attr("r",10).style("stroke","white").style("stroke-width",1).style("fill",m===k?"#e25":"#ccc"),a.text=a.mass.append("text").text("-mg").style("font-family","KaTeX_Math").attr("dy",10).style("text-anchor","middle").attr("y",l*i),a.lText=y.append("text").text("l").style("font-family","KaTeX_Math").style("visibility","hidden"),a.sinText=a.mass.append("text").style("font-family","KaTeX_Math").attr("dx",3).attr("dy",-3),a.sinText.style("visibility","hidden"),a.sinText.append("tspan").text("-mg "),a.sinText.append("tspan").style("font-family","KaTeX_Main").text("sin"),a.sinText.append("tspan").text(" θ"),a});c.append("g");const D=k;function M(m,a=null){const S=m/q;E.forEach(T=>{const B=a===null?D(S):a,[I,p]=[Math.cos(B),Math.sin(B)],Y=w/2*b*.9*p,R=w/2*(b*.9*I);T.line.attr("x2",Y).attr("y2",R),T.mass.attr("transform",`translate(${Y},${R})`),T.lText.attr("x",Y/2).attr("y",R/2).attr("dx",10*-I).attr("dy",15*p).attr("text-anchor","middle").attr("alignment-baseline","middle");const L=Math.sign(-p*I);T.radialForce.attr("x1",L*p*p*i*5).attr("y1",L*I*p*i*5+l*i).attr("x2",-l*p*I*i).attr("y2",l*p*p*i),T.torqueForce.attr("x2",-75*I*p*i).attr("y2",(l-5)*p*p*i),T.tanArrowhead.attr("d",f(0,0,-l*I*p*i,l*p*p*i)),T.radArrowhead.attr("d",f(-l*I*p*i,l*p*p*i,0,l*i));const U=p;T.sinText.attr("x",-l*U*I*i).attr("y",l*U*p*i).attr("dx",L>0?3:-3).attr("text-anchor",L>0?"start":"end");const X=Math.cos(Math.max(B,0)),J=Math.sin(Math.max(B,0));j.attr("d",f(J*15.25-X,X*15.25+J,J*15.5,X*15.5,{length:8,width:7,inset:1.5}));const V=Math.max(B,0)*.5;C.attr("x",Math.sin(V)*15.5).attr("y",Math.cos(V)*15.5)}),z.attr("d",r.arc().innerRadius(15).outerRadius(16).startAngle(Math.PI).endAngle(Math.PI-(a===null?D(S):a))),a===null&&(_=requestAnimationFrame(M))}function A(m){const a=c.node().getBoundingClientRect(),S=m.clientX-a.left-$/2,T=m.clientY-a.top-w/2;M(null,Math.atan2(S,T))}function O(){c.node().addEventListener("mousemove",A),E[0].sinText.style("visibility","visible"),E[0].lText.style("visibility","visible"),cancelAnimationFrame(_),_=null}function H(){E[0].sinText.style("visibility","hidden"),E[0].lText.style("visibility","hidden"),c.node().removeEventListener("mousemove",A),_===null&&(_=requestAnimationFrame(M))}function W(m){O(),m.preventDefault(),m.stopPropagation(),A({clientX:m.touches[0].clientX,clientY:m.touches[0].clientY})}function P(m){m.preventDefault(),m.stopPropagation(),A({clientX:m.touches[0].clientX,clientY:m.touches[0].clientY})}function N(m){m.touches.length||H()}c.node().addEventListener("mouseover",O),c.node().addEventListener("mouseout",H),c.node().addEventListener("touchstart",W),c.node().addEventListener("touchmove",P),c.node().addEventListener("touchend",N);let F;setTimeout(()=>{F=new g(function([m]){m.isIntersecting?_||(_=requestAnimationFrame(M)):(cancelAnimationFrame(_),_=null)}),F.observe(c.node())},1),x.then(()=>{cancelAnimationFrame(_),F&&F.disconnect()});let _=requestAnimationFrame(M);return e`<figure>
    ${c.node()}
  <figcaption>${h}</figcaption>
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

Recall that ${t`\mathrm{sech}(u) \equiv 1/\mathrm{cosh}(u).`} So in this sense they sort of interpolate between the [trigonometric](https://en.wikipedia.org/wiki/Trigonometric_functions) and [hyperbolic](https://en.wikipedia.org/wiki/Hyperbolic_functions) functions. Very cool. See [Jacobi Elliptic Functions in the Complex Plane](https://observablehq.com/@rreusser/jacobi-elliptic-functions-in-the-complex-plane) for an even lovelier view of how this generalization works.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-769"),expanded:[],variables:[]},{id:769,body:(e,t,n,d,o,r,f,g,x,h,q,b)=>{let u;e<1?u=t(e):e===1?u=10:u=t(1/e)/n(e);const k=501,$=[...Array(k).keys()].map(i=>(i/(k-1)*5-.5)*u),l=$.map(i=>{const w=i/u;let c,y,v;c=d(i,e),y=o(i,e),v=r(i,e);const z=f(i,e),j=y*y+(1-e)*c*c-v*v;return{am:z,uK:w,u:i,sn:c,cn:y,dn:v,am:z,checksum:j}});return g(x.html`<figure style="max-width:100%">${h.plot({width:Math.min(640,q),height:300,grid:!0,x:{label:"u / K →",ticks:4},y:{},marks:[h.ruleY([0]),h.line(l,{x:"uK",y:"sn",stroke:"#c39"}),h.line(l,{x:"uK",y:"cn",stroke:"#9c3"}),h.line(l,{x:"uK",y:"dn",stroke:"#39c"})].filter(i=>i)})}<figcaption>

<svg width="25" height="10" viewBox="0 0 25 10">
  <line x1="0" x2="25" y1="5" y2="5" style="stroke-width:2;stroke:#c39"/>
</svg> <span style="margin-right:1em">${b`sn(u| m)`}</span>

<svg width="25" height="10" viewBox="0 0 25 10">
  <line x1="0" x2="25" y1="5" y2="5" style="stroke-width:2;stroke:#9c3"/>
</svg> <span style="margin-right:1em">${b`cn(u| m)`}</span>

<svg width="25" height="10" viewBox="0 0 25 10">
  <line x1="0" x2="25" y1="5" y2="5" style="stroke-width:2;stroke:#39c"/>
</svg> <span>${b`dn(u| m)`}</span>

</figcaption>
</figure>
`),{K:u,n:k,u:$,sncndn:l}},inputs:["m","ellipk","sqrt","sn","cn","dn","am","display","htl","Plot","width","tex"],outputs:["K","n","u","sncndn"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-772"),expanded:[],variables:[]},{id:772,body:(e,t)=>{const n=.9990000099900002,d=e(t.range([0,.99999999],{label:"m",value:.5,transform:o=>1-Math.log(1-o*n),invert:o=>(1-Math.exp(1-o))/n}));return{fac:n,m:d}},inputs:["view","Inputs"],outputs:["fac","m"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-590"),expanded:[],variables:[]},{id:590,body:(e,t)=>e`So we've succeeded in writing down the solution, but transcendental functions aren't inherently interesting. We can take any old problem for which we can't express a closed form solution and, as long as we can _somehow_ express its solution, assign it a name and deem it a function. I mean that's how sine and cosine work, right? Such functions only become interesting when they solve a variety of problems and open the door to new insights. To that end, the Jacobi elliptic functions are _very_ interesting.

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

Let's plot it!`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:function(t){return t`g = ${9.81} m/s²`},inputs:["fmt"],outputs:void 0,output:"viewof$g",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});s({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:function(t){return t`l = ${100*(12*.0254)} m`},inputs:["fmt"],outputs:void 0,output:"viewof$l",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});s({root:document.getElementById("cell-48"),expanded:[],variables:[]},{id:48,body:function(t,n,d,o,r,f,g,x){const h=t*t,q=h===1?2:n(h),b=Math.sqrt(d/o);return[...r(0,4*q,401)].map(u=>({u,t:u*Math.sqrt(o/d),uK:u/q,theta:2*Math.asin(t*f(u,h)),dtheta:2*t*g(u,h),x:2*t*o*f(u,h)*x(u,h),xdot:2*t*o*g(u,h)*(2*x(u,h)**2-1)*b,xddot:-2*t*o*f(u,h)*x(u,h)*(6*x(u,h)**2+4*h-5)*b**2}))},inputs:["k","ellipk","g","l","linspace","sn","cn","dn"],outputs:void 0,output:"trajectory",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:function(e,t,n,d,o){return e.html`<figure>${t.plot({width:Math.min(n,640),height:200,grid:!0,x:{label:"t →"},y:{label:"θ(t) ↑",domain:[-Math.PI,Math.PI]},marks:[t.ruleY([0]),t.ruleY([-Math.PI,Math.PI],{strokeDasharray:"4,4"}),t.line(d,{x:"t",y:"theta",stroke:"#c39"})]})}<figcaption>Angle ${o`\theta`} of a pendulum which starts at ${o`\theta(t = 0) = 0`} with an initial velocity.</figcaption></figure>`},inputs:["htl","Plot","width","trajectory","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-32"),expanded:[],variables:[]},{id:32,body:function(e,t,n){return e.bind(e.range([0,.9999999],{label:t`k \;\;(= \sqrt{m})`,step:1e-7}),n)},inputs:["Inputs","tex","viewof$k"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-283"),expanded:[],variables:[]},{id:283,body:(e,t)=>e`Note that as ${t`k`} approaches ${t`1`}, the period diverges to infinity. This just reflects the fact that if the pendulum (asymptotically) makes it all the way to the top, ${t`\theta = \pm \pi`}, it takes forever to get there, equivalent to an infinitely long period.

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
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-80"),expanded:[],variables:[]},{id:80,body:function(e,t,n,d){return e.html`<figure>${t.plot({width:Math.min(n,640),height:150,grid:!0,marginBottom:5,x:{label:"",tickFormat:null,tickSize:0},y:{label:"x(t)"},marks:[t.ruleY([0]),t.line(d,{x:"t",y:"x",stroke:"#c39"})]})}
${t.plot({width:Math.min(n,640),height:150,grid:!0,marginBottom:5,x:{label:"",tickFormat:null,tickSize:0},y:{label:"dx(t)/dt"},marks:[t.ruleY([0]),t.line(d,{x:"t",y:"xdot",stroke:"#c39"})]})}
${t.plot({width:Math.min(n,640),height:150,grid:!0,x:{label:"t →"},y:{label:"d²x(t)/dt²"},marks:[t.ruleY([0]),t.line(d,{x:"t",y:"xddot",stroke:"#c39"})]})}
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

Let's plot in terms of scaled time ${t`u`} to see if this looks plausible.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-336"),expanded:[],variables:[]},{id:336,body:function(){return Math.log(Math.sqrt(6)+Math.sqrt(5))},inputs:[],outputs:void 0,output:"u_max",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-299"),expanded:[],variables:[]},{id:299,body:function(t,n,d,o){return[...t(0,4,201)].map(r=>({u:r,t:r*Math.sqrt(n/d),uK:r,xdot:2*o*n/Math.cosh(r)*(2/Math.cosh(r)**2-1)}))},inputs:["linspace","l","g","k"],outputs:void 0,output:"upswing",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-303"),expanded:[],variables:[]},{id:303,body:function(e,t,n,d,o,r,f,g){const x=2*e*t/Math.cosh(n)*(2/Math.cosh(n)**2-1);return d.html`<figure>${o.plot({width:Math.min(r,640),height:200,grid:!0,x:{label:"u →"},y:{label:"dx(u)/dt ↑"},marks:[o.ruleY([0]),o.line(f,{x:"uK",y:"xdot",stroke:"#c39"}),o.dot([{x:n,y:x}],{x:"x",y:"y",stroke:"#c39",fill:"#c39"})]})}<figcaption>Horizontal velocity for an upswinging pendulum with ${g`k = 1`}, with a dot representing the extremum at ${g`u = \ln\left(\sqrt{6} + \sqrt{5}\right)`}.</figcaption></figure>`},inputs:["k","l","u_max","htl","Plot","width","upswing","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-330"),expanded:[],variables:[]},{id:330,body:(e,t)=>e`Success! That looks like an extremum in the horizontal velocity! And so we arrive at the endgame. At last, we plug scaled time ${t`u`} into the equation for ${t`\theta(u)`} to compute the angle at which the horizontal velocity is maximized. For ${t`k = 1`}, the equation of motion is

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

This is the horizontal distance from the pivot to the mass when the mass reaches its maximum horizontal velocity. This is also therefore the distance from the gates at which we—er, the _orcs_—should place the pivot of the pole. Substituting some numbers, we get`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-395"),expanded:[],variables:[]},{id:395,body:function(t,n){return t`d_initial = ${n*Math.sqrt(1-4/9)} m`},inputs:["fmt","l"],outputs:void 0,output:"viewof$d_initial",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});s({root:document.getElementById("cell-761"),expanded:[],variables:[]},{id:761,body:async()=>{const{default:e}=await K(()=>import("https://cdn.jsdelivr.net/npm/@stdlib/array-linspace/+esm"),[]).then(t=>{if(!("default"in t))throw new SyntaxError("export 'default' not found");return t});return{linspace:e}},inputs:[],outputs:["linspace"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:async()=>{const{default:e}=await K(()=>import("https://cdn.jsdelivr.net/npm/@stdlib/math-base-special-ellipk/+esm"),[]).then(t=>{if(!("default"in t))throw new SyntaxError("export 'default' not found");return t});return{ellipk:e}},inputs:[],outputs:["ellipk"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-773"),expanded:[],variables:[]},{id:773,body:async()=>{const{default:e}=await K(()=>import("https://cdn.jsdelivr.net/npm/@stdlib/math-base-special-ellipj/+esm"),[]).then(r=>{if(!("default"in r))throw new SyntaxError("export 'default' not found");return r}),{sn:t,cn:n,dn:d,am:o}=e;return{jacobi:e,sn:t,cn:n,dn:d,am:o}},inputs:[],outputs:["jacobi","sn","cn","dn","am"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:function(t){return t(".3f")},inputs:["createFmt"],outputs:void 0,output:"fmt",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});s({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:async(e,t)=>{const{fmt:n,sci:d}=await K(()=>import("https://api.observablehq.com/@rreusser/fmt.js?v=4"),[]).then(o=>{const r={},f=e.module(o.default),g=e.module();if(!f.defines("fmt"))throw new SyntaxError("export 'fmt' not found");if(g.variable(r.fmt=t()).import("fmt",f),!f.defines("sci"))throw new SyntaxError("export 'sci' not found");return g.variable(r.sci=t()).import("sci",f),r});return{createFmt:n,sci:d}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["createFmt","sci"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-676"),expanded:[],variables:[]},{id:676,body:function(){return function(n,d,o,r,{length:f=10,width:g=8,shift:x=0,inset:h=2}={}){const q=o-n,b=r-d,u=Math.sqrt(q*q+b*b),k=q/u,$=b/u,l=-$,i=k,w=o-f*k,c=r-f*$,y=x*k,v=x*$;return`M${o+y},${r+v}L${w+l*g/2+y},${c+i*g/2+v}L${w+h*k+y},${c+h*$+v}L${w-l*g/2+y},${c-i*g/2+v}Z`}},inputs:[],outputs:void 0,output:"arrowhead",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});
