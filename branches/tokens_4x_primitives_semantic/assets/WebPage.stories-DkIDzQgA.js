import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./_background-BWItl8tW.js";import n,{t as r}from"./Background.stories-D_5wQVGF.js";import{n as i,t as a}from"./background-D9TKct7-.js";import{n as o,t as s}from"./Button-ClT2G_Cw.js";import{t as c}from"./_headline-Dw2Nq3Ws.js";import{n as l,t as u}from"./Banner-BvPHNLMr.js";import{t as d}from"./_grid-CbM219EP.js";import{i as f,n as p,r as m,t as h}from"./GridItem-oIrlhf15.js";import{n as g,t as _}from"./ExampleImage-BnGHDy7p.js";import{n as v,r as y,t as b}from"./Blockquote-WMEhXWWc.js";import{n as x,t as S}from"./BrandBar-Cx_v5NcK.js";import{n as C,t as w}from"./BrandFooter-D4ooc8x_.js";import{n as T,t as E}from"./Card-BXyipdJy.js";import{n as D,t as O}from"./Menu-CQILZU4B.js";import{n as k,t as A}from"./_flexbox-BXdAgVD0.js";import{n as j,r as M,t as N}from"./Table-BF-v2v00.js";import{n as P,t as F}from"./Stat-OM4Jmkba.js";var I,L,R,z,B,V;e((()=>{t(),k(),c(),y(),M(),d(),A(),x(),g(),l(),v(),C(),o(),T(),f(),p(),D(),P(),j(),i(),r(),I=[{label:`Areas of Study`,url:`#`},{label:`Research`,url:`#`},{label:`Student Life`,url:`#`},{label:`About the College`,url:`#`}],L=[{title:`Undergraduate majors`,body:`Card body copy. Two or three lines is typical.`},{title:`Graduate study`,body:`Card body copy. Two or three lines is typical.`},{title:`Certificates`,body:`Card body copy. Two or three lines is typical.`}],R={title:`Showcase/Web page`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}},argTypes:{intro_background:{...n.argTypes.section_background,name:`Intro section background`},programs_background:{...n.argTypes.section_background,name:`Program section background`},card_background:{...a.argTypes.background,name:`Card background`},stats_background:{...n.argTypes.section_background,name:`Stats section background`}}},z={render:e=>({components:{BrandBar:S,ExampleImage:_,UidsBanner:u,UidsBlockquote:b,UidsButton:s,UidsCard:E,UidsGrid:m,UidsGridItem:h,UidsIowaFooter:w,UidsMenu:O,UidsStat:F,UidsTable:N},setup(){return{args:e,menuItems:I,programs:L}},template:`
      <main>
        <brand-bar :narrow="false" :healthcare="false">
          <h1 class="site-name">College of Liberal Arts and Sciences</h1>
        </brand-bar>

        <nav class="menu--container">
          <div class="layout-container">
            <uids-menu variant="horizontal" :items="menuItems" label="Main" top />
          </div>
        </nav>

        <uids-banner
          :headline="{ text: 'Banner headline', level: 'h2', text_style: 'serif', size: 'large', url: '' }"
          :height="'large'"
          :narrow="true"
          :horizontal_alignment="'center'"
          :vertical_alignment="'bottom'"
          :media_overlay_type="''"
          :button_color="'primary'"
          :buttons="[
            { label: 'Primary action', url: '#' },
            { label: 'Second action', url: '#' },
          ]"
        >
          <template #media><example-image /></template>
          <p>Banner body copy sits under the headline.</p>
        </uids-banner>

        <div :class="args.intro_background">
          <div class="page__container element--padding__top">
            <uids-grid :type="'twocol--67-33'">
              <uids-grid-item>
                <h2>Section heading</h2>
                <p class="element--light-intro">
                  Light intro paragraph. Sets up the section in a sentence or two.
                </p>
                <p>
                  Body paragraph with <a href="#">a link</a> in it, long enough to wrap and
                  show the measure of the wider column against the aside beside it.
                </p>
              </uids-grid-item>
              <uids-grid-item>
                <div class="element--margin__top">
                  <h3>Aside heading</h3>
                  <ul>
                    <li><a href="#">List link one</a></li>
                    <li><a href="#">List link two</a></li>
                    <li><a href="#">List link three</a></li>
                  </ul>
                </div>
              </uids-grid-item>
            </uids-grid>
          </div>
        </div>
        <div :class="args.programs_background">
          <div class="page__container element--padding__bottom element--padding__top">
            <h2>Section heading</h2>
            <uids-grid>
              <uids-grid-item v-for="p in programs" :key="p.title">
                <uids-card :url="'#'" :link_text="'Read more'" :background="args.card_background">
                  <template #title>{{ p.title }}</template>
                  <div>{{ p.body }}</div>
                </uids-card>
              </uids-grid-item>
            </uids-grid>

            <uids-blockquote
              :content="'Pull quote, to show the blockquote treatment.'"
              :footer="'Attribution line'"
            />

            <h4>Table heading</h4>
            <uids-table
              summary="Example table showing header, cell and link treatments"
              caption="Table caption"
              :highlight="true"
            >
              <template #thead>
                <tr>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                  <th scope="col">Header</th>
                </tr>
              </template>
              <template #tbody>
                <tr><th scope="row">Row label</th><td>Cell</td><td><a href="#">Cell link</a></td></tr>
                <tr><th scope="row">Row label</th><td>Cell</td><td><a href="#">Cell link</a></td></tr>
              </template>
            </uids-table>
            <p class="is-small">Small text, for notes under a table.</p>

          </div>
        </div>

        <div :class="args.stats_background">
          <div class="page__container element--padding__top element--padding__bottom">
            <uids-grid>
              <uids-grid-item>
                <uids-stat :stat_title="'17,000'" :stat_summary="'Stat summary line'" />
              </uids-grid-item>
              <uids-grid-item>
                <uids-stat :stat_title="'70'" :stat_suffix="'+'" :stat_summary="'Stat summary line'" />
              </uids-grid-item>
              <uids-grid-item>
                <uids-stat :stat_title="'18'" :stat_suffix="':1'" :stat_summary="'Stat summary line'" />
              </uids-grid-item>
            </uids-grid>
          </div>
        </div>

        <uids-iowa-footer :healthcare="false">
          <div class="site-name">College of Liberal Arts and Sciences</div>
          <div class="footer__links footer__links--icon">
            <p>
              000 Building Name<br>
              Iowa City, Iowa 52242<br>
              <a href="tel:319-000-0000">
                <span class="fa-phone fas" role="presentation"></span> 319-000-0000
              </a>
            </p>
          </div>
        </uids-iowa-footer>
      </main>
    `})},B={...z,args:{intro_background:``,programs_background:`bg--gold`,card_background:`gray`,stats_background:`bg--black--pattern--particle`}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    intro_background: '',
    programs_background: 'bg--gold',
    card_background: 'gray',
    stats_background: 'bg--black--pattern--particle'
  }
}`,...B.parameters?.docs?.source}}},V=[`WepPage`]}))();export{B as WepPage,V as __namedExportsOrder,R as default};