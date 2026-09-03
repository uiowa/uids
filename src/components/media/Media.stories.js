import UidsMedia from "../media/Media.vue";
import '../../scss/components/_media.scss';
import ExampleImage from './ExampleImage.vue';
import ExampleVideoFile from "./ExampleVideoFile.vue";

export default {
  components: { ExampleImage, ExampleVideoFile },
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
      <example-video-file />
    `,
  }),
}

// Framing classes — raw markup for the media-framing FOUNDATION
// (contracts/media-framing.json): border, circle, cover are styled in
// _media.scss and consumed by Card/Callout via shared/media.ts (or applied
// class-only downstream, e.g. blockquote.html.twig's media--circle). Exists
// so the regression harness pins the framing styles independently of the
// unmigrated Card component's stories. The img is an inline SVG data-URI so
// the capture has no network/asset dependency.
const framingImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect width='320' height='180' fill='%23FFCD00'/%3E%3C/svg%3E";
export const Framing = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 1rem;">
        <figure class="media--border" style="width: 200px;"><img src="${framingImg}" style="width: 100%;" alt=""></figure>
        <figure class="media--circle" style="width: 200px;"><img src="${framingImg}" style="width: 100%;" alt=""></figure>
        <figure class="media--cover" style="width: 200px; height: 120px;"><img src="${framingImg}" alt=""></figure>
      </div>
    `,
  }),
}
