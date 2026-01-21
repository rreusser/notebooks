function U(x,{width:k,height:M,toggleOffset:E=[8,8],margin:C=0,padding:L=0,onResize:N,controls:S,state:h}){let c=h?.expanded??!1,$=k,q=M,v=!1,a={x:16,y:16},l=null,m=!1,y={x:0,y:0};const P=S?Array.isArray(S)?S:[S]:[],g=[];let b=null;const d=document.createElement("div");d.className="expandable-container",d.style.cssText=`
    position: relative;
    width: 100%;
  `;const o=document.createElement("div");o.className="expandable-content",o.style.cssText=`
    position: relative;
    display: inline-block;
    z-index: 1;
  `;const p=document.createElement("div");if(p.className="expandable-overlay",p.style.cssText=`
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
  `,p.addEventListener("click",()=>T()),P.length>0){l=document.createElement("div"),l.className="expandable-controls-panel",l.style.cssText="display: none;";const n=document.createElement("div");n.className="expandable-controls-header",n.style.cssText=`
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
    `,t.addEventListener("mouseenter",()=>{t.style.background="rgba(0,0,0,0.1)"}),t.addEventListener("mouseleave",()=>{t.style.background="none"}),t.addEventListener("click",s=>{s.stopPropagation(),R()}),n.appendChild(e),n.appendChild(t);const i=document.createElement("div");i.className="expandable-controls-content",i.style.cssText=`
      padding: 12px;
      overflow-y: auto;
      max-height: calc(100vh - 200px);
      display: flex;
      flex-direction: column;
      gap: 4px;
    `;const u=document.createElement("style");u.textContent=`
      .expandable-controls-content details {
        margin: 4px 0;
      }
    `,l.appendChild(u),l.appendChild(n),l.appendChild(i),n.addEventListener("mousedown",s=>{s.target!==t&&(m=!0,y.x=s.clientX-a.x,y.y=s.clientY-a.y,n.style.cursor="grabbing",s.preventDefault())}),document.addEventListener("mousemove",s=>{m&&(a.x=s.clientX-y.x,a.y=s.clientY-y.y,A(),z())}),document.addEventListener("mouseup",()=>{if(m){m=!1;const s=l?.querySelector(".expandable-controls-header");s&&(s.style.cursor="move")}}),n.addEventListener("touchstart",s=>{if(s.target===t)return;m=!0;const f=s.touches[0];y.x=f.clientX-a.x,y.y=f.clientY-a.y,s.preventDefault()},{passive:!1}),document.addEventListener("touchmove",s=>{if(!m)return;const f=s.touches[0];a.x=f.clientX-y.x,a.y=f.clientY-y.y,A(),z()},{passive:!0}),document.addEventListener("touchend",()=>{m=!1})}function A(){if(!l)return;const n=l.getBoundingClientRect();a.x=Math.max(0,Math.min(a.x,window.innerWidth-n.width)),a.y=Math.max(0,Math.min(a.y,window.innerHeight-n.height))}function z(){l&&c&&(l.style.left=`${a.x}px`,l.style.top=`${a.y}px`)}function R(){if(v=!v,!l)return;const n=l.querySelector(".expandable-controls-content"),e=l.querySelector(".expandable-controls-toggle");v?(n&&(n.style.display="flex"),e&&(e.innerHTML="▼",e.title="Collapse controls")):(n&&(n.style.display="none"),e&&(e.innerHTML="▶",e.title="Expand controls"))}function B(){for(let n=g.length-1;n>=0;n--){const e=g[n];if(e){if(e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder),e.selector){const t=document.querySelector(e.selector);if(t&&t!==e.element){e.element.parentNode&&e.element.parentNode.removeChild(e.element);continue}}e.element&&e.originalParent&&(e.originalNextSibling?e.originalParent.insertBefore(e.element,e.originalNextSibling):e.originalParent.appendChild(e.element))}}g.length=0}function K(){b||(b=new MutationObserver(n=>{if(!c||!l)return;const e=l.querySelector(".expandable-controls-content");if(e)for(const t of g){if(!t.selector)continue;const i=document.querySelector(t.selector);if(i&&i!==t.element&&!e.contains(i)){const u=t.element;t.element=i,t.originalParent=i.parentNode,t.originalNextSibling=i.nextSibling;const s=document.createElement("div");s.className="expandable-controls-placeholder",s.style.display="none",i.parentNode.insertBefore(s,i),t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),t.placeholder=s,u.parentNode===e?(e.insertBefore(i,u),e.removeChild(u)):e.appendChild(i)}}}),b.observe(document.body,{childList:!0,subtree:!0}))}function W(){b&&(b.disconnect(),b=null)}const r=document.createElement("button");if(r.className="expandable-toggle",r.innerHTML="⤢",r.title="Expand",r.style.cssText=`
    position: absolute;
    top: ${-E[1]}px;
    right: ${-E[0]}px;
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
  `,r.addEventListener("mouseenter",()=>{r.style.background="rgba(255, 255, 255, 1)",r.style.boxShadow="0 2px 6px rgba(0,0,0,0.3)"}),r.addEventListener("mouseleave",()=>{r.style.background="rgba(255, 255, 255, 0.9)",r.style.boxShadow="0 1px 3px rgba(0,0,0,0.2)"}),typeof x=="function"&&(x=x()),typeof x=="string"){const n=document.createElement("div");n.innerHTML=x,x=n.firstElementChild||n}o.appendChild(x),o.appendChild(r),d.appendChild(o),N&&N(x,k,M,!1);let H=null;function D(){!c&&d.isConnected&&(H=d.offsetHeight)}requestAnimationFrame(()=>{D()});function F(n,e){$=n,q=e,N&&N(x,n,e,c)}function T(){c=!1,h&&(h.expanded=!1),d.classList.remove("expandable-expanded"),r.innerHTML="⤢",r.title="Expand",r.style.top=`${-E[1]}px`,r.style.right=`${-E[0]}px`,p.parentNode&&p.remove(),W(),l&&(l.classList.remove("expandable-expanded"),l.style.display="none",B()),d.style.height="",o.style.position="relative",o.style.display="inline-block",o.style.top="",o.style.left="",o.style.transform="",o.style.width="",o.style.height="",o.style.overflow="",o.style.background="",o.style.boxShadow="",o.style.padding="",o.style.borderRadius="",o.style.zIndex="1";const n=o.querySelector("figure");n&&(n.style.margin=n._savedMargin??""),F(k,M),requestAnimationFrame(()=>{D()})}function X(){if(!c)return;const n=window.innerWidth,e=window.innerHeight,[t,i]=Array.isArray(C)?C:[C,C],[u,s]=Array.isArray(L)?L:[L,L],f=n-t*2-u*2,I=e-i*2-s*2,G=f+u*2,J=I+s*2;o.style.position="fixed",o.style.display="block",o.style.width=`${G}px`,o.style.height=`${J}px`,o.style.overflow="hidden",o.style.zIndex="9999",t===0&&i===0?(o.style.top="0",o.style.left="0",o.style.transform="none",o.style.borderRadius="0",o.style.boxShadow="none"):(o.style.top=`${i}px`,o.style.left=`${t}px`,o.style.transform="none",o.style.borderRadius="8px",o.style.boxShadow="0 8px 32px rgba(0,0,0,0.3)"),o.style.background="white",o.style.padding=`${s}px ${u}px`;const w=o.querySelector("figure");w&&(w._savedMargin=w._savedMargin??w.style.margin,w.style.margin="0"),F(f,I)}function Y(){if(c=!0,h&&(h.expanded=!0),d.classList.add("expandable-expanded"),r.innerHTML="✕",r.title="Collapse",r.style.top="8px",r.style.right="8px",p.parentNode||document.body.appendChild(p),p.style.opacity="1",p.style.pointerEvents="auto",H?d.style.height=`${H}px`:d.style.height=`${d.offsetHeight}px`,P.length>0&&l){const n=l.querySelector(".expandable-controls-content");if(n)for(const e of P){const t=typeof e=="string"?document.querySelector(e):e;if(!t||!t.parentNode)continue;const i=document.createElement("div");i.className="expandable-controls-placeholder",i.style.height=`${t.offsetHeight}px`,i.style.display="block",g.push({element:t,selector:typeof e=="string"?e:null,originalParent:t.parentNode,originalNextSibling:t.nextSibling,placeholder:i}),t.parentNode.insertBefore(i,t),n.appendChild(t)}if(g.length>0){l.parentNode||document.body.appendChild(l),l.classList.add("expandable-expanded"),l.style.cssText=`
          position: fixed;
          z-index: 10000;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          overflow: hidden;
          max-width: min(360px, calc(100vw - 32px));
          max-height: calc(100vh - 100px);
          left: ${a.x}px;
          top: ${a.y}px;
        `,v=!(window.innerWidth<640);const t=l.querySelector(".expandable-controls-content"),i=l.querySelector(".expandable-controls-toggle");v?(t&&(t.style.display="flex"),i&&(i.innerHTML="▼",i.title="Collapse controls")):(t&&(t.style.display="none"),i&&(i.innerHTML="▶",i.title="Expand controls"))}}X(),K()}r.addEventListener("click",n=>{n.stopPropagation(),c?T():Y()});const j=()=>{c&&X()};window.addEventListener("resize",j);const O=n=>{n.key==="Escape"&&c&&T()};document.addEventListener("keydown",O);const _=new MutationObserver(()=>{document.contains(d)||(document.removeEventListener("keydown",O),window.removeEventListener("resize",j),W(),p.parentNode&&p.remove(),B(),l&&l.parentNode&&l.remove(),_.disconnect())});return _.observe(document.body,{childList:!0,subtree:!0}),Object.defineProperty(d,"expandedDimensions",{get:()=>({width:$,height:q,expanded:c})}),h?.expanded&&requestAnimationFrame(()=>{Y()}),d}export{U as expandable};
