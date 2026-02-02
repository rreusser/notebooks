import{d as u}from"./index-ByB2dbry.js";u({root:document.getElementById("cell-4"),expanded:[],variables:[]},{id:4,body:(n,e)=>n`For a color image, the task is not so simple, as RGB tuples permit no useful ordering. The [Hungarian Algorithm](https://en.wikipedia.org/wiki/Hungarian_algorithm) provides an exhaustively brute-force solution to the assignment problem we seek to solve, but its ${e`\mathcal{O}(n^3)`} complexity makes it completely impractical for images. Theo Honohan has pointed to some [good alternative methods](https://graphics.social/@theohonohan/111490607440087628).`,inputs:["md","tex"],outputs:[],output:void 0,assets:void 0,autodisplay:!0,autoview:!1,automutable:void 0});u({root:document.getElementById("cell-7"),expanded:[],variables:[]},{id:7,body:(n,e,t)=>{const d=n(e.select(Object.keys(t),{label:"Source",value:"ellingwood"})),a=n(e.select(Object.keys(t),{label:"Target",value:"webb"})),o=n(e.range([1,4],{value:2,label:"Downsample",step:.25})),i=n(e.range([1,32],{label:"Batch size",value:8,step:1})),f=n(e.range([1,1024],{label:"Max iterations",value:100,transform:Math.log,step:1})),l=n(e.range([.05,1],{label:"Tolerance",transform:Math.log,value:.3})),s=n(e.range([0,1],{label:"Interpolate",value:1})),b=n(e.button("Restart"));return{sourceFile:d,targetFile:a,downsample:o,batchSize:i,maxIterations:f,tolerance:l,interpolate:s,restart:b}},inputs:["view","Inputs","FILES"],outputs:["sourceFile","targetFile","downsample","batchSize","maxIterations","tolerance","interpolate","restart"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-8"),expanded:[],variables:[]},{id:8,body:(n,e,t,d,a,o,i,f)=>{const l=n`<figure class="image-figure">
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
</figure>`,s=l.querySelector(".grid"),b=["Source","Result","Target"],r=[e,t,d],h=window.innerWidth<=600,p=h?Math.min(480,window.innerWidth-32):280,m=h?120:200;return r.forEach((c,y)=>{const g=document.createElement("div");g.className="column";const w=document.createElement("div");w.className="label",w.textContent=b[y],g.appendChild(w);const x=a(c,...o);x.style.width="100%",x.style.height="auto",g.appendChild(x);const v=document.createElement("div");v.className="histogram";const j=i(c,{w:p,h:m});j.style.width="100%",v.appendChild(j),g.appendChild(v),s.appendChild(g)}),f(l),{figure:l,grid:s,labels:b,datasets:r,isMobile:h,histWidth:p,histHeight:m}},inputs:["html","srcData","interpolated","targetData","drawImage","shape","plotHistogram","display"],outputs:["figure","grid","labels","datasets","isMobile","histWidth","histHeight"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-9"),expanded:[],variables:[]},{id:9,body:(n,e,t,d,a,o,i)=>{e(t`<figure>${d.plot({height:150,width:Math.min(a,400),y:{grid:!0,type:"log"},x:{grid:!0},marks:[d.lineY(o.history,{x:"iteration",y:"delta"}),d.ruleY([i],{strokeDasharray:"4,4",stroke:"rgb(200 0 0)"})]})}</figure>`)},inputs:["result","display","html","Plot","width","state","tolerance"],outputs:[],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-10"),expanded:[],variables:[]},{id:10,body:(n,e)=>({smoothHistogram:n(e.checkbox(["Smooth histograms"],{value:["Smooth histograms"]}))}),inputs:["view","Inputs"],outputs:["smoothHistogram"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-11"),expanded:[],variables:[]},{id:11,body:()=>({state:{history:[]}}),inputs:[],outputs:["state"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-12"),expanded:[],variables:[]},{id:12,body:(n,e,t)=>{const d=n.src.length,a=new Uint8ClampedArray(d);for(let i=0;i<d;i++)a[i]=e[i]+(n.src[i]-e[i])*t;return{N:d,out:a,interpolated:a}},inputs:["result","srcData","interpolate"],outputs:["N","out","interpolated"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-13"),expanded:[],variables:[]},{id:13,body:(n,e,t,d,a,o,i,f,l)=>(e.history=[],{result:t.observe(b=>{let r=!1;const h=d(a.slice(),o,{maxIterations:i,batchSize:f,tolerance:l,state:e});async function p(){if(r)return;const{value:m,done:c}=await h.next();r||(m&&b(m),!c&&!r&&requestAnimationFrame(p))}return p(),()=>{r=!0}})}),inputs:["restart","state","Generators","slicedOptimalTransport","srcData","targetData","maxIterations","batchSize","tolerance"],outputs:["result"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-14"),expanded:[],variables:[]},{id:14,body:n=>{const e=`
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
`,t=new Blob([e],{type:"application/javascript"}),d=URL.createObjectURL(t),a=navigator.hardwareConcurrency||4,o=new Map;let i=0;const f=Array.from({length:a},()=>{const s=new Worker(d);return s.onmessage=b=>{const{id:r,adjustment:h}=b.data,p=o.get(r);p&&(o.delete(r),p(h))},s});function l(s,b,r,h){const p=i++,m=f[s%f.length];return new Promise(c=>{o.set(p,c),m.postMessage({id:p,src:b,tgt:r,N:h})})}return n.then(()=>{f.forEach(s=>s.terminate()),URL.revokeObjectURL(d),o.clear()}),{workerCode:e,workerBlob:t,workerUrl:d,numWorkers:a,pendingJobs:o,nextJobId:i,workerPool:f,runWorkerJob:l}},inputs:["invalidation"],outputs:["workerCode","workerBlob","workerUrl","numWorkers","pendingJobs","nextJobId","workerPool","runWorkerJob"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-16"),expanded:[],variables:[]},{id:16,body:n=>{async function*e(t,d,{maxIterations:a=100,batchSize:o=4,tolerance:i=1,state:f}={}){if(t.length!==d.length)throw new Error("Source size must equal target size");f.history=[];const l=t.length>>2,s=new Float32Array(t),b=new Float32Array(d);let r=1/0,h=0;for(;r>i&&++h<=a;){const m=await n(s,b,l,o);r=0;for(let y=0,g=0;g<l*4;y+=3,g+=4){const w=m[y]/o,x=m[y+1]/o,v=m[y+2]/o;s[g]+=w,s[g+1]+=x,s[g+2]+=v,r+=w*w+x*x+v*v}r=Math.sqrt(r/l),f.history=f.history.concat([{iteration:h,delta:r}]);const c=new Uint8ClampedArray(s.length);for(let y=0;y<s.length;y++)c[y]=s[y];yield{delta:r,src:c}}const p=new Uint8ClampedArray(s.length);for(let m=0;m<s.length;m++)p[m]=s[m];return{delta:r,src:p}}return{slicedOptimalTransport:e}},inputs:["runBatchParallel"],outputs:["slicedOptimalTransport"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-17"),expanded:[],variables:[]},{id:17,body:n=>{async function e(t,d,a,o){const i=[];for(let s=0;s<o;s++)i.push(n(s,t,d,a));const f=await Promise.all(i),l=new Float32Array(a*3);for(const s of f)for(let b=0;b<l.length;b++)l[b]+=s[b];return l}return{runBatchParallel:e}},inputs:["runWorkerJob"],outputs:["runBatchParallel"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-18"),expanded:[],variables:[]},{id:18,body:(n,e)=>({shape:[n.width/e|0,n.height/e|0]}),inputs:["src","downsample"],outputs:["shape"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-19"),expanded:[],variables:[]},{id:19,body:n=>{function e(t,d,a,o=2){const i=document.createElement("canvas");i.style.width=`${d*n/o}px`,i.style.height=`${a*n/o}px`,i.width=d,i.height=a,i.style.display="inline-block";const f=i.getContext("2d"),l=f.getImageData(0,0,d,a);return l.data.set(t),f.putImageData(l,0,0),i}return{drawImage:e}},inputs:["downsample"],outputs:["drawImage"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-20"),expanded:[],variables:[]},{id:20,body:()=>{function n(e,t,d){const a=document.createElement("canvas");a.width=t,a.height=d;const o=a.getContext("2d");return o.drawImage(e,0,0,t,d),o.getImageData(0,0,a.width,a.height).data}return{getPixels:n}},inputs:[],outputs:["getPixels"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-21"),expanded:[],variables:[]},{id:21,body:()=>({FILES:{ellingwood:"./files/c58f14ea40fe9b49f83785c23645ee1072b664c9bfa5bb37a3655cfa62f7b20a2f4d4d2f8144e8d84f7e8cd00b93dcb5d02182bee95f9296af3b09311c3d95a1.jpeg",gravity:"./files/e39dd4f989d7be57001e54b4b802b1b99ab2fa5cadf1c098188688804cb6195669d716c2fe53db92d5273dac240264b118f82f3d338938768b82239c7dd87c77.jpeg",m61:"./files/4a85b5049d0730eaf366a077a9b2e8ec20f6f1db333016940e5721572b151e78ee0d439c43309b79516fd9294319b9e7b57eb548b805752ae7177e84be0cd82d.jpeg",webb:"./files/0a5749ce7542538934ccfe722a3ca52a660f087d215de9be268debab1426e0fb243cc1727a4e59a50bab0e24fadc2201c51f04197ec4fc8af094784defc1c637.jpeg",yosemite:"./files/71d8bb781fd97bd249fcc54a15bd83d63e89873694b2997b7ad9b74aa0cd53416756a49f88940ca3d0443269a3d7d1d653623eb64740df2a5dbb76d4570c506a.jpeg",yosemite2:"./files/c1f51c8c6e3252ca13e095cb761d53f304b6229ea35d26f0f525afaa58bab8676c7322fc3295c7e4d58d71189ac430e71ac0b58c4150a050f178ee8b782f968a.jpeg",yosemite3:"./files/58ca4af43850e99ae7e803776cb0e0743632409ddb9a8443947b8ced33b0c1f2725f4f4785f01ef2391d4950c7aa2dd69998aaa054c5226609b4d67e8531ccb7.jpeg",yosemite4:"./files/c5704d9f812eb8688d923ee94f1e580e755e9ad2e1e307c20ef0f08476a7e267313332ed25b2e703c3eec6de94cca6145a8477a282419f50426795e8c8bdff5b.jpeg",topographic:"./files/376052d1d580b6d1aef50672fca343a60f4944f87fb2ebb7caaff9d4f0c72403d85cc1d3b055bb9d5d1f59c959aaebc77e289656ecd5f8502be2b0f23b1b9d92.jpeg",bigcat:"./files/996456a95748650ad01099eb60c40918a5223b11a901d6ecfe8501cb3b2d99feabb73b1395429e4a2bab611dcb62627e56e594bf46198028908ca666859f28cd.jpeg",hokitika:"./files/49d6c2c00a0df0ad75f03c4f039fe0c8df2a8b244e4754d53821f4e0ff892a3c541ef65dd2b987b0e7d8b5b5ddc02d055a9037f72df4f48560a90636d1004da6.jpeg","arthur's pass":"./files/6bc1a98f862ef68f3148b9ed7e9c8db7c570b97a55b492048ad3f2dc905a23dc78c7d299c6d86c941845db1ab8d85db83ff8b171ac41dca3e86990ca99354c5b.jpeg",rainier:"./files/be256269735534c96b4c5d31bdf7658887d43c965c683bce12733255b73953df9547987434ba4eed313bb5ec377fb77f52c7ba45be6e179ba82c0951609f6cb0.jpeg",shelf:"./files/c857167781f363f1ef67c1167806bef2f252d025ae3f0e02790d107d21a54cfd6572f059870c6066d039db832be2f9f75a68500e0590064f98028c1ea1e4c7f2.jpeg",cranes:"./files/95e6df9d1056dc4272cf82fa22ccd42e8fdf710a726f8b7b0634d7d46f81432cf59ad8b99a4ba54a8ee24733fde167eea11340d9b87edaa3ee203e3e4341c620.jpeg","smith rock":"./files/77f89c7f66afe86a50a1a0ca1ffd15399da4fad3595cd3e8aae81ce29e4600c487e9e2c58b1dfa137535f81e61d940a22e793f36aac74238d3feb2d7e1aa6248.jpeg",dog:"./files/d8d6f7a92241e1b547146a09d0b2accc10e0e26d6af900f06a703a78b698817f53c68542af7009c1f21d9e92d258c752d99947debadeff36b26d83e2d123ad16.jpeg","ansel adams":"./files/23e308face2741c20e26b3f68362aa6004fd188cca1f97f3dbdbfa7cd2fa66eb3d882487afe50878477ac41c82837ccd1a5ed68946040a61cdaf68709b365bef.jpeg"}}),inputs:[],outputs:["FILES"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-22"),expanded:[],variables:[]},{id:22,body:async(n,e,t)=>({src:await n(await(await fetch(e[t])).blob())}),inputs:["createImageBitmap","FILES","sourceFile"],outputs:["src"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-23"),expanded:[],variables:[]},{id:23,body:async(n,e,t)=>({target:await n(await(await fetch(e[t])).blob())}),inputs:["createImageBitmap","FILES","targetFile"],outputs:["target"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-24"),expanded:[],variables:[]},{id:24,body:(n,e,t)=>({srcData:n(e,e.width/t,e.height/t)}),inputs:["getPixels","src","downsample"],outputs:["srcData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-25"),expanded:[],variables:[]},{id:25,body:(n,e,t,d)=>({targetData:n(e,t.width/d,t.height/d)}),inputs:["getPixels","target","src","downsample"],outputs:["targetData"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-26"),expanded:[],variables:[]},{id:26,body:()=>{function n(e){const t=e.slice(),d=e.length;for(let a=0;a<d;a++)t[a]=.25*(e[Math.max(0,a-1)]+e[Math.min(d-1,a+1)])+.5*e[a];for(let a=0;a<d;a++)e[a]=.25*(t[Math.max(0,a-1)]+t[Math.min(d-1,a+1)])+.5*t[a];return e}return{smooth:n}},inputs:[],outputs:["smooth"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-27"),expanded:[],variables:[]},{id:27,body:(n,e,t,d,a)=>{function o(i,{w:f=Math.max(320,Math.min(n.width/devicePixelRatio,e/3)),h:l=200}={}){function s(c){const y=c.length;let g=new Uint16Array(256),w=new Uint16Array(256),x=new Uint16Array(256);for(let v=0;v<y;v+=4)g[c[v]]++,w[c[v+1]]++,x[c[v+2]]++;return~t.indexOf("Smooth histograms")&&(g=d(g),w=d(w),x=d(x)),{r:g,g:w,b:x}}const{r:b,g:r,b:h}=s(i),p=[];for(let c=0;c<256;c++)p[c]={level:c,r:b[c],g:r[c],b:h[c]};const m=a.plot({height:l,width:f,y:{grid:!0},x:{grid:!0},marks:[a.areaY(p,{x:"level",y:"r",stroke:"rgb(255 0 0/100%)",fill:"rgb(200 0 0/20%)"}),a.areaY(p,{x:"level",y:"g",stroke:"rgb(0 150 0/100%)",fill:"rgb(0 150 0/20%)"}),a.areaY(p,{x:"level",y:"b",stroke:"rgb(0 0 255/100%)",fill:"rgb(0 0 255/15%)"})]});return m.style.display="inline-block",m}return{plotHistogram:o}},inputs:["src","width","smoothHistogram","smooth","Plot"],outputs:["plotHistogram"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-28"),expanded:[],variables:[]},{id:28,body:()=>{function n(e,t){const d=t[0],a=t[1],o=t[2];let i=d*d+a*a+o*o;return i>0&&(i=1/Math.sqrt(i)),e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e}return{vec3normalize:n}},inputs:[],outputs:["vec3normalize"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});u({root:document.getElementById("cell-29"),expanded:[],variables:[]},{id:29,body:()=>{function n(){let e=0,t=0;for(;e===0;)e=Math.random();for(;t===0;)t=Math.random();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*t)}return{randn:n}},inputs:[],outputs:["randn"],output:void 0,assets:void 0,autodisplay:!1,autoview:void 0,automutable:void 0});
