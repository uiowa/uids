import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import Card from './Card.vue';

// Behaviors under test come from contracts/card.json — if these fail, either the
// code or the contract is wrong; reconcile contract-first.
const URL = 'https://uiowa.edu';
const title = { title: 'Arts and Culture' };
const media = { media: '<img src="/x.jpg" alt="Alt">' };

describe('Card', () => {
  it('emits no modifiers by default', () => {
    const classes = mount(Card).get('div').classes();
    expect(classes).toContain('card');
    expect(classes.filter((c) => c.startsWith('card--'))).toEqual([]);
    expect(classes).not.toContain('click-container');
  });

  it('treats centered, media_padded and button_align_bottom as three independent options', () => {
    const classes = mount(Card, {
      props: { centered: true, media_padded: true, button_align_bottom: true },
    })
      .get('div')
      .classes();
    expect(classes).toContain('card--centered');
    expect(classes).toContain('card--media-padded');
    expect(classes).toContain('card--button-align-bottom');
  });

  it('emits the orientation modifier only for left and right', () => {
    expect(mount(Card, { props: { orientation: 'left' } }).get('div').classes())
      .toContain('card--layout-left');
    expect(mount(Card, { props: { orientation: 'right' } }).get('div').classes())
      .toContain('card--layout-right');
    expect(
      mount(Card, { props: { orientation: '' } })
        .get('div')
        .classes()
        .filter((c) => c.startsWith('card--layout')),
    ).toEqual([]);
  });

  it('applies the shared background and borderless foundation classes', () => {
    const classes = mount(Card, { props: { background: 'gold', borderless: true } })
      .get('div')
      .classes();
    expect(classes).toContain('bg--gold');
    expect(classes).toContain('borderless');
  });

  it('adds click-container only when a url is present', () => {
    expect(mount(Card, { props: { url: URL } }).get('div').classes()).toContain('click-container');
    expect(mount(Card).get('div').classes()).not.toContain('click-container');
  });

  // The derived-link model (contracts/card.json behavior[0]). Which element becomes
  // the real anchor is computed, never chosen, and it is what selects the button's tag.
  it('links the TITLE and degrades the button to a div when a title is present', () => {
    const wrapper = mount(Card, { props: { url: URL, link_text: 'Explore' }, slots: title });
    expect(wrapper.get('header a.click-target').attributes('href')).toBe(URL);
    expect(wrapper.get('footer .bttn').element.tagName).toBe('DIV');
  });

  it('links the BUTTON as a real anchor when there is no title', () => {
    const wrapper = mount(Card, { props: { url: URL, link_text: 'Explore' } });
    const button = wrapper.get('footer .bttn');
    expect(button.element.tagName).toBe('A');
    expect(button.attributes('href')).toBe(URL);
    expect(button.classes()).toContain('click-target');
  });

  it('links the IMAGE when there is no title and no link text', () => {
    const wrapper = mount(Card, { props: { url: URL }, slots: media });
    expect(wrapper.get('.media__inner a.click-target').attributes('href')).toBe(URL);
    expect(wrapper.get('footer .bttn').element.tagName).toBe('DIV');
  });

  it('renders no footer when there is no url', () => {
    expect(mount(Card, { props: { link_text: 'Explore' } }).find('footer').exists()).toBe(false);
  });

  it('renders no footer when link_indicator is off and there is no link text', () => {
    expect(mount(Card, { props: { url: URL, link_indicator: false } }).find('footer').exists())
      .toBe(false);
  });

  // Card's button styling is hardcoded, not a prop surface (contracts/card.json
  // behavior[3]). SiteNow hardcodes the identical list at uiowa_core.module:539-544.
  it('hardcodes the transparent light-font treatment on every button', () => {
    for (const props of [{ url: URL, link_text: 'Explore' }, { url: URL }]) {
      const classes = mount(Card, { props }).get('footer .bttn').classes();
      expect(classes).toContain('bttn--transparent');
      expect(classes).toContain('bttn--light-font');
    }
  });

  it('adds the circle indicator only when there is a url and no link text', () => {
    const circle = mount(Card, { props: { url: URL } }).get('footer .bttn').classes();
    expect(circle).toContain('bttn--circle');
    expect(circle).toContain('bttn--no-text');

    const labelled = mount(Card, { props: { url: URL, link_text: 'Explore' } })
      .get('footer .bttn')
      .classes();
    expect(labelled).not.toContain('bttn--circle');
    expect(labelled).not.toContain('bttn--no-text');
  });

  // KNOWN ISSUE, executed rather than argued (contracts/card.json
  // knownIssues.arrowless-anchor): PseudoButton auto-renders an arrow because its
  // `arrow` prop defaults true; the real Button exposes an icon slot Card never fills.
  // So a title-less card shows a bare label where every other card shows an arrow.
  it('renders an arrow on the faux button and none on the real anchor', () => {
    const faux = mount(Card, { props: { url: URL, link_text: 'Explore' }, slots: title });
    expect(faux.get('footer .bttn').element.tagName).toBe('DIV');
    expect(faux.find('footer .bttn i.fa-arrow-right').exists()).toBe(true);

    const real = mount(Card, { props: { url: URL, link_text: 'Explore' } });
    expect(real.get('footer .bttn').element.tagName).toBe('A');
    expect(real.find('footer .bttn i').exists()).toBe(false);
  });

  // .card__details is a wrapper that only exists to hold subtitle and/or meta.
  it('renders the details wrapper only when subtitle or meta is present', () => {
    expect(mount(Card).find('.card__details').exists()).toBe(false);
    expect(mount(Card, { slots: { subtitle: 'Sub' } }).find('.card__details').exists()).toBe(true);
    expect(mount(Card, { slots: { meta: 'Meta' } }).find('.card__details').exists()).toBe(true);
  });

  it('renders the media wrapper only when the media slot is passed', () => {
    expect(mount(Card).find('.media').exists()).toBe(false);
    expect(mount(Card, { slots: media }).find('.media__inner').exists()).toBe(true);
  });
});
