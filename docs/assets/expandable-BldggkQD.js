function K(y,{width:C,height:N,toggleOffset:v=[8,8],onResize:w,controls:E}){let p=!1,M=C,P=N,h=!1,a={x:16,y:16},i=null,f=!1,x={x:0,y:0};const L=E?Array.isArray(E)?E:[E]:[],g=[];let m=null;const d=document.createElement("div");d.className="expandable-container",d.style.cssText=`
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
  `,u.addEventListener("click",()=>S()),L.length>0){i=document.createElement("div"),i.className="expandable-controls-panel",i.style.cssText="display: none;";const n=document.createElement("div");n.className="expandable-controls-header",n.style.cssText=`
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
    `;const t=document.createElement("span");t.textContent="Controls";const e=document.createElement("button");e.className="expandable-controls-toggle",e.innerHTML="▼",e.title="Collapse controls",e.style.cssText=`
      border: none;
      background: none;
      cursor: pointer;
      font-size: 12px;
      color: #666;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.15s ease;
    `,e.addEventListener("mouseenter",()=>{e.style.background="rgba(0,0,0,0.1)"}),e.addEventListener("mouseleave",()=>{e.style.background="none"}),e.addEventListener("click",s=>{s.stopPropagation(),X()}),n.appendChild(t),n.appendChild(e);const l=document.createElement("div");l.className="expandable-controls-content",l.style.cssText=`
      padding: 12px;
      overflow-y: auto;
      max-height: calc(100vh - 200px);
    `,i.appendChild(n),i.appendChild(l),n.addEventListener("mousedown",s=>{s.target!==e&&(f=!0,x.x=s.clientX-a.x,x.y=s.clientY-a.y,n.style.cursor="grabbing",s.preventDefault())}),document.addEventListener("mousemove",s=>{f&&(a.x=s.clientX-x.x,a.y=s.clientY-x.y,T(),H())}),document.addEventListener("mouseup",()=>{if(f){f=!1;const s=i?.querySelector(".expandable-controls-header");s&&(s.style.cursor="move")}}),n.addEventListener("touchstart",s=>{if(s.target===e)return;f=!0;const c=s.touches[0];x.x=c.clientX-a.x,x.y=c.clientY-a.y,s.preventDefault()},{passive:!1}),document.addEventListener("touchmove",s=>{if(!f)return;const c=s.touches[0];a.x=c.clientX-x.x,a.y=c.clientY-x.y,T(),H()},{passive:!0}),document.addEventListener("touchend",()=>{f=!1})}function T(){if(!i)return;const n=i.getBoundingClientRect();a.x=Math.max(0,Math.min(a.x,window.innerWidth-n.width)),a.y=Math.max(0,Math.min(a.y,window.innerHeight-n.height))}function H(){i&&p&&(i.style.left=`${a.x}px`,i.style.top=`${a.y}px`)}function X(){if(h=!h,!i)return;const n=i.querySelector(".expandable-controls-content"),t=i.querySelector(".expandable-controls-toggle");h?(n&&(n.style.display="block"),t&&(t.innerHTML="▼",t.title="Collapse controls")):(n&&(n.style.display="none"),t&&(t.innerHTML="▶",t.title="Expand controls"))}function q(){for(let n=g.length-1;n>=0;n--){const t=g[n];if(t){if(t.placeholder&&t.placeholder.parentNode&&t.placeholder.parentNode.removeChild(t.placeholder),t.selector){const e=document.querySelector(t.selector);if(e&&e!==t.element){t.element.parentNode&&t.element.parentNode.removeChild(t.element);continue}}t.element&&t.originalParent&&(t.originalNextSibling?t.originalParent.insertBefore(t.element,t.originalNextSibling):t.originalParent.appendChild(t.element))}}g.length=0}function j(){m||(m=new MutationObserver(n=>{if(!p||!i)return;const t=i.querySelector(".expandable-controls-content");if(t)for(const e of g){if(!e.selector)continue;const l=document.querySelector(e.selector);if(l&&l!==e.element&&!t.contains(l)){const s=e.element;e.element=l,e.originalParent=l.parentNode,e.originalNextSibling=l.nextSibling;const c=document.createElement("div");c.className="expandable-controls-placeholder",c.style.display="none",l.parentNode.insertBefore(c,l),e.placeholder&&e.placeholder.parentNode&&e.placeholder.parentNode.removeChild(e.placeholder),e.placeholder=c,s.parentNode===t?(t.insertBefore(l,s),t.removeChild(s)):t.appendChild(l)}}}),m.observe(document.body,{childList:!0,subtree:!0}))}function $(){m&&(m.disconnect(),m=null)}const r=document.createElement("button");if(r.className="expandable-toggle",r.innerHTML="⤢",r.title="Expand",r.style.cssText=`
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
  `,r.addEventListener("mouseenter",()=>{r.style.background="rgba(255, 255, 255, 1)",r.style.boxShadow="0 2px 6px rgba(0,0,0,0.3)"}),r.addEventListener("mouseleave",()=>{r.style.background="rgba(255, 255, 255, 0.9)",r.style.boxShadow="0 1px 3px rgba(0,0,0,0.2)"}),typeof y=="function"&&(y=y()),typeof y=="string"){const n=document.createElement("div");n.innerHTML=y,y=n.firstElementChild||n}o.appendChild(y),o.appendChild(r),d.appendChild(o),w&&w(y,C,N,!1);let k=null;function z(){!p&&d.isConnected&&(k=d.offsetHeight)}requestAnimationFrame(()=>{z()});function W(n,t){M=n,P=t,w&&w(y,n,t,p)}function S(){p=!1,r.innerHTML="⤢",r.title="Expand",r.style.top=`${-v[1]}px`,r.style.right=`${-v[0]}px`,u.style.opacity="0",u.style.pointerEvents="none",$(),i&&(i.style.display="none",q()),d.style.height="",o.style.position="relative",o.style.display="inline-block",o.style.top="",o.style.left="",o.style.transform="",o.style.width="",o.style.background="",o.style.boxShadow="",o.style.padding="",o.style.borderRadius="",o.style.zIndex="1";const n=o.querySelector("figure");n&&(n.style.margin=n._savedMargin??""),W(C,N),requestAnimationFrame(()=>{z()})}function B(){if(!p)return;const n=window.innerWidth,t=window.innerHeight,e=n<640,l=e?3:16,s=e?8:16,c=e?0:48,_=e?32:48,I=n-c*2-l*2,F=t-_*2-s*2,R=I+l*2;o.style.position="fixed",o.style.display="block",o.style.width=`${R}px`,o.style.zIndex="9999",e?(o.style.top="50%",o.style.left="0",o.style.transform="translateY(-50%)",o.style.borderRadius="0",o.style.boxShadow="none"):(o.style.top="50%",o.style.left="50%",o.style.transform="translate(-50%, -50%)",o.style.borderRadius="8px",o.style.boxShadow="0 8px 32px rgba(0,0,0,0.3)"),o.style.background="white",o.style.padding=`${s}px ${l}px`;const b=o.querySelector("figure");b&&(b._savedMargin=b._savedMargin??b.style.margin,b.style.margin="0"),W(I,F)}function O(){if(p=!0,r.innerHTML="✕",r.title="Collapse",r.style.top="8px",r.style.right="8px",u.parentNode||document.body.appendChild(u),u.style.opacity="1",u.style.pointerEvents="auto",k?d.style.height=`${k}px`:d.style.height=`${d.offsetHeight}px`,L.length>0&&i){const n=i.querySelector(".expandable-controls-content");if(n)for(const t of L){const e=typeof t=="string"?document.querySelector(t):t;if(!e||!e.parentNode)continue;const l=document.createElement("div");l.className="expandable-controls-placeholder",l.style.height=`${e.offsetHeight}px`,l.style.display="block",g.push({element:e,selector:typeof t=="string"?t:null,originalParent:e.parentNode,originalNextSibling:e.nextSibling,placeholder:l}),e.parentNode.insertBefore(l,e),n.appendChild(e)}if(g.length>0){i.parentNode||document.body.appendChild(i),i.style.cssText=`
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
        `,h=!(window.innerWidth<640);const e=i.querySelector(".expandable-controls-content"),l=i.querySelector(".expandable-controls-toggle");h?(e&&(e.style.display="block"),l&&(l.innerHTML="▼",l.title="Collapse controls")):(e&&(e.style.display="none"),l&&(l.innerHTML="▶",l.title="Expand controls"))}}B(),j()}r.addEventListener("click",n=>{n.stopPropagation(),p?S():O()});const A=()=>{p&&B()};window.addEventListener("resize",A);const D=n=>{n.key==="Escape"&&p&&S()};document.addEventListener("keydown",D);const Y=new MutationObserver(()=>{document.contains(d)||(document.removeEventListener("keydown",D),window.removeEventListener("resize",A),$(),u.parentNode&&u.remove(),q(),i&&i.parentNode&&i.remove(),Y.disconnect())});return Y.observe(document.body,{childList:!0,subtree:!0}),Object.defineProperty(d,"expandedDimensions",{get:()=>({width:M,height:P,expanded:p})}),d}export{K as expandable};
