import{i as e}from"./preload-helper-fGSbh7xu.js";import{Q as t,X as n,lt as r,vt as i}from"./iframe-C59QPLkx.js";function a(){let e=new Map;for(let t of document.styleSheets){let n;try{n=t.cssRules}catch{continue}for(let t of n)if(!(!t.style||!t.selectorText))for(let n of t.style)n.startsWith(`--uiowa-`)&&e.set(n,t.style.getPropertyValue(n).trim())}return e}function o(e,t){let n=e.replace(`--uiowa-`,``);return n.startsWith(`typography-font-`)||n.startsWith(`typography-letter-`)||n.startsWith(`typography-line-`)?`type primitive`:n.startsWith(`typography-`)?`type style`:n.startsWith(`color-`)?t.startsWith(`var(`)?`color role`:`color primitive`:n.startsWith(`space-`)?`space`:n.startsWith(`layout-`)?`layout`:/^(font|letter|line)-/.test(n)?`type primitive`:`other`}var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{n(),s=[{name:`font-family`,property:`fontFamily`},{name:`font-weight`,property:`fontWeight`},{name:`font-size`,property:`fontSize`},{name:`letter-spacing`,property:`letterSpacing`},{name:`line-height`,property:`lineHeight`}],c=RegExp(`-(${s.map(({name:e})=>e).join(`|`)})$`),l=e=>e.replace(/^var\(\s*/,``).replace(/\s*\)$/,``),u=e=>getComputedStyle(document.documentElement).getPropertyValue(e).trim(),d=Object.fromEntries(s.map(({name:e,property:t})=>[e,t])),f=e=>(e.match(RegExp(`^--uiowa-typography-(${s.map(({name:e})=>e).join(`|`)})-`))||[])[1],p=e=>({[d[e.kind]]:`var(${e.name})`}),m=e=>Object.fromEntries(s.map(({name:t,property:n})=>[n,`var(${e}-${t})`])),h=()=>{let e=i([]);return r(()=>{e.value=[...a()].map(([e,t])=>({name:e,declared:t,value:u(e),group:o(e,t),kind:f(e)}))}),e},g=`
  .tk { padding: var(--uiowa-space-200); font-family: var(--uiowa-typography-body-font-family); }
  .tk h2 { margin-top: var(--uiowa-space-300); }
  .tk h3 { margin-top: var(--uiowa-space-200); }
  .tk table { width: 100%; border-collapse: collapse; }
  .tk th, .tk td {
    text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: middle;
  }
  .tk th { font-weight: var(--uiowa-typography-font-weight-medium); white-space: nowrap; }
  .tk code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .tk__swatch {
    display: inline-block; width: 3rem; height: 1.6rem;
    border: 1px solid var(--uiowa-color-border-default);
  }
  .tk__bar { display: block; height: 1rem; background: var(--uiowa-color-brand-gold); }
  .tk__leading { display: inline-block; width: 14rem; }
  .tk__specimen { white-space: nowrap; }
  .tk__note { color: var(--uiowa-color-neutral-500); }
`,_={title:`Tokens`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}}},v={render:()=>({setup(){return{tokens:h(),primitiveOf:l,css:g}},template:`
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
                <th>Token</th>
                <th v-if="g === 'color role'">Primitive</th>
                <th>{{ g === 'color role' ? 'Resolves to' : 'Value' }}</th>
                <th>Swatch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'color role'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    `})},y={render:()=>({setup(){let e=h();return{tokens:e,styles:t(()=>[...new Set(e.value.map(({name:e})=>e).filter(e=>e.startsWith(`--uiowa-typography-`)&&!e.startsWith(`--uiowa-typography-size-`)).filter(e=>c.test(e)).map(e=>e.replace(c,``)))].sort().map(e=>({base:e,channels:s.map(({name:t})=>({prop:t,name:`${e}-${t}`,value:u(`${e}-${t}`)}))}))),specimenStyle:p,typographyStyle:m,css:g}},template:`
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

        <h2>Roles</h2>
        <p class="tk__note">A role sets its channels together. Style from one wherever one exists.</p>
        <table>
          <thead><tr><th>Role</th><th>Channels</th><th>Specimen</th></tr></thead>
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
    `})},b={name:`Space and layout`,render:()=>({setup(){return{tokens:h(),css:g}},template:`
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

        <h2>Unclassified</h2>
        <p class="tk__note">
          Legacy aliases from <code>uids-core.scss</code> land here. A new token group
          landing here needs a page.
        </p>
        <table v-if="tokens.some(t => t.group === 'other')">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'other')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
        <p v-else class="tk__note">None.</p>
      </div>
    `})},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
                <th>Token</th>
                <th v-if="g === 'color role'">Primitive</th>
                <th>{{ g === 'color role' ? 'Resolves to' : 'Value' }}</th>
                <th>Swatch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in tokens.filter(t => t.group === g)" :key="t.name">
                <td><code>{{ t.name }}</code></td>
                <td v-if="g === 'color role'"><code class="tk__note">{{ primitiveOf(t.declared) }}</code></td>
                <td><code>{{ t.value }}</code></td>
                <td><span class="tk__swatch" :style="{ background: 'var(' + t.name + ')' }"></span></td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    \`
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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

        <h2>Roles</h2>
        <p class="tk__note">A role sets its channels together. Style from one wherever one exists.</p>
        <table>
          <thead><tr><th>Role</th><th>Channels</th><th>Specimen</th></tr></thead>
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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

        <h2>Unclassified</h2>
        <p class="tk__note">
          Legacy aliases from <code>uids-core.scss</code> land here. A new token group
          landing here needs a page.
        </p>
        <table v-if="tokens.some(t => t.group === 'other')">
          <thead><tr><th>Token</th><th>Value</th></tr></thead>
          <tbody>
            <tr v-for="t in tokens.filter(t => t.group === 'other')" :key="t.name">
              <td><code>{{ t.name }}</code></td>
              <td><code>{{ t.value }}</code></td>
            </tr>
          </tbody>
        </table>
        <p v-else class="tk__note">None.</p>
      </div>
    \`
  })
}`,...b.parameters?.docs?.source}}},x=[`Colors`,`Typography`,`SpaceAndLayout`]}))();export{v as Colors,b as SpaceAndLayout,y as Typography,x as __namedExportsOrder,_ as default};