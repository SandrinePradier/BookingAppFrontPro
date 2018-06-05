import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/auth/landing'
// import SignUp from '@/components/auth/signup'
import Menu from '@/components/menu'
import Home from '@/components/home'
import Clients from '@/components/clients'
import Agenda from '@/components/agenda'
import Workdays from '@/components/availabilitySettings/workdays'
import OpeningHours from '@/components/availabilitySettings/openinghours'
import DayRange from '@/components/availabilitySettings/dayrange'
import ASStepper from '@/components/availabilitySettings/stepper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/home',
      name: 'Home',
      components: {
        default: Home,
        menu: Menu
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/clients',
      name: 'Clients',
      components: {
        default: Clients,
        menu: Menu
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/agenda',
      name: 'Agenda',
      components: {
        default: Agenda,
        menu: Menu
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/availabilitysettings',
      name: 'ASStepper',
      components: {
        default: ASStepper,
        menu: Menu
      },
      meta: { requiresAuth: true }
    },
  ]
})
