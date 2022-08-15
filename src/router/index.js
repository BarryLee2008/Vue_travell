import Vue from 'vue'
import Router from 'vue-router'
/* import HelloWorld from '@/components/HelloWorld' */
/* 这里的@表示src */
import Home from '@/pages/Home/Home.vue'
import City from '@/pages/city/City.vue'
import Detail from '@/pages/Detail/Detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      // 这里的：表示动态路由，只要时访问/detail都会被该路由捕获，detail后面的内容被id收容
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // 始终滚动到顶部
    return { x: 0, y: 0 }
  }
})
