import { mount } from '@vue/test-utils'
import SnackBar from '../../src/components/SnackBar.vue'

describe('SnackBar.vue', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(SnackBar, {})
    })

    it('should be hidden when notification property is not present', () => {
        expect(wrapper.element.classList.contains("show")).toBeFalsy();
    })

    it('should be shown when notification property is present', () => {
        wrapper.setData({ notification : "title"})
        expect(wrapper.element.classList.contains("show")).toBeTruthy();
    })

    it('should render notification text', () => {
        let text = "title"
        wrapper.setData({ notification : text})
        expect(wrapper.element.textContent.trim()).toBe(text);
    })

})