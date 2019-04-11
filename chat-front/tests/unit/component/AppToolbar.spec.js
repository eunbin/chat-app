import { mount } from '@vue/test-utils'
import '../test-setup'
import AppToolbar from '@/components/layout/AppToolbar.vue'

describe('AppToolbar.vue', () => {
  it('snapshot', () => {
    const wrapper = mount(AppToolbar)
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('snapshot check with roomInfo', () => {
    const roomInfo = {
      roomId: 1,
      title: 'Hello Chat Room',
      members: []
    }
    const wrapper = mount(AppToolbar, {
      propsData: { title: roomInfo.title }
    })

    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('given roomInfo when enter chat room then show title in toolbar', () => {
    const roomInfo = {
      roomId: 1,
      title: 'Hello Chat Room',
      members: []
    }
    const wrapper = mount(AppToolbar, {
      propsData: { title: roomInfo.title }
    })

    wrapper.find('.v-toolbar')
    expect(wrapper.text()).toEqual(roomInfo.title)
  })
})
