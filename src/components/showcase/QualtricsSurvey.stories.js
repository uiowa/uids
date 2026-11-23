import { computed } from 'vue';
import theme from '../../scss/qualtrics.scss?inline';

// Qualtrics' default label for the Next button.
const ARROW = ' → ';

export default {
  title: 'Showcase/Qualtrics survey',
  tags: ['!autodocs'],
  args: {
    nextText: ARROW,
  },
  argTypes: {
    nextText: {
      description: 'The Next button\'s label. A survey can set its own text.',
      control: 'text',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: null
      },
    },
  },
};

// A stand-in for a Qualtrics survey page (New Survey Taking Experience): the ids and
// classes the theme styles, and the few rules of Qualtrics' own stylesheet they sit on.
//
// Two parts are assumptions about Qualtrics: the text entry question's markup, built from
// the class names in its stylesheet (te, text-input), and a custom Next label being
// repeated in aria-label, as the default label is.
const standInCss = `
  * { margin: 0; padding: 0; }
  html { box-sizing: border-box; background: var(--background-color, #fff); }
  *, *::before, *::after { box-sizing: inherit; }
  html, body, #page { min-height: 100%; }
  body { color: var(--palettes-text-1-on-bg); font-family: var(--font-family); font-size: 1rem; line-height: 1.375; }
  img { height: auto !important; max-width: 100%; }
  button { cursor: pointer; background: none; border: 0; border-radius: .25rem; font-family: var(--font-family); }
  main { color: var(--palettes-text-1); }
  .a11y-only { clip: rect(1rem, 1rem, 1rem, 1rem); height: 1rem; overflow: hidden; position: absolute; width: 0; }

  #logo-container { display: flex; padding: 1.5rem; margin: 0 auto; width: 100%; }
  #logo-container img { max-height: 6.25rem; }
  #progress-bar { color: var(--palettes-text-1-on-bg); }
  #progress-bar.floating { margin: 0 auto; width: 100%; }
  #progress-bar.progress-bar-verbose { margin-bottom: .375rem; }
  #progress-bar #progress-bar-fill { border: .0625rem solid var(--palettes-neutral-5-on-bg); }
  #progress-bar #progress-bar-fill div { background-color: var(--colors-primary-as-control-on-bg); height: .5rem; }
  #progress-bar #progress-bar-text { display: flex; gap: .5rem; margin: 0 .25rem; }
  #survey-canvas { margin: 0 auto; width: 100%; }
  #contents .transition-content { padding: 0 1.5rem; }

  .question { margin-bottom: 1.25rem; }
  .question .question-error-wrapper { padding: 1.5rem 0; }
  .question .question-error-wrapper .shadowbox-inner { padding: 0 1.5rem; }
  .question .question-display { font-size: var(--question-text-size); font-weight: var(--question-text-weight); margin-bottom: .625rem; max-width: 45rem; }
  .question .question-content { font-size: var(--answer-text-size); font-weight: var(--answer-text-weight); }

  .mc .choices { width: fit-content; }
  .mc .choice { position: relative; }
  .mc.vertical .choices .choice { margin-bottom: .625rem; max-width: 45rem; }
  .mc .choice-label { align-items: center; cursor: pointer; display: flex; border: .125rem solid transparent; border-radius: .25rem; padding: .625rem 1.5rem .625rem .625rem; width: 100%; }
  .mc .choice.selected .choice-label { background-color: var(--colors-primary-for-selected); }
  .mc .choice input[type=radio] { height: 1.5rem; opacity: 0; position: absolute; width: 1.5rem; }
  .mc .choice-content { padding-left: .625rem; }
  .radio-button { flex-shrink: 0; border: .125rem solid var(--mixes-input-neutral-border-2); height: 1.5rem; width: 1.5rem; }
  .radio-button.radio { border-radius: 50%; }
  .radio-button svg { fill: var(--mixes-primary-2); stroke: var(--mixes-primary-2); stroke-width: .125rem; height: 105%; width: 105%; }
  .radio-button.selected { background-color: var(--mixes-primary-1); border-color: var(--mixes-primary-1); }

  .text-input, textarea { background: var(--palettes-bg-3); border: .0625rem solid var(--mixes-input-neutral-border-2); border-radius: .25rem; color: var(--palettes-text-1); padding: 1rem; font-family: var(--font-family); font-size: var(--answer-text-size); max-width: 100%; }

  #navigation { display: flex; padding: 1.5rem; }
  #navigation #primary-navigation { display: flex; margin-left: auto; }
  #navigation .navigation-button { align-items: center; display: flex; font-size: .875rem; justify-content: center; min-height: 2.75rem; padding: 0 .625rem; }
  #navigation #next-button { background-color: var(--mixes-primary-1); color: var(--mixes-primary-2); min-width: 7.5rem; }
  #navigation #next-button svg { fill: var(--mixes-primary-2); }

  @media (min-width: 64rem) {
    #logo-container, #progress-bar.floating, #survey-canvas { width: 64rem; }
  }
  @media (max-width: 30rem) {
    #logo-container, #navigation { padding: 1rem; }
    #contents .transition-content { padding: 0; }
    .question .question-error-wrapper { padding: 1rem 0; }
    .question .question-error-wrapper .shadowbox-inner { padding: 0 1rem; }
    #navigation { flex-direction: column; }
    #navigation #primary-navigation { margin-left: 0; }
    #navigation #next-button { flex-grow: 1; }
  }
`;

const check = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17.8 7.4c.3.3.3.8 0 1l-7.9 7.2c-.3.2-.7.2-1 0l-3-2.7c-.3-.2-.4-.7-.1-1 .3-.3.8-.4 1.1-.1l2.5 2.2 7.3-6.7c.4-.2.8-.2 1.1.1z"/></svg>';

const choice = (id, label, selected = false) => `
  <div class="choice radio${selected ? ' selected' : ''}"><div class="choice-error-container"><div class="choice-error">
    <label class="choice-label" for="choice-${id}">
      <input id="choice-${id}" name="QID1" type="radio"${selected ? ' checked' : ''}>
      <span class="radio-button radio${selected ? ' selected' : ''}">${selected ? check : ''}</span>
      <span class="choice-content"><span class="display-with-image"><span class="display-with-image-display rich-text">${label}</span></span></span>
    </label>
  </div></div></div>`;

const question = (id, type, text, content) => `
  <section class="question ${type}" id="question-${id}"><div class="question-error-wrapper"><div><div class="overflow-container shadowbox"><div class="overflow-content shadowbox-inner">
    <div class="question-display-wrapper"><div class="question-display rich-text" id="question-display-${id}">${text}</div></div>
    <div class="question-content">${content}</div>
  </div></div></div></div></section>`;

const page = (nextText) => `
  <div id="page">
    <header>
      <div class="position-left" id="logo-container"><img alt="logo" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="></div>
      <div class="progress-bar-top progress-bar-verbose floating" id="progress-bar">
        <progress aria-label="Survey Completion" class="a11y-only" max="100" value="40"></progress>
        <div id="progress-bar-fill"><div style="width: 40%;"></div></div>
        <span id="progress-bar-text"><span id="progress-bar-percent">40%</span>Survey Completion</span>
      </div>
    </header>
    <main id="survey-canvas">
      <section id="contents"><div><div class="transition-content" id="content-1"><div class="content">
        ${question('QID1', 'mc vertical', 'Overall, how satisfied are you with this product?', `
          <div class="mc-content"><div class="choices" role="radiogroup" aria-labelledby="question-display-QID1">
            ${choice(1, 'Extremely satisfied')}
            ${choice(2, 'Neither satisfied nor dissatisfied', true)}
            ${choice(3, 'Extremely dissatisfied')}
          </div></div>`)}
        ${question('QID2', 'te', 'What could we do better?', '<textarea class="text-input" aria-labelledby="question-display-QID2" rows="3"></textarea>')}
      </div></div></div></section>
      <nav id="navigation">
        <div id="secondary-navigation"></div>
        <div id="primary-navigation"><button aria-label="${nextText}" class="navigation-button" id="next-button" type="button"><span>${nextText}</span><svg aria-hidden="true" data-icontype="ChevronRight" height="1.5rem" viewBox="0 0 24 24" width="1.5rem"><path d="M9.6 6.6 15 12l-5.4 5.4-1.1-1.1L12.8 12 8.5 7.7z"/></svg></button></div>
      </nav>
    </main>
  </div>`;

// The toolbar's Theme control sets data-mode.
const survey = (mode, nextText) => `<!doctype html>
<html lang="en"${mode === 'system' ? '' : ` data-mode="${mode}"`}>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${standInCss}</style>
<style>${theme}</style>
</head>
<body>${page(nextText)}</body>
</html>`;

const Template = {
  render: (args, context) => ({
    setup() {
      return { doc: computed(() => survey(context.globals.theme, args.nextText)) };
    },
    template: `
      <iframe
        :srcdoc="doc"
        title="Stand-in for a Qualtrics survey with the University theme"
        style="display: block; width: 100%; height: 760px; border: 0;"
      ></iframe>
    `,
  }),
};

export const Survey = {
  ...Template,
};

export const DarkMode = {
  ...Template,
  globals: {
    theme: 'dark',
  },
};

export const NextButtonText = {
  ...Template,
  args: {
    nextText: 'Next',
  },
};
