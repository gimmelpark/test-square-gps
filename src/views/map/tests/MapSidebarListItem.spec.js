import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'

import MapSidebarListItem from "../component/MapSidebarListItem.vue";



describe('MapSidebarListItem', () => {
  let wrapper;

  const defaultProps = {
    point: {
      id: 1,
      title: 'asd',
      address: 'qwe'
    },
    isLoading: false
  }

  beforeEach(() => {
    Vue.use(Vuetify)
    const localVue = createLocalVue()
    let vuetify

    vuetify = new Vuetify()

    wrapper = shallowMount(MapSidebarListItem, {
      localVue,
      vuetify,
      propsData: defaultProps
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('snapshots', () => {
    it('snapshot with default props', () => {
      expect(wrapper.element).toMatchSnapshot()
    })

    it('snapshot with isLoading: true', async () => {
      await wrapper.setProps({
        isLoading: true,
      })

      expect(wrapper.element).toMatchSnapshot()
    })

    it('snapshot in editing mode', async () => {
      await wrapper.setData({
        isEditing: true
      })

      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('methods', () => {
    describe('onEditButtonClick', () => {
      it("should call $emit with passed arguments and set isEditing: false if isEditing is true", async () => {
        await wrapper.setData({
          editedTitle: 'aaaa',
          isEditing: true
        })

        wrapper.vm.onEditButtonClick()

        expect(wrapper.emitted()['save-changes'][0]).toEqual(['aaaa'])
        expect(wrapper.vm.isEditing).toBe(false)
      })

      it("should set editedTitle and set isEditing: true if isEditing is false", async () => {

        wrapper.vm.onEditButtonClick()

        expect(wrapper.vm.editedTitle).toBe('asd')
        expect(wrapper.vm.isEditing).toBe(false)
      })
    })
  })
})