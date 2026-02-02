function A(r,i){const e=E(r,i),o=R(r),a=H(r),t=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),n=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),f=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),l=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),c=r.buffer(new Uint16Array(Array.from({length:65536},(s,d)=>d)));return{render(s,d,u={}){const{pointSize:g=3,strainColoring:p=1.5,selectedVertexIndex:v=-1,hoverVertexIndex:h=-1,selectedEdgeIndex:C=-1,hoverEdgeIndex:y=-1,showFaces:m=!0,faceOpacity:b=.3,depthFalloff:I=!1,depthFalloffWidth:w=7,focusCenter:D=[0,0,0]}=u,x={depthFalloff:I?1:0,depthFalloffWidth:w,focusCenter:D};t.subdata(s.positions.subarray(0,s.vertexCount*3));const P=B(s);if(n.subdata(P),m){const{triangleData:_,edgeCounts:S,triangleCount:F}=W(s);F>0&&(f.subdata(_),l.subdata(S),a({faceBuffer:f,faceEdgeCountBuffer:l,count:F,faceOpacity:b,...x}))}o({vertexBuffer:n,count:s.edgeCount,strainColoring:p,l0:d.l0,selectedIndex:C,hoverIndex:y,...x}),e({vertexBuffer:t,indexBuffer:c,count:s.vertexCount,pointSize:g,selectedIndex:v,hoverIndex:h,...x})},destroy(){t.destroy(),n.destroy(),f.destroy(),l.destroy(),c.destroy()}}}function W(r){const i=r.extractFaces();if(i.length===0)return{triangleData:new Float32Array(0),edgeCounts:new Float32Array(0),triangleCount:0};let e=0;for(const l of i)l.length>=3&&(e+=l.length-2);const o=new Float32Array(e*9),a=new Float32Array(e*3),t=r.positions;let n=0,f=0;for(const l of i){if(l.length<3)continue;const c=l.length,d=l[0]*3;for(let u=1;u<l.length-1;u++){const g=l[u],p=l[u+1],v=g*3,h=p*3;o[n++]=t[d],o[n++]=t[d+1],o[n++]=t[d+2],o[n++]=t[v],o[n++]=t[v+1],o[n++]=t[v+2],o[n++]=t[h],o[n++]=t[h+1],o[n++]=t[h+2],a[f++]=c,a[f++]=c,a[f++]=c}}return{triangleData:o,edgeCounts:a,triangleCount:e}}function B(r){const i=new Float32Array(r.edgeCount*6),e=r.positions,o=r.edges;for(let a=0,t=0;a<r.edgeCount;a++,t+=6){const n=a*2,f=o[n],l=o[n+1],c=f*3,s=l*3;i[t]=e[c],i[t+1]=e[c+1],i[t+2]=e[c+2],i[t+3]=e[s],i[t+4]=e[s+1],i[t+5]=e[s+2]}return i}function H(r){return r({vert:`
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
    `,attributes:{position:(i,e)=>({buffer:e.faceBuffer,offset:0,stride:12}),edgeCount:(i,e)=>({buffer:e.faceEdgeCountBuffer,offset:0,stride:4})},uniforms:{opacity:(i,e)=>e.faceOpacity??.3,uDepthFalloff:(i,e)=>e.depthFalloff??0,uFocusCenter:(i,e)=>e.focusCenter??[0,0,0],uDepthFalloffWidth:(i,e)=>e.depthFalloffWidth??3,uMinOpacity:(i,e)=>e.minOpacity??.1},blend:{enable:!0,equation:{rgb:"reverse subtract",alpha:"add"},func:{srcRGB:"src alpha",srcAlpha:"src alpha",dstRGB:"one",dstAlpha:"one"}},depth:{enable:!0,mask:!1},cull:{enable:!1},primitive:"triangles",count:(i,e)=>e.count*3})}function E(r,i){const e=r.buffer(i.positions),o=r.elements(i.cells);return r({vert:`
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
        vec3 hoverColor = vec3(0.0, 0.5, 0.0);
        vec3 selectColor = vec3(1.0, 0.0, 0.0);
        // Highlighted vertices (selected or hovered) always show at full opacity
        float isHighlighted = max(vIsSelected, vIsHover);
        // Use select color if selected, hover color if hovered, base color otherwise
        vec3 highlightColor = mix(hoverColor, selectColor, vIsSelected);
        vec3 color = mix(baseColor, highlightColor, isHighlighted);
        float falloff = mix(depthFalloffFactor(), 1.0, isHighlighted);
        // Fade toward white (background) based on radial distance
        color = mix(vec3(1.0), color, falloff);
        gl_FragColor = vec4(color, 1.0);
      }
    `,attributes:{icoPosition:e,vertex:(a,t)=>({buffer:t.vertexBuffer,divisor:1}),index:(a,t)=>({buffer:t.indexBuffer,divisor:1})},elements:o,cull:{enable:!0,face:"back"},uniforms:{pointSize:(a,t)=>a.pixelRatio*t.pointSize/a.viewportHeight,selectedIndex:(a,t)=>t.selectedIndex,hoverIndex:(a,t)=>t.hoverIndex,uDepthFalloff:(a,t)=>t.depthFalloff??0,uFocusCenter:(a,t)=>t.focusCenter??[0,0,0],uDepthFalloffWidth:(a,t)=>t.depthFalloffWidth??3,uMinOpacity:(a,t)=>t.minOpacity??.2},primitive:"triangles",count:i.cells.length*3,instances:(a,t)=>t.count})}function R(r){const i=r.buffer({usage:"dynamic",data:new Float32Array(65536)});return r({vert:`
      precision highp float;

      uniform mat4 projectionView;
      uniform vec3 uFocusCenter;
      uniform float uAspect, uScaleFactor, uPixelRatio, uL0, uStrainColoring;
      uniform float uBorderWidth, uLineWidth;
      uniform float uSelectedIndex, uHoverIndex;
      attribute vec3 aPosition, aNextPosition;
      attribute vec2 aLinePosition;
      attribute float aEdgeIndex;

      varying float vOffset;
      varying vec2 vStrokeEdges;
      varying vec3 vColor;
      varying float vRadialDist;
      varying float vIsSelected, vIsHover;

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
        vIsSelected = aEdgeIndex == uSelectedIndex ? 1.0 : 0.0;
        vIsHover = aEdgeIndex == uHoverIndex ? 1.0 : 0.0;

        vec4 currentPoint = projectionView * vec4(aPosition, 1);
        vec4 nextPoint = projectionView * vec4(aNextPosition, 1);

        // Compute radial distance at the midpoint of the edge
        vec3 midpoint = mix(aPosition, aNextPosition, 0.5);
        vRadialDist = length(midpoint - uFocusCenter);

        float strain = (length(aNextPosition - aPosition) / uL0 - 1.0);
        vColor = colormap(0.5 + strain * uStrainColoring * 2.0) * 0.8 * (uStrainColoring > 0.0 ? 1.0 : 0.0);

        // Increase width for selected/hovered edges
        float widthMultiplier = 1.0 + vIsSelected * 0.5 + vIsHover * 0.25;
        float totalWidth = (uLineWidth + uBorderWidth * 2.0) * widthMultiplier;

        gl_Position = mix(currentPoint, nextPoint, aLinePosition.y);

        vec2 vn = lineNormal(currentPoint, nextPoint, uAspect);
        gl_Position.xy += vn / vec2(-uAspect, 1) * aLinePosition.x * totalWidth * gl_Position.w * uScaleFactor;

        vOffset = aLinePosition.x * totalWidth;
        vStrokeEdges = uBorderWidth < 1e-3 ? vec2(-100, -101) : (uLineWidth * widthMultiplier + vec2(-1, 1) / uPixelRatio);
      }
    `,frag:`
      precision highp float;

      uniform vec4 uBorderColor;
      uniform float uDepthFalloff, uDepthFalloffWidth, uMinOpacity;
      varying float vOffset;
      varying vec3 vColor;
      varying vec2 vStrokeEdges;
      varying float vRadialDist;
      varying float vIsSelected, vIsHover;

      float depthFalloffFactor() {
        if (uDepthFalloff < 0.5) return 1.0;
        return mix(uMinOpacity, 1.0, 1.0 - smoothstep(0.5 * uDepthFalloffWidth, uDepthFalloffWidth, vRadialDist));
      }

      void main() {
        // Highlighted edges (selected or hovered) always show at full opacity
        float isHighlighted = max(vIsSelected, vIsHover);
        float falloff = mix(depthFalloffFactor(), 1.0, isHighlighted);

        float t = smoothstep(vStrokeEdges.y, vStrokeEdges.x, vOffset) *
                  smoothstep(-vStrokeEdges.y, -vStrokeEdges.x, vOffset);

        // Color selected edges red, hovered edges green
        vec3 selectColor = vec3(1.0, 0.0, 0.0);
        vec3 hoverColor = vec3(0.0, 0.5, 0.0);
        vec3 baseColor = vColor;
        vec3 highlightColor = mix(hoverColor, selectColor, vIsSelected);
        vec3 innerColor = mix(baseColor, highlightColor, isHighlighted);

        vec3 color = mix(uBorderColor.rgb, innerColor, t);
        float alpha = mix(uBorderColor.a, 1.0, t) * falloff;
        gl_FragColor = vec4(color, alpha);
      }
    `,blend:{enable:!0,func:{srcRGB:"src alpha",srcAlpha:"one",dstRGB:"one minus src alpha",dstAlpha:"one"}},polygonOffset:{enable:!0,offset:{factor:2,units:2}},attributes:{aLinePosition:[[-1,0],[1,0],[-1,1],[1,1]],aPosition:(e,o)=>({buffer:o.vertexBuffer,offset:0,stride:24,divisor:1}),aNextPosition:(e,o)=>({buffer:o.vertexBuffer,offset:12,stride:24,divisor:1}),aEdgeIndex:(e,o)=>{const a=new Float32Array(o.count);for(let t=0;t<o.count;t++)a[t]=t;return i.subdata(a),{buffer:i,divisor:1}}},elements:[[0,1,2],[1,3,2]],uniforms:{uL0:(e,o)=>o.l0??1,uStrainColoring:(e,o)=>o.strainColoring??0,uBorderColor:[1,1,1,.8],uLineWidth:2,uBorderWidth:1,uAspect:e=>e.viewportWidth/e.viewportHeight,uScaleFactor:e=>e.pixelRatio/e.viewportHeight,uPixelRatio:r.context("pixelRatio"),uDepthFalloff:(e,o)=>o.depthFalloff??0,uFocusCenter:(e,o)=>o.focusCenter??[0,0,0],uDepthFalloffWidth:(e,o)=>o.depthFalloffWidth??3,uMinOpacity:.2,uSelectedIndex:(e,o)=>o.selectedIndex??-1,uHoverIndex:(e,o)=>o.hoverIndex??-1},primitive:"triangles",instances:(e,o)=>o.count,count:6})}export{A as createMeshRenderer,A as default};
