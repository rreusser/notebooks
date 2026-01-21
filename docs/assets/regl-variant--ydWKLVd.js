import{d as u,_ as v}from"./index-ByB2dbry.js";u({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:async(r,o)=>{const{reglCanvas:s}=await v(()=>import("https://api.observablehq.com/@rreusser/regl-canvas.js?v=4"),[]).then(n=>{const t={},e=r.module(n.default),a=r.module();if(!e.defines("reglCanvas"))throw new SyntaxError("export 'reglCanvas' not found");return a.variable(t.reglCanvas=o()).import("reglCanvas",e),t});return{reglCanvas:s}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["reglCanvas"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-670"),expanded:[],variables:[]},{id:670,body:async(r,o)=>{const{mat4create:s}=await v(()=>import("https://api.observablehq.com/@rreusser/gl-mat4.js?v=4"),[]).then(n=>{const t={},e=r.module(n.default),a=r.module();if(!e.defines("mat4create"))throw new SyntaxError("export 'mat4create' not found");return a.variable(t.mat4create=o()).import("mat4create",e),t});return{mat4create:s}},inputs:["__ojs_runtime","__ojs_observer"],outputs:["mat4create"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:async function(o){return{metadata:await o(new URL("Roboto-msdf-range-8.json",import.meta.url).href).json(),image:await o(new URL("Roboto-msdf-range-8.png",import.meta.url).href).image()}},inputs:["FileAttachment"],outputs:void 0,output:"Roboto",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-91"),expanded:[],variables:[]},{id:91,body:function(o,s,n,t,e,a,i){a.poll(),a.clear({color:[1,1,1,1]}),s.render({projectionView:i()})},inputs:["createDrawText","txt","span1","span2","span3","regl","mat4create"],outputs:void 0,output:"draw",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-64"),expanded:[],variables:[]},{id:64,body:function(o,s,n,t){const e=new o(s);return e.registerFont(n),t.then(()=>e.destroy()),e},inputs:["TextRenderer","regl","Roboto","invalidation"],outputs:void 0,output:"txt",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-15"),expanded:[],variables:[]},{id:15,body:function(o){return o(this,{width:256,height:256,pixelRatio:2,extensions:["OES_standard_derivatives","ANGLE_instanced_arrays"]})},inputs:["reglCanvas"],outputs:void 0,output:"viewof$regl",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});u({root:document.getElementById("cell-413"),expanded:[],variables:[]},{id:413,body:function(o){return o.text({value:"hello"})},inputs:["Inputs"],outputs:void 0,output:"viewof$str1",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});u({root:document.getElementById("cell-870"),expanded:[],variables:[]},{id:870,body:function(o){return o.text({value:"comma"})},inputs:["Inputs"],outputs:void 0,output:"viewof$str2",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});u({root:document.getElementById("cell-873"),expanded:[],variables:[]},{id:873,body:function(o){return o.text({value:"world"})},inputs:["Inputs"],outputs:void 0,output:"viewof$str3",assets:void 0,autodisplay:!0,autoview:!0,automutable:!1});u({root:document.getElementById("cell-507"),expanded:[],variables:[]},{id:507,body:function(o,s,n){const t=o.createSpan(s,{position:[0,.2,0],offset:[0,0],anchor:"start",baseline:"bottom",haloWidth:1,fontSize:11});return n.then(()=>t.destroy()),t},inputs:["txt","str1","invalidation"],outputs:void 0,output:"span1",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-868"),expanded:[],variables:[]},{id:868,body:function(o,s,n){const t=o.createSpan(s,{position:[0,.1,0],anchor:"middle"});return n.then(()=>t.destroy()),t},inputs:["txt","str2","invalidation"],outputs:void 0,output:"span2",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-876"),expanded:[],variables:[]},{id:876,body:function(o,s,n){const t=o.createSpan(s,{position:[0,0,0],anchor:"end"});return n.then(()=>t.destroy()),t},inputs:["txt","str3","invalidation"],outputs:void 0,output:"span3",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-969"),expanded:[],variables:[]},{id:969,body:function(r){return r`## Implementation`},inputs:["md"],outputs:void 0,output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:function(o){return class{constructor(n,t,e){this.renderer=n,this.name=t.name,this.atlas=t.atlas,this.glyphs=new Map(t.glyphs.map(a=>[a.unicode,a])),this.placements=new o(n,this),this.texture=this.renderer.regl.texture({data:e,format:"rgba",type:"uint8",min:"linear",mag:"linear",flipY:t.atlas.yOrigin==="bottom"})}destroy(){this.texture&&(this.texture.destroy(),this.texture=null),this.placements.destroy()}}},inputs:["GlyphPlacements"],outputs:void 0,output:"Font",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-721"),expanded:[],variables:[]},{id:721,body:function(){return class{constructor(s,n,t){this.glyphPlacements=s,this.start=n,this.end=t,this.delete=!1}queueDeletion(){this.delete=!0}get size(){if(isFinite(this.start))return this.end-this.start+1}}},inputs:[],outputs:void 0,output:"PlacementRange",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-61"),expanded:[],variables:[]},{id:61,body:function(o){return class h{static layout=[{name:"position",type:"float32",size:3},{name:"planeBounds",type:"float32",size:4},{name:"atlasBounds",type:"float32",size:4},{name:"haloWidth",type:"float32",size:1},{name:"color",type:"uint8",size:1},{name:"haloColor",type:"uint8",size:1}];static bytesPerGlyph=56;static anchorShift={start:0,middle:-.5,end:-1};static baselineShift={bottom:0,center:-.5,top:-1};constructor(n,t){this.renderer=n,this.atlas=t.atlas,this.glyphs=t.glyphs,this.capacity=1024,this.uint8=new Uint8Array(this.capacity*h.bytesPerGlyph),this.float32=new Float32Array(this.uint8.buffer),this.count=0,this.ranges=[],this.buffer=n.regl.buffer(this.uint8)}clear(){for(const n of this.ranges)n.queueDeletion();this.ranges.length=0,this.count=0}destroy(){this.clear(),this.buffer&&this.buffer.destroy(),this.buffer=null}ensureCapacity(n){let t=!1;for(;this.capacity<n;)this.capacity*=2,t=!0;if(!t)return;const e=this.uint8;this.uint8=new Uint8Array(this.capacity*h.bytesPerGlyph),this.float32=new Float32Array(this.uint8.buffer),this.uint8.set(e),this.buffer(this.uint8)}place(n,t){this.ensureCapacity(this.count+n.length);let e=this.count,a=this.count-1,i=0;for(const f of n){const{index:p,advance:y}=this._placeChar(f,i,t);p>=0&&(a=p),i+=y}const l=new o(this,e,a);return this.ranges.push(l),this._applyAlignment(l,i,t),l}_applyAlignment(n,t,e){const a=h.anchorShift[e.anchor]*t*e.fontSize,i=h.baselineShift[e.baseline]*e.fontSize,l=h.bytesPerGlyph/Float32Array.BYTES_PER_ELEMENT;let f=n.start*l;for(let p=n.start;p<=n.end;p++,f+=l)this.float32[f+3]+=a,this.float32[f+4]+=i}_placeChar(n,t,{position:e,offset:a,fontSize:i,color:l,haloColor:f,haloWidth:p}){const y=this.count,d=this.glyphs.get(n.charCodeAt(0));if(!d.planeBounds||!d.atlasBounds)return{index:-1,advance:d.advance};const c=h.bytesPerGlyph/Float32Array.BYTES_PER_ELEMENT*y,m=h.bytesPerGlyph/Uint8Array.BYTES_PER_ELEMENT*y;return this.float32[c+0]=e[0],this.float32[c+1]=e[1],this.float32[c+2]=e[2],this.float32[c+3]=i*(t+d.planeBounds.left)+a[0],this.float32[c+4]=i*d.planeBounds.bottom+a[1],this.float32[c+5]=i*(d.planeBounds.right-d.planeBounds.left),this.float32[c+6]=i*(d.planeBounds.top-d.planeBounds.bottom),this.float32[c+7]=d.atlasBounds.left/this.atlas.width,this.float32[c+8]=d.atlasBounds.bottom/this.atlas.height,this.float32[c+9]=(d.atlasBounds.right-d.atlasBounds.left)/this.atlas.width,this.float32[c+10]=(d.atlasBounds.top-d.atlasBounds.bottom)/this.atlas.height,this.float32[c+11]=p,this.uint8[m+48]=l[0],this.uint8[m+49]=l[1],this.uint8[m+50]=l[2],this.uint8[m+51]=l[3],this.uint8[m+52]=f[0],this.uint8[m+53]=f[1],this.uint8[m+54]=f[2],this.uint8[m+55]=f[3],this.count++,{index:y,advance:d.advance}}flushDeletions(){let n=0,t=0;for(let e=0;e<this.ranges.length;e++){const a=this.ranges[e];if(a.delete){n+=a.size,t++;continue}if(n){const i=a.start*h.bytesPerGlyph,l=(a.end+1)*h.bytesPerGlyph,f=n*h.bytesPerGlyph;for(let p=i;p<l;p++)this.uint8[p-f]=this.uint8[p];a.start-=n,a.end-=n}t&&(this.ranges[e-t]=this.ranges[e])}this.count-=n,this.ranges.length-=t}updateBuffer(){this.flushDeletions(),this.buffer.subdata(this.uint8.subarray(0,this.count*h.bytesPerGlyph))}}},inputs:["PlacementRange"],outputs:void 0,output:"GlyphPlacements",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:function(o,s,n){return class{constructor(e,{fonts:a=[]}={}){if(!e.hasExtension("ANGLE_instanced_arrays"))throw new Error("TextRenderer: ANGLE_instanced_arrays extension not loaded");if(!e.hasExtension("OES_standard_derivatives"))throw new Error("TextRenderer: OES_standard_derivatives extension not loaded");this.fontStore=new Map,this.regl=e,this.draw=o(e),this.elements=new Set;for(const i of a)this.registerFont(i)}registerFont({metadata:e,image:a}){this.fontStore.set(e.name,new s(this,e,a))}getFont(e){if(e)return this.fontStore.get(e);if(this.fontStore.size===1)return[...this.fontStore.values()][0]}placeGlyphs(){for(const e of this.elements.values())e.placement||e.placeGlyphs()}createSpan(e,a={}){const i={position:[0,0,0],offset:[0,0],font:null,fontSize:12,color:[0,0,0,1],haloWidth:0,haloColor:[1,1,1,1],baseline:"bottom",anchor:"start"},l=new n(this,e,{...i,...a});return this.elements.add(l),l}removeAll(){for(const e of this.elements)e.remove()}destroy(){for(const e of this.fontStore.values())e.destroy();for(const e of this.fontStore.values())e.placements.clear()}render({projectionView:e=null}={}){this.placeGlyphs();for(const a of this.fontStore.values())a.placements.updateBuffer(),this.draw({font:a,projectionView:e})}}},inputs:["createDrawText","Font","Span"],outputs:void 0,output:"TextRenderer",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-30"),expanded:[],variables:[]},{id:30,body:function(){return class{constructor(s,n,t){this.textContent=n,this.changed=!1,this.renderer=s,this.placement=null,this.style=t}computeFont(){const s=this.renderer.getFont(this.style.font);if(!s)throw new Error(`Font not found: ${JSON.stringify(this.style.font)}`);return s}placeGlyphs(){this.placement||(this.placement=this.computeFont().placements.place(this.textContent,this.style))}destroy(){this.placement&&this.placement.queueDeletion(),this.placement=null,this.renderer.elements.delete(this)}}},inputs:[],outputs:void 0,output:"Span",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});u({root:document.getElementById("cell-269"),expanded:[],variables:[]},{id:269,body:function(o,s){return function(t){const e=o();return t({vert:`
      precision highp float;

      uniform mat4 projectionView;
      uniform vec2 resolution;
      uniform float pixelRatio;
      uniform vec2 positioning;

      attribute float haloWidth;
      attribute vec2 uv, offset;
      attribute vec3 position;
      attribute vec4 planeBounds, atlasBounds;
      attribute vec4 color, haloColor;

      varying float vHaloWidth;
      varying vec2 texCoord;
      varying vec4 vColor, vHaloColor;

      void main () {
        vHaloWidth = haloWidth * pixelRatio;
        vColor = color;
        vHaloColor = haloColor;

        gl_Position = projectionView * vec4(position, 1);
        gl_Position.xyz /= gl_Position.w;
        gl_Position.xy += 2.0 * pixelRatio * (
              planeBounds.xy + uv * planeBounds.zw
            ) / resolution;
        gl_Position.xyz *= gl_Position.w;

        texCoord = atlasBounds.xy + uv * atlasBounds.zw;

        gl_PointSize = 2.0;
      }`,frag:`
      #extension GL_OES_standard_derivatives : enable
      precision highp float;

      uniform sampler2D tex;
      uniform vec2 unitRange;
      uniform float distanceRange;
      uniform float pixelRatio;

      varying float vHaloWidth;
      varying vec2 texCoord;
      varying vec4 vColor, vHaloColor;

      float screenPxRange() {
          vec2 screenTexSize = vec2(1.0) / fwidth(texCoord);
          return max(0.5 * dot(unitRange, screenTexSize), 1.0);
      }

      float median(float r, float g, float b) {
        return max(min(r, g), min(max(r, g), b));
      }

      float linearstep (float a, float b, float x) {
        return clamp((x - a) / (b - a), 0.0, 1.0);
      }

      void main() {
        vec4 msd = texture2D(tex, texCoord);

        float px = screenPxRange();
        float sdf = median(msd.r, msd.g, msd.b);

        float screenPxDistance = px * (sdf - 0.5);
        float textOpacity = clamp(screenPxDistance + 0.5, 0.0, 1.0);

        vec4 col = vColor;

        if (vHaloWidth > 0.0) {
          float haloPxDistance = px * (sdf - 0.5) + min(vHaloWidth, 0.5 * screenPxRange() - 1.0);
          float haloOpacity = clamp(haloPxDistance + 0.5, 0.0, 1.0);
          col = mix(vHaloColor, col, textOpacity);
          col.a = max(haloOpacity, textOpacity);
        } else {
          col.a *= textOpacity;
        }
        if (col.a == 0.0) discard;

        gl_FragColor = col;
      }`,uniforms:{projectionView:(a,i)=>i.projectionView??e,resolution:a=>[a.viewportWidth,a.viewportHeight],pixelRatio:t.context("pixelRatio"),distanceRange:t.prop("font.atlas.distanceRange"),unitRange:(a,{font:{atlas:i}})=>[i.distanceRange/i.width,i.distanceRange/i.height],tex:t.prop("font.texture")},attributes:{uv:{divisor:0,buffer:new Uint8Array([0,0,1,0,0,1,1,1])},position:{divisor:1,buffer:t.prop("font.placements.buffer"),stride:s.bytesPerGlyph,offset:0,type:"float32",size:3},planeBounds:{divisor:1,buffer:t.prop("font.placements.buffer"),stride:s.bytesPerGlyph,offset:12,type:"float32",size:4},atlasBounds:{divisor:1,buffer:t.prop("font.placements.buffer"),stride:s.bytesPerGlyph,offset:28,type:"float32",size:4},haloWidth:{divisor:1,buffer:t.prop("font.placements.buffer"),stride:s.bytesPerGlyph,offset:44,type:"float32",size:1},color:{divisor:1,buffer:t.prop("font.placements.buffer"),stride:s.bytesPerGlyph,offset:48,type:"uint8",size:4},haloColor:{divisor:1,buffer:t.prop("font.placements.buffer"),stride:s.bytesPerGlyph,offset:52,type:"uint8",size:4}},blend:{enable:!0,func:{srcRGB:"src alpha",srcAlpha:1,dstRGB:"one minus src alpha",dstAlpha:1},equation:{rgb:"add",alpha:"add"}},depth:{enable:!1},primitive:"triangle strip",instances:t.prop("font.placements.count"),count:4})}},inputs:["mat4create","GlyphPlacements"],outputs:void 0,output:"createDrawText",assets:void 0,autodisplay:!0,autoview:!1,automutable:!1});
