function N(o,{width:y,height:x,toggleOffset:l=[8,8],onResize:p}){let a=!1,h=y,b=x;const i=document.createElement("div");i.className="expandable-container",i.style.cssText=`
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
  `,s.addEventListener("click",()=>g());const t=document.createElement("button");if(t.className="expandable-toggle",t.innerHTML="⤢",t.title="Expand",t.style.cssText=`
    position: absolute;
    top: ${-l[1]}px;
    right: ${-l[0]}px;
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
  `,t.addEventListener("mouseenter",()=>{t.style.background="rgba(255, 255, 255, 1)",t.style.boxShadow="0 2px 6px rgba(0,0,0,0.3)"}),t.addEventListener("mouseleave",()=>{t.style.background="rgba(255, 255, 255, 0.9)",t.style.boxShadow="0 1px 3px rgba(0,0,0,0.2)"}),typeof o=="function"&&(o=o()),typeof o=="string"){const n=document.createElement("div");n.innerHTML=o,o=n.firstElementChild||n}e.appendChild(o),e.appendChild(t),i.appendChild(e),p&&p(o,y,x,!1);let u=null;function m(){!a&&i.isConnected&&(u=i.offsetHeight)}requestAnimationFrame(()=>{m()});function v(n,c){h=n,b=c,p&&p(o,n,c,a)}function g(){a=!1,t.innerHTML="⤢",t.title="Expand",t.style.top=`${-l[1]}px`,t.style.right=`${-l[0]}px`,s.style.opacity="0",s.style.pointerEvents="none",i.style.height="",e.style.position="relative",e.style.top="",e.style.left="",e.style.transform="",e.style.width="",e.style.background="",e.style.boxShadow="",e.style.padding="",e.style.borderRadius="",e.style.zIndex="1";const n=e.querySelector("figure");n&&(n.style.margin=n._savedMargin??""),v(y,x),requestAnimationFrame(()=>{m()})}function w(){if(!a)return;const n=window.innerWidth,c=window.innerHeight,r=n<640,f=r?3:16,H=r?8:16,C=r?0:48,T=r?32:48,M=n-C*2-f*2,z=c-T*2-H*2,S=M+f*2;e.style.position="fixed",e.style.width=`${S}px`,e.style.zIndex="9999",r?(e.style.top="50%",e.style.left="0",e.style.transform="translateY(-50%)",e.style.borderRadius="0",e.style.boxShadow="none"):(e.style.top="50%",e.style.left="50%",e.style.transform="translate(-50%, -50%)",e.style.borderRadius="8px",e.style.boxShadow="0 8px 32px rgba(0,0,0,0.3)"),e.style.background="white",e.style.padding=`${H}px ${f}px`;const d=e.querySelector("figure");d&&(d._savedMargin=d._savedMargin??d.style.margin,d.style.margin="0"),v(M,z)}function $(){a=!0,t.innerHTML="✕",t.title="Collapse",t.style.top="8px",t.style.right="8px",s.parentNode||document.body.appendChild(s),s.style.opacity="1",s.style.pointerEvents="auto",u?i.style.height=`${u}px`:i.style.height=`${i.offsetHeight}px`,w()}t.addEventListener("click",n=>{n.stopPropagation(),a?g():$()});const E=()=>{a&&w()};window.addEventListener("resize",E);const k=n=>{n.key==="Escape"&&a&&g()};document.addEventListener("keydown",k);const L=new MutationObserver(()=>{document.contains(i)||(document.removeEventListener("keydown",k),window.removeEventListener("resize",E),s.parentNode&&s.remove(),L.disconnect())});return L.observe(document.body,{childList:!0,subtree:!0}),Object.defineProperty(i,"expandedDimensions",{get:()=>({width:h,height:b,expanded:a})}),i}export{N as expandable};
