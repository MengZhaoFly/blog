import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./src/components/Home.vue') },
      { path: '/item', component: () => import('./src/components/Item.vue') }
    ]
  })
}