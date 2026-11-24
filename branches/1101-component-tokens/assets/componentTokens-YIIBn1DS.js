import{i as e}from"./preload-helper-CN-IQmCb.js";import{K as t,gt as n,st as r}from"./iframe-BgPAXKbN.js";import{a as i,c as a,i as o,l as s,r as c,s as l,t as u,u as d}from"./tokenDisplay-C_zMeQsU.js";function f(e){let t=e.trim();t=t.replace(v,S).replace(y,S),t=t.replace(x,`\0`);let n=0,r=t.length;for(;t.charAt(n)===`\0`;)n++;if(n===r)return[];for(;t.charAt(r-1)===`\0`;)r--;return t.slice(n,r).split(/\0/g)}function p(e){let t=f(e);for(let e=0;e<t.length;e++){let n=t[e],r=b.exec(n);if(r){let i=r.index+(r[1]??r[2]).length;t.splice(e,1,n.slice(0,i),n.slice(i))}}return t}function m(e,t){let[n,r,i]=_(e,t);return n+r.map(g(t?.locale)).join(t?.delimiter??` `)+i}function h(e,t){return m(e,{delimiter:`-`,...t})}function g(e){return e===!1?e=>e.toLowerCase():t=>t.toLocaleLowerCase(e)}function _(e,t={}){let n=t.split??(t.separateNumbers?p:f),r=t.prefixCharacters??C,i=t.suffixCharacters??C,a=0,o=e.length;for(;a<e.length;){let t=e.charAt(a);if(!r.includes(t))break;a++}for(;o>a;){let t=o-1,n=e.charAt(t);if(!i.includes(n))break;o=t}return[e.slice(0,a),n(e.slice(a,o)),e.slice(o)]}var v,y,b,x,S,C,w=e((()=>{v=/([\p{Ll}\d])(\p{Lu})/gu,y=/(\p{Lu})([\p{Lu}][\p{Ll}])/gu,b=/(\d)\p{Ll}|(\p{L})\d/u,x=/[^\p{L}\d]+/giu,S=`$1\0$2`,C=``}));function T(e,t,n){if(!/^[a-z][a-z0-9-]*$/.test(n))throw Error(`${t.join(`.`)} declares an invalid variant name "${n}"`);let r=`.${t[0]}--${n}`,i=e;for(let e of t.slice(0,-1))i=i?.[e],r=i?.$extensions?.[`edu.uiowa.variants`]?.[n]??r;return r}function E(e,t){let n=new Set,r=`breakpoint.${e}`,i;for(;;){if(n.has(r))throw Error(`responsive breakpoint "${e}" has a circular reference at "${r}"`);n.add(r);let a=t(r);if(!a)throw Error(`responsive breakpoint "${e}" references unknown token "${r}"`);i=a.$value;let o=D(i);if(!o)break;r=o}if(!i||i.unit!==`px`||typeof i.value!=`number`)throw Error(`responsive breakpoint "${e}" did not resolve to a px dimension`);return i.value}var D,O=e((()=>{D=e=>{let t=typeof e==`string`&&/^\{([^{}]+)\}$/.exec(e);return t?t[1]:null}}));function k(e,t,n){let r=Object.entries(e.$extensions?.[P]??{}).map(([e,t])=>{let n=E(e,B);return{id:`bp:${e}`,label:`At ${n}px and up (${e})`,px:n,ref:L(t),literal:R(t)}}).sort((e,t)=>e.px-t.px),i=Object.entries(e.$extensions?.[F]??{}).map(([e,r])=>({id:`variant:${e}`,label:`${T(n,t,e)} (${e} variant)`,ref:L(r),literal:R(r)}));return[...r,...i]}function A(e,t,n,r,i){let a=e.$type??n;if(`$value`in e){let n=t.at(-1);r.push({path:t,name:I(t),ref:L(e.$value),literal:R(e.$value),kind:u[n]?n:a===`color`?`color`:`other`,overrides:k(e,t,i)});return}for(let[n,o]of Object.entries(e))n.startsWith(`$`)||typeof o!=`object`||!o||A(o,[...t,n],a,r,i)}function j(e){let t=e.overrides.length?e.ref:e.name;return[{key:e.name,label:e.name,override:!1,kind:e.kind,ref:e.ref,value:t?c(t):e.literal,css:V(t,e.literal)},...e.overrides.map(t=>({key:`${e.name}|${t.id}`,label:t.label,override:!0,kind:e.kind,ref:t.ref,value:t.ref?c(t.ref):t.literal,css:V(t.ref,t.literal)}))]}function M(e){let t=[];return A(e,[],void 0,t,e),t}function N(e){let t=M(e),i=Object.keys(e).filter(e=>!e.startsWith(`$`));if(i.length!==1)throw Error(`componentTokensStory expects one component group in its token file, found ${i.length?i.join(`, `):`none`}`);let[a]=i,s=`${a[0].toUpperCase()}${a.slice(1).replace(/-/g,` `)}`;return{name:`Tokens`,parameters:{layout:`fullscreen`,controls:{disable:!0},html:{disable:!0},docs:{source:{code:null}}},render:()=>({setup(){let e=n([]);return r(()=>{e.value=H.map(({title:e,preview:n,has:r})=>({title:e,preview:n,rows:t.filter(e=>r(e.kind)).flatMap(j)})).filter(e=>e.rows.length)}),{sections:e,title:s,hasOverrides:t.some(e=>e.overrides.length),specimenStyle:e=>({[u[e.kind]]:e.css}),css:o}},template:`
        <div class="tk">
          <component is="style">{{ css }}</component>
          <h1>{{ title }} tokens</h1>
          <p>Each preview is drawn by the token it references.</p>
          <p v-if="hasOverrides" class="tk__note">
            An indented row is a value that replaces the token's default at a breakpoint or when a
            modifier class is on the component.
          </p>

          <template v-for="section in sections" :key="section.title">
            <h2>{{ section.title }}</h2>
            <table>
              <thead>
                <tr><th>Token</th><th>References</th><th>Resolves to</th><th v-if="section.preview">{{ section.preview }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in section.rows" :key="row.key" :class="{ tk__override: row.override }">
                  <td><code :class="{ tk__note: row.override }">{{ row.label }}</code></td>
                  <td><code class="tk__note">{{ row.ref }}</code></td>
                  <td><code>{{ row.value }}</code></td>
                  <td v-if="section.title === 'Color'"><span class="tk__swatch" :style="{ background: row.css }"></span></td>
                  <td v-else-if="section.preview">
                    <span v-if="row.kind === 'line-height'" class="tk__leading" :style="specimenStyle(row)">Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                    <span v-else class="tk__specimen" :style="specimenStyle(row)">Aa Hawkeye</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>
      `})}}var P,F,I,L,R,z,B,V,H,U=e((()=>{t(),w(),d(),a(),O(),i(),P=`edu.uiowa.responsive`,F=`edu.uiowa.variant`,I=e=>`--${h([`uiowa`,...e].join(` `))}`,L=e=>{let t=D(e);return t?I(t.split(`.`)):null},R=e=>L(e)?null:typeof e==`object`&&e&&`unit`in e?`${e.value}${e.unit}`:String(e),z={breakpoint:{...s.breakpoint,...l.breakpoint}},B=e=>e.split(`.`).reduce((e,t)=>e?.[t],z),V=(e,t)=>e?`var(${e})`:t,H=[{title:`Color`,preview:`Swatch`,has:e=>e===`color`},{title:`Typography`,preview:`Specimen`,has:e=>!!u[e]},{title:`Other`,preview:null,has:e=>e===`other`}]}));export{U as n,N as t};