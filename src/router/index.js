import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList'
import EventCreate from '../views/EventCreate'
import EventShow from '../views/EventShow'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  }
  // {
  //   path: '/about',
  //   redirect: { name: 'About' }
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
