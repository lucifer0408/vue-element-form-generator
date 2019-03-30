import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "home" */ './views/Home')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( /* webpackChunkName: "about" */ './views/About')
    },
    {
      path: '/formDisplay',
      name: 'formDisplay',
      component: () => import( /* webpackChunkName: "form" */ './views/FormDisplay')
    }
  ]
})