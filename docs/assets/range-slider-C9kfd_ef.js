function j(i="scope-"){return i+(performance.now()+Math.random()).toString(32).replace(".","-")}function A(i){return i==null?null:typeof i=="number"?`${i}px`:`${i}`}const B=`
/* Options */
:scope {
  color: #3b99fc;
  width: 240px;
}

:scope {
  position: relative;
  display: inline-block;
  --thumb-size: 15px;
  --thumb-radius: calc(var(--thumb-size) / 2);
  padding: var(--thumb-radius) 0;
  margin: 2px;
  vertical-align: middle;
}
:scope .range-track {
  box-sizing: border-box;
  position: relative;
  height: 7px;
  background-color: hsl(0, 0%, 80%);
  overflow: visible;
  border-radius: 4px;
  padding: 0 var(--thumb-radius);
}
:scope .range-track-zone {
  box-sizing: border-box;
  position: relative;
}
:scope .range-select {
  box-sizing: border-box;
  position: relative;
  left: var(--range-min);
  width: calc(var(--range-max) - var(--range-min));
  cursor: ew-resize;
  background: currentColor;
  height: 7px;
  border: inherit;
}
/* Expands the hotspot area. */
:scope .range-select:before {
  content: "";
  position: absolute;
  width: 100%;
  height: var(--thumb-size);
  left: 0;
  top: calc(2px - var(--thumb-radius));
}
:scope .range-select:focus,
:scope .thumb:focus {
  outline: none;
}
:scope .thumb {
  box-sizing: border-box;
  position: absolute;
  width: var(--thumb-size);
  height: var(--thumb-size);

  background: #fcfcfc;
  top: -4px;
  border-radius: 100%;
  border: 1px solid hsl(0,0%,55%);
  cursor: default;
  margin: 0;
}
:scope .thumb:active {
  box-shadow: inset 0 var(--thumb-size) #0002;
}
:scope .thumb-min {
  left: calc(-1px - var(--thumb-radius));
}
:scope .thumb-max {
  right: calc(-1px - var(--thumb-radius));
}
`;function H(i={}){const{min:d=0,max:p=100,step:L="any",value:M=[d,p],color:C,width:S,theme:D=B,transform:b=null,invert:R=null}=i;let x,w;if(b)if(x=b,R)w=R;else if(b===Math.log)w=Math.exp;else if(b===Math.sqrt)w=e=>e*e;else throw new Error("rangeInput: transform provided without invert function");else x=e=>e,w=e=>e;const E=x(d),q=x(p),c={},m=j(),$=(e,t,s)=>s<e?e:s>t?t:s,r=document.createElement("input");r.type="range",r.min=d,r.max=p,r.step=L;const n=document.createElement("div");n.className=`${m} range-slider`,C&&(n.style.color=C),S&&(n.style.width=A(S)),n.innerHTML=`
    <div class="range-track">
      <div class="range-track-zone">
        <div class="range-select" tabindex="0">
          <div class="thumb thumb-min" tabindex="0"></div>
          <div class="thumb thumb-max" tabindex="0"></div>
        </div>
      </div>
    </div>
    <style>${D.replace(/:scope\b/g,"."+m)}</style>
  `,c.track=n.querySelector(".range-track"),c.zone=n.querySelector(".range-track-zone"),c.range=n.querySelector(".range-select"),c.min=n.querySelector(".thumb-min"),c.max=n.querySelector(".thumb-max");let o=[],g=!1;Object.defineProperty(n,"value",{get:()=>[...o],set:([e,t])=>{o=y(e,t),z()}});const y=(e,t)=>(e=isNaN(e)?d:(r.value=e,r.valueAsNumber),t=isNaN(t)?p:(r.value=t,r.valueAsNumber),[Math.min(e,t),Math.max(e,t)]),u=e=>(x(e)-E)/(q-E),f=e=>w(E+e*(q-E)),z=()=>{n.style.setProperty("--range-min",`${u(o[0])*100}%`),n.style.setProperty("--range-max",`${u(o[1])*100}%`)},a=e=>{n.dispatchEvent(new Event(e,{bubbles:!0}))},h=(e,t)=>{const[s,l]=o;o=y(e,t),z(),!(s===o[0]&&l===o[1])&&(a("input"),g=!0)};h(...M);const O=new Map([[c.min,(e,t)=>{const s=u(t[0]),l=u(t[1]),v=$(0,l,s+e);h(f(v),t[1])}],[c.max,(e,t)=>{const s=u(t[0]),l=u(t[1]),v=$(s,1,l+e);h(t[0],f(v))}],[c.range,(e,t)=>{const s=u(t[0]),v=u(t[1])-s,k=$(0,1-v,s+e);h(f(k),f(k+v))}]]),P=e=>e.touches?e.touches[0]:e;let V,X,I,T=!1;function F(e){if(!e.buttons&&!e.touches){N();return}T=!0;const t=c.zone.getBoundingClientRect().width;e.preventDefault(),O.get(I)((P(e).clientX-V)/t,X)}function N(e){document.removeEventListener("mousemove",F),document.removeEventListener("touchmove",F),document.removeEventListener("mouseup",N),document.removeEventListener("touchend",N),g&&a("change")}return n.ontouchstart=n.onmousedown=e=>{T=!1,g=!1,O.has(e.target)&&(document.addEventListener("mousemove",F,{passive:!1}),document.addEventListener("touchmove",F,{passive:!1}),document.addEventListener("mouseup",N),document.addEventListener("touchend",N),e.preventDefault(),e.stopPropagation(),I=e.target,V=P(e).clientX,X=o.slice())},c.track.onclick=e=>{if(T)return;g=!1;const t=c.zone.getBoundingClientRect(),s=$(0,1,(P(e).clientX-t.left)/t.width),l=f(s),[v,k]=o;if(l<v){const _=k-v;h(l,l+_)}else if(l>k){const _=k-v;h(l-_,l)}g&&a("change")},n}function G(i){if(!i||i>=1)return 0;const d=i.toString(),p=d.indexOf(".");return p===-1?0:d.length-p-1}function J(i=[],d={}){const[p=0,L=1]=i,M=d.step??.001,C=d.precision??G(M),S=([a,h])=>`${a.toFixed(C)} … ${h.toFixed(C)}`,{label:D=null,value:b=[p,L],format:R=S,color:x,width:w=360,theme:E,transform:q=null,invert:c=null,__ns__:m=j()}=d,$=`
#${m} {
  font: 13px/1.2 var(--sans-serif);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  max-width: 100%;
  width: auto;
}
@media only screen and (min-width: 30em) {
  #${m} {
    flex-wrap: nowrap;
    width: ${A(w)};
  }
}
#${m} .label {
  width: 120px;
  padding: 5px 0 4px 0;
  margin-right: 6.5px;
  flex-shrink: 0;
}
#${m} .form {
  display: flex;
  width: 100%;
}
#${m} .range {
  display: block;
  width: 100%;
}
#${m} .range-slider {
  width: 100%;
}
#${m} .range-output {
  font-variant-numeric: tabular-nums;
  margin-top: 2px;
}
  `,r=H({min:p,max:L,value:[b[0],b[1]],step:M,color:x,width:"100%",theme:E,transform:q,invert:c}),n=document.createElement("output"),o=document.createElement("div");if(o.id=m,D!=null){const a=document.createElement("div");a.className="label",a.textContent=D,o.appendChild(a)}const g=document.createElement("div");g.className="form";const y=document.createElement("div");y.className="range",y.appendChild(r);const u=document.createElement("div");u.className="range-output",u.appendChild(n),y.appendChild(u),g.appendChild(y),o.appendChild(g);const f=document.createElement("style");f.textContent=$,o.appendChild(f);const z=()=>{const a=R([r.value[0],r.value[1]]);if(typeof a=="string")n.value=a;else{for(;n.lastChild;)n.lastChild.remove();n.appendChild(a)}};return r.oninput=z,z(),Object.defineProperty(o,"value",{get:()=>r.value,set:([a,h])=>{r.value=[a,h],z()}})}export{J as interval,H as rangeInput};
