import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import hot from '../views/home/hot.vue'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
    path: '/',
    name: 'Home',
    redirect: '/hot',
    component: Home,
    children: [{
        path: 'hot',
        name: 'hot',
        component: hot,
      },
      {
        path: 'classics',
        name: 'classics',
        component: () => import( /* webpackChunkName: "about" */ '../views/home/classics.vue')
      }, {
        path: 'coming',
        name: 'coming',
        component: () => import( /* webpackChunkName: "about" */ '../views/home/coming.vue')
      },
      {
        path: 'movieInfo',
        name: 'movieInfo',
        component: () => import( /* webpackChunkName: "about" */ '../views/home/movieInfo.vue')
      },
      {
        path: 'cinema',
        name: 'cinema',
        component: () => import( /* webpackChunkName: "about" */ '../views/home/cinema.vue')
      }, {
        path: 'city',
        name: 'city',
        component: () => import( /* webpackChunkName: "about" */ '../views/home/city.vue')
      },
      {
        path: 'movie',
        name: 'movie',
        component: () => import( /* webpackChunkName: "about" */ '../views/home/movie.vue')
      }
    ]
  },
  {
    path: '/video',
    name: 'video',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/video/video.vue'),
    children:[{
      
        path: 'videoPlay',
        name: 'videoPlay',
        component: () => import( /* webpackChunkName: "about" */ '../views/video/videoPlay.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router