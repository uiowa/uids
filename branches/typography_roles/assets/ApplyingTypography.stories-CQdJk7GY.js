import{i as e}from"./preload-helper-4HKJDzVh.js";import{i as t,n,r,t as i}from"./typography-391GsTUe.js";import{i as a,r as o,t as s}from"./roleStyle-BBXv-Rn1.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{r(),i(),o(),c=n.typography,l={"x-small":`X-Small`,small:`Small`,medium:`Medium`,large:`Large`,"x-large":`X-Large`},u=e=>Math.round(e*100)/100,d=e=>e[0].toUpperCase()+e.slice(1),f=e=>d(e.split(`: `)[1]),p=e=>t.typography[`font-weight`][e.slice(1,-1).split(`.`).pop()].$value,m=s.map(e=>({size:e,name:l[e],body:`${u(a(`body`,e).px)}px`})),h=p(c[`subhead-2`].fontWeightEmphasis.$value),g=(e,t,n,r=c[t].$description)=>{let i=a(t,n),o=[`typography.${t}`];return t===`body`?o.push(`typography.body.${n}.fontSize`):c[t][n]?.lineHeight&&o.push(`typography.${t}.${n}.lineHeight`),{name:e,classes:[`type-${t}`],tokens:o,face:`${i.face} ${i.weight}`,size:`${i.by}× · ${u(i.px)}px / ${i.leading}`,use:r}},_=e=>{let t=a(`label`,e);return{name:`Label ${l[e]}`,classes:[`type-label--${e}`],tokens:[`typography.label.${e}`],face:`${t.face} ${t.weight}`,size:`${u(t.px)}px / ${t.leading}`}},v=e=>{let t=g(`Subhead 2`,`subhead-2`,e);return[{name:`Titles and headings`,rows:[g(`Eyebrow`,`eyebrow`,e),g(`Headline`,`headline`,e),g(`Headline 6×`,`headline-6x`,e),g(`Headline 8×`,`headline-8x`,e),g(`Subhead`,`subhead`,e),t,{...t,name:`Subhead 2, emphasis`,classes:[`type-subhead-2`,`type-subhead-2--emphasis`],tokens:[`typography.subhead-2.fontWeightEmphasis`],face:`${a(`subhead-2`,e).face} ${h}`,use:`A heading set in Subhead 2, and the line that leads a details group, such as the date.`}]},{name:`Text`,rows:[g(`Body`,`body`,e,`Paragraphs and running text. Its size names the hierarchy.`),g(`Small print`,`small-print`,e,f(c[`small-print`].$description))]},{name:`Labels: one set for every hierarchy`,rows:[`large`,`medium`,`small`].map(_),use:c.label.$description}]},y=e=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`),b=e=>e.map(e=>`<code class="at__class">${y(e)}</code>`).join(``),x=e=>{let t=l[e],n=e===`medium`?`<code>type-scale--medium</code>, the default, which a piece doesn’t need`:`<code>type-scale--${e}</code> on the piece`,r=v(e).map(e=>[`<tr class="at__group"><th colspan="6" scope="colgroup">${y(e.name)}</th></tr>`,...e.rows.map((t,n)=>{let r=``;return t.use?r=`<td>${y(t.use)}</td>`:n===0&&(r=`<td rowspan="${e.rows.length}">${y(e.use)}</td>`),`<tr><th scope="row">${y(t.name)}</th><td>${b(t.classes)}</td><td>${b(t.tokens)}</td><td>${y(t.face)}</td><td class="at__size">${y(t.size)}</td>${r}</tr>`})].join(``)).join(``);return`<div class="type-rich-text"><p>${t}: ${n}, and a body size of ${u(a(`body`,e).px)}px, <code>typography.body.${e}.fontSize</code>. Each role's size is that body size times its multiple; the Labels are the same in every hierarchy.</p><div class="at__scroll" tabindex="0" role="region" aria-label="Roles on ${t}"><table class="type-small-print"><thead><tr><th scope="col">Style</th><th scope="col">Class</th><th scope="col">Tokens</th><th scope="col">Face and weight</th><th scope="col">Size / leading</th><th scope="col">Use for</th></tr></thead><tbody>${r}</tbody></table></div></div>`},S=[`medium`,...s.filter(e=>e!==`medium`)].map(e=>({title:l[e],open:e===`medium`,content:x(e)})),C=[`related`,`break`].map(e=>({name:d(e),property:`--uiowa-type-space-${e}`,token:`typography.scale.${e}`,multiple:c.scale[e].$value,sizes:s.map(t=>({size:t,px:u(a(`body`,t).px*c.scale[e].$value)})),use:c.scale[e].$description})),w=`<div class="type-rich-text">
  <h2>Before you arrive</h2>
  <p>Check the venue and parking before you plan your route.</p>
  <h3>Parking</h3>
  <ul>
    <li>Visitor lots open at 9:00.</li>
    <li>Accessible spaces are next to each entrance.</li>
  </ul>
  <h4>By bus</h4>
  <p>Two routes stop outside the main doors.</p>
</div>`,T=`<section class="type-scale--large">
  <h2 class="type-headline">…</h2>
  <p class="type-body">…</p>
</section>`,E=`https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Special+Gothic:wdth,wght@75,600&family=Zilla+Slab:wght@600&display=swap`,D=[{verdict:`do`,label:`Do`,caption:`The date leads the details, in Subhead 2’s emphasis weight from its class.`,html:`<p class="type-subhead-2"><span class="type-subhead-2--emphasis">Thursday, April 9</span> · Iowa Memorial Union</p>`},{verdict:`dont`,label:`Don’t`,caption:`The same weight from <code>strong</code>, which says the date is important, not that it leads the details.`,html:`<p class="type-subhead-2"><strong>Thursday, April 9</strong> · Iowa Memorial Union</p>`}],O={props:{pairs:{type:Array,required:!0}},template:`
    <div class="at__pairs">
      <figure v-for="p in pairs" :key="p.verdict" :class="['at__card', 'at__card--' + p.verdict]">
        <p class="type-label--large at__verdict">{{ p.label }}</p>
        <div class="at__example" v-html="p.html"></div>
        <figcaption class="type-body at__caption" v-html="p.caption"></figcaption>
        <pre class="at__code"><code>{{ p.html }}</code></pre>
      </figure>
    </div>`},k=`
  .at { padding: var(--uiowa-space-300); max-width: 76rem; color: var(--uiowa-color-text-default); }
  /* type-rich-text sets the page's type and the gaps between its blocks; these are the boxes inside them. */
  .at :where(table, figure) { margin: 0; }
  .at > p { max-width: 72ch; }
  .at code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .at table { width: 100%; border-collapse: collapse; }
  /* Below the tables' width they scroll in their own box, not the page. */
  .at__scroll { overflow-x: auto; }
  .at__scroll table { min-width: 40rem; }
  .at th, .at td { text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100); border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: top; }
  .at th { font-weight: var(--uiowa-typography-font-weight-medium); }
  .at .at__group th { background: var(--uiowa-color-background-gray); }
  .at__tag { margin-left: 0.5em; color: var(--uiowa-color-neutral-500); }
  .at.at pre.at__code { padding: var(--uiowa-space-100) var(--uiowa-space-200); background: var(--uiowa-color-background-gray); white-space: pre-wrap; overflow-wrap: anywhere; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.8125rem; line-height: 1.5; }
  /* Do and Don't: side by side from 768, each a card with the status color across its top. */
  .at__pairs { display: grid; gap: var(--uiowa-space-200); }
  @media (min-width: 48rem) { .at__pairs { grid-template-columns: 1fr 1fr; } }
  .at__card { display: flex; flex-direction: column; border: 1px solid var(--uiowa-color-border-default); border-top: 4px solid; }
  .at__card--do { border-top-color: var(--uiowa-color-success); }
  .at__card--dont { border-top-color: var(--uiowa-color-danger); }
  .at.at .at__verdict { padding: var(--uiowa-space-100) var(--uiowa-space-200) 0; }
  .at__example { padding: var(--uiowa-space-200); }
  /* The caption takes the card's spare height, so the same example is the same height in both cards. */
  .at.at .at__caption { flex: 1; padding: 0 var(--uiowa-space-200) var(--uiowa-space-200); }
  .at__roles { display: grid; gap: var(--uiowa-space-100); }
  .at__roles summary { cursor: pointer; font-weight: var(--uiowa-typography-font-weight-medium); }
  .at__size { white-space: nowrap; }
  .at__class { display: block; white-space: nowrap; }
`,A={title:`Tokens (typography)`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},j={name:`Applying typography`,render:()=>({components:{Pairs:O},setup(){return{css:k,hierarchies:m,rolePanels:S,gapRows:C,weightPairs:D,richTextCode:w,hierarchyCode:T,fontsLink:E}},template:`
      <component is="style">{{ css }}</component>
      <div class="at type-rich-text">
        <div class="type-eyebrow">Typography</div>
        <h1>Applying typography</h1>
        <p>
          Pick a hierarchy for the piece, then a role for each piece of text. This page covers the roles, how to set
          them in code, and the rules for rich text, body text and weights.
        </p>

        <h2>Hierarchies and roles</h2>
        <p>
          A piece's format picks its hierarchy, as the
          <a href="../?path=/story/tokens-typography--formats" target="_top">Formats</a> page lists, and the hierarchy
          sets the body size. Every other role is a multiple of the body, so use one hierarchy's roles together. In
          code, the hierarchy is a class on the piece and each role is a class on its text. Medium, for web pages and
          applications, is the default and needs no class.
        </p>
        <div class="at__scroll" tabindex="0" role="region" aria-label="Hierarchies">
        <table class="type-small-print">
          <thead><tr><th scope="col">Hierarchy</th><th scope="col">Class</th><th scope="col">Body</th></tr></thead>
          <tbody>
            <tr v-for="h in hierarchies" :key="h.size">
              <th scope="row">{{ h.name }}</th>
              <td><code>type-scale--{{ h.size }}</code><span v-if="h.size === 'medium'" class="at__tag">default</span></td>
              <td>{{ h.body }}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>The roles in each hierarchy, with their classes and tokens:</p>
        <div class="at__roles">
          <details v-for="panel in rolePanels" :key="panel.title" :open="panel.open">
            <summary>{{ panel.title }}</summary>
            <div v-html="panel.content"></div>
          </details>
        </div>
        <p>A section or a component can take its own hierarchy. The nearest hierarchy class wins:</p>
        <pre class="at__code"><code>{{ hierarchyCode }}</code></pre>
        <p>
          UIDS's stylesheets, uids.css and uids-core.css, have the classes but don't load the typefaces. Load Roboto,
          Special Gothic Condensed and Zilla Slab from Google Fonts with this link, which has every weight the styles use:
        </p>
        <pre class="at__code"><code>{{ fontsLink }}</code></pre>
        <p>
          Every size in every hierarchy is on the
          <a href="../?path=/story/tokens-typography--hierarchy" target="_top">Hierarchy</a> page.
        </p>

        <h2>Space</h2>
        <p>The hierarchy class also sets two gaps, each a multiple of its body size:</p>
        <div class="at__scroll" tabindex="0" role="region" aria-label="Gaps">
        <table class="type-small-print">
          <thead>
            <tr>
              <th scope="col">Gap</th><th scope="col">Custom property</th><th scope="col">Token</th><th scope="col" class="at__size">Body ×</th>
              <th v-for="h in hierarchies" :key="h.size" scope="col" class="at__size">{{ h.name }}</th>
              <th scope="col">Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in gapRows" :key="g.token">
              <th scope="row">{{ g.name }}</th>
              <td><code class="at__class">{{ g.property }}</code></td>
              <td><code class="at__class">{{ g.token }}</code></td>
              <td>{{ g.multiple }}×</td>
              <td v-for="s in g.sizes" :key="s.size" class="at__size">{{ s.px }}px</td>
              <td>{{ g.use }}</td>
            </tr>
          </tbody>
        </table>
        </div>

        <h2>Rich text</h2>
        <p>
          Where an author picks only a heading level, as in a WYSIWYG editor, put the rich text inside
          <code>type-rich-text</code>. Its headings, paragraphs and lists then need no classes: each heading level takes
          its role in the document outline, and the text takes Body. This page is set that way, and the
          <a href="../?path=/story/tokens-typography--document-outline" target="_top">Document outline</a> page shows
          each level's role.
        </p>
        <pre class="at__code"><code>{{ richTextCode }}</code></pre>
        <p>
          Rich text takes the hierarchy it sits in: Medium, unless a hierarchy class on it or around it sets another. The
          class styles only its own children: components inside rich text keep their own styles, and a role class on a heading, such as
          <code>type-headline</code>, still wins. Between blocks the gap is Related; below the h1 and above a heading that
          starts a section, it's Break.
        </p>

        <h2>Body text</h2>
        <p>
          Body sets paragraphs and running text at the hierarchy's body size. Small print, three quarters of the body,
          sets credits, dates and fine print under it.
        </p>
        <p>
          Controls and captions take a Label: buttons, form labels, badges and bylines. The three Labels are one set for
          every hierarchy.
        </p>

        <h2>Weights and emphasis</h2>
        <p>
          Each role carries its weight, so use the classes rather than setting weights: 600 for the Eyebrow, the
          Headlines and the Subhead; 400 for Body, Small print and Subhead 2; 500 for the Labels.
        </p>
        <p>
          Subhead 2 has one emphasis, 500: a heading set in Subhead 2, and the line that leads a details group, such as
          the date. Set it with <code>type-subhead-2--emphasis</code>, on the element or on a span for part of a line. A
          style is a class, not a tag: keep <code>strong</code> and <code>b</code> for real emphasis.
        </p>
        <Pairs :pairs="weightPairs" />

        <h2>Visual hierarchy</h2>
        <p>
          Hierarchy comes from the steps between roles, each a multiple of the body: Headline 4×, Subhead 2×, Subhead 2
          and Eyebrow 1.5×, Body 1×, Small print 0.75×. The faces add to it: Special Gothic Condensed for the Headline and
          Eyebrow, Zilla Slab for the Subhead, Roboto for the rest. Within a piece the body size stays put. For a bigger
          statement, step the Headline to 6× or 8×; for density, drop roles rather than shrink the text.
        </p>
      </div>
    `})},M=[`ApplyingTypography`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Applying typography',
  render: () => ({
    components: {
      Pairs
    },
    setup() {
      return {
        css,
        hierarchies: HIERARCHY_ROWS,
        rolePanels: ROLE_PANELS,
        gapRows: GAP_ROWS,
        weightPairs: WEIGHT_PAIRS,
        richTextCode: RICH_TEXT_CODE,
        hierarchyCode: HIERARCHY_CODE,
        fontsLink: FONTS_LINK
      };
    },
    template: \`
      <component is="style">{{ css }}</component>
      <div class="at type-rich-text">
        <div class="type-eyebrow">Typography</div>
        <h1>Applying typography</h1>
        <p>
          Pick a hierarchy for the piece, then a role for each piece of text. This page covers the roles, how to set
          them in code, and the rules for rich text, body text and weights.
        </p>

        <h2>Hierarchies and roles</h2>
        <p>
          A piece's format picks its hierarchy, as the
          <a href="../?path=/story/tokens-typography--formats" target="_top">Formats</a> page lists, and the hierarchy
          sets the body size. Every other role is a multiple of the body, so use one hierarchy's roles together. In
          code, the hierarchy is a class on the piece and each role is a class on its text. Medium, for web pages and
          applications, is the default and needs no class.
        </p>
        <div class="at__scroll" tabindex="0" role="region" aria-label="Hierarchies">
        <table class="type-small-print">
          <thead><tr><th scope="col">Hierarchy</th><th scope="col">Class</th><th scope="col">Body</th></tr></thead>
          <tbody>
            <tr v-for="h in hierarchies" :key="h.size">
              <th scope="row">{{ h.name }}</th>
              <td><code>type-scale--{{ h.size }}</code><span v-if="h.size === 'medium'" class="at__tag">default</span></td>
              <td>{{ h.body }}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>The roles in each hierarchy, with their classes and tokens:</p>
        <div class="at__roles">
          <details v-for="panel in rolePanels" :key="panel.title" :open="panel.open">
            <summary>{{ panel.title }}</summary>
            <div v-html="panel.content"></div>
          </details>
        </div>
        <p>A section or a component can take its own hierarchy. The nearest hierarchy class wins:</p>
        <pre class="at__code"><code>{{ hierarchyCode }}</code></pre>
        <p>
          UIDS's stylesheets, uids.css and uids-core.css, have the classes but don't load the typefaces. Load Roboto,
          Special Gothic Condensed and Zilla Slab from Google Fonts with this link, which has every weight the styles use:
        </p>
        <pre class="at__code"><code>{{ fontsLink }}</code></pre>
        <p>
          Every size in every hierarchy is on the
          <a href="../?path=/story/tokens-typography--hierarchy" target="_top">Hierarchy</a> page.
        </p>

        <h2>Space</h2>
        <p>The hierarchy class also sets two gaps, each a multiple of its body size:</p>
        <div class="at__scroll" tabindex="0" role="region" aria-label="Gaps">
        <table class="type-small-print">
          <thead>
            <tr>
              <th scope="col">Gap</th><th scope="col">Custom property</th><th scope="col">Token</th><th scope="col" class="at__size">Body ×</th>
              <th v-for="h in hierarchies" :key="h.size" scope="col" class="at__size">{{ h.name }}</th>
              <th scope="col">Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in gapRows" :key="g.token">
              <th scope="row">{{ g.name }}</th>
              <td><code class="at__class">{{ g.property }}</code></td>
              <td><code class="at__class">{{ g.token }}</code></td>
              <td>{{ g.multiple }}×</td>
              <td v-for="s in g.sizes" :key="s.size" class="at__size">{{ s.px }}px</td>
              <td>{{ g.use }}</td>
            </tr>
          </tbody>
        </table>
        </div>

        <h2>Rich text</h2>
        <p>
          Where an author picks only a heading level, as in a WYSIWYG editor, put the rich text inside
          <code>type-rich-text</code>. Its headings, paragraphs and lists then need no classes: each heading level takes
          its role in the document outline, and the text takes Body. This page is set that way, and the
          <a href="../?path=/story/tokens-typography--document-outline" target="_top">Document outline</a> page shows
          each level's role.
        </p>
        <pre class="at__code"><code>{{ richTextCode }}</code></pre>
        <p>
          Rich text takes the hierarchy it sits in: Medium, unless a hierarchy class on it or around it sets another. The
          class styles only its own children: components inside rich text keep their own styles, and a role class on a heading, such as
          <code>type-headline</code>, still wins. Between blocks the gap is Related; below the h1 and above a heading that
          starts a section, it's Break.
        </p>

        <h2>Body text</h2>
        <p>
          Body sets paragraphs and running text at the hierarchy's body size. Small print, three quarters of the body,
          sets credits, dates and fine print under it.
        </p>
        <p>
          Controls and captions take a Label: buttons, form labels, badges and bylines. The three Labels are one set for
          every hierarchy.
        </p>

        <h2>Weights and emphasis</h2>
        <p>
          Each role carries its weight, so use the classes rather than setting weights: 600 for the Eyebrow, the
          Headlines and the Subhead; 400 for Body, Small print and Subhead 2; 500 for the Labels.
        </p>
        <p>
          Subhead 2 has one emphasis, 500: a heading set in Subhead 2, and the line that leads a details group, such as
          the date. Set it with <code>type-subhead-2--emphasis</code>, on the element or on a span for part of a line. A
          style is a class, not a tag: keep <code>strong</code> and <code>b</code> for real emphasis.
        </p>
        <Pairs :pairs="weightPairs" />

        <h2>Visual hierarchy</h2>
        <p>
          Hierarchy comes from the steps between roles, each a multiple of the body: Headline 4×, Subhead 2×, Subhead 2
          and Eyebrow 1.5×, Body 1×, Small print 0.75×. The faces add to it: Special Gothic Condensed for the Headline and
          Eyebrow, Zilla Slab for the Subhead, Roboto for the rest. Within a piece the body size stays put. For a bigger
          statement, step the Headline to 6× or 8×; for density, drop roles rather than shrink the text.
        </p>
      </div>
    \`
  })
}`,...j.parameters?.docs?.source}}}}))();export{j as ApplyingTypography,M as __namedExportsOrder,A as default};