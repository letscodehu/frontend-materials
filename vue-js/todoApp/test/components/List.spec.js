import {mount} from '@vue/test-utils'
import List from '../../src/components/List.vue'

describe('List.vue', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(List, {
            stubs : {
                "ListItem" : '<div class="mockitem" />'
            },
            propsData : {
                items : [
                    {
                        name : 'valami',
                        id: 5
                    },
                    {
                        name: 'valamimás',
                        id: 6
                    }
                ]
            }
        })
    })

    it('should render items given', () => {
        expect(wrapper.findAll('.mockitem').length).toBe(2)
    })

    it('is active should return true if the given index is selected', () => {
        wrapper.setData({
            selected : 5
        })
        expect(wrapper.vm.isActive(5)).toBeTruthy();
    })

    it('is active should return false if the given index is not selected', () => {
        wrapper.setData({
            selected : 3
        })
        expect(wrapper.vm.isActive(5)).toBeFalsy();
    })

    it('should select index when not already selected', () => {
        wrapper.vm.select(5)
        expect(wrapper.vm.isActive(5)).toBeTruthy();
    })

    it('should deselect index when already selected', () => {
        wrapper.vm.select(5)
        wrapper.vm.select(5)
        expect(wrapper.vm.isActive(-1)).toBeTruthy();
    })

    it('should deselect when deleted', () => {
        wrapper.vm.select(5)
        wrapper.vm.deleteItem(5,6)
        expect(wrapper.vm.isActive(-1)).toBeTruthy();
    })

    it('should emit delete event when deleted', () => {
        wrapper.vm.deleteItem(5,6)
        let emits = wrapper.emitted('delete')[0]
        expect(emits[0]).toBe(5);
        expect(emits[1]).toBe(6);
    })



})