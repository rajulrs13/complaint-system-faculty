import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/views/Signin.vue'
import Dashboard from '@/views/Dashboard.vue'
import PastRequest from '@/views/PastRequest.vue'
import CurrentRequest from '@/views/CurrentRequest.vue'
import Account from '@/views/Account.vue'
import NewService from '@/components/Complaint/NewService.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
          component: NewService
        },
        {
          path: '/account',
          name: 'Account',
          component: Account
        },
        {
          path: '/pastrequest',
          name: 'PastRequest',
          component: PastRequest
        },
        {
          path: '/currentrequest',
          name: 'CurrentRequest',
          component: CurrentRequest
        }
      ]
    }
    
  ]
})
