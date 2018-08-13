import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Send from '@/pages/send.vue'
import Qrscan from '@/pages/qrscan.vue'
import Completed from '@/pages/completed.vue'
import Setting from '@/pages/setting.vue'
import Wallet from '@/components/wallet.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/',
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
      path: '/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
