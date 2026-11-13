import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import"./_background-5iX1z5X0.js";import{r as t,t as n}from"./Background.stories-BC4MxwUi.js";import{n as r,t as i}from"./background-Cr6Xy-3k.js";import{n as a,t as o}from"./Button-CcoubRH8.js";import"./_headline-GHF49bcM.js";import{n as s,t as c}from"./Banner-DvfFaFAF.js";import"./_grid-BRGEci0O.js";import{i as l,n as u,r as d,t as f}from"./GridItem-CV-8fuXY.js";import{n as p,t as m}from"./ExampleImage-R0Y1JRA2.js";import{n as h,t as g}from"./Blockquote-B-LrpqNC.js";import{n as _,t as v}from"./BrandBar-Cf7StlZ9.js";import{n as y,t as b}from"./BrandFooter-IxFT-jRD.js";import{n as x,t as S}from"./Card-DpwHnnVD.js";import{n as C,t as w}from"./Menu-KNNjpSBV.js";import"./_flexbox-C9vCdctp.js";import{n as T,t as E}from"./Table-DNEzJR2-.js";import{n as D,t as O}from"./Stat-C5HFNru9.js";var k,A,j,M,N,P;function F(){return(F=e((()=>{_(),p(),s(),h(),y(),a(),x(),l(),u(),C(),D(),T(),r(),t(),k=[{label:`Areas of Study`,url:`#`},{label:`Research`,url:`#`},{label:`Student Life`,url:`#`},{label:`About the College`,url:`#`}],A=[{title:`Undergraduate majors`,body:`Card body copy. Two or three lines is typical.`},{title:`Graduate study`,body:`Card body copy. Two or three lines is typical.`},{title:`Certificates`,body:`Card body copy. Two or three lines is typical.`}],j={title:`Showcase/Web page`,tags:[`!autodocs`],parameters:{layout:`fullscreen`,docs:{source:{code:null}}},argTypes:{intro_background:{...n.argTypes.section_background,name:`Intro section background`},programs_background:{...n.argTypes.section_background,name:`Program section background`},card_background:{...i.argTypes.background,name:`Card background`},stats_background:{...n.argTypes.section_background,name:`Stats section background`}}},M={render:e=>({components:{BrandBar:v,ExampleImage:m,UidsBanner:c,UidsBlockquote:g,UidsButton:o,UidsCard:S,UidsGrid:d,UidsGridItem:f,UidsIowaFooter:b,UidsMenu:w,UidsStat:O,UidsTable:E},setup(){return{args:e,menuItems:k,programs:A}},template:`
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
    `})},N={...M,args:{intro_background:``,programs_background:`bg--gold`,card_background:`gray`,stats_background:`bg--black--pattern--particle`}},P=[`WebPage`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    intro_background: '',
    programs_background: 'bg--gold',
    card_background: 'gray',
    stats_background: 'bg--black--pattern--particle'
  }
}`,...N.parameters?.docs?.source}}}})))()}F();export{N as WebPage,P as __namedExportsOrder,j as default};