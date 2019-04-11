import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import './test-setup'

describe('App.vue', () => {
  it('snapshot check', () => {
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view']
    })

    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('application id check', () => {
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view']
    })

    expect(wrapper.find('div').attributes('id')).toEqual('chat-app')
  })
})
