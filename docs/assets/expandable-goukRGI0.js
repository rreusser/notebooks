function Q(y,{width:L,height:S,toggleOffset:v=[8,8],margin:w=0,padding:E=0,onResize:C,controls:N}){let p=!1,H=L,T=S,m=!1,a={x:16,y:16},i=null,f=!1,x={x:0,y:0};const k=N?Array.isArray(N)?N:[N]:[],h=[];let g=null;const c=document.createElement("div");c.className="expandable-container",c.style.cssText=`
    position: relative;
    width: 100%;
  `;const o=document.createElement("div");o.className="expandable-content",o.style.cssText=`
    position: relative;
    display: inline-block;
    z-index: 1;
  `;const u=document.createElement("div");if(u.className="expandable-overlay",u.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 9998;
  `,u.addEventListener("click",()=>P()),k.length>0){i=document.createElement("div"),i.className="expandable-controls-panel",i.style.cssText="display: none;";const n=document.createElement("div");n.className="expandable-controls-header",n.style.cssText=`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      background: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
      cursor: move;
      user-select: none;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 500;
      color: #555;
    `;const e=document.createElement("span");e.textContent="Controls";const t=document.createElement("button");t.className="expandable-controls-toggle",t.innerHTML="▼",t.title="Collapse controls",t.style.cssText=`
      border: none;
      background: none;
      cursor: pointer;
      font-size: 12px;
      color: #666;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.15s ease;
    `,t.addEventListener("mouseenter",()=>{t.style.background="rgba(0,0,0,0.1)"}),t.addEventListener("mouseleave",()=>{t.style.background="none"}),t.addEventListener("click",r=>{r.stopPropagation(),_()}),n.appendChild(e),n.appendChild(t);const l=document.createElement("div");l.className="expandable-controls-content",l.style.cssText=`
      padding: 12px;
      overflow-y: auto;
      max-height: calc(100vh - 200px);
      display: flex;
      flex-direction: column;
      gap: 16px;
    `,i.appendChild(n),i.appendChild(l),n.addEventListener("mousedown",r=>{r.target!==t&&(f=!0,x.x=r.clientX-a.x,x.y=r.clientY-a.y,n.style.cursor="grabbing",r.preventDefault())}),document.addEventListener("mousemove",r=>{f&&(a.x=r.clientX-x.x,a.y=r.clientY-x.y,$(),q())}),document.addEventListener("mouseup",()=>{if(f){f=!1;const r=i?.querySelector(".expandable-controls-header");r&&(r.style.cursor="move")}}),n.addEventListener("touchstart",r=>{if(r.target===t)return;f=!0;const d=r.touches[0];x.x=d.clientX-a.x,x.y=d.clientY-a.y,r.preventDefault()},{passive:!1}),document.addEventListener("touchmove",r=>{if(!f)return;const d=r.touches[0];a.x=d.clientX-x.x,a.y=d.clientY-x.y,$(),q()},{passive:!0}),document.addEventListener("touchend",()=>{f=!1})}function $(){if(!i)return;const n=i.getBoundingClientRect();a.x=Math.max(0,Math.min(a.x,window.innerWidth-n.width)),a.y=Math.max(0,Math.min(a.y,window.innerHeight-n.height))}function q(){i&&p&&(i.style.left=`${a.x}px`,i.style.top=`${a.y}px`)}function _(){if(m=!m,!i)return;const n=i.querySelector(".expandable-controls-content"),e=i.querySelector(".expandable-controls-toggle");m?(n&&(n.style.display="flex"),e&&(e.innerHTML="▼",e.title="Collapse controls")):(n&&(n.style.display="none"),e&&(e.innerHTML="▶",e.title="Expand controls"))}function z(){for(let n=h.length-1;n>=0;n--){const e=h[n];if(e){if(e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder),e.selector){const t=document.querySelector(e.selector);if(t&&t!==e.element){e.element.parentNode&&e.element.parentNode.removeChild(e.element);continue}}e.element&&e.originalParent&&(e.originalNextSibling?e.originalParent.insertBefore(e.element,e.originalNextSibling):e.originalParent.appendChild(e.element))}}h.length=0}function I(){g||(g=new MutationObserver(n=>{if(!p||!i)return;const e=i.querySelector(".expandable-controls-content");if(e)for(const t of h){if(!t.selector)continue;const l=document.querySelector(t.selector);if(l&&l!==t.element&&!e.contains(l)){const r=t.element;t.element=l,t.originalParent=l.parentNode,t.originalNextSibling=l.nextSibling;const d=document.createElement("div");d.className="expandable-controls-placeholder",d.style.display="none",l.parentNode.insertBefore(d,l),t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),t.placeholder=d,r.parentNode===e?(e.insertBefore(l,r),e.removeChild(r)):e.appendChild(l)}}}),g.observe(document.body,{childList:!0,subtree:!0}))}function A(){g&&(g.disconnect(),g=null)}const s=document.createElement("button");if(s.className="expandable-toggle",s.innerHTML="⤢",s.title="Expand",s.style.cssText=`
    position: absolute;
    top: ${-v[1]}px;
    right: ${-v[0]}px;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.9);
    color: #666;
    font-size: 16px;
    cursor: pointer;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.6);
    transition: background 0.2s ease, box-shadow 0.2s ease;
  `,s.addEventListener("mouseenter",()=>{s.style.background="rgba(255, 255, 255, 1)",s.style.boxShadow="0 2px 6px rgba(0,0,0,0.3)"}),s.addEventListener("mouseleave",()=>{s.style.background="rgba(255, 255, 255, 0.9)",s.style.boxShadow="0 1px 3px rgba(0,0,0,0.2)"}),typeof y=="function"&&(y=y()),typeof y=="string"){const n=document.createElement("div");n.innerHTML=y,y=n.firstElementChild||n}o.appendChild(y),o.appendChild(s),c.appendChild(o),C&&C(y,L,S,!1);let M=null;function B(){!p&&c.isConnected&&(M=c.offsetHeight)}requestAnimationFrame(()=>{B()});function W(n,e){H=n,T=e,C&&C(y,n,e,p)}function P(){p=!1,s.innerHTML="⤢",s.title="Expand",s.style.top=`${-v[1]}px`,s.style.right=`${-v[0]}px`,u.parentNode&&u.remove(),A(),i&&(i.style.display="none",z()),c.style.height="",o.style.position="relative",o.style.display="inline-block",o.style.top="",o.style.left="",o.style.transform="",o.style.width="",o.style.height="",o.style.overflow="",o.style.background="",o.style.boxShadow="",o.style.padding="",o.style.borderRadius="",o.style.zIndex="1";const n=o.querySelector("figure");n&&(n.style.margin=n._savedMargin??""),W(L,S),requestAnimationFrame(()=>{B()})}function D(){if(!p)return;const n=window.innerWidth,e=window.innerHeight,[t,l]=Array.isArray(w)?w:[w,w],[r,d]=Array.isArray(E)?E:[E,E],j=n-t*2-r*2,O=e-l*2-d*2,K=j+r*2,G=O+d*2;o.style.position="fixed",o.style.display="block",o.style.width=`${K}px`,o.style.height=`${G}px`,o.style.overflow="hidden",o.style.zIndex="9999",t===0&&l===0?(o.style.top="0",o.style.left="0",o.style.transform="none",o.style.borderRadius="0",o.style.boxShadow="none"):(o.style.top=`${l}px`,o.style.left=`${t}px`,o.style.transform="none",o.style.borderRadius="8px",o.style.boxShadow="0 8px 32px rgba(0,0,0,0.3)"),o.style.background="white",o.style.padding=`${d}px ${r}px`;const b=o.querySelector("figure");b&&(b._savedMargin=b._savedMargin??b.style.margin,b.style.margin="0"),W(j,O)}function R(){if(p=!0,s.innerHTML="✕",s.title="Collapse",s.style.top="8px",s.style.right="8px",u.parentNode||document.body.appendChild(u),u.style.opacity="1",u.style.pointerEvents="auto",M?c.style.height=`${M}px`:c.style.height=`${c.offsetHeight}px`,k.length>0&&i){const n=i.querySelector(".expandable-controls-content");if(n)for(const e of k){const t=typeof e=="string"?document.querySelector(e):e;if(!t||!t.parentNode)continue;const l=document.createElement("div");l.className="expandable-controls-placeholder",l.style.height=`${t.offsetHeight}px`,l.style.display="block",h.push({element:t,selector:typeof e=="string"?e:null,originalParent:t.parentNode,originalNextSibling:t.nextSibling,placeholder:l}),t.parentNode.insertBefore(l,t),n.appendChild(t)}if(h.length>0){i.parentNode||document.body.appendChild(i),i.style.cssText=`
          position: fixed;
          z-index: 10000;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          overflow: hidden;
          max-width: min(350px, calc(100vw - 32px));
          max-height: calc(100vh - 100px);
          left: ${a.x}px;
          top: ${a.y}px;
        `,m=!(window.innerWidth<640);const t=i.querySelector(".expandable-controls-content"),l=i.querySelector(".expandable-controls-toggle");m?(t&&(t.style.display="flex"),l&&(l.innerHTML="▼",l.title="Collapse controls")):(t&&(t.style.display="none"),l&&(l.innerHTML="▶",l.title="Expand controls"))}}D(),I()}s.addEventListener("click",n=>{n.stopPropagation(),p?P():R()});const F=()=>{p&&D()};window.addEventListener("resize",F);const X=n=>{n.key==="Escape"&&p&&P()};document.addEventListener("keydown",X);const Y=new MutationObserver(()=>{document.contains(c)||(document.removeEventListener("keydown",X),window.removeEventListener("resize",F),A(),u.parentNode&&u.remove(),z(),i&&i.parentNode&&i.remove(),Y.disconnect())});return Y.observe(document.body,{childList:!0,subtree:!0}),Object.defineProperty(c,"expandedDimensions",{get:()=>({width:H,height:T,expanded:p})}),c}export{Q as expandable};
