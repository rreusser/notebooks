import{createGPULines as q}from"./webgpu-lines-D6bO6C4k.js";function T(s,f,a,h){const u=new Map;let y=Promise.resolve();function W(e){const i=JSON.stringify(e);if(u.has(i))return u.get(i);const{join:r="miter",joinResolution:o=8,miterLimit:t=4,cap:n="round",capResolution:d=8,sdfStrokeWidth:l=0,lineWidth:m=20,fragmentShaderBody:z=null,blend:w=null}=e,g=l>0,k=`
      @group(1) @binding(0) var<storage, read> positions: array<vec4f>;
      @group(1) @binding(1) var<uniform> viewMatrix: mat4x4f;

      struct Vertex {
        position: vec4f,
        width: f32,
      }

      fn getVertex(index: u32) -> Vertex {
        let p = positions[index];
        let projected = viewMatrix * vec4f(p.xyz, 1.0);
        return Vertex(vec4f(projected.xyz, p.w * projected.w), ${m.toFixed(1)});
      }
    `,B=`
      fn getColor(lineCoord: vec2f) -> vec4f {
        let edge = 1.0 - 0.3 * abs(lineCoord.y);
        return vec4f(0.2 * edge, 0.5 * edge, 0.9 * edge, 1.0);
      }
    `,M=`
      fn linearstep(a: f32, b: f32, x: f32) -> f32 {
        return clamp((x - a) / (b - a), 0.0, 1.0);
      }
      fn getColor(lineCoord: vec2f) -> vec4f {
        let width = ${m.toFixed(1)};
        let strokeWidth = ${l.toFixed(1)};
        let sdf = 0.5 * width * length(lineCoord.xy);
        let aa = linearstep(width * 0.5, width * 0.5 - 1.0, sdf);
        let strokeMask = linearstep(width * 0.5 - strokeWidth - 0.5, width * 0.5 - strokeWidth + 0.5, sdf);
        let fillColor = vec3f(0.4, 0.7, 1.0);
        let strokeColor = vec3f(0.1, 0.3, 0.6);
        let color = mix(fillColor, strokeColor, strokeMask);
        return vec4f(color, aa);
      }
    `;let p;z?p=z:g?p=M:p=B;let x;w!==null?x=w:g?x={color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}:x=null;const c=q(s,{format:h,join:r,joinResolution:o,miterLimit:t,cap:n,capResolution:d,vertexShaderBody:k,fragmentShaderBody:p,blend:x});return u.set(i,c),c}function b(e,i={}){const{lineBreak:r=!1}=i;let o=[];switch(e){case"zigzag":for(let t=0;t<6;t++){const d=-.6+t/5*1.2,l=t%2===0?.2:-.2;o.push({x:d,y:l,z:0,w:1})}break;case"spiral":for(let t=0;t<80;t++){const n=t/79,d=n*Math.PI*6,l=.1+n*.6;o.push({x:l*Math.cos(d),y:l*Math.sin(d),z:0,w:1})}break;case"wave":for(let t=0;t<100;t++){const n=t/99,d=-.8+n*1.6,l=.3*Math.sin(n*Math.PI*4)+.2*Math.cos(n*Math.PI*7);o.push({x:d,y:l,z:0,w:1})}break;case"join-demo":o=[{x:-.7,y:.3,z:0,w:1},{x:-.25,y:-.3,z:0,w:1},{x:.25,y:.3,z:0,w:1},{x:.7,y:-.3,z:0,w:1}];break;case"cap-demo":o=[{x:-.55,y:0,z:0,w:1},{x:.55,y:0,z:0,w:1}];break;case"miter-demo":o=[{x:-.6,y:-.1,z:0,w:1},{x:0,y:.35,z:0,w:1},{x:.6,y:-.1,z:0,w:1}];break;case"resolution-demo":o=[{x:-.5,y:-.2,z:0,w:1},{x:0,y:-.2,z:0,w:1},{x:0,y:.4,z:0,w:1}];break;case"break-demo":o=[{x:-.65,y:.15,z:0,w:1},{x:-.3,y:-.2,z:0,w:1},{x:0,y:.15,z:0,w:1},{x:.3,y:-.2,z:0,w:1},{x:.65,y:.15,z:0,w:1}];break;case"shader-demo":o=[{x:-.6,y:.1,z:0,w:1},{x:-.2,y:-.25,z:0,w:1},{x:.2,y:.25,z:0,w:1},{x:.6,y:-.1,z:0,w:1}];break;default:o=b("zigzag",i)}if(r){const t=Math.floor(o.length/2);o.splice(t,0,{x:0,y:0,z:0,w:0})}return o}function D(e){const i=new Float32Array(e.length*4);for(let r=0;r<e.length;r++)i[r*4+0]=e[r].x,i[r*4+1]=e[r].y,i[r*4+2]=e[r].z,i[r*4+3]=e[r].w;return i}async function F(e={}){const{pattern:i="zigzag",lineWidth:r=20,join:o="miter",joinResolution:t=8,miterLimit:n=4,cap:d="round",capResolution:l=8,sdfStrokeWidth:m=0,lineBreak:z=!1,width:w=320,height:g=200,points:k=null,viewMatrix:B=null,clearColor:M={r:.95,g:.95,b:.95,a:1},fragmentShaderBody:p=null,blend:x=null}=e,c=window.devicePixelRatio||1;(a.width!==w*c||a.height!==g*c)&&(a.width=w*c,a.height=g*c);const U=W({join:o,joinResolution:t,miterLimit:n,cap:d,capResolution:l,sdfStrokeWidth:m,lineWidth:r,fragmentShaderBody:p,blend:x}),v=k||b(i,{lineBreak:z}),C=D(v),P=s.createBuffer({label:"demo-positions",size:C.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});s.queue.writeBuffer(P,0,C);const L=B||new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),S=s.createBuffer({label:"demo-view-matrix",size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});s.queue.writeBuffer(S,0,L);const O=s.createBindGroup({layout:U.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:P}},{binding:1,resource:{buffer:S}}]}),G=s.createCommandEncoder(),R=G.beginRenderPass({colorAttachments:[{view:f.getCurrentTexture().createView(),loadOp:"clear",storeOp:"store",clearValue:M}]});return U.draw(R,{vertexCount:v.length,width:r,resolution:[a.width,a.height]},[O]),R.end(),s.queue.submit([G.finish()]),P.destroy(),S.destroy(),await s.queue.onSubmittedWorkDone(),{width:w*c,height:g*c}}async function j(e,i={}){const r=y.then(async()=>{const o=window.devicePixelRatio||1,t=i.width||parseInt(e.style.width)||e.width,n=i.height||parseInt(e.style.height)||e.height;e.width=Math.floor(t*o),e.height=Math.floor(n*o),e.style.width=`${t}px`,e.style.height=`${n}px`,await F({...i,width:t,height:n}),e.getContext("2d").drawImage(a,0,0,a.width,a.height,0,0,e.width,e.height)});return y=r.catch(()=>{}),r}function I(){for(const e of u.values())e.destroy();u.clear()}return{render:F,renderToCanvas:j,generateDemoPoints:b,destroy:I}}async function A(){if(!navigator.gpu)throw new Error("WebGPU not supported");const s=await navigator.gpu.requestAdapter();if(!s)throw new Error("Failed to get WebGPU adapter");const f=await s.requestDevice(),a=navigator.gpu.getPreferredCanvasFormat(),h=document.createElement("canvas");h.width=640,h.height=400;const u=h.getContext("webgpu");u.configure({device:f,format:a,alphaMode:"premultiplied"});const y=T(f,u,h,a);return{...y,device:f,canvas:h,destroy(){y.destroy(),f.destroy()}}}export{T as createDemoRenderer,A as initDemoRenderer};
