import{i as e}from"./preload-helper-4HKJDzVh.js";import{J as t,K as n}from"./iframe-Co0h-42G.js";function r(e){let t={},n=[],r,i,a;for(let o of e.replace(/\n$/,``).split(`
`))if(o.startsWith(`diff --git `))r={path:o.slice(o.indexOf(` b/`)+3),rows:[],adds:0,dels:0,inHunk:!1},n.push(r);else if(r){let e=o.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);if(e)[i,a]=[Number(e[1]),Number(e[2])],r.inHunk=!0,r.rows.push({tone:`hunk`,text:o});else if(r.inHunk&&!o.startsWith(`\\`)){let e=o[0],t={sign:e,text:o.slice(1)};e===`+`?(Object.assign(t,{tone:`add`,newLine:a++}),r.adds+=1):e===`-`?(Object.assign(t,{tone:`del`,oldLine:i++}),r.dels+=1):Object.assign(t,{oldLine:i++,newLine:a++}),r.rows.push(t)}}else{let[e,...n]=o.split(` `);e&&(t[e]=n.join(` `))}return{meta:t,files:n}}function i(e,t){let n=[],r=[],i=0;for(let a of t){let t=e.findIndex((e,t)=>t>=i&&`${e.sign??``}${e.text}`.includes(a.at));t<0?r.push(a):(n.push({at:t,note:a.note}),i=t+1)}let a=n.length&&n[0].at>0?[{lines:e.slice(0,n[0].at)}]:[];return n.forEach(({at:t,note:r},i)=>a.push({lines:e.slice(t,n[i+1]?.at??e.length),note:r})),{sections:n.length?a:[{lines:e}],unplaced:r}}function a(e,t){let n=[];return e.forEach((r,i)=>{let a=i?e[i-1]:t;typeof r.n==`number`&&typeof a?.n==`number`&&r.n>a.n+1&&n.push({text:`⋯`,tone:`gap`,indent:0}),n.push({...r,indent:r.text.match(/^ */)[0].length})}),n}function o(e){let t=[];for(let{n}of e){if(typeof n!=`number`)continue;let e=t.at(-1);e&&n===e[1]+1?e[1]=n:t.push([n,n])}return t.length?`${t.length===1&&t[0][0]===t[0][1]?`line`:`lines`} ${s(t.map(([e,t])=>e===t?`${e}`:`${e}–${t}`))}`:``}var s,c,l,u,d,f,p=e((()=>{n(),s=e=>e.length>1?`${e.slice(0,-1).join(`, `)} and ${e.at(-1)}`:e[0]??``,c=e=>e.replace(/\n$/,``).split(`
`).map((e,t)=>({n:t+1,text:e})),l=`
  <div :class="['cv__line', row.tone && 'cv__line--' + row.tone]">
    <span v-if="row.tone === 'hunk'" class="cv__text cv__text--hunk">{{ row.text }}</span>
    <template v-else>
      <template v-if="diff"><span class="cv__n">{{ row.oldLine }}</span><span class="cv__n">{{ row.newLine }}</span><span class="cv__sign">{{ row.sign === ' ' ? '' : row.sign }}</span></template>
      <span v-else class="cv__n">{{ row.n }}</span>
      <span class="cv__text" :style="{ '--indent': row.indent }">{{ row.text }}</span>
    </template>
  </div>`,u={props:{file:{type:String,required:!0},where:{type:String,default:``},lines:{type:Array,required:!0}},setup(e){return{rows:t(()=>a(e.lines)),range:t(()=>o(e.lines)),diff:!1}},template:`
    <figure class="cv">
      <figcaption class="cv__file"><code>{{ file }}</code><span v-if="where">{{ ' ' + where }}</span><span v-if="range" class="cv__range">{{ ' ' + range }}</span></figcaption>
      <div class="cv__body"><template v-for="(row, i) in rows" :key="i">${l}</template></div>
    </figure>`},d={props:{sections:{type:Array,required:!0},diff:{type:Boolean,default:!1}},setup(){return{rowsOf:a}},template:`
    <div class="an">
      <div v-for="(section, s) in sections" :key="s" class="an__section">
        <aside v-if="section.note" class="an__note"><div class="an__sticky" v-html="section.note"></div></aside>
        <div class="an__code cv__body" :class="{ 'cv--diff': diff }"><template v-for="(row, i) in rowsOf(section.lines, sections[s - 1]?.lines.at(-1))" :key="i">${l}</template></div>
      </div>
    </div>`},f=`
  .cv { margin: 0; min-width: 0; border: 1px solid var(--uiowa-color-border-default); background: var(--uiowa-color-background-white); }
  .cv__file {
    display: flex; flex-wrap: wrap; gap: 0 0.5em; align-items: baseline;
    padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); background: var(--uiowa-color-neutral-200);
    font-size: 0.8rem;
  }
  .cv__file code { font-weight: 600; }
  .cv__range { margin-left: auto; color: var(--uiowa-color-neutral-600); }
  .cv__body {
    padding: var(--uiowa-space-50) 0; background: var(--uiowa-color-neutral-100);
    font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.8rem; line-height: 1.55;
  }
  .cv__line { display: grid; grid-template-columns: 3.5ch minmax(0, 1fr); column-gap: 1.5ch; padding-right: var(--uiowa-space-100); }
  .cv--diff .cv__line { grid-template-columns: 3.5ch 3.5ch 1ch minmax(0, 1fr); column-gap: 1ch; }
  .cv__n { text-align: right; color: var(--uiowa-color-neutral-500); user-select: none; }
  .cv__sign { user-select: none; }
  /* A long line wraps and keeps its indent, plus two characters, so the code stays readable at any width. */
  .cv__text {
    white-space: pre-wrap; overflow-wrap: anywhere;
    padding-left: calc((var(--indent, 0) + 2) * 1ch); text-indent: calc((var(--indent, 0) + 2) * -1ch);
  }
  .cv__line--mark { background: color-mix(in srgb, var(--uiowa-color-brand-gold) 35%, transparent); }
  .cv__line--add { background: color-mix(in srgb, var(--uiowa-color-success) 14%, transparent); }
  .cv__line--del { background: color-mix(in srgb, var(--uiowa-color-danger) 12%, transparent); }
  .cv__line--add .cv__sign { color: var(--uiowa-color-success); }
  .cv__line--del .cv__sign { color: var(--uiowa-color-danger); }
  .cv__line--hunk { display: block; padding: 0.15em var(--uiowa-space-100); background: var(--uiowa-color-neutral-200); color: var(--uiowa-color-neutral-600); }
  .cv__text--hunk { padding: 0; text-indent: 0; }
  .cv__line--gap, .cv__line--missing { color: var(--uiowa-color-neutral-500); }
  .cv__line--missing { color: var(--uiowa-color-danger); }
  /* Notes beside the code: each note starts level with the lines it explains and stays in view while they scroll. */
  .an__section { display: grid; grid-template-columns: minmax(0, 1fr) minmax(15rem, 25rem); column-gap: var(--uiowa-space-200); }
  .an__code { grid-column: 1; grid-row: 1; padding: 0; }
  .an__note { grid-column: 2; grid-row: 1; }
  .an__section + .an__section .an__code { border-top: 1px dashed var(--uiowa-color-neutral-400); }
  .an__section:first-child .an__code { padding-top: var(--uiowa-space-50); }
  .an__section:last-child .an__code { padding-bottom: var(--uiowa-space-50); }
  .an__sticky {
    position: sticky; top: var(--uiowa-space-100);
    padding: var(--uiowa-space-50) var(--uiowa-space-100); border-left: 3px solid var(--uiowa-color-brand-gold);
    font-size: 0.9rem; line-height: 1.5;
  }
  .an__sticky > * + * { margin-top: var(--uiowa-space-50); }
  .an__sticky p { margin: 0; font-size: inherit; line-height: inherit; }
  @media (max-width: 1100px) {
    .an__section { grid-template-columns: minmax(0, 1fr); }
    .an__note, .an__code { grid-column: 1; grid-row: auto; }
    .an__sticky { position: static; margin: var(--uiowa-space-100) 0 var(--uiowa-space-50); }
  }
`}));export{p as a,f as i,u as n,c as o,i as r,r as s,d as t};