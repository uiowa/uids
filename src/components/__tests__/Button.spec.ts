import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import UidsButton from '../button/Button.vue'

describe('Button', () => {
  it('renders properly', () => {
    const wrapper = mount(UidsButton, {
      slots: {
        default: 'Tap me',
      },
    })
    expect(wrapper.text()).toContain('Tap me')
  })
})
