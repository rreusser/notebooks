function Pe(l,e){const[t,s,i,a,o,n,r,c,u,h,d,f,p,_,y,g]=e,B=t*n-s*o,b=t*r-i*o,m=t*c-a*o,S=s*r-i*n,E=s*c-a*n,v=i*c-a*r,G=u*_-h*p,Y=u*y-d*p,U=u*g-f*p,Q=h*y-d*_,q=h*g-f*_,w=d*g-f*y;let T=B*w-b*q+m*Q+S*U-E*Y+v*G;return Math.abs(T)<1e-10?!1:(T=1/T,l[0]=(n*w-r*q+c*Q)*T,l[1]=(-s*w+i*q-a*Q)*T,l[2]=(_*v-y*E+g*S)*T,l[3]=(-h*v+d*E-f*S)*T,l[4]=(-o*w+r*U-c*Y)*T,l[5]=(t*w-i*U+a*Y)*T,l[6]=(-p*v+y*m-g*b)*T,l[7]=(u*v-d*m+f*b)*T,l[8]=(o*q-n*U+c*G)*T,l[9]=(-t*q+s*U-a*G)*T,l[10]=(p*E-_*m+g*B)*T,l[11]=(-u*E+h*m-f*B)*T,l[12]=(-o*Q+n*Y-r*G)*T,l[13]=(t*Q-s*Y+i*G)*T,l[14]=(-p*S+_*b-y*B)*T,l[15]=(u*S-h*b+d*B)*T,!0)}function Mt(l){function e(o,n,r){const c=l[0]*o+l[4]*n+l[8]*r+l[12],u=l[1]*o+l[5]*n+l[9]*r+l[13],h=l[2]*o+l[6]*n+l[10]*r+l[14],d=l[3]*o+l[7]*n+l[11]*r+l[15];return[c/d,u/d,h/d]}const t=.3,s=.99,i=new Float32Array(24),a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let o=0;o<4;o++){const[n,r]=a[o],c=e(n,r,t),u=e(n,r,s);i[o*3]=c[0],i[o*3+1]=c[1],i[o*3+2]=c[2],i[(o+4)*3]=u[0],i[(o+4)*3+1]=u[1],i[(o+4)*3+2]=u[2]}return i}function St(l,e={}){const t=new Proxy({center:e.center?[...e.center]:[0,0,0],distance:e.distance||10,phi:e.phi||0,theta:e.theta||.3,fov:e.fov||Math.PI/4,near:e.near||.1,far:e.far||1},{set(x,k,C){return x[k]=C,u=!0,!0}}),s=e.rotateSpeed||.01,i=e.zoomSpeed||.001,a=e.panSpeed||1,o=new Float64Array(16),n=new Float64Array(16),r=new Float64Array(16),c=new Float64Array(16);let u=!0,h=1,d=!1,f=null,p=0,_=0,y=null,g=null,B=null,b=0,m=0;function S(x,k){const C=l.getBoundingClientRect(),F=(x-C.left)/C.width*2-1,R=1-(k-C.top)/C.height*2;Pe(c,r);const P=c;function Z(J,$,N){const W=P[0]*J+P[4]*$+P[8]*N+P[12],te=P[1]*J+P[5]*$+P[9]*N+P[13],ce=P[2]*J+P[6]*$+P[10]*N+P[14],re=P[3]*J+P[7]*$+P[11]*N+P[15];return[W/re,te/re,ce/re]}const j=Z(F,R,0),V=Z(F,R,1);return{origin:j,direction:[V[0]-j[0],V[1]-j[1],V[2]-j[2]]}}function E(x,k){if(Math.abs(x.direction[1])<1e-10)return null;const C=(k-x.origin[1])/x.direction[1];return C<0?null:[x.origin[0]+C*x.direction[0],k,x.origin[2]+C*x.direction[2]]}let v=null,G=null;function Y(x,k){U();const C=l.parentElement;if(!C)return;const F=C.getBoundingClientRect();getComputedStyle(C).position==="static"&&(C.style.position="relative");const P=document.createElement("div"),Z=22,j={position:"absolute",left:"0",top:"0",width:Z+"px",height:Z+"px",borderRadius:"50%",boxSizing:"border-box",pointerEvents:"none"};Object.assign(P.style,{position:"absolute",left:x-F.left-Z/2+"px",top:k-F.top-Z/2+"px",width:Z+"px",height:Z+"px",pointerEvents:"none",transform:"scale(0.5)",opacity:"0",transition:"transform 0.15s ease-out, opacity 0.15s ease-out"});const V=document.createElement("div");Object.assign(V.style,{...j,border:"4px solid rgba(255,255,255,0.6)"});const J=document.createElement("div");Object.assign(J.style,{...j,border:"2.25px solid rgba(0,0,0,0.5)"}),P.appendChild(V),P.appendChild(J),C.appendChild(P),P.offsetWidth,P.style.transform="scale(1)",P.style.opacity="1",G=P}function U(){if(!G)return;const x=G;G=null,x.style.transform="scale(1.5)",x.style.opacity="0",x.addEventListener("transitionend",()=>x.remove(),{once:!0})}function Q(x,k){const{phi:C,theta:F,distance:R,center:P}=t,Z=C+x,j=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,F+k)),V=j-F;if(!v){t.phi=Z,t.theta=j;return}const J=P[0]+R*Math.cos(F)*Math.cos(C),$=P[1]+R*Math.sin(F),N=P[2]+R*Math.cos(F)*Math.sin(C);let W=J-v[0],te=$-v[1],ce=N-v[2];const re=Math.cos(x),le=Math.sin(x),ue=W*re-ce*le,he=te,de=W*le+ce*re,pe=-Math.sin(Z),_e=Math.cos(Z),me=Math.cos(V),be=Math.sin(V),ve=1-me,we=-_e*he,ke=_e*ue-pe*de,Te=pe*he,We=pe*ue+_e*de,yt=ue*me+we*be+pe*We*ve,vt=he*me+ke*be,xt=de*me+Te*be+_e*We*ve,bt=v[0]+yt,wt=v[1]+vt,Tt=v[2]+xt;t.phi=Z,t.theta=j,t.center[0]=bt-R*Math.cos(j)*Math.cos(Z),t.center[1]=wt-R*Math.sin(j),t.center[2]=Tt-R*Math.cos(j)*Math.sin(Z)}let q=0,w=0,T=0,I=0;function H(x){const{phi:k,theta:C,distance:F,center:R,fov:P,near:Z,far:j}=t,V=R[0]+F*Math.cos(C)*Math.cos(k),J=R[1]+F*Math.sin(C),$=R[2]+F*Math.cos(C)*Math.sin(k);let N=R[0]-V,W=R[1]-J,te=R[2]-$;const ce=Math.sqrt(N*N+W*W+te*te);N/=ce,W/=ce,te/=ce;let re=W*0-te*1,le=te*0-N*0,ue=N*1-W*0;const he=Math.sqrt(re*re+le*le+ue*ue);he>1e-4&&(re/=he,le/=he,ue/=he);const de=le*te-ue*W,pe=ue*N-re*te,_e=re*W-le*N;o[0]=re,o[1]=de,o[2]=-N,o[3]=0,o[4]=le,o[5]=pe,o[6]=-W,o[7]=0,o[8]=ue,o[9]=_e,o[10]=-te,o[11]=0,o[12]=-(re*V+le*J+ue*$),o[13]=-(de*V+pe*J+_e*$),o[14]=N*V+W*J+te*$,o[15]=1;const me=1/Math.tan(P/2),be=1/(Z-j);n[0]=me/x,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=me,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=j*be,n[11]=-1,n[12]=0,n[13]=0,n[14]=Z*j*be,n[15]=0;for(let ve=0;ve<4;ve++)for(let we=0;we<4;we++){let ke=0;for(let Te=0;Te<4;Te++)ke+=n[ve+Te*4]*o[Te+we*4];r[ve+we*4]=ke}}function ee(x,k){const{phi:C,theta:F,distance:R}=t,P=Math.sin(C),Z=-Math.cos(C),j=-Math.sin(F)*Math.cos(C),V=Math.cos(F),J=-Math.sin(F)*Math.sin(C),$=R*a;t.center[0]-=x*P*$,t.center[0]+=k*j*$,t.center[1]+=k*V*$,t.center[2]-=x*Z*$,t.center[2]+=k*J*$}function O(x,k){if(g=null,H(h),y){const R=y(x,k);if(Array.isArray(R)&&R.length===3){g={point:[...R],altitude:R[1]};return}}const C=S(x,k),F=E(C,t.center[1]);F&&(g={point:F,altitude:t.center[1]})}function L(x,k){if(!g)return;H(h);const C=S(x,k),F=E(C,g.altitude);F&&(t.center[0]+=g.point[0]-F[0],t.center[2]+=g.point[2]-F[2])}function fe(x,k){B=null,H(h);let C=null;if(y){const V=y(x,k);Array.isArray(V)&&V.length===3&&(C=V)}if(!C){const V=S(x,k);C=E(V,t.center[1])}if(!C)return;const{phi:F,theta:R}=t,P=-Math.cos(R)*Math.cos(F),Z=-Math.sin(R),j=-Math.cos(R)*Math.sin(F);B={point:[...C],normal:[P,Z,j]}}function z(x,k){if(!B)return;H(h);const C=S(x,k),{point:F,normal:R}=B,P=R[0]*C.direction[0]+R[1]*C.direction[1]+R[2]*C.direction[2];if(Math.abs(P)<1e-10)return;const Z=R[0]*F[0]+R[1]*F[1]+R[2]*F[2],j=R[0]*C.origin[0]+R[1]*C.origin[1]+R[2]*C.origin[2],V=(Z-j)/P;if(V<0)return;const J=C.origin[0]+V*C.direction[0],$=C.origin[1]+V*C.direction[1],N=C.origin[2]+V*C.direction[2];t.center[0]+=F[0]-J,t.center[1]+=F[1]-$,t.center[2]+=F[2]-N}function X(x){if(x.preventDefault(),p=x.clientX,_=x.clientY,f=x.shiftKey?"pan":x.button===2||x.button===1?"rotate":x.ctrlKey?"pivot":x.metaKey?"rotate":x.altKey?"zoom":"grab",f==="rotate"){if(y){const k=y(x.clientX,x.clientY);v=Array.isArray(k)&&k.length===3?k:null}Y(x.clientX,x.clientY)}if(f==="grab"&&O(x.clientX,x.clientY),f==="pan"&&fe(x.clientX,x.clientY),f==="zoom"){if(y){const C=y(x.clientX,x.clientY);if(Array.isArray(C)&&C.length===3){const{phi:F,theta:R,distance:P,center:Z}=t,j=Z[0]+P*Math.cos(R)*Math.cos(F),V=Z[1]+P*Math.sin(R),J=Z[2]+P*Math.cos(R)*Math.sin(F),$=C[0]-j,N=C[1]-V,W=C[2]-J,te=Math.sqrt($*$+N*N+W*W),ce=Math.cos(R)*Math.cos(F),re=Math.sin(R),le=Math.cos(R)*Math.sin(F);t.center[0]+=(P-te)*ce,t.center[1]+=(P-te)*re,t.center[2]+=(P-te)*le,t.distance=te}}const k=l.getBoundingClientRect();b=(x.clientX-k.left-k.width/2)/k.height,m=(x.clientY-k.top-k.height/2)/k.height,Y(x.clientX,x.clientY)}d=!0,l.style.cursor="grabbing",window.addEventListener("mousemove",M),window.addEventListener("mouseup",A)}function M(x){if(!d)return;const k=x.clientX-p,C=x.clientY-_;if(p=x.clientX,_=x.clientY,f==="grab")L(x.clientX,x.clientY);else if(f==="rotate")Q(k*s,C*s);else if(f==="pivot"){const{phi:F,theta:R,distance:P,center:Z,fov:j}=t,V=j/l.getBoundingClientRect().height,J=Z[0]+P*Math.cos(R)*Math.cos(F),$=Z[1]+P*Math.sin(R),N=Z[2]+P*Math.cos(R)*Math.sin(F);t.phi-=k*V,t.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t.theta-C*V)),t.center[0]=J-P*Math.cos(t.theta)*Math.cos(t.phi),t.center[1]=$-P*Math.sin(t.theta),t.center[2]=N-P*Math.cos(t.theta)*Math.sin(t.phi)}else if(f==="zoom"){const F=Math.exp(-C*.005),R=t.distance;t.distance=Math.max(t.near*2,R*F);const Z=(1/(t.distance/R)-1)*2*Math.tan(t.fov/2);ee(-b*Z,-m*Z)}else f==="pan"&&z(x.clientX,x.clientY);u=!0}function A(){d=!1,f=null,g=null,v=null,B=null,U(),l.style.cursor="grab",window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",A)}let K=!1,D=null;function se(x){if(x.preventDefault(),!K&&y){const V=y(x.clientX,x.clientY);if(Array.isArray(V)&&V.length===3){const{phi:J,theta:$,distance:N,center:W}=t,te=W[0]+N*Math.cos($)*Math.cos(J),ce=W[1]+N*Math.sin($),re=W[2]+N*Math.cos($)*Math.sin(J),le=V[0]-te,ue=V[1]-ce,he=V[2]-re,de=Math.sqrt(le*le+ue*ue+he*he),pe=Math.cos($)*Math.cos(J),_e=Math.sin($),me=Math.cos($)*Math.sin(J);t.center[0]+=(N-de)*pe,t.center[1]+=(N-de)*_e,t.center[2]+=(N-de)*me,t.distance=de}K=!0}clearTimeout(D),D=setTimeout(()=>{K=!1},200);const k=l.getBoundingClientRect(),C=(x.clientX-k.left-k.width/2)/k.height,F=(x.clientY-k.top-k.height/2)/k.height,R=1+x.deltaY*i,P=t.distance;t.distance=Math.max(t.near*2,P*R);const j=(1/(t.distance/P)-1)*2*Math.tan(t.fov/2);ee(-C*j,-F*j),u=!0}function oe(x){if(x.preventDefault(),x.touches.length===1)d=!0,f="grab",p=x.touches[0].clientX,_=x.touches[0].clientY,O(p,_);else if(x.touches.length===2){const k=x.touches[1].clientX-x.touches[0].clientX,C=x.touches[1].clientY-x.touches[0].clientY;if(q=Math.sqrt(k*k+C*C),w=(x.touches[0].clientX+x.touches[1].clientX)/2,T=(x.touches[0].clientY+x.touches[1].clientY)/2,I=Math.atan2(C,k),y){const F=y(w,T);v=Array.isArray(F)&&F.length===3?F:null}}}function ie(x){if(x.preventDefault(),x.touches.length===1&&d)p=x.touches[0].clientX,_=x.touches[0].clientY,f==="grab"&&L(p,_),u=!0;else if(x.touches.length===2){const k=x.touches[1].clientX-x.touches[0].clientX,C=x.touches[1].clientY-x.touches[0].clientY,F=Math.sqrt(k*k+C*C),R=(x.touches[0].clientX+x.touches[1].clientX)/2,P=(x.touches[0].clientY+x.touches[1].clientY)/2;if(q>0){const Z=q/F;t.distance*=Z,t.distance=Math.max(t.near*2,t.distance);const j=Math.atan2(C,k),V=j-I,J=l.getBoundingClientRect(),$=(P-T)/J.height;Q(-V,$*2),u=!0,I=j}q=F,w=R,T=P}}function ne(){d=!1,f=null,g=null,v=null,q=0,I=0}function ye(x){x.preventDefault()}l.style.cursor="grab",l.addEventListener("mousedown",X),l.addEventListener("wheel",se,{passive:!1}),l.addEventListener("touchstart",oe,{passive:!1}),l.addEventListener("touchmove",ie,{passive:!1}),l.addEventListener("touchend",ne),l.addEventListener("contextmenu",ye);function Fe(){l.removeEventListener("mousedown",X),l.removeEventListener("wheel",se),l.removeEventListener("touchstart",oe),l.removeEventListener("touchmove",ie),l.removeEventListener("touchend",ne),l.removeEventListener("contextmenu",ye),window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",A)}return{state:t,get dirty(){return u},set rotateStartCallback(x){y=x},taint(){u=!0},update(x){h=x,H(x);const k=u;return u=!1,{view:o,projection:n,projectionView:r,dirty:k}},destroy:Fe}}function Bt(l){const s=new Uint16Array(534578);let i=0;for(let d=0;d<=516;d++)for(let f=0;f<=516;f++)s[i++]=f,s[i++]=d;const o=516*516*6,n=new Uint32Array(o);let r=0;const c=517;for(let d=0;d<516;d++)for(let f=0;f<516;f++){const p=d*c+f,_=p+1,y=p+c,g=y+1;n[r++]=p,n[r++]=y,n[r++]=_,n[r++]=_,n[r++]=y,n[r++]=g}const u=l.createBuffer({size:s.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});l.queue.writeBuffer(u,0,s);const h=l.createBuffer({size:n.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});return l.queue.writeBuffer(h,0,n),{vertexBuffer:u,indexBuffer:h,indexCount:o,vertexCount:267289}}const ze=`
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
  out.slope_angle = atan(sqrt(dzdx * dzdx + dzdy * dzdy)) * 57.29578;

  // Slope aspect: compass bearing of the downhill direction.
  // dzdx = east gradient, dzdy = south gradient.
  // atan2(-east, south) gives compass bearing (0=N, π/2=E, ±π=S, -π/2=W).
  let aspect = atan2(-dzdx, dzdy);
  out.slope_aspect_sin = sin(aspect);
  out.slope_aspect_cos = cos(aspect);

  // Reject sea-level vertices (no terrain data).
  if (elevation <= 0.0) {
    var nan_bits = 0x7FC00000u;
    let nan = bitcast<f32>(nan_bits);
    out.position = vec4<f32>(nan, nan, nan, nan);
  }

  return out;
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

`+ze+`

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
`,At=`
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
`,Ut=`
`+ze+`

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
`;function Ee(l){return(l+180)/360}function Ae(l){const e=l*Math.PI/180;return(1-Math.log(Math.tan(e)+1/Math.cos(e))/Math.PI)/2}function qe(l){const[e,t,s,i]=l.bounds;return{minZoom:l.minzoom,maxZoom:l.maxzoom,minX:Ee(e),maxX:Ee(s),minY:Ae(i),maxY:Ae(t)}}function Ne(l){const e=Array.isArray(l)?l[0]:l;return(t,s,i)=>e.replace("{z}",t).replace("{x}",s).replace("{y}",i)}function Ye(l,e){const t=(e+.5)/(1<<l),s=2*Math.atan(Math.exp(Math.PI*(1-2*t)))-Math.PI/2;return 1/(40075016686e-3*Math.cos(s))}function Pt(l,e){const t=(e+.5)/(1<<l),s=2*Math.atan(Math.exp(Math.PI*(1-2*t)))-Math.PI/2;return 40075016686e-3*Math.cos(s)/(1<<l)/512}const He=new Float64Array(16),Ve=new Float64Array(16),Ze=new Float64Array(16),$e=new Float64Array(16),Qe=new Float64Array(16),je=new Float64Array(16);function dt(l,e,t,s,i,a){const o=1/(512*(1<<e)),n=t/(1<<e),r=s/(1<<e);l[0]=o,l[1]=0,l[2]=0,l[3]=0,l[4]=0,l[5]=i*a,l[6]=0,l[7]=0,l[8]=0,l[9]=0,l[10]=o,l[11]=0,l[12]=n,l[13]=0,l[14]=r,l[15]=1}function Ke(l,e,t){for(let s=0;s<4;s++)for(let i=0;i<4;i++){let a=0;for(let o=0;o<4;o++)a+=e[s+o*4]*t[o+i*4];l[s+i*4]=a}}function It(l,e,t,s,i,a,o,n){for(let r=0;r<16;r++)$e[r]=e[r],Qe[r]=t[r];dt(He,s,i,a,o,n),Ke(Ve,$e,He),Ke(Ze,Qe,Ve);for(let r=0;r<16;r++)l[r]=Ze[r]}function zt(l,e,t,s,i,a){dt(je,e,t,s,i,a);for(let o=0;o<16;o++)l[o]=je[o]}function Je(l,e,t,s,i,a){const o=Math.pow(2,l-s);return{offsetU:i*o-e,offsetV:a*o-t,scaleU:o,scaleV:o}}function et(l,e,t){return Math.min(l+e,t)}function kt(l,e,t,s){const i=s-l;if(i<=0){const c=l-s;return[{z:s,x:e>>c,y:t>>c}]}const a=1<<i,o=e<<i,n=t<<i,r=[];for(let c=0;c<a;c++)for(let u=0;u<a;u++)r.push({z:s,x:o+u,y:n+c});return r}function Rt(l){const e=[],t=l;return e.push(Me(t[3]+t[0],t[7]+t[4],t[11]+t[8],t[15]+t[12])),e.push(Me(t[3]-t[0],t[7]-t[4],t[11]-t[8],t[15]-t[12])),e.push(Me(t[3]+t[1],t[7]+t[5],t[11]+t[9],t[15]+t[13])),e.push(Me(t[3]-t[1],t[7]-t[5],t[11]-t[9],t[15]-t[13])),e.push(Me(t[2],t[6],t[10],t[14])),e.push(Me(t[3]-t[2],t[7]-t[6],t[11]-t[10],t[15]-t[14])),e}function Me(l,e,t,s){const i=Math.sqrt(l*l+e*e+t*t);return[l/i,e/i,t/i,s/i]}function Ft(l,e,t,s,i,a,o){let n=!0;for(let r=0;r<6;r++){const[c,u,h,d]=l[r],f=c>=0?i:e,p=u>=0?a:t,_=h>=0?o:s,y=c>=0?e:i,g=u>=0?t:a,B=h>=0?s:o;if(c*f+u*p+h*_+d<0)return-1;c*y+u*g+h*B+d<0&&(n=!1)}return n?1:0}function pt(l){const e=l[0],t=l[4],s=l[8],i=-l[12],a=l[1],o=l[5],n=l[9],r=-l[13],c=l[3],u=l[7],h=l[11],d=-l[15],p=1/(e*(o*h-n*u)-t*(a*h-n*c)+s*(a*u-o*c));return[(i*(o*h-n*u)-t*(r*h-n*d)+s*(r*u-o*d))*p,(e*(r*h-n*d)-i*(a*h-n*c)+s*(a*d-r*c))*p,(e*(o*d-r*u)-t*(a*d-r*c)+i*(a*u-o*c))*p]}function _t(l,e,t,s,i,a,o,n){const r=1/(1<<e),c=r/512,u=a-(t+.5)*r,h=o,d=n-(s+.5)*r,f=Math.sqrt(u*u+h*h+d*d);if(f<1e-10)return 1/0;const p=Math.sqrt(l[1]*l[1]+l[5]*l[5]+l[9]*l[9]);return c*p*i*.5/f}function Gt(l,e,t,s,i,a){const o=1/(1<<l);let n=0,r=s;const c=a.getElevationBounds(l,e,t);if(c){const u=Ye(l,t);n=c.minElevation*u*i,r=c.maxElevation*u*i}return{minX:e*o,maxX:(e+1)*o,minY:n,maxY:r,minZ:t*o,maxZ:(t+1)*o}}const Lt=14,Dt=4,Ot=200;function tt(l,e,t,s,i,a,o,n,r){const c=Rt(l),[u,h,d]=pt(l),f=[],p=o&&o.minZoom!=null?o.minZoom:Dt,_=o&&o.maxZoom!=null?o.maxZoom:Lt;function y(g,B,b){if(f.length>=Ot)return;const{minX:m,maxX:S,minY:E,maxY:v,minZ:G,maxZ:Y}=Gt(g,B,b,s,i,n);if(o&&(S<o.minX||m>o.maxX||Y<o.minY||G>o.maxY)||Ft(c,m,E,G,S,v,Y)===-1)return;if(g<p){const w=g+1,T=B*2,I=b*2;y(w,T,I),y(w,T+1,I),y(w,T,I+1),y(w,T+1,I+1);return}if(!n.hasTile(g,B,b)){n.requestTile(g,B,b);return}if(g<_&&_t(l,g,B,b,t,u,h,d)>a){const w=g+1,T=B*2,I=b*2;if(n.isResolved(w,T,I)&&n.isResolved(w,T+1,I)&&n.isResolved(w,T,I+1)&&n.isResolved(w,T+1,I+1)&&(!r||r(w,T,I)&r(w,T+1,I)&r(w,T,I+1)&r(w,T+1,I+1))){y(w,T,I),y(w,T+1,I),y(w,T,I+1),y(w,T+1,I+1);return}n.hasTile(w,T,I)?r&&r(w,T,I):n.requestTile(w,T,I),n.hasTile(w,T+1,I)?r&&r(w,T+1,I):n.requestTile(w,T+1,I),n.hasTile(w,T,I+1)?r&&r(w,T,I+1):n.requestTile(w,T,I+1),n.hasTile(w,T+1,I+1)?r&&r(w,T+1,I+1):n.requestTile(w,T+1,I+1)}f.push({z:g,x:B,y:b})}return y(0,0,0),f}const Ie=10,it=349525,Ue=new Uint32Array(Ie);{let l=1;for(let e=0;e<Ie;e++)Ue[e]=(l-1)/3,l*=4}function Xt(l){const e=new Float32Array(it),t=new Float32Array(it),s=Ie-1,i=Ue[s],a=512,o=514;for(let n=0;n<a;n++)for(let r=0;r<a;r++){const c=n+1,u=r+1,h=l[c*o+u],d=l[c*o+u+1],f=l[(c+1)*o+u],p=l[(c+1)*o+u+1],_=i+n*a+r;e[_]=Math.min(h,d,f,p),t[_]=Math.max(h,d,f,p)}for(let n=s-1;n>=0;n--){const r=Ue[n],c=Ue[n+1],u=1<<n,h=1<<n+1;for(let d=0;d<u;d++)for(let f=0;f<u;f++){const p=r+d*u+f,_=d*2,y=f*2,g=c+_*h+y,B=g+1,b=c+(_+1)*h+y,m=b+1;e[p]=Math.min(e[g],e[B],e[b],e[m]),t[p]=Math.max(t[g],t[B],t[b],t[m])}}return{minElev:e,maxElev:t}}function Yt(l,e,t,s,i,a,o,n,r,c,u,h){let d,f;if(s!==0){let p=(o-l)/s,_=(c-l)/s;if(p>_){const y=p;p=_,_=y}d=p,f=_}else{if(l<o||l>c)return null;d=-1/0,f=1/0}if(i!==0){let p=(n-e)/i,_=(u-e)/i;if(p>_){const y=p;p=_,_=y}p>d&&(d=p),_<f&&(f=_)}else if(e<n||e>u)return null;if(d>f)return null;if(a!==0){let p=(r-t)/a,_=(h-t)/a;if(p>_){const y=p;p=_,_=y}p>d&&(d=p),_<f&&(f=_)}else if(t<r||t>h)return null;return d>f||f<0?null:[d,f]}function st(l,e,t,s,i,a,o,n,r,c,u,h,d,f,p){const _=c-o,y=u-n,g=h-r,B=d-o,b=f-n,m=p-r,S=i*m-a*b,E=a*B-s*m,v=s*b-i*B,G=_*S+y*E+g*v;if(G<1e-10)return-1;const Y=1/G,U=l-o,Q=e-n,q=t-r,w=(U*S+Q*E+q*v)*Y;if(w<0||w>1)return-1;const T=Q*g-q*y,I=q*_-U*g,H=U*y-Q*_,ee=(s*T+i*I+a*H)*Y;if(ee<0||w+ee>1)return-1;const O=(B*T+b*I+m*H)*Y;return O>0?O:-1}function Wt(l,e,t,s,i,a,o,n,r){let c=1/0,u=-1,h=-1;const d=new Int32Array(Ie*4*3);let f=0;d[f++]=0,d[f++]=0,d[f++]=0;const p=514;for(;f>0;){const _=d[--f],y=d[--f],g=d[--f],B=Ue[g],b=1<<g,m=B+y*b+_,S=512>>>g,E=_*S,v=E+S,G=y*S,Y=G+S,U=l[m],Q=e[m],q=Yt(s,i,a,o,n,r,E,U,G,v,Q,Y);if(q&&!(q[0]>=c))if(g===Ie-1){const w=y+1,T=_+1,I=t[w*p+T],H=t[w*p+T+1],ee=t[(w+1)*p+T],O=t[(w+1)*p+T+1];let L=st(s,i,a,o,n,r,_,I,y,_,ee,y+1,_+1,H,y);L>0&&L<c&&(c=L,u=y,h=_),L=st(s,i,a,o,n,r,_+1,H,y,_,ee,y+1,_+1,O,y+1),L>0&&L<c&&(c=L,u=y,h=_)}else{const w=g+1,T=y*2,I=_*2;d[f++]=w,d[f++]=T,d[f++]=I,d[f++]=w,d[f++]=T,d[f++]=I+1,d[f++]=w,d[f++]=T+1,d[f++]=I,d[f++]=w,d[f++]=T+1,d[f++]=I+1}}return c===1/0?null:{t:c,patchRow:u,patchCol:h}}const qt=150,Nt=8,Ht=new OffscreenCanvas(514,514),rt=Ht.getContext("2d",{willReadFrequently:!0});function Vt(l){rt.drawImage(l,0,0);const{data:e}=rt.getImageData(0,0,514,514),t=new Float32Array(514*514);let s=1/0,i=-1/0;for(let a=0;a<514*514;a++){const o=a*4,n=-1e4+(e[o]*65536+e[o+1]*256+e[o+2])*.1;t[a]=n,n<s&&(s=n),n>i&&(i=n)}return{elevations:t,minElevation:s,maxElevation:i}}class Zt{constructor(e,{tileUrl:t}={}){this.device=e,this.tileUrl=t||((s,i,a)=>`tiles/${s}/${i}/${a}.webp`),this.cache=new Map,this.pending=new Map,this.failed=new Set,this.activeRequests=0,this.requestQueue=[],this.bindGroupLayout=null,this.onTileResolved=null,this.wantedKeys=new Set,this.bounds=null,this.aabbCache=new Map}getElevationBounds(e,t,s){return this.aabbCache.get(this._key(e,t,s))||null}setBounds(e){this.bounds=e}setBindGroupLayout(e){this.bindGroupLayout=e,this._flatTileTexture=null,this._flatTileBindGroup=null,this._flatTileElevations=null}_ensureFlatTile(){if(this._flatTileTexture)return;this._flatTileElevations=new Float32Array(514*514),this._flatTileTexture=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});const e=2304;this.device.queue.writeTexture({texture:this._flatTileTexture},new Uint8Array(e*514),{bytesPerRow:e},[514,514]),this._flatTileBindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:this._flatTileTexture.createView()}]})}_cacheFlatTile(e){this._ensureFlatTile(),this.aabbCache.set(e,{minElevation:0,maxElevation:0}),this.cache.set(e,{texture:this._flatTileTexture,bindGroup:this._flatTileBindGroup,elevations:this._flatTileElevations,quadtree:null,minElevation:0,maxElevation:0,lastUsed:performance.now(),isFlat:!0})}_key(e,t,s){return`${e}/${t}/${s}`}hasTile(e,t,s){const i=this._key(e,t,s);this.wantedKeys.add(i);const a=this.cache.get(i);return a?(a.lastUsed=performance.now(),!0):!1}isResolved(e,t,s){const i=this._key(e,t,s);return this.wantedKeys.add(i),this.cache.has(i)||this.failed.has(i)}getTile(e,t,s){const i=this._key(e,t,s),a=this.cache.get(i);return a?(a.lastUsed=performance.now(),a):null}requestTile(e,t,s){const i=this._key(e,t,s);if(this.wantedKeys.add(i),!(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))){if(this.bounds&&this._isOutOfBounds(e,t,s)){this.failed.add(i);return}this.requestQueue.push({z:e,x:t,y:s,key:i}),this._processQueue()}}_isOutOfBounds(e,t,s){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),o=t*a,n=(t+1)*a,r=s*a,c=(s+1)*a;return n<i.minX||o>i.maxX||c<i.minY||r>i.maxY}_processQueue(){for(;this.activeRequests<Nt&&this.requestQueue.length>0;){const{z:e,x:t,y:s,key:i}=this.requestQueue.shift();if(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))continue;this.activeRequests++;const a=new AbortController;this.pending.set(i,a),this._loadTile(e,t,s,i,a.signal).finally(()=>{this.pending.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,s,i,a){try{const o=this.tileUrl(e,t,s),n=await fetch(o,{signal:a});if(!n.ok){this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,s);return}const r=await n.blob(),c=await createImageBitmap(r,{colorSpaceConversion:"none"}),{elevations:u,minElevation:h,maxElevation:d}=Vt(c);if(c.close(),this.aabbCache.set(i,{minElevation:h,maxElevation:d}),a.aborted)return;const f=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),p=2304,_=new Uint8Array(p*514),y=new Uint8Array(u.buffer);for(let B=0;B<514;B++)_.set(y.subarray(B*514*4,(B+1)*514*4),B*p);this.device.queue.writeTexture({texture:f},_,{bytesPerRow:p},[514,514]);const g=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:f.createView()}]});this.cache.set(i,{texture:f,bindGroup:g,elevations:u,quadtree:null,minElevation:h,maxElevation:d,lastUsed:performance.now()}),this.onTileResolved&&this.onTileResolved(e,t,s)}catch(o){if(o.name==="AbortError")return;this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,s)}}ensureQuadtree(e,t,s){const i=this.cache.get(this._key(e,t,s));return i?(i.quadtree||(i.quadtree=Xt(i.elevations)),i):null}stripQuadtrees(){for(const[e,t]of this.cache)!this.wantedKeys.has(e)&&t.quadtree&&(t.quadtree=null)}cancelStale(){for(const[e,t]of this.pending)this.wantedKeys.has(e)||t.abort()}evict(){for(;this.cache.size>qt;){let e=null,t=1/0;for(const[i,a]of this.cache)this.wantedKeys.has(i)||a.lastUsed<t&&(t=a.lastUsed,e=i);if(!e)break;const s=this.cache.get(e);s.isFlat||s.texture.destroy(),this.cache.delete(e)}}beginFrame(){this.requestQueue=[],this.wantedKeys=new Set}}const $t=8;class Qt{constructor({tileUrl:e}={}){this.tileUrl=e||((t,s,i)=>`sentinel_tiles/${t}/${s}/${i}.webp`),this.fetched=new Map,this.pending=new Map,this.abortControllers=new Map,this.failed=new Set,this.consumers=new Map,this.terrainToSat=new Map,this.activeRequests=0,this.requestQueue=[],this.onTileLoaded=null,this.bounds=null}setBounds(e){this.bounds=e}_key(e,t,s){return`${e}/${t}/${s}`}getBitmap(e,t,s){return this.fetched.get(this._key(e,t,s))||null}isFailed(e,t,s){return this.failed.has(this._key(e,t,s))}requestTile(e,t,s,i){const a=this._key(e,t,s);let o=this.consumers.get(a);o||(o=new Set,this.consumers.set(a,o)),o.add(i);let n=this.terrainToSat.get(i);if(n||(n=new Set,this.terrainToSat.set(i,n)),n.add(a),!(this.fetched.has(a)||this.failed.has(a)||this.pending.has(a))){if(this.bounds&&this._isOutOfBounds(e,t,s)){this.failed.add(a);return}this.requestQueue.push({z:e,x:t,y:s,key:a}),this._processQueue()}}_isOutOfBounds(e,t,s){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),o=t*a,n=(t+1)*a,r=s*a,c=(s+1)*a;return n<i.minX||o>i.maxX||c<i.minY||r>i.maxY}getConsumers(e,t,s){return this.consumers.get(this._key(e,t,s))||null}removeConsumer(e){const t=this.terrainToSat.get(e);if(t){for(const s of t){const i=this.consumers.get(s);if(i&&(i.delete(e),i.size===0)){this.consumers.delete(s);const a=this.abortControllers.get(s);a&&(a.abort(),this.abortControllers.delete(s));const o=this.fetched.get(s);o&&(o.close(),this.fetched.delete(s))}}this.terrainToSat.delete(e)}}beginFrame(){this.requestQueue=[]}_processQueue(){for(;this.activeRequests<$t&&this.requestQueue.length>0;){const{z:e,x:t,y:s,key:i}=this.requestQueue.shift();if(this.fetched.has(i)||this.pending.has(i)||this.failed.has(i))continue;const a=this.consumers.get(i);if(!a||a.size===0)continue;this.activeRequests++;const o=new AbortController;this.abortControllers.set(i,o);const n=this._loadTile(e,t,s,i,o.signal);this.pending.set(i,n),n.finally(()=>{this.pending.delete(i),this.abortControllers.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,s,i,a){try{const o=this.tileUrl(e,t,s),n=await fetch(o,{signal:a});if(!n.ok){this.failed.add(i);return}const r=await n.blob(),c=await createImageBitmap(r);this.fetched.set(i,c),this.onTileLoaded&&this.onTileLoaded(e,t,s)}catch(o){if(o.name==="AbortError")return;this.failed.add(i)}}}const ae=512,jt=4;class Kt{constructor(e,t,s,i){this.device=e,this.layers=t,this.bindGroupLayout=s,this.sampler=i,this.entries=new Map,this.onUpdate=null;for(const a of t)a.imageryManager.onTileLoaded=(o,n,r)=>this._onSatelliteTileLoaded(a,o,n,r)}_terrainKey(e,t,s){return`${e}/${t}/${s}`}ensureImagery(e,t,s,i){const a=this._terrainKey(e,t,s),o=this.entries.get(a);if(o){o.lastUsed=performance.now();return}const n=new OffscreenCanvas(ae,ae),r=n.getContext("2d"),c=this.device.createTexture({size:[ae,ae],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),u=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:c.createView()},{binding:1,resource:this.sampler}]}),h=this.layers.map(f=>{const p=Math.min(i,f.maxzoom);return{satTiles:kt(e,t,s,p),imageryManager:f.imageryManager}}),d={canvas:n,ctx:r,texture:c,bindGroup:u,layerData:h,tz:e,tx:t,ty:s,needsUpload:!1,hasContent:!1,lastUsed:performance.now()};this.entries.set(a,d);for(const f of h)for(const p of f.satTiles)f.imageryManager.requestTile(p.z,p.x,p.y,a);this._recomposite(d),d.needsUpload&&this._upload(d)}getBindGroup(e,t,s){const i=this.entries.get(this._terrainKey(e,t,s));return i?i.bindGroup:null}hasImagery(e,t,s){const i=this.entries.get(this._terrainKey(e,t,s));return i?i.hasContent:!1}gc(e){for(const[t,s]of this.entries)if(!(e&&e.has(t))){s.texture.destroy();for(const i of s.layerData)i.imageryManager.removeConsumer(t);this.entries.delete(t)}}release(e,t,s){const i=this._terrainKey(e,t,s),a=this.entries.get(i);if(a){a.texture.destroy();for(const o of a.layerData)o.imageryManager.removeConsumer(i);this.entries.delete(i)}}_onSatelliteTileLoaded(e,t,s,i){const a=e.imageryManager.getConsumers(t,s,i);if(a){for(const o of a){const n=this.entries.get(o);n&&(this._recomposite(n),this._upload(n))}this.onUpdate&&this.onUpdate()}}_recomposite(e){const{ctx:t}=e;t.clearRect(0,0,ae,ae),this._fillFromAncestor(e);let s=e.hasContent;for(let i=0;i<this.layers.length;i++){const a=this.layers[i],o=e.layerData[i];t.globalCompositeOperation=a.blend||"source-over",t.globalAlpha=a.opacity!=null?a.opacity:1;for(const n of o.satTiles){const r=o.imageryManager.getBitmap(n.z,n.x,n.y);if(!r)continue;s=!0;const c=Je(e.tz,e.tx,e.ty,n.z,n.x,n.y);t.drawImage(r,c.offsetU*ae,c.offsetV*ae,c.scaleU*ae,c.scaleV*ae)}}t.globalCompositeOperation="source-over",t.globalAlpha=1,s&&(e.needsUpload=!0,e.hasContent=!0)}_fillFromAncestor(e){const{tz:t,tx:s,ty:i,ctx:a}=e;for(let o=1;o<=t-jt;o++){const n=t-o,r=s>>o,c=i>>o,u=this.entries.get(this._terrainKey(n,r,c));if(u&&u.hasContent){const h=Je(t,s,i,n,r,c);a.drawImage(u.canvas,h.offsetU*ae,h.offsetV*ae,h.scaleU*ae,h.scaleV*ae),e.needsUpload=!0,e.hasContent=!0;return}}}_upload(e){this.device.queue.copyExternalImageToTexture({source:e.canvas},{texture:e.texture},[ae,ae]),e.needsUpload=!1}}class Jt{constructor(){this.features=[],this.lineFeatures=[]}async load(e,t={}){let s;typeof e=="string"?s=await(await fetch(e)).json():s=e;const i=t.simplify,a=t.simplifyFn;this.features=[],this.lineFeatures=[];for(const o of s.features)if(o.geometry){if(o.geometry.type==="Point"){const[n,r]=o.geometry.coordinates;this.features.push({mercatorX:Ee(n),mercatorY:Ae(r),lon:n,lat:r,properties:o.properties||{}})}else if(o.geometry.type==="LineString"){let n=o.geometry.coordinates;if(i!=null&&a){const c=n.map(([h,d,f])=>({x:h,y:d,elev:f||0}));n=a(c,i,!0).map(h=>[h.x,h.y,h.elev])}const r=n.map(([c,u,h])=>({mercatorX:Ee(c),mercatorY:Ae(u),elevation:h||0,lon:c,lat:u}));this.lineFeatures.push({coordinates:r,properties:o.properties||{}})}}return this}}const ei=`
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
`,ti=`
struct CircleUniforms {
  projection_view: mat4x4<f32>,
  viewport_size: vec2<f32>,
  pixel_ratio: f32,
  exaggeration: f32,
  atmosphere_opacity: f32,
};

`+ze+`

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
`,Ge=1e4,Oe=14,Le=Oe*4;function ot(l){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(l);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}class ii{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._radius=i["circle-radius"]||4,this._fillColor=ot(i["circle-color"]||"#ff3333"),this._strokeColor=ot(i["circle-stroke-color"]||"#ffffff"),this._strokeWidth=i["circle-stroke-width"]||0,this._opacity=i["circle-opacity"]!=null?i["circle-opacity"]:1,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._pipelineDepthTest=null,this._pipelineNoDepthTest=null,this._instanceBuffer=null,this._instanceData=null,this._uniformBuffer=null,this._uniformBindGroup=null,this._visibleCount=0,this._visibleFeatures=null}init(e,t,s){this._device=e;const i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._instanceData=new Float32Array(Ge*Oe),this._instanceBuffer=e.createBuffer({size:Ge*Le,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});const a=e.createShaderModule({code:ei}),o=e.createShaderModule({code:ti}),n=e.createPipelineLayout({bindGroupLayouts:[t,i]}),r={module:a,entryPoint:"vs_circle",buffers:[{arrayStride:Le,stepMode:"instance",attributes:[{format:"float32x3",offset:0,shaderLocation:0},{format:"float32",offset:12,shaderLocation:1},{format:"float32x4",offset:16,shaderLocation:2},{format:"float32x4",offset:32,shaderLocation:3},{format:"float32",offset:48,shaderLocation:4},{format:"float32",offset:52,shaderLocation:5}]}]},c={module:o,entryPoint:"fs_circle",targets:[{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]};this._pipelineDepthTest=e.createRenderPipeline({layout:n,vertex:r,fragment:c,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"}}),this._pipelineNoDepthTest=e.createRenderPipeline({layout:n,vertex:r,fragment:c,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}})}prepare(e,t,s,i,a,o){const n=this._source.features,r=this._instanceData;let c=0;for(let h=0;h<n.length&&c<Ge;h++){const d=n[h],f=this._queryElevation(d.mercatorX,d.mercatorY);if(f==null||f<=0||this._visibleFeatures&&!this._visibleFeatures.has(h))continue;const p=d.mercatorX,_=f*o*a,y=d.mercatorY,g=e[0]*p+e[4]*_+e[8]*y+e[12],B=e[1]*p+e[5]*_+e[9]*y+e[13],b=e[3]*p+e[7]*_+e[11]*y+e[15];if(b<=0)continue;const m=g/b,S=B/b,E=.2;if(m<-1-E||m>1+E||S<-1-E||S>1+E)continue;const v=c*Oe;r[v]=p,r[v+1]=_,r[v+2]=y,r[v+3]=this._radius,r[v+4]=this._fillColor[0],r[v+5]=this._fillColor[1],r[v+6]=this._fillColor[2],r[v+7]=this._fillColor[3],r[v+8]=this._strokeColor[0],r[v+9]=this._strokeColor[1],r[v+10]=this._strokeColor[2],r[v+11]=this._strokeColor[3],r[v+12]=this._strokeWidth,r[v+13]=this._opacity,c++}this._visibleCount=c,c>0&&this._device.queue.writeBuffer(this._instanceBuffer,0,r.buffer,0,c*Le);const u=new Float32Array(24);u.set(e,0),u[16]=t,u[17]=s,u[18]=i,u[19]=a,u[20]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._uniformBuffer,0,u)}draw(e,t,s=!0){this._visibleCount!==0&&(e.setPipeline(s?this._pipelineDepthTest:this._pipelineNoDepthTest),e.setBindGroup(0,t),e.setBindGroup(1,this._uniformBindGroup),e.setVertexBuffer(0,this._instanceBuffer),e.draw(6,this._visibleCount))}getCollisionItems(e,t,s,i,a,o){const n=this._source.features,r=t/i,c=s/i,u=this._radius+this._strokeWidth,h=[];for(let d=0;d<n.length;d++){const f=n[d],p=this._queryElevation(f.mercatorX,f.mercatorY);if(p==null||p<=0)continue;const _=f.mercatorX,y=p*o*a,g=f.mercatorY,B=e[0]*_+e[4]*y+e[8]*g+e[12],b=e[1]*_+e[5]*y+e[9]*g+e[13],m=e[2]*_+e[6]*y+e[10]*g+e[14],S=e[3]*_+e[7]*y+e[11]*g+e[15];if(S<=0)continue;const E=B/S,v=b/S;E<-1.2||E>1.2||v<-1.2||v>1.2||h.push({layerIndex:-1,featureIndex:d,sourceFeatureIndex:d,screenX:(E*.5+.5)*r,screenY:(.5-v*.5)*c,halfW:u,halfH:u,depth:m/S,clipW:S})}return h}setVisibleFeatures(e){this._visibleFeatures=e}}const Re=96,Se=Re/4;function si(l,e){const{fontAtlas:t,vertexTransform:s=ri,vertexProjection:i=oi,fragmentShaderBody:a=ni,colorTargets:o,depthStencil:n,multisample:r,initialCapacity:c=1024}=e,u=Array.isArray(o)?o:[o];let h=[],d=0,f=!1,p=0,_=c,y=l.createBuffer({label:"gpu-text-characters",size:_*Re,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),g=new Float32Array(_*Se);const B=l.createBuffer({label:"gpu-text-uniforms",size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),b=l.createSampler({label:"gpu-text-sampler",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),m=ai(s,i),S=li(a),E=l.createShaderModule({label:"gpu-text-vertex",code:m}),v=l.createShaderModule({label:"gpu-text-fragment",code:S}),G=l.createRenderPipeline({label:"gpu-text",layout:"auto",vertex:{module:E,entryPoint:"vertexMain"},fragment:{module:v,entryPoint:"fragmentMain",targets:u},primitive:{topology:"triangle-strip",stripIndexFormat:void 0,cullMode:"none"},depthStencil:n,multisample:r}),Y=l.createBindGroup({layout:G.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:B}}]});let U=Q();function Q(){return l.createBindGroup({layout:G.getBindGroupLayout(1),entries:[{binding:0,resource:b},{binding:1,resource:t.textureView},{binding:2,resource:{buffer:y}}]})}let q=-1,w=-1,T=!1;function I(z){let X=0;for(const M of z)t.glyphs.has(M)&&M!==" "&&M!=="	"&&M!==`
`&&X++;return X}function H(z){if(z<=_)return;let X=_;for(;X<z;)X*=2;const M=l.createBuffer({label:"gpu-text-characters",size:X*Re,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),A=new Float32Array(X*Se);A.set(g),p>0&&l.queue.writeBuffer(M,0,A,0,p*Se),y.destroy(),y=M,g=A,_=X,U=Q()}function ee(z,X){let M=0,A=0,K=0;for(const D of z){if(D===" "){const ne=t.glyphs.get(" ");M+=ne?ne.xAdvance*X:t.fontSize*.3*X;continue}if(D==="	"){const ne=t.glyphs.get(" "),ye=ne?ne.xAdvance:t.fontSize*.3;M+=ye*4*X;continue}if(D===`
`)continue;const se=t.glyphs.get(D);if(!se)continue;M+=se.xAdvance*X;const oe=-se.yOffset*X,ie=se.height*X-oe;A=Math.max(A,oe),K=Math.max(K,ie)}return{width:M,ascent:A,descent:K}}function O(z){const{text:X,anchor:M,offset:A,fontSize:K,color:D,strokeColor:se,strokeWidth:oe,bufferOffset:ie,align:ne,baseline:ye}=z,Fe=K/t.fontSize,x=t.width,k=t.height,C=ee(X,1);let F=0;ne==="center"?F=-C.width/2:ne==="right"&&(F=-C.width);let R=0;ye==="top"?R=C.ascent:ye==="middle"?R=(C.ascent-C.descent)/2:ye==="bottom"&&(R=-C.descent);let P=F,Z=R,j=0;for(const $ of X){if($===" "){const te=t.glyphs.get(" ");te?P+=te.xAdvance:P+=t.fontSize*.3;continue}if($==="	"){const te=t.glyphs.get(" "),ce=te?te.xAdvance:t.fontSize*.3;P+=ce*4;continue}if($===`
`)continue;const N=t.glyphs.get($);if(!N)continue;const W=(ie+j)*Se;g[W+0]=N.x/x,g[W+1]=N.y/k,g[W+2]=(N.x+N.width)/x,g[W+3]=(N.y+N.height)/k,g[W+4]=D[0],g[W+5]=D[1],g[W+6]=D[2],g[W+7]=D[3],g[W+8]=M[0],g[W+9]=M[1],g[W+10]=M[2],g[W+11]=M[3],g[W+12]=se[0],g[W+13]=se[1],g[W+14]=se[2],g[W+15]=se[3],g[W+16]=P+N.xOffset,g[W+17]=Z+N.yOffset,g[W+18]=A[0],g[W+19]=A[1],g[W+20]=N.width,g[W+21]=N.height,g[W+22]=Fe,g[W+23]=oe,P+=N.xAdvance,j++}const V=ie*Re,J=ie*Se;l.queue.writeBuffer(y,V,g,J,z.characterCount*Se),z.dirty=!1}function L(){if(!f)return;const z=h.filter(M=>!M.destroyed);let X=0;for(const M of z)M.bufferOffset!==X&&(M.bufferOffset=X,M.dirty=!0),X+=M.characterCount;p=X,h=z;for(const M of h)M.dirty&&O(M);f=!1}function fe(z){return z.length===2?[z[0],z[1],0,1]:z.length===3?[z[0],z[1],z[2],1]:[z[0],z[1],z[2],z[3]]}return{createSpan(z){const X=I(z.text);H(p+X);const M={id:d++,text:z.text,anchor:fe(z.position),offset:z.offset??[0,0],fontSize:z.fontSize??t.fontSize,color:z.color?[...z.color]:[1,1,1,1],strokeColor:z.strokeColor?[...z.strokeColor]:[0,0,0,0],strokeWidth:z.strokeWidth??0,align:z.align??"left",baseline:z.baseline??"baseline",bufferOffset:p,characterCount:X,destroyed:!1,dirty:!0};return h.push(M),p+=X,O(M),{setText(A){if(M.destroyed)return;const K=I(A);K!==M.characterCount?(M.destroyed=!0,f=!0,L(),H(p+K),M.destroyed=!1,M.text=A,M.characterCount=K,M.bufferOffset=p,M.dirty=!0,h.push(M),p+=K):(M.text=A,M.dirty=!0),O(M)},setPosition(A){M.destroyed||(M.anchor=fe(A),M.dirty=!0,O(M))},setOffset(A){M.destroyed||(M.offset=[...A],M.dirty=!0,O(M))},setFontSize(A){M.destroyed||(M.fontSize=A,M.dirty=!0,O(M))},setColor(A){M.destroyed||(M.color=[...A],M.dirty=!0,O(M))},setStrokeColor(A){M.destroyed||(M.strokeColor=[...A],M.dirty=!0,O(M))},setStrokeWidth(A){M.destroyed||(M.strokeWidth=A,M.dirty=!0,O(M))},setAlign(A){M.destroyed||(M.align=A,M.dirty=!0,O(M))},setBaseline(A){M.destroyed||(M.baseline=A,M.dirty=!0,O(M))},getText(){return M.text},getCharacterCount(){return M.characterCount},destroy(){M.destroyed||(M.destroyed=!0,f=!0)},isDestroyed(){return M.destroyed}}},getBindGroupLayout(z){return G.getBindGroupLayout(z)},updateUniforms(z){const{resolution:X,viewMatrix:M}=z;if(!T||X[0]!==q||X[1]!==w||M!==void 0){const K=new ArrayBuffer(96),D=new Float32Array(K);D[0]=X[0],D[1]=X[1],D[2]=1,D[3]=t.fieldRange??4,D[4]=t.width,D[5]=t.height,D[6]=0,D[7]=0,M?D.set(M,8):(D[8]=1,D[9]=0,D[10]=0,D[11]=0,D[12]=0,D[13]=1,D[14]=0,D[15]=0,D[16]=0,D[17]=0,D[18]=1,D[19]=0,D[20]=0,D[21]=0,D[22]=0,D[23]=1),l.queue.writeBuffer(B,0,K),q=X[0],w=X[1],T=!0}},compact:L,draw(z,X,M=[]){if(f&&L(),X.skipUniformUpdate||this.updateUniforms(X),p!==0){z.setPipeline(G),z.setBindGroup(0,Y),z.setBindGroup(1,U);for(let A=0;A<M.length;A++)z.setBindGroup(A+2,M[A]);z.draw(4,p)}},getTotalCharacterCount(){return p},destroy(){y.destroy(),B.destroy()}}}const ri=`
fn getVertex(position: vec4f) -> vec4f {
  return uniforms.viewMatrix * position;
}
`,oi=`
fn projectVertex(position: vec3f, uv: vec2f, color: vec4f) -> vec4f {
  // Convert screen pixels to clip space (NDC with Y flipped)
  let x = position.x / uniforms.resolution.x * 2.0 - 1.0;
  let y = 1.0 - position.y / uniforms.resolution.y * 2.0;
  return vec4f(x, y, position.z, 1.0);
}
`,ni=`
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
`;function ai(l,e){return`
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
${l}

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
`}function li(l){return`
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

${l}

@fragment
fn fragmentMain(input: FragmentInput) -> @location(0) vec4f {
  // Sample the MSDF/MTSDF texture (all four channels)
  // RGB: multi-channel SDF for sharp fill edges
  // A: true SDF for strokes (in MTSDF format) or 1.0 (in plain MSDF)
  let msdf = textureSample(fontAtlas, fontSampler, input.uv);

  return getColor(input.uv, input.color, input.strokeColor, input.strokeWidth, msdf, input.anchor);
}
`}async function ci(l,e){const{atlasUrl:t,metadataUrl:s}=e,[i,a]=await Promise.all([fetch(s),fetch(t)]);if(!i.ok)throw new Error(`Failed to load atlas metadata: ${i.statusText}`);if(!a.ok)throw new Error(`Failed to load atlas image: ${a.statusText}`);const o=await i.json(),n=await a.blob(),r=await createImageBitmap(n),c=l.createTexture({label:"font-atlas-msdf",size:[o.width,o.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});l.queue.copyExternalImageToTexture({source:r},{texture:c},[o.width,o.height]);const u=document.createElement("canvas");u.width=o.width,u.height=o.height,u.getContext("2d").drawImage(r,0,0);const d=new Map;for(const f of o.glyphs)d.set(f.char,{char:f.char,x:f.x,y:f.y,width:f.width,height:f.height,xOffset:f.xOffset,yOffset:f.yOffset,xAdvance:f.xAdvance});return{texture:c,textureView:c.createView(),width:o.width,height:o.height,lineHeight:o.lineHeight,fontSize:o.fontSize,fieldRange:o.fieldRange??4,glyphs:d,debugCanvas:u}}function nt(l){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(l);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const ui=`
${ze}

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
`;class fi{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._textField=i["text-field"]||"name",this._fontSize=i["text-size"]||12,this._color=nt(i["text-color"]||"#ffffff"),this._strokeColor=nt(i["text-halo-color"]||"#000000"),this._strokeWidth=i["text-halo-width"]!=null?i["text-halo-width"]:1.5,this._offset=i["text-offset"]||[0,-10],this._align=i["text-align"]||"center",this._baseline=i["text-baseline"]||"bottom",this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._textContext=null,this._spans=[],this._ready=!1,this._visibleFeatures=null,this._fontAtlas=null,this._atmosphereBindGroup=null,this._textAtmosBuffer=null,this._textAtmosData=new Float32Array(4),this._lastScaledStrokeWidth=null}init(e,t,s,i,a){this._device=e,this._fontAtlas=t,this._textContext=si(e,{fontAtlas:t,fragmentShaderBody:ui,colorTargets:{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},depthStencil:{format:i,depthWriteEnabled:!1,depthCompare:"always"}}),this._textAtmosBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const o=this._textContext.getBindGroupLayout(2);this._atmosphereBindGroup=e.createBindGroup({layout:o,entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:this._textAtmosBuffer}}]});const n=this._fontSize/t.fontSize;for(let r=0;r<this._source.features.length;r++){const c=this._source.features[r],u=c.properties[this._textField];if(!u)continue;const h=this._textContext.createSpan({text:String(u),position:[0,0,0],fontSize:this._fontSize,color:this._color,strokeColor:this._strokeColor,strokeWidth:this._strokeWidth,offset:this._offset,align:this._align,baseline:this._baseline}),d=String(u);let f=0,p=0,_=0;for(const y of d){const g=t.glyphs.get(y);if(!g)continue;f+=g.xAdvance*n;const B=-g.yOffset*n,b=g.height*n-B;B>p&&(p=B),b>_&&(_=b)}this._spans.push({span:h,feature:c,sourceIndex:r,textWidth:f,ascent:p,descent:_})}this._ready=!0}prepare(e,t,s,i,a,o){if(!this._ready)return;const n=this._strokeWidth*i;if(n!==this._lastScaledStrokeWidth){this._lastScaledStrokeWidth=n;for(const{span:h}of this._spans)h.setStrokeWidth(n)}for(let h=0;h<this._spans.length;h++){const{span:d,feature:f}=this._spans[h];if(this._visibleFeatures&&!this._visibleFeatures.has(h)){d.setPosition([0,0,0,0]);continue}const p=f,_=this._queryElevation(p.mercatorX,p.mercatorY);if(_==null||_<=0){d.setPosition([0,0,0,0]);continue}const y=p.mercatorX,g=_*o*a,B=p.mercatorY;if(e[3]*y+e[7]*g+e[11]*B+e[15]<=0){d.setPosition([0,0,0,0]);continue}d.setPosition([y,g,B,1])}const r=t/i,c=s/i;this._textContext.updateUniforms({resolution:[r,c],viewMatrix:e});const u=this._textAtmosData;u[0]=a,u[1]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._textAtmosBuffer,0,u)}draw(e){this._ready&&this._textContext.getTotalCharacterCount()!==0&&this._textContext.draw(e,{resolution:[1,1],skipUniformUpdate:!0},[this._atmosphereBindGroup])}getCollisionItems(e,t,s,i,a,o){if(!this._ready)return[];const n=t/i,r=s/i,c=[];for(let u=0;u<this._spans.length;u++){const{feature:h,sourceIndex:d,textWidth:f,ascent:p,descent:_}=this._spans[u],y=h,g=this._queryElevation(y.mercatorX,y.mercatorY);if(g==null||g<=0)continue;const B=y.mercatorX,b=g*o*a,m=y.mercatorY,S=e[0]*B+e[4]*b+e[8]*m+e[12],E=e[1]*B+e[5]*b+e[9]*m+e[13],v=e[2]*B+e[6]*b+e[10]*m+e[14],G=e[3]*B+e[7]*b+e[11]*m+e[15];if(G<=0)continue;const Y=S/G,U=E/G;if(Y<-1.2||Y>1.2||U<-1.2||U>1.2)continue;let Q=(Y*.5+.5)*n+this._offset[0],q=(.5-U*.5)*r+this._offset[1];const w=f/2,T=(p+_)/2;this._align==="left"?Q+=w:this._align==="right"&&(Q-=w),this._baseline==="top"?q+=T:this._baseline==="bottom"&&(q-=T),c.push({layerIndex:-1,featureIndex:u,sourceFeatureIndex:d,screenX:Q,screenY:q,halfW:w,halfH:T,depth:v/G,clipW:G})}return c}setVisibleFeatures(e){this._visibleFeatures=e}destroy(){this._textContext&&this._textContext.destroy(),this._textAtmosBuffer&&this._textAtmosBuffer.destroy()}}function at(l){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(l);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const hi=`
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
`,di=`
${ze}

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
`,lt=128;class pi{constructor(e,t,s){this._source=t,this._queryElevation=s;const i=e.paint||{};this._lineColor=at(i["line-color"]||"#ff8800"),this._borderColor=at(i["line-border-color"]||"#331100"),this._lineWidth=i["line-width"]||3,this._borderWidth=i["line-border-width"]||0,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._gpuLines=null,this._positionBuffer=null,this._uniformBuffer=null,this._sharedBindGroup=null,this._polylines=[],this._positionData=null,this._cachedElevations=null,this._elevationsDirty=!0,this._lastExaggeration=-1,this._positionsDirty=!0,this._device=null}init(e,t,s,i){this._device=e,this._globalUniformBuffer=s,this._depthOffset=4e-7,this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"square",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:hi,fragmentShaderBody:di})}_ensureBuffers(){if(this._positionBuffer)return;const e=this._source.lineFeatures;if(e.length===0)return;const t=this._device,s=16;let i=0;for(const o of e)i=Math.ceil(i/s)*s,i+=o.coordinates.length;if(i===0)return;this._positionBuffer=t.createBuffer({size:i*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._positionData=new Float32Array(i*4),this._cachedElevations=new Float32Array(i);let a=0;for(const o of e){a=Math.ceil(a/s)*s;const n=o.coordinates.length,r=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer,offset:a*16,size:n*16}}]});this._polylines.push({offset:a,count:n,feature:o,dataBindGroup:r}),a+=n}this._uniformBuffer=t.createBuffer({size:lt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}},{binding:1,resource:{buffer:this._globalUniformBuffer}}]})}invalidateElevations(){this._elevationsDirty=!0}prepare(e,t,s,i,a,o){if(!this._gpuLines||(this._ensureBuffers(),this._polylines.length===0))return;if(this._elevationsDirty){const r=this._cachedElevations;for(const c of this._polylines)for(let u=0;u<c.count;u++){const h=c.feature.coordinates[u],d=this._queryElevation(h.mercatorX,h.mercatorY);d!=null&&d>0&&r[c.offset+u]!==d&&(r[c.offset+u]=d,this._positionsDirty=!0)}this._elevationsDirty=!1}if(this._positionsDirty||a!==this._lastExaggeration||o!==this._lastGlobalElevScale){const r=this._positionData,c=this._cachedElevations;for(const u of this._polylines)for(let h=0;h<u.count;h++){const d=u.feature.coordinates[h],f=c[u.offset+h],p=(u.offset+h)*4;f==null||f<=0?(r[p]=d.mercatorX,r[p+1]=0,r[p+2]=d.mercatorY,r[p+3]=1):(r[p]=d.mercatorX,r[p+1]=(f+3)*o*a,r[p+2]=d.mercatorY,r[p+3]=1)}this._device.queue.writeBuffer(this._positionBuffer,0,r),this._lastExaggeration=a,this._lastGlobalElevScale=o,this._positionsDirty=!1}const n=new Float32Array(lt/4);n.set(e,0),n[16]=this._lineColor[0],n[17]=this._lineColor[1],n[18]=this._lineColor[2],n[19]=this._lineColor[3],n[20]=this._borderColor[0],n[21]=this._borderColor[1],n[22]=this._borderColor[2],n[23]=this._borderColor[3],n[24]=this._lineWidth,n[25]=this._borderWidth,n[26]=i,n[27]=a,n[28]=this._atmosphereOpacity,n[29]=this._depthOffset,this._device.queue.writeBuffer(this._uniformBuffer,0,n),this._canvasW=t,this._canvasH=s}draw(e){if(!(!this._gpuLines||this._polylines.length===0))for(const t of this._polylines)this._gpuLines.draw(e,{vertexCount:t.count,resolution:[this._canvasW,this._canvasH]},[t.dataBindGroup,this._sharedBindGroup])}destroy(){this._gpuLines&&this._gpuLines.destroy(),this._positionBuffer&&this._positionBuffer.destroy(),this._uniformBuffer&&this._uniformBuffer.destroy()}}function De(l,e,t){this.aabb=new t(6),this.startIndex=l,this.endIndex=e,this.node0=null,this.node1=null}const Be=[],ge=[],xe=[],Ce=[];function ct(l,e,t,s,i,a,o){let n,r;if(s!==0){let c=(o[0]-l)/s,u=(o[3]-l)/s;if(c>u){const h=c;c=u,u=h}n=c,r=u}else{if(l<o[0]||l>o[3])return null;n=-1/0,r=1/0}if(i!==0){let c=(o[1]-e)/i,u=(o[4]-e)/i;if(c>u){const h=c;c=u,u=h}c>n&&(n=c),u<r&&(r=u)}else if(e<o[1]||e>o[4])return null;if(n>r)return null;if(a!==0){let c=(o[2]-t)/a,u=(o[5]-t)/a;if(c>u){const h=c;c=u,u=h}c>n&&(n=c),u<r&&(r=u)}else if(t<o[2]||t>o[5])return null;return n>r||r<0?null:[n,r]}class _i{constructor(e,{epsilon:t=1e-6,maxItemsPerNode:s=10}={}){this._aabbs=e;const i=this._aabbs.length/6;this._epsilon=t,this._maxItemsPerNode=s,this._aabbTypeCtor=Float64Array;const a=Uint32Array;this._idArray=new a(i);for(var o=0;o<i;o++)this._idArray[o]=o;this.root=new De(0,i,this._aabbTypeCtor),this.computeExtents(this.root),this._nodeSplitPtr=0,Be.length=0,Be[0]=this.root;let n=0;for(;this._nodeSplitPtr>=0&&n++<1e6;)this.splitNode(Be[this._nodeSplitPtr--]);if(n>1e6)throw new Error("Uh-oh, it seems like BVH construction ran into an infinite loop.");Be.length=0}computeExtents(e){const t=e.aabb;let s=1/0,i=1/0,a=1/0,o=-1/0,n=-1/0,r=-1/0;for(let _=e.startIndex*6,y=e.endIndex*6;_<y;_+=6)s=Math.min(this._aabbs[_],s),i=Math.min(this._aabbs[_+1],i),a=Math.min(this._aabbs[_+2],a),o=Math.max(this._aabbs[_+3],o),n=Math.max(this._aabbs[_+4],n),r=Math.max(this._aabbs[_+5],r);const c=(o+s)*.5,u=(n+i)*.5,h=(r+a)*.5,d=Math.max((o-s)*.5,this._epsilon)*(1+this._epsilon),f=Math.max((n-i)*.5,this._epsilon)*(1+this._epsilon),p=Math.max((r-a)*.5,this._epsilon)*(1+this._epsilon);t[0]=c-d,t[1]=u-f,t[2]=h-p,t[3]=c+d,t[4]=u+f,t[5]=h+p}splitNode(e){let t,s,i;const a=e.startIndex,o=e.endIndex,n=o-a;if(n<=this._maxItemsPerNode||n===0)return;const r=this._aabbs,c=this._idArray;xe[0]=e.aabb[0]+e.aabb[3],xe[1]=e.aabb[1]+e.aabb[4],xe[2]=e.aabb[2]+e.aabb[5];let u=0,h=0,d=0,f=0,p=0,_=0;for(t=a*6,s=o*6;t<s;t+=6)r[t]+r[t+3]<xe[0]?u++:f++,r[t+1]+r[t+4]<xe[1]?h++:p++,r[t+2]+r[t+5]<xe[2]?d++:_++;if(ge[0]=u===0||f===0,ge[1]=h===0||p===0,ge[2]=d===0||_===0,ge[0]&&ge[1]&&ge[2])return;const y=e.aabb[3]-e.aabb[0],g=e.aabb[4]-e.aabb[1],B=e.aabb[5]-e.aabb[2];let b;if(y>=g&&y>=B?b=0:g>=B?b=1:b=2,ge[b]&&(b===0?b=g>=B?1:2:b===1?b=y>=B?0:2:b=y>=g?0:1,ge[b])){b=3-b-(b===0||b===2?1:0);for(let ne=0;ne<3;ne++)if(!ge[ne]){b=ne;break}}let m,S,E,v,G=1/0,Y=1/0,U=1/0,Q=-1/0,q=-1/0,w=-1/0,T=1/0,I=1/0,H=1/0,ee=-1/0,O=-1/0,L=-1/0;const fe=xe[b];for(m=a*6,E=(o-1)*6,S=a,v=o-1;m<=E;m+=6,S++)r[m+b]+r[m+b+3]>=fe?(i=c[S],c[S]=c[v],c[v]=i,i=r[m],T=Math.min(T,i),r[m]=r[E],r[E]=i,i=r[m+1],I=Math.min(I,i),r[m+1]=r[E+1],r[E+1]=i,i=r[m+2],H=Math.min(H,i),r[m+2]=r[E+2],r[E+2]=i,i=r[m+3],ee=Math.max(ee,i),r[m+3]=r[E+3],r[E+3]=i,i=r[m+4],O=Math.max(O,i),r[m+4]=r[E+4],r[E+4]=i,i=r[m+5],L=Math.max(L,i),r[m+5]=r[E+5],r[E+5]=i,S--,v--,m-=6,E-=6):(G=Math.min(G,r[m]),Y=Math.min(Y,r[m+1]),U=Math.min(U,r[m+2]),Q=Math.max(Q,r[m+3]),q=Math.max(q,r[m+4]),w=Math.max(w,r[m+5]));e.startIndex=e.endIndex=-1;const z=e.node0=new De(a,S,this._aabbTypeCtor),X=e.node1=new De(S,o,this._aabbTypeCtor);let M,A,K,D,se,oe;const ie=this._epsilon;M=(Q+G)*.5,A=(q+Y)*.5,K=(w+U)*.5,D=Math.max((Q-G)*.5,ie)*(1+ie),se=Math.max((q-Y)*.5,ie)*(1+ie),oe=Math.max((w-U)*.5,ie)*(1+ie),z.aabb[0]=M-D,z.aabb[1]=A-se,z.aabb[2]=K-oe,z.aabb[3]=M+D,z.aabb[4]=A+se,z.aabb[5]=K+oe,M=(ee+T)*.5,A=(O+I)*.5,K=(L+H)*.5,D=Math.max((ee-T)*.5,ie)*(1+ie),se=Math.max((O-I)*.5,ie)*(1+ie),oe=Math.max((L-H)*.5,ie)*(1+ie),X.aabb[0]=M-D,X.aabb[1]=A-se,X.aabb[2]=K-oe,X.aabb[3]=M+D,X.aabb[4]=A+se,X.aabb[5]=K+oe,S-a>this._maxItemsPerNode&&(Be[++this._nodeSplitPtr]=e.node0),o-S>this._maxItemsPerNode&&(Be[++this._nodeSplitPtr]=e.node1)}test(e,t){Ce.length=0;var s=0;for(Ce[0]=this.root;s>=0;){var i=Ce[s--];if(e(i.aabb)){i.node0&&(Ce[++s]=i.node0),i.node1&&(Ce[++s]=i.node1);for(var a=i.startIndex;a<i.endIndex;a++)t(this._idArray[a])}}Ce.length=0}rayIntersect(e,t,s,i,a,o){const n=[],r=[];let c=0;for(r[c++]=this.root;c>0;){const u=r[--c];if(ct(e,t,s,i,a,o,u.aabb)){u.node0&&(r[c++]=u.node0),u.node1&&(r[c++]=u.node1);for(let d=u.startIndex;d<u.endIndex;d++){const f=this._idArray[d],p=d*6,_=[this._aabbs[p],this._aabbs[p+1],this._aabbs[p+2],this._aabbs[p+3],this._aabbs[p+4],this._aabbs[p+5]],y=ct(e,t,s,i,a,o,_);y&&n.push({index:f,tNear:Math.max(y[0],0)})}}}return n.sort((u,h)=>u.tNear-h.tNear),n}traversePreorder(e){const t=[];let s=this.root;for(;t.length||s;){for(;s;){const i=e(s)!==!1;i&&s.node1&&t.push(s.node1),s=i&&s.node0}t.length&&(s=t.pop())}}traverseInorder(e){const t=[];let s=this.root;for(;s||t.length;){for(;s;)t.push(s),s=s.node0;s=t[t.length-1],t.pop(),e(s),s=s.node1}}traversePostorder(e){const t=[this.root];let s=null;for(;t.length;){const i=t[t.length-1];!s||s.node0===i||s.node1===i?i.node0?t.push(i.node0):i.node1?t.push(i.node1):(t.pop(),e(i)):i.node0===s?i.node0?t.push(i.node1):(t.pop(),e(i)):i.node1===s&&(t.pop(),e(i)),s=i}}}function Xe(l,e,t){const s=t;function i(f,p,_){const y=s[0]*f+s[4]*p+s[8]*_+s[12],g=s[1]*f+s[5]*p+s[9]*_+s[13],B=s[2]*f+s[6]*p+s[10]*_+s[14],b=s[3]*f+s[7]*p+s[11]*_+s[15];return[y/b,g/b,B/b]}const a=i(l,e,0),o=i(l,e,1),n=new Float64Array(a),r=o[0]-a[0],c=o[1]-a[1],u=o[2]-a[2],h=Math.sqrt(r*r+c*c+u*u),d=new Float64Array([r/h,c/h,u/h]);return{origin:n,direction:d}}function mt({origin:l,direction:e,bvh:t,tileCache:s,tileList:i,verticalExaggeration:a}){const o=l[0],n=l[1],r=l[2],c=e[0],u=e[1],h=e[2],d=t.rayIntersect(o,n,r,c,u,h);if(d.length===0)return null;let f=1/0,p=null,_=null;for(let y=0;y<d.length;y++){const{index:g,tNear:B}=d[y];if(B>=f)break;const b=i[g];if(!b)continue;const m=s.ensureQuadtree(b.z,b.x,b.y);if(!m)continue;const{quadtree:S,elevations:E}=m,Y=Ye(b.z,b.y)*a,U=512*(1<<b.z),Q=b.x/(1<<b.z),q=b.y/(1<<b.z),w=(o-Q)*U,T=n/Y,I=(r-q)*U,H=c*U,ee=u/Y,O=h*U,L=Wt(S.minElev,S.maxElev,E,w,T,I,H,ee,O);if(!L)continue;const fe=w+H*L.t,z=T+ee*L.t,X=I+O*L.t,M=fe/U+Q,A=z*Y,K=X/U+q;let D;const se=Math.abs(c),oe=Math.abs(u),ie=Math.abs(h);se>=oe&&se>=ie?D=(M-o)/c:oe>=ie?D=(A-n)/u:D=(K-r)/h,D>0&&D<f&&(f=D,p=[M,A,K],_=b)}return p?{worldPos:p,t:f,tile:_}:null}function mi(l){const e=[[-60,0],[-45,1500],[-30,2800],[-15,3800],[0,4e3],[15,4100],[30,4200],[40,3500],[50,2300],[60,1e3],[65,500],[70,0]];if(l<=e[0][0])return e[0][1];if(l>=e[e.length-1][0])return e[e.length-1][1];for(let t=1;t<e.length;t++)if(l<=e[t][0]){const s=(l-e[t-1][0])/(e[t][0]-e[t-1][0]);return e[t-1][1]+s*(e[t][1]-e[t-1][1])}return 0}function gi(l={}){return new Proxy({verticalExaggeration:1,densityThreshold:3,showTileBorders:!1,freezeCoverage:!1,enableCollision:!0,showCollisionBoxes:!1,showWireframe:!1,showImagery:!0,showFeatures:!0,showRoute:!0,slopeAngleOpacity:0,slopeAspectMaskAbove:0,slopeAspectMaskNear:0,slopeAspectMaskBelow:0,slopeAspectOpacity:.95,treelineLower:2e3,treelineUpper:2500,contourOpacity:1,collisionBuffer:4,occlusionBias:.03,atmosphereDensity:.35,hillshadeOpacity:.95,sunDirection:[.5,.7,.5],dirty:!0,...l},{set(e,t,s){return t!=="dirty"&&e[t]!==s&&(e.dirty=!0),e[t]=s,!0}})}function yi(l){const e=document.createElement("div");return e.className="terrain-attribution",e.innerHTML=l.filter(t=>t.attribution).map(t=>t.attribution).join(" | "),e}function vi(l){return l*360-180}function xi(l){return Math.atan(Math.sinh(Math.PI*(1-2*l)))*180/Math.PI}function bi(l){return(Math.atan2(-Math.cos(l),Math.sin(l))*180/Math.PI%360+360)%360}function wi(l){const e=l*Math.PI/180;return Math.atan2(Math.cos(e),-Math.sin(e))}function Ti(l){const{center:e,distance:t,phi:s,theta:i}=l,a=vi(e[0]),o=xi(e[2]),n=bi(s),r=i*180/Math.PI;return`#${a.toFixed(5)}/${o.toFixed(5)}/${n.toFixed(1)}/${r.toFixed(1)}/${t.toPrecision(6)}/${e[1].toPrecision(6)}`}function Mi(l){if(!l||l.length<2)return null;const e=l.slice(1).split("/").map(Number);if(e.length<5||e.some(isNaN))return null;const[t,s,i,a,o,n]=e;return!isFinite(t)||!isFinite(s)||!isFinite(i)||!isFinite(a)||!isFinite(o)||o<=0?null:{center:[Ee(t),isFinite(n)?n:0,Ae(s)],distance:o,phi:wi(i),theta:a*Math.PI/180}}class Si{constructor(e,t,s,i){this._device=e,this._pixelRatio=s;const a=`
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
}`;this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"round",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:a,fragmentShaderBody:o}),this._uniformBuffer=e.createBuffer({size:112,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=e.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._positionBuffer=null,this._dataBindGroup=null,this._vertexCount=0,this._frozen=!1,this._coverageProjView=null}get isFrozen(){return this._frozen}get coverageProjView(){return this._coverageProjView}freeze(e){this._frozen=!0,this._coverageProjView=new Float32Array(e);const t=new Float32Array(16);Pe(t,this._coverageProjView);const s=Mt(t),i=20,a=[],o=h=>[s[h*3],s[h*3+1],s[h*3+2],1],n=()=>a.push([0,0,0,0]),r=h=>a.push(o(h)),c=(h,d)=>{n();const f=o(h),p=o(d);for(let _=0;_<=i;_++){const y=_/i;a.push([f[0]+(p[0]-f[0])*y,f[1]+(p[1]-f[1])*y,f[2]+(p[2]-f[2])*y,1])}};n(),r(0),r(1),r(2),r(3),r(0),n(),r(4),r(5),r(6),r(7),r(4),c(0,4),c(1,5),c(2,6),c(3,7),n();const u=new Float32Array(a.length*4);for(let h=0;h<a.length;h++)u[h*4]=a[h][0],u[h*4+1]=a[h][1],u[h*4+2]=a[h][2],u[h*4+3]=a[h][3];this._vertexCount=a.length,this._positionBuffer=this._device.createBuffer({size:u.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._positionBuffer,0,u),this._dataBindGroup=this._device.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer}}]})}unfreeze(){this._frozen=!1,this._coverageProjView=null,this._positionBuffer&&(this._positionBuffer.destroy(),this._positionBuffer=null),this._dataBindGroup=null}draw(e,t,s,i){if(!this._frozen||!this._positionBuffer)return;const a=new Float32Array(112/4);a.set(t,0),a[16]=0,a[17]=.5,a[18]=.15,a[19]=1,a[20]=1,a[21]=1,a[22]=1,a[23]=1,a[24]=4,a[25]=1.5,a[26]=this._pixelRatio,this._device.queue.writeBuffer(this._uniformBuffer,0,a),this._gpuLines.draw(e,{vertexCount:this._vertexCount,resolution:[s,i]},[this._dataBindGroup,this._sharedBindGroup])}destroy(){this._positionBuffer&&this._positionBuffer.destroy(),this._gpuLines.destroy(),this._uniformBuffer.destroy()}}function Bi(l,e=0,t=1/0,s=1/0){l.sort((o,n)=>o.depth-n.depth);const i=[],a=new Map;for(const o of l){const n=o.screenX-o.halfW-e,r=o.screenX+o.halfW+e,c=o.screenY-o.halfH-e,u=o.screenY+o.halfH+e;let h=n<0||r>t||c<0||u>s;if(!h)for(let d=0;d<i.length;d++){const f=i[d];if(n<f.maxX&&r>f.minX&&c<f.maxY&&u>f.minY){h=!0;break}}if(h){o.visible=!1;let d=a.get(o.layerIndex);d||(d=new Set,a.set(o.layerIndex,d)),d.add(o.featureIndex)}else o.visible=!0,i.push({minX:o.screenX-o.halfW,maxX:o.screenX+o.halfW,minY:o.screenY-o.halfH,maxY:o.screenY+o.halfH})}return{items:l,hiddenByLayer:a}}const Ci=`
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
`,ut=1e4,Ei=8,ft=6,ht=1e3;class Ai{constructor(e,t){this._device=e,this._lastCollisionTime=0,this._collisionStale=!1,this._collisionScheduled=!1,this._collisionTimer=null,this._debugItems=null;const s=e.createShaderModule({code:Ci}),i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._vertexBuffer=e.createBuffer({size:ut*Ei*ft*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this._linePipeline=e.createRenderPipeline({layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:s,entryPoint:"vs_colored_line",buffers:[{arrayStride:ft*4,attributes:[{format:"float32x2",offset:0,shaderLocation:0},{format:"float32x4",offset:8,shaderLocation:1}]}]},fragment:{module:s,entryPoint:"fs_colored_line",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"line-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._invProjView=new Float32Array(16)}markStale(){this._debugItems||(this._collisionStale=!0)}update({enabled:e,layers:t,projectionView:s,canvasW:i,canvasH:a,pixelRatio:o,exaggeration:n,collisionBuffer:r,occlusionBias:c,bvh:u,tileManager:h,bvhTileList:d,globalElevScale:f}){const p=performance.now();if(!e){if(this._debugItems){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:y}of t)y.setVisibleFeatures(null)}return!1}const _=p-this._lastCollisionTime;return _>=ht||this._collisionStale?(this._doCollision(t,s,i,a,o,n,r,c,u,h,d,f),this._lastCollisionTime=p,this._collisionStale=!1,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null),!0):(this._collisionScheduled||(this._collisionScheduled=!0,this._collisionTimer=setTimeout(()=>{this._collisionScheduled=!1,this._collisionTimer=null,this._wakeCallback?.()},ht-_)),!1)}set onWake(e){this._wakeCallback=e}_doCollision(e,t,s,i,a,o,n,r,c,u,h,d){const f=[];let p=0;for(const{layer:m,collision:S,sourceId:E}of e){if(S){const v=m.getCollisionItems(t,s,i,a,o,d);for(const G of v)G.layerIndex=p,G.sourceId=E;f.push(...v)}p++}const _=s/a,y=i/a;if(c&&f.length>0){Pe(this._invProjView,t);const m=t;for(const S of f){const E=S.screenX/_*2-1,v=1-S.screenY/y*2,G=Xe(E,v,this._invProjView),Y=mt({origin:G.origin,direction:G.direction,bvh:c,tileCache:u,tileList:h,verticalExaggeration:o});if(Y){const[U,Q,q]=Y.worldPos;m[3]*U+m[7]*Q+m[11]*q+m[15]<S.clipW*(1-r)&&(S.occluded=!0)}}}const g=[];for(const m of f)m.occluded||g.push(m);Bi(g,n,_,y);const B=new Map;for(const m of f)if(m.occluded||!m.visible){let S=B.get(m.sourceId);S||(S=new Set,B.set(m.sourceId,S)),S.add(m.sourceFeatureIndex)}const b=new Map;for(const m of f){const S=B.get(m.sourceId);if(S&&S.has(m.sourceFeatureIndex))m.occluded||(m.visible=!1);else{let E=b.get(m.layerIndex);E||(E=new Set,b.set(m.layerIndex,E)),E.add(m.featureIndex)}}this._debugItems=f,p=0;for(const{layer:m,collision:S}of e)m.setVisibleFeatures(S?b.get(p)||new Set:null),p++}drawDebug(e,t,s,i,a){if(!this._debugItems||this._debugItems.length===0)return;const o=this._debugItems,n=Math.min(o.length,ut),r=new Float32Array(n*8*6),c=a;for(let f=0;f<n;f++){const p=o[f],_=p.screenX-p.halfW-c,y=p.screenX+p.halfW+c,g=p.screenY-p.halfH-c,B=p.screenY+p.halfH+c,b=p.occluded?.2:p.visible?0:1,m=p.occluded?.4:p.visible?1:0,S=p.occluded?1:0,E=.8,v=f*8*6;r[v]=_,r[v+1]=g,r[v+2]=b,r[v+3]=m,r[v+4]=S,r[v+5]=E,r[v+6]=y,r[v+7]=g,r[v+8]=b,r[v+9]=m,r[v+10]=S,r[v+11]=E,r[v+12]=y,r[v+13]=g,r[v+14]=b,r[v+15]=m,r[v+16]=S,r[v+17]=E,r[v+18]=y,r[v+19]=B,r[v+20]=b,r[v+21]=m,r[v+22]=S,r[v+23]=E,r[v+24]=y,r[v+25]=B,r[v+26]=b,r[v+27]=m,r[v+28]=S,r[v+29]=E,r[v+30]=_,r[v+31]=B,r[v+32]=b,r[v+33]=m,r[v+34]=S,r[v+35]=E,r[v+36]=_,r[v+37]=B,r[v+38]=b,r[v+39]=m,r[v+40]=S,r[v+41]=E,r[v+42]=_,r[v+43]=g,r[v+44]=b,r[v+45]=m,r[v+46]=S,r[v+47]=E}const u=t/i,h=s/i,d=new Float32Array([u,h,0,0]);this._device.queue.writeBuffer(this._uniformBuffer,0,d),this._device.queue.writeBuffer(this._vertexBuffer,0,r.buffer,0,n*8*6*4),e.setPipeline(this._linePipeline),e.setBindGroup(0,this._uniformBindGroup),e.setVertexBuffer(0,this._vertexBuffer),e.draw(n*8)}clear(e){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:t}of e)t.setVisibleFeatures(null)}destroy(){this._collisionTimer&&clearTimeout(this._collisionTimer),this._uniformBuffer.destroy(),this._vertexBuffer.destroy()}}class gt{static async create(e,t={}){const s=new gt;return await s._init(e,t),s}async _init(e,t){const{sources:s={},base:i=[],features:a=[],camera:o={},settings:n,createGPULines:r}=t;let c=null;const u={},h={},d=[];for(const[w,T]of Object.entries(s))if(d.push(T),T.type==="terrain"){if(c)throw new Error("Only one terrain source is allowed");c=T}else T.type==="raster"?u[w]=T:T.type==="geojson"&&(h[w]=T);if(!c)throw new Error("A terrain source is required");this._pixelRatio=t.pixelRatio||(typeof devicePixelRatio<"u"?devicePixelRatio:1),this._baseLayerConfigs=i,this._featureLayerConfigs=a,this._geojsonSources=h,this._rasterSources=u,this.canvas=e,this._terrainBounds=qe(c);const[f,p,_,y]=c.bounds;this._location=t.location||{lat:(p+y)/2,lon:(f+_)/2},this.attribution=yi(d.filter(w=>w.attribution));const g=Math.round(mi(this._location.lat)*3.28084);this.settings=gi({treelineLower:Math.max(0,g-500),treelineUpper:g+500,...n});const B=await navigator.gpu.requestAdapter();this._device=await B.requestDevice(),this._format=navigator.gpu.getPreferredCanvasFormat(),this._gpuCtx=e.getContext("webgpu"),this._gpuCtx.configure({device:this._device,format:this._format,alphaMode:"opaque"});const b=Mi(window.location.hash);this.camera=St(e,{center:[.0804792012701582,.0002040588543435183,.27264551318459634],distance:.0008177139017526437,phi:2.1624270549994598,theta:.16047571910010502,fov:Math.PI/4,near:1e-5,far:.5,rotateSpeed:.005,zoomSpeed:8e-4,panSpeed:1,...o,...b}),this._hashUpdateTimer=null;const m=this._device,S=this._format;this._mesh=Bt(m),this._imagerySampler=m.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});const E=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0}}]}),v=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),G=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),Y=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this._globalUniformBuffer=m.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._globalUniformBindGroup=m.createBindGroup({layout:G,entries:[{binding:0,resource:{buffer:this._globalUniformBuffer}}]}),this._fallbackImageryTexture=m.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),m.queue.writeTexture({texture:this._fallbackImageryTexture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]),this._fallbackImageryBindGroup=m.createBindGroup({layout:Y,entries:[{binding:0,resource:this._fallbackImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._whiteImageryTexture=m.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),m.queue.writeTexture({texture:this._whiteImageryTexture},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1]),this._whiteImageryBindGroup=m.createBindGroup({layout:Y,entries:[{binding:0,resource:this._whiteImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._pipeline=m.createRenderPipeline({layout:m.createPipelineLayout({bindGroupLayouts:[E,v,G,Y]}),vertex:{module:m.createShaderModule({code:Ct}),entryPoint:"vs_main",buffers:[{arrayStride:4,attributes:[{format:"uint16x2",offset:0,shaderLocation:0}]}]},fragment:{module:m.createShaderModule({code:Et}),entryPoint:"fs_main",targets:[{format:S}]},primitive:{topology:"triangle-list",cullMode:"back",frontFace:"ccw"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}}),this._skyPipeline=m.createRenderPipeline({layout:m.createPipelineLayout({bindGroupLayouts:[G]}),vertex:{module:m.createShaderModule({code:At}),entryPoint:"vs_sky",buffers:[]},fragment:{module:m.createShaderModule({code:Ut}),entryPoint:"fs_sky",targets:[{format:S}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._frustumOverlay=new Si(m,S,this._pixelRatio,r),this._collisionManager=new Ai(m,S),this._collisionManager.onWake=()=>{this._renderDirty=!0},this._UNIFORM_STRIDE=256,this._MAX_TILES_PER_FRAME=256,this._uniformBuffer=m.createBuffer({size:this._UNIFORM_STRIDE*this._MAX_TILES_PER_FRAME,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=m.createBindGroup({layout:E,entries:[{binding:0,resource:{buffer:this._uniformBuffer,size:208}}]}),this._tileManager=new Zt(m,{tileUrl:Ne(c.tiles)}),this._tileManager.setBindGroupLayout(v),this._tileManager.setBounds(this._terrainBounds),this._imageryDeltaZoom=1;const U=[];for(const w of i){const T=u[w.source];if(!T)throw new Error(`Base layer "${w.id}" references unknown source "${w.source}"`);const I=qe(T),H=new Qt({tileUrl:Ne(T.tiles)});H.setBounds(I),U.push({imageryManager:H,blend:w.blend||"source-over",opacity:w.opacity!=null?w.opacity:1,maxzoom:T.maxzoom})}this._maxImageryZoom=U.length>0?Math.max(...U.map(w=>w.maxzoom)):0,this._compositor=new Kt(m,U,Y,this._imagerySampler),this._coverageDirty=!0,this._renderDirty=!0,this._cachedRenderList=[],this._tileManager.onTileResolved=()=>{this._coverageDirty=!0,this._renderDirty=!0,this._collisionManager.markStale();for(const w of this._lineLayers)w.invalidateElevations()},this._compositor.onUpdate=()=>{this._coverageDirty=!0,this._renderDirty=!0},this._depthTexture=null,this._MAX_ELEV_Y=.001,this._mvpFloat32=new Float32Array(16),this._modelFloat32=new Float32Array(16),this._uniformData=new Float32Array(52),this._globalUniformData=new Float32Array(24),this._currentExaggeration=this.settings.verticalExaggeration,this._currentDensityThreshold=this.settings.densityThreshold,this._currentFreezeCoverage=!1,this._bvh=null,this._bvhTileList=[],this._lastProjView=new Float64Array(16),this._invProjView=new Float64Array(16),this.camera.rotateStartCallback=(w,T)=>this._hitTest(w,T),this._needsCanvasResize=!0,this._resizeObserver=new ResizeObserver(()=>{this._needsCanvasResize=!0,this._renderDirty=!0,this._coverageDirty=!0,this.camera.taint()}),this._resizeObserver.observe(e),this._circleLayers=[],this._textLayers=[],this._lineLayers=[];const Q=[],q={};for(const w of a){const T=h[w.source];if(!T)throw new Error(`Feature layer "${w.id}" references unknown source "${w.source}"`);if(!q[w.source]){const H=new Jt;q[w.source]=H,Q.push(H.load(T.data,{...T,simplifyFn:t.simplifyFn}))}const I=w.collision!==!1;if(w.type==="circle"){const H=new ii(w,q[w.source],(ee,O)=>this.queryElevationMercator(ee,O));H.init(m,G,S),H._collision=I,H._sourceId=w.source,this._circleLayers.push(H)}else if(w.type==="text"){const H=new fi(w,q[w.source],(ee,O)=>this.queryElevationMercator(ee,O));H._collision=I,H._sourceId=w.source,this._textLayers.push({layer:H,config:w})}else if(w.type==="line"){const H=new pi(w,q[w.source],(ee,O)=>this.queryElevationMercator(ee,O));H.init(m,S,this._globalUniformBuffer,r),this._lineLayers.push(H)}}if(await Promise.all(Q),t.font&&this._textLayers.length>0){const w=await ci(m,{atlasUrl:t.font.atlas,metadataUrl:t.font.metadata});for(const{layer:T}of this._textLayers)T.init(m,w,S,"depth24plus",this._globalUniformBuffer)}this._running=!0,this._boundFrame=this._frame.bind(this),requestAnimationFrame(this._boundFrame)}_hitTest(e,t){const s=this.raycast(e,t);if(s)return s.worldPos;const i=this.canvas.getBoundingClientRect(),a=(e-i.left)/i.width*2-1,o=1-(t-i.top)/i.height*2;Pe(this._invProjView,this._lastProjView);const{origin:n,direction:r}=Xe(a,o,this._invProjView);if(Math.abs(r[1])>1e-10){const c=-n[1]/r[1];if(c>0)return[n[0]+c*r[0],0,n[2]+c*r[2]]}return null}_ensureDepthTexture(e,t){this._depthTexture&&this._depthTexture.width===e&&this._depthTexture.height===t||(this._depthTexture&&this._depthTexture.destroy(),this._depthTexture=this._device.createTexture({size:[e,t],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}))}_buildCollisionLayers(){const e=[];for(const t of this._circleLayers)e.push({layer:t,collision:t._collision,sourceId:t._sourceId});for(const{layer:t}of this._textLayers)e.push({layer:t,collision:t._collision,sourceId:t._sourceId});return e}paint(){const{canvas:e,camera:t,settings:s}=this,i=e.width/e.height;if(i===0||!isFinite(i))return;const{view:a,projection:o,projectionView:n}=t.update(i),r=this._device;let c=0;const u=[],h=this._globalElevScale;for(const L of this._cachedRenderList){if(c>=this._MAX_TILES_PER_FRAME)break;const fe=this._tileManager.getTile(L.z,L.x,L.y);if(!fe)continue;const z=Pt(L.z,L.y),X=et(L.z,this._imageryDeltaZoom,this._maxImageryZoom);this._compositor.ensureImagery(L.z,L.x,L.y,X);const M=this._compositor.hasImagery(L.z,L.x,L.y);It(this._mvpFloat32,a,o,L.z,L.x,L.y,h,this._currentExaggeration),zt(this._modelFloat32,L.z,L.x,L.y,h,this._currentExaggeration);const A=this._uniformData;A.set(this._mvpFloat32,0),A.set(this._modelFloat32,16),A[32]=h,A[33]=z,A[34]=this._currentExaggeration,A[35]=1/514,A[36]=s.showTileBorders?1:0,A[37]=s.showImagery?M?1:0:1,A[38]=s.hillshadeOpacity,A[39]=s.slopeAngleOpacity,A[40]=s.contourOpacity,A[41]=e.height,A[42]=s.showWireframe?1:0,A[43]=s.slopeAspectMaskAbove,A[44]=s.slopeAspectMaskNear,A[45]=s.slopeAspectMaskBelow,A[46]=s.slopeAspectOpacity,A[47]=s.treelineLower*.3048,A[48]=s.treelineUpper*.3048;let K;s.showImagery?M?K=this._compositor.getBindGroup(L.z,L.x,L.y):K=this._fallbackImageryBindGroup:K=this._whiteImageryBindGroup,r.queue.writeBuffer(this._uniformBuffer,c*this._UNIFORM_STRIDE,A.buffer,A.byteOffset,208),u.push({offset:c*this._UNIFORM_STRIDE,bindGroup:fe.bindGroup,imageryBindGroup:K}),c++}const{phi:d,theta:f,distance:p,center:_}=t.state,y=_[0]+p*Math.cos(f)*Math.cos(d),g=_[1]+p*Math.sin(f),B=_[2]+p*Math.cos(f)*Math.sin(d),b=1/h,m=g/h,S=s.sunDirection,E=S[0],v=S[1],G=S[2],Y=s.atmosphereDensity,U=this._globalUniformData;U[0]=y,U[1]=g,U[2]=B,U[3]=m,U[4]=E,U[5]=v,U[6]=G,U[7]=b,U[8]=52e-7*Y,U[9]=121e-7*Y,U[10]=296e-7*Y,U[11]=8e3,U[12]=2e-5*Y,U[13]=3e3,U[14]=.76,U[15]=20;const Q=t.state.fov,q=Math.sin(d),w=-Math.cos(d),T=-Math.sin(f)*Math.cos(d),I=Math.cos(f),H=-Math.sin(f)*Math.sin(d);U[16]=q,U[17]=0,U[18]=w,U[19]=i,U[20]=T,U[21]=I,U[22]=H,U[23]=Math.tan(Q/2),r.queue.writeBuffer(this._globalUniformBuffer,0,U.buffer,U.byteOffset,96),this._ensureDepthTexture(e.width,e.height);const ee=r.createCommandEncoder(),O=ee.beginRenderPass({colorAttachments:[{view:this._gpuCtx.getCurrentTexture().createView(),clearValue:{r:.53,g:.66,b:.82,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this._depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});O.setPipeline(this._skyPipeline),O.setBindGroup(0,this._globalUniformBindGroup),O.draw(3),O.setPipeline(this._pipeline),O.setVertexBuffer(0,this._mesh.vertexBuffer),O.setIndexBuffer(this._mesh.indexBuffer,"uint32"),O.setBindGroup(2,this._globalUniformBindGroup);for(const L of u)O.setBindGroup(0,this._uniformBindGroup,[L.offset]),O.setBindGroup(1,L.bindGroup),O.setBindGroup(3,L.imageryBindGroup),O.drawIndexed(this._mesh.indexCount);if(this._frustumOverlay.draw(O,n,e.width,e.height),s.showRoute)for(const L of this._lineLayers)L.draw(O);if(s.showFeatures){for(const L of this._circleLayers)L.draw(O,this._globalUniformBindGroup,!1);for(const{layer:L}of this._textLayers)L.draw(O)}s.showCollisionBoxes&&this._collisionManager.drawDebug(O,e.width,e.height,this._pixelRatio,s.collisionBuffer),O.end(),r.queue.submit([ee.finish()])}_frame(){if(!this._running)return;requestAnimationFrame(this._boundFrame);const{canvas:e,camera:t,settings:s}=this;if(this._currentExaggeration!==s.verticalExaggeration&&(this._currentExaggeration=s.verticalExaggeration,t.taint()),this._currentDensityThreshold!==s.densityThreshold&&(this._currentDensityThreshold=s.densityThreshold,this._coverageDirty=!0),s.freezeCoverage!==this._currentFreezeCoverage&&(this._currentFreezeCoverage=s.freezeCoverage,this._currentFreezeCoverage?(this._savedFar=t.state.far,t.state.far=t.state.far*4):(this._frustumOverlay.unfreeze(),t.state.far=this._savedFar,this._coverageDirty=!0),t.taint(),this._renderDirty=!0),s.dirty&&(this._renderDirty=!0,s.dirty=!1),!this._coverageDirty&&!this._renderDirty&&!t.dirty)return;if(this._needsCanvasResize){const g=this._pixelRatio,B=Math.floor(e.clientWidth*g),b=Math.floor(e.clientHeight*g);(e.width!==B||e.height!==b)&&(e.width=B,e.height=b),this._needsCanvasResize=!1}const i=e.width/e.height,{view:a,projection:o,projectionView:n,dirty:r}=t.update(i);this._lastProjView.set(n);const{center:c,distance:u,theta:h,phi:d}=t.state,f=c[2]+u*Math.cos(h)*Math.sin(d),p=2*Math.atan(Math.exp(Math.PI*(1-2*f)))-Math.PI/2;this._globalElevScale=1/(40075016686e-3*Math.cos(p)),this._currentFreezeCoverage&&!this._frustumOverlay.isFrozen&&this._frustumOverlay.freeze(n);const _=this._frustumOverlay.coverageProjView||n;if(r&&(this._coverageDirty=!0,this._renderDirty=!0,clearTimeout(this._hashUpdateTimer),this._hashUpdateTimer=setTimeout(()=>{history.replaceState(null,"",Ti(t.state))},300)),this._coverageDirty){const g=this._MAX_ELEV_Y*this._currentExaggeration;this._tileManager.beginFrame(),this._cachedRenderList=tt(_,e.width,e.height,g,this._currentExaggeration,s.densityThreshold,this._terrainBounds,this._tileManager,(b,m,S)=>{const E=this._tileManager.getTile(b,m,S);if(!E||E.isFlat)return!0;const v=et(b,this._imageryDeltaZoom,this._maxImageryZoom);return this._compositor.ensureImagery(b,m,S,v),this._compositor.hasImagery(b,m,S)});const B=_;this._cachedRenderList.sort((b,m)=>{const S=B[3]*((b.x+.5)/(1<<b.z))+B[11]*((b.y+.5)/(1<<b.z))+B[15],E=B[3]*((m.x+.5)/(1<<m.z))+B[11]*((m.y+.5)/(1<<m.z))+B[15];return S-E}),this._tileManager.cancelStale(),this._tileManager.evict(),this._tileManager.stripQuadtrees(),this._compositor.gc(this._tileManager.wantedKeys),this._rebuildBVH(),this._coverageDirty=!1,this._renderDirty=!0}if(!this._renderDirty)return;this._renderDirty=!1;const y=this._buildCollisionLayers();if(this._collisionManager.update({enabled:s.enableCollision,layers:y,projectionView:n,canvasW:e.width,canvasH:e.height,pixelRatio:this._pixelRatio,exaggeration:this._currentExaggeration,collisionBuffer:s.collisionBuffer,occlusionBias:s.occlusionBias,bvh:this._bvh,tileManager:this._tileManager,bvhTileList:this._bvhTileList,globalElevScale:this._globalElevScale})&&(this._renderDirty=!0),s.showFeatures){for(const g of this._circleLayers)g.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale);for(const{layer:g}of this._textLayers)g.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale)}if(s.showRoute)for(const g of this._lineLayers)g.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration,this._globalElevScale);this.paint()}_rebuildBVH(){const e=this._cachedRenderList;if(e.length===0){this._bvh=null,this._bvhTileList=[];return}const t=new Float64Array(e.length*6),s=new Array(e.length);for(let i=0;i<e.length;i++){const{z:a,x:o,y:n}=e[i];s[i]=e[i];const r=1/(1<<a),c=Ye(a,n),u=this._tileManager.getElevationBounds(a,o,n),h=i*6;t[h]=o*r,t[h+1]=u?u.minElevation*c*this._currentExaggeration:0,t[h+2]=n*r,t[h+3]=(o+1)*r,t[h+4]=u?u.maxElevation*c*this._currentExaggeration:this._MAX_ELEV_Y*this._currentExaggeration,t[h+5]=(n+1)*r}this._bvh=new _i(t,{maxItemsPerNode:4}),this._bvhTileList=s}raycast(e,t){if(!this._bvh)return null;const s=this.canvas.getBoundingClientRect(),i=(e-s.left)/s.width*2-1,a=1-(t-s.top)/s.height*2;Pe(this._invProjView,this._lastProjView);const{origin:o,direction:n}=Xe(i,a,this._invProjView);return mt({origin:o,direction:n,bvh:this._bvh,tileCache:this._tileManager,tileList:this._bvhTileList,verticalExaggeration:this._currentExaggeration})}queryElevation(e,t){const s=Ee(e),i=Ae(t);return this.queryElevationMercator(s,i)}queryElevationMercator(e,t){let s=null,i=-1;for(const G of this._cachedRenderList){const Y=1/(1<<G.z);e>=G.x*Y&&e<(G.x+1)*Y&&t>=G.y*Y&&t<(G.y+1)*Y&&G.z>i&&(s=G,i=G.z)}if(!s)return null;const a=this._tileManager.getTile(s.z,s.x,s.y);if(!a||!a.elevations)return null;const o=1/(1<<s.z),n=(e-s.x*o)/o,r=(t-s.y*o)/o,c=n*512+1,u=r*512+1,h=Math.floor(c),d=Math.floor(u),f=c-h,p=u-d,_=514,y=Math.min(h,513),g=Math.min(h+1,513),B=Math.min(d,513),b=Math.min(d+1,513),m=a.elevations[B*_+y],S=a.elevations[B*_+g],E=a.elevations[b*_+y],v=a.elevations[b*_+g];return m*(1-f)*(1-p)+S*f*(1-p)+E*(1-f)*p+v*f*p}debugTileCoverage(){const{canvas:e,camera:t,settings:s}=this,i=e.width/e.height,{projectionView:a}=t.update(i),o=t.state,n=this._MAX_ELEV_Y*this._currentExaggeration,r=tt(a,e.width,e.height,n,this._currentExaggeration,s.densityThreshold,this._terrainBounds,this._tileManager,null);return{camera:{center:[...o.center],distance:o.distance,phi:o.phi,theta:o.theta,thetaDeg:o.theta*180/Math.PI,fov:o.fov},canvas:{width:e.width,height:e.height},densityThreshold:s.densityThreshold,tiles:r.map(c=>{const[u,h,d]=pt(a);return{z:c.z,x:c.x,y:c.y,density:_t(a,c.z,c.x,c.y,e.height,u,h,d)}}),projectionView:Array.from(a)}}destroy(){this._running=!1,clearTimeout(this._hashUpdateTimer),this._collisionManager.destroy(),this._frustumOverlay.destroy(),this._resizeObserver.disconnect(),this.camera.destroy(),this._depthTexture&&this._depthTexture.destroy(),this._mesh.vertexBuffer.destroy(),this._mesh.indexBuffer.destroy(),this._uniformBuffer.destroy(),this._globalUniformBuffer.destroy(),this._fallbackImageryTexture.destroy(),this._whiteImageryTexture.destroy();for(const e of this._lineLayers)e.destroy();this._device.destroy()}}export{gt as TerrainMap};
