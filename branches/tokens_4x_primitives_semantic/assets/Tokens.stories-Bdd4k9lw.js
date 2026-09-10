import{i as e}from"./preload-helper-fGSbh7xu.js";import{X as t,lt as n,vt as r}from"./iframe-6Y5OB71c.js";function i(){let e=new Map;for(let t of document.styleSheets){let n;try{n=t.cssRules}catch{continue}for(let t of n)if(!(!t.style||!t.selectorText))for(let n of t.style)n.startsWith(`--uiowa-`)&&e.set(n,t.style.getPropertyValue(n).trim())}return e}function a(e){let t=e.replace(`--uiowa-`,``);return t.startsWith(`typography-`)?`type style`:t.startsWith(`color-`)?/^color-(text|link|border|background|brand|bg|info|success|warning|danger)/.test(t)?`color role`:`color primitive`:t.startsWith(`space-`)?`space`:t.startsWith(`layout-`)?`layout`:/^(font|line)-/.test(t)?`type primitive`:`other`}var o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{t(),o=e=>e.replace(/^var\(\s*/,``).replace(/\s*\)$/,``),s=e=>getComputedStyle(document.documentElement).getPropertyValue(e).trim(),c={"font-family":`fontFamily`,"font-weight":`fontWeight`,"font-size":`fontSize`,"line-height":`lineHeight`},l=e=>(e.match(/^--uiowa-(font-family|font-weight|font-size|line-height)-/)||[])[1],u=e=>({[c[e.kind]]:`var(${e.name})`}),d=()=>{let e=r([]);return n(()=>{e.value=[...i()].map(([e,t])=>({name:e,declared:t,value:s(e),group:a(e),kind:l(e)}))}),e},f=`
  .tk { padding: var(--uiowa-space-200); font-family: var(--uiowa-typography-body-font-family); }
  .tk h2 { margin-top: var(--uiowa-space-300); }
  .tk table { width: 100%; border-collapse: collapse; }
  .tk th, .tk td {
    text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: middle;
  }
  .tk th { font-weight: var(--uiowa-font-weight-medium); white-space: nowrap; }
  .tk code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .tk__swatch {
    display: inline-block; width: 3rem; height: 1.6rem;
    border: 1px solid var(--uiowa-color-border-default);
  }
  .tk__bar { display: block; height: 1rem; background: var(--uiowa-color-brand); }
  .tk__leading { display: inline-block; width: 14rem; }
  .tk__specimen { white-space: nowrap; }
  .tk__note { color: var(--uiowa-color-neutral-500); }
`,p={title:`Tokens`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},m={render:()=>({setup(){return{tokens:d(),primitiveOf:o,css:f}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Color tokens</h1>
        <p>Each swatch is painted by the token beside it.</p>

        <template v-for="g in ['color primitive', 'color role']" :key="g">
          <h2>{{ g === 'color primitive' ? 'Primitives' : 'Roles' }}</h2>
          <p v-if="g === 'color role'" class="tk__note">
            A role points at a primitive. Style from a role wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th><th>Swatch</th>
                <th v-if="g === 'color role'">Primitive</th>
                <th>{{ g === 'color role' ? 'Resolves to' : 'Value' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
                <td v-if="g === 'color role'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    `})},h={render:()=>({setup(){let e=d(),t=r([]);return n(()=>{t.value=[...new Set([...i().keys()].filter(e=>e.startsWith(`--uiowa-typography-`)&&!e.startsWith(`--uiowa-typography-size-`)).map(e=>e.replace(/-(font-family|font-weight|font-size|line-height)$/,``)))].sort().map(e=>({base:e,channels:[`font-family`,`font-weight`,`font-size`,`line-height`].map(t=>({prop:t,name:`${e}-${t}`,value:s(`${e}-${t}`)}))}))}),{tokens:e,styles:t,specimenStyle:u,css:f}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Typography tokens</h1>
        <p>Each specimen is set by the token beside it.</p>

        <h2>Primitives</h2>
        <table>
          <thead><tr><th>Token</th><th>Specimen</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'type primitive')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td>
                <span
                  v-if="t.kind === 'line-height'"
                  class="tk__leading"
                  :style="specimenStyle(t)"
                >Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                <span v-else class="tk__specimen" :style="specimenStyle(t)">Aa Hawkeye</span>
              </td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>

        <h2>Roles</h2>
        <p class="tk__note">A role sets four channels together. Style from one wherever one exists.</p>
        <table>
          <thead><tr><th>Role</th><th>Specimen</th><th>Channels</th></tr></thead>
          <tbody>
            <tr v-for="s in styles" :key="s.base">
              <td><code>{{ s.base.replace('--uiowa-typography-', '') }}</code></td>
              <td :style="{
                fontFamily: 'var(' + s.base + '-font-family)',
                fontWeight: 'var(' + s.base + '-font-weight)',
                fontSize: 'var(' + s.base + '-font-size)',
                lineHeight: 'var(' + s.base + '-line-height)',
              }">Aa Hawkeye</td>
              <td>
                <div v-for="c in s.channels" :key="c.name">
                  <code class="tk__note">{{ c.prop }}</code> <code>{{ c.value }}</code>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Size modifiers</h2>
        <p class="tk__note">These change a size and nothing else about the style.</p>
        <table>
          <thead><tr><th>Token</th><th>Specimen</th><th>Resolves to</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.name.startsWith('--uiowa-typography-size-'))" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td :style="{ fontSize: 'var(' + t.name + ')' }">Aa Hawkeye</td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    `})},g={name:`Space and layout`,render:()=>({setup(){return{tokens:d(),css:f}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Space and layout tokens</h1>

        <h2>Space scale</h2>
        <p class="tk__note">
          Each bar is as wide as the token beside it. Step names are rem x 100, so values sit
          on a 4px grid at the 16px root size.
        </p>
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
        <table>
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'layout')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    `})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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

        <template v-for="g in ['color primitive', 'color role']" :key="g">
          <h2>{{ g === 'color primitive' ? 'Primitives' : 'Roles' }}</h2>
          <p v-if="g === 'color role'" class="tk__note">
            A role points at a primitive. Style from a role wherever one exists.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th><th>Swatch</th>
                <th v-if="g === 'color role'">Primitive</th>
                <th>{{ g === 'color role' ? 'Resolves to' : 'Value' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
                <td v-if="g === 'color role'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => ({
    setup() {
      const tokens = useTokens();
      const styles = ref([]);
      onMounted(() => {
        const names = new Set([...readTokens().keys()].filter(n => n.startsWith('--uiowa-typography-') && !n.startsWith('--uiowa-typography-size-')).map(n => n.replace(/-(font-family|font-weight|font-size|line-height)$/, '')));
        styles.value = [...names].sort().map(base => ({
          base,
          channels: ['font-family', 'font-weight', 'font-size', 'line-height'].map(c => ({
            prop: c,
            name: \`\${base}-\${c}\`,
            value: computed(\`\${base}-\${c}\`)
          }))
        }));
      });
      return {
        tokens,
        styles,
        specimenStyle,
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
          <thead><tr><th>Token</th><th>Specimen</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'type primitive')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td>
                <span
                  v-if="t.kind === 'line-height'"
                  class="tk__leading"
                  :style="specimenStyle(t)"
                >Aa Hawkeye Aa Hawkeye Aa Hawkeye</span>
                <span v-else class="tk__specimen" :style="specimenStyle(t)">Aa Hawkeye</span>
              </td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>

        <h2>Roles</h2>
        <p class="tk__note">A role sets four channels together. Style from one wherever one exists.</p>
        <table>
          <thead><tr><th>Role</th><th>Specimen</th><th>Channels</th></tr></thead>
          <tbody>
            <tr v-for="s in styles" :key="s.base">
              <td><code>{{ s.base.replace('--uiowa-typography-', '') }}</code></td>
              <td :style="{
                fontFamily: 'var(' + s.base + '-font-family)',
                fontWeight: 'var(' + s.base + '-font-weight)',
                fontSize: 'var(' + s.base + '-font-size)',
                lineHeight: 'var(' + s.base + '-line-height)',
              }">Aa Hawkeye</td>
              <td>
                <div v-for="c in s.channels" :key="c.name">
                  <code class="tk__note">{{ c.prop }}</code> <code>{{ c.value }}</code>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Size modifiers</h2>
        <p class="tk__note">These change a size and nothing else about the style.</p>
        <table>
          <thead><tr><th>Token</th><th>Specimen</th><th>Resolves to</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.name.startsWith('--uiowa-typography-size-'))" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td :style="{ fontSize: 'var(' + t.name + ')' }">Aa Hawkeye</td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Space and layout',
  render: () => ({
    setup() {
      return {
        tokens: useTokens(),
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
        <table>
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'layout')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    \`
  })
}`,...g.parameters?.docs?.source}}},_=[`Colors`,`Typography`,`SpaceAndLayout`]}))();export{m as Colors,g as SpaceAndLayout,h as Typography,_ as __namedExportsOrder,p as default};