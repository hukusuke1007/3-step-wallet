<template>
  <div
    id="e3"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
  >
    <v-toolbar
      color="blue"
      dark
    >
    <!-- 多分ボタンいらねぇ　-->
    <!--
      <v-btn icon @click.native="back()" dark>
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn> -->

      <v-toolbar-title>設定画面</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
 <v-card flat>
  <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
        >
  <v-layout row wrap colum>
         {{ hogehoge }}
    <v-flex xs12>
      <v-card>
      <v-toolbar card dark tabs color="view">
        <v-toolbar-title>ウォレットのインポート</v-toolbar-title>
        </v-toolbar>
      </v-card>
      <v-card>
         <v-form>
      <v-divider></v-divider>
      <v-text-field
        label="秘密鍵を入力してください"
        placeholder=""
        single-line
        v-model="privateKey"
        :rules="privateKeyRules"
        :counter="64"
        full-width
        hide-details
      ></v-text-field>
      <v-divider></v-divider>
    </v-form>
      </v-card>
      <v-card>
        <v-card-text>秘密鍵の入力が終わりましたらボタンを押してください</v-card-text>
        <v-btn color="select" class="buttonFont white--text" large @click="goImport">秘密鍵をインポート</v-btn>
      </v-card>
      <br>
      <v-card>
      <v-toolbar card dark tabs color="view">
        <v-toolbar-title>管理者の電話番号登録</v-toolbar-title>
        </v-toolbar>
      </v-card>
       <v-card>
         <v-form>
      <v-divider></v-divider>
      <v-text-field
        label="Register phone number"
        placeholder=""
        single-line
        v-model="phoneNumber"
        :rules="phoneNumberRules"
        :counter="11"
        full-width
        hide-details
      ></v-text-field>
      <v-divider></v-divider>
    </v-form>
      </v-card>
      <v-card>
        <v-card-text>電話番号の登録ができましたら登録ボタンを押してください</v-card-text>
        <v-btn color="select" class="buttonFont white--text" large @click="goImport">電話番号を登録する</v-btn>
      </v-card>
    </v-flex>
   </v-layout>
  </v-container>
 </v-card>
  </div>
</template>

 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import settingModel from '../ts/settingModel'
import walletModel from '../ts/walletModel'

@Component({
  name: 'setting',
  // propsは他のvueから値渡しされる時に使用する.
  props: {
    message: {
      type: String,
      default: 'default'
    }
  }
})
export default class Setting extends Vue {
  private title = 'setting class'
  privateKey: string = ''
  phoneNumber: string = ''

  hogehoge: string = 'aaaa'
  mounted () {
    console.log('mounted Import')
  }
  async goImport () {
    console.log(this.privateKey)
    console.log(this.phoneNumber)
    let model = new settingModel()
    model.privateKey = this.privateKey
    model.phoneNumber = this.phoneNumber
    model.save()
    let wallet = await model.createWalletWithPrivateKey(this.privateKey)
    this.hogehoge = wallet.accounts[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>