import MultiTodoList from '../components/routes/MultiTodoList.vue'
import SingleTodoList from '../components/routes/SingleTodoList.vue'

const routes = [
    { path : '/single/:id', component: SingleTodoList},
    { path : '/', component: MultiTodoList},
]

export default routes