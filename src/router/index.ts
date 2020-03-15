import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    children: [
      {
          path: '',
          name: 'DashboardView',
          component: () => import(/* webpackChunkName: "customer-list" */ '../components/Dashboard/View.vue'),
      },
      {
          path: ':id',
          name: 'DashboardSingle',
          component: () => import(/* webpackChunkName: "customer-list" */ '../components/Dashboard/Single.vue'),
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
