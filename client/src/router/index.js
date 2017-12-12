import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/admin'
import Login from '@/components/login'
import store from '@/store.js'
import Reg from '@/components/reg'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      component: Admin,
      meta: {
        auth: true
      }
    },
    {
      path: '/reg',
      component: Reg
    }
  ]
})

router.beforeEach((to,from,next) => {
  if (to.meta.auth){
    console.log("这个页面需要权限") 
    if (store.state.token){
      next()
    }else{
      next({
        path: '/login'
      })
    }
  }else{
    next()
  }
})


export default router

