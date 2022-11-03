import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TheGame from '../components/game/TheGame'
import SupportPage from '../components/Support/SupportPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/support',
    name: 'support',
    component: SupportPage
  },
  {
    path: '/TheGame',
    name: 'ザ・ゲーム',
    component: TheGame
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
