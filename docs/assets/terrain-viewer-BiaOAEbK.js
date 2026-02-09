function ve(c,e){const[t,r,i,a,s,n,o,l,h,d,_,f,p,m,g,v]=e,x=t*n-r*s,y=t*o-i*s,T=t*l-a*s,A=r*o-i*n,E=r*l-a*n,b=i*l-a*o,F=h*m-d*p,D=h*g-_*p,U=h*v-f*p,S=d*g-_*m,w=d*v-f*m,G=_*v-f*g;let R=x*G-y*w+T*S+A*U-E*D+b*F;return Math.abs(R)<1e-10?!1:(R=1/R,c[0]=(n*G-o*w+l*S)*R,c[1]=(-r*G+i*w-a*S)*R,c[2]=(m*b-g*E+v*A)*R,c[3]=(-d*b+_*E-f*A)*R,c[4]=(-s*G+o*U-l*D)*R,c[5]=(t*G-i*U+a*D)*R,c[6]=(-p*b+g*T-v*y)*R,c[7]=(h*b-_*T+f*y)*R,c[8]=(s*w-n*U+l*F)*R,c[9]=(-t*w+r*U-a*F)*R,c[10]=(p*E-m*T+v*x)*R,c[11]=(-h*E+d*T-f*x)*R,c[12]=(-s*S+n*D-o*F)*R,c[13]=(t*S-r*D+i*F)*R,c[14]=(-p*A+m*y-g*x)*R,c[15]=(h*A-d*y+_*x)*R,!0)}function st(c){function e(s,n,o){const l=c[0]*s+c[4]*n+c[8]*o+c[12],h=c[1]*s+c[5]*n+c[9]*o+c[13],d=c[2]*s+c[6]*n+c[10]*o+c[14],_=c[3]*s+c[7]*n+c[11]*o+c[15];return[l/_,h/_,d/_]}const t=.3,r=.99,i=new Float32Array(24),a=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let s=0;s<4;s++){const[n,o]=a[s],l=e(n,o,t),h=e(n,o,r);i[s*3]=l[0],i[s*3+1]=l[1],i[s*3+2]=l[2],i[(s+4)*3]=h[0],i[(s+4)*3+1]=h[1],i[(s+4)*3+2]=h[2]}return i}function ot(c,e={}){const t={center:e.center?[...e.center]:[0,0,0],distance:e.distance||10,phi:e.phi||0,theta:e.theta||.3,fov:e.fov||Math.PI/4,near:e.near||.1,far:e.far||1},r=e.rotateSpeed||.01,i=e.zoomSpeed||.001,a=e.panSpeed||1,s=new Float64Array(16),n=new Float64Array(16),o=new Float64Array(16),l=new Float64Array(16);let h=!0,d=1,_=!1,f=null,p=0,m=0,g=null,v=null;function x(u){const{phi:B,theta:I,distance:C,center:P}=t,z=P[0]+C*Math.cos(I)*Math.cos(B),k=P[1]+C*Math.sin(I),O=P[2]+C*Math.cos(I)*Math.sin(B),X=z-u[0],Q=k-u[1],W=O-u[2],q=Math.sqrt(X*X+Q*Q+W*W);if(q<1e-10)return;t.center[0]=u[0],t.center[1]=u[1],t.center[2]=u[2],t.distance=q,t.theta=Math.asin(Math.max(-1,Math.min(1,Q/q)));const K=Math.cos(t.theta);t.phi=K>1e-10?Math.atan2(W,X):t.phi}function y(u,B){const I=c.getBoundingClientRect(),C=(u-I.left)/I.width*2-1,P=1-(B-I.top)/I.height*2;ve(l,o);const z=l;function k(Q,W,q){const K=z[0]*Q+z[4]*W+z[8]*q+z[12],ee=z[1]*Q+z[5]*W+z[9]*q+z[13],se=z[2]*Q+z[6]*W+z[10]*q+z[14],J=z[3]*Q+z[7]*W+z[11]*q+z[15];return[K/J,ee/J,se/J]}const O=k(C,P,0),X=k(C,P,1);return{origin:O,direction:[X[0]-O[0],X[1]-O[1],X[2]-O[2]]}}function T(u,B){if(Math.abs(u.direction[1])<1e-10)return null;const I=(B-u.origin[1])/u.direction[1];return I<0?null:[u.origin[0]+I*u.direction[0],B,u.origin[2]+I*u.direction[2]]}let A=0,E=0,b=0;function F(u){const{phi:B,theta:I,distance:C,center:P,fov:z,near:k,far:O}=t,X=P[0]+C*Math.cos(I)*Math.cos(B),Q=P[1]+C*Math.sin(I),W=P[2]+C*Math.cos(I)*Math.sin(B);let q=P[0]-X,K=P[1]-Q,ee=P[2]-W;const se=Math.sqrt(q*q+K*K+ee*ee);q/=se,K/=se,ee/=se;let J=K*0-ee*1,oe=ee*0-q*0,re=q*1-K*0;const ne=Math.sqrt(J*J+oe*oe+re*re);ne>1e-4&&(J/=ne,oe/=ne,re/=ne);const ae=oe*ee-re*K,le=re*q-J*ee,te=J*K-oe*q;s[0]=J,s[1]=ae,s[2]=-q,s[3]=0,s[4]=oe,s[5]=le,s[6]=-K,s[7]=0,s[8]=re,s[9]=te,s[10]=-ee,s[11]=0,s[12]=-(J*X+oe*Q+re*W),s[13]=-(ae*X+le*Q+te*W),s[14]=q*X+K*Q+ee*W,s[15]=1;const H=1/Math.tan(z/2),fe=1/(k-O);n[0]=H/u,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=H,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=O*fe,n[11]=-1,n[12]=0,n[13]=0,n[14]=k*O*fe,n[15]=0;for(let de=0;de<4;de++)for(let Te=0;Te<4;Te++){let Ie=0;for(let Me=0;Me<4;Me++)Ie+=n[de+Me*4]*s[Me+Te*4];o[de+Te*4]=Ie}}function D(u,B){const{phi:I,theta:C,distance:P}=t,z=Math.sin(I),k=-Math.cos(I),O=-Math.sin(C)*Math.cos(I),X=Math.cos(C),Q=-Math.sin(C)*Math.sin(I),W=P*a;t.center[0]-=u*z*W,t.center[0]+=B*O*W,t.center[1]+=B*X*W,t.center[2]-=u*k*W,t.center[2]+=B*Q*W}function U(u,B){if(v=null,F(d),g){const P=g(u,B);if(Array.isArray(P)&&P.length===3){v={point:[...P],altitude:P[1]};return}}const I=y(u,B),C=T(I,t.center[1]);C&&(v={point:C,altitude:t.center[1]})}function S(u,B){if(!v)return;F(d);const I=y(u,B),C=T(I,v.altitude);C&&(t.center[0]+=v.point[0]-C[0],t.center[2]+=v.point[2]-C[2])}function w(u){if(u.preventDefault(),p=u.clientX,m=u.clientY,f=u.shiftKey?"pan":u.button===2||u.button===1?"rotate":u.ctrlKey?"pivot":u.metaKey?"rotate":u.altKey?"zoom":"grab",f==="rotate"&&g){const B=c.getBoundingClientRect(),I=g(B.left+B.width/2,B.top+B.height/2);Array.isArray(I)&&I.length===3&&x(I)}f==="grab"&&U(u.clientX,u.clientY),_=!0,c.style.cursor="grabbing",window.addEventListener("mousemove",G),window.addEventListener("mouseup",R)}function G(u){if(!_)return;const B=u.clientX-p,I=u.clientY-m;if(p=u.clientX,m=u.clientY,f==="grab")S(u.clientX,u.clientY);else if(f==="rotate")t.phi+=B*r,t.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t.theta+I*r));else if(f==="pivot"){const{phi:C,theta:P,distance:z,center:k,fov:O}=t,X=O/c.getBoundingClientRect().height,Q=k[0]+z*Math.cos(P)*Math.cos(C),W=k[1]+z*Math.sin(P),q=k[2]+z*Math.cos(P)*Math.sin(C);t.phi-=B*X,t.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t.theta-I*X)),t.center[0]=Q-z*Math.cos(t.theta)*Math.cos(t.phi),t.center[1]=W-z*Math.sin(t.theta),t.center[2]=q-z*Math.cos(t.theta)*Math.sin(t.phi)}else if(f==="zoom")t.distance=Math.max(t.near*2,t.distance*Math.exp(I*.005));else if(f==="pan"){const C=c.getBoundingClientRect();D(B/C.height,I/C.height)}h=!0}function R(){_=!1,f=null,v=null,c.style.cursor="grab",window.removeEventListener("mousemove",G),window.removeEventListener("mouseup",R)}let Y=!1,V=null;function j(u){if(u.preventDefault(),!Y&&g){const X=g(u.clientX,u.clientY);if(Array.isArray(X)&&X.length===3){const{phi:Q,theta:W,distance:q,center:K}=t,ee=K[0]+q*Math.cos(W)*Math.cos(Q),se=K[1]+q*Math.sin(W),J=K[2]+q*Math.cos(W)*Math.sin(Q),oe=X[0]-ee,re=X[1]-se,ne=X[2]-J,ae=Math.sqrt(oe*oe+re*re+ne*ne),le=Math.cos(W)*Math.cos(Q),te=Math.sin(W),H=Math.cos(W)*Math.sin(Q);t.center[0]+=(q-ae)*le,t.center[1]+=(q-ae)*te,t.center[2]+=(q-ae)*H,t.distance=ae}Y=!0}clearTimeout(V),V=setTimeout(()=>{Y=!1},200);const B=c.getBoundingClientRect(),I=(u.clientX-B.left-B.width/2)/B.height,C=(u.clientY-B.top-B.height/2)/B.height,P=1+u.deltaY*i,z=t.distance;t.distance=Math.max(t.near*2,z*P);const O=(1/(t.distance/z)-1)*2*Math.tan(t.fov/2);D(-I*O,-C*O),h=!0}function N(u){if(u.preventDefault(),u.touches.length===1)_=!0,f="grab",p=u.touches[0].clientX,m=u.touches[0].clientY,U(p,m);else if(u.touches.length===2){const B=u.touches[1].clientX-u.touches[0].clientX,I=u.touches[1].clientY-u.touches[0].clientY;if(A=Math.sqrt(B*B+I*I),(u.touches[0].clientX+u.touches[1].clientX)/2,E=(u.touches[0].clientY+u.touches[1].clientY)/2,b=Math.atan2(I,B),g){const C=c.getBoundingClientRect(),P=g(C.left+C.width/2,C.top+C.height/2);Array.isArray(P)&&P.length===3&&x(P)}}}function Z(u){if(u.preventDefault(),u.touches.length===1&&_)p=u.touches[0].clientX,m=u.touches[0].clientY,f==="grab"&&S(p,m),h=!0;else if(u.touches.length===2){const B=u.touches[1].clientX-u.touches[0].clientX,I=u.touches[1].clientY-u.touches[0].clientY,C=Math.sqrt(B*B+I*I);(u.touches[0].clientX+u.touches[1].clientX)/2;const P=(u.touches[0].clientY+u.touches[1].clientY)/2;if(A>0){const z=A/C;t.distance*=z,t.distance=Math.max(t.near*2,t.distance);const k=Math.atan2(I,B),O=k-b;t.phi-=O;const X=c.getBoundingClientRect(),Q=(P-E)/X.height;t.theta=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,t.theta+Q*2)),h=!0,b=k}A=C,E=P}}function $(){_=!1,f=null,v=null,A=0,b=0}function M(u){u.preventDefault()}c.style.cursor="grab",c.addEventListener("mousedown",w),c.addEventListener("wheel",j,{passive:!1}),c.addEventListener("touchstart",N,{passive:!1}),c.addEventListener("touchmove",Z,{passive:!1}),c.addEventListener("touchend",$),c.addEventListener("contextmenu",M);function L(){c.removeEventListener("mousedown",w),c.removeEventListener("wheel",j),c.removeEventListener("touchstart",N),c.removeEventListener("touchmove",Z),c.removeEventListener("touchend",$),c.removeEventListener("contextmenu",M),window.removeEventListener("mousemove",G),window.removeEventListener("mouseup",R)}return{state:t,get dirty(){return h},set rotateStartCallback(u){g=u},taint(){h=!0},update(u){d=u,F(u);const B=h;return h=!1,{view:s,projection:n,projectionView:o,dirty:B}},destroy:L}}function nt(c){const r=new Uint16Array(530450);let i=0;for(let _=0;_<=514;_++)for(let f=0;f<=514;f++)r[i++]=f,r[i++]=_;const s=514*514*6,n=new Uint32Array(s);let o=0;const l=515;for(let _=0;_<514;_++)for(let f=0;f<514;f++){const p=_*l+f,m=p+1,g=p+l,v=g+1;n[o++]=p,n[o++]=g,n[o++]=m,n[o++]=m,n[o++]=g,n[o++]=v}const h=c.createBuffer({size:r.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});c.queue.writeBuffer(h,0,r);const d=c.createBuffer({size:n.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});return c.queue.writeBuffer(d,0,n),{vertexBuffer:h,indexBuffer:d,indexCount:s,vertexCount:265225}}const Se=`
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
`,at=`
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
};

fn loadElevation(coord: vec2<i32>) -> f32 {
  return textureLoad(elevationTexture, coord, 0).r;
}

@vertex
fn vs_main(@location(0) grid_pos: vec2<u32>) -> VertexOutput {
  var out: VertexOutput;

  // Raw coords [0, 514]. Interior 1-513 map to grid 0-512.
  // Edge 0 and 514 are border vertices at tile boundaries.
  let raw_u = i32(grid_pos.x);
  let raw_v = i32(grid_pos.y);

  // Grid position: edge vertices snap to tile boundary (half-pixel)
  let u = clamp(f32(raw_u) - 1.0, -0.5, 512.5);
  let v = clamp(f32(raw_v) - 1.0, -0.5, 512.5);

  // Texel indices for elevation sampling.
  // Interior: both indices are the same (single texel).
  // Edge: two adjacent texels to average (border + first interior).
  var tex_u_a: i32 = raw_u;
  var tex_u_b: i32 = raw_u;
  if (raw_u == 0) { tex_u_a = 0; tex_u_b = 1; }
  else if (raw_u == 514) { tex_u_a = 512; tex_u_b = 513; }

  var tex_v_a: i32 = raw_v;
  var tex_v_b: i32 = raw_v;
  if (raw_v == 0) { tex_v_a = 0; tex_v_b = 1; }
  else if (raw_v == 514) { tex_v_a = 512; tex_v_b = 513; }

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

  // Hillshade: compute normal from neighbor elevations
  let zL = loadElevation(vec2<i32>(clamp(raw_u - 1, 0, 513), raw_v));
  let zR = loadElevation(vec2<i32>(clamp(raw_u + 1, 0, 513), raw_v));
  let zU = loadElevation(vec2<i32>(raw_u, clamp(raw_v - 1, 0, 513)));
  let zD = loadElevation(vec2<i32>(raw_u, clamp(raw_v + 1, 0, 513)));

  let cellSize = uniforms.cell_size_meters;
  let dzdx = (zR - zL) / (2.0 * cellSize);
  let dzdy = (zD - zU) / (2.0 * cellSize);

  let normal = vec3<f32>(-dzdx, 1.0, -dzdy);
  let sun = globals.sun_direction.xyz;
  let sun_horizon = smoothstep(-0.02, 0.02, sun.y);
  out.shade = max(0.0, dot(normal, sun) * inverseSqrt(dot(normal, normal))) * sun_horizon;
  out.elevation_m = elevation;

  // Reject sea-level vertices (no terrain data) — degenerate w=0 prevents rasterization
  if (elevation <= 0.0) {
    out.position = vec4<f32>(0.0, 0.0, 0.0, 0.0);
  }

  return out;
}
`,lt=`
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
};

`+Se+`

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(2) @binding(0) var<uniform> globals: GlobalUniforms;
@group(3) @binding(0) var imageryTexture: texture_2d<f32>;
@group(3) @binding(1) var imagerySampler: sampler;

fn srgbToLinear(c: vec3<f32>) -> vec3<f32> {
  return pow(c, vec3<f32>(2.2));
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

  let lit = base_color * mix(1.0, shade, uniforms.hillshade_opacity);
  let terrain_color = clamp(lit, vec3<f32>(0.0), vec3<f32>(1.0));

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
`,ct=`
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
`,ft=`
`+Se+`

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
`;function xe(c){return(c+180)/360}function be(c){const e=c*Math.PI/180;return(1-Math.log(Math.tan(e)+1/Math.cos(e))/Math.PI)/2}function Pe(c){const[e,t,r,i]=c.bounds;return{minZoom:c.minzoom,maxZoom:c.maxzoom,minX:xe(e),maxX:xe(r),minY:be(i),maxY:be(t)}}function ze(c){const e=Array.isArray(c)?c[0]:c;return(t,r,i)=>e.replace("{z}",t).replace("{x}",r).replace("{y}",i)}function ue(c,e){const t=(e+.5)/(1<<c),r=2*Math.atan(Math.exp(Math.PI*(1-2*t)))-Math.PI/2;return 1/(40075016686e-3*Math.cos(r))}function ut(c,e){const t=(e+.5)/(1<<c),r=2*Math.atan(Math.exp(Math.PI*(1-2*t)))-Math.PI/2;return 40075016686e-3*Math.cos(r)/(1<<c)/512}const Fe=new Float64Array(16),Le=new Float64Array(16),Ge=new Float64Array(16),De=new Float64Array(16),ke=new Float64Array(16),Oe=new Float64Array(16);function tt(c,e,t,r,i,a){const s=1/(512*(1<<e)),n=t/(1<<e),o=r/(1<<e);c[0]=s,c[1]=0,c[2]=0,c[3]=0,c[4]=0,c[5]=i*a,c[6]=0,c[7]=0,c[8]=0,c[9]=0,c[10]=s,c[11]=0,c[12]=n,c[13]=0,c[14]=o,c[15]=1}function Ye(c,e,t){for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let s=0;s<4;s++)a+=e[r+s*4]*t[s+i*4];c[r+i*4]=a}}function ht(c,e,t,r,i,a,s,n){for(let o=0;o<16;o++)De[o]=e[o],ke[o]=t[o];tt(Fe,r,i,a,s,n),Ye(Le,De,Fe),Ye(Ge,ke,Le);for(let o=0;o<16;o++)c[o]=Ge[o]}function dt(c,e,t,r,i,a){tt(Oe,e,t,r,i,a);for(let s=0;s<16;s++)c[s]=Oe[s]}function Xe(c,e,t,r,i,a){const s=Math.pow(2,c-r);return{offsetU:i*s-e,offsetV:a*s-t,scaleU:s,scaleV:s}}function We(c,e,t){return Math.min(c+e,t)}function pt(c,e,t,r){const i=r-c;if(i<=0){const l=c-r;return[{z:r,x:e>>l,y:t>>l}]}const a=1<<i,s=e<<i,n=t<<i,o=[];for(let l=0;l<a;l++)for(let h=0;h<a;h++)o.push({z:r,x:s+h,y:n+l});return o}function _t(c){const e=[],t=c;return e.push(pe(t[3]+t[0],t[7]+t[4],t[11]+t[8],t[15]+t[12])),e.push(pe(t[3]-t[0],t[7]-t[4],t[11]-t[8],t[15]-t[12])),e.push(pe(t[3]+t[1],t[7]+t[5],t[11]+t[9],t[15]+t[13])),e.push(pe(t[3]-t[1],t[7]-t[5],t[11]-t[9],t[15]-t[13])),e.push(pe(t[2],t[6],t[10],t[14])),e.push(pe(t[3]-t[2],t[7]-t[6],t[11]-t[10],t[15]-t[14])),e}function pe(c,e,t,r){const i=Math.sqrt(c*c+e*e+t*t);return[c/i,e/i,t/i,r/i]}function mt(c,e,t,r,i,a,s){let n=!0;for(let o=0;o<6;o++){const[l,h,d,_]=c[o],f=l>=0?i:e,p=h>=0?a:t,m=d>=0?s:r,g=l>=0?e:i,v=h>=0?t:a,x=d>=0?r:s;if(l*f+h*p+d*m+_<0)return-1;l*g+h*v+d*x+_<0&&(n=!1)}return n?1:0}function gt(c,e,t,r,i,a){const s=1/(1<<e),n=t*s,o=r*s,l=3,h=s/(l-1),d=512/(l-1),_=new Float64Array(l*l),f=new Float64Array(l*l);for(let m=0;m<l;m++)for(let g=0;g<l;g++){const v=n+g*h,x=o+m*h,y=c[0]*v+c[8]*x+c[12],T=c[1]*v+c[9]*x+c[13],A=c[3]*v+c[11]*x+c[15];if(A<=0)return 1/0;const E=m*l+g;_[E]=(y/A*.5+.5)*i,f[E]=(.5-T/A*.5)*a}let p=0;for(let m=0;m<l;m++)for(let g=0;g<l;g++){const v=m*l+g;if(g<l-1){const x=v+1,y=_[x]-_[v],T=f[x]-f[v];p=Math.max(p,Math.sqrt(y*y+T*T)/d)}if(m<l-1){const x=v+l,y=_[x]-_[v],T=f[x]-f[v];p=Math.max(p,Math.sqrt(y*y+T*T)/d)}}return p}function yt(c,e,t,r,i,a){const s=1/(1<<c);let n=0,o=r;const l=a.getElevationBounds(c,e,t);if(l){const h=ue(c,t);n=l.minElevation*h*i,o=l.maxElevation*h*i}return{minX:e*s,maxX:(e+1)*s,minY:n,maxY:o,minZ:t*s,maxZ:(t+1)*s}}const vt=14,xt=4,bt=200;function wt(c,e,t,r,i,a,s,n,o){const l=_t(c),h=[],d=s&&s.minZoom!=null?s.minZoom:xt,_=s&&s.maxZoom!=null?s.maxZoom:vt;function f(p,m,g){if(h.length>=bt)return;const{minX:v,maxX:x,minY:y,maxY:T,minZ:A,maxZ:E}=yt(p,m,g,r,i,n);if(s&&(x<s.minX||v>s.maxX||E<s.minY||A>s.maxY)||mt(l,v,y,A,x,T,E)===-1)return;if(p<d){const U=p+1,S=m*2,w=g*2;f(U,S,w),f(U,S+1,w),f(U,S,w+1),f(U,S+1,w+1);return}if(!n.hasTile(p,m,g)){n.requestTile(p,m,g);return}if(p<_&&gt(c,p,m,g,e,t)>a){const U=p+1,S=m*2,w=g*2;if(n.isResolved(U,S,w)&&n.isResolved(U,S+1,w)&&n.isResolved(U,S,w+1)&&n.isResolved(U,S+1,w+1)&&(!o||o(U,S,w)&o(U,S+1,w)&o(U,S,w+1)&o(U,S+1,w+1))){f(U,S,w),f(U,S+1,w),f(U,S,w+1),f(U,S+1,w+1);return}n.hasTile(U,S,w)?o&&o(U,S,w):n.requestTile(U,S,w),n.hasTile(U,S+1,w)?o&&o(U,S+1,w):n.requestTile(U,S+1,w),n.hasTile(U,S,w+1)?o&&o(U,S,w+1):n.requestTile(U,S,w+1),n.hasTile(U,S+1,w+1)?o&&o(U,S+1,w+1):n.requestTile(U,S+1,w+1)}h.push({z:p,x:m,y:g})}return f(0,0,0),h}const we=10,qe=349525,ye=new Uint32Array(we);{let c=1;for(let e=0;e<we;e++)ye[e]=(c-1)/3,c*=4}function St(c){const e=new Float32Array(qe),t=new Float32Array(qe),r=we-1,i=ye[r],a=512,s=514;for(let n=0;n<a;n++)for(let o=0;o<a;o++){const l=n+1,h=o+1,d=c[l*s+h],_=c[l*s+h+1],f=c[(l+1)*s+h],p=c[(l+1)*s+h+1],m=i+n*a+o;e[m]=Math.min(d,_,f,p),t[m]=Math.max(d,_,f,p)}for(let n=r-1;n>=0;n--){const o=ye[n],l=ye[n+1],h=1<<n,d=1<<n+1;for(let _=0;_<h;_++)for(let f=0;f<h;f++){const p=o+_*h+f,m=_*2,g=f*2,v=l+m*d+g,x=v+1,y=l+(m+1)*d+g,T=y+1;e[p]=Math.min(e[v],e[x],e[y],e[T]),t[p]=Math.max(t[v],t[x],t[y],t[T])}}return{minElev:e,maxElev:t}}function Tt(c,e,t,r,i,a,s,n,o,l,h,d){let _,f;if(r!==0){let p=(s-c)/r,m=(l-c)/r;if(p>m){const g=p;p=m,m=g}_=p,f=m}else{if(c<s||c>l)return null;_=-1/0,f=1/0}if(i!==0){let p=(n-e)/i,m=(h-e)/i;if(p>m){const g=p;p=m,m=g}p>_&&(_=p),m<f&&(f=m)}else if(e<n||e>h)return null;if(_>f)return null;if(a!==0){let p=(o-t)/a,m=(d-t)/a;if(p>m){const g=p;p=m,m=g}p>_&&(_=p),m<f&&(f=m)}else if(t<o||t>d)return null;return _>f||f<0?null:[_,f]}function Ne(c,e,t,r,i,a,s,n,o,l,h,d,_,f,p){const m=l-s,g=h-n,v=d-o,x=_-s,y=f-n,T=p-o,A=i*T-a*y,E=a*x-r*T,b=r*y-i*x,F=m*A+g*E+v*b;if(F>-1e-10&&F<1e-10)return-1;const D=1/F,U=c-s,S=e-n,w=t-o,G=(U*A+S*E+w*b)*D;if(G<0||G>1)return-1;const R=S*v-w*g,Y=w*m-U*v,V=U*g-S*m,j=(r*R+i*Y+a*V)*D;if(j<0||G+j>1)return-1;const N=(x*R+y*Y+T*V)*D;return N>0?N:-1}function Mt(c,e,t,r,i,a,s,n,o){let l=1/0,h=-1,d=-1;const _=new Int32Array(we*4*3);let f=0;_[f++]=0,_[f++]=0,_[f++]=0;const p=514;for(;f>0;){const m=_[--f],g=_[--f],v=_[--f],x=ye[v],y=1<<v,T=x+g*y+m,A=512>>>v,E=m*A,b=E+A,F=g*A,D=F+A,U=c[T],S=e[T],w=Tt(r,i,a,s,n,o,E,U,F,b,S,D);if(w&&!(w[0]>=l))if(v===we-1){const G=g+1,R=m+1,Y=t[G*p+R],V=t[G*p+R+1],j=t[(G+1)*p+R],N=t[(G+1)*p+R+1];let Z=Ne(r,i,a,s,n,o,m,Y,g,m,j,g+1,m+1,V,g);Z>0&&Z<l&&(l=Z,h=g,d=m),Z=Ne(r,i,a,s,n,o,m+1,V,g,m,j,g+1,m+1,N,g+1),Z>0&&Z<l&&(l=Z,h=g,d=m)}else{const G=v+1,R=g*2,Y=m*2;_[f++]=G,_[f++]=R,_[f++]=Y,_[f++]=G,_[f++]=R,_[f++]=Y+1,_[f++]=G,_[f++]=R+1,_[f++]=Y,_[f++]=G,_[f++]=R+1,_[f++]=Y+1}}return l===1/0?null:{t:l,patchRow:h,patchCol:d}}const Bt=150,Ct=8,At=new OffscreenCanvas(514,514),He=At.getContext("2d",{willReadFrequently:!0});function Et(c){He.drawImage(c,0,0);const{data:e}=He.getImageData(0,0,514,514),t=new Float32Array(514*514);let r=1/0,i=-1/0;for(let a=0;a<514*514;a++){const s=a*4,n=-1e4+(e[s]*65536+e[s+1]*256+e[s+2])*.1;t[a]=n,n<r&&(r=n),n>i&&(i=n)}return{elevations:t,minElevation:r,maxElevation:i}}class Ut{constructor(e,{tileUrl:t}={}){this.device=e,this.tileUrl=t||((r,i,a)=>`tiles/${r}/${i}/${a}.webp`),this.cache=new Map,this.pending=new Map,this.failed=new Set,this.activeRequests=0,this.requestQueue=[],this.bindGroupLayout=null,this.onTileResolved=null,this.wantedKeys=new Set,this.bounds=null,this.aabbCache=new Map}getElevationBounds(e,t,r){return this.aabbCache.get(this._key(e,t,r))||null}setBounds(e){this.bounds=e}setBindGroupLayout(e){this.bindGroupLayout=e}_key(e,t,r){return`${e}/${t}/${r}`}hasTile(e,t,r){const i=this._key(e,t,r);this.wantedKeys.add(i);const a=this.cache.get(i);return a?(a.lastUsed=performance.now(),!0):!1}isResolved(e,t,r){const i=this._key(e,t,r);return this.wantedKeys.add(i),this.cache.has(i)||this.failed.has(i)}getTile(e,t,r){const i=this._key(e,t,r),a=this.cache.get(i);return a?(a.lastUsed=performance.now(),a):null}requestTile(e,t,r){const i=this._key(e,t,r);if(this.wantedKeys.add(i),!(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))){if(this.bounds&&this._isOutOfBounds(e,t,r)){this.failed.add(i);return}this.requestQueue.push({z:e,x:t,y:r,key:i}),this._processQueue()}}_isOutOfBounds(e,t,r){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),s=t*a,n=(t+1)*a,o=r*a,l=(r+1)*a;return n<i.minX||s>i.maxX||l<i.minY||o>i.maxY}_processQueue(){for(;this.activeRequests<Ct&&this.requestQueue.length>0;){const{z:e,x:t,y:r,key:i}=this.requestQueue.shift();if(this.cache.has(i)||this.pending.has(i)||this.failed.has(i))continue;this.activeRequests++;const a=new AbortController;this.pending.set(i,a),this._loadTile(e,t,r,i,a.signal).finally(()=>{this.pending.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,r,i,a){try{const s=this.tileUrl(e,t,r),n=await fetch(s,{signal:a});if(!n.ok){this.failed.add(i),this.onTileResolved&&this.onTileResolved(e,t,r);return}const o=await n.blob(),l=await createImageBitmap(o,{colorSpaceConversion:"none"}),{elevations:h,minElevation:d,maxElevation:_}=Et(l);if(l.close(),this.aabbCache.set(i,{minElevation:d,maxElevation:_}),a.aborted)return;const f=this.device.createTexture({size:[514,514],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),p=2304,m=new Uint8Array(p*514),g=new Uint8Array(h.buffer);for(let x=0;x<514;x++)m.set(g.subarray(x*514*4,(x+1)*514*4),x*p);this.device.queue.writeTexture({texture:f},m,{bytesPerRow:p},[514,514]);const v=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:f.createView()}]});this.cache.set(i,{texture:f,bindGroup:v,elevations:h,quadtree:null,minElevation:d,maxElevation:_,lastUsed:performance.now()}),this.onTileResolved&&this.onTileResolved(e,t,r)}catch(s){if(s.name==="AbortError")return;this.failed.add(i),this.onTileResolved&&this.onTileResolved(e,t,r)}}ensureQuadtree(e,t,r){const i=this.cache.get(this._key(e,t,r));return i?(i.quadtree||(i.quadtree=St(i.elevations)),i):null}stripQuadtrees(){for(const[e,t]of this.cache)!this.wantedKeys.has(e)&&t.quadtree&&(t.quadtree=null)}cancelStale(){for(const[e,t]of this.pending)this.wantedKeys.has(e)||t.abort()}evict(){for(;this.cache.size>Bt;){let e=null,t=1/0;for(const[r,i]of this.cache)this.wantedKeys.has(r)||i.lastUsed<t&&(t=i.lastUsed,e=r);if(!e)break;this.cache.get(e).texture.destroy(),this.cache.delete(e)}}beginFrame(){this.requestQueue=[],this.wantedKeys=new Set}}const Rt=8;class It{constructor({tileUrl:e}={}){this.tileUrl=e||((t,r,i)=>`sentinel_tiles/${t}/${r}/${i}.webp`),this.fetched=new Map,this.pending=new Map,this.abortControllers=new Map,this.failed=new Set,this.consumers=new Map,this.terrainToSat=new Map,this.activeRequests=0,this.requestQueue=[],this.onTileLoaded=null,this.bounds=null}setBounds(e){this.bounds=e}_key(e,t,r){return`${e}/${t}/${r}`}getBitmap(e,t,r){return this.fetched.get(this._key(e,t,r))||null}isFailed(e,t,r){return this.failed.has(this._key(e,t,r))}requestTile(e,t,r,i){const a=this._key(e,t,r);let s=this.consumers.get(a);s||(s=new Set,this.consumers.set(a,s)),s.add(i);let n=this.terrainToSat.get(i);if(n||(n=new Set,this.terrainToSat.set(i,n)),n.add(a),!(this.fetched.has(a)||this.failed.has(a)||this.pending.has(a))){if(this.bounds&&this._isOutOfBounds(e,t,r)){this.failed.add(a);return}this.requestQueue.push({z:e,x:t,y:r,key:a}),this._processQueue()}}_isOutOfBounds(e,t,r){const i=this.bounds;if(e<i.minZoom||e>i.maxZoom)return!0;const a=1/(1<<e),s=t*a,n=(t+1)*a,o=r*a,l=(r+1)*a;return n<i.minX||s>i.maxX||l<i.minY||o>i.maxY}getConsumers(e,t,r){return this.consumers.get(this._key(e,t,r))||null}removeConsumer(e){const t=this.terrainToSat.get(e);if(t){for(const r of t){const i=this.consumers.get(r);if(i&&(i.delete(e),i.size===0)){this.consumers.delete(r);const a=this.abortControllers.get(r);a&&(a.abort(),this.abortControllers.delete(r));const s=this.fetched.get(r);s&&(s.close(),this.fetched.delete(r))}}this.terrainToSat.delete(e)}}beginFrame(){this.requestQueue=[]}_processQueue(){for(;this.activeRequests<Rt&&this.requestQueue.length>0;){const{z:e,x:t,y:r,key:i}=this.requestQueue.shift();if(this.fetched.has(i)||this.pending.has(i)||this.failed.has(i))continue;const a=this.consumers.get(i);if(!a||a.size===0)continue;this.activeRequests++;const s=new AbortController;this.abortControllers.set(i,s);const n=this._loadTile(e,t,r,i,s.signal);this.pending.set(i,n),n.finally(()=>{this.pending.delete(i),this.abortControllers.delete(i),this.activeRequests--,this._processQueue()})}}async _loadTile(e,t,r,i,a){try{const s=this.tileUrl(e,t,r),n=await fetch(s,{signal:a});if(!n.ok){this.failed.add(i);return}const o=await n.blob(),l=await createImageBitmap(o);this.fetched.set(i,l),this.onTileLoaded&&this.onTileLoaded(e,t,r)}catch(s){if(s.name==="AbortError")return;this.failed.add(i)}}}const ie=512,Pt=4;class zt{constructor(e,t,r,i){this.device=e,this.layers=t,this.bindGroupLayout=r,this.sampler=i,this.entries=new Map,this.onUpdate=null;for(const a of t)a.imageryManager.onTileLoaded=(s,n,o)=>this._onSatelliteTileLoaded(a,s,n,o)}_terrainKey(e,t,r){return`${e}/${t}/${r}`}ensureImagery(e,t,r,i){const a=this._terrainKey(e,t,r),s=this.entries.get(a);if(s){s.lastUsed=performance.now();return}const n=new OffscreenCanvas(ie,ie),o=n.getContext("2d"),l=this.device.createTexture({size:[ie,ie],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),h=this.device.createBindGroup({layout:this.bindGroupLayout,entries:[{binding:0,resource:l.createView()},{binding:1,resource:this.sampler}]}),d=this.layers.map(f=>{const p=Math.min(i,f.maxzoom);return{satTiles:pt(e,t,r,p),imageryManager:f.imageryManager}}),_={canvas:n,ctx:o,texture:l,bindGroup:h,layerData:d,tz:e,tx:t,ty:r,needsUpload:!1,hasContent:!1,lastUsed:performance.now()};this.entries.set(a,_);for(const f of d)for(const p of f.satTiles)f.imageryManager.requestTile(p.z,p.x,p.y,a);this._recomposite(_),_.needsUpload&&this._upload(_)}getBindGroup(e,t,r){const i=this.entries.get(this._terrainKey(e,t,r));return i?i.bindGroup:null}hasImagery(e,t,r){const i=this.entries.get(this._terrainKey(e,t,r));return i?i.hasContent:!1}gc(e){for(const[t,r]of this.entries)if(!(e&&e.has(t))){r.texture.destroy();for(const i of r.layerData)i.imageryManager.removeConsumer(t);this.entries.delete(t)}}release(e,t,r){const i=this._terrainKey(e,t,r),a=this.entries.get(i);if(a){a.texture.destroy();for(const s of a.layerData)s.imageryManager.removeConsumer(i);this.entries.delete(i)}}_onSatelliteTileLoaded(e,t,r,i){const a=e.imageryManager.getConsumers(t,r,i);if(a){for(const s of a){const n=this.entries.get(s);n&&(this._recomposite(n),this._upload(n))}this.onUpdate&&this.onUpdate()}}_recomposite(e){const{ctx:t}=e;t.clearRect(0,0,ie,ie),this._fillFromAncestor(e);let r=e.hasContent;for(let i=0;i<this.layers.length;i++){const a=this.layers[i],s=e.layerData[i];t.globalCompositeOperation=a.blend||"source-over",t.globalAlpha=a.opacity!=null?a.opacity:1;for(const n of s.satTiles){const o=s.imageryManager.getBitmap(n.z,n.x,n.y);if(!o)continue;r=!0;const l=Xe(e.tz,e.tx,e.ty,n.z,n.x,n.y);t.drawImage(o,l.offsetU*ie,l.offsetV*ie,l.scaleU*ie,l.scaleV*ie)}}t.globalCompositeOperation="source-over",t.globalAlpha=1,r&&(e.needsUpload=!0,e.hasContent=!0)}_fillFromAncestor(e){const{tz:t,tx:r,ty:i,ctx:a}=e;for(let s=1;s<=t-Pt;s++){const n=t-s,o=r>>s,l=i>>s,h=this.entries.get(this._terrainKey(n,o,l));if(h&&h.hasContent){const d=Xe(t,r,i,n,o,l);a.drawImage(h.canvas,d.offsetU*ie,d.offsetV*ie,d.scaleU*ie,d.scaleV*ie),e.needsUpload=!0,e.hasContent=!0;return}}}_upload(e){this.device.queue.copyExternalImageToTexture({source:e.canvas},{texture:e.texture},[ie,ie]),e.needsUpload=!1}}class Ft{constructor(){this.features=[],this.lineFeatures=[]}async load(e,t={}){let r;typeof e=="string"?r=await(await fetch(e)).json():r=e;const i=t.simplify,a=t.simplifyFn;this.features=[],this.lineFeatures=[];for(const s of r.features)if(s.geometry){if(s.geometry.type==="Point"){const[n,o]=s.geometry.coordinates;this.features.push({mercatorX:xe(n),mercatorY:be(o),lon:n,lat:o,properties:s.properties||{}})}else if(s.geometry.type==="LineString"){let n=s.geometry.coordinates;if(i!=null&&a){const l=n.map(([d,_,f])=>({x:d,y:_,elev:f||0}));n=a(l,i,!0).map(d=>[d.x,d.y,d.elev])}const o=n.map(([l,h,d])=>({mercatorX:xe(l),mercatorY:be(h),elevation:d||0,lon:l,lat:h}));this.lineFeatures.push({coordinates:o,properties:s.properties||{}})}}return this}}const Lt=`
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
`,Gt=`
struct CircleUniforms {
  projection_view: mat4x4<f32>,
  viewport_size: vec2<f32>,
  pixel_ratio: f32,
  exaggeration: f32,
  atmosphere_opacity: f32,
};

`+Se+`

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
`,Ce=1e4,Ue=14,Ae=Ue*4;function Ve(c){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}class Dt{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._radius=i["circle-radius"]||4,this._fillColor=Ve(i["circle-color"]||"#ff3333"),this._strokeColor=Ve(i["circle-stroke-color"]||"#ffffff"),this._strokeWidth=i["circle-stroke-width"]||0,this._opacity=i["circle-opacity"]!=null?i["circle-opacity"]:1,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._pipelineDepthTest=null,this._pipelineNoDepthTest=null,this._instanceBuffer=null,this._instanceData=null,this._uniformBuffer=null,this._uniformBindGroup=null,this._visibleCount=0,this._visibleFeatures=null}init(e,t,r){this._device=e;const i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._instanceData=new Float32Array(Ce*Ue),this._instanceBuffer=e.createBuffer({size:Ce*Ae,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});const a=e.createShaderModule({code:Lt}),s=e.createShaderModule({code:Gt}),n=e.createPipelineLayout({bindGroupLayouts:[t,i]}),o={module:a,entryPoint:"vs_circle",buffers:[{arrayStride:Ae,stepMode:"instance",attributes:[{format:"float32x3",offset:0,shaderLocation:0},{format:"float32",offset:12,shaderLocation:1},{format:"float32x4",offset:16,shaderLocation:2},{format:"float32x4",offset:32,shaderLocation:3},{format:"float32",offset:48,shaderLocation:4},{format:"float32",offset:52,shaderLocation:5}]}]},l={module:s,entryPoint:"fs_circle",targets:[{format:r,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]};this._pipelineDepthTest=e.createRenderPipeline({layout:n,vertex:o,fragment:l,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"}}),this._pipelineNoDepthTest=e.createRenderPipeline({layout:n,vertex:o,fragment:l,primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}})}prepare(e,t,r,i,a){const s=this._source.features,n=this._instanceData;let o=0;for(let h=0;h<s.length&&o<Ce;h++){const d=s[h],_=this._queryElevation(d.mercatorX,d.mercatorY);if(_==null||_<=0||this._visibleFeatures&&!this._visibleFeatures.has(h))continue;const f=this._estimateElevScale(d.mercatorY),p=d.mercatorX,m=_*f*a,g=d.mercatorY,v=e[0]*p+e[4]*m+e[8]*g+e[12],x=e[1]*p+e[5]*m+e[9]*g+e[13],y=e[3]*p+e[7]*m+e[11]*g+e[15];if(y<=0)continue;const T=v/y,A=x/y,E=.2;if(T<-1-E||T>1+E||A<-1-E||A>1+E)continue;const b=o*Ue;n[b]=p,n[b+1]=m,n[b+2]=g,n[b+3]=this._radius,n[b+4]=this._fillColor[0],n[b+5]=this._fillColor[1],n[b+6]=this._fillColor[2],n[b+7]=this._fillColor[3],n[b+8]=this._strokeColor[0],n[b+9]=this._strokeColor[1],n[b+10]=this._strokeColor[2],n[b+11]=this._strokeColor[3],n[b+12]=this._strokeWidth,n[b+13]=this._opacity,o++}this._visibleCount=o,o>0&&this._device.queue.writeBuffer(this._instanceBuffer,0,n.buffer,0,o*Ae);const l=new Float32Array(24);l.set(e,0),l[16]=t,l[17]=r,l[18]=i,l[19]=a,l[20]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._uniformBuffer,0,l)}draw(e,t,r=!0){this._visibleCount!==0&&(e.setPipeline(r?this._pipelineDepthTest:this._pipelineNoDepthTest),e.setBindGroup(0,t),e.setBindGroup(1,this._uniformBindGroup),e.setVertexBuffer(0,this._instanceBuffer),e.draw(6,this._visibleCount))}getCollisionItems(e,t,r,i,a){const s=this._source.features,n=t/i,o=r/i,l=this._radius+this._strokeWidth,h=[];for(let d=0;d<s.length;d++){const _=s[d],f=this._queryElevation(_.mercatorX,_.mercatorY);if(f==null||f<=0)continue;const p=this._estimateElevScale(_.mercatorY),m=_.mercatorX,g=f*p*a,v=_.mercatorY,x=e[0]*m+e[4]*g+e[8]*v+e[12],y=e[1]*m+e[5]*g+e[9]*v+e[13],T=e[2]*m+e[6]*g+e[10]*v+e[14],A=e[3]*m+e[7]*g+e[11]*v+e[15];if(A<=0)continue;const E=x/A,b=y/A;E<-1.2||E>1.2||b<-1.2||b>1.2||h.push({layerIndex:-1,featureIndex:d,sourceFeatureIndex:d,screenX:(E*.5+.5)*n,screenY:(.5-b*.5)*o,halfW:l,halfH:l,depth:T/A,clipW:A})}return h}setVisibleFeatures(e){this._visibleFeatures=e}_estimateElevScale(e){const r=Math.floor(e*1024);return ue(10,r)}}const Be=96,_e=Be/4;function kt(c,e){const{fontAtlas:t,vertexTransform:r=Ot,vertexProjection:i=Yt,fragmentShaderBody:a=Xt,colorTargets:s,depthStencil:n,multisample:o,initialCapacity:l=1024}=e,h=Array.isArray(s)?s:[s];let d=[],_=0,f=!1,p=0,m=l,g=c.createBuffer({label:"gpu-text-characters",size:m*Be,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),v=new Float32Array(m*_e);const x=c.createBuffer({label:"gpu-text-uniforms",size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),y=c.createSampler({label:"gpu-text-sampler",magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"}),T=Wt(r,i),A=qt(a),E=c.createShaderModule({label:"gpu-text-vertex",code:T}),b=c.createShaderModule({label:"gpu-text-fragment",code:A}),F=c.createRenderPipeline({label:"gpu-text",layout:"auto",vertex:{module:E,entryPoint:"vertexMain"},fragment:{module:b,entryPoint:"fragmentMain",targets:h},primitive:{topology:"triangle-strip",stripIndexFormat:void 0,cullMode:"none"},depthStencil:n,multisample:o}),D=c.createBindGroup({layout:F.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:x}}]});let U=S();function S(){return c.createBindGroup({layout:F.getBindGroupLayout(1),entries:[{binding:0,resource:y},{binding:1,resource:t.textureView},{binding:2,resource:{buffer:g}}]})}let w=-1,G=-1,R=!1;function Y(M){let L=0;for(const u of M)t.glyphs.has(u)&&u!==" "&&u!=="	"&&u!==`
`&&L++;return L}function V(M){if(M<=m)return;let L=m;for(;L<M;)L*=2;const u=c.createBuffer({label:"gpu-text-characters",size:L*Be,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),B=new Float32Array(L*_e);B.set(v),p>0&&c.queue.writeBuffer(u,0,B,0,p*_e),g.destroy(),g=u,v=B,m=L,U=S()}function j(M,L){let u=0,B=0,I=0;for(const C of M){if(C===" "){const O=t.glyphs.get(" ");u+=O?O.xAdvance*L:t.fontSize*.3*L;continue}if(C==="	"){const O=t.glyphs.get(" "),X=O?O.xAdvance:t.fontSize*.3;u+=X*4*L;continue}if(C===`
`)continue;const P=t.glyphs.get(C);if(!P)continue;u+=P.xAdvance*L;const z=-P.yOffset*L,k=P.height*L-z;B=Math.max(B,z),I=Math.max(I,k)}return{width:u,ascent:B,descent:I}}function N(M){const{text:L,anchor:u,offset:B,fontSize:I,color:C,strokeColor:P,strokeWidth:z,bufferOffset:k,align:O,baseline:X}=M,Q=I/t.fontSize,W=t.width,q=t.height,K=j(L,1);let ee=0;O==="center"?ee=-K.width/2:O==="right"&&(ee=-K.width);let se=0;X==="top"?se=K.ascent:X==="middle"?se=(K.ascent-K.descent)/2:X==="bottom"&&(se=-K.descent);let J=ee,oe=se,re=0;for(const le of L){if(le===" "){const fe=t.glyphs.get(" ");fe?J+=fe.xAdvance:J+=t.fontSize*.3;continue}if(le==="	"){const fe=t.glyphs.get(" "),de=fe?fe.xAdvance:t.fontSize*.3;J+=de*4;continue}if(le===`
`)continue;const te=t.glyphs.get(le);if(!te)continue;const H=(k+re)*_e;v[H+0]=te.x/W,v[H+1]=te.y/q,v[H+2]=(te.x+te.width)/W,v[H+3]=(te.y+te.height)/q,v[H+4]=C[0],v[H+5]=C[1],v[H+6]=C[2],v[H+7]=C[3],v[H+8]=u[0],v[H+9]=u[1],v[H+10]=u[2],v[H+11]=u[3],v[H+12]=P[0],v[H+13]=P[1],v[H+14]=P[2],v[H+15]=P[3],v[H+16]=J+te.xOffset,v[H+17]=oe+te.yOffset,v[H+18]=B[0],v[H+19]=B[1],v[H+20]=te.width,v[H+21]=te.height,v[H+22]=Q,v[H+23]=z,J+=te.xAdvance,re++}const ne=k*Be,ae=k*_e;c.queue.writeBuffer(g,ne,v,ae,M.characterCount*_e),M.dirty=!1}function Z(){if(!f)return;const M=d.filter(u=>!u.destroyed);let L=0;for(const u of M)u.bufferOffset!==L&&(u.bufferOffset=L,u.dirty=!0),L+=u.characterCount;p=L,d=M;for(const u of d)u.dirty&&N(u);f=!1}function $(M){return M.length===2?[M[0],M[1],0,1]:M.length===3?[M[0],M[1],M[2],1]:[M[0],M[1],M[2],M[3]]}return{createSpan(M){const L=Y(M.text);V(p+L);const u={id:_++,text:M.text,anchor:$(M.position),offset:M.offset??[0,0],fontSize:M.fontSize??t.fontSize,color:M.color?[...M.color]:[1,1,1,1],strokeColor:M.strokeColor?[...M.strokeColor]:[0,0,0,0],strokeWidth:M.strokeWidth??0,align:M.align??"left",baseline:M.baseline??"baseline",bufferOffset:p,characterCount:L,destroyed:!1,dirty:!0};return d.push(u),p+=L,N(u),{setText(B){if(u.destroyed)return;const I=Y(B);I!==u.characterCount?(u.destroyed=!0,f=!0,Z(),V(p+I),u.destroyed=!1,u.text=B,u.characterCount=I,u.bufferOffset=p,u.dirty=!0,d.push(u),p+=I):(u.text=B,u.dirty=!0),N(u)},setPosition(B){u.destroyed||(u.anchor=$(B),u.dirty=!0,N(u))},setOffset(B){u.destroyed||(u.offset=[...B],u.dirty=!0,N(u))},setFontSize(B){u.destroyed||(u.fontSize=B,u.dirty=!0,N(u))},setColor(B){u.destroyed||(u.color=[...B],u.dirty=!0,N(u))},setStrokeColor(B){u.destroyed||(u.strokeColor=[...B],u.dirty=!0,N(u))},setStrokeWidth(B){u.destroyed||(u.strokeWidth=B,u.dirty=!0,N(u))},setAlign(B){u.destroyed||(u.align=B,u.dirty=!0,N(u))},setBaseline(B){u.destroyed||(u.baseline=B,u.dirty=!0,N(u))},getText(){return u.text},getCharacterCount(){return u.characterCount},destroy(){u.destroyed||(u.destroyed=!0,f=!0)},isDestroyed(){return u.destroyed}}},getBindGroupLayout(M){return F.getBindGroupLayout(M)},updateUniforms(M){const{resolution:L,viewMatrix:u}=M;if(!R||L[0]!==w||L[1]!==G||u!==void 0){const I=new ArrayBuffer(96),C=new Float32Array(I);C[0]=L[0],C[1]=L[1],C[2]=1,C[3]=t.fieldRange??4,C[4]=t.width,C[5]=t.height,C[6]=0,C[7]=0,u?C.set(u,8):(C[8]=1,C[9]=0,C[10]=0,C[11]=0,C[12]=0,C[13]=1,C[14]=0,C[15]=0,C[16]=0,C[17]=0,C[18]=1,C[19]=0,C[20]=0,C[21]=0,C[22]=0,C[23]=1),c.queue.writeBuffer(x,0,I),w=L[0],G=L[1],R=!0}},compact:Z,draw(M,L,u=[]){if(f&&Z(),L.skipUniformUpdate||this.updateUniforms(L),p!==0){M.setPipeline(F),M.setBindGroup(0,D),M.setBindGroup(1,U);for(let B=0;B<u.length;B++)M.setBindGroup(B+2,u[B]);M.draw(4,p)}},getTotalCharacterCount(){return p},destroy(){g.destroy(),x.destroy()}}}const Ot=`
fn getVertex(position: vec4f) -> vec4f {
  return uniforms.viewMatrix * position;
}
`,Yt=`
fn projectVertex(position: vec3f, uv: vec2f, color: vec4f) -> vec4f {
  // Convert screen pixels to clip space (NDC with Y flipped)
  let x = position.x / uniforms.resolution.x * 2.0 - 1.0;
  let y = 1.0 - position.y / uniforms.resolution.y * 2.0;
  return vec4f(x, y, position.z, 1.0);
}
`,Xt=`
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
`;function Wt(c,e){return`
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
${c}

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
`}function qt(c){return`
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

${c}

@fragment
fn fragmentMain(input: FragmentInput) -> @location(0) vec4f {
  // Sample the MSDF/MTSDF texture (all four channels)
  // RGB: multi-channel SDF for sharp fill edges
  // A: true SDF for strokes (in MTSDF format) or 1.0 (in plain MSDF)
  let msdf = textureSample(fontAtlas, fontSampler, input.uv);

  return getColor(input.uv, input.color, input.strokeColor, input.strokeWidth, msdf, input.anchor);
}
`}async function Nt(c,e){const{atlasUrl:t,metadataUrl:r}=e,[i,a]=await Promise.all([fetch(r),fetch(t)]);if(!i.ok)throw new Error(`Failed to load atlas metadata: ${i.statusText}`);if(!a.ok)throw new Error(`Failed to load atlas image: ${a.statusText}`);const s=await i.json(),n=await a.blob(),o=await createImageBitmap(n),l=c.createTexture({label:"font-atlas-msdf",size:[s.width,s.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});c.queue.copyExternalImageToTexture({source:o},{texture:l},[s.width,s.height]);const h=document.createElement("canvas");h.width=s.width,h.height=s.height,h.getContext("2d").drawImage(o,0,0);const _=new Map;for(const f of s.glyphs)_.set(f.char,{char:f.char,x:f.x,y:f.y,width:f.width,height:f.height,xOffset:f.xOffset,yOffset:f.yOffset,xAdvance:f.xAdvance});return{texture:l,textureView:l.createView(),width:s.width,height:s.height,lineHeight:s.lineHeight,fontSize:s.fontSize,fieldRange:s.fieldRange??4,glyphs:_,debugCanvas:h}}function Ze(c){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const Ht=`
${Se}

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
`;class Vt{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._textField=i["text-field"]||"name",this._fontSize=i["text-size"]||12,this._color=Ze(i["text-color"]||"#ffffff"),this._strokeColor=Ze(i["text-halo-color"]||"#000000"),this._strokeWidth=i["text-halo-width"]!=null?i["text-halo-width"]:1.5,this._offset=i["text-offset"]||[0,-10],this._align=i["text-align"]||"center",this._baseline=i["text-baseline"]||"bottom",this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._textContext=null,this._spans=[],this._ready=!1,this._visibleFeatures=null,this._fontAtlas=null,this._atmosphereBindGroup=null,this._textAtmosBuffer=null,this._textAtmosData=new Float32Array(4),this._lastScaledStrokeWidth=null}init(e,t,r,i,a){this._device=e,this._fontAtlas=t,this._textContext=kt(e,{fontAtlas:t,fragmentShaderBody:Ht,colorTargets:{format:r,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},depthStencil:{format:i,depthWriteEnabled:!1,depthCompare:"always"}}),this._textAtmosBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const s=this._textContext.getBindGroupLayout(2);this._atmosphereBindGroup=e.createBindGroup({layout:s,entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:this._textAtmosBuffer}}]});const n=this._fontSize/t.fontSize;for(let o=0;o<this._source.features.length;o++){const l=this._source.features[o],h=l.properties[this._textField];if(!h)continue;const d=this._textContext.createSpan({text:String(h),position:[0,0,0],fontSize:this._fontSize,color:this._color,strokeColor:this._strokeColor,strokeWidth:this._strokeWidth,offset:this._offset,align:this._align,baseline:this._baseline}),_=String(h);let f=0,p=0,m=0;for(const g of _){const v=t.glyphs.get(g);if(!v)continue;f+=v.xAdvance*n;const x=-v.yOffset*n,y=v.height*n-x;x>p&&(p=x),y>m&&(m=y)}this._spans.push({span:d,feature:l,sourceIndex:o,textWidth:f,ascent:p,descent:m})}this._ready=!0}prepare(e,t,r,i,a){if(!this._ready)return;const s=this._strokeWidth*i;if(s!==this._lastScaledStrokeWidth){this._lastScaledStrokeWidth=s;for(const{span:h}of this._spans)h.setStrokeWidth(s)}for(let h=0;h<this._spans.length;h++){const{span:d,feature:_}=this._spans[h];if(this._visibleFeatures&&!this._visibleFeatures.has(h)){d.setPosition([0,0,0,0]);continue}const f=_,p=this._queryElevation(f.mercatorX,f.mercatorY);if(p==null||p<=0){d.setPosition([0,0,0,0]);continue}const m=this._estimateElevScale(f.mercatorY),g=f.mercatorX,v=p*m*a,x=f.mercatorY;if(e[3]*g+e[7]*v+e[11]*x+e[15]<=0){d.setPosition([0,0,0,0]);continue}d.setPosition([g,v,x,1])}const n=t/i,o=r/i;this._textContext.updateUniforms({resolution:[n,o],viewMatrix:e});const l=this._textAtmosData;l[0]=a,l[1]=this._atmosphereOpacity,this._device.queue.writeBuffer(this._textAtmosBuffer,0,l)}draw(e){this._ready&&this._textContext.getTotalCharacterCount()!==0&&this._textContext.draw(e,{resolution:[1,1],skipUniformUpdate:!0},[this._atmosphereBindGroup])}getCollisionItems(e,t,r,i,a){if(!this._ready)return[];const s=t/i,n=r/i,o=[];for(let l=0;l<this._spans.length;l++){const{feature:h,sourceIndex:d,textWidth:_,ascent:f,descent:p}=this._spans[l],m=h,g=this._queryElevation(m.mercatorX,m.mercatorY);if(g==null||g<=0)continue;const v=this._estimateElevScale(m.mercatorY),x=m.mercatorX,y=g*v*a,T=m.mercatorY,A=e[0]*x+e[4]*y+e[8]*T+e[12],E=e[1]*x+e[5]*y+e[9]*T+e[13],b=e[2]*x+e[6]*y+e[10]*T+e[14],F=e[3]*x+e[7]*y+e[11]*T+e[15];if(F<=0)continue;const D=A/F,U=E/F;if(D<-1.2||D>1.2||U<-1.2||U>1.2)continue;let S=(D*.5+.5)*s+this._offset[0],w=(.5-U*.5)*n+this._offset[1];const G=_/2,R=(f+p)/2;this._align==="left"?S+=G:this._align==="right"&&(S-=G),this._baseline==="top"?w+=R:this._baseline==="bottom"&&(w-=R),o.push({layerIndex:-1,featureIndex:l,sourceFeatureIndex:d,screenX:S,screenY:w,halfW:G,halfH:R,depth:b/F,clipW:F})}return o}setVisibleFeatures(e){this._visibleFeatures=e}_estimateElevScale(e){const r=Math.floor(e*1024);return ue(10,r)}destroy(){this._textContext&&this._textContext.destroy(),this._textAtmosBuffer&&this._textAtmosBuffer.destroy()}}function $e(c){const e=/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(c);return e?[parseInt(e[1],16)/255,parseInt(e[2],16)/255,parseInt(e[3],16)/255,1]:[1,0,0,1]}const Zt=`
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
  // Depth bias: constant world-space offset toward the camera.
  // depthOffset = far/(far-near) * delta * near, pre-computed on the CPU.
  // Dividing by clip.w (= eye distance) gives NDC offset = delta*near/d^2,
  // which matches the depth buffer's precision curve — the line wins a fixed
  // number of world-space meters of depth at every distance.
  clip.z -= line.depthOffset / max(clip.w, 1e-5);
  return Vertex(clip, line.lineWidth * line.pixelRatio, p.xyz);
}
`,$t=`
${Se}

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
`,Qe=128;class Qt{constructor(e,t,r){this._source=t,this._queryElevation=r;const i=e.paint||{};this._lineColor=$e(i["line-color"]||"#ff8800"),this._borderColor=$e(i["line-border-color"]||"#331100"),this._lineWidth=i["line-width"]||3,this._borderWidth=i["line-border-width"]||0,this._atmosphereOpacity=i["atmosphere-opacity"]!=null?i["atmosphere-opacity"]:1,this._gpuLines=null,this._positionBuffer=null,this._uniformBuffer=null,this._sharedBindGroup=null,this._polylines=[],this._positionData=null,this._cachedElevations=null,this._elevationsDirty=!0,this._lastExaggeration=-1,this._positionsDirty=!0,this._device=null}init(e,t,r,i,a,s){this._device=e,this._globalUniformBuffer=r;const n=a/(a-i),o=1e-5;this._depthOffset=n*o*i,this._gpuLines=s(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"square",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:Zt,fragmentShaderBody:$t})}_ensureBuffers(){if(this._positionBuffer)return;const e=this._source.lineFeatures;if(e.length===0)return;const t=this._device,r=16;let i=0;for(const s of e)i=Math.ceil(i/r)*r,i+=s.coordinates.length;if(i===0)return;this._positionBuffer=t.createBuffer({size:i*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._positionData=new Float32Array(i*4),this._cachedElevations=new Float32Array(i);let a=0;for(const s of e){a=Math.ceil(a/r)*r;const n=s.coordinates.length,o=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer,offset:a*16,size:n*16}}]});this._polylines.push({offset:a,count:n,feature:s,dataBindGroup:o}),a+=n}this._uniformBuffer=t.createBuffer({size:Qe,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=t.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}},{binding:1,resource:{buffer:this._globalUniformBuffer}}]})}invalidateElevations(){this._elevationsDirty=!0}prepare(e,t,r,i,a){if(!this._gpuLines||(this._ensureBuffers(),this._polylines.length===0))return;if(this._elevationsDirty){const n=this._cachedElevations;for(const o of this._polylines)for(let l=0;l<o.count;l++){const h=o.feature.coordinates[l];n[o.offset+l]=this._queryElevation(h.mercatorX,h.mercatorY)}this._elevationsDirty=!1,this._positionsDirty=!0}if(this._positionsDirty||a!==this._lastExaggeration){const n=this._positionData,o=this._cachedElevations;for(const l of this._polylines)for(let h=0;h<l.count;h++){const d=l.feature.coordinates[h],_=o[l.offset+h],f=(l.offset+h)*4;if(_==null||_<=0)n[f]=d.mercatorX,n[f+1]=0,n[f+2]=d.mercatorY,n[f+3]=1;else{const p=this._estimateElevScale(d.mercatorY);n[f]=d.mercatorX,n[f+1]=_*p*a,n[f+2]=d.mercatorY,n[f+3]=1}}this._device.queue.writeBuffer(this._positionBuffer,0,n),this._lastExaggeration=a,this._positionsDirty=!1}const s=new Float32Array(Qe/4);s.set(e,0),s[16]=this._lineColor[0],s[17]=this._lineColor[1],s[18]=this._lineColor[2],s[19]=this._lineColor[3],s[20]=this._borderColor[0],s[21]=this._borderColor[1],s[22]=this._borderColor[2],s[23]=this._borderColor[3],s[24]=this._lineWidth,s[25]=this._borderWidth,s[26]=i,s[27]=a,s[28]=this._atmosphereOpacity,s[29]=this._depthOffset,this._device.queue.writeBuffer(this._uniformBuffer,0,s),this._canvasW=t,this._canvasH=r}draw(e){if(!(!this._gpuLines||this._polylines.length===0))for(const t of this._polylines)this._gpuLines.draw(e,{vertexCount:t.count,resolution:[this._canvasW,this._canvasH]},[t.dataBindGroup,this._sharedBindGroup])}_estimateElevScale(e){const r=Math.floor(e*1024);return ue(10,r)}destroy(){this._gpuLines&&this._gpuLines.destroy(),this._positionBuffer&&this._positionBuffer.destroy(),this._uniformBuffer&&this._uniformBuffer.destroy()}}function Ee(c,e,t){this.aabb=new t(6),this.startIndex=c,this.endIndex=e,this.node0=null,this.node1=null}const me=[],ce=[],he=[],ge=[];function Ke(c,e,t,r,i,a,s){let n,o;if(r!==0){let l=(s[0]-c)/r,h=(s[3]-c)/r;if(l>h){const d=l;l=h,h=d}n=l,o=h}else{if(c<s[0]||c>s[3])return null;n=-1/0,o=1/0}if(i!==0){let l=(s[1]-e)/i,h=(s[4]-e)/i;if(l>h){const d=l;l=h,h=d}l>n&&(n=l),h<o&&(o=h)}else if(e<s[1]||e>s[4])return null;if(n>o)return null;if(a!==0){let l=(s[2]-t)/a,h=(s[5]-t)/a;if(l>h){const d=l;l=h,h=d}l>n&&(n=l),h<o&&(o=h)}else if(t<s[2]||t>s[5])return null;return n>o||o<0?null:[n,o]}class Kt{constructor(e,{epsilon:t=1e-6,maxItemsPerNode:r=10}={}){this._aabbs=e;const i=this._aabbs.length/6;this._epsilon=t,this._maxItemsPerNode=r,this._aabbTypeCtor=Float64Array;const a=Uint32Array;this._idArray=new a(i);for(var s=0;s<i;s++)this._idArray[s]=s;this.root=new Ee(0,i,this._aabbTypeCtor),this.computeExtents(this.root),this._nodeSplitPtr=0,me.length=0,me[0]=this.root;let n=0;for(;this._nodeSplitPtr>=0&&n++<1e6;)this.splitNode(me[this._nodeSplitPtr--]);if(n>1e6)throw new Error("Uh-oh, it seems like BVH construction ran into an infinite loop.");me.length=0}computeExtents(e){const t=e.aabb;let r=1/0,i=1/0,a=1/0,s=-1/0,n=-1/0,o=-1/0;for(let m=e.startIndex*6,g=e.endIndex*6;m<g;m+=6)r=Math.min(this._aabbs[m],r),i=Math.min(this._aabbs[m+1],i),a=Math.min(this._aabbs[m+2],a),s=Math.max(this._aabbs[m+3],s),n=Math.max(this._aabbs[m+4],n),o=Math.max(this._aabbs[m+5],o);const l=(s+r)*.5,h=(n+i)*.5,d=(o+a)*.5,_=Math.max((s-r)*.5,this._epsilon)*(1+this._epsilon),f=Math.max((n-i)*.5,this._epsilon)*(1+this._epsilon),p=Math.max((o-a)*.5,this._epsilon)*(1+this._epsilon);t[0]=l-_,t[1]=h-f,t[2]=d-p,t[3]=l+_,t[4]=h+f,t[5]=d+p}splitNode(e){let t,r,i;const a=e.startIndex,s=e.endIndex,n=s-a;if(n<=this._maxItemsPerNode||n===0)return;const o=this._aabbs,l=this._idArray;he[0]=e.aabb[0]+e.aabb[3],he[1]=e.aabb[1]+e.aabb[4],he[2]=e.aabb[2]+e.aabb[5];let h=0,d=0,_=0,f=0,p=0,m=0;for(t=a*6,r=s*6;t<r;t+=6)o[t]+o[t+3]<he[0]?h++:f++,o[t+1]+o[t+4]<he[1]?d++:p++,o[t+2]+o[t+5]<he[2]?_++:m++;if(ce[0]=h===0||f===0,ce[1]=d===0||p===0,ce[2]=_===0||m===0,ce[0]&&ce[1]&&ce[2])return;const g=e.aabb[3]-e.aabb[0],v=e.aabb[4]-e.aabb[1],x=e.aabb[5]-e.aabb[2];let y;if(g>=v&&g>=x?y=0:v>=x?y=1:y=2,ce[y]&&(y===0?y=v>=x?1:2:y===1?y=g>=x?0:2:y=g>=v?0:1,ce[y])){y=3-y-(y===0||y===2?1:0);for(let O=0;O<3;O++)if(!ce[O]){y=O;break}}let T,A,E,b,F=1/0,D=1/0,U=1/0,S=-1/0,w=-1/0,G=-1/0,R=1/0,Y=1/0,V=1/0,j=-1/0,N=-1/0,Z=-1/0;const $=he[y];for(T=a*6,E=(s-1)*6,A=a,b=s-1;T<=E;T+=6,A++)o[T+y]+o[T+y+3]>=$?(i=l[A],l[A]=l[b],l[b]=i,i=o[T],R=Math.min(R,i),o[T]=o[E],o[E]=i,i=o[T+1],Y=Math.min(Y,i),o[T+1]=o[E+1],o[E+1]=i,i=o[T+2],V=Math.min(V,i),o[T+2]=o[E+2],o[E+2]=i,i=o[T+3],j=Math.max(j,i),o[T+3]=o[E+3],o[E+3]=i,i=o[T+4],N=Math.max(N,i),o[T+4]=o[E+4],o[E+4]=i,i=o[T+5],Z=Math.max(Z,i),o[T+5]=o[E+5],o[E+5]=i,A--,b--,T-=6,E-=6):(F=Math.min(F,o[T]),D=Math.min(D,o[T+1]),U=Math.min(U,o[T+2]),S=Math.max(S,o[T+3]),w=Math.max(w,o[T+4]),G=Math.max(G,o[T+5]));e.startIndex=e.endIndex=-1;const M=e.node0=new Ee(a,A,this._aabbTypeCtor),L=e.node1=new Ee(A,s,this._aabbTypeCtor);let u,B,I,C,P,z;const k=this._epsilon;u=(S+F)*.5,B=(w+D)*.5,I=(G+U)*.5,C=Math.max((S-F)*.5,k)*(1+k),P=Math.max((w-D)*.5,k)*(1+k),z=Math.max((G-U)*.5,k)*(1+k),M.aabb[0]=u-C,M.aabb[1]=B-P,M.aabb[2]=I-z,M.aabb[3]=u+C,M.aabb[4]=B+P,M.aabb[5]=I+z,u=(j+R)*.5,B=(N+Y)*.5,I=(Z+V)*.5,C=Math.max((j-R)*.5,k)*(1+k),P=Math.max((N-Y)*.5,k)*(1+k),z=Math.max((Z-V)*.5,k)*(1+k),L.aabb[0]=u-C,L.aabb[1]=B-P,L.aabb[2]=I-z,L.aabb[3]=u+C,L.aabb[4]=B+P,L.aabb[5]=I+z,A-a>this._maxItemsPerNode&&(me[++this._nodeSplitPtr]=e.node0),s-A>this._maxItemsPerNode&&(me[++this._nodeSplitPtr]=e.node1)}test(e,t){ge.length=0;var r=0;for(ge[0]=this.root;r>=0;){var i=ge[r--];if(e(i.aabb)){i.node0&&(ge[++r]=i.node0),i.node1&&(ge[++r]=i.node1);for(var a=i.startIndex;a<i.endIndex;a++)t(this._idArray[a])}}ge.length=0}rayIntersect(e,t,r,i,a,s){const n=[],o=[];let l=0;for(o[l++]=this.root;l>0;){const h=o[--l];if(Ke(e,t,r,i,a,s,h.aabb)){h.node0&&(o[l++]=h.node0),h.node1&&(o[l++]=h.node1);for(let _=h.startIndex;_<h.endIndex;_++){const f=this._idArray[_],p=_*6,m=[this._aabbs[p],this._aabbs[p+1],this._aabbs[p+2],this._aabbs[p+3],this._aabbs[p+4],this._aabbs[p+5]],g=Ke(e,t,r,i,a,s,m);g&&n.push({index:f,tNear:Math.max(g[0],0)})}}}return n.sort((h,d)=>h.tNear-d.tNear),n}traversePreorder(e){const t=[];let r=this.root;for(;t.length||r;){for(;r;){const i=e(r)!==!1;i&&r.node1&&t.push(r.node1),r=i&&r.node0}t.length&&(r=t.pop())}}traverseInorder(e){const t=[];let r=this.root;for(;r||t.length;){for(;r;)t.push(r),r=r.node0;r=t[t.length-1],t.pop(),e(r),r=r.node1}}traversePostorder(e){const t=[this.root];let r=null;for(;t.length;){const i=t[t.length-1];!r||r.node0===i||r.node1===i?i.node0?t.push(i.node0):i.node1?t.push(i.node1):(t.pop(),e(i)):i.node0===r?i.node0?t.push(i.node1):(t.pop(),e(i)):i.node1===r&&(t.pop(),e(i)),r=i}}}function Re(c,e,t){const r=t;function i(f,p,m){const g=r[0]*f+r[4]*p+r[8]*m+r[12],v=r[1]*f+r[5]*p+r[9]*m+r[13],x=r[2]*f+r[6]*p+r[10]*m+r[14],y=r[3]*f+r[7]*p+r[11]*m+r[15];return[g/y,v/y,x/y]}const a=i(c,e,0),s=i(c,e,1),n=new Float64Array(a),o=s[0]-a[0],l=s[1]-a[1],h=s[2]-a[2],d=Math.sqrt(o*o+l*l+h*h),_=new Float64Array([o/d,l/d,h/d]);return{origin:n,direction:_}}function it({origin:c,direction:e,bvh:t,tileCache:r,tileList:i,verticalExaggeration:a}){const s=c[0],n=c[1],o=c[2],l=e[0],h=e[1],d=e[2],_=t.rayIntersect(s,n,o,l,h,d);if(_.length===0)return null;let f=1/0,p=null,m=null;for(let g=0;g<_.length;g++){const{index:v,tNear:x}=_[g];if(x>=f)break;const y=i[v];if(!y)continue;const T=r.ensureQuadtree(y.z,y.x,y.y);if(!T)continue;const{quadtree:A,elevations:E}=T,D=ue(y.z,y.y)*a,U=512*(1<<y.z),S=y.x/(1<<y.z),w=y.y/(1<<y.z),G=(s-S)*U,R=n/D,Y=(o-w)*U,V=l*U,j=h/D,N=d*U,Z=Mt(A.minElev,A.maxElev,E,G,R,Y,V,j,N);if(!Z)continue;const $=G+V*Z.t,M=R+j*Z.t,L=Y+N*Z.t,u=$/U+S,B=M*D,I=L/U+w;let C;const P=Math.abs(l),z=Math.abs(h),k=Math.abs(d);P>=z&&P>=k?C=(u-s)/l:z>=k?C=(B-n)/h:C=(I-o)/d,C>0&&C<f&&(f=C,p=[u,B,I],m=y)}return p?{worldPos:p,t:f,tile:m}:null}function jt(c={}){return new Proxy({verticalExaggeration:1,densityThreshold:4,showTileBorders:!1,freezeCoverage:!1,featureDepthTest:!1,enableCollision:!0,showCollisionBoxes:!1,showImagery:!0,showFeatures:!0,showRoute:!0,collisionBuffer:4,occlusionBias:.03,atmosphereDensity:.5,hillshadeOpacity:.95,sunDirection:[.5,.7,.5],dirty:!0,...c},{set(e,t,r){return t!=="dirty"&&e[t]!==r&&(e.dirty=!0),e[t]=r,!0}})}function Jt(c){const e=document.createElement("div");return e.className="terrain-attribution",e.innerHTML=c.filter(t=>t.attribution).map(t=>t.attribution).join(" | "),e}class ei{constructor(e,t,r,i){this._device=e,this._pixelRatio=r;const a=`
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
}`;this._gpuLines=i(e,{colorTargets:{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"bevel",cap:"round",depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"less"},vertexShaderBody:a,fragmentShaderBody:s}),this._uniformBuffer=e.createBuffer({size:112,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._sharedBindGroup=e.createBindGroup({layout:this._gpuLines.getBindGroupLayout(2),entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._positionBuffer=null,this._dataBindGroup=null,this._vertexCount=0,this._frozen=!1,this._coverageProjView=null}get isFrozen(){return this._frozen}get coverageProjView(){return this._coverageProjView}freeze(e){this._frozen=!0,this._coverageProjView=new Float32Array(e);const t=new Float32Array(16);ve(t,this._coverageProjView);const r=st(t),i=20,a=[],s=d=>[r[d*3],r[d*3+1],r[d*3+2],1],n=()=>a.push([0,0,0,0]),o=d=>a.push(s(d)),l=(d,_)=>{n();const f=s(d),p=s(_);for(let m=0;m<=i;m++){const g=m/i;a.push([f[0]+(p[0]-f[0])*g,f[1]+(p[1]-f[1])*g,f[2]+(p[2]-f[2])*g,1])}};n(),o(0),o(1),o(2),o(3),o(0),n(),o(4),o(5),o(6),o(7),o(4),l(0,4),l(1,5),l(2,6),l(3,7),n();const h=new Float32Array(a.length*4);for(let d=0;d<a.length;d++)h[d*4]=a[d][0],h[d*4+1]=a[d][1],h[d*4+2]=a[d][2],h[d*4+3]=a[d][3];this._vertexCount=a.length,this._positionBuffer=this._device.createBuffer({size:h.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._positionBuffer,0,h),this._dataBindGroup=this._device.createBindGroup({layout:this._gpuLines.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._positionBuffer}}]})}unfreeze(){this._frozen=!1,this._coverageProjView=null,this._positionBuffer&&(this._positionBuffer.destroy(),this._positionBuffer=null),this._dataBindGroup=null}draw(e,t,r,i){if(!this._frozen||!this._positionBuffer)return;const a=new Float32Array(112/4);a.set(t,0),a[16]=0,a[17]=.5,a[18]=.15,a[19]=1,a[20]=1,a[21]=1,a[22]=1,a[23]=1,a[24]=4,a[25]=1.5,a[26]=this._pixelRatio,this._device.queue.writeBuffer(this._uniformBuffer,0,a),this._gpuLines.draw(e,{vertexCount:this._vertexCount,resolution:[r,i]},[this._dataBindGroup,this._sharedBindGroup])}destroy(){this._positionBuffer&&this._positionBuffer.destroy(),this._gpuLines.destroy(),this._uniformBuffer.destroy()}}function ti(c,e=0,t=1/0,r=1/0){c.sort((s,n)=>s.depth-n.depth);const i=[],a=new Map;for(const s of c){const n=s.screenX-s.halfW-e,o=s.screenX+s.halfW+e,l=s.screenY-s.halfH-e,h=s.screenY+s.halfH+e;let d=n<0||o>t||l<0||h>r;if(!d)for(let _=0;_<i.length;_++){const f=i[_];if(n<f.maxX&&o>f.minX&&l<f.maxY&&h>f.minY){d=!0;break}}if(d){s.visible=!1;let _=a.get(s.layerIndex);_||(_=new Set,a.set(s.layerIndex,_)),_.add(s.featureIndex)}else s.visible=!0,i.push({minX:s.screenX-s.halfW,maxX:s.screenX+s.halfW,minY:s.screenY-s.halfH,maxY:s.screenY+s.halfH})}return{items:c,hiddenByLayer:a}}const ii=`
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
`,je=1e4,ri=8,Je=6,et=1e3;class si{constructor(e,t){this._device=e,this._lastCollisionTime=0,this._collisionStale=!1,this._collisionScheduled=!1,this._collisionTimer=null,this._debugItems=null;const r=e.createShaderModule({code:ii}),i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this._uniformBuffer=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=e.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this._uniformBuffer}}]}),this._vertexBuffer=e.createBuffer({size:je*ri*Je*4,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this._linePipeline=e.createRenderPipeline({layout:e.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:r,entryPoint:"vs_colored_line",buffers:[{arrayStride:Je*4,attributes:[{format:"float32x2",offset:0,shaderLocation:0},{format:"float32x4",offset:8,shaderLocation:1}]}]},fragment:{module:r,entryPoint:"fs_colored_line",targets:[{format:t,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"line-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._invProjView=new Float32Array(16)}markStale(){this._debugItems||(this._collisionStale=!0)}update({enabled:e,layers:t,projectionView:r,canvasW:i,canvasH:a,pixelRatio:s,exaggeration:n,collisionBuffer:o,occlusionBias:l,bvh:h,tileManager:d,bvhTileList:_}){const f=performance.now();if(!e){if(this._debugItems){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:m}of t)m.setVisibleFeatures(null)}return!1}const p=f-this._lastCollisionTime;return p>=et||this._collisionStale?(this._doCollision(t,r,i,a,s,n,o,l,h,d,_),this._lastCollisionTime=f,this._collisionStale=!1,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null),!0):(this._collisionScheduled||(this._collisionScheduled=!0,this._collisionTimer=setTimeout(()=>{this._collisionScheduled=!1,this._collisionTimer=null,this._wakeCallback?.()},et-p)),!1)}set onWake(e){this._wakeCallback=e}_doCollision(e,t,r,i,a,s,n,o,l,h,d){const _=[];let f=0;for(const{layer:y,collision:T,sourceId:A}of e){if(T){const E=y.getCollisionItems(t,r,i,a,s);for(const b of E)b.layerIndex=f,b.sourceId=A;_.push(...E)}f++}const p=r/a,m=i/a;if(l&&_.length>0){ve(this._invProjView,t);const y=t;for(const T of _){const A=T.screenX/p*2-1,E=1-T.screenY/m*2,b=Re(A,E,this._invProjView),F=it({origin:b.origin,direction:b.direction,bvh:l,tileCache:h,tileList:d,verticalExaggeration:s});if(F){const[D,U,S]=F.worldPos;y[3]*D+y[7]*U+y[11]*S+y[15]<T.clipW*(1-o)&&(T.occluded=!0)}}}const g=[];for(const y of _)y.occluded||g.push(y);ti(g,n,p,m);const v=new Map;for(const y of _)if(y.occluded||!y.visible){let T=v.get(y.sourceId);T||(T=new Set,v.set(y.sourceId,T)),T.add(y.sourceFeatureIndex)}const x=new Map;for(const y of _){const T=v.get(y.sourceId);if(T&&T.has(y.sourceFeatureIndex))y.occluded||(y.visible=!1);else{let A=x.get(y.layerIndex);A||(A=new Set,x.set(y.layerIndex,A)),A.add(y.featureIndex)}}this._debugItems=_,f=0;for(const{layer:y,collision:T}of e)y.setVisibleFeatures(T?x.get(f)||new Set:null),f++}drawDebug(e,t,r,i,a){if(!this._debugItems||this._debugItems.length===0)return;const s=this._debugItems,n=Math.min(s.length,je),o=new Float32Array(n*8*6),l=a;for(let f=0;f<n;f++){const p=s[f],m=p.screenX-p.halfW-l,g=p.screenX+p.halfW+l,v=p.screenY-p.halfH-l,x=p.screenY+p.halfH+l,y=p.occluded?.2:p.visible?0:1,T=p.occluded?.4:p.visible?1:0,A=p.occluded?1:0,E=.8,b=f*8*6;o[b]=m,o[b+1]=v,o[b+2]=y,o[b+3]=T,o[b+4]=A,o[b+5]=E,o[b+6]=g,o[b+7]=v,o[b+8]=y,o[b+9]=T,o[b+10]=A,o[b+11]=E,o[b+12]=g,o[b+13]=v,o[b+14]=y,o[b+15]=T,o[b+16]=A,o[b+17]=E,o[b+18]=g,o[b+19]=x,o[b+20]=y,o[b+21]=T,o[b+22]=A,o[b+23]=E,o[b+24]=g,o[b+25]=x,o[b+26]=y,o[b+27]=T,o[b+28]=A,o[b+29]=E,o[b+30]=m,o[b+31]=x,o[b+32]=y,o[b+33]=T,o[b+34]=A,o[b+35]=E,o[b+36]=m,o[b+37]=x,o[b+38]=y,o[b+39]=T,o[b+40]=A,o[b+41]=E,o[b+42]=m,o[b+43]=v,o[b+44]=y,o[b+45]=T,o[b+46]=A,o[b+47]=E}const h=t/i,d=r/i,_=new Float32Array([h,d,0,0]);this._device.queue.writeBuffer(this._uniformBuffer,0,_),this._device.queue.writeBuffer(this._vertexBuffer,0,o.buffer,0,n*8*6*4),e.setPipeline(this._linePipeline),e.setBindGroup(0,this._uniformBindGroup),e.setVertexBuffer(0,this._vertexBuffer),e.draw(n*8)}clear(e){this._debugItems=null,this._collisionScheduled&&(clearTimeout(this._collisionTimer),this._collisionScheduled=!1,this._collisionTimer=null);for(const{layer:t}of e)t.setVisibleFeatures(null)}destroy(){this._collisionTimer&&clearTimeout(this._collisionTimer),this._uniformBuffer.destroy(),this._vertexBuffer.destroy()}}class rt{static async create(e,t={}){const r=new rt;return await r._init(e,t),r}async _init(e,t){const{sources:r={},base:i=[],features:a=[],camera:s={},settings:n,createGPULines:o}=t;let l=null;const h={},d={},_=[];for(const[S,w]of Object.entries(r))if(_.push(w),w.type==="terrain"){if(l)throw new Error("Only one terrain source is allowed");l=w}else w.type==="raster"?h[S]=w:w.type==="geojson"&&(d[S]=w);if(!l)throw new Error("A terrain source is required");this._pixelRatio=t.pixelRatio||(typeof devicePixelRatio<"u"?devicePixelRatio:1),this._baseLayerConfigs=i,this._featureLayerConfigs=a,this._geojsonSources=d,this._rasterSources=h,this.canvas=e,this._terrainBounds=Pe(l);const[f,p,m,g]=l.bounds;this._location=t.location||{lat:(p+g)/2,lon:(f+m)/2},this.attribution=Jt(_.filter(S=>S.attribution)),this.settings=jt(n);const v=await navigator.gpu.requestAdapter();this._device=await v.requestDevice(),this._format=navigator.gpu.getPreferredCanvasFormat(),this._gpuCtx=e.getContext("webgpu"),this._gpuCtx.configure({device:this._device,format:this._format,alphaMode:"opaque"}),this.camera=ot(e,{center:[.0804792012701582,.0002040588543435183,.27264551318459634],distance:.0008177139017526437,phi:2.1624270549994598,theta:.16047571910010502,fov:Math.PI/4,near:1e-5,far:.5,rotateSpeed:.005,zoomSpeed:8e-4,panSpeed:1,...s});const x=this._device,y=this._format;this._mesh=nt(x),this._imagerySampler=x.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});const T=x.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0}}]}),A=x.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),E=x.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),b=x.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this._globalUniformBuffer=x.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._globalUniformBindGroup=x.createBindGroup({layout:E,entries:[{binding:0,resource:{buffer:this._globalUniformBuffer}}]}),this._fallbackImageryTexture=x.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),x.queue.writeTexture({texture:this._fallbackImageryTexture},new Uint8Array([0,0,0,255]),{bytesPerRow:4},[1,1]),this._fallbackImageryBindGroup=x.createBindGroup({layout:b,entries:[{binding:0,resource:this._fallbackImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._whiteImageryTexture=x.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),x.queue.writeTexture({texture:this._whiteImageryTexture},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1]),this._whiteImageryBindGroup=x.createBindGroup({layout:b,entries:[{binding:0,resource:this._whiteImageryTexture.createView()},{binding:1,resource:this._imagerySampler}]}),this._pipeline=x.createRenderPipeline({layout:x.createPipelineLayout({bindGroupLayouts:[T,A,E,b]}),vertex:{module:x.createShaderModule({code:at}),entryPoint:"vs_main",buffers:[{arrayStride:4,attributes:[{format:"uint16x2",offset:0,shaderLocation:0}]}]},fragment:{module:x.createShaderModule({code:lt}),entryPoint:"fs_main",targets:[{format:y}]},primitive:{topology:"triangle-list",cullMode:"back",frontFace:"ccw"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}}),this._skyPipeline=x.createRenderPipeline({layout:x.createPipelineLayout({bindGroupLayouts:[E]}),vertex:{module:x.createShaderModule({code:ct}),entryPoint:"vs_sky",buffers:[]},fragment:{module:x.createShaderModule({code:ft}),entryPoint:"fs_sky",targets:[{format:y}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!1,depthCompare:"always"}}),this._frustumOverlay=new ei(x,y,this._pixelRatio,o),this._collisionManager=new si(x,y),this._collisionManager.onWake=()=>{this._renderDirty=!0},this._UNIFORM_STRIDE=256,this._MAX_TILES_PER_FRAME=256,this._uniformBuffer=x.createBuffer({size:this._UNIFORM_STRIDE*this._MAX_TILES_PER_FRAME,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._uniformBindGroup=x.createBindGroup({layout:T,entries:[{binding:0,resource:{buffer:this._uniformBuffer,size:160}}]}),this._tileManager=new Ut(x,{tileUrl:ze(l.tiles)}),this._tileManager.setBindGroupLayout(A),this._tileManager.setBounds(this._terrainBounds),this._imageryDeltaZoom=1;const F=[];for(const S of i){const w=h[S.source];if(!w)throw new Error(`Base layer "${S.id}" references unknown source "${S.source}"`);const G=Pe(w),R=new It({tileUrl:ze(w.tiles)});R.setBounds(G),F.push({imageryManager:R,blend:S.blend||"source-over",opacity:S.opacity!=null?S.opacity:1,maxzoom:w.maxzoom})}this._maxImageryZoom=F.length>0?Math.max(...F.map(S=>S.maxzoom)):0,this._compositor=new zt(x,F,b,this._imagerySampler),this._coverageDirty=!0,this._renderDirty=!0,this._cachedRenderList=[],this._tileManager.onTileResolved=()=>{this._coverageDirty=!0,this._renderDirty=!0,this._collisionManager.markStale();for(const S of this._lineLayers)S.invalidateElevations()},this._compositor.onUpdate=()=>{this._coverageDirty=!0,this._renderDirty=!0},this._depthTexture=null,this._MAX_ELEV_Y=.001,this._mvpFloat32=new Float32Array(16),this._modelFloat32=new Float32Array(16),this._uniformData=new Float32Array(40),this._globalUniformData=new Float32Array(24),this._currentExaggeration=this.settings.verticalExaggeration,this._currentDensityThreshold=this.settings.densityThreshold,this._currentFreezeCoverage=!1,this._bvh=null,this._bvhTileList=[],this._lastProjView=new Float64Array(16),this._invProjView=new Float64Array(16),this.camera.rotateStartCallback=(S,w)=>this._hitTest(S,w),this._needsCanvasResize=!0,this._resizeObserver=new ResizeObserver(()=>{this._needsCanvasResize=!0,this._renderDirty=!0,this._coverageDirty=!0,this.camera.taint()}),this._resizeObserver.observe(e),this._circleLayers=[],this._textLayers=[],this._lineLayers=[];const D=[],U={};for(const S of a){const w=d[S.source];if(!w)throw new Error(`Feature layer "${S.id}" references unknown source "${S.source}"`);if(!U[S.source]){const R=new Ft;U[S.source]=R,D.push(R.load(w.data,{...w,simplifyFn:t.simplifyFn}))}const G=S.collision!==!1;if(S.type==="circle"){const R=new Dt(S,U[S.source],(Y,V)=>this.queryElevationMercator(Y,V));R.init(x,E,y),R._collision=G,R._sourceId=S.source,this._circleLayers.push(R)}else if(S.type==="text"){const R=new Vt(S,U[S.source],(Y,V)=>this.queryElevationMercator(Y,V));R._collision=G,R._sourceId=S.source,this._textLayers.push({layer:R,config:S})}else if(S.type==="line"){const R=new Qt(S,U[S.source],(Y,V)=>this.queryElevationMercator(Y,V));R.init(x,y,this._globalUniformBuffer,this.camera.state.near,this.camera.state.far,o),this._lineLayers.push(R)}}if(await Promise.all(D),t.font&&this._textLayers.length>0){const S=await Nt(x,{atlasUrl:t.font.atlas,metadataUrl:t.font.metadata});for(const{layer:w}of this._textLayers)w.init(x,S,y,"depth24plus",this._globalUniformBuffer)}this._running=!0,this._boundFrame=this._frame.bind(this),requestAnimationFrame(this._boundFrame)}_hitTest(e,t){const r=this.raycast(e,t);if(r)return r.worldPos;const i=this.canvas.getBoundingClientRect(),a=(e-i.left)/i.width*2-1,s=1-(t-i.top)/i.height*2;ve(this._invProjView,this._lastProjView);const{origin:n,direction:o}=Re(a,s,this._invProjView);if(Math.abs(o[1])>1e-10){const l=-n[1]/o[1];if(l>0)return[n[0]+l*o[0],0,n[2]+l*o[2]]}return null}_ensureDepthTexture(e,t){this._depthTexture&&this._depthTexture.width===e&&this._depthTexture.height===t||(this._depthTexture&&this._depthTexture.destroy(),this._depthTexture=this._device.createTexture({size:[e,t],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}))}_buildCollisionLayers(){const e=[];for(const t of this._circleLayers)e.push({layer:t,collision:t._collision,sourceId:t._sourceId});for(const{layer:t}of this._textLayers)e.push({layer:t,collision:t._collision,sourceId:t._sourceId});return e}paint(){const{canvas:e,camera:t,settings:r}=this,i=e.width/e.height;if(i===0||!isFinite(i))return;const{view:a,projection:s,projectionView:n}=t.update(i),o=this._device;let l=0;const h=[];for(const M of this._cachedRenderList){if(l>=this._MAX_TILES_PER_FRAME)break;const L=this._tileManager.getTile(M.z,M.x,M.y);if(!L)continue;const u=ue(M.z,M.y),B=ut(M.z,M.y),I=We(M.z,this._imageryDeltaZoom,this._maxImageryZoom);this._compositor.ensureImagery(M.z,M.x,M.y,I);const C=this._compositor.hasImagery(M.z,M.x,M.y);ht(this._mvpFloat32,a,s,M.z,M.x,M.y,u,this._currentExaggeration),dt(this._modelFloat32,M.z,M.x,M.y,u,this._currentExaggeration);const P=this._uniformData;P.set(this._mvpFloat32,0),P.set(this._modelFloat32,16),P[32]=u,P[33]=B,P[34]=this._currentExaggeration,P[35]=1/514,P[36]=r.showTileBorders?1:0,P[37]=r.showImagery?C?1:0:1,P[38]=r.hillshadeOpacity;let z;r.showImagery?C?z=this._compositor.getBindGroup(M.z,M.x,M.y):z=this._fallbackImageryBindGroup:z=this._whiteImageryBindGroup,o.queue.writeBuffer(this._uniformBuffer,l*this._UNIFORM_STRIDE,P.buffer,P.byteOffset,160),h.push({offset:l*this._UNIFORM_STRIDE,bindGroup:L.bindGroup,imageryBindGroup:z}),l++}const{phi:d,theta:_,distance:f,center:p}=t.state,m=p[0]+f*Math.cos(_)*Math.cos(d),g=p[1]+f*Math.sin(_),v=p[2]+f*Math.cos(_)*Math.sin(d),x=10,y=Math.floor(p[2]*(1<<x)),T=ue(x,y),A=1/T,E=g/T,b=r.sunDirection,F=b[0],D=b[1],U=b[2],S=r.atmosphereDensity,w=this._globalUniformData;w[0]=m,w[1]=g,w[2]=v,w[3]=E,w[4]=F,w[5]=D,w[6]=U,w[7]=A,w[8]=52e-7*S,w[9]=121e-7*S,w[10]=296e-7*S,w[11]=8e3,w[12]=2e-5*S,w[13]=3e3,w[14]=.76,w[15]=20;const G=t.state.fov,R=Math.sin(d),Y=-Math.cos(d),V=-Math.sin(_)*Math.cos(d),j=Math.cos(_),N=-Math.sin(_)*Math.sin(d);w[16]=R,w[17]=0,w[18]=Y,w[19]=i,w[20]=V,w[21]=j,w[22]=N,w[23]=Math.tan(G/2),o.queue.writeBuffer(this._globalUniformBuffer,0,w.buffer,w.byteOffset,96),this._ensureDepthTexture(e.width,e.height);const Z=o.createCommandEncoder(),$=Z.beginRenderPass({colorAttachments:[{view:this._gpuCtx.getCurrentTexture().createView(),clearValue:{r:.53,g:.66,b:.82,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this._depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});$.setPipeline(this._skyPipeline),$.setBindGroup(0,this._globalUniformBindGroup),$.draw(3),$.setPipeline(this._pipeline),$.setVertexBuffer(0,this._mesh.vertexBuffer),$.setIndexBuffer(this._mesh.indexBuffer,"uint32"),$.setBindGroup(2,this._globalUniformBindGroup);for(const M of h)$.setBindGroup(0,this._uniformBindGroup,[M.offset]),$.setBindGroup(1,M.bindGroup),$.setBindGroup(3,M.imageryBindGroup),$.drawIndexed(this._mesh.indexCount);if(this._frustumOverlay.draw($,n,e.width,e.height),r.showRoute)for(const M of this._lineLayers)M.draw($);if(r.showFeatures){for(const M of this._circleLayers)M.draw($,this._globalUniformBindGroup,r.featureDepthTest);for(const{layer:M}of this._textLayers)M.draw($)}r.showCollisionBoxes&&this._collisionManager.drawDebug($,e.width,e.height,this._pixelRatio,r.collisionBuffer),$.end(),o.queue.submit([Z.finish()])}_frame(){if(!this._running)return;requestAnimationFrame(this._boundFrame);const{canvas:e,camera:t,settings:r}=this;if(this._currentExaggeration!==r.verticalExaggeration&&(this._currentExaggeration=r.verticalExaggeration,t.taint()),this._currentDensityThreshold!==r.densityThreshold&&(this._currentDensityThreshold=r.densityThreshold,this._coverageDirty=!0),r.freezeCoverage!==this._currentFreezeCoverage&&(this._currentFreezeCoverage=r.freezeCoverage,this._currentFreezeCoverage?(this._savedFar=t.state.far,t.state.far=t.state.far*4):(this._frustumOverlay.unfreeze(),t.state.far=this._savedFar,this._coverageDirty=!0),t.taint(),this._renderDirty=!0),r.dirty&&(this._renderDirty=!0,r.dirty=!1),!this._coverageDirty&&!this._renderDirty&&!t.dirty)return;if(this._needsCanvasResize){const d=this._pixelRatio,_=Math.floor(e.clientWidth*d),f=Math.floor(e.clientHeight*d);(e.width!==_||e.height!==f)&&(e.width=_,e.height=f),this._needsCanvasResize=!1}const i=e.width/e.height,{view:a,projection:s,projectionView:n,dirty:o}=t.update(i);this._lastProjView.set(n),this._currentFreezeCoverage&&!this._frustumOverlay.isFrozen&&this._frustumOverlay.freeze(n);const l=this._frustumOverlay.coverageProjView||n;if(o&&(this._coverageDirty=!0,this._renderDirty=!0),this._coverageDirty){const d=this._MAX_ELEV_Y*this._currentExaggeration;this._tileManager.beginFrame(),this._cachedRenderList=wt(l,e.width,e.height,d,this._currentExaggeration,r.densityThreshold,this._terrainBounds,this._tileManager,(f,p,m)=>{if(!this._tileManager.hasTile(f,p,m))return!0;const g=We(f,this._imageryDeltaZoom,this._maxImageryZoom);return this._compositor.ensureImagery(f,p,m,g),this._compositor.hasImagery(f,p,m)});const _=l;this._cachedRenderList.sort((f,p)=>{const m=_[3]*((f.x+.5)/(1<<f.z))+_[11]*((f.y+.5)/(1<<f.z))+_[15],g=_[3]*((p.x+.5)/(1<<p.z))+_[11]*((p.y+.5)/(1<<p.z))+_[15];return m-g}),this._tileManager.cancelStale(),this._tileManager.evict(),this._tileManager.stripQuadtrees(),this._compositor.gc(this._tileManager.wantedKeys),this._rebuildBVH(),this._coverageDirty=!1,this._renderDirty=!0}if(!this._renderDirty)return;this._renderDirty=!1;const h=this._buildCollisionLayers();if(this._collisionManager.update({enabled:r.enableCollision,layers:h,projectionView:n,canvasW:e.width,canvasH:e.height,pixelRatio:this._pixelRatio,exaggeration:this._currentExaggeration,collisionBuffer:r.collisionBuffer,occlusionBias:r.occlusionBias,bvh:this._bvh,tileManager:this._tileManager,bvhTileList:this._bvhTileList})&&(this._renderDirty=!0),r.showFeatures){for(const d of this._circleLayers)d.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration);for(const{layer:d}of this._textLayers)d.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration)}if(r.showRoute)for(const d of this._lineLayers)d.prepare(n,e.width,e.height,this._pixelRatio,this._currentExaggeration);this.paint()}_rebuildBVH(){const e=this._cachedRenderList;if(e.length===0){this._bvh=null,this._bvhTileList=[];return}const t=new Float64Array(e.length*6),r=new Array(e.length);for(let i=0;i<e.length;i++){const{z:a,x:s,y:n}=e[i];r[i]=e[i];const o=1/(1<<a),l=ue(a,n),h=this._tileManager.getElevationBounds(a,s,n),d=i*6;t[d]=s*o,t[d+1]=h?h.minElevation*l*this._currentExaggeration:0,t[d+2]=n*o,t[d+3]=(s+1)*o,t[d+4]=h?h.maxElevation*l*this._currentExaggeration:this._MAX_ELEV_Y*this._currentExaggeration,t[d+5]=(n+1)*o}this._bvh=new Kt(t,{maxItemsPerNode:4}),this._bvhTileList=r}raycast(e,t){if(!this._bvh)return null;const r=this.canvas.getBoundingClientRect(),i=(e-r.left)/r.width*2-1,a=1-(t-r.top)/r.height*2;ve(this._invProjView,this._lastProjView);const{origin:s,direction:n}=Re(i,a,this._invProjView);return it({origin:s,direction:n,bvh:this._bvh,tileCache:this._tileManager,tileList:this._bvhTileList,verticalExaggeration:this._currentExaggeration})}queryElevation(e,t){const r=xe(e),i=be(t);return this.queryElevationMercator(r,i)}queryElevationMercator(e,t){let r=null,i=-1;for(const F of this._cachedRenderList){const D=1/(1<<F.z);e>=F.x*D&&e<(F.x+1)*D&&t>=F.y*D&&t<(F.y+1)*D&&F.z>i&&(r=F,i=F.z)}if(!r)return null;const a=this._tileManager.getTile(r.z,r.x,r.y);if(!a||!a.elevations)return null;const s=1/(1<<r.z),n=(e-r.x*s)/s,o=(t-r.y*s)/s,l=n*512+1,h=o*512+1,d=Math.floor(l),_=Math.floor(h),f=l-d,p=h-_,m=514,g=Math.min(d,513),v=Math.min(d+1,513),x=Math.min(_,513),y=Math.min(_+1,513),T=a.elevations[x*m+g],A=a.elevations[x*m+v],E=a.elevations[y*m+g],b=a.elevations[y*m+v];return T*(1-f)*(1-p)+A*f*(1-p)+E*(1-f)*p+b*f*p}destroy(){this._running=!1,this._collisionManager.destroy(),this._frustumOverlay.destroy(),this._resizeObserver.disconnect(),this.camera.destroy(),this._depthTexture&&this._depthTexture.destroy(),this._mesh.vertexBuffer.destroy(),this._mesh.indexBuffer.destroy(),this._uniformBuffer.destroy(),this._globalUniformBuffer.destroy(),this._fallbackImageryTexture.destroy(),this._whiteImageryTexture.destroy();for(const e of this._lineLayers)e.destroy();this._device.destroy()}}export{rt as TerrainMap};
