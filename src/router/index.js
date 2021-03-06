import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/'
    },
    {
      path: '/all'
    },
    {
      path: '/active'
    },
    {
      path: '/completed'
    },
    {
      path: '*',
      redirect: '/all'
    }
  ]
})
