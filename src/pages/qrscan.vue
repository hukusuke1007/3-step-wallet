<template lang="html">
　<qrcode-reader @decode="onDecode" :paused="paused"></qrcode-reader>
</template>
 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { QrcodeReader } from 'vue-qrcode-reader'
import SettingModel from '../ts/settingModel'

Vue.component('my-component', {
  components: { QrcodeReader },
})

export default Vue.extend({
  name: 'qrscan',
  data: () => ({
    nem: new SettingModel(),
    qrJson: '',
    isLoding: false,
    rules: {
      senderAddrLimit: (value:string) => (value && (value.length === 46 || value.length === 40)) || '送金先アドレス(-除く)は40文字です。',
      senderAddrInput: (value:string) => {
        const pattern = /^[a-zA-Z0-9-]+$/
        return pattern.test(value) || '送金先の入力が不正です'
      },
      amountLimit: (value:number) => (value >= 0) || '数量を入力してください',
      amountInput: (value:string) => {
        const pattern = /^[0-9.]+$/ //※ブログ上ではちゃんと表示されないため、実装の際はこのコメントアウトを外してください
        return (pattern.test(value) && !isNaN(Number(value))) || '数量の入力が不正です'
      },
      messageRules: (value:string) => (value.length <= 1024) || 'メッセージの最大文字数が超えています。'
    }
  }),
  methods: {
    async onInit (promise: any) {
      // show loading indicator

      try {
        await promise

        // successfully initialized
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
        } else {
          // browser is probably lacking features (WebRTC, Canvas)
        }
      } finally {
        // hide loading indicator
      }
    },

    async onDecode(content: any) {
        console.log(content)

        /*let model = new SettingModel
        let getPrivateKey = await model.load()
        console.log(getPrivateKey.privateKey)*/

        if (content !== '') {
          let qrJson = JSON.parse(content)
          console.log(qrJson)
          console.log(qrJson.data.msg)
          this.sendMultisig(qrJson)
          /*if (!json) {
            console.log('qr_reader error')
          } else {
            this.$emit('qr-reader-event-scan-success', json)
            // this.paused = true
          }
        } else {
          console.log('QR読み込みエラー')*/
        }
      },
     async sendMultisig(qrContent: any) {
      let model = new SettingModel
      let getInfo = await model.load()
      console.log(getInfo.privateKey)
      console.log(qrContent.data.msg)
      let consigPrivateKey: string = getInfo.privateKey
      let multisigPublicKey: string = getInfo.publicKey
      let toAddr: string = qrContent.data.addr
      let amount: number = qrContent.data.amount/Math.pow(10, 6)
      let message: string = qrContent.data.msg
      model.createXemTransaction(consigPrivateKey, toAddr, amount, message, multisigPublicKey)
        .then((result: any) => {
          console.log("sendMultisig", result)
          this.$router.push({name: "Completed"})
        }).catch((error: any) => {
          console.error("sendMultisig", error)
        })

    
    
    }
  }  
})

/*
export default class Qrscan extends Vue {
  isLoding:boolean = false

  mounted () {
    console.log('mounted Qrscan')
  }
  async sendMultisig(qrContent: any) {
    let model = new SettingModel
    let getInfo = await model.load()
    console.log(getInfo.privateKey)
    let consigPrivateKey: string = getInfo.privateKey
    let multisigPublicKey: string = getInfo.publicKey
    this.$router.push({name: "Completed"})
  }
  
}
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}


</style>
