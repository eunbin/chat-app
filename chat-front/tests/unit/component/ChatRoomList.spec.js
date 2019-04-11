import { mount } from '@vue/test-utils'
import '../test-setup'
import ChatRoomList from '@/components/chat/ChatRoomList.vue'

describe('ChatRoomList.vue', () => {
  it('snapshot', () => {
    const wrapper = mount(ChatRoomList)
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('snapshot check with items', () => {
    const list = [{
      roomId: 1,
      title: 'Hello Chat Room',
      members: []
    }]
    const wrapper = mount(ChatRoomList, {
      propsData: { list }
    })

    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('given room list when click room then equal item data', () => {
    const list = [{
      roomId: 1,
      title: 'Hello Chat Room',
      members: []
    }]
    const wrapper = mount(ChatRoomList, {
      propsData: { list }
    })

    wrapper.find('.v-list__tile').trigger('click')
    expect(wrapper.emitted()['select-room'][0][0]).toEqual(list[0])
  })
})
