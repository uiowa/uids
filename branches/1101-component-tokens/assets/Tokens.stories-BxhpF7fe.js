import{i as e}from"./preload-helper-CN-IQmCb.js";import{K as t,X as n,gt as r,st as i}from"./iframe-BgPAXKbN.js";import{a,c as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./tokenDisplay-C_zMeQsU.js";function h(){let e=new Map;for(let t of document.styleSheets){let n;try{n=t.cssRules}catch{continue}for(let t of n)if(!(t.selectorText!==`:root`||!t.style))for(let n of t.style)n.startsWith(`--uiowa-`)&&e.set(n,t.style.getPropertyValue(n).trim())}return e}function g(e,t){let n=e.replace(`--uiowa-`,``);return n.startsWith(`typography-font-`)||n.startsWith(`typography-letter-`)||n.startsWith(`typography-line-`)?`type primitive`:n.startsWith(`typography-`)?`type style`:n.startsWith(`color-`)?t.startsWith(`var(`)?`color semantic`:`color primitive`:n.startsWith(`space-`)?`space`:n.startsWith(`layout-`)?`layout`:/^(font|letter|line)-/.test(n)?`type primitive`:n.startsWith(`stroke-width-`)?t.startsWith(`var(`)?`stroke semantic`:`stroke primitive`:n.startsWith(`radius-`)?`radius`:n.startsWith(`shadow-`)?`shadow`:n.startsWith(`duration-`)?`duration primitive`:n.startsWith(`motion-duration-`)?`duration semantic`:n.startsWith(`easing-`)?`easing`:n.startsWith(`form-height-`)?`form height`:n===`logo-min-width`?`logo`:`other`}var _,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P;e((()=>{t(),m(),o(),a(),_=RegExp(`-(${l.map(({name:e})=>e).join(`|`)})$`),v=e=>(e.match(/var\(\s*(--uiowa-[\w-]+)\s*\)/)||[])[1]||``,y=e=>Object.entries(e).filter(([e])=>!e.startsWith(`$`)),b=(e,t)=>({name:`$uiowa-${e.join(`-`)}`,px:`${t}px`,rem:`${String(Number((t/16).toFixed(4)))}rem`}),x=Object.fromEntries(y(c.breakpoint).map(([e,t])=>[e,t.$value.value])),S=[...Object.entries(x).map(([e,t])=>({tier:`primitive`,...b([`breakpoint`,e],t)})),...y(f.breakpoint).map(([e,t])=>{let n=t.$value.match(/^\{breakpoint\.(\w+)\}$/)[1];return{tier:`semantic`,primitive:`$uiowa-breakpoint-${n}`,...b([`breakpoint`,e],x[n])}})],C=e=>(e.match(RegExp(`^--uiowa-typography-(${l.map(({name:e})=>e).join(`|`)})-`))||[])[1],w=e=>({[p[e.kind]]:`var(${e.name})`}),T=e=>Object.fromEntries(l.map(({name:t,property:n})=>[n,`var(${e}-${t})`])),E=()=>{let e=r([]);return i(()=>{e.value=[...h()].map(([e,t])=>({name:e,declared:t,value:d(e),group:g(e,t),kind:C(e)}))}),e},D={title:`Tokens`,tags:[`!autodocs`,`noAddonsDrawer`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},O={render:()=>({setup(){return{tokens:E(),primitiveOf:u,css:s}},template:`
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
    `})},k={render:()=>({setup(){let e=E();return{tokens:e,styles:n(()=>[...new Set(e.value.map(({name:e})=>e).filter(e=>e.startsWith(`--uiowa-typography-`)&&!e.startsWith(`--uiowa-typography-size-`)).filter(e=>_.test(e)).map(e=>e.replace(_,``)))].sort().map(e=>({base:e,channels:l.map(({name:t})=>({prop:t,name:`${e}-${t}`,value:d(`${e}-${t}`)}))}))),specimenStyle:w,typographyStyle:T,css:s}},template:`
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
    `})},A={name:`Space and layout`,render:()=>({setup(){return{tokens:E(),primitiveOf:u,breakpoints:S,css:s}},template:`
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
    `})},j={name:`Borders and shapes`,render:()=>({setup(){return{tokens:E(),primitiveOf:u,css:s}},template:`
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
    `})},M={render:()=>({setup(){return{tokens:E(),colorOf:v,css:s}},template:`
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
    `})},N={render:()=>({setup(){return{tokens:E(),primitiveOf:u,css:s}},template:`
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
    `})},P=[`Colors`,`Typography`,`SpaceAndLayout`,`BordersAndShapes`,`Shadows`,`Motion`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}}}))();export{j as BordersAndShapes,O as Colors,N as Motion,M as Shadows,A as SpaceAndLayout,k as Typography,P as __namedExportsOrder,D as default};