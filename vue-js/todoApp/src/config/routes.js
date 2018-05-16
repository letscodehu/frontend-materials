import MultiTodoList from '../components/routes/MultiTodoList.vue'
import SingleTodoList from '../components/routes/SingleTodoList.vue'

const routes = [
    { path : '/single', component: SingleTodoList},
    { path : '/multi', component: MultiTodoList},
]

export default routes