import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/index.js'
import Signin from '@/views/Signin.vue'
import Dashboard from '@/views/Dashboard.vue'
import PastRequest from '@/views/PastRequest.vue'
import CurrentRequest from '@/views/CurrentRequest.vue'
import Account from '@/views/Account.vue'
import NewService from '@/views/NewService.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children:[
        {
          path: '/newservice',
          name: 'NewService',
          component: NewService,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/account',
          name: 'Account',
          component: Account,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/pastrequest',
          name: 'PastRequest',
          component: PastRequest,
          meta:{
            authRequired: true
          }
        },
        {
          path: '/currentrequest',
          name: 'CurrentRequest',
          component: CurrentRequest,
          meta:{
            authRequired: true
          }
        }
      ]
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.getters.getUserId) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router