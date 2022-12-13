import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HotkeyPlugin from '../src'
import Foo from './Foo.vue'

describe('Hotkey works', () => {
  it('shows div on enter down', async () => {
    const wrapper = mount(Foo, {
      global: {
        plugins: [HotkeyPlugin],
      },
      attachTo: document.body,
    })
    let div = wrapper.find('.visible')
    expect(div.exists()).toBe(false)
    await wrapper.trigger('keydown.enter')
    div = wrapper.find('.visible')
    expect(div.exists()).toBe(true)
  })

  it('hides div on esc down', async () => {
    const wrapper = mount(Foo, {
      global: {
        plugins: [HotkeyPlugin],
      },
      attachTo: document.body,
    })
    await wrapper.trigger('keydown.enter')
    let div = wrapper.find('.visible')
    expect(div.exists()).toBe(true)
    await wrapper.trigger('keydown.esc')
    div = wrapper.find('.visible')
    expect(div.exists()).toBe(false)
  })
})
