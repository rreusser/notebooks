function ze(l,e){const[t,r,i,a,s,n,o,c,f,h,p,u,d,_,g,v]=e,S=t*n-r*s,m=t*o-i*s,w=t*c-a*s,B=r*o-i*n,E=r*c-a*n,x=i*c-a*o,k=f*_-h*d,W=f*g-p*d,U=f*v-u*d,A=h*g-p*_,y=h*v-u*_,I=p*v-u*g;let F=S*I-m*y+w*A+B*U-E*W+x*k;return Math.abs(F)<1e-10?!1:(F=1/F,l[0]=(n*I-o*y+c*A)*F,l[1]=(-r*I+i*y-a*A)*F,l[2]=(_*x-g*E+v*B)*F,l[3]=(-h*x+p*E-u*B)*F,l[4]=(-s*I+o*U-c*W)*F,l[5]=(t*I-i*U+a*W)*F,l[6]=(-d*x+g*w-v*m)*F,l[7]=(f*x-p*w+u*m)*F,l[8]=(s*y-n*U+c*k)*F,l[9]=(-t*y+r*U-a*k)*F,l[10]=(d*E-_*w+v*S)*F,l[11]=(-f*E+h*w-u*S)*F,l[12]=(-s*A+n*W-o*k)*F,l[13]=(t*A-r*W+i*k)*F,l[14]=(-d*B+_*m-g*S)*F,l[15]=(f*B-h*m+p*S)*F,!0)}function bt(l){function e(s,n,o){const c=l[0]*s+l[4]*n+l[8]*o+l[12],f=l[1]*s+l[5]*n+l[9]*o+l[13],h=l[2]*s+l[6]*n+l[10]*o+l[14],p=l[3]*s+l[7]*n+l[11]*o+l[15];return[c/p,f/p,h/p]}const t=.3,r=.99,i=new Float32Array(24),a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let s=0;s<4;s++){const[n,o]=a[s],c=e(n,o,t),f=e(n,o,r);i[s*3]=c[0],i[s*3+1]=c[1],i[s*3+2]=c[2],i[(s+4)*3]=f[0],i[(s+4)*3+1]=f[1],i[(s+4)*3+2]=f[2]}return i}function wt(l,e={}){const t={center:e.center?[...e.center]:[0,0,0],distance:e.distance||10,phi:e.phi||0,theta:e.theta||.3,fov:e.fov||Math.PI/4,near:e.near||.1,far:e.far||1},r=e.rotateSpeed||.01,i=e.zoomSpeed||.001,a=e.panSpeed||1,s=new Float64Array(16),n=new Float64Array(16),o=new Float64Array(16),c=new Float64Array(16);let f=!0,h=1,p=!1,u=null,d=0,_=0,g=null,v=null,S=null,m=0,w=0;function B(b,G){const C=l.getBoundingClientRect(),L=(b-C.left)/C.width*2-1,R=1-(G-C.top)/C.height*2;ze(c,o);const z=c;function H($,V,q){const Y=z[0]*$+z[4]*V+z[8]*q+z[12],re=z[1]*$+z[5]*V+z[9]*q+z[13],ue=z[2]*$+z[6]*V+z[10]*q+z[14],oe=z[3]*$+z[7]*V+z[11]*q+z[15];return[Y/oe,re/oe,ue/oe]}const Z=H(L,R,0),N=H(L,R,1);return{origin:Z,direction:[N[0]-Z[0],N[1]-Z[1],N[2]-Z[2]]}}function E(b,G){if(Math.abs(b.direction[1])<1e-10)return null;const C=(G-b.origin[1])/b.direction[1];return C<0?null:[b.origin[0]+C*b.direction[0],G,b.origin[2]+C*b.direction[2]]}let x=null,k=null;function W(b,G){U();const C=l.parentElement;if(!C)return;const L=C.getBoundingClientRect();getComputedStyle(C).position==="static"&&(C.style.position="relative");const z=document.createElement("div"),H=22,Z={position:"absolute",left:"0",top:"0",width:H+"px",height:H+"px",borderRadius:"50%",boxSizing:"border-box",pointerEvents:"none"};Object.assign(z.style,{position:"absolute",left:b-L.left-H/2+"px",top:G-L.top-H/2+"px",width:H+"px",height:H+"px",pointerEvents:"none",transform:"scale(0.5)",opacity:"0",transition:"transform 0.15s ease-out, opacity 0.15s ease-out"});const N=document.createElement("div");Object.assign(N.style,{...Z,border:"4px solid rgba(255,255,255,0.6)"});const $=document.createElement("div");Object.assign($.style,{...Z,border:"2.25px solid rgba(0,0,0,0.5)"}),z.appendChild(N),z.appendChild($),C.appendChild(z),z.offsetWidth,z.style.transform="scale(1)",z.style.opacity="1",k=z}function U(){if(!k)return;const b=k;k=null,b.style.transform="scale(1.5)",b.style.opacity="0",b.addEventListener("transitionend",()=>b.remove(),{once:!0})}function A(b,G){const{phi:C,theta:L,distance:R,center:z}=t,H=C+b,Z=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,L+G)),N=Z-L;if(!x){t.phi=H,t.theta=Z;return}const $=z[0]+R*Math.cos(L)*Math.cos(C),V=z[1]+R*Math.sin(L),q=z[2]+R*Math.cos(L)*Math.sin(C);let Y=$-x[0],re=V-x[1],ue=q-x[2];const oe=Math.cos(b),ce=Math.sin(b),fe=Y*oe-ue*ce,he=re,de=Y*ce+ue*oe,pe=-Math.sin(H),_e=Math.cos(H),me=Math.cos(N),be=Math.sin(N),ve=1-me,we=-_e*he,Fe=_e*fe-pe*de,Te=pe*he,We=pe*fe+_e*de,_t=fe*me+we*be+pe*We*ve,mt=he*me+Fe*be,gt=de*me+Te*be+_e*We*ve,yt=x[0]+_t,vt=x[1]+mt,xt=x[2]+gt;t.phi=H,t.theta=Z,t.center[0]=yt-R*Math.cos(Z)*Math.cos(H),t.center[1]=vt-R*Math.sin(Z),t.center[2]=xt-R*Math.cos(Z)*Math.sin(H)}let y=0,I=0,F=0,X=0;function Q(b){const{phi:G,theta:C,distance:L,center:R,fov:z,near:H,far:Z}=t,N=R[0]+L*Math.cos(C)*Math.cos(G),$=R[1]+L*Math.sin(C),V=R[2]+L*Math.cos(C)*Math.sin(G);let q=R[0]-N,Y=R[1]-$,re=R[2]-V;const ue=Math.sqrt(q*q+Y*Y+re*re);q/=ue,Y/=ue,re/=ue;let oe=Y*0-re*1,ce=re*0-q*0,fe=q*1-Y*0;const he=Math.sqrt(oe*oe+ce*ce+fe*fe);he>1e-4&&(oe/=he,ce/=he,fe/=he);const de=ce*re-fe*Y,pe=fe*q-oe*re,_e=oe*Y-ce*q;s[0]=oe,s[1]=de,s[2]=-q,s[3]=0,s[4]=ce,s[5]=pe,s[6]=-Y,s[7]=0,s[8]=fe,s[9]=_e,s[10]=-re,s[11]=0,s[12]=-(oe*N+ce*$+fe*V),s[13]=-(de*N+pe*$+_e*V),s[14]=q*N+Y*$+re*V,s[15]=1;const me=1/Math.tan(z/2),be=1/(H-Z);n[0]=me/b,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=me,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=Z*be,n[11]=-1,n[12]=0,n[13]=0,n[14]=H*Z*be,n[15]=0;for(let ve=0;ve<4;ve++)for(let we=0;we<4;we++){let Fe=0;for(let Te=0;Te<4;Te++)Fe+=n[ve+Te*4]*s[Te+we*4];o[ve+we*4]=Fe}}function te(b,G){const{phi:C,theta:L,distance:R}=t,z=Math.sin(C),H=-Math.cos(C),Z=-Math.sin(L)*Math.cos(C),N=Math.cos(L),$=-Math.sin(L)*Math.sin(C),V=R*a;t.center[0]-=b*z*V,t.center[0]+=G*Z*V,t.center[1]+=G*N*V,t.center[2]-=b*H*V,t.center[2]+=G*$*V}function j(b,G){if(v=null,Q(h),g){const R=g(b,G);if(Array.isArray(R)&&R.length===3){v={point:[...R],altitude:R[1]};return}}const C=B(b,G),L=E(C,t.center[1]);L&&(v={point:L,altitude:t.center[1]})}function J(b,G){if(!v)return;Q(h);const C=B(b,G),L=E(C,v.altitude);L&&(t.center[0]+=v.point[0]-L[0],t.center[2]+=v.point[2]-L[2])}function ie(b,G){S=null,Q(h);let C=null;if(g){const N=g(b,G);Array.isArray(N)&&N.length===3&&(C=N)}if(!C){const N=B(b,G);C=E(N,t.center[1])}if(!C)return;const{phi:L,theta:R}=t,z=-Math.cos(R)*Math.cos(L),H=-Math.sin(R),Z=-Math.cos(R)*Math.sin(L);S={point:[...C],normal:[z,H,Z]}}function M(b,G){if(!S)return;Q(h);const C=B(b,G),{point:L,normal:R}=S,z=R[0]*C.direction[0]+R[1]*C.direction[1]+R[2]*C.direction[2];if(Math.abs(z)<1e-10)return;const H=R[0]*L[0]+R[1]*L[1]+R[2]*L[2],Z=R[0]*C.origin[0]+R[1]*C.origin[1]+R[2]*C.origin[2],N=(H-Z)/z;if(N<0)return;const $=C.origin[0]+N*C.direction[0],V=C.origin[1]+N*C.direction[1],q=C.origin[2]+N*C.direction[2];t.center[0]+=L[0]-$,t.center[1]+=L[1]-V,t.center[2]+=L[2]-q}function D(b){if(b.preventDefault(),d=b.clientX,_=b.clientY,u=b.shiftKey?"pan":b.button===2||b.button===1?"rotate":b.ctrlKey?"pivot":b.metaKey?"rotate":b.altKey?"zoom":"grab",u==="rotate"){if(g){const G=g(b.clientX,b.clientY);x=Array.isArray(G)&&G.length===3?G:null}W(b.clientX,b.clientY)}if(u==="grab"&&j(b.clientX,b.clientY),u==="pan"&&ie(b.clientX,b.clientY),u==="zoom"){if(g){const C=g(b.clientX,b.clientY);if(Array.isArray(C)&&C.length===3){const{phi:L,theta:R,distance:z,center:H}=t,Z=H[0]+z*Math.cos(R)*Math.cos(L),N=H[1]+z*Math.sin(R),$=H[2]+z*Math.cos(R)*Math.sin(L),V=C[0]-Z,q=C[1]-N,Y=C[2]-$,re=Math.sqrt(V*V+q*q+Y*Y),ue=Math.cos(R)*Math.cos(L),oe=Math.sin(R),ce=Math.cos(R)*Math.sin(L);t.center[0]+=(z-re)*ue,t.center[1]+=(z-re)*oe,t.center[2]+=(z-re)*ce,t.distance=re}}const G=l.getBoundingClientRect();m=(b.clientX-G.left-G.width/2)/G.height,w=(b.clientY-G.top-G.height/2)/G.height,W(b.clientX,b.clientY)}p=!0,l.style.cursor="grabbing",window.addEventListener("mousemove",T),window.addEventListener("mouseup",O)}function T(b){if(!p)return;const G=b.clientX-d,C=b.clientY-_;if(d=b.clientX,_=b.clientY,u==="grab")J(b.clientX,b.clientY);else if(u==="rotate")A(G*r,C*r);else if(u==="pivot"){const{phi:L,theta:R,distance:z,center:H,fov:Z}=t,N=Z/l.getBoundingClientRect().height,$=H[0]+z*Math.cos(R)*Math.cos(L),V=H[1]+z*Math.sin(R),q=H[2]+z*Math.cos(R)*Math.sin(L);t.phi-=G*N,t.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t.theta-C*N)),t.center[0]=$-z*Math.cos(t.theta)*Math.cos(t.phi),t.center[1]=V-z*Math.sin(t.theta),t.center[2]=q-z*Math.cos(t.theta)*Math.sin(t.phi)}else if(u==="zoom"){const L=Math.exp(-C*.005),R=t.distance;t.distance=Math.max(t.near*2,R*L);const H=(1/(t.distance/R)-1)*2*Math.tan(t.fov/2);te(-m*H,-w*H)}else u==="pan"&&M(b.clientX,b.clientY);f=!0}function O(){p=!1,u=null,v=null,x=null,S=null,U(),l.style.cursor="grab",window.removeEventListener("mousemove",T),window.removeEventListener("mouseup",O)}let K=!1,P=null;function ee(b){if(b.preventDefault(),!K&&g){const N=g(b.clientX,b.clientY);if(Array.isArray(N)&&N.length===3){const{phi:$,theta:V,distance:q,center:Y}=t,re=Y[0]+q*Math.cos(V)*Math.cos($),ue=Y[1]+q*Math.sin(V),oe=Y[2]+q*Math.cos(V)*Math.sin($),ce=N[0]-re,fe=N[1]-ue,he=N[2]-oe,de=Math.sqrt(ce*ce+fe*fe+he*he),pe=Math.cos(V)*Math.cos($),_e=Math.sin(V),me=Math.cos(V)*Math.sin($);t.center[0]+=(q-de)*pe,t.center[1]+=(q-de)*_e,t.center[2]+=(q-de)*me,t.distance=de}K=!0}clearTimeout(P),P=setTimeout(()=>{K=!1},200);const G=l.getBoundingClientRect(),C=(b.clientX-G.left-G.width/2)/G.height,L=(b.clientY-G.top-G.height/2)/G.height,R=1+b.deltaY*i,z=t.distance;t.distance=Math.max(t.near*2,z*R);const Z=(1/(t.distance/z)-1)*2*Math.tan(t.fov/2);te(-C*Z,-L*Z),f=!0}function ne(b){if(b.preventDefault(),b.touches.length===1)p=!0,u="grab",d=b.touches[0].clientX,_=b.touches[0].clientY,j(d,_);else if(b.touches.length===2){const G=b.touches[1].clientX-b.touches[0].clientX,C=b.touches[1].clientY-b.touches[0].clientY;if(y=Math.sqrt(G*G+C*C),I=(b.touches[0].clientX+b.touches[1].clientX)/2,F=(b.touches[0].clientY+b.touches[1].clientY)/2,X=Math.atan2(C,G),g){const L=g(I,F);x=Array.isArray(L)&&L.length===3?L:null}}}function se(b){if(b.preventDefault(),b.touches.length===1&&p)d=b.touches[0].clientX,_=b.touches[0].clientY,u==="grab"&&J(d,_),f=!0;else if(b.touches.length===2){const G=b.touches[1].clientX-b.touches[0].clientX,C=b.touches[1].clientY-b.touches[0].clientY,L=Math.sqrt(G*G+C*C),R=(b.touches[0].clientX+b.touches[1].clientX)/2,z=(b.touches[0].clientY+b.touches[1].clientY)/2;if(y>0){const H=y/L;t.distance*=H,t.distance=Math.max(t.near*2,t.distance);const Z=Math.atan2(C,G),N=Z-X,$=l.getBoundingClientRect(),V=(z-F)/$.height;A(-N,V*2),f=!0,X=Z}y=L,I=R,F=z}}function ae(){p=!1,u=null,v=null,x=null,y=0,X=0}function ye(b){b.preventDefault()}l.style.cursor="grab",l.addEventListener("mousedown",D),l.addEventListener("wheel",ee,{passive:!1}),l.addEventListener("touchstart",ne,{passive:!1}),l.addEventListener("touchmove",se,{passive:!1}),l.addEventListener("touchend",ae),l.addEventListener("contextmenu",ye);function Le(){l.removeEventListener("mousedown",D),l.removeEventListener("wheel",ee),l.removeEventListener("touchstart",ne),l.removeEventListener("touchmove",se),l.removeEventListener("touchend",ae),l.removeEventListener("contextmenu",ye),window.removeEventListener("mousemove",T),window.removeEventListener("mouseup",O)}return{state:t,get dirty(){return f},set rotateStartCallback(b){g=b},taint(){f=!0},update(b){h=b,Q(b);const G=f;return f=!1,{view:s,projection:n,projectionView:o,dirty:G}},destroy:Le}}function Tt(l){const r=new Uint16Array(534578);let i=0;for(let p=0;p<=516;p++)for(let u=0;u<=516;u++)r[i++]=u,r[i++]=p;const s=516*516*6,n=new Uint32Array(s);let o=0;const c=517;for(let p=0;p<516;p++)for(let u=0;u<516;u++){const d=p*c+u,_=d+1,g=d+c,v=g+1;n[o++]=d,n[o++]=g,n[o++]=_,n[o++]=_,n[o++]=g,n[o++]=v}const f=l.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});l.queue.writeBuffer(f,0,r);const h=l.createBuffer({size:n.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});return l.queue.writeBuffer(h,0,n),{vertexBuffer:f,indexBuffer:h,indexCount:s,vertexCount:267289}}const Re=`
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
`;function Ee(l){return(l+180)/360}function Ae(l){const e=l*Math.PI/180;return(1-Math.log(Math.tan(e)+1/Math.cos(e))/Math.PI)/2}function qe(l){const[e,t,r,i]=l.bounds;return{minZoom:l.minzoom,maxZoom:l.maxzoom,minX:Ee(e),maxX:Ee(r),minY:Ae(i),maxY:Ae(t)}}function Ne(l){const e=Array.isArray(l)?l[0]:l;return(t,r,i)=>e.replace("{z}",t).replace("{x}",r).replace("{y}",i)}function Ue(l,e){const t=(e+.5)/(1<<l),r=2*Math.atan(Math.exp(Math.PI*(1-2*t)))-Math.PI/2;return 1/(40075016686e-3*Math.cos(r))}function Et(l,e){const t=(e+.5)/(1<<l),r=2*Math.atan(Math.exp(Math.PI*(1-2*t)))-Math.PI/2;return 40075016686e-3*Math.cos(r)/(1<<l)/512}const He=new Float64Array(16),Ve=new Float64Array(16),Ze=new Float64Array(16),$e=new Float64Array(16),Qe=new Float64Array(16),Ke=new Float64Array(16);function ht(l,e,t,r,i,a){const s=1/(512*(1<<e)),n=t/(1<<e),o=r/(1<<e);l[0]=s,l[1]=0,l[2]=0,l[3]=0,l[4]=0,l[5]=i*a,l[6]=0,l[7]=0,l[8]=0,l[9]=0,l[10]=s,l[11]=0,l[12]=n,l[13]=0,l[14]=o,l[15]=1}function je(l,e,t){for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let s=0;s<4;s++)a+=e[r+s*4]*t[s+i*4];l[r+i*4]=a}}function At(l,e,t,r,i,a,s,n){for(let o=0;o<16;o++)$e[o]=e[o],Qe[o]=t[o];ht(He,r,i,a,s,n),je(Ve,$e,He),je(Ze,Qe,Ve);for(let o=0;o<16;o++)l[o]=Ze[o]}function Ut(l,e,t,r,i,a){ht(Ke,e,t,r,i,a);for(let s=0;s<16;s++)l[s]=Ke[s]}function Je(l,e,t,r,i,a){const s=Math.pow(2,l-r);return{offsetU:i*s-e,offsetV:a*s-t,scaleU:s,scaleV:s}}function et(l,e,t){return Math.min(l+e,t)}function Pt(l,e,t,r){const i=r-l;if(i<=0){const c=l-r;return[{z:r,x:e>>c,y:t>>c}]}const a=1<<i,s=e<<i,n=t<<i,o=[];for(let c=0;c<a;c++)for(let f=0;f<a;f++)o.push({z:r,x:s+f,y:n+c});return o}function zt(l){const e=[],t=l;return e.push(Me(t[3]+t[0],t[7]+t[4],t[11]+t[8],t[15]+t[12])),e.push(Me(t[3]-t[0],t[7]-t[4],t[11]-t[8],t[15]-t[12])),e.push(Me(t[3]+t[1],t[7]+t[5],t[11]+t[9],t[15]+t[13])),e.push(Me(t[3]-t[1],t[7]-t[5],t[11]-t[9],t[15]-t[13])),e.push(Me(t[2],t[6],t[10],t[14])),e.push(Me(t[3]-t[2],t[7]-t[6],t[11]-t[10],t[15]-t[14])),e}function Me(l,e,t,r){const i=Math.sqrt(l*l+e*e+t*t);return[l/i,e/i,t/i,r/i]}function It(l,e,t,r,i,a,s){let n=!0;for(let o=0;o<6;o++){const[c,f,h,p]=l[o],u=c>=0?i:e,d=f>=0?a:t,_=h>=0?s:r,g=c>=0?e:i,v=f>=0?t:a,S=h>=0?r:s;if(c*u+f*d+h*_+p<0)return-1;c*g+f*v+h*S+p<0&&(n=!1)}return n?1:0}function Rt(l,e,t,r,i,a){const s=1/(1<<e),n=t*s,o=r*s,c=3,f=s/(c-1),h=512/(c-1),p=new Float64Array(c*c),u=new Float64Array(c*c);for(let _=0;_<c;_++)for(let g=0;g<c;g++){const v=n+g*f,S=o+_*f,m=l[0]*v+l[8]*S+l[12],w=l[1]*v+l[9]*S+l[13],B=l[3]*v+l[11]*S+l[15];if(B<=0)return 1/0;const E=_*c+g;p[E]=(m/B*.5+.5)*i,u[E]=(.5-w/B*.5)*a}let d=0;for(let _=0;_<c;_++)for(let g=0;g<c;g++){const v=_*c+g;if(g<c-1){const S=v+1,m=p[S]-p[v],w=u[S]-u[v];d=Math.max(d,Math.sqrt(m*m+w*w)/h)}if(_<c-1){const S=v+c,m=p[S]-p[v],w=u[S]-u[v];d=Math.max(d,Math.sqrt(m*m+w*w)/h)}}return d}function Ft(l,e,t,r,i,a){const s=1/(1<<l);let n=0,o=r;const c=a.getElevationBounds(l,e,t);if(c){const f=Ue(l,t);n=c.minElevation*f*i,o=c.maxElevation*f*i}return{minX:e*s,maxX:(e+1)*s,minY:n,maxY:o,minZ:t*s,maxZ:(t+1)*s}}const Gt=14,Lt=4,kt=200;function Dt(l,e,t,r,i,a,s,n,o){const c=zt(l),f=[],h=s&&s.minZoom!=null?s.minZoom:Lt,p=s&&s.maxZoom!=null?s.maxZoom:Gt;function u(d,_,g){if(f.length>=kt)return;const{minX:v,maxX:S,minY:m,maxY:w,minZ:B,maxZ:E}=Ft(d,_,g,r,i,n);if(s&&(S<s.minX||v>s.maxX||E<s.minY||B>s.maxY)||It(c,v,m,B,S,w,E)===-1)return;if(d<h){const U=d+1,A=_*2,y=g*2;u(U,A,y),u(U,A+1,y),u(U,A,y+1),u(U,A+1,y+1);return}if(!n.hasTile(d,_,g)){n.requestTile(d,_,g);return}if(d<p&&Rt(l,d,_,g,e,t)>a){const U=d+1,A=_*2,y=g*2;if(n.isResolved(U,A,y)&&n.isResolved(U,A+1,y)&&n.isResolved(U,A,y+1)&&n.isResolved(U,A+1,y+1)&&(!o||o(U,A,y)&o(U,A+1,y)&o(U,A,y+1)&o(U,A+1,y+1))){u(U,A,y),u(U,A+1,y),u(U,A,y+1),u(U,A+1,y+1);return}n.hasTile(U,A,y)?o&&o(U,A,y):n.requestTile(U,A,y),n.hasTile(U,A+1,y)?o&&o(U,A+1,y):n.requestTile(U,A+1,y),n.hasTile(U,A,y+1)?o&&o(U,A,y+1):n.requestTile(U,A,y+1),n.hasTile(U,A+1,y+1)?o&&o(U,A+1,y+1):n.requestTile(U,A+1,y+1)}f.push({z:d,x:_,y:g})}return u(0,0,0),f}const Ie=10,tt=349525,Pe=new Uint32Array(Ie);{let l=1;for(let e=0;e<Ie;e++)Pe[e]=(l-1)/3,l*=4}function Ot(l){const e=new Float32Array(tt),t=new Float32Array(tt),r=Ie-1,i=Pe[r],a=512,s=514;for(let n=0;n<a;n++)for(let o=0;o<a;o++){const c=n+1,f=o+1,h=l[c*s+f],p=l[c*s+f+1],u=l[(c+1)*s+f],d=l[(c+1)*s+f+1],_=i+n*a+o;e[_]=Math.min(h,p,u,d),t[_]=Math.max(h,p,u,d)}for(let n=r-1;n>=0;n--){const o=Pe[n],c=Pe[n+1],f=1<<n,h=1<<n+1;for(let p=0;p<f;p++)for(let u=0;u<f;u++){const d=o+p*f+u,_=p*2,g=u*2,v=c+_*h+g,S=v+1,m=c+(_+1)*h+g,w=m+1;e[d]=Math.min(e[v],e[S],e[m],e[w]),t[d]=Math.max(t[v],t[S],t[m],t[w])}}return{minElev:e,maxElev:t}}function Yt(l,e,t,r,i,a,s,n,o,c,f,h){let p,u;if(r!==0){let d=(s-l)/r,_=(c-l)/r;if(d>_){const g=d;d=_,_=g}p=d,u=_}else{if(l<s||l>c)return null;p=-1/0,u=1/0}if(i!==0){let d=(n-e)/i,_=(f-e)/i;if(d>_){const g=d;d=_,_=g}d>p&&(p=d),_<u&&(u=_)}else if(e<n||e>f)return null;if(p>u)return null;if(a!==0){let d=(o-t)/a,_=(h-t)/a;if(d>_){const g=d;d=_,_=g}d>p&&(p=d),_<u&&(u=_)}else if(t<o||t>h)return null;return p>u||u<0?null:[p,u]}function it(l,e,t,r,i,a,s,n,o,c,f,h,p,u,d){const _=c-s,g=f-n,v=h-o,S=p-s,m=u-n,w=d-o,B=i*w-a*m,E=a*S-r*w,x=r*m-i*S,k=_*B+g*E+v*x;if(k>-1e-10&&k<1e-10)return-1;const W=1/k,U=l-s,A=e-n,y=t-o,I=(U*B+A*E+y*x)*W;if(I<0||I>1)return-1;const F=A*v-y*g,X=y*_-U*v,Q=U*g-A*_,te=(r*F+i*X+a*Q)*W;if(te<0||I+te>1)return-1;const j=(S*F+m*X+w*Q)*W;return j>0?j:-1}function Xt(l,e,t,r,i,a,s,n,o){let c=1/0,f=-1,h=-1;const p=new Int32Array(Ie*4*3);let u=0;p[u++]=0,p[u++]=0,p[u++]=0;const d=514;for(;u>0;){const _=p[--u],g=p[--u],v=p[--u],S=Pe[v],m=1<<v,w=S+g*m+_,B=512>>>v,E=_*B,x=E+B,k=g*B,W=k+B,U=l[w],A=e[w],y=Yt(r,i,a,s,n,o,E,U,k,x,A,W);if(y&&!(y[0]>=c))if(v===Ie-1){const I=g+1,F=_+1,X=t[I*d+F],Q=t[I*d+F+1],te=t[(I+1)*d+F],j=t[(I+1)*d+F+1];let J=it(r,i,a,s,n,o,_,X,g,_,te,g+1,_+1,Q,g);J>0&&J<c&&(c=J,f=g,h=_),J=it(r,i,a,s,n,o,_+1,Q,g,_,te,g+1,_+1,j,g+1),J>0&&J<c&&(c=J,f=g,h=_)}else{const I=v+1,F=g*2,X=_*2;p[u++]=I,p[u++]=F,p[u++]=X,p[u++]=I,p[u++]=F,p[u++]=X+1,p[u++]=I,p[u++]=F+1,p[u++]=X,p[u++]=I,p[u++]=F+1,p[u++]=X+1}}return c===1/0?null:{t:c,patchRow:f,patchCol:h}}const Wt=150,qt=8,Nt=new OffscreenCanvas(514,514),rt=Nt.getContext("2d",{willReadFrequently:!0});function Ht(l){rt.drawImage(l,0,0);const{data:e}=rt.getImageData(0,0,514,514),t=new Float32Array(514*514);let r=1/0,i=-1/0;for(let a=0;a<514*514;a++){const s=a*4,n=-1e4+(e[s]*65536+e[s+1]*256+e[s+2])*.1;t[a]=n,n<r&&(r=n),n>i&&(i=n)}return{elevations:t,minElevation:r,maxElevation:i}}class Vt{constructor(e,{tileUrl:t}={}){this.device=e,this.tileUrl=t||((r,i,a)=>`tiles/${r}/${i}/${a}.webp`),this.cache=new Map,this.pending=new Map,this.failed=new Set,this.activeRequests=0,this.requestQueue=[],this.bindGroupLayout=null,this.onTileResolved=null,this.wantedKeys=new Set,this.bounds=null,this.aabbCache=new Map}getElevationBounds(e,t,r){return this.aabbCache.get(this._key(e,t,r))||null}setBounds(e){this.bounds=e}setBindGroupLayout(e){this.bindGroupLayout=e,this._flatTileTexture=null,this._flatTileBindGroup=null,this._flatTileElevations=null}_ensureFlatTile(){if(this._flatTileTexture)return;this._flatTileElevations=new Float32Array(514*514),this._flatTileTexture=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});const e=2304;this.device.queue.writeTexture({texture:this._flatTileTexture},new Uint8Array(e*514),{bytesPerRow:e},[514,514]),this._flatTileBindGroup=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:this._flatTileTexture.createView()}]})}_cacheFlatTile(e){this._ensureFlatTile(),this.aabbCache.set(e,{minElevation:0,maxElevation:0}),this.cache.set(e,{texture:this._flatTileTexture,bindGroup:this._flatTileBindGroup,elevations:this._flatTileElevations,quadtree:null,minElevation:0,maxElevation:0,lastUsed:performance.now(),isFlat:!0})}_key(e,t,r){return`${e}/${t}/${r}`}hasTile(e,t,r){const i=this._key(e,t,r);this.wantedKeys.add(i);const a=this.cache.get(i);return a?(a.lastUsed=performance.now(),!0):!1}isResolved(e,t,r){const i=this._key(e,t,r);return this.wantedKeys.add(i),this.cache.has(i)||this.failed.has(i)}getTile(e,t,r){const i=this._key(e,t,r),a=this.cache.get(i);return a?(a.lastUsed=performance.now(),a):null}requestTile(e,t,r){const i=this._key(e,t,r);if(this.wantedKeys.add(i),!(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))){if(this.bounds&&this._isOutOfBounds(e,t,r)){this.failed.add(i);return}this.requestQueue.push({z:e,x:t,y:r,key:i}),this._processQueue()}}_isOutOfBounds(e,t,r){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),s=t*a,n=(t+1)*a,o=r*a,c=(r+1)*a;return n<i.minX||s>i.maxX||c<i.minY||o>i.maxY}_processQueue(){for(;this.activeRequests<qt&&this.requestQueue.length>0;){const{z:e,x:t,y:r,key:i}=this.requestQueue.shift();if(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))continue;this.activeRequests++;const a=new AbortController;this.pending.set(i,a),this._loadTile(e,t,r,i,a.signal).finally(()=>{this.pending.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,r,i,a){try{const s=this.tileUrl(e,t,r),n=await fetch(s,{signal:a});if(!n.ok){this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,r);return}const o=await n.blob(),c=await createImageBitmap(o,{colorSpaceConversion:"none"}),{elevations:f,minElevation:h,maxElevation:p}=Ht(c);if(c.close(),this.aabbCache.set(i,{minElevation:h,maxElevation:p}),a.aborted)return;const u=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),d=2304,_=new Uint8Array(d*514),g=new Uint8Array(f.buffer);for(let S=0;S<514;S++)_.set(g.subarray(S*514*4,(S+1)*514*4),S*d);this.device.queue.writeTexture({texture:u},_,{bytesPerRow:d},[514,514]);const v=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:u.createView()}]});this.cache.set(i,{texture:u,bindGroup:v,elevations:f,quadtree:null,minElevation:h,maxElevation:p,lastUsed:performance.now()}),this.onTileResolved&&this.onTileResolved(e,t,r)}catch(s){if(s.name==="AbortError")return;this._cacheFlatTile(i),this.onTileResolved&&this.onTileResolved(e,t,r)}}ensureQuadtree(e,t,r){const i=this.cache.get(this._key(e,t,r));return i?(i.quadtree||(i.quadtree=Ot(i.elevations)),i):null}stripQuadtrees(){for(const[e,t]of this.cache)!this.wantedKeys.has(e)&&t.quadtree&&(t.quadtree=null)}cancelStale(){for(const[e,t]of this.pending)this.wantedKeys.has(e)||t.abort()}evict(){for(;this.cache.size>Wt;){let e=null,t=1/0;for(const[i,a]of this.cache)this.wantedKeys.has(i)||a.lastUsed<t&&(t=a.lastUsed,e=i);if(!e)break;const r=this.cache.get(e);r.isFlat||r.texture.destroy(),this.cache.delete(e)}}beginFrame(){this.requestQueue=[],this.wantedKeys=new Set}}const Zt=8;class $t{constructor({tileUrl:e}={}){this.tileUrl=e||((t,r,i)=>`sentinel_tiles/${t}/${r}/${i}.webp`),this.fetched=new Map,this.pending=new Map,this.abortControllers=new Map,this.failed=new Set,this.consumers=new Map,this.terrainToSat=new Map,this.activeRequests=0,this.requestQueue=[],this.onTileLoaded=null,this.bounds=null}setBounds(e){this.bounds=e}_key(e,t,r){return`${e}/${t}/${r}`}getBitmap(e,t,r){return this.fetched.get(this._key(e,t,r))||null}isFailed(e,t,r){return this.failed.has(this._key(e,t,r))}requestTile(e,t,r,i){const a=this._key(e,t,r);let s=this.consumers.get(a);s||(s=new Set,this.consumers.set(a,s)),s.add(i);let n=this.terrainToSat.get(i);if(n||(n=new Set,this.terrainToSat.set(i,n)),n.add(a),!(this.fetched.has(a)||this.failed.has(a)||this.pending.has(a))){if(this.bounds&&this._isOutOfBounds(e,t,r)){this.failed.add(a);return}this.requestQueue.push({z:e,x:t,y:r,key:a}),this._processQueue()}}_isOutOfBounds(e,t,r){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),s=t*a,n=(t+1)*a,o=r*a,c=(r+1)*a;return n<i.minX||s>i.maxX||c<i.minY||o>i.maxY}getConsumers(e,t,r){return this.consumers.get(this._key(e,t,r))||null}removeConsumer(e){const t=this.terrainToSat.get(e);if(t){for(const r of t){const i=this.consumers.get(r);if(i&&(i.delete(e),i.size===0)){this.consumers.delete(r);const a=this.abortControllers.get(r);a&&(a.abort(),this.abortControllers.delete(r));const s=this.fetched.get(r);s&&(s.close(),this.fetched.delete(r))}}this.terrainToSat.delete(e)}}beginFrame(){this.requestQueue=[]}_processQueue(){for(;this.activeRequests<Zt&&this.requestQueue.length>0;){const{z:e,x:t,y:r,key:i}=this.requestQueue.shift();if(this.fetched.has(i)||this.pending.has(i)||this.failed.has(i))continue;const a=this.consumers.get(i);if(!a||a.size===0)continue;this.activeRequests++;const s=new AbortController;this.abortControllers.set(i,s);const n=this._loadTile(e,t,r,i,s.signal);this.pending.set(i,n),n.finally(()=>{this.pending.delete(i),this.abortControllers.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,r,i,a){try{const s=this.tileUrl(e,t,r),n=await fetch(s,{signal:a});if(!n.ok){this.failed.add(i);return}const o=await n.blob(),c=await createImageBitmap(o);this.fetched.set(i,c),this.onTileLoaded&&this.onTileLoaded(e,t,r)}catch(s){if(s.name==="AbortError")return;this.failed.add(i)}}}const le=512,Qt=4;class Kt{constructor(e,t,r,i){this.device=e,this.layers=t,this.bindGroupLayout=r,this.sampler=i,this.entries=new Map,this.onUpdate=null;for(const a of t)a.imageryManager.onTileLoaded=(s,n,o)=>this._onSatelliteTileLoaded(a,s,n,o)}_terrainKey(e,t,r){return`${e}/${t}/${r}`}ensureImagery(e,t,r,i){const a=this._terrainKey(e,t,r),s=this.entries.get(a);if(s){s.lastUsed=performance.now();return}const n=new OffscreenCanvas(le,le),o=n.getContext("2d"),c=this.device.createTexture({size:[le,le],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),f=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:c.createView()},{binding:1,resource:this.sampler}]}),h=this.layers.map(u=>{const d=Math.min(i,u.maxzoom);return{satTiles:Pt(e,t,r,d),imageryManager:u.imageryManager}}),p={canvas:n,ctx:o,texture:c,bindGroup:f,layerData:h,tz:e,tx:t,ty:r,needsUpload:!1,hasContent:!1,lastUsed:performance.now()};this.entries.set(a,p);for(const u of h)for(const d of u.satTiles)u.imageryManager.requestTile(d.z,d.x,d.y,a);this._recomposite(p),p.needsUpload&&this._upload(p)}getBindGroup(e,t,r){const i=this.entries.get(this._terrainKey(e,t,r));return i?i.bindGroup:null}hasImagery(e,t,r){const i=this.entries.get(this._terrainKey(e,t,r));return i?i.hasContent:!1}gc(e){for(const[t,r]of this.entries)if(!(e&&e.has(t))){r.texture.destroy();for(const i of r.layerData)i.imageryManager.removeConsumer(t);this.entries.delete(t)}}release(e,t,r){const i=this._terrainKey(e,t,r),a=this.entries.get(i);if(a){a.texture.destroy();for(const s of a.layerData)s.imageryManager.removeConsumer(i);this.entries.delete(i)}}_onSatelliteTileLoaded(e,t,r,i){const a=e.imageryManager.getConsumers(t,r,i);if(a){for(const s of a){const n=this.entries.get(s);n&&(this._recomposite(n),this._upload(n))}this.onUpdate&&this.onUpdate()}}_recomposite(e){const{ctx:t}=e;t.clearRect(0,0,le,le),this._fillFromAncestor(e);let r=e.hasContent;for(let i=0;i<this.layers.length;i++){const a=this.layers[i],s=e.layerData[i];t.globalCompositeOperation=a.blend||"source-over",t.globalAlpha=a.opacity!=null?a.opacity:1;for(const n of s.satTiles){const o=s.imageryManager.getBitmap(n.z,n.x,n.y);if(!o)continue;r=!0;const c=Je(e.tz,e.tx,e.ty,n.z,n.x,n.y);t.drawImage(o,c.offsetU*le,c.offsetV*le,c.scaleU*le,c.scaleV*le)}}t.globalCompositeOperation="source-over",t.globalAlpha=1,r&&(e.needsUpload=!0,e.hasContent=!0)}_fillFromAncestor(e){const{tz:t,tx:r,ty:i,ctx:a}=e;for(let s=1;s<=t-Qt;s++){const n=t-s,o=r>>s,c=i>>s,f=this.entries.get(this._terrainKey(n,o,c));if(f&&f.hasContent){const h=Je(t,r,i,n,o,c);a.drawImage(f.canvas,h.offsetU*le,h.offsetV*le,h.scaleU*le,h.scaleV*le),e.needsUpload=!0,e.hasContent=!0;return}}}_upload(e){this.device.queue.copyExternalImageToTexture({source:e.canvas},{texture:e.texture},[le,le]),e.needsUpload=!1}}class jt{constructor(){this.features=[],this.lineFeatures=[]}async load(e,t={}){let r;typeof e=="string"?r=await(await fetch(e)).json():r=e;const i=t.simplify,a=t.simplifyFn;this.features=[],this.lineFeatures=[];for(const s of r.features)if(s.geometry){if(s.geometry.type==="Point"){const[n,o]=s.geometry.coordinates;this.features.push({mercatorX:Ee(n),mercatorY:Ae(o),lon:n,lat:o,properties:s.properties||{}})}else if(s.geometry.type==="LineString"){let n=s.geometry.coordinates;if(i!=null&&a){const c=n.map(([h,p,u])=>({x:h,y:p,elev:u||0}));n=a(c,i,!0).map(h=>[h.x,h.y,h.elev])}const o=n.map(([c,f,h])=>({mercatorX:Ee(c),mercatorY:Ae(f),elevation:h||0,lon:c,lat:f}));this.lineFeatures.push({coordinates:o,properties:s.properties||{}})}}return this}}const Jt=`
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
`,ke=1e4,Ye=14,De=Ye*4;function st(l){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(l);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}class ti{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._radius=i["circle-radius"]||4,this._fillColor=st(i["circle-color"]||"#ff3333"),this._strokeColor=st(i["circle-stroke-color"]||"#ffffff"),this._strokeWidth=i["circle-stroke-width"]||0,this._opacity=i["circle-opacity"]!=null?i["circle-opacity"]:1,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._pipelineDepthTest=null,this._pipelineNoDepthTest=null,this._instanceBuffer=null,this._instanceData=null,this._uniformBuffer=null,this._uniformBindGroup=null,this._visibleCount=0,this._visibleFeatures=null}init(e,t,r){this._device=e;const i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._instanceData=new Float32Array(ke*Ye),this._instanceBuffer=e.createBuffer({size:ke*De,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});const a=e.createShaderModule({code:Jt}),s=e.createShaderModule({code:ei}),n=e.createPipelineLayout({bindGroupLayouts:[t,i]}),o={module:a,entryPoint:"vs_circle",buffers:[{arrayStride:De,stepMode:"instance",attributes:[{format:"float32x3",offset:0,shaderLocation:0},{format:"float32",offset:12,shaderLocation:1},{format:"float32x4",offset:16,shaderLocation:2},{format:"float32x4",offset:32,shaderLocation:3},{format:"float32",offset:48,shaderLocation:4},{format:"float32",offset:52,shaderLocation:5}]}]},c={module:s,entryPoint:"fs_circle",targets:[{format:r,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]};this._pipelineDepthTest=e.createRenderPipeline({layout:n,vertex:o,fragment:c,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"}}),this._pipelineNoDepthTest=e.createRenderPipeline({layout:n,vertex:o,fragment:c,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}})}prepare(e,t,r,i,a){const s=this._source.features,n=this._instanceData;let o=0;for(let f=0;f<s.length&&o<ke;f++){const h=s[f],p=this._queryElevation(h.mercatorX,h.mercatorY);if(p==null||p<=0||this._visibleFeatures&&!this._visibleFeatures.has(f))continue;const u=this._estimateElevScale(h.mercatorY),d=h.mercatorX,_=p*u*a,g=h.mercatorY,v=e[0]*d+e[4]*_+e[8]*g+e[12],S=e[1]*d+e[5]*_+e[9]*g+e[13],m=e[3]*d+e[7]*_+e[11]*g+e[15];if(m<=0)continue;const w=v/m,B=S/m,E=.2;if(w<-1-E||w>1+E||B<-1-E||B>1+E)continue;const x=o*Ye;n[x]=d,n[x+1]=_,n[x+2]=g,n[x+3]=this._radius,n[x+4]=this._fillColor[0],n[x+5]=this._fillColor[1],n[x+6]=this._fillColor[2],n[x+7]=this._fillColor[3],n[x+8]=this._strokeColor[0],n[x+9]=this._strokeColor[1],n[x+10]=this._strokeColor[2],n[x+11]=this._strokeColor[3],n[x+12]=this._strokeWidth,n[x+13]=this._opacity,o++}this._visibleCount=o,o>0&&this._device.queue.writeBuffer(this._instanceBuffer,0,n.buffer,0,o*De);const c=new Float32Array(24);c.set(e,0),c[16]=t,c[17]=r,c[18]=i,c[19]=a,c[20]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._uniformBuffer,0,c)}draw(e,t,r=!0){this._visibleCount!==0&&(e.setPipeline(r?this._pipelineDepthTest:this._pipelineNoDepthTest),e.setBindGroup(0,t),e.setBindGroup(1,this._uniformBindGroup),e.setVertexBuffer(0,this._instanceBuffer),e.draw(6,this._visibleCount))}getCollisionItems(e,t,r,i,a){const s=this._source.features,n=t/i,o=r/i,c=this._radius+this._strokeWidth,f=[];for(let h=0;h<s.length;h++){const p=s[h],u=this._queryElevation(p.mercatorX,p.mercatorY);if(u==null||u<=0)continue;const d=this._estimateElevScale(p.mercatorY),_=p.mercatorX,g=u*d*a,v=p.mercatorY,S=e[0]*_+e[4]*g+e[8]*v+e[12],m=e[1]*_+e[5]*g+e[9]*v+e[13],w=e[2]*_+e[6]*g+e[10]*v+e[14],B=e[3]*_+e[7]*g+e[11]*v+e[15];if(B<=0)continue;const E=S/B,x=m/B;E<-1.2||E>1.2||x<-1.2||x>1.2||f.push({layerIndex:-1,featureIndex:h,sourceFeatureIndex:h,screenX:(E*.5+.5)*n,screenY:(.5-x*.5)*o,halfW:c,halfH:c,depth:w/B,clipW:B})}return f}setVisibleFeatures(e){this._visibleFeatures=e}_estimateElevScale(e){const r=Math.floor(e*1024);return Ue(10,r)}}const Ge=96,Se=Ge/4;function ii(l,e){const{fontAtlas:t,vertexTransform:r=ri,vertexProjection:i=si,fragmentShaderBody:a=oi,colorTargets:s,depthStencil:n,multisample:o,initialCapacity:c=1024}=e,f=Array.isArray(s)?s:[s];let h=[],p=0,u=!1,d=0,_=c,g=l.createBuffer({label:"gpu-text-characters",size:_*Ge,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),v=new Float32Array(_*Se);const S=l.createBuffer({label:"gpu-text-uniforms",size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),m=l.createSampler({label:"gpu-text-sampler",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),w=ni(r,i),B=ai(a),E=l.createShaderModule({label:"gpu-text-vertex",code:w}),x=l.createShaderModule({label:"gpu-text-fragment",code:B}),k=l.createRenderPipeline({label:"gpu-text",layout:"auto",vertex:{module:E,entryPoint:"vertexMain"},fragment:{module:x,entryPoint:"fragmentMain",targets:f},primitive:{topology:"triangle-strip",stripIndexFormat:void 0,cullMode:"none"},depthStencil:n,multisample:o}),W=l.createBindGroup({layout:k.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:S}}]});let U=A();function A(){return l.createBindGroup({layout:k.getBindGroupLayout(1),entries:[{binding:0,resource:m},{binding:1,resource:t.textureView},{binding:2,resource:{buffer:g}}]})}let y=-1,I=-1,F=!1;function X(M){let D=0;for(const T of M)t.glyphs.has(T)&&T!==" "&&T!=="	"&&T!==`
`&&D++;return D}function Q(M){if(M<=_)return;let D=_;for(;D<M;)D*=2;const T=l.createBuffer({label:"gpu-text-characters",size:D*Ge,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),O=new Float32Array(D*Se);O.set(v),d>0&&l.queue.writeBuffer(T,0,O,0,d*Se),g.destroy(),g=T,v=O,_=D,U=A()}function te(M,D){let T=0,O=0,K=0;for(const P of M){if(P===" "){const ae=t.glyphs.get(" ");T+=ae?ae.xAdvance*D:t.fontSize*.3*D;continue}if(P==="	"){const ae=t.glyphs.get(" "),ye=ae?ae.xAdvance:t.fontSize*.3;T+=ye*4*D;continue}if(P===`
`)continue;const ee=t.glyphs.get(P);if(!ee)continue;T+=ee.xAdvance*D;const ne=-ee.yOffset*D,se=ee.height*D-ne;O=Math.max(O,ne),K=Math.max(K,se)}return{width:T,ascent:O,descent:K}}function j(M){const{text:D,anchor:T,offset:O,fontSize:K,color:P,strokeColor:ee,strokeWidth:ne,bufferOffset:se,align:ae,baseline:ye}=M,Le=K/t.fontSize,b=t.width,G=t.height,C=te(D,1);let L=0;ae==="center"?L=-C.width/2:ae==="right"&&(L=-C.width);let R=0;ye==="top"?R=C.ascent:ye==="middle"?R=(C.ascent-C.descent)/2:ye==="bottom"&&(R=-C.descent);let z=L,H=R,Z=0;for(const V of D){if(V===" "){const re=t.glyphs.get(" ");re?z+=re.xAdvance:z+=t.fontSize*.3;continue}if(V==="	"){const re=t.glyphs.get(" "),ue=re?re.xAdvance:t.fontSize*.3;z+=ue*4;continue}if(V===`
`)continue;const q=t.glyphs.get(V);if(!q)continue;const Y=(se+Z)*Se;v[Y+0]=q.x/b,v[Y+1]=q.y/G,v[Y+2]=(q.x+q.width)/b,v[Y+3]=(q.y+q.height)/G,v[Y+4]=P[0],v[Y+5]=P[1],v[Y+6]=P[2],v[Y+7]=P[3],v[Y+8]=T[0],v[Y+9]=T[1],v[Y+10]=T[2],v[Y+11]=T[3],v[Y+12]=ee[0],v[Y+13]=ee[1],v[Y+14]=ee[2],v[Y+15]=ee[3],v[Y+16]=z+q.xOffset,v[Y+17]=H+q.yOffset,v[Y+18]=O[0],v[Y+19]=O[1],v[Y+20]=q.width,v[Y+21]=q.height,v[Y+22]=Le,v[Y+23]=ne,z+=q.xAdvance,Z++}const N=se*Ge,$=se*Se;l.queue.writeBuffer(g,N,v,$,M.characterCount*Se),M.dirty=!1}function J(){if(!u)return;const M=h.filter(T=>!T.destroyed);let D=0;for(const T of M)T.bufferOffset!==D&&(T.bufferOffset=D,T.dirty=!0),D+=T.characterCount;d=D,h=M;for(const T of h)T.dirty&&j(T);u=!1}function ie(M){return M.length===2?[M[0],M[1],0,1]:M.length===3?[M[0],M[1],M[2],1]:[M[0],M[1],M[2],M[3]]}return{createSpan(M){const D=X(M.text);Q(d+D);const T={id:p++,text:M.text,anchor:ie(M.position),offset:M.offset??[0,0],fontSize:M.fontSize??t.fontSize,color:M.color?[...M.color]:[1,1,1,1],strokeColor:M.strokeColor?[...M.strokeColor]:[0,0,0,0],strokeWidth:M.strokeWidth??0,align:M.align??"left",baseline:M.baseline??"baseline",bufferOffset:d,characterCount:D,destroyed:!1,dirty:!0};return h.push(T),d+=D,j(T),{setText(O){if(T.destroyed)return;const K=X(O);K!==T.characterCount?(T.destroyed=!0,u=!0,J(),Q(d+K),T.destroyed=!1,T.text=O,T.characterCount=K,T.bufferOffset=d,T.dirty=!0,h.push(T),d+=K):(T.text=O,T.dirty=!0),j(T)},setPosition(O){T.destroyed||(T.anchor=ie(O),T.dirty=!0,j(T))},setOffset(O){T.destroyed||(T.offset=[...O],T.dirty=!0,j(T))},setFontSize(O){T.destroyed||(T.fontSize=O,T.dirty=!0,j(T))},setColor(O){T.destroyed||(T.color=[...O],T.dirty=!0,j(T))},setStrokeColor(O){T.destroyed||(T.strokeColor=[...O],T.dirty=!0,j(T))},setStrokeWidth(O){T.destroyed||(T.strokeWidth=O,T.dirty=!0,j(T))},setAlign(O){T.destroyed||(T.align=O,T.dirty=!0,j(T))},setBaseline(O){T.destroyed||(T.baseline=O,T.dirty=!0,j(T))},getText(){return T.text},getCharacterCount(){return T.characterCount},destroy(){T.destroyed||(T.destroyed=!0,u=!0)},isDestroyed(){return T.destroyed}}},getBindGroupLayout(M){return k.getBindGroupLayout(M)},updateUniforms(M){const{resolution:D,viewMatrix:T}=M;if(!F||D[0]!==y||D[1]!==I||T!==void 0){const K=new ArrayBuffer(96),P=new Float32Array(K);P[0]=D[0],P[1]=D[1],P[2]=1,P[3]=t.fieldRange??4,P[4]=t.width,P[5]=t.height,P[6]=0,P[7]=0,T?P.set(T,8):(P[8]=1,P[9]=0,P[10]=0,P[11]=0,P[12]=0,P[13]=1,P[14]=0,P[15]=0,P[16]=0,P[17]=0,P[18]=1,P[19]=0,P[20]=0,P[21]=0,P[22]=0,P[23]=1),l.queue.writeBuffer(S,0,K),y=D[0],I=D[1],F=!0}},compact:J,draw(M,D,T=[]){if(u&&J(),D.skipUniformUpdate||this.updateUniforms(D),d!==0){M.setPipeline(k),M.setBindGroup(0,W),M.setBindGroup(1,U);for(let O=0;O<T.length;O++)M.setBindGroup(O+2,T[O]);M.draw(4,d)}},getTotalCharacterCount(){return d},destroy(){g.destroy(),S.destroy()}}}const ri=`
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
`;function ni(l,e){return`
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
`}function ai(l){return`
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
`}async function li(l,e){const{atlasUrl:t,metadataUrl:r}=e,[i,a]=await Promise.all([fetch(r),fetch(t)]);if(!i.ok)throw new Error(`Failed to load atlas metadata: ${i.statusText}`);if(!a.ok)throw new Error(`Failed to load atlas image: ${a.statusText}`);const s=await i.json(),n=await a.blob(),o=await createImageBitmap(n),c=l.createTexture({label:"font-atlas-msdf",size:[s.width,s.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});l.queue.copyExternalImageToTexture({source:o},{texture:c},[s.width,s.height]);const f=document.createElement("canvas");f.width=s.width,f.height=s.height,f.getContext("2d").drawImage(o,0,0);const p=new Map;for(const u of s.glyphs)p.set(u.char,{char:u.char,x:u.x,y:u.y,width:u.width,height:u.height,xOffset:u.xOffset,yOffset:u.yOffset,xAdvance:u.xAdvance});return{texture:c,textureView:c.createView(),width:s.width,height:s.height,lineHeight:s.lineHeight,fontSize:s.fontSize,fieldRange:s.fieldRange??4,glyphs:p,debugCanvas:f}}function ot(l){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(l);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const ci=`
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
`;class ui{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._textField=i["text-field"]||"name",this._fontSize=i["text-size"]||12,this._color=ot(i["text-color"]||"#ffffff"),this._strokeColor=ot(i["text-halo-color"]||"#000000"),this._strokeWidth=i["text-halo-width"]!=null?i["text-halo-width"]:1.5,this._offset=i["text-offset"]||[0,-10],this._align=i["text-align"]||"center",this._baseline=i["text-baseline"]||"bottom",this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._textContext=null,this._spans=[],this._ready=!1,this._visibleFeatures=null,this._fontAtlas=null,this._atmosphereBindGroup=null,this._textAtmosBuffer=null,this._textAtmosData=new Float32Array(4),this._lastScaledStrokeWidth=null}init(e,t,r,i,a){this._device=e,this._fontAtlas=t,this._textContext=ii(e,{fontAtlas:t,fragmentShaderBody:ci,colorTargets:{format:r,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},depthStencil:{format:i,depthWriteEnabled:!1,depthCompare:"always"}}),this._textAtmosBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const s=this._textContext.getBindGroupLayout(2);this._atmosphereBindGroup=e.createBindGroup({layout:s,entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:this._textAtmosBuffer}}]});const n=this._fontSize/t.fontSize;for(let o=0;o<this._source.features.length;o++){const c=this._source.features[o],f=c.properties[this._textField];if(!f)continue;const h=this._textContext.createSpan({text:String(f),position:[0,0,0],fontSize:this._fontSize,color:this._color,strokeColor:this._strokeColor,strokeWidth:this._strokeWidth,offset:this._offset,align:this._align,baseline:this._baseline}),p=String(f);let u=0,d=0,_=0;for(const g of p){const v=t.glyphs.get(g);if(!v)continue;u+=v.xAdvance*n;const S=-v.yOffset*n,m=v.height*n-S;S>d&&(d=S),m>_&&(_=m)}this._spans.push({span:h,feature:c,sourceIndex:o,textWidth:u,ascent:d,descent:_})}this._ready=!0}prepare(e,t,r,i,a){if(!this._ready)return;const s=this._strokeWidth*i;if(s!==this._lastScaledStrokeWidth){this._lastScaledStrokeWidth=s;for(const{span:f}of this._spans)f.setStrokeWidth(s)}for(let f=0;f<this._spans.length;f++){const{span:h,feature:p}=this._spans[f];if(this._visibleFeatures&&!this._visibleFeatures.has(f)){h.setPosition([0,0,0,0]);continue}const u=p,d=this._queryElevation(u.mercatorX,u.mercatorY);if(d==null||d<=0){h.setPosition([0,0,0,0]);continue}const _=this._estimateElevScale(u.mercatorY),g=u.mercatorX,v=d*_*a,S=u.mercatorY;if(e[3]*g+e[7]*v+e[11]*S+e[15]<=0){h.setPosition([0,0,0,0]);continue}h.setPosition([g,v,S,1])}const n=t/i,o=r/i;this._textContext.updateUniforms({resolution:[n,o],viewMatrix:e});const c=this._textAtmosData;c[0]=a,c[1]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._textAtmosBuffer,0,c)}draw(e){this._ready&&this._textContext.getTotalCharacterCount()!==0&&this._textContext.draw(e,{resolution:[1,1],skipUniformUpdate:!0},[this._atmosphereBindGroup])}getCollisionItems(e,t,r,i,a){if(!this._ready)return[];const s=t/i,n=r/i,o=[];for(let c=0;c<this._spans.length;c++){const{feature:f,sourceIndex:h,textWidth:p,ascent:u,descent:d}=this._spans[c],_=f,g=this._queryElevation(_.mercatorX,_.mercatorY);if(g==null||g<=0)continue;const v=this._estimateElevScale(_.mercatorY),S=_.mercatorX,m=g*v*a,w=_.mercatorY,B=e[0]*S+e[4]*m+e[8]*w+e[12],E=e[1]*S+e[5]*m+e[9]*w+e[13],x=e[2]*S+e[6]*m+e[10]*w+e[14],k=e[3]*S+e[7]*m+e[11]*w+e[15];if(k<=0)continue;const W=B/k,U=E/k;if(W<-1.2||W>1.2||U<-1.2||U>1.2)continue;let A=(W*.5+.5)*s+this._offset[0],y=(.5-U*.5)*n+this._offset[1];const I=p/2,F=(u+d)/2;this._align==="left"?A+=I:this._align==="right"&&(A-=I),this._baseline==="top"?y+=F:this._baseline==="bottom"&&(y-=F),o.push({layerIndex:-1,featureIndex:c,sourceFeatureIndex:h,screenX:A,screenY:y,halfW:I,halfH:F,depth:x/k,clipW:k})}return o}setVisibleFeatures(e){this._visibleFeatures=e}_estimateElevScale(e){const r=Math.floor(e*1024);return Ue(10,r)}destroy(){this._textContext&&this._textContext.destroy(),this._textAtmosBuffer&&this._textAtmosBuffer.destroy()}}function nt(l){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(l);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const fi=`
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
`,at=128;class di{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._lineColor=nt(i["line-color"]||"#ff8800"),this._borderColor=nt(i["line-border-color"]||"#331100"),this._lineWidth=i["line-width"]||3,this._borderWidth=i["line-border-width"]||0,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._gpuLines=null,this._positionBuffer=null,this._uniformBuffer=null,this._sharedBindGroup=null,this._polylines=[],this._positionData=null,this._cachedElevations=null,this._elevationsDirty=!0,this._lastExaggeration=-1,this._positionsDirty=!0,this._device=null}init(e,t,r,i){this._device=e,this._globalUniformBuffer=r,this._depthOffset=4e-7,this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"square",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:fi,fragmentShaderBody:hi})}_ensureBuffers(){if(this._positionBuffer)return;const e=this._source.lineFeatures;if(e.length===0)return;const t=this._device,r=16;let i=0;for(const s of e)i=Math.ceil(i/r)*r,i+=s.coordinates.length;if(i===0)return;this._positionBuffer=t.createBuffer({size:i*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._positionData=new Float32Array(i*4),this._cachedElevations=new Float32Array(i);let a=0;for(const s of e){a=Math.ceil(a/r)*r;const n=s.coordinates.length,o=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer,offset:a*16,size:n*16}}]});this._polylines.push({offset:a,count:n,feature:s,dataBindGroup:o}),a+=n}this._uniformBuffer=t.createBuffer({size:at,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}},{binding:1,resource:{buffer:this._globalUniformBuffer}}]})}invalidateElevations(){this._elevationsDirty=!0}prepare(e,t,r,i,a){if(!this._gpuLines||(this._ensureBuffers(),this._polylines.length===0))return;if(this._elevationsDirty){const n=this._cachedElevations;for(const o of this._polylines)for(let c=0;c<o.count;c++){const f=o.feature.coordinates[c],h=this._queryElevation(f.mercatorX,f.mercatorY);h!=null&&h>0&&n[o.offset+c]!==h&&(n[o.offset+c]=h,this._positionsDirty=!0)}this._elevationsDirty=!1}if(this._positionsDirty||a!==this._lastExaggeration){const n=this._positionData,o=this._cachedElevations;for(const c of this._polylines)for(let f=0;f<c.count;f++){const h=c.feature.coordinates[f],p=o[c.offset+f],u=(c.offset+f)*4;if(p==null||p<=0)n[u]=h.mercatorX,n[u+1]=0,n[u+2]=h.mercatorY,n[u+3]=1;else{const d=this._estimateElevScale(h.mercatorY);n[u]=h.mercatorX,n[u+1]=(p+3)*d*a,n[u+2]=h.mercatorY,n[u+3]=1}}this._device.queue.writeBuffer(this._positionBuffer,0,n),this._lastExaggeration=a,this._positionsDirty=!1}const s=new Float32Array(at/4);s.set(e,0),s[16]=this._lineColor[0],s[17]=this._lineColor[1],s[18]=this._lineColor[2],s[19]=this._lineColor[3],s[20]=this._borderColor[0],s[21]=this._borderColor[1],s[22]=this._borderColor[2],s[23]=this._borderColor[3],s[24]=this._lineWidth,s[25]=this._borderWidth,s[26]=i,s[27]=a,s[28]=this._atmosphereOpacity,s[29]=this._depthOffset,this._device.queue.writeBuffer(this._uniformBuffer,0,s),this._canvasW=t,this._canvasH=r}draw(e){if(!(!this._gpuLines||this._polylines.length===0))for(const t of this._polylines)this._gpuLines.draw(e,{vertexCount:t.count,resolution:[this._canvasW,this._canvasH]},[t.dataBindGroup,this._sharedBindGroup])}_estimateElevScale(e){const r=Math.floor(e*1024);return Ue(10,r)}destroy(){this._gpuLines&&this._gpuLines.destroy(),this._positionBuffer&&this._positionBuffer.destroy(),this._uniformBuffer&&this._uniformBuffer.destroy()}}function Oe(l,e,t){this.aabb=new t(6),this.startIndex=l,this.endIndex=e,this.node0=null,this.node1=null}const Ce=[],ge=[],xe=[],Be=[];function lt(l,e,t,r,i,a,s){let n,o;if(r!==0){let c=(s[0]-l)/r,f=(s[3]-l)/r;if(c>f){const h=c;c=f,f=h}n=c,o=f}else{if(l<s[0]||l>s[3])return null;n=-1/0,o=1/0}if(i!==0){let c=(s[1]-e)/i,f=(s[4]-e)/i;if(c>f){const h=c;c=f,f=h}c>n&&(n=c),f<o&&(o=f)}else if(e<s[1]||e>s[4])return null;if(n>o)return null;if(a!==0){let c=(s[2]-t)/a,f=(s[5]-t)/a;if(c>f){const h=c;c=f,f=h}c>n&&(n=c),f<o&&(o=f)}else if(t<s[2]||t>s[5])return null;return n>o||o<0?null:[n,o]}class pi{constructor(e,{epsilon:t=1e-6,maxItemsPerNode:r=10}={}){this._aabbs=e;const i=this._aabbs.length/6;this._epsilon=t,this._maxItemsPerNode=r,this._aabbTypeCtor=Float64Array;const a=Uint32Array;this._idArray=new a(i);for(var s=0;s<i;s++)this._idArray[s]=s;this.root=new Oe(0,i,this._aabbTypeCtor),this.computeExtents(this.root),this._nodeSplitPtr=0,Ce.length=0,Ce[0]=this.root;let n=0;for(;this._nodeSplitPtr>=0&&n++<1e6;)this.splitNode(Ce[this._nodeSplitPtr--]);if(n>1e6)throw new Error("Uh-oh, it seems like BVH construction ran into an infinite loop.");Ce.length=0}computeExtents(e){const t=e.aabb;let r=1/0,i=1/0,a=1/0,s=-1/0,n=-1/0,o=-1/0;for(let _=e.startIndex*6,g=e.endIndex*6;_<g;_+=6)r=Math.min(this._aabbs[_],r),i=Math.min(this._aabbs[_+1],i),a=Math.min(this._aabbs[_+2],a),s=Math.max(this._aabbs[_+3],s),n=Math.max(this._aabbs[_+4],n),o=Math.max(this._aabbs[_+5],o);const c=(s+r)*.5,f=(n+i)*.5,h=(o+a)*.5,p=Math.max((s-r)*.5,this._epsilon)*(1+this._epsilon),u=Math.max((n-i)*.5,this._epsilon)*(1+this._epsilon),d=Math.max((o-a)*.5,this._epsilon)*(1+this._epsilon);t[0]=c-p,t[1]=f-u,t[2]=h-d,t[3]=c+p,t[4]=f+u,t[5]=h+d}splitNode(e){let t,r,i;const a=e.startIndex,s=e.endIndex,n=s-a;if(n<=this._maxItemsPerNode||n===0)return;const o=this._aabbs,c=this._idArray;xe[0]=e.aabb[0]+e.aabb[3],xe[1]=e.aabb[1]+e.aabb[4],xe[2]=e.aabb[2]+e.aabb[5];let f=0,h=0,p=0,u=0,d=0,_=0;for(t=a*6,r=s*6;t<r;t+=6)o[t]+o[t+3]<xe[0]?f++:u++,o[t+1]+o[t+4]<xe[1]?h++:d++,o[t+2]+o[t+5]<xe[2]?p++:_++;if(ge[0]=f===0||u===0,ge[1]=h===0||d===0,ge[2]=p===0||_===0,ge[0]&&ge[1]&&ge[2])return;const g=e.aabb[3]-e.aabb[0],v=e.aabb[4]-e.aabb[1],S=e.aabb[5]-e.aabb[2];let m;if(g>=v&&g>=S?m=0:v>=S?m=1:m=2,ge[m]&&(m===0?m=v>=S?1:2:m===1?m=g>=S?0:2:m=g>=v?0:1,ge[m])){m=3-m-(m===0||m===2?1:0);for(let ae=0;ae<3;ae++)if(!ge[ae]){m=ae;break}}let w,B,E,x,k=1/0,W=1/0,U=1/0,A=-1/0,y=-1/0,I=-1/0,F=1/0,X=1/0,Q=1/0,te=-1/0,j=-1/0,J=-1/0;const ie=xe[m];for(w=a*6,E=(s-1)*6,B=a,x=s-1;w<=E;w+=6,B++)o[w+m]+o[w+m+3]>=ie?(i=c[B],c[B]=c[x],c[x]=i,i=o[w],F=Math.min(F,i),o[w]=o[E],o[E]=i,i=o[w+1],X=Math.min(X,i),o[w+1]=o[E+1],o[E+1]=i,i=o[w+2],Q=Math.min(Q,i),o[w+2]=o[E+2],o[E+2]=i,i=o[w+3],te=Math.max(te,i),o[w+3]=o[E+3],o[E+3]=i,i=o[w+4],j=Math.max(j,i),o[w+4]=o[E+4],o[E+4]=i,i=o[w+5],J=Math.max(J,i),o[w+5]=o[E+5],o[E+5]=i,B--,x--,w-=6,E-=6):(k=Math.min(k,o[w]),W=Math.min(W,o[w+1]),U=Math.min(U,o[w+2]),A=Math.max(A,o[w+3]),y=Math.max(y,o[w+4]),I=Math.max(I,o[w+5]));e.startIndex=e.endIndex=-1;const M=e.node0=new Oe(a,B,this._aabbTypeCtor),D=e.node1=new Oe(B,s,this._aabbTypeCtor);let T,O,K,P,ee,ne;const se=this._epsilon;T=(A+k)*.5,O=(y+W)*.5,K=(I+U)*.5,P=Math.max((A-k)*.5,se)*(1+se),ee=Math.max((y-W)*.5,se)*(1+se),ne=Math.max((I-U)*.5,se)*(1+se),M.aabb[0]=T-P,M.aabb[1]=O-ee,M.aabb[2]=K-ne,M.aabb[3]=T+P,M.aabb[4]=O+ee,M.aabb[5]=K+ne,T=(te+F)*.5,O=(j+X)*.5,K=(J+Q)*.5,P=Math.max((te-F)*.5,se)*(1+se),ee=Math.max((j-X)*.5,se)*(1+se),ne=Math.max((J-Q)*.5,se)*(1+se),D.aabb[0]=T-P,D.aabb[1]=O-ee,D.aabb[2]=K-ne,D.aabb[3]=T+P,D.aabb[4]=O+ee,D.aabb[5]=K+ne,B-a>this._maxItemsPerNode&&(Ce[++this._nodeSplitPtr]=e.node0),s-B>this._maxItemsPerNode&&(Ce[++this._nodeSplitPtr]=e.node1)}test(e,t){Be.length=0;var r=0;for(Be[0]=this.root;r>=0;){var i=Be[r--];if(e(i.aabb)){i.node0&&(Be[++r]=i.node0),i.node1&&(Be[++r]=i.node1);for(var a=i.startIndex;a<i.endIndex;a++)t(this._idArray[a])}}Be.length=0}rayIntersect(e,t,r,i,a,s){const n=[],o=[];let c=0;for(o[c++]=this.root;c>0;){const f=o[--c];if(lt(e,t,r,i,a,s,f.aabb)){f.node0&&(o[c++]=f.node0),f.node1&&(o[c++]=f.node1);for(let p=f.startIndex;p<f.endIndex;p++){const u=this._idArray[p],d=p*6,_=[this._aabbs[d],this._aabbs[d+1],this._aabbs[d+2],this._aabbs[d+3],this._aabbs[d+4],this._aabbs[d+5]],g=lt(e,t,r,i,a,s,_);g&&n.push({index:u,tNear:Math.max(g[0],0)})}}}return n.sort((f,h)=>f.tNear-h.tNear),n}traversePreorder(e){const t=[];let r=this.root;for(;t.length||r;){for(;r;){const i=e(r)!==!1;i&&r.node1&&t.push(r.node1),r=i&&r.node0}t.length&&(r=t.pop())}}traverseInorder(e){const t=[];let r=this.root;for(;r||t.length;){for(;r;)t.push(r),r=r.node0;r=t[t.length-1],t.pop(),e(r),r=r.node1}}traversePostorder(e){const t=[this.root];let r=null;for(;t.length;){const i=t[t.length-1];!r||r.node0===i||r.node1===i?i.node0?t.push(i.node0):i.node1?t.push(i.node1):(t.pop(),e(i)):i.node0===r?i.node0?t.push(i.node1):(t.pop(),e(i)):i.node1===r&&(t.pop(),e(i)),r=i}}}function Xe(l,e,t){const r=t;function i(u,d,_){const g=r[0]*u+r[4]*d+r[8]*_+r[12],v=r[1]*u+r[5]*d+r[9]*_+r[13],S=r[2]*u+r[6]*d+r[10]*_+r[14],m=r[3]*u+r[7]*d+r[11]*_+r[15];return[g/m,v/m,S/m]}const a=i(l,e,0),s=i(l,e,1),n=new Float64Array(a),o=s[0]-a[0],c=s[1]-a[1],f=s[2]-a[2],h=Math.sqrt(o*o+c*c+f*f),p=new Float64Array([o/h,c/h,f/h]);return{origin:n,direction:p}}function dt({origin:l,direction:e,bvh:t,tileCache:r,tileList:i,verticalExaggeration:a}){const s=l[0],n=l[1],o=l[2],c=e[0],f=e[1],h=e[2],p=t.rayIntersect(s,n,o,c,f,h);if(p.length===0)return null;let u=1/0,d=null,_=null;for(let g=0;g<p.length;g++){const{index:v,tNear:S}=p[g];if(S>=u)break;const m=i[v];if(!m)continue;const w=r.ensureQuadtree(m.z,m.x,m.y);if(!w)continue;const{quadtree:B,elevations:E}=w,W=Ue(m.z,m.y)*a,U=512*(1<<m.z),A=m.x/(1<<m.z),y=m.y/(1<<m.z),I=(s-A)*U,F=n/W,X=(o-y)*U,Q=c*U,te=f/W,j=h*U,J=Xt(B.minElev,B.maxElev,E,I,F,X,Q,te,j);if(!J)continue;const ie=I+Q*J.t,M=F+te*J.t,D=X+j*J.t,T=ie/U+A,O=M*W,K=D/U+y;let P;const ee=Math.abs(c),ne=Math.abs(f),se=Math.abs(h);ee>=ne&&ee>=se?P=(T-s)/c:ne>=se?P=(O-n)/f:P=(K-o)/h,P>0&&P<u&&(u=P,d=[T,O,K],_=m)}return d?{worldPos:d,t:u,tile:_}:null}function _i(l={}){return new Proxy({verticalExaggeration:1,densityThreshold:4,showTileBorders:!1,freezeCoverage:!1,featureDepthTest:!1,enableCollision:!0,showCollisionBoxes:!1,showImagery:!0,showFeatures:!0,showRoute:!0,slopeAngleOpacity:0,contourOpacity:1,collisionBuffer:4,occlusionBias:.03,atmosphereDensity:.35,hillshadeOpacity:.95,sunDirection:[.5,.7,.5],dirty:!0,...l},{set(e,t,r){return t!=="dirty"&&e[t]!==r&&(e.dirty=!0),e[t]=r,!0}})}function mi(l){const e=document.createElement("div");return e.className="terrain-attribution",e.innerHTML=l.filter(t=>t.attribution).map(t=>t.attribution).join(" | "),e}function gi(l){return l*360-180}function yi(l){return Math.atan(Math.sinh(Math.PI*(1-2*l)))*180/Math.PI}function vi(l){return(Math.atan2(-Math.cos(l),Math.sin(l))*180/Math.PI%360+360)%360}function xi(l){const e=l*Math.PI/180;return Math.atan2(Math.cos(e),-Math.sin(e))}function bi(l){const{center:e,distance:t,phi:r,theta:i}=l,a=gi(e[0]),s=yi(e[2]),n=vi(r),o=i*180/Math.PI;return`#${a.toFixed(5)}/${s.toFixed(5)}/${n.toFixed(1)}/${o.toFixed(1)}/${t.toPrecision(6)}/${e[1].toPrecision(6)}`}function wi(l){if(!l||l.length<2)return null;const e=l.slice(1).split("/").map(Number);if(e.length<5||e.some(isNaN))return null;const[t,r,i,a,s,n]=e;return!isFinite(t)||!isFinite(r)||!isFinite(i)||!isFinite(a)||!isFinite(s)||s<=0?null:{center:[Ee(t),isFinite(n)?n:0,Ae(r)],distance:s,phi:xi(i),theta:a*Math.PI/180}}class Ti{constructor(e,t,r,i){this._device=e,this._pixelRatio=r;const a=`
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
}`;this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"round",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:a,fragmentShaderBody:s}),this._uniformBuffer=e.createBuffer({size:112,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=e.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._positionBuffer=null,this._dataBindGroup=null,this._vertexCount=0,this._frozen=!1,this._coverageProjView=null}get isFrozen(){return this._frozen}get coverageProjView(){return this._coverageProjView}freeze(e){this._frozen=!0,this._coverageProjView=new Float32Array(e);const t=new Float32Array(16);ze(t,this._coverageProjView);const r=bt(t),i=20,a=[],s=h=>[r[h*3],r[h*3+1],r[h*3+2],1],n=()=>a.push([0,0,0,0]),o=h=>a.push(s(h)),c=(h,p)=>{n();const u=s(h),d=s(p);for(let _=0;_<=i;_++){const g=_/i;a.push([u[0]+(d[0]-u[0])*g,u[1]+(d[1]-u[1])*g,u[2]+(d[2]-u[2])*g,1])}};n(),o(0),o(1),o(2),o(3),o(0),n(),o(4),o(5),o(6),o(7),o(4),c(0,4),c(1,5),c(2,6),c(3,7),n();const f=new Float32Array(a.length*4);for(let h=0;h<a.length;h++)f[h*4]=a[h][0],f[h*4+1]=a[h][1],f[h*4+2]=a[h][2],f[h*4+3]=a[h][3];this._vertexCount=a.length,this._positionBuffer=this._device.createBuffer({size:f.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._positionBuffer,0,f),this._dataBindGroup=this._device.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer}}]})}unfreeze(){this._frozen=!1,this._coverageProjView=null,this._positionBuffer&&(this._positionBuffer.destroy(),this._positionBuffer=null),this._dataBindGroup=null}draw(e,t,r,i){if(!this._frozen||!this._positionBuffer)return;const a=new Float32Array(112/4);a.set(t,0),a[16]=0,a[17]=.5,a[18]=.15,a[19]=1,a[20]=1,a[21]=1,a[22]=1,a[23]=1,a[24]=4,a[25]=1.5,a[26]=this._pixelRatio,this._device.queue.writeBuffer(this._uniformBuffer,0,a),this._gpuLines.draw(e,{vertexCount:this._vertexCount,resolution:[r,i]},[this._dataBindGroup,this._sharedBindGroup])}destroy(){this._positionBuffer&&this._positionBuffer.destroy(),this._gpuLines.destroy(),this._uniformBuffer.destroy()}}function Mi(l,e=0,t=1/0,r=1/0){l.sort((s,n)=>s.depth-n.depth);const i=[],a=new Map;for(const s of l){const n=s.screenX-s.halfW-e,o=s.screenX+s.halfW+e,c=s.screenY-s.halfH-e,f=s.screenY+s.halfH+e;let h=n<0||o>t||c<0||f>r;if(!h)for(let p=0;p<i.length;p++){const u=i[p];if(n<u.maxX&&o>u.minX&&c<u.maxY&&f>u.minY){h=!0;break}}if(h){s.visible=!1;let p=a.get(s.layerIndex);p||(p=new Set,a.set(s.layerIndex,p)),p.add(s.featureIndex)}else s.visible=!0,i.push({minX:s.screenX-s.halfW,maxX:s.screenX+s.halfW,minY:s.screenY-s.halfH,maxY:s.screenY+s.halfH})}return{items:l,hiddenByLayer:a}}const Si=`
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
`,ct=1e4,Ci=8,ut=6,ft=1e3;class Bi{constructor(e,t){this._device=e,this._lastCollisionTime=0,this._collisionStale=!1,this._collisionScheduled=!1,this._collisionTimer=null,this._debugItems=null;const r=e.createShaderModule({code:Si}),i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._vertexBuffer=e.createBuffer({size:ct*Ci*ut*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this._linePipeline=e.createRenderPipeline({layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:r,entryPoint:"vs_colored_line",buffers:[{arrayStride:ut*4,attributes:[{format:"float32x2",offset:0,shaderLocation:0},{format:"float32x4",offset:8,shaderLocation:1}]}]},fragment:{module:r,entryPoint:"fs_colored_line",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"line-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._invProjView=new Float32Array(16)}markStale(){this._debugItems||(this._collisionStale=!0)}update({enabled:e,layers:t,projectionView:r,canvasW:i,canvasH:a,pixelRatio:s,exaggeration:n,collisionBuffer:o,occlusionBias:c,bvh:f,tileManager:h,bvhTileList:p}){const u=performance.now();if(!e){if(this._debugItems){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:_}of t)_.setVisibleFeatures(null)}return!1}const d=u-this._lastCollisionTime;return d>=ft||this._collisionStale?(this._doCollision(t,r,i,a,s,n,o,c,f,h,p),this._lastCollisionTime=u,this._collisionStale=!1,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null),!0):(this._collisionScheduled||(this._collisionScheduled=!0,this._collisionTimer=setTimeout(()=>{this._collisionScheduled=!1,this._collisionTimer=null,this._wakeCallback?.()},ft-d)),!1)}set onWake(e){this._wakeCallback=e}_doCollision(e,t,r,i,a,s,n,o,c,f,h){const p=[];let u=0;for(const{layer:m,collision:w,sourceId:B}of e){if(w){const E=m.getCollisionItems(t,r,i,a,s);for(const x of E)x.layerIndex=u,x.sourceId=B;p.push(...E)}u++}const d=r/a,_=i/a;if(c&&p.length>0){ze(this._invProjView,t);const m=t;for(const w of p){const B=w.screenX/d*2-1,E=1-w.screenY/_*2,x=Xe(B,E,this._invProjView),k=dt({origin:x.origin,direction:x.direction,bvh:c,tileCache:f,tileList:h,verticalExaggeration:s});if(k){const[W,U,A]=k.worldPos;m[3]*W+m[7]*U+m[11]*A+m[15]<w.clipW*(1-o)&&(w.occluded=!0)}}}const g=[];for(const m of p)m.occluded||g.push(m);Mi(g,n,d,_);const v=new Map;for(const m of p)if(m.occluded||!m.visible){let w=v.get(m.sourceId);w||(w=new Set,v.set(m.sourceId,w)),w.add(m.sourceFeatureIndex)}const S=new Map;for(const m of p){const w=v.get(m.sourceId);if(w&&w.has(m.sourceFeatureIndex))m.occluded||(m.visible=!1);else{let B=S.get(m.layerIndex);B||(B=new Set,S.set(m.layerIndex,B)),B.add(m.featureIndex)}}this._debugItems=p,u=0;for(const{layer:m,collision:w}of e)m.setVisibleFeatures(w?S.get(u)||new Set:null),u++}drawDebug(e,t,r,i,a){if(!this._debugItems||this._debugItems.length===0)return;const s=this._debugItems,n=Math.min(s.length,ct),o=new Float32Array(n*8*6),c=a;for(let u=0;u<n;u++){const d=s[u],_=d.screenX-d.halfW-c,g=d.screenX+d.halfW+c,v=d.screenY-d.halfH-c,S=d.screenY+d.halfH+c,m=d.occluded?.2:d.visible?0:1,w=d.occluded?.4:d.visible?1:0,B=d.occluded?1:0,E=.8,x=u*8*6;o[x]=_,o[x+1]=v,o[x+2]=m,o[x+3]=w,o[x+4]=B,o[x+5]=E,o[x+6]=g,o[x+7]=v,o[x+8]=m,o[x+9]=w,o[x+10]=B,o[x+11]=E,o[x+12]=g,o[x+13]=v,o[x+14]=m,o[x+15]=w,o[x+16]=B,o[x+17]=E,o[x+18]=g,o[x+19]=S,o[x+20]=m,o[x+21]=w,o[x+22]=B,o[x+23]=E,o[x+24]=g,o[x+25]=S,o[x+26]=m,o[x+27]=w,o[x+28]=B,o[x+29]=E,o[x+30]=_,o[x+31]=S,o[x+32]=m,o[x+33]=w,o[x+34]=B,o[x+35]=E,o[x+36]=_,o[x+37]=S,o[x+38]=m,o[x+39]=w,o[x+40]=B,o[x+41]=E,o[x+42]=_,o[x+43]=v,o[x+44]=m,o[x+45]=w,o[x+46]=B,o[x+47]=E}const f=t/i,h=r/i,p=new Float32Array([f,h,0,0]);this._device.queue.writeBuffer(this._uniformBuffer,0,p),this._device.queue.writeBuffer(this._vertexBuffer,0,o.buffer,0,n*8*6*4),e.setPipeline(this._linePipeline),e.setBindGroup(0,this._uniformBindGroup),e.setVertexBuffer(0,this._vertexBuffer),e.draw(n*8)}clear(e){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:t}of e)t.setVisibleFeatures(null)}destroy(){this._collisionTimer&&clearTimeout(this._collisionTimer),this._uniformBuffer.destroy(),this._vertexBuffer.destroy()}}class pt{static async create(e,t={}){const r=new pt;return await r._init(e,t),r}async _init(e,t){const{sources:r={},base:i=[],features:a=[],camera:s={},settings:n,createGPULines:o}=t;let c=null;const f={},h={},p=[];for(const[y,I]of Object.entries(r))if(p.push(I),I.type==="terrain"){if(c)throw new Error("Only one terrain source is allowed");c=I}else I.type==="raster"?f[y]=I:I.type==="geojson"&&(h[y]=I);if(!c)throw new Error("A terrain source is required");this._pixelRatio=t.pixelRatio||(typeof devicePixelRatio<"u"?devicePixelRatio:1),this._baseLayerConfigs=i,this._featureLayerConfigs=a,this._geojsonSources=h,this._rasterSources=f,this.canvas=e,this._terrainBounds=qe(c);const[u,d,_,g]=c.bounds;this._location=t.location||{lat:(d+g)/2,lon:(u+_)/2},this.attribution=mi(p.filter(y=>y.attribution)),this.settings=_i(n);const v=await navigator.gpu.requestAdapter();this._device=await v.requestDevice(),this._format=navigator.gpu.getPreferredCanvasFormat(),this._gpuCtx=e.getContext("webgpu"),this._gpuCtx.configure({device:this._device,format:this._format,alphaMode:"opaque"});const S=wi(window.location.hash);this.camera=wt(e,{center:[.0804792012701582,.0002040588543435183,.27264551318459634],distance:.0008177139017526437,phi:2.1624270549994598,theta:.16047571910010502,fov:Math.PI/4,near:1e-5,far:.5,rotateSpeed:.005,zoomSpeed:8e-4,panSpeed:1,...s,...S}),this._hashUpdateTimer=null;const m=this._device,w=this._format;this._mesh=Tt(m),this._imagerySampler=m.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});const B=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0}}]}),E=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),x=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),k=m.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this._globalUniformBuffer=m.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._globalUniformBindGroup=m.createBindGroup({layout:x,entries:[{binding:0,resource:{buffer:this._globalUniformBuffer}}]}),this._fallbackImageryTexture=m.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),m.queue.writeTexture({texture:this._fallbackImageryTexture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]),this._fallbackImageryBindGroup=m.createBindGroup({layout:k,entries:[{binding:0,resource:this._fallbackImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._whiteImageryTexture=m.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),m.queue.writeTexture({texture:this._whiteImageryTexture},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1]),this._whiteImageryBindGroup=m.createBindGroup({layout:k,entries:[{binding:0,resource:this._whiteImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._pipeline=m.createRenderPipeline({layout:m.createPipelineLayout({bindGroupLayouts:[B,E,x,k]}),vertex:{module:m.createShaderModule({code:Mt}),entryPoint:"vs_main",buffers:[{arrayStride:4,attributes:[{format:"uint16x2",offset:0,shaderLocation:0}]}]},fragment:{module:m.createShaderModule({code:St}),entryPoint:"fs_main",targets:[{format:w}]},primitive:{topology:"triangle-list",cullMode:"back",frontFace:"ccw"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}}),this._skyPipeline=m.createRenderPipeline({layout:m.createPipelineLayout({bindGroupLayouts:[x]}),vertex:{module:m.createShaderModule({code:Ct}),entryPoint:"vs_sky",buffers:[]},fragment:{module:m.createShaderModule({code:Bt}),entryPoint:"fs_sky",targets:[{format:w}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._frustumOverlay=new Ti(m,w,this._pixelRatio,o),this._collisionManager=new Bi(m,w),this._collisionManager.onWake=()=>{this._renderDirty=!0},this._UNIFORM_STRIDE=256,this._MAX_TILES_PER_FRAME=256,this._uniformBuffer=m.createBuffer({size:this._UNIFORM_STRIDE*this._MAX_TILES_PER_FRAME,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=m.createBindGroup({layout:B,entries:[{binding:0,resource:{buffer:this._uniformBuffer,size:176}}]}),this._tileManager=new Vt(m,{tileUrl:Ne(c.tiles)}),this._tileManager.setBindGroupLayout(E),this._tileManager.setBounds(this._terrainBounds),this._imageryDeltaZoom=1;const W=[];for(const y of i){const I=f[y.source];if(!I)throw new Error(`Base layer "${y.id}" references unknown source "${y.source}"`);const F=qe(I),X=new $t({tileUrl:Ne(I.tiles)});X.setBounds(F),W.push({imageryManager:X,blend:y.blend||"source-over",opacity:y.opacity!=null?y.opacity:1,maxzoom:I.maxzoom})}this._maxImageryZoom=W.length>0?Math.max(...W.map(y=>y.maxzoom)):0,this._compositor=new Kt(m,W,k,this._imagerySampler),this._coverageDirty=!0,this._renderDirty=!0,this._cachedRenderList=[],this._tileManager.onTileResolved=()=>{this._coverageDirty=!0,this._renderDirty=!0,this._collisionManager.markStale();for(const y of this._lineLayers)y.invalidateElevations()},this._compositor.onUpdate=()=>{this._coverageDirty=!0,this._renderDirty=!0},this._depthTexture=null,this._MAX_ELEV_Y=.001,this._mvpFloat32=new Float32Array(16),this._modelFloat32=new Float32Array(16),this._uniformData=new Float32Array(44),this._globalUniformData=new Float32Array(24),this._currentExaggeration=this.settings.verticalExaggeration,this._currentDensityThreshold=this.settings.densityThreshold,this._currentFreezeCoverage=!1,this._bvh=null,this._bvhTileList=[],this._lastProjView=new Float64Array(16),this._invProjView=new Float64Array(16),this.camera.rotateStartCallback=(y,I)=>this._hitTest(y,I),this._needsCanvasResize=!0,this._resizeObserver=new ResizeObserver(()=>{this._needsCanvasResize=!0,this._renderDirty=!0,this._coverageDirty=!0,this.camera.taint()}),this._resizeObserver.observe(e),this._circleLayers=[],this._textLayers=[],this._lineLayers=[];const U=[],A={};for(const y of a){const I=h[y.source];if(!I)throw new Error(`Feature layer "${y.id}" references unknown source "${y.source}"`);if(!A[y.source]){const X=new jt;A[y.source]=X,U.push(X.load(I.data,{...I,simplifyFn:t.simplifyFn}))}const F=y.collision!==!1;if(y.type==="circle"){const X=new ti(y,A[y.source],(Q,te)=>this.queryElevationMercator(Q,te));X.init(m,x,w),X._collision=F,X._sourceId=y.source,this._circleLayers.push(X)}else if(y.type==="text"){const X=new ui(y,A[y.source],(Q,te)=>this.queryElevationMercator(Q,te));X._collision=F,X._sourceId=y.source,this._textLayers.push({layer:X,config:y})}else if(y.type==="line"){const X=new di(y,A[y.source],(Q,te)=>this.queryElevationMercator(Q,te));X.init(m,w,this._globalUniformBuffer,o),this._lineLayers.push(X)}}if(await Promise.all(U),t.font&&this._textLayers.length>0){const y=await li(m,{atlasUrl:t.font.atlas,metadataUrl:t.font.metadata});for(const{layer:I}of this._textLayers)I.init(m,y,w,"depth24plus",this._globalUniformBuffer)}this._running=!0,this._boundFrame=this._frame.bind(this),requestAnimationFrame(this._boundFrame)}_hitTest(e,t){const r=this.raycast(e,t);if(r)return r.worldPos;const i=this.canvas.getBoundingClientRect(),a=(e-i.left)/i.width*2-1,s=1-(t-i.top)/i.height*2;ze(this._invProjView,this._lastProjView);const{origin:n,direction:o}=Xe(a,s,this._invProjView);if(Math.abs(o[1])>1e-10){const c=-n[1]/o[1];if(c>0)return[n[0]+c*o[0],0,n[2]+c*o[2]]}return null}_ensureDepthTexture(e,t){this._depthTexture&&this._depthTexture.width===e&&this._depthTexture.height===t||(this._depthTexture&&this._depthTexture.destroy(),this._depthTexture=this._device.createTexture({size:[e,t],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}))}_buildCollisionLayers(){const e=[];for(const t of this._circleLayers)e.push({layer:t,collision:t._collision,sourceId:t._sourceId});for(const{layer:t}of this._textLayers)e.push({layer:t,collision:t._collision,sourceId:t._sourceId});return e}paint(){const{canvas:e,camera:t,settings:r}=this,i=e.width/e.height;if(i===0||!isFinite(i))return;const{view:a,projection:s,projectionView:n}=t.update(i),o=this._device;let c=0;const f=[],h=t.state.center,p=2*Math.atan(Math.exp(Math.PI*(1-2*h[2])))-Math.PI/2,u=1/(40075016686e-3*Math.cos(p));for(const M of this._cachedRenderList){if(c>=this._MAX_TILES_PER_FRAME)break;const D=this._tileManager.getTile(M.z,M.x,M.y);if(!D)continue;const T=Et(M.z,M.y),O=et(M.z,this._imageryDeltaZoom,this._maxImageryZoom);this._compositor.ensureImagery(M.z,M.x,M.y,O);const K=this._compositor.hasImagery(M.z,M.x,M.y);At(this._mvpFloat32,a,s,M.z,M.x,M.y,u,this._currentExaggeration),Ut(this._modelFloat32,M.z,M.x,M.y,u,this._currentExaggeration);const P=this._uniformData;P.set(this._mvpFloat32,0),P.set(this._modelFloat32,16),P[32]=u,P[33]=T,P[34]=this._currentExaggeration,P[35]=1/514,P[36]=r.showTileBorders?1:0,P[37]=r.showImagery?K?1:0:1,P[38]=r.hillshadeOpacity,P[39]=r.slopeAngleOpacity,P[40]=r.contourOpacity,P[41]=e.height;let ee;r.showImagery?K?ee=this._compositor.getBindGroup(M.z,M.x,M.y):ee=this._fallbackImageryBindGroup:ee=this._whiteImageryBindGroup,o.queue.writeBuffer(this._uniformBuffer,c*this._UNIFORM_STRIDE,P.buffer,P.byteOffset,176),f.push({offset:c*this._UNIFORM_STRIDE,bindGroup:D.bindGroup,imageryBindGroup:ee}),c++}const{phi:d,theta:_,distance:g,center:v}=t.state,S=v[0]+g*Math.cos(_)*Math.cos(d),m=v[1]+g*Math.sin(_),w=v[2]+g*Math.cos(_)*Math.sin(d),B=1/u,E=m/u,x=r.sunDirection,k=x[0],W=x[1],U=x[2],A=r.atmosphereDensity,y=this._globalUniformData;y[0]=S,y[1]=m,y[2]=w,y[3]=E,y[4]=k,y[5]=W,y[6]=U,y[7]=B,y[8]=52e-7*A,y[9]=121e-7*A,y[10]=296e-7*A,y[11]=8e3,y[12]=2e-5*A,y[13]=3e3,y[14]=.76,y[15]=20;const I=t.state.fov,F=Math.sin(d),X=-Math.cos(d),Q=-Math.sin(_)*Math.cos(d),te=Math.cos(_),j=-Math.sin(_)*Math.sin(d);y[16]=F,y[17]=0,y[18]=X,y[19]=i,y[20]=Q,y[21]=te,y[22]=j,y[23]=Math.tan(I/2),o.queue.writeBuffer(this._globalUniformBuffer,0,y.buffer,y.byteOffset,96),this._ensureDepthTexture(e.width,e.height);const J=o.createCommandEncoder(),ie=J.beginRenderPass({colorAttachments:[{view:this._gpuCtx.getCurrentTexture().createView(),clearValue:{r:.53,g:.66,b:.82,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this._depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});ie.setPipeline(this._skyPipeline),ie.setBindGroup(0,this._globalUniformBindGroup),ie.draw(3),ie.setPipeline(this._pipeline),ie.setVertexBuffer(0,this._mesh.vertexBuffer),ie.setIndexBuffer(this._mesh.indexBuffer,"uint32"),ie.setBindGroup(2,this._globalUniformBindGroup);for(const M of f)ie.setBindGroup(0,this._uniformBindGroup,[M.offset]),ie.setBindGroup(1,M.bindGroup),ie.setBindGroup(3,M.imageryBindGroup),ie.drawIndexed(this._mesh.indexCount);if(this._frustumOverlay.draw(ie,n,e.width,e.height),r.showRoute)for(const M of this._lineLayers)M.draw(ie);if(r.showFeatures){for(const M of this._circleLayers)M.draw(ie,this._globalUniformBindGroup,r.featureDepthTest);for(const{layer:M}of this._textLayers)M.draw(ie)}r.showCollisionBoxes&&this._collisionManager.drawDebug(ie,e.width,e.height,this._pixelRatio,r.collisionBuffer),ie.end(),o.queue.submit([J.finish()])}_frame(){if(!this._running)return;requestAnimationFrame(this._boundFrame);const{canvas:e,camera:t,settings:r}=this;if(this._currentExaggeration!==r.verticalExaggeration&&(this._currentExaggeration=r.verticalExaggeration,t.taint()),this._currentDensityThreshold!==r.densityThreshold&&(this._currentDensityThreshold=r.densityThreshold,this._coverageDirty=!0),r.freezeCoverage!==this._currentFreezeCoverage&&(this._currentFreezeCoverage=r.freezeCoverage,this._currentFreezeCoverage?(this._savedFar=t.state.far,t.state.far=t.state.far*4):(this._frustumOverlay.unfreeze(),t.state.far=this._savedFar,this._coverageDirty=!0),t.taint(),this._renderDirty=!0),r.dirty&&(this._renderDirty=!0,r.dirty=!1),!this._coverageDirty&&!this._renderDirty&&!t.dirty)return;if(this._needsCanvasResize){const h=this._pixelRatio,p=Math.floor(e.clientWidth*h),u=Math.floor(e.clientHeight*h);(e.width!==p||e.height!==u)&&(e.width=p,e.height=u),this._needsCanvasResize=!1}const i=e.width/e.height,{view:a,projection:s,projectionView:n,dirty:o}=t.update(i);this._lastProjView.set(n),this._currentFreezeCoverage&&!this._frustumOverlay.isFrozen&&this._frustumOverlay.freeze(n);const c=this._frustumOverlay.coverageProjView||n;if(o&&(this._coverageDirty=!0,this._renderDirty=!0,clearTimeout(this._hashUpdateTimer),this._hashUpdateTimer=setTimeout(()=>{history.replaceState(null,"",bi(t.state))},300)),this._coverageDirty){const h=this._MAX_ELEV_Y*this._currentExaggeration;this._tileManager.beginFrame(),this._cachedRenderList=Dt(c,e.width,e.height,h,this._currentExaggeration,r.densityThreshold,this._terrainBounds,this._tileManager,(u,d,_)=>{const g=this._tileManager.getTile(u,d,_);if(!g||g.isFlat)return!0;const v=et(u,this._imageryDeltaZoom,this._maxImageryZoom);return this._compositor.ensureImagery(u,d,_,v),this._compositor.hasImagery(u,d,_)});const p=c;this._cachedRenderList.sort((u,d)=>{const _=p[3]*((u.x+.5)/(1<<u.z))+p[11]*((u.y+.5)/(1<<u.z))+p[15],g=p[3]*((d.x+.5)/(1<<d.z))+p[11]*((d.y+.5)/(1<<d.z))+p[15];return _-g}),this._tileManager.cancelStale(),this._tileManager.evict(),this._tileManager.stripQuadtrees(),this._compositor.gc(this._tileManager.wantedKeys),this._rebuildBVH(),this._coverageDirty=!1,this._renderDirty=!0}if(!this._renderDirty)return;this._renderDirty=!1;const f=this._buildCollisionLayers();if(this._collisionManager.update({enabled:r.enableCollision,layers:f,projectionView:n,canvasW:e.width,canvasH:e.height,pixelRatio:this._pixelRatio,exaggeration:this._currentExaggeration,collisionBuffer:r.collisionBuffer,occlusionBias:r.occlusionBias,bvh:this._bvh,tileManager:this._tileManager,bvhTileList:this._bvhTileList})&&(this._renderDirty=!0),r.showFeatures){for(const h of this._circleLayers)h.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration);for(const{layer:h}of this._textLayers)h.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration)}if(r.showRoute)for(const h of this._lineLayers)h.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration);this.paint()}_rebuildBVH(){const e=this._cachedRenderList;if(e.length===0){this._bvh=null,this._bvhTileList=[];return}const t=new Float64Array(e.length*6),r=new Array(e.length);for(let i=0;i<e.length;i++){const{z:a,x:s,y:n}=e[i];r[i]=e[i];const o=1/(1<<a),c=Ue(a,n),f=this._tileManager.getElevationBounds(a,s,n),h=i*6;t[h]=s*o,t[h+1]=f?f.minElevation*c*this._currentExaggeration:0,t[h+2]=n*o,t[h+3]=(s+1)*o,t[h+4]=f?f.maxElevation*c*this._currentExaggeration:this._MAX_ELEV_Y*this._currentExaggeration,t[h+5]=(n+1)*o}this._bvh=new pi(t,{maxItemsPerNode:4}),this._bvhTileList=r}raycast(e,t){if(!this._bvh)return null;const r=this.canvas.getBoundingClientRect(),i=(e-r.left)/r.width*2-1,a=1-(t-r.top)/r.height*2;ze(this._invProjView,this._lastProjView);const{origin:s,direction:n}=Xe(i,a,this._invProjView);return dt({origin:s,direction:n,bvh:this._bvh,tileCache:this._tileManager,tileList:this._bvhTileList,verticalExaggeration:this._currentExaggeration})}queryElevation(e,t){const r=Ee(e),i=Ae(t);return this.queryElevationMercator(r,i)}queryElevationMercator(e,t){let r=null,i=-1;for(const k of this._cachedRenderList){const W=1/(1<<k.z);e>=k.x*W&&e<(k.x+1)*W&&t>=k.y*W&&t<(k.y+1)*W&&k.z>i&&(r=k,i=k.z)}if(!r)return null;const a=this._tileManager.getTile(r.z,r.x,r.y);if(!a||!a.elevations)return null;const s=1/(1<<r.z),n=(e-r.x*s)/s,o=(t-r.y*s)/s,c=n*512+1,f=o*512+1,h=Math.floor(c),p=Math.floor(f),u=c-h,d=f-p,_=514,g=Math.min(h,513),v=Math.min(h+1,513),S=Math.min(p,513),m=Math.min(p+1,513),w=a.elevations[S*_+g],B=a.elevations[S*_+v],E=a.elevations[m*_+g],x=a.elevations[m*_+v];return w*(1-u)*(1-d)+B*u*(1-d)+E*(1-u)*d+x*u*d}destroy(){this._running=!1,clearTimeout(this._hashUpdateTimer),this._collisionManager.destroy(),this._frustumOverlay.destroy(),this._resizeObserver.disconnect(),this.camera.destroy(),this._depthTexture&&this._depthTexture.destroy(),this._mesh.vertexBuffer.destroy(),this._mesh.indexBuffer.destroy(),this._uniformBuffer.destroy(),this._globalUniformBuffer.destroy(),this._fallbackImageryTexture.destroy(),this._whiteImageryTexture.destroy();for(const e of this._lineLayers)e.destroy();this._device.destroy()}}export{pt as TerrainMap};
