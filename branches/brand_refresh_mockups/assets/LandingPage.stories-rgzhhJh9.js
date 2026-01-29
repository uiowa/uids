/* empty css                    *//* empty css              */import{_ as l}from"./Banner.vue_vue_type_script_setup_true_lang-BrnGEbaL.js";import{_ as c}from"./Cta.vue_vue_type_script_setup_true_lang-BBJJPpCV.js";import{_ as m}from"./Card.vue_vue_type_script_setup_true_lang-Bt021fqp.js";import{_ as g}from"./Blockquote.vue_vue_type_script_setup_true_lang-DDRi7iw5.js";import{_ as u}from"./Stat.vue_vue_type_script_setup_true_lang-DvHsIABF.js";import{_ as p,a as v}from"./GridItem.vue_vue_type_script_setup_true_lang-BdBto6-c.js";import{B as h}from"./BrandBar-adAuNrqu.js";import{_ as f}from"./Menu.vue_vue_type_script_setup_true_lang-DJD3HX24.js";import{U as _}from"./BrandFooter-B9u7AJLE.js";import{_ as w}from"./Button.vue_vue_type_script_setup_true_lang-DDyg8Vgf.js";import{_ as y}from"./ExampleImage-6Slcl2f_.js";import"./vue.esm-bundler-Dl4EI7SU.js";import"./Headline.vue_vue_type_script_setup_true_lang-r7SSO69S.js";/* empty css                  */import"./click-a11y-CvTj6evG.js";/* empty css               */import"./utlity-BIMoNfdw.js";import"./background-Dp_AVxiY.js";import"./media-C3R4C1WQ.js";/* empty css               */import"./Logo.vue_vue_type_script_setup_true_lang-HxhJmcm0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const V={title:"Showcase/Landing Page",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{source:{code:null}}}},b=[{label:"About",url:"#"},{label:"Academics",url:"#"},{label:"Admissions",url:"#"},{label:"Research",url:"#"},{label:"Campus Life",url:"#"}],e={render:a=>({components:{UidsBanner:l,UidsCta:c,UidsCard:m,UidsBlockquote:g,UidsStat:u,UidsGrid:p,UidsGridItem:v,BrandBar:h,UidsMenu:f,UidsIowaFooter:_,UidsButton:w,ExampleImage:y},setup(){return{args:a,horizontalMenuItems:b}},template:`
      <div class="landing-page-concept1-mixed-media-wrapper">
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
        <div style="position: relative;">
          <uids-banner
            background=""
            height="large"
            horizontal_alignment="left"
            vertical_alignment="center"
            :narrow="true"
            :mobile_content_below_image="true"
            :headline="{
              text: 'Start your story here',
              level: 'h2',
              text_style: 'uppercase',
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
            :media_overlay_light="true"
          >
            <template #media>
              <div class="media media--image">
                <img src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg" alt="University of Iowa campus aerial view" />
              </div>
            </template>
            <template #pre_title><span class="headline__heading">University of Iowa</span></template>
            <p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>
          </uids-banner>
        </div>
        </div>

        <div class="bg--gold paper-texture-overlay paper -rip-down column-container" style="position: relative;">
          <!-- Corner Photo Mounts -->
          <div class="photo-mount photo-mount--top-left"></div>
          <div class="photo-mount photo-mount--top-right"></div>
          <div class="photo-mount photo-mount--bottom-left"></div>
          <div class="photo-mount photo-mount--bottom-right"></div>

          <!-- Decorative Doodles -->
          <div class="doodle doodle--star" style="top: 10%; left: 5%; transform: rotate(-15deg);"></div>
          <div class="doodle doodle--heart" style="top: 15%; right: 8%; transform: rotate(20deg);"></div>
          <div class="doodle doodle--arrow" style="bottom: 20%; left: 10%; transform: rotate(10deg);"></div>
          <div class="doodle doodle--circle" style="top: 60%; right: 5%; transform: rotate(-8deg);"></div>
          <div class="doodle doodle--scribble" style="bottom: 15%; right: 12%; transform: rotate(5deg);"></div>
          <div class="doodle doodle--star" style="bottom: 10%; left: 15%; transform: rotate(25deg);"></div>

          <div class="layout-container">
          <div class="grid--onecol">
            <uids-cta
              orientation="inline"
              headline_style="uppercase"
              button_label="Request Information"
              button_icon='<i class="fas fa-arrow-right"></i>'
              url="#"
              background=""
              details="Iowa is where great stories begin. It's time to start yours. Find out how."
            >
              <template #title>Be a Hawkeye</template>
            </uids-cta>
          </div>
          </div>
        </div>

        <div class="column-container paper-texture element--padding__top--extra element--padding__bottom--extra" style="position: relative;">
          <div class="notebook-filter"></div>
          <div class="layout-container">
          <uids-grid type="threecol--33-34-33">
            <uids-grid-item style="position: relative;">
              <div class="tape-piece tape-piece--left"></div>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
                background="white"
              >
                <template #media>
                  <div class="landing-page-filter-wrapper landing-page-filter--photo-stack landing-page-filter--sticky-note">
                    <div class="landing-page-filter--y2k-gradient landing-page-filter--y2k-halftone">
                      <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2023-02/students-walking.jpg" alt="Students in classroom" class="media--16-9" />
                    </div>
                  </div>
                </template>
                <template #title>Academic Excellence</template>
                Experience innovative teaching, cutting-edge research, and a commitment to student success in every classroom.
              </uids-card>
            </uids-grid-item>

            <uids-grid-item style="position: relative;">
              <div class="tape-piece tape-piece--center"></div>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
                background="white"
              >
                <template #media>
                  <div class="landing-page-filter-wrapper landing-page-filter--photo-stack">
                    <div class="landing-page-filter--y2k-gradient landing-page-filter--y2k-halftone">
                      <img src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg" alt="Campus activities" class="media--16-9" />
                    </div>
                  </div>
                </template>
                <template #title>Vibrant Campus Life</template>
                Join over 500 student organizations, attend world-class performances, and cheer on the Hawkeyes at sporting events.
              </uids-card>
            </uids-grid-item>

            <uids-grid-item style="position: relative;">
              <div class="tape-piece tape-piece--right"></div>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
                background="white"
              >
                <template #media>
                  <div class="landing-page-filter-wrapper landing-page-filter--photo-stack landing-page-filter--stamp">
                    <div class="landing-page-filter--y2k-gradient landing-page-filter--y2k-halftone">
                      <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_03_08-ENGR-2120%20ENGR%20FUND%20II-%20ELECTRICAL%20CIRCUITS%20jatorner%20-0228.jpg" alt="Research laboratory" class="media--16-9" />
                    </div>
                  </div>
                </template>
                <template #title>Groundbreaking Research</template>
                Collaborate with leading faculty on research that addresses real-world challenges and advances human knowledge.
              </uids-card>
            </uids-grid-item>
          </uids-grid>
        </div>
        </div>

        <div class="bg--gold--pattern--community paper-rip landing-page-bg--creative-chaos column-container element--padding__top--extra element--padding__bottom--extra">
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
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/styles/square__1920_x_1920/public/2025-08/jordan200_0.jpg" alt="" class="media--circle" />
              </template>
            </uids-blockquote>
          </div>
          </div>
        </div>


        <div class="bg--gray column-container">
          <uids-grid type="threecol--33-34-33" class="grid--no-gap grid--stretch-media">
            <uids-grid-item>
              <div class="landing-page-filter-wrapper landing-page-filter--stickers landing-page-filter--washi-tape">
                <div class="landing-page-filter--scrapbook-authentic" style="width: 100%; height: 100%;">
                  <example-image src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2023-02/students-walking.jpg" :width="600" :height="400" />
                </div>
              </div>
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
              <div class="landing-page-filter-wrapper landing-page-filter--stickers landing-page-filter--washi-tape">
                <div class="landing-page-filter--scrapbook-authentic" style="width: 100%; height: 100%;">
                  <example-image src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_01_28-English%20Class-tschoon-040.JPG" :width="600" :height="400" />
                </div>
              </div>
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
              <div class="landing-page-filter-wrapper landing-page-filter--stickers landing-page-filter--washi-tape">
                <div class="landing-page-filter--scrapbook-authentic" style="width: 100%; height: 100%;">
                  <example-image src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_03_08-ENGR-2120%20ENGR%20FUND%20II-%20ELECTRICAL%20CIRCUITS%20jatorner%20-0228.jpg" :width="600" :height="400" />
                </div>
              </div>
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
      </div>
    `})},i={render:a=>({components:{UidsBanner:l,UidsCta:c,UidsCard:m,UidsBlockquote:g,UidsStat:u,UidsGrid:p,UidsGridItem:v,BrandBar:h,UidsMenu:f,UidsIowaFooter:_,UidsButton:w,ExampleImage:y},setup(){return{args:a,horizontalMenuItems:b}},template:`
      <div class="landing-page-concept3-organic-flow-copy-wrapper">
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
        <div class="column-container landing-page-banner--organic">
        <uids-banner
          background=""
          height="large"
          horizontal_alignment="left"
          vertical_alignment="center"
          :narrow="true"
          :mobile_content_below_image="true"
          :headline="{
            text: 'Start your story here',
            level: 'h2',
            text_style: 'uppercase',
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
          :media_overlay_light="true"
        >
          <template #media>
            <div class="media media--image landing -page-filter--clean-frame">
              <img src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg" alt="University of Iowa campus aerial view" />
            </div>
          </template>
          <template #pre_title><span class="headline__heading">University of Iowa</span></template>
          <p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>
        </uids-banner>
        </div>

        <div class="bg--black--pattern--brain column-container mask-layer">
          <div class="layout-container">
          <div class="grid--onecol">
            <uids-cta
              orientation=""
              headline_style="uppercase"
              button_label="Request Information"
              button_icon='<i class="fas fa-arrow-right"></i>'
              url="#"
              background=""
              details="Iowa is where great stories begin. It's time to start yours. Find out how."
            >
              <template #title>Be a Hawkeye</template>
            </uids-cta>
          </div>
          </div>
        </div>

        <div class="column-container element--padding__top--extra element--padding__bottom--extra landing-page-organic-lines landing-page-organic-cards-bg">
          <div class="layout-container">
          <uids-grid type="threecol--33-34-33">
            <uids-grid-item>
              <div class="landing-page-card--organic landing-page-shadow--organic">
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <div class="landing-page-filter--organic-flow">
                    <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_03_08-ENGR-2120%20ENGR%20FUND%20II-%20ELECTRICAL%20CIRCUITS%20jatorner%20-0228.jpg" alt="Students in classroom" class="media--16-9" />
                  </div>
                </template>
                <template #title>Academic Excellence</template>
                Experience innovative teaching, cutting-edge research, and a commitment to student success in every classroom.
              </uids-card>
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-card--organic landing-page-shadow--organic">
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <div class="landing-page-filter--organic-flow">
                    <img src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg" alt="Campus activities" class="media--16-9" />
                  </div>
                </template>
                <template #title>Vibrant Campus Life</template>
                Join over 500 student organizations, attend world-class performances, and cheer on the Hawkeyes at sporting events.
              </uids-card>
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-card--organic landing-page-shadow--organic">
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <div class="landing-page-filter--organic-flow">
                    <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2023-02/students-walking.jpg" alt="Research laboratory" class="media--16-9" />
                  </div>
                </template>
                <template #title>Groundbreaking Research</template>
                Collaborate with leading faculty on research that addresses real-world challenges and advances human knowledge.
              </uids-card>
              </div>
            </uids-grid-item>
          </uids-grid>
        </div>
        </div>

        <div class="landing-page-bg--organic-wave landing-page-organic-wave-pattern column-container element--padding__top--extra element--padding__bottom--extra">
          <div class="layout-container">
          <div class="grid--onecol__narrow landing-page-blockquote--organic">
            <uids-blockquote
              orientation="center"
              :media_position_bottom="false"
              content="The University of Iowa gave me the tools, mentorship, and opportunities I needed to transform my dreams into reality. The experience shaped not just my career, but who I am as a person."
              footer="Sarah Johnson, Class of 2023"
              cite_text="College of Liberal Arts & Sciences"
            >
              <template #media>
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/styles/square__1920_x_1920/public/2025-08/jordan200_0.jpg" alt="Sarah Johnson" class="media--circle" />
              </template>
            </uids-blockquote>
          </div>
          </div>
        </div>


        <div class="bg--gray--pattern--community wavy-mask element--padding__top--extra element--padding__bottom--extra column-container">
          <div class="layout-container">
          <uids-grid type="threecol--33-34-33" class="grid--no-gap grid--stretch-media landing-page-grid--organic-alt">
            <!-- Images (will be reordered via CSS) -->
            <uids-grid-item>
              <div class="landing-page-filter--organic-circle">
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_03_08-ENGR-2120%20ENGR%20FUND%20II-%20ELECTRICAL%20CIRCUITS%20jatorner%20-0228.jpg" alt="Students walking on campus" class="media--circle" />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-stat--organic">
                <uids-stat
                  display="default"
                  stat_title="200"
                  stat_suffix="+"
                  stat_summary="Areas of study"
                  stat_content=""
                />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-filter--organic-circle">
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_01_28-English%20Class-tschoon-040.JPG" alt="Students in class" class="media--circle" />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-stat--organic">
                <uids-stat
                  display="default"
                  stat_title="$500M"
                  stat_suffix="+"
                  stat_summary="Total Research"
                  stat_content=""
                />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-filter--organic-circle">
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2023-02/students-walking.jpg" alt="Engineering students" class="media--circle" />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-stat--organic">
                <uids-stat
                  display="default"
                  stat_title="500"
                  stat_suffix="+"
                  stat_summary="Student Organizations"
                  stat_content=""
                />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-filter--organic-circle">
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/styles/square__1920_x_1920/public/2025-08/jordan200_0.jpg" alt="Campus life" class="media--circle" />
              </div>
            </uids-grid-item>
          </uids-grid>
          </div>
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
      </div>
    `})};var t,n,s;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: args => ({
    components: {
      UidsBanner,
      UidsCta,
      UidsCard,
      UidsBlockquote,
      UidsStat,
      UidsGrid,
      UidsGridItem,
      BrandBar,
      UidsMenu,
      UidsIowaFooter,
      UidsButton,
      ExampleImage
    },
    setup() {
      return {
        args,
        horizontalMenuItems
      };
    },
    template: \`
      <div class="landing-page-concept1-mixed-media-wrapper">
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
        <div style="position: relative;">
          <uids-banner
            background=""
            height="large"
            horizontal_alignment="left"
            vertical_alignment="center"
            :narrow="true"
            :mobile_content_below_image="true"
            :headline="{
              text: 'Start your story here',
              level: 'h2',
              text_style: 'uppercase',
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
            :media_overlay_light="true"
          >
            <template #media>
              <div class="media media--image">
                <img src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg" alt="University of Iowa campus aerial view" />
              </div>
            </template>
            <template #pre_title><span class="headline__heading">University of Iowa</span></template>
            <p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>
          </uids-banner>
        </div>
        </div>

        <div class="bg--gold paper-texture-overlay paper -rip-down column-container" style="position: relative;">
          <!-- Corner Photo Mounts -->
          <div class="photo-mount photo-mount--top-left"></div>
          <div class="photo-mount photo-mount--top-right"></div>
          <div class="photo-mount photo-mount--bottom-left"></div>
          <div class="photo-mount photo-mount--bottom-right"></div>

          <!-- Decorative Doodles -->
          <div class="doodle doodle--star" style="top: 10%; left: 5%; transform: rotate(-15deg);"></div>
          <div class="doodle doodle--heart" style="top: 15%; right: 8%; transform: rotate(20deg);"></div>
          <div class="doodle doodle--arrow" style="bottom: 20%; left: 10%; transform: rotate(10deg);"></div>
          <div class="doodle doodle--circle" style="top: 60%; right: 5%; transform: rotate(-8deg);"></div>
          <div class="doodle doodle--scribble" style="bottom: 15%; right: 12%; transform: rotate(5deg);"></div>
          <div class="doodle doodle--star" style="bottom: 10%; left: 15%; transform: rotate(25deg);"></div>

          <div class="layout-container">
          <div class="grid--onecol">
            <uids-cta
              orientation="inline"
              headline_style="uppercase"
              button_label="Request Information"
              button_icon='<i class="fas fa-arrow-right"></i>'
              url="#"
              background=""
              details="Iowa is where great stories begin. It's time to start yours. Find out how."
            >
              <template #title>Be a Hawkeye</template>
            </uids-cta>
          </div>
          </div>
        </div>

        <div class="column-container paper-texture element--padding__top--extra element--padding__bottom--extra" style="position: relative;">
          <div class="notebook-filter"></div>
          <div class="layout-container">
          <uids-grid type="threecol--33-34-33">
            <uids-grid-item style="position: relative;">
              <div class="tape-piece tape-piece--left"></div>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
                background="white"
              >
                <template #media>
                  <div class="landing-page-filter-wrapper landing-page-filter--photo-stack landing-page-filter--sticky-note">
                    <div class="landing-page-filter--y2k-gradient landing-page-filter--y2k-halftone">
                      <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2023-02/students-walking.jpg" alt="Students in classroom" class="media--16-9" />
                    </div>
                  </div>
                </template>
                <template #title>Academic Excellence</template>
                Experience innovative teaching, cutting-edge research, and a commitment to student success in every classroom.
              </uids-card>
            </uids-grid-item>

            <uids-grid-item style="position: relative;">
              <div class="tape-piece tape-piece--center"></div>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
                background="white"
              >
                <template #media>
                  <div class="landing-page-filter-wrapper landing-page-filter--photo-stack">
                    <div class="landing-page-filter--y2k-gradient landing-page-filter--y2k-halftone">
                      <img src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg" alt="Campus activities" class="media--16-9" />
                    </div>
                  </div>
                </template>
                <template #title>Vibrant Campus Life</template>
                Join over 500 student organizations, attend world-class performances, and cheer on the Hawkeyes at sporting events.
              </uids-card>
            </uids-grid-item>

            <uids-grid-item style="position: relative;">
              <div class="tape-piece tape-piece--right"></div>
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
                background="white"
              >
                <template #media>
                  <div class="landing-page-filter-wrapper landing-page-filter--photo-stack landing-page-filter--stamp">
                    <div class="landing-page-filter--y2k-gradient landing-page-filter--y2k-halftone">
                      <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_03_08-ENGR-2120%20ENGR%20FUND%20II-%20ELECTRICAL%20CIRCUITS%20jatorner%20-0228.jpg" alt="Research laboratory" class="media--16-9" />
                    </div>
                  </div>
                </template>
                <template #title>Groundbreaking Research</template>
                Collaborate with leading faculty on research that addresses real-world challenges and advances human knowledge.
              </uids-card>
            </uids-grid-item>
          </uids-grid>
        </div>
        </div>

        <div class="bg--gold--pattern--community paper-rip landing-page-bg--creative-chaos column-container element--padding__top--extra element--padding__bottom--extra">
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
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/styles/square__1920_x_1920/public/2025-08/jordan200_0.jpg" alt="" class="media--circle" />
              </template>
            </uids-blockquote>
          </div>
          </div>
        </div>


        <div class="bg--gray column-container">
          <uids-grid type="threecol--33-34-33" class="grid--no-gap grid--stretch-media">
            <uids-grid-item>
              <div class="landing-page-filter-wrapper landing-page-filter--stickers landing-page-filter--washi-tape">
                <div class="landing-page-filter--scrapbook-authentic" style="width: 100%; height: 100%;">
                  <example-image src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2023-02/students-walking.jpg" :width="600" :height="400" />
                </div>
              </div>
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
              <div class="landing-page-filter-wrapper landing-page-filter--stickers landing-page-filter--washi-tape">
                <div class="landing-page-filter--scrapbook-authentic" style="width: 100%; height: 100%;">
                  <example-image src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_01_28-English%20Class-tschoon-040.JPG" :width="600" :height="400" />
                </div>
              </div>
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
              <div class="landing-page-filter-wrapper landing-page-filter--stickers landing-page-filter--washi-tape">
                <div class="landing-page-filter--scrapbook-authentic" style="width: 100%; height: 100%;">
                  <example-image src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_03_08-ENGR-2120%20ENGR%20FUND%20II-%20ELECTRICAL%20CIRCUITS%20jatorner%20-0228.jpg" :width="600" :height="400" />
                </div>
              </div>
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
      </div>
    \`
  })
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var d,o,r;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => ({
    components: {
      UidsBanner,
      UidsCta,
      UidsCard,
      UidsBlockquote,
      UidsStat,
      UidsGrid,
      UidsGridItem,
      BrandBar,
      UidsMenu,
      UidsIowaFooter,
      UidsButton,
      ExampleImage
    },
    setup() {
      return {
        args,
        horizontalMenuItems
      };
    },
    template: \`
      <div class="landing-page-concept3-organic-flow-copy-wrapper">
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
        <div class="column-container landing-page-banner--organic">
        <uids-banner
          background=""
          height="large"
          horizontal_alignment="left"
          vertical_alignment="center"
          :narrow="true"
          :mobile_content_below_image="true"
          :headline="{
            text: 'Start your story here',
            level: 'h2',
            text_style: 'uppercase',
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
          :media_overlay_light="true"
        >
          <template #media>
            <div class="media media--image landing -page-filter--clean-frame">
              <img src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg" alt="University of Iowa campus aerial view" />
            </div>
          </template>
          <template #pre_title><span class="headline__heading">University of Iowa</span></template>
          <p>A member of the <a href="/">Association</a> of American Universities since 1909 and the Big Ten Conference since 1899, the University of Iowa is home to one of the most acclaimed academic medical centers in the country, as well as globally recognized leadership in the study and craft of writing.</p>
        </uids-banner>
        </div>

        <div class="bg--black--pattern--brain column-container mask-layer">
          <div class="layout-container">
          <div class="grid--onecol">
            <uids-cta
              orientation=""
              headline_style="uppercase"
              button_label="Request Information"
              button_icon='<i class="fas fa-arrow-right"></i>'
              url="#"
              background=""
              details="Iowa is where great stories begin. It's time to start yours. Find out how."
            >
              <template #title>Be a Hawkeye</template>
            </uids-cta>
          </div>
          </div>
        </div>

        <div class="column-container element--padding__top--extra element--padding__bottom--extra landing-page-organic-lines landing-page-organic-cards-bg">
          <div class="layout-container">
          <uids-grid type="threecol--33-34-33">
            <uids-grid-item>
              <div class="landing-page-card--organic landing-page-shadow--organic">
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <div class="landing-page-filter--organic-flow">
                    <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_03_08-ENGR-2120%20ENGR%20FUND%20II-%20ELECTRICAL%20CIRCUITS%20jatorner%20-0228.jpg" alt="Students in classroom" class="media--16-9" />
                  </div>
                </template>
                <template #title>Academic Excellence</template>
                Experience innovative teaching, cutting-edge research, and a commitment to student success in every classroom.
              </uids-card>
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-card--organic landing-page-shadow--organic">
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <div class="landing-page-filter--organic-flow">
                    <img src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-03/pano.jpg" alt="Campus activities" class="media--16-9" />
                  </div>
                </template>
                <template #title>Vibrant Campus Life</template>
                Join over 500 student organizations, attend world-class performances, and cheer on the Hawkeyes at sporting events.
              </uids-card>
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-card--organic landing-page-shadow--organic">
              <uids-card
                url="#"
                link_text="Learn More"
                headline_style="serif"
              >
                <template #media>
                  <div class="landing-page-filter--organic-flow">
                    <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2023-02/students-walking.jpg" alt="Research laboratory" class="media--16-9" />
                  </div>
                </template>
                <template #title>Groundbreaking Research</template>
                Collaborate with leading faculty on research that addresses real-world challenges and advances human knowledge.
              </uids-card>
              </div>
            </uids-grid-item>
          </uids-grid>
        </div>
        </div>

        <div class="landing-page-bg--organic-wave landing-page-organic-wave-pattern column-container element--padding__top--extra element--padding__bottom--extra">
          <div class="layout-container">
          <div class="grid--onecol__narrow landing-page-blockquote--organic">
            <uids-blockquote
              orientation="center"
              :media_position_bottom="false"
              content="The University of Iowa gave me the tools, mentorship, and opportunities I needed to transform my dreams into reality. The experience shaped not just my career, but who I am as a person."
              footer="Sarah Johnson, Class of 2023"
              cite_text="College of Liberal Arts & Sciences"
            >
              <template #media>
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/styles/square__1920_x_1920/public/2025-08/jordan200_0.jpg" alt="Sarah Johnson" class="media--circle" />
              </template>
            </uids-blockquote>
          </div>
          </div>
        </div>


        <div class="bg--gray--pattern--community wavy-mask element--padding__top--extra element--padding__bottom--extra column-container">
          <div class="layout-container">
          <uids-grid type="threecol--33-34-33" class="grid--no-gap grid--stretch-media landing-page-grid--organic-alt">
            <!-- Images (will be reordered via CSS) -->
            <uids-grid-item>
              <div class="landing-page-filter--organic-circle">
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_03_08-ENGR-2120%20ENGR%20FUND%20II-%20ELECTRICAL%20CIRCUITS%20jatorner%20-0228.jpg" alt="Students walking on campus" class="media--circle" />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-stat--organic">
                <uids-stat
                  display="default"
                  stat_title="200"
                  stat_suffix="+"
                  stat_summary="Areas of study"
                  stat_content=""
                />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-filter--organic-circle">
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2021-02/2019_01_28-English%20Class-tschoon-040.JPG" alt="Students in class" class="media--circle" />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-stat--organic">
                <uids-stat
                  display="default"
                  stat_title="$500M"
                  stat_suffix="+"
                  stat_summary="Total Research"
                  stat_content=""
                />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-filter--organic-circle">
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/2023-02/students-walking.jpg" alt="Engineering students" class="media--circle" />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-stat--organic">
                <uids-stat
                  display="default"
                  stat_title="500"
                  stat_suffix="+"
                  stat_summary="Student Organizations"
                  stat_content=""
                />
              </div>
            </uids-grid-item>

            <uids-grid-item>
              <div class="landing-page-filter--organic-circle">
                <img src="https://admissions.uiowa.edu/sites/admissions.uiowa.edu/files/styles/square__1920_x_1920/public/2025-08/jordan200_0.jpg" alt="Campus life" class="media--circle" />
              </div>
            </uids-grid-item>
          </uids-grid>
          </div>
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
      </div>
    \`
  })
}`,...(r=(o=i.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const O=["LandingPageConcept1","LandingPageConcept2"];export{e as LandingPageConcept1,i as LandingPageConcept2,O as __namedExportsOrder,V as default};
