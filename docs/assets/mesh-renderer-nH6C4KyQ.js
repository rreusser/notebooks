function E(r,t){const e=A(r,t),n=B(r),i=F(r),o=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),a=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),l=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),s=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),u=r.buffer(new Uint16Array(Array.from({length:65536},(c,f)=>f)));return{render(c,f,d={}){const{pointSize:p=3,lineWidth:x=1,borderWidth:v=1,strainColoring:g=1.5,selectedVertexIndex:y=-1,hoverVertexIndex:b=-1,showFaces:C=!0,faceOpacity:w=.3}=d;o.subdata(c.positions.subarray(0,c.vertexCount*3));const m=S(c);if(a.subdata(m),n({vertexBuffer:a,count:c.edgeCount,lineWidth:x,borderWidth:v,borderColor:[1,1,1,1],strainColoring:g,l0:f.l0}),e({vertexBuffer:o,indexBuffer:u,count:c.vertexCount,pointSize:p,selectedIndex:y,hoverIndex:b}),C){const{triangleData:P,edgeCounts:_,triangleCount:h}=I(c);h>0&&(l.subdata(P),s.subdata(_),i({faceBuffer:l,faceEdgeCountBuffer:s,count:h,opacity:w}))}},destroy(){o.destroy(),a.destroy(),l.destroy(),s.destroy(),u.destroy()}}}function I(r){const t=r.extractFaces();if(t.length===0)return{triangleData:new Float32Array(0),edgeCounts:new Float32Array(0),triangleCount:0};let e=0;for(const s of t)s.length>=3&&(e+=s.length-2);const n=new Float32Array(e*9),i=new Float32Array(e*3),o=r.positions;let a=0,l=0;for(const s of t){if(s.length<3)continue;const u=s.length,f=s[0]*3;for(let d=1;d<s.length-1;d++){const p=s[d],x=s[d+1],v=p*3,g=x*3;n[a++]=o[f],n[a++]=o[f+1],n[a++]=o[f+2],n[a++]=o[v],n[a++]=o[v+1],n[a++]=o[v+2],n[a++]=o[g],n[a++]=o[g+1],n[a++]=o[g+2],i[l++]=u,i[l++]=u,i[l++]=u}}return{triangleData:n,edgeCounts:i,triangleCount:e}}function S(r){const t=new Float32Array(r.edgeCount*6),e=r.positions,n=r.edges;for(let i=0,o=0;i<r.edgeCount;i++,o+=6){const a=i*2,l=n[a],s=n[a+1],u=l*3,c=s*3;t[o]=e[u],t[o+1]=e[u+1],t[o+2]=e[u+2],t[o+3]=e[c],t[o+4]=e[c+1],t[o+5]=e[c+2]}return t}function F(r){return r({vert:`
      precision highp float;
      attribute vec3 position;
      attribute float edgeCount;
      uniform mat4 projectionView;
      varying float vEdgeCount;

      void main() {
        vEdgeCount = edgeCount;
        gl_Position = projectionView * vec4(position, 1);
      }
    `,frag:`
      precision highp float;
      uniform float opacity;
      varying float vEdgeCount;

      // Color faces by edge count using distinct colors
      vec3 getFaceColor(float edges) {
        if (edges < 3.5) return vec3(1.0, 0.2, 0.2);       // Triangle: red
        if (edges < 4.5) return vec3(1.0, 0.6, 0.2);       // Quad: orange
        if (edges < 5.5) return vec3(0.2, 0.2, 1.0);       // Pentagon: blue
        if (edges < 6.5) return vec3(0.2, 0.8, 0.3);       // Hexagon: green
        if (edges < 7.5) return vec3(1.0, 1.0, 0.5);       // Heptagon: yellow
        return vec3(0.6, 0.2, 0.8);                         // Octagon+: purple
      }

      void main() {
        vec3 color = getFaceColor(vEdgeCount);
        // For reverse subtract (dst - src): output what to subtract from white
        // Subtracting (1 - color) * opacity tints toward the face color
        gl_FragColor = vec4(1.0 - color, opacity);
      }
    `,attributes:{position:(t,e)=>({buffer:e.faceBuffer,offset:0,stride:12}),edgeCount:(t,e)=>({buffer:e.faceEdgeCountBuffer,offset:0,stride:4})},uniforms:{opacity:(t,e)=>e.opacity??.3},blend:{enable:!0,equation:{rgb:"reverse subtract",alpha:"add"},func:{srcRGB:"src alpha",srcAlpha:"src alpha",dstRGB:"one",dstAlpha:"one"}},depth:{enable:!0,mask:!1},cull:{enable:!1},primitive:"triangles",count:(t,e)=>e.count*3})}function A(r,t){const e=r.buffer(t.positions),n=r.elements(t.cells);return r({vert:`
      precision highp float;
      attribute vec3 icoPosition;
      attribute vec3 vertex;
      attribute float index;
      uniform mat4 projectionView;
      uniform float pointSize;
      uniform float selectedIndex, hoverIndex;
      varying float vIsSelected, vIsHover;

      void main() {
        vIsSelected = index == selectedIndex ? 1.0 : 0.0;
        vIsHover = index == hoverIndex ? 1.0 : 0.0;
        vec4 p0 = projectionView * vec4(vertex, 1);
        float size = p0.z * pointSize;
        gl_Position = projectionView * vec4(vertex + icoPosition * size, 1);
      }
    `,frag:`
      precision highp float;
      varying float vIsSelected, vIsHover;

      void main() {
        vec3 baseColor = vec3(0.14, 0.37, 0.69);
        vec3 hoverAdd = vec3(0.0, 0.5, 0.0);
        vec3 selectAdd = vec3(1.0, 0.0, 0.0);
        gl_FragColor = vec4(baseColor + vIsHover * hoverAdd + vIsSelected * selectAdd, 1.0);
      }
    `,attributes:{icoPosition:e,vertex:(i,o)=>({buffer:o.vertexBuffer,divisor:1}),index:(i,o)=>({buffer:o.indexBuffer,divisor:1})},elements:n,cull:{enable:!0,face:"back"},uniforms:{pointSize:(i,o)=>i.pixelRatio*o.pointSize/i.viewportHeight,selectedIndex:(i,o)=>o.selectedIndex,hoverIndex:(i,o)=>o.hoverIndex},primitive:"triangles",count:t.cells.length*3,instances:(i,o)=>o.count})}function B(r){return r({vert:`
      precision highp float;

      uniform mat4 projectionView;
      uniform float uAspect, uScaleFactor, uPixelRatio, uL0, uStrainColoring;
      uniform float uBorderWidth, uLineWidth;
      attribute vec3 aPosition, aNextPosition;
      attribute vec2 aLinePosition;

      varying float vOffset;
      varying vec2 vStrokeEdges;
      varying vec3 vColor;

      vec2 lineNormal(vec4 p, vec4 n, float aspect) {
        return normalize((p.yx / p.w - n.yx / n.w) * vec2(1, aspect));
      }

      const float PI = 3.14159265359;

      vec3 colormap(float x) {
        float cx = clamp(x, 0.0, 1.0);
        return vec3(
          cos(PI * cx),
          cos(PI * (cx - 0.5)),
          cos(PI * (cx - 1.0))
        );
      }

      void main() {
        vec4 currentPoint = projectionView * vec4(aPosition, 1);
        vec4 nextPoint = projectionView * vec4(aNextPosition, 1);

        float strain = (length(aNextPosition - aPosition) / uL0 - 1.0);
        vColor = colormap(0.5 + strain * uStrainColoring * 2.0) * 0.8 * (uStrainColoring > 0.0 ? 1.0 : 0.0);

        float totalWidth = uLineWidth + uBorderWidth * 2.0;

        gl_Position = mix(currentPoint, nextPoint, aLinePosition.y);

        vec2 vn = lineNormal(currentPoint, nextPoint, uAspect);
        gl_Position.xy += vn / vec2(-uAspect, 1) * aLinePosition.x * totalWidth * gl_Position.w * uScaleFactor;

        vOffset = aLinePosition.x * totalWidth;
        vStrokeEdges = uBorderWidth < 1e-3 ? vec2(-100, -101) : (uLineWidth + vec2(-1, 1) / uPixelRatio);
      }
    `,frag:`
      precision highp float;

      uniform vec4 uBorderColor;
      varying float vOffset;
      varying vec3 vColor;
      varying vec2 vStrokeEdges;

      void main() {
        gl_FragColor = mix(
          uBorderColor,
          vec4(vColor, 1),
          smoothstep(vStrokeEdges.y, vStrokeEdges.x, vOffset) *
          smoothstep(-vStrokeEdges.y, -vStrokeEdges.x, vOffset)
        );
      }
    `,polygonOffset:{enable:!0,offset:{factor:2,units:2}},attributes:{aLinePosition:[[-1,0],[1,0],[-1,1],[1,1]],aPosition:(t,e)=>({buffer:e.vertexBuffer,offset:0,stride:24,divisor:1}),aNextPosition:(t,e)=>({buffer:e.vertexBuffer,offset:12,stride:24,divisor:1})},elements:[[0,1,2],[1,3,2]],uniforms:{uL0:(t,e)=>e.l0??1,uStrainColoring:(t,e)=>e.strainColoring??0,uBorderColor:(t,e)=>e.borderColor??[1,1,1,1],uLineWidth:(t,e)=>e.lineWidth??2,uBorderWidth:(t,e)=>e.borderWidth??2,uAspect:t=>t.viewportWidth/t.viewportHeight,uScaleFactor:t=>t.pixelRatio/t.viewportHeight,uPixelRatio:r.context("pixelRatio")},primitive:"triangles",instances:(t,e)=>e.count,count:6})}export{E as createMeshRenderer,E as default};
