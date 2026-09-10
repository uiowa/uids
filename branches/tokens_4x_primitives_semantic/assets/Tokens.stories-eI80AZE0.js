import{i as e}from"./preload-helper-fGSbh7xu.js";import{X as t,lt as n,vt as r}from"./iframe-wBiF4U3I.js";function i(){let e=new Map;for(let t of document.styleSheets){let n;try{n=t.cssRules}catch{continue}for(let t of n)if(!(!t.style||!t.selectorText))for(let n of t.style)n.startsWith(`--uiowa-`)&&e.set(n,t.style.getPropertyValue(n).trim())}return e}function a(e){let t=e.replace(`--uiowa-`,``);return t.startsWith(`typography-`)?`type style`:t.startsWith(`color-`)?/^color-(text|link|border|background|brand|bg|info|success|warning|danger)/.test(t)?`color role`:`color primitive`:t.startsWith(`space-`)?`space`:t.startsWith(`layout-`)?`layout`:/^(font|line)-/.test(t)?`type primitive`:`other`}var o,s,c,l,u,d,f,p;e((()=>{t(),o=e=>getComputedStyle(document.documentElement).getPropertyValue(e).trim(),s=()=>{let e=r([]);return n(()=>{e.value=[...i()].map(([e,t])=>({name:e,declared:t,value:o(e),group:a(e)}))}),e},c=`
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
  .tk__note { color: var(--uiowa-color-neutral-500); }
`,l={title:`Tokens`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},u={render:()=>({setup(){return{tokens:s(),css:c}},template:`
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
                <th v-if="g === 'color role'">Points at</th>
                <th>Resolves to</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
                <td v-if="g === 'color role'"><code class="tk__note">{{ t.declared }}</code></td>
                <td><code>{{ t.value }}</code></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    `})},d={render:()=>({setup(){let e=s(),t=r([]);return n(()=>{t.value=[...new Set([...i().keys()].filter(e=>e.startsWith(`--uiowa-typography-`)&&!e.startsWith(`--uiowa-typography-size-`)).map(e=>e.replace(/-(font-family|font-weight|font-size|line-height)$/,``)))].map(e=>({base:e,channels:[`font-family`,`font-weight`,`font-size`,`line-height`].map(t=>({prop:t,name:`${e}-${t}`,value:o(`${e}-${t}`)}))}))}),{tokens:e,styles:t,css:c}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Type styles</h1>
        <p>Each specimen is set with its own four channels.</p>

        <table>
          <thead><tr><th>Style</th><th>Specimen</th><th>Channels</th></tr></thead>
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

        <h2>Primitives</h2>
        <table>
          <thead><tr><th>Token</th><th>Resolves to</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'type primitive')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    `})},f={name:`Space and layout`,render:()=>({setup(){return{tokens:s(),css:c}},template:`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Space and layout</h1>
        <p>Each bar is as wide as the token beside it.</p>

        <h2>Space scale</h2>
        <p class="tk__note">Step names are rem x 100. Values sit on a 4px grid at the 16px root size.</p>
        <table>
          <thead><tr><th>Token</th><th>Resolves to</th><th>Width</th></tr></thead>
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
          <thead><tr><th>Token</th><th>Resolves to</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'layout')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    `})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
                <th v-if="g === 'color role'">Points at</th>
                <th>Resolves to</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
                <td v-if="g === 'color role'"><code class="tk__note">{{ t.declared }}</code></td>
                <td><code>{{ t.value }}</code></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => ({
    setup() {
      const tokens = useTokens();
      const styles = ref([]);
      onMounted(() => {
        const names = new Set([...readTokens().keys()].filter(n => n.startsWith('--uiowa-typography-') && !n.startsWith('--uiowa-typography-size-')).map(n => n.replace(/-(font-family|font-weight|font-size|line-height)$/, '')));
        styles.value = [...names].map(base => ({
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
        css
      };
    },
    template: \`
      <div class="tk">
        <component is="style">{{ css }}</component>
        <h1>Type styles</h1>
        <p>Each specimen is set with its own four channels.</p>

        <table>
          <thead><tr><th>Style</th><th>Specimen</th><th>Channels</th></tr></thead>
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

        <h2>Primitives</h2>
        <table>
          <thead><tr><th>Token</th><th>Resolves to</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'type primitive')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
        <h1>Space and layout</h1>
        <p>Each bar is as wide as the token beside it.</p>

        <h2>Space scale</h2>
        <p class="tk__note">Step names are rem x 100. Values sit on a 4px grid at the 16px root size.</p>
        <table>
          <thead><tr><th>Token</th><th>Resolves to</th><th>Width</th></tr></thead>
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
          <thead><tr><th>Token</th><th>Resolves to</th></tr></thead>
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
}`,...f.parameters?.docs?.source}}},p=[`Colors`,`Typography`,`SpaceAndLayout`]}))();export{u as Colors,f as SpaceAndLayout,d as Typography,p as __namedExportsOrder,l as default};