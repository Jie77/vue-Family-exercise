import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/admin'
import Login from '@/components/login'
import store from '@/store.js'
import Reg from '@/components/reg'
import MainTable from '@/components/mainTable'
import insertInfo from '@/components/adminChild/insertInfo'
import baseInfo from '@/components/adminChild/baseInfo'
import recordGrade from '@/components/adminChild/recordGrade'
import queryGrade from '@/components/adminChild/queryGrade'
import hisTeacher from '@/components/adminChild/hisTeacher'
import dyingStu from '@/components/adminChild/dyingStu'

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
      },
      children: [
        {
          path: 'insertinfo',
          name: 'insertInfo',
          component: insertInfo,
          meta: {
            auth: true
          }
        },
        {
          path: 'baseinfo',
          name: 'baseInfo',
          component: MainTable,
          meta: {
            auth: true
          }
        },
        {
          path: 'recordgrade',
          name: 'recordGrade',
          component: recordGrade,
          meta: {
            auth: true
          }
        },
        {
          path: 'querygrade',
          name: 'queryGrade',
          component: queryGrade,
          meta: {
            auth: true
          }
        },
        {
          path: 'histeacher',
          name: 'hisTeacher',
          component: hisTeacher,
          meta: {
            auth: true
          }
        },
        {
          path: 'dyingstu',
          name: 'dyingStu',
          component: dyingStu,
          meta: {
            auth: true
          }
        }

      ]
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

