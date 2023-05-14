import {createRouter,createWebHashHistory} from 'vue-router'
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "首页",
    component:()=>import("../components/Home.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router