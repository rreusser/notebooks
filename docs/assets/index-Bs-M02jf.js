import{d as s}from"./index-ByB2dbry.js";s({root:document.getElementById("cell-2"),expanded:[],variables:[]},{id:2,body:e=>{const i=document.getElementById("notebooksIndexData"),n=i?JSON.parse(i.textContent):[],d=new e(window.location.search),t=d.get("tag");return{dataEl:i,notebooks:n,urlParams:d,activeTag:t}},inputs:["URLSearchParams"],outputs:["dataEl","notebooks","urlParams","activeTag"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-3"),expanded:[],variables:[]},{id:3,body:(e,i)=>{const n=e.map(t=>({...t,imageUrl:t.imageExt?`./${t.path}meta.${t.imageExt}`:null})),d=i?n.filter(t=>t.tags?.includes(i)):n;return{notebooksWithImages:n,filteredNotebooks:d}},inputs:["notebooks","activeTag"],outputs:["notebooksWithImages","filteredNotebooks"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});s({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(e,i,n,d)=>{function t(a){return e`<a href="?tag=${encodeURIComponent(a)}" class="index__tag" onclick="event.stopPropagation()">${a}</a>`}function o(a){const r=a.imageUrl?e`<img class="index__image" src="${a.imageUrl}" alt="" loading="lazy" />`:e`<div class="index__placeholder"></div>`,u=a.tags?.length?e`<div class="index__tags">${a.tags.map(c=>t(c))}</div>`:"";return e`<li class="index__item">
    <a href="${a.path}" class="index__link">
      <div class="index__image-container">
        ${r}
      </div>
      <div class="index__content">
        <h2 class="index__title">${a.title}</h2>
        <div class="index__meta">
          ${a.publishedAt?e`<time class="index__date">${a.publishedAt}</time>`:""}
          ${u}
        </div>
      </div>
    </a>
  </li>`}const l=i?e`<div class="index__active-filter">
      <span class="index__filter-label">Filtered by:</span>
      <span class="index__filter-tag">
        ${i}
        <a href="./" class="index__filter-remove" aria-label="Remove filter">×</a>
      </span>
    </div>`:"";return n(e`
  ${l}
  <ul class="index">${d.map(o)}</ul>
`),{renderTag:t,renderCard:o,activeFilterHtml:l}},inputs:["html","activeTag","display","filteredNotebooks"],outputs:["renderTag","renderCard","activeFilterHtml"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
