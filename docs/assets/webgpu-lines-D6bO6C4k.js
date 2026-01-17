function N(t,n){const s=n?new RegExp(`struct\\s+${n}\\s*\\{([^}]+)\\}`,"s"):/struct\s+(\w+)\s*\{([^}]+)\}/s,e=t.match(s);if(!e)return[];const a=n?e[1]:e[2],i=[],u=/(\w+)\s*:\s*([\w<>]+)\s*,?/g;let l;for(;(l=u.exec(a))!==null;)i.push({name:l[1].trim(),type:l[2].trim()});return i}function Y(t,n){const s=new RegExp(`fn\\s+${n}\\s*\\([^)]*\\)\\s*->\\s*(\\w+)`,"s"),e=t.match(s);return e?e[1]:null}function Q(t,n){const{vertexShaderBody:s,fragmentShaderBody:e,format:a,vertexFunction:i="getVertex",positionField:u="position",widthField:l="width",join:f="bevel",joinResolution:y=8,miterLimit:r=4,cap:d="round",capResolution:U=8,blend:A=null}=n,c=Y(s,i);if(!c)throw new Error(`Could not find vertex function '${i}' in vertexShaderBody`);const m=N(s,c);if(m.length===0)throw new Error(`Could not parse struct '${c}' in vertexShaderBody`);const b=m.findIndex(o=>o.name===u);if(b===-1)throw new Error(`Position field '${u}' not found in struct '${c}'`);const $=m.findIndex(o=>o.name===l);if($===-1)throw new Error(`Width field '${l}' not found in struct '${c}'. The vertex struct must include a width field.`);const D=m.filter((o,x)=>x!==b&&x!==$),g=f==="round",j=f==="bevel",R=g?y*2:2,S=j?0:r,E=d!=="none";let v;d==="none"?v=1:d==="square"?v=3:v=U;const M=v*2,O=d==="square"?[2,2/Math.sqrt(3)]:[1,1],T=(Math.max(M,R)+3)*2,z=J({userCode:s,vertexFunction:i,returnType:c,positionField:u,widthField:l,varyings:D,isRound:g}),F=W({userCode:e,varyings:D}),V=t.createShaderModule({label:"gpu-lines-vertex",code:z}),q=t.createShaderModule({label:"gpu-lines-fragment",code:F});t.createBindGroupLayout({label:"gpu-lines-uniforms",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});const h=t.createRenderPipeline({label:"gpu-lines",layout:"auto",vertex:{module:V,entryPoint:"vertexMain"},fragment:{module:q,entryPoint:"fragmentMain",targets:[A?{format:a,blend:A}:{format:a}]},primitive:{topology:"triangle-strip",stripIndexFormat:void 0}}),w=t.createBuffer({label:"gpu-lines-uniforms",size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),k=t.createBindGroup({layout:h.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:w}}]});return{getBindGroupLayout(o){return h.getBindGroupLayout(o)},draw(o,x,P=[]){const{vertexCount:L,width:H,resolution:_}=x,I=new ArrayBuffer(48),p=new Float32Array(I),C=new Uint32Array(I);p[0]=_[0],p[1]=_[1],p[2]=M,p[3]=R,p[4]=S*S,C[5]=g?1:0,p[6]=H,C[7]=L,C[8]=E?1:0,C[9]=0,p[10]=O[0],p[11]=O[1],t.queue.writeBuffer(w,0,I);const G=Math.max(0,L-1);if(G>0){o.setPipeline(h),o.setBindGroup(0,k);for(let B=0;B<P.length;B++)o.setBindGroup(B+1,P[B]);o.draw(T,G)}},destroy(){w.destroy()}}}function J({userCode:t,vertexFunction:n,returnType:s,positionField:e,widthField:a,varyings:i,isRound:u}){const l=i.map((r,d)=>`  @location(${d+1}) ${r.name}: ${r.type},`).join(`
`),f=i.map(r=>`  let ${r.name} = mix(vertexB.${r.name}, vertexC.${r.name}, clamp(useC, 0.0, 1.0));`).join(`
`),y=i.map(r=>`  output.${r.name} = ${r.name};`).join(`
`);return`
// Library uniforms
struct Uniforms {
  resolution: vec2f,
  vertCnt2: vec2f,
  miterLimit: f32,
  isRound: u32,
  width: f32,
  pointCount: u32,
  insertCaps: u32,
  _pad: u32,
  capScale: vec2f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

// Vertex output (library + user varyings)
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) lineCoord: vec2f,
${l}
}

// User-provided code (bindings, structs, vertex function)
${t}

// Check if position is invalid (line break)
fn invalid(p: vec4f) -> bool {
  return p.w == 0.0 || p.x != p.x;
}

@vertex
fn vertexMain(
  @builtin(vertex_index) vertexIndex: u32,
  @builtin(instance_index) instanceIndex: u32
) -> VertexOutput {
  var output: VertexOutput;

  let pi = 3.141592653589793;
  let tol = 1e-4;
  let N = i32(uniforms.pointCount);

  // Instance i draws segment i → (i+1)
  let A_idx = i32(instanceIndex) - 1;
  let B_idx = i32(instanceIndex);
  let C_idx = i32(instanceIndex) + 1;
  let D_idx = i32(instanceIndex) + 2;

  // Call user's vertex function for each point in the window
  let vertexA = ${n}(u32(clamp(A_idx, 0, N - 1)));
  let vertexB = ${n}(u32(B_idx));
  let vertexC = ${n}(u32(C_idx));
  let vertexD = ${n}(u32(clamp(D_idx, 0, N - 1)));

  // Extract positions
  var pA = vertexA.${e};
  var pB = vertexB.${e};
  var pC = vertexC.${e};
  var pD = vertexD.${e};

  // Determine invalid states
  let aOutOfBounds = A_idx < 0;
  let dOutOfBounds = D_idx >= N;
  var aInvalid = aOutOfBounds || invalid(pA);
  var dInvalid = dOutOfBounds || invalid(pD);
  let bInvalid = invalid(pB);
  let cInvalid = invalid(pC);

  // Initialize output
  var lineCoord = vec2f(0.0);
  output.position = pB;

  // Skip degenerate segments
  if (bInvalid || cInvalid) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Vertex counts for each half
  let capRes = uniforms.vertCnt2.x;
  let joinRes = uniforms.vertCnt2.y;
  let resB = select(joinRes, capRes, aInvalid && uniforms.insertCaps == 1u);
  let resC = select(joinRes, capRes, dInvalid && uniforms.insertCaps == 1u);
  let vB = resB + 3.0;
  let vC = resC + 3.0;
  let vTotal = vB + vC;

  // Determine if mirrored half
  let index = f32(vertexIndex);
  let mirror = index >= vB;

  // Perspective correction
  let pw = select(pB.w, pC.w, mirror);

  // Convert to screen-pixel coordinates
  let wA = select(pA.w, pB.w, aInvalid);
  let wD = select(pD.w, pC.w, dInvalid);
  pA = vec4f(vec3f(pA.xy * uniforms.resolution, pA.z) / wA, 1.0);
  pB = vec4f(vec3f(pB.xy * uniforms.resolution, pB.z) / pB.w, 1.0);
  pC = vec4f(vec3f(pC.xy * uniforms.resolution, pC.z) / pC.w, 1.0);
  pD = vec4f(vec3f(pD.xy * uniforms.resolution, pD.z) / wD, 1.0);

  // Depth check
  if (max(abs(pB.z), abs(pC.z)) > 1.0) {
    output.lineCoord = lineCoord;
    return output;
  }

  // Swap for mirrored half
  if (mirror) {
    let tmp = pC; pC = pB; pB = tmp;
    let tmp2 = pD; pD = pA; pA = tmp2;
    let tmpInv = dInvalid; dInvalid = aInvalid; aInvalid = tmpInv;
  }

  // Handle caps/joins
  let isCap = aInvalid && uniforms.insertCaps == 1u;

  if (aInvalid) {
    if (uniforms.insertCaps == 1u) {
      pA = pC;
    } else {
      pA = 2.0 * pB - pC;
    }
  }
  if (dInvalid) {
    pD = 2.0 * pC - pB;
  }

  // Tangent and normal vectors
  var tBC = pC.xy - pB.xy;
  let lBC = length(tBC);
  if (lBC > 0.0) { tBC = tBC / lBC; }
  let nBC = vec2f(-tBC.y, tBC.x);

  var tAB = pB.xy - pA.xy;
  let lAB = length(tAB);
  if (lAB > 0.0) { tAB = tAB / lAB; }
  let nAB = vec2f(-tAB.y, tAB.x);

  var tCD = pD.xy - pC.xy;
  let lCD = length(tCD);
  if (lCD > 0.0) { tCD = tCD / lCD; }

  // Angle at B
  let cosB = clamp(dot(tAB, tBC), -1.0, 1.0);

  // Direction
  let mirrorSign = select(1.0, -1.0, mirror);
  var dirB = -dot(tBC, nAB);
  let bCollinear = abs(dirB) < tol;
  let bIsHairpin = bCollinear && cosB < 0.0;
  dirB = select(sign(dirB), -mirrorSign, bCollinear);

  // Miter vector
  var miter = select(0.5 * (nAB + nBC) * dirB, -tBC, bIsHairpin);

  // Join index
  var i = select(index, vTotal - index, mirror);
  let res = select(resB, resC, mirror);
  i = i - max(0.0, select(resB, resC, mirror) - res);
  i = i + select(0.0, -1.0, dirB < 0.0);
  i = i - select(0.0, 1.0, mirror);
  i = max(0.0, i);

  // Basis vectors
  var xBasis = tBC;
  var yBasis = nBC * dirB;
  var xy = vec2f(0.0);

  lineCoord.y = dirB * mirrorSign;

  // Get width from vertex struct (computed per-vertex)
  let width = select(vertexB.${a}, vertexC.${a}, mirror);
  let roundOrCap = uniforms.isRound == 1u || isCap;

  if (i == res + 1.0) {
    // Interior miter point
    let m = select((tAB.x * tBC.y - tAB.y * tBC.x) / (1.0 + cosB), 0.0, cosB <= -0.9999);
    xy = vec2f(min(abs(m), min(lBC, lAB) / width), -1.0);
    lineCoord.y = -lineCoord.y;
  } else {
    // Join/cap geometry
    let m2 = dot(miter, miter);
    let lm = sqrt(m2);
    if (lm > 0.0) {
      yBasis = miter / lm;
      xBasis = dirB * vec2f(yBasis.y, -yBasis.x);
    }
    let isBevel = 1.0 > uniforms.miterLimit * m2;

    if (i % 2.0 == 0.0) {
      if (roundOrCap || i != 0.0) {
        let t = clamp(i, 0.0, res) / res;
        let capMult = select(1.0, 2.0, isCap);
        let theta = -0.5 * (acos(cosB) * t - pi) * capMult;
        xy = vec2f(cos(theta), sin(theta));

        if (isCap) {
          if (xy.y > 0.001) {
            xy = xy * uniforms.capScale;
          }
          let prevLineCoordY = lineCoord.y;
          lineCoord.x = xy.y * prevLineCoordY;
          lineCoord.y = xy.x * prevLineCoordY;
        }
      } else {
        yBasis = select(miter, vec2f(0.0), bIsHairpin);
        xy.y = select(1.0 / m2, 1.0, isBevel);
      }
    } else {
      lineCoord.y = 0.0;
      if (isBevel && !roundOrCap) {
        xy.y = -1.0 + sqrt((1.0 + cosB) * 0.5);
      }
    }
  }

  // Final position
  let dP = mat2x2f(xBasis, yBasis) * xy;
  let dx = dot(dP, tBC) * mirrorSign;

  // For segments/joins, lineCoord.x stays at 0 (initialized above)
  // For caps, lineCoord.x was set in the cap geometry block

  var pos = pB;
  pos.x = pos.x + width * dP.x;
  pos.y = pos.y + width * dP.y;
  pos.x = pos.x / uniforms.resolution.x;
  pos.y = pos.y / uniforms.resolution.y;
  pos = pos * pw;

  // Interpolation factor for varyings
  let useC = select(0.0, 1.0, mirror) + dx * (width / lBC);

  // Interpolate user varyings
${f}

  output.position = pos;
  output.lineCoord = lineCoord;
${y}

  return output;
}
`}function W({userCode:t,varyings:n}){const s=n.map((i,u)=>`  @location(${u+1}) ${i.name}: ${i.type},`).join(`
`),e=n.map(i=>`input.${i.name}`).join(", "),a=e?`, ${e}`:"";return`
// Library uniforms (shared with vertex shader)
struct Uniforms {
  resolution: vec2f,
  vertCnt2: vec2f,
  miterLimit: f32,
  isRound: u32,
  width: f32,
  pointCount: u32,
  insertCaps: u32,
  _pad: u32,
  capScale: vec2f,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct FragmentInput {
  @location(0) lineCoord: vec2f,
${s}
}

${t}

@fragment
fn fragmentMain(input: FragmentInput) -> @location(0) vec4f {
  return getColor(input.lineCoord${a});
}
`}export{Q as createGPULines};
