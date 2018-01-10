import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import MovieList from '@/page/movie/list'
import MovieEdit from '@/page/movie/edit'
import TypeList from '@/page/type/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/movie',
      component: MovieList
    },
    {
      path: '/movie/add',
      component: MovieEdit
    },
    {
      path: '/movie/edit/:id',
      component: MovieEdit
    },
    {
      path: '/type',
      component: TypeList
    }
  ]
})
