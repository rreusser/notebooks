import{d as u}from"./index-ByB2dbry.js";u({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(e,t)=>e`For a color image, the task is not so simple, as RGB tuples permit no useful ordering. The [Hungarian Algorithm](https://en.wikipedia.org/wiki/Hungarian_algorithm) provides an exhaustively brute-force solution to the assignment problem we seek to solve, but its ${t`\mathcal{O}(n^3)`} complexity makes it completely impractical for images. Theo Honohan has pointed to some [good alternative methods](https://graphics.social/@theohonohan/111490607440087628).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(e,t,n)=>{const o=e(t.select(Object.keys(n),{label:"Source",value:"ellingwood"})),a=e(t.select(Object.keys(n),{label:"Target",value:"webb"})),i=e(t.range([1,4],{value:2,label:"Downsample",step:.25})),s=e(t.range([1,32],{label:"Batch size",value:8,step:1})),p=e(t.range([1,1024],{label:"Max iterations",value:100,transform:Math.log,step:1})),l=e(t.range([.05,1],{label:"Tolerance",transform:Math.log,value:.3})),r=e(t.range([0,1],{label:"Interpolate",value:1})),m=e(t.button("Restart"));return{sourceFile:o,targetFile:a,downsample:i,batchSize:s,maxIterations:p,tolerance:l,interpolate:r,restart:m}},inputs:["view","Inputs","FILES"],outputs:["sourceFile","targetFile","downsample","batchSize","maxIterations","tolerance","interpolate","restart"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(e,t,n,o,a,i,s,p)=>{const l=e`<figure class="image-figure">
  <style>
    .image-figure {
      --extra: min(60px, max(0px, calc((100vw - 100%) / 2 - 8px)));
      max-width: min(840px, calc(100vw - 16px));
      width: calc(100% + var(--extra) * 2);
      margin-left: calc(var(--extra) * -1);
      margin-right: calc(var(--extra) * -1);
    }
    .image-figure .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .image-figure .column {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .image-figure .label {
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 4px;
    }
    .image-figure .histogram {
      margin-top: 8px;
    }
    @media (max-width: 600px) {
      .image-figure {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
      }
      .image-figure .grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
    }
  </style>
  <div class="grid"></div>
</figure>`,r=l.querySelector(".grid"),m=["Source","Result","Target"],d=[t,n,o],b=window.innerWidth<=600,f=b?Math.min(480,window.innerWidth-32):280,g=b?120:200;return d.forEach((c,y)=>{const h=document.createElement("div");h.className="column";const v=document.createElement("div");v.className="label",v.textContent=m[y],h.appendChild(v);const x=a(c,...i);x.style.width="100%",x.style.height="auto",h.appendChild(x);const w=document.createElement("div");w.className="histogram";const j=s(c,{w:f,h:g});j.style.width="100%",w.appendChild(j),h.appendChild(w),r.appendChild(h)}),p(l),{figure:l,grid:r,labels:m,datasets:d,isMobile:b,histWidth:f,histHeight:g}},inputs:["html","srcData","interpolated","targetData","drawImage","shape","plotHistogram","display"],outputs:["figure","grid","labels","datasets","isMobile","histWidth","histHeight"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(e,t,n,o,a,i,s)=>{t(n`<figure>${o.plot({height:150,width:Math.min(a,400),y:{grid:!0,type:"log"},x:{grid:!0},marks:[o.lineY(i.history,{x:"iteration",y:"delta"}),o.ruleY([s],{strokeDasharray:"4,4",stroke:"rgb(200 0 0)"})]})}</figure>`)},inputs:["result","display","html","Plot","width","state","tolerance"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(e,t)=>({smoothHistogram:e(t.checkbox(["Smooth histograms"],{value:["Smooth histograms"]}))}),inputs:["view","Inputs"],outputs:["smoothHistogram"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:()=>({state:{history:[]}}),inputs:[],outputs:["state"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(e,t,n)=>{const o=e.src.length,a=new Uint8ClampedArray(o);for(let s=0;s<o;s++)a[s]=t[s]+(e.src[s]-t[s])*n;return{N:o,out:a,interpolated:a}},inputs:["result","srcData","interpolate"],outputs:["N","out","interpolated"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(e,t,n,o,a,i,s,p,l)=>(t.history=[],{result:n.observe(m=>{let d=!1;const b=o(a.slice(),i,{maxIterations:s,batchSize:p,tolerance:l,state:t});async function f(){if(d)return;const{value:g,done:c}=await b.next();d||(g&&m(g),!c&&!d&&requestAnimationFrame(f))}return f(),()=>{d=!0}})}),inputs:["restart","state","Generators","slicedOptimalTransport","srcData","targetData","maxIterations","batchSize","tolerance"],outputs:["result"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:e=>{const t=`
  function sort(values, indices, left, right) {
    let tmp;
    if (left >= right) return;
    const pivot = values[(left + right) >> 1];
    let i = left - 1;
    let j = right + 1;
    while (true) {
      do i++;
      while (values[i] < pivot);
      do j--;
      while (values[j] > pivot);
      if (i >= j) break;
      tmp = values[i];
      values[i] = values[j];
      values[j] = tmp;
      tmp = indices[i];
      indices[i] = indices[j];
      indices[j] = tmp;
    }
    sort(values, indices, left, j);
    sort(values, indices, j + 1, right);
  }

  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  function vec3normalize(out, a) {
    const x = a[0], y = a[1], z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }

  self.onmessage = function(e) {
    const { id, src, tgt, N } = e.data;
    const index = new Uint32Array(N);
    const srcProjection = new Float32Array(N);
    const tgtProjection = new Float32Array(N);
    const adjustment = new Float32Array(N * 3);

    const [v0, v1, v2] = vec3normalize([], [randn(), randn(), randn()]);

    for (let i = 0, i4 = 0; i < N; i++, i4 += 4) {
      index[i] = i;
      srcProjection[i] = v0 * src[i4] + v1 * src[i4 + 1] + v2 * src[i4 + 2];
      tgtProjection[i] = v0 * tgt[i4] + v1 * tgt[i4 + 1] + v2 * tgt[i4 + 2];
    }

    sort(srcProjection, index, 0, N - 1);
    tgtProjection.sort();

    for (let j = 0; j < N; j++) {
      const projectedDiff = tgtProjection[j] - srcProjection[j];
      const i3 = index[j] * 3;
      adjustment[i3 + 0] = v0 * projectedDiff;
      adjustment[i3 + 1] = v1 * projectedDiff;
      adjustment[i3 + 2] = v2 * projectedDiff;
    }

    self.postMessage({ id, adjustment }, [adjustment.buffer]);
  };
`,n=new Blob([t],{type:"application/javascript"}),o=URL.createObjectURL(n),a=navigator.hardwareConcurrency||4,i=new Map;let s=0;const p=Array.from({length:a},()=>{const r=new Worker(o);return r.onmessage=m=>{const{id:d,adjustment:b}=m.data,f=i.get(d);f&&(i.delete(d),f(b))},r});function l(r,m,d,b){const f=s++,g=p[r%p.length];return new Promise(c=>{i.set(f,c),g.postMessage({id:f,src:m,tgt:d,N:b})})}return e.then(()=>{p.forEach(r=>r.terminate()),URL.revokeObjectURL(o),i.clear()}),{workerCode:t,workerBlob:n,workerUrl:o,numWorkers:a,pendingJobs:i,nextJobId:s,workerPool:p,runWorkerJob:l}},inputs:["invalidation"],outputs:["workerCode","workerBlob","workerUrl","numWorkers","pendingJobs","nextJobId","workerPool","runWorkerJob"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:e=>{async function*t(n,o,{maxIterations:a=100,batchSize:i=4,tolerance:s=1,state:p}={}){if(n.length!==o.length)throw new Error("Source size must equal target size");p.history=[];const l=n.length>>2,r=new Float32Array(n),m=new Float32Array(o);let d=1/0,b=0;for(;d>s&&++b<=a;){const g=await e(r,m,l,i);d=0;for(let y=0,h=0;h<l*4;y+=3,h+=4){const v=g[y]/i,x=g[y+1]/i,w=g[y+2]/i;r[h]+=v,r[h+1]+=x,r[h+2]+=w,d+=v*v+x*x+w*w}d=Math.sqrt(d/l),p.history=p.history.concat([{iteration:b,delta:d}]);const c=new Uint8ClampedArray(r.length);for(let y=0;y<r.length;y++)c[y]=r[y];yield{delta:d,src:c}}const f=new Uint8ClampedArray(r.length);for(let g=0;g<r.length;g++)f[g]=r[g];return{delta:d,src:f}}return{slicedOptimalTransport:t}},inputs:["runBatchParallel"],outputs:["slicedOptimalTransport"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:e=>{async function t(n,o,a,i){const s=[];for(let r=0;r<i;r++)s.push(e(r,n,o,a));const p=await Promise.all(s),l=new Float32Array(a*3);for(const r of p)for(let m=0;m<l.length;m++)l[m]+=r[m];return l}return{runBatchParallel:t}},inputs:["runWorkerJob"],outputs:["runBatchParallel"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(e,t)=>({shape:[e.width/t|0,e.height/t|0]}),inputs:["src","downsample"],outputs:["shape"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:e=>{function t(n,o,a,i=2){const s=document.createElement("canvas");s.style.width=`${o*e/i}px`,s.style.height=`${a*e/i}px`,s.width=o,s.height=a,s.style.display="inline-block";const p=s.getContext("2d"),l=p.getImageData(0,0,o,a);return l.data.set(n),p.putImageData(l,0,0),s}return{drawImage:t}},inputs:["downsample"],outputs:["drawImage"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:()=>{function e(t,n,o){const a=document.createElement("canvas");a.width=n,a.height=o;const i=a.getContext("2d");return i.drawImage(t,0,0,n,o),i.getImageData(0,0,a.width,a.height).data}return{getPixels:e}},inputs:[],outputs:["getPixels"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:e=>({FILES:{ellingwood:e(new URL("/notebooks/assets/ellingwood-BY6AMUUr.jpg",import.meta.url).href),gravity:e(new URL("/notebooks/assets/gravity-DxsNUaAg.jpg",import.meta.url).href),m61:e(new URL("/notebooks/assets/m61-CMx116bK.jpg",import.meta.url).href),webb:e(new URL("/notebooks/assets/webb-B-bgMLfR.jpg",import.meta.url).href),yosemite:e(new URL("/notebooks/assets/yosemite-Bf4zccGA.jpg",import.meta.url).href),yosemite2:e(new URL("/notebooks/assets/yosemite2-CoeK441w.jpg",import.meta.url).href),yosemite3:e(new URL("/notebooks/assets/yosemite3-A5rk0zjS.jpg",import.meta.url).href),yosemite4:e(new URL("/notebooks/assets/yosemite4-CctwNKjh.jpg",import.meta.url).href),topographic:e(new URL("/notebooks/assets/topographic-BDjeFbTg.jpg",import.meta.url).href),bigcat:e(new URL("/notebooks/assets/bigcat-B7hKXyi2.jpg",import.meta.url).href),hokitika:e(new URL("/notebooks/assets/hokitika-DAx14Vh-.jpg",import.meta.url).href),"arthur's pass":e(new URL("/notebooks/assets/arthurs-pass-DjEsq2aL.jpg",import.meta.url).href),rainier:e(new URL("/notebooks/assets/rainier-DyCVLo8B.jpg",import.meta.url).href),shelf:e(new URL("/notebooks/assets/shelf-CvUf6jR_.jpg",import.meta.url).href),cranes:e(new URL("/notebooks/assets/cranes-B99uinfj.jpg",import.meta.url).href),"smith rock":e(new URL("/notebooks/assets/smith-rock-Klxbi4bk.jpg",import.meta.url).href),dog:e(new URL("/notebooks/assets/dog-B0PBrh4h.jpg",import.meta.url).href),"ansel adams":e(new URL("/notebooks/assets/ansel-adams-DU9iz5cO.jpg",import.meta.url).href)}}),inputs:["FileAttachment"],outputs:["FILES"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:async(e,t,n)=>({src:await e(await t[n].blob())}),inputs:["createImageBitmap","FILES","sourceFile"],outputs:["src"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:async(e,t,n)=>({target:await e(await t[n].blob())}),inputs:["createImageBitmap","FILES","targetFile"],outputs:["target"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(e,t,n)=>({srcData:e(t,t.width/n,t.height/n)}),inputs:["getPixels","src","downsample"],outputs:["srcData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-25"),expanded:[],variables:[]},{id:25,body:(e,t,n,o)=>({targetData:e(t,n.width/o,n.height/o)}),inputs:["getPixels","target","src","downsample"],outputs:["targetData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:()=>{function e(t){const n=t.slice(),o=t.length;for(let a=0;a<o;a++)n[a]=.25*(t[Math.max(0,a-1)]+t[Math.min(o-1,a+1)])+.5*t[a];for(let a=0;a<o;a++)t[a]=.25*(n[Math.max(0,a-1)]+n[Math.min(o-1,a+1)])+.5*n[a];return t}return{smooth:e}},inputs:[],outputs:["smooth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:(e,t,n,o,a)=>{function i(s,{w:p=Math.max(320,Math.min(e.width/devicePixelRatio,t/3)),h:l=200}={}){function r(c){const y=c.length;let h=new Uint16Array(256),v=new Uint16Array(256),x=new Uint16Array(256);for(let w=0;w<y;w+=4)h[c[w]]++,v[c[w+1]]++,x[c[w+2]]++;return~n.indexOf("Smooth histograms")&&(h=o(h),v=o(v),x=o(x)),{r:h,g:v,b:x}}const{r:m,g:d,b}=r(s),f=[];for(let c=0;c<256;c++)f[c]={level:c,r:m[c],g:d[c],b:b[c]};const g=a.plot({height:l,width:p,y:{grid:!0},x:{grid:!0},marks:[a.areaY(f,{x:"level",y:"r",stroke:"rgb(255 0 0/100%)",fill:"rgb(200 0 0/20%)"}),a.areaY(f,{x:"level",y:"g",stroke:"rgb(0 150 0/100%)",fill:"rgb(0 150 0/20%)"}),a.areaY(f,{x:"level",y:"b",stroke:"rgb(0 0 255/100%)",fill:"rgb(0 0 255/15%)"})]});return g.style.display="inline-block",g}return{plotHistogram:i}},inputs:["src","width","smoothHistogram","smooth","Plot"],outputs:["plotHistogram"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-28"),expanded:[],variables:[]},{id:28,body:()=>{function e(t,n){const o=n[0],a=n[1],i=n[2];let s=o*o+a*a+i*i;return s>0&&(s=1/Math.sqrt(s)),t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t}return{vec3normalize:e}},inputs:[],outputs:["vec3normalize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:()=>{function e(){let t=0,n=0;for(;t===0;)t=Math.random();for(;n===0;)n=Math.random();return Math.sqrt(-2*Math.log(t))*Math.cos(2*Math.PI*n)}return{randn:e}},inputs:[],outputs:["randn"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
