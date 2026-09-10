import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./_background-BWItl8tW.js";import n,{t as r}from"./Background.stories-D_5wQVGF.js";import{n as i,t as a}from"./Button-CsJagwQ_.js";import{t as o}from"./_headline-Dw2Nq3Ws.js";import{n as s,t as c}from"./Banner-BeZuKIpM.js";import{t as l}from"./_grid-CbM219EP.js";import{i as u,n as d,r as f,t as p}from"./GridItem-PTQ2QFBu.js";import{n as m,t as h}from"./ExampleImage-BROe35_I.js";import{n as g,r as _,t as v}from"./Blockquote-CsE8VJ2t.js";import{n as y,t as b}from"./BrandBar-CuXuIStf.js";import{n as x,t as S}from"./BrandFooter-CrJ8HCAD.js";import{n as C,t as w}from"./Card-DXXtdGzu.js";import{n as T,t as E}from"./Menu--9v8rVE1.js";import{n as D,t as O}from"./_flexbox-BXdAgVD0.js";import{n as k,r as A,t as j}from"./Table-BbePgQAc.js";import{n as M,t as N}from"./Stat-BmGt-LbV.js";var P,F,I,L,R,z;e((()=>{t(),D(),o(),_(),A(),l(),O(),y(),m(),s(),g(),x(),i(),C(),u(),d(),T(),M(),k(),r(),P=[{label:`Areas of Study`,url:`#`},{label:`Research`,url:`#`},{label:`Student Life`,url:`#`},{label:`About the College`,url:`#`}],F=[{title:`Undergraduate majors`,body:`Card body copy. Two or three lines is typical.`},{title:`Graduate study`,body:`Card body copy. Two or three lines is typical.`},{title:`Certificates`,body:`Card body copy. Two or three lines is typical.`}],I={title:`Showcase/Landing page`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}},argTypes:{intro_background:{...n.argTypes.section_background,name:`Intro section`},programs_background:{...n.argTypes.section_background,name:`Programs section`},panel_background:{...n.argTypes.section_background,name:`Nested panel`},stats_background:{...n.argTypes.section_background,name:`Stats section`}}},L={render:e=>({components:{BrandBar:b,ExampleImage:h,UidsBanner:c,UidsBlockquote:v,UidsButton:a,UidsCard:w,UidsGrid:f,UidsGridItem:p,UidsIowaFooter:S,UidsMenu:E,UidsStat:N,UidsTable:j},setup(){return{args:e,menuItems:P,programs:F}},template:`
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
          <div class="layout-container element--margin__top--extra element--margin__bottom--extra">
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
                <div class="border element--margin__top">
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
          <div class="layout-container element--margin__top--extra element--margin__bottom--extra">
            <h2>Section heading</h2>
            <uids-grid>
              <uids-grid-item v-for="p in programs" :key="p.title">
                <uids-card :url="'#'" :link_text="'Read more'">
                  <template #title>{{ p.title }}</template>
                  <div>{{ p.body }}</div>
                </uids-card>
              </uids-grid-item>
            </uids-grid>

            <div :class="args.panel_background" class="border element--margin__top--extra">
              <div class="layout-container">
                <h3>Panel heading</h3>
                <uids-blockquote
                  :content="'Pull quote inside a nested panel, to show the blockquote treatment.'"
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
          </div>
        </div>

        <div :class="args.stats_background">
          <div class="layout-container element--margin__top--extra element--margin__bottom--extra">
            <h2>Section heading on a pattern background</h2>
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
            <p class="is-large element--margin__top">
              Large text, one step up from body copy.
            </p>
            <uids-button :url="'#'">Button</uids-button>
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
    `})},R={...L,args:{intro_background:``,programs_background:`bg--gray`,panel_background:`bg--white`,stats_background:`bg--black--pattern--particle`}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    intro_background: '',
    programs_background: 'bg--gray',
    panel_background: 'bg--white',
    stats_background: 'bg--black--pattern--particle'
  }
}`,...R.parameters?.docs?.source}}},z=[`LandingPage`]}))();export{R as LandingPage,z as __namedExportsOrder,I as default};