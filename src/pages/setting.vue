<template>
<v-flex>
  <div
      id="e3"
      style="max-width: 400px; margin: auto;"
      class="grey lighten-3"
    >
   
  </div>
  <v-card flat>
     <v-toolbar
      color="blue"
      dark
    ><v-toolbar-title>Setting</v-toolbar-title></v-toolbar>
    <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg>
        <v-flex>
          <v-text-field
            box
            label="Please enter the secret key of the person using it"
            v-model="privateKey"
            :counter="64"
            required></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            box
            label="Please enter the public key of the multi-sig account"
            v-model="publicKey"
            :counter="64"
            required></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            box
            label="Please enter the phone number of the person who monitors money"
            v-model="phoneNumber"
            :counter="11"
            required></v-text-field>
          <v-card-text>Please press the button when input is completed</v-card-text>
          <v-btn color="select" class="white--text" large @click="goImport()">Import</v-btn>
        </v-flex>

    <!-- ダイアログ -->
    <v-dialog v-model="isShowDialog" max-width="500px">
     <v-card>
        <div class="w-break">
          <v-card-title><font color="blue">{{ dialogTitle }}</font></v-card-title>
          <v-card-text v-html="dialogMsg"></v-card-text>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="tapDialog()">OK</v-btn>
        </v-card-actions>
     </v-card>         
    </v-dialog>

    </v-container>
  </v-card>
  </v-flex>
</template>


 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import settingModel from '../ts/settingModel'
import walletModel from '../ts/walletModel'
import DialogConfirm from '../components/DialogConfirm.vue'

export default Vue.extend({
  data: () => ({
    title: 'setting class',
    privateKey: '',
    phoneNumber: '',
    publicKey: '',
    isShowDialog: false,
    isError: false,
    dialogTitle: '',
    dialogMsg: ''
  }),
  components: {
    DialogConfirm
  },
  async mounted () {
    console.log('mounted Import')
    let model = new settingModel()
    await model.load()
    this.phoneNumber = model.phoneNumber
    this.privateKey = model.privateKey
    this.publicKey = model.publicKey
  },
  methods: {
    async goImport () {
      if ((this.phoneNumber.length == 0) ||
          (this.privateKey.length == 0) || 
          (this.publicKey.length == 0) ||
          (!this.isValidationPhoneNumber()) ) {
        this.dialogTitle = "Import error"
        this.dialogMsg = "Please enter the correct data"
        this.isShowDialog = true // ダイアログ表示
        return
      }

      console.log(this.privateKey)
      console.log(this.phoneNumber)
      console.log(this.publicKey)
      let model = new settingModel()
      try {
        let wallet = await model.createWalletWithPrivateKey(this.privateKey)
        let consigAddress: string = wallet.accounts[0].address
        Promise.all([
          model.getAccountFromAddress(consigAddress),
          model.getAccountFromPublicKey(this.publicKey)
        ]).then(res => {
          let consifAccount = res[0]
          let multisigAccount = res[1]
          console.log(consifAccount)
          console.log(multisigAccount)
          model.privateKey = this.privateKey
          model.publicKey = this.publicKey
          model.phoneNumber = this.phoneNumber
          model.save()
            .then(res => {
              this.dialogTitle = "Import"
              this.dialogMsg = "Import completed"
              this.isShowDialog = true // ダイアログ表示
            }).catch(error => {
              console.error("error", error)
              this.dialogTitle = "Import error"
              this.dialogMsg = "Local storage error<br><br>" + error
              this.isShowDialog = true // ダイアログ表示   
            })
        }).catch(error => {
          console.error("error", error)
          this.dialogTitle = "Import error"
          this.dialogMsg = "Please enter the correct data<br><br>" + error
          this.isShowDialog = true // ダイアログ表示
        })
      } catch (error) {
        this.dialogTitle = "Import error"
        this.dialogMsg = "Please enter the correct data"
        this.isShowDialog = true // ダイアログ表示
        return
      }
    },
    isValidationPhoneNumber(): boolean {
      console.log(this.phoneNumber)
      // 正しかったらtrue, 間違っていたらfalse
         if (!this.phoneNumber.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
          return false
         } else {
          return true
         }
    },
    tapDialog() {
      console.log("tapPositive")
      this.isShowDialog = false  // ダイアログ
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-break {
    word-break: break-all;
}
</style>