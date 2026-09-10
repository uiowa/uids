import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/_headline.scss';
import '../../scss/components/blockquote.scss';
import '../../scss/components/tables.scss';
import '../../scss/layout/_grid.scss';
import '../../scss/layout/_flexbox.scss';

import BrandBar from '../brand-bar/BrandBar.vue';
import UidsButton from '../button/Button.vue';
import UidsCard from '../card/Card.vue';
import UidsGrid from '../grid/Grid.vue';
import UidsGridItem from '../grid/GridItem.vue';
import UidsMenu from '../menu/Menu.vue';
import UidsStat from '../stat/Stat.vue';
import BackgroundStories from '../background/Background.stories.js';

const menuItems = [
  { label: 'Academics', url: '#' },
  { label: 'Research', url: '#' },
  { label: 'Admissions', url: '#' },
  { label: 'About', url: '#' },
];

const programs = [
  {
    title: 'Undergraduate',
    body: 'Four-year degrees across sixty departments, with research placements from the first year.',
  },
  {
    title: 'Graduate',
    body: 'Master\'s and doctoral study, taught by faculty who publish in the fields they teach.',
  },
  {
    title: 'Professional',
    body: 'Part-time and evening programs built for people already working in their field.',
  },
];

export default {
  title: 'Showcase/Landing page',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: null,
      },
    },
  },
  argTypes: {
    intro_background: {
      ...BackgroundStories.argTypes.section_background,
      name: 'Intro section',
    },
    programs_background: {
      ...BackgroundStories.argTypes.section_background,
      name: 'Programs section',
    },
    panel_background: {
      ...BackgroundStories.argTypes.section_background,
      name: 'Nested panel',
    },
    cta_background: {
      ...BackgroundStories.argTypes.section_background,
      name: 'Closing section',
    },
  },
};

const Template = {
  render: (args) => ({
    components: { BrandBar, UidsButton, UidsCard, UidsGrid, UidsGridItem, UidsMenu, UidsStat },
    setup() {
      return { args, menuItems, programs };
    },
    template: `
      <main>
        <brand-bar :narrow="true" :healthcare="false">
          <h1 class="site-name flex--10">College of Liberal Arts</h1>
        </brand-bar>

        <nav class="menu--container">
          <div class="layout-container">
            <uids-menu variant="horizontal" :items="menuItems" label="Main" top />
          </div>
        </nav>

        <section :class="args.intro_background" class="section-padding">
          <div class="layout-container">
            <h1 class="headline headline--serif">A university built on questions</h1>
            <p class="element--bold-intro">
              Iowa has spent a century and a half asking what a public university owes the
              people who fund it.
            </p>
            <p>
              Undergraduates work alongside faculty from their first semester, and the
              results show up in <a href="#">published research</a>, in classrooms across
              the state, and in the careers our graduates build.
            </p>
            <uids-button :url="'#'">Explore programs</uids-button>
          </div>
        </section>

        <section :class="args.programs_background" class="section-padding">
          <div class="layout-container">
            <h2>Ways to study here</h2>
            <p class="element--light-intro">Three routes through the college.</p>

            <uids-grid :type="'threecol--33-34-33'">
              <uids-grid-item v-for="p in programs" :key="p.title">
                <uids-card :url="'#'" :link_text="'Read more'">
                  <template #title>{{ p.title }}</template>
                  <div>{{ p.body }}</div>
                </uids-card>
              </uids-grid-item>
            </uids-grid>

            <div :class="args.panel_background" class="border section-padding element--margin__top--extra">
              <div class="layout-container">
                <h3>What students say</h3>
                <blockquote>
                  <p>
                    I came in expecting to sit through lectures for two years before anyone
                    let me near a lab. I was in one by October.
                  </p>
                  <footer>Second-year, Biochemistry</footer>
                </blockquote>

                <h4>By the numbers</h4>
                <uids-grid :type="'threecol--33-34-33'">
                  <uids-grid-item>
                    <uids-stat :stat_title="'31,000'" :stat_summary="'Students enrolled'" />
                  </uids-grid-item>
                  <uids-grid-item>
                    <uids-stat :stat_title="'200'" :stat_summary="'Areas of study'" />
                  </uids-grid-item>
                  <uids-grid-item>
                    <uids-stat :stat_title="'18'" :stat_suffix="':1'" :stat_summary="'Student to faculty'" />
                  </uids-grid-item>
                </uids-grid>

                <h5>Application deadlines</h5>
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
        </section>

        <section :class="args.cta_background" class="section-padding">
          <div class="layout-container">
            <h2>Start an application</h2>
            <p class="is-large">
              Applications open in September for the following autumn.
            </p>
            <uids-button :url="'#'">Apply now</uids-button>
            <uids-button :url="'#'" :transparent="true">Request information</uids-button>
          </div>
        </section>
      </main>
    `,
  }),
};

export const LandingPage = {
  ...Template,
  args: {
    intro_background: '',
    programs_background: 'bg--gray',
    panel_background: 'bg--white',
    cta_background: 'bg--black',
  },
};
