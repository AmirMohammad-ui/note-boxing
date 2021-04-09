import {createRouter,createWebHistory} from "vue-router"
import Home from "../pages/Home.vue"
import Plans from "../pages/Plans.vue"
import PlansFound from "../pages/PlansFound.vue"
import NotFound from "../pages/NotFound.vue"
const routes = [
  {path: "/",component: Home},
  {path: "/plans",component: Plans},
  {path: "/foundplans",component: PlansFound},
  {path: "/:notfound(.*)",component: NotFound},
]
export default createRouter({
  history: createWebHistory(),
  routes,
})
