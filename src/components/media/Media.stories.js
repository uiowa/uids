import UidsMedia from "../media/Media.vue";
import '../../scss/components/_media.scss';
import ExampleImage from './ExampleImage.vue';

export default {
  components: { ExampleImage },
  title: 'Components/Media',
  tags: ['!autodocs', '!dev'],
  // https://github.com/storybookjs/storybook/issues/14442#issuecomment-1089165153
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
    options: {
      showPanel: false,
    },
  },
};

export const Image = {
  render: (args) => ({
    components: { ExampleImage },
    setup() {
      return { args };
    },
    template: `
      <example-image
        :src="args.src"
        :height="args.height"
        :width="args.width"
      />
    `,
  }),
  args: {
    src: 'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&amp;itok=Ks2HvkO-',
    height: 432,
    width: 768,
  }
}

export const EmbedVideo = {
  render: () => ({
    template: `
      <iframe src="https://www.youtube.com/embed/XTeeVT_qbYg" frameborder="0" allowtransparency="" width="854" height="480" class="media-oembed-content" title="This is Iowa"></iframe>
    `,
  }),
}

export const VerticalVideo = {
  render: () => ({
    template: `
      <video id="video-container--1646" class="player" preload="metadata" poster="https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg" controls>
        <source src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4" type="video/mp4">
        <track label="English" kind="subtitles" srclang="en" src="https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt" default="default">
        <p>Video is not Supporting</p>
      </video>
    `,
  }),
}

export const HorizontalVideo = {
  render: () => ({
    template: `
      <video loop="loop" muted="muted" width="1300" height="730" poster="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4.png" playsinline="playsinline" autoplay="autoplay" id="video-container-0">
        <source src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-12/homepage-loop.mp4" type="video/mp4">
      </video>

      <div class="video-controls video">
        <button class="video-btn video-btn__pause" id="video-btn-pause" v-if="enable_autoplay">
          <span class="element-invisible">Pause</span>
        </button>
        <button class="video-btn video-btn__play" id="video-btn-play" v-else>
          <span class="element-invisible">Play</span>
        </button>
      </div>
    </div>
    `,
  }),
}
