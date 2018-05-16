import App from '../../src/App.vue'
import {shallow} from '@vue/test-utils'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueResourceMock from 'vue-resource-mock'
import sinon from 'sinon'

describe('App.vue', () => {

    let wrapper, mockItem;

    before(() => {
        mockItem = {
            id : 5,
            name : "valami"
        }
        Vue.use(VueResource)
        Vue.use(VueResourceMock, {
            'GET */tasks/'() {
                return {
                    status : 200,
                    body:  [ mockItem ]
                }
            },
            'DELETE */tasks/500' () {
                return {
                    status : 500
                }
            },
            'DELETE */tasks/200' () {
                return {
                    status : 200
                }
            },
            'POST */tasks/'(path, query, request) {
                return {
                    status : request.body.name == 'success' ? 201 : 500,
                    body : {
                        name : request.body.name,
                        id : 5
                    }
                }
            }
        })
    }) 

    beforeEach((done) => {
        wrapper = shallow(App)
        setTimeout(done, 1)
    })

    it('should fill with data on creation', () => {
        expect(wrapper.vm.tasks[0].id).toBe(mockItem.id)
        expect(wrapper.vm.tasks[0].name).toBe(mockItem.name)
    })

    it('should emit message event on delete error', (done) => {
        wrapper.vm.deleteTask(0,500)
        setTimeout(() => {
            let emit = wrapper.emitted('message')[0]
            expect(emit[0]).toBe("Error during the request!")
            done()
        }, 1)
    })

    it('should left items untouched on delete error', (done) => {
        wrapper.vm.deleteTask(0,500)
        setTimeout(() => {
            expect(wrapper.vm.tasks.length).toBe(1)
            done()
        }, 1)
    })

    it('should emit message event on delete success', (done) => {
        wrapper.vm.deleteTask(0,200)
        setTimeout(() => {
            let emit = wrapper.emitted('message')[0]
            expect(emit[0]).toBe("Deleted!")
            done()
        }, 1)
    })

    it('should delete items on delete success', (done) => {
        wrapper.vm.deleteTask(0,200)
        setTimeout(() => {
            expect(wrapper.vm.tasks.length).toBe(0)
            done()
        }, 1)
    })

    it('should show message for a certain period', () => {
        let clock = sinon.useFakeTimers();
        wrapper.vm.showMessage('valami');
        expect(wrapper.vm.message).toBe('valami');
        clock.tick(3000);
        expect(wrapper.vm.message).toBe(null);
        clock.restore();
    })

    it('should ignore empty tasknames when adding task', () => {
        wrapper.vm.taskName = '';
        wrapper.vm.addTask();
        expect(wrapper.emitted('message')).toBeFalsy();
    })

    it('should store locally the returned data when adding task', (done) => {
        wrapper.vm.taskName = 'success';
        wrapper.vm.addTask();
        setTimeout(() => {
            expect(wrapper.vm.tasks[1].id).toBe(5);
            expect(wrapper.vm.tasks[1].name).toBe('success');
            done();
        }, 1);
    })

    it('should emit message when adding task', (done) => {
        wrapper.vm.taskName = 'success';
        wrapper.vm.addTask();
        setTimeout(() => {
            let emits = wrapper.emitted('message')[0];
            expect(emits[0]).toBe('Created!');
            done();
        }, 1);
    })

    it('should only emit error when adding task fails', (done) => {
        wrapper.vm.taskName = 'fail';
        wrapper.vm.addTask();
        setTimeout(() => {
            expect(wrapper.vm.tasks.length).toBe(1)
            let emits = wrapper.emitted('message')[0];
            expect(emits[0]).toBe('Error during the request!');
            done();
        }, 1);
    })

}) 