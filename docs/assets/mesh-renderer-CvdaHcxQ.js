const C=new WeakMap;function O(r){let n=C.get(r);if(n&&n.vertexCount===r.vertexCount&&n.edgeCount===r.edgeCount)return n;const o=r.extractFaces();let t=0;for(const l of o)l.length>=3&&(t+=l.length-2);const a=new Uint32Array(t*3),e=new Float32Array(t*3);let i=0;for(const l of o){if(l.length<3)continue;const d=l.length,c=l[0];for(let v=1;v<l.length-1;v++){const s=i*3;a[s]=c,a[s+1]=l[v],a[s+2]=l[v+1],e[s]=d,e[s+1]=d,e[s+2]=d,i++}}const u=new Float32Array(t*9),f=new Float32Array(t*9);return n={vertexCount:r.vertexCount,edgeCount:r.edgeCount,triangleCount:t,triangleVertexIndices:a,triangleEdgeCounts:e,triangleData:u,normalData:f},C.set(r,n),n}function V(r,n){const{triangleVertexIndices:o,triangleData:t,normalData:a,triangleCount:e}=n,i=r.positions,u=r.computeVertexNormals();for(let f=0;f<e;f++){const l=f*3,d=f*9;for(let c=0;c<3;c++){const s=o[l+c]*3,g=d+c*3;t[g]=i[s],t[g+1]=i[s+1],t[g+2]=i[s+2],a[g]=u[s],a[g+1]=u[s+1],a[g+2]=u[s+2]}}return{triangleData:t,normalData:a,edgeCounts:n.triangleEdgeCounts,triangleCount:e}}function G(r,n){const o=M(r,n),t=z(r),a=k(r),e=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),i=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),u=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),f=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),l=r.buffer({usage:"dynamic",data:new Float32Array(65536)}),d=r.buffer(new Uint16Array(Array.from({length:65536},(c,v)=>v)));return{render(c,v,s={}){const{pointSize:g=3,edgeWidth:p=2,strainColoring:y=1.5,selectedVertexIndex:b=-1,hoverVertexIndex:F=-1,selectedEdgeIndex:w=-1,hoverEdgeIndex:I=-1,showFaces:P=!0,faceOpacity:_=.3,faceShading:m=!1,cameraPosition:S=[0,0,20],depthFalloff:D=!1,depthFalloffWidth:B=7,focusCenter:H=[0,0,0]}=s,h={depthFalloff:D?1:0,depthFalloffWidth:B,focusCenter:H};e.subdata(c.positions.subarray(0,c.vertexCount*3));const W=A(c);if(i.subdata(W),P){const x=O(c);if(x.triangleCount>0){const{triangleData:R,normalData:N,edgeCounts:E,triangleCount:L}=V(c,x);u.subdata(R),f.subdata(N),l.subdata(E),a({faceBuffer:u,faceNormalBuffer:f,faceEdgeCountBuffer:l,count:L,faceOpacity:_,faceShading:m,cameraPosition:S,...h})}}p>0&&t({vertexBuffer:i,count:c.edgeCount,edgeWidth:p,strainColoring:y,l0:v.l0,selectedIndex:w,hoverIndex:I,faceShading:m,...h}),o({vertexBuffer:e,indexBuffer:d,count:c.vertexCount,pointSize:g,selectedIndex:b,hoverIndex:F,...h})},destroy(){e.destroy(),i.destroy(),u.destroy(),f.destroy(),l.destroy(),d.destroy()}}}function A(r){const n=new Float32Array(r.edgeCount*6),o=r.positions,t=r.edges;for(let a=0,e=0;a<r.edgeCount;a++,e+=6){const i=a*2,u=t[i],f=t[i+1],l=u*3,d=f*3;n[e]=o[l],n[e+1]=o[l+1],n[e+2]=o[l+2],n[e+3]=o[d],n[e+4]=o[d+1],n[e+5]=o[d+2]}return n}function k(r){const n=`
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
  `,o={position:(e,i)=>({buffer:i.faceBuffer,offset:0,stride:12}),normal:(e,i)=>({buffer:i.faceNormalBuffer,offset:0,stride:12}),edgeCount:(e,i)=>({buffer:i.faceEdgeCountBuffer,offset:0,stride:4})},t=r({vert:n,frag:`
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
    `,attributes:o,uniforms:{opacity:(e,i)=>i.faceOpacity??.3,uDepthFalloff:(e,i)=>i.depthFalloff??0,uFocusCenter:(e,i)=>i.focusCenter??[0,0,0],uDepthFalloffWidth:(e,i)=>i.depthFalloffWidth??3,uMinOpacity:(e,i)=>i.minOpacity??.1},blend:{enable:!0,equation:{rgb:"reverse subtract",alpha:"add"},func:{srcRGB:"src alpha",srcAlpha:"src alpha",dstRGB:"one",dstAlpha:"one"}},depth:{enable:!0,mask:!1},cull:{enable:!1},primitive:"triangles",count:(e,i)=>i.count*3}),a=r({vert:n,frag:`
      precision highp float;
      uniform vec3 uCameraPos;
      uniform vec3 uLightOffset;
      varying float vEdgeCount;
      varying vec3 vNormal;
      varying vec3 vPosition;

      // Bright candy/plastic colors for a fun cartoony look
      vec3 getFaceColor(float edges) {
        if (edges < 3.5) return vec3(1.0, 0.65, 0.25);     // Triangle: bright yellow
        if (edges < 4.5) return vec3(1.0, 0.7, 0.45);      // Quad: tangerine
        if (edges < 5.5) return vec3(0.45, 0.75, 1.0);     // Pentagon: candy blue
        if (edges < 6.5) return vec3(1.0, 0.75, 0.35);     // Hexagon: bright orange
        if (edges < 7.5) return vec3(1.0, 0.5, 0.55);      // Heptagon: candy pink
        return vec3(0.75, 0.6, 1.0);                        // Octagon+: bright lavender
      }

      // sRGB to linear conversion
      vec3 toLinear(vec3 srgb) {
        return pow(srgb, vec3(2.2));
      }

      // Linear to sRGB conversion
      vec3 toSRGB(vec3 linear) {
        return pow(linear, vec3(1.0 / 2.2));
      }

      void main() {
        // Convert base color to linear space for lighting calculations
        vec3 baseColor = toLinear(getFaceColor(vEdgeCount));

        vec3 N = normalize(vNormal);
        vec3 V = normalize(uCameraPos - vPosition);

        // Light offset relative to camera (key light above and to the right)
        vec3 lightPos = uCameraPos + uLightOffset;
        vec3 L = normalize(lightPos - vPosition);

        float NdotL = abs(dot(N, L));
        float NdotV = abs(dot(N, V));

        // Lighting in linear space - bright for candy/plastic look
        float ambient = 0.4;
        float diffuse = 0.5 * NdotL;

        // Specular (Blinn-Phong) - bright highlights
        vec3 H = normalize(L + V);
        float NdotH = abs(dot(N, H));
        float specular = 0.6 * pow(NdotH, 64.0);

        // Multi-layer fresnel rim lighting for a glowing effect
        float fresnel1 = pow(1.0 - NdotV, 2.0);   // Soft wide glow
        float fresnel2 = pow(1.0 - NdotV, 4.0);   // Tighter bright rim
        float fresnel3 = pow(1.0 - NdotV, 8.0);   // Very tight highlight

        // Glow colors - warm tinted
        vec3 glowColor = mix(baseColor, vec3(1.0), 0.5);  // Blend base with white
        vec3 rimColor = vec3(1.0, 0.95, 0.9);             // Warm white

        float lighting = ambient + diffuse;
        vec3 color = baseColor * lighting;

        // Layered rim/glow effect
        color += glowColor * fresnel1 * 0.35;     // Soft colored glow
        color += rimColor * fresnel2 * 0.5;       // Bright rim
        color += vec3(1.0) * fresnel3 * 0.4;      // Hot edge highlight
        color += vec3(1.0) * specular;            // Specular highlight

        // Convert back to sRGB for display
        color = toSRGB(clamp(color, 0.0, 1.0));

        gl_FragColor = vec4(color, 1.0);
      }
    `,attributes:o,uniforms:{uCameraPos:(e,i)=>i.cameraPosition??[0,0,20],uFocusCenter:(e,i)=>i.focusCenter??[0,0,0],uLightOffset:[5,8,2]},blend:{enable:!1},depth:{enable:!0,mask:!0},cull:{enable:!1},primitive:"triangles",count:(e,i)=>i.count*3});return e=>{e.faceShading?a(e):t(e)}}function M(r,n){const o=r.buffer(n.positions),t=r.elements(n.cells);return r({vert:`
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
    `,attributes:{icoPosition:o,vertex:(a,e)=>({buffer:e.vertexBuffer,divisor:1}),index:(a,e)=>({buffer:e.indexBuffer,divisor:1})},elements:t,cull:{enable:!0,face:"back"},uniforms:{pointSize:(a,e)=>a.pixelRatio*e.pointSize/a.viewportHeight,selectedIndex:(a,e)=>e.selectedIndex,hoverIndex:(a,e)=>e.hoverIndex,uDepthFalloff:(a,e)=>e.depthFalloff??0,uFocusCenter:(a,e)=>e.focusCenter??[0,0,0],uDepthFalloffWidth:(a,e)=>e.depthFalloffWidth??3,uMinOpacity:(a,e)=>e.minOpacity??.2},primitive:"triangles",count:n.cells.length*3,instances:(a,e)=>e.count})}function z(r){const n=r.buffer({usage:"dynamic",data:new Float32Array(65536)});return r({vert:`
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
    `,blend:{enable:!0,func:{srcRGB:"src alpha",srcAlpha:"one",dstRGB:"one minus src alpha",dstAlpha:"one"}},polygonOffset:{enable:!0,offset:{factor:(o,t)=>t.faceShading?-1:2,units:(o,t)=>t.faceShading?-100:2}},attributes:{aLinePosition:[[-1,0],[1,0],[-1,1],[1,1]],aPosition:(o,t)=>({buffer:t.vertexBuffer,offset:0,stride:24,divisor:1}),aNextPosition:(o,t)=>({buffer:t.vertexBuffer,offset:12,stride:24,divisor:1}),aEdgeIndex:(o,t)=>{const a=new Float32Array(t.count);for(let e=0;e<t.count;e++)a[e]=e;return n.subdata(a),{buffer:n,divisor:1}}},elements:[[0,1,2],[1,3,2]],uniforms:{uL0:(o,t)=>t.l0??1,uStrainColoring:(o,t)=>t.strainColoring??0,uBorderColor:[1,1,1,.8],uLineWidth:(o,t)=>t.edgeWidth??2,uBorderWidth:(o,t)=>t.faceShading?0:1,uAspect:o=>o.viewportWidth/o.viewportHeight,uScaleFactor:o=>o.pixelRatio/o.viewportHeight,uPixelRatio:r.context("pixelRatio"),uDepthFalloff:(o,t)=>t.depthFalloff??0,uFocusCenter:(o,t)=>t.focusCenter??[0,0,0],uDepthFalloffWidth:(o,t)=>t.depthFalloffWidth??3,uMinOpacity:.2,uSelectedIndex:(o,t)=>t.selectedIndex??-1,uHoverIndex:(o,t)=>t.hoverIndex??-1},primitive:"triangles",instances:(o,t)=>t.count,count:6})}export{G as createMeshRenderer,G as default};
