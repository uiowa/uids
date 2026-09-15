import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// video.js calls bare matchMedia at module scope, which jsdom does not provide.
// Banner imports it for the video-banner controls; nothing here renders a video.
vi.mock('../../assets/js/video.js', () => ({}));

import Banner from './Banner.vue';

// Behaviors under test come from contracts/banner.json — if these fail, either the
// code or the contract is wrong; reconcile contract-first.
const headline = { text: 'Headline', level: 'h2', size: 'large' };
const oneButton = [{ url: 'https://uiowa.edu', label: 'Read more' }];

describe('Banner', () => {
  it('emits no modifiers by default', () => {
    const classes = mount(Banner).get('div').classes();
    expect(classes).toContain('banner');
    expect(classes.filter((c) => c.startsWith('banner--'))).toEqual([]);
  });

  it('treats height, narrow and mobile_content_below_image as three independent options', () => {
    const classes = mount(Banner, {
      props: { height: 'large', narrow: true, mobile_content_below_image: true },
    })
      .get('div')
      .classes();
    expect(classes).toContain('banner--large');
    expect(classes).toContain('banner--narrow');
    expect(classes).toContain('banner--stacked');
  });

  it('crosses overlay direction with overlay tone', () => {
    const classes = mount(Banner, {
      props: { media_overlay_type: 'btt', media_overlay_light: true },
      slots: { media: '<div class="media"></div>' },
    })
      .get('div')
      .classes();
    expect(classes).toContain('banner--overlay-btt');
    expect(classes).toContain('banner--overlay-light');
  });

  it('only emits the direction modifier when a media slot is present', () => {
    const classes = mount(Banner, { props: { media_overlay_type: 'btt' } }).get('div').classes();
    expect(classes).not.toContain('banner--overlay-btt');
  });

  it('adds click-container for exactly one button, not for several', () => {
    expect(mount(Banner, { props: { buttons: oneButton } }).get('div').classes())
      .toContain('click-container');
    expect(
      mount(Banner, { props: { buttons: [...oneButton, { url: '/b', label: 'B' }] } })
        .get('div')
        .classes(),
    ).not.toContain('click-container');
  });

  it('applies the shared background foundation class', () => {
    expect(mount(Banner, { props: { background: 'gold' } }).get('div').classes())
      .toContain('bg--gold');
  });

  it('links the headline to the single button url', () => {
    const wrapper = mount(Banner, { props: { headline, buttons: oneButton } });
    expect(wrapper.get('.banner__title a.click-target').attributes('href'))
      .toBe('https://uiowa.edu');
  });

  it('leaves the headline unlinked when several buttons are present', () => {
    const wrapper = mount(Banner, {
      props: { headline, buttons: [...oneButton, { url: '/b', label: 'B' }] },
    });
    expect(wrapper.find('.banner__title a').exists()).toBe(false);
  });

  // KNOWN ISSUE, executed rather than argued (contracts/banner.json knownIssues):
  // headlineLink guards `buttons.length > 1` but then reads buttons[0].url, so the
  // DEFAULT empty array throws as soon as the header renders. No shipped story reaches
  // this because every one of them passes at least one button.
  it('throws when a headline renders with the default empty buttons array', () => {
    expect(() => mount(Banner, { props: { headline } })).toThrow(TypeError);
  });

  it('renders without a headline and without buttons', () => {
    expect(mount(Banner).find('.banner__title').exists()).toBe(false);
  });
});
