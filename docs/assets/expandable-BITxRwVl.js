function K(y,{width:C,height:k,toggleOffset:w=[8,8],onResize:E,controls:T}){let u=!1,N=C,P=k,b=!1,l={x:16,y:16},n=null,g=!1,f={x:0,y:0},d=null,m=null,L=null,x=null;const c=document.createElement("div");c.className="expandable-container",c.style.cssText=`
    position: relative;
    width: 100%;
  `;const t=document.createElement("div");t.className="expandable-content",t.style.cssText=`
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
  `,p.addEventListener("click",()=>H()),T){n=document.createElement("div"),n.className="expandable-controls-panel",n.style.cssText="display: none;";const e=document.createElement("div");e.className="expandable-controls-header",e.style.cssText=`
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
    `;const a=document.createElement("span");a.textContent="Controls";const o=document.createElement("button");o.className="expandable-controls-toggle",o.innerHTML="▼",o.title="Collapse controls",o.style.cssText=`
      border: none;
      background: none;
      cursor: pointer;
      font-size: 12px;
      color: #666;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.15s ease;
    `,o.addEventListener("mouseenter",()=>{o.style.background="rgba(0,0,0,0.1)"}),o.addEventListener("mouseleave",()=>{o.style.background="none"}),o.addEventListener("click",s=>{s.stopPropagation(),j()}),e.appendChild(a),e.appendChild(o);const r=document.createElement("div");r.className="expandable-controls-content",r.style.cssText=`
      padding: 12px;
      overflow-y: auto;
      max-height: calc(100vh - 200px);
    `,n.appendChild(e),n.appendChild(r),x=document.createElement("div"),x.className="expandable-controls-placeholder",x.style.cssText="display: none;",e.addEventListener("mousedown",s=>{s.target!==o&&(g=!0,f.x=s.clientX-l.x,f.y=s.clientY-l.y,e.style.cursor="grabbing",s.preventDefault())}),document.addEventListener("mousemove",s=>{g&&(l.x=s.clientX-f.x,l.y=s.clientY-f.y,S(),$())}),document.addEventListener("mouseup",()=>{if(g){g=!1;const s=n?.querySelector(".expandable-controls-header");s&&(s.style.cursor="move")}}),e.addEventListener("touchstart",s=>{if(s.target===o)return;g=!0;const h=s.touches[0];f.x=h.clientX-l.x,f.y=h.clientY-l.y,s.preventDefault()},{passive:!1}),document.addEventListener("touchmove",s=>{if(!g)return;const h=s.touches[0];l.x=h.clientX-f.x,l.y=h.clientY-f.y,S(),$()},{passive:!0}),document.addEventListener("touchend",()=>{g=!1})}function S(){if(!n)return;const e=n.getBoundingClientRect();l.x=Math.max(0,Math.min(l.x,window.innerWidth-e.width)),l.y=Math.max(0,Math.min(l.y,window.innerHeight-e.height))}function $(){n&&u&&(n.style.left=`${l.x}px`,n.style.top=`${l.y}px`)}function j(){if(b=!b,!n)return;const e=n.querySelector(".expandable-controls-content"),a=n.querySelector(".expandable-controls-toggle");b?(e&&(e.style.display="block"),a&&(a.innerHTML="▼",a.title="Collapse controls")):(e&&(e.style.display="none"),a&&(a.innerHTML="▶",a.title="Expand controls"))}function q(){d&&m&&(x&&x.parentNode&&x.parentNode.removeChild(x),L?m.insertBefore(d,L):m.appendChild(d),d=null,m=null,L=null)}const i=document.createElement("button");if(i.className="expandable-toggle",i.innerHTML="⤢",i.title="Expand",i.style.cssText=`
    position: absolute;
    top: ${-w[1]}px;
    right: ${-w[0]}px;
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
  `,i.addEventListener("mouseenter",()=>{i.style.background="rgba(255, 255, 255, 1)",i.style.boxShadow="0 2px 6px rgba(0,0,0,0.3)"}),i.addEventListener("mouseleave",()=>{i.style.background="rgba(255, 255, 255, 0.9)",i.style.boxShadow="0 1px 3px rgba(0,0,0,0.2)"}),typeof y=="function"&&(y=y()),typeof y=="string"){const e=document.createElement("div");e.innerHTML=y,y=e.firstElementChild||e}t.appendChild(y),t.appendChild(i),c.appendChild(t),E&&E(y,C,k,!1);let M=null;function z(){!u&&c.isConnected&&(M=c.offsetHeight)}requestAnimationFrame(()=>{z()});function W(e,a){N=e,P=a,E&&E(y,e,a,u)}function H(){u=!1,i.innerHTML="⤢",i.title="Expand",i.style.top=`${-w[1]}px`,i.style.right=`${-w[0]}px`,p.style.opacity="0",p.style.pointerEvents="none",n&&(n.style.display="none",q()),c.style.height="",t.style.position="relative",t.style.top="",t.style.left="",t.style.transform="",t.style.width="",t.style.background="",t.style.boxShadow="",t.style.padding="",t.style.borderRadius="",t.style.zIndex="1";const e=t.querySelector("figure");e&&(e.style.margin=e._savedMargin??""),W(C,k),requestAnimationFrame(()=>{z()})}function D(){if(!u)return;const e=window.innerWidth,a=window.innerHeight,o=e<640,r=o?3:16,s=o?8:16,h=o?0:48,A=o?32:48,X=e-h*2-r*2,F=a-A*2-s*2,R=X+r*2;t.style.position="fixed",t.style.width=`${R}px`,t.style.zIndex="9999",o?(t.style.top="50%",t.style.left="0",t.style.transform="translateY(-50%)",t.style.borderRadius="0",t.style.boxShadow="none"):(t.style.top="50%",t.style.left="50%",t.style.transform="translate(-50%, -50%)",t.style.borderRadius="8px",t.style.boxShadow="0 8px 32px rgba(0,0,0,0.3)"),t.style.background="white",t.style.padding=`${s}px ${r}px`;const v=t.querySelector("figure");v&&(v._savedMargin=v._savedMargin??v.style.margin,v.style.margin="0"),W(X,F)}function _(){if(u=!0,i.innerHTML="✕",i.title="Collapse",i.style.top="8px",i.style.right="8px",p.parentNode||document.body.appendChild(p),p.style.opacity="1",p.style.pointerEvents="auto",M?c.style.height=`${M}px`:c.style.height=`${c.offsetHeight}px`,T&&n&&(d=document.querySelector(T),d&&d.parentNode)){const e=n.querySelector(".expandable-controls-content");e&&(m=d.parentNode,L=d.nextSibling,x.style.height=`${d.offsetHeight}px`,x.style.display="block",m.insertBefore(x,d),e.appendChild(d)),n.parentNode||document.body.appendChild(n),n.style.cssText=`
          position: fixed;
          z-index: 10000;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          overflow: hidden;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 100px);
          left: ${l.x}px;
          top: ${l.y}px;
        `,b=!(window.innerWidth<640);const o=n.querySelector(".expandable-controls-content"),r=n.querySelector(".expandable-controls-toggle");b?(o&&(o.style.display="block"),r&&(r.innerHTML="▼",r.title="Collapse controls")):(o&&(o.style.display="none"),r&&(r.innerHTML="▶",r.title="Expand controls"))}D()}i.addEventListener("click",e=>{e.stopPropagation(),u?H():_()});const Y=()=>{u&&D()};window.addEventListener("resize",Y);const B=e=>{e.key==="Escape"&&u&&H()};document.addEventListener("keydown",B);const I=new MutationObserver(()=>{document.contains(c)||(document.removeEventListener("keydown",B),window.removeEventListener("resize",Y),p.parentNode&&p.remove(),q(),n&&n.parentNode&&n.remove(),I.disconnect())});return I.observe(document.body,{childList:!0,subtree:!0}),Object.defineProperty(c,"expandedDimensions",{get:()=>({width:N,height:P,expanded:u})}),c}export{K as expandable};
