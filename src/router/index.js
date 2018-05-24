import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
      name: 'Home',
      component: Home
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/clients',
      name: 'Clients',
      component: Clients
    },
    {
      path: '/agenda',
      name: 'Agenda',
      component: Agenda
    },
    {
      path: '/availabilitysettings',
      name: 'ASStepper',
      component: ASStepper
    },
  ]
})
