function $(o,{width:c,height:y,toggleOffset:r=[8,8],onResize:d}){let a=!1,h=c,f=y;const i=document.createElement("div");i.className="expandable-container",i.style.cssText=`
    position: relative;
    width: 100%;
  `;const e=document.createElement("div");e.className="expandable-content",e.style.cssText=`
    position: relative;
    display: inline-block;
    z-index: 1;
  `;const s=document.createElement("div");s.className="expandable-overlay",s.style.cssText=`
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
  `,s.addEventListener("click",()=>x());const t=document.createElement("button");if(t.className="expandable-toggle",t.innerHTML="⤢",t.title="Expand",t.style.cssText=`
    position: absolute;
    top: ${-r[1]}px;
    right: ${-r[0]}px;
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
  `,t.addEventListener("mouseenter",()=>{t.style.background="rgba(255, 255, 255, 1)",t.style.boxShadow="0 2px 6px rgba(0,0,0,0.3)"}),t.addEventListener("mouseleave",()=>{t.style.background="rgba(255, 255, 255, 0.9)",t.style.boxShadow="0 1px 3px rgba(0,0,0,0.2)"}),typeof o=="function"&&(o=o()),typeof o=="string"){const n=document.createElement("div");n.innerHTML=o,o=n.firstElementChild||n}e.appendChild(o),e.appendChild(t),i.appendChild(e),d&&d(o,c,y,!1);let u=null;function b(){!a&&i.isConnected&&(u=i.offsetHeight)}requestAnimationFrame(()=>{b()});function g(n,l){h=n,f=l,d&&d(o,n,l,a)}function x(){a=!1,t.innerHTML="⤢",t.title="Expand",t.style.top=`${-r[1]}px`,t.style.right=`${-r[0]}px`,s.style.opacity="0",s.style.pointerEvents="none",i.style.height="",e.style.position="relative",e.style.top="",e.style.left="",e.style.transform="",e.style.width="",e.style.background="",e.style.boxShadow="",e.style.padding="",e.style.borderRadius="",e.style.zIndex="1";const n=e.querySelector("figure");n&&(n.style.margin=""),g(c,y),requestAnimationFrame(()=>{b()})}function m(){if(!a)return;const n=window.innerWidth,l=window.innerHeight,p=16,k=Math.min(n*.9,1200)-p*2,C=Math.min(l*.8,900)-p*2,T=k+p*2;e.style.position="fixed",e.style.width=`${T}px`,e.style.top="50%",e.style.left="50%",e.style.transform="translate(-50%, -50%)",e.style.background="white",e.style.boxShadow="0 8px 32px rgba(0,0,0,0.3)",e.style.padding=`${p}px`,e.style.borderRadius="8px",e.style.zIndex="9999";const L=e.querySelector("figure");L&&(L.style.margin="0"),g(k,C)}function H(){a=!0,t.innerHTML="✕",t.title="Collapse",t.style.top="8px",t.style.right="8px",s.parentNode||document.body.appendChild(s),s.style.opacity="1",s.style.pointerEvents="auto",u?i.style.height=`${u}px`:i.style.height=`${i.offsetHeight}px`,m()}t.addEventListener("click",n=>{n.stopPropagation(),a?x():H()});const v=()=>{a&&m()};window.addEventListener("resize",v);const w=n=>{n.key==="Escape"&&a&&x()};document.addEventListener("keydown",w);const E=new MutationObserver(()=>{document.contains(i)||(document.removeEventListener("keydown",w),window.removeEventListener("resize",v),s.parentNode&&s.remove(),E.disconnect())});return E.observe(document.body,{childList:!0,subtree:!0}),Object.defineProperty(i,"expandedDimensions",{get:()=>({width:h,height:f,expanded:a})}),i}export{$ as expandable};
