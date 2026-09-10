import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./_background-BWItl8tW.js";import n,{t as r}from"./Background.stories-D_5wQVGF.js";import{n as i,t as a}from"./Button-ClGTy8tP.js";import{t as o}from"./_headline-Dw2Nq3Ws.js";import{n as s,t as c}from"./Banner-CIuqVM5G.js";import{t as l}from"./_grid-CbM219EP.js";import{i as u,n as d,r as f,t as p}from"./GridItem-D5AJgBQf.js";import{n as m,t as h}from"./ExampleImage-BliWdFZC.js";import{t as g}from"./blockquote-ClCjS5MG.js";import{n as _,t as v}from"./BrandBar-JZfpwgj6.js";import{n as y,t as b}from"./Card-fRxyDEYR.js";import{n as x,t as S}from"./Menu-C9lfsBiJ.js";import{n as C,t as w}from"./_flexbox-BXdAgVD0.js";import{t as T}from"./tables-C8zygDFS.js";import{n as E,t as D}from"./Stat-Bo7tAbGN.js";var O,k,A,j,M,N;e((()=>{t(),C(),o(),g(),T(),l(),w(),_(),m(),s(),i(),y(),u(),d(),x(),E(),r(),O=[{label:`Areas of Study`,url:`#`},{label:`Research`,url:`#`},{label:`Student Life`,url:`#`},{label:`About the College`,url:`#`}],k=[{title:`Undergraduate majors`,body:`Card body copy. Two or three lines is typical.`},{title:`Graduate study`,body:`Card body copy. Two or three lines is typical.`},{title:`Certificates`,body:`Card body copy. Two or three lines is typical.`}],A={title:`Showcase/Landing page`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}},argTypes:{intro_background:{...n.argTypes.section_background,name:`Intro section`},programs_background:{...n.argTypes.section_background,name:`Programs section`},panel_background:{...n.argTypes.section_background,name:`Nested panel`},stats_background:{...n.argTypes.section_background,name:`Stats section`}}},j={render:e=>({components:{BrandBar:v,ExampleImage:h,UidsBanner:c,UidsButton:a,UidsCard:b,UidsGrid:f,UidsGridItem:p,UidsMenu:S,UidsStat:D},setup(){return{args:e,menuItems:O,programs:k}},template:`
      <main>
        <brand-bar :narrow="false" :healthcare="false" />

        <div class="bg--gold">
          <div class="layout-container">
            <p class="site-name">College of Liberal Arts and Sciences</p>
          </div>
        </div>

        <nav class="menu--container">
          <div class="layout-container">
            <uids-menu variant="horizontal" :items="menuItems" label="Main" top />
          </div>
        </nav>

        <uids-banner
          :headline="{ text: 'Banner headline', level: 'h1', text_style: 'serif', size: 'large' }"
          :height="'large'"
          :narrow="true"
          :horizontal_alignment="'center'"
          :vertical_alignment="'bottom'"
          :media_overlay_type="'btt'"
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
      </main>
    `})},M={...j,args:{intro_background:``,programs_background:`bg--gray`,panel_background:`bg--white`,stats_background:`bg--black--pattern--particle`}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    intro_background: '',
    programs_background: 'bg--gray',
    panel_background: 'bg--white',
    stats_background: 'bg--black--pattern--particle'
  }
}`,...M.parameters?.docs?.source}}},N=[`LandingPage`]}))();export{M as LandingPage,N as __namedExportsOrder,A as default};