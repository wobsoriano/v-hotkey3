import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Foo from './Foo2.vue'

describe('Hotkey composable', () => {
  it('shows div on enter down', async () => {
    const wrapper = mount(Foo, {
      attachTo: document.body,
    })
    let div = wrapper.find('.visible')
    expect(div.exists()).toBe(false)
    await wrapper.trigger('keydown.enter')
    div = wrapper.find('.visible')
    expect(div.exists()).toBe(true)
    expect(div.text()).toBe('Hello hotkey')
  })

  it('hides div on esc down', async () => {
    const wrapper = mount(Foo, {
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
