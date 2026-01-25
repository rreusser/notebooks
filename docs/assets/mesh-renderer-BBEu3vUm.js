function R(i,o){const e=B(i,o),n=A(i),a=S(i),t=i.buffer({usage:"dynamic",data:new Float32Array(65536)}),r=i.buffer({usage:"dynamic",data:new Float32Array(65536)}),c=i.buffer({usage:"dynamic",data:new Float32Array(65536)}),l=i.buffer({usage:"dynamic",data:new Float32Array(65536)}),s=i.buffer(new Uint16Array(Array.from({length:65536},(f,u)=>u)));return{render(f,u,d={}){const{pointSize:g=3,strainColoring:h=1.5,selectedVertexIndex:v=-1,hoverVertexIndex:p=-1,showFaces:y=!0,faceOpacity:m=.3,depthFalloff:C=!1,depthFalloffWidth:b=7,focusCenter:D=[0,0,0]}=d,F={depthFalloff:C?1:0,depthFalloffWidth:b,focusCenter:D};t.subdata(f.positions.subarray(0,f.vertexCount*3));const w=I(f);if(r.subdata(w),y){const{triangleData:P,edgeCounts:_,triangleCount:x}=W(f);x>0&&(c.subdata(P),l.subdata(_),a({faceBuffer:c,faceEdgeCountBuffer:l,count:x,faceOpacity:m,...F}))}n({vertexBuffer:r,count:f.edgeCount,strainColoring:h,l0:u.l0,...F}),e({vertexBuffer:t,indexBuffer:s,count:f.vertexCount,pointSize:g,selectedIndex:v,hoverIndex:p,...F})},destroy(){t.destroy(),r.destroy(),c.destroy(),l.destroy(),s.destroy()}}}function W(i){const o=i.extractFaces();if(o.length===0)return{triangleData:new Float32Array(0),edgeCounts:new Float32Array(0),triangleCount:0};let e=0;for(const l of o)l.length>=3&&(e+=l.length-2);const n=new Float32Array(e*9),a=new Float32Array(e*3),t=i.positions;let r=0,c=0;for(const l of o){if(l.length<3)continue;const s=l.length,u=l[0]*3;for(let d=1;d<l.length-1;d++){const g=l[d],h=l[d+1],v=g*3,p=h*3;n[r++]=t[u],n[r++]=t[u+1],n[r++]=t[u+2],n[r++]=t[v],n[r++]=t[v+1],n[r++]=t[v+2],n[r++]=t[p],n[r++]=t[p+1],n[r++]=t[p+2],a[c++]=s,a[c++]=s,a[c++]=s}}return{triangleData:n,edgeCounts:a,triangleCount:e}}function I(i){const o=new Float32Array(i.edgeCount*6),e=i.positions,n=i.edges;for(let a=0,t=0;a<i.edgeCount;a++,t+=6){const r=a*2,c=n[r],l=n[r+1],s=c*3,f=l*3;o[t]=e[s],o[t+1]=e[s+1],o[t+2]=e[s+2],o[t+3]=e[f],o[t+4]=e[f+1],o[t+5]=e[f+2]}return o}function S(i){return i({vert:`
      precision highp float;
      attribute vec3 position;
      attribute float edgeCount;
      uniform mat4 projectionView;
      uniform vec3 uFocusCenter;
      varying float vEdgeCount;
      varying float vRadialDist;

      void main() {
        vEdgeCount = edgeCount;
        vRadialDist = length(position - uFocusCenter);
        gl_Position = projectionView * vec4(position, 1);
      }
    `,frag:`
      precision highp float;
      uniform float opacity;
      uniform float uDepthFalloff, uDepthFalloffWidth, uMinOpacity;
      varying float vEdgeCount;
      varying float vRadialDist;

      // Color faces by edge count using distinct colors
      vec3 getFaceColor(float edges) {
        if (edges < 3.5) return vec3(1.0, 1.0, 0.5);       // Triangle: green
        if (edges < 4.5) return vec3(1.0, 0.6, 0.2);       // Quad: orange
        if (edges < 5.5) return vec3(0.2, 0.2, 1.0);       // Pentagon: blue
        if (edges < 6.5) return vec3(0.2, 0.8, 0.3);       // Hexagon: green
        if (edges < 7.5) return vec3(1.0, 0.3, 0.3);       // Heptagon: red
        return vec3(0.6, 0.2, 0.8);                         // Octagon+: purple
      }

      float depthFalloffFactor() {
        if (uDepthFalloff < 0.5) return 1.0;
        return mix(uMinOpacity, 1.0, 1.0 - smoothstep(0.5 * uDepthFalloffWidth, uDepthFalloffWidth, vRadialDist));
      }

      void main() {
        vec3 color = getFaceColor(vEdgeCount);
        float falloff = depthFalloffFactor();
        // For reverse subtract (dst - src): output what to subtract from white
        // Subtracting (1 - color) * opacity tints toward the face color
        gl_FragColor = vec4(1.0 - color, opacity * falloff);
      }
    `,attributes:{position:(o,e)=>({buffer:e.faceBuffer,offset:0,stride:12}),edgeCount:(o,e)=>({buffer:e.faceEdgeCountBuffer,offset:0,stride:4})},uniforms:{opacity:(o,e)=>e.faceOpacity??.3,uDepthFalloff:(o,e)=>e.depthFalloff??0,uFocusCenter:(o,e)=>e.focusCenter??[0,0,0],uDepthFalloffWidth:(o,e)=>e.depthFalloffWidth??3,uMinOpacity:(o,e)=>e.minOpacity??.1},blend:{enable:!0,equation:{rgb:"reverse subtract",alpha:"add"},func:{srcRGB:"src alpha",srcAlpha:"src alpha",dstRGB:"one",dstAlpha:"one"}},depth:{enable:!0,mask:!1},cull:{enable:!1},primitive:"triangles",count:(o,e)=>e.count*3})}function B(i,o){const e=i.buffer(o.positions),n=i.elements(o.cells);return i({vert:`
      precision highp float;
      attribute vec3 icoPosition;
      attribute vec3 vertex;
      attribute float index;
      uniform mat4 projectionView;
      uniform vec3 uFocusCenter;
      uniform float pointSize;
      uniform float selectedIndex, hoverIndex;
      varying float vIsSelected, vIsHover;
      varying float vRadialDist;

      void main() {
        vIsSelected = index == selectedIndex ? 1.0 : 0.0;
        vIsHover = index == hoverIndex ? 1.0 : 0.0;
        vRadialDist = length(vertex - uFocusCenter);
        vec4 p0 = projectionView * vec4(vertex, 1);
        float size = p0.z * pointSize;
        gl_Position = projectionView * vec4(vertex + icoPosition * size, 1);
      }
    `,frag:`
      precision highp float;
      uniform float uDepthFalloff, uDepthFalloffWidth, uMinOpacity;
      varying float vIsSelected, vIsHover;
      varying float vRadialDist;

      float depthFalloffFactor() {
        if (uDepthFalloff < 0.5) return 1.0;
        return mix(uMinOpacity, 1.0, 1.0 - smoothstep(0.5 * uDepthFalloffWidth, uDepthFalloffWidth, vRadialDist));
      }

      void main() {
        vec3 baseColor = vec3(0.14, 0.37, 0.69);
        vec3 hoverAdd = vec3(0.0, 0.5, 0.0);
        vec3 selectAdd = vec3(1.0, 0.0, 0.0);
        vec3 color = baseColor + vIsHover * hoverAdd + vIsSelected * selectAdd;
        // Highlighted vertices (selected or hovered) always show at full opacity
        float isHighlighted = max(vIsSelected, vIsHover);
        float falloff = mix(depthFalloffFactor(), 1.0, isHighlighted);
        // Fade toward white (background) based on radial distance
        color = mix(vec3(1.0), color, falloff);
        gl_FragColor = vec4(color, 1.0);
      }
    `,attributes:{icoPosition:e,vertex:(a,t)=>({buffer:t.vertexBuffer,divisor:1}),index:(a,t)=>({buffer:t.indexBuffer,divisor:1})},elements:n,cull:{enable:!0,face:"back"},uniforms:{pointSize:(a,t)=>a.pixelRatio*t.pointSize/a.viewportHeight,selectedIndex:(a,t)=>t.selectedIndex,hoverIndex:(a,t)=>t.hoverIndex,uDepthFalloff:(a,t)=>t.depthFalloff??0,uFocusCenter:(a,t)=>t.focusCenter??[0,0,0],uDepthFalloffWidth:(a,t)=>t.depthFalloffWidth??3,uMinOpacity:(a,t)=>t.minOpacity??.2},primitive:"triangles",count:o.cells.length*3,instances:(a,t)=>t.count})}function A(i){return i({vert:`
      precision highp float;

      uniform mat4 projectionView;
      uniform vec3 uFocusCenter;
      uniform float uAspect, uScaleFactor, uPixelRatio, uL0, uStrainColoring;
      uniform float uBorderWidth, uLineWidth;
      attribute vec3 aPosition, aNextPosition;
      attribute vec2 aLinePosition;

      varying float vOffset;
      varying vec2 vStrokeEdges;
      varying vec3 vColor;
      varying float vRadialDist;

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

        // Compute radial distance at the midpoint of the edge
        vec3 midpoint = mix(aPosition, aNextPosition, 0.5);
        vRadialDist = length(midpoint - uFocusCenter);

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
      uniform float uDepthFalloff, uDepthFalloffWidth, uMinOpacity;
      varying float vOffset;
      varying vec3 vColor;
      varying vec2 vStrokeEdges;
      varying float vRadialDist;

      float depthFalloffFactor() {
        if (uDepthFalloff < 0.5) return 1.0;
        return mix(uMinOpacity, 1.0, 1.0 - smoothstep(0.5 * uDepthFalloffWidth, uDepthFalloffWidth, vRadialDist));
      }

      void main() {
        float falloff = depthFalloffFactor();

        float t = smoothstep(vStrokeEdges.y, vStrokeEdges.x, vOffset) *
                  smoothstep(-vStrokeEdges.y, -vStrokeEdges.x, vOffset);
        vec3 color = mix(uBorderColor.rgb, vColor, t);
        float alpha = mix(uBorderColor.a, 1.0, t) * falloff;
        gl_FragColor = vec4(color, alpha);
      }
    `,blend:{enable:!0,func:{srcRGB:"src alpha",srcAlpha:"one",dstRGB:"one minus src alpha",dstAlpha:"one"}},polygonOffset:{enable:!0,offset:{factor:2,units:2}},attributes:{aLinePosition:[[-1,0],[1,0],[-1,1],[1,1]],aPosition:(o,e)=>({buffer:e.vertexBuffer,offset:0,stride:24,divisor:1}),aNextPosition:(o,e)=>({buffer:e.vertexBuffer,offset:12,stride:24,divisor:1})},elements:[[0,1,2],[1,3,2]],uniforms:{uL0:(o,e)=>e.l0??1,uStrainColoring:(o,e)=>e.strainColoring??0,uBorderColor:[1,1,1,.8],uLineWidth:2,uBorderWidth:1,uAspect:o=>o.viewportWidth/o.viewportHeight,uScaleFactor:o=>o.pixelRatio/o.viewportHeight,uPixelRatio:i.context("pixelRatio"),uDepthFalloff:(o,e)=>e.depthFalloff??0,uFocusCenter:(o,e)=>e.focusCenter??[0,0,0],uDepthFalloffWidth:(o,e)=>e.depthFalloffWidth??3,uMinOpacity:.2},primitive:"triangles",instances:(o,e)=>e.count,count:6})}export{R as createMeshRenderer,R as default};
