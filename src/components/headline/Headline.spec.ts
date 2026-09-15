import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Headline from './Headline.vue';

// Behaviors under test come from contracts/headline.json — if these fail,
// either the code or the contract is wrong; reconcile contract-first.
//
// Scoped to the `alignment` option added 2026-08-24 (contract changes[0]). The
// other three options predate the spec file and are covered by the computed-style
// regression in regression/config.json.
describe('Headline alignment', () => {
  it('emits no alignment class by default, so the container decides', () => {
    const wrapper = mount(Headline);
    const h = wrapper.get('h2');
    expect(h.classes()).toContain('headline');
    expect(h.classes()).not.toContain('headline--center');
  });

  it('applies headline--center for alignment="center"', () => {
    const wrapper = mount(Headline, { props: { alignment: 'center' } });
    expect(wrapper.get('h2').classes()).toContain('headline--center');
  });

  it('treats the empty string as the inherit case, not as a value to render', () => {
    const wrapper = mount(Headline, { props: { alignment: '' } });
    expect(wrapper.get('h2').classes()).not.toContain('headline--center');
  });

  // serif + underline + center is the combination both real .headline--center
  // usages in the repo take (Callout.stories.js:53, Inline.stories.js:168), and
  // the reason Figma models Alignment as its own axis, not a sixth Style value.
  it('composes with the other options rather than replacing them', () => {
    const wrapper = mount(Headline, {
      props: { alignment: 'center', underline: true, text_style: 'serif' },
    });
    const classes = wrapper.get('h2').classes();
    expect(classes).toContain('headline--center');
    expect(classes).toContain('headline--underline');
    expect(classes).toContain('headline--serif');
  });

  it('rejects values outside the contract enum via the prop validator', () => {
    const validator = (Headline as any).props.alignment.validator;
    expect(validator('')).toBe(true);
    expect(validator('center')).toBe(true);
    expect(validator('left')).toBe(false);
    expect(validator('right')).toBe(false);
  });
});
