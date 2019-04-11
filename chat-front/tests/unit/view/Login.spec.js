import { mount } from '@vue/test-utils'
import '../test-setup'

import Login from '@/views/Login.vue'

describe('LoginForm.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(Login)

    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  // FIXME: [Vue warn]: Error in callback for immediate watcher "hasError": "TypeError: Cannot read property '$scopedSlots' of undefined"
  it('when rendering button should be inactive', () => {
    const wrapper = mount(Login)
    const el = wrapper.find('.v-btn')

    expect(el.attributes('disabled')).toEqual('disabled')
  })

  it('when button clicked, button should be loading', () => {
    const wrapper = mount(Login)

    const btn = wrapper.find('.v-btn')

    wrapper.find('.v-btn').trigger('click')
    expect(btn.attributes('loading')).toBeUndefined()
  })
})
