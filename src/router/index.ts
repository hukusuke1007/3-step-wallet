import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Send from '@/pages/send.vue'
import Qrscan from '@/pages/qrscan.vue'
import Completed from '@/pages/completed.vue'
import Import from '@/pages/import.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/send',
      name: 'Send',
      component: Send
    },
    {
      path: '/qrscan',
      name: 'Qescan',
      component: Qrscan
    },
    {
      path: '/completed',
      name: 'Completed',
      component: Completed
    },
    {
      path: '/import',
      name: 'Import',
      component: Import
    }
  ]
})
