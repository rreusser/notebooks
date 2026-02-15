import{g as He,a as bt,c as Ze,l as Fe,b as Ge,t as $e,d as Qe,e as wt,f as Ke,h as Tt,i as Mt}from"./tile-math-BziQlsn7.js";function Ue(u,e){const[t,s,i,a,o,n,r,l,c,f,h,d,p,_,y,g]=e,C=t*n-s*o,T=t*r-i*o,m=t*l-a*o,S=s*r-i*n,B=s*l-a*n,v=i*l-a*r,P=c*_-f*p,X=c*y-h*p,A=c*g-d*p,K=f*y-h*_,H=f*g-d*_,x=h*g-d*y;let w=C*x-T*H+m*K+S*A-B*X+v*P;return Math.abs(w)<1e-10?!1:(w=1/w,u[0]=(n*x-r*H+l*K)*w,u[1]=(-s*x+i*H-a*K)*w,u[2]=(_*v-y*B+g*S)*w,u[3]=(-f*v+h*B-d*S)*w,u[4]=(-o*x+r*A-l*X)*w,u[5]=(t*x-i*A+a*X)*w,u[6]=(-p*v+y*m-g*T)*w,u[7]=(c*v-h*m+d*T)*w,u[8]=(o*H-n*A+l*P)*w,u[9]=(-t*H+s*A-a*P)*w,u[10]=(p*B-_*m+g*C)*w,u[11]=(-c*B+f*m-d*C)*w,u[12]=(-o*K+n*X-r*P)*w,u[13]=(t*K-s*X+i*P)*w,u[14]=(-p*S+_*T-y*C)*w,u[15]=(c*S-f*T+h*C)*w,!0)}function St(u){function e(o,n,r){const l=u[0]*o+u[4]*n+u[8]*r+u[12],c=u[1]*o+u[5]*n+u[9]*r+u[13],f=u[2]*o+u[6]*n+u[10]*r+u[14],h=u[3]*o+u[7]*n+u[11]*r+u[15];return[l/h,c/h,f/h]}const t=.3,s=.99,i=new Float32Array(24),a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let o=0;o<4;o++){const[n,r]=a[o],l=e(n,r,t),c=e(n,r,s);i[o*3]=l[0],i[o*3+1]=l[1],i[o*3+2]=l[2],i[(o+4)*3]=c[0],i[(o+4)*3+1]=c[1],i[(o+4)*3+2]=c[2]}return i}function Ct(u,e={}){const t=new Proxy({center:e.center?[...e.center]:[0,0,0],distance:e.distance||10,phi:e.phi||0,theta:e.theta||.3,fov:e.fov||Math.PI/4,near:e.near||.1,far:e.far||1},{set(b,I,E){return b[I]=E,c=!0,!0}}),s=e.rotateSpeed||.01,i=e.zoomSpeed||.001,a=e.panSpeed||1,o=new Float64Array(16),n=new Float64Array(16),r=new Float64Array(16),l=new Float64Array(16);let c=!0,f=1,h=!1,d=null,p=0,_=0,y=null,g=null,C=null,T=0,m=0;function S(b,I){const E=u.getBoundingClientRect(),R=(b-E.left)/E.width*2-1,F=1-(I-E.top)/E.height*2;Ue(l,r);const L=l;function q(V,G,$){const J=L[0]*V+L[4]*G+L[8]*$+L[12],te=L[1]*V+L[5]*G+L[9]*$+L[13],fe=L[2]*V+L[6]*G+L[10]*$+L[14],re=L[3]*V+L[7]*G+L[11]*$+L[15];return[J/re,te/re,fe/re]}const Z=q(R,F,0),N=q(R,F,1);return{origin:Z,direction:[N[0]-Z[0],N[1]-Z[1],N[2]-Z[2]]}}function B(b,I){if(Math.abs(b.direction[1])<1e-10)return null;const E=(I-b.origin[1])/b.direction[1];return E<0?null:[b.origin[0]+E*b.direction[0],I,b.origin[2]+E*b.direction[2]]}let v=null,P=null;function X(b,I){A();const E=u.parentElement;if(!E)return;const R=E.getBoundingClientRect();getComputedStyle(E).position==="static"&&(E.style.position="relative");const L=document.createElement("div"),q=22,Z={position:"absolute",left:"0",top:"0",width:q+"px",height:q+"px",borderRadius:"50%",boxSizing:"border-box",pointerEvents:"none"};Object.assign(L.style,{position:"absolute",left:b-R.left-q/2+"px",top:I-R.top-q/2+"px",width:q+"px",height:q+"px",pointerEvents:"none",transform:"scale(0.5)",opacity:"0",transition:"transform 0.15s ease-out, opacity 0.15s ease-out"});const N=document.createElement("div");Object.assign(N.style,{...Z,border:"4px solid rgba(255,255,255,0.6)"});const V=document.createElement("div");Object.assign(V.style,{...Z,border:"2.25px solid rgba(0,0,0,0.5)"}),L.appendChild(N),L.appendChild(V),E.appendChild(L),L.offsetWidth,L.style.transform="scale(1)",L.style.opacity="1",P=L}function A(){if(!P)return;const b=P;P=null,b.style.transform="scale(1.5)",b.style.opacity="0",b.addEventListener("transitionend",()=>b.remove(),{once:!0})}function K(b,I){const{phi:E,theta:R,distance:F,center:L}=t,q=E+b,Z=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,R+I)),N=Z-R;if(!v){t.phi=q,t.theta=Z;return}const V=L[0]+F*Math.cos(R)*Math.cos(E),G=L[1]+F*Math.sin(R),$=L[2]+F*Math.cos(R)*Math.sin(E);let J=V-v[0],te=G-v[1],fe=$-v[2];const re=Math.cos(b),ne=Math.sin(b),le=J*re-fe*ne,ue=te,de=J*ne+fe*re,pe=-Math.sin(q),_e=Math.cos(q),me=Math.cos(N),be=Math.sin(N),ve=1-me,we=-_e*ue,ze=_e*le-pe*de,Te=pe*ue,Ve=pe*le+_e*de,_t=le*me+we*be+pe*Ve*ve,mt=ue*me+ze*be,gt=de*me+Te*be+_e*Ve*ve,yt=v[0]+_t,vt=v[1]+mt,xt=v[2]+gt;t.phi=q,t.theta=Z,t.center[0]=yt-F*Math.cos(Z)*Math.cos(q),t.center[1]=vt-F*Math.sin(Z),t.center[2]=xt-F*Math.cos(Z)*Math.sin(q)}let H=0,x=0,w=0,k=0,Q=0,ee=0;function O(b){const{phi:I,theta:E,distance:R,center:F,fov:L,near:q,far:Z}=t,N=F[0]+R*Math.cos(E)*Math.cos(I),V=F[1]+R*Math.sin(E),G=F[2]+R*Math.cos(E)*Math.sin(I);let $=F[0]-N,J=F[1]-V,te=F[2]-G;const fe=Math.sqrt($*$+J*J+te*te);$/=fe,J/=fe,te/=fe;let re=J*0-te*1,ne=te*0-$*0,le=$*1-J*0;const ue=Math.sqrt(re*re+ne*ne+le*le);ue>1e-4&&(re/=ue,ne/=ue,le/=ue);const de=ne*te-le*J,pe=le*$-re*te,_e=re*J-ne*$;o[0]=re,o[1]=de,o[2]=-$,o[3]=0,o[4]=ne,o[5]=pe,o[6]=-J,o[7]=0,o[8]=le,o[9]=_e,o[10]=-te,o[11]=0,o[12]=-(re*N+ne*V+le*G),o[13]=-(de*N+pe*V+_e*G),o[14]=$*N+J*V+te*G,o[15]=1;const me=1/Math.tan(L/2),be=1/(q-Z);n[0]=me/b,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=me,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=Z*be,n[11]=-1,n[12]=0,n[13]=0,n[14]=q*Z*be,n[15]=0;for(let ve=0;ve<4;ve++)for(let we=0;we<4;we++){let ze=0;for(let Te=0;Te<4;Te++)ze+=n[ve+Te*4]*o[Te+we*4];r[ve+we*4]=ze}}function D(b,I){const{phi:E,theta:R,distance:F}=t,L=Math.sin(E),q=-Math.cos(E),Z=-Math.sin(R)*Math.cos(E),N=Math.cos(R),V=-Math.sin(R)*Math.sin(E),G=F*a;t.center[0]-=b*L*G,t.center[0]+=I*Z*G,t.center[1]+=I*N*G,t.center[2]-=b*q*G,t.center[2]+=I*V*G}function he(b,I){if(g=null,O(f),y){const F=y(b,I);if(Array.isArray(F)&&F.length===3){g={point:[...F],altitude:F[1]};return}}const E=S(b,I),R=B(E,t.center[1]);R&&(g={point:R,altitude:t.center[1]})}function z(b,I){if(!g)return;O(f);const E=S(b,I),R=B(E,g.altitude);R&&(t.center[0]+=g.point[0]-R[0],t.center[2]+=g.point[2]-R[2])}function W(b,I){C=null,O(f);let E=null;if(y){const N=y(b,I);Array.isArray(N)&&N.length===3&&(E=N)}if(!E){const N=S(b,I);E=B(N,t.center[1])}if(!E)return;const{phi:R,theta:F}=t,L=-Math.cos(F)*Math.cos(R),q=-Math.sin(F),Z=-Math.cos(F)*Math.sin(R);C={point:[...E],normal:[L,q,Z]}}function M(b,I){if(!C)return;O(f);const E=S(b,I),{point:R,normal:F}=C,L=F[0]*E.direction[0]+F[1]*E.direction[1]+F[2]*E.direction[2];if(Math.abs(L)<1e-10)return;const q=F[0]*R[0]+F[1]*R[1]+F[2]*R[2],Z=F[0]*E.origin[0]+F[1]*E.origin[1]+F[2]*E.origin[2],N=(q-Z)/L;if(N<0)return;const V=E.origin[0]+N*E.direction[0],G=E.origin[1]+N*E.direction[1],$=E.origin[2]+N*E.direction[2];t.center[0]+=R[0]-V,t.center[1]+=R[1]-G,t.center[2]+=R[2]-$}function U(b){if(b.preventDefault(),p=b.clientX,_=b.clientY,d=b.shiftKey?"pan":b.button===2||b.button===1?"rotate":b.ctrlKey?"pivot":b.metaKey?"rotate":b.altKey?"zoom":"grab",d==="rotate"){if(y){const I=y(b.clientX,b.clientY);v=Array.isArray(I)&&I.length===3?I:null}X(b.clientX,b.clientY)}if(d==="grab"&&he(b.clientX,b.clientY),d==="pan"&&W(b.clientX,b.clientY),d==="zoom"){if(y){const E=y(b.clientX,b.clientY);if(Array.isArray(E)&&E.length===3){const{phi:R,theta:F,distance:L,center:q}=t,Z=q[0]+L*Math.cos(F)*Math.cos(R),N=q[1]+L*Math.sin(F),V=q[2]+L*Math.cos(F)*Math.sin(R),G=E[0]-Z,$=E[1]-N,J=E[2]-V,te=Math.sqrt(G*G+$*$+J*J),fe=Math.cos(F)*Math.cos(R),re=Math.sin(F),ne=Math.cos(F)*Math.sin(R);t.center[0]+=(L-te)*fe,t.center[1]+=(L-te)*re,t.center[2]+=(L-te)*ne,t.distance=te}}const I=u.getBoundingClientRect();T=(b.clientX-I.left-I.width/2)/I.height,m=(b.clientY-I.top-I.height/2)/I.height,X(b.clientX,b.clientY)}h=!0,u.style.cursor="grabbing",window.addEventListener("mousemove",j),window.addEventListener("mouseup",Y)}function j(b){if(!h)return;const I=b.clientX-p,E=b.clientY-_;if(p=b.clientX,_=b.clientY,d==="grab")z(b.clientX,b.clientY);else if(d==="rotate")K(I*s,E*s);else if(d==="pivot"){const{phi:R,theta:F,distance:L,center:q,fov:Z}=t,N=Z/u.getBoundingClientRect().height,V=q[0]+L*Math.cos(F)*Math.cos(R),G=q[1]+L*Math.sin(F),$=q[2]+L*Math.cos(F)*Math.sin(R);t.phi-=I*N,t.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t.theta-E*N)),t.center[0]=V-L*Math.cos(t.theta)*Math.cos(t.phi),t.center[1]=G-L*Math.sin(t.theta),t.center[2]=$-L*Math.cos(t.theta)*Math.sin(t.phi)}else if(d==="zoom"){const R=Math.exp(-E*.005),F=t.distance;t.distance=Math.max(t.near*2,F*R);const q=(1/(t.distance/F)-1)*2*Math.tan(t.fov/2);D(-T*q,-m*q)}else d==="pan"&&M(b.clientX,b.clientY);c=!0}function Y(){h=!1,d=null,g=null,v=null,C=null,A(),u.style.cursor="grab",window.removeEventListener("mousemove",j),window.removeEventListener("mouseup",Y)}let se=!1,oe=null;function ie(b){if(b.preventDefault(),!se&&y){const N=y(b.clientX,b.clientY);if(Array.isArray(N)&&N.length===3){const{phi:V,theta:G,distance:$,center:J}=t,te=J[0]+$*Math.cos(G)*Math.cos(V),fe=J[1]+$*Math.sin(G),re=J[2]+$*Math.cos(G)*Math.sin(V),ne=N[0]-te,le=N[1]-fe,ue=N[2]-re,de=Math.sqrt(ne*ne+le*le+ue*ue),pe=Math.cos(G)*Math.cos(V),_e=Math.sin(G),me=Math.cos(G)*Math.sin(V);t.center[0]+=($-de)*pe,t.center[1]+=($-de)*_e,t.center[2]+=($-de)*me,t.distance=de}se=!0}clearTimeout(oe),oe=setTimeout(()=>{se=!1},200);const I=u.getBoundingClientRect(),E=(b.clientX-I.left-I.width/2)/I.height,R=(b.clientY-I.top-I.height/2)/I.height,F=1+b.deltaY*i,L=t.distance;t.distance=Math.max(t.near*2,L*F);const Z=(1/(t.distance/L)-1)*2*Math.tan(t.fov/2);D(-E*Z,-R*Z),c=!0}function ae(b){if(b.preventDefault(),b.touches.length===1)h=!0,d="grab",p=b.touches[0].clientX,_=b.touches[0].clientY,he(p,_);else if(b.touches.length===2){const I=b.touches[1].clientX-b.touches[0].clientX,E=b.touches[1].clientY-b.touches[0].clientY;if(H=Math.sqrt(I*I+E*E),x=(b.touches[0].clientX+b.touches[1].clientX)/2,w=(b.touches[0].clientY+b.touches[1].clientY)/2,k=Math.atan2(E,I),y){O(f);const F=y(x,w);if(v=Array.isArray(F)&&F.length===3?F:null,v){const{phi:L,theta:q,distance:Z,center:N}=t,V=N[0]+Z*Math.cos(q)*Math.cos(L),G=N[1]+Z*Math.sin(q),$=N[2]+Z*Math.cos(q)*Math.sin(L),J=v[0]-V,te=v[1]-G,fe=v[2]-$,re=Math.sqrt(J*J+te*te+fe*fe),ne=Math.cos(q)*Math.cos(L),le=Math.sin(q),ue=Math.cos(q)*Math.sin(L);t.center[0]+=(Z-re)*ne,t.center[1]+=(Z-re)*le,t.center[2]+=(Z-re)*ue,t.distance=re}}X(x,w);const R=u.getBoundingClientRect();Q=(x-R.left-R.width/2)/R.height,ee=(w-R.top-R.height/2)/R.height}}function ye(b){if(b.preventDefault(),b.touches.length===1&&h)p=b.touches[0].clientX,_=b.touches[0].clientY,d==="grab"&&z(p,_),c=!0;else if(b.touches.length===2){const I=b.touches[1].clientX-b.touches[0].clientX,E=b.touches[1].clientY-b.touches[0].clientY,R=Math.sqrt(I*I+E*E),F=(b.touches[0].clientX+b.touches[1].clientX)/2,L=(b.touches[0].clientY+b.touches[1].clientY)/2;if(H>0){const q=H/R,Z=t.distance;t.distance*=q,t.distance=Math.max(t.near*2,t.distance);const V=(1/(t.distance/Z)-1)*2*Math.tan(t.fov/2);D(-Q*V,-ee*V);const G=Math.atan2(E,I),$=G-k,J=u.getBoundingClientRect(),te=(L-w)/J.height;K(-$,te*2),c=!0,k=G}H=R,x=F,w=L}}function Pe(){h=!1,d=null,g=null,v=null,A(),H=0,k=0}function Ee(b){b.preventDefault()}u.style.cursor="grab",u.addEventListener("mousedown",U),u.addEventListener("wheel",ie,{passive:!1}),u.addEventListener("touchstart",ae,{passive:!1}),u.addEventListener("touchmove",ye,{passive:!1}),u.addEventListener("touchend",Pe),u.addEventListener("contextmenu",Ee);function ke(){u.removeEventListener("mousedown",U),u.removeEventListener("wheel",ie),u.removeEventListener("touchstart",ae),u.removeEventListener("touchmove",ye),u.removeEventListener("touchend",Pe),u.removeEventListener("contextmenu",Ee),window.removeEventListener("mousemove",j),window.removeEventListener("mouseup",Y)}return{state:t,get dirty(){return c},set rotateStartCallback(b){y=b},taint(){c=!0},update(b){f=b,O(b);const I=c;return c=!1,{view:o,projection:n,projectionView:r,dirty:I}},destroy:ke}}function Bt(u){const s=new Uint16Array(534578);let i=0;for(let h=0;h<=516;h++)for(let d=0;d<=516;d++)s[i++]=d,s[i++]=h;const o=516*516*6,n=new Uint32Array(o);let r=0;const l=517;for(let h=0;h<516;h++)for(let d=0;d<516;d++){const p=h*l+d,_=p+1,y=p+l,g=y+1;n[r++]=p,n[r++]=y,n[r++]=_,n[r++]=_,n[r++]=y,n[r++]=g}const c=u.createBuffer({size:s.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});u.queue.writeBuffer(c,0,s);const f=u.createBuffer({size:n.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});return u.queue.writeBuffer(f,0,n),{vertexBuffer:c,indexBuffer:f,indexCount:o,vertexCount:267289}}const Re=`
struct GlobalUniforms {
  camera_position: vec4<f32>,   // xyz=world pos, w=camera_height_meters
  sun_direction: vec4<f32>,     // xyz=normalized sun dir (physical space), w=meters_per_unit
  rayleigh_params: vec4<f32>,   // xyz=beta_R (per meter), w=H_R (meters)
  mie_params: vec4<f32>,        // x=beta_M, y=H_M, z=g_mie, w=sun_intensity
  cam_right: vec4<f32>,         // xyz=camera right dir (physical space), w=aspect_ratio
  cam_up: vec4<f32>,            // xyz=camera up dir (physical space), w=half_fov_tan
};

// Numerically stable optical depth factor.
// Computes: integral_0^dist exp(-(h_a + t*(h_b-h_a)/dist) / H) dt / dist
// = H * (exp(-h_a/H) - exp(-h_b/H)) / (h_b - h_a)
// Both exp terms are always well-behaved (no overflow).
fn opticalDepthFactor(h_a: f32, h_b: f32, H: f32) -> f32 {
  let delta_h = h_b - h_a;
  if (abs(delta_h) > 1.0) {
    return H * (exp(-h_a / H) - exp(-h_b / H)) / delta_h;
  }
  return exp(-h_a / H);
}

// Transmittance from a point at height h toward the sun through the atmosphere.
// Uses flat-earth air mass approximation: path length ~ H / sin(sun_altitude).
fn sunTransmittance(h: f32) -> vec3<f32> {
  let sun_dir = globals.sun_direction.xyz;
  let beta_R = globals.rayleigh_params.xyz;
  let H_R = globals.rayleigh_params.w;
  let beta_M = globals.mie_params.x;
  let H_M = globals.mie_params.y;
  let sin_alt = max(sun_dir.y, 0.01);
  let tau_R = beta_R * H_R * exp(-h / H_R) / sin_alt;
  let tau_M = beta_M * H_M * exp(-h / H_M) / sin_alt;
  return exp(-(tau_R + vec3<f32>(tau_M)));
}

fn computeScattering(cam_h_m: f32, frag_h_m: f32, dist_m: f32, view_dir: vec3<f32>) -> array<vec3<f32>, 2> {
  let sun_dir = globals.sun_direction.xyz;
  let beta_R = globals.rayleigh_params.xyz;
  let H_R = globals.rayleigh_params.w;
  let beta_M = globals.mie_params.x;
  let H_M = globals.mie_params.y;
  let g = globals.mie_params.z;
  let sun_I = globals.mie_params.w;

  // Optical depth (numerically stable)
  let factor_R = opticalDepthFactor(cam_h_m, frag_h_m, H_R);
  let factor_M = opticalDepthFactor(cam_h_m, frag_h_m, H_M);
  let tau_R = beta_R * dist_m * factor_R;
  let tau_M = beta_M * dist_m * factor_M;

  // Transmittance
  let T = exp(-(tau_R + vec3<f32>(tau_M)));

  // Phase functions
  let cos_theta = dot(view_dir, sun_dir);
  let P_R = 0.0596831 * (1.0 + cos_theta * cos_theta);  // 3/(16*pi)
  let g2 = g * g;
  let denom = 1.0 + g2 - 2.0 * g * cos_theta;
  let P_M_raw = 0.0795775 * (1.0 - g2) / (denom * sqrt(denom));  // 1/(4*pi)
  let sun_vis = smoothstep(-0.02, 0.02, sun_dir.y);
  let P_M = mix(0.0795775, P_M_raw, sun_vis);

  // Inscatter using optical depth fractions
  // Each species' contribution weighted by its share of total optical depth —
  // properly handles different scale heights along the viewing path
  let tau_total = tau_R + vec3<f32>(tau_M);

  // Sun transmittance at average path height — reddens inscattered light at sunset
  let T_sun = sunTransmittance((cam_h_m + frag_h_m) * 0.5);

  let inscatter = T_sun * sun_I * (P_R * tau_R + P_M * vec3<f32>(tau_M)) / max(tau_total, vec3<f32>(1e-10));

  return array<vec3<f32>, 2>(T, inscatter);
}

// ACES filmic tonemap (Narkowicz 2015)
fn acesTonemap(x: vec3<f32>) -> vec3<f32> {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), vec3<f32>(0.0), vec3<f32>(1.0));
}

fn linearToSrgb(c: vec3<f32>) -> vec3<f32> {
  let lo = c * 12.92;
  let hi = 1.055 * pow(c, vec3<f32>(1.0 / 2.4)) - 0.055;
  return select(hi, lo, c <= vec3<f32>(0.0031308));
}

fn finalColor(linear: vec3<f32>) -> vec4<f32> {
  return vec4<f32>(linearToSrgb(acesTonemap(linear)), 1.0);
}
`,Et=`
struct Uniforms {
  mvp: mat4x4<f32>,
  model: mat4x4<f32>,
  elevation_scale: f32,
  cell_size_meters: f32,
  vertical_exaggeration: f32,
  texel_size: f32,
  show_tile_borders: f32,
  has_imagery: f32,
  hillshade_opacity: f32,
  slope_angle_opacity: f32,
  contour_opacity: f32,
  viewport_height: f32,
  show_wireframe: f32,
  slope_aspect_mask_above: f32,
  slope_aspect_mask_near: f32,
  slope_aspect_mask_below: f32,
  slope_aspect_opacity: f32,
  treeline_lower: f32,
  treeline_upper: f32,
};

struct GlobalUniforms {
  camera_position: vec4<f32>,
  sun_direction: vec4<f32>,
  rayleigh_params: vec4<f32>,
  mie_params: vec4<f32>,
  cam_right: vec4<f32>,
  cam_up: vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(1) @binding(0) var elevationTexture: texture_2d<f32>;
@group(2) @binding(0) var<uniform> globals: GlobalUniforms;

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
  @location(1) world_position: vec3<f32>,
  @location(2) shade: f32,
  @location(3) elevation_m: f32,
  @location(4) slope_angle: f32,
  @location(5) slope_aspect_sin: f32,
  @location(6) slope_aspect_cos: f32,
};

fn loadElevation(coord: vec2<i32>) -> f32 {
  return textureLoad(elevationTexture, coord, 0).r;
}

@vertex
fn vs_main(@location(0) grid_pos: vec2<u32>) -> VertexOutput {
  var out: VertexOutput;

  // Raw coords [0, 516]. The outer ring (0 and >=515) is a skirt that hangs
  // below the tile edge to hide gaps between tiles at different LOD levels.
  // Inner ring (1 and >=514) are boundary vertices at tile edges.
  // Interior (2-513) are texel centers at u=0.5..511.5.
  let raw_u = i32(grid_pos.x);
  let raw_v = i32(grid_pos.y);
  let inner_u = raw_u - 1;
  let inner_v = raw_v - 1;

  // Grid position: interior texel k at u = k - 0.5; boundaries at 0 and 512
  let u = clamp(f32(inner_u) - 0.5, 0.0, 512.0);
  let v = clamp(f32(inner_v) - 0.5, 0.0, 512.0);

  // Texel indices for elevation sampling (using inner coords 0-514).
  // Interior: single texel. Boundary/skirt (<=0 or >=513): average two texels.
  var tex_u_a: i32 = inner_u;
  var tex_u_b: i32 = inner_u;
  if (inner_u <= 0) { tex_u_a = 0; tex_u_b = 1; }
  else if (inner_u >= 513) { tex_u_a = 512; tex_u_b = 513; }

  var tex_v_a: i32 = inner_v;
  var tex_v_b: i32 = inner_v;
  if (inner_v <= 0) { tex_v_a = 0; tex_v_b = 1; }
  else if (inner_v >= 513) { tex_v_a = 512; tex_v_b = 513; }

  // Average 1, 2, or 4 texels depending on edge/corner
  let elevation = (
    loadElevation(vec2<i32>(tex_u_a, tex_v_a)) +
    loadElevation(vec2<i32>(tex_u_b, tex_v_a)) +
    loadElevation(vec2<i32>(tex_u_a, tex_v_b)) +
    loadElevation(vec2<i32>(tex_u_b, tex_v_b))
  ) * 0.25;

  let pos = vec4<f32>(u, elevation, v, 1.0);
  out.position = uniforms.mvp * pos;
  out.uv = vec2<f32>((u + 1.0) / 514.0, (v + 1.0) / 514.0);
  out.world_position = (uniforms.model * pos).xyz;

  // Skirt: drop position in model space proportional to camera distance.
  // Elevation varying is also lowered so contours don't run down the skirt face.
  let is_skirt = (raw_u == 0) || (raw_u >= 515) || (raw_v == 0) || (raw_v >= 515);
  var skirt_drop = 0.0;
  if (is_skirt) {
    let mpu = globals.sun_direction.w;
    let cam_dist = length(globals.camera_position.xyz - out.world_position);
    skirt_drop = cam_dist * mpu * 0.01;
    let skirt_pos = vec4<f32>(u, elevation - skirt_drop, v, 1.0);
    out.position = uniforms.mvp * skirt_pos;
  }

  // Hillshade: compute normal from neighbor elevations.
  // At tile borders, extend the stencil so it always spans 2 texels
  // to avoid halving the gradient (which creates visible seams).
  var lu = inner_u - 1; var ru = inner_u + 1;
  if (lu < 0) { lu = 0; ru = 2; }
  else if (ru > 513) { ru = 513; lu = 511; }
  var uv_ = inner_v - 1; var dv = inner_v + 1;
  if (uv_ < 0) { uv_ = 0; dv = 2; }
  else if (dv > 513) { dv = 513; uv_ = 511; }

  let zL = loadElevation(vec2<i32>(lu, inner_v));
  let zR = loadElevation(vec2<i32>(ru, inner_v));
  let zU = loadElevation(vec2<i32>(inner_u, uv_));
  let zD = loadElevation(vec2<i32>(inner_u, dv));

  let cellSize = uniforms.cell_size_meters;
  let dzdx = (zR - zL) / (2.0 * cellSize);
  let dzdy = (zD - zU) / (2.0 * cellSize);

  let normal = vec3<f32>(-dzdx, 1.0, -dzdy);
  let sun = globals.sun_direction.xyz;
  let sun_horizon = smoothstep(-0.02, 0.02, sun.y);
  out.shade = max(0.0, dot(normal, sun) * inverseSqrt(dot(normal, normal))) * sun_horizon;
  out.elevation_m = elevation - skirt_drop;
  let gradient_mag = sqrt(dzdx * dzdx + dzdy * dzdy);
  out.slope_angle = atan(gradient_mag) * 57.29578;

  // Slope aspect: compass bearing of the downhill direction.
  // sin/cos of atan2(-dzdx, dzdy) = -dzdx/mag, dzdy/mag — just normalize.
  let safe_mag = max(gradient_mag, 1e-10);
  out.slope_aspect_sin = -dzdx / safe_mag;
  out.slope_aspect_cos = dzdy / safe_mag;

  // Reject sea-level vertices (no terrain data).
  if (elevation <= 0.0) {
    var nan_bits = 0x7FC00000u;
    let nan = bitcast<f32>(nan_bits);
    out.position = vec4<f32>(nan, nan, nan, nan);
  }

  return out;
}
`,At=`
struct Uniforms {
  mvp: mat4x4<f32>,
  model: mat4x4<f32>,
  elevation_scale: f32,
  cell_size_meters: f32,
  vertical_exaggeration: f32,
  texel_size: f32,
  show_tile_borders: f32,
  has_imagery: f32,
  hillshade_opacity: f32,
  slope_angle_opacity: f32,
  contour_opacity: f32,
  viewport_height: f32,
  show_wireframe: f32,
  slope_aspect_mask_above: f32,
  slope_aspect_mask_near: f32,
  slope_aspect_mask_below: f32,
  slope_aspect_opacity: f32,
  treeline_lower: f32,
  treeline_upper: f32,
};

`+Re+`

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(2) @binding(0) var<uniform> globals: GlobalUniforms;
@group(3) @binding(0) var imageryTexture: texture_2d<f32>;
@group(3) @binding(1) var imagerySampler: sampler;

fn srgbToLinear(c: vec3<f32>) -> vec3<f32> {
  return pow(c, vec3<f32>(2.2));
}

fn slopeAngleColor(deg: f32) -> vec4<f32> {
  // Gaia GPS-style discrete slope angle bands (sRGB → linear)
  let gold   = pow(vec3<f32>(1.0, 0.78, 0.0), vec3<f32>(2.2));
  let yellow = pow(vec3<f32>(1.0, 0.55, 0.0), vec3<f32>(2.2));
  let orange = pow(vec3<f32>(1.0, 0.30, 0.0), vec3<f32>(2.2));
  let red    = pow(vec3<f32>(0.75, 0.0, 0.0), vec3<f32>(2.2));
  let purple = pow(vec3<f32>(0.4, 0.0, 0.6), vec3<f32>(2.2));
  let blue   = pow(vec3<f32>(0.0, 0.2, 0.8), vec3<f32>(2.2));
  let black  = vec3<f32>(0.0);

  // Uniform color blocks with 1° linear fades at boundaries
  // 26-29° green | 30-31° yellow | 32-34° orange | 35-45° red
  // 46-50° purple | 51-59° blue | 60°+ black
  let t_enter  = smoothstep(24.0, 26.0, deg);
  let t_yellow = smoothstep(29.0, 30.0, deg);
  let t_orange = smoothstep(31.0, 32.0, deg);
  let t_red    = smoothstep(34.0, 35.0, deg);
  let t_purple = smoothstep(45.0, 46.0, deg);
  let t_blue   = smoothstep(50.0, 51.0, deg);
  let t_black  = smoothstep(59.0, 60.0, deg);

  var color = mix(gold, yellow, t_yellow);
  color = mix(color, orange, t_orange);
  color = mix(color, red, t_red);
  color = mix(color, purple, t_purple);
  color = mix(color, blue, t_blue);
  color = mix(color, black, t_black);
  return vec4<f32>(color, t_enter);
}

// Quadratic B-spline basis function (partition of unity with uniform knots).
// Input s is the normalized distance from the basis center in units of knot
// spacing. Support spans [-1.5, 1.5].
fn quadBSpline(s: f32) -> f32 {
  let a = abs(s);
  if (a >= 1.5) { return 0.0; }
  if (a >= 0.5) { let t = 1.5 - a; return 0.5 * t * t; }
  return 0.75 - a * a;
}

// Compute the total B-spline weight for selected slope aspect directions.
// aspect: compass bearing in radians (0=N, π/2=E, ±π=S, -π/2=W)
// mask: bitmask with bits 0-7 for N, NE, E, SE, S, SW, W, NW
// Returns 0..1 where 1 = full coverage (all 8 selected sum to exactly 1.0).
fn slopeAspectWeight(aspect: f32, mask: u32) -> f32 {
  var weight = 0.0;
  let TWO_PI = 6.2831853;
  let h = 0.7853982; // π/4 = 45° knot spacing
  for (var i = 0u; i < 8u; i++) {
    if ((mask & (1u << i)) != 0u) {
      let center = f32(i) * h;
      var d = aspect - center;
      d = d - round(d / TWO_PI) * TWO_PI;
      weight += quadBSpline(d / h);
    }
  }
  return weight;
}

fn contourLinearstep(edge0: f32, edge1: f32, x: f32) -> f32 {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn blendedContours(elevation_ft: f32, tile_uv: vec2<f32>) -> f32 {
  let divisions = 5.0;       // 40 → 200 → 1000 → 5000
  let base_spacing = 40.0;   // finest contour spacing in feet
  let min_spacing = 8.0;     // minimum pixels between contours before octave shift
  let line_width = 2.0;
  let antialias = 1.0;
  let n = 3.0;

  // All derivatives must be computed before any non-uniform control flow
  let elev_grad = length(vec2<f32>(dpdx(elevation_ft), dpdy(elevation_ft)));
  let h_feet_pp = 0.5 * (fwidth(tile_uv.x) + fwidth(tile_uv.y))
    * 514.0 * uniforms.cell_size_meters * 3.28084;

  if (elev_grad < 1e-6) { return 0.0; }

  // Unclamped continuous octave from horizontal screen density.
  // Negative values mean the screen can resolve finer than base_spacing.
  let local_octave = log2(h_feet_pp * min_spacing / base_spacing) / log2(divisions);
  let contour_spacing = base_spacing * pow(divisions, ceil(local_octave));

  var plot_var = elevation_ft / contour_spacing;
  var width_scale = contour_spacing / elev_grad;

  // Shepard tone: each octave fades in, holds, and fades out
  var contour_sum = 0.0;
  for (var i = 0; i < 3; i++) {
    let t = f32(i) + 1.0 - fract(local_octave);
    let weight = smoothstep(0.0, 1.0, t) * smoothstep(n, n - 1.0, t);

    let dist_px = (0.5 - abs(fract(plot_var) - 0.5)) * width_scale;
    contour_sum += weight * contourLinearstep(
      0.5 * (line_width + antialias),
      0.5 * (line_width - antialias),
      dist_px
    );

    width_scale *= divisions;
    plot_var /= divisions;
  }

  return contour_sum / n;
}

fn applyAtmosphere(color: vec3<f32>, world_pos: vec3<f32>) -> vec3<f32> {
  let cam_pos = globals.camera_position.xyz;
  let cam_h_m = globals.camera_position.w;
  let mpu = globals.sun_direction.w;

  let world_ray = world_pos - cam_pos;
  let frag_h_m = world_pos.y * mpu / max(uniforms.vertical_exaggeration, 1e-6);
  let phys_ray = vec3<f32>(world_ray.x * mpu, frag_h_m - cam_h_m, world_ray.z * mpu);
  let dist_m = length(phys_ray);
  if (dist_m < 0.1) { return color; }
  let view_dir = phys_ray / dist_m;

  let result = computeScattering(cam_h_m, frag_h_m, dist_m, view_dir);
  let T = result[0];
  let inscatter = result[1];

  return color * T + inscatter * (vec3<f32>(1.0) - T);
}

@fragment
fn fs_main(
  @location(0) uv: vec2<f32>,
  @location(1) world_position: vec3<f32>,
  @location(2) shade: f32,
  @location(3) elevation_m: f32,
  @location(4) slope_angle: f32,
  @location(5) slope_aspect_sin: f32,
  @location(6) slope_aspect_cos: f32,
) -> @location(0) vec4<f32> {
  // Base color: satellite imagery or elevation-based fallback
  var base_color: vec3<f32>;
  if (uniforms.has_imagery > 0.5) {
    // Map from 514-texel elevation UV to 512-texel imagery UV
    let imagery_uv = (uv * 514.0 - 1.0) / 512.0;
    let imagery = textureSampleLevel(imageryTexture, imagerySampler, imagery_uv, 0.0).rgb;
    base_color = srgbToLinear(imagery);
  } else {
    let minElev = 500.0;
    let maxElev = 6200.0;
    let normalized = clamp((elevation_m - minElev) / (maxElev - minElev), 0.0, 1.0);
    let gray = normalized * 0.15 + 0.05;
    base_color = vec3<f32>(gray, gray, gray);
  }

  // Slope angle overlay (before hillshade so shading applies to slope colors)
  let slope_opacity = uniforms.slope_angle_opacity;
  if (slope_opacity > 0.0) {
    let slope_col = slopeAngleColor(slope_angle);
    base_color = mix(base_color, slope_col.rgb, slope_col.a * slope_opacity);
  }

  // Slope aspect overlay: highlight selected compass directions within 30-45°
  // Select mask based on elevation relative to treeline boundaries
  var aspect_mask = 0u;
  if (elevation_m > uniforms.treeline_upper) {
    aspect_mask = u32(uniforms.slope_aspect_mask_above);
  } else if (elevation_m > uniforms.treeline_lower) {
    aspect_mask = u32(uniforms.slope_aspect_mask_near);
  } else {
    aspect_mask = u32(uniforms.slope_aspect_mask_below);
  }
  if (aspect_mask != 0u && slope_angle > 29.0) {
    let aspect = atan2(slope_aspect_sin, slope_aspect_cos);
    let aspect_weight = slopeAspectWeight(aspect, aspect_mask);
    let aspect_fade = smoothstep(30.0, 35.0, slope_angle) * (1.0 - smoothstep(40.0, 45.0, slope_angle));
    let aspect_alpha = aspect_weight * aspect_fade * uniforms.slope_aspect_opacity;
    // Blend in sRGB (perceptual) space so the tint is equally visible
    // on both bright snow and dark rock.
    let base_srgb = pow(base_color, vec3<f32>(1.0 / 2.2));
    let blended_srgb = mix(base_srgb, vec3<f32>(0.1, 0.55, 0.05), aspect_alpha);
    base_color = pow(blended_srgb, vec3<f32>(2.2));
  }

  let lit = base_color * mix(1.0, shade, uniforms.hillshade_opacity);
  var terrain_color = clamp(lit, vec3<f32>(0.0), vec3<f32>(1.0));

  // Elevation contours (adaptive Shepard-tone blending across octaves)
  let elevation_ft = elevation_m * 3.28084;
  let contour = clamp(blendedContours(elevation_ft, uv) * 2.0, 0.0, 1.0) * uniforms.contour_opacity;
  terrain_color = mix(terrain_color, vec3<f32>(0.0), contour);

  // Apply atmospheric scattering
  var result = applyAtmosphere(terrain_color, world_position);

  // Wireframe overlay
  if (uniforms.show_wireframe > 0.5) {
    let grid_wu = uv.x * 514.0 - 1.0;
    let grid_wv = uv.y * 514.0 - 1.0;
    let fu = fract(grid_wu + 0.5);
    let fv = fract(grid_wv + 0.5);
    let dist_u = min(fu, 1.0 - fu);
    let dist_v = min(fv, 1.0 - fv);
    let dist_diag = abs(fu + fv - 1.0) * 0.7071;
    let dfu = fwidth(grid_wu);
    let dfv = fwidth(grid_wv);
    let dfd = fwidth(fu + fv) * 0.7071;
    let w = 1.0;
    let wire_u = 1.0 - smoothstep(dfu * (w - 0.5), dfu * (w + 0.5), dist_u);
    let wire_v = 1.0 - smoothstep(dfv * (w - 0.5), dfv * (w + 0.5), dist_v);
    let wire_d = 1.0 - smoothstep(dfd * (w - 0.5), dfd * (w + 0.5), dist_diag);
    let wire = max(max(wire_u, wire_v), wire_d);
    result = mix(result, vec3<f32>(0.0), wire * 0.8);
  }

  // Tile border overlay
  if (uniforms.show_tile_borders > 0.5) {
    let grid_u = uv.x * 514.0 - 1.0;
    let grid_v = uv.y * 514.0 - 1.0;
    let border_u = 1.5 * fwidth(grid_u);
    let border_v = 1.5 * fwidth(grid_v);
    if (grid_u < border_u || grid_u > 512.0 - border_u || grid_v < border_v || grid_v > 512.0 - border_v) {
      return vec4<f32>(1.0, 0.0, 0.0, 1.0);
    }
  }

  return finalColor(result);
}
`,Ut=`
struct SkyOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) clip_pos: vec2<f32>,
};

@vertex
fn vs_sky(@builtin(vertex_index) vid: u32) -> SkyOutput {
  // Fullscreen triangle covering [-1,1] clip space
  let x = f32(i32(vid & 1u)) * 4.0 - 1.0;
  let y = f32(i32(vid >> 1u)) * 4.0 - 1.0;
  var out: SkyOutput;
  out.position = vec4<f32>(x, y, 0.0, 1.0);
  out.clip_pos = vec2<f32>(x, y);
  return out;
}
`,Lt=`
`+Re+`

@group(0) @binding(0) var<uniform> globals: GlobalUniforms;

@fragment
fn fs_sky(@location(0) clip_pos: vec2<f32>) -> @location(0) vec4<f32> {
  // Reconstruct view direction in physical space from camera basis
  let right = globals.cam_right.xyz;
  let aspect = globals.cam_right.w;
  let up = globals.cam_up.xyz;
  let half_fov_tan = globals.cam_up.w;
  let fwd = cross(up, right);

  let ray_x = clip_pos.x * half_fov_tan * aspect;
  let ray_y = clip_pos.y * half_fov_tan;
  let view_dir = normalize(ray_x * right + ray_y * up + fwd);

  let cam_h_m = globals.camera_position.w;

  // Compute sky ray distance — cap at 500km, clip at ground for downward rays
  var dist_m = 500000.0;
  if (view_dir.y < -0.001 && cam_h_m > 0.0) {
    dist_m = min(dist_m, cam_h_m / max(-view_dir.y, 0.001));
  }
  let frag_h_m = max(0.0, cam_h_m + dist_m * view_dir.y);

  // Atmosphere parameters
  let sun_dir = globals.sun_direction.xyz;
  let beta_R = globals.rayleigh_params.xyz;
  let H_R = globals.rayleigh_params.w;
  let beta_M = globals.mie_params.x;
  let H_M = globals.mie_params.y;
  let g = globals.mie_params.z;
  let sun_I = globals.mie_params.w;

  // Phase functions
  let cos_theta = dot(view_dir, sun_dir);
  let P_R = 0.0596831 * (1.0 + cos_theta * cos_theta);
  let g2 = g * g;
  let phase_denom = 1.0 + g2 - 2.0 * g * cos_theta;
  let P_M_iso = 0.0795775 * (1.0 - g2) / (phase_denom * sqrt(phase_denom));
  // When the sun is below the horizon, suppress the directional Mie peak
  // (the ground occludes the sun) but keep isotropic Mie scattering for haze.
  // Blend from full directional P_M to isotropic (g=0 → P_M = 0.0795775)
  let sun_vis = smoothstep(-0.02, 0.02, sun_dir.y);
  let P_M = mix(0.0795775, P_M_iso, sun_vis);

  // Numerical single-scattering integration along view ray.
  // Quadratic step distribution (t^2) concentrates samples near the camera
  // where Mie density is highest (H_M = 1200m), while still covering the
  // full ray for Rayleigh (H_R = 8000m).
  const STEPS = 16u;
  var tau_accum = vec3<f32>(0.0);
  var inscatter = vec3<f32>(0.0);

  for (var i = 0u; i < STEPS; i++) {
    let t0 = f32(i) / f32(STEPS);
    let t1 = f32(i + 1u) / f32(STEPS);
    // Quadratic mapping: s = t^2 biases samples toward camera
    let s0 = t0 * t0;
    let s1 = t1 * t1;
    let ds = (s1 - s0) * dist_m;
    let s_mid = (s0 + s1) * 0.5;
    let h = cam_h_m + (frag_h_m - cam_h_m) * s_mid;

    let local_beta_R = beta_R * exp(-h / H_R);
    let local_beta_M = beta_M * exp(-h / H_M);

    // Transmittance from camera to this sample
    let T_cam = exp(-tau_accum);

    // Transmittance from sun to this sample (reddens light at sunset)
    let T_sun = sunTransmittance(h);

    // Inscattered light: sun * T_sun * phase * scattering_coeff * T_cam
    inscatter += sun_I * T_sun * (P_R * local_beta_R + P_M * vec3<f32>(local_beta_M)) * T_cam * ds;

    // Accumulate optical depth for next step
    tau_accum += (local_beta_R + vec3<f32>(local_beta_M)) * ds;
  }

  // Sun disk: angular radius = 0.2665° = 0.00465 rad, cos(0.00465) ≈ 0.9999892
  let cos_sun = dot(view_dir, sun_dir);
  let sun_circle = smoothstep(0.9999792, 0.9999892, cos_sun) * step(0.0, view_dir.y);
  inscatter = mix(inscatter, vec3<f32>(10.0), sun_circle);

  return finalColor(inscatter);
}
`;function Rt(u){const e=[],t=u;return e.push(Me(t[3]+t[0],t[7]+t[4],t[11]+t[8],t[15]+t[12])),e.push(Me(t[3]-t[0],t[7]-t[4],t[11]-t[8],t[15]-t[12])),e.push(Me(t[3]+t[1],t[7]+t[5],t[11]+t[9],t[15]+t[13])),e.push(Me(t[3]-t[1],t[7]-t[5],t[11]-t[9],t[15]-t[13])),e.push(Me(t[2],t[6],t[10],t[14])),e.push(Me(t[3]-t[2],t[7]-t[6],t[11]-t[10],t[15]-t[14])),e}function Me(u,e,t,s){const i=Math.sqrt(u*u+e*e+t*t);return[u/i,e/i,t/i,s/i]}function Pt(u,e,t,s,i,a,o){let n=!0;for(let r=0;r<6;r++){const[l,c,f,h]=u[r],d=l>=0?i:e,p=c>=0?a:t,_=f>=0?o:s,y=l>=0?e:i,g=c>=0?t:a,C=f>=0?s:o;if(l*d+c*p+f*_+h<0)return-1;l*y+c*g+f*C+h<0&&(n=!1)}return n?1:0}function ut(u){const e=u[0],t=u[4],s=u[8],i=-u[12],a=u[1],o=u[5],n=u[9],r=-u[13],l=u[3],c=u[7],f=u[11],h=-u[15],p=1/(e*(o*f-n*c)-t*(a*f-n*l)+s*(a*c-o*l));return[(i*(o*f-n*c)-t*(r*f-n*h)+s*(r*c-o*h))*p,(e*(r*f-n*h)-i*(a*f-n*l)+s*(a*h-r*l))*p,(e*(o*h-r*c)-t*(a*h-r*l)+i*(a*c-o*l))*p]}function ht(u,e,t,s,i,a,o,n){const r=1/(1<<e),l=r/512,c=a-(t+.5)*r,f=o,h=n-(s+.5)*r,d=Math.sqrt(c*c+f*f+h*h);if(d<1e-10)return 1/0;const p=Math.sqrt(u[1]*u[1]+u[5]*u[5]+u[9]*u[9]);return l*p*i*.5/d}function kt(u,e,t,s,i,a){const o=1/(1<<u);let n=0,r=s;const l=a.getElevationBounds(u,e,t);if(l){const c=He(u,t);n=l.minElevation*c*i,r=l.maxElevation*c*i}return{minX:e*o,maxX:(e+1)*o,minY:n,maxY:r,minZ:t*o,maxZ:(t+1)*o}}const zt=14,It=4,Ft=200;function je(u,e,t,s,i,a,o,n,r){const l=Rt(u),[c,f,h]=ut(u),d=[],p=o&&o.minZoom!=null?o.minZoom:It,_=o&&o.maxZoom!=null?o.maxZoom:zt;function y(g,C,T){if(d.length>=Ft)return;const{minX:m,maxX:S,minY:B,maxY:v,minZ:P,maxZ:X}=kt(g,C,T,s,i,n);if(o&&(S<o.minX||m>o.maxX||X<o.minY||P>o.maxY)||Pt(l,m,B,P,S,v,X)===-1)return;if(g<p){const x=g+1,w=C*2,k=T*2;y(x,w,k),y(x,w+1,k),y(x,w,k+1),y(x,w+1,k+1);return}if(!n.hasTile(g,C,T)){n.requestTile(g,C,T);return}if(g<_&&ht(u,g,C,T,t,c,f,h)>a){const x=g+1,w=C*2,k=T*2;if(n.isResolved(x,w,k)&&n.isResolved(x,w+1,k)&&n.isResolved(x,w,k+1)&&n.isResolved(x,w+1,k+1)&&(!r||r(x,w,k)&r(x,w+1,k)&r(x,w,k+1)&r(x,w+1,k+1))){y(x,w,k),y(x,w+1,k),y(x,w,k+1),y(x,w+1,k+1);return}n.hasTile(x,w,k)?r&&r(x,w,k):n.requestTile(x,w,k),n.hasTile(x,w+1,k)?r&&r(x,w+1,k):n.requestTile(x,w+1,k),n.hasTile(x,w,k+1)?r&&r(x,w,k+1):n.requestTile(x,w,k+1),n.hasTile(x,w+1,k+1)?r&&r(x,w+1,k+1):n.requestTile(x,w+1,k+1)}d.push({z:g,x:C,y:T})}return y(0,0,0),d}const Le=10,Je=349525,Ae=new Uint32Array(Le);{let u=1;for(let e=0;e<Le;e++)Ae[e]=(u-1)/3,u*=4}function Gt(u){const e=new Float32Array(Je),t=new Float32Array(Je),s=Le-1,i=Ae[s],a=512,o=514;for(let n=0;n<a;n++)for(let r=0;r<a;r++){const l=n+1,c=r+1,f=u[l*o+c],h=u[l*o+c+1],d=u[(l+1)*o+c],p=u[(l+1)*o+c+1],_=i+n*a+r;e[_]=Math.min(f,h,d,p),t[_]=Math.max(f,h,d,p)}for(let n=s-1;n>=0;n--){const r=Ae[n],l=Ae[n+1],c=1<<n,f=1<<n+1;for(let h=0;h<c;h++)for(let d=0;d<c;d++){const p=r+h*c+d,_=h*2,y=d*2,g=l+_*f+y,C=g+1,T=l+(_+1)*f+y,m=T+1;e[p]=Math.min(e[g],e[C],e[T],e[m]),t[p]=Math.max(t[g],t[C],t[T],t[m])}}return{minElev:e,maxElev:t}}function Dt(u,e,t,s,i,a,o,n,r,l,c,f){let h,d;if(s!==0){let p=(o-u)/s,_=(l-u)/s;if(p>_){const y=p;p=_,_=y}h=p,d=_}else{if(u<o||u>l)return null;h=-1/0,d=1/0}if(i!==0){let p=(n-e)/i,_=(c-e)/i;if(p>_){const y=p;p=_,_=y}p>h&&(h=p),_<d&&(d=_)}else if(e<n||e>c)return null;if(h>d)return null;if(a!==0){let p=(r-t)/a,_=(f-t)/a;if(p>_){const y=p;p=_,_=y}p>h&&(h=p),_<d&&(d=_)}else if(t<r||t>f)return null;return h>d||d<0?null:[h,d]}function et(u,e,t,s,i,a,o,n,r,l,c,f,h,d,p){const _=l-o,y=c-n,g=f-r,C=h-o,T=d-n,m=p-r,S=i*m-a*T,B=a*C-s*m,v=s*T-i*C,P=_*S+y*B+g*v;if(P<1e-10)return-1;const X=1/P,A=u-o,K=e-n,H=t-r,x=(A*S+K*B+H*v)*X;if(x<0||x>1)return-1;const w=K*g-H*y,k=H*_-A*g,Q=A*y-K*_,ee=(s*w+i*k+a*Q)*X;if(ee<0||x+ee>1)return-1;const O=(C*w+T*k+m*Q)*X;return O>0?O:-1}function Ot(u,e,t,s,i,a,o,n,r){let l=1/0,c=-1,f=-1;const h=new Int32Array(Le*4*3);let d=0;h[d++]=0,h[d++]=0,h[d++]=0;const p=514;for(;d>0;){const _=h[--d],y=h[--d],g=h[--d],C=Ae[g],T=1<<g,m=C+y*T+_,S=512>>>g,B=_*S,v=B+S,P=y*S,X=P+S,A=u[m],K=e[m],H=Dt(s,i,a,o,n,r,B,A,P,v,K,X);if(H&&!(H[0]>=l))if(g===Le-1){const x=y+1,w=_+1,k=t[x*p+w],Q=t[x*p+w+1],ee=t[(x+1)*p+w],O=t[(x+1)*p+w+1];let D=et(s,i,a,o,n,r,_,k,y,_,ee,y+1,_+1,Q,y);D>0&&D<l&&(l=D,c=y,f=_),D=et(s,i,a,o,n,r,_+1,Q,y,_,ee,y+1,_+1,O,y+1),D>0&&D<l&&(l=D,c=y,f=_)}else{const x=g+1,w=y*2,k=_*2;h[d++]=x,h[d++]=w,h[d++]=k,h[d++]=x,h[d++]=w,h[d++]=k+1,h[d++]=x,h[d++]=w+1,h[d++]=k,h[d++]=x,h[d++]=w+1,h[d++]=k+1}}return l===1/0?null:{t:l,patchRow:c,patchCol:f}}const Xt=150,Yt=8,Wt=new OffscreenCanvas(514,514),tt=Wt.getContext("2d",{willReadFrequently:!0});function qt(u){tt.drawImage(u,0,0);const{data:e}=tt.getImageData(0,0,514,514),t=new Float32Array(514*514);let s=1/0,i=-1/0;for(let a=0;a<514*514;a++){const o=a*4,n=-1e4+(e[o]*65536+e[o+1]*256+e[o+2])*.1;t[a]=n,n<s&&(s=n),n>i&&(i=n)}return{elevations:t,minElevation:s,maxElevation:i}}class Nt{constructor(e,{tileUrl:t}={}){this.device=e,this.tileUrl=t||((s,i,a)=>`tiles/${s}/${i}/${a}.webp`),this.cache=new Map,this.pending=new Map,this.failed=new Set,this.activeRequests=0,this.requestQueue=[],this.bindGroupLayout=null,this.onTileResolved=null,this.wantedKeys=new Set,this.bounds=null,this.aabbCache=new Map}getElevationBounds(e,t,s){return this.aabbCache.get(this._key(e,t,s))||null}setBounds(e){this.bounds=e}setBindGroupLayout(e){this.bindGroupLayout=e,this._flatTileTexture=null,this._flatTileBindGroup=null,this._flatTileElevations=null}_ensureFlatTile(){if(this._flatTileTexture)return;this._flatTileElevations=new Float32Array(514*514),this._flatTileTexture=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});const e=2304;this.device.queue.writeTexture({texture:this._flatTileTexture},new Uint8Array(e*514),{bytesPerRow:e},[514,514]),this._flatTileBindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:this._flatTileTexture.createView()}]})}_cacheFlatTile(e){this._ensureFlatTile(),this.aabbCache.set(e,{minElevation:0,maxElevation:0}),this.cache.set(e,{texture:this._flatTileTexture,bindGroup:this._flatTileBindGroup,elevations:this._flatTileElevations,quadtree:null,minElevation:0,maxElevation:0,lastUsed:performance.now(),isFlat:!0})}_key(e,t,s){return`${e}/${t}/${s}`}hasTile(e,t,s){const i=this._key(e,t,s);this.wantedKeys.add(i);const a=this.cache.get(i);return a?(a.lastUsed=performance.now(),!0):!1}isResolved(e,t,s){const i=this._key(e,t,s);return this.wantedKeys.add(i),this.cache.has(i)||this.failed.has(i)}getTile(e,t,s){const i=this._key(e,t,s),a=this.cache.get(i);return a?(a.lastUsed=performance.now(),a):null}requestTile(e,t,s){const i=this._key(e,t,s);if(this.wantedKeys.add(i),!(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))){if(this.bounds&&this._isOutOfBounds(e,t,s)){this.failed.add(i);return}this.requestQueue.push({z:e,x:t,y:s,key:i}),this._processQueue()}}_isOutOfBounds(e,t,s){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),o=t*a,n=(t+1)*a,r=s*a,l=(s+1)*a;return n<i.minX||o>i.maxX||l<i.minY||r>i.maxY}_processQueue(){for(;this.activeRequests<Yt&&this.requestQueue.length>0;){const{z:e,x:t,y:s,key:i}=this.requestQueue.shift();if(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))continue;this.activeRequests++;const a=new AbortController;this.pending.set(i,a),this._loadTile(e,t,s,i,a.signal).finally(()=>{this.pending.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,s,i,a){try{const o=this.tileUrl(e,t,s),n=await fetch(o,{signal:a});if(!n.ok){this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,s);return}const r=await n.blob(),l=await createImageBitmap(r,{colorSpaceConversion:"none"}),{elevations:c,minElevation:f,maxElevation:h}=qt(l);if(l.close(),this.aabbCache.set(i,{minElevation:f,maxElevation:h}),a.aborted)return;const d=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),p=2304,_=new Uint8Array(p*514),y=new Uint8Array(c.buffer);for(let C=0;C<514;C++)_.set(y.subarray(C*514*4,(C+1)*514*4),C*p);this.device.queue.writeTexture({texture:d},_,{bytesPerRow:p},[514,514]);const g=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:d.createView()}]});this.cache.set(i,{texture:d,bindGroup:g,elevations:c,quadtree:null,minElevation:f,maxElevation:h,lastUsed:performance.now()}),this.onTileResolved&&this.onTileResolved(e,t,s)}catch(o){if(o.name==="AbortError")return;this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,s)}}ensureQuadtree(e,t,s){const i=this.cache.get(this._key(e,t,s));return i?(i.quadtree||(i.quadtree=Gt(i.elevations)),i):null}stripQuadtrees(){for(const[e,t]of this.cache)!this.wantedKeys.has(e)&&t.quadtree&&(t.quadtree=null)}cancelStale(){for(const[e,t]of this.pending)this.wantedKeys.has(e)||t.abort()}evict(){for(;this.cache.size>Xt;){let e=null,t=1/0;for(const[i,a]of this.cache)this.wantedKeys.has(i)||a.lastUsed<t&&(t=a.lastUsed,e=i);if(!e)break;const s=this.cache.get(e);s.isFlat||s.texture.destroy(),this.cache.delete(e)}}beginFrame(){this.requestQueue=[],this.wantedKeys=new Set}}const Ht=8;class Vt{constructor({tileUrl:e}={}){this.tileUrl=e||((t,s,i)=>`sentinel_tiles/${t}/${s}/${i}.webp`),this.fetched=new Map,this.pending=new Map,this.abortControllers=new Map,this.failed=new Set,this.consumers=new Map,this.terrainToSat=new Map,this.activeRequests=0,this.requestQueue=[],this.onTileLoaded=null,this.bounds=null}setBounds(e){this.bounds=e}_key(e,t,s){return`${e}/${t}/${s}`}getBitmap(e,t,s){return this.fetched.get(this._key(e,t,s))||null}isFailed(e,t,s){return this.failed.has(this._key(e,t,s))}requestTile(e,t,s,i){const a=this._key(e,t,s);let o=this.consumers.get(a);o||(o=new Set,this.consumers.set(a,o)),o.add(i);let n=this.terrainToSat.get(i);if(n||(n=new Set,this.terrainToSat.set(i,n)),n.add(a),!(this.fetched.has(a)||this.failed.has(a)||this.pending.has(a))){if(this.bounds&&this._isOutOfBounds(e,t,s)){this.failed.add(a);return}this.requestQueue.push({z:e,x:t,y:s,key:a}),this._processQueue()}}_isOutOfBounds(e,t,s){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),o=t*a,n=(t+1)*a,r=s*a,l=(s+1)*a;return n<i.minX||o>i.maxX||l<i.minY||r>i.maxY}getConsumers(e,t,s){return this.consumers.get(this._key(e,t,s))||null}removeConsumer(e){const t=this.terrainToSat.get(e);if(t){for(const s of t){const i=this.consumers.get(s);if(i&&(i.delete(e),i.size===0)){this.consumers.delete(s);const a=this.abortControllers.get(s);a&&(a.abort(),this.abortControllers.delete(s));const o=this.fetched.get(s);o&&(o.close(),this.fetched.delete(s))}}this.terrainToSat.delete(e)}}beginFrame(){this.requestQueue=[]}_processQueue(){for(;this.activeRequests<Ht&&this.requestQueue.length>0;){const{z:e,x:t,y:s,key:i}=this.requestQueue.shift();if(this.fetched.has(i)||this.pending.has(i)||this.failed.has(i))continue;const a=this.consumers.get(i);if(!a||a.size===0)continue;this.activeRequests++;const o=new AbortController;this.abortControllers.set(i,o);const n=this._loadTile(e,t,s,i,o.signal);this.pending.set(i,n),n.finally(()=>{this.pending.delete(i),this.abortControllers.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,s,i,a){try{const o=this.tileUrl(e,t,s),n=await fetch(o,{signal:a});if(!n.ok){this.failed.add(i);return}const r=await n.blob(),l=await createImageBitmap(r);this.fetched.set(i,l),this.onTileLoaded&&this.onTileLoaded(e,t,s)}catch(o){if(o.name==="AbortError")return;this.failed.add(i)}}}const ce=512,Zt=4;class $t{constructor(e,t,s,i){this.device=e,this.layers=t,this.bindGroupLayout=s,this.sampler=i,this.entries=new Map,this.onUpdate=null;for(const a of t)a.imageryManager.onTileLoaded=(o,n,r)=>this._onSatelliteTileLoaded(a,o,n,r)}_terrainKey(e,t,s){return`${e}/${t}/${s}`}ensureImagery(e,t,s,i){const a=this._terrainKey(e,t,s),o=this.entries.get(a);if(o){o.lastUsed=performance.now();return}const n=new OffscreenCanvas(ce,ce),r=n.getContext("2d"),l=this.device.createTexture({size:[ce,ce],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),c=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:l.createView()},{binding:1,resource:this.sampler}]}),f=this.layers.map(d=>{const p=Math.min(i,d.maxzoom);return{satTiles:bt(e,t,s,p),imageryManager:d.imageryManager}}),h={canvas:n,ctx:r,texture:l,bindGroup:c,layerData:f,tz:e,tx:t,ty:s,needsUpload:!1,hasContent:!1,lastUsed:performance.now()};this.entries.set(a,h);for(const d of f)for(const p of d.satTiles)d.imageryManager.requestTile(p.z,p.x,p.y,a);this._recomposite(h),h.needsUpload&&this._upload(h)}getBindGroup(e,t,s){const i=this.entries.get(this._terrainKey(e,t,s));return i?i.bindGroup:null}hasImagery(e,t,s){const i=this.entries.get(this._terrainKey(e,t,s));return i?i.hasContent:!1}gc(e){for(const[t,s]of this.entries)if(!(e&&e.has(t))){s.texture.destroy();for(const i of s.layerData)i.imageryManager.removeConsumer(t);this.entries.delete(t)}}release(e,t,s){const i=this._terrainKey(e,t,s),a=this.entries.get(i);if(a){a.texture.destroy();for(const o of a.layerData)o.imageryManager.removeConsumer(i);this.entries.delete(i)}}_onSatelliteTileLoaded(e,t,s,i){const a=e.imageryManager.getConsumers(t,s,i);if(a){for(const o of a){const n=this.entries.get(o);n&&(this._recomposite(n),this._upload(n))}this.onUpdate&&this.onUpdate()}}_recomposite(e){const{ctx:t}=e;t.clearRect(0,0,ce,ce),this._fillFromAncestor(e);let s=e.hasContent;for(let i=0;i<this.layers.length;i++){const a=this.layers[i],o=e.layerData[i];t.globalCompositeOperation=a.blend||"source-over",t.globalAlpha=a.opacity!=null?a.opacity:1;for(const n of o.satTiles){const r=o.imageryManager.getBitmap(n.z,n.x,n.y);if(!r)continue;s=!0;const l=Ze(e.tz,e.tx,e.ty,n.z,n.x,n.y);t.drawImage(r,l.offsetU*ce,l.offsetV*ce,l.scaleU*ce,l.scaleV*ce)}}t.globalCompositeOperation="source-over",t.globalAlpha=1,s&&(e.needsUpload=!0,e.hasContent=!0)}_fillFromAncestor(e){const{tz:t,tx:s,ty:i,ctx:a}=e;for(let o=1;o<=t-Zt;o++){const n=t-o,r=s>>o,l=i>>o,c=this.entries.get(this._terrainKey(n,r,l));if(c&&c.hasContent){const f=Ze(t,s,i,n,r,l);a.drawImage(c.canvas,f.offsetU*ce,f.offsetV*ce,f.scaleU*ce,f.scaleV*ce),e.needsUpload=!0,e.hasContent=!0;return}}}_upload(e){this.device.queue.copyExternalImageToTexture({source:e.canvas},{texture:e.texture},[ce,ce]),e.needsUpload=!1}}class it{constructor(){this.features=[],this.lineFeatures=[]}async load(e,t={}){let s;typeof e=="string"?s=await(await fetch(e)).json():s=e;const i=t.simplify,a=t.simplifyFn;this.features=[],this.lineFeatures=[];for(const o of s.features)if(o.geometry){if(o.geometry.type==="Point"){const[n,r]=o.geometry.coordinates;this.features.push({mercatorX:Ge(n),mercatorY:Fe(r),lon:n,lat:r,properties:o.properties||{}})}else if(o.geometry.type==="LineString"||o.geometry.type==="MultiLineString"){const n=o.geometry.type==="MultiLineString"?o.geometry.coordinates:[o.geometry.coordinates];let r=[];for(const c of n)for(const f of c){const h=r[r.length-1];h&&h[0]===f[0]&&h[1]===f[1]||r.push(f)}if(i!=null&&a){const c=r.map(([h,d,p])=>({x:h,y:d,elev:p||0}));r=a(c,i,!0).map(h=>[h.x,h.y,h.elev])}const l=r.map(([c,f,h])=>({mercatorX:Ge(c),mercatorY:Fe(f),elevation:h||0,lon:c,lat:f}));this.lineFeatures.push({coordinates:l,properties:o.properties||{}})}}return this}}const Qt=`
struct CircleUniforms {
  projection_view: mat4x4<f32>,
  viewport_size: vec2<f32>,
  pixel_ratio: f32,
  exaggeration: f32,
  atmosphere_opacity: f32,
};

struct InstanceData {
  @location(0) world_pos: vec3<f32>,
  @location(1) radius: f32,
  @location(2) fill_color: vec4<f32>,
  @location(3) stroke_color: vec4<f32>,
  @location(4) stroke_width: f32,
  @location(5) opacity: f32,
};

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) local_pos: vec2<f32>,
  @location(1) world_pos: vec3<f32>,
  @location(2) fill_color: vec4<f32>,
  @location(3) stroke_color: vec4<f32>,
  @location(4) radius_px: f32,
  @location(5) stroke_width_px: f32,
  @location(6) opacity: f32,
};

@group(1) @binding(0) var<uniform> circle: CircleUniforms;

// 6 vertices forming a quad: 2 triangles
const quad_positions = array<vec2<f32>, 6>(
  vec2<f32>(-1.0, -1.0),
  vec2<f32>( 1.0, -1.0),
  vec2<f32>(-1.0,  1.0),
  vec2<f32>(-1.0,  1.0),
  vec2<f32>( 1.0, -1.0),
  vec2<f32>( 1.0,  1.0),
);

@vertex
fn vs_circle(
  @builtin(vertex_index) vertex_index: u32,
  instance: InstanceData,
) -> VertexOutput {
  var out: VertexOutput;

  let clip_center = circle.projection_view * vec4<f32>(instance.world_pos, 1.0);

  // Total size = radius + stroke_width + 1px AA margin
  let total_radius = (instance.radius + instance.stroke_width + 1.0) * circle.pixel_ratio;

  let corner = quad_positions[vertex_index];
  let offset_ndc = corner * total_radius * 2.0 / circle.viewport_size;

  out.position = vec4<f32>(
    clip_center.xy + offset_ndc * clip_center.w,
    clip_center.z,
    clip_center.w,
  );
  out.local_pos = corner * total_radius;
  out.world_pos = instance.world_pos;
  out.fill_color = instance.fill_color;
  out.stroke_color = instance.stroke_color;
  out.radius_px = instance.radius * circle.pixel_ratio;
  out.stroke_width_px = instance.stroke_width * circle.pixel_ratio;
  out.opacity = instance.opacity;

  return out;
}
`,Kt=`
struct CircleUniforms {
  projection_view: mat4x4<f32>,
  viewport_size: vec2<f32>,
  pixel_ratio: f32,
  exaggeration: f32,
  atmosphere_opacity: f32,
};

`+Re+`

@group(0) @binding(0) var<uniform> globals: GlobalUniforms;
@group(1) @binding(0) var<uniform> circle: CircleUniforms;

fn srgbToLinear(c: vec3<f32>) -> vec3<f32> {
  return pow(c, vec3<f32>(2.2));
}

fn applyAtmosphereCircle(color: vec3<f32>, world_pos: vec3<f32>) -> vec3<f32> {
  let cam_pos = globals.camera_position.xyz;
  let cam_h_m = globals.camera_position.w;
  let mpu = globals.sun_direction.w;

  let world_ray = world_pos - cam_pos;
  let frag_h_m = world_pos.y * mpu / max(circle.exaggeration, 1e-6);
  let phys_ray = vec3<f32>(world_ray.x * mpu, frag_h_m - cam_h_m, world_ray.z * mpu);
  let dist_m = length(phys_ray);
  if (dist_m < 0.1) { return color; }
  let view_dir = phys_ray / dist_m;

  let result = computeScattering(cam_h_m, frag_h_m, dist_m, view_dir);
  let T = result[0];
  let inscatter = result[1];

  return color * T + inscatter * (vec3<f32>(1.0) - T);
}

struct FragInput {
  @location(0) local_pos: vec2<f32>,
  @location(1) world_pos: vec3<f32>,
  @location(2) fill_color: vec4<f32>,
  @location(3) stroke_color: vec4<f32>,
  @location(4) radius_px: f32,
  @location(5) stroke_width_px: f32,
  @location(6) opacity: f32,
};

@fragment
fn fs_circle(in: FragInput) -> @location(0) vec4<f32> {
  let dist = length(in.local_pos);
  let outer_radius = in.radius_px + in.stroke_width_px;

  // Antialiased outer edge
  let outer_alpha = 1.0 - smoothstep(outer_radius - 0.5, outer_radius + 0.5, dist);
  if (outer_alpha < 0.001) {
    discard;
  }

  // Fill/stroke boundary
  let stroke_mix = smoothstep(in.radius_px - 0.5, in.radius_px + 0.5, dist);
  let color = mix(in.fill_color, in.stroke_color, stroke_mix);

  // Apply atmosphere scattering + tonemap
  let linear_color = srgbToLinear(color.rgb);
  let atmos_color = applyAtmosphereCircle(linear_color, in.world_pos);
  let mixed = mix(linear_color, atmos_color, circle.atmosphere_opacity);

  return vec4<f32>(linearToSrgb(acesTonemap(mixed)), color.a * outer_alpha * in.opacity);
}
`,Oe=1e4,We=14,Xe=We*4;function st(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}class jt{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._radius=i["circle-radius"]||4,this._fillColor=st(i["circle-color"]||"#ff3333"),this._strokeColor=st(i["circle-stroke-color"]||"#ffffff"),this._strokeWidth=i["circle-stroke-width"]||0,this._opacity=i["circle-opacity"]!=null?i["circle-opacity"]:1,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._pipelineDepthTest=null,this._pipelineNoDepthTest=null,this._instanceBuffer=null,this._instanceData=null,this._uniformBuffer=null,this._uniformBindGroup=null,this._visibleCount=0,this._visibleFeatures=null}init(e,t,s){this._device=e;const i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._instanceData=new Float32Array(Oe*We),this._instanceBuffer=e.createBuffer({size:Oe*Xe,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});const a=e.createShaderModule({code:Qt}),o=e.createShaderModule({code:Kt}),n=e.createPipelineLayout({bindGroupLayouts:[t,i]}),r={module:a,entryPoint:"vs_circle",buffers:[{arrayStride:Xe,stepMode:"instance",attributes:[{format:"float32x3",offset:0,shaderLocation:0},{format:"float32",offset:12,shaderLocation:1},{format:"float32x4",offset:16,shaderLocation:2},{format:"float32x4",offset:32,shaderLocation:3},{format:"float32",offset:48,shaderLocation:4},{format:"float32",offset:52,shaderLocation:5}]}]},l={module:o,entryPoint:"fs_circle",targets:[{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]};this._pipelineDepthTest=e.createRenderPipeline({layout:n,vertex:r,fragment:l,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"}}),this._pipelineNoDepthTest=e.createRenderPipeline({layout:n,vertex:r,fragment:l,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}})}prepare(e,t,s,i,a,o){const n=this._source.features,r=this._instanceData;let l=0;for(let f=0;f<n.length&&l<Oe;f++){const h=n[f],d=this._queryElevation(h.mercatorX,h.mercatorY);if(d==null||d<=0||this._visibleFeatures&&!this._visibleFeatures.has(f))continue;const p=h.mercatorX,_=d*o*a,y=h.mercatorY,g=e[0]*p+e[4]*_+e[8]*y+e[12],C=e[1]*p+e[5]*_+e[9]*y+e[13],T=e[3]*p+e[7]*_+e[11]*y+e[15];if(T<=0)continue;const m=g/T,S=C/T,B=.2;if(m<-1-B||m>1+B||S<-1-B||S>1+B)continue;const v=l*We;r[v]=p,r[v+1]=_,r[v+2]=y,r[v+3]=this._radius,r[v+4]=this._fillColor[0],r[v+5]=this._fillColor[1],r[v+6]=this._fillColor[2],r[v+7]=this._fillColor[3],r[v+8]=this._strokeColor[0],r[v+9]=this._strokeColor[1],r[v+10]=this._strokeColor[2],r[v+11]=this._strokeColor[3],r[v+12]=this._strokeWidth,r[v+13]=this._opacity,l++}this._visibleCount=l,l>0&&this._device.queue.writeBuffer(this._instanceBuffer,0,r.buffer,0,l*Xe);const c=new Float32Array(24);c.set(e,0),c[16]=t,c[17]=s,c[18]=i,c[19]=a,c[20]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._uniformBuffer,0,c)}draw(e,t,s=!0){this._visibleCount!==0&&(e.setPipeline(s?this._pipelineDepthTest:this._pipelineNoDepthTest),e.setBindGroup(0,t),e.setBindGroup(1,this._uniformBindGroup),e.setVertexBuffer(0,this._instanceBuffer),e.draw(6,this._visibleCount))}getCollisionItems(e,t,s,i,a,o){const n=this._source.features,r=t/i,l=s/i,c=this._radius+this._strokeWidth,f=[];for(let h=0;h<n.length;h++){const d=n[h],p=this._queryElevation(d.mercatorX,d.mercatorY);if(p==null||p<=0)continue;const _=d.mercatorX,y=p*o*a,g=d.mercatorY,C=e[0]*_+e[4]*y+e[8]*g+e[12],T=e[1]*_+e[5]*y+e[9]*g+e[13],m=e[2]*_+e[6]*y+e[10]*g+e[14],S=e[3]*_+e[7]*y+e[11]*g+e[15];if(S<=0)continue;const B=C/S,v=T/S;B<-1.2||B>1.2||v<-1.2||v>1.2||f.push({layerIndex:-1,featureIndex:h,sourceFeatureIndex:h,screenX:(B*.5+.5)*r,screenY:(.5-v*.5)*l,halfW:c,halfH:c,depth:m/S,clipW:S})}return f}setVisibleFeatures(e){this._visibleFeatures=e}}const Ie=96,Se=Ie/4;function Jt(u,e){const{fontAtlas:t,vertexTransform:s=ei,vertexProjection:i=ti,fragmentShaderBody:a=ii,colorTargets:o,depthStencil:n,multisample:r,initialCapacity:l=1024}=e,c=Array.isArray(o)?o:[o];let f=[],h=0,d=!1,p=0,_=l,y=u.createBuffer({label:"gpu-text-characters",size:_*Ie,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),g=new Float32Array(_*Se);const C=u.createBuffer({label:"gpu-text-uniforms",size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),T=u.createSampler({label:"gpu-text-sampler",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),m=si(s,i),S=ri(a),B=u.createShaderModule({label:"gpu-text-vertex",code:m}),v=u.createShaderModule({label:"gpu-text-fragment",code:S}),P=u.createRenderPipeline({label:"gpu-text",layout:"auto",vertex:{module:B,entryPoint:"vertexMain"},fragment:{module:v,entryPoint:"fragmentMain",targets:c},primitive:{topology:"triangle-strip",stripIndexFormat:void 0,cullMode:"none"},depthStencil:n,multisample:r}),X=u.createBindGroup({layout:P.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:C}}]});let A=K();function K(){return u.createBindGroup({layout:P.getBindGroupLayout(1),entries:[{binding:0,resource:T},{binding:1,resource:t.textureView},{binding:2,resource:{buffer:y}}]})}let H=-1,x=-1,w=!1;function k(z){let W=0;for(const M of z)t.glyphs.has(M)&&M!==" "&&M!=="	"&&M!==`
`&&W++;return W}function Q(z){if(z<=_)return;let W=_;for(;W<z;)W*=2;const M=u.createBuffer({label:"gpu-text-characters",size:W*Ie,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),U=new Float32Array(W*Se);U.set(g),p>0&&u.queue.writeBuffer(M,0,U,0,p*Se),y.destroy(),y=M,g=U,_=W,A=K()}function ee(z,W){let M=0,U=0,j=0;for(const Y of z){if(Y===" "){const ae=t.glyphs.get(" ");M+=ae?ae.xAdvance*W:t.fontSize*.3*W;continue}if(Y==="	"){const ae=t.glyphs.get(" "),ye=ae?ae.xAdvance:t.fontSize*.3;M+=ye*4*W;continue}if(Y===`
`)continue;const se=t.glyphs.get(Y);if(!se)continue;M+=se.xAdvance*W;const oe=-se.yOffset*W,ie=se.height*W-oe;U=Math.max(U,oe),j=Math.max(j,ie)}return{width:M,ascent:U,descent:j}}function O(z){const{text:W,anchor:M,offset:U,fontSize:j,color:Y,strokeColor:se,strokeWidth:oe,bufferOffset:ie,align:ae,baseline:ye}=z,Pe=j/t.fontSize,Ee=t.width,ke=t.height,b=ee(W,1);let I=0;ae==="center"?I=-b.width/2:ae==="right"&&(I=-b.width);let E=0;ye==="top"?E=b.ascent:ye==="middle"?E=(b.ascent-b.descent)/2:ye==="bottom"&&(E=-b.descent);let R=I,F=E,L=0;for(const N of W){if(N===" "){const $=t.glyphs.get(" ");$?R+=$.xAdvance:R+=t.fontSize*.3;continue}if(N==="	"){const $=t.glyphs.get(" "),J=$?$.xAdvance:t.fontSize*.3;R+=J*4;continue}if(N===`
`)continue;const V=t.glyphs.get(N);if(!V)continue;const G=(ie+L)*Se;g[G+0]=V.x/Ee,g[G+1]=V.y/ke,g[G+2]=(V.x+V.width)/Ee,g[G+3]=(V.y+V.height)/ke,g[G+4]=Y[0],g[G+5]=Y[1],g[G+6]=Y[2],g[G+7]=Y[3],g[G+8]=M[0],g[G+9]=M[1],g[G+10]=M[2],g[G+11]=M[3],g[G+12]=se[0],g[G+13]=se[1],g[G+14]=se[2],g[G+15]=se[3],g[G+16]=R+V.xOffset,g[G+17]=F+V.yOffset,g[G+18]=U[0],g[G+19]=U[1],g[G+20]=V.width,g[G+21]=V.height,g[G+22]=Pe,g[G+23]=oe,R+=V.xAdvance,L++}const q=ie*Ie,Z=ie*Se;u.queue.writeBuffer(y,q,g,Z,z.characterCount*Se),z.dirty=!1}function D(){if(!d)return;const z=f.filter(M=>!M.destroyed);let W=0;for(const M of z)M.bufferOffset!==W&&(M.bufferOffset=W,M.dirty=!0),W+=M.characterCount;p=W,f=z;for(const M of f)M.dirty&&O(M);d=!1}function he(z){return z.length===2?[z[0],z[1],0,1]:z.length===3?[z[0],z[1],z[2],1]:[z[0],z[1],z[2],z[3]]}return{createSpan(z){const W=k(z.text);Q(p+W);const M={id:h++,text:z.text,anchor:he(z.position),offset:z.offset??[0,0],fontSize:z.fontSize??t.fontSize,color:z.color?[...z.color]:[1,1,1,1],strokeColor:z.strokeColor?[...z.strokeColor]:[0,0,0,0],strokeWidth:z.strokeWidth??0,align:z.align??"left",baseline:z.baseline??"baseline",bufferOffset:p,characterCount:W,destroyed:!1,dirty:!0};return f.push(M),p+=W,O(M),{setText(U){if(M.destroyed)return;const j=k(U);j!==M.characterCount?(M.destroyed=!0,d=!0,D(),Q(p+j),M.destroyed=!1,M.text=U,M.characterCount=j,M.bufferOffset=p,M.dirty=!0,f.push(M),p+=j):(M.text=U,M.dirty=!0),O(M)},setPosition(U){M.destroyed||(M.anchor=he(U),M.dirty=!0,O(M))},setOffset(U){M.destroyed||(M.offset=[...U],M.dirty=!0,O(M))},setFontSize(U){M.destroyed||(M.fontSize=U,M.dirty=!0,O(M))},setColor(U){M.destroyed||(M.color=[...U],M.dirty=!0,O(M))},setStrokeColor(U){M.destroyed||(M.strokeColor=[...U],M.dirty=!0,O(M))},setStrokeWidth(U){M.destroyed||(M.strokeWidth=U,M.dirty=!0,O(M))},setAlign(U){M.destroyed||(M.align=U,M.dirty=!0,O(M))},setBaseline(U){M.destroyed||(M.baseline=U,M.dirty=!0,O(M))},getText(){return M.text},getCharacterCount(){return M.characterCount},destroy(){M.destroyed||(M.destroyed=!0,d=!0)},isDestroyed(){return M.destroyed}}},getBindGroupLayout(z){return P.getBindGroupLayout(z)},updateUniforms(z){const{resolution:W,viewMatrix:M}=z;if(!w||W[0]!==H||W[1]!==x||M!==void 0){const j=new ArrayBuffer(96),Y=new Float32Array(j);Y[0]=W[0],Y[1]=W[1],Y[2]=1,Y[3]=t.fieldRange??4,Y[4]=t.width,Y[5]=t.height,Y[6]=0,Y[7]=0,M?Y.set(M,8):(Y[8]=1,Y[9]=0,Y[10]=0,Y[11]=0,Y[12]=0,Y[13]=1,Y[14]=0,Y[15]=0,Y[16]=0,Y[17]=0,Y[18]=1,Y[19]=0,Y[20]=0,Y[21]=0,Y[22]=0,Y[23]=1),u.queue.writeBuffer(C,0,j),H=W[0],x=W[1],w=!0}},compact:D,draw(z,W,M=[]){if(d&&D(),W.skipUniformUpdate||this.updateUniforms(W),p!==0){z.setPipeline(P),z.setBindGroup(0,X),z.setBindGroup(1,A);for(let U=0;U<M.length;U++)z.setBindGroup(U+2,M[U]);z.draw(4,p)}},getTotalCharacterCount(){return p},destroy(){y.destroy(),C.destroy()}}}const ei=`
fn getVertex(position: vec4f) -> vec4f {
  return uniforms.viewMatrix * position;
}
`,ti=`
fn projectVertex(position: vec3f, uv: vec2f, color: vec4f) -> vec4f {
  // Convert screen pixels to clip space (NDC with Y flipped)
  let x = position.x / uniforms.resolution.x * 2.0 - 1.0;
  let y = 1.0 - position.y / uniforms.resolution.y * 2.0;
  return vec4f(x, y, position.z, 1.0);
}
`,ii=`
// Median of three values - core of MSDF technique
// The median preserves sharp corners that single-channel SDF would round off
fn median3(r: f32, g: f32, b: f32) -> f32 {
  return max(min(r, g), min(max(r, g), b));
}

// Compute screen pixel range - how many screen pixels the SDF field range spans
// This is the proper way to determine antialiasing width for SDF rendering
fn screenPxRange(uv: vec2f) -> f32 {
  // fieldRange is in atlas pixels, atlasSize converts UV to atlas pixels
  // fwidth(uv) tells us UV change per screen pixel
  // So: fieldRange / (fwidth(uv) * atlasSize) = screen pixels per field range
  let unitRange = uniforms.fieldRange / uniforms.atlasSize;
  let screenTexSize = 1.0 / fwidth(uv);
  return max(0.5 * dot(unitRange, screenTexSize), 1.0);
}

fn getColor(uv: vec2f, color: vec4f, strokeColor: vec4f, strokeWidth: f32, msdf: vec4f, anchor: vec4f) -> vec4f {
  // Use median of RGB (MSDF technique) for both fill and stroke
  // This preserves sharp corners; works for stroke now that we use fwidth(uv) not fwidth(sdf)
  let sd = median3(msdf.r, msdf.g, msdf.b);

  // Compute screen pixel range for proper antialiasing
  let pxRange = screenPxRange(uv);

  // Convert SDF distance to screen pixels (recommended MSDF approach)
  // SDF is 0-1 where 0.5 is edge; distance from edge = (sd - 0.5)
  // Multiply by pxRange to get screen pixel distance
  let screenDist = pxRange * (sd - 0.5);

  // Fill opacity - the standard MSDF formula
  let fillAlpha = clamp(screenDist + 0.5, 0.0, 1.0);

  // If no stroke, just render fill
  let hasStroke = strokeWidth > 0.0 && strokeColor.a > 0.0;
  if (!hasStroke) {
    return vec4f(color.rgb, color.a * fillAlpha);
  }

  // Stroke extends strokeWidth pixels outside the glyph edge
  // screenDist is positive inside glyph, negative outside
  // Stroke outer edge is at -strokeWidth pixels from glyph edge
  let strokeOuterDist = screenDist + strokeWidth;
  let strokeAlpha = clamp(strokeOuterDist + 0.5, 0.0, 1.0);

  // Composite: fill over stroke
  // Where fill is opaque, show fill; where fill is transparent but stroke is opaque, show stroke
  let finalAlpha = fillAlpha * color.a + strokeAlpha * strokeColor.a * (1.0 - fillAlpha * color.a);

  if (finalAlpha <= 0.0) {
    return vec4f(0.0);
  }

  let finalRgb = (color.rgb * color.a * fillAlpha + strokeColor.rgb * strokeColor.a * strokeAlpha * (1.0 - fillAlpha * color.a)) / finalAlpha;

  return vec4f(finalRgb, finalAlpha);
}
`;function si(u,e){return`
//------------------------------------------------------------------------------
// GPU Text Vertex Shader
//------------------------------------------------------------------------------
//
// Pipeline:
// 1. getVertex(anchor) -> clip space position
// 2. Perspective division -> NDC
// 3. NDC -> screen pixels
// 4. Text shaping (add local glyph position)
// 5. Add screen offset
// 6. projectVertex() -> final clip space position
//
//------------------------------------------------------------------------------

struct Uniforms {
  resolution: vec2f,
  fontScale: f32,      // Global font scale factor (typically 1.0)
  fieldRange: f32,     // SDF field range in atlas pixels
  atlasSize: vec2f,    // Atlas texture dimensions
  _pad: vec2f,
  viewMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

// Character instance data - ordered for proper WGSL alignment
// All spatial values (localPosition, size) are in BASE coordinates (at atlas fontSize).
// The shader applies fontSize ratio to compute final screen positions.
struct CharacterInstance {
  uvRect: vec4f,         // [u0, v0, u1, v1] - offset 0
  color: vec4f,          // RGBA - offset 16
  anchor: vec4f,         // Span anchor position (homogeneous) - offset 32
  strokeColor: vec4f,    // Stroke outline RGBA - offset 48
  localPosition: vec2f,  // Glyph position relative to anchor, BASE coords - offset 64
  offset: vec2f,         // Screen-space offset (post-scale) - offset 72
  size: vec2f,           // Glyph size in BASE pixels - offset 80
  scale: f32,            // fontSize / atlasFontSize ratio - offset 88
  strokeWidth: f32,      // Stroke outline width in pixels - offset 92
}
// Total: 96 bytes

@group(1) @binding(2) var<storage, read> characters: array<CharacterInstance>;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
  @location(1) color: vec4f,
  @location(2) strokeColor: vec4f,
  @location(3) strokeWidth: f32,
  @location(4) anchor: vec4f,
}

// User-defined or default vertex transform (anchor -> clip space)
${u}

// User-defined or default vertex projection (screen pixels -> clip space)
${e}

@vertex
fn vertexMain(
  @builtin(vertex_index) vertexIndex: u32,
  @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
  var output: VertexOutput;

  let char = characters[instanceIndex];

  // Quad corners: 0=TL, 1=TR, 2=BL, 3=BR (triangle strip order)
  let corners = array<vec2f, 4>(
    vec2f(0.0, 0.0),  // Top-left
    vec2f(1.0, 0.0),  // Top-right
    vec2f(0.0, 1.0),  // Bottom-left
    vec2f(1.0, 1.0),  // Bottom-right
  );
  let corner = corners[vertexIndex];

  // 1. Transform anchor position (user-defined, e.g., MVP multiplication)
  let clipPos = getVertex(char.anchor);

  // 2. Perspective division: clip space -> NDC
  let ndc = clipPos.xyz / clipPos.w;

  // 3. NDC -> screen pixels
  let screenAnchor = vec2f(
    (ndc.x * 0.5 + 0.5) * uniforms.resolution.x,
    (0.5 - ndc.y * 0.5) * uniforms.resolution.y  // Y flipped for screen coords
  );

  // 4. Text shaping: compute glyph vertex position relative to anchor
  // Apply fontScale for resolution-relative sizing
  let effectiveScale = char.scale * uniforms.fontScale;
  let quadSize = char.size * effectiveScale;
  let glyphOffset = char.localPosition * effectiveScale + corner * quadSize;

  // 5. Add screen-space offset and compute final screen position
  let screenPos = screenAnchor + char.offset + glyphOffset;

  // 6. Interpolate UVs
  let uv = mix(char.uvRect.xy, char.uvRect.zw, corner);

  // 7. Apply post-projection (user-defined transformation to clip space)
  output.position = projectVertex(vec3f(screenPos, ndc.z), uv, char.color);
  output.uv = uv;
  output.color = char.color;
  output.strokeColor = char.strokeColor;
  output.strokeWidth = char.strokeWidth;
  output.anchor = char.anchor;

  return output;
}
`}function ri(u){return`
//------------------------------------------------------------------------------
// GPU Text Fragment Shader
//------------------------------------------------------------------------------

struct Uniforms {
  resolution: vec2f,
  fontScale: f32,
  fieldRange: f32,
  atlasSize: vec2f,
  _pad: vec2f,
  viewMatrix: mat4x4f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(1) @binding(0) var fontSampler: sampler;
@group(1) @binding(1) var fontAtlas: texture_2d<f32>;

struct FragmentInput {
  @location(0) uv: vec2f,
  @location(1) color: vec4f,
  @location(2) strokeColor: vec4f,
  @location(3) strokeWidth: f32,
  @location(4) anchor: vec4f,
}

${u}

@fragment
fn fragmentMain(input: FragmentInput) -> @location(0) vec4f {
  // Sample the MSDF/MTSDF texture (all four channels)
  // RGB: multi-channel SDF for sharp fill edges
  // A: true SDF for strokes (in MTSDF format) or 1.0 (in plain MSDF)
  let msdf = textureSample(fontAtlas, fontSampler, input.uv);

  return getColor(input.uv, input.color, input.strokeColor, input.strokeWidth, msdf, input.anchor);
}
`}async function oi(u,e){const{atlasUrl:t,metadataUrl:s}=e,[i,a]=await Promise.all([fetch(s),fetch(t)]);if(!i.ok)throw new Error(`Failed to load atlas metadata: ${i.statusText}`);if(!a.ok)throw new Error(`Failed to load atlas image: ${a.statusText}`);const o=await i.json(),n=await a.blob(),r=await createImageBitmap(n),l=u.createTexture({label:"font-atlas-msdf",size:[o.width,o.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});u.queue.copyExternalImageToTexture({source:r},{texture:l},[o.width,o.height]);const c=document.createElement("canvas");c.width=o.width,c.height=o.height,c.getContext("2d").drawImage(r,0,0);const h=new Map;for(const d of o.glyphs)h.set(d.char,{char:d.char,x:d.x,y:d.y,width:d.width,height:d.height,xOffset:d.xOffset,yOffset:d.yOffset,xAdvance:d.xAdvance});return{texture:l,textureView:l.createView(),width:o.width,height:o.height,lineHeight:o.lineHeight,fontSize:o.fontSize,fieldRange:o.fieldRange??4,glyphs:h,debugCanvas:c}}function rt(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const ni=`
${Re}

@group(2) @binding(0) var<uniform> globals: GlobalUniforms;

struct TextAtmosUniforms {
  exaggeration: f32,
  atmosphere_opacity: f32,
};
@group(2) @binding(1) var<uniform> textAtmos: TextAtmosUniforms;

fn srgbToLinear(c: vec3<f32>) -> vec3<f32> {
  return pow(c, vec3<f32>(2.2));
}

fn applyAtmosphereText(color: vec3<f32>, world_pos: vec3<f32>) -> vec3<f32> {
  let cam_pos = globals.camera_position.xyz;
  let cam_h_m = globals.camera_position.w;
  let mpu = globals.sun_direction.w;
  let exag = textAtmos.exaggeration;

  let world_ray = world_pos - cam_pos;
  let frag_h_m = world_pos.y * mpu / max(exag, 1e-6);
  let phys_ray = vec3<f32>(world_ray.x * mpu, frag_h_m - cam_h_m, world_ray.z * mpu);
  let dist_m = length(phys_ray);
  if (dist_m < 0.1) { return color; }
  let view_dir = phys_ray / dist_m;

  let result = computeScattering(cam_h_m, frag_h_m, dist_m, view_dir);
  let T = result[0];
  let inscatter = result[1];

  return color * T + inscatter * (vec3<f32>(1.0) - T);
}

fn median3(r: f32, g: f32, b: f32) -> f32 {
  return max(min(r, g), min(max(r, g), b));
}

fn screenPxRange(uv: vec2f) -> f32 {
  let unitRange = uniforms.fieldRange / uniforms.atlasSize;
  let screenTexSize = 1.0 / fwidth(uv);
  return max(0.5 * dot(unitRange, screenTexSize), 1.0);
}

fn getColor(uv: vec2f, color: vec4f, strokeColor: vec4f, strokeWidth: f32, msdf: vec4f, anchor: vec4f) -> vec4f {
  let sd = median3(msdf.r, msdf.g, msdf.b);
  let pxRange = screenPxRange(uv);
  let screenDist = pxRange * (sd - 0.5);
  let fillAlpha = clamp(screenDist + 0.5, 0.0, 1.0);

  var finalRgb = color.rgb;
  var finalAlpha = fillAlpha * color.a;

  let hasStroke = strokeWidth > 0.0 && strokeColor.a > 0.0;
  if (hasStroke) {
    let strokeOuterDist = screenDist + strokeWidth;
    let strokeAlpha = clamp(strokeOuterDist + 0.5, 0.0, 1.0);
    finalAlpha = fillAlpha * color.a + strokeAlpha * strokeColor.a * (1.0 - fillAlpha * color.a);
    if (finalAlpha > 0.0) {
      finalRgb = (color.rgb * color.a * fillAlpha + strokeColor.rgb * strokeColor.a * strokeAlpha * (1.0 - fillAlpha * color.a)) / finalAlpha;
    }
  }

  if (finalAlpha <= 0.0) {
    return vec4f(0.0);
  }

  // Apply atmosphere scattering
  let linear_c = srgbToLinear(finalRgb);
  let atmos_c = applyAtmosphereText(linear_c, anchor.xyz);
  let mixed = mix(linear_c, atmos_c, textAtmos.atmosphere_opacity);
  return vec4f(linearToSrgb(acesTonemap(mixed)), finalAlpha);
}
`;class ai{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._textField=i["text-field"]||"name",this._fontSize=i["text-size"]||12,this._color=rt(i["text-color"]||"#ffffff"),this._strokeColor=rt(i["text-halo-color"]||"#000000"),this._strokeWidth=i["text-halo-width"]!=null?i["text-halo-width"]:1.5,this._offset=i["text-offset"]||[0,-10],this._align=i["text-align"]||"center",this._baseline=i["text-baseline"]||"bottom",this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._textContext=null,this._spans=[],this._ready=!1,this._visibleFeatures=null,this._fontAtlas=null,this._atmosphereBindGroup=null,this._textAtmosBuffer=null,this._textAtmosData=new Float32Array(4),this._lastScaledStrokeWidth=null}init(e,t,s,i,a){this._device=e,this._fontAtlas=t,this._textContext=Jt(e,{fontAtlas:t,fragmentShaderBody:ni,colorTargets:{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},depthStencil:{format:i,depthWriteEnabled:!1,depthCompare:"always"}}),this._textAtmosBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const o=this._textContext.getBindGroupLayout(2);this._atmosphereBindGroup=e.createBindGroup({layout:o,entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:this._textAtmosBuffer}}]});const n=this._fontSize/t.fontSize;for(let r=0;r<this._source.features.length;r++){const l=this._source.features[r],c=l.properties[this._textField];if(!c)continue;const f=this._textContext.createSpan({text:String(c),position:[0,0,0],fontSize:this._fontSize,color:this._color,strokeColor:this._strokeColor,strokeWidth:this._strokeWidth,offset:this._offset,align:this._align,baseline:this._baseline}),h=String(c);let d=0,p=0,_=0;for(const y of h){const g=t.glyphs.get(y);if(!g)continue;d+=g.xAdvance*n;const C=-g.yOffset*n,T=g.height*n-C;C>p&&(p=C),T>_&&(_=T)}this._spans.push({span:f,feature:l,sourceIndex:r,textWidth:d,ascent:p,descent:_})}this._ready=!0}prepare(e,t,s,i,a,o){if(!this._ready)return;const n=this._strokeWidth*i;if(n!==this._lastScaledStrokeWidth){this._lastScaledStrokeWidth=n;for(const{span:f}of this._spans)f.setStrokeWidth(n)}for(let f=0;f<this._spans.length;f++){const{span:h,feature:d}=this._spans[f];if(this._visibleFeatures&&!this._visibleFeatures.has(f)){h.setPosition([0,0,0,0]);continue}const p=d,_=this._queryElevation(p.mercatorX,p.mercatorY);if(_==null||_<=0){h.setPosition([0,0,0,0]);continue}const y=p.mercatorX,g=_*o*a,C=p.mercatorY;if(e[3]*y+e[7]*g+e[11]*C+e[15]<=0){h.setPosition([0,0,0,0]);continue}h.setPosition([y,g,C,1])}const r=t/i,l=s/i;this._textContext.updateUniforms({resolution:[r,l],viewMatrix:e});const c=this._textAtmosData;c[0]=a,c[1]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._textAtmosBuffer,0,c)}draw(e){this._ready&&this._textContext.getTotalCharacterCount()!==0&&this._textContext.draw(e,{resolution:[1,1],skipUniformUpdate:!0},[this._atmosphereBindGroup])}getCollisionItems(e,t,s,i,a,o){if(!this._ready)return[];const n=t/i,r=s/i,l=[];for(let c=0;c<this._spans.length;c++){const{feature:f,sourceIndex:h,textWidth:d,ascent:p,descent:_}=this._spans[c],y=f,g=this._queryElevation(y.mercatorX,y.mercatorY);if(g==null||g<=0)continue;const C=y.mercatorX,T=g*o*a,m=y.mercatorY,S=e[0]*C+e[4]*T+e[8]*m+e[12],B=e[1]*C+e[5]*T+e[9]*m+e[13],v=e[2]*C+e[6]*T+e[10]*m+e[14],P=e[3]*C+e[7]*T+e[11]*m+e[15];if(P<=0)continue;const X=S/P,A=B/P;if(X<-1.2||X>1.2||A<-1.2||A>1.2)continue;let K=(X*.5+.5)*n+this._offset[0],H=(.5-A*.5)*r+this._offset[1];const x=d/2,w=(p+_)/2;this._align==="left"?K+=x:this._align==="right"&&(K-=x),this._baseline==="top"?H+=w:this._baseline==="bottom"&&(H-=w),l.push({layerIndex:-1,featureIndex:c,sourceFeatureIndex:h,screenX:K,screenY:H,halfW:x,halfH:w,depth:v/P,clipW:P})}return l}setVisibleFeatures(e){this._visibleFeatures=e}destroy(){this._textContext&&this._textContext.destroy(),this._textAtmosBuffer&&this._textAtmosBuffer.destroy()}}function De(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const li=`
@group(1) @binding(0) var<storage, read> positions: array<vec4f>;

struct LineUniforms {
  projectionView: mat4x4f,
  lineColor: vec4f,
  borderColor: vec4f,
  lineWidth: f32,
  borderWidth: f32,
  pixelRatio: f32,
  exaggeration: f32,
  atmosphereOpacity: f32,
  depthOffset: f32,
  _p2: f32, _p3: f32,
};
@group(2) @binding(0) var<uniform> line: LineUniforms;

struct Vertex {
  position: vec4f,
  width: f32,
  anchor: vec3f,
}

fn getVertex(index: u32) -> Vertex {
  let p = positions[index];
  var clip = line.projectionView * p;
  // Depth bias proportional to camera distance.
  // A constant clip.z offset gives world-space lift ∝ eye distance, since
  // NDC z maps as 1/z — the line clears terrain z-fighting at every zoom
  // level without floating visibly at close range.
  clip.z -= line.depthOffset;
  return Vertex(clip, line.lineWidth * line.pixelRatio, p.xyz);
}
`,ci=`
${Re}

@group(2) @binding(0) var<uniform> line: LineUniforms;
@group(2) @binding(1) var<uniform> globals: GlobalUniforms;

struct LineUniforms {
  projectionView: mat4x4f,
  lineColor: vec4f,
  borderColor: vec4f,
  lineWidth: f32,
  borderWidth: f32,
  pixelRatio: f32,
  exaggeration: f32,
  atmosphereOpacity: f32,
  _p1: f32, _p2: f32, _p3: f32,
};

fn srgbToLinear(c: vec3<f32>) -> vec3<f32> {
  return pow(c, vec3<f32>(2.2));
}

fn applyAtmosphereLine(color: vec3<f32>, world_pos: vec3<f32>) -> vec3<f32> {
  let cam_pos = globals.camera_position.xyz;
  let cam_h_m = globals.camera_position.w;
  let mpu = globals.sun_direction.w;
  let exag = line.exaggeration;

  let world_ray = world_pos - cam_pos;
  let frag_h_m = world_pos.y * mpu / max(exag, 1e-6);
  let phys_ray = vec3<f32>(world_ray.x * mpu, frag_h_m - cam_h_m, world_ray.z * mpu);
  let dist_m = length(phys_ray);
  if (dist_m < 0.1) { return color; }
  let view_dir = phys_ray / dist_m;

  let result = computeScattering(cam_h_m, frag_h_m, dist_m, view_dir);
  let T = result[0];
  let inscatter = result[1];

  return color * T + inscatter * (vec3<f32>(1.0) - T);
}

fn getColor(lineCoord: vec2f, anchor: vec3f) -> vec4f {
  let totalWidth = line.lineWidth * line.pixelRatio;
  let borderW = line.borderWidth * line.pixelRatio;

  // SDF: distance from line center in pixels
  let sdf = length(lineCoord) * totalWidth;

  // Border edge at (totalWidth - borderWidth) from center
  let borderEdge = totalWidth - borderW;
  let t = smoothstep(borderEdge - 1.0, borderEdge + 1.0, sdf);

  // Convert sRGB input colors to linear, blend in linear space
  let lineLinear = srgbToLinear(line.lineColor.rgb);
  let borderLinear = srgbToLinear(line.borderColor.rgb);
  var linear = mix(lineLinear, borderLinear, t);
  var alpha = mix(line.lineColor.a, line.borderColor.a, t);

  // Anti-alias outer edge
  let outerAlpha = 1.0 - smoothstep(totalWidth - 1.0, totalWidth + 1.0, sdf);
  alpha *= outerAlpha;

  if (alpha <= 0.0) {
    return vec4f(0.0);
  }

  // Apply atmosphere scattering in linear space, then convert back to sRGB.
  // No ACES tonemap — line colors are LDR UI elements, not HDR scene content.
  let atmos = applyAtmosphereLine(linear, anchor);
  let final_linear = mix(linear, atmos, line.atmosphereOpacity);
  return vec4f(linearToSrgb(final_linear), alpha);
}
`,ot=128;class nt{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._lineColor=De(i["line-color"]||"#ff8800"),this._borderColor=De(i["line-border-color"]||"#331100"),this._lineWidth=i["line-width"]||3,this._borderWidth=i["line-border-width"]||0,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._gpuLines=null,this._positionBuffer=null,this._uniformBuffer=null,this._sharedBindGroup=null,this._polylines=[],this._positionData=null,this._cachedElevations=null,this._elevationsDirty=!0,this._lastExaggeration=-1,this._positionsDirty=!0,this._device=null}init(e,t,s,i){this._device=e,this._globalUniformBuffer=s,this._depthOffset=2e-7,this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"square",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:li,fragmentShaderBody:ci})}_ensureBuffers(){if(this._positionBuffer)return;const e=this._source.lineFeatures;if(e.length===0)return;const t=this._device,s=16;let i=0;for(const o of e)i=Math.ceil(i/s)*s,i+=o.coordinates.length;if(i===0)return;this._positionBuffer=t.createBuffer({size:i*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._positionData=new Float32Array(i*4),this._cachedElevations=new Float32Array(i);let a=0;for(const o of e){a=Math.ceil(a/s)*s;const n=o.coordinates.length,r=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer,offset:a*16,size:n*16}}]});this._polylines.push({offset:a,count:n,feature:o,dataBindGroup:r}),a+=n}this._uniformBuffer=t.createBuffer({size:ot,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}},{binding:1,resource:{buffer:this._globalUniformBuffer}}]})}invalidateElevations(){this._elevationsDirty=!0}prepare(e,t,s,i,a,o){if(!this._gpuLines||(this._ensureBuffers(),this._polylines.length===0))return;if(this._elevationCarryover){for(const r of this._polylines)for(let l=0;l<r.count;l++){const c=r.feature.coordinates[l],f=this._elevationCarryover.get(c.mercatorX+","+c.mercatorY);f>0&&(this._cachedElevations[r.offset+l]=f)}this._elevationCarryover=null,this._positionsDirty=!0}if(this._elevationsDirty){const r=this._cachedElevations;for(const l of this._polylines)for(let c=0;c<l.count;c++){const f=l.feature.coordinates[c],h=this._queryElevation(f.mercatorX,f.mercatorY);h!=null&&h>0&&r[l.offset+c]!==h&&(r[l.offset+c]=h,this._positionsDirty=!0)}this._elevationsDirty=!1}if(this._positionsDirty||a!==this._lastExaggeration||o!==this._lastGlobalElevScale){const r=this._positionData,l=this._cachedElevations;for(const c of this._polylines)for(let f=0;f<c.count;f++){const h=c.feature.coordinates[f],d=l[c.offset+f],p=(c.offset+f)*4;d==null||d<=0?(r[p]=h.mercatorX,r[p+1]=0,r[p+2]=h.mercatorY,r[p+3]=1):(r[p]=h.mercatorX,r[p+1]=(d+3)*o*a,r[p+2]=h.mercatorY,r[p+3]=1)}this._device.queue.writeBuffer(this._positionBuffer,0,r),this._lastExaggeration=a,this._lastGlobalElevScale=o,this._positionsDirty=!1}const n=new Float32Array(ot/4);n.set(e,0),n[16]=this._lineColor[0],n[17]=this._lineColor[1],n[18]=this._lineColor[2],n[19]=this._lineColor[3],n[20]=this._borderColor[0],n[21]=this._borderColor[1],n[22]=this._borderColor[2],n[23]=this._borderColor[3],n[24]=this._lineWidth,n[25]=this._borderWidth,n[26]=i,n[27]=a,n[28]=this._atmosphereOpacity,n[29]=this._depthOffset,this._device.queue.writeBuffer(this._uniformBuffer,0,n),this._canvasW=t,this._canvasH=s}draw(e){if(!(!this._gpuLines||this._polylines.length===0))for(const t of this._polylines)this._gpuLines.draw(e,{vertexCount:t.count,resolution:[this._canvasW,this._canvasH]},[t.dataBindGroup,this._sharedBindGroup])}replaceSource(e,t){this._positionBuffer&&this._positionBuffer.destroy(),this._uniformBuffer&&this._uniformBuffer.destroy(),this._source=e,this._positionBuffer=null,this._uniformBuffer=null,this._sharedBindGroup=null,this._polylines=[],this._positionData=null,this._cachedElevations=null,this._elevationCarryover=t||null,this._elevationsDirty=!0,this._positionsDirty=!0}destroy(){this._gpuLines&&this._gpuLines.destroy(),this._positionBuffer&&this._positionBuffer.destroy(),this._uniformBuffer&&this._uniformBuffer.destroy()}}function Ye(u,e,t){this.aabb=new t(6),this.startIndex=u,this.endIndex=e,this.node0=null,this.node1=null}const Ce=[],ge=[],xe=[],Be=[];function at(u,e,t,s,i,a,o){let n,r;if(s!==0){let l=(o[0]-u)/s,c=(o[3]-u)/s;if(l>c){const f=l;l=c,c=f}n=l,r=c}else{if(u<o[0]||u>o[3])return null;n=-1/0,r=1/0}if(i!==0){let l=(o[1]-e)/i,c=(o[4]-e)/i;if(l>c){const f=l;l=c,c=f}l>n&&(n=l),c<r&&(r=c)}else if(e<o[1]||e>o[4])return null;if(n>r)return null;if(a!==0){let l=(o[2]-t)/a,c=(o[5]-t)/a;if(l>c){const f=l;l=c,c=f}l>n&&(n=l),c<r&&(r=c)}else if(t<o[2]||t>o[5])return null;return n>r||r<0?null:[n,r]}class fi{constructor(e,{epsilon:t=1e-6,maxItemsPerNode:s=10}={}){this._aabbs=e;const i=this._aabbs.length/6;this._epsilon=t,this._maxItemsPerNode=s,this._aabbTypeCtor=Float64Array;const a=Uint32Array;this._idArray=new a(i);for(var o=0;o<i;o++)this._idArray[o]=o;this.root=new Ye(0,i,this._aabbTypeCtor),this.computeExtents(this.root),this._nodeSplitPtr=0,Ce.length=0,Ce[0]=this.root;let n=0;for(;this._nodeSplitPtr>=0&&n++<1e6;)this.splitNode(Ce[this._nodeSplitPtr--]);if(n>1e6)throw new Error("Uh-oh, it seems like BVH construction ran into an infinite loop.");Ce.length=0}computeExtents(e){const t=e.aabb;let s=1/0,i=1/0,a=1/0,o=-1/0,n=-1/0,r=-1/0;for(let _=e.startIndex*6,y=e.endIndex*6;_<y;_+=6)s=Math.min(this._aabbs[_],s),i=Math.min(this._aabbs[_+1],i),a=Math.min(this._aabbs[_+2],a),o=Math.max(this._aabbs[_+3],o),n=Math.max(this._aabbs[_+4],n),r=Math.max(this._aabbs[_+5],r);const l=(o+s)*.5,c=(n+i)*.5,f=(r+a)*.5,h=Math.max((o-s)*.5,this._epsilon)*(1+this._epsilon),d=Math.max((n-i)*.5,this._epsilon)*(1+this._epsilon),p=Math.max((r-a)*.5,this._epsilon)*(1+this._epsilon);t[0]=l-h,t[1]=c-d,t[2]=f-p,t[3]=l+h,t[4]=c+d,t[5]=f+p}splitNode(e){let t,s,i;const a=e.startIndex,o=e.endIndex,n=o-a;if(n<=this._maxItemsPerNode||n===0)return;const r=this._aabbs,l=this._idArray;xe[0]=e.aabb[0]+e.aabb[3],xe[1]=e.aabb[1]+e.aabb[4],xe[2]=e.aabb[2]+e.aabb[5];let c=0,f=0,h=0,d=0,p=0,_=0;for(t=a*6,s=o*6;t<s;t+=6)r[t]+r[t+3]<xe[0]?c++:d++,r[t+1]+r[t+4]<xe[1]?f++:p++,r[t+2]+r[t+5]<xe[2]?h++:_++;if(ge[0]=c===0||d===0,ge[1]=f===0||p===0,ge[2]=h===0||_===0,ge[0]&&ge[1]&&ge[2])return;const y=e.aabb[3]-e.aabb[0],g=e.aabb[4]-e.aabb[1],C=e.aabb[5]-e.aabb[2];let T;if(y>=g&&y>=C?T=0:g>=C?T=1:T=2,ge[T]&&(T===0?T=g>=C?1:2:T===1?T=y>=C?0:2:T=y>=g?0:1,ge[T])){T=3-T-(T===0||T===2?1:0);for(let ae=0;ae<3;ae++)if(!ge[ae]){T=ae;break}}let m,S,B,v,P=1/0,X=1/0,A=1/0,K=-1/0,H=-1/0,x=-1/0,w=1/0,k=1/0,Q=1/0,ee=-1/0,O=-1/0,D=-1/0;const he=xe[T];for(m=a*6,B=(o-1)*6,S=a,v=o-1;m<=B;m+=6,S++)r[m+T]+r[m+T+3]>=he?(i=l[S],l[S]=l[v],l[v]=i,i=r[m],w=Math.min(w,i),r[m]=r[B],r[B]=i,i=r[m+1],k=Math.min(k,i),r[m+1]=r[B+1],r[B+1]=i,i=r[m+2],Q=Math.min(Q,i),r[m+2]=r[B+2],r[B+2]=i,i=r[m+3],ee=Math.max(ee,i),r[m+3]=r[B+3],r[B+3]=i,i=r[m+4],O=Math.max(O,i),r[m+4]=r[B+4],r[B+4]=i,i=r[m+5],D=Math.max(D,i),r[m+5]=r[B+5],r[B+5]=i,S--,v--,m-=6,B-=6):(P=Math.min(P,r[m]),X=Math.min(X,r[m+1]),A=Math.min(A,r[m+2]),K=Math.max(K,r[m+3]),H=Math.max(H,r[m+4]),x=Math.max(x,r[m+5]));e.startIndex=e.endIndex=-1;const z=e.node0=new Ye(a,S,this._aabbTypeCtor),W=e.node1=new Ye(S,o,this._aabbTypeCtor);let M,U,j,Y,se,oe;const ie=this._epsilon;M=(K+P)*.5,U=(H+X)*.5,j=(x+A)*.5,Y=Math.max((K-P)*.5,ie)*(1+ie),se=Math.max((H-X)*.5,ie)*(1+ie),oe=Math.max((x-A)*.5,ie)*(1+ie),z.aabb[0]=M-Y,z.aabb[1]=U-se,z.aabb[2]=j-oe,z.aabb[3]=M+Y,z.aabb[4]=U+se,z.aabb[5]=j+oe,M=(ee+w)*.5,U=(O+k)*.5,j=(D+Q)*.5,Y=Math.max((ee-w)*.5,ie)*(1+ie),se=Math.max((O-k)*.5,ie)*(1+ie),oe=Math.max((D-Q)*.5,ie)*(1+ie),W.aabb[0]=M-Y,W.aabb[1]=U-se,W.aabb[2]=j-oe,W.aabb[3]=M+Y,W.aabb[4]=U+se,W.aabb[5]=j+oe,S-a>this._maxItemsPerNode&&(Ce[++this._nodeSplitPtr]=e.node0),o-S>this._maxItemsPerNode&&(Ce[++this._nodeSplitPtr]=e.node1)}test(e,t){Be.length=0;var s=0;for(Be[0]=this.root;s>=0;){var i=Be[s--];if(e(i.aabb)){i.node0&&(Be[++s]=i.node0),i.node1&&(Be[++s]=i.node1);for(var a=i.startIndex;a<i.endIndex;a++)t(this._idArray[a])}}Be.length=0}rayIntersect(e,t,s,i,a,o){const n=[],r=[];let l=0;for(r[l++]=this.root;l>0;){const c=r[--l];if(at(e,t,s,i,a,o,c.aabb)){c.node0&&(r[l++]=c.node0),c.node1&&(r[l++]=c.node1);for(let h=c.startIndex;h<c.endIndex;h++){const d=this._idArray[h],p=h*6,_=[this._aabbs[p],this._aabbs[p+1],this._aabbs[p+2],this._aabbs[p+3],this._aabbs[p+4],this._aabbs[p+5]],y=at(e,t,s,i,a,o,_);y&&n.push({index:d,tNear:Math.max(y[0],0)})}}}return n.sort((c,f)=>c.tNear-f.tNear),n}traversePreorder(e){const t=[];let s=this.root;for(;t.length||s;){for(;s;){const i=e(s)!==!1;i&&s.node1&&t.push(s.node1),s=i&&s.node0}t.length&&(s=t.pop())}}traverseInorder(e){const t=[];let s=this.root;for(;s||t.length;){for(;s;)t.push(s),s=s.node0;s=t[t.length-1],t.pop(),e(s),s=s.node1}}traversePostorder(e){const t=[this.root];let s=null;for(;t.length;){const i=t[t.length-1];!s||s.node0===i||s.node1===i?i.node0?t.push(i.node0):i.node1?t.push(i.node1):(t.pop(),e(i)):i.node0===s?i.node0?t.push(i.node1):(t.pop(),e(i)):i.node1===s&&(t.pop(),e(i)),s=i}}}function qe(u,e,t){const s=t;function i(d,p,_){const y=s[0]*d+s[4]*p+s[8]*_+s[12],g=s[1]*d+s[5]*p+s[9]*_+s[13],C=s[2]*d+s[6]*p+s[10]*_+s[14],T=s[3]*d+s[7]*p+s[11]*_+s[15];return[y/T,g/T,C/T]}const a=i(u,e,0),o=i(u,e,1),n=new Float64Array(a),r=o[0]-a[0],l=o[1]-a[1],c=o[2]-a[2],f=Math.sqrt(r*r+l*l+c*c),h=new Float64Array([r/f,l/f,c/f]);return{origin:n,direction:h}}function dt({origin:u,direction:e,bvh:t,tileCache:s,tileList:i,verticalExaggeration:a}){const o=u[0],n=u[1],r=u[2],l=e[0],c=e[1],f=e[2],h=t.rayIntersect(o,n,r,l,c,f);if(h.length===0)return null;let d=1/0,p=null,_=null;for(let y=0;y<h.length;y++){const{index:g,tNear:C}=h[y];if(C>=d)break;const T=i[g];if(!T)continue;const m=s.ensureQuadtree(T.z,T.x,T.y);if(!m)continue;const{quadtree:S,elevations:B}=m,X=He(T.z,T.y)*a,A=512*(1<<T.z),K=T.x/(1<<T.z),H=T.y/(1<<T.z),x=(o-K)*A,w=n/X,k=(r-H)*A,Q=l*A,ee=c/X,O=f*A,D=Ot(S.minElev,S.maxElev,B,x,w,k,Q,ee,O);if(!D)continue;const he=x+Q*D.t,z=w+ee*D.t,W=k+O*D.t,M=he/A+K,U=z*X,j=W/A+H;let Y;const se=Math.abs(l),oe=Math.abs(c),ie=Math.abs(f);se>=oe&&se>=ie?Y=(M-o)/l:oe>=ie?Y=(U-n)/c:Y=(j-r)/f,Y>0&&Y<d&&(d=Y,p=[M,U,j],_=T)}return p?{worldPos:p,t:d,tile:_}:null}function ui(u){const e=[[-60,0],[-45,1500],[-30,2800],[-15,3800],[0,4e3],[15,4100],[30,4200],[40,3500],[50,2300],[60,1e3],[65,500],[70,0]];if(u<=e[0][0])return e[0][1];if(u>=e[e.length-1][0])return e[e.length-1][1];for(let t=1;t<e.length;t++)if(u<=e[t][0]){const s=(u-e[t-1][0])/(e[t][0]-e[t-1][0]);return e[t-1][1]+s*(e[t][1]-e[t-1][1])}return 0}function hi(u={}){return new Proxy({verticalExaggeration:1,densityThreshold:3,showTileBorders:!1,freezeCoverage:!1,enableCollision:!0,showCollisionBoxes:!1,showWireframe:!1,showImagery:!0,showFeatures:!0,showRoute:!0,slopeAngleOpacity:0,slopeAspectMaskAbove:0,slopeAspectMaskNear:0,slopeAspectMaskBelow:0,slopeAspectOpacity:.95,treelineLower:2e3,treelineUpper:2500,contourOpacity:1,collisionBuffer:4,occlusionBias:.03,atmosphereDensity:.35,hillshadeOpacity:.95,sunDirection:[.5,.7,.5],dirty:!0,...u},{set(e,t,s){return t!=="dirty"&&e[t]!==s&&(e.dirty=!0),e[t]=s,!0}})}function di(u){const e=document.createElement("div");return e.className="terrain-attribution",e.innerHTML=u.filter(t=>t.attribution).map(t=>t.attribution).join(" | "),e}function pi(u){return u*360-180}function _i(u){return Math.atan(Math.sinh(Math.PI*(1-2*u)))*180/Math.PI}function mi(u){return(Math.atan2(-Math.cos(u),Math.sin(u))*180/Math.PI%360+360)%360}function gi(u){const e=u*Math.PI/180;return Math.atan2(Math.cos(e),-Math.sin(e))}function yi(u){const{center:e,distance:t,phi:s,theta:i}=u,a=pi(e[0]),o=_i(e[2]),n=mi(s),r=i*180/Math.PI;return`#${a.toFixed(5)}/${o.toFixed(5)}/${n.toFixed(1)}/${r.toFixed(1)}/${t.toPrecision(6)}/${e[1].toPrecision(6)}`}function vi(u){if(!u||u.length<2)return null;const e=u.slice(1).split("/").map(Number);if(e.length<5||e.some(isNaN))return null;const[t,s,i,a,o,n]=e;return!isFinite(t)||!isFinite(s)||!isFinite(i)||!isFinite(a)||!isFinite(o)||o<=0?null:{center:[Ge(t),isFinite(n)?n:0,Fe(s)],distance:o,phi:gi(i),theta:a*Math.PI/180}}class xi{constructor(e,t,s,i){this._device=e,this._pixelRatio=s;const a=`
@group(1) @binding(0) var<storage, read> positions: array<vec4f>;
struct FrustumUniforms { projectionView: mat4x4f, lineColor: vec4f, borderColor: vec4f, lineWidth: f32, borderWidth: f32, pixelRatio: f32, _pad: f32, };
@group(2) @binding(0) var<uniform> u: FrustumUniforms;
struct Vertex { position: vec4f, width: f32, anchor: vec3f, }
fn getVertex(index: u32) -> Vertex {
  let p = positions[index];
  let clip = u.projectionView * p;
  return Vertex(clip, u.lineWidth * u.pixelRatio, p.xyz);
}`,o=`
struct FrustumUniforms { projectionView: mat4x4f, lineColor: vec4f, borderColor: vec4f, lineWidth: f32, borderWidth: f32, pixelRatio: f32, _pad: f32, };
@group(2) @binding(0) var<uniform> u: FrustumUniforms;
fn getColor(lineCoord: vec2f, anchor: vec3f) -> vec4f {
  let totalWidth = u.lineWidth * u.pixelRatio;
  let borderW = u.borderWidth * u.pixelRatio;
  let sdf = length(lineCoord) * totalWidth;
  let borderEdge = totalWidth - borderW;
  let t = smoothstep(borderEdge - 1.0, borderEdge + 1.0, sdf);
  var rgb = mix(u.lineColor.rgb, u.borderColor.rgb, t);
  var alpha = mix(u.lineColor.a, u.borderColor.a, t);
  let outerAlpha = 1.0 - smoothstep(totalWidth - 1.0, totalWidth + 1.0, sdf);
  alpha *= outerAlpha;
  return vec4f(rgb, alpha);
}`;this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"round",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:a,fragmentShaderBody:o}),this._uniformBuffer=e.createBuffer({size:112,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=e.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._positionBuffer=null,this._dataBindGroup=null,this._vertexCount=0,this._frozen=!1,this._coverageProjView=null}get isFrozen(){return this._frozen}get coverageProjView(){return this._coverageProjView}freeze(e){this._frozen=!0,this._coverageProjView=new Float32Array(e);const t=new Float32Array(16);Ue(t,this._coverageProjView);const s=St(t),i=20,a=[],o=f=>[s[f*3],s[f*3+1],s[f*3+2],1],n=()=>a.push([0,0,0,0]),r=f=>a.push(o(f)),l=(f,h)=>{n();const d=o(f),p=o(h);for(let _=0;_<=i;_++){const y=_/i;a.push([d[0]+(p[0]-d[0])*y,d[1]+(p[1]-d[1])*y,d[2]+(p[2]-d[2])*y,1])}};n(),r(0),r(1),r(2),r(3),r(0),n(),r(4),r(5),r(6),r(7),r(4),l(0,4),l(1,5),l(2,6),l(3,7),n();const c=new Float32Array(a.length*4);for(let f=0;f<a.length;f++)c[f*4]=a[f][0],c[f*4+1]=a[f][1],c[f*4+2]=a[f][2],c[f*4+3]=a[f][3];this._vertexCount=a.length,this._positionBuffer=this._device.createBuffer({size:c.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._positionBuffer,0,c),this._dataBindGroup=this._device.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer}}]})}unfreeze(){this._frozen=!1,this._coverageProjView=null,this._positionBuffer&&(this._positionBuffer.destroy(),this._positionBuffer=null),this._dataBindGroup=null}draw(e,t,s,i){if(!this._frozen||!this._positionBuffer)return;const a=new Float32Array(112/4);a.set(t,0),a[16]=0,a[17]=.5,a[18]=.15,a[19]=1,a[20]=1,a[21]=1,a[22]=1,a[23]=1,a[24]=4,a[25]=1.5,a[26]=this._pixelRatio,this._device.queue.writeBuffer(this._uniformBuffer,0,a),this._gpuLines.draw(e,{vertexCount:this._vertexCount,resolution:[s,i]},[this._dataBindGroup,this._sharedBindGroup])}destroy(){this._positionBuffer&&this._positionBuffer.destroy(),this._gpuLines.destroy(),this._uniformBuffer.destroy()}}function bi(u,e=0,t=1/0,s=1/0){u.sort((o,n)=>o.depth-n.depth);const i=[],a=new Map;for(const o of u){const n=o.screenX-o.halfW-e,r=o.screenX+o.halfW+e,l=o.screenY-o.halfH-e,c=o.screenY+o.halfH+e;let f=n<0||r>t||l<0||c>s;if(!f)for(let h=0;h<i.length;h++){const d=i[h];if(n<d.maxX&&r>d.minX&&l<d.maxY&&c>d.minY){f=!0;break}}if(f){o.visible=!1;let h=a.get(o.layerIndex);h||(h=new Set,a.set(o.layerIndex,h)),h.add(o.featureIndex)}else o.visible=!0,i.push({minX:o.screenX-o.halfW,maxX:o.screenX+o.halfW,minY:o.screenY-o.halfH,maxY:o.screenY+o.halfH})}return{items:u,hiddenByLayer:a}}const wi=`
struct ColoredLineUniforms {
  resolution: vec2<f32>,
};

@group(0) @binding(0) var<uniform> u: ColoredLineUniforms;

struct VertexInput {
  @location(0) position: vec2<f32>,
  @location(1) color: vec4<f32>,
};

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
};

@vertex
fn vs_colored_line(input: VertexInput) -> VertexOutput {
  var out: VertexOutput;
  out.position = vec4<f32>(
    input.position.x / u.resolution.x * 2.0 - 1.0,
    1.0 - input.position.y / u.resolution.y * 2.0,
    0.0,
    1.0
  );
  out.color = input.color;
  return out;
}

@fragment
fn fs_colored_line(input: VertexOutput) -> @location(0) vec4<f32> {
  return input.color;
}
`,lt=1e4,Ti=8,ct=6,ft=1e3;class Mi{constructor(e,t){this._device=e,this._lastCollisionTime=0,this._collisionStale=!1,this._collisionScheduled=!1,this._collisionTimer=null,this._debugItems=null;const s=e.createShaderModule({code:wi}),i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._vertexBuffer=e.createBuffer({size:lt*Ti*ct*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this._linePipeline=e.createRenderPipeline({layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:s,entryPoint:"vs_colored_line",buffers:[{arrayStride:ct*4,attributes:[{format:"float32x2",offset:0,shaderLocation:0},{format:"float32x4",offset:8,shaderLocation:1}]}]},fragment:{module:s,entryPoint:"fs_colored_line",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"line-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._invProjView=new Float32Array(16)}markStale(){this._debugItems||(this._collisionStale=!0)}update({enabled:e,layers:t,projectionView:s,canvasW:i,canvasH:a,pixelRatio:o,exaggeration:n,collisionBuffer:r,occlusionBias:l,bvh:c,tileManager:f,bvhTileList:h,globalElevScale:d}){const p=performance.now();if(!e){if(this._debugItems){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:y}of t)y.setVisibleFeatures(null)}return!1}const _=p-this._lastCollisionTime;return _>=ft||this._collisionStale?(this._doCollision(t,s,i,a,o,n,r,l,c,f,h,d),this._lastCollisionTime=p,this._collisionStale=!1,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null),!0):(this._collisionScheduled||(this._collisionScheduled=!0,this._collisionTimer=setTimeout(()=>{this._collisionScheduled=!1,this._collisionTimer=null,this._wakeCallback?.()},ft-_)),!1)}set onWake(e){this._wakeCallback=e}_doCollision(e,t,s,i,a,o,n,r,l,c,f,h){const d=[];let p=0;for(const{layer:m,collision:S,sourceId:B}of e){if(S){const v=m.getCollisionItems(t,s,i,a,o,h);for(const P of v)P.layerIndex=p,P.sourceId=B;d.push(...v)}p++}const _=s/a,y=i/a;if(l&&d.length>0){Ue(this._invProjView,t);const m=t;for(const S of d){const B=S.screenX/_*2-1,v=1-S.screenY/y*2,P=qe(B,v,this._invProjView),X=dt({origin:P.origin,direction:P.direction,bvh:l,tileCache:c,tileList:f,verticalExaggeration:o});if(X){const[A,K,H]=X.worldPos;m[3]*A+m[7]*K+m[11]*H+m[15]<S.clipW*(1-r)&&(S.occluded=!0)}}}const g=[];for(const m of d)m.occluded||g.push(m);bi(g,n,_,y);const C=new Map;for(const m of d)if(m.occluded||!m.visible){let S=C.get(m.sourceId);S||(S=new Set,C.set(m.sourceId,S)),S.add(m.sourceFeatureIndex)}const T=new Map;for(const m of d){const S=C.get(m.sourceId);if(S&&S.has(m.sourceFeatureIndex))m.occluded||(m.visible=!1);else{let B=T.get(m.layerIndex);B||(B=new Set,T.set(m.layerIndex,B)),B.add(m.featureIndex)}}this._debugItems=d,p=0;for(const{layer:m,collision:S}of e)m.setVisibleFeatures(S?T.get(p)||new Set:null),p++}drawDebug(e,t,s,i,a){if(!this._debugItems||this._debugItems.length===0)return;const o=this._debugItems,n=Math.min(o.length,lt),r=new Float32Array(n*8*6),l=a;for(let d=0;d<n;d++){const p=o[d],_=p.screenX-p.halfW-l,y=p.screenX+p.halfW+l,g=p.screenY-p.halfH-l,C=p.screenY+p.halfH+l,T=p.occluded?.2:p.visible?0:1,m=p.occluded?.4:p.visible?1:0,S=p.occluded?1:0,B=.8,v=d*8*6;r[v]=_,r[v+1]=g,r[v+2]=T,r[v+3]=m,r[v+4]=S,r[v+5]=B,r[v+6]=y,r[v+7]=g,r[v+8]=T,r[v+9]=m,r[v+10]=S,r[v+11]=B,r[v+12]=y,r[v+13]=g,r[v+14]=T,r[v+15]=m,r[v+16]=S,r[v+17]=B,r[v+18]=y,r[v+19]=C,r[v+20]=T,r[v+21]=m,r[v+22]=S,r[v+23]=B,r[v+24]=y,r[v+25]=C,r[v+26]=T,r[v+27]=m,r[v+28]=S,r[v+29]=B,r[v+30]=_,r[v+31]=C,r[v+32]=T,r[v+33]=m,r[v+34]=S,r[v+35]=B,r[v+36]=_,r[v+37]=C,r[v+38]=T,r[v+39]=m,r[v+40]=S,r[v+41]=B,r[v+42]=_,r[v+43]=g,r[v+44]=T,r[v+45]=m,r[v+46]=S,r[v+47]=B}const c=t/i,f=s/i,h=new Float32Array([c,f,0,0]);this._device.queue.writeBuffer(this._uniformBuffer,0,h),this._device.queue.writeBuffer(this._vertexBuffer,0,r.buffer,0,n*8*6*4),e.setPipeline(this._linePipeline),e.setBindGroup(0,this._uniformBindGroup),e.setVertexBuffer(0,this._vertexBuffer),e.draw(n*8)}clear(e){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:t}of e)t.setVisibleFeatures(null)}destroy(){this._collisionTimer&&clearTimeout(this._collisionTimer),this._uniformBuffer.destroy(),this._vertexBuffer.destroy()}}function Ne(u,e,t,s,i,a,o){if(o>=a)return;const n=(u.mercatorX+e.mercatorX)/2,r=(u.mercatorY+e.mercatorY)/2,l=s(u.mercatorX,u.mercatorY),c=s(e.mercatorX,e.mercatorY),f=s(n,r);if(l==null||c==null||f==null||l<=0||c<=0||f<=0)return;const h=(l+c)/2;if(Math.abs(f-h)>i){const d={mercatorX:n,mercatorY:r};Ne(u,d,t,s,i,a,o+1),t.push(d),Ne(d,e,t,s,i,a,o+1)}}class pt{static async create(e,t={}){const s=new pt;return await s._init(e,t),s}async _init(e,t){const{sources:s={},base:i=[],features:a=[],camera:o={},settings:n,createGPULines:r}=t;let l=null;const c={},f={},h=[];for(const[x,w]of Object.entries(s))if(h.push(w),w.type==="terrain"){if(l)throw new Error("Only one terrain source is allowed");l=w}else w.type==="raster"?c[x]=w:w.type==="geojson"&&(f[x]=w);if(!l)throw new Error("A terrain source is required");this._pixelRatio=t.pixelRatio||(typeof devicePixelRatio<"u"?devicePixelRatio:1),this._baseLayerConfigs=i,this._featureLayerConfigs=a,this._geojsonSources=f,this._rasterSources=c,this.canvas=e,this._terrainBounds=$e(l);const[d,p,_,y]=l.bounds;this._location=t.location||{lat:(p+y)/2,lon:(d+_)/2},this.attribution=di(h.filter(x=>x.attribution));const g=Math.round(ui(this._location.lat)*3.28084);this.settings=hi({treelineLower:Math.max(0,g-500),treelineUpper:g+500,...n});const C=await navigator.gpu.requestAdapter();this._device=await C.requestDevice(),this._format=navigator.gpu.getPreferredCanvasFormat(),this._createGPULines=r,this._gpuCtx=e.getContext("webgpu"),this._gpuCtx.configure({device:this._device,format:this._format,alphaMode:"opaque"});const T=vi(window.location.hash);this.camera=Ct(e,{center:[.0804792012701582,.0002040588543435183,.27264551318459634],distance:.0008177139017526437,phi:2.1624270549994598,theta:.16047571910010502,fov:Math.PI/4,near:1e-5,far:.5,rotateSpeed:.005,zoomSpeed:8e-4,panSpeed:1,...o,...T}),this._hashUpdateTimer=null;const m=this._device,S=this._format;this._mesh=Bt(m),this._imagerySampler=m.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});const B=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0}}]}),v=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),P=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),X=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this._globalUniformBuffer=m.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._globalUniformBindGroup=m.createBindGroup({layout:P,entries:[{binding:0,resource:{buffer:this._globalUniformBuffer}}]}),this._fallbackImageryTexture=m.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),m.queue.writeTexture({texture:this._fallbackImageryTexture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]),this._fallbackImageryBindGroup=m.createBindGroup({layout:X,entries:[{binding:0,resource:this._fallbackImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._whiteImageryTexture=m.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),m.queue.writeTexture({texture:this._whiteImageryTexture},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1]),this._whiteImageryBindGroup=m.createBindGroup({layout:X,entries:[{binding:0,resource:this._whiteImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._pipeline=m.createRenderPipeline({layout:m.createPipelineLayout({bindGroupLayouts:[B,v,P,X]}),vertex:{module:m.createShaderModule({code:Et}),entryPoint:"vs_main",buffers:[{arrayStride:4,attributes:[{format:"uint16x2",offset:0,shaderLocation:0}]}]},fragment:{module:m.createShaderModule({code:At}),entryPoint:"fs_main",targets:[{format:S}]},primitive:{topology:"triangle-list",cullMode:"back",frontFace:"ccw"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}}),this._skyPipeline=m.createRenderPipeline({layout:m.createPipelineLayout({bindGroupLayouts:[P]}),vertex:{module:m.createShaderModule({code:Ut}),entryPoint:"vs_sky",buffers:[]},fragment:{module:m.createShaderModule({code:Lt}),entryPoint:"fs_sky",targets:[{format:S}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._frustumOverlay=new xi(m,S,this._pixelRatio,r),this._collisionManager=new Mi(m,S),this._collisionManager.onWake=()=>{this._renderDirty=!0},this._UNIFORM_STRIDE=256,this._MAX_TILES_PER_FRAME=256,this._uniformBuffer=m.createBuffer({size:this._UNIFORM_STRIDE*this._MAX_TILES_PER_FRAME,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=m.createBindGroup({layout:B,entries:[{binding:0,resource:{buffer:this._uniformBuffer,size:208}}]}),this._tileManager=new Nt(m,{tileUrl:Qe(l.tiles)}),this._tileManager.setBindGroupLayout(v),this._tileManager.setBounds(this._terrainBounds),this._imageryDeltaZoom=1;const A=[];for(const x of i){const w=c[x.source];if(!w)throw new Error(`Base layer "${x.id}" references unknown source "${x.source}"`);const k=$e(w),Q=new Vt({tileUrl:Qe(w.tiles)});Q.setBounds(k),A.push({imageryManager:Q,blend:x.blend||"source-over",opacity:x.opacity!=null?x.opacity:1,minzoom:w.minzoom,maxzoom:w.maxzoom})}this._minImageryZoom=A.length>0?Math.min(...A.map(x=>x.minzoom)):1/0,this._maxImageryZoom=A.length>0?Math.max(...A.map(x=>x.maxzoom)):0,this._compositor=new $t(m,A,X,this._imagerySampler),this._coverageDirty=!0,this._renderDirty=!0,this._cachedRenderList=[],this._tileManager.onTileResolved=()=>{this._coverageDirty=!0,this._renderDirty=!0,this._refinementDirty=!0,this._collisionManager.markStale();for(const x of this._lineLayers)x.layer.invalidateElevations()},this._compositor.onUpdate=()=>{this._coverageDirty=!0,this._renderDirty=!0},this._depthTexture=null,this._MAX_ELEV_Y=.001,this._mvpFloat32=new Float32Array(16),this._modelFloat32=new Float32Array(16),this._uniformData=new Float32Array(52),this._globalUniformData=new Float32Array(24),this._currentExaggeration=this.settings.verticalExaggeration,this._currentDensityThreshold=this.settings.densityThreshold,this._currentFreezeCoverage=!1,this._refinementDirty=!1,this._lastRefinementTime=0,this._bvh=null,this._bvhTileList=[],this._lastProjView=new Float64Array(16),this._invProjView=new Float64Array(16),this.camera.rotateStartCallback=(x,w)=>this._hitTest(x,w),this._needsCanvasResize=!0,this._resizeObserver=new ResizeObserver(()=>{this._needsCanvasResize=!0,this._renderDirty=!0,this._coverageDirty=!0,this.camera.taint()}),this._resizeObserver.observe(e),this._circleLayers=[],this._textLayers=[],this._lineLayers=[];const K=[],H={};for(const x of a){const w=f[x.source];if(!w)throw new Error(`Feature layer "${x.id}" references unknown source "${x.source}"`);if(!H[x.source]){const Q=new it;H[x.source]=Q,K.push(Q.load(w.data,{...w,simplifyFn:t.simplifyFn}))}const k=x.collision!==!1;if(x.type==="circle"){const Q=new jt(x,H[x.source],(ee,O)=>this.queryElevationMercator(ee,O));Q.init(m,P,S),Q._collision=k,Q._sourceId=x.source,this._circleLayers.push({id:x.id,layer:Q,config:x,visible:!0,userCreated:!1})}else if(x.type==="text"){const Q=new ai(x,H[x.source],(ee,O)=>this.queryElevationMercator(ee,O));Q._collision=k,Q._sourceId=x.source,this._textLayers.push({id:x.id,layer:Q,config:x,visible:!0,userCreated:!1})}else if(x.type==="line"){const Q=new nt(x,H[x.source],(ee,O)=>this.queryElevationMercator(ee,O));Q.init(m,S,this._globalUniformBuffer,r),this._lineLayers.push({id:x.id,layer:Q,config:x,visible:!0,userCreated:!1,_sourceRef:H[x.source]})}}if(await Promise.all(K),t.font&&this._textLayers.length>0){const x=await oi(m,{atlasUrl:t.font.atlas,metadataUrl:t.font.metadata});for(const w of this._textLayers)w.layer.init(m,x,S,"depth24plus",this._globalUniformBuffer)}this._running=!0,this._boundFrame=this._frame.bind(this),requestAnimationFrame(this._boundFrame)}_hitTest(e,t){const s=this.raycast(e,t);if(s)return s.worldPos;const i=this.canvas.getBoundingClientRect(),a=(e-i.left)/i.width*2-1,o=1-(t-i.top)/i.height*2;Ue(this._invProjView,this._lastProjView);const{origin:n,direction:r}=qe(a,o,this._invProjView);if(Math.abs(r[1])>1e-10){const l=-n[1]/r[1];if(l>0)return[n[0]+l*r[0],0,n[2]+l*r[2]]}return null}_ensureDepthTexture(e,t){this._depthTexture&&this._depthTexture.width===e&&this._depthTexture.height===t||(this._depthTexture&&this._depthTexture.destroy(),this._depthTexture=this._device.createTexture({size:[e,t],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}))}_buildCollisionLayers(){const e=[];for(const t of this._circleLayers)t.visible&&e.push({layer:t.layer,collision:t.layer._collision,sourceId:t.layer._sourceId});for(const t of this._textLayers)t.visible&&e.push({layer:t.layer,collision:t.layer._collision,sourceId:t.layer._sourceId});return e}paint(){const{canvas:e,camera:t,settings:s}=this,i=e.width/e.height;if(i===0||!isFinite(i))return;const{view:a,projection:o,projectionView:n}=t.update(i),r=this._device;let l=0;const c=[],f=this._globalElevScale;for(const D of this._cachedRenderList){if(l>=this._MAX_TILES_PER_FRAME)break;const he=this._tileManager.getTile(D.z,D.x,D.y);if(!he)continue;const z=wt(D.z,D.y),W=Ke(D.z,this._imageryDeltaZoom,this._maxImageryZoom);this._compositor.ensureImagery(D.z,D.x,D.y,W);const M=this._compositor.hasImagery(D.z,D.x,D.y);Tt(this._mvpFloat32,a,o,D.z,D.x,D.y,f,this._currentExaggeration),Mt(this._modelFloat32,D.z,D.x,D.y,f,this._currentExaggeration);const U=this._uniformData;U.set(this._mvpFloat32,0),U.set(this._modelFloat32,16),U[32]=f,U[33]=z,U[34]=this._currentExaggeration,U[35]=1/514,U[36]=s.showTileBorders?1:0,U[37]=s.showImagery?M?1:0:1,U[38]=s.hillshadeOpacity,U[39]=s.slopeAngleOpacity,U[40]=s.contourOpacity,U[41]=e.height,U[42]=s.showWireframe?1:0,U[43]=s.slopeAspectMaskAbove,U[44]=s.slopeAspectMaskNear,U[45]=s.slopeAspectMaskBelow,U[46]=s.slopeAspectOpacity,U[47]=s.treelineLower*.3048,U[48]=s.treelineUpper*.3048;let j;s.showImagery?M?j=this._compositor.getBindGroup(D.z,D.x,D.y):j=this._fallbackImageryBindGroup:j=this._whiteImageryBindGroup,r.queue.writeBuffer(this._uniformBuffer,l*this._UNIFORM_STRIDE,U.buffer,U.byteOffset,208),c.push({offset:l*this._UNIFORM_STRIDE,bindGroup:he.bindGroup,imageryBindGroup:j}),l++}const{phi:h,theta:d,distance:p,center:_}=t.state,y=_[0]+p*Math.cos(d)*Math.cos(h),g=_[1]+p*Math.sin(d),C=_[2]+p*Math.cos(d)*Math.sin(h),T=1/f,m=g/f,S=s.sunDirection,B=S[0],v=S[1],P=S[2],X=s.atmosphereDensity,A=this._globalUniformData;A[0]=y,A[1]=g,A[2]=C,A[3]=m,A[4]=B,A[5]=v,A[6]=P,A[7]=T,A[8]=52e-7*X,A[9]=121e-7*X,A[10]=296e-7*X,A[11]=8e3,A[12]=2e-5*X,A[13]=3e3,A[14]=.76,A[15]=20;const K=t.state.fov,H=Math.sin(h),x=-Math.cos(h),w=-Math.sin(d)*Math.cos(h),k=Math.cos(d),Q=-Math.sin(d)*Math.sin(h);A[16]=H,A[17]=0,A[18]=x,A[19]=i,A[20]=w,A[21]=k,A[22]=Q,A[23]=Math.tan(K/2),r.queue.writeBuffer(this._globalUniformBuffer,0,A.buffer,A.byteOffset,96),this._ensureDepthTexture(e.width,e.height);const ee=r.createCommandEncoder(),O=ee.beginRenderPass({colorAttachments:[{view:this._gpuCtx.getCurrentTexture().createView(),clearValue:{r:.53,g:.66,b:.82,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this._depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});O.setPipeline(this._skyPipeline),O.setBindGroup(0,this._globalUniformBindGroup),O.draw(3),O.setPipeline(this._pipeline),O.setVertexBuffer(0,this._mesh.vertexBuffer),O.setIndexBuffer(this._mesh.indexBuffer,"uint32"),O.setBindGroup(2,this._globalUniformBindGroup);for(const D of c)O.setBindGroup(0,this._uniformBindGroup,[D.offset]),O.setBindGroup(1,D.bindGroup),O.setBindGroup(3,D.imageryBindGroup),O.drawIndexed(this._mesh.indexCount);this._frustumOverlay.draw(O,n,e.width,e.height);for(const D of this._lineLayers)D.visible&&D.layer.draw(O);for(const D of this._circleLayers)D.visible&&D.layer.draw(O,this._globalUniformBindGroup,!1);for(const D of this._textLayers)D.visible&&D.layer.draw(O);s.showCollisionBoxes&&this._collisionManager.drawDebug(O,e.width,e.height,this._pixelRatio,s.collisionBuffer),O.end(),r.queue.submit([ee.finish()])}_frame(){if(!this._running)return;requestAnimationFrame(this._boundFrame);const{canvas:e,camera:t,settings:s}=this;if(this._currentExaggeration!==s.verticalExaggeration&&(this._currentExaggeration=s.verticalExaggeration,t.taint()),this._currentDensityThreshold!==s.densityThreshold&&(this._currentDensityThreshold=s.densityThreshold,this._coverageDirty=!0),s.freezeCoverage!==this._currentFreezeCoverage&&(this._currentFreezeCoverage=s.freezeCoverage,this._currentFreezeCoverage?(this._savedFar=t.state.far,t.state.far=t.state.far*4):(this._frustumOverlay.unfreeze(),t.state.far=this._savedFar,this._coverageDirty=!0),t.taint(),this._renderDirty=!0),s.dirty&&(this._renderDirty=!0,s.dirty=!1),this._refinementDirty){const g=performance.now();g-this._lastRefinementTime>1e3&&(this._refineLineLayers(),this._lastRefinementTime=g,this._refinementDirty=!1,this._renderDirty=!0,this.onElevationRefine&&this.onElevationRefine())}if(!this._coverageDirty&&!this._renderDirty&&!t.dirty)return;if(this._needsCanvasResize){const g=this._pixelRatio,C=Math.floor(e.clientWidth*g),T=Math.floor(e.clientHeight*g);(e.width!==C||e.height!==T)&&(e.width=C,e.height=T),this._needsCanvasResize=!1}const i=e.width/e.height,{view:a,projection:o,projectionView:n,dirty:r}=t.update(i);this._lastProjView.set(n);const{center:l,distance:c,theta:f,phi:h}=t.state,d=l[2]+c*Math.cos(f)*Math.sin(h),p=2*Math.atan(Math.exp(Math.PI*(1-2*d)))-Math.PI/2;this._globalElevScale=1/(40075016686e-3*Math.cos(p)),this._currentFreezeCoverage&&!this._frustumOverlay.isFrozen&&this._frustumOverlay.freeze(n);const _=this._frustumOverlay.coverageProjView||n;if(r&&(this._coverageDirty=!0,this._renderDirty=!0,clearTimeout(this._hashUpdateTimer),this._hashUpdateTimer=setTimeout(()=>{history.replaceState(null,"",yi(t.state))},300)),this._coverageDirty){const g=this._MAX_ELEV_Y*this._currentExaggeration;this._tileManager.beginFrame();const C=this._compositor.layers.length>0,T=this._minImageryZoom;this._cachedRenderList=je(_,e.width,e.height,g,this._currentExaggeration,s.densityThreshold,this._terrainBounds,this._tileManager,C?(S,B,v)=>{const P=this._tileManager.getTile(S,B,v);if(!P||P.isFlat||S<T)return!0;const X=Ke(S,this._imageryDeltaZoom,this._maxImageryZoom);return this._compositor.ensureImagery(S,B,v,X),this._compositor.hasImagery(S,B,v)}:null);const m=_;this._cachedRenderList.sort((S,B)=>{const v=m[3]*((S.x+.5)/(1<<S.z))+m[11]*((S.y+.5)/(1<<S.z))+m[15],P=m[3]*((B.x+.5)/(1<<B.z))+m[11]*((B.y+.5)/(1<<B.z))+m[15];return v-P}),this._tileManager.cancelStale(),this._tileManager.evict(),this._tileManager.stripQuadtrees(),this._compositor.gc(this._tileManager.wantedKeys),this._rebuildBVH(),this._coverageDirty=!1,this._renderDirty=!0}if(!this._renderDirty)return;this._renderDirty=!1;const y=this._buildCollisionLayers();this._collisionManager.update({enabled:s.enableCollision,layers:y,projectionView:n,canvasW:e.width,canvasH:e.height,pixelRatio:this._pixelRatio,exaggeration:this._currentExaggeration,collisionBuffer:s.collisionBuffer,occlusionBias:s.occlusionBias,bvh:this._bvh,tileManager:this._tileManager,bvhTileList:this._bvhTileList,globalElevScale:this._globalElevScale})&&(this._renderDirty=!0);for(const g of this._circleLayers)g.visible&&g.layer.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale);for(const g of this._textLayers)g.visible&&g.layer.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale);for(const g of this._lineLayers)g.visible&&g.layer.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale);this.onElevationRefine&&this.onElevationRefine(),this.paint()}_rebuildBVH(){const e=this._cachedRenderList;if(e.length===0){this._bvh=null,this._bvhTileList=[];return}const t=new Float64Array(e.length*6),s=new Array(e.length);for(let i=0;i<e.length;i++){const{z:a,x:o,y:n}=e[i];s[i]=e[i];const r=1/(1<<a),l=He(a,n),c=this._tileManager.getElevationBounds(a,o,n),f=i*6;t[f]=o*r,t[f+1]=c?c.minElevation*l*this._currentExaggeration:0,t[f+2]=n*r,t[f+3]=(o+1)*r,t[f+4]=c?c.maxElevation*l*this._currentExaggeration:this._MAX_ELEV_Y*this._currentExaggeration,t[f+5]=(n+1)*r}this._bvh=new fi(t,{maxItemsPerNode:4}),this._bvhTileList=s}raycast(e,t){if(!this._bvh)return null;const s=this.canvas.getBoundingClientRect(),i=(e-s.left)/s.width*2-1,a=1-(t-s.top)/s.height*2;Ue(this._invProjView,this._lastProjView);const{origin:o,direction:n}=qe(i,a,this._invProjView);return dt({origin:o,direction:n,bvh:this._bvh,tileCache:this._tileManager,tileList:this._bvhTileList,verticalExaggeration:this._currentExaggeration})}queryElevation(e,t){const s=Ge(e),i=Fe(t);return this.queryElevationMercator(s,i)}queryElevationMercator(e,t){let s=null,i=-1;for(const P of this._cachedRenderList){const X=1/(1<<P.z);e>=P.x*X&&e<(P.x+1)*X&&t>=P.y*X&&t<(P.y+1)*X&&P.z>i&&(s=P,i=P.z)}if(!s)return null;const a=this._tileManager.getTile(s.z,s.x,s.y);if(!a||!a.elevations)return null;const o=1/(1<<s.z),n=(e-s.x*o)/o,r=(t-s.y*o)/o,l=n*512+1,c=r*512+1,f=Math.floor(l),h=Math.floor(c),d=l-f,p=c-h,_=514,y=Math.min(f,513),g=Math.min(f+1,513),C=Math.min(h,513),T=Math.min(h+1,513),m=a.elevations[C*_+y],S=a.elevations[C*_+g],B=a.elevations[T*_+y],v=a.elevations[T*_+g];return m*(1-d)*(1-p)+S*d*(1-p)+B*(1-d)*p+v*d*p}debugTileCoverage(){const{canvas:e,camera:t,settings:s}=this,i=e.width/e.height,{projectionView:a}=t.update(i),o=t.state,n=this._MAX_ELEV_Y*this._currentExaggeration,r=je(a,e.width,e.height,n,this._currentExaggeration,s.densityThreshold,this._terrainBounds,this._tileManager,null);return{camera:{center:[...o.center],distance:o.distance,phi:o.phi,theta:o.theta,thetaDeg:o.theta*180/Math.PI,fov:o.fov},canvas:{width:e.width,height:e.height},densityThreshold:s.densityThreshold,tiles:r.map(l=>{const[c,f,h]=ut(a);return{z:l.z,x:l.x,y:l.y,density:ht(a,l.z,l.x,l.y,e.height,c,f,h)}}),projectionView:Array.from(a)}}async addLineLayer(e,t,s={}){const i=new it;await i.load(t);const a={id:e,type:"line",paint:s},o=new nt(a,i,(r,l)=>this.queryElevationMercator(r,l));o.init(this._device,this._format,this._globalUniformBuffer,this._createGPULines);const n={id:e,layer:o,config:a,visible:!0,userCreated:!0,_sourceRef:i,sourceGeoJSON:t};return this._lineLayers.push(n),this._refinementDirty=!0,this._renderDirty=!0,n}removeLayer(e){for(const t of[this._lineLayers,this._circleLayers,this._textLayers]){const s=t.findIndex(i=>i.id===e);if(s!==-1){t[s].layer.destroy&&t[s].layer.destroy(),t.splice(s,1),this._renderDirty=!0;return}}}removeLineLayer(e){this.removeLayer(e)}setLayerVisibility(e,t){for(const s of[this._lineLayers,this._circleLayers,this._textLayers]){const i=s.find(a=>a.id===e);if(i){i.visible=t,this._renderDirty=!0;return}}}setLineLayerColor(e,t){const s=this._lineLayers.find(i=>i.id===e);s&&(s.layer._lineColor=De(t),this._renderDirty=!0)}setLayerPaint(e,t,s){const i=typeof s=="string"?De(s):null;for(const a of this._lineLayers){if(a.id!==e)continue;const o=a.layer;t==="line-color"?o._lineColor=i:t==="line-border-color"?o._borderColor=i:t==="line-width"?o._lineWidth=s:t==="line-border-width"&&(o._borderWidth=s),this._renderDirty=!0;return}for(const a of this._circleLayers){if(a.id!==e)continue;const o=a.layer;t==="circle-color"?o._fillColor=i:t==="circle-stroke-color"?o._strokeColor=i:t==="circle-radius"?o._radius=s:t==="circle-stroke-width"&&(o._strokeWidth=s),this._renderDirty=!0;return}for(const a of this._textLayers){if(a.id!==e)continue;const o=a.layer;if(t==="text-color"){if(o._color=i,o._spans)for(const{span:n}of o._spans)n.setColor(i)}else if(t==="text-halo-color"){if(o._strokeColor=i,o._spans)for(const{span:n}of o._spans)n.setStrokeColor(i)}else t==="text-halo-width"&&(o._strokeWidth=s,o._lastScaledStrokeWidth=null);this._renderDirty=!0;return}}_refineLineLayers(){const e=(t,s)=>this.queryElevationMercator(t,s);for(const t of this._lineLayers){if(!t._sourceRef)continue;const s=t._sourceRef.lineFeatures;if(!s||s.length===0)continue;t._segmentMidpoints||(t._segmentMidpoints=s.map(o=>new Array(Math.max(0,o.coordinates.length-1)).fill(null).map(()=>[])));let i=!1;const a=[];for(let o=0;o<s.length;o++){const n=s[o],r=n.coordinates,l=t._segmentMidpoints[o];for(let f=0;f<r.length-1;f++){const h=[];if(Ne(r[f],r[f+1],h,e,1,8,0),!(h.length<l[f].length)){if(h.length>l[f].length)l[f]=h,i=!0;else if(h.length>0){let d=!1;for(let p=0;p<h.length;p++)if(h[p].mercatorX!==l[f][p].mercatorX||h[p].mercatorY!==l[f][p].mercatorY){d=!0;break}d&&(l[f]=h,i=!0)}}}const c=[r[0]];for(let f=0;f<r.length-1;f++){for(const h of l[f])c.push(h);c.push(r[f+1])}a.push({coordinates:c,properties:n.properties})}if(i){const o=t.layer,n=new Map;if(o._cachedElevations&&o._polylines)for(const r of o._polylines)for(let l=0;l<r.count;l++){const c=r.feature.coordinates[l],f=o._cachedElevations[r.offset+l];f>0&&n.set(c.mercatorX+","+c.mercatorY,f)}o.replaceSource({lineFeatures:a,features:[]},n)}}}getLayerElevationProfile(e){const t=this._lineLayers.find(i=>i.id===e);if(!t)return null;const s=t.layer;return!s._polylines||s._polylines.length===0?null:s._polylines.map(i=>{const a=[],o=[];for(let n=0;n<i.count;n++){const r=i.feature.coordinates[n];a.push({mercatorX:r.mercatorX,mercatorY:r.mercatorY}),o.push(s._cachedElevations[i.offset+n])}return{coords:a,elevations:o}})}getLayerGeoJSON(e){const t=this._lineLayers.find(s=>s.id===e);return t?t.sourceGeoJSON?t.sourceGeoJSON:t._sourceRef?{type:"FeatureCollection",features:t._sourceRef.lineFeatures.map(s=>({type:"Feature",geometry:{type:"LineString",coordinates:s.coordinates.map(i=>[i.lon,i.lat,i.elevation||0])},properties:s.properties||{}}))}:null:null}destroy(){this._running=!1,clearTimeout(this._hashUpdateTimer),this._collisionManager.destroy(),this._frustumOverlay.destroy(),this._resizeObserver.disconnect(),this.camera.destroy(),this._depthTexture&&this._depthTexture.destroy(),this._mesh.vertexBuffer.destroy(),this._mesh.indexBuffer.destroy(),this._uniformBuffer.destroy(),this._globalUniformBuffer.destroy(),this._fallbackImageryTexture.destroy(),this._whiteImageryTexture.destroy();for(const e of this._lineLayers)e.layer.destroy();for(const e of this._circleLayers)e.layer.destroy&&e.layer.destroy();for(const e of this._textLayers)e.layer.destroy&&e.layer.destroy();this._device.destroy()}}export{pt as TerrainMap};
