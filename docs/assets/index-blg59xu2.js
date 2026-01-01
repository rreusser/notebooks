import{d as h,_ as G}from"./index-ByB2dbry.js";h({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:(i,t)=>i`## The 1D Wave Equation

We'll start with the scalar wave equation in 1D, written in first-order form:

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c \frac{\partial v}{\partial x} \\[10pt]
\frac{\partial v}{\partial t} &= c \frac{\partial u}{\partial x}
\end{aligned}`}

Here ${t`u`} is the scalar field (e.g., pressure or displacement), ${t`v`} is the velocity field, and ${t`c`} is the wave speed. This first-order form is equivalent to the standard second-order wave equation ${t`\frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2}`} but makes the PML derivation clearer.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:(i,t)=>i`## 1D PML Derivation

To derive the PML equations, we work in the Fourier time domain, replacing ${t`\frac{\partial}{\partial t}`} with ${t`-i\omega`}:

${t.block`\begin{aligned}
-i\omega u &= c \frac{\partial v}{\partial x} \\[10pt]
-i\omega v &= c \frac{\partial u}{\partial x}
\end{aligned}`}

The PML technique replaces spatial derivatives with a complex coordinate mapping:

${t.block`\frac{\partial}{\partial x} \rightarrow \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial}{\partial x}`}

where ${t`\sigma(x) \geq 0`} is the absorption strength. This stretching causes waves to decay exponentially in regions where ${t`\sigma > 0`}.

Applying this mapping:

${t.block`\begin{aligned}
-i\omega u &= c \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial v}{\partial x} \\[10pt]
-i\omega v &= c \frac{1}{1 + i\frac{\sigma}{\omega}} \frac{\partial u}{\partial x}
\end{aligned}`}

Multiplying both sides by ${t`1 + i\frac{\sigma}{\omega}`}:

${t.block`\begin{aligned}
-i\omega u - \sigma u &= c \frac{\partial v}{\partial x} \\[10pt]
-i\omega v - \sigma v &= c \frac{\partial u}{\partial x}
\end{aligned}`}

Transforming back to the time domain gives the final 1D PML equations:

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c \frac{\partial v}{\partial x} - \sigma u \\[10pt]
\frac{\partial v}{\partial t} &= c \frac{\partial u}{\partial x} - \sigma v
\end{aligned}`}

In the interior where ${t`\sigma = 0`}, these reduce to the original wave equation. In the PML regions, ${t`\sigma > 0`} causes exponential absorption. Note that unlike the 2D case, no auxiliary field is needed in 1D since there are no cross-terms between different directions.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(i,t)=>i`## 1D Visualization

The plot below shows a 1D wave propagating with PML absorbing boundaries on both ends. The shaded regions indicate where ${t`\sigma > 0`}. Notice how waves exit the domain smoothly without reflecting.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-5"),expanded:[],variables:[]},{id:5,body:()=>({params_1d:{pmlWidth:6,pmlStrength:2,frequency:.1}}),inputs:[],outputs:["params_1d"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-6"),expanded:[],variables:[]},{id:6,body:(i,t)=>{const a=i(t.range([1,40],{label:"PML width (grid points)",step:1,value:6})),A=i(t.range([.1,5],{label:"PML strength",step:.1,value:2})),I=i(t.range([.025,.2],{label:"Oscillator frequency",step:.005,value:.1}));return{pmlWidth1d:a,pmlStrength1d:A,frequency1d:I}},inputs:["view","Inputs"],outputs:["pmlWidth1d","pmlStrength1d","frequency1d"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(i,t,a,A)=>{i.pmlWidth=t,i.pmlStrength=a,i.frequency=A},inputs:["params_1d","pmlWidth1d","pmlStrength1d","frequency1d"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:async(i,t,a,A,I)=>{const W=await G(()=>import("https://cdn.jsdelivr.net/npm/@observablehq/plot/+esm"),[]),l=200,U=2,e=1,b=1,f=.1*b/e,y=4,L=10,c=new Float64Array(l),T=new Float64Array(l);let E=0;function C(n){const o=n,F=l-1-n;let g=0;return o<i.pmlWidth&&(g=Math.max(g,Math.pow((i.pmlWidth-o)/i.pmlWidth,U)*i.pmlStrength)),F<i.pmlWidth&&(g=Math.max(g,Math.pow((i.pmlWidth-F)/i.pmlWidth,U)*i.pmlStrength)),g}function d(n){return C(n)}function P(n){return C(n+.5)}function w(n,o){const g=Math.exp(-Math.pow(Math.abs((o%300-150)/40),4)),s=5,m=e*Math.PI*i.frequency,u=.1/i.frequency;let v=0;for(let D=0;D<s;D++){const O=(D-s*.5)/s*20,r=l/2+O,k=Math.abs(n-r),X=Math.exp(-Math.pow(k/3,2)),q=Math.sin(m*o/(D+1));v+=q*X*y*u*g}return v}function M(n,o,F){const g=new Float64Array(l);for(let u=1;u<l-1;u++){const v=(o[u]-o[u-1])/b;g[u]=e*v-d(u)*n[u]}const s=(o[1]-o[0])/b;g[0]=e*s-d(0)*n[0];const m=(o[l-2]-o[l-3])/b;return g[l-1]=e*m-d(l-1)*n[l-1],g}function S(n,o,F){const g=new Float64Array(l);for(let s=0;s<l-1;s++){const m=(n[s+1]-n[s])/b,u=w(s+.5,F);g[s]=e*m-P(s)*o[s]+u}return g}function B(){const n=new Float64Array(l),o=new Float64Array(l),F=M(c,T),g=S(c,T,E);for(let r=0;r<l;r++)n[r]=c[r]+.5*f*F[r],o[r]=T[r]+.5*f*g[r];const s=M(n,o),m=S(n,o,E+.5*f);for(let r=0;r<l;r++)n[r]=c[r]+.5*f*s[r],o[r]=T[r]+.5*f*m[r];const u=M(n,o),v=S(n,o,E+.5*f);for(let r=0;r<l;r++)n[r]=c[r]+f*u[r],o[r]=T[r]+f*v[r];const D=M(n,o),O=S(n,o,E+f);for(let r=1;r<l-1;r++)c[r]+=f/6*(F[r]+2*s[r]+2*u[r]+D[r]),T[r]+=f/6*(g[r]+2*m[r]+2*v[r]+O[r]);E+=f}const R=t`<div></div>`;let _=0,p,x=!1;function $(){if(x){for(let n=0;n<5;n++)B();if(_++,_%2===0){const n=Array.from({length:l},(g,s)=>({x:s,u:c[s],sigma:d(s)})),o=50,F=W.plot({width:640,height:300,marginLeft:50,x:{label:"Position",domain:[0,l]},y:{label:"u(x,t)",domain:[-o,o]},marks:[W.ruleX(n,{x:"x",y1:-o,y2:o,stroke:"#DDA0DD",strokeWidth:3,strokeOpacity:g=>g.sigma>0?.3:0}),W.dot(n,{x:"x",y:"u",fill:"steelblue",r:2})]});R.replaceChildren(F)}p=requestAnimationFrame($)}}const N=new a(n=>{n.forEach(o=>{x=o.isIntersecting,x?p||$():p&&(cancelAnimationFrame(p),p=null)})});return N.observe(R),A.then(()=>{p&&cancelAnimationFrame(p),N.disconnect()}),I(R),{Plot:W,N:l,PML_EXPONENT:U,C:e,DX:b,DT:f,OSCILLATOR_STRENGTH:y,OSCILLATOR_WAVELENGTH:L,u:c,v:T,t:E,sigma_at_position:C,sigma:d,sigma_v:P,forcing:w,dudt:M,dvdt:S,step:B,container:R,frameCount:_,animationId:p,isVisible:x,animate:$,observer:N}},inputs:["params_1d","html","IntersectionObserver","invalidation","display"],outputs:["Plot","N","PML_EXPONENT","C","DX","DT","OSCILLATOR_STRENGTH","OSCILLATOR_WAVELENGTH","u","v","t","sigma_at_position","sigma","sigma_v","forcing","dudt","dvdt","step","container","frameCount","animationId","isVisible","animate","observer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(i,t)=>i`## Extension to 2D

The 2D case follows the same principles but requires separate absorption coefficients ${t`\sigma_x`} and ${t`\sigma_y`} for each spatial direction.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(i,t)=>i`## The 2D Update Equations

The simulation uses two sets of quantities. The scalar field ${t`u`} and auxiliary field ${t`\psi`} are defined at integer time steps and integrated according to:

${t.block`\begin{aligned}
\frac{du}{dt} &= c (\nabla \cdot \mathbf{v}) - (\sigma_x + \sigma_y) u + \psi \\[10pt]
\frac{d\psi}{dt} &= c \sigma_x \frac{\partial v_y}{\partial y} + c \sigma_y \frac{\partial v_x}{\partial x} - \sigma_x \sigma_y u
\end{aligned}`}

Here, ${t`\sigma_x`} and ${t`\sigma_y`} are the PML layer strengths in the x- and y-directions, ${t`c`} is the wave speed, and ${t`\psi`} is an auxiliary quantity whose derivation is described below.

The vector field ${t`\mathbf{v} = (v_x, v_y)`} is defined at half-integer timesteps and integrated in a leap-frog manner:

${t.block`\begin{aligned}
\frac{\partial v_x}{\partial t} &= c \frac{\partial u}{\partial x} - \sigma_x v_x \\[10pt]
\frac{\partial v_y}{\partial t} &= c \frac{\partial u}{\partial y} - \sigma_y v_y
\end{aligned}`}

This naturally lends itself to two buffers: one storing ${t`u`} and ${t`\psi`}, the other storing ${t`v_x`} and ${t`v_y`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:(i,t)=>i`## Derivation

We start with the scalar wave equation in first-order form:

${t.block`\begin{aligned}
\frac{\partial u}{\partial t} &= c (\nabla \cdot \mathbf{v}) \\[10pt]
\frac{\partial v_x}{\partial t} &= c \frac{\partial u}{\partial x} \\[10pt]
\frac{\partial v_y}{\partial t} &= c \frac{\partial u}{\partial y}
\end{aligned}`}

This form restricts spatial derivatives to first derivatives, which makes application of PML easier. You can verify by direct substitution that this is equivalent to the standard second-order form ${t`\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u`}.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(i,t)=>i`## Fourier Time Domain

We operate in the Fourier time domain, replacing ${t`\frac{\partial}{\partial t}`} with ${t`-i\omega`}:

${t.block`\begin{aligned}
-i\omega u &= c \frac{\partial v_x}{\partial x} + c \frac{\partial v_y}{\partial y} \\[10pt]
-i\omega v_x &= c \frac{\partial u}{\partial x} \\[10pt]
-i\omega v_y &= c \frac{\partial u}{\partial y}
\end{aligned}`}`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(i,t)=>i`## PML Coordinate Mapping

We replace the spatial derivatives with the PML mapping:

${t.block`\frac{\partial}{\partial x} = \frac{1}{1 + i\frac{\sigma_x}{\omega}} \frac{\partial}{\partial x}`}

and correspondingly for ${t`\frac{\partial}{\partial y}`}. This complex coordinate stretching causes waves to decay exponentially in the PML region.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:(i,t)=>i`## Velocity Update Equations

Applying the PML mapping to the velocity equations and reorganizing terms:

${t.block`-i\omega v_x = c \frac{1}{1 + i\frac{\sigma_x}{\omega}} \frac{\partial u}{\partial x}`}

Multiplying both sides by ${t`1 + i\frac{\sigma_x}{\omega}`}:

${t.block`-i\omega v_x - \sigma_x v_x = c \frac{\partial u}{\partial x}`}

Transforming back to the time domain immediately yields:

${t.block`\frac{\partial v_x}{\partial t} = c \frac{\partial u}{\partial x} - \sigma_x v_x`}

The equation for ${t`v_y`} follows identically.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:(i,t)=>i`## Scalar Field Update Equation

The equation for ${t`u`} is more involved. Applying the PML mapping:

${t.block`-i\omega u = c \left(\frac{1}{1 + i\frac{\sigma_x}{\omega}} \frac{\partial v_x}{\partial x} + \frac{1}{1 + i\frac{\sigma_y}{\omega}} \frac{\partial v_y}{\partial y}\right)`}

Expanding and collecting terms:

${t.block`-i\omega u = c \left(\frac{\partial v_x}{\partial x} + \frac{\partial v_y}{\partial y}\right) - (\sigma_x + \sigma_y) u + \left(\frac{ic\sigma_x}{\omega} \frac{\partial v_y}{\partial y} + \frac{ic\sigma_y}{\omega} \frac{\partial v_x}{\partial x} - \frac{i}{\omega} \sigma_x \sigma_y u\right)`}

The term in parentheses contains factors of ${t`\frac{i}{\omega}`}, which corresponds to time integration. We define this as the auxiliary quantity ${t`\psi`}:

${t.block`\psi = \frac{ic\sigma_x}{\omega} \frac{\partial v_y}{\partial y} + \frac{ic\sigma_y}{\omega} \frac{\partial v_x}{\partial x} - \frac{i}{\omega} \sigma_x \sigma_y u`}

Multiplying through by ${t`-i\omega`} and transforming back to the time domain:

${t.block`\frac{d\psi}{dt} = c \sigma_x \frac{\partial v_y}{\partial y} + c \sigma_y \frac{\partial v_x}{\partial x} - \sigma_x \sigma_y u`}

The update equation for ${t`u`} becomes:

${t.block`\frac{du}{dt} = c (\nabla \cdot \mathbf{v}) - (\sigma_x + \sigma_y) u + \psi`}

These are the equations we implement in the simulation below.`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:(i,t)=>i`## Implementation

The following WebGL implementation simulates these equations on the GPU using fragment shaders. Use the controls below to pause/resume the simulation, adjust contrast, and visualize the PML absorption regions (red for ${t`\sigma_x`}, green for ${t`\sigma_y`}).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});h({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:i=>{const t=i`<canvas width="800" height="800" style="width: 100%; max-width: 800px; height: auto; display: block; image-rendering: pixelated;"></canvas>`,a=t.getContext("webgl2");if(!a)throw new Error("WebGL 2 is not supported");const A=a.getExtension("EXT_color_buffer_float");if(!A)throw new Error("EXT_color_buffer_float extension is not supported");const I=12,W=2,l=1,U=4,e=10,b=1,f=.5,y=1,L=`#version 300 es
    in vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,c=`
    const float PML_WIDTH = ${I.toFixed(1)};
    const float PML_EXPONENT = ${W.toFixed(1)};
    const float PML_STRENGTH = ${l.toFixed(1)};
    const float OSCILLATOR_STRENGTH = ${U.toFixed(1)};
    const float OSCILLATOR_WAVELENGTH = ${e.toFixed(1)};
    const float C = ${b.toFixed(1)};
    const float DT = ${f.toFixed(1)};
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
  `;function d(s,m){const u=a.createShader(m);if(a.shaderSource(u,s),a.compileShader(u),!a.getShaderParameter(u,a.COMPILE_STATUS)){const v=a.getShaderInfoLog(u);throw console.error("Shader compilation error:",v),console.error("Shader source:",s),a.deleteShader(u),new Error("Shader compilation failed: "+v)}return u}function P(s,m){const u=d(s,a.VERTEX_SHADER),v=d(m,a.FRAGMENT_SHADER),D=a.createProgram();if(a.attachShader(D,u),a.attachShader(D,v),a.linkProgram(D),!a.getProgramParameter(D,a.LINK_STATUS)){const O=a.getProgramInfoLog(D);throw console.error("Program linking error:",O),new Error("Program linking failed: "+O)}return D}const w=P(L,T),M=P(L,E),S=P(L,C),B=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,B),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),a.STATIC_DRAW);function R(s,m){const u=a.createTexture();a.bindTexture(a.TEXTURE_2D,u),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32F,s,m,0,a.RGBA,a.FLOAT,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);const v=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,v),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,u,0),{fbo:v,texture:u}}const _=t.width,p=t.height,x=[R(_,p),R(_,p)],$=[R(_,p),R(_,p)];let N=0;const n=[],o={x:-1e3,y:-1e3,lastMoveTime:-1e4,isMoving:!1,isActive:!1};t.addEventListener("pointerenter",s=>{const m=t.getBoundingClientRect(),u=(s.clientX-m.left)*_/m.width,v=p-(s.clientY-m.top)*p/m.height;n.push({x:u,y:v,time:performance.now()})}),t.addEventListener("pointermove",s=>{const m=t.getBoundingClientRect(),u=(s.clientX-m.left)*_/m.width,v=p-(s.clientY-m.top)*p/m.height;n.push({x:u,y:v,time:performance.now()})}),t.addEventListener("pointerleave",s=>{o.x=-1e3,o.y=-1e3,o.lastMoveTime=-1e4,o.isMoving=!1,o.isActive=!1});const F={usePsi:1,showSigma:0,contrast:.454,pmlWidth:12,mouseX:-1e3,mouseY:-1e3,mouseMoving:0,mouseActive:0};return{canvas:t,gl:a,ext:A,PML_WIDTH:I,PML_EXPONENT:W,PML_STRENGTH:l,OSCILLATOR_STRENGTH:U,OSCILLATOR_WAVELENGTH:e,C:b,DT:f,DX:y,vertexShaderSource:L,commonSource:c,bufferASource:T,bufferBSource:E,displaySource:C,compileShader:d,createProgram:P,bufferAProgram:w,bufferBProgram:M,displayProgram:S,quadBuffer:B,createFramebuffer:R,width:_,height:p,bufferA:x,bufferB:$,currentBuffer:N,pointerQueue:n,mouseState:o,uniforms:F,webgl_setup:{canvas:t,gl:a,width:_,height:p,bufferAProgram:w,bufferBProgram:M,displayProgram:S,quadBuffer:B,bufferA:x,bufferB:$,mouseState:o,uniforms:F}}},inputs:["html"],outputs:["canvas","gl","ext","PML_WIDTH","PML_EXPONENT","PML_STRENGTH","OSCILLATOR_STRENGTH","OSCILLATOR_WAVELENGTH","C","DT","DX","vertexShaderSource","commonSource","bufferASource","bufferBSource","displaySource","compileShader","createProgram","bufferAProgram","bufferBProgram","displayProgram","quadBuffer","createFramebuffer","width","height","bufferA","bufferB","currentBuffer","pointerQueue","mouseState","uniforms","webgl_setup"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(i,t,a,A,I)=>{i.uniforms.usePsi=t?1:0,i.uniforms.showSigma=a?1:0,i.uniforms.contrast=Math.max(100**A,.1),i.uniforms.pmlWidth=I},inputs:["webgl_setup","usePsi","showSigma","contrast","pmlWidth"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:(i,t,a,A,I,W,l)=>{const{canvas:U,gl:e,width:b,height:f,bufferAProgram:y,bufferBProgram:L,displayProgram:c,quadBuffer:T,bufferA:E,bufferB:C,uniforms:d}=i;let P=0,w,M=!1;function S(){if(!M)return;const R=performance.now();for(;t.length>0;){const x=t.shift();a.x=x.x,a.y=x.y,a.lastMoveTime=x.time}const _=R-a.lastMoveTime;if(a.isMoving=_<100,a.isActive=_<6e3,d.mouseX=a.x,d.mouseY=a.y,d.mouseMoving=a.isMoving?1:0,d.mouseActive=a.isActive?1:0,!A){e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,b,f),e.useProgram(c);const x=e.getAttribLocation(c,"a_position");e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(x),e.vertexAttribPointer(x,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[P].texture),e.uniform1i(e.getUniformLocation(c,"u_bufferA"),0),e.uniform2f(e.getUniformLocation(c,"u_resolution"),b,f),e.uniform1f(e.getUniformLocation(c,"u_showSigma"),d.showSigma),e.uniform1f(e.getUniformLocation(c,"u_contrast"),d.contrast),e.uniform1f(e.getUniformLocation(c,"u_pmlWidth"),d.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),w=requestAnimationFrame(S);return}for(let x=0;x<2;x++){const $=P,N=1-P;e.bindFramebuffer(e.FRAMEBUFFER,E[N].fbo),e.viewport(0,0,b,f),e.useProgram(y);const n=e.getAttribLocation(y,"a_position");e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(n),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[$].texture),e.uniform1i(e.getUniformLocation(y,"u_bufferA"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,C[$].texture),e.uniform1i(e.getUniformLocation(y,"u_bufferB"),1),e.uniform2f(e.getUniformLocation(y,"u_resolution"),b,f),e.uniform1f(e.getUniformLocation(y,"u_pmlWidth"),d.pmlWidth),e.uniform1f(e.getUniformLocation(y,"u_usePsi"),d.usePsi),e.uniform1f(e.getUniformLocation(y,"u_mouseX"),d.mouseX),e.uniform1f(e.getUniformLocation(y,"u_mouseY"),d.mouseY),e.uniform1f(e.getUniformLocation(y,"u_mouseMoving"),d.mouseMoving),e.uniform1f(e.getUniformLocation(y,"u_mouseActive"),d.mouseActive),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,C[N].fbo),e.useProgram(L);const o=e.getAttribLocation(L,"a_position");e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(o),e.vertexAttribPointer(o,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[N].texture),e.uniform1i(e.getUniformLocation(L,"u_bufferA"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,C[$].texture),e.uniform1i(e.getUniformLocation(L,"u_bufferB"),1),e.uniform2f(e.getUniformLocation(L,"u_resolution"),b,f),e.uniform1f(e.getUniformLocation(L,"u_pmlWidth"),d.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),P=N}e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,b,f),e.useProgram(c);const p=e.getAttribLocation(c,"a_position");e.bindBuffer(e.ARRAY_BUFFER,T),e.enableVertexAttribArray(p),e.vertexAttribPointer(p,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,E[P].texture),e.uniform1i(e.getUniformLocation(c,"u_bufferA"),0),e.uniform2f(e.getUniformLocation(c,"u_resolution"),b,f),e.uniform1f(e.getUniformLocation(c,"u_showSigma"),d.showSigma),e.uniform1f(e.getUniformLocation(c,"u_contrast"),d.contrast),e.uniform1f(e.getUniformLocation(c,"u_pmlWidth"),d.pmlWidth),e.drawArrays(e.TRIANGLE_STRIP,0,4),w=requestAnimationFrame(S)}const B=new I(R=>{R.forEach(_=>{M=_.isIntersecting,M?w||(w=requestAnimationFrame(S)):w&&(cancelAnimationFrame(w),w=null)})});return B.observe(U),W.then(()=>{w&&cancelAnimationFrame(w),B.disconnect()}),l(U),{canvas:U,gl:e,width:b,height:f,bufferAProgram:y,bufferBProgram:L,displayProgram:c,quadBuffer:T,bufferA:E,bufferB:C,uniforms:d,currentBuffer:P,animationId:w,isVisible:M,render:S,observer:B}},inputs:["webgl_setup","pointerQueue","mouseState","simulate","IntersectionObserver","invalidation","display"],outputs:["canvas","gl","width","height","bufferAProgram","bufferBProgram","displayProgram","quadBuffer","bufferA","bufferB","uniforms","currentBuffer","animationId","isVisible","render","observer"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});h({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:(i,t)=>{const a=i(t.toggle({label:"Simulate",value:!0})),A=i(t.toggle({label:"Use auxiliary ψ equation",value:!0})),I=i(t.toggle({label:"Show absorption regions",value:!1})),W=i(t.range([0,1],{label:"Contrast",step:.01,value:0})),l=i(t.range([4,40],{label:"PML width (pixels)",step:1,value:12}));return{simulate:a,usePsi:A,showSigma:I,contrast:W,pmlWidth:l}},inputs:["view","Inputs"],outputs:["simulate","usePsi","showSigma","contrast","pmlWidth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
