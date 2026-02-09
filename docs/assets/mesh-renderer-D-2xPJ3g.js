const C=new WeakMap;function L(r){let l=C.get(r);if(l&&l.vertexCount===r.vertexCount&&l.edgeCount===r.edgeCount)return l;const o=r.extractFaces();let e=0;for(const c of o)c.length>=3&&(e+=c.length-2);const i=new Uint32Array(e*3),t=new Float32Array(e*3);let n=0;for(const c of o){if(c.length<3)continue;const u=c.length,v=c[0];for(let f=1;f<c.length-1;f++){const s=n*3;i[s]=v,i[s+1]=c[f],i[s+2]=c[f+1],t[s]=u,t[s+1]=u,t[s+2]=u,n++}}const a=new Float32Array(e*9),d=new Float32Array(e*9);return l={vertexCount:r.vertexCount,edgeCount:r.edgeCount,triangleCount:e,triangleVertexIndices:i,triangleEdgeCounts:t,triangleData:a,normalData:d},C.set(r,l),l}function M(r,l){const{triangleVertexIndices:o,triangleData:e,normalData:i,triangleCount:t}=l,n=r.positions,a=r.computeVertexNormals();for(let d=0;d<t;d++){const c=d*3,u=d*9;for(let v=0;v<3;v++){const s=o[c+v]*3,g=u+v*3;e[g]=n[s],e[g+1]=n[s+1],e[g+2]=n[s+2],i[g]=a[s],i[g+1]=a[s+1],i[g+2]=a[s+2]}}return{triangleData:e,normalData:i,edgeCounts:l.triangleEdgeCounts,triangleCount:t}}function T(r,l,o=null){const e=q(r,l),i=j(r),t=z(r,o),n=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),a=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),d=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),c=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),u=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),v=r.buffer(new Uint16Array(Array.from({length:65536},(f,s)=>s)));return{render(f,s,g={}){const{pointSize:y=3,edgeWidth:p=2,strainColoring:b=1.5,selectedVertexIndex:F=-1,hoverVertexIndex:w=-1,selectedEdgeIndex:I=-1,hoverEdgeIndex:P=-1,showFaces:S=!0,faceOpacity:_=.3,faceShading:m=!1,cameraPosition:D=[0,0,20],viewMatrix:H=null,depthFalloff:B=!1,depthFalloffWidth:W=7,focusCenter:E=[0,0,0]}=g,h={depthFalloff:B?1:0,depthFalloffWidth:W,focusCenter:E};n.subdata(f.positions.subarray(0,f.vertexCount*3));const R=k(f);if(a.subdata(R),S){const x=L(f);if(x.triangleCount>0){const{triangleData:A,normalData:O,edgeCounts:V,triangleCount:N}=M(f,x);d.subdata(A),c.subdata(O),u.subdata(V),t({faceBuffer:d,faceNormalBuffer:c,faceEdgeCountBuffer:u,count:N,faceOpacity:_,faceShading:m,cameraPosition:D,viewMatrix:H,...h})}}p>0&&i({vertexBuffer:a,count:f.edgeCount,edgeWidth:p,strainColoring:b,l0:s.l0,selectedIndex:I,hoverIndex:P,faceShading:m,...h}),e({vertexBuffer:n,indexBuffer:v,count:f.vertexCount,pointSize:y,selectedIndex:F,hoverIndex:w,...h})},destroy(){n.destroy(),a.destroy(),d.destroy(),c.destroy(),u.destroy(),v.destroy()}}}function k(r){const l=new Float32Array(r.edgeCount*6),o=r.positions,e=r.edges;for(let i=0,t=0;i<r.edgeCount;i++,t+=6){const n=i*2,a=e[n],d=e[n+1],c=a*3,u=d*3;l[t]=o[c],l[t+1]=o[c+1],l[t+2]=o[c+2],l[t+3]=o[u],l[t+4]=o[u+1],l[t+5]=o[u+2]}return l}function z(r,l){const o=`
    precision highp float;
    attribute vec3 position;
    attribute vec3 normal;
    attribute float edgeCount;
    uniform mat4 projectionView;
    uniform vec3 uFocusCenter;
    varying float vEdgeCount;
    varying float vRadialDist;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vEdgeCount = edgeCount;
      vRadialDist = length(position - uFocusCenter);
      vNormal = normal;
      vPosition = position;
      gl_Position = projectionView * vec4(position, 1);
    }
  `,e={position:(n,a)=>({buffer:a.faceBuffer,offset:0,stride:12}),normal:(n,a)=>({buffer:a.faceNormalBuffer,offset:0,stride:12}),edgeCount:(n,a)=>({buffer:a.faceEdgeCountBuffer,offset:0,stride:4})},i=r({vert:o,frag:`
      precision highp float;
      uniform float opacity;
      uniform float uDepthFalloff, uDepthFalloffWidth, uMinOpacity;
      varying float vEdgeCount;
      varying float vRadialDist;


      vec3 getFaceColor(float edges) {
        if (edges < 3.5) return vec3(1.0, 0.65, 0.25);     // Triangle: bright yellow
        if (edges < 4.5) return vec3(1.0, 0.7, 0.45);      // Quad: tangerine
        if (edges < 5.5) return vec3(0.45, 0.75, 1.0);     // Pentagon: candy blue
        if (edges < 6.5) return vec3(1.0, 0.75, 0.35);     // Hexagon: bright orange
        if (edges < 7.5) return vec3(1.0, 0.5, 0.55);      // Heptagon: candy pink
        return vec3(0.75, 0.6, 1.0);                        // Octagon+: bright lavender
      }

      float depthFalloffFactor() {
        if (uDepthFalloff < 0.5) return 1.0;
        return mix(uMinOpacity, 1.0, 1.0 - smoothstep(0.5 * uDepthFalloffWidth, uDepthFalloffWidth, vRadialDist));
      }

      void main() {
        vec3 color = getFaceColor(vEdgeCount);
        float falloff = depthFalloffFactor();
        // For reverse subtract: output what to subtract from white
        gl_FragColor = vec4(1.0 - color, opacity * falloff);
      }
    `,attributes:e,uniforms:{opacity:(n,a)=>a.faceOpacity??.3,uDepthFalloff:(n,a)=>a.depthFalloff??0,uFocusCenter:(n,a)=>a.focusCenter??[0,0,0],uDepthFalloffWidth:(n,a)=>a.depthFalloffWidth??3,uMinOpacity:(n,a)=>a.minOpacity??.1},blend:{enable:!0,equation:{rgb:"reverse subtract",alpha:"add"},func:{srcRGB:"src alpha",srcAlpha:"src alpha",dstRGB:"one",dstAlpha:"one"}},depth:{enable:!0,mask:!1},cull:{enable:!1},primitive:"triangles",count:(n,a)=>a.count*3}),t=r({vert:o,frag:`
      precision highp float;
      uniform vec3 uCameraPos;
      uniform mat4 uView;
      uniform sampler2D uMatcap;
      varying float vEdgeCount;
      varying vec3 vNormal;
      varying vec3 vPosition;

      // Bright candy/plastic colors for a fun cartoony look
      vec3 getFaceColor(float edges) {
        if (edges < 3.5) return vec3(1.0, 0.85, 0.3);      // Triangle: bright yellow
        if (edges < 4.5) return vec3(1.0, 0.6, 0.3);       // Quad: tangerine
        if (edges < 5.5) return vec3(0.3, 0.7, 1.0);       // Pentagon: candy blue
        if (edges < 6.5) return vec3(1.0, 0.55, 0.2);      // Hexagon: bright orange
        if (edges < 7.5) return vec3(1.0, 0.4, 0.5);       // Heptagon: candy pink
        return vec3(0.7, 0.5, 1.0);                         // Octagon+: bright lavender
      }

      // Matcap UV from eye direction and normal (hughsk formula)
      vec2 matcapUV(vec3 eye, vec3 normal) {
        vec3 r = reflect(eye, normal);
        float m = 2.8284271247461903 * sqrt(r.z + 1.0);
        return r.xy / m + 0.5;
      }

      // RGB to HSL conversion
      vec3 rgb2hsl(vec3 c) {
        float maxC = max(max(c.r, c.g), c.b);
        float minC = min(min(c.r, c.g), c.b);
        float l = (maxC + minC) * 0.5;

        if (maxC == minC) {
          return vec3(0.0, 0.0, l); // achromatic
        }

        float d = maxC - minC;
        float s = l > 0.5 ? d / (2.0 - maxC - minC) : d / (maxC + minC);

        float h;
        if (maxC == c.r) {
          h = (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0);
        } else if (maxC == c.g) {
          h = (c.b - c.r) / d + 2.0;
        } else {
          h = (c.r - c.g) / d + 4.0;
        }
        h /= 6.0;

        return vec3(h, s, l);
      }

      // Helper for HSL to RGB
      float hue2rgb(float p, float q, float t) {
        if (t < 0.0) t += 1.0;
        if (t > 1.0) t -= 1.0;
        if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
        if (t < 1.0/2.0) return q;
        if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
        return p;
      }

      // HSL to RGB conversion
      vec3 hsl2rgb(vec3 hsl) {
        float h = hsl.x, s = hsl.y, l = hsl.z;

        if (s == 0.0) {
          return vec3(l); // achromatic
        }

        float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
        float p = 2.0 * l - q;

        return vec3(
          hue2rgb(p, q, h + 1.0/3.0),
          hue2rgb(p, q, h),
          hue2rgb(p, q, h - 1.0/3.0)
        );
      }

      void main() {
        vec3 faceColor = getFaceColor(vEdgeCount);

        // World space normal
        vec3 worldNormal = normalize(vNormal);
        vec3 toCamera = normalize(uCameraPos - vPosition);

        // Flip normal if back-facing
        if (dot(worldNormal, toCamera) < 0.0) worldNormal = -worldNormal;

        // Transform normal to view space
        vec3 viewNormal = normalize(mat3(uView) * worldNormal);

        // Simple matcap: just use view-space normal xy
        vec2 uv = viewNormal.xy * 0.5 + 0.5;
        vec3 matcap = texture2D(uMatcap, uv).rgb;

        // Photoshop "Color" blend in HSL space:
        // Take hue and saturation from face color, luminance from matcap
        vec3 faceHSL = rgb2hsl(faceColor);
        vec3 matcapHSL = rgb2hsl(matcap);
        vec3 color = hsl2rgb(pow(mix(
          faceHSL,
          matcapHSL,
          vec3(0.0, 0.0, 1.0)
        ), vec3(1, 1, 1.5)));

        gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
      }
    `,attributes:e,uniforms:{uCameraPos:(n,a)=>a.cameraPosition??[0,0,20],uFocusCenter:(n,a)=>a.focusCenter??[0,0,0],uMatcap:l,uView:(n,a)=>a.viewMatrix??[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},blend:{enable:!1},depth:{enable:!0,mask:!0},cull:{enable:!1},primitive:"triangles",count:(n,a)=>a.count*3});return n=>{n.faceShading?t(n):i(n)}}function q(r,l){const o=r.buffer(l.positions),e=r.elements(l.cells);return r({vert:`
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
    `,attributes:{icoPosition:o,vertex:(i,t)=>({buffer:t.vertexBuffer,divisor:1}),index:(i,t)=>({buffer:t.indexBuffer,divisor:1})},elements:e,cull:{enable:!0,face:"back"},uniforms:{pointSize:(i,t)=>i.pixelRatio*t.pointSize/i.viewportHeight,selectedIndex:(i,t)=>t.selectedIndex,hoverIndex:(i,t)=>t.hoverIndex,uDepthFalloff:(i,t)=>t.depthFalloff??0,uFocusCenter:(i,t)=>t.focusCenter??[0,0,0],uDepthFalloffWidth:(i,t)=>t.depthFalloffWidth??3,uMinOpacity:(i,t)=>t.minOpacity??.2},primitive:"triangles",count:l.cells.length*3,instances:(i,t)=>t.count})}function j(r){const l=r.buffer({usage:"dynamic",data:new Float32Array(65536)});return r({vert:`
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
    `,blend:{enable:!0,func:{srcRGB:"src alpha",srcAlpha:"one",dstRGB:"one minus src alpha",dstAlpha:"one"}},polygonOffset:{enable:!0,offset:{factor:(o,e)=>e.faceShading?-1:2,units:(o,e)=>e.faceShading?-100:2}},attributes:{aLinePosition:[[-1,0],[1,0],[-1,1],[1,1]],aPosition:(o,e)=>({buffer:e.vertexBuffer,offset:0,stride:24,divisor:1}),aNextPosition:(o,e)=>({buffer:e.vertexBuffer,offset:12,stride:24,divisor:1}),aEdgeIndex:(o,e)=>{const i=new Float32Array(e.count);for(let t=0;t<e.count;t++)i[t]=t;return l.subdata(i),{buffer:l,divisor:1}}},elements:[[0,1,2],[1,3,2]],uniforms:{uL0:(o,e)=>e.l0??1,uStrainColoring:(o,e)=>e.strainColoring??0,uBorderColor:[1,1,1,.8],uLineWidth:(o,e)=>e.edgeWidth??2,uBorderWidth:(o,e)=>e.faceShading?0:1,uAspect:o=>o.viewportWidth/o.viewportHeight,uScaleFactor:o=>o.pixelRatio/o.viewportHeight,uPixelRatio:r.context("pixelRatio"),uDepthFalloff:(o,e)=>e.depthFalloff??0,uFocusCenter:(o,e)=>e.focusCenter??[0,0,0],uDepthFalloffWidth:(o,e)=>e.depthFalloffWidth??3,uMinOpacity:.2,uSelectedIndex:(o,e)=>e.selectedIndex??-1,uHoverIndex:(o,e)=>e.hoverIndex??-1},primitive:"triangles",instances:(o,e)=>e.count,count:6})}export{T as createMeshRenderer,T as default};
