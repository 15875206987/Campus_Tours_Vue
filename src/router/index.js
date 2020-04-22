import Vue from 'vue'
import Router from 'vue-router'
import UniversityMap from "../pages/UniversityMap";
import SitesManagement from '../pages/SitesManagement'
import SchoolIntro from '../pages/SchoolIntro'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/universitymap',
      name: 'UniversityMap',
      component: UniversityMap
    },
    {
      path: '/sitesmanagement',
      name: 'SitesManagement',
      component: SitesManagement
    },
    {
      path:'/schoolintro',
      name:'SchoolIntro',
      component: SchoolIntro
    },
    {
      path:'/',
      redirect:'/universitymap'
    }
  ]
})
