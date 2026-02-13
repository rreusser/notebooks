function Ue(u,e){const[t,r,i,a,s,n,o,l,f,h,p,c,d,_,m,y]=e,x=t*n-r*s,g=t*o-i*s,S=t*l-a*s,E=r*o-i*n,A=r*l-a*n,v=i*l-a*o,L=f*_-h*d,W=f*m-p*d,U=f*y-c*d,T=h*m-p*_,w=h*y-c*_,Y=p*y-c*m;let z=x*Y-g*w+S*T+E*U-A*W+v*L;return Math.abs(z)<1e-10?!1:(z=1/z,u[0]=(n*Y-o*w+l*T)*z,u[1]=(-r*Y+i*w-a*T)*z,u[2]=(_*v-m*A+y*E)*z,u[3]=(-h*v+p*A-c*E)*z,u[4]=(-s*Y+o*U-l*W)*z,u[5]=(t*Y-i*U+a*W)*z,u[6]=(-d*v+m*S-y*g)*z,u[7]=(f*v-p*S+c*g)*z,u[8]=(s*w-n*U+l*L)*z,u[9]=(-t*w+r*U-a*L)*z,u[10]=(d*A-_*S+y*x)*z,u[11]=(-f*A+h*S-c*x)*z,u[12]=(-s*T+n*W-o*L)*z,u[13]=(t*T-r*W+i*L)*z,u[14]=(-d*E+_*g-m*x)*z,u[15]=(f*E-h*g+p*x)*z,!0)}function bt(u){function e(s,n,o){const l=u[0]*s+u[4]*n+u[8]*o+u[12],f=u[1]*s+u[5]*n+u[9]*o+u[13],h=u[2]*s+u[6]*n+u[10]*o+u[14],p=u[3]*s+u[7]*n+u[11]*o+u[15];return[l/p,f/p,h/p]}const t=.3,r=.99,i=new Float32Array(24),a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let s=0;s<4;s++){const[n,o]=a[s],l=e(n,o,t),f=e(n,o,r);i[s*3]=l[0],i[s*3+1]=l[1],i[s*3+2]=l[2],i[(s+4)*3]=f[0],i[(s+4)*3+1]=f[1],i[(s+4)*3+2]=f[2]}return i}function wt(u,e={}){const t={center:e.center?[...e.center]:[0,0,0],distance:e.distance||10,phi:e.phi||0,theta:e.theta||.3,fov:e.fov||Math.PI/4,near:e.near||.1,far:e.far||1},r=e.rotateSpeed||.01,i=e.zoomSpeed||.001,a=e.panSpeed||1,s=new Float64Array(16),n=new Float64Array(16),o=new Float64Array(16),l=new Float64Array(16);let f=!0,h=1,p=!1,c=null,d=0,_=0,m=null,y=null,x=null,g=0,S=0;function E(b,F){const B=u.getBoundingClientRect(),G=(b-B.left)/B.width*2-1,I=1-(F-B.top)/B.height*2;Ue(l,o);const R=l;function N($,H,X){const O=R[0]*$+R[4]*H+R[8]*X+R[12],ie=R[1]*$+R[5]*H+R[9]*X+R[13],ue=R[2]*$+R[6]*H+R[10]*X+R[14],oe=R[3]*$+R[7]*H+R[11]*X+R[15];return[O/oe,ie/oe,ue/oe]}const V=N(G,I,0),q=N(G,I,1);return{origin:V,direction:[q[0]-V[0],q[1]-V[1],q[2]-V[2]]}}function A(b,F){if(Math.abs(b.direction[1])<1e-10)return null;const B=(F-b.origin[1])/b.direction[1];return B<0?null:[b.origin[0]+B*b.direction[0],F,b.origin[2]+B*b.direction[2]]}let v=null,L=null;function W(b,F){U();const B=u.parentElement;if(!B)return;const G=B.getBoundingClientRect();getComputedStyle(B).position==="static"&&(B.style.position="relative");const R=document.createElement("div"),N=22,V={position:"absolute",left:"0",top:"0",width:N+"px",height:N+"px",borderRadius:"50%",boxSizing:"border-box",pointerEvents:"none"};Object.assign(R.style,{position:"absolute",left:b-G.left-N/2+"px",top:F-G.top-N/2+"px",width:N+"px",height:N+"px",pointerEvents:"none",transform:"scale(0.5)",opacity:"0",transition:"transform 0.15s ease-out, opacity 0.15s ease-out"});const q=document.createElement("div");Object.assign(q.style,{...V,border:"4px solid rgba(255,255,255,0.6)"});const $=document.createElement("div");Object.assign($.style,{...V,border:"2.25px solid rgba(0,0,0,0.5)"}),R.appendChild(q),R.appendChild($),B.appendChild(R),R.offsetWidth,R.style.transform="scale(1)",R.style.opacity="1",L=R}function U(){if(!L)return;const b=L;L=null,b.style.transform="scale(1.5)",b.style.opacity="0",b.addEventListener("transitionend",()=>b.remove(),{once:!0})}function T(b,F){const{phi:B,theta:G,distance:I,center:R}=t,N=B+b,V=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,G+F)),q=V-G;if(!v){t.phi=N,t.theta=V;return}const $=R[0]+I*Math.cos(G)*Math.cos(B),H=R[1]+I*Math.sin(G),X=R[2]+I*Math.cos(G)*Math.sin(B);let O=$-v[0],ie=H-v[1],ue=X-v[2];const oe=Math.cos(b),ce=Math.sin(b),fe=O*oe-ue*ce,he=ie,de=O*ce+ue*oe,pe=-Math.sin(N),_e=Math.cos(N),me=Math.cos(q),be=Math.sin(q),ve=1-me,we=-_e*he,Fe=_e*fe-pe*de,Te=pe*he,We=pe*fe+_e*de,_t=fe*me+we*be+pe*We*ve,mt=he*me+Fe*be,gt=de*me+Te*be+_e*We*ve,yt=v[0]+_t,vt=v[1]+mt,xt=v[2]+gt;t.phi=N,t.theta=V,t.center[0]=yt-I*Math.cos(V)*Math.cos(N),t.center[1]=vt-I*Math.sin(V),t.center[2]=xt-I*Math.cos(V)*Math.sin(N)}let w=0,Y=0,z=0,Z=0;function Q(b){const{phi:F,theta:B,distance:G,center:I,fov:R,near:N,far:V}=t,q=I[0]+G*Math.cos(B)*Math.cos(F),$=I[1]+G*Math.sin(B),H=I[2]+G*Math.cos(B)*Math.sin(F);let X=I[0]-q,O=I[1]-$,ie=I[2]-H;const ue=Math.sqrt(X*X+O*O+ie*ie);X/=ue,O/=ue,ie/=ue;let oe=O*0-ie*1,ce=ie*0-X*0,fe=X*1-O*0;const he=Math.sqrt(oe*oe+ce*ce+fe*fe);he>1e-4&&(oe/=he,ce/=he,fe/=he);const de=ce*ie-fe*O,pe=fe*X-oe*ie,_e=oe*O-ce*X;s[0]=oe,s[1]=de,s[2]=-X,s[3]=0,s[4]=ce,s[5]=pe,s[6]=-O,s[7]=0,s[8]=fe,s[9]=_e,s[10]=-ie,s[11]=0,s[12]=-(oe*q+ce*$+fe*H),s[13]=-(de*q+pe*$+_e*H),s[14]=X*q+O*$+ie*H,s[15]=1;const me=1/Math.tan(R/2),be=1/(N-V);n[0]=me/b,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=me,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=V*be,n[11]=-1,n[12]=0,n[13]=0,n[14]=N*V*be,n[15]=0;for(let ve=0;ve<4;ve++)for(let we=0;we<4;we++){let Fe=0;for(let Te=0;Te<4;Te++)Fe+=n[ve+Te*4]*s[Te+we*4];o[ve+we*4]=Fe}}function se(b,F){const{phi:B,theta:G,distance:I}=t,R=Math.sin(B),N=-Math.cos(B),V=-Math.sin(G)*Math.cos(B),q=Math.cos(G),$=-Math.sin(G)*Math.sin(B),H=I*a;t.center[0]-=b*R*H,t.center[0]+=F*V*H,t.center[1]+=F*q*H,t.center[2]-=b*N*H,t.center[2]+=F*$*H}function j(b,F){if(y=null,Q(h),m){const I=m(b,F);if(Array.isArray(I)&&I.length===3){y={point:[...I],altitude:I[1]};return}}const B=E(b,F),G=A(B,t.center[1]);G&&(y={point:G,altitude:t.center[1]})}function J(b,F){if(!y)return;Q(h);const B=E(b,F),G=A(B,y.altitude);G&&(t.center[0]+=y.point[0]-G[0],t.center[2]+=y.point[2]-G[2])}function te(b,F){x=null,Q(h);let B=null;if(m){const q=m(b,F);Array.isArray(q)&&q.length===3&&(B=q)}if(!B){const q=E(b,F);B=A(q,t.center[1])}if(!B)return;const{phi:G,theta:I}=t,R=-Math.cos(I)*Math.cos(G),N=-Math.sin(I),V=-Math.cos(I)*Math.sin(G);x={point:[...B],normal:[R,N,V]}}function C(b,F){if(!x)return;Q(h);const B=E(b,F),{point:G,normal:I}=x,R=I[0]*B.direction[0]+I[1]*B.direction[1]+I[2]*B.direction[2];if(Math.abs(R)<1e-10)return;const N=I[0]*G[0]+I[1]*G[1]+I[2]*G[2],V=I[0]*B.origin[0]+I[1]*B.origin[1]+I[2]*B.origin[2],q=(N-V)/R;if(q<0)return;const $=B.origin[0]+q*B.direction[0],H=B.origin[1]+q*B.direction[1],X=B.origin[2]+q*B.direction[2];t.center[0]+=G[0]-$,t.center[1]+=G[1]-H,t.center[2]+=G[2]-X}function k(b){if(b.preventDefault(),d=b.clientX,_=b.clientY,c=b.shiftKey?"pan":b.button===2||b.button===1?"rotate":b.ctrlKey?"pivot":b.metaKey?"rotate":b.altKey?"zoom":"grab",c==="rotate"){if(m){const F=m(b.clientX,b.clientY);v=Array.isArray(F)&&F.length===3?F:null}W(b.clientX,b.clientY)}if(c==="grab"&&j(b.clientX,b.clientY),c==="pan"&&te(b.clientX,b.clientY),c==="zoom"){if(m){const B=m(b.clientX,b.clientY);if(Array.isArray(B)&&B.length===3){const{phi:G,theta:I,distance:R,center:N}=t,V=N[0]+R*Math.cos(I)*Math.cos(G),q=N[1]+R*Math.sin(I),$=N[2]+R*Math.cos(I)*Math.sin(G),H=B[0]-V,X=B[1]-q,O=B[2]-$,ie=Math.sqrt(H*H+X*X+O*O),ue=Math.cos(I)*Math.cos(G),oe=Math.sin(I),ce=Math.cos(I)*Math.sin(G);t.center[0]+=(R-ie)*ue,t.center[1]+=(R-ie)*oe,t.center[2]+=(R-ie)*ce,t.distance=ie}}const F=u.getBoundingClientRect();g=(b.clientX-F.left-F.width/2)/F.height,S=(b.clientY-F.top-F.height/2)/F.height,W(b.clientX,b.clientY)}p=!0,u.style.cursor="grabbing",window.addEventListener("mousemove",M),window.addEventListener("mouseup",D)}function M(b){if(!p)return;const F=b.clientX-d,B=b.clientY-_;if(d=b.clientX,_=b.clientY,c==="grab")J(b.clientX,b.clientY);else if(c==="rotate")T(F*r,B*r);else if(c==="pivot"){const{phi:G,theta:I,distance:R,center:N,fov:V}=t,q=V/u.getBoundingClientRect().height,$=N[0]+R*Math.cos(I)*Math.cos(G),H=N[1]+R*Math.sin(I),X=N[2]+R*Math.cos(I)*Math.sin(G);t.phi-=F*q,t.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t.theta-B*q)),t.center[0]=$-R*Math.cos(t.theta)*Math.cos(t.phi),t.center[1]=H-R*Math.sin(t.theta),t.center[2]=X-R*Math.cos(t.theta)*Math.sin(t.phi)}else if(c==="zoom"){const G=Math.exp(-B*.005),I=t.distance;t.distance=Math.max(t.near*2,I*G);const N=(1/(t.distance/I)-1)*2*Math.tan(t.fov/2);se(-g*N,-S*N)}else c==="pan"&&C(b.clientX,b.clientY);f=!0}function D(){p=!1,c=null,y=null,v=null,x=null,U(),u.style.cursor="grab",window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",D)}let K=!1,P=null;function ee(b){if(b.preventDefault(),!K&&m){const q=m(b.clientX,b.clientY);if(Array.isArray(q)&&q.length===3){const{phi:$,theta:H,distance:X,center:O}=t,ie=O[0]+X*Math.cos(H)*Math.cos($),ue=O[1]+X*Math.sin(H),oe=O[2]+X*Math.cos(H)*Math.sin($),ce=q[0]-ie,fe=q[1]-ue,he=q[2]-oe,de=Math.sqrt(ce*ce+fe*fe+he*he),pe=Math.cos(H)*Math.cos($),_e=Math.sin(H),me=Math.cos(H)*Math.sin($);t.center[0]+=(X-de)*pe,t.center[1]+=(X-de)*_e,t.center[2]+=(X-de)*me,t.distance=de}K=!0}clearTimeout(P),P=setTimeout(()=>{K=!1},200);const F=u.getBoundingClientRect(),B=(b.clientX-F.left-F.width/2)/F.height,G=(b.clientY-F.top-F.height/2)/F.height,I=1+b.deltaY*i,R=t.distance;t.distance=Math.max(t.near*2,R*I);const V=(1/(t.distance/R)-1)*2*Math.tan(t.fov/2);se(-B*V,-G*V),f=!0}function ne(b){if(b.preventDefault(),b.touches.length===1)p=!0,c="grab",d=b.touches[0].clientX,_=b.touches[0].clientY,j(d,_);else if(b.touches.length===2){const F=b.touches[1].clientX-b.touches[0].clientX,B=b.touches[1].clientY-b.touches[0].clientY;if(w=Math.sqrt(F*F+B*B),Y=(b.touches[0].clientX+b.touches[1].clientX)/2,z=(b.touches[0].clientY+b.touches[1].clientY)/2,Z=Math.atan2(B,F),m){const G=m(Y,z);v=Array.isArray(G)&&G.length===3?G:null}}}function re(b){if(b.preventDefault(),b.touches.length===1&&p)d=b.touches[0].clientX,_=b.touches[0].clientY,c==="grab"&&J(d,_),f=!0;else if(b.touches.length===2){const F=b.touches[1].clientX-b.touches[0].clientX,B=b.touches[1].clientY-b.touches[0].clientY,G=Math.sqrt(F*F+B*B),I=(b.touches[0].clientX+b.touches[1].clientX)/2,R=(b.touches[0].clientY+b.touches[1].clientY)/2;if(w>0){const N=w/G;t.distance*=N,t.distance=Math.max(t.near*2,t.distance);const V=Math.atan2(B,F),q=V-Z,$=u.getBoundingClientRect(),H=(R-z)/$.height;T(-q,H*2),f=!0,Z=V}w=G,Y=I,z=R}}function ae(){p=!1,c=null,y=null,v=null,w=0,Z=0}function ye(b){b.preventDefault()}u.style.cursor="grab",u.addEventListener("mousedown",k),u.addEventListener("wheel",ee,{passive:!1}),u.addEventListener("touchstart",ne,{passive:!1}),u.addEventListener("touchmove",re,{passive:!1}),u.addEventListener("touchend",ae),u.addEventListener("contextmenu",ye);function Le(){u.removeEventListener("mousedown",k),u.removeEventListener("wheel",ee),u.removeEventListener("touchstart",ne),u.removeEventListener("touchmove",re),u.removeEventListener("touchend",ae),u.removeEventListener("contextmenu",ye),window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",D)}return{state:t,get dirty(){return f},set rotateStartCallback(b){m=b},taint(){f=!0},update(b){h=b,Q(b);const F=f;return f=!1,{view:s,projection:n,projectionView:o,dirty:F}},destroy:Le}}function Tt(u){const r=new Uint16Array(534578);let i=0;for(let p=0;p<=516;p++)for(let c=0;c<=516;c++)r[i++]=c,r[i++]=p;const s=516*516*6,n=new Uint32Array(s);let o=0;const l=517;for(let p=0;p<516;p++)for(let c=0;c<516;c++){const d=p*l+c,_=d+1,m=d+l,y=m+1;n[o++]=d,n[o++]=m,n[o++]=_,n[o++]=_,n[o++]=m,n[o++]=y}const f=u.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});u.queue.writeBuffer(f,0,r);const h=u.createBuffer({size:n.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});return u.queue.writeBuffer(h,0,n),{vertexBuffer:f,indexBuffer:h,indexCount:s,vertexCount:267289}}const Ie=`
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
`,Mt=`
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

  // Reject sea-level vertices (no terrain data).
  if (elevation <= 0.0) {
    var nan_bits = 0x7FC00000u;
    let nan = bitcast<f32>(nan_bits);
    out.position = vec4<f32>(nan, nan, nan, nan);
  }

  return out;
}
`,St=`
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
};

`+Ie+`

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(2) @binding(0) var<uniform> globals: GlobalUniforms;
@group(3) @binding(0) var imageryTexture: texture_2d<f32>;
@group(3) @binding(1) var imagerySampler: sampler;

fn srgbToLinear(c: vec3<f32>) -> vec3<f32> {
  return pow(c, vec3<f32>(2.2));
}

fn slopeAngleColor(deg: f32) -> vec4<f32> {
  // Gaia GPS-style discrete slope angle bands (sRGB → linear)
  let green  = pow(vec3<f32>(0.35, 0.85, 0.1), vec3<f32>(2.2));
  let yellow = pow(vec3<f32>(1.0, 0.85, 0.0), vec3<f32>(2.2));
  let orange = pow(vec3<f32>(1.0, 0.5, 0.0), vec3<f32>(2.2));
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

  var color = mix(green, yellow, t_yellow);
  color = mix(color, orange, t_orange);
  color = mix(color, red, t_red);
  color = mix(color, purple, t_purple);
  color = mix(color, blue, t_blue);
  color = mix(color, black, t_black);
  return vec4<f32>(color, t_enter);
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

  let lit = base_color * mix(1.0, shade, uniforms.hillshade_opacity);
  var terrain_color = clamp(lit, vec3<f32>(0.0), vec3<f32>(1.0));

  // Elevation contours (adaptive Shepard-tone blending across octaves)
  let elevation_ft = elevation_m * 3.28084;
  let contour = clamp(blendedContours(elevation_ft, uv) * 2.0, 0.0, 1.0) * uniforms.contour_opacity;
  terrain_color = mix(terrain_color, vec3<f32>(0.0), contour);

  // Apply atmospheric scattering
  let result = applyAtmosphere(terrain_color, world_position);

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
`,Ct=`
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
`,Bt=`
`+Ie+`

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
`;function ze(u){return(u+180)/360}function Pe(u){const e=u*Math.PI/180;return(1-Math.log(Math.tan(e)+1/Math.cos(e))/Math.PI)/2}function qe(u){const[e,t,r,i]=u.bounds;return{minZoom:u.minzoom,maxZoom:u.maxzoom,minX:ze(e),maxX:ze(r),minY:Pe(i),maxY:Pe(t)}}function Ne(u){const e=Array.isArray(u)?u[0]:u;return(t,r,i)=>e.replace("{z}",t).replace("{x}",r).replace("{y}",i)}function Ee(u,e){const t=(e+.5)/(1<<u),r=2*Math.atan(Math.exp(Math.PI*(1-2*t)))-Math.PI/2;return 1/(40075016686e-3*Math.cos(r))}function Et(u,e){const t=(e+.5)/(1<<u),r=2*Math.atan(Math.exp(Math.PI*(1-2*t)))-Math.PI/2;return 40075016686e-3*Math.cos(r)/(1<<u)/512}const He=new Float64Array(16),Ve=new Float64Array(16),Ze=new Float64Array(16),$e=new Float64Array(16),Qe=new Float64Array(16),Ke=new Float64Array(16);function ht(u,e,t,r,i,a){const s=1/(512*(1<<e)),n=t/(1<<e),o=r/(1<<e);u[0]=s,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=i*a,u[6]=0,u[7]=0,u[8]=0,u[9]=0,u[10]=s,u[11]=0,u[12]=n,u[13]=0,u[14]=o,u[15]=1}function je(u,e,t){for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let s=0;s<4;s++)a+=e[r+s*4]*t[s+i*4];u[r+i*4]=a}}function At(u,e,t,r,i,a,s,n){for(let o=0;o<16;o++)$e[o]=e[o],Qe[o]=t[o];ht(He,r,i,a,s,n),je(Ve,$e,He),je(Ze,Qe,Ve);for(let o=0;o<16;o++)u[o]=Ze[o]}function Ut(u,e,t,r,i,a){ht(Ke,e,t,r,i,a);for(let s=0;s<16;s++)u[s]=Ke[s]}function Je(u,e,t,r,i,a){const s=Math.pow(2,u-r);return{offsetU:i*s-e,offsetV:a*s-t,scaleU:s,scaleV:s}}function et(u,e,t){return Math.min(u+e,t)}function zt(u,e,t,r){const i=r-u;if(i<=0){const l=u-r;return[{z:r,x:e>>l,y:t>>l}]}const a=1<<i,s=e<<i,n=t<<i,o=[];for(let l=0;l<a;l++)for(let f=0;f<a;f++)o.push({z:r,x:s+f,y:n+l});return o}function Pt(u){const e=[],t=u;return e.push(Me(t[3]+t[0],t[7]+t[4],t[11]+t[8],t[15]+t[12])),e.push(Me(t[3]-t[0],t[7]-t[4],t[11]-t[8],t[15]-t[12])),e.push(Me(t[3]+t[1],t[7]+t[5],t[11]+t[9],t[15]+t[13])),e.push(Me(t[3]-t[1],t[7]-t[5],t[11]-t[9],t[15]-t[13])),e.push(Me(t[2],t[6],t[10],t[14])),e.push(Me(t[3]-t[2],t[7]-t[6],t[11]-t[10],t[15]-t[14])),e}function Me(u,e,t,r){const i=Math.sqrt(u*u+e*e+t*t);return[u/i,e/i,t/i,r/i]}function Rt(u,e,t,r,i,a,s){let n=!0;for(let o=0;o<6;o++){const[l,f,h,p]=u[o],c=l>=0?i:e,d=f>=0?a:t,_=h>=0?s:r,m=l>=0?e:i,y=f>=0?t:a,x=h>=0?r:s;if(l*c+f*d+h*_+p<0)return-1;l*m+f*y+h*x+p<0&&(n=!1)}return n?1:0}function It(u,e,t,r,i,a){const s=1/(1<<e),n=t*s,o=r*s,l=3,f=s/(l-1),h=512/(l-1),p=new Float64Array(l*l),c=new Float64Array(l*l);for(let _=0;_<l;_++)for(let m=0;m<l;m++){const y=n+m*f,x=o+_*f,g=u[0]*y+u[8]*x+u[12],S=u[1]*y+u[9]*x+u[13],E=u[3]*y+u[11]*x+u[15];if(E<=0)return 1/0;const A=_*l+m;p[A]=(g/E*.5+.5)*i,c[A]=(.5-S/E*.5)*a}let d=0;for(let _=0;_<l;_++)for(let m=0;m<l;m++){const y=_*l+m;if(m<l-1){const x=y+1,g=p[x]-p[y],S=c[x]-c[y];d=Math.max(d,Math.sqrt(g*g+S*S)/h)}if(_<l-1){const x=y+l,g=p[x]-p[y],S=c[x]-c[y];d=Math.max(d,Math.sqrt(g*g+S*S)/h)}}return d}function Ft(u,e,t,r,i,a){const s=1/(1<<u);let n=0,o=r;const l=a.getElevationBounds(u,e,t);if(l){const f=Ee(u,t);n=l.minElevation*f*i,o=l.maxElevation*f*i}return{minX:e*s,maxX:(e+1)*s,minY:n,maxY:o,minZ:t*s,maxZ:(t+1)*s}}const Gt=14,Lt=4,kt=200;function Dt(u,e,t,r,i,a,s,n,o){const l=Pt(u),f=[],h=s&&s.minZoom!=null?s.minZoom:Lt,p=s&&s.maxZoom!=null?s.maxZoom:Gt;function c(d,_,m){if(f.length>=kt)return;const{minX:y,maxX:x,minY:g,maxY:S,minZ:E,maxZ:A}=Ft(d,_,m,r,i,n);if(s&&(x<s.minX||y>s.maxX||A<s.minY||E>s.maxY)||Rt(l,y,g,E,x,S,A)===-1)return;if(d<h){const U=d+1,T=_*2,w=m*2;c(U,T,w),c(U,T+1,w),c(U,T,w+1),c(U,T+1,w+1);return}if(!n.hasTile(d,_,m)){n.requestTile(d,_,m);return}if(d<p&&It(u,d,_,m,e,t)>a){const U=d+1,T=_*2,w=m*2;if(n.isResolved(U,T,w)&&n.isResolved(U,T+1,w)&&n.isResolved(U,T,w+1)&&n.isResolved(U,T+1,w+1)&&(!o||o(U,T,w)&o(U,T+1,w)&o(U,T,w+1)&o(U,T+1,w+1))){c(U,T,w),c(U,T+1,w),c(U,T,w+1),c(U,T+1,w+1);return}n.hasTile(U,T,w)?o&&o(U,T,w):n.requestTile(U,T,w),n.hasTile(U,T+1,w)?o&&o(U,T+1,w):n.requestTile(U,T+1,w),n.hasTile(U,T,w+1)?o&&o(U,T,w+1):n.requestTile(U,T,w+1),n.hasTile(U,T+1,w+1)?o&&o(U,T+1,w+1):n.requestTile(U,T+1,w+1)}f.push({z:d,x:_,y:m})}return c(0,0,0),f}const Re=10,tt=349525,Ae=new Uint32Array(Re);{let u=1;for(let e=0;e<Re;e++)Ae[e]=(u-1)/3,u*=4}function Ot(u){const e=new Float32Array(tt),t=new Float32Array(tt),r=Re-1,i=Ae[r],a=512,s=514;for(let n=0;n<a;n++)for(let o=0;o<a;o++){const l=n+1,f=o+1,h=u[l*s+f],p=u[l*s+f+1],c=u[(l+1)*s+f],d=u[(l+1)*s+f+1],_=i+n*a+o;e[_]=Math.min(h,p,c,d),t[_]=Math.max(h,p,c,d)}for(let n=r-1;n>=0;n--){const o=Ae[n],l=Ae[n+1],f=1<<n,h=1<<n+1;for(let p=0;p<f;p++)for(let c=0;c<f;c++){const d=o+p*f+c,_=p*2,m=c*2,y=l+_*h+m,x=y+1,g=l+(_+1)*h+m,S=g+1;e[d]=Math.min(e[y],e[x],e[g],e[S]),t[d]=Math.max(t[y],t[x],t[g],t[S])}}return{minElev:e,maxElev:t}}function Yt(u,e,t,r,i,a,s,n,o,l,f,h){let p,c;if(r!==0){let d=(s-u)/r,_=(l-u)/r;if(d>_){const m=d;d=_,_=m}p=d,c=_}else{if(u<s||u>l)return null;p=-1/0,c=1/0}if(i!==0){let d=(n-e)/i,_=(f-e)/i;if(d>_){const m=d;d=_,_=m}d>p&&(p=d),_<c&&(c=_)}else if(e<n||e>f)return null;if(p>c)return null;if(a!==0){let d=(o-t)/a,_=(h-t)/a;if(d>_){const m=d;d=_,_=m}d>p&&(p=d),_<c&&(c=_)}else if(t<o||t>h)return null;return p>c||c<0?null:[p,c]}function it(u,e,t,r,i,a,s,n,o,l,f,h,p,c,d){const _=l-s,m=f-n,y=h-o,x=p-s,g=c-n,S=d-o,E=i*S-a*g,A=a*x-r*S,v=r*g-i*x,L=_*E+m*A+y*v;if(L>-1e-10&&L<1e-10)return-1;const W=1/L,U=u-s,T=e-n,w=t-o,Y=(U*E+T*A+w*v)*W;if(Y<0||Y>1)return-1;const z=T*y-w*m,Z=w*_-U*y,Q=U*m-T*_,se=(r*z+i*Z+a*Q)*W;if(se<0||Y+se>1)return-1;const j=(x*z+g*Z+S*Q)*W;return j>0?j:-1}function Xt(u,e,t,r,i,a,s,n,o){let l=1/0,f=-1,h=-1;const p=new Int32Array(Re*4*3);let c=0;p[c++]=0,p[c++]=0,p[c++]=0;const d=514;for(;c>0;){const _=p[--c],m=p[--c],y=p[--c],x=Ae[y],g=1<<y,S=x+m*g+_,E=512>>>y,A=_*E,v=A+E,L=m*E,W=L+E,U=u[S],T=e[S],w=Yt(r,i,a,s,n,o,A,U,L,v,T,W);if(w&&!(w[0]>=l))if(y===Re-1){const Y=m+1,z=_+1,Z=t[Y*d+z],Q=t[Y*d+z+1],se=t[(Y+1)*d+z],j=t[(Y+1)*d+z+1];let J=it(r,i,a,s,n,o,_,Z,m,_,se,m+1,_+1,Q,m);J>0&&J<l&&(l=J,f=m,h=_),J=it(r,i,a,s,n,o,_+1,Q,m,_,se,m+1,_+1,j,m+1),J>0&&J<l&&(l=J,f=m,h=_)}else{const Y=y+1,z=m*2,Z=_*2;p[c++]=Y,p[c++]=z,p[c++]=Z,p[c++]=Y,p[c++]=z,p[c++]=Z+1,p[c++]=Y,p[c++]=z+1,p[c++]=Z,p[c++]=Y,p[c++]=z+1,p[c++]=Z+1}}return l===1/0?null:{t:l,patchRow:f,patchCol:h}}const Wt=150,qt=8,Nt=new OffscreenCanvas(514,514),rt=Nt.getContext("2d",{willReadFrequently:!0});function Ht(u){rt.drawImage(u,0,0);const{data:e}=rt.getImageData(0,0,514,514),t=new Float32Array(514*514);let r=1/0,i=-1/0;for(let a=0;a<514*514;a++){const s=a*4,n=-1e4+(e[s]*65536+e[s+1]*256+e[s+2])*.1;t[a]=n,n<r&&(r=n),n>i&&(i=n)}return{elevations:t,minElevation:r,maxElevation:i}}class Vt{constructor(e,{tileUrl:t}={}){this.device=e,this.tileUrl=t||((r,i,a)=>`tiles/${r}/${i}/${a}.webp`),this.cache=new Map,this.pending=new Map,this.failed=new Set,this.activeRequests=0,this.requestQueue=[],this.bindGroupLayout=null,this.onTileResolved=null,this.wantedKeys=new Set,this.bounds=null,this.aabbCache=new Map}getElevationBounds(e,t,r){return this.aabbCache.get(this._key(e,t,r))||null}setBounds(e){this.bounds=e}setBindGroupLayout(e){this.bindGroupLayout=e,this._flatTileTexture=null,this._flatTileBindGroup=null,this._flatTileElevations=null}_ensureFlatTile(){if(this._flatTileTexture)return;this._flatTileElevations=new Float32Array(514*514),this._flatTileTexture=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});const e=2304;this.device.queue.writeTexture({texture:this._flatTileTexture},new Uint8Array(e*514),{bytesPerRow:e},[514,514]),this._flatTileBindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:this._flatTileTexture.createView()}]})}_cacheFlatTile(e){this._ensureFlatTile(),this.aabbCache.set(e,{minElevation:0,maxElevation:0}),this.cache.set(e,{texture:this._flatTileTexture,bindGroup:this._flatTileBindGroup,elevations:this._flatTileElevations,quadtree:null,minElevation:0,maxElevation:0,lastUsed:performance.now(),isFlat:!0})}_key(e,t,r){return`${e}/${t}/${r}`}hasTile(e,t,r){const i=this._key(e,t,r);this.wantedKeys.add(i);const a=this.cache.get(i);return a?(a.lastUsed=performance.now(),!0):!1}isResolved(e,t,r){const i=this._key(e,t,r);return this.wantedKeys.add(i),this.cache.has(i)||this.failed.has(i)}getTile(e,t,r){const i=this._key(e,t,r),a=this.cache.get(i);return a?(a.lastUsed=performance.now(),a):null}requestTile(e,t,r){const i=this._key(e,t,r);if(this.wantedKeys.add(i),!(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))){if(this.bounds&&this._isOutOfBounds(e,t,r)){this.failed.add(i);return}this.requestQueue.push({z:e,x:t,y:r,key:i}),this._processQueue()}}_isOutOfBounds(e,t,r){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),s=t*a,n=(t+1)*a,o=r*a,l=(r+1)*a;return n<i.minX||s>i.maxX||l<i.minY||o>i.maxY}_processQueue(){for(;this.activeRequests<qt&&this.requestQueue.length>0;){const{z:e,x:t,y:r,key:i}=this.requestQueue.shift();if(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))continue;this.activeRequests++;const a=new AbortController;this.pending.set(i,a),this._loadTile(e,t,r,i,a.signal).finally(()=>{this.pending.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,r,i,a){try{const s=this.tileUrl(e,t,r),n=await fetch(s,{signal:a});if(!n.ok){this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,r);return}const o=await n.blob(),l=await createImageBitmap(o,{colorSpaceConversion:"none"}),{elevations:f,minElevation:h,maxElevation:p}=Ht(l);if(l.close(),this.aabbCache.set(i,{minElevation:h,maxElevation:p}),a.aborted)return;const c=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),d=2304,_=new Uint8Array(d*514),m=new Uint8Array(f.buffer);for(let x=0;x<514;x++)_.set(m.subarray(x*514*4,(x+1)*514*4),x*d);this.device.queue.writeTexture({texture:c},_,{bytesPerRow:d},[514,514]);const y=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:c.createView()}]});this.cache.set(i,{texture:c,bindGroup:y,elevations:f,quadtree:null,minElevation:h,maxElevation:p,lastUsed:performance.now()}),this.onTileResolved&&this.onTileResolved(e,t,r)}catch(s){if(s.name==="AbortError")return;this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,r)}}ensureQuadtree(e,t,r){const i=this.cache.get(this._key(e,t,r));return i?(i.quadtree||(i.quadtree=Ot(i.elevations)),i):null}stripQuadtrees(){for(const[e,t]of this.cache)!this.wantedKeys.has(e)&&t.quadtree&&(t.quadtree=null)}cancelStale(){for(const[e,t]of this.pending)this.wantedKeys.has(e)||t.abort()}evict(){for(;this.cache.size>Wt;){let e=null,t=1/0;for(const[i,a]of this.cache)this.wantedKeys.has(i)||a.lastUsed<t&&(t=a.lastUsed,e=i);if(!e)break;const r=this.cache.get(e);r.isFlat||r.texture.destroy(),this.cache.delete(e)}}beginFrame(){this.requestQueue=[],this.wantedKeys=new Set}}const Zt=8;class $t{constructor({tileUrl:e}={}){this.tileUrl=e||((t,r,i)=>`sentinel_tiles/${t}/${r}/${i}.webp`),this.fetched=new Map,this.pending=new Map,this.abortControllers=new Map,this.failed=new Set,this.consumers=new Map,this.terrainToSat=new Map,this.activeRequests=0,this.requestQueue=[],this.onTileLoaded=null,this.bounds=null}setBounds(e){this.bounds=e}_key(e,t,r){return`${e}/${t}/${r}`}getBitmap(e,t,r){return this.fetched.get(this._key(e,t,r))||null}isFailed(e,t,r){return this.failed.has(this._key(e,t,r))}requestTile(e,t,r,i){const a=this._key(e,t,r);let s=this.consumers.get(a);s||(s=new Set,this.consumers.set(a,s)),s.add(i);let n=this.terrainToSat.get(i);if(n||(n=new Set,this.terrainToSat.set(i,n)),n.add(a),!(this.fetched.has(a)||this.failed.has(a)||this.pending.has(a))){if(this.bounds&&this._isOutOfBounds(e,t,r)){this.failed.add(a);return}this.requestQueue.push({z:e,x:t,y:r,key:a}),this._processQueue()}}_isOutOfBounds(e,t,r){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),s=t*a,n=(t+1)*a,o=r*a,l=(r+1)*a;return n<i.minX||s>i.maxX||l<i.minY||o>i.maxY}getConsumers(e,t,r){return this.consumers.get(this._key(e,t,r))||null}removeConsumer(e){const t=this.terrainToSat.get(e);if(t){for(const r of t){const i=this.consumers.get(r);if(i&&(i.delete(e),i.size===0)){this.consumers.delete(r);const a=this.abortControllers.get(r);a&&(a.abort(),this.abortControllers.delete(r));const s=this.fetched.get(r);s&&(s.close(),this.fetched.delete(r))}}this.terrainToSat.delete(e)}}beginFrame(){this.requestQueue=[]}_processQueue(){for(;this.activeRequests<Zt&&this.requestQueue.length>0;){const{z:e,x:t,y:r,key:i}=this.requestQueue.shift();if(this.fetched.has(i)||this.pending.has(i)||this.failed.has(i))continue;const a=this.consumers.get(i);if(!a||a.size===0)continue;this.activeRequests++;const s=new AbortController;this.abortControllers.set(i,s);const n=this._loadTile(e,t,r,i,s.signal);this.pending.set(i,n),n.finally(()=>{this.pending.delete(i),this.abortControllers.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,r,i,a){try{const s=this.tileUrl(e,t,r),n=await fetch(s,{signal:a});if(!n.ok){this.failed.add(i);return}const o=await n.blob(),l=await createImageBitmap(o);this.fetched.set(i,l),this.onTileLoaded&&this.onTileLoaded(e,t,r)}catch(s){if(s.name==="AbortError")return;this.failed.add(i)}}}const le=512,Qt=4;class Kt{constructor(e,t,r,i){this.device=e,this.layers=t,this.bindGroupLayout=r,this.sampler=i,this.entries=new Map,this.onUpdate=null;for(const a of t)a.imageryManager.onTileLoaded=(s,n,o)=>this._onSatelliteTileLoaded(a,s,n,o)}_terrainKey(e,t,r){return`${e}/${t}/${r}`}ensureImagery(e,t,r,i){const a=this._terrainKey(e,t,r),s=this.entries.get(a);if(s){s.lastUsed=performance.now();return}const n=new OffscreenCanvas(le,le),o=n.getContext("2d"),l=this.device.createTexture({size:[le,le],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),f=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:l.createView()},{binding:1,resource:this.sampler}]}),h=this.layers.map(c=>{const d=Math.min(i,c.maxzoom);return{satTiles:zt(e,t,r,d),imageryManager:c.imageryManager}}),p={canvas:n,ctx:o,texture:l,bindGroup:f,layerData:h,tz:e,tx:t,ty:r,needsUpload:!1,hasContent:!1,lastUsed:performance.now()};this.entries.set(a,p);for(const c of h)for(const d of c.satTiles)c.imageryManager.requestTile(d.z,d.x,d.y,a);this._recomposite(p),p.needsUpload&&this._upload(p)}getBindGroup(e,t,r){const i=this.entries.get(this._terrainKey(e,t,r));return i?i.bindGroup:null}hasImagery(e,t,r){const i=this.entries.get(this._terrainKey(e,t,r));return i?i.hasContent:!1}gc(e){for(const[t,r]of this.entries)if(!(e&&e.has(t))){r.texture.destroy();for(const i of r.layerData)i.imageryManager.removeConsumer(t);this.entries.delete(t)}}release(e,t,r){const i=this._terrainKey(e,t,r),a=this.entries.get(i);if(a){a.texture.destroy();for(const s of a.layerData)s.imageryManager.removeConsumer(i);this.entries.delete(i)}}_onSatelliteTileLoaded(e,t,r,i){const a=e.imageryManager.getConsumers(t,r,i);if(a){for(const s of a){const n=this.entries.get(s);n&&(this._recomposite(n),this._upload(n))}this.onUpdate&&this.onUpdate()}}_recomposite(e){const{ctx:t}=e;t.clearRect(0,0,le,le),this._fillFromAncestor(e);let r=e.hasContent;for(let i=0;i<this.layers.length;i++){const a=this.layers[i],s=e.layerData[i];t.globalCompositeOperation=a.blend||"source-over",t.globalAlpha=a.opacity!=null?a.opacity:1;for(const n of s.satTiles){const o=s.imageryManager.getBitmap(n.z,n.x,n.y);if(!o)continue;r=!0;const l=Je(e.tz,e.tx,e.ty,n.z,n.x,n.y);t.drawImage(o,l.offsetU*le,l.offsetV*le,l.scaleU*le,l.scaleV*le)}}t.globalCompositeOperation="source-over",t.globalAlpha=1,r&&(e.needsUpload=!0,e.hasContent=!0)}_fillFromAncestor(e){const{tz:t,tx:r,ty:i,ctx:a}=e;for(let s=1;s<=t-Qt;s++){const n=t-s,o=r>>s,l=i>>s,f=this.entries.get(this._terrainKey(n,o,l));if(f&&f.hasContent){const h=Je(t,r,i,n,o,l);a.drawImage(f.canvas,h.offsetU*le,h.offsetV*le,h.scaleU*le,h.scaleV*le),e.needsUpload=!0,e.hasContent=!0;return}}}_upload(e){this.device.queue.copyExternalImageToTexture({source:e.canvas},{texture:e.texture},[le,le]),e.needsUpload=!1}}class jt{constructor(){this.features=[],this.lineFeatures=[]}async load(e,t={}){let r;typeof e=="string"?r=await(await fetch(e)).json():r=e;const i=t.simplify,a=t.simplifyFn;this.features=[],this.lineFeatures=[];for(const s of r.features)if(s.geometry){if(s.geometry.type==="Point"){const[n,o]=s.geometry.coordinates;this.features.push({mercatorX:ze(n),mercatorY:Pe(o),lon:n,lat:o,properties:s.properties||{}})}else if(s.geometry.type==="LineString"){let n=s.geometry.coordinates;if(i!=null&&a){const l=n.map(([h,p,c])=>({x:h,y:p,elev:c||0}));n=a(l,i,!0).map(h=>[h.x,h.y,h.elev])}const o=n.map(([l,f,h])=>({mercatorX:ze(l),mercatorY:Pe(f),elevation:h||0,lon:l,lat:f}));this.lineFeatures.push({coordinates:o,properties:s.properties||{}})}}return this}}const Jt=`
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
`,ei=`
struct CircleUniforms {
  projection_view: mat4x4<f32>,
  viewport_size: vec2<f32>,
  pixel_ratio: f32,
  exaggeration: f32,
  atmosphere_opacity: f32,
};

`+Ie+`

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
`,ke=1e4,Ye=14,De=Ye*4;function st(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}class ti{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._radius=i["circle-radius"]||4,this._fillColor=st(i["circle-color"]||"#ff3333"),this._strokeColor=st(i["circle-stroke-color"]||"#ffffff"),this._strokeWidth=i["circle-stroke-width"]||0,this._opacity=i["circle-opacity"]!=null?i["circle-opacity"]:1,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._pipelineDepthTest=null,this._pipelineNoDepthTest=null,this._instanceBuffer=null,this._instanceData=null,this._uniformBuffer=null,this._uniformBindGroup=null,this._visibleCount=0,this._visibleFeatures=null}init(e,t,r){this._device=e;const i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._instanceData=new Float32Array(ke*Ye),this._instanceBuffer=e.createBuffer({size:ke*De,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});const a=e.createShaderModule({code:Jt}),s=e.createShaderModule({code:ei}),n=e.createPipelineLayout({bindGroupLayouts:[t,i]}),o={module:a,entryPoint:"vs_circle",buffers:[{arrayStride:De,stepMode:"instance",attributes:[{format:"float32x3",offset:0,shaderLocation:0},{format:"float32",offset:12,shaderLocation:1},{format:"float32x4",offset:16,shaderLocation:2},{format:"float32x4",offset:32,shaderLocation:3},{format:"float32",offset:48,shaderLocation:4},{format:"float32",offset:52,shaderLocation:5}]}]},l={module:s,entryPoint:"fs_circle",targets:[{format:r,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]};this._pipelineDepthTest=e.createRenderPipeline({layout:n,vertex:o,fragment:l,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"}}),this._pipelineNoDepthTest=e.createRenderPipeline({layout:n,vertex:o,fragment:l,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}})}prepare(e,t,r,i,a){const s=this._source.features,n=this._instanceData;let o=0;for(let f=0;f<s.length&&o<ke;f++){const h=s[f],p=this._queryElevation(h.mercatorX,h.mercatorY);if(p==null||p<=0||this._visibleFeatures&&!this._visibleFeatures.has(f))continue;const c=this._estimateElevScale(h.mercatorY),d=h.mercatorX,_=p*c*a,m=h.mercatorY,y=e[0]*d+e[4]*_+e[8]*m+e[12],x=e[1]*d+e[5]*_+e[9]*m+e[13],g=e[3]*d+e[7]*_+e[11]*m+e[15];if(g<=0)continue;const S=y/g,E=x/g,A=.2;if(S<-1-A||S>1+A||E<-1-A||E>1+A)continue;const v=o*Ye;n[v]=d,n[v+1]=_,n[v+2]=m,n[v+3]=this._radius,n[v+4]=this._fillColor[0],n[v+5]=this._fillColor[1],n[v+6]=this._fillColor[2],n[v+7]=this._fillColor[3],n[v+8]=this._strokeColor[0],n[v+9]=this._strokeColor[1],n[v+10]=this._strokeColor[2],n[v+11]=this._strokeColor[3],n[v+12]=this._strokeWidth,n[v+13]=this._opacity,o++}this._visibleCount=o,o>0&&this._device.queue.writeBuffer(this._instanceBuffer,0,n.buffer,0,o*De);const l=new Float32Array(24);l.set(e,0),l[16]=t,l[17]=r,l[18]=i,l[19]=a,l[20]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._uniformBuffer,0,l)}draw(e,t,r=!0){this._visibleCount!==0&&(e.setPipeline(r?this._pipelineDepthTest:this._pipelineNoDepthTest),e.setBindGroup(0,t),e.setBindGroup(1,this._uniformBindGroup),e.setVertexBuffer(0,this._instanceBuffer),e.draw(6,this._visibleCount))}getCollisionItems(e,t,r,i,a){const s=this._source.features,n=t/i,o=r/i,l=this._radius+this._strokeWidth,f=[];for(let h=0;h<s.length;h++){const p=s[h],c=this._queryElevation(p.mercatorX,p.mercatorY);if(c==null||c<=0)continue;const d=this._estimateElevScale(p.mercatorY),_=p.mercatorX,m=c*d*a,y=p.mercatorY,x=e[0]*_+e[4]*m+e[8]*y+e[12],g=e[1]*_+e[5]*m+e[9]*y+e[13],S=e[2]*_+e[6]*m+e[10]*y+e[14],E=e[3]*_+e[7]*m+e[11]*y+e[15];if(E<=0)continue;const A=x/E,v=g/E;A<-1.2||A>1.2||v<-1.2||v>1.2||f.push({layerIndex:-1,featureIndex:h,sourceFeatureIndex:h,screenX:(A*.5+.5)*n,screenY:(.5-v*.5)*o,halfW:l,halfH:l,depth:S/E,clipW:E})}return f}setVisibleFeatures(e){this._visibleFeatures=e}_estimateElevScale(e){const r=Math.floor(e*1024);return Ee(10,r)}}const Ge=96,Se=Ge/4;function ii(u,e){const{fontAtlas:t,vertexTransform:r=ri,vertexProjection:i=si,fragmentShaderBody:a=oi,colorTargets:s,depthStencil:n,multisample:o,initialCapacity:l=1024}=e,f=Array.isArray(s)?s:[s];let h=[],p=0,c=!1,d=0,_=l,m=u.createBuffer({label:"gpu-text-characters",size:_*Ge,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),y=new Float32Array(_*Se);const x=u.createBuffer({label:"gpu-text-uniforms",size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),g=u.createSampler({label:"gpu-text-sampler",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),S=ni(r,i),E=ai(a),A=u.createShaderModule({label:"gpu-text-vertex",code:S}),v=u.createShaderModule({label:"gpu-text-fragment",code:E}),L=u.createRenderPipeline({label:"gpu-text",layout:"auto",vertex:{module:A,entryPoint:"vertexMain"},fragment:{module:v,entryPoint:"fragmentMain",targets:f},primitive:{topology:"triangle-strip",stripIndexFormat:void 0,cullMode:"none"},depthStencil:n,multisample:o}),W=u.createBindGroup({layout:L.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:x}}]});let U=T();function T(){return u.createBindGroup({layout:L.getBindGroupLayout(1),entries:[{binding:0,resource:g},{binding:1,resource:t.textureView},{binding:2,resource:{buffer:m}}]})}let w=-1,Y=-1,z=!1;function Z(C){let k=0;for(const M of C)t.glyphs.has(M)&&M!==" "&&M!=="	"&&M!==`
`&&k++;return k}function Q(C){if(C<=_)return;let k=_;for(;k<C;)k*=2;const M=u.createBuffer({label:"gpu-text-characters",size:k*Ge,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),D=new Float32Array(k*Se);D.set(y),d>0&&u.queue.writeBuffer(M,0,D,0,d*Se),m.destroy(),m=M,y=D,_=k,U=T()}function se(C,k){let M=0,D=0,K=0;for(const P of C){if(P===" "){const ae=t.glyphs.get(" ");M+=ae?ae.xAdvance*k:t.fontSize*.3*k;continue}if(P==="	"){const ae=t.glyphs.get(" "),ye=ae?ae.xAdvance:t.fontSize*.3;M+=ye*4*k;continue}if(P===`
`)continue;const ee=t.glyphs.get(P);if(!ee)continue;M+=ee.xAdvance*k;const ne=-ee.yOffset*k,re=ee.height*k-ne;D=Math.max(D,ne),K=Math.max(K,re)}return{width:M,ascent:D,descent:K}}function j(C){const{text:k,anchor:M,offset:D,fontSize:K,color:P,strokeColor:ee,strokeWidth:ne,bufferOffset:re,align:ae,baseline:ye}=C,Le=K/t.fontSize,b=t.width,F=t.height,B=se(k,1);let G=0;ae==="center"?G=-B.width/2:ae==="right"&&(G=-B.width);let I=0;ye==="top"?I=B.ascent:ye==="middle"?I=(B.ascent-B.descent)/2:ye==="bottom"&&(I=-B.descent);let R=G,N=I,V=0;for(const H of k){if(H===" "){const ie=t.glyphs.get(" ");ie?R+=ie.xAdvance:R+=t.fontSize*.3;continue}if(H==="	"){const ie=t.glyphs.get(" "),ue=ie?ie.xAdvance:t.fontSize*.3;R+=ue*4;continue}if(H===`
`)continue;const X=t.glyphs.get(H);if(!X)continue;const O=(re+V)*Se;y[O+0]=X.x/b,y[O+1]=X.y/F,y[O+2]=(X.x+X.width)/b,y[O+3]=(X.y+X.height)/F,y[O+4]=P[0],y[O+5]=P[1],y[O+6]=P[2],y[O+7]=P[3],y[O+8]=M[0],y[O+9]=M[1],y[O+10]=M[2],y[O+11]=M[3],y[O+12]=ee[0],y[O+13]=ee[1],y[O+14]=ee[2],y[O+15]=ee[3],y[O+16]=R+X.xOffset,y[O+17]=N+X.yOffset,y[O+18]=D[0],y[O+19]=D[1],y[O+20]=X.width,y[O+21]=X.height,y[O+22]=Le,y[O+23]=ne,R+=X.xAdvance,V++}const q=re*Ge,$=re*Se;u.queue.writeBuffer(m,q,y,$,C.characterCount*Se),C.dirty=!1}function J(){if(!c)return;const C=h.filter(M=>!M.destroyed);let k=0;for(const M of C)M.bufferOffset!==k&&(M.bufferOffset=k,M.dirty=!0),k+=M.characterCount;d=k,h=C;for(const M of h)M.dirty&&j(M);c=!1}function te(C){return C.length===2?[C[0],C[1],0,1]:C.length===3?[C[0],C[1],C[2],1]:[C[0],C[1],C[2],C[3]]}return{createSpan(C){const k=Z(C.text);Q(d+k);const M={id:p++,text:C.text,anchor:te(C.position),offset:C.offset??[0,0],fontSize:C.fontSize??t.fontSize,color:C.color?[...C.color]:[1,1,1,1],strokeColor:C.strokeColor?[...C.strokeColor]:[0,0,0,0],strokeWidth:C.strokeWidth??0,align:C.align??"left",baseline:C.baseline??"baseline",bufferOffset:d,characterCount:k,destroyed:!1,dirty:!0};return h.push(M),d+=k,j(M),{setText(D){if(M.destroyed)return;const K=Z(D);K!==M.characterCount?(M.destroyed=!0,c=!0,J(),Q(d+K),M.destroyed=!1,M.text=D,M.characterCount=K,M.bufferOffset=d,M.dirty=!0,h.push(M),d+=K):(M.text=D,M.dirty=!0),j(M)},setPosition(D){M.destroyed||(M.anchor=te(D),M.dirty=!0,j(M))},setOffset(D){M.destroyed||(M.offset=[...D],M.dirty=!0,j(M))},setFontSize(D){M.destroyed||(M.fontSize=D,M.dirty=!0,j(M))},setColor(D){M.destroyed||(M.color=[...D],M.dirty=!0,j(M))},setStrokeColor(D){M.destroyed||(M.strokeColor=[...D],M.dirty=!0,j(M))},setStrokeWidth(D){M.destroyed||(M.strokeWidth=D,M.dirty=!0,j(M))},setAlign(D){M.destroyed||(M.align=D,M.dirty=!0,j(M))},setBaseline(D){M.destroyed||(M.baseline=D,M.dirty=!0,j(M))},getText(){return M.text},getCharacterCount(){return M.characterCount},destroy(){M.destroyed||(M.destroyed=!0,c=!0)},isDestroyed(){return M.destroyed}}},getBindGroupLayout(C){return L.getBindGroupLayout(C)},updateUniforms(C){const{resolution:k,viewMatrix:M}=C;if(!z||k[0]!==w||k[1]!==Y||M!==void 0){const K=new ArrayBuffer(96),P=new Float32Array(K);P[0]=k[0],P[1]=k[1],P[2]=1,P[3]=t.fieldRange??4,P[4]=t.width,P[5]=t.height,P[6]=0,P[7]=0,M?P.set(M,8):(P[8]=1,P[9]=0,P[10]=0,P[11]=0,P[12]=0,P[13]=1,P[14]=0,P[15]=0,P[16]=0,P[17]=0,P[18]=1,P[19]=0,P[20]=0,P[21]=0,P[22]=0,P[23]=1),u.queue.writeBuffer(x,0,K),w=k[0],Y=k[1],z=!0}},compact:J,draw(C,k,M=[]){if(c&&J(),k.skipUniformUpdate||this.updateUniforms(k),d!==0){C.setPipeline(L),C.setBindGroup(0,W),C.setBindGroup(1,U);for(let D=0;D<M.length;D++)C.setBindGroup(D+2,M[D]);C.draw(4,d)}},getTotalCharacterCount(){return d},destroy(){m.destroy(),x.destroy()}}}const ri=`
fn getVertex(position: vec4f) -> vec4f {
  return uniforms.viewMatrix * position;
}
`,si=`
fn projectVertex(position: vec3f, uv: vec2f, color: vec4f) -> vec4f {
  // Convert screen pixels to clip space (NDC with Y flipped)
  let x = position.x / uniforms.resolution.x * 2.0 - 1.0;
  let y = 1.0 - position.y / uniforms.resolution.y * 2.0;
  return vec4f(x, y, position.z, 1.0);
}
`,oi=`
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
`;function ni(u,e){return`
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
`}function ai(u){return`
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
`}async function li(u,e){const{atlasUrl:t,metadataUrl:r}=e,[i,a]=await Promise.all([fetch(r),fetch(t)]);if(!i.ok)throw new Error(`Failed to load atlas metadata: ${i.statusText}`);if(!a.ok)throw new Error(`Failed to load atlas image: ${a.statusText}`);const s=await i.json(),n=await a.blob(),o=await createImageBitmap(n),l=u.createTexture({label:"font-atlas-msdf",size:[s.width,s.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});u.queue.copyExternalImageToTexture({source:o},{texture:l},[s.width,s.height]);const f=document.createElement("canvas");f.width=s.width,f.height=s.height,f.getContext("2d").drawImage(o,0,0);const p=new Map;for(const c of s.glyphs)p.set(c.char,{char:c.char,x:c.x,y:c.y,width:c.width,height:c.height,xOffset:c.xOffset,yOffset:c.yOffset,xAdvance:c.xAdvance});return{texture:l,textureView:l.createView(),width:s.width,height:s.height,lineHeight:s.lineHeight,fontSize:s.fontSize,fieldRange:s.fieldRange??4,glyphs:p,debugCanvas:f}}function ot(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const ci=`
${Ie}

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
`;class ui{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._textField=i["text-field"]||"name",this._fontSize=i["text-size"]||12,this._color=ot(i["text-color"]||"#ffffff"),this._strokeColor=ot(i["text-halo-color"]||"#000000"),this._strokeWidth=i["text-halo-width"]!=null?i["text-halo-width"]:1.5,this._offset=i["text-offset"]||[0,-10],this._align=i["text-align"]||"center",this._baseline=i["text-baseline"]||"bottom",this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._textContext=null,this._spans=[],this._ready=!1,this._visibleFeatures=null,this._fontAtlas=null,this._atmosphereBindGroup=null,this._textAtmosBuffer=null,this._textAtmosData=new Float32Array(4),this._lastScaledStrokeWidth=null}init(e,t,r,i,a){this._device=e,this._fontAtlas=t,this._textContext=ii(e,{fontAtlas:t,fragmentShaderBody:ci,colorTargets:{format:r,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},depthStencil:{format:i,depthWriteEnabled:!1,depthCompare:"always"}}),this._textAtmosBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const s=this._textContext.getBindGroupLayout(2);this._atmosphereBindGroup=e.createBindGroup({layout:s,entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:this._textAtmosBuffer}}]});const n=this._fontSize/t.fontSize;for(let o=0;o<this._source.features.length;o++){const l=this._source.features[o],f=l.properties[this._textField];if(!f)continue;const h=this._textContext.createSpan({text:String(f),position:[0,0,0],fontSize:this._fontSize,color:this._color,strokeColor:this._strokeColor,strokeWidth:this._strokeWidth,offset:this._offset,align:this._align,baseline:this._baseline}),p=String(f);let c=0,d=0,_=0;for(const m of p){const y=t.glyphs.get(m);if(!y)continue;c+=y.xAdvance*n;const x=-y.yOffset*n,g=y.height*n-x;x>d&&(d=x),g>_&&(_=g)}this._spans.push({span:h,feature:l,sourceIndex:o,textWidth:c,ascent:d,descent:_})}this._ready=!0}prepare(e,t,r,i,a){if(!this._ready)return;const s=this._strokeWidth*i;if(s!==this._lastScaledStrokeWidth){this._lastScaledStrokeWidth=s;for(const{span:f}of this._spans)f.setStrokeWidth(s)}for(let f=0;f<this._spans.length;f++){const{span:h,feature:p}=this._spans[f];if(this._visibleFeatures&&!this._visibleFeatures.has(f)){h.setPosition([0,0,0,0]);continue}const c=p,d=this._queryElevation(c.mercatorX,c.mercatorY);if(d==null||d<=0){h.setPosition([0,0,0,0]);continue}const _=this._estimateElevScale(c.mercatorY),m=c.mercatorX,y=d*_*a,x=c.mercatorY;if(e[3]*m+e[7]*y+e[11]*x+e[15]<=0){h.setPosition([0,0,0,0]);continue}h.setPosition([m,y,x,1])}const n=t/i,o=r/i;this._textContext.updateUniforms({resolution:[n,o],viewMatrix:e});const l=this._textAtmosData;l[0]=a,l[1]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._textAtmosBuffer,0,l)}draw(e){this._ready&&this._textContext.getTotalCharacterCount()!==0&&this._textContext.draw(e,{resolution:[1,1],skipUniformUpdate:!0},[this._atmosphereBindGroup])}getCollisionItems(e,t,r,i,a){if(!this._ready)return[];const s=t/i,n=r/i,o=[];for(let l=0;l<this._spans.length;l++){const{feature:f,sourceIndex:h,textWidth:p,ascent:c,descent:d}=this._spans[l],_=f,m=this._queryElevation(_.mercatorX,_.mercatorY);if(m==null||m<=0)continue;const y=this._estimateElevScale(_.mercatorY),x=_.mercatorX,g=m*y*a,S=_.mercatorY,E=e[0]*x+e[4]*g+e[8]*S+e[12],A=e[1]*x+e[5]*g+e[9]*S+e[13],v=e[2]*x+e[6]*g+e[10]*S+e[14],L=e[3]*x+e[7]*g+e[11]*S+e[15];if(L<=0)continue;const W=E/L,U=A/L;if(W<-1.2||W>1.2||U<-1.2||U>1.2)continue;let T=(W*.5+.5)*s+this._offset[0],w=(.5-U*.5)*n+this._offset[1];const Y=p/2,z=(c+d)/2;this._align==="left"?T+=Y:this._align==="right"&&(T-=Y),this._baseline==="top"?w+=z:this._baseline==="bottom"&&(w-=z),o.push({layerIndex:-1,featureIndex:l,sourceFeatureIndex:h,screenX:T,screenY:w,halfW:Y,halfH:z,depth:v/L,clipW:L})}return o}setVisibleFeatures(e){this._visibleFeatures=e}_estimateElevScale(e){const r=Math.floor(e*1024);return Ee(10,r)}destroy(){this._textContext&&this._textContext.destroy(),this._textAtmosBuffer&&this._textAtmosBuffer.destroy()}}function nt(u){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(u);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const fi=`
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
`,hi=`
${Ie}

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
`,at=128;class di{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._lineColor=nt(i["line-color"]||"#ff8800"),this._borderColor=nt(i["line-border-color"]||"#331100"),this._lineWidth=i["line-width"]||3,this._borderWidth=i["line-border-width"]||0,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._gpuLines=null,this._positionBuffer=null,this._uniformBuffer=null,this._sharedBindGroup=null,this._polylines=[],this._positionData=null,this._cachedElevations=null,this._elevationsDirty=!0,this._lastExaggeration=-1,this._positionsDirty=!0,this._device=null}init(e,t,r,i){this._device=e,this._globalUniformBuffer=r,this._depthOffset=4e-7,this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"square",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:fi,fragmentShaderBody:hi})}_ensureBuffers(){if(this._positionBuffer)return;const e=this._source.lineFeatures;if(e.length===0)return;const t=this._device,r=16;let i=0;for(const s of e)i=Math.ceil(i/r)*r,i+=s.coordinates.length;if(i===0)return;this._positionBuffer=t.createBuffer({size:i*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._positionData=new Float32Array(i*4),this._cachedElevations=new Float32Array(i);let a=0;for(const s of e){a=Math.ceil(a/r)*r;const n=s.coordinates.length,o=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer,offset:a*16,size:n*16}}]});this._polylines.push({offset:a,count:n,feature:s,dataBindGroup:o}),a+=n}this._uniformBuffer=t.createBuffer({size:at,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}},{binding:1,resource:{buffer:this._globalUniformBuffer}}]})}invalidateElevations(){this._elevationsDirty=!0}prepare(e,t,r,i,a){if(!this._gpuLines||(this._ensureBuffers(),this._polylines.length===0))return;if(this._elevationsDirty){const n=this._cachedElevations;for(const o of this._polylines)for(let l=0;l<o.count;l++){const f=o.feature.coordinates[l],h=this._queryElevation(f.mercatorX,f.mercatorY);h!=null&&h>0&&n[o.offset+l]!==h&&(n[o.offset+l]=h,this._positionsDirty=!0)}this._elevationsDirty=!1}if(this._positionsDirty||a!==this._lastExaggeration){const n=this._positionData,o=this._cachedElevations;for(const l of this._polylines)for(let f=0;f<l.count;f++){const h=l.feature.coordinates[f],p=o[l.offset+f],c=(l.offset+f)*4;if(p==null||p<=0)n[c]=h.mercatorX,n[c+1]=0,n[c+2]=h.mercatorY,n[c+3]=1;else{const d=this._estimateElevScale(h.mercatorY);n[c]=h.mercatorX,n[c+1]=(p+3)*d*a,n[c+2]=h.mercatorY,n[c+3]=1}}this._device.queue.writeBuffer(this._positionBuffer,0,n),this._lastExaggeration=a,this._positionsDirty=!1}const s=new Float32Array(at/4);s.set(e,0),s[16]=this._lineColor[0],s[17]=this._lineColor[1],s[18]=this._lineColor[2],s[19]=this._lineColor[3],s[20]=this._borderColor[0],s[21]=this._borderColor[1],s[22]=this._borderColor[2],s[23]=this._borderColor[3],s[24]=this._lineWidth,s[25]=this._borderWidth,s[26]=i,s[27]=a,s[28]=this._atmosphereOpacity,s[29]=this._depthOffset,this._device.queue.writeBuffer(this._uniformBuffer,0,s),this._canvasW=t,this._canvasH=r}draw(e){if(!(!this._gpuLines||this._polylines.length===0))for(const t of this._polylines)this._gpuLines.draw(e,{vertexCount:t.count,resolution:[this._canvasW,this._canvasH]},[t.dataBindGroup,this._sharedBindGroup])}_estimateElevScale(e){const r=Math.floor(e*1024);return Ee(10,r)}destroy(){this._gpuLines&&this._gpuLines.destroy(),this._positionBuffer&&this._positionBuffer.destroy(),this._uniformBuffer&&this._uniformBuffer.destroy()}}function Oe(u,e,t){this.aabb=new t(6),this.startIndex=u,this.endIndex=e,this.node0=null,this.node1=null}const Ce=[],ge=[],xe=[],Be=[];function lt(u,e,t,r,i,a,s){let n,o;if(r!==0){let l=(s[0]-u)/r,f=(s[3]-u)/r;if(l>f){const h=l;l=f,f=h}n=l,o=f}else{if(u<s[0]||u>s[3])return null;n=-1/0,o=1/0}if(i!==0){let l=(s[1]-e)/i,f=(s[4]-e)/i;if(l>f){const h=l;l=f,f=h}l>n&&(n=l),f<o&&(o=f)}else if(e<s[1]||e>s[4])return null;if(n>o)return null;if(a!==0){let l=(s[2]-t)/a,f=(s[5]-t)/a;if(l>f){const h=l;l=f,f=h}l>n&&(n=l),f<o&&(o=f)}else if(t<s[2]||t>s[5])return null;return n>o||o<0?null:[n,o]}class pi{constructor(e,{epsilon:t=1e-6,maxItemsPerNode:r=10}={}){this._aabbs=e;const i=this._aabbs.length/6;this._epsilon=t,this._maxItemsPerNode=r,this._aabbTypeCtor=Float64Array;const a=Uint32Array;this._idArray=new a(i);for(var s=0;s<i;s++)this._idArray[s]=s;this.root=new Oe(0,i,this._aabbTypeCtor),this.computeExtents(this.root),this._nodeSplitPtr=0,Ce.length=0,Ce[0]=this.root;let n=0;for(;this._nodeSplitPtr>=0&&n++<1e6;)this.splitNode(Ce[this._nodeSplitPtr--]);if(n>1e6)throw new Error("Uh-oh, it seems like BVH construction ran into an infinite loop.");Ce.length=0}computeExtents(e){const t=e.aabb;let r=1/0,i=1/0,a=1/0,s=-1/0,n=-1/0,o=-1/0;for(let _=e.startIndex*6,m=e.endIndex*6;_<m;_+=6)r=Math.min(this._aabbs[_],r),i=Math.min(this._aabbs[_+1],i),a=Math.min(this._aabbs[_+2],a),s=Math.max(this._aabbs[_+3],s),n=Math.max(this._aabbs[_+4],n),o=Math.max(this._aabbs[_+5],o);const l=(s+r)*.5,f=(n+i)*.5,h=(o+a)*.5,p=Math.max((s-r)*.5,this._epsilon)*(1+this._epsilon),c=Math.max((n-i)*.5,this._epsilon)*(1+this._epsilon),d=Math.max((o-a)*.5,this._epsilon)*(1+this._epsilon);t[0]=l-p,t[1]=f-c,t[2]=h-d,t[3]=l+p,t[4]=f+c,t[5]=h+d}splitNode(e){let t,r,i;const a=e.startIndex,s=e.endIndex,n=s-a;if(n<=this._maxItemsPerNode||n===0)return;const o=this._aabbs,l=this._idArray;xe[0]=e.aabb[0]+e.aabb[3],xe[1]=e.aabb[1]+e.aabb[4],xe[2]=e.aabb[2]+e.aabb[5];let f=0,h=0,p=0,c=0,d=0,_=0;for(t=a*6,r=s*6;t<r;t+=6)o[t]+o[t+3]<xe[0]?f++:c++,o[t+1]+o[t+4]<xe[1]?h++:d++,o[t+2]+o[t+5]<xe[2]?p++:_++;if(ge[0]=f===0||c===0,ge[1]=h===0||d===0,ge[2]=p===0||_===0,ge[0]&&ge[1]&&ge[2])return;const m=e.aabb[3]-e.aabb[0],y=e.aabb[4]-e.aabb[1],x=e.aabb[5]-e.aabb[2];let g;if(m>=y&&m>=x?g=0:y>=x?g=1:g=2,ge[g]&&(g===0?g=y>=x?1:2:g===1?g=m>=x?0:2:g=m>=y?0:1,ge[g])){g=3-g-(g===0||g===2?1:0);for(let ae=0;ae<3;ae++)if(!ge[ae]){g=ae;break}}let S,E,A,v,L=1/0,W=1/0,U=1/0,T=-1/0,w=-1/0,Y=-1/0,z=1/0,Z=1/0,Q=1/0,se=-1/0,j=-1/0,J=-1/0;const te=xe[g];for(S=a*6,A=(s-1)*6,E=a,v=s-1;S<=A;S+=6,E++)o[S+g]+o[S+g+3]>=te?(i=l[E],l[E]=l[v],l[v]=i,i=o[S],z=Math.min(z,i),o[S]=o[A],o[A]=i,i=o[S+1],Z=Math.min(Z,i),o[S+1]=o[A+1],o[A+1]=i,i=o[S+2],Q=Math.min(Q,i),o[S+2]=o[A+2],o[A+2]=i,i=o[S+3],se=Math.max(se,i),o[S+3]=o[A+3],o[A+3]=i,i=o[S+4],j=Math.max(j,i),o[S+4]=o[A+4],o[A+4]=i,i=o[S+5],J=Math.max(J,i),o[S+5]=o[A+5],o[A+5]=i,E--,v--,S-=6,A-=6):(L=Math.min(L,o[S]),W=Math.min(W,o[S+1]),U=Math.min(U,o[S+2]),T=Math.max(T,o[S+3]),w=Math.max(w,o[S+4]),Y=Math.max(Y,o[S+5]));e.startIndex=e.endIndex=-1;const C=e.node0=new Oe(a,E,this._aabbTypeCtor),k=e.node1=new Oe(E,s,this._aabbTypeCtor);let M,D,K,P,ee,ne;const re=this._epsilon;M=(T+L)*.5,D=(w+W)*.5,K=(Y+U)*.5,P=Math.max((T-L)*.5,re)*(1+re),ee=Math.max((w-W)*.5,re)*(1+re),ne=Math.max((Y-U)*.5,re)*(1+re),C.aabb[0]=M-P,C.aabb[1]=D-ee,C.aabb[2]=K-ne,C.aabb[3]=M+P,C.aabb[4]=D+ee,C.aabb[5]=K+ne,M=(se+z)*.5,D=(j+Z)*.5,K=(J+Q)*.5,P=Math.max((se-z)*.5,re)*(1+re),ee=Math.max((j-Z)*.5,re)*(1+re),ne=Math.max((J-Q)*.5,re)*(1+re),k.aabb[0]=M-P,k.aabb[1]=D-ee,k.aabb[2]=K-ne,k.aabb[3]=M+P,k.aabb[4]=D+ee,k.aabb[5]=K+ne,E-a>this._maxItemsPerNode&&(Ce[++this._nodeSplitPtr]=e.node0),s-E>this._maxItemsPerNode&&(Ce[++this._nodeSplitPtr]=e.node1)}test(e,t){Be.length=0;var r=0;for(Be[0]=this.root;r>=0;){var i=Be[r--];if(e(i.aabb)){i.node0&&(Be[++r]=i.node0),i.node1&&(Be[++r]=i.node1);for(var a=i.startIndex;a<i.endIndex;a++)t(this._idArray[a])}}Be.length=0}rayIntersect(e,t,r,i,a,s){const n=[],o=[];let l=0;for(o[l++]=this.root;l>0;){const f=o[--l];if(lt(e,t,r,i,a,s,f.aabb)){f.node0&&(o[l++]=f.node0),f.node1&&(o[l++]=f.node1);for(let p=f.startIndex;p<f.endIndex;p++){const c=this._idArray[p],d=p*6,_=[this._aabbs[d],this._aabbs[d+1],this._aabbs[d+2],this._aabbs[d+3],this._aabbs[d+4],this._aabbs[d+5]],m=lt(e,t,r,i,a,s,_);m&&n.push({index:c,tNear:Math.max(m[0],0)})}}}return n.sort((f,h)=>f.tNear-h.tNear),n}traversePreorder(e){const t=[];let r=this.root;for(;t.length||r;){for(;r;){const i=e(r)!==!1;i&&r.node1&&t.push(r.node1),r=i&&r.node0}t.length&&(r=t.pop())}}traverseInorder(e){const t=[];let r=this.root;for(;r||t.length;){for(;r;)t.push(r),r=r.node0;r=t[t.length-1],t.pop(),e(r),r=r.node1}}traversePostorder(e){const t=[this.root];let r=null;for(;t.length;){const i=t[t.length-1];!r||r.node0===i||r.node1===i?i.node0?t.push(i.node0):i.node1?t.push(i.node1):(t.pop(),e(i)):i.node0===r?i.node0?t.push(i.node1):(t.pop(),e(i)):i.node1===r&&(t.pop(),e(i)),r=i}}}function Xe(u,e,t){const r=t;function i(c,d,_){const m=r[0]*c+r[4]*d+r[8]*_+r[12],y=r[1]*c+r[5]*d+r[9]*_+r[13],x=r[2]*c+r[6]*d+r[10]*_+r[14],g=r[3]*c+r[7]*d+r[11]*_+r[15];return[m/g,y/g,x/g]}const a=i(u,e,0),s=i(u,e,1),n=new Float64Array(a),o=s[0]-a[0],l=s[1]-a[1],f=s[2]-a[2],h=Math.sqrt(o*o+l*l+f*f),p=new Float64Array([o/h,l/h,f/h]);return{origin:n,direction:p}}function dt({origin:u,direction:e,bvh:t,tileCache:r,tileList:i,verticalExaggeration:a}){const s=u[0],n=u[1],o=u[2],l=e[0],f=e[1],h=e[2],p=t.rayIntersect(s,n,o,l,f,h);if(p.length===0)return null;let c=1/0,d=null,_=null;for(let m=0;m<p.length;m++){const{index:y,tNear:x}=p[m];if(x>=c)break;const g=i[y];if(!g)continue;const S=r.ensureQuadtree(g.z,g.x,g.y);if(!S)continue;const{quadtree:E,elevations:A}=S,W=Ee(g.z,g.y)*a,U=512*(1<<g.z),T=g.x/(1<<g.z),w=g.y/(1<<g.z),Y=(s-T)*U,z=n/W,Z=(o-w)*U,Q=l*U,se=f/W,j=h*U,J=Xt(E.minElev,E.maxElev,A,Y,z,Z,Q,se,j);if(!J)continue;const te=Y+Q*J.t,C=z+se*J.t,k=Z+j*J.t,M=te/U+T,D=C*W,K=k/U+w;let P;const ee=Math.abs(l),ne=Math.abs(f),re=Math.abs(h);ee>=ne&&ee>=re?P=(M-s)/l:ne>=re?P=(D-n)/f:P=(K-o)/h,P>0&&P<c&&(c=P,d=[M,D,K],_=g)}return d?{worldPos:d,t:c,tile:_}:null}function _i(u={}){return new Proxy({verticalExaggeration:1,densityThreshold:4,showTileBorders:!1,freezeCoverage:!1,featureDepthTest:!1,enableCollision:!0,showCollisionBoxes:!1,showImagery:!0,showFeatures:!0,showRoute:!0,slopeAngleOpacity:0,contourOpacity:1,collisionBuffer:4,occlusionBias:.03,atmosphereDensity:.35,hillshadeOpacity:.95,sunDirection:[.5,.7,.5],dirty:!0,...u},{set(e,t,r){return t!=="dirty"&&e[t]!==r&&(e.dirty=!0),e[t]=r,!0}})}function mi(u){const e=document.createElement("div");return e.className="terrain-attribution",e.innerHTML=u.filter(t=>t.attribution).map(t=>t.attribution).join(" | "),e}class gi{constructor(e,t,r,i){this._device=e,this._pixelRatio=r;const a=`
@group(1) @binding(0) var<storage, read> positions: array<vec4f>;
struct FrustumUniforms { projectionView: mat4x4f, lineColor: vec4f, borderColor: vec4f, lineWidth: f32, borderWidth: f32, pixelRatio: f32, _pad: f32, };
@group(2) @binding(0) var<uniform> u: FrustumUniforms;
struct Vertex { position: vec4f, width: f32, anchor: vec3f, }
fn getVertex(index: u32) -> Vertex {
  let p = positions[index];
  let clip = u.projectionView * p;
  return Vertex(clip, u.lineWidth * u.pixelRatio, p.xyz);
}`,s=`
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
}`;this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"round",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:a,fragmentShaderBody:s}),this._uniformBuffer=e.createBuffer({size:112,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=e.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._positionBuffer=null,this._dataBindGroup=null,this._vertexCount=0,this._frozen=!1,this._coverageProjView=null}get isFrozen(){return this._frozen}get coverageProjView(){return this._coverageProjView}freeze(e){this._frozen=!0,this._coverageProjView=new Float32Array(e);const t=new Float32Array(16);Ue(t,this._coverageProjView);const r=bt(t),i=20,a=[],s=h=>[r[h*3],r[h*3+1],r[h*3+2],1],n=()=>a.push([0,0,0,0]),o=h=>a.push(s(h)),l=(h,p)=>{n();const c=s(h),d=s(p);for(let _=0;_<=i;_++){const m=_/i;a.push([c[0]+(d[0]-c[0])*m,c[1]+(d[1]-c[1])*m,c[2]+(d[2]-c[2])*m,1])}};n(),o(0),o(1),o(2),o(3),o(0),n(),o(4),o(5),o(6),o(7),o(4),l(0,4),l(1,5),l(2,6),l(3,7),n();const f=new Float32Array(a.length*4);for(let h=0;h<a.length;h++)f[h*4]=a[h][0],f[h*4+1]=a[h][1],f[h*4+2]=a[h][2],f[h*4+3]=a[h][3];this._vertexCount=a.length,this._positionBuffer=this._device.createBuffer({size:f.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._positionBuffer,0,f),this._dataBindGroup=this._device.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer}}]})}unfreeze(){this._frozen=!1,this._coverageProjView=null,this._positionBuffer&&(this._positionBuffer.destroy(),this._positionBuffer=null),this._dataBindGroup=null}draw(e,t,r,i){if(!this._frozen||!this._positionBuffer)return;const a=new Float32Array(112/4);a.set(t,0),a[16]=0,a[17]=.5,a[18]=.15,a[19]=1,a[20]=1,a[21]=1,a[22]=1,a[23]=1,a[24]=4,a[25]=1.5,a[26]=this._pixelRatio,this._device.queue.writeBuffer(this._uniformBuffer,0,a),this._gpuLines.draw(e,{vertexCount:this._vertexCount,resolution:[r,i]},[this._dataBindGroup,this._sharedBindGroup])}destroy(){this._positionBuffer&&this._positionBuffer.destroy(),this._gpuLines.destroy(),this._uniformBuffer.destroy()}}function yi(u,e=0,t=1/0,r=1/0){u.sort((s,n)=>s.depth-n.depth);const i=[],a=new Map;for(const s of u){const n=s.screenX-s.halfW-e,o=s.screenX+s.halfW+e,l=s.screenY-s.halfH-e,f=s.screenY+s.halfH+e;let h=n<0||o>t||l<0||f>r;if(!h)for(let p=0;p<i.length;p++){const c=i[p];if(n<c.maxX&&o>c.minX&&l<c.maxY&&f>c.minY){h=!0;break}}if(h){s.visible=!1;let p=a.get(s.layerIndex);p||(p=new Set,a.set(s.layerIndex,p)),p.add(s.featureIndex)}else s.visible=!0,i.push({minX:s.screenX-s.halfW,maxX:s.screenX+s.halfW,minY:s.screenY-s.halfH,maxY:s.screenY+s.halfH})}return{items:u,hiddenByLayer:a}}const vi=`
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
`,ct=1e4,xi=8,ut=6,ft=1e3;class bi{constructor(e,t){this._device=e,this._lastCollisionTime=0,this._collisionStale=!1,this._collisionScheduled=!1,this._collisionTimer=null,this._debugItems=null;const r=e.createShaderModule({code:vi}),i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._vertexBuffer=e.createBuffer({size:ct*xi*ut*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this._linePipeline=e.createRenderPipeline({layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:r,entryPoint:"vs_colored_line",buffers:[{arrayStride:ut*4,attributes:[{format:"float32x2",offset:0,shaderLocation:0},{format:"float32x4",offset:8,shaderLocation:1}]}]},fragment:{module:r,entryPoint:"fs_colored_line",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"line-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._invProjView=new Float32Array(16)}markStale(){this._debugItems||(this._collisionStale=!0)}update({enabled:e,layers:t,projectionView:r,canvasW:i,canvasH:a,pixelRatio:s,exaggeration:n,collisionBuffer:o,occlusionBias:l,bvh:f,tileManager:h,bvhTileList:p}){const c=performance.now();if(!e){if(this._debugItems){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:_}of t)_.setVisibleFeatures(null)}return!1}const d=c-this._lastCollisionTime;return d>=ft||this._collisionStale?(this._doCollision(t,r,i,a,s,n,o,l,f,h,p),this._lastCollisionTime=c,this._collisionStale=!1,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null),!0):(this._collisionScheduled||(this._collisionScheduled=!0,this._collisionTimer=setTimeout(()=>{this._collisionScheduled=!1,this._collisionTimer=null,this._wakeCallback?.()},ft-d)),!1)}set onWake(e){this._wakeCallback=e}_doCollision(e,t,r,i,a,s,n,o,l,f,h){const p=[];let c=0;for(const{layer:g,collision:S,sourceId:E}of e){if(S){const A=g.getCollisionItems(t,r,i,a,s);for(const v of A)v.layerIndex=c,v.sourceId=E;p.push(...A)}c++}const d=r/a,_=i/a;if(l&&p.length>0){Ue(this._invProjView,t);const g=t;for(const S of p){const E=S.screenX/d*2-1,A=1-S.screenY/_*2,v=Xe(E,A,this._invProjView),L=dt({origin:v.origin,direction:v.direction,bvh:l,tileCache:f,tileList:h,verticalExaggeration:s});if(L){const[W,U,T]=L.worldPos;g[3]*W+g[7]*U+g[11]*T+g[15]<S.clipW*(1-o)&&(S.occluded=!0)}}}const m=[];for(const g of p)g.occluded||m.push(g);yi(m,n,d,_);const y=new Map;for(const g of p)if(g.occluded||!g.visible){let S=y.get(g.sourceId);S||(S=new Set,y.set(g.sourceId,S)),S.add(g.sourceFeatureIndex)}const x=new Map;for(const g of p){const S=y.get(g.sourceId);if(S&&S.has(g.sourceFeatureIndex))g.occluded||(g.visible=!1);else{let E=x.get(g.layerIndex);E||(E=new Set,x.set(g.layerIndex,E)),E.add(g.featureIndex)}}this._debugItems=p,c=0;for(const{layer:g,collision:S}of e)g.setVisibleFeatures(S?x.get(c)||new Set:null),c++}drawDebug(e,t,r,i,a){if(!this._debugItems||this._debugItems.length===0)return;const s=this._debugItems,n=Math.min(s.length,ct),o=new Float32Array(n*8*6),l=a;for(let c=0;c<n;c++){const d=s[c],_=d.screenX-d.halfW-l,m=d.screenX+d.halfW+l,y=d.screenY-d.halfH-l,x=d.screenY+d.halfH+l,g=d.occluded?.2:d.visible?0:1,S=d.occluded?.4:d.visible?1:0,E=d.occluded?1:0,A=.8,v=c*8*6;o[v]=_,o[v+1]=y,o[v+2]=g,o[v+3]=S,o[v+4]=E,o[v+5]=A,o[v+6]=m,o[v+7]=y,o[v+8]=g,o[v+9]=S,o[v+10]=E,o[v+11]=A,o[v+12]=m,o[v+13]=y,o[v+14]=g,o[v+15]=S,o[v+16]=E,o[v+17]=A,o[v+18]=m,o[v+19]=x,o[v+20]=g,o[v+21]=S,o[v+22]=E,o[v+23]=A,o[v+24]=m,o[v+25]=x,o[v+26]=g,o[v+27]=S,o[v+28]=E,o[v+29]=A,o[v+30]=_,o[v+31]=x,o[v+32]=g,o[v+33]=S,o[v+34]=E,o[v+35]=A,o[v+36]=_,o[v+37]=x,o[v+38]=g,o[v+39]=S,o[v+40]=E,o[v+41]=A,o[v+42]=_,o[v+43]=y,o[v+44]=g,o[v+45]=S,o[v+46]=E,o[v+47]=A}const f=t/i,h=r/i,p=new Float32Array([f,h,0,0]);this._device.queue.writeBuffer(this._uniformBuffer,0,p),this._device.queue.writeBuffer(this._vertexBuffer,0,o.buffer,0,n*8*6*4),e.setPipeline(this._linePipeline),e.setBindGroup(0,this._uniformBindGroup),e.setVertexBuffer(0,this._vertexBuffer),e.draw(n*8)}clear(e){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:t}of e)t.setVisibleFeatures(null)}destroy(){this._collisionTimer&&clearTimeout(this._collisionTimer),this._uniformBuffer.destroy(),this._vertexBuffer.destroy()}}class pt{static async create(e,t={}){const r=new pt;return await r._init(e,t),r}async _init(e,t){const{sources:r={},base:i=[],features:a=[],camera:s={},settings:n,createGPULines:o}=t;let l=null;const f={},h={},p=[];for(const[T,w]of Object.entries(r))if(p.push(w),w.type==="terrain"){if(l)throw new Error("Only one terrain source is allowed");l=w}else w.type==="raster"?f[T]=w:w.type==="geojson"&&(h[T]=w);if(!l)throw new Error("A terrain source is required");this._pixelRatio=t.pixelRatio||(typeof devicePixelRatio<"u"?devicePixelRatio:1),this._baseLayerConfigs=i,this._featureLayerConfigs=a,this._geojsonSources=h,this._rasterSources=f,this.canvas=e,this._terrainBounds=qe(l);const[c,d,_,m]=l.bounds;this._location=t.location||{lat:(d+m)/2,lon:(c+_)/2},this.attribution=mi(p.filter(T=>T.attribution)),this.settings=_i(n);const y=await navigator.gpu.requestAdapter();this._device=await y.requestDevice(),this._format=navigator.gpu.getPreferredCanvasFormat(),this._gpuCtx=e.getContext("webgpu"),this._gpuCtx.configure({device:this._device,format:this._format,alphaMode:"opaque"}),this.camera=wt(e,{center:[.0804792012701582,.0002040588543435183,.27264551318459634],distance:.0008177139017526437,phi:2.1624270549994598,theta:.16047571910010502,fov:Math.PI/4,near:1e-5,far:.5,rotateSpeed:.005,zoomSpeed:8e-4,panSpeed:1,...s});const x=this._device,g=this._format;this._mesh=Tt(x),this._imagerySampler=x.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});const S=x.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0}}]}),E=x.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),A=x.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),v=x.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this._globalUniformBuffer=x.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._globalUniformBindGroup=x.createBindGroup({layout:A,entries:[{binding:0,resource:{buffer:this._globalUniformBuffer}}]}),this._fallbackImageryTexture=x.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),x.queue.writeTexture({texture:this._fallbackImageryTexture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]),this._fallbackImageryBindGroup=x.createBindGroup({layout:v,entries:[{binding:0,resource:this._fallbackImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._whiteImageryTexture=x.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),x.queue.writeTexture({texture:this._whiteImageryTexture},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1]),this._whiteImageryBindGroup=x.createBindGroup({layout:v,entries:[{binding:0,resource:this._whiteImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._pipeline=x.createRenderPipeline({layout:x.createPipelineLayout({bindGroupLayouts:[S,E,A,v]}),vertex:{module:x.createShaderModule({code:Mt}),entryPoint:"vs_main",buffers:[{arrayStride:4,attributes:[{format:"uint16x2",offset:0,shaderLocation:0}]}]},fragment:{module:x.createShaderModule({code:St}),entryPoint:"fs_main",targets:[{format:g}]},primitive:{topology:"triangle-list",cullMode:"back",frontFace:"ccw"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}}),this._skyPipeline=x.createRenderPipeline({layout:x.createPipelineLayout({bindGroupLayouts:[A]}),vertex:{module:x.createShaderModule({code:Ct}),entryPoint:"vs_sky",buffers:[]},fragment:{module:x.createShaderModule({code:Bt}),entryPoint:"fs_sky",targets:[{format:g}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._frustumOverlay=new gi(x,g,this._pixelRatio,o),this._collisionManager=new bi(x,g),this._collisionManager.onWake=()=>{this._renderDirty=!0},this._UNIFORM_STRIDE=256,this._MAX_TILES_PER_FRAME=256,this._uniformBuffer=x.createBuffer({size:this._UNIFORM_STRIDE*this._MAX_TILES_PER_FRAME,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=x.createBindGroup({layout:S,entries:[{binding:0,resource:{buffer:this._uniformBuffer,size:176}}]}),this._tileManager=new Vt(x,{tileUrl:Ne(l.tiles)}),this._tileManager.setBindGroupLayout(E),this._tileManager.setBounds(this._terrainBounds),this._imageryDeltaZoom=1;const L=[];for(const T of i){const w=f[T.source];if(!w)throw new Error(`Base layer "${T.id}" references unknown source "${T.source}"`);const Y=qe(w),z=new $t({tileUrl:Ne(w.tiles)});z.setBounds(Y),L.push({imageryManager:z,blend:T.blend||"source-over",opacity:T.opacity!=null?T.opacity:1,maxzoom:w.maxzoom})}this._maxImageryZoom=L.length>0?Math.max(...L.map(T=>T.maxzoom)):0,this._compositor=new Kt(x,L,v,this._imagerySampler),this._coverageDirty=!0,this._renderDirty=!0,this._cachedRenderList=[],this._tileManager.onTileResolved=()=>{this._coverageDirty=!0,this._renderDirty=!0,this._collisionManager.markStale();for(const T of this._lineLayers)T.invalidateElevations()},this._compositor.onUpdate=()=>{this._coverageDirty=!0,this._renderDirty=!0},this._depthTexture=null,this._MAX_ELEV_Y=.001,this._mvpFloat32=new Float32Array(16),this._modelFloat32=new Float32Array(16),this._uniformData=new Float32Array(44),this._globalUniformData=new Float32Array(24),this._currentExaggeration=this.settings.verticalExaggeration,this._currentDensityThreshold=this.settings.densityThreshold,this._currentFreezeCoverage=!1,this._bvh=null,this._bvhTileList=[],this._lastProjView=new Float64Array(16),this._invProjView=new Float64Array(16),this.camera.rotateStartCallback=(T,w)=>this._hitTest(T,w),this._needsCanvasResize=!0,this._resizeObserver=new ResizeObserver(()=>{this._needsCanvasResize=!0,this._renderDirty=!0,this._coverageDirty=!0,this.camera.taint()}),this._resizeObserver.observe(e),this._circleLayers=[],this._textLayers=[],this._lineLayers=[];const W=[],U={};for(const T of a){const w=h[T.source];if(!w)throw new Error(`Feature layer "${T.id}" references unknown source "${T.source}"`);if(!U[T.source]){const z=new jt;U[T.source]=z,W.push(z.load(w.data,{...w,simplifyFn:t.simplifyFn}))}const Y=T.collision!==!1;if(T.type==="circle"){const z=new ti(T,U[T.source],(Z,Q)=>this.queryElevationMercator(Z,Q));z.init(x,A,g),z._collision=Y,z._sourceId=T.source,this._circleLayers.push(z)}else if(T.type==="text"){const z=new ui(T,U[T.source],(Z,Q)=>this.queryElevationMercator(Z,Q));z._collision=Y,z._sourceId=T.source,this._textLayers.push({layer:z,config:T})}else if(T.type==="line"){const z=new di(T,U[T.source],(Z,Q)=>this.queryElevationMercator(Z,Q));z.init(x,g,this._globalUniformBuffer,o),this._lineLayers.push(z)}}if(await Promise.all(W),t.font&&this._textLayers.length>0){const T=await li(x,{atlasUrl:t.font.atlas,metadataUrl:t.font.metadata});for(const{layer:w}of this._textLayers)w.init(x,T,g,"depth24plus",this._globalUniformBuffer)}this._running=!0,this._boundFrame=this._frame.bind(this),requestAnimationFrame(this._boundFrame)}_hitTest(e,t){const r=this.raycast(e,t);if(r)return r.worldPos;const i=this.canvas.getBoundingClientRect(),a=(e-i.left)/i.width*2-1,s=1-(t-i.top)/i.height*2;Ue(this._invProjView,this._lastProjView);const{origin:n,direction:o}=Xe(a,s,this._invProjView);if(Math.abs(o[1])>1e-10){const l=-n[1]/o[1];if(l>0)return[n[0]+l*o[0],0,n[2]+l*o[2]]}return null}_ensureDepthTexture(e,t){this._depthTexture&&this._depthTexture.width===e&&this._depthTexture.height===t||(this._depthTexture&&this._depthTexture.destroy(),this._depthTexture=this._device.createTexture({size:[e,t],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}))}_buildCollisionLayers(){const e=[];for(const t of this._circleLayers)e.push({layer:t,collision:t._collision,sourceId:t._sourceId});for(const{layer:t}of this._textLayers)e.push({layer:t,collision:t._collision,sourceId:t._sourceId});return e}paint(){const{canvas:e,camera:t,settings:r}=this,i=e.width/e.height;if(i===0||!isFinite(i))return;const{view:a,projection:s,projectionView:n}=t.update(i),o=this._device;let l=0;const f=[],h=t.state.center,p=2*Math.atan(Math.exp(Math.PI*(1-2*h[2])))-Math.PI/2,c=1/(40075016686e-3*Math.cos(p));for(const C of this._cachedRenderList){if(l>=this._MAX_TILES_PER_FRAME)break;const k=this._tileManager.getTile(C.z,C.x,C.y);if(!k)continue;const M=Et(C.z,C.y),D=et(C.z,this._imageryDeltaZoom,this._maxImageryZoom);this._compositor.ensureImagery(C.z,C.x,C.y,D);const K=this._compositor.hasImagery(C.z,C.x,C.y);At(this._mvpFloat32,a,s,C.z,C.x,C.y,c,this._currentExaggeration),Ut(this._modelFloat32,C.z,C.x,C.y,c,this._currentExaggeration);const P=this._uniformData;P.set(this._mvpFloat32,0),P.set(this._modelFloat32,16),P[32]=c,P[33]=M,P[34]=this._currentExaggeration,P[35]=1/514,P[36]=r.showTileBorders?1:0,P[37]=r.showImagery?K?1:0:1,P[38]=r.hillshadeOpacity,P[39]=r.slopeAngleOpacity,P[40]=r.contourOpacity,P[41]=e.height;let ee;r.showImagery?K?ee=this._compositor.getBindGroup(C.z,C.x,C.y):ee=this._fallbackImageryBindGroup:ee=this._whiteImageryBindGroup,o.queue.writeBuffer(this._uniformBuffer,l*this._UNIFORM_STRIDE,P.buffer,P.byteOffset,176),f.push({offset:l*this._UNIFORM_STRIDE,bindGroup:k.bindGroup,imageryBindGroup:ee}),l++}const{phi:d,theta:_,distance:m,center:y}=t.state,x=y[0]+m*Math.cos(_)*Math.cos(d),g=y[1]+m*Math.sin(_),S=y[2]+m*Math.cos(_)*Math.sin(d),E=1/c,A=g/c,v=r.sunDirection,L=v[0],W=v[1],U=v[2],T=r.atmosphereDensity,w=this._globalUniformData;w[0]=x,w[1]=g,w[2]=S,w[3]=A,w[4]=L,w[5]=W,w[6]=U,w[7]=E,w[8]=52e-7*T,w[9]=121e-7*T,w[10]=296e-7*T,w[11]=8e3,w[12]=2e-5*T,w[13]=3e3,w[14]=.76,w[15]=20;const Y=t.state.fov,z=Math.sin(d),Z=-Math.cos(d),Q=-Math.sin(_)*Math.cos(d),se=Math.cos(_),j=-Math.sin(_)*Math.sin(d);w[16]=z,w[17]=0,w[18]=Z,w[19]=i,w[20]=Q,w[21]=se,w[22]=j,w[23]=Math.tan(Y/2),o.queue.writeBuffer(this._globalUniformBuffer,0,w.buffer,w.byteOffset,96),this._ensureDepthTexture(e.width,e.height);const J=o.createCommandEncoder(),te=J.beginRenderPass({colorAttachments:[{view:this._gpuCtx.getCurrentTexture().createView(),clearValue:{r:.53,g:.66,b:.82,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this._depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});te.setPipeline(this._skyPipeline),te.setBindGroup(0,this._globalUniformBindGroup),te.draw(3),te.setPipeline(this._pipeline),te.setVertexBuffer(0,this._mesh.vertexBuffer),te.setIndexBuffer(this._mesh.indexBuffer,"uint32"),te.setBindGroup(2,this._globalUniformBindGroup);for(const C of f)te.setBindGroup(0,this._uniformBindGroup,[C.offset]),te.setBindGroup(1,C.bindGroup),te.setBindGroup(3,C.imageryBindGroup),te.drawIndexed(this._mesh.indexCount);if(this._frustumOverlay.draw(te,n,e.width,e.height),r.showRoute)for(const C of this._lineLayers)C.draw(te);if(r.showFeatures){for(const C of this._circleLayers)C.draw(te,this._globalUniformBindGroup,r.featureDepthTest);for(const{layer:C}of this._textLayers)C.draw(te)}r.showCollisionBoxes&&this._collisionManager.drawDebug(te,e.width,e.height,this._pixelRatio,r.collisionBuffer),te.end(),o.queue.submit([J.finish()])}_frame(){if(!this._running)return;requestAnimationFrame(this._boundFrame);const{canvas:e,camera:t,settings:r}=this;if(this._currentExaggeration!==r.verticalExaggeration&&(this._currentExaggeration=r.verticalExaggeration,t.taint()),this._currentDensityThreshold!==r.densityThreshold&&(this._currentDensityThreshold=r.densityThreshold,this._coverageDirty=!0),r.freezeCoverage!==this._currentFreezeCoverage&&(this._currentFreezeCoverage=r.freezeCoverage,this._currentFreezeCoverage?(this._savedFar=t.state.far,t.state.far=t.state.far*4):(this._frustumOverlay.unfreeze(),t.state.far=this._savedFar,this._coverageDirty=!0),t.taint(),this._renderDirty=!0),r.dirty&&(this._renderDirty=!0,r.dirty=!1),!this._coverageDirty&&!this._renderDirty&&!t.dirty)return;if(this._needsCanvasResize){const h=this._pixelRatio,p=Math.floor(e.clientWidth*h),c=Math.floor(e.clientHeight*h);(e.width!==p||e.height!==c)&&(e.width=p,e.height=c),this._needsCanvasResize=!1}const i=e.width/e.height,{view:a,projection:s,projectionView:n,dirty:o}=t.update(i);this._lastProjView.set(n),this._currentFreezeCoverage&&!this._frustumOverlay.isFrozen&&this._frustumOverlay.freeze(n);const l=this._frustumOverlay.coverageProjView||n;if(o&&(this._coverageDirty=!0,this._renderDirty=!0),this._coverageDirty){const h=this._MAX_ELEV_Y*this._currentExaggeration;this._tileManager.beginFrame(),this._cachedRenderList=Dt(l,e.width,e.height,h,this._currentExaggeration,r.densityThreshold,this._terrainBounds,this._tileManager,(c,d,_)=>{const m=this._tileManager.getTile(c,d,_);if(!m||m.isFlat)return!0;const y=et(c,this._imageryDeltaZoom,this._maxImageryZoom);return this._compositor.ensureImagery(c,d,_,y),this._compositor.hasImagery(c,d,_)});const p=l;this._cachedRenderList.sort((c,d)=>{const _=p[3]*((c.x+.5)/(1<<c.z))+p[11]*((c.y+.5)/(1<<c.z))+p[15],m=p[3]*((d.x+.5)/(1<<d.z))+p[11]*((d.y+.5)/(1<<d.z))+p[15];return _-m}),this._tileManager.cancelStale(),this._tileManager.evict(),this._tileManager.stripQuadtrees(),this._compositor.gc(this._tileManager.wantedKeys),this._rebuildBVH(),this._coverageDirty=!1,this._renderDirty=!0}if(!this._renderDirty)return;this._renderDirty=!1;const f=this._buildCollisionLayers();if(this._collisionManager.update({enabled:r.enableCollision,layers:f,projectionView:n,canvasW:e.width,canvasH:e.height,pixelRatio:this._pixelRatio,exaggeration:this._currentExaggeration,collisionBuffer:r.collisionBuffer,occlusionBias:r.occlusionBias,bvh:this._bvh,tileManager:this._tileManager,bvhTileList:this._bvhTileList})&&(this._renderDirty=!0),r.showFeatures){for(const h of this._circleLayers)h.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration);for(const{layer:h}of this._textLayers)h.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration)}if(r.showRoute)for(const h of this._lineLayers)h.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration);this.paint()}_rebuildBVH(){const e=this._cachedRenderList;if(e.length===0){this._bvh=null,this._bvhTileList=[];return}const t=new Float64Array(e.length*6),r=new Array(e.length);for(let i=0;i<e.length;i++){const{z:a,x:s,y:n}=e[i];r[i]=e[i];const o=1/(1<<a),l=Ee(a,n),f=this._tileManager.getElevationBounds(a,s,n),h=i*6;t[h]=s*o,t[h+1]=f?f.minElevation*l*this._currentExaggeration:0,t[h+2]=n*o,t[h+3]=(s+1)*o,t[h+4]=f?f.maxElevation*l*this._currentExaggeration:this._MAX_ELEV_Y*this._currentExaggeration,t[h+5]=(n+1)*o}this._bvh=new pi(t,{maxItemsPerNode:4}),this._bvhTileList=r}raycast(e,t){if(!this._bvh)return null;const r=this.canvas.getBoundingClientRect(),i=(e-r.left)/r.width*2-1,a=1-(t-r.top)/r.height*2;Ue(this._invProjView,this._lastProjView);const{origin:s,direction:n}=Xe(i,a,this._invProjView);return dt({origin:s,direction:n,bvh:this._bvh,tileCache:this._tileManager,tileList:this._bvhTileList,verticalExaggeration:this._currentExaggeration})}queryElevation(e,t){const r=ze(e),i=Pe(t);return this.queryElevationMercator(r,i)}queryElevationMercator(e,t){let r=null,i=-1;for(const L of this._cachedRenderList){const W=1/(1<<L.z);e>=L.x*W&&e<(L.x+1)*W&&t>=L.y*W&&t<(L.y+1)*W&&L.z>i&&(r=L,i=L.z)}if(!r)return null;const a=this._tileManager.getTile(r.z,r.x,r.y);if(!a||!a.elevations)return null;const s=1/(1<<r.z),n=(e-r.x*s)/s,o=(t-r.y*s)/s,l=n*512+1,f=o*512+1,h=Math.floor(l),p=Math.floor(f),c=l-h,d=f-p,_=514,m=Math.min(h,513),y=Math.min(h+1,513),x=Math.min(p,513),g=Math.min(p+1,513),S=a.elevations[x*_+m],E=a.elevations[x*_+y],A=a.elevations[g*_+m],v=a.elevations[g*_+y];return S*(1-c)*(1-d)+E*c*(1-d)+A*(1-c)*d+v*c*d}destroy(){this._running=!1,this._collisionManager.destroy(),this._frustumOverlay.destroy(),this._resizeObserver.disconnect(),this.camera.destroy(),this._depthTexture&&this._depthTexture.destroy(),this._mesh.vertexBuffer.destroy(),this._mesh.indexBuffer.destroy(),this._uniformBuffer.destroy(),this._globalUniformBuffer.destroy(),this._fallbackImageryTexture.destroy(),this._whiteImageryTexture.destroy();for(const e of this._lineLayers)e.destroy();this._device.destroy()}}export{pt as TerrainMap};
