import{d as u,_ as G}from"./index-ByB2dbry.js";u({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:(a,t)=>a`The [scalar wave equation](https://en.wikipedia.org/wiki/Wave_equation) in general is given by

${t.block`\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u.`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(a,t)=>a`For one dimension, we have

${t.block`\frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2}.`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:(a,t)=>a`We could apply PML to this equation, but it works better to start out with what’s probably a less familiar but strictly equivalent form containing only first-order derivatives,

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c \frac{\partial v}{\partial x} \\[10pt]
\frac{\partial v}{\partial t} &= c \frac{\partial u}{\partial x}.
\end{aligned}`}

Here, ${t`u`} is the state variable (e.g. pressure) while ${t`v`} functions like a velocity.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:(a,t)=>a`We begin by transforming to the Fourier time domain, replacing ${t`\frac{\partial}{\partial t}`} with ${t`-i\omega,`}

${t.block`\begin{aligned}
-i\omega u &= c \frac{\partial v}{\partial x} \\[10pt]
-i\omega v &= c \frac{\partial u}{\partial x}.
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:(a,t)=>a`The PML technique replaces spatial derivatives with a complex coordinate mapping

${t.block`\frac{\partial}{\partial x} \rightarrow \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial}{\partial x}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-28"),expanded:[],variables:[]},{id:28,body:(a,t)=>a`where ${t`\sigma(x) \geq 0`} is the absorption strength. This stretching causes waves to decay exponentially in regions where ${t`\sigma > 0`}. Notice that for ${t`\sigma = 0`} (no absorption), this reduces to ${t`\frac{\partial}{\partial x}`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:(a,t)=>a`Applying this mapping gives

${t.block`\begin{aligned}
-i\omega u &= c \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial v}{\partial x} \\[10pt]
-i\omega v &= c \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial u}{\partial x}
\end{aligned}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:(a,t)=>a`Multiplying both sides by ${t`1 + i\frac{\sigma}{\omega}`} gives

${t.block`\begin{aligned}
-i\omega u - \sigma u &= c \frac{\partial v}{\partial x} \\[10pt]
-i\omega v - \sigma v &= c \frac{\partial u}{\partial x}.
\end{aligned}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-31"),expanded:[],variables:[]},{id:31,body:(a,t)=>a`Transforming back to the time domain gives the final 1D PML equations

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c \frac{\partial v}{\partial x} - \sigma u \\[10pt]
\frac{\partial v}{\partial t} &= c \frac{\partial u}{\partial x} - \sigma v.
\end{aligned}`}
`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:(a,t)=>a`In the interior where ${t`\sigma = 0`}, these reduce to the original wave equation. In the PML regions, ${t`\sigma > 0`} causes exponential absorption.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(a,t)=>a`The plot below shows a 1D wave propagating with PML absorbing boundaries on both ends. The shaded regions indicate where ${t`\sigma > 0`}. Notice how waves exit the domain smoothly without reflecting.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:()=>({params_1d:{pmlWidth:6,pmlStrength:2,frequency:.1}}),inputs:[],outputs:["params_1d"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(a,t)=>{const i=a(t.range([1,40],{label:"PML width (grid points)",step:1,value:6})),R=a(t.range([.1,5],{label:"PML strength",step:.1,value:2})),S=a(t.range([.025,.2],{label:"Oscillator frequency",step:.005,value:.1}));return{pmlWidth1d:i,pmlStrength1d:R,frequency1d:S}},inputs:["view","Inputs"],outputs:["pmlWidth1d","pmlStrength1d","frequency1d"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(a,t,i,R)=>{a.pmlWidth=t,a.pmlStrength=i,a.frequency=R},inputs:["params_1d","pmlWidth1d","pmlStrength1d","frequency1d"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:async(a,t,i,R,S)=>{const P=await G(()=>import("https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm"),[]),e=200,F=2,w=1,I=1,g=.1*I/w,h=4,M=10,s=new Float64Array(e),b=new Float64Array(e);let y=0;function C(r){const n=r,x=e-1-r;let l=0;return n<a.pmlWidth&&(l=Math.max(l,Math.pow((a.pmlWidth-n)/a.pmlWidth,F)*a.pmlStrength)),x<a.pmlWidth&&(l=Math.max(l,Math.pow((a.pmlWidth-x)/a.pmlWidth,F)*a.pmlStrength)),l}function p(r){return C(r)}function k(r){return C(r+.5)}function c(r,n){const l=Math.exp(-Math.pow(Math.abs((n%300-150)/40),4)),d=5,L=w*Math.PI*a.frequency,m=.1/a.frequency;let O=0;for(let q=0;q<d;q++){const E=(q-d*.5)/d*20,o=e/2+E,_=Math.abs(r-o),$=Math.exp(-Math.pow(_/3,2)),H=Math.sin(L*n/(q+1));O+=H*$*h*m*l}return O}function T(r,n,x){const l=new Float64Array(e);for(let m=1;m<e-1;m++){const O=(n[m]-n[m-1])/I;l[m]=w*O-p(m)*r[m]}const d=(n[1]-n[0])/I;l[0]=w*d-p(0)*r[0];const L=(n[e-2]-n[e-3])/I;return l[e-1]=w*L-p(e-1)*r[e-1],l}function v(r,n,x){const l=new Float64Array(e);for(let d=0;d<e-1;d++){const L=(r[d+1]-r[d])/I,m=c(d+.5,x);l[d]=w*L-k(d)*n[d]+m}return l}function N(){const r=new Float64Array(e),n=new Float64Array(e),x=T(s,b),l=v(s,b,y);for(let o=0;o<e;o++)r[o]=s[o]+.5*g*x[o],n[o]=b[o]+.5*g*l[o];const d=T(r,n),L=v(r,n,y+.5*g);for(let o=0;o<e;o++)r[o]=s[o]+.5*g*d[o],n[o]=b[o]+.5*g*L[o];const m=T(r,n),O=v(r,n,y+.5*g);for(let o=0;o<e;o++)r[o]=s[o]+g*m[o],n[o]=b[o]+g*O[o];const q=T(r,n),E=v(r,n,y+g);for(let o=1;o<e-1;o++)s[o]+=g/6*(x[o]+2*d[o]+2*m[o]+q[o]),b[o]+=g/6*(l[o]+2*L[o]+2*O[o]+E[o]);y+=g}const B=t`<div></div>`;let U=0,f,A=!1;function X(){if(A){for(let r=0;r<5;r++)N();if(U++,U%2===0){const r=Array.from({length:e},(l,d)=>({x:d,u:s[d],sigma:p(d)})),n=50,x=P.plot({width:640,height:300,marginLeft:50,x:{label:"Position",domain:[0,e]},y:{label:"u(x,t)",domain:[-n,n]},marks:[P.ruleX(r,{x:"x",y1:-n,y2:n,stroke:"#DDA0DD",strokeWidth:3,strokeOpacity:l=>l.sigma>0?.3:0}),P.dot(r,{x:"x",y:"u",fill:"steelblue",r:2})]});B.replaceChildren(x)}f=requestAnimationFrame(X)}}const D=new i(r=>{r.forEach(n=>{A=n.isIntersecting,A?f||X():f&&(cancelAnimationFrame(f),f=null)})});return D.observe(B),R.then(()=>{f&&cancelAnimationFrame(f),D.disconnect()}),S(B),{Plot:P,N:e,PML_EXPONENT:F,C:w,DX:I,DT:g,OSCILLATOR_STRENGTH:h,OSCILLATOR_WAVELENGTH:M,u:s,v:b,t:y,sigma_at_position:C,sigma:p,sigma_v:k,forcing:c,dudt:T,dvdt:v,step:N,container:B,frameCount:U,animationId:f,isVisible:A,animate:X,observer:D}},inputs:["params_1d","html","IntersectionObserver","invalidation","display"],outputs:["Plot","N","PML_EXPONENT","C","DX","DT","OSCILLATOR_STRENGTH","OSCILLATOR_WAVELENGTH","u","v","t","sigma_at_position","sigma","sigma_v","forcing","dudt","dvdt","step","container","frameCount","animationId","isVisible","animate","observer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(a,t)=>a`The 2D case follows the same principles but with a key difference: we need separate absorption coefficients ${t`\sigma_x`} and ${t`\sigma_y`} for each spatial direction. When we apply the complex coordinate mapping independently to both ${t`x`} and ${t`y`} derivatives, cross-terms emerge that don't appear in 1D. These cross-terms require an auxiliary field ${t`\psi`} to handle the coupling between the two spatial directions within the PML regions.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-54"),expanded:[],variables:[]},{id:54,body:(a,t)=>a`The derivation below shows how these auxiliary variables arise naturally from the Fourier domain analysis. In regions where only one direction has absorption (e.g., ${t`\sigma_x > 0`} but ${t`\sigma_y = 0`}), the equations simplify. The full complexity only appears in corner regions where both directions have non-zero absorption.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-38"),expanded:[],variables:[]},{id:38,body:(a,t)=>a`We start with the scalar wave equation in first-order form,

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c (\nabla \cdot \mathbf{v}) \\[10pt]
\frac{\partial v_x}{\partial t} &= c \frac{\partial u}{\partial x} \\[10pt]
\frac{\partial v_y}{\partial t} &= c \frac{\partial u}{\partial y}.
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-39"),expanded:[],variables:[]},{id:39,body:(a,t)=>a`Following the same approach as in 1D, we transform to the Fourier time domain, replacing ${t`\frac{\partial}{\partial t}`} with ${t`-i\omega`}

${t.block`\begin{aligned}
-i\omega u &= c \frac{\partial v_x}{\partial x} + c \frac{\partial v_y}{\partial y} \\[10pt]
-i\omega v_x &= c \frac{\partial u}{\partial x} \\[10pt]
-i\omega v_y &= c \frac{\partial u}{\partial y}.
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-40"),expanded:[],variables:[]},{id:40,body:(a,t)=>a`The PML technique replaces spatial derivatives with complex coordinate mappings

${t.block`\frac{\partial}{\partial x} \rightarrow \frac{1}{1 + i\frac{\sigma_x}{\omega}} \frac{\partial}{\partial x}, \quad \frac{\partial}{\partial y} \rightarrow \frac{1}{1 + i\frac{\sigma_y}{\omega}} \frac{\partial}{\partial y}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-41"),expanded:[],variables:[]},{id:41,body:(a,t)=>a`Applying the mapping to the velocity equations and multiplying through by the denominators yields

${t.block`\begin{aligned}
-i\omega v_x - \sigma_x v_x &= c \frac{\partial u}{\partial x} \\[10pt]
-i\omega v_y - \sigma_y v_y &= c \frac{\partial u}{\partial y}
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-42"),expanded:[],variables:[]},{id:42,body:(a,t)=>a`Transforming back to the time domain immediately gives

${t.block`\begin{aligned}
\frac{\partial v_x}{\partial t} &= c \frac{\partial u}{\partial x} - \sigma_x v_x \\[10pt]
\frac{\partial v_y}{\partial t} &= c \frac{\partial u}{\partial y} - \sigma_y v_y.
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-43"),expanded:[],variables:[]},{id:43,body:(a,t)=>a`The equation for ${t`u`} is more involved. Applying the PML mapping gives

${t.block`-i\omega u = c \left(\frac{1}{1 + i\frac{\sigma_x}{\omega}} \frac{\partial v_x}{\partial x} + \frac{1}{1 + i\frac{\sigma_y}{\omega}} \frac{\partial v_y}{\partial y}\right)`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-44"),expanded:[],variables:[]},{id:44,body:(a,t)=>a`Expanding and collecting terms yields

${t.block`\begin{aligned}
-i\omega u &= c \left(\frac{\partial v_x}{\partial x} + \frac{\partial v_y}{\partial y}\right) - (\sigma_x + \sigma_y) u \\
&\quad + \left(\frac{ic\sigma_x}{\omega} \frac{\partial v_y}{\partial y} + \frac{ic\sigma_y}{\omega} \frac{\partial v_x}{\partial x} - \frac{i}{\omega} \sigma_x \sigma_y u\right)
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-45"),expanded:[],variables:[]},{id:45,body:(a,t)=>a`Except for the last term, we can transform this back into the time domain to obtain an equation analogous to the 1D case. However, the term in parentheses contains factors of ${t`\frac{i}{\omega}`} which correspond to time integration. In other words, the equation mostly translates back into the time domain just fine, but we end up with one additional quantity we need to track and integrate along with the other state variables. We define the term in parentheses as the auxiliary quantity ${t`\psi,`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-46"),expanded:[],variables:[]},{id:46,body:(a,t)=>a`${t.block`\psi = \frac{ic\sigma_x}{\omega} \frac{\partial v_y}{\partial y} + \frac{ic\sigma_y}{\omega} \frac{\partial v_x}{\partial x} - \frac{i}{\omega} \sigma_x \sigma_y u`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-47"),expanded:[],variables:[]},{id:47,body:(a,t)=>a`Multiplying through by ${t`-i\omega`} and transforming back to the time domain gives

${t.block`\frac{d\psi}{dt} = c \sigma_x \frac{\partial v_y}{\partial y} + c \sigma_y \frac{\partial v_x}{\partial x} - \sigma_x \sigma_y u`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-48"),expanded:[],variables:[]},{id:48,body:(a,t)=>a`The update equation for ${t`u`} then becomes

${t.block`\frac{du}{dt} = c (\nabla \cdot \mathbf{v}) - (\sigma_x + \sigma_y) u + \psi.`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(a,t)=>a`Together with the velocity equations, we have the complete 2D PML system

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c (\nabla \cdot \mathbf{v}) - (\sigma_x + \sigma_y) u + \psi \\[10pt]
\frac{\partial \psi}{\partial t} &= c \sigma_x \frac{\partial v_y}{\partial y} + c \sigma_y \frac{\partial v_x}{\partial x} - \sigma_x \sigma_y u \\[10pt]
\frac{\partial v_x}{\partial t} &= c \frac{\partial u}{\partial x} - \sigma_x v_x \\[10pt]
\frac{\partial v_y}{\partial t} &= c \frac{\partial u}{\partial y} - \sigma_y v_y
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-49"),expanded:[],variables:[]},{id:49,body:(a,t)=>a`These equations require tracking three fields: the scalar field ${t`u`}, the auxiliary field ${t`\psi`}, and the vector field ${t`\mathbf{v} = (v_x, v_y)`}. In practice, this naturally lends itself to a two-buffer implementation: one storing ${t`(u, \psi)`} and the other storing ${t`(v_x, v_y)`}. The two buffers are offset by half a timestep to avoid some of the common instabilities encountered when simulating wave equations.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-50"),expanded:[],variables:[]},{id:50,body:(a,t)=>a`The following WebGL implementation simulates these equations on the GPU using fragment shaders. Use the controls below to pause/resume the simulation, adjust contrast, and visualize the PML absorption regions (red for ${t`\sigma_x`}, green for ${t`\sigma_y`}).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:a=>{const t=a`<canvas width="640" height="640" style="width: 100%; height: auto; display: block; image-rendering: pixelated; touch-action: none;"></canvas>`,i=t.getContext("webgl2");if(!i)throw new Error("WebGL 2 is not supported");const R=i.getExtension("EXT_color_buffer_float");if(!R)throw new Error("EXT_color_buffer_float extension is not supported");const S=i.getExtension("OES_texture_float_linear"),P=S!==null,e=12,F=2,w=1,I=4,g=10,h=1,M=.5,s=1,b=`#version 300 es
    in vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,y=`
    const float PML_WIDTH = ${e.toFixed(1)};
    const float PML_EXPONENT = ${F.toFixed(1)};
    const float PML_STRENGTH = ${w.toFixed(1)};
    const float OSCILLATOR_STRENGTH = ${I.toFixed(1)};
    const float OSCILLATOR_WAVELENGTH = ${g.toFixed(1)};
    const float C = ${h.toFixed(1)};
    const float DT = ${M.toFixed(1)};
    const float DX = ${s.toFixed(1)};
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
  `,C=`#version 300 es
    precision highp float;
    ${y}
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
  `,p=`#version 300 es
    precision highp float;
    ${y}
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
  `,k=`#version 300 es
    precision highp float;
    ${y}
    uniform sampler2D u_bufferA;
    uniform vec2 u_canvasResolution;
    uniform vec2 u_simResolution;
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
      vec2 uv = gl_FragCoord.xy / u_canvasResolution;
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
        // Map canvas coords to sim coords for PML visualization
        vec2 simCoord = gl_FragCoord.xy * u_simResolution / u_canvasResolution;
        vec2 s = sqrt(sigmaDisplay(simCoord, u_simResolution, u_pmlWidth));  // sqrt for better low-value contrast
        fragColor = mix(fragColor, vec4(1.0, 0.0, 0.0, 1.0), s.x * 0.7);  // Pink for x-direction
        fragColor = mix(fragColor, vec4(0.0, 1.0, 0.0, 1.0), s.y * 0.7);  // Green for y-direction
      }
    }
  `;function c(E,o){const _=i.createShader(o);if(i.shaderSource(_,E),i.compileShader(_),!i.getShaderParameter(_,i.COMPILE_STATUS)){const W=i.getShaderInfoLog(_);throw console.error("Shader compilation error:",W),console.error("Shader source:",E),i.deleteShader(_),new Error("Shader compilation failed: "+W)}return _}function T(E,o){const _=c(E,i.VERTEX_SHADER),W=c(o,i.FRAGMENT_SHADER),$=i.createProgram();if(i.attachShader($,_),i.attachShader($,W),i.linkProgram($),!i.getProgramParameter($,i.LINK_STATUS)){const H=i.getProgramInfoLog($);throw console.error("Program linking error:",H),new Error("Program linking failed: "+H)}return $}const v=T(b,C),N=T(b,p),B=T(b,k),U=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,U),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),i.STATIC_DRAW);function f(E,o){const _=i.createTexture();i.bindTexture(i.TEXTURE_2D,_),i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,E,o,0,i.RGBA,i.FLOAT,null);const W=P?i.LINEAR:i.NEAREST;i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,W),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,W),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);const $=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,$),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,_,0),{fbo:$,texture:_}}const A=t.width,X=t.height,D={pixelRatio:.5},r=()=>Math.floor(A*D.pixelRatio),n=()=>Math.floor(X*D.pixelRatio),x=[f(r(),n()),f(r(),n())],l=[f(r(),n()),f(r(),n())];let d=0;const L=[],m={x:-1e3,y:-1e3,lastMoveTime:-1e4,isMoving:!1,isActive:!1};t.addEventListener("pointerenter",E=>{const o=t.getBoundingClientRect(),_=(E.clientX-o.left)*r()/o.width,W=n()-(E.clientY-o.top)*n()/o.height;L.push({x:_,y:W,time:performance.now()})}),t.addEventListener("pointermove",E=>{const o=t.getBoundingClientRect(),_=(E.clientX-o.left)*r()/o.width,W=n()-(E.clientY-o.top)*n()/o.height;L.push({x:_,y:W,time:performance.now()})}),t.addEventListener("pointerleave",E=>{m.x=-1e3,m.y=-1e3,m.lastMoveTime=-1e4,m.isMoving=!1,m.isActive=!1});const O={usePsi:1,showSigma:0,contrast:.454,pmlWidth:12,mouseX:-1e3,mouseY:-1e3,mouseMoving:0,mouseActive:0};return{canvas:t,gl:i,ext:R,linearExt:S,useLinearFiltering:P,PML_WIDTH:e,PML_EXPONENT:F,PML_STRENGTH:w,OSCILLATOR_STRENGTH:I,OSCILLATOR_WAVELENGTH:g,C:h,DT:M,DX:s,vertexShaderSource:b,commonSource:y,bufferASource:C,bufferBSource:p,displaySource:k,compileShader:c,createProgram:T,bufferAProgram:v,bufferBProgram:N,displayProgram:B,quadBuffer:U,createFramebuffer:f,canvasWidth:A,canvasHeight:X,params:D,getSimWidth:r,getSimHeight:n,bufferA:x,bufferB:l,currentBuffer:d,pointerQueue:L,mouseState:m,uniforms:O,webgl_setup:{canvas:t,gl:i,canvasWidth:A,canvasHeight:X,params:D,getSimWidth:r,getSimHeight:n,bufferAProgram:v,bufferBProgram:N,displayProgram:B,quadBuffer:U,bufferA:x,bufferB:l,mouseState:m,uniforms:O,pointerQueue:L}}},inputs:["html"],outputs:["canvas","gl","ext","linearExt","useLinearFiltering","PML_WIDTH","PML_EXPONENT","PML_STRENGTH","OSCILLATOR_STRENGTH","OSCILLATOR_WAVELENGTH","C","DT","DX","vertexShaderSource","commonSource","bufferASource","bufferBSource","displaySource","compileShader","createProgram","bufferAProgram","bufferBProgram","displayProgram","quadBuffer","createFramebuffer","canvasWidth","canvasHeight","params","getSimWidth","getSimHeight","bufferA","bufferB","currentBuffer","pointerQueue","mouseState","uniforms","webgl_setup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(a,t,i,R,S)=>{a.uniforms.usePsi=t?1:0,a.uniforms.showSigma=i?1:0,a.uniforms.contrast=Math.max(100**R,.1),a.uniforms.pmlWidth=S},inputs:["webgl_setup","usePsi","showSigma","contrast","pmlWidth"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:(a,t,i,R,S)=>{const{canvas:P,gl:e,canvasWidth:F,canvasHeight:w,getSimWidth:I,getSimHeight:g,bufferAProgram:h,bufferBProgram:M,displayProgram:s,quadBuffer:b,bufferA:y,bufferB:C,mouseState:p,pointerQueue:k,uniforms:c}=a;let T=0,v,N=!1;function B(){if(!N)return;const f=I(),A=g(),X=performance.now();for(;k.length>0;){const n=k.shift();p.x=n.x,p.y=n.y,p.lastMoveTime=n.time}const D=X-p.lastMoveTime;if(p.isMoving=D<100,p.isActive=D<6e3,c.mouseX=p.x,c.mouseY=p.y,c.mouseMoving=p.isMoving?1:0,c.mouseActive=p.isActive?1:0,!t){e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,F,w),e.useProgram(s);const n=e.getAttribLocation(s,"a_position");e.bindBuffer(e.ARRAY_BUFFER,b),e.enableVertexAttribArray(n),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,y[T].texture),e.uniform1i(e.getUniformLocation(s,"u_bufferA"),0),e.uniform2f(e.getUniformLocation(s,"u_canvasResolution"),F,w),e.uniform2f(e.getUniformLocation(s,"u_simResolution"),f,A),e.uniform1f(e.getUniformLocation(s,"u_showSigma"),c.showSigma),e.uniform1f(e.getUniformLocation(s,"u_contrast"),c.contrast),e.uniform1f(e.getUniformLocation(s,"u_pmlWidth"),c.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),v=requestAnimationFrame(B);return}for(let n=0;n<2;n++){const x=T,l=1-T;e.bindFramebuffer(e.FRAMEBUFFER,y[l].fbo),e.viewport(0,0,f,A),e.useProgram(h);const d=e.getAttribLocation(h,"a_position");e.bindBuffer(e.ARRAY_BUFFER,b),e.enableVertexAttribArray(d),e.vertexAttribPointer(d,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,y[x].texture),e.uniform1i(e.getUniformLocation(h,"u_bufferA"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,C[x].texture),e.uniform1i(e.getUniformLocation(h,"u_bufferB"),1),e.uniform2f(e.getUniformLocation(h,"u_resolution"),f,A),e.uniform1f(e.getUniformLocation(h,"u_pmlWidth"),c.pmlWidth),e.uniform1f(e.getUniformLocation(h,"u_usePsi"),c.usePsi),e.uniform1f(e.getUniformLocation(h,"u_mouseX"),c.mouseX),e.uniform1f(e.getUniformLocation(h,"u_mouseY"),c.mouseY),e.uniform1f(e.getUniformLocation(h,"u_mouseMoving"),c.mouseMoving),e.uniform1f(e.getUniformLocation(h,"u_mouseActive"),c.mouseActive),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,C[l].fbo),e.useProgram(M);const L=e.getAttribLocation(M,"a_position");e.bindBuffer(e.ARRAY_BUFFER,b),e.enableVertexAttribArray(L),e.vertexAttribPointer(L,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,y[l].texture),e.uniform1i(e.getUniformLocation(M,"u_bufferA"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,C[x].texture),e.uniform1i(e.getUniformLocation(M,"u_bufferB"),1),e.uniform2f(e.getUniformLocation(M,"u_resolution"),f,A),e.uniform1f(e.getUniformLocation(M,"u_pmlWidth"),c.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),T=l}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,F,w),e.useProgram(s);const r=e.getAttribLocation(s,"a_position");e.bindBuffer(e.ARRAY_BUFFER,b),e.enableVertexAttribArray(r),e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,y[T].texture),e.uniform1i(e.getUniformLocation(s,"u_bufferA"),0),e.uniform2f(e.getUniformLocation(s,"u_canvasResolution"),F,w),e.uniform2f(e.getUniformLocation(s,"u_simResolution"),f,A),e.uniform1f(e.getUniformLocation(s,"u_showSigma"),c.showSigma),e.uniform1f(e.getUniformLocation(s,"u_contrast"),c.contrast),e.uniform1f(e.getUniformLocation(s,"u_pmlWidth"),c.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),v=requestAnimationFrame(B)}const U=new i(f=>{f.forEach(A=>{N=A.isIntersecting,N?v||(v=requestAnimationFrame(B)):v&&(cancelAnimationFrame(v),v=null)})});return U.observe(P),R.then(()=>{v&&cancelAnimationFrame(v),U.disconnect()}),P.style.border="1px solid #eee",S(P),{canvas:P,gl:e,canvasWidth:F,canvasHeight:w,getSimWidth:I,getSimHeight:g,bufferAProgram:h,bufferBProgram:M,displayProgram:s,quadBuffer:b,bufferA:y,bufferB:C,mouseState:p,pointerQueue:k,uniforms:c,currentBuffer:T,animationId:v,isVisible:N,render:B,observer:U}},inputs:["webgl_setup","simulate","IntersectionObserver","invalidation","display"],outputs:["canvas","gl","canvasWidth","canvasHeight","getSimWidth","getSimHeight","bufferAProgram","bufferBProgram","displayProgram","quadBuffer","bufferA","bufferB","mouseState","pointerQueue","uniforms","currentBuffer","animationId","isVisible","render","observer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(a,t)=>{const i=a(t.toggle({label:"Simulate",value:!0})),R=a(t.toggle({label:"Use auxiliary ψ equation",value:!0})),S=a(t.toggle({label:"Show absorption regions",value:!1})),P=a(t.range([0,1],{label:"Contrast",step:.01,value:0})),e=a(t.range([4,40],{label:"PML width (pixels)",step:1,value:12}));return{simulate:i,usePsi:R,showSigma:S,contrast:P,pmlWidth:e}},inputs:["view","Inputs"],outputs:["simulate","usePsi","showSigma","contrast","pmlWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
