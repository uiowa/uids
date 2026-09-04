import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/blockquote.scss';
import '../../scss/components/tables.scss';

import UidsButton from '../button/Button.vue';
import UidsCard from '../card/Card.vue';
import Background from '../shared/background';
import BackgroundStories from '../background/Background.stories.js';

// One block holding every element whose color depends on the background it sits on.
// Rendered twice — once directly in the outer background, once inside the nested one —
// so the two can be compared side by side at a glance.
const ContextSample = {
  name: 'context-sample',
  components: { UidsButton, UidsCard },
  props: {
    heading: { type: String, required: true },
    card_background: { type: String, default: '' },
  },
  template: `
    <h3>{{ heading }}</h3>
    <p>Body copy with <a href="#">a link in a paragraph</a> and trailing text.</p>
    <p><a href="#">A link outside any content element</a></p>
    <uids-card :background="card_background" :url="'#'" :link_text="'Read more'">
      <template #title>Card</template>
      <div>Card body copy with <a href="#">a link</a>.</div>
    </uids-card>
    <div class="border">A <code>.border</code> element</div>
    <uids-button :url="'#'">Button</uids-button>
    <blockquote><p>A blockquote, which sets its own border color per background.</p></blockquote>
    <table>
      <thead><tr><th>Header</th><th>Header</th></tr></thead>
      <tbody><tr><td>Cell</td><td><a href="#">Cell link</a></td></tr></tbody>
    </table>
    <table class="table--gray-borders">
      <thead><tr><th>Gray borders</th><th>Header</th></tr></thead>
      <tbody><tr><td>Cell</td><td>Cell</td></tr></tbody>
    </table>
  `,
};

export default {
  title: 'Showcase/Background contexts',
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
    outer_background: {
      ...BackgroundStories.argTypes.section_background,
      name: 'Outer background',
    },
    inner_background: {
      ...BackgroundStories.argTypes.section_background,
      name: 'Nested background',
    },
    card_background: {
      ...Background.argTypes.background,
      name: 'Card background',
      table: {
        category: 'Component',
      },
    },
  },
};

const Template = {
  render: (args) => ({
    components: { ContextSample },
    setup() {
      return { args };
    },
    template: `
      <div :class="args.outer_background" style="padding: 2rem;">
        <context-sample
          heading="Outer background"
          :card_background="args.card_background"
        />
        <div :class="args.inner_background" style="padding: 2rem; margin-top: 2rem;">
          <context-sample
            heading="Nested background"
            :card_background="args.card_background"
          />
        </div>
      </div>
    `,
  }),
};

export const Contexts = {
  ...Template,
  args: {
    outer_background: 'bg--black',
    inner_background: 'bg--white',
    card_background: '',
  },
};
