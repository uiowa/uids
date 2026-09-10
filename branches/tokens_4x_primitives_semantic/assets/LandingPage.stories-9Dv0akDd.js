import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./_background-BWItl8tW.js";import n,{t as r}from"./Background.stories-D_5wQVGF.js";import{n as i,t as a}from"./Button-STdayFtR.js";import{t as o}from"./_headline-Dw2Nq3Ws.js";import{n as s,t as c}from"./Banner-BaS0yqPT.js";import{t as l}from"./_grid-CbM219EP.js";import{i as u,n as d,r as f,t as p}from"./GridItem-C1YRTzau.js";import{n as m,t as h}from"./ExampleImage-C7TxtHH1.js";import{t as g}from"./blockquote-ClCjS5MG.js";import{n as _,t as v}from"./BrandBar-CMHkN91F.js";import{n as y,t as b}from"./Card-Dr-0TBfP.js";import{n as x,t as S}from"./Menu-CepbP_pA.js";import{n as C,t as w}from"./_flexbox-BXdAgVD0.js";import{t as T}from"./tables-C8zygDFS.js";import{n as E,t as D}from"./Stat-hinrba3K.js";var O,k,A,j,M,N;e((()=>{t(),C(),o(),g(),T(),l(),w(),_(),m(),s(),i(),y(),u(),d(),x(),E(),r(),O=[{label:`Areas of Study`,url:`#`},{label:`Research`,url:`#`},{label:`Student Life`,url:`#`},{label:`About the College`,url:`#`}],k=[{title:`Undergraduate majors`,body:`More than seventy majors, with room to combine two or add a certificate.`},{title:`Graduate study`,body:`Doctoral and master's programs taught by faculty who publish in the fields they teach.`},{title:`Certificates`,body:`Focused credentials you can finish alongside a degree or on their own.`}],A={title:`Showcase/Landing page`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}},argTypes:{intro_background:{...n.argTypes.section_background,name:`Intro section`},programs_background:{...n.argTypes.section_background,name:`Programs section`},panel_background:{...n.argTypes.section_background,name:`Nested panel`},stats_background:{...n.argTypes.section_background,name:`Stats section`}}},j={render:e=>({components:{BrandBar:v,ExampleImage:h,UidsBanner:c,UidsButton:a,UidsCard:b,UidsGrid:f,UidsGridItem:p,UidsMenu:S,UidsStat:D},setup(){return{args:e,menuItems:O,programs:k}},template:`
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
          :headline="{ text: 'Find your path here', level: 'h1', text_style: 'serif', size: 'large' }"
          :height="'large'"
          :narrow="true"
          :horizontal_alignment="'center'"
          :vertical_alignment="'bottom'"
          :media_overlay_type="'btt'"
          :button_color="'primary'"
          :buttons="[
            { label: 'Explore majors', url: '#', color: 'primary' },
            { label: 'Visit campus', url: '#', color: 'primary' },
          ]"
        >
          <template #media><example-image /></template>
          <p>A liberal arts education in the heart of a major research university.</p>
        </uids-banner>

        <div :class="args.intro_background">
          <div class="layout-container element--margin__top--extra element--margin__bottom--extra">
            <uids-grid :type="'twocol--67-33'">
              <uids-grid-item>
                <h2>Sixty departments, one college</h2>
                <p class="element--light-intro">
                  Liberal Arts and Sciences is the largest college at Iowa, and the one most
                  undergraduates pass through.
                </p>
                <p>
                  Students work with faculty on funded research from their first year, and the
                  college's graduates go on to <a href="#">medicine, law, public service, and
                  the arts</a> in roughly equal measure.
                </p>
              </uids-grid-item>
              <uids-grid-item>
                <div class="border element--margin__top">
                  <h3>Quick links</h3>
                  <ul>
                    <li><a href="#">Advising</a></li>
                    <li><a href="#">Scholarships</a></li>
                    <li><a href="#">Course catalog</a></li>
                  </ul>
                </div>
              </uids-grid-item>
            </uids-grid>
          </div>
        </div>

        <div :class="args.programs_background">
          <div class="layout-container element--margin__top--extra element--margin__bottom--extra">
            <h2>Ways to study here</h2>
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
                <h3>What students say</h3>
                <blockquote>
                  <p>
                    I expected to sit through lectures for two years before anyone let me near
                    a lab. I was in one by October.
                  </p>
                  <footer>Second-year, Biochemistry</footer>
                </blockquote>

                <h4>Application deadlines</h4>
                <table>
                  <thead>
                    <tr><th>Term</th><th>Priority</th><th>Final</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Fall</td><td>1 December</td><td><a href="#">1 May</a></td></tr>
                    <tr><td>Spring</td><td>1 August</td><td><a href="#">1 November</a></td></tr>
                  </tbody>
                </table>
                <p class="is-small">Deadlines differ by program. Check with the department.</p>
              </div>
            </div>
          </div>
        </div>

        <div :class="args.stats_background">
          <div class="layout-container element--margin__top--extra element--margin__bottom--extra">
            <h2>The college by the numbers</h2>
            <uids-grid :type="'threecol--33-34-33'">
              <uids-grid-item>
                <uids-stat :stat_title="'17,000'" :stat_summary="'Students enrolled'" />
              </uids-grid-item>
              <uids-grid-item>
                <uids-stat :stat_title="'70'" :stat_suffix="'+'" :stat_summary="'Majors offered'" />
              </uids-grid-item>
              <uids-grid-item>
                <uids-stat :stat_title="'18'" :stat_suffix="':1'" :stat_summary="'Student to faculty'" />
              </uids-grid-item>
            </uids-grid>
            <p class="is-large element--margin__top">
              Applications open in September for the following autumn.
            </p>
            <uids-button :url="'#'">Apply now</uids-button>
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