import {createRouter,createWebHistory} from "vue-router"
import Home from "../pages/Home.vue"
import Plans from "../pages/Plans.vue"
const routes = [
  {path: "/",component: Home},
  {path: "/plans",component: Plans},
]
export default createRouter({
  history: createWebHistory(),
  routes,
})
