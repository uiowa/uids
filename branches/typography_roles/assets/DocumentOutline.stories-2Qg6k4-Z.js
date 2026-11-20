import{i as e}from"./preload-helper-4HKJDzVh.js";import{J as t,K as n,vt as r}from"./iframe-Co0h-42G.js";import{n as i,t as a}from"./typography-391GsTUe.js";import{c as o,i as s,r as c}from"./roleStyle-BBXv-Rn1.js";import{n as l,r as u,t as d}from"./documentOutline-CR4-03aS.js";var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{n(),u(),a(),c(),f=/^(.+?)-(x-small|small|medium|large|x-large)$/,p={"x-small":`X-Small`,small:`Small`,medium:`Medium`,large:`Large`,"x-large":`X-Large`},m=e=>Math.round(e*100)/100,h=e=>e.split(`-`).map(e=>e[0].toUpperCase()+e.slice(1)).join(` `),g=e=>Object.entries(e).map(([e,t])=>{let[,n,r]=t.match(f),i=s(n,r),a=l.includes(e),c=a?o(`typography.${n}.fontWeightEmphasis`):i.weight;return{tag:e,name:`${h(n)} ${p[r]}${a?`, emphasis weight`:``}`,className:`${r===`medium`?``:`type-scale--${r} `}type-${n}${a?` type-${n}--emphasis`:``}`,setting:`${i.face} ${c}, ${m(i.px)}px / ${i.leading}`}}),_=g(d),v=e=>i.typography[d[e].match(f)[1]].multiple.$value,y={h1:v(`h1`),h2:v(`h2`),h3:v(`h3`)},b=m(s(`body`,`medium`).px),x=s(`subhead-2`,`medium`),S={tag:`p`,note:`under the h1`,name:`Intro`,className:`element--intro`,setting:`${x.face} ${x.weight}, ${m(s(`subhead`,`medium`).px)}px / ${x.leading}`},C=`This intro is set in Roboto Regular, at the same step in the hierarchy as the Subhead in the h2. It says what the page covers and who it's for, so a reader knows at once whether they're in the right place.`,w=`
  .do { padding: var(--uiowa-space-300); max-width: 76rem; color: var(--uiowa-color-brand-black); }
  /* Doubled class: UIDS base heading rules such as h2:not(:first-child) carry (0,1,1). Only the page's own blocks:
     the sample's gaps are type-rich-text's. */
  .do.do > :where(h1, h2, h3, h4, h5, h6, p) { margin: 0; }
  .do.do > * + * { margin-top: var(--uiowa-type-space-related); }
  .do.do > h2 { margin-top: var(--uiowa-type-space-break); }
  .do code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .do table { width: 100%; border-collapse: collapse; }
  .do th, .do td { text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100); border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: top; }
  .do th { font-weight: var(--uiowa-typography-font-weight-medium); }
  .do__pick { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 0; border: 0; }
  .do__pick legend { float: left; margin-right: 6px; padding: 0; font: 400 0.875rem/1.2 var(--uiowa-typography-font-family-roboto); color: var(--uiowa-color-neutral-500); }
  .do__pick label { position: relative; display: inline-flex; align-items: center; margin: 0; padding: 6px 14px; border: 1px solid var(--uiowa-color-neutral-175); border-radius: 999px; font: 400 0.875rem/1.2 var(--uiowa-typography-font-family-roboto); color: var(--uiowa-color-neutral-800); cursor: pointer; }
  .do__pick label.on { background: var(--uiowa-color-neutral-800); border-color: var(--uiowa-color-neutral-800); color: var(--uiowa-color-neutral-0); }
  .do__pick label:has(input:focus-visible) { outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }
  .do__pick input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
  .do__sample { padding: var(--uiowa-space-200); border: 1px solid var(--uiowa-color-border-default); }
`,T={title:`Tokens (typography)`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},E={name:`Document outline`,render:()=>({setup(){let e=r(!0);return{css:w,rows:_,tableRows:t(()=>e.value?[_[0],S,..._.slice(1)]:_),bodyPx:b,m:y,intro:e,introText:C}},template:`
      <div class="do">
        <component is="style">{{ css }}</component>
        <h1 class="type-subhead">Document outline</h1>
        <p class="type-body">
          Where an author picks only a heading level, as in rich text, each level takes a role by default, all in one
          hierarchy. Each level's size is a multiple of that hierarchy's body size, the same in every hierarchy: h1
          {{ m.h1 }}×, h2 {{ m.h2 }}×, h3 to h6 {{ m.h3 }}×, and the text 1×, so picking the hierarchy sizes the whole
          outline. This is the outline on the web's, Medium, with Body Medium ({{ bodyPx }}px) for the text
          under it.
          A design still picks a role first, and components keep their own heading styles.
        </p>
        <table class="type-small-print">
          <thead><tr><th>Level</th><th>Role</th><th>Face, weight, size / leading</th><th>Class</th></tr></thead>
          <tbody>
            <tr v-for="r in tableRows" :key="r.tag">
              <td><code>&lt;{{ r.tag }}&gt;</code><span v-if="r.note"> {{ r.note }}</span></td>
              <td>{{ r.name }}</td>
              <td>{{ r.setting }}</td>
              <td><code>.{{ r.className }}</code></td>
            </tr>
          </tbody>
        </table>
        <p class="type-body">
          h3 to h6 share Subhead 2 at its emphasis weight, Medium, so they read as headings. The intro under the h1
          takes <code>element--intro</code>: Roboto Regular, at the same step in the hierarchy as the Subhead in the h2.
          In rich text, put the content inside <code>type-rich-text</code> and the headings need no classes, as in the
          outline set below. Elsewhere, put each heading's class on it, such as
          <code>&lt;h2 class="type-subhead"&gt;</code>, and add <code>type-subhead-2--emphasis</code> to h3
          to h6.
        </p>

        <h2 class="type-subhead-2">The outline, set in <code>type-rich-text</code></h2>
        <fieldset class="do__pick"><legend>Intro</legend>
          <label :class="{ on: intro }"><input type="radio" name="do-intro" :value="true" v-model="intro"> Show</label>
          <label :class="{ on: !intro }"><input type="radio" name="do-intro" :value="false" v-model="intro"> Hide</label>
        </fieldset>
        <div class="do__sample type-rich-text">
          <template v-for="r in rows" :key="r.tag">
            <component :is="r.tag">{{ r.tag }}: {{ r.name }}</component>
            <p v-if="intro && r.tag === 'h1'" class="element--intro">{{ introText }}</p>
            <p v-else>
              Body Medium under the heading. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </template>
        </div>
      </div>
    `})},D=[`DocumentOutline`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Document outline',
  render: () => ({
    setup() {
      const intro = ref(true);
      const tableRows = computed(() => intro.value ? [ROWS[0], INTRO_ROW, ...ROWS.slice(1)] : ROWS);
      return {
        css,
        rows: ROWS,
        tableRows,
        bodyPx: BODY_PX,
        m: MULTIPLES,
        intro,
        introText: INTRO_TEXT
      };
    },
    template: \`
      <div class="do">
        <component is="style">{{ css }}</component>
        <h1 class="type-subhead">Document outline</h1>
        <p class="type-body">
          Where an author picks only a heading level, as in rich text, each level takes a role by default, all in one
          hierarchy. Each level's size is a multiple of that hierarchy's body size, the same in every hierarchy: h1
          {{ m.h1 }}×, h2 {{ m.h2 }}×, h3 to h6 {{ m.h3 }}×, and the text 1×, so picking the hierarchy sizes the whole
          outline. This is the outline on the web's, Medium, with Body Medium ({{ bodyPx }}px) for the text
          under it.
          A design still picks a role first, and components keep their own heading styles.
        </p>
        <table class="type-small-print">
          <thead><tr><th>Level</th><th>Role</th><th>Face, weight, size / leading</th><th>Class</th></tr></thead>
          <tbody>
            <tr v-for="r in tableRows" :key="r.tag">
              <td><code>&lt;{{ r.tag }}&gt;</code><span v-if="r.note"> {{ r.note }}</span></td>
              <td>{{ r.name }}</td>
              <td>{{ r.setting }}</td>
              <td><code>.{{ r.className }}</code></td>
            </tr>
          </tbody>
        </table>
        <p class="type-body">
          h3 to h6 share Subhead 2 at its emphasis weight, Medium, so they read as headings. The intro under the h1
          takes <code>element--intro</code>: Roboto Regular, at the same step in the hierarchy as the Subhead in the h2.
          In rich text, put the content inside <code>type-rich-text</code> and the headings need no classes, as in the
          outline set below. Elsewhere, put each heading's class on it, such as
          <code>&lt;h2 class="type-subhead"&gt;</code>, and add <code>type-subhead-2--emphasis</code> to h3
          to h6.
        </p>

        <h2 class="type-subhead-2">The outline, set in <code>type-rich-text</code></h2>
        <fieldset class="do__pick"><legend>Intro</legend>
          <label :class="{ on: intro }"><input type="radio" name="do-intro" :value="true" v-model="intro"> Show</label>
          <label :class="{ on: !intro }"><input type="radio" name="do-intro" :value="false" v-model="intro"> Hide</label>
        </fieldset>
        <div class="do__sample type-rich-text">
          <template v-for="r in rows" :key="r.tag">
            <component :is="r.tag">{{ r.tag }}: {{ r.name }}</component>
            <p v-if="intro && r.tag === 'h1'" class="element--intro">{{ introText }}</p>
            <p v-else>
              Body Medium under the heading. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </template>
        </div>
      </div>
    \`
  })
}`,...E.parameters?.docs?.source}}}}))();export{E as DocumentOutline,D as __namedExportsOrder,T as default};