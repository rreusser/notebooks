import{_ as m,d as r}from"./index-Bvdv0JJ6.js";(window.location.hostname==="localhost"||window.location.hostname.match(/127\.0\.0\.1/))&&m(async()=>{const{main:a}=await import("./index-Bvdv0JJ6.js").then(e=>e.i);return{main:a}},[]).then(({main:a})=>{window.__observableRuntime=a,console.log("[DebugClient] Runtime module exposed as window.__observableRuntime"),m(()=>import("./debug-client-BJyqFSh-.js"),[])});r({root:document.getElementById("cell-1"),expanded:[],variables:[]},{id:1,body:function(a,e){return a`# Kuramoto-Sivashinsky Equation in 2D 

This notebook implements on the GPU a two-dimensional solution of the [Kuramoto-Sivashinsky equation](https://encyclopediaofmath.org/wiki/Kuramoto-Sivashinsky_equation) (KSE), 

${e.block`u_t + \frac{1}{2}|\nabla u|^2 + \nabla^2 u + \nabla^4 u = 0.`}

The KSE arises in a number of contexts and was rediscovered by Kuramoto while researching diffusion-induced flame front instabilities. ${""}

The KSE is one of the simplest partial differential equations to show complicated dynamics, displaying chaotic behavior as the size of the domain increases. Observe below that if ${e`\nu_1`} or ${e`\nu_2`}, which represent the size of a wavelength relative to the size of the domain, are greater than one, the chaotic behavior disppears along the short dimension and the solution essentially becomes a one-dimensional solution.

The solution uses an implicit-explicit [Backward Differentiation Formula](https://en.wikipedia.org/wiki/Backward_differentiation_formula) in the spatial frequency domain, as presented extremely helpfully in Appendix F of A. Kalogirou's thesis, [Nonlinear dynamics of surfactant-laden multilayer shear flows and related systems](https://spiral.imperial.ac.uk/bitstream/10044/1/25067/1/Kalogirou-A-2013-PhD-Thesis.pdf). I had trouble managing the stability for slightly suspicious reasons I'm attributing to unecessary use of a single-precision complex FFT for the real-valued solution, but it seems to compute the solution correctly. I've explained the caveats in more detail below.

This noteboook is implemented as an interesting test problem with which to explore the tools and the medium, so although it displays the expected behavior, I have not rigorously verified the accuracy! I enjoy exploring these things and using them to learn and inspire, but if I were trying to draw conclusions from this, I would first carefully implement a reference solution using more standard, robust, scientifically valid tools like Python and Numpy.
`},inputs:["md","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1878"),expanded:[],variables:[]},{id:1878,body:function(a,e){return a==="half float"?e`<p style="color:#a00">Warning! This simulation is using half-float precision and as a result won't be accurate, if it works at all. Try a device which supports the floating point WebGL textures for better results.</p>`:e``},inputs:["colorType","html"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:function(e,t,n,o){const i=[e,e/t],u=n`We solve the problem in the doubly periodic domain, ${o`[0, \,${i[0].toFixed(3)}] \times [0, \,${i[1].toFixed(3)}].`}`;return u.value=i,u},inputs:["Lx","aspectRatio","html","tex"],outputs:void 0,output:"viewof$L",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});r({root:document.getElementById("cell-1671"),expanded:[],variables:[]},{id:1671,body:function(e,t,n){const o=[Math.pow(Math.PI/e[0],2),Math.pow(Math.PI/e[1],2)],i=t`The factors ${n`\nu_1`} and ${n`\nu_2`} describe the length scale of the simulation relative to the size of the domain. Chaotic behavior happens when they are very small, while fundamental changes in the type of behavior happen when they are closer to unity.

${n`\begin{aligned}
  \nu_1 &= (\frac{\pi}{L_x})^2 = ${o[0].toFixed(6)}, \\
  \nu_2 &= (\frac{\pi}{L_y})^2 = ${o[1].toFixed(6)}
  \end{aligned}`}`;return i.value=o,i},inputs:["L","md","tex"],outputs:void 0,output:"viewof$nu",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});r({root:document.getElementById("cell-1562"),expanded:[],variables:[]},{id:1562,body:function(e,t,n,o){return e({min:1,max:t[0]/2,step:.01,value:64,description:n`Horizontal domain size, ${o`L_x`}`})},inputs:["slider","N","html","tex"],outputs:void 0,output:"viewof$Lx",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});r({root:document.getElementById("cell-1614"),expanded:[],variables:[]},{id:1614,body:function(e,t,n){return e({min:.1,max:10,step:.01,value:1,description:t`Aspect ratio, ${n`\frac{L_x}{L_y}`}`})},inputs:["slider","html","tex"],outputs:void 0,output:"viewof$aspectRatio",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});r({root:document.getElementById("cell-2251"),expanded:[],variables:[]},{id:2251,body:async()=>{const{reglCanvas:a}=await m(()=>import("./regl-canvas-DbKbmlCP.js"),[]).then(e=>{if(!("reglCanvas"in e))throw new SyntaxError("export 'reglCanvas' not found");return e});return{reglCanvas:a}},inputs:[],outputs:["reglCanvas"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-85"),expanded:[],variables:[]},{id:85,body:a=>({regl:a({width:1,height:1})}),inputs:["reglCanvas"],outputs:["regl"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-118"),expanded:[],variables:[]},{id:118,body:function(e){return e({value:"Restart"})},inputs:["button"],outputs:void 0,output:"viewof$restart",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});r({root:document.getElementById("cell-120"),expanded:[],variables:[]},{id:120,body:(a,e,t,n)=>{const o=a(e.checkbox(["Simulate"],{value:["Simulate"]})),i=a(e.range([.001,.2],{step:.001,value:.18,precision:3,label:t`Time step, ${n`\frac{\Delta t}{\nu_1}`}`})),u=a(e.range([1,8],{step:1,value:1,label:"Initial condition periods, n"}));return{simulate:o,dt:i,n:u,N:[256,256]}},inputs:["view","Inputs","html","tex"],outputs:["simulate","dt","n","N"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-136"),expanded:[],variables:[]},{id:136,body:function(e){return e({min:-16,max:16,value:[-14,14],description:"Colorscale threshold"})},inputs:["rangeSlider"],outputs:void 0,output:"viewof$range",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});r({root:document.getElementById("cell-1041"),expanded:[],variables:[]},{id:1041,body:function(e,t){return e({options:Object.keys(t),value:"Magma",description:"Color scale"})},inputs:["select","colorscales"],outputs:void 0,output:"viewof$colorscaleName",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});r({root:document.getElementById("cell-1510"),expanded:[],variables:[]},{id:1510,body:function(e){return e({value:"invert colorscale",options:["invert colorscale"]})},inputs:["checkbox"],outputs:void 0,output:"viewof$invert",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});r({root:document.getElementById("cell-2227"),expanded:[],variables:[]},{id:2227,body:async function(a,e,t,n,o,i,u){return a`
${e?t`Pause simulation to enable rendering to video`:await n(Array.from(Array(1500).keys()),function(s){return o.poll(),i({render:!0}),i({render:!0}),o.read()},{disabled:!!e,displayOutput:!1,beforeStart:u,quantizationParameter:10,groupOfPictures:10,kbps:8e3,frameRate:60,width:o._gl.canvas.width,height:o._gl.canvas.height})}`},inputs:["html","simulate","md","encodeMP4","regl","performIteration","performInitialization"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1601"),expanded:[],variables:[]},{id:1601,body:function(a){return a`## Solution method`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1747"),expanded:[],variables:[]},{id:1747,body:function(a,e){return a`After having previously brute-forced the solution using second order Runge-Kutta (with extremely small time steps!), this notebook follows the solution method outlined in [Kalogirou's thesis](https://spiral.imperial.ac.uk/bitstream/10044/1/25067/1/Kalogirou-A-2013-PhD-Thesis.pdf), particular equations (F.8) - (F.10).

The equation is solved in the spatial frequency domain, with the exception of the nonlinear term ${e`\frac{1}{2}|\nabla u|^2`} which requires computing the gradient while transforming back to the spatial domain, then squaring, then transforming back to the frequency domain.

The update equations are reproduced below, but first I'll make just a couple notes:

- Equation (F.10) seems to be missing a factor of ${e`dt`} in the biharmonic term.
- Since all terms include derivatives, the offset of ${e`u`} has no effect and can simply removed by zeroing out the mean (zero-wavenumber) component on every update.
- The biggest challenge is that since I perform the *complex* fft of real-valued functions, they seem to quickly leak energy into the imaginary component of the solution. As [LucasVB has pointed out](https://twitter.com/LucasVB/status/1331556308911316993), this may be best solved with a real-valued [Hartley Transform](https://en.wikipedia.org/wiki/Hartley_transform) instead of an unnecessarily complex-valued FFT. Instead, I've opted to add an entire second FFT pass in which I extract the real component of the solution. I've looked everything over very carefully, but the need for this step throws the correctness of the entire solution into question.
- Since the real vs. complex issue is a bigger source of uncertainty about the correctness, I initialized the multi-step method with the same values for the two previous steps, rather than implementing a special Backward Euler initialization step.


The domain has size ${e`[0, 2 L_x] \times [0, 2 L_y]`}, but the equation is solved in the domain ${e`[0, 2\pi] \times [0, 2\pi]`} via the rescaling in Chapter 9 of Kilgarou's thesis,${e.block`
x \rarr \frac{L_x}{\pi} x, \;\;\;
y \rarr \frac{L_y}{\pi} y, \;\;\;
t \rarr \left(\frac{L_x}{\pi}\right)^2 t.
`}
along with the factors shown above, ${e.block`\nu_1 = \left(\frac{\pi}{L_x}\right)^2, \;\;\; \nu_2 = \left(\frac{\pi}{L_y}\right)^2.`}

From Appendix F on page 227, the full second order spatial frequency domain update equation for solution ${e`\hat{V}`} at step ${e`n+2`} as a function of the data from previous steps ${e`n+1`} and ${e`n`} is

${e.block`
\begin{aligned}
\hat{V}^{n + 2}_{k_1, k_2} =& \frac{1}{\xi_{k_1, k_2}} \left[ (2 + 2c\,dt) \hat{V}^{n+1}_{k_1,k_2} - \left(\frac{1}{2} + c\,dt\right) \hat{V}^n_{k_1,k_2} \right. \\
& + 2dt \left( \hat{A}^{n+1}_{k_1,k_2} + \frac{\nu_2}{\nu_1} \hat{B}^{n+1}_{k_1,k_2} \right) \\
& - \left. dt \left( \hat{A}^{n}_{k_1,k_2} + \frac{\nu_2}{\nu_1} \hat{B}^{n}_{k_1,k_2} \right) \right]
\end{aligned}
`}
where
${e.block`
\begin{aligned}
\hat{A}_{k_1,k_2} &= -\mathscr{F}\left(\frac{1}{2}\left(\frac{\partial v}{\partial x}\right)^2\right), \\
\hat{B}_{k_1,k_2} &= -\mathscr{F}\left(\frac{1}{2}\left(\frac{\partial v}{\partial y}\right)^2\right)
\end{aligned}
`}
where ${e`\mathscr{F}(\cdot)`} represents the spatial Fourier Transform and ${e`v`} is the spatial domain solution. Finally,
${e.block`
\begin{aligned}
\xi_{k_1,k_2} =& \frac{3}{2} + c\,dt - dt\left(k_1^2 + \frac{\nu_1}{\nu_2} k_2^2 \right) \\
& + \nu_1\,dt\left(k_1^2 + \frac{\nu_2}{\nu_1} k_2^2\right)^2,
\end{aligned}
`}
using the definition ${e.block`c = 1 + \frac{1}{\nu_1}.`}

At first this update equation seemed imposing, but then I realized that if ${e`k_1`} and ${e`k_2`} refer to a particular wavenumber then the above is a simple algebraic expression for each fragment, independent of all others, of the texture representing the FFT. The only exceptions are the expressions for ${e`\hat{A}_{k_1,k_2}`} and ${e`\hat{B}_{k_1,k_2}`}, which represent the solution, differentiated in the frequency domain via multiplication by ${e`ik_x`} and ${e`ik_y`}, inverse-FFT'd into the spatial domain, squared, and then FFT'd back into the spatial frequency domain. From there, the rest is tedious but straightforward shuffling of framebuffers.
`},inputs:["md","tex"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-167"),expanded:[],variables:[]},{id:167,body:function(a){return a`## Framebuffer setup`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-159"),expanded:[],variables:[]},{id:159,body:function(e,t,n,o,i){const u=[0,1].map(()=>e.framebuffer({color:e.texture({width:t[0],height:t[1],type:n,min:o,mag:o})}));return i.then(()=>u.forEach(s=>s.destroy())),u},inputs:["regl","N","colorType","interpType","invalidation"],outputs:void 0,output:"V",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-60"),expanded:[],variables:[]},{id:60,body:function(e,t,n,o){const i=[0,1,2].map(()=>e.framebuffer({color:e.texture({width:t[0],height:t[1],type:n,min:"nearest",mag:"nearest"})}));return o.then(()=>i.forEach(u=>u.destroy())),i},inputs:["regl","N","colorType","invalidation"],outputs:void 0,output:"Vhat",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-155"),expanded:[],variables:[]},{id:155,body:function(e,t,n,o){const i=[0,1].map(()=>e.framebuffer({color:e.texture({width:t[0],height:t[1],type:n,min:"nearest",mag:"nearest"})}));return o.then(()=>i.forEach(u=>u.destroy())),i},inputs:["regl","N","colorType","invalidation"],outputs:void 0,output:"ABhat",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-170"),expanded:[],variables:[]},{id:170,body:function(e,t,n,o){const i=[0,1,2,3].map(()=>e.framebuffer({color:e.texture({width:t[0],height:t[1],type:n,min:"nearest",mag:"nearest"})}));return o.then(()=>i.forEach(u=>u.destroy())),i},inputs:["regl","N","colorType","invalidation"],outputs:void 0,output:"tmp",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-313"),expanded:[],variables:[]},{id:313,body:function(){return function(t){let n=t[0];for(var o=0;o<t.length-1;o++)t[o]=t[o+1];return t[t.length-1]=n,t}},inputs:[],outputs:void 0,output:"cycleFBOs",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-141"),expanded:[],variables:[]},{id:141,body:function(a){return a`## Simulation setup`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1631"),expanded:[],variables:[]},{id:1631,body:function(e,t,n){const o=t._gl.canvas;n.pixelRatio,n.width,n.height;var i=Math.floor(n.width),u=Math.floor(n.width/e),s=Math.max(i,u);i*=n.width/s,u*=n.width/s,o.width=i,o.height=u,o.style.width=`${i}px`,o.style.height=`${u}px`},inputs:["aspectRatio","regl","canvasSize"],outputs:void 0,output:"resizeSimulation",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-2101"),expanded:[],variables:[]},{id:2101,body:function(e,t,n,o,i,u,s,d,l,h,v){return function(){e.poll(),t(()=>{n({n:o},()=>{i.forEach((f,p)=>{f.use(()=>u({n:o})),s(d,f,l[p]),h(l[p],i[p],v[p])})})})}},inputs:["regl","blit","configureSimulation","n","V","initialize","performFFT","forwardFFT","Vhat","computeABhat","ABhat"],outputs:void 0,output:"performInitialization",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-2108"),expanded:[],variables:[]},{id:2108,body:function(e,t,n,o,i,u,s,d,l,h,v,c,f,p,y,b,g,I,x,E,B){return function(_){let w=!0,F=_&&_.render;e(()=>{t({dt:n,nu:o},()=>{(F||i)&&(u(s[1],d[1],l[1]),h({Vhat:s,ABhat:l,dt:n}),w=!0),w&&(v({V:d[1],range:c,invert:!!f,colorscale:p[y]}),w=!1),(F||i)&&(b(s),b(d),b(l),g(I,s[1],x[3]),E({src:x[3],dst:x[2]}),g(B,x[2],s[1]))})})}},inputs:["blit","configureSimulation","dt","nu","simulate","computeABhat","Vhat","V","ABhat","bdfUpdate","copyToScreen","range","invert","colorscales","colorscaleName","cycleFBOs","performFFT","inverseFFT","tmp","stripImag","forwardFFT"],outputs:void 0,output:"performIteration",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-104"),expanded:[],variables:[]},{id:104,body:function(e,t,n){n()},inputs:["restart","Lx","performInitialization"],outputs:void 0,output:"initialization",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-106"),expanded:[],variables:[]},{id:106,body:function(e,t,n,o,i){const u=n.frame(s=>{try{o(s)}catch(d){console.error(d),u.cancel(),u=null}});i.then(()=>u&&u.cancel())},inputs:["initialize","restart","regl","performIteration","invalidation"],outputs:void 0,output:"simulationLoop",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-97"),expanded:[],variables:[]},{id:97,body:function(e,t,n){return e({forward:!0,width:t[0],height:t[1],ping:n[0],pong:n[1],input:null,output:null,splitNormalization:!0})},inputs:["planFFT","N","tmp"],outputs:void 0,output:"forwardFFT",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-100"),expanded:[],variables:[]},{id:100,body:function(e,t,n){return e({forward:!1,width:t[0],height:t[1],ping:n[0],pong:n[1],input:null,output:null,splitNormalization:!0})},inputs:["planFFT","N","tmp"],outputs:void 0,output:"inverseFFT",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-152"),expanded:[],variables:[]},{id:152,body:function(e,t){const n=e(t);return function(o,i,u){return o[0].input=i,o[o.length-1].output=u,n(o)}},inputs:["createFFTPassCommand","regl"],outputs:void 0,output:"performFFT",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-333"),expanded:[],variables:[]},{id:333,body:function(e,t){return e({uniforms:{dx:(n,o)=>[2*Math.PI/t[0],2*Math.PI/t[1]],dt:(n,o)=>o.dt*(o.nu?o.nu[0]:0),nu:e.prop("nu")}})},inputs:["regl","N"],outputs:void 0,output:"configureSimulation",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-67"),expanded:[],variables:[]},{id:67,body:function(e,t){return e({vert:`
    precision highp float;
    attribute vec2 xy;
    void main () {
      gl_Position = vec4(xy, 0, 1);
    }`,attributes:{xy:[-4,-4,4,-4,0,4]},uniforms:{uInverseResolution:n=>[1/t[0],1/t[1]]},depth:{enable:!1},count:3})},inputs:["regl","N"],outputs:void 0,output:"blit",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-108"),expanded:[],variables:[]},{id:108,body:function(e){return e({frag:`
    precision highp float;
    uniform vec2 uInverseResolution;
    uniform float n;
    #define PI 3.14159265358979

    void main () {
      vec2 uv = (gl_FragCoord.xy - 0.5) * uInverseResolution;
      vec2 xy = uv * PI * 2.0;

      // A circular pulse instead:
      //float r = length(uv - 0.5);
      //float f = -2.0 * exp(-pow(r / 0.05, 8.0));

      float f = sin(n * (xy.x + xy.y)) + sin(n * xy.x) + sin(n * xy.y); //+ xy.x + xy.y * xy.x;
      //float f = 10.0 * sin(n * (xy.x)) * cos(n * (xy.y));
      gl_FragColor = vec4(f, 0, 0, 0);
    }`,uniforms:{n:e.prop("n")}})},inputs:["regl"],outputs:void 0,output:"initialize",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-222"),expanded:[],variables:[]},{id:222,body:function(e,t,n,o,i,u,s){const d=e({frag:`
      precision highp float;
      uniform sampler2D VhatTex;
      uniform vec2 uInverseResolution, dx;

      ${t}
      ${n}
      #define I vec2(0, 1)

      void main () {
        vec2 uv = gl_FragCoord.xy * uInverseResolution;
        vec2 Vhat = texture2D(VhatTex, uv).xy;

        vec2 k = wavenumber(uInverseResolution, dx);

        // x-derivative is (i * kx * Vhat)
        vec2 dVhatdx = cmul(vec2(0, k.x), Vhat);

        // y-derivative is (i * ky * Vhat)
        vec2 dVhatdy = cmul(vec2(0, k.y), Vhat);

        // We interleave the result as (i kx Vhat) + i * (i ky Vhat) so that
        // we recover the derivatives in the real domain as the real and
        // imaginary components. This could be greatly simplified to avoid
        // multiplications by one and zero.
        //
        // We also place Vhat in the final two components so that we recover
        // V along the way, for plotting!!!
        gl_FragColor = vec4(Vhat, dVhatdx + cmul(I, dVhatdy));
      }`,uniforms:{VhatTex:e.prop("Vhat")},framebuffer:e.prop("Vhat_VhatxVhaty")}),l=e({frag:`
      precision highp float;
      uniform sampler2D V_VxVytex;
      uniform vec2 uInverseResolution;

      void main () {
        vec2 uv = gl_FragCoord.xy * uInverseResolution;
        vec2 VxVy = texture2D(V_VxVytex, uv).zw;

        // From Eqn (F.9), Ahat = -F(1/2 Vx^2). Here we compute the pre-FFT 1/2 Vx^2
        // and swizzle it into the proper components to end up with
        //   (-1/2 Vx^2, 0)
        //   (-1/2 Vy^2, 0)
        gl_FragColor = vec4(
          -0.5 * (VxVy * VxVy),
          vec2(0.0)
        ).xzyw;
      }`,uniforms:{V_VxVytex:e.prop("V_VxVy")},framebuffer:e.prop("AB")});return function(v,c,f){let p=o[2],y=c,b=o[3];d({Vhat:v,Vhat_VhatxVhaty:p}),i(u,p,y),l({V_VxVy:y,AB:b}),i(s,b,f)}},inputs:["regl","glslWavenumber","cmul","tmp","performFFT","inverseFFT","forwardFFT"],outputs:void 0,output:"computeABhat",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-110"),expanded:[],variables:[]},{id:110,body:function(e,t,n){return e({frag:`
    precision highp float;

    uniform sampler2D Vhat0tex, Vhat1tex, ABhat0tex, ABhat1tex;
    uniform vec2 uInverseResolution, nu;
    uniform float dt;
    uniform vec2 dx;

    ${t}
    ${n}

    void main () {
      vec2 k = wavenumber(uInverseResolution, dx);

      vec2 uv = gl_FragCoord.xy * uInverseResolution;
      vec2 Vhat0 = texture2D(Vhat0tex, uv).xy;
      vec2 Vhat1 = texture2D(Vhat1tex, uv).xy;

      // Equation (F.7)
      float c = 1.0 + 1.0 / nu.x;

      float cdt = c * dt;
      float nu21 = nu.y / nu.x;

      // Nonlinear terms via Eqn (F.9), as computed in the computeABhat method.
      vec4 ABhat0 = texture2D(ABhat0tex, uv);
      vec4 ABhat1 = texture2D(ABhat1tex, uv);

      // Eqn. (F.10). xi may be complex-valued, in general, but since we deal
      // only in even-numbered derivatives (0th, laplacian, biharmonic), it 
      // happens to be strictly real. Note the extra factor of dt on the final
      // term, which seems to be missing in original source.
      float k1k2_2 = k.x * k.x + nu21 * k.y * k.y;
      float xi = 1.5 + cdt - dt * k1k2_2 + dt * nu.x * k1k2_2 * k1k2_2;

      // Eqn (F.8) for the update Vhat^{n + 2}.
      gl_FragColor.xy = (
        (2.0 + 2.0 * cdt) * Vhat1
        - (0.5 + cdt) * Vhat0
        + dt * (2.0 * (ABhat1.xy + nu21 * ABhat1.zw) - (ABhat0.xy + nu21 * ABhat0.zw))
      ) / xi;

      if (gl_FragCoord.x == 0.5 && gl_FragCoord.y == 0.5) {
        gl_FragColor.xy = vec2(0);
      }

      gl_FragColor.zw = vec2(0);
    }`,uniforms:{Vhat0tex:e.prop("Vhat[0]"),Vhat1tex:e.prop("Vhat[1]"),ABhat0tex:e.prop("ABhat[0]"),ABhat1tex:e.prop("ABhat[1]")},framebuffer:e.prop("Vhat[2]")})},inputs:["regl","cmul","glslWavenumber"],outputs:void 0,output:"bdfUpdate",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1128"),expanded:[],variables:[]},{id:1128,body:function(e){return e({frag:`
    precision highp float;
    uniform sampler2D src;
    uniform vec2 uInverseResolution;
    void main () {
      // Just drop everything except the first component :/
      gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * uInverseResolution).x, 0, 0, 0);
    }`,uniforms:{src:e.prop("src")},framebuffer:e.prop("dst")})},inputs:["regl"],outputs:void 0,output:"stripImag",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-112"),expanded:[],variables:[]},{id:112,body:function(e){return e({frag:`
    precision highp float;
    uniform vec2 uInverseResolution, range;
    uniform float invGamma;
    uniform sampler2D V, colorscale;
    uniform bool invert;

    #define PI 3.14159265358979

    float hardstep (float edge0, float edge1, float x) {
      //return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      return (x - edge0) / (edge1 - edge0);
    }

    float ramp (float x) {
      return 0.5 + atan(PI * (x - 0.5)) / PI;
    }

    void main () {
      float V = texture2D(V, gl_FragCoord.xy * uInverseResolution).x;
      float f = hardstep(range.x, range.y, V);
      if (invert) f = 1.0 - f;
      f = ramp(f);
      vec3 color = texture2D(colorscale, vec2(f, 0.5)).rgb;
      gl_FragColor = vec4(color, 1.0);
    }`,uniforms:{uInverseResolution:t=>[1/t.framebufferWidth,1/t.framebufferHeight],invert:e.prop("invert"),range:e.prop("range"),V:e.prop("V"),colorscale:e.prop("colorscale")}})},inputs:["regl"],outputs:void 0,output:"copyToScreen",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-73"),expanded:[],variables:[]},{id:73,body:function(a){return a`## Definitions`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-57"),expanded:[],variables:[]},{id:57,body:function(e,t){return e(t,"float")?"float":"half float"},inputs:["canWriteToFBOOfType","regl"],outputs:void 0,output:"colorType",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-2221"),expanded:[],variables:[]},{id:2221,body:function(e,t){return e.hasExtension(`OES_texture_${t}_linear`)?"linear":"nearest"},inputs:["regl","colorType"],outputs:void 0,output:"interpType",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1024"),expanded:[],variables:[]},{id:1024,body:function(e,t){function n(o,i=256){return e.quantize(o,i).map(u=>(u=e.rgb(u),[u.r,u.g,u.b,1]))}return{RdBu:t.texture([n(e.interpolateRdBu)]),Viridis:t.texture([n(e.interpolateViridis)]),Cividis:t.texture([n(e.interpolateCividis)]),Inferno:t.texture([n(e.interpolateInferno)]),Magma:t.texture([n(e.interpolateMagma)]),Plasma:t.texture([n(e.interpolatePlasma)]),Greys:t.texture([n(e.interpolateGreys)])}},inputs:["d3","regl"],outputs:void 0,output:"colorscales",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-76"),expanded:[],variables:[]},{id:76,body:function(e){return{width:Math.min(512,e),height:Math.min(512,e),pixelRatio:1}},inputs:["width"],outputs:void 0,output:"canvasSize",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-64"),expanded:[],variables:[]},{id:64,body:function(e,t,n){return function(i){const u=e.canvas(t[0],t[1]),s=n({canvas:u,extensions:["OES_texture_float","OES_texture_float_linear"],optionalExtensions:["OES_texture_half_float","OES_texture_half_float_linear"],attributes:{preserveDrawingBuffer:!0}});return u.value=s,u}},inputs:["DOM","N","createREGL"],outputs:void 0,output:"createREGLContext",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-70"),expanded:[],variables:[]},{id:70,body:function(e,t){return function(o){const i=e();return o({uniforms:{view:o.context("view")},context:{view:(u,s)=>{var d=u.framebufferWidth/u.framebufferHeight,l=!s||s.scale===void 0?2:s.scale;return t(i,-1/(l*d),1/(l*d),-1/l,1/l)}}})}},inputs:["mat3create","mat3ortho"],outputs:void 0,output:"createConfigureViewCmd",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1691"),expanded:[],variables:[]},{id:1691,body:function(a){return a`## Unused`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1519"),expanded:[],variables:[]},{id:1519,body:function(){return null},inputs:[],outputs:void 0,output:"enforceReal",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1253"),expanded:[],variables:[]},{id:1253,body:function(e){return e({frag:`
    precision highp float;
    uniform sampler2D src;
    uniform vec2 uInverseResolution;
    void main () {
      gl_FragColor = vec4(texture2D(src, gl_FragCoord.xy * uInverseResolution));
    }`,uniforms:{src:e.prop("src")},framebuffer:e.prop("dst")})},inputs:["regl"],outputs:void 0,output:"copy",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-424"),expanded:[],variables:[]},{id:424,body:function(e,t){return function(o,i,u){const s=document.createElement("canvas");s.width=e.width,s.height=e.height,s.style.width=`${e.width}px`,s.style.height=`${e.height}px`;const d=s.getContext("2d");let l;t.poll(),o.use(()=>{l=t.read()});function h(g){return Math.max(0,Math.min(255,Math.floor(Math.pow((g-u[0])/(u[1]-u[0]),1/2.2)*255)))}let v=new Float32Array(l.length/4),c=new Uint8ClampedArray(l.length);for(var f=0;f<l.length;f+=4)v[f/4]=l[f+i],c[f]=h(l[f+i]),c[f+1]=h(l[f+i]),c[f+2]=h(l[f+i]),c[f+3]=255;for(var f=0;f<e.height;f++){for(var p="",y=0;y<e.width;y++)p+=v[f*e.height+y].toFixed(7).padStart(10)+", ";console.log(p)}let b=new ImageData(c,e.width);return d.putImageData(b,0,0),s}},inputs:["canvasSize","regl"],outputs:void 0,output:"visualize",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-457"),expanded:[],variables:[]},{id:457,body:function(e,t,n,o,i,u){return function(d,l){return e.poll(),t(()=>n(o,d,i[0])),u(i[0],l)}},inputs:["regl","blit","performFFT","inverseFFT","tmp","visualize"],outputs:void 0,output:"visualizeFFT",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-36"),expanded:[],variables:[]},{id:36,body:function(a){return a`## Imports`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1020"),expanded:[],variables:[]},{id:1020,body:function(e){return e("d3@5")},inputs:["require"],outputs:void 0,output:"d3",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:function(e){return e("regl")},inputs:["require"],outputs:void 0,output:"createREGL",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});r({root:document.getElementById("cell-1843"),expanded:[],variables:[]},{id:1843,body:async(a,e)=>{const{canWriteToFBOOfType:t}=await m(()=>import("https://api.observablehq.com/@rreusser/regl-tools.js?v=4"),[]).then(n=>{const o={},i=a.module(n.default),u=a.module();if(!i.defines("canWriteToFBOOfType"))throw new SyntaxError("export 'canWriteToFBOOfType' not found");return u.variable(o.canWriteToFBOOfType=e()).import("canWriteToFBOOfType",i),o});return{canWriteToFBOOfType:t}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["canWriteToFBOOfType"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-44"),expanded:[],variables:[]},{id:44,body:async(a,e)=>{const{planFFT:t,glslWavenumber:n,createFFTPassCommand:o}=await m(()=>import("https://api.observablehq.com/@rreusser/glsl-fft.js?v=4"),[]).then(i=>{const u={},s=a.module(i.default),d=a.module();if(!s.defines("planFFT"))throw new SyntaxError("export 'planFFT' not found");if(d.variable(u.planFFT=e()).import("planFFT",s),!s.defines("glslWavenumber"))throw new SyntaxError("export 'glslWavenumber' not found");if(d.variable(u.glslWavenumber=e()).import("glslWavenumber",s),!s.defines("createFFTPassCommand"))throw new SyntaxError("export 'createFFTPassCommand' not found");return d.variable(u.createFFTPassCommand=e()).import("createFFTPassCommand",s),u});return{planFFT:t,glslWavenumber:n,createFFTPassCommand:o}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["planFFT","glslWavenumber","createFFTPassCommand"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-79"),expanded:[],variables:[]},{id:79,body:async(a,e)=>{const{mat3invert:t,mat3multiply:n,mat3create:o,mat3ortho:i}=await m(()=>import("https://api.observablehq.com/@rreusser/gl-mat3.js?v=4"),[]).then(u=>{const s={},d=a.module(u.default),l=a.module();if(!d.defines("mat3invert"))throw new SyntaxError("export 'mat3invert' not found");if(l.variable(s.mat3invert=e()).import("mat3invert",d),!d.defines("mat3multiply"))throw new SyntaxError("export 'mat3multiply' not found");if(l.variable(s.mat3multiply=e()).import("mat3multiply",d),!d.defines("mat3create"))throw new SyntaxError("export 'mat3create' not found");if(l.variable(s.mat3create=e()).import("mat3create",d),!d.defines("mat3ortho"))throw new SyntaxError("export 'mat3ortho' not found");return l.variable(s.mat3ortho=e()).import("mat3ortho",d),s});return{mat3invert:t,mat3multiply:n,mat3create:o,mat3ortho:i}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["mat3invert","mat3multiply","mat3create","mat3ortho"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-122"),expanded:[],variables:[]},{id:122,body:async(a,e)=>{const{slider:t,checkbox:n,button:o,select:i}=await m(()=>import("https://api.observablehq.com/@jashkenas/inputs.js?v=4"),[]).then(u=>{const s={},d=a.module(u.default),l=a.module();if(!d.defines("slider"))throw new SyntaxError("export 'slider' not found");if(l.variable(s.slider=e()).import("slider",d),!d.defines("checkbox"))throw new SyntaxError("export 'checkbox' not found");if(l.variable(s.checkbox=e()).import("checkbox",d),!d.defines("button"))throw new SyntaxError("export 'button' not found");if(l.variable(s.button=e()).import("button",d),!d.defines("select"))throw new SyntaxError("export 'select' not found");return l.variable(s.select=e()).import("select",d),s});return{slider:t,checkbox:n,button:o,select:i}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["slider","checkbox","button","select"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-138"),expanded:[],variables:[]},{id:138,body:async(a,e)=>{const{rangeSlider:t}=await m(()=>import("https://api.observablehq.com/@mootari/range-slider.js?v=4"),[]).then(n=>{const o={},i=a.module(n.default),u=a.module();if(!i.defines("rangeSlider"))throw new SyntaxError("export 'rangeSlider' not found");return u.variable(o.rangeSlider=e()).import("rangeSlider",i),o});return{rangeSlider:t}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["rangeSlider"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-227"),expanded:[],variables:[]},{id:227,body:async(a,e)=>{const{cmul:t}=await m(()=>import("https://api.observablehq.com/@rreusser/glsl-complex.js?v=4"),[]).then(n=>{const o={},i=a.module(n.default),u=a.module();if(!i.defines("cmul"))throw new SyntaxError("export 'cmul' not found");return u.variable(o.cmul=e()).import("cmul",i),o});return{cmul:t}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["cmul"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});r({root:document.getElementById("cell-2249"),expanded:[],variables:[]},{id:2249,body:async(a,e)=>{const{encodeMP4:t}=await m(()=>import("https://api.observablehq.com/@rreusser/encode-mp4.js?v=4"),[]).then(n=>{const o={},i=a.module(n.default),u=a.module();if(!i.defines("encodeMP4"))throw new SyntaxError("export 'encodeMP4' not found");return u.variable(o.encodeMP4=e()).import("encodeMP4",i),o});return{encodeMP4:t}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["encodeMP4"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
