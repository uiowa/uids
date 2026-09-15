import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BrandBar from './BrandBar.vue';
import Logo from '../logo/Logo.vue';

// Behaviors under test come from contracts/brand-bar.json — if these fail,
// either the code or the contract is wrong; reconcile contract-first.
describe('BrandBar', () => {
  it('renders the default bar without modifiers', () => {
    const wrapper = mount(BrandBar);
    const header = wrapper.get('header');
    expect(header.classes()).toContain('iowa-bar');
    expect(header.classes()).not.toContain('iowa-bar--narrow');
    expect(header.classes()).not.toContain('iowa-bar--healthcare');
    expect(header.attributes()).toHaveProperty('data-uids-header');
  });

  it('applies narrow styling from the narrow prop', () => {
    const wrapper = mount(BrandBar, { props: { narrow: true } });
    expect(wrapper.get('header').classes()).toContain('iowa-bar--narrow');
  });

  it('forces narrow styling when second_row_content is present, regardless of the narrow prop', () => {
    const wrapper = mount(BrandBar, {
      slots: { second_row_content: '<h1 class="site-name">Site</h1>' },
    });
    expect(wrapper.get('header').classes()).toContain('iowa-bar--narrow');
    expect(wrapper.find('.iowa-bar__below').exists()).toBe(true);
  });

  it('omits the second row when the slot is absent', () => {
    const wrapper = mount(BrandBar);
    expect(wrapper.find('.iowa-bar__below').exists()).toBe(false);
  });

  it('applies the healthcare modifier and passes it to the nested logo', () => {
    const wrapper = mount(BrandBar, { props: { healthcare: true } });
    expect(wrapper.get('header').classes()).toContain('iowa-bar--healthcare');
    const logo = wrapper.getComponent(Logo);
    expect(logo.props('healthcare')).toBe(true);
  });
});
