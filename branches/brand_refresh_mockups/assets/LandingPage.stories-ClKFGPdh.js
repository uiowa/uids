/* empty css                    *//* empty css              */import{_ as r}from"./Banner.vue_vue_type_script_setup_true_lang-DnOHFdh5.js";import{_ as o}from"./Cta.vue_vue_type_script_setup_true_lang-DN4053UA.js";import{_ as n}from"./Card.vue_vue_type_script_setup_true_lang-3lKiIARe.js";import{_ as d}from"./Blockquote.vue_vue_type_script_setup_true_lang-DDRi7iw5.js";import{_ as l}from"./Stat.vue_vue_type_script_setup_true_lang-CpXcakiZ.js";import{_ as m,a as c}from"./GridItem.vue_vue_type_script_setup_true_lang-BuSFYZU-.js";import{B as u}from"./BrandBar-adAuNrqu.js";import{_ as p}from"./Menu.vue_vue_type_script_setup_true_lang-DJD3HX24.js";import{U as g}from"./BrandFooter-B9u7AJLE.js";import{_}from"./Button.vue_vue_type_script_setup_true_lang-NnvUBXdB.js";import{_ as h}from"./ExampleImage-6Slcl2f_.js";import"./vue.esm-bundler-Dl4EI7SU.js";import"./Headline.vue_vue_type_script_setup_true_lang-Dh65CvQC.js";/* empty css                  */import"./click-a11y-x2-yuRD0.js";/* empty css               */import"./utlity-BIMoNfdw.js";import"./background-Dp_AVxiY.js";import"./media-C3R4C1WQ.js";/* empty css               */import"./Logo.vue_vue_type_script_setup_true_lang-HxhJmcm0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const J={title:"Showcase/Landing Page",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{source:{code:null}}}},f=[{label:"About",url:"#"},{label:"Academics",url:"#"},{label:"Admissions",url:"#"},{label:"Research",url:"#"},{label:"Campus Life",url:"#"}],v={render:s=>({components:{UidsBanner:r,UidsCta:o,UidsCard:n,UidsBlockquote:d,UidsStat:l,UidsGrid:m,UidsGridItem:c,BrandBar:u,UidsMenu:p,UidsIowaFooter:g,UidsButton:_,ExampleImage:h},setup(){return{args:s,horizontalMenuItems:f}},template:`
      <brand-bar>
        <h1 class="site-name">University of Iowa</h1>
      </brand-bar>

      <nav class="menu--container">
        <div class="layout-container">
          <uids-menu
            variant="horizontal"
            :items="horizontalMenuItems"
            label="Main navigation"
            top
          />
        </div>
      </nav>

      <main>
        <div class="column-container">
        <uids-banner
          background=""
          height="large"
          horizontal_alignment="left"
          vertical_alignment="center"
          :narrow="true"
          :mobile_content_below_image="true"
          :headline="{
            text: 'Welcome to the University of Iowa',
            level: 'h2',
            text_style: 'serif',
            size: 'large',
            highlight: false,
            underline: false,
            url: ''
          }"
          :buttons="[
            { label: 'Apply Now', url: '#' },
            { label: 'Schedule a Visit', url: '#' }
          ]"
          button_color="primary"
          media_overlay_type="btt"
          :media_overlay_light="false"
        >
          <template #media>
            <example-image />
          </template>
          <template #pre_title><span class="headline__heading">University of Iowa</span></template>
          <p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>
        </uids-banner>
        </div>

        <div class="bg--gold column-container">
          <div class="layout-container">
          <div class="grid--onecol">
            <uids-cta
              orientation="inline"
              headline_style="uppercase"
              button_label="Request Information"
              button_icon='<i class="fas fa-arrow-right"></i>'
              url="#"
              background="gold"
              details="Iowa is where great stories begin. It's time to start yours. Find out how."
            >
              <template #title>Be a Hawkeye</template>
            </uids-cta>
          </div>
          </div>
        </div>

        <div class="column-container element--padding__top--extra element--padding__bottom--extra">
          <div class="layout-container">
          <uids-grid type="threecol--33-34-33">
            <uids-grid-item>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <img src="/src/assets/images/demo/students-walking.jpg" alt="Students in classroom" class="media--16-9" />
                </template>
                <template #title>Academic Excellence</template>
                Experience innovative teaching, cutting-edge research, and a commitment to student success in every classroom.
              </uids-card>
            </uids-grid-item>

            <uids-grid-item>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <img src="/src/assets/images/demo/2020_10_07-Fall Campus Scenes Oct 2020 jatorner -0078.jpg" alt="Campus activities" class="media--16-9" />
                </template>
                <template #title>Vibrant Campus Life</template>
                Join over 500 student organizations, attend world-class performances, and cheer on the Hawkeyes at sporting events.
              </uids-card>
            </uids-grid-item>

            <uids-grid-item>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <img src="/src/assets/images/demo/2019_03_08-ENGR-2120 ENGR FUND II- ELECTRICAL CIRCUITS jatorner -0228.jpg" alt="Research laboratory" class="media--16-9" />
                </template>
                <template #title>Groundbreaking Research</template>
                Collaborate with leading faculty on research that addresses real-world challenges and advances human knowledge.
              </uids-card>
            </uids-grid-item>
          </uids-grid>
        </div>
        </div>

        <div class="bg--gold--pattern--community column-container element--padding__top--extra element--padding__bottom--extra">
          <div class="layout-container">
          <div class="grid--onecol__narrow">
            <uids-blockquote
              orientation="center"
              :media_position_bottom="false"
              content="The University of Iowa gave me the tools, mentorship, and opportunities I needed to transform my dreams into reality. The experience shaped not just my career, but who I am as a person."
              footer="Sarah Johnson, Class of 2023"
              cite_text="College of Liberal Arts & Sciences"
            >
              <template #media>
                <img src="/src/assets/images/demo/herky-square.jpg" alt="Sarah Johnson" class="media--circle" />
              </template>
            </uids-blockquote>
          </div>
          </div>
        </div>


        <div class="bg--gray column-container">
          <uids-grid type="threecol--33-34-33" class="grid--no-gap grid--stretch-media">
            <uids-grid-item>
              <example-image src="/src/assets/images/demo/students-walking.jpg" :width="600" :height="400" />
            </uids-grid-item>

            <uids-grid-item>
              <uids-stat
                display="default"
                stat_title="$500M"
                stat_suffix="+"
                stat_summary="Annual Research Funding"
                stat_content="Access world-class research facilities and opportunities to work alongside renowned faculty."
              />
            </uids-grid-item>

            <uids-grid-item>
              <example-image src="/src/assets/images/demo/2019_01_28-English Class-tschoon-040.JPG" :width="600" :height="400" />
            </uids-grid-item>

            <uids-grid-item>
              <uids-stat
                display="default"
                stat_title="200"
                stat_suffix="+"
                stat_summary="Areas of Study"
                stat_content="From engineering to fine arts, discover programs that match your interests and career aspirations."
              />
            </uids-grid-item>

            <uids-grid-item>
              <example-image src="/src/assets/images/demo/2019_03_08-ENGR-2120 ENGR FUND II- ELECTRICAL CIRCUITS jatorner -0228.jpg" :width="600" :height="400" />
            </uids-grid-item>

            <uids-grid-item>
              <uids-stat
                display="default"
                stat_title="500"
                stat_suffix="+"
                stat_summary="Student Organizations"
                stat_content="Find your community through clubs, Greek life, athletics, arts, service, and more."
              />
            </uids-grid-item>
          </uids-grid>
        </div>
      </main>

      <uids-iowa-footer>
        <div class="site-name">University of Iowa</div>
        <div class="footer__links footer__links--icon">
          <p>
            Iowa City, Iowa 52242<br>
            <a href="tel:319-335-3500">
              <span class="fa-phone fas" role="presentation"></span> 319-335-3500
            </a><br>
            <a href="mailto:admissions@uiowa.edu">
              <span class="fa-envelope fas" role="presentation"></span> admissions@uiowa.edu
            </a>
          </p>
        </div>
      </uids-iowa-footer>
    `})},e={...v};var t,a,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  ...Template
}`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const O=["LandingPage"];export{e as LandingPage,O as __namedExportsOrder,J as default};
