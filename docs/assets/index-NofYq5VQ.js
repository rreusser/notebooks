import{d as s,_ as G}from"./index-ByB2dbry.js";s({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:(a,t)=>a`The [scalar wave equation](https://en.wikipedia.org/wiki/Wave_equation) for any number of dimensions is given by

${t.block`\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u.`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(a,t)=>a`For one dimension, we have

${t.block`\frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2}.`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:(a,t)=>a`We could apply PML to this equation, but it will turn out to be easier and require about the same amount of computational work to apply it to what’s probably a less familiar but strictly equivalent form which contains only first-order derivatives,

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c \frac{\partial v}{\partial x} \\[10pt]
\frac{\partial v}{\partial t} &= c \frac{\partial u}{\partial x}.
\end{aligned}`}

Here, ${t`u`} is the state variable (e.g. pressure) while ${t`v`} functions like a velocity.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(a,t)=>a`We begin by transforming to the Fourier time domain, replacing ${t`\frac{\partial}{\partial t}`} with ${t`-i\omega,`}

${t.block`\begin{aligned}
-i\omega u &= c \frac{\partial v}{\partial x} \\[10pt]
-i\omega v &= c \frac{\partial u}{\partial x}.
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:(a,t)=>a`The PML technique replaces spatial derivatives with a complex coordinate mapping

${t.block`\frac{\partial}{\partial x} \rightarrow \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial}{\partial x}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-28"),expanded:[],variables:[]},{id:28,body:(a,t)=>a`where ${t`\sigma(x) \geq 0`} is the absorption strength. This stretching causes waves to decay exponentially in regions where ${t`\sigma > 0`}. Notice that for ${t`\sigma = 0`} (no absorption), this reduces to ${t`\frac{\partial}{\partial x}`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:(a,t)=>a`Applying this mapping gives

${t.block`\begin{aligned}
-i\omega u &= c \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial v}{\partial x} \\[10pt]
-i\omega v &= c \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial u}{\partial x}
\end{aligned}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(a,t)=>a`Multiplying both sides by ${t`1 + i\frac{\sigma}{\omega}`} gives

${t.block`\begin{aligned}
-i\omega u - \sigma u &= c \frac{\partial v}{\partial x} \\[10pt]
-i\omega v - \sigma v &= c \frac{\partial u}{\partial x}.
\end{aligned}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-31"),expanded:[],variables:[]},{id:31,body:(a,t)=>a`Transforming back to the time domain gives the final 1D PML equations

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c \frac{\partial v}{\partial x} - \sigma u \\[10pt]
\frac{\partial v}{\partial t} &= c \frac{\partial u}{\partial x} - \sigma v.
\end{aligned}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:(a,t)=>a`In the interior where ${t`\sigma = 0`}, these reduce to the original wave equation. In the PML regions, ${t`\sigma > 0`} causes exponential absorption.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(a,t)=>a`The plot below shows a 1D wave propagating with PML absorbing boundaries on both ends. The shaded regions indicate where ${t`\sigma > 0`}. Notice how waves exit the domain smoothly without reflecting.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:()=>({params_1d:{pmlWidth:6,pmlStrength:2,frequency:.1}}),inputs:[],outputs:["params_1d"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(a,t)=>{const i=a(t.range([1,40],{label:"PML width (grid points)",step:1,value:6})),A=a(t.range([.1,5],{label:"PML strength",step:.1,value:2})),M=a(t.range([.025,.2],{label:"Oscillator frequency",step:.005,value:.1}));return{pmlWidth1d:i,pmlStrength1d:A,frequency1d:M}},inputs:["view","Inputs"],outputs:["pmlWidth1d","pmlStrength1d","frequency1d"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(a,t,i,A)=>{a.pmlWidth=t,a.pmlStrength=i,a.frequency=A},inputs:["params_1d","pmlWidth1d","pmlStrength1d","frequency1d"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:async(a,t,i,A,M)=>{const W=await G(()=>import("https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm"),[]),d=200,D=2,e=1,h=1,m=.1*h/e,y=4,L=10,c=new Float64Array(d),T=new Float64Array(d);let E=0;function C(n){const o=n,F=d-1-n;let v=0;return o<a.pmlWidth&&(v=Math.max(v,Math.pow((a.pmlWidth-o)/a.pmlWidth,D)*a.pmlStrength)),F<a.pmlWidth&&(v=Math.max(v,Math.pow((a.pmlWidth-F)/a.pmlWidth,D)*a.pmlStrength)),v}function f(n){return C(n)}function P(n){return C(n+.5)}function w(n,o){const v=Math.exp(-Math.pow(Math.abs((o%300-150)/40),4)),u=5,p=e*Math.PI*a.frequency,l=.1/a.frequency;let b=0;for(let S=0;S<u;S++){const O=(S-u*.5)/u*20,r=d/2+O,k=Math.abs(n-r),X=Math.exp(-Math.pow(k/3,2)),q=Math.sin(p*o/(S+1));b+=q*X*y*l*v}return b}function I(n,o,F){const v=new Float64Array(d);for(let l=1;l<d-1;l++){const b=(o[l]-o[l-1])/h;v[l]=e*b-f(l)*n[l]}const u=(o[1]-o[0])/h;v[0]=e*u-f(0)*n[0];const p=(o[d-2]-o[d-3])/h;return v[d-1]=e*p-f(d-1)*n[d-1],v}function B(n,o,F){const v=new Float64Array(d);for(let u=0;u<d-1;u++){const p=(n[u+1]-n[u])/h,l=w(u+.5,F);v[u]=e*p-P(u)*o[u]+l}return v}function U(){const n=new Float64Array(d),o=new Float64Array(d),F=I(c,T),v=B(c,T,E);for(let r=0;r<d;r++)n[r]=c[r]+.5*m*F[r],o[r]=T[r]+.5*m*v[r];const u=I(n,o),p=B(n,o,E+.5*m);for(let r=0;r<d;r++)n[r]=c[r]+.5*m*u[r],o[r]=T[r]+.5*m*p[r];const l=I(n,o),b=B(n,o,E+.5*m);for(let r=0;r<d;r++)n[r]=c[r]+m*l[r],o[r]=T[r]+m*b[r];const S=I(n,o),O=B(n,o,E+m);for(let r=1;r<d-1;r++)c[r]+=m/6*(F[r]+2*u[r]+2*l[r]+S[r]),T[r]+=m/6*(v[r]+2*p[r]+2*b[r]+O[r]);E+=m}const R=t`<div></div>`;let x=0,g,_=!1;function $(){if(_){for(let n=0;n<5;n++)U();if(x++,x%2===0){const n=Array.from({length:d},(v,u)=>({x:u,u:c[u],sigma:f(u)})),o=50,F=W.plot({width:640,height:300,marginLeft:50,x:{label:"Position",domain:[0,d]},y:{label:"u(x,t)",domain:[-o,o]},marks:[W.ruleX(n,{x:"x",y1:-o,y2:o,stroke:"#DDA0DD",strokeWidth:3,strokeOpacity:v=>v.sigma>0?.3:0}),W.dot(n,{x:"x",y:"u",fill:"steelblue",r:2})]});R.replaceChildren(F)}g=requestAnimationFrame($)}}const N=new i(n=>{n.forEach(o=>{_=o.isIntersecting,_?g||$():g&&(cancelAnimationFrame(g),g=null)})});return N.observe(R),A.then(()=>{g&&cancelAnimationFrame(g),N.disconnect()}),M(R),{Plot:W,N:d,PML_EXPONENT:D,C:e,DX:h,DT:m,OSCILLATOR_STRENGTH:y,OSCILLATOR_WAVELENGTH:L,u:c,v:T,t:E,sigma_at_position:C,sigma:f,sigma_v:P,forcing:w,dudt:I,dvdt:B,step:U,container:R,frameCount:x,animationId:g,isVisible:_,animate:$,observer:N}},inputs:["params_1d","html","IntersectionObserver","invalidation","display"],outputs:["Plot","N","PML_EXPONENT","C","DX","DT","OSCILLATOR_STRENGTH","OSCILLATOR_WAVELENGTH","u","v","t","sigma_at_position","sigma","sigma_v","forcing","dudt","dvdt","step","container","frameCount","animationId","isVisible","animate","observer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(a,t)=>a`The 2D case follows the same principles but with a key difference: we need separate absorption coefficients ${t`\sigma_x`} and ${t`\sigma_y`} for each spatial direction. When we apply the complex coordinate mapping independently to both ${t`x`} and ${t`y`} derivatives, cross-terms emerge that don't appear in 1D. These cross-terms require an auxiliary field ${t`\psi`} to handle the coupling between the two spatial directions within the PML regions.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:(a,t)=>a`The derivation below shows how these auxiliary variables arise naturally from the Fourier domain analysis. In regions where only one direction has absorption (e.g., ${t`\sigma_x > 0`} but ${t`\sigma_y = 0`}), the equations simplify. The full complexity only appears in corner regions where both directions have non-zero absorption.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-38"),expanded:[],variables:[]},{id:38,body:(a,t)=>a`We start with the scalar wave equation in first-order form,

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c (\nabla \cdot \mathbf{v}) \\[10pt]
\frac{\partial v_x}{\partial t} &= c \frac{\partial u}{\partial x} \\[10pt]
\frac{\partial v_y}{\partial t} &= c \frac{\partial u}{\partial y}.
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-39"),expanded:[],variables:[]},{id:39,body:(a,t)=>a`Following the same approach as in 1D, we transform to the Fourier time domain, replacing ${t`\frac{\partial}{\partial t}`} with ${t`-i\omega`}

${t.block`\begin{aligned}
-i\omega u &= c \frac{\partial v_x}{\partial x} + c \frac{\partial v_y}{\partial y} \\[10pt]
-i\omega v_x &= c \frac{\partial u}{\partial x} \\[10pt]
-i\omega v_y &= c \frac{\partial u}{\partial y}.
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-40"),expanded:[],variables:[]},{id:40,body:(a,t)=>a`The PML technique replaces spatial derivatives with complex coordinate mappings

${t.block`\frac{\partial}{\partial x} \rightarrow \frac{1}{1 + i\frac{\sigma_x}{\omega}} \frac{\partial}{\partial x}, \quad \frac{\partial}{\partial y} \rightarrow \frac{1}{1 + i\frac{\sigma_y}{\omega}} \frac{\partial}{\partial y}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:(a,t)=>a`Applying the mapping to the velocity equations and multiplying through by the denominators yields

${t.block`\begin{aligned}
-i\omega v_x - \sigma_x v_x &= c \frac{\partial u}{\partial x} \\[10pt]
-i\omega v_y - \sigma_y v_y &= c \frac{\partial u}{\partial y}
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-42"),expanded:[],variables:[]},{id:42,body:(a,t)=>a`Transforming back to the time domain immediately gives

${t.block`\begin{aligned}
\frac{\partial v_x}{\partial t} &= c \frac{\partial u}{\partial x} - \sigma_x v_x \\[10pt]
\frac{\partial v_y}{\partial t} &= c \frac{\partial u}{\partial y} - \sigma_y v_y.
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-43"),expanded:[],variables:[]},{id:43,body:(a,t)=>a`The equation for ${t`u`} is more involved. Applying the PML mapping gives

${t.block`-i\omega u = c \left(\frac{1}{1 + i\frac{\sigma_x}{\omega}} \frac{\partial v_x}{\partial x} + \frac{1}{1 + i\frac{\sigma_y}{\omega}} \frac{\partial v_y}{\partial y}\right)`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-44"),expanded:[],variables:[]},{id:44,body:(a,t)=>a`Expanding and collecting terms yields

${t.block`\begin{aligned}
-i\omega u &= c \left(\frac{\partial v_x}{\partial x} + \frac{\partial v_y}{\partial y}\right) - (\sigma_x + \sigma_y) u \\
&\quad + \left(\frac{ic\sigma_x}{\omega} \frac{\partial v_y}{\partial y} + \frac{ic\sigma_y}{\omega} \frac{\partial v_x}{\partial x} - \frac{i}{\omega} \sigma_x \sigma_y u\right)
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-45"),expanded:[],variables:[]},{id:45,body:(a,t)=>a`The term in parentheses contains factors of ${t`\frac{i}{\omega}`}, which corresponds to time integration. We define this as the auxiliary quantity ${t`\psi`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-46"),expanded:[],variables:[]},{id:46,body:(a,t)=>a`${t.block`\psi = \frac{ic\sigma_x}{\omega} \frac{\partial v_y}{\partial y} + \frac{ic\sigma_y}{\omega} \frac{\partial v_x}{\partial x} - \frac{i}{\omega} \sigma_x \sigma_y u`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-47"),expanded:[],variables:[]},{id:47,body:(a,t)=>a`Multiplying through by ${t`-i\omega`} and transforming back to the time domain gives

${t.block`\frac{d\psi}{dt} = c \sigma_x \frac{\partial v_y}{\partial y} + c \sigma_y \frac{\partial v_x}{\partial x} - \sigma_x \sigma_y u`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-48"),expanded:[],variables:[]},{id:48,body:(a,t)=>a`The update equation for ${t`u`} becomes

${t.block`\frac{du}{dt} = c (\nabla \cdot \mathbf{v}) - (\sigma_x + \sigma_y) u + \psi`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(a,t)=>a`Together with the velocity equations, we have the complete 2D PML system

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c (\nabla \cdot \mathbf{v}) - (\sigma_x + \sigma_y) u + \psi \\[10pt]
\frac{\partial \psi}{\partial t} &= c \sigma_x \frac{\partial v_y}{\partial y} + c \sigma_y \frac{\partial v_x}{\partial x} - \sigma_x \sigma_y u \\[10pt]
\frac{\partial v_x}{\partial t} &= c \frac{\partial u}{\partial x} - \sigma_x v_x \\[10pt]
\frac{\partial v_y}{\partial t} &= c \frac{\partial u}{\partial y} - \sigma_y v_y
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:(a,t)=>a`These equations require tracking three fields: the scalar field ${t`u`}, the auxiliary field ${t`\psi`}, and the vector field ${t`\mathbf{v} = (v_x, v_y)`}. In practice, this naturally lends itself to a two-buffer implementation: one storing ${t`(u, \psi)`} and the other storing ${t`(v_x, v_y)`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-50"),expanded:[],variables:[]},{id:50,body:(a,t)=>a`The following WebGL implementation simulates these equations on the GPU using fragment shaders. Use the controls below to pause/resume the simulation, adjust contrast, and visualize the PML absorption regions (red for ${t`\sigma_x`}, green for ${t`\sigma_y`}).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});s({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:a=>{const t=a`<canvas width="640" height="640" style="width: 100%; height: auto; display: block; image-rendering: pixelated;"></canvas>`,i=t.getContext("webgl2");if(!i)throw new Error("WebGL 2 is not supported");const A=i.getExtension("EXT_color_buffer_float");if(!A)throw new Error("EXT_color_buffer_float extension is not supported");const M=12,W=2,d=1,D=4,e=10,h=1,m=.5,y=1,L=`#version 300 es
    in vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,c=`
    const float PML_WIDTH = ${M.toFixed(1)};
    const float PML_EXPONENT = ${W.toFixed(1)};
    const float PML_STRENGTH = ${d.toFixed(1)};
    const float OSCILLATOR_STRENGTH = ${D.toFixed(1)};
    const float OSCILLATOR_WAVELENGTH = ${e.toFixed(1)};
    const float C = ${h.toFixed(1)};
    const float DT = ${m.toFixed(1)};
    const float DX = ${y.toFixed(1)};
    const float PI = 3.14159265358979;

    float linearstep(float a, float b, float x) {
      return clamp((x - a) / (b - a), 0.0, 1.0);
    }

    vec2 sigma(vec2 coord, vec2 res) {
      return pow(
        abs(vec2(
          linearstep(PML_WIDTH, 0.0, coord.x) + linearstep(res.x - PML_WIDTH, res.x, coord.x),
          linearstep(PML_WIDTH, 0.0, coord.y) + linearstep(res.y - PML_WIDTH, res.y, coord.y)
        )),
        vec2(PML_EXPONENT)
      ) * PML_STRENGTH;
    }
  `,T=`#version 300 es
    precision highp float;
    ${c}
    uniform sampler2D u_bufferA;
    uniform sampler2D u_bufferB;
    uniform vec2 u_resolution;
    uniform float u_pmlWidth;
    uniform float u_usePsi;
    uniform float u_mouseX;
    uniform float u_mouseY;
    uniform float u_mouseMoving;
    uniform float u_mouseActive;
    out vec4 fragColor;

    vec2 sigmaCompute(vec2 coord, vec2 res, float pmlWidth) {
      return pow(
        abs(vec2(
          linearstep(pmlWidth, 0.0, coord.x) + linearstep(res.x - pmlWidth, res.x, coord.x),
          linearstep(pmlWidth, 0.0, coord.y) + linearstep(res.y - pmlWidth, res.y, coord.y)
        )),
        vec2(PML_EXPONENT)
      ) * PML_STRENGTH;
    }

    void main() {
      ivec2 p = ivec2(gl_FragCoord.xy);
      vec4 state = texelFetch(u_bufferA, p, 0);
      float u = state.x, psi = state.y, t = state.z;

      float vx1 = texelFetch(u_bufferB, p + ivec2(1, 0), 0).x;
      float vx0 = texelFetch(u_bufferB, p + ivec2(-1, 0), 0).x;
      float vy1 = texelFetch(u_bufferB, p + ivec2(0, 1), 0).y;
      float vy0 = texelFetch(u_bufferB, p + ivec2(0, -1), 0).y;

      float dvxdx = (vx1 - vx0) / (2.0 * DX);
      float dvydy = (vy1 - vy0) / (2.0 * DX);

      vec2 s = sigmaCompute(gl_FragCoord.xy, u_resolution, u_pmlWidth);

      // When usePsi is disabled, use naive 2D extension (which won't work well)
      float psiContribution = u_usePsi > 0.5 ? psi : 0.0;
      float psiUpdate = u_usePsi > 0.5 ? (s.x * dvydy + s.y * dvxdx - u * s.x * s.y) : 0.0;

      fragColor.xyz = state.xyz + DT * vec3(
        C * (dvxdx + dvydy) - u * (s.x + s.y) + psiContribution,
        C * psiUpdate,
        1.0
      );

      // Apply forcing term: mouse if moving, automatic if not active, none otherwise
      if (u_mouseMoving > 0.5) {
        // Mouse-based forcing with Gaussian profile (only when actually moving)
        float mouseForceWidth = 8.0;
        float mouseDist = length(gl_FragCoord.xy - vec2(u_mouseX, u_mouseY));
        float mouseMask = exp(-pow(mouseDist / mouseForceWidth, 2.0));
        float omega = C * PI / OSCILLATOR_WAVELENGTH;
        float mouseForce = sin(omega * t) * mouseMask * OSCILLATOR_STRENGTH * 0.4;
        fragColor.x += mouseForce;
      } else if (u_mouseActive < 0.5) {
        // Automatic periodic oscillators (only when mouse not active)
        float pulseInterval = 600.0;
        float pulse = exp(-pow(abs((mod(t - pulseInterval, pulseInterval * 0.7) - pulseInterval * 0.5) / 40.0), 4.0));
        int COUNT = 5;
        for (int i = 0; i < COUNT; i++) {
          vec2 r = (float(i) - float(COUNT) * 0.5) / float(COUNT) * vec2(80.0, 0.0);
          float omega = C * PI / OSCILLATOR_WAVELENGTH;
          float oscillatorMask = smoothstep(3.0, 2.0, length(gl_FragCoord.xy - u_resolution * 0.5 + r));
          float u0 = sin(omega * t / float(i + 1));
          fragColor.x += u0 * oscillatorMask * OSCILLATOR_STRENGTH * pulse;
        }
      }
      // When mouse is active but not moving: no forcing, just let waves propagate
    }
  `,E=`#version 300 es
    precision highp float;
    ${c}
    uniform sampler2D u_bufferA;
    uniform sampler2D u_bufferB;
    uniform vec2 u_resolution;
    uniform float u_pmlWidth;
    out vec4 fragColor;

    vec2 sigmaCompute(vec2 coord, vec2 res, float pmlWidth) {
      return pow(
        abs(vec2(
          linearstep(pmlWidth, 0.0, coord.x) + linearstep(res.x - pmlWidth, res.x, coord.x),
          linearstep(pmlWidth, 0.0, coord.y) + linearstep(res.y - pmlWidth, res.y, coord.y)
        )),
        vec2(PML_EXPONENT)
      ) * PML_STRENGTH;
    }

    void main() {
      ivec2 p = ivec2(gl_FragCoord.xy);
      vec4 state = texelFetch(u_bufferB, p, 0);
      vec2 v = state.xy;

      float u1x = texelFetch(u_bufferA, p + ivec2(1, 0), 0).x;
      float u0x = texelFetch(u_bufferA, p + ivec2(-1, 0), 0).x;
      float u1y = texelFetch(u_bufferA, p + ivec2(0, 1), 0).x;
      float u0y = texelFetch(u_bufferA, p + ivec2(0, -1), 0).x;

      vec2 ugrad = vec2(u1x - u0x, u1y - u0y) / (2.0 * DX);
      vec2 s = sigmaCompute(gl_FragCoord.xy, u_resolution, u_pmlWidth);

      fragColor.xy = state.xy + DT * (C * ugrad - s * v);
    }
  `,C=`#version 300 es
    precision highp float;
    ${c}
    uniform sampler2D u_bufferA;
    uniform vec2 u_resolution;
    uniform float u_showSigma;
    uniform float u_contrast;
    uniform float u_pmlWidth;
    out vec4 fragColor;

    vec2 sigmaDisplay(vec2 coord, vec2 res, float pmlWidth) {
      return pow(
        abs(vec2(
          linearstep(pmlWidth, 0.0, coord.x) + linearstep(res.x - pmlWidth, res.x, coord.x),
          linearstep(pmlWidth, 0.0, coord.y) + linearstep(res.y - pmlWidth, res.y, coord.y)
        )),
        vec2(PML_EXPONENT)
      ) * PML_STRENGTH;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      vec4 state = texture(u_bufferA, uv);
      float u = state.x * u_contrast;  // Apply contrast amplification

      // White background with colored waves
      vec3 white = vec3(1.0);
      vec3 cyanColor = vec3(0.0, 0.65, 0.75);    // Darker cyan
      vec3 yellowColor = vec3(0.85, 0.75, 0.0);  // Darker yellow

      // Blend from white to color based on wave amplitude
      float intensity = clamp(abs(u), 0.0, 1.0);
      vec3 targetColor = u > 0.0 ? yellowColor : cyanColor;
      fragColor = vec4(mix(white, targetColor, intensity), 1.0);

      if (u_showSigma > 0.5) {
        vec2 s = sqrt(sigmaDisplay(gl_FragCoord.xy, u_resolution, u_pmlWidth));  // sqrt for better low-value contrast
        fragColor = mix(fragColor, vec4(1.0, 0.0, 0.0, 1.0), s.x * 0.7);  // Pink for x-direction
        fragColor = mix(fragColor, vec4(0.0, 1.0, 0.0, 1.0), s.y * 0.7);  // Green for y-direction
      }
    }
  `;function f(u,p){const l=i.createShader(p);if(i.shaderSource(l,u),i.compileShader(l),!i.getShaderParameter(l,i.COMPILE_STATUS)){const b=i.getShaderInfoLog(l);throw console.error("Shader compilation error:",b),console.error("Shader source:",u),i.deleteShader(l),new Error("Shader compilation failed: "+b)}return l}function P(u,p){const l=f(u,i.VERTEX_SHADER),b=f(p,i.FRAGMENT_SHADER),S=i.createProgram();if(i.attachShader(S,l),i.attachShader(S,b),i.linkProgram(S),!i.getProgramParameter(S,i.LINK_STATUS)){const O=i.getProgramInfoLog(S);throw console.error("Program linking error:",O),new Error("Program linking failed: "+O)}return S}const w=P(L,T),I=P(L,E),B=P(L,C),U=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,U),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);function R(u,p){const l=i.createTexture();i.bindTexture(i.TEXTURE_2D,l),i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,u,p,0,i.RGBA,i.FLOAT,null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);const b=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,b),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,l,0),{fbo:b,texture:l}}const x=t.width,g=t.height,_=[R(x,g),R(x,g)],$=[R(x,g),R(x,g)];let N=0;const n=[],o={x:-1e3,y:-1e3,lastMoveTime:-1e4,isMoving:!1,isActive:!1};t.addEventListener("pointerenter",u=>{const p=t.getBoundingClientRect(),l=(u.clientX-p.left)*x/p.width,b=g-(u.clientY-p.top)*g/p.height;n.push({x:l,y:b,time:performance.now()})}),t.addEventListener("pointermove",u=>{const p=t.getBoundingClientRect(),l=(u.clientX-p.left)*x/p.width,b=g-(u.clientY-p.top)*g/p.height;n.push({x:l,y:b,time:performance.now()})}),t.addEventListener("pointerleave",u=>{o.x=-1e3,o.y=-1e3,o.lastMoveTime=-1e4,o.isMoving=!1,o.isActive=!1});const F={usePsi:1,showSigma:0,contrast:.454,pmlWidth:12,mouseX:-1e3,mouseY:-1e3,mouseMoving:0,mouseActive:0};return{canvas:t,gl:i,ext:A,PML_WIDTH:M,PML_EXPONENT:W,PML_STRENGTH:d,OSCILLATOR_STRENGTH:D,OSCILLATOR_WAVELENGTH:e,C:h,DT:m,DX:y,vertexShaderSource:L,commonSource:c,bufferASource:T,bufferBSource:E,displaySource:C,compileShader:f,createProgram:P,bufferAProgram:w,bufferBProgram:I,displayProgram:B,quadBuffer:U,createFramebuffer:R,width:x,height:g,bufferA:_,bufferB:$,currentBuffer:N,pointerQueue:n,mouseState:o,uniforms:F,webgl_setup:{canvas:t,gl:i,width:x,height:g,bufferAProgram:w,bufferBProgram:I,displayProgram:B,quadBuffer:U,bufferA:_,bufferB:$,mouseState:o,uniforms:F}}},inputs:["html"],outputs:["canvas","gl","ext","PML_WIDTH","PML_EXPONENT","PML_STRENGTH","OSCILLATOR_STRENGTH","OSCILLATOR_WAVELENGTH","C","DT","DX","vertexShaderSource","commonSource","bufferASource","bufferBSource","displaySource","compileShader","createProgram","bufferAProgram","bufferBProgram","displayProgram","quadBuffer","createFramebuffer","width","height","bufferA","bufferB","currentBuffer","pointerQueue","mouseState","uniforms","webgl_setup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(a,t,i,A,M)=>{a.uniforms.usePsi=t?1:0,a.uniforms.showSigma=i?1:0,a.uniforms.contrast=Math.max(100**A,.1),a.uniforms.pmlWidth=M},inputs:["webgl_setup","usePsi","showSigma","contrast","pmlWidth"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:(a,t,i,A,M,W,d)=>{const{canvas:D,gl:e,width:h,height:m,bufferAProgram:y,bufferBProgram:L,displayProgram:c,quadBuffer:T,bufferA:E,bufferB:C,uniforms:f}=a;let P=0,w,I=!1;function B(){if(!I)return;const R=performance.now();for(;t.length>0;){const _=t.shift();i.x=_.x,i.y=_.y,i.lastMoveTime=_.time}const x=R-i.lastMoveTime;if(i.isMoving=x<100,i.isActive=x<6e3,f.mouseX=i.x,f.mouseY=i.y,f.mouseMoving=i.isMoving?1:0,f.mouseActive=i.isActive?1:0,!A){e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,h,m),e.useProgram(c);const _=e.getAttribLocation(c,"a_position");e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(_),e.vertexAttribPointer(_,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[P].texture),e.uniform1i(e.getUniformLocation(c,"u_bufferA"),0),e.uniform2f(e.getUniformLocation(c,"u_resolution"),h,m),e.uniform1f(e.getUniformLocation(c,"u_showSigma"),f.showSigma),e.uniform1f(e.getUniformLocation(c,"u_contrast"),f.contrast),e.uniform1f(e.getUniformLocation(c,"u_pmlWidth"),f.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),w=requestAnimationFrame(B);return}for(let _=0;_<2;_++){const $=P,N=1-P;e.bindFramebuffer(e.FRAMEBUFFER,E[N].fbo),e.viewport(0,0,h,m),e.useProgram(y);const n=e.getAttribLocation(y,"a_position");e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(n),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[$].texture),e.uniform1i(e.getUniformLocation(y,"u_bufferA"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,C[$].texture),e.uniform1i(e.getUniformLocation(y,"u_bufferB"),1),e.uniform2f(e.getUniformLocation(y,"u_resolution"),h,m),e.uniform1f(e.getUniformLocation(y,"u_pmlWidth"),f.pmlWidth),e.uniform1f(e.getUniformLocation(y,"u_usePsi"),f.usePsi),e.uniform1f(e.getUniformLocation(y,"u_mouseX"),f.mouseX),e.uniform1f(e.getUniformLocation(y,"u_mouseY"),f.mouseY),e.uniform1f(e.getUniformLocation(y,"u_mouseMoving"),f.mouseMoving),e.uniform1f(e.getUniformLocation(y,"u_mouseActive"),f.mouseActive),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,C[N].fbo),e.useProgram(L);const o=e.getAttribLocation(L,"a_position");e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(o),e.vertexAttribPointer(o,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[N].texture),e.uniform1i(e.getUniformLocation(L,"u_bufferA"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,C[$].texture),e.uniform1i(e.getUniformLocation(L,"u_bufferB"),1),e.uniform2f(e.getUniformLocation(L,"u_resolution"),h,m),e.uniform1f(e.getUniformLocation(L,"u_pmlWidth"),f.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),P=N}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,h,m),e.useProgram(c);const g=e.getAttribLocation(c,"a_position");e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(g),e.vertexAttribPointer(g,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[P].texture),e.uniform1i(e.getUniformLocation(c,"u_bufferA"),0),e.uniform2f(e.getUniformLocation(c,"u_resolution"),h,m),e.uniform1f(e.getUniformLocation(c,"u_showSigma"),f.showSigma),e.uniform1f(e.getUniformLocation(c,"u_contrast"),f.contrast),e.uniform1f(e.getUniformLocation(c,"u_pmlWidth"),f.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),w=requestAnimationFrame(B)}const U=new M(R=>{R.forEach(x=>{I=x.isIntersecting,I?w||(w=requestAnimationFrame(B)):w&&(cancelAnimationFrame(w),w=null)})});return U.observe(D),W.then(()=>{w&&cancelAnimationFrame(w),U.disconnect()}),d(D),{canvas:D,gl:e,width:h,height:m,bufferAProgram:y,bufferBProgram:L,displayProgram:c,quadBuffer:T,bufferA:E,bufferB:C,uniforms:f,currentBuffer:P,animationId:w,isVisible:I,render:B,observer:U}},inputs:["webgl_setup","pointerQueue","mouseState","simulate","IntersectionObserver","invalidation","display"],outputs:["canvas","gl","width","height","bufferAProgram","bufferBProgram","displayProgram","quadBuffer","bufferA","bufferB","uniforms","currentBuffer","animationId","isVisible","render","observer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(a,t)=>{const i=a(t.toggle({label:"Simulate",value:!0})),A=a(t.toggle({label:"Use auxiliary ψ equation",value:!0})),M=a(t.toggle({label:"Show absorption regions",value:!1})),W=a(t.range([0,1],{label:"Contrast",step:.01,value:0})),d=a(t.range([4,40],{label:"PML width (pixels)",step:1,value:12}));return{simulate:i,usePsi:A,showSigma:M,contrast:W,pmlWidth:d}},inputs:["view","Inputs"],outputs:["simulate","usePsi","showSigma","contrast","pmlWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
