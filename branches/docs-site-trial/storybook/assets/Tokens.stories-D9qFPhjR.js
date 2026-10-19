import{i as e}from"./preload-helper-BL0Fm5OC.js";import{Q as t,X as n,lt as r,vt as i}from"./iframe-DraWCpP9.js";var a,o,s=e((()=>{a={$type:`dimension`,$description:`Responsive width thresholds, stored in px and compiled to rem for Sass media and container queries.`,400:{$value:{value:400,unit:`px`}},600:{$value:{value:600,unit:`px`}},768:{$value:{value:768,unit:`px`}},930:{$value:{value:930,unit:`px`}},980:{$value:{value:980,unit:`px`}},1200:{$value:{value:1200,unit:`px`}},1350:{$value:{value:1350,unit:`px`}}},o={breakpoint:a}})),c,l,u=e((()=>{c={$type:`dimension`,container:{max:{$description:`Maximum width of the content column.`,standard:{$value:{value:81.875,unit:`rem`}},narrow:{$value:{value:63.75,unit:`rem`}},wide:{$value:{value:100,unit:`rem`}}}},breakpoint:{$description:`Width at which the content column reaches its maximum.`,standard:{$value:`{breakpoint.1350}`}}},l={layout:c}}));function d(){let e=new Map;for(let t of document.styleSheets){let n;try{n=t.cssRules}catch{continue}for(let t of n)if(!(!t.style||!t.selectorText))for(let n of t.style)n.startsWith(`--uiowa-`)&&e.set(n,t.style.getPropertyValue(n).trim())}return e}function f(e,t){let n=e.replace(`--uiowa-`,``);return n.startsWith(`typography-font-`)||n.startsWith(`typography-letter-`)||n.startsWith(`typography-line-`)?`type primitive`:n.startsWith(`typography-`)?`type style`:n.startsWith(`color-`)?t.startsWith(`var(`)?`color semantic`:`color primitive`:n.startsWith(`space-`)?`space`:n.startsWith(`layout-`)?`layout`:/^(font|letter|line)-/.test(n)?`type primitive`:n.startsWith(`stroke-width-`)?t.startsWith(`var(`)?`stroke semantic`:`stroke primitive`:n.startsWith(`radius-`)?`radius`:n.startsWith(`shadow-`)?`shadow`:n.startsWith(`duration-`)?`duration primitive`:n.startsWith(`motion-duration-`)?`duration semantic`:n.startsWith(`easing-`)?`easing`:n.startsWith(`form-height-`)?`form height`:n.startsWith(`logo-`)?`logo`:`other`}var p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;e((()=>{n(),s(),u(),p=[{name:`font-family`,property:`fontFamily`},{name:`font-weight`,property:`fontWeight`},{name:`font-size`,property:`fontSize`},{name:`letter-spacing`,property:`letterSpacing`},{name:`line-height`,property:`lineHeight`}],m=RegExp(`-(${p.map(({name:e})=>e).join(`|`)})$`),h=e=>e.replace(/^var\(\s*/,``).replace(/\s*\)$/,``),g=e=>(e.match(/var\(\s*(--uiowa-[\w-]+)\s*\)/)||[])[1]||``,_=e=>Object.entries(e).filter(([e])=>!e.startsWith(`$`)),v=(e,t)=>({name:`$uiowa-${e.join(`-`)}`,px:`${t}px`,rem:`${String(Number((t/16).toFixed(4)))}rem`}),y=Object.fromEntries(_(o.breakpoint).map(([e,t])=>[e,t.$value.value])),b=[...Object.entries(y).map(([e,t])=>({tier:`primitive`,...v([`breakpoint`,e],t)})),..._(l.layout.breakpoint).map(([e,t])=>{let n=t.$value.match(/^\{breakpoint\.(\w+)\}$/)[1];return{tier:`semantic`,primitive:`$uiowa-breakpoint-${n}`,...v([`layout`,`breakpoint`,e],y[n])}})],x=e=>getComputedStyle(document.documentElement).getPropertyValue(e).trim(),S=Object.fromEntries(p.map(({name:e,property:t})=>[e,t])),C=e=>(e.match(RegExp(`^--uiowa-typography-(${p.map(({name:e})=>e).join(`|`)})-`))||[])[1],w=e=>({[S[e.kind]]:`var(${e.name})`}),T=e=>Object.fromEntries(p.map(({name:t,property:n})=>[n,`var(${e}-${t})`])),E=()=>{let e=i([]);return r(()=>{e.value=[...d()].map(([e,t])=>({name:e,declared:t,value:x(e),group:f(e,t),kind:C(e)}))}),e},D=`
  .tk { padding: var(--uiowa-space-200); font-family: var(--uiowa-typography-body-font-family); }
  .tk h2 { margin-top: var(--uiowa-space-300); }
  .tk h3 { margin-top: var(--uiowa-space-200); }
  .tk table { width: 100%; border-collapse: collapse; }
  .tk th, .tk td {
    text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: middle;
  }
  .tk th { font-weight: var(--uiowa-typography-font-weight-medium); white-space: nowrap; }
  /* Column headings stay in view while a long table scrolls past. A sticky cell needs its
     own background, and a collapsed table's border scrolls away, so the rule under the
     headings is a shadow. */
  .tk thead th {
    position: sticky; top: 0; z-index: 1;
    background: var(--uiowa-color-background-white);
    box-shadow: inset 0 -1px 0 var(--uiowa-color-border-default);
  }
  .tk code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .tk__swatch {
    display: inline-block; width: 3rem; height: 1.6rem;
    border: 1px solid var(--uiowa-color-border-default);
  }
  .tk__bar { display: block; height: 1rem; background: var(--uiowa-color-brand-gold); }
  .tk__leading { display: inline-block; width: 14rem; }
  .tk__specimen { white-space: nowrap; }
  .tk__note { color: var(--uiowa-color-neutral-500); }
  /* A form height's box. The row's token sets its height, inline. */
  .tk__box { display: inline-block; width: 3rem; background: var(--uiowa-color-brand-gold); vertical-align: middle; }
  /* A stroke width's line. The row's token sets border-top-width, inline. */
  .tk__line {
    display: block; width: 8rem;
    border-top-style: solid; border-top-color: var(--uiowa-color-brand-black);
  }
  .tk__corner {
    display: inline-block; width: 6rem; height: 2rem;
    background: var(--uiowa-color-neutral-100);
    border: var(--uiowa-stroke-width-default) solid var(--uiowa-color-border-default);
  }
  .tk__card {
    display: inline-block; width: 6rem; height: 3rem; margin: var(--uiowa-space-100);
    background: var(--uiowa-color-background-white);
  }
  /* Motion: the track a dot crosses. */
  .tk__track {
    display: block; position: relative; width: 12rem; height: 1rem;
    background: var(--uiowa-color-neutral-100);
  }
  /* The dot. The row's token sets its duration, inline, and on the easing table its curve
     too; standard easing is the default. Reduce motion stops it, through uids-core.scss. */
  .tk__dot {
    position: absolute; top: 0; left: 0; width: 1rem; height: 1rem;
    border-radius: var(--uiowa-radius-full); background: var(--uiowa-color-brand-black);
    transition-property: transform; transition-timing-function: var(--uiowa-easing-standard);
  }
  /* Pointing at the track plays the dot to the far end: the 12rem track less the 1rem dot. */
  .tk__track:hover .tk__dot { transform: translateX(11rem); }
`,O={title:`Tokens`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},k={render:()=>({setup(){return{tokens:E(),primitiveOf:h,css:D}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Color tokens</h1>
        <p>Each swatch is painted by the token beside it.</p>

        <template v-for="g in ['color primitive', 'color semantic']" :key="g">
          <h2>{{ g === 'color primitive' ? 'Primitives' : 'Semantic' }}</h2>
          <p v-if="g === 'color semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'color semantic'">Primitive</th>
                <th>{{ g === 'color semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Swatch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'color semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    `})},A={render:()=>({setup(){let e=E();return{tokens:e,styles:t(()=>[...new Set(e.value.map(({name:e})=>e).filter(e=>e.startsWith(`--uiowa-typography-`)&&!e.startsWith(`--uiowa-typography-size-`)).filter(e=>m.test(e)).map(e=>e.replace(m,``)))].sort().map(e=>({base:e,channels:p.map(({name:t})=>({prop:t,name:`${e}-${t}`,value:x(`${e}-${t}`)}))}))),specimenStyle:w,typographyStyle:T,css:D}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Typography tokens</h1>
        <p>Each specimen is set by the token beside it.</p>

        <h2>Primitives</h2>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'type primitive')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td>
                <span
                  v-if="t.kind === 'line-height'"
                  class="tk__leading"
                  :style="specimenStyle(t)"
                >Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                <span v-else class="tk__specimen" :style="specimenStyle(t)">Aa Hawkeye</span>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Semantic</h2>
        <p class="tk__note">Each style sets its channels together. Use a style wherever one exists.</p>
        <table>
          <thead><tr><th>Style</th><th>Channels</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="s in styles" :key="s.base">
              <td><code>{{ s.base.replace('--uiowa-typography-', '') }}</code></td>
              <td>
                <div v-for="c in s.channels" :key="c.name">
                  <code class="tk__note">{{ c.prop }}</code> <code>{{ c.value }}</code>
                </div>
              </td>
              <td :style="typographyStyle(s.base)">Aa Hawkeye</td>
            </tr>
          </tbody>
        </table>

        <h3>Size modifiers</h3>
        <p class="tk__note">These change a size and nothing else about the style.</p>
        <table>
          <thead><tr><th>Token</th><th>Resolves to</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.name.startsWith('--uiowa-typography-size-'))" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td :style="{ fontSize: 'var(' + t.name + ')' }">Aa Hawkeye</td>
            </tr>
          </tbody>
        </table>
      </div>
    `})},j={name:`Space and layout`,render:()=>({setup(){return{tokens:E(),primitiveOf:h,breakpoints:b,css:D}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Space and layout tokens</h1>

        <h2>Space scale</h2>
        <p class="tk__note">
          Each bar is as wide as the token beside it. Step names are rem x 100, so values sit
          on a 4px grid at the 16px root size.
        </p>
        <h3>Primitives</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Width</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'space')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__bar" :style="{ width: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Container widths</h2>
        <h3>Semantic</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'layout')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>

        <h2>Form heights</h2>
        <p class="tk__note">
          Each points at a step of the space scale. Buttons use the same steps directly, so a
          button lines up with the field beside it. Each box is as tall as the token beside it.
        </p>
        <h3>Semantic</h3>
        <table>
          <thead><tr><th>Token</th><th>Space step</th><th>Resolves to</th><th>Height</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'form height')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__box" :style="{ height: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Logo minimum</h2>
        <p class="tk__note">The narrowest the logo may appear on screen. The bar is that wide.</p>
        <h3>Semantic</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Width</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'logo')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__bar" :style="{ width: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Breakpoints</h2>
        <p class="tk__note">
          A media query can't read a custom property, so breakpoints have none, and these
          tables read the token files. The build writes the values to Sass in rem, in
          <code>src/scss/abstracts/_breakpoints-generated.scss</code>, and the
          <code>$break-*</code> variables in <code>_variables.scss</code> read from there.
        </p>
        <template v-for="g in ['primitive', 'semantic']" :key="g">
          <h3>{{ g === 'primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'semantic'">Primitive</th>
                <th>{{ g === 'semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>In Sass</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in breakpoints.filter(b => b.tier === g)" :key="b.name">
                <td><code>{{ b.name }}</code></td>
                <td v-if="g === 'semantic'"><code class="tk__note">{{ b.primitive }}</code></td>
                <td><code>{{ b.px }}</code></td>
                <td><code>{{ b.rem }}</code></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    `})},M={name:`Borders and shapes`,render:()=>({setup(){return{tokens:E(),primitiveOf:h,css:D}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Border and shape tokens</h1>
        <p>Each specimen is drawn by the token beside it.</p>

        <h2>Stroke widths</h2>
        <p class="tk__note">
          A stroke width is the weight of a line, however it is drawn: a border, an outline, or a
          bar drawn with a pseudo-element's height.
        </p>
        <template v-for="g in ['stroke primitive', 'stroke semantic']" :key="g">
          <h3>{{ g === 'stroke primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <p v-if="g === 'stroke semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'stroke semantic'">Primitive</th>
                <th>{{ g === 'stroke semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Line</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'stroke semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__line" :style="{ borderTopWidth: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>

        <h2>Radius</h2>
        <h3>Primitives</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Corner</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'radius')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__corner" :style="{ borderRadius: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `})},N={render:()=>({setup(){return{tokens:E(),colorOf:g,css:D}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Shadow tokens</h1>
        <p>Each card is shadowed by the token beside it.</p>
        <h2>Semantic</h2>
        <p class="tk__note">
          Shadows are semantic tokens, named by use. Each takes its color from an alpha
          primitive on the Colors page.
        </p>
        <table>
          <thead><tr><th>Token</th><th>Color</th><th>Resolves to</th><th>Shadow</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'shadow')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code class="tk__note">{{ colorOf(t.declared) }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__card" :style="{ boxShadow: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>
        <p class="tk__note">
          Text shadows aren't tokens. The banner's takes its color from the banner's overlay,
          black or white, which a fixed token can't follow.
        </p>
      </div>
    `})},P={render:()=>({setup(){return{tokens:E(),primitiveOf:h,css:D}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Motion tokens</h1>
        <p>Point at a track to play it. Each dot moves with the token beside it.</p>
        <p class="tk__note">
          With Reduce motion turned on, UIDS stops every transition, so the dots jump instead.
        </p>

        <h2>Durations</h2>
        <template v-for="g in ['duration primitive', 'duration semantic']" :key="g">
          <h3>{{ g === 'duration primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <p v-if="g === 'duration semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'duration semantic'">Primitive</th>
                <th>{{ g === 'duration semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Track</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'duration semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td>
                  <span class="tk__track">
                    <span class="tk__dot" :style="{ transitionDuration: 'var(' + t.name + ')' }"></span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </template>

        <h2>Easing</h2>
        <p class="tk__note">
          These purpose-named semantic curves hold their values directly. Each plays at the slow
          speed, so its shape is easy to see.
        </p>
        <h3>Semantic</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Track</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'easing')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td>
                <span class="tk__track">
                  <span
                    class="tk__dot"
                    :style="{
                      transitionDuration: 'var(--uiowa-motion-duration-slow)',
                      transitionTimingFunction: 'var(' + t.name + ')',
                    }"
                  ></span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `})},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => ({
    setup() {
      return {
        tokens: useTokens(),
        primitiveOf,
        css
      };
    },
    template: \`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Color tokens</h1>
        <p>Each swatch is painted by the token beside it.</p>

        <template v-for="g in ['color primitive', 'color semantic']" :key="g">
          <h2>{{ g === 'color primitive' ? 'Primitives' : 'Semantic' }}</h2>
          <p v-if="g === 'color semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'color semantic'">Primitive</th>
                <th>{{ g === 'color semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Swatch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'color semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    \`
  })
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => ({
    setup() {
      const tokens = useTokens();
      const styles = computed(() => {
        const names = new Set(tokens.value.map(({
          name
        }) => name).filter(name => name.startsWith('--uiowa-typography-') && !name.startsWith('--uiowa-typography-size-')).filter(name => TYPOGRAPHY_CHANNEL_PATTERN.test(name)).map(name => name.replace(TYPOGRAPHY_CHANNEL_PATTERN, '')));
        return [...names].sort().map(base => ({
          base,
          channels: TYPOGRAPHY_CHANNELS.map(({
            name
          }) => ({
            prop: name,
            name: \`\${base}-\${name}\`,
            value: computedValue(\`\${base}-\${name}\`)
          }))
        }));
      });
      return {
        tokens,
        styles,
        specimenStyle,
        typographyStyle,
        css
      };
    },
    template: \`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Typography tokens</h1>
        <p>Each specimen is set by the token beside it.</p>

        <h2>Primitives</h2>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'type primitive')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td>
                <span
                  v-if="t.kind === 'line-height'"
                  class="tk__leading"
                  :style="specimenStyle(t)"
                >Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                <span v-else class="tk__specimen" :style="specimenStyle(t)">Aa Hawkeye</span>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Semantic</h2>
        <p class="tk__note">Each style sets its channels together. Use a style wherever one exists.</p>
        <table>
          <thead><tr><th>Style</th><th>Channels</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="s in styles" :key="s.base">
              <td><code>{{ s.base.replace('--uiowa-typography-', '') }}</code></td>
              <td>
                <div v-for="c in s.channels" :key="c.name">
                  <code class="tk__note">{{ c.prop }}</code> <code>{{ c.value }}</code>
                </div>
              </td>
              <td :style="typographyStyle(s.base)">Aa Hawkeye</td>
            </tr>
          </tbody>
        </table>

        <h3>Size modifiers</h3>
        <p class="tk__note">These change a size and nothing else about the style.</p>
        <table>
          <thead><tr><th>Token</th><th>Resolves to</th><th>Specimen</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.name.startsWith('--uiowa-typography-size-'))" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td :style="{ fontSize: 'var(' + t.name + ')' }">Aa Hawkeye</td>
            </tr>
          </tbody>
        </table>
      </div>
    \`
  })
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Space and layout',
  render: () => ({
    setup() {
      return {
        tokens: useTokens(),
        primitiveOf,
        breakpoints: BREAKPOINTS,
        css
      };
    },
    template: \`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Space and layout tokens</h1>

        <h2>Space scale</h2>
        <p class="tk__note">
          Each bar is as wide as the token beside it. Step names are rem x 100, so values sit
          on a 4px grid at the 16px root size.
        </p>
        <h3>Primitives</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Width</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'space')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__bar" :style="{ width: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Container widths</h2>
        <h3>Semantic</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'layout')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>

        <h2>Form heights</h2>
        <p class="tk__note">
          Each points at a step of the space scale. Buttons use the same steps directly, so a
          button lines up with the field beside it. Each box is as tall as the token beside it.
        </p>
        <h3>Semantic</h3>
        <table>
          <thead><tr><th>Token</th><th>Space step</th><th>Resolves to</th><th>Height</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'form height')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__box" :style="{ height: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Logo minimum</h2>
        <p class="tk__note">The narrowest the logo may appear on screen. The bar is that wide.</p>
        <h3>Semantic</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Width</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'logo')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__bar" :style="{ width: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>

        <h2>Breakpoints</h2>
        <p class="tk__note">
          A media query can't read a custom property, so breakpoints have none, and these
          tables read the token files. The build writes the values to Sass in rem, in
          <code>src/scss/abstracts/_breakpoints-generated.scss</code>, and the
          <code>$break-*</code> variables in <code>_variables.scss</code> read from there.
        </p>
        <template v-for="g in ['primitive', 'semantic']" :key="g">
          <h3>{{ g === 'primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'semantic'">Primitive</th>
                <th>{{ g === 'semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>In Sass</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in breakpoints.filter(b => b.tier === g)" :key="b.name">
                <td><code>{{ b.name }}</code></td>
                <td v-if="g === 'semantic'"><code class="tk__note">{{ b.primitive }}</code></td>
                <td><code>{{ b.px }}</code></td>
                <td><code>{{ b.rem }}</code></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    \`
  })
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Borders and shapes',
  render: () => ({
    setup() {
      return {
        tokens: useTokens(),
        primitiveOf,
        css
      };
    },
    template: \`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Border and shape tokens</h1>
        <p>Each specimen is drawn by the token beside it.</p>

        <h2>Stroke widths</h2>
        <p class="tk__note">
          A stroke width is the weight of a line, however it is drawn: a border, an outline, or a
          bar drawn with a pseudo-element's height.
        </p>
        <template v-for="g in ['stroke primitive', 'stroke semantic']" :key="g">
          <h3>{{ g === 'stroke primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <p v-if="g === 'stroke semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'stroke semantic'">Primitive</th>
                <th>{{ g === 'stroke semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Line</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'stroke semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__line" :style="{ borderTopWidth: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>

        <h2>Radius</h2>
        <h3>Primitives</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Corner</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'radius')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__corner" :style="{ borderRadius: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    \`
  })
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => ({
    setup() {
      return {
        tokens: useTokens(),
        colorOf,
        css
      };
    },
    template: \`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Shadow tokens</h1>
        <p>Each card is shadowed by the token beside it.</p>
        <h2>Semantic</h2>
        <p class="tk__note">
          Shadows are semantic tokens, named by use. Each takes its color from an alpha
          primitive on the Colors page.
        </p>
        <table>
          <thead><tr><th>Token</th><th>Color</th><th>Resolves to</th><th>Shadow</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'shadow')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code class="tk__note">{{ colorOf(t.declared) }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td><span class="tk__card" :style="{ boxShadow: 'var(' + t.name + ')' }"></span></td>
            </tr>
          </tbody>
        </table>
        <p class="tk__note">
          Text shadows aren't tokens. The banner's takes its color from the banner's overlay,
          black or white, which a fixed token can't follow.
        </p>
      </div>
    \`
  })
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => ({
    setup() {
      return {
        tokens: useTokens(),
        primitiveOf,
        css
      };
    },
    template: \`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Motion tokens</h1>
        <p>Point at a track to play it. Each dot moves with the token beside it.</p>
        <p class="tk__note">
          With Reduce motion turned on, UIDS stops every transition, so the dots jump instead.
        </p>

        <h2>Durations</h2>
        <template v-for="g in ['duration primitive', 'duration semantic']" :key="g">
          <h3>{{ g === 'duration primitive' ? 'Primitives' : 'Semantic' }}</h3>
          <p v-if="g === 'duration semantic'" class="tk__note">
            A semantic token points at a primitive. Use a semantic token wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th v-if="g === 'duration semantic'">Primitive</th>
                <th>{{ g === 'duration semantic' ? 'Resolves to' : 'Value' }}</th>
                <th>Track</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'duration semantic'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td>
                  <span class="tk__track">
                    <span class="tk__dot" :style="{ transitionDuration: 'var(' + t.name + ')' }"></span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </template>

        <h2>Easing</h2>
        <p class="tk__note">
          These purpose-named semantic curves hold their values directly. Each plays at the slow
          speed, so its shape is easy to see.
        </p>
        <h3>Semantic</h3>
        <table>
          <thead><tr><th>Token</th><th>Value</th><th>Track</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'easing')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
              <td>
                <span class="tk__track">
                  <span
                    class="tk__dot"
                    :style="{
                      transitionDuration: 'var(--uiowa-motion-duration-slow)',
                      transitionTimingFunction: 'var(' + t.name + ')',
                    }"
                  ></span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    \`
  })
}`,...P.parameters?.docs?.source}}},F=[`Colors`,`Typography`,`SpaceAndLayout`,`BordersAndShapes`,`Shadows`,`Motion`]}))();export{M as BordersAndShapes,k as Colors,P as Motion,N as Shadows,j as SpaceAndLayout,A as Typography,F as __namedExportsOrder,O as default};