import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./_background-BWItl8tW.js";import n,{t as r}from"./Background.stories-D_5wQVGF.js";import{n as i,t as a}from"./Button-C5bVgWul.js";import{t as o}from"./_headline-Dw2Nq3Ws.js";import{n as s,t as c}from"./Banner-dBQm3TNa.js";import{t as l}from"./_grid-CbM219EP.js";import{i as u,n as d,r as f,t as p}from"./GridItem-BjKI5Pk8.js";import{n as m,t as h}from"./ExampleImage-CNmOqzKQ.js";import{t as g}from"./blockquote-ClCjS5MG.js";import{n as _,t as v}from"./BrandBar-CjgpvKQI.js";import{n as y,t as b}from"./BrandFooter-C6GqZLNc.js";import{n as x,t as S}from"./Card-DJnriVf-.js";import{n as C,t as w}from"./Menu--CE0OhRa.js";import{n as T,t as E}from"./_flexbox-BXdAgVD0.js";import{t as D}from"./tables-C8zygDFS.js";import{n as O,t as k}from"./Stat-4xKvs6pO.js";var A,j,M,N,P,F;e((()=>{t(),T(),o(),g(),D(),l(),E(),_(),m(),s(),y(),i(),x(),u(),d(),C(),O(),r(),A=[{label:`Areas of Study`,url:`#`},{label:`Research`,url:`#`},{label:`Student Life`,url:`#`},{label:`About the College`,url:`#`}],j=[{title:`Undergraduate majors`,body:`Card body copy. Two or three lines is typical.`},{title:`Graduate study`,body:`Card body copy. Two or three lines is typical.`},{title:`Certificates`,body:`Card body copy. Two or three lines is typical.`}],M={title:`Showcase/Landing page`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}},argTypes:{intro_background:{...n.argTypes.section_background,name:`Intro section`},programs_background:{...n.argTypes.section_background,name:`Programs section`},panel_background:{...n.argTypes.section_background,name:`Nested panel`},stats_background:{...n.argTypes.section_background,name:`Stats section`}}},N={render:e=>({components:{BrandBar:v,ExampleImage:h,UidsBanner:c,UidsButton:a,UidsCard:S,UidsGrid:f,UidsGridItem:p,UidsIowaFooter:b,UidsMenu:w,UidsStat:k},setup(){return{args:e,menuItems:A,programs:j}},template:`
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
            { label: 'Primary action', url: '#', color: 'primary' },
            { label: 'Second action', url: '#', color: 'primary' },
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
            <uids-grid :type="'threecol--33-34-33'">
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
                <blockquote>
                  <p>Pull quote inside a nested panel, to show the blockquote treatment.</p>
                  <footer>Attribution line</footer>
                </blockquote>

                <h4>Table heading</h4>
                <table>
                  <thead>
                    <tr><th>Header</th><th>Header</th><th>Header</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Row label</td><td>Cell</td><td><a href="#">Cell link</a></td></tr>
                    <tr><td>Row label</td><td>Cell</td><td><a href="#">Cell link</a></td></tr>
                  </tbody>
                </table>
                <p class="is-small">Small text, for notes under a table.</p>
              </div>
            </div>
          </div>
        </div>

        <div :class="args.stats_background">
          <div class="layout-container element--margin__top--extra element--margin__bottom--extra">
            <h2>Section heading on a pattern background</h2>
            <uids-grid :type="'threecol--33-34-33'">
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
    `})},P={...N,args:{intro_background:``,programs_background:`bg--gray`,panel_background:`bg--white`,stats_background:`bg--black--pattern--particle`}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    intro_background: '',
    programs_background: 'bg--gray',
    panel_background: 'bg--white',
    stats_background: 'bg--black--pattern--particle'
  }
}`,...P.parameters?.docs?.source}}},F=[`LandingPage`]}))();export{P as LandingPage,F as __namedExportsOrder,M as default};