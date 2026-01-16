import{computeShapeFromPositions as k}from"./jacobi-coords-figure-2Sej2Y98.js";import"./initial-conditions-figure-CPctfvuv.js";function H(t=4){const o=(1+Math.sqrt(5))/2;let e=[[-1,o,0],[1,o,0],[-1,-o,0],[1,-o,0],[0,-1,o],[0,1,o],[0,-1,-o],[0,1,-o],[o,0,-1],[o,0,1],[-o,0,-1],[-o,0,1]],i=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];const c={};function v(n,a){const h=n<a?`${n}_${a}`:`${a}_${n}`;if(c[h]!==void 0)return c[h];const p=e[n],f=e[a],l=[(p[0]+f[0])/2,(p[1]+f[1])/2,(p[2]+f[2])/2],r=Math.sqrt(l[0]*l[0]+l[1]*l[1]+l[2]*l[2]);l[0]/=r,l[1]/=r,l[2]/=r;const m=e.length;return e.push(l),c[h]=m,m}for(let n=0;n<t;n++){const a=[];for(const[h,p,f]of i){const l=v(h,p),r=v(p,f),m=v(f,h);a.push([h,l,m],[p,r,l],[f,m,r],[l,r,m])}i=a}return e=e.map(n=>{const a=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);return[n[0]/a,n[1]/a,n[2]/a]}),{positions:e,cells:i}}function X(t){return[k([[0,0],[1,1],[1,1]],t),k([[1,1],[0,0],[1,1]],t),k([[1,1],[1,1],[0,0]],t)]}function J(t=100){const o=[];for(let e=0;e<=t;e++){const i=2*Math.PI*e/t;o.push([Math.cos(i),0,Math.sin(i)])}return o}const $=[1,0,0,0,1,0,0,0,1];function T(t){return t({vert:`
      precision highp float;
      uniform mat4 projectionView;
      uniform mat3 rotation;
      uniform mat3 gridRotation;
      attribute vec3 position;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vec3 rotatedPos = rotation * position;
        vPosition = rotatedPos;
        vNormal = gridRotation * rotatedPos;
        gl_Position = projectionView * vec4(rotatedPos, 1);
      }
    `,frag:`#extension GL_OES_standard_derivatives : enable
precision highp float;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float gridDensity;
uniform float lineAlpha;
uniform float fillAlpha;

float gridFactor(vec2 parameter, float width, float feather) {
  float w1 = width - feather * 0.5;
  vec2 d = fwidth(parameter);
  vec2 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
  vec2 a2 = smoothstep(d * w1, d * (w1 + feather), looped);
  return min(a2.x, a2.y);
}

void main() {
  float lat = asin(vNormal.y);
  float lon = atan(vNormal.z, vNormal.x);
  vec2 gridCoord = vec2(lat, lon) * gridDensity / 3.14159265;
  float grid = gridFactor(gridCoord, 0.5, 1.0);
  float alpha = mix(lineAlpha, fillAlpha, grid);
  gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
}`,attributes:{position:t.prop("positions")},elements:t.prop("elements"),uniforms:{projectionView:t.prop("projectionView"),rotation:(o,e)=>e.rotation||$,gridRotation:(o,e)=>e.gridRotation||$,gridDensity:(o,e)=>e.gridDensity||4,lineAlpha:(o,e)=>e.lineAlpha||.18,fillAlpha:(o,e)=>e.fillAlpha||.06},blend:{enable:!0,func:{srcRGB:"src alpha",dstRGB:"one minus src alpha",srcAlpha:1,dstAlpha:1}},depth:{enable:!0,mask:!1},cull:{enable:!0,face:"back"}})}function O(t){const o=Math.cos(t),e=Math.sin(t);return[1,0,0,0,0,o,-e,0,0,e,o,0,0,0,0,1]}function U(t){const o=Math.cos(t),e=Math.sin(t);return[o,0,e,0,0,1,0,0,-e,0,o,0,0,0,0,1]}function K(t,o,e,i){const c=1/Math.tan(t/2),v=1/(e-i);return[c/o,0,0,0,0,c,0,0,0,0,(i+e)*v,-1,0,0,2*i*e*v,0]}function q(t,o){const e=new Array(16);for(let i=0;i<4;i++)for(let c=0;c<4;c++)e[c*4+i]=t[0+i]*o[c*4+0]+t[4+i]*o[c*4+1]+t[8+i]*o[c*4+2]+t[12+i]*o[c*4+3];return e}function tt(t,o={}){const e=H(4),i=t.buffer(e.positions.flat()),c=t.elements(e.cells.flat()),v=t.buffer(J().flat());let n=o.theta||.7,a=o.phi||.3,h=o.distance||3.5,p=!0;const f=new Float32Array([-1,0,0,0,1,0,0,0,1,1,-1,0,-1,0,0,0,1,1,-1,0,-1,1,-1,0,0,1,-1,-1,0,1,-1,1,0,1,0,0]),l=t({vert:`
      precision highp float;
      uniform mat4 uProjectionView;
      uniform float uTailWidth, uAspect;
      uniform vec2 uArrowheadShape;
      attribute vec3 aPoint, aNextPoint;
      attribute vec4 aArrow;

      void main() {
        vec4 p = uProjectionView * vec4(aPoint, 1);
        vec4 pn = uProjectionView * vec4(aNextPoint, 1);
        gl_Position = mix(p, pn, aArrow.y);
        vec2 unitVector = normalize((pn.xy / pn.w - p.xy / p.w) * vec2(uAspect, 1));
        vec2 perpUnitVector = vec2(-unitVector.y, unitVector.x);
        gl_Position.xy += (
            perpUnitVector * (aArrow.x * uTailWidth + aArrow.w * uArrowheadShape.y) +
            unitVector * aArrow.z * uArrowheadShape.x
          ) / vec2(uAspect, 1) * gl_Position.w;
      }
    `,frag:`
      precision highp float;
      uniform vec4 uColor;
      void main() {
        gl_FragColor = uColor;
      }
    `,attributes:{aPoint:{buffer:t.prop("positions"),stride:12,offset:t.prop("offset"),divisor:1},aNextPoint:{buffer:t.prop("positions"),stride:12,offset:(u,d)=>(d.offset||0)+12,divisor:1},aArrow:f},uniforms:{uProjectionView:t.prop("projectionView"),uTailWidth:(u,d)=>(d.tailWidth||2.5)/u.viewportHeight*u.pixelRatio,uArrowheadShape:(u,d)=>[(d.arrowheadLength||12)/u.viewportHeight*u.pixelRatio*2,(d.arrowheadWidth||9)/u.viewportHeight*u.pixelRatio],uAspect:u=>u.viewportWidth/u.viewportHeight,uColor:t.prop("color")},primitive:"triangles",instances:(u,d)=>(d.count||2)-1,count:9,depth:{enable:!0}}),r=T(t),m=t({vert:`
      precision highp float;
      uniform mat4 projection, view;
      attribute vec3 position;
      void main() {
        gl_Position = projection * view * vec4(position, 1);
      }
    `,frag:`
      precision highp float;
      uniform vec4 color;
      void main() {
        gl_FragColor = color;
      }
    `,attributes:{position:t.prop("positions")},uniforms:{projection:t.prop("projection"),view:t.prop("view"),color:t.prop("color")},primitive:"line strip",count:t.prop("count"),depth:{enable:!0}}),A=t({vert:`
      precision highp float;
      uniform mat4 projection, view;
      uniform float pointSize, pixelRatio;
      attribute vec3 position;
      attribute vec4 color;
      varying vec4 vColor;
      void main() {
        vColor = color;
        gl_Position = projection * view * vec4(position, 1);
        gl_PointSize = pointSize * pixelRatio;
      }
    `,frag:`
      precision highp float;
      varying vec4 vColor;
      void main() {
        float r = length(gl_PointCoord * 2.0 - 1.0);
        if (r > 1.0) discard;
        vec3 c = r > 0.7 ? vec3(1) : vColor.rgb;
        gl_FragColor = vec4(c, vColor.a);
      }
    `,attributes:{position:t.prop("positions"),color:t.prop("colors")},uniforms:{projection:t.prop("projection"),view:t.prop("view"),pointSize:t.prop("pointSize"),pixelRatio:t.context("pixelRatio")},primitive:"points",count:t.prop("count"),depth:{enable:!0}}),g=t.buffer(new Float32Array(6)),b=t.buffer(new Float32Array(9)),S=t.buffer(new Float32Array(12)),C=t.buffer(new Float32Array(6)),P=50,y=t.buffer(new Float32Array((P+1)*3));return{theta:n,phi:a,distance:h,dirty:p,setShape(u){const d=[u[1],u[2],u[0]];g.subdata([0,0,0,...d]);const x=Math.hypot(d[0],d[2]);if(x>1e-6){const V=[d[0]/x,0,d[2]/x];C.subdata([0,0,0,...V]);const M=Math.atan2(d[1],x),j=new Float32Array((P+1)*3);for(let w=0;w<=P;w++){const L=M*w/P,F=Math.cos(L),N=Math.sin(L);j[w*3+0]=V[0]*F,j[w*3+1]=N,j[w*3+2]=V[2]*F}y.subdata(j)}p=!0},setPunctures(u){const d=X(u);b.subdata(d.flatMap(x=>[x[1],x[2],x[0]])),S.subdata([.2,.9,.1,1,.9,.1,.2,1,.1,.2,.9,1]),p=!0},rotate(u,d){n+=u,a=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,a+d)),p=!0},taint(){p=!0},render(u,d){if(!p)return;p=!1;const x=u/d,V=K(Math.PI/4,x,.1,100),M=q(O(-a),U(-n));M[12]=0,M[13]=0,M[14]=-h;const j=q(V,M),w={projection:V,view:M};t.clear({color:[0,0,0,0],depth:1}),r({projectionView:j,positions:{buffer:i,stride:12},elements:c}),m({...w,positions:v,count:101,color:[.6,.6,.6,1]}),m({...w,positions:C,count:2,color:[.6,.6,.6,1]}),m({...w,positions:y,count:P+1,color:[.6,.6,.6,1]}),l({projectionView:j,positions:g,offset:0,count:2,color:[.18,.63,.83,1],tailWidth:2.5,arrowheadLength:12,arrowheadWidth:9}),A({...w,positions:b,colors:S,count:3,pointSize:12})},destroy(){i.destroy(),c.destroy(),v.destroy(),g.destroy(),b.destroy(),S.destroy(),C.destroy(),y.destroy()}}}function G(t){const o=1-t[1];return Math.abs(o)<1e-10?[1/0,-1,1/0]:[t[0]/o*2,-1,t[2]/o*2]}function ot(t){const o=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]),e=t[0]/o,i=t[1]/o,c=t[2]/o;if(Math.abs(i-1)<1e-6)return[1,0,0,0,1,0,0,0,1];if(Math.abs(i+1)<1e-6)return[1,0,0,0,-1,0,0,0,-1];const v=Math.sqrt(c*c+e*e),n=c/v,a=-e/v,h=i,p=Math.sqrt(1-i*i),f=1-h;return[h+n*n*f,n*a*f,-a*p,n*a*f,h+f*0,n*p,a*p,-n*p,h+a*a*f]}function Y(t,o){return[t[0]*o[0]+t[3]*o[1]+t[6]*o[2],t[1]*o[0]+t[4]*o[1]+t[7]*o[2],t[2]*o[0]+t[5]*o[1]+t[8]*o[2]]}function nt(t,o,e,i={},c=null){const v=H(4),n=X(e),h=ot(n[2]),p=new Float32Array(o.length),f=new Float32Array(o.length);for(let s=0;s<o.length;s+=3){const R=[o[s],o[s+1],o[s+2]],W=Y(h,R);p[s]=W[0],p[s+1]=W[1],p[s+2]=W[2];const E=G(W);f[s]=E[0],f[s+1]=E[1],f[s+2]=E[2]}const l=n.map(s=>Y(h,s)),r=new Float32Array(15),m=new Float32Array(20);for(let s=0;s<3;s++)r[s*3]=l[s][0],r[s*3+1]=l[s][1],r[s*3+2]=l[s][2];const A=G(l[0]),g=G(l[1]);r[9]=A[0],r[10]=A[1],r[11]=A[2],r[12]=g[0],r[13]=g[1],r[14]=g[2],m.set([.2,.9,.1,1,.9,.1,.2,1,.1,.2,.9,1,.2,.9,.1,1,.9,.1,.2,1]);const b=new Float32Array([g[0],g[1],g[2],0,1,0,A[0],A[1],A[2]]),S=J(200).map(s=>Y(h,s)),C=t.buffer(v.positions.flat()),P=t.elements(v.cells.flat()),y=t.buffer(p),u=t.buffer(f),d=t.buffer(S.flat()),x=t.buffer(r),V=t.buffer(m),M=t.buffer(b);let j=i.theta||.7,w=i.phi||.1,L=i.distance||5,F=!0;const N=[1,0,0,0,0,1,0,-1,0],Q=T(t),I=t({vert:`
      precision highp float;
      uniform mat4 projectionView;
      attribute vec3 position;
      void main() { gl_Position = projectionView * vec4(position, 1); }
    `,frag:`
      precision highp float;
      uniform vec4 color;
      void main() { gl_FragColor = color; }
    `,attributes:{position:t.prop("positions")},uniforms:{projectionView:t.prop("projectionView"),color:t.prop("color")},primitive:"line strip",count:t.prop("count"),depth:{enable:!0}});let z=null;c&&(z=c(t,{vert:`
        precision highp float;
        #pragma lines: attribute vec3 position;
        #pragma lines: position = getPosition(position);
        #pragma lines: width = getWidth();
        uniform mat4 projectionView;
        uniform float lineWidth;
        vec4 getPosition(vec3 p) { return projectionView * vec4(p, 1); }
        float getWidth() { return lineWidth; }
      `,frag:`
        precision highp float;
        uniform vec4 color;
        void main() { gl_FragColor = color; }
      `,uniforms:{projectionView:t.prop("projectionView"),color:t.prop("color"),lineWidth:(s,R)=>(R.lineWidth||2)*s.pixelRatio},depth:{enable:!0}}));const Z=t({vert:`
      precision highp float;
      uniform mat4 projectionView;
      uniform float pointSize, pixelRatio;
      attribute vec3 position;
      attribute vec4 color;
      varying vec4 vColor;
      void main() {
        vColor = color;
        gl_Position = projectionView * vec4(position, 1);
        gl_PointSize = pointSize * pixelRatio;
      }
    `,frag:`
      precision highp float;
      varying vec4 vColor;
      void main() {
        float r = length(gl_PointCoord * 2.0 - 1.0);
        if (r > 1.0) discard;
        vec3 c = r > 0.7 ? vec3(1) : vColor.rgb;
        gl_FragColor = vec4(c, vColor.a);
      }
    `,attributes:{position:t.prop("positions"),color:t.prop("colors")},uniforms:{projectionView:t.prop("projectionView"),pointSize:t.prop("pointSize"),pixelRatio:t.context("pixelRatio")},primitive:"points",count:t.prop("count"),depth:{enable:!0}}),B=o.length/3;return{get theta(){return j},get phi(){return w},get dirty(){return F},rotate(s,R){j+=s,w=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,w+R)),F=!0},taint(){F=!0},render(s,R){if(!F)return;F=!1;const W=s/R,E=K(Math.PI/5,W,.1,100),D=q(O(-w),U(-j));D[12]=0,D[13]=.15,D[14]=-L;const _=q(E,D);t.clear({color:[0,0,0,0],depth:1}),Q({projectionView:_,positions:{buffer:C,stride:12},elements:P,rotation:h,gridRotation:N,gridDensity:4}),I({projectionView:_,positions:d,count:201,color:[.6,.6,.6,1]}),z?z({projectionView:_,vertexCount:B,vertexAttributes:{position:{buffer:y,stride:12,offset:0}},color:[.18,.63,.83,1],lineWidth:1.7}):I({projectionView:_,positions:y,count:B,color:[.18,.63,.83,1]}),z?z({projectionView:_,vertexCount:B,vertexAttributes:{position:{buffer:u,stride:12,offset:0}},color:[.5,.5,.5,1],lineWidth:1.7}):I({projectionView:_,positions:u,count:B,color:[.5,.5,.5,1]}),I({projectionView:_,positions:M,count:3,color:[.5,.5,.5,1]}),Z({projectionView:_,positions:x,colors:V,count:5,pointSize:12})},destroy(){C.destroy(),P.destroy(),y.destroy(),u.destroy(),d.destroy(),x.destroy(),V.destroy(),M.destroy()}}}function rt(t,o,e,i,c={}){const v=document.createElement("div");v.style.display="flex",v.style.flexWrap="wrap",v.style.gap="20px",v.style.alignItems="flex-start";const{createJacobiCoordsFigure:n}=c.jacobiFigure,a=n(t,e,i,{width:Math.min(c.width||400,400),height:Math.min((c.width||400)*.7,280)}),h=document.createElement("figure");h.style.margin="0",h.appendChild(a.node);const p=document.createElement("figcaption");p.textContent="Jacobi coordinates. Drag the masses to see the effect in shape space.",h.appendChild(p),v.appendChild(h);const f=Math.min(c.width||400,400),l=Math.floor(f*.7),r=document.createElement("canvas");r.width=f*devicePixelRatio,r.height=l*devicePixelRatio,r.style.width=`${f}px`,r.style.height=`${l}px`;const m=document.createElement("figure");m.style.margin="0",m.appendChild(r);const A=document.createElement("figcaption");A.textContent="Shape sphere with collision points marked.",m.appendChild(A),v.appendChild(m);const g=o({canvas:r,attributes:{antialias:!0}}),b=tt(g,{theta:.7,phi:.3});b.setPunctures(e.m),b.setShape(a.getShape()),b.render(f,l),a.addEventListener("input",()=>{b.setShape(a.getShape()),b.render(f,l)});let S=!1,C=0,P=0;return r.addEventListener("mousedown",y=>{S=!0,C=y.clientX,P=y.clientY,r.style.cursor="grabbing"}),window.addEventListener("mousemove",y=>{if(!S)return;const u=y.clientX-C,d=y.clientY-P;b.rotate(u*.01,d*.01),b.render(f,l),C=y.clientX,P=y.clientY}),window.addEventListener("mouseup",()=>{S=!1,r.style.cursor="grab"}),r.style.cursor="grab",{element:v,jacobiFigure:a,shapeSphere:b,destroy(){b.destroy(),g.destroy()}}}export{T as createDrawGlobeCommand,J as createEquator,H as createIcosphere,rt as createLinkedJacobiShapeSphere,nt as createOrbitShapeSphere,tt as createShapeSphere,X as getCollisionPoints,G as stereographicProject};
