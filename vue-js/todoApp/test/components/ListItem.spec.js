import { mount } from '@vue/test-utils'
import ListItem from '../../src/components/ListItem.vue'

describe('ListItem.vue', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(ListItem, {
            propsData : {
                item : {} 
            }    
        })
    })

    it('renders the items name in .title element', () => {
        const itemName = "title"
        wrapper.setData({ item : { name : itemName}})
        expect(wrapper.find(".title").element.textContent.trim()).toBe(itemName)
    })

    it('has active class when active property is true', () => {
        wrapper.setData({ active : true})
        expect(wrapper.element.classList.contains("active")).toBeTruthy();
    })

    it('lacks active class when active property is false', () => {
        wrapper.setData({ active : false})
        expect(wrapper.element.classList.contains("active")).toBe(false);
    })

    it('emits a select event when item name is clicked', () => {
        wrapper.find('.title').trigger('click');
        expect(wrapper.emitted('select')).toBeTruthy();
    })

    it('emits a delete event when trash icon is clicked', () => {
        wrapper.find('.context i').trigger('click');
        expect(wrapper.emitted('delete')).toBeTruthy();
    })

    it('does not emit anything when created', () => {
        expect(wrapper.emitted('select')).toBeFalsy();
        expect(wrapper.emitted('delete')).toBeFalsy();
    })

})