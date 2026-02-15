import{g as qe,a as vt,c as He,l as Le,b as ze,t as Ve,d as Ze,e as xt,f as $e,h as bt,i as wt}from"./tile-math-BziQlsn7.js";function Ae(u,e){const[t,s,i,a,o,n,r,l,c,f,d,h,_,p,y,g]=e,C=t*n-s*o,w=t*r-i*o,m=t*l-a*o,S=s*r-i*n,E=s*l-a*n,v=i*l-a*r,G=c*p-f*_,Y=c*y-d*_,U=c*g-h*_,Q=f*y-d*p,q=f*g-h*p,x=d*g-h*y;let T=C*x-w*q+m*Q+S*U-E*Y+v*G;return Math.abs(T)<1e-10?!1:(T=1/T,u[0]=(n*x-r*q+l*Q)*T,u[1]=(-s*x+i*q-a*Q)*T,u[2]=(p*v-y*E+g*S)*T,u[3]=(-f*v+d*E-h*S)*T,u[4]=(-o*x+r*U-l*Y)*T,u[5]=(t*x-i*U+a*Y)*T,u[6]=(-_*v+y*m-g*w)*T,u[7]=(c*v-d*m+h*w)*T,u[8]=(o*q-n*U+l*G)*T,u[9]=(-t*q+s*U-a*G)*T,u[10]=(_*E-p*m+g*C)*T,u[11]=(-c*E+f*m-h*C)*T,u[12]=(-o*Q+n*Y-r*G)*T,u[13]=(t*Q-s*Y+i*G)*T,u[14]=(-_*S+p*w-y*C)*T,u[15]=(c*S-f*w+d*C)*T,!0)}function Tt(u){function e(o,n,r){const l=u[0]*o+u[4]*n+u[8]*r+u[12],c=u[1]*o+u[5]*n+u[9]*r+u[13],f=u[2]*o+u[6]*n+u[10]*r+u[14],d=u[3]*o+u[7]*n+u[11]*r+u[15];return[l/d,c/d,f/d]}const t=.3,s=.99,i=new Float32Array(24),a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let o=0;o<4;o++){const[n,r]=a[o],l=e(n,r,t),c=e(n,r,s);i[o*3]=l[0],i[o*3+1]=l[1],i[o*3+2]=l[2],i[(o+4)*3]=c[0],i[(o+4)*3+1]=c[1],i[(o+4)*3+2]=c[2]}return i}function Mt(u,e={}){const t=new Proxy({center:e.center?[...e.center]:[0,0,0],distance:e.distance||10,phi:e.phi||0,theta:e.theta||.3,fov:e.fov||Math.PI/4,near:e.near||.1,far:e.far||1},{set(b,L,B){return b[L]=B,c=!0,!0}}),s=e.rotateSpeed||.01,i=e.zoomSpeed||.001,a=e.panSpeed||1,o=new Float64Array(16),n=new Float64Array(16),r=new Float64Array(16),l=new Float64Array(16);let c=!0,f=1,d=!1,h=null,_=0,p=0,y=null,g=null,C=null,w=0,m=0;function S(b,L){const B=u.getBoundingClientRect(),F=(b-B.left)/B.width*2-1,z=1-(L-B.top)/B.height*2;Ae(l,r);const P=l;function Z(J,$,N){const W=P[0]*J+P[4]*$+P[8]*N+P[12],te=P[1]*J+P[5]*$+P[9]*N+P[13],ce=P[2]*J+P[6]*$+P[10]*N+P[14],re=P[3]*J+P[7]*$+P[11]*N+P[15];return[W/re,te/re,ce/re]}const K=Z(F,z,0),V=Z(F,z,1);return{origin:K,direction:[V[0]-K[0],V[1]-K[1],V[2]-K[2]]}}function E(b,L){if(Math.abs(b.direction[1])<1e-10)return null;const B=(L-b.origin[1])/b.direction[1];return B<0?null:[b.origin[0]+B*b.direction[0],L,b.origin[2]+B*b.direction[2]]}let v=null,G=null;function Y(b,L){U();const B=u.parentElement;if(!B)return;const F=B.getBoundingClientRect();getComputedStyle(B).position==="static"&&(B.style.position="relative");const P=document.createElement("div"),Z=22,K={position:"absolute",left:"0",top:"0",width:Z+"px",height:Z+"px",borderRadius:"50%",boxSizing:"border-box",pointerEvents:"none"};Object.assign(P.style,{position:"absolute",left:b-F.left-Z/2+"px",top:L-F.top-Z/2+"px",width:Z+"px",height:Z+"px",pointerEvents:"none",transform:"scale(0.5)",opacity:"0",transition:"transform 0.15s ease-out, opacity 0.15s ease-out"});const V=document.createElement("div");Object.assign(V.style,{...K,border:"4px solid rgba(255,255,255,0.6)"});const J=document.createElement("div");Object.assign(J.style,{...K,border:"2.25px solid rgba(0,0,0,0.5)"}),P.appendChild(V),P.appendChild(J),B.appendChild(P),P.offsetWidth,P.style.transform="scale(1)",P.style.opacity="1",G=P}function U(){if(!G)return;const b=G;G=null,b.style.transform="scale(1.5)",b.style.opacity="0",b.addEventListener("transitionend",()=>b.remove(),{once:!0})}function Q(b,L){const{phi:B,theta:F,distance:z,center:P}=t,Z=B+b,K=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,F+L)),V=K-F;if(!v){t.phi=Z,t.theta=K;return}const J=P[0]+z*Math.cos(F)*Math.cos(B),$=P[1]+z*Math.sin(F),N=P[2]+z*Math.cos(F)*Math.sin(B);let W=J-v[0],te=$-v[1],ce=N-v[2];const re=Math.cos(b),le=Math.sin(b),fe=W*re-ce*le,he=te,de=W*le+ce*re,_e=-Math.sin(Z),pe=Math.cos(Z),me=Math.cos(V),be=Math.sin(V),ve=1-me,we=-pe*he,Re=pe*fe-_e*de,Te=_e*he,Ne=_e*fe+pe*de,dt=fe*me+we*be+_e*Ne*ve,_t=he*me+Re*be,pt=de*me+Te*be+pe*Ne*ve,mt=v[0]+dt,gt=v[1]+_t,yt=v[2]+pt;t.phi=Z,t.theta=K,t.center[0]=mt-z*Math.cos(K)*Math.cos(Z),t.center[1]=gt-z*Math.sin(K),t.center[2]=yt-z*Math.cos(K)*Math.sin(Z)}let q=0,x=0,T=0,R=0;function H(b){const{phi:L,theta:B,distance:F,center:z,fov:P,near:Z,far:K}=t,V=z[0]+F*Math.cos(B)*Math.cos(L),J=z[1]+F*Math.sin(B),$=z[2]+F*Math.cos(B)*Math.sin(L);let N=z[0]-V,W=z[1]-J,te=z[2]-$;const ce=Math.sqrt(N*N+W*W+te*te);N/=ce,W/=ce,te/=ce;let re=W*0-te*1,le=te*0-N*0,fe=N*1-W*0;const he=Math.sqrt(re*re+le*le+fe*fe);he>1e-4&&(re/=he,le/=he,fe/=he);const de=le*te-fe*W,_e=fe*N-re*te,pe=re*W-le*N;o[0]=re,o[1]=de,o[2]=-N,o[3]=0,o[4]=le,o[5]=_e,o[6]=-W,o[7]=0,o[8]=fe,o[9]=pe,o[10]=-te,o[11]=0,o[12]=-(re*V+le*J+fe*$),o[13]=-(de*V+_e*J+pe*$),o[14]=N*V+W*J+te*$,o[15]=1;const me=1/Math.tan(P/2),be=1/(Z-K);n[0]=me/b,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=me,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=K*be,n[11]=-1,n[12]=0,n[13]=0,n[14]=Z*K*be,n[15]=0;for(let ve=0;ve<4;ve++)for(let we=0;we<4;we++){let Re=0;for(let Te=0;Te<4;Te++)Re+=n[ve+Te*4]*o[Te+we*4];r[ve+we*4]=Re}}function ee(b,L){const{phi:B,theta:F,distance:z}=t,P=Math.sin(B),Z=-Math.cos(B),K=-Math.sin(F)*Math.cos(B),V=Math.cos(F),J=-Math.sin(F)*Math.sin(B),$=z*a;t.center[0]-=b*P*$,t.center[0]+=L*K*$,t.center[1]+=L*V*$,t.center[2]-=b*Z*$,t.center[2]+=L*J*$}function O(b,L){if(g=null,H(f),y){const z=y(b,L);if(Array.isArray(z)&&z.length===3){g={point:[...z],altitude:z[1]};return}}const B=S(b,L),F=E(B,t.center[1]);F&&(g={point:F,altitude:t.center[1]})}function I(b,L){if(!g)return;H(f);const B=S(b,L),F=E(B,g.altitude);F&&(t.center[0]+=g.point[0]-F[0],t.center[2]+=g.point[2]-F[2])}function ue(b,L){C=null,H(f);let B=null;if(y){const V=y(b,L);Array.isArray(V)&&V.length===3&&(B=V)}if(!B){const V=S(b,L);B=E(V,t.center[1])}if(!B)return;const{phi:F,theta:z}=t,P=-Math.cos(z)*Math.cos(F),Z=-Math.sin(z),K=-Math.cos(z)*Math.sin(F);C={point:[...B],normal:[P,Z,K]}}function k(b,L){if(!C)return;H(f);const B=S(b,L),{point:F,normal:z}=C,P=z[0]*B.direction[0]+z[1]*B.direction[1]+z[2]*B.direction[2];if(Math.abs(P)<1e-10)return;const Z=z[0]*F[0]+z[1]*F[1]+z[2]*F[2],K=z[0]*B.origin[0]+z[1]*B.origin[1]+z[2]*B.origin[2],V=(Z-K)/P;if(V<0)return;const J=B.origin[0]+V*B.direction[0],$=B.origin[1]+V*B.direction[1],N=B.origin[2]+V*B.direction[2];t.center[0]+=F[0]-J,t.center[1]+=F[1]-$,t.center[2]+=F[2]-N}function X(b){if(b.preventDefault(),_=b.clientX,p=b.clientY,h=b.shiftKey?"pan":b.button===2||b.button===1?"rotate":b.ctrlKey?"pivot":b.metaKey?"rotate":b.altKey?"zoom":"grab",h==="rotate"){if(y){const L=y(b.clientX,b.clientY);v=Array.isArray(L)&&L.length===3?L:null}Y(b.clientX,b.clientY)}if(h==="grab"&&O(b.clientX,b.clientY),h==="pan"&&ue(b.clientX,b.clientY),h==="zoom"){if(y){const B=y(b.clientX,b.clientY);if(Array.isArray(B)&&B.length===3){const{phi:F,theta:z,distance:P,center:Z}=t,K=Z[0]+P*Math.cos(z)*Math.cos(F),V=Z[1]+P*Math.sin(z),J=Z[2]+P*Math.cos(z)*Math.sin(F),$=B[0]-K,N=B[1]-V,W=B[2]-J,te=Math.sqrt($*$+N*N+W*W),ce=Math.cos(z)*Math.cos(F),re=Math.sin(z),le=Math.cos(z)*Math.sin(F);t.center[0]+=(P-te)*ce,t.center[1]+=(P-te)*re,t.center[2]+=(P-te)*le,t.distance=te}}const L=u.getBoundingClientRect();w=(b.clientX-L.left-L.width/2)/L.height,m=(b.clientY-L.top-L.height/2)/L.height,Y(b.clientX,b.clientY)}d=!0,u.style.cursor="grabbing",window.addEventListener("mousemove",M),window.addEventListener("mouseup",A)}function M(b){if(!d)return;const L=b.clientX-_,B=b.clientY-p;if(_=b.clientX,p=b.clientY,h==="grab")I(b.clientX,b.clientY);else if(h==="rotate")Q(L*s,B*s);else if(h==="pivot"){const{phi:F,theta:z,distance:P,center:Z,fov:K}=t,V=K/u.getBoundingClientRect().height,J=Z[0]+P*Math.cos(z)*Math.cos(F),$=Z[1]+P*Math.sin(z),N=Z[2]+P*Math.cos(z)*Math.sin(F);t.phi-=L*V,t.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t.theta-B*V)),t.center[0]=J-P*Math.cos(t.theta)*Math.cos(t.phi),t.center[1]=$-P*Math.sin(t.theta),t.center[2]=N-P*Math.cos(t.theta)*Math.sin(t.phi)}else if(h==="zoom"){const F=Math.exp(-B*.005),z=t.distance;t.distance=Math.max(t.near*2,z*F);const Z=(1/(t.distance/z)-1)*2*Math.tan(t.fov/2);ee(-w*Z,-m*Z)}else h==="pan"&&k(b.clientX,b.clientY);c=!0}function A(){d=!1,h=null,g=null,v=null,C=null,U(),u.style.cursor="grab",window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",A)}let j=!1,D=null;function se(b){if(b.preventDefault(),!j&&y){const V=y(b.clientX,b.clientY);if(Array.isArray(V)&&V.length===3){const{phi:J,theta:$,distance:N,center:W}=t,te=W[0]+N*Math.cos($)*Math.cos(J),ce=W[1]+N*Math.sin($),re=W[2]+N*Math.cos($)*Math.sin(J),le=V[0]-te,fe=V[1]-ce,he=V[2]-re,de=Math.sqrt(le*le+fe*fe+he*he),_e=Math.cos($)*Math.cos(J),pe=Math.sin($),me=Math.cos($)*Math.sin(J);t.center[0]+=(N-de)*_e,t.center[1]+=(N-de)*pe,t.center[2]+=(N-de)*me,t.distance=de}j=!0}clearTimeout(D),D=setTimeout(()=>{j=!1},200);const L=u.getBoundingClientRect(),B=(b.clientX-L.left-L.width/2)/L.height,F=(b.clientY-L.top-L.height/2)/L.height,z=1+b.deltaY*i,P=t.distance;t.distance=Math.max(t.near*2,P*z);const K=(1/(t.distance/P)-1)*2*Math.tan(t.fov/2);ee(-B*K,-F*K),c=!0}function oe(b){if(b.preventDefault(),b.touches.length===1)d=!0,h="grab",_=b.touches[0].clientX,p=b.touches[0].clientY,O(_,p);else if(b.touches.length===2){const L=b.touches[1].clientX-b.touches[0].clientX,B=b.touches[1].clientY-b.touches[0].clientY;if(q=Math.sqrt(L*L+B*B),x=(b.touches[0].clientX+b.touches[1].clientX)/2,T=(b.touches[0].clientY+b.touches[1].clientY)/2,R=Math.atan2(B,L),y){const F=y(x,T);v=Array.isArray(F)&&F.length===3?F:null}}}function ie(b){if(b.preventDefault(),b.touches.length===1&&d)_=b.touches[0].clientX,p=b.touches[0].clientY,h==="grab"&&I(_,p),c=!0;else if(b.touches.length===2){const L=b.touches[1].clientX-b.touches[0].clientX,B=b.touches[1].clientY-b.touches[0].clientY,F=Math.sqrt(L*L+B*B),z=(b.touches[0].clientX+b.touches[1].clientX)/2,P=(b.touches[0].clientY+b.touches[1].clientY)/2;if(q>0){const Z=q/F;t.distance*=Z,t.distance=Math.max(t.near*2,t.distance);const K=Math.atan2(B,L),V=K-R,J=u.getBoundingClientRect(),$=(P-T)/J.height;Q(-V,$*2),c=!0,R=K}q=F,x=z,T=P}}function ne(){d=!1,h=null,g=null,v=null,q=0,R=0}function ye(b){b.preventDefault()}u.style.cursor="grab",u.addEventListener("mousedown",X),u.addEventListener("wheel",se,{passive:!1}),u.addEventListener("touchstart",oe,{passive:!1}),u.addEventListener("touchmove",ie,{passive:!1}),u.addEventListener("touchend",ne),u.addEventListener("contextmenu",ye);function Fe(){u.removeEventListener("mousedown",X),u.removeEventListener("wheel",se),u.removeEventListener("touchstart",oe),u.removeEventListener("touchmove",ie),u.removeEventListener("touchend",ne),u.removeEventListener("contextmenu",ye),window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",A)}return{state:t,get dirty(){return c},set rotateStartCallback(b){y=b},taint(){c=!0},update(b){f=b,H(b);const L=c;return c=!1,{view:o,projection:n,projectionView:r,dirty:L}},destroy:Fe}}function St(u){const s=new Uint16Array(534578);let i=0;for(let d=0;d<=516;d++)for(let h=0;h<=516;h++)s[i++]=h,s[i++]=d;const o=516*516*6,n=new Uint32Array(o);let r=0;const l=517;for(let d=0;d<516;d++)for(let h=0;h<516;h++){const _=d*l+h,p=_+1,y=_+l,g=y+1;n[r++]=_,n[r++]=y,n[r++]=p,n[r++]=p,n[r++]=y,n[r++]=g}const c=u.createBuffer({size:s.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});u.queue.writeBuffer(c,0,s);const f=u.createBuffer({size:n.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});return u.queue.writeBuffer(f,0,n),{vertexBuffer:c,indexBuffer:f,indexCount:o,vertexCount:267289}}const Pe=`
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
`,Ct=`
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
`,Bt=`
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

`+Pe+`

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
`,Et=`
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
`,At=`
`+Pe+`

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
`;function Ut(u){const e=[],t=u;return e.push(Me(t[3]+t[0],t[7]+t[4],t[11]+t[8],t[15]+t[12])),e.push(Me(t[3]-t[0],t[7]-t[4],t[11]-t[8],t[15]-t[12])),e.push(Me(t[3]+t[1],t[7]+t[5],t[11]+t[9],t[15]+t[13])),e.push(Me(t[3]-t[1],t[7]-t[5],t[11]-t[9],t[15]-t[13])),e.push(Me(t[2],t[6],t[10],t[14])),e.push(Me(t[3]-t[2],t[7]-t[6],t[11]-t[10],t[15]-t[14])),e}function Me(u,e,t,s){const i=Math.sqrt(u*u+e*e+t*t);return[u/i,e/i,t/i,s/i]}function Pt(u,e,t,s,i,a,o){let n=!0;for(let r=0;r<6;r++){const[l,c,f,d]=u[r],h=l>=0?i:e,_=c>=0?a:t,p=f>=0?o:s,y=l>=0?e:i,g=c>=0?t:a,C=f>=0?s:o;if(l*h+c*_+f*p+d<0)return-1;l*y+c*g+f*C+d<0&&(n=!1)}return n?1:0}function ct(u){const e=u[0],t=u[4],s=u[8],i=-u[12],a=u[1],o=u[5],n=u[9],r=-u[13],l=u[3],c=u[7],f=u[11],d=-u[15],_=1/(e*(o*f-n*c)-t*(a*f-n*l)+s*(a*c-o*l));return[(i*(o*f-n*c)-t*(r*f-n*d)+s*(r*c-o*d))*_,(e*(r*f-n*d)-i*(a*f-n*l)+s*(a*d-r*l))*_,(e*(o*d-r*c)-t*(a*d-r*l)+i*(a*c-o*l))*_]}function ft(u,e,t,s,i,a,o,n){const r=1/(1<<e),l=r/512,c=a-(t+.5)*r,f=o,d=n-(s+.5)*r,h=Math.sqrt(c*c+f*f+d*d);if(h<1e-10)return 1/0;const _=Math.sqrt(u[1]*u[1]+u[5]*u[5]+u[9]*u[9]);return l*_*i*.5/h}function Rt(u,e,t,s,i,a){const o=1/(1<<u);let n=0,r=s;const l=a.getElevationBounds(u,e,t);if(l){const c=qe(u,t);n=l.minElevation*c*i,r=l.maxElevation*c*i}return{minX:e*o,maxX:(e+1)*o,minY:n,maxY:r,minZ:t*o,maxZ:(t+1)*o}}const kt=14,Lt=4,zt=200;function Qe(u,e,t,s,i,a,o,n,r){const l=Ut(u),[c,f,d]=ct(u),h=[],_=o&&o.minZoom!=null?o.minZoom:Lt,p=o&&o.maxZoom!=null?o.maxZoom:kt;function y(g,C,w){if(h.length>=zt)return;const{minX:m,maxX:S,minY:E,maxY:v,minZ:G,maxZ:Y}=Rt(g,C,w,s,i,n);if(o&&(S<o.minX||m>o.maxX||Y<o.minY||G>o.maxY)||Pt(l,m,E,G,S,v,Y)===-1)return;if(g<_){const x=g+1,T=C*2,R=w*2;y(x,T,R),y(x,T+1,R),y(x,T,R+1),y(x,T+1,R+1);return}if(!n.hasTile(g,C,w)){n.requestTile(g,C,w);return}if(g<p&&ft(u,g,C,w,t,c,f,d)>a){const x=g+1,T=C*2,R=w*2;if(n.isResolved(x,T,R)&&n.isResolved(x,T+1,R)&&n.isResolved(x,T,R+1)&&n.isResolved(x,T+1,R+1)&&(!r||r(x,T,R)&r(x,T+1,R)&r(x,T,R+1)&r(x,T+1,R+1))){y(x,T,R),y(x,T+1,R),y(x,T,R+1),y(x,T+1,R+1);return}n.hasTile(x,T,R)?r&&r(x,T,R):n.requestTile(x,T,R),n.hasTile(x,T+1,R)?r&&r(x,T+1,R):n.requestTile(x,T+1,R),n.hasTile(x,T,R+1)?r&&r(x,T,R+1):n.requestTile(x,T,R+1),n.hasTile(x,T+1,R+1)?r&&r(x,T+1,R+1):n.requestTile(x,T+1,R+1)}h.push({z:g,x:C,y:w})}return y(0,0,0),h}const Ue=10,Ke=349525,Ee=new Uint32Array(Ue);{let u=1;for(let e=0;e<Ue;e++)Ee[e]=(u-1)/3,u*=4}function It(u){const e=new Float32Array(Ke),t=new Float32Array(Ke),s=Ue-1,i=Ee[s],a=512,o=514;for(let n=0;n<a;n++)for(let r=0;r<a;r++){const l=n+1,c=r+1,f=u[l*o+c],d=u[l*o+c+1],h=u[(l+1)*o+c],_=u[(l+1)*o+c+1],p=i+n*a+r;e[p]=Math.min(f,d,h,_),t[p]=Math.max(f,d,h,_)}for(let n=s-1;n>=0;n--){const r=Ee[n],l=Ee[n+1],c=1<<n,f=1<<n+1;for(let d=0;d<c;d++)for(let h=0;h<c;h++){const _=r+d*c+h,p=d*2,y=h*2,g=l+p*f+y,C=g+1,w=l+(p+1)*f+y,m=w+1;e[_]=Math.min(e[g],e[C],e[w],e[m]),t[_]=Math.max(t[g],t[C],t[w],t[m])}}return{minElev:e,maxElev:t}}function Ft(u,e,t,s,i,a,o,n,r,l,c,f){let d,h;if(s!==0){let _=(o-u)/s,p=(l-u)/s;if(_>p){const y=_;_=p,p=y}d=_,h=p}else{if(u<o||u>l)return null;d=-1/0,h=1/0}if(i!==0){let _=(n-e)/i,p=(c-e)/i;if(_>p){const y=_;_=p,p=y}_>d&&(d=_),p<h&&(h=p)}else if(e<n||e>c)return null;if(d>h)return null;if(a!==0){let _=(r-t)/a,p=(f-t)/a;if(_>p){const y=_;_=p,p=y}_>d&&(d=_),p<h&&(h=p)}else if(t<r||t>f)return null;return d>h||h<0?null:[d,h]}function je(u,e,t,s,i,a,o,n,r,l,c,f,d,h,_){const p=l-o,y=c-n,g=f-r,C=d-o,w=h-n,m=_-r,S=i*m-a*w,E=a*C-s*m,v=s*w-i*C,G=p*S+y*E+g*v;if(G<1e-10)return-1;const Y=1/G,U=u-o,Q=e-n,q=t-r,x=(U*S+Q*E+q*v)*Y;if(x<0||x>1)return-1;const T=Q*g-q*y,R=q*p-U*g,H=U*y-Q*p,ee=(s*T+i*R+a*H)*Y;if(ee<0||x+ee>1)return-1;const O=(C*T+w*R+m*H)*Y;return O>0?O:-1}function Gt(u,e,t,s,i,a,o,n,r){let l=1/0,c=-1,f=-1;const d=new Int32Array(Ue*4*3);let h=0;d[h++]=0,d[h++]=0,d[h++]=0;const _=514;for(;h>0;){const p=d[--h],y=d[--h],g=d[--h],C=Ee[g],w=1<<g,m=C+y*w+p,S=512>>>g,E=p*S,v=E+S,G=y*S,Y=G+S,U=u[m],Q=e[m],q=Ft(s,i,a,o,n,r,E,U,G,v,Q,Y);if(q&&!(q[0]>=l))if(g===Ue-1){const x=y+1,T=p+1,R=t[x*_+T],H=t[x*_+T+1],ee=t[(x+1)*_+T],O=t[(x+1)*_+T+1];let I=je(s,i,a,o,n,r,p,R,y,p,ee,y+1,p+1,H,y);I>0&&I<l&&(l=I,c=y,f=p),I=je(s,i,a,o,n,r,p+1,H,y,p,ee,y+1,p+1,O,y+1),I>0&&I<l&&(l=I,c=y,f=p)}else{const x=g+1,T=y*2,R=p*2;d[h++]=x,d[h++]=T,d[h++]=R,d[h++]=x,d[h++]=T,d[h++]=R+1,d[h++]=x,d[h++]=T+1,d[h++]=R,d[h++]=x,d[h++]=T+1,d[h++]=R+1}}return l===1/0?null:{t:l,patchRow:c,patchCol:f}}const Dt=150,Ot=8,Xt=new OffscreenCanvas(514,514),Je=Xt.getContext("2d",{willReadFrequently:!0});function Yt(u){Je.drawImage(u,0,0);const{data:e}=Je.getImageData(0,0,514,514),t=new Float32Array(514*514);let s=1/0,i=-1/0;for(let a=0;a<514*514;a++){const o=a*4,n=-1e4+(e[o]*65536+e[o+1]*256+e[o+2])*.1;t[a]=n,n<s&&(s=n),n>i&&(i=n)}return{elevations:t,minElevation:s,maxElevation:i}}class Wt{constructor(e,{tileUrl:t}={}){this.device=e,this.tileUrl=t||((s,i,a)=>`tiles/${s}/${i}/${a}.webp`),this.cache=new Map,this.pending=new Map,this.failed=new Set,this.activeRequests=0,this.requestQueue=[],this.bindGroupLayout=null,this.onTileResolved=null,this.wantedKeys=new Set,this.bounds=null,this.aabbCache=new Map}getElevationBounds(e,t,s){return this.aabbCache.get(this._key(e,t,s))||null}setBounds(e){this.bounds=e}setBindGroupLayout(e){this.bindGroupLayout=e,this._flatTileTexture=null,this._flatTileBindGroup=null,this._flatTileElevations=null}_ensureFlatTile(){if(this._flatTileTexture)return;this._flatTileElevations=new Float32Array(514*514),this._flatTileTexture=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});const e=2304;this.device.queue.writeTexture({texture:this._flatTileTexture},new Uint8Array(e*514),{bytesPerRow:e},[514,514]),this._flatTileBindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:this._flatTileTexture.createView()}]})}_cacheFlatTile(e){this._ensureFlatTile(),this.aabbCache.set(e,{minElevation:0,maxElevation:0}),this.cache.set(e,{texture:this._flatTileTexture,bindGroup:this._flatTileBindGroup,elevations:this._flatTileElevations,quadtree:null,minElevation:0,maxElevation:0,lastUsed:performance.now(),isFlat:!0})}_key(e,t,s){return`${e}/${t}/${s}`}hasTile(e,t,s){const i=this._key(e,t,s);this.wantedKeys.add(i);const a=this.cache.get(i);return a?(a.lastUsed=performance.now(),!0):!1}isResolved(e,t,s){const i=this._key(e,t,s);return this.wantedKeys.add(i),this.cache.has(i)||this.failed.has(i)}getTile(e,t,s){const i=this._key(e,t,s),a=this.cache.get(i);return a?(a.lastUsed=performance.now(),a):null}requestTile(e,t,s){const i=this._key(e,t,s);if(this.wantedKeys.add(i),!(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))){if(this.bounds&&this._isOutOfBounds(e,t,s)){this.failed.add(i);return}this.requestQueue.push({z:e,x:t,y:s,key:i}),this._processQueue()}}_isOutOfBounds(e,t,s){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),o=t*a,n=(t+1)*a,r=s*a,l=(s+1)*a;return n<i.minX||o>i.maxX||l<i.minY||r>i.maxY}_processQueue(){for(;this.activeRequests<Ot&&this.requestQueue.length>0;){const{z:e,x:t,y:s,key:i}=this.requestQueue.shift();if(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))continue;this.activeRequests++;const a=new AbortController;this.pending.set(i,a),this._loadTile(e,t,s,i,a.signal).finally(()=>{this.pending.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,s,i,a){try{const o=this.tileUrl(e,t,s),n=await fetch(o,{signal:a});if(!n.ok){this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,s);return}const r=await n.blob(),l=await createImageBitmap(r,{colorSpaceConversion:"none"}),{elevations:c,minElevation:f,maxElevation:d}=Yt(l);if(l.close(),this.aabbCache.set(i,{minElevation:f,maxElevation:d}),a.aborted)return;const h=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),_=2304,p=new Uint8Array(_*514),y=new Uint8Array(c.buffer);for(let C=0;C<514;C++)p.set(y.subarray(C*514*4,(C+1)*514*4),C*_);this.device.queue.writeTexture({texture:h},p,{bytesPerRow:_},[514,514]);const g=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:h.createView()}]});this.cache.set(i,{texture:h,bindGroup:g,elevations:c,quadtree:null,minElevation:f,maxElevation:d,lastUsed:performance.now()}),this.onTileResolved&&this.onTileResolved(e,t,s)}catch(o){if(o.name==="AbortError")return;this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,s)}}ensureQuadtree(e,t,s){const i=this.cache.get(this._key(e,t,s));return i?(i.quadtree||(i.quadtree=It(i.elevations)),i):null}stripQuadtrees(){for(const[e,t]of this.cache)!this.wantedKeys.has(e)&&t.quadtree&&(t.quadtree=null)}cancelStale(){for(const[e,t]of this.pending)this.wantedKeys.has(e)||t.abort()}evict(){for(;this.cache.size>Dt;){let e=null,t=1/0;for(const[i,a]of this.cache)this.wantedKeys.has(i)||a.lastUsed<t&&(t=a.lastUsed,e=i);if(!e)break;const s=this.cache.get(e);s.isFlat||s.texture.destroy(),this.cache.delete(e)}}beginFrame(){this.requestQueue=[],this.wantedKeys=new Set}}const qt=8;class Nt{constructor({tileUrl:e}={}){this.tileUrl=e||((t,s,i)=>`sentinel_tiles/${t}/${s}/${i}.webp`),this.fetched=new Map,this.pending=new Map,this.abortControllers=new Map,this.failed=new Set,this.consumers=new Map,this.terrainToSat=new Map,this.activeRequests=0,this.requestQueue=[],this.onTileLoaded=null,this.bounds=null}setBounds(e){this.bounds=e}_key(e,t,s){return`${e}/${t}/${s}`}getBitmap(e,t,s){return this.fetched.get(this._key(e,t,s))||null}isFailed(e,t,s){return this.failed.has(this._key(e,t,s))}requestTile(e,t,s,i){const a=this._key(e,t,s);let o=this.consumers.get(a);o||(o=new Set,this.consumers.set(a,o)),o.add(i);let n=this.terrainToSat.get(i);if(n||(n=new Set,this.terrainToSat.set(i,n)),n.add(a),!(this.fetched.has(a)||this.failed.has(a)||this.pending.has(a))){if(this.bounds&&this._isOutOfBounds(e,t,s)){this.failed.add(a);return}this.requestQueue.push({z:e,x:t,y:s,key:a}),this._processQueue()}}_isOutOfBounds(e,t,s){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),o=t*a,n=(t+1)*a,r=s*a,l=(s+1)*a;return n<i.minX||o>i.maxX||l<i.minY||r>i.maxY}getConsumers(e,t,s){return this.consumers.get(this._key(e,t,s))||null}removeConsumer(e){const t=this.terrainToSat.get(e);if(t){for(const s of t){const i=this.consumers.get(s);if(i&&(i.delete(e),i.size===0)){this.consumers.delete(s);const a=this.abortControllers.get(s);a&&(a.abort(),this.abortControllers.delete(s));const o=this.fetched.get(s);o&&(o.close(),this.fetched.delete(s))}}this.terrainToSat.delete(e)}}beginFrame(){this.requestQueue=[]}_processQueue(){for(;this.activeRequests<qt&&this.requestQueue.length>0;){const{z:e,x:t,y:s,key:i}=this.requestQueue.shift();if(this.fetched.has(i)||this.pending.has(i)||this.failed.has(i))continue;const a=this.consumers.get(i);if(!a||a.size===0)continue;this.activeRequests++;const o=new AbortController;this.abortControllers.set(i,o);const n=this._loadTile(e,t,s,i,o.signal);this.pending.set(i,n),n.finally(()=>{this.pending.delete(i),this.abortControllers.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,s,i,a){try{const o=this.tileUrl(e,t,s),n=await fetch(o,{signal:a});if(!n.ok){this.failed.add(i);return}const r=await n.blob(),l=await createImageBitmap(r);this.fetched.set(i,l),this.onTileLoaded&&this.onTileLoaded(e,t,s)}catch(o){if(o.name==="AbortError")return;this.failed.add(i)}}}const ae=512,Ht=4;class Vt{constructor(e,t,s,i){this.device=e,this.layers=t,this.bindGroupLayout=s,this.sampler=i,this.entries=new Map,this.onUpdate=null;for(const a of t)a.imageryManager.onTileLoaded=(o,n,r)=>this._onSatelliteTileLoaded(a,o,n,r)}_terrainKey(e,t,s){return`${e}/${t}/${s}`}ensureImagery(e,t,s,i){const a=this._terrainKey(e,t,s),o=this.entries.get(a);if(o){o.lastUsed=performance.now();return}const n=new OffscreenCanvas(ae,ae),r=n.getContext("2d"),l=this.device.createTexture({size:[ae,ae],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),c=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:l.createView()},{binding:1,resource:this.sampler}]}),f=this.layers.map(h=>{const _=Math.min(i,h.maxzoom);return{satTiles:vt(e,t,s,_),imageryManager:h.imageryManager}}),d={canvas:n,ctx:r,texture:l,bindGroup:c,layerData:f,tz:e,tx:t,ty:s,needsUpload:!1,hasContent:!1,lastUsed:performance.now()};this.entries.set(a,d);for(const h of f)for(const _ of h.satTiles)h.imageryManager.requestTile(_.z,_.x,_.y,a);this._recomposite(d),d.needsUpload&&this._upload(d)}getBindGroup(e,t,s){const i=this.entries.get(this._terrainKey(e,t,s));return i?i.bindGroup:null}hasImagery(e,t,s){const i=this.entries.get(this._terrainKey(e,t,s));return i?i.hasContent:!1}gc(e){for(const[t,s]of this.entries)if(!(e&&e.has(t))){s.texture.destroy();for(const i of s.layerData)i.imageryManager.removeConsumer(t);this.entries.delete(t)}}release(e,t,s){const i=this._terrainKey(e,t,s),a=this.entries.get(i);if(a){a.texture.destroy();for(const o of a.layerData)o.imageryManager.removeConsumer(i);this.entries.delete(i)}}_onSatelliteTileLoaded(e,t,s,i){const a=e.imageryManager.getConsumers(t,s,i);if(a){for(const o of a){const n=this.entries.get(o);n&&(this._recomposite(n),this._upload(n))}this.onUpdate&&this.onUpdate()}}_recomposite(e){const{ctx:t}=e;t.clearRect(0,0,ae,ae),this._fillFromAncestor(e);let s=e.hasContent;for(let i=0;i<this.layers.length;i++){const a=this.layers[i],o=e.layerData[i];t.globalCompositeOperation=a.blend||"source-over",t.globalAlpha=a.opacity!=null?a.opacity:1;for(const n of o.satTiles){const r=o.imageryManager.getBitmap(n.z,n.x,n.y);if(!r)continue;s=!0;const l=He(e.tz,e.tx,e.ty,n.z,n.x,n.y);t.drawImage(r,l.offsetU*ae,l.offsetV*ae,l.scaleU*ae,l.scaleV*ae)}}t.globalCompositeOperation="source-over",t.globalAlpha=1,s&&(e.needsUpload=!0,e.hasContent=!0)}_fillFromAncestor(e){const{tz:t,tx:s,ty:i,ctx:a}=e;for(let o=1;o<=t-Ht;o++){const n=t-o,r=s>>o,l=i>>o,c=this.entries.get(this._terrainKey(n,r,l));if(c&&c.hasContent){const f=He(t,s,i,n,r,l);a.drawImage(c.canvas,f.offsetU*ae,f.offsetV*ae,f.scaleU*ae,f.scaleV*ae),e.needsUpload=!0,e.hasContent=!0;return}}}_upload(e){this.device.queue.copyExternalImageToTexture({source:e.canvas},{texture:e.texture},[ae,ae]),e.needsUpload=!1}}class et{constructor(){this.features=[],this.lineFeatures=[]}async load(e,t={}){let s;typeof e=="string"?s=await(await fetch(e)).json():s=e;const i=t.simplify,a=t.simplifyFn;this.features=[],this.lineFeatures=[];for(const o of s.features)if(o.geometry){if(o.geometry.type==="Point"){const[n,r]=o.geometry.coordinates;this.features.push({mercatorX:ze(n),mercatorY:Le(r),lon:n,lat:r,properties:o.properties||{}})}else if(o.geometry.type==="LineString"){let n=o.geometry.coordinates;if(i!=null&&a){const l=n.map(([f,d,h])=>({x:f,y:d,elev:h||0}));n=a(l,i,!0).map(f=>[f.x,f.y,f.elev])}const r=n.map(([l,c,f])=>({mercatorX:ze(l),mercatorY:Le(c),elevation:f||0,lon:l,lat:c}));this.lineFeatures.push({coordinates:r,properties:o.properties||{}})}}return this}}const Zt=`
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
`,$t=`
struct CircleUniforms {
  projection_view: mat4x4<f32>,
  viewport_size: vec2<f32>,
  pixel_ratio: f32,
  exaggeration: f32,
  atmosphere_opacity: f32,
};

`+Pe+`

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
`,Ge=1e4,Xe=14,De=Xe*4;function tt(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}class Qt{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._radius=i["circle-radius"]||4,this._fillColor=tt(i["circle-color"]||"#ff3333"),this._strokeColor=tt(i["circle-stroke-color"]||"#ffffff"),this._strokeWidth=i["circle-stroke-width"]||0,this._opacity=i["circle-opacity"]!=null?i["circle-opacity"]:1,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._pipelineDepthTest=null,this._pipelineNoDepthTest=null,this._instanceBuffer=null,this._instanceData=null,this._uniformBuffer=null,this._uniformBindGroup=null,this._visibleCount=0,this._visibleFeatures=null}init(e,t,s){this._device=e;const i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._instanceData=new Float32Array(Ge*Xe),this._instanceBuffer=e.createBuffer({size:Ge*De,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});const a=e.createShaderModule({code:Zt}),o=e.createShaderModule({code:$t}),n=e.createPipelineLayout({bindGroupLayouts:[t,i]}),r={module:a,entryPoint:"vs_circle",buffers:[{arrayStride:De,stepMode:"instance",attributes:[{format:"float32x3",offset:0,shaderLocation:0},{format:"float32",offset:12,shaderLocation:1},{format:"float32x4",offset:16,shaderLocation:2},{format:"float32x4",offset:32,shaderLocation:3},{format:"float32",offset:48,shaderLocation:4},{format:"float32",offset:52,shaderLocation:5}]}]},l={module:o,entryPoint:"fs_circle",targets:[{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]};this._pipelineDepthTest=e.createRenderPipeline({layout:n,vertex:r,fragment:l,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"}}),this._pipelineNoDepthTest=e.createRenderPipeline({layout:n,vertex:r,fragment:l,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}})}prepare(e,t,s,i,a,o){const n=this._source.features,r=this._instanceData;let l=0;for(let f=0;f<n.length&&l<Ge;f++){const d=n[f],h=this._queryElevation(d.mercatorX,d.mercatorY);if(h==null||h<=0||this._visibleFeatures&&!this._visibleFeatures.has(f))continue;const _=d.mercatorX,p=h*o*a,y=d.mercatorY,g=e[0]*_+e[4]*p+e[8]*y+e[12],C=e[1]*_+e[5]*p+e[9]*y+e[13],w=e[3]*_+e[7]*p+e[11]*y+e[15];if(w<=0)continue;const m=g/w,S=C/w,E=.2;if(m<-1-E||m>1+E||S<-1-E||S>1+E)continue;const v=l*Xe;r[v]=_,r[v+1]=p,r[v+2]=y,r[v+3]=this._radius,r[v+4]=this._fillColor[0],r[v+5]=this._fillColor[1],r[v+6]=this._fillColor[2],r[v+7]=this._fillColor[3],r[v+8]=this._strokeColor[0],r[v+9]=this._strokeColor[1],r[v+10]=this._strokeColor[2],r[v+11]=this._strokeColor[3],r[v+12]=this._strokeWidth,r[v+13]=this._opacity,l++}this._visibleCount=l,l>0&&this._device.queue.writeBuffer(this._instanceBuffer,0,r.buffer,0,l*De);const c=new Float32Array(24);c.set(e,0),c[16]=t,c[17]=s,c[18]=i,c[19]=a,c[20]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._uniformBuffer,0,c)}draw(e,t,s=!0){this._visibleCount!==0&&(e.setPipeline(s?this._pipelineDepthTest:this._pipelineNoDepthTest),e.setBindGroup(0,t),e.setBindGroup(1,this._uniformBindGroup),e.setVertexBuffer(0,this._instanceBuffer),e.draw(6,this._visibleCount))}getCollisionItems(e,t,s,i,a,o){const n=this._source.features,r=t/i,l=s/i,c=this._radius+this._strokeWidth,f=[];for(let d=0;d<n.length;d++){const h=n[d],_=this._queryElevation(h.mercatorX,h.mercatorY);if(_==null||_<=0)continue;const p=h.mercatorX,y=_*o*a,g=h.mercatorY,C=e[0]*p+e[4]*y+e[8]*g+e[12],w=e[1]*p+e[5]*y+e[9]*g+e[13],m=e[2]*p+e[6]*y+e[10]*g+e[14],S=e[3]*p+e[7]*y+e[11]*g+e[15];if(S<=0)continue;const E=C/S,v=w/S;E<-1.2||E>1.2||v<-1.2||v>1.2||f.push({layerIndex:-1,featureIndex:d,sourceFeatureIndex:d,screenX:(E*.5+.5)*r,screenY:(.5-v*.5)*l,halfW:c,halfH:c,depth:m/S,clipW:S})}return f}setVisibleFeatures(e){this._visibleFeatures=e}}const ke=96,Se=ke/4;function Kt(u,e){const{fontAtlas:t,vertexTransform:s=jt,vertexProjection:i=Jt,fragmentShaderBody:a=ei,colorTargets:o,depthStencil:n,multisample:r,initialCapacity:l=1024}=e,c=Array.isArray(o)?o:[o];let f=[],d=0,h=!1,_=0,p=l,y=u.createBuffer({label:"gpu-text-characters",size:p*ke,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),g=new Float32Array(p*Se);const C=u.createBuffer({label:"gpu-text-uniforms",size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),w=u.createSampler({label:"gpu-text-sampler",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),m=ti(s,i),S=ii(a),E=u.createShaderModule({label:"gpu-text-vertex",code:m}),v=u.createShaderModule({label:"gpu-text-fragment",code:S}),G=u.createRenderPipeline({label:"gpu-text",layout:"auto",vertex:{module:E,entryPoint:"vertexMain"},fragment:{module:v,entryPoint:"fragmentMain",targets:c},primitive:{topology:"triangle-strip",stripIndexFormat:void 0,cullMode:"none"},depthStencil:n,multisample:r}),Y=u.createBindGroup({layout:G.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:C}}]});let U=Q();function Q(){return u.createBindGroup({layout:G.getBindGroupLayout(1),entries:[{binding:0,resource:w},{binding:1,resource:t.textureView},{binding:2,resource:{buffer:y}}]})}let q=-1,x=-1,T=!1;function R(k){let X=0;for(const M of k)t.glyphs.has(M)&&M!==" "&&M!=="	"&&M!==`
`&&X++;return X}function H(k){if(k<=p)return;let X=p;for(;X<k;)X*=2;const M=u.createBuffer({label:"gpu-text-characters",size:X*ke,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),A=new Float32Array(X*Se);A.set(g),_>0&&u.queue.writeBuffer(M,0,A,0,_*Se),y.destroy(),y=M,g=A,p=X,U=Q()}function ee(k,X){let M=0,A=0,j=0;for(const D of k){if(D===" "){const ne=t.glyphs.get(" ");M+=ne?ne.xAdvance*X:t.fontSize*.3*X;continue}if(D==="	"){const ne=t.glyphs.get(" "),ye=ne?ne.xAdvance:t.fontSize*.3;M+=ye*4*X;continue}if(D===`
`)continue;const se=t.glyphs.get(D);if(!se)continue;M+=se.xAdvance*X;const oe=-se.yOffset*X,ie=se.height*X-oe;A=Math.max(A,oe),j=Math.max(j,ie)}return{width:M,ascent:A,descent:j}}function O(k){const{text:X,anchor:M,offset:A,fontSize:j,color:D,strokeColor:se,strokeWidth:oe,bufferOffset:ie,align:ne,baseline:ye}=k,Fe=j/t.fontSize,b=t.width,L=t.height,B=ee(X,1);let F=0;ne==="center"?F=-B.width/2:ne==="right"&&(F=-B.width);let z=0;ye==="top"?z=B.ascent:ye==="middle"?z=(B.ascent-B.descent)/2:ye==="bottom"&&(z=-B.descent);let P=F,Z=z,K=0;for(const $ of X){if($===" "){const te=t.glyphs.get(" ");te?P+=te.xAdvance:P+=t.fontSize*.3;continue}if($==="	"){const te=t.glyphs.get(" "),ce=te?te.xAdvance:t.fontSize*.3;P+=ce*4;continue}if($===`
`)continue;const N=t.glyphs.get($);if(!N)continue;const W=(ie+K)*Se;g[W+0]=N.x/b,g[W+1]=N.y/L,g[W+2]=(N.x+N.width)/b,g[W+3]=(N.y+N.height)/L,g[W+4]=D[0],g[W+5]=D[1],g[W+6]=D[2],g[W+7]=D[3],g[W+8]=M[0],g[W+9]=M[1],g[W+10]=M[2],g[W+11]=M[3],g[W+12]=se[0],g[W+13]=se[1],g[W+14]=se[2],g[W+15]=se[3],g[W+16]=P+N.xOffset,g[W+17]=Z+N.yOffset,g[W+18]=A[0],g[W+19]=A[1],g[W+20]=N.width,g[W+21]=N.height,g[W+22]=Fe,g[W+23]=oe,P+=N.xAdvance,K++}const V=ie*ke,J=ie*Se;u.queue.writeBuffer(y,V,g,J,k.characterCount*Se),k.dirty=!1}function I(){if(!h)return;const k=f.filter(M=>!M.destroyed);let X=0;for(const M of k)M.bufferOffset!==X&&(M.bufferOffset=X,M.dirty=!0),X+=M.characterCount;_=X,f=k;for(const M of f)M.dirty&&O(M);h=!1}function ue(k){return k.length===2?[k[0],k[1],0,1]:k.length===3?[k[0],k[1],k[2],1]:[k[0],k[1],k[2],k[3]]}return{createSpan(k){const X=R(k.text);H(_+X);const M={id:d++,text:k.text,anchor:ue(k.position),offset:k.offset??[0,0],fontSize:k.fontSize??t.fontSize,color:k.color?[...k.color]:[1,1,1,1],strokeColor:k.strokeColor?[...k.strokeColor]:[0,0,0,0],strokeWidth:k.strokeWidth??0,align:k.align??"left",baseline:k.baseline??"baseline",bufferOffset:_,characterCount:X,destroyed:!1,dirty:!0};return f.push(M),_+=X,O(M),{setText(A){if(M.destroyed)return;const j=R(A);j!==M.characterCount?(M.destroyed=!0,h=!0,I(),H(_+j),M.destroyed=!1,M.text=A,M.characterCount=j,M.bufferOffset=_,M.dirty=!0,f.push(M),_+=j):(M.text=A,M.dirty=!0),O(M)},setPosition(A){M.destroyed||(M.anchor=ue(A),M.dirty=!0,O(M))},setOffset(A){M.destroyed||(M.offset=[...A],M.dirty=!0,O(M))},setFontSize(A){M.destroyed||(M.fontSize=A,M.dirty=!0,O(M))},setColor(A){M.destroyed||(M.color=[...A],M.dirty=!0,O(M))},setStrokeColor(A){M.destroyed||(M.strokeColor=[...A],M.dirty=!0,O(M))},setStrokeWidth(A){M.destroyed||(M.strokeWidth=A,M.dirty=!0,O(M))},setAlign(A){M.destroyed||(M.align=A,M.dirty=!0,O(M))},setBaseline(A){M.destroyed||(M.baseline=A,M.dirty=!0,O(M))},getText(){return M.text},getCharacterCount(){return M.characterCount},destroy(){M.destroyed||(M.destroyed=!0,h=!0)},isDestroyed(){return M.destroyed}}},getBindGroupLayout(k){return G.getBindGroupLayout(k)},updateUniforms(k){const{resolution:X,viewMatrix:M}=k;if(!T||X[0]!==q||X[1]!==x||M!==void 0){const j=new ArrayBuffer(96),D=new Float32Array(j);D[0]=X[0],D[1]=X[1],D[2]=1,D[3]=t.fieldRange??4,D[4]=t.width,D[5]=t.height,D[6]=0,D[7]=0,M?D.set(M,8):(D[8]=1,D[9]=0,D[10]=0,D[11]=0,D[12]=0,D[13]=1,D[14]=0,D[15]=0,D[16]=0,D[17]=0,D[18]=1,D[19]=0,D[20]=0,D[21]=0,D[22]=0,D[23]=1),u.queue.writeBuffer(C,0,j),q=X[0],x=X[1],T=!0}},compact:I,draw(k,X,M=[]){if(h&&I(),X.skipUniformUpdate||this.updateUniforms(X),_!==0){k.setPipeline(G),k.setBindGroup(0,Y),k.setBindGroup(1,U);for(let A=0;A<M.length;A++)k.setBindGroup(A+2,M[A]);k.draw(4,_)}},getTotalCharacterCount(){return _},destroy(){y.destroy(),C.destroy()}}}const jt=`
fn getVertex(position: vec4f) -> vec4f {
  return uniforms.viewMatrix * position;
}
`,Jt=`
fn projectVertex(position: vec3f, uv: vec2f, color: vec4f) -> vec4f {
  // Convert screen pixels to clip space (NDC with Y flipped)
  let x = position.x / uniforms.resolution.x * 2.0 - 1.0;
  let y = 1.0 - position.y / uniforms.resolution.y * 2.0;
  return vec4f(x, y, position.z, 1.0);
}
`,ei=`
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
`;function ti(u,e){return`
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
`}function ii(u){return`
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
`}async function si(u,e){const{atlasUrl:t,metadataUrl:s}=e,[i,a]=await Promise.all([fetch(s),fetch(t)]);if(!i.ok)throw new Error(`Failed to load atlas metadata: ${i.statusText}`);if(!a.ok)throw new Error(`Failed to load atlas image: ${a.statusText}`);const o=await i.json(),n=await a.blob(),r=await createImageBitmap(n),l=u.createTexture({label:"font-atlas-msdf",size:[o.width,o.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});u.queue.copyExternalImageToTexture({source:r},{texture:l},[o.width,o.height]);const c=document.createElement("canvas");c.width=o.width,c.height=o.height,c.getContext("2d").drawImage(r,0,0);const d=new Map;for(const h of o.glyphs)d.set(h.char,{char:h.char,x:h.x,y:h.y,width:h.width,height:h.height,xOffset:h.xOffset,yOffset:h.yOffset,xAdvance:h.xAdvance});return{texture:l,textureView:l.createView(),width:o.width,height:o.height,lineHeight:o.lineHeight,fontSize:o.fontSize,fieldRange:o.fieldRange??4,glyphs:d,debugCanvas:c}}function it(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const ri=`
${Pe}

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
`;class oi{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._textField=i["text-field"]||"name",this._fontSize=i["text-size"]||12,this._color=it(i["text-color"]||"#ffffff"),this._strokeColor=it(i["text-halo-color"]||"#000000"),this._strokeWidth=i["text-halo-width"]!=null?i["text-halo-width"]:1.5,this._offset=i["text-offset"]||[0,-10],this._align=i["text-align"]||"center",this._baseline=i["text-baseline"]||"bottom",this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._textContext=null,this._spans=[],this._ready=!1,this._visibleFeatures=null,this._fontAtlas=null,this._atmosphereBindGroup=null,this._textAtmosBuffer=null,this._textAtmosData=new Float32Array(4),this._lastScaledStrokeWidth=null}init(e,t,s,i,a){this._device=e,this._fontAtlas=t,this._textContext=Kt(e,{fontAtlas:t,fragmentShaderBody:ri,colorTargets:{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},depthStencil:{format:i,depthWriteEnabled:!1,depthCompare:"always"}}),this._textAtmosBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const o=this._textContext.getBindGroupLayout(2);this._atmosphereBindGroup=e.createBindGroup({layout:o,entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:this._textAtmosBuffer}}]});const n=this._fontSize/t.fontSize;for(let r=0;r<this._source.features.length;r++){const l=this._source.features[r],c=l.properties[this._textField];if(!c)continue;const f=this._textContext.createSpan({text:String(c),position:[0,0,0],fontSize:this._fontSize,color:this._color,strokeColor:this._strokeColor,strokeWidth:this._strokeWidth,offset:this._offset,align:this._align,baseline:this._baseline}),d=String(c);let h=0,_=0,p=0;for(const y of d){const g=t.glyphs.get(y);if(!g)continue;h+=g.xAdvance*n;const C=-g.yOffset*n,w=g.height*n-C;C>_&&(_=C),w>p&&(p=w)}this._spans.push({span:f,feature:l,sourceIndex:r,textWidth:h,ascent:_,descent:p})}this._ready=!0}prepare(e,t,s,i,a,o){if(!this._ready)return;const n=this._strokeWidth*i;if(n!==this._lastScaledStrokeWidth){this._lastScaledStrokeWidth=n;for(const{span:f}of this._spans)f.setStrokeWidth(n)}for(let f=0;f<this._spans.length;f++){const{span:d,feature:h}=this._spans[f];if(this._visibleFeatures&&!this._visibleFeatures.has(f)){d.setPosition([0,0,0,0]);continue}const _=h,p=this._queryElevation(_.mercatorX,_.mercatorY);if(p==null||p<=0){d.setPosition([0,0,0,0]);continue}const y=_.mercatorX,g=p*o*a,C=_.mercatorY;if(e[3]*y+e[7]*g+e[11]*C+e[15]<=0){d.setPosition([0,0,0,0]);continue}d.setPosition([y,g,C,1])}const r=t/i,l=s/i;this._textContext.updateUniforms({resolution:[r,l],viewMatrix:e});const c=this._textAtmosData;c[0]=a,c[1]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._textAtmosBuffer,0,c)}draw(e){this._ready&&this._textContext.getTotalCharacterCount()!==0&&this._textContext.draw(e,{resolution:[1,1],skipUniformUpdate:!0},[this._atmosphereBindGroup])}getCollisionItems(e,t,s,i,a,o){if(!this._ready)return[];const n=t/i,r=s/i,l=[];for(let c=0;c<this._spans.length;c++){const{feature:f,sourceIndex:d,textWidth:h,ascent:_,descent:p}=this._spans[c],y=f,g=this._queryElevation(y.mercatorX,y.mercatorY);if(g==null||g<=0)continue;const C=y.mercatorX,w=g*o*a,m=y.mercatorY,S=e[0]*C+e[4]*w+e[8]*m+e[12],E=e[1]*C+e[5]*w+e[9]*m+e[13],v=e[2]*C+e[6]*w+e[10]*m+e[14],G=e[3]*C+e[7]*w+e[11]*m+e[15];if(G<=0)continue;const Y=S/G,U=E/G;if(Y<-1.2||Y>1.2||U<-1.2||U>1.2)continue;let Q=(Y*.5+.5)*n+this._offset[0],q=(.5-U*.5)*r+this._offset[1];const x=h/2,T=(_+p)/2;this._align==="left"?Q+=x:this._align==="right"&&(Q-=x),this._baseline==="top"?q+=T:this._baseline==="bottom"&&(q-=T),l.push({layerIndex:-1,featureIndex:c,sourceFeatureIndex:d,screenX:Q,screenY:q,halfW:x,halfH:T,depth:v/G,clipW:G})}return l}setVisibleFeatures(e){this._visibleFeatures=e}destroy(){this._textContext&&this._textContext.destroy(),this._textAtmosBuffer&&this._textAtmosBuffer.destroy()}}function Ie(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const ni=`
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
`,ai=`
${Pe}

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
`,st=128;class rt{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._lineColor=Ie(i["line-color"]||"#ff8800"),this._borderColor=Ie(i["line-border-color"]||"#331100"),this._lineWidth=i["line-width"]||3,this._borderWidth=i["line-border-width"]||0,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._gpuLines=null,this._positionBuffer=null,this._uniformBuffer=null,this._sharedBindGroup=null,this._polylines=[],this._positionData=null,this._cachedElevations=null,this._elevationsDirty=!0,this._lastExaggeration=-1,this._positionsDirty=!0,this._device=null}init(e,t,s,i){this._device=e,this._globalUniformBuffer=s,this._depthOffset=2e-7,this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"square",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:ni,fragmentShaderBody:ai})}_ensureBuffers(){if(this._positionBuffer)return;const e=this._source.lineFeatures;if(e.length===0)return;const t=this._device,s=16;let i=0;for(const o of e)i=Math.ceil(i/s)*s,i+=o.coordinates.length;if(i===0)return;this._positionBuffer=t.createBuffer({size:i*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._positionData=new Float32Array(i*4),this._cachedElevations=new Float32Array(i);let a=0;for(const o of e){a=Math.ceil(a/s)*s;const n=o.coordinates.length,r=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer,offset:a*16,size:n*16}}]});this._polylines.push({offset:a,count:n,feature:o,dataBindGroup:r}),a+=n}this._uniformBuffer=t.createBuffer({size:st,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}},{binding:1,resource:{buffer:this._globalUniformBuffer}}]})}invalidateElevations(){this._elevationsDirty=!0}prepare(e,t,s,i,a,o){if(!this._gpuLines||(this._ensureBuffers(),this._polylines.length===0))return;if(this._elevationCarryover){for(const r of this._polylines)for(let l=0;l<r.count;l++){const c=r.feature.coordinates[l],f=this._elevationCarryover.get(c.mercatorX+","+c.mercatorY);f>0&&(this._cachedElevations[r.offset+l]=f)}this._elevationCarryover=null,this._positionsDirty=!0}if(this._elevationsDirty){const r=this._cachedElevations;for(const l of this._polylines)for(let c=0;c<l.count;c++){const f=l.feature.coordinates[c],d=this._queryElevation(f.mercatorX,f.mercatorY);d!=null&&d>0&&r[l.offset+c]!==d&&(r[l.offset+c]=d,this._positionsDirty=!0)}this._elevationsDirty=!1}if(this._positionsDirty||a!==this._lastExaggeration||o!==this._lastGlobalElevScale){const r=this._positionData,l=this._cachedElevations;for(const c of this._polylines)for(let f=0;f<c.count;f++){const d=c.feature.coordinates[f],h=l[c.offset+f],_=(c.offset+f)*4;h==null||h<=0?(r[_]=d.mercatorX,r[_+1]=0,r[_+2]=d.mercatorY,r[_+3]=1):(r[_]=d.mercatorX,r[_+1]=(h+3)*o*a,r[_+2]=d.mercatorY,r[_+3]=1)}this._device.queue.writeBuffer(this._positionBuffer,0,r),this._lastExaggeration=a,this._lastGlobalElevScale=o,this._positionsDirty=!1}const n=new Float32Array(st/4);n.set(e,0),n[16]=this._lineColor[0],n[17]=this._lineColor[1],n[18]=this._lineColor[2],n[19]=this._lineColor[3],n[20]=this._borderColor[0],n[21]=this._borderColor[1],n[22]=this._borderColor[2],n[23]=this._borderColor[3],n[24]=this._lineWidth,n[25]=this._borderWidth,n[26]=i,n[27]=a,n[28]=this._atmosphereOpacity,n[29]=this._depthOffset,this._device.queue.writeBuffer(this._uniformBuffer,0,n),this._canvasW=t,this._canvasH=s}draw(e){if(!(!this._gpuLines||this._polylines.length===0))for(const t of this._polylines)this._gpuLines.draw(e,{vertexCount:t.count,resolution:[this._canvasW,this._canvasH]},[t.dataBindGroup,this._sharedBindGroup])}replaceSource(e,t){this._positionBuffer&&this._positionBuffer.destroy(),this._uniformBuffer&&this._uniformBuffer.destroy(),this._source=e,this._positionBuffer=null,this._uniformBuffer=null,this._sharedBindGroup=null,this._polylines=[],this._positionData=null,this._cachedElevations=null,this._elevationCarryover=t||null,this._elevationsDirty=!0,this._positionsDirty=!0}destroy(){this._gpuLines&&this._gpuLines.destroy(),this._positionBuffer&&this._positionBuffer.destroy(),this._uniformBuffer&&this._uniformBuffer.destroy()}}function Oe(u,e,t){this.aabb=new t(6),this.startIndex=u,this.endIndex=e,this.node0=null,this.node1=null}const Ce=[],ge=[],xe=[],Be=[];function ot(u,e,t,s,i,a,o){let n,r;if(s!==0){let l=(o[0]-u)/s,c=(o[3]-u)/s;if(l>c){const f=l;l=c,c=f}n=l,r=c}else{if(u<o[0]||u>o[3])return null;n=-1/0,r=1/0}if(i!==0){let l=(o[1]-e)/i,c=(o[4]-e)/i;if(l>c){const f=l;l=c,c=f}l>n&&(n=l),c<r&&(r=c)}else if(e<o[1]||e>o[4])return null;if(n>r)return null;if(a!==0){let l=(o[2]-t)/a,c=(o[5]-t)/a;if(l>c){const f=l;l=c,c=f}l>n&&(n=l),c<r&&(r=c)}else if(t<o[2]||t>o[5])return null;return n>r||r<0?null:[n,r]}class li{constructor(e,{epsilon:t=1e-6,maxItemsPerNode:s=10}={}){this._aabbs=e;const i=this._aabbs.length/6;this._epsilon=t,this._maxItemsPerNode=s,this._aabbTypeCtor=Float64Array;const a=Uint32Array;this._idArray=new a(i);for(var o=0;o<i;o++)this._idArray[o]=o;this.root=new Oe(0,i,this._aabbTypeCtor),this.computeExtents(this.root),this._nodeSplitPtr=0,Ce.length=0,Ce[0]=this.root;let n=0;for(;this._nodeSplitPtr>=0&&n++<1e6;)this.splitNode(Ce[this._nodeSplitPtr--]);if(n>1e6)throw new Error("Uh-oh, it seems like BVH construction ran into an infinite loop.");Ce.length=0}computeExtents(e){const t=e.aabb;let s=1/0,i=1/0,a=1/0,o=-1/0,n=-1/0,r=-1/0;for(let p=e.startIndex*6,y=e.endIndex*6;p<y;p+=6)s=Math.min(this._aabbs[p],s),i=Math.min(this._aabbs[p+1],i),a=Math.min(this._aabbs[p+2],a),o=Math.max(this._aabbs[p+3],o),n=Math.max(this._aabbs[p+4],n),r=Math.max(this._aabbs[p+5],r);const l=(o+s)*.5,c=(n+i)*.5,f=(r+a)*.5,d=Math.max((o-s)*.5,this._epsilon)*(1+this._epsilon),h=Math.max((n-i)*.5,this._epsilon)*(1+this._epsilon),_=Math.max((r-a)*.5,this._epsilon)*(1+this._epsilon);t[0]=l-d,t[1]=c-h,t[2]=f-_,t[3]=l+d,t[4]=c+h,t[5]=f+_}splitNode(e){let t,s,i;const a=e.startIndex,o=e.endIndex,n=o-a;if(n<=this._maxItemsPerNode||n===0)return;const r=this._aabbs,l=this._idArray;xe[0]=e.aabb[0]+e.aabb[3],xe[1]=e.aabb[1]+e.aabb[4],xe[2]=e.aabb[2]+e.aabb[5];let c=0,f=0,d=0,h=0,_=0,p=0;for(t=a*6,s=o*6;t<s;t+=6)r[t]+r[t+3]<xe[0]?c++:h++,r[t+1]+r[t+4]<xe[1]?f++:_++,r[t+2]+r[t+5]<xe[2]?d++:p++;if(ge[0]=c===0||h===0,ge[1]=f===0||_===0,ge[2]=d===0||p===0,ge[0]&&ge[1]&&ge[2])return;const y=e.aabb[3]-e.aabb[0],g=e.aabb[4]-e.aabb[1],C=e.aabb[5]-e.aabb[2];let w;if(y>=g&&y>=C?w=0:g>=C?w=1:w=2,ge[w]&&(w===0?w=g>=C?1:2:w===1?w=y>=C?0:2:w=y>=g?0:1,ge[w])){w=3-w-(w===0||w===2?1:0);for(let ne=0;ne<3;ne++)if(!ge[ne]){w=ne;break}}let m,S,E,v,G=1/0,Y=1/0,U=1/0,Q=-1/0,q=-1/0,x=-1/0,T=1/0,R=1/0,H=1/0,ee=-1/0,O=-1/0,I=-1/0;const ue=xe[w];for(m=a*6,E=(o-1)*6,S=a,v=o-1;m<=E;m+=6,S++)r[m+w]+r[m+w+3]>=ue?(i=l[S],l[S]=l[v],l[v]=i,i=r[m],T=Math.min(T,i),r[m]=r[E],r[E]=i,i=r[m+1],R=Math.min(R,i),r[m+1]=r[E+1],r[E+1]=i,i=r[m+2],H=Math.min(H,i),r[m+2]=r[E+2],r[E+2]=i,i=r[m+3],ee=Math.max(ee,i),r[m+3]=r[E+3],r[E+3]=i,i=r[m+4],O=Math.max(O,i),r[m+4]=r[E+4],r[E+4]=i,i=r[m+5],I=Math.max(I,i),r[m+5]=r[E+5],r[E+5]=i,S--,v--,m-=6,E-=6):(G=Math.min(G,r[m]),Y=Math.min(Y,r[m+1]),U=Math.min(U,r[m+2]),Q=Math.max(Q,r[m+3]),q=Math.max(q,r[m+4]),x=Math.max(x,r[m+5]));e.startIndex=e.endIndex=-1;const k=e.node0=new Oe(a,S,this._aabbTypeCtor),X=e.node1=new Oe(S,o,this._aabbTypeCtor);let M,A,j,D,se,oe;const ie=this._epsilon;M=(Q+G)*.5,A=(q+Y)*.5,j=(x+U)*.5,D=Math.max((Q-G)*.5,ie)*(1+ie),se=Math.max((q-Y)*.5,ie)*(1+ie),oe=Math.max((x-U)*.5,ie)*(1+ie),k.aabb[0]=M-D,k.aabb[1]=A-se,k.aabb[2]=j-oe,k.aabb[3]=M+D,k.aabb[4]=A+se,k.aabb[5]=j+oe,M=(ee+T)*.5,A=(O+R)*.5,j=(I+H)*.5,D=Math.max((ee-T)*.5,ie)*(1+ie),se=Math.max((O-R)*.5,ie)*(1+ie),oe=Math.max((I-H)*.5,ie)*(1+ie),X.aabb[0]=M-D,X.aabb[1]=A-se,X.aabb[2]=j-oe,X.aabb[3]=M+D,X.aabb[4]=A+se,X.aabb[5]=j+oe,S-a>this._maxItemsPerNode&&(Ce[++this._nodeSplitPtr]=e.node0),o-S>this._maxItemsPerNode&&(Ce[++this._nodeSplitPtr]=e.node1)}test(e,t){Be.length=0;var s=0;for(Be[0]=this.root;s>=0;){var i=Be[s--];if(e(i.aabb)){i.node0&&(Be[++s]=i.node0),i.node1&&(Be[++s]=i.node1);for(var a=i.startIndex;a<i.endIndex;a++)t(this._idArray[a])}}Be.length=0}rayIntersect(e,t,s,i,a,o){const n=[],r=[];let l=0;for(r[l++]=this.root;l>0;){const c=r[--l];if(ot(e,t,s,i,a,o,c.aabb)){c.node0&&(r[l++]=c.node0),c.node1&&(r[l++]=c.node1);for(let d=c.startIndex;d<c.endIndex;d++){const h=this._idArray[d],_=d*6,p=[this._aabbs[_],this._aabbs[_+1],this._aabbs[_+2],this._aabbs[_+3],this._aabbs[_+4],this._aabbs[_+5]],y=ot(e,t,s,i,a,o,p);y&&n.push({index:h,tNear:Math.max(y[0],0)})}}}return n.sort((c,f)=>c.tNear-f.tNear),n}traversePreorder(e){const t=[];let s=this.root;for(;t.length||s;){for(;s;){const i=e(s)!==!1;i&&s.node1&&t.push(s.node1),s=i&&s.node0}t.length&&(s=t.pop())}}traverseInorder(e){const t=[];let s=this.root;for(;s||t.length;){for(;s;)t.push(s),s=s.node0;s=t[t.length-1],t.pop(),e(s),s=s.node1}}traversePostorder(e){const t=[this.root];let s=null;for(;t.length;){const i=t[t.length-1];!s||s.node0===i||s.node1===i?i.node0?t.push(i.node0):i.node1?t.push(i.node1):(t.pop(),e(i)):i.node0===s?i.node0?t.push(i.node1):(t.pop(),e(i)):i.node1===s&&(t.pop(),e(i)),s=i}}}function Ye(u,e,t){const s=t;function i(h,_,p){const y=s[0]*h+s[4]*_+s[8]*p+s[12],g=s[1]*h+s[5]*_+s[9]*p+s[13],C=s[2]*h+s[6]*_+s[10]*p+s[14],w=s[3]*h+s[7]*_+s[11]*p+s[15];return[y/w,g/w,C/w]}const a=i(u,e,0),o=i(u,e,1),n=new Float64Array(a),r=o[0]-a[0],l=o[1]-a[1],c=o[2]-a[2],f=Math.sqrt(r*r+l*l+c*c),d=new Float64Array([r/f,l/f,c/f]);return{origin:n,direction:d}}function ut({origin:u,direction:e,bvh:t,tileCache:s,tileList:i,verticalExaggeration:a}){const o=u[0],n=u[1],r=u[2],l=e[0],c=e[1],f=e[2],d=t.rayIntersect(o,n,r,l,c,f);if(d.length===0)return null;let h=1/0,_=null,p=null;for(let y=0;y<d.length;y++){const{index:g,tNear:C}=d[y];if(C>=h)break;const w=i[g];if(!w)continue;const m=s.ensureQuadtree(w.z,w.x,w.y);if(!m)continue;const{quadtree:S,elevations:E}=m,Y=qe(w.z,w.y)*a,U=512*(1<<w.z),Q=w.x/(1<<w.z),q=w.y/(1<<w.z),x=(o-Q)*U,T=n/Y,R=(r-q)*U,H=l*U,ee=c/Y,O=f*U,I=Gt(S.minElev,S.maxElev,E,x,T,R,H,ee,O);if(!I)continue;const ue=x+H*I.t,k=T+ee*I.t,X=R+O*I.t,M=ue/U+Q,A=k*Y,j=X/U+q;let D;const se=Math.abs(l),oe=Math.abs(c),ie=Math.abs(f);se>=oe&&se>=ie?D=(M-o)/l:oe>=ie?D=(A-n)/c:D=(j-r)/f,D>0&&D<h&&(h=D,_=[M,A,j],p=w)}return _?{worldPos:_,t:h,tile:p}:null}function ci(u){const e=[[-60,0],[-45,1500],[-30,2800],[-15,3800],[0,4e3],[15,4100],[30,4200],[40,3500],[50,2300],[60,1e3],[65,500],[70,0]];if(u<=e[0][0])return e[0][1];if(u>=e[e.length-1][0])return e[e.length-1][1];for(let t=1;t<e.length;t++)if(u<=e[t][0]){const s=(u-e[t-1][0])/(e[t][0]-e[t-1][0]);return e[t-1][1]+s*(e[t][1]-e[t-1][1])}return 0}function fi(u={}){return new Proxy({verticalExaggeration:1,densityThreshold:3,showTileBorders:!1,freezeCoverage:!1,enableCollision:!0,showCollisionBoxes:!1,showWireframe:!1,showImagery:!0,showFeatures:!0,showRoute:!0,slopeAngleOpacity:0,slopeAspectMaskAbove:0,slopeAspectMaskNear:0,slopeAspectMaskBelow:0,slopeAspectOpacity:.95,treelineLower:2e3,treelineUpper:2500,contourOpacity:1,collisionBuffer:4,occlusionBias:.03,atmosphereDensity:.35,hillshadeOpacity:.95,sunDirection:[.5,.7,.5],dirty:!0,...u},{set(e,t,s){return t!=="dirty"&&e[t]!==s&&(e.dirty=!0),e[t]=s,!0}})}function ui(u){const e=document.createElement("div");return e.className="terrain-attribution",e.innerHTML=u.filter(t=>t.attribution).map(t=>t.attribution).join(" | "),e}function hi(u){return u*360-180}function di(u){return Math.atan(Math.sinh(Math.PI*(1-2*u)))*180/Math.PI}function _i(u){return(Math.atan2(-Math.cos(u),Math.sin(u))*180/Math.PI%360+360)%360}function pi(u){const e=u*Math.PI/180;return Math.atan2(Math.cos(e),-Math.sin(e))}function mi(u){const{center:e,distance:t,phi:s,theta:i}=u,a=hi(e[0]),o=di(e[2]),n=_i(s),r=i*180/Math.PI;return`#${a.toFixed(5)}/${o.toFixed(5)}/${n.toFixed(1)}/${r.toFixed(1)}/${t.toPrecision(6)}/${e[1].toPrecision(6)}`}function gi(u){if(!u||u.length<2)return null;const e=u.slice(1).split("/").map(Number);if(e.length<5||e.some(isNaN))return null;const[t,s,i,a,o,n]=e;return!isFinite(t)||!isFinite(s)||!isFinite(i)||!isFinite(a)||!isFinite(o)||o<=0?null:{center:[ze(t),isFinite(n)?n:0,Le(s)],distance:o,phi:pi(i),theta:a*Math.PI/180}}class yi{constructor(e,t,s,i){this._device=e,this._pixelRatio=s;const a=`
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
}`;this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"round",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:a,fragmentShaderBody:o}),this._uniformBuffer=e.createBuffer({size:112,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=e.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._positionBuffer=null,this._dataBindGroup=null,this._vertexCount=0,this._frozen=!1,this._coverageProjView=null}get isFrozen(){return this._frozen}get coverageProjView(){return this._coverageProjView}freeze(e){this._frozen=!0,this._coverageProjView=new Float32Array(e);const t=new Float32Array(16);Ae(t,this._coverageProjView);const s=Tt(t),i=20,a=[],o=f=>[s[f*3],s[f*3+1],s[f*3+2],1],n=()=>a.push([0,0,0,0]),r=f=>a.push(o(f)),l=(f,d)=>{n();const h=o(f),_=o(d);for(let p=0;p<=i;p++){const y=p/i;a.push([h[0]+(_[0]-h[0])*y,h[1]+(_[1]-h[1])*y,h[2]+(_[2]-h[2])*y,1])}};n(),r(0),r(1),r(2),r(3),r(0),n(),r(4),r(5),r(6),r(7),r(4),l(0,4),l(1,5),l(2,6),l(3,7),n();const c=new Float32Array(a.length*4);for(let f=0;f<a.length;f++)c[f*4]=a[f][0],c[f*4+1]=a[f][1],c[f*4+2]=a[f][2],c[f*4+3]=a[f][3];this._vertexCount=a.length,this._positionBuffer=this._device.createBuffer({size:c.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._positionBuffer,0,c),this._dataBindGroup=this._device.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer}}]})}unfreeze(){this._frozen=!1,this._coverageProjView=null,this._positionBuffer&&(this._positionBuffer.destroy(),this._positionBuffer=null),this._dataBindGroup=null}draw(e,t,s,i){if(!this._frozen||!this._positionBuffer)return;const a=new Float32Array(112/4);a.set(t,0),a[16]=0,a[17]=.5,a[18]=.15,a[19]=1,a[20]=1,a[21]=1,a[22]=1,a[23]=1,a[24]=4,a[25]=1.5,a[26]=this._pixelRatio,this._device.queue.writeBuffer(this._uniformBuffer,0,a),this._gpuLines.draw(e,{vertexCount:this._vertexCount,resolution:[s,i]},[this._dataBindGroup,this._sharedBindGroup])}destroy(){this._positionBuffer&&this._positionBuffer.destroy(),this._gpuLines.destroy(),this._uniformBuffer.destroy()}}function vi(u,e=0,t=1/0,s=1/0){u.sort((o,n)=>o.depth-n.depth);const i=[],a=new Map;for(const o of u){const n=o.screenX-o.halfW-e,r=o.screenX+o.halfW+e,l=o.screenY-o.halfH-e,c=o.screenY+o.halfH+e;let f=n<0||r>t||l<0||c>s;if(!f)for(let d=0;d<i.length;d++){const h=i[d];if(n<h.maxX&&r>h.minX&&l<h.maxY&&c>h.minY){f=!0;break}}if(f){o.visible=!1;let d=a.get(o.layerIndex);d||(d=new Set,a.set(o.layerIndex,d)),d.add(o.featureIndex)}else o.visible=!0,i.push({minX:o.screenX-o.halfW,maxX:o.screenX+o.halfW,minY:o.screenY-o.halfH,maxY:o.screenY+o.halfH})}return{items:u,hiddenByLayer:a}}const xi=`
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
`,nt=1e4,bi=8,at=6,lt=1e3;class wi{constructor(e,t){this._device=e,this._lastCollisionTime=0,this._collisionStale=!1,this._collisionScheduled=!1,this._collisionTimer=null,this._debugItems=null;const s=e.createShaderModule({code:xi}),i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._vertexBuffer=e.createBuffer({size:nt*bi*at*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this._linePipeline=e.createRenderPipeline({layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:s,entryPoint:"vs_colored_line",buffers:[{arrayStride:at*4,attributes:[{format:"float32x2",offset:0,shaderLocation:0},{format:"float32x4",offset:8,shaderLocation:1}]}]},fragment:{module:s,entryPoint:"fs_colored_line",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"line-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._invProjView=new Float32Array(16)}markStale(){this._debugItems||(this._collisionStale=!0)}update({enabled:e,layers:t,projectionView:s,canvasW:i,canvasH:a,pixelRatio:o,exaggeration:n,collisionBuffer:r,occlusionBias:l,bvh:c,tileManager:f,bvhTileList:d,globalElevScale:h}){const _=performance.now();if(!e){if(this._debugItems){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:y}of t)y.setVisibleFeatures(null)}return!1}const p=_-this._lastCollisionTime;return p>=lt||this._collisionStale?(this._doCollision(t,s,i,a,o,n,r,l,c,f,d,h),this._lastCollisionTime=_,this._collisionStale=!1,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null),!0):(this._collisionScheduled||(this._collisionScheduled=!0,this._collisionTimer=setTimeout(()=>{this._collisionScheduled=!1,this._collisionTimer=null,this._wakeCallback?.()},lt-p)),!1)}set onWake(e){this._wakeCallback=e}_doCollision(e,t,s,i,a,o,n,r,l,c,f,d){const h=[];let _=0;for(const{layer:m,collision:S,sourceId:E}of e){if(S){const v=m.getCollisionItems(t,s,i,a,o,d);for(const G of v)G.layerIndex=_,G.sourceId=E;h.push(...v)}_++}const p=s/a,y=i/a;if(l&&h.length>0){Ae(this._invProjView,t);const m=t;for(const S of h){const E=S.screenX/p*2-1,v=1-S.screenY/y*2,G=Ye(E,v,this._invProjView),Y=ut({origin:G.origin,direction:G.direction,bvh:l,tileCache:c,tileList:f,verticalExaggeration:o});if(Y){const[U,Q,q]=Y.worldPos;m[3]*U+m[7]*Q+m[11]*q+m[15]<S.clipW*(1-r)&&(S.occluded=!0)}}}const g=[];for(const m of h)m.occluded||g.push(m);vi(g,n,p,y);const C=new Map;for(const m of h)if(m.occluded||!m.visible){let S=C.get(m.sourceId);S||(S=new Set,C.set(m.sourceId,S)),S.add(m.sourceFeatureIndex)}const w=new Map;for(const m of h){const S=C.get(m.sourceId);if(S&&S.has(m.sourceFeatureIndex))m.occluded||(m.visible=!1);else{let E=w.get(m.layerIndex);E||(E=new Set,w.set(m.layerIndex,E)),E.add(m.featureIndex)}}this._debugItems=h,_=0;for(const{layer:m,collision:S}of e)m.setVisibleFeatures(S?w.get(_)||new Set:null),_++}drawDebug(e,t,s,i,a){if(!this._debugItems||this._debugItems.length===0)return;const o=this._debugItems,n=Math.min(o.length,nt),r=new Float32Array(n*8*6),l=a;for(let h=0;h<n;h++){const _=o[h],p=_.screenX-_.halfW-l,y=_.screenX+_.halfW+l,g=_.screenY-_.halfH-l,C=_.screenY+_.halfH+l,w=_.occluded?.2:_.visible?0:1,m=_.occluded?.4:_.visible?1:0,S=_.occluded?1:0,E=.8,v=h*8*6;r[v]=p,r[v+1]=g,r[v+2]=w,r[v+3]=m,r[v+4]=S,r[v+5]=E,r[v+6]=y,r[v+7]=g,r[v+8]=w,r[v+9]=m,r[v+10]=S,r[v+11]=E,r[v+12]=y,r[v+13]=g,r[v+14]=w,r[v+15]=m,r[v+16]=S,r[v+17]=E,r[v+18]=y,r[v+19]=C,r[v+20]=w,r[v+21]=m,r[v+22]=S,r[v+23]=E,r[v+24]=y,r[v+25]=C,r[v+26]=w,r[v+27]=m,r[v+28]=S,r[v+29]=E,r[v+30]=p,r[v+31]=C,r[v+32]=w,r[v+33]=m,r[v+34]=S,r[v+35]=E,r[v+36]=p,r[v+37]=C,r[v+38]=w,r[v+39]=m,r[v+40]=S,r[v+41]=E,r[v+42]=p,r[v+43]=g,r[v+44]=w,r[v+45]=m,r[v+46]=S,r[v+47]=E}const c=t/i,f=s/i,d=new Float32Array([c,f,0,0]);this._device.queue.writeBuffer(this._uniformBuffer,0,d),this._device.queue.writeBuffer(this._vertexBuffer,0,r.buffer,0,n*8*6*4),e.setPipeline(this._linePipeline),e.setBindGroup(0,this._uniformBindGroup),e.setVertexBuffer(0,this._vertexBuffer),e.draw(n*8)}clear(e){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:t}of e)t.setVisibleFeatures(null)}destroy(){this._collisionTimer&&clearTimeout(this._collisionTimer),this._uniformBuffer.destroy(),this._vertexBuffer.destroy()}}function We(u,e,t,s,i,a,o){if(o>=a)return;const n=(u.mercatorX+e.mercatorX)/2,r=(u.mercatorY+e.mercatorY)/2,l=s(u.mercatorX,u.mercatorY),c=s(e.mercatorX,e.mercatorY),f=s(n,r);if(l==null||c==null||f==null||l<=0||c<=0||f<=0)return;const d=(l+c)/2;if(Math.abs(f-d)>i){const h={mercatorX:n,mercatorY:r};We(u,h,t,s,i,a,o+1),t.push(h),We(h,e,t,s,i,a,o+1)}}class ht{static async create(e,t={}){const s=new ht;return await s._init(e,t),s}async _init(e,t){const{sources:s={},base:i=[],features:a=[],camera:o={},settings:n,createGPULines:r}=t;let l=null;const c={},f={},d=[];for(const[x,T]of Object.entries(s))if(d.push(T),T.type==="terrain"){if(l)throw new Error("Only one terrain source is allowed");l=T}else T.type==="raster"?c[x]=T:T.type==="geojson"&&(f[x]=T);if(!l)throw new Error("A terrain source is required");this._pixelRatio=t.pixelRatio||(typeof devicePixelRatio<"u"?devicePixelRatio:1),this._baseLayerConfigs=i,this._featureLayerConfigs=a,this._geojsonSources=f,this._rasterSources=c,this.canvas=e,this._terrainBounds=Ve(l);const[h,_,p,y]=l.bounds;this._location=t.location||{lat:(_+y)/2,lon:(h+p)/2},this.attribution=ui(d.filter(x=>x.attribution));const g=Math.round(ci(this._location.lat)*3.28084);this.settings=fi({treelineLower:Math.max(0,g-500),treelineUpper:g+500,...n});const C=await navigator.gpu.requestAdapter();this._device=await C.requestDevice(),this._format=navigator.gpu.getPreferredCanvasFormat(),this._createGPULines=r,this._gpuCtx=e.getContext("webgpu"),this._gpuCtx.configure({device:this._device,format:this._format,alphaMode:"opaque"});const w=gi(window.location.hash);this.camera=Mt(e,{center:[.0804792012701582,.0002040588543435183,.27264551318459634],distance:.0008177139017526437,phi:2.1624270549994598,theta:.16047571910010502,fov:Math.PI/4,near:1e-5,far:.5,rotateSpeed:.005,zoomSpeed:8e-4,panSpeed:1,...o,...w}),this._hashUpdateTimer=null;const m=this._device,S=this._format;this._mesh=St(m),this._imagerySampler=m.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});const E=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0}}]}),v=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),G=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),Y=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this._globalUniformBuffer=m.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._globalUniformBindGroup=m.createBindGroup({layout:G,entries:[{binding:0,resource:{buffer:this._globalUniformBuffer}}]}),this._fallbackImageryTexture=m.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),m.queue.writeTexture({texture:this._fallbackImageryTexture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]),this._fallbackImageryBindGroup=m.createBindGroup({layout:Y,entries:[{binding:0,resource:this._fallbackImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._whiteImageryTexture=m.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),m.queue.writeTexture({texture:this._whiteImageryTexture},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1]),this._whiteImageryBindGroup=m.createBindGroup({layout:Y,entries:[{binding:0,resource:this._whiteImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._pipeline=m.createRenderPipeline({layout:m.createPipelineLayout({bindGroupLayouts:[E,v,G,Y]}),vertex:{module:m.createShaderModule({code:Ct}),entryPoint:"vs_main",buffers:[{arrayStride:4,attributes:[{format:"uint16x2",offset:0,shaderLocation:0}]}]},fragment:{module:m.createShaderModule({code:Bt}),entryPoint:"fs_main",targets:[{format:S}]},primitive:{topology:"triangle-list",cullMode:"back",frontFace:"ccw"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}}),this._skyPipeline=m.createRenderPipeline({layout:m.createPipelineLayout({bindGroupLayouts:[G]}),vertex:{module:m.createShaderModule({code:Et}),entryPoint:"vs_sky",buffers:[]},fragment:{module:m.createShaderModule({code:At}),entryPoint:"fs_sky",targets:[{format:S}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._frustumOverlay=new yi(m,S,this._pixelRatio,r),this._collisionManager=new wi(m,S),this._collisionManager.onWake=()=>{this._renderDirty=!0},this._UNIFORM_STRIDE=256,this._MAX_TILES_PER_FRAME=256,this._uniformBuffer=m.createBuffer({size:this._UNIFORM_STRIDE*this._MAX_TILES_PER_FRAME,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=m.createBindGroup({layout:E,entries:[{binding:0,resource:{buffer:this._uniformBuffer,size:208}}]}),this._tileManager=new Wt(m,{tileUrl:Ze(l.tiles)}),this._tileManager.setBindGroupLayout(v),this._tileManager.setBounds(this._terrainBounds),this._imageryDeltaZoom=1;const U=[];for(const x of i){const T=c[x.source];if(!T)throw new Error(`Base layer "${x.id}" references unknown source "${x.source}"`);const R=Ve(T),H=new Nt({tileUrl:Ze(T.tiles)});H.setBounds(R),U.push({imageryManager:H,blend:x.blend||"source-over",opacity:x.opacity!=null?x.opacity:1,maxzoom:T.maxzoom})}this._maxImageryZoom=U.length>0?Math.max(...U.map(x=>x.maxzoom)):0,this._compositor=new Vt(m,U,Y,this._imagerySampler),this._coverageDirty=!0,this._renderDirty=!0,this._cachedRenderList=[],this._tileManager.onTileResolved=()=>{this._coverageDirty=!0,this._renderDirty=!0,this._refinementDirty=!0,this._collisionManager.markStale();for(const x of this._lineLayers)x.layer.invalidateElevations()},this._compositor.onUpdate=()=>{this._coverageDirty=!0,this._renderDirty=!0},this._depthTexture=null,this._MAX_ELEV_Y=.001,this._mvpFloat32=new Float32Array(16),this._modelFloat32=new Float32Array(16),this._uniformData=new Float32Array(52),this._globalUniformData=new Float32Array(24),this._currentExaggeration=this.settings.verticalExaggeration,this._currentDensityThreshold=this.settings.densityThreshold,this._currentFreezeCoverage=!1,this._refinementDirty=!1,this._lastRefinementTime=0,this._bvh=null,this._bvhTileList=[],this._lastProjView=new Float64Array(16),this._invProjView=new Float64Array(16),this.camera.rotateStartCallback=(x,T)=>this._hitTest(x,T),this._needsCanvasResize=!0,this._resizeObserver=new ResizeObserver(()=>{this._needsCanvasResize=!0,this._renderDirty=!0,this._coverageDirty=!0,this.camera.taint()}),this._resizeObserver.observe(e),this._circleLayers=[],this._textLayers=[],this._lineLayers=[];const Q=[],q={};for(const x of a){const T=f[x.source];if(!T)throw new Error(`Feature layer "${x.id}" references unknown source "${x.source}"`);if(!q[x.source]){const H=new et;q[x.source]=H,Q.push(H.load(T.data,{...T,simplifyFn:t.simplifyFn}))}const R=x.collision!==!1;if(x.type==="circle"){const H=new Qt(x,q[x.source],(ee,O)=>this.queryElevationMercator(ee,O));H.init(m,G,S),H._collision=R,H._sourceId=x.source,this._circleLayers.push({id:x.id,layer:H,config:x,visible:!0,userCreated:!1})}else if(x.type==="text"){const H=new oi(x,q[x.source],(ee,O)=>this.queryElevationMercator(ee,O));H._collision=R,H._sourceId=x.source,this._textLayers.push({id:x.id,layer:H,config:x,visible:!0,userCreated:!1})}else if(x.type==="line"){const H=new rt(x,q[x.source],(ee,O)=>this.queryElevationMercator(ee,O));H.init(m,S,this._globalUniformBuffer,r),this._lineLayers.push({id:x.id,layer:H,config:x,visible:!0,userCreated:!1,_sourceRef:q[x.source]})}}if(await Promise.all(Q),t.font&&this._textLayers.length>0){const x=await si(m,{atlasUrl:t.font.atlas,metadataUrl:t.font.metadata});for(const T of this._textLayers)T.layer.init(m,x,S,"depth24plus",this._globalUniformBuffer)}this._running=!0,this._boundFrame=this._frame.bind(this),requestAnimationFrame(this._boundFrame)}_hitTest(e,t){const s=this.raycast(e,t);if(s)return s.worldPos;const i=this.canvas.getBoundingClientRect(),a=(e-i.left)/i.width*2-1,o=1-(t-i.top)/i.height*2;Ae(this._invProjView,this._lastProjView);const{origin:n,direction:r}=Ye(a,o,this._invProjView);if(Math.abs(r[1])>1e-10){const l=-n[1]/r[1];if(l>0)return[n[0]+l*r[0],0,n[2]+l*r[2]]}return null}_ensureDepthTexture(e,t){this._depthTexture&&this._depthTexture.width===e&&this._depthTexture.height===t||(this._depthTexture&&this._depthTexture.destroy(),this._depthTexture=this._device.createTexture({size:[e,t],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}))}_buildCollisionLayers(){const e=[];for(const t of this._circleLayers)t.visible&&e.push({layer:t.layer,collision:t.layer._collision,sourceId:t.layer._sourceId});for(const t of this._textLayers)t.visible&&e.push({layer:t.layer,collision:t.layer._collision,sourceId:t.layer._sourceId});return e}paint(){const{canvas:e,camera:t,settings:s}=this,i=e.width/e.height;if(i===0||!isFinite(i))return;const{view:a,projection:o,projectionView:n}=t.update(i),r=this._device;let l=0;const c=[],f=this._globalElevScale;for(const I of this._cachedRenderList){if(l>=this._MAX_TILES_PER_FRAME)break;const ue=this._tileManager.getTile(I.z,I.x,I.y);if(!ue)continue;const k=xt(I.z,I.y),X=$e(I.z,this._imageryDeltaZoom,this._maxImageryZoom);this._compositor.ensureImagery(I.z,I.x,I.y,X);const M=this._compositor.hasImagery(I.z,I.x,I.y);bt(this._mvpFloat32,a,o,I.z,I.x,I.y,f,this._currentExaggeration),wt(this._modelFloat32,I.z,I.x,I.y,f,this._currentExaggeration);const A=this._uniformData;A.set(this._mvpFloat32,0),A.set(this._modelFloat32,16),A[32]=f,A[33]=k,A[34]=this._currentExaggeration,A[35]=1/514,A[36]=s.showTileBorders?1:0,A[37]=s.showImagery?M?1:0:1,A[38]=s.hillshadeOpacity,A[39]=s.slopeAngleOpacity,A[40]=s.contourOpacity,A[41]=e.height,A[42]=s.showWireframe?1:0,A[43]=s.slopeAspectMaskAbove,A[44]=s.slopeAspectMaskNear,A[45]=s.slopeAspectMaskBelow,A[46]=s.slopeAspectOpacity,A[47]=s.treelineLower*.3048,A[48]=s.treelineUpper*.3048;let j;s.showImagery?M?j=this._compositor.getBindGroup(I.z,I.x,I.y):j=this._fallbackImageryBindGroup:j=this._whiteImageryBindGroup,r.queue.writeBuffer(this._uniformBuffer,l*this._UNIFORM_STRIDE,A.buffer,A.byteOffset,208),c.push({offset:l*this._UNIFORM_STRIDE,bindGroup:ue.bindGroup,imageryBindGroup:j}),l++}const{phi:d,theta:h,distance:_,center:p}=t.state,y=p[0]+_*Math.cos(h)*Math.cos(d),g=p[1]+_*Math.sin(h),C=p[2]+_*Math.cos(h)*Math.sin(d),w=1/f,m=g/f,S=s.sunDirection,E=S[0],v=S[1],G=S[2],Y=s.atmosphereDensity,U=this._globalUniformData;U[0]=y,U[1]=g,U[2]=C,U[3]=m,U[4]=E,U[5]=v,U[6]=G,U[7]=w,U[8]=52e-7*Y,U[9]=121e-7*Y,U[10]=296e-7*Y,U[11]=8e3,U[12]=2e-5*Y,U[13]=3e3,U[14]=.76,U[15]=20;const Q=t.state.fov,q=Math.sin(d),x=-Math.cos(d),T=-Math.sin(h)*Math.cos(d),R=Math.cos(h),H=-Math.sin(h)*Math.sin(d);U[16]=q,U[17]=0,U[18]=x,U[19]=i,U[20]=T,U[21]=R,U[22]=H,U[23]=Math.tan(Q/2),r.queue.writeBuffer(this._globalUniformBuffer,0,U.buffer,U.byteOffset,96),this._ensureDepthTexture(e.width,e.height);const ee=r.createCommandEncoder(),O=ee.beginRenderPass({colorAttachments:[{view:this._gpuCtx.getCurrentTexture().createView(),clearValue:{r:.53,g:.66,b:.82,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this._depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});O.setPipeline(this._skyPipeline),O.setBindGroup(0,this._globalUniformBindGroup),O.draw(3),O.setPipeline(this._pipeline),O.setVertexBuffer(0,this._mesh.vertexBuffer),O.setIndexBuffer(this._mesh.indexBuffer,"uint32"),O.setBindGroup(2,this._globalUniformBindGroup);for(const I of c)O.setBindGroup(0,this._uniformBindGroup,[I.offset]),O.setBindGroup(1,I.bindGroup),O.setBindGroup(3,I.imageryBindGroup),O.drawIndexed(this._mesh.indexCount);this._frustumOverlay.draw(O,n,e.width,e.height);for(const I of this._lineLayers)I.visible&&I.layer.draw(O);for(const I of this._circleLayers)I.visible&&I.layer.draw(O,this._globalUniformBindGroup,!1);for(const I of this._textLayers)I.visible&&I.layer.draw(O);s.showCollisionBoxes&&this._collisionManager.drawDebug(O,e.width,e.height,this._pixelRatio,s.collisionBuffer),O.end(),r.queue.submit([ee.finish()])}_frame(){if(!this._running)return;requestAnimationFrame(this._boundFrame);const{canvas:e,camera:t,settings:s}=this;if(this._currentExaggeration!==s.verticalExaggeration&&(this._currentExaggeration=s.verticalExaggeration,t.taint()),this._currentDensityThreshold!==s.densityThreshold&&(this._currentDensityThreshold=s.densityThreshold,this._coverageDirty=!0),s.freezeCoverage!==this._currentFreezeCoverage&&(this._currentFreezeCoverage=s.freezeCoverage,this._currentFreezeCoverage?(this._savedFar=t.state.far,t.state.far=t.state.far*4):(this._frustumOverlay.unfreeze(),t.state.far=this._savedFar,this._coverageDirty=!0),t.taint(),this._renderDirty=!0),s.dirty&&(this._renderDirty=!0,s.dirty=!1),this._refinementDirty){const g=performance.now();g-this._lastRefinementTime>1e3&&(this._refineLineLayers(),this._lastRefinementTime=g,this._refinementDirty=!1,this._renderDirty=!0,this.onElevationRefine&&this.onElevationRefine())}if(!this._coverageDirty&&!this._renderDirty&&!t.dirty)return;if(this._needsCanvasResize){const g=this._pixelRatio,C=Math.floor(e.clientWidth*g),w=Math.floor(e.clientHeight*g);(e.width!==C||e.height!==w)&&(e.width=C,e.height=w),this._needsCanvasResize=!1}const i=e.width/e.height,{view:a,projection:o,projectionView:n,dirty:r}=t.update(i);this._lastProjView.set(n);const{center:l,distance:c,theta:f,phi:d}=t.state,h=l[2]+c*Math.cos(f)*Math.sin(d),_=2*Math.atan(Math.exp(Math.PI*(1-2*h)))-Math.PI/2;this._globalElevScale=1/(40075016686e-3*Math.cos(_)),this._currentFreezeCoverage&&!this._frustumOverlay.isFrozen&&this._frustumOverlay.freeze(n);const p=this._frustumOverlay.coverageProjView||n;if(r&&(this._coverageDirty=!0,this._renderDirty=!0,clearTimeout(this._hashUpdateTimer),this._hashUpdateTimer=setTimeout(()=>{history.replaceState(null,"",mi(t.state))},300)),this._coverageDirty){const g=this._MAX_ELEV_Y*this._currentExaggeration;this._tileManager.beginFrame(),this._cachedRenderList=Qe(p,e.width,e.height,g,this._currentExaggeration,s.densityThreshold,this._terrainBounds,this._tileManager,(w,m,S)=>{const E=this._tileManager.getTile(w,m,S);if(!E||E.isFlat)return!0;const v=$e(w,this._imageryDeltaZoom,this._maxImageryZoom);return this._compositor.ensureImagery(w,m,S,v),this._compositor.hasImagery(w,m,S)});const C=p;this._cachedRenderList.sort((w,m)=>{const S=C[3]*((w.x+.5)/(1<<w.z))+C[11]*((w.y+.5)/(1<<w.z))+C[15],E=C[3]*((m.x+.5)/(1<<m.z))+C[11]*((m.y+.5)/(1<<m.z))+C[15];return S-E}),this._tileManager.cancelStale(),this._tileManager.evict(),this._tileManager.stripQuadtrees(),this._compositor.gc(this._tileManager.wantedKeys),this._rebuildBVH(),this._coverageDirty=!1,this._renderDirty=!0}if(!this._renderDirty)return;this._renderDirty=!1;const y=this._buildCollisionLayers();this._collisionManager.update({enabled:s.enableCollision,layers:y,projectionView:n,canvasW:e.width,canvasH:e.height,pixelRatio:this._pixelRatio,exaggeration:this._currentExaggeration,collisionBuffer:s.collisionBuffer,occlusionBias:s.occlusionBias,bvh:this._bvh,tileManager:this._tileManager,bvhTileList:this._bvhTileList,globalElevScale:this._globalElevScale})&&(this._renderDirty=!0);for(const g of this._circleLayers)g.visible&&g.layer.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale);for(const g of this._textLayers)g.visible&&g.layer.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale);for(const g of this._lineLayers)g.visible&&g.layer.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale);this.onElevationRefine&&this.onElevationRefine(),this.paint()}_rebuildBVH(){const e=this._cachedRenderList;if(e.length===0){this._bvh=null,this._bvhTileList=[];return}const t=new Float64Array(e.length*6),s=new Array(e.length);for(let i=0;i<e.length;i++){const{z:a,x:o,y:n}=e[i];s[i]=e[i];const r=1/(1<<a),l=qe(a,n),c=this._tileManager.getElevationBounds(a,o,n),f=i*6;t[f]=o*r,t[f+1]=c?c.minElevation*l*this._currentExaggeration:0,t[f+2]=n*r,t[f+3]=(o+1)*r,t[f+4]=c?c.maxElevation*l*this._currentExaggeration:this._MAX_ELEV_Y*this._currentExaggeration,t[f+5]=(n+1)*r}this._bvh=new li(t,{maxItemsPerNode:4}),this._bvhTileList=s}raycast(e,t){if(!this._bvh)return null;const s=this.canvas.getBoundingClientRect(),i=(e-s.left)/s.width*2-1,a=1-(t-s.top)/s.height*2;Ae(this._invProjView,this._lastProjView);const{origin:o,direction:n}=Ye(i,a,this._invProjView);return ut({origin:o,direction:n,bvh:this._bvh,tileCache:this._tileManager,tileList:this._bvhTileList,verticalExaggeration:this._currentExaggeration})}queryElevation(e,t){const s=ze(e),i=Le(t);return this.queryElevationMercator(s,i)}queryElevationMercator(e,t){let s=null,i=-1;for(const G of this._cachedRenderList){const Y=1/(1<<G.z);e>=G.x*Y&&e<(G.x+1)*Y&&t>=G.y*Y&&t<(G.y+1)*Y&&G.z>i&&(s=G,i=G.z)}if(!s)return null;const a=this._tileManager.getTile(s.z,s.x,s.y);if(!a||!a.elevations)return null;const o=1/(1<<s.z),n=(e-s.x*o)/o,r=(t-s.y*o)/o,l=n*512+1,c=r*512+1,f=Math.floor(l),d=Math.floor(c),h=l-f,_=c-d,p=514,y=Math.min(f,513),g=Math.min(f+1,513),C=Math.min(d,513),w=Math.min(d+1,513),m=a.elevations[C*p+y],S=a.elevations[C*p+g],E=a.elevations[w*p+y],v=a.elevations[w*p+g];return m*(1-h)*(1-_)+S*h*(1-_)+E*(1-h)*_+v*h*_}debugTileCoverage(){const{canvas:e,camera:t,settings:s}=this,i=e.width/e.height,{projectionView:a}=t.update(i),o=t.state,n=this._MAX_ELEV_Y*this._currentExaggeration,r=Qe(a,e.width,e.height,n,this._currentExaggeration,s.densityThreshold,this._terrainBounds,this._tileManager,null);return{camera:{center:[...o.center],distance:o.distance,phi:o.phi,theta:o.theta,thetaDeg:o.theta*180/Math.PI,fov:o.fov},canvas:{width:e.width,height:e.height},densityThreshold:s.densityThreshold,tiles:r.map(l=>{const[c,f,d]=ct(a);return{z:l.z,x:l.x,y:l.y,density:ft(a,l.z,l.x,l.y,e.height,c,f,d)}}),projectionView:Array.from(a)}}async addLineLayer(e,t,s={}){const i=new et;await i.load(t);const a={id:e,type:"line",paint:s},o=new rt(a,i,(r,l)=>this.queryElevationMercator(r,l));o.init(this._device,this._format,this._globalUniformBuffer,this._createGPULines);const n={id:e,layer:o,config:a,visible:!0,userCreated:!0,_sourceRef:i,sourceGeoJSON:t};return this._lineLayers.push(n),this._refinementDirty=!0,this._renderDirty=!0,n}removeLayer(e){for(const t of[this._lineLayers,this._circleLayers,this._textLayers]){const s=t.findIndex(i=>i.id===e);if(s!==-1){t[s].layer.destroy&&t[s].layer.destroy(),t.splice(s,1),this._renderDirty=!0;return}}}removeLineLayer(e){this.removeLayer(e)}setLayerVisibility(e,t){for(const s of[this._lineLayers,this._circleLayers,this._textLayers]){const i=s.find(a=>a.id===e);if(i){i.visible=t,this._renderDirty=!0;return}}}setLineLayerColor(e,t){const s=this._lineLayers.find(i=>i.id===e);s&&(s.layer._lineColor=Ie(t),this._renderDirty=!0)}setLayerPaint(e,t,s){const i=typeof s=="string"?Ie(s):null;for(const a of this._lineLayers){if(a.id!==e)continue;const o=a.layer;t==="line-color"?o._lineColor=i:t==="line-border-color"?o._borderColor=i:t==="line-width"?o._lineWidth=s:t==="line-border-width"&&(o._borderWidth=s),this._renderDirty=!0;return}for(const a of this._circleLayers){if(a.id!==e)continue;const o=a.layer;t==="circle-color"?o._fillColor=i:t==="circle-stroke-color"?o._strokeColor=i:t==="circle-radius"?o._radius=s:t==="circle-stroke-width"&&(o._strokeWidth=s),this._renderDirty=!0;return}for(const a of this._textLayers){if(a.id!==e)continue;const o=a.layer;if(t==="text-color"){if(o._color=i,o._spans)for(const{span:n}of o._spans)n.setColor(i)}else if(t==="text-halo-color"){if(o._strokeColor=i,o._spans)for(const{span:n}of o._spans)n.setStrokeColor(i)}else t==="text-halo-width"&&(o._strokeWidth=s,o._lastScaledStrokeWidth=null);this._renderDirty=!0;return}}_refineLineLayers(){const e=(t,s)=>this.queryElevationMercator(t,s);for(const t of this._lineLayers){if(!t._sourceRef)continue;const s=t._sourceRef.lineFeatures;if(!s||s.length===0)continue;t._segmentMidpoints||(t._segmentMidpoints=s.map(o=>new Array(Math.max(0,o.coordinates.length-1)).fill(null).map(()=>[])));let i=!1;const a=[];for(let o=0;o<s.length;o++){const n=s[o],r=n.coordinates,l=t._segmentMidpoints[o];for(let f=0;f<r.length-1;f++){const d=[];if(We(r[f],r[f+1],d,e,1,8,0),!(d.length<l[f].length)){if(d.length>l[f].length)l[f]=d,i=!0;else if(d.length>0){let h=!1;for(let _=0;_<d.length;_++)if(d[_].mercatorX!==l[f][_].mercatorX||d[_].mercatorY!==l[f][_].mercatorY){h=!0;break}h&&(l[f]=d,i=!0)}}}const c=[r[0]];for(let f=0;f<r.length-1;f++){for(const d of l[f])c.push(d);c.push(r[f+1])}a.push({coordinates:c,properties:n.properties})}if(i){const o=t.layer,n=new Map;if(o._cachedElevations&&o._polylines)for(const r of o._polylines)for(let l=0;l<r.count;l++){const c=r.feature.coordinates[l],f=o._cachedElevations[r.offset+l];f>0&&n.set(c.mercatorX+","+c.mercatorY,f)}o.replaceSource({lineFeatures:a,features:[]},n)}}}getLayerElevationProfile(e){const t=this._lineLayers.find(i=>i.id===e);if(!t)return null;const s=t.layer;return!s._polylines||s._polylines.length===0?null:s._polylines.map(i=>{const a=[],o=[];for(let n=0;n<i.count;n++){const r=i.feature.coordinates[n];a.push({mercatorX:r.mercatorX,mercatorY:r.mercatorY}),o.push(s._cachedElevations[i.offset+n])}return{coords:a,elevations:o}})}getLayerGeoJSON(e){const t=this._lineLayers.find(s=>s.id===e);return t?t.sourceGeoJSON?t.sourceGeoJSON:t._sourceRef?{type:"FeatureCollection",features:t._sourceRef.lineFeatures.map(s=>({type:"Feature",geometry:{type:"LineString",coordinates:s.coordinates.map(i=>[i.lon,i.lat,i.elevation||0])},properties:s.properties||{}}))}:null:null}destroy(){this._running=!1,clearTimeout(this._hashUpdateTimer),this._collisionManager.destroy(),this._frustumOverlay.destroy(),this._resizeObserver.disconnect(),this.camera.destroy(),this._depthTexture&&this._depthTexture.destroy(),this._mesh.vertexBuffer.destroy(),this._mesh.indexBuffer.destroy(),this._uniformBuffer.destroy(),this._globalUniformBuffer.destroy(),this._fallbackImageryTexture.destroy(),this._whiteImageryTexture.destroy();for(const e of this._lineLayers)e.layer.destroy();for(const e of this._circleLayers)e.layer.destroy&&e.layer.destroy();for(const e of this._textLayers)e.layer.destroy&&e.layer.destroy();this._device.destroy()}}export{ht as TerrainMap};
