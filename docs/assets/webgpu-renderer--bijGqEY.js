import{createGPULines as we}from"https://cdn.jsdelivr.net/npm/webgpu-instanced-lines/+esm";import Ue from"https://cdn.jsdelivr.net/npm/earcut/+esm";const Q=1.324717957244746,Se=1/Q,Ge=1/(Q*Q);function Oe(e,s){return e[0]=(.5+Se*s)%1,e[1]=(.5+Ge*s)%1,e}const Ve=5e3,le=40,ce=`
const pi: f32 = 3.14159265359;

fn computeVelocity(xy: vec2f, panelCount: u32) -> vec2f {
  var vInduced = vec2f(0.0);
  var prev = uniforms.panelData[0];
  var rPrev = xy - prev.xy;

  for (var i = 1u; i <= panelCount; i++) {
    let next = uniforms.panelData[i];
    let rNext = xy - next.xy;
    let t = normalize(next.xy - prev.xy);
    let n = vec2f(-t.y, t.x);
    let bij = atan2(rPrev.x * rNext.y - rNext.x * rPrev.y, dot(rPrev, rNext));
    let lograt = 0.5 * log(dot(rNext, rNext) / dot(rPrev, rPrev));
    let source = next.z;
    let gamma = next.w;
    vInduced += source * (-lograt * t + bij * n);
    vInduced += gamma * (bij * t + lograt * n);
    prev = next;
    rPrev = rNext;
  }

  return uniforms.vInf + (0.5 / pi) * vInduced;
}

fn computePressureCoeff(v: vec2f) -> f32 {
  let vInfMag2 = dot(uniforms.vInf, uniforms.vInf);
  return 1.0 - dot(v, v) / vInfMag2;
}
`,Ce=`
fn linearstep(edge0: f32, edge1: f32, x: f32) -> f32 {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn contrastFunction(x: f32, power: f32) -> f32 {
  let x2 = 2.0 * x - 1.0;
  return 0.5 + 0.5 * pow(abs(x2), power) * sign(x2);
}

const octaveDivisions: f32 = 2.0;
const octaves: i32 = 8;
const fOctaves: f32 = 8.0;

fn shadedContours(f: f32, minSpacing: f32, antialiasWidth: f32, rampPower: f32, contourWidth: f32) -> vec2f {
  let screenSpaceGrad = length(vec2f(dpdx(f), dpdy(f))) / abs(f);
  let localOctave = log2(screenSpaceGrad * minSpacing) / log2(octaveDivisions);
  let contourSpacing = pow(octaveDivisions, ceil(localOctave));
  var plotVar = log2(abs(f)) / contourSpacing;
  var widthScale = contourSpacing / screenSpaceGrad;
  var contourSum: f32 = 0.0;
  var grid: f32 = 0.0;

  for (var i = 0; i < octaves; i++) {
    let t = f32(i + 1) - fract(localOctave);
    let weight = smoothstep(0.0, 1.0, t) * smoothstep(fOctaves, fOctaves - 1.0, t);
    let y = fract(plotVar);
    contourSum += weight * min(contrastFunction(y, rampPower), (1.0 - y) * 0.5 * widthScale / antialiasWidth);
    grid += weight * linearstep(
      contourWidth + antialiasWidth,
      contourWidth - antialiasWidth,
      (0.5 - abs(fract(plotVar) - 0.5)) * widthScale
    );
    widthScale *= octaveDivisions;
    plotVar /= octaveDivisions;
  }
  grid /= fOctaves;
  contourSum /= fOctaves;
  return vec2f(contourSum, grid);
}
`,de=`
fn sampleColorscale(t: f32) -> vec3f {
  let idx = clamp(t, 0.0, 1.0) * 255.0;
  let i0 = u32(floor(idx));
  let i1 = min(i0 + 1u, 255u);
  let frac = fract(idx);
  let c0 = uniforms.colorscale[i0];
  let c1 = uniforms.colorscale[i1];
  return mix(c0.rgb, c1.rgb, frac);
}
`;function Ie(e){return`
struct Uniforms {
  viewInverse: mat4x4f,
  vInf: vec2f,
  contourOpacity: f32,
  shadingOpacity: f32,
  panelCount: u32,
  _pad0: u32,
  _pad1: u32,
  _pad2: u32,
  panelData: array<vec4f, ${e+1}>,
  colorscale: array<vec4f, 256>,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) xy: vec2f,
};

@vertex
fn vertex(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  let x = f32((vertexIndex << 1u) & 2u) * 2.0 - 1.0;
  let y = f32(vertexIndex & 2u) * 2.0 - 1.0;

  var output: VertexOutput;
  let dataCoord = uniforms.viewInverse * vec4f(x, y, 0.0, 1.0);
  output.xy = dataCoord.xy;
  output.position = vec4f(x, y, 0.0, 1.0);
  return output;
}

${ce}
${Ce}
${de}

@fragment
fn fragment(@location(0) xy: vec2f) -> @location(0) vec4f {
  let v = computeVelocity(xy, uniforms.panelCount);
  let cp = computePressureCoeff(v);

  // Map pressure coefficient to colorscale
  let colorT = exp((cp - 1.0) * 0.7);
  var color = sampleColorscale(colorT);

  // Apply contour shading
  if (uniforms.shadingOpacity > 1e-4 || uniforms.contourOpacity > 1e-4) {
    let contours = shadedContours(1.0 - cp, 8.0, 1.0, 3.0, 1.0);
    color *= 1.0 + uniforms.shadingOpacity * (contours.x - 0.5);
    color = mix(color, vec3f(0.0), contours.y * uniforms.contourOpacity);
  }

  return vec4f(color, 1.0);
}
`}function Fe(e,s){return`
struct Uniforms {
  view: mat4x4f,
  viewInverse: mat4x4f,
  vInf: vec2f,
  resolution: vec2f,
  lineWidth: f32,
  dt: f32,
  noise: f32,
  byPressure: f32,
  panelCount: u32,
  streamlineLength: u32,
  opacity: f32,
  _pad0: u32,
  panelData: array<vec4f, ${e+1}>,
  colorscale: array<vec4f, 256>,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexInput {
  @location(0) seed: vec3f,
  @location(1) lineCoord: vec2f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) color: vec3f,
  @location(1) opacity: f32,
  @location(2) y: f32,
};

${ce}
${de}

@vertex
fn vertex(input: VertexInput, @builtin(instance_index) instanceIndex: u32) -> VertexOutput {
  var xy = (uniforms.viewInverse * vec4f(input.seed.xy, 0.0, 1.0)).xy;
  let tScale = vec2f(1.0 / f32(uniforms.streamlineLength - 1u), -0.5);
  let s = input.lineCoord.x * tScale.x + tScale.y;

  // Integrate streamline
  var v: vec2f;
  for (var j = 0u; j < uniforms.streamlineLength; j++) {
    v = computeVelocity(xy, uniforms.panelCount);
    xy += s * uniforms.dt * normalize(v) * 0.3;
  }

  let cp = computePressureCoeff(v);
  let colorT = exp((cp - 1.0) * 0.7);
  let pressureColor = sampleColorscale(colorT) * (1.0 - uniforms.noise * (input.seed.z - 0.5) * 2.0);
  let baseColor = vec3f(1.0 - input.seed.z * uniforms.noise);

  var output: VertexOutput;
  output.color = mix(baseColor, pressureColor, uniforms.byPressure);
  output.y = input.lineCoord.y;

  let spVel = uniforms.view * vec4f(v, 0.0, 0.0);
  output.position = uniforms.view * vec4f(xy, 0.0, 1.0);
  output.position = vec4f(
    output.position.xy + normalize(vec2f(-spVel.y, spVel.x) / uniforms.resolution) / uniforms.resolution * input.lineCoord.y * uniforms.lineWidth,
    output.position.zw
  );
  output.opacity = exp(-s * s * 10.0);

  return output;
}

@fragment
fn fragment(input: VertexOutput) -> @location(0) vec4f {
  let alpha = input.opacity * (1.0 - input.y * input.y) * uniforms.opacity;
  return vec4f(input.color * alpha, alpha);
}
`}function Le(){return`
struct Uniforms {
  view: mat4x4f,
  color: vec4f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexOutput {
  @builtin(position) position: vec4f,
};

@vertex
fn vertex(@location(0) xy: vec2f) -> VertexOutput {
  var output: VertexOutput;
  output.position = uniforms.view * vec4f(xy, 0.0, 1.0);
  return output;
}

@fragment
fn fragment() -> @location(0) vec4f {
  return uniforms.color;
}
`}function Ae(){return`
struct Uniforms {
  view: mat4x4f,
  color: vec4f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexOutput {
  @builtin(position) position: vec4f,
};

@vertex
fn vertex(@location(0) xy: vec2f) -> VertexOutput {
  var output: VertexOutput;
  output.position = uniforms.view * vec4f(xy, 0.0, 1.0);
  return output;
}

@fragment
fn fragment(input: VertexOutput) -> @location(0) vec4f {
  return uniforms.color;
}
`}function fe(){return`
struct Uniforms {
  view: mat4x4f,
  color: vec4f,
  pointSize: f32,
  _pad0: f32,
  resolution: vec2f,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> positions: array<vec2f>;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vertex(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) instanceIndex: u32) -> VertexOutput {
  // Quad vertices: 0=(-1,-1), 1=(1,-1), 2=(-1,1), 3=(1,1)
  let x = f32((vertexIndex & 1u) * 2u) - 1.0;
  let y = f32((vertexIndex >> 1u) * 2u) - 1.0;

  let pos = positions[instanceIndex];
  let clipPos = uniforms.view * vec4f(pos, 0.0, 1.0);

  var output: VertexOutput;
  output.uv = vec2f(x, y);
  // Offset in normalized device coordinates
  let offset = vec2f(x, y) * uniforms.pointSize / uniforms.resolution;
  output.position = vec4f(clipPos.xy + offset, clipPos.zw);
  return output;
}

@fragment
fn fragment(input: VertexOutput) -> @location(0) vec4f {
  let dist = length(input.uv);
  // Antialiased circle
  let aa = 1.0 - smoothstep(0.7, 1.0, dist);
  if (aa < 0.01) { discard; }
  return vec4f(uniforms.color.rgb * aa, uniforms.color.a * aa);
}
`}function De(e,s){let x=null,g=null,d=null,P=-1,u=null,l=null,b=null,B=null,m=null,K=-1,Z=-1,H=null,ee=null,q=null,C=null,I=null,te=-1,re=-1,F=null,L=null,z=null,Y=null,oe=null,ne=-1,E=null,ie=null,X=null,A=null,ae=-1,j=null,ue=null,$=null,G=null,se=-1;const R=new Float32Array(3*Ve),J=[0,0];for(let t=0;t<R.length;t+=3)Oe(J,t/3),R[t]=(J[0]*2-1)*1.05+Math.random()*.05,R[t+1]=(J[1]*2-1)*1.05+Math.random()*.05,R[t+2]=Math.random();B=e.createBuffer({label:"streamline-seeds",size:R.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(B,0,R);const _=new Float32Array(le*4);for(let t=0;t<le;t++)_[t*4+0]=t,_[t*4+1]=-1,_[t*4+2]=t,_[t*4+3]=1;m=e.createBuffer({label:"streamline-coords",size:_.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(m,0,_);function pe(t){if(t===P&&x)return;P=t;const o=Ie(t),i=e.createShaderModule({label:"field-shader",code:o}),r=96+(t+1)*16+256*16;d=e.createBuffer({label:"field-uniforms",size:r,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const n=e.createBindGroupLayout({label:"field-bind-group-layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});g=e.createBindGroup({label:"field-bind-group",layout:n,entries:[{binding:0,resource:{buffer:d}}]}),x=e.createRenderPipeline({label:"field-pipeline",layout:e.createPipelineLayout({bindGroupLayouts:[n]}),vertex:{module:i,entryPoint:"vertex"},fragment:{module:i,entryPoint:"fragment",targets:[{format:s}]},primitive:{topology:"triangle-list"}})}function me(t,o){if(t===K&&o===Z&&u)return;K=t,Z=o;const i=Fe(t),r=e.createShaderModule({label:"streamline-shader",code:i}),n=Math.ceil((176+(t+1)*16+256*16)/16)*16;b=e.createBuffer({label:"streamline-uniforms",size:n,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const f=e.createBindGroupLayout({label:"streamline-bind-group-layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});l=e.createBindGroup({label:"streamline-bind-group",layout:f,entries:[{binding:0,resource:{buffer:b}}]}),u=e.createRenderPipeline({label:"streamline-pipeline",layout:e.createPipelineLayout({bindGroupLayouts:[f]}),vertex:{module:r,entryPoint:"vertex",buffers:[{arrayStride:12,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x3"}]},{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:1,offset:0,format:"float32x2"}]}]},fragment:{module:r,entryPoint:"fragment",targets:[{format:s,blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-strip"}})}function ge(){if(H)return;const t=e.createShaderModule({label:"airfoil-shader",code:Le()});q=e.createBuffer({label:"airfoil-uniforms",size:80,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const o=e.createBindGroupLayout({label:"airfoil-bind-group-layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});ee=e.createBindGroup({label:"airfoil-bind-group",layout:o,entries:[{binding:0,resource:{buffer:q}}]}),H=e.createRenderPipeline({label:"airfoil-pipeline",layout:e.createPipelineLayout({bindGroupLayouts:[o]}),vertex:{module:t,entryPoint:"vertex",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"fragment",targets:[{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}})}function ye(t,o){const i=t.length/2,r=o.length;i!==te&&(C&&C.destroy(),C=e.createBuffer({label:"airfoil-vertices",size:t.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),te=i),e.queue.writeBuffer(C,0,t),r!==re&&(I&&I.destroy(),I=e.createBuffer({label:"airfoil-indices",size:r*4,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),re=r);const n=new Uint32Array(o);e.queue.writeBuffer(I,0,n)}function xe(){if(F)return;F=we(e,{colorTargets:{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}},join:"round",cap:"round",maxJoinResolution:8,maxCapResolution:8,vertexShaderBody:`
      @group(1) @binding(0) var<storage, read> positions: array<vec4f>;
      @group(1) @binding(1) var<uniform> viewMatrix: mat4x4f;
      @group(1) @binding(2) var<uniform> edgeUniforms: vec4f;  // xyz=color, w=lineWidth

      struct Vertex {
        position: vec4f,
        width: f32,
        lineWidth: f32,
      }

      fn getVertex(index: u32) -> Vertex {
        let p = positions[index];
        let projected = viewMatrix * vec4f(p.xyz, 1.0);
        let lw = edgeUniforms.w;
        return Vertex(vec4f(projected.xyz, p.w * projected.w), lw, lw);
      }
    `,fragmentShaderBody:`
      @group(1) @binding(2) var<uniform> edgeUniforms: vec4f;  // xyz=color, w unused (lineWidth comes from arg)

      fn getColor(lineCoord: vec2f, lineWidth: f32, instanceID: f32, triStripCoord: vec2f) -> vec4f {
        let color = edgeUniforms.xyz;

        // lineCoord.y is -1 to 1 across the line width
        let distFromCenter = abs(lineCoord.y);

        // Fade over 1 device pixel: 2/lineWidth in normalized coords
        let fadeWidth = 2.0 / max(lineWidth, 1.0);

        // Smoothstep antialiasing at edges
        let alpha = 1.0 - smoothstep(1.0 - fadeWidth, 1.0, distFromCenter);

        return vec4f(color * alpha, alpha);
      }
    `}),z=e.createBuffer({label:"edge-view-matrix",size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),Y=e.createBuffer({label:"edge-uniforms",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}function ve(t){const o=t.x.length;o!==ne&&(L&&L.destroy(),L=e.createBuffer({label:"edge-positions",size:o*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),ne=o,F&&z&&(oe=e.createBindGroup({layout:F.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:L}},{binding:1,resource:{buffer:z}},{binding:2,resource:{buffer:Y}}]})));const i=new Float32Array(o*4);for(let r=0;r<o;r++)i[r*4+0]=t.x[r],i[r*4+1]=t.y[r],i[r*4+2]=0,i[r*4+3]=1;e.queue.writeBuffer(L,0,i)}function he(){E||(e.createShaderModule({label:"point-shader",code:fe()}),X=e.createBuffer({label:"point-uniforms",size:112,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}))}function be(t){const o=t.x.length;if(o!==ae){A&&A.destroy(),A=e.createBuffer({label:"point-positions",size:o*8,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),ae=o;const r=e.createBindGroupLayout({label:"point-bind-group-layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]});if(ie=e.createBindGroup({label:"point-bind-group",layout:r,entries:[{binding:0,resource:{buffer:X}},{binding:1,resource:{buffer:A}}]}),!E){const n=e.createShaderModule({label:"point-shader",code:fe()});E=e.createRenderPipeline({label:"point-pipeline",layout:e.createPipelineLayout({bindGroupLayouts:[r]}),vertex:{module:n,entryPoint:"vertex"},fragment:{module:n,entryPoint:"fragment",targets:[{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-strip"}})}}const i=new Float32Array(o*2);for(let r=0;r<o;r++)i[r*2]=t.x[r],i[r*2+1]=t.y[r];e.queue.writeBuffer(A,0,i)}return{drawField(t,o){const{viewInverse:i,vInf:r,panelData:n,panelCount:f,colorscale:v,contourOpacity:a=.1,shadingOpacity:y=.15}=o;pe(f);const M=(f+1)*16,O=256*16,N=96+M+O,S=new ArrayBuffer(N),h=new Float32Array(S),V=new Uint32Array(S);h.set(i,0),h[16]=r[0],h[17]=r[1],h[18]=a,h[19]=y,V[20]=f;const w=24;h.set(n,w);const c=w+(f+1)*4;h.set(v,c),e.queue.writeBuffer(d,0,S),t.setPipeline(x),t.setBindGroup(0,g),t.draw(3)},drawStreamlines(t,o){const{view:i,viewInverse:r,vInf:n,resolution:f,panelData:v,panelCount:a,colorscale:y,lineWidth:M=2,dt:O=.1,noise:N=.2,byPressure:S=0,streamlineCount:h=500,streamlineLength:V=20,opacity:w=1}=o;if(h===0)return;me(a,V);const c=Math.ceil((176+(a+1)*16+256*16)/16)*16,U=new ArrayBuffer(c),p=new Float32Array(U),T=new Uint32Array(U);p.set(i,0),p.set(r,16),p[32]=n[0],p[33]=n[1],p[34]=f[0],p[35]=f[1],p[36]=M,p[37]=O,p[38]=N,p[39]=S,T[40]=a,T[41]=V,p[42]=w;const D=44;p.set(v,D);const W=D+(a+1)*4;p.set(y,W),e.queue.writeBuffer(b,0,U),t.setPipeline(u),t.setBindGroup(0,l),t.setVertexBuffer(0,B),t.setVertexBuffer(1,m),t.draw(V*2,h)},drawAirfoil(t,o){const{view:i,color:r,vertices:n,indices:f}=o;ge(),ye(n,f);const v=new ArrayBuffer(80),a=new Float32Array(v);a.set(i,0),a[16]=r[0],a[17]=r[1],a[18]=r[2],a[19]=r[3],e.queue.writeBuffer(q,0,v),t.setPipeline(H),t.setBindGroup(0,ee),t.setVertexBuffer(0,C),t.setIndexBuffer(I,"uint32"),t.drawIndexed(f.length)},drawPanelEdges(t,o){const{view:i,geometry:r,color:n,lineWidth:f=2,resolution:v}=o;xe(),ve(r),e.queue.writeBuffer(z,0,i);const a=new Float32Array(4);a[0]=n[0],a[1]=n[1],a[2]=n[2],a[3]=f,e.queue.writeBuffer(Y,0,a),F.draw(t,{vertexCount:r.x.length,resolution:v,joinResolution:4,capResolution:4},[oe])},drawVertexPoints(t,o){const{view:i,geometry:r,color:n,pointSize:f,resolution:v}=o;he(),be(r);const a=new ArrayBuffer(112),y=new Float32Array(a);y.set(i,0),y[16]=n[0],y[17]=n[1],y[18]=n[2],y[19]=n[3],y[20]=f,y[22]=v[0],y[23]=v[1],e.queue.writeBuffer(X,0,a),t.setPipeline(E),t.setBindGroup(0,ie),t.draw(4,r.x.length)},drawPressureDist(t,o){const{view:i,geometry:r,cpData:n,scale:f=.05,cpOffset:v=1,color:a=[.2,.5,1,.5]}=o;if(!n||n.cpValues.length===0)return;const y=n.cpValues.length,M=[];for(let c=0;c<y;c++){const U=n.cpValues[c],[p,T]=n.midpoints[c],[D,W]=n.normals[c],k=Math.max(0,(v+U)*f);M.push([p+D*k,T+W*k])}const O=[];for(let c=0;c<y-1;c++){const[U,p]=n.midpoints[c],[T,D]=M[c],[W,k]=n.midpoints[c+1],[Pe,Be]=M[c+1];O.push(U,p,W,k,T,D),O.push(W,k,Pe,Be,T,D)}const N=new Float32Array(O),S=O.length/2,h=N.byteLength;if((S!==se||!G)&&(G&&G.destroy(),G=e.createBuffer({label:"pressure-dist-vertices",size:Math.max(h,64),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),se=S),e.queue.writeBuffer(G,0,N),!j){const c=e.createShaderModule({label:"pressure-dist-shader",code:Ae()});$=e.createBuffer({label:"pressure-dist-uniforms",size:80,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const U=e.createBindGroupLayout({label:"pressure-dist-bind-group-layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});ue=e.createBindGroup({label:"pressure-dist-bind-group",layout:U,entries:[{binding:0,resource:{buffer:$}}]}),j=e.createRenderPipeline({label:"pressure-dist-pipeline",layout:e.createPipelineLayout({bindGroupLayouts:[U]}),vertex:{module:c,entryPoint:"vertex",buffers:[{arrayStride:8,attributes:[{shaderLocation:0,offset:0,format:"float32x2"}]}]},fragment:{module:c,entryPoint:"fragment",targets:[{format:s,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}})}const V=new ArrayBuffer(80),w=new Float32Array(V);w.set(i,0),w[16]=a[0],w[17]=a[1],w[18]=a[2],w[19]=a[3],e.queue.writeBuffer($,0,V),t.setPipeline(j),t.setBindGroup(0,ue),t.setVertexBuffer(0,G),t.draw(S)},destroy(){d&&d.destroy(),b&&b.destroy(),B&&B.destroy(),m&&m.destroy(),q&&q.destroy(),C&&C.destroy(),I&&I.destroy(),F&&F.destroy(),L&&L.destroy(),z&&z.destroy(),Y&&Y.destroy(),E&&(E=null),X&&X.destroy(),A&&A.destroy(),j&&(j=null),$&&$.destroy(),G&&G.destroy()}}}function ze(e,s=256){const x=new Float32Array(s*4);for(let g=0;g<s;g++){const d=g/(s-1),P=e(d);let u,l,b;const B=P.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);if(B)u=parseInt(B[1])/255,l=parseInt(B[2])/255,b=parseInt(B[3])/255;else if(P.startsWith("#")){const m=P.slice(1);m.length===3?(u=parseInt(m[0]+m[0],16)/255,l=parseInt(m[1]+m[1],16)/255,b=parseInt(m[2]+m[2],16)/255):(u=parseInt(m.slice(0,2),16)/255,l=parseInt(m.slice(2,4),16)/255,b=parseInt(m.slice(4,6),16)/255)}else u=l=b=0;x[g*4+0]=u,x[g*4+1]=l,x[g*4+2]=b,x[g*4+3]=1}return x}function Ee(e,s){const{x,y:g}=e,d=x.length-1,P=s.shape[0]>d,u=new Float32Array((d+1)*4);for(let l=0;l<d+1;l++)u[4*l]=x[l],u[4*l+1]=g[l];for(let l=0;l<d;l++)u[4*(l+1)+2]=s.get(l),u[4*(l+1)+3]=P?s.get(d):0;return u}function Re(e){const{x:s,y:x}=e,g=s.length,d=new Array(g*2);for(let u=0;u<g;u++)d[u*2]=s[u],d[u*2+1]=x[u];const P=Ue(d);return{vertices:new Float32Array(d),indices:new Uint16Array(P)}}export{De as createRenderer,Ee as preparePanelData,ze as quantizeColorscale,Re as triangulateAirfoil};
