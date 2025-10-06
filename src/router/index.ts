import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Predict from '../pages/Predict.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import ThreeJSDemo from '../pages/ThreeJSDemo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/predict',
      name: 'predict',
      component: Predict
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/threejs',
      name: 'threejs',
      component: ThreeJSDemo
    }
  ]
})

export default router