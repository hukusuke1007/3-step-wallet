<template>
  <v-app>
    <!-- 上のツールバー -->
     <v-toolbar
      dark
      color="blue accent-1"
      clipped-left
      fixed
      app
     >
       <v-toolbar-title class="white--text">3 Steps Wallet</v-toolbar-title>
       <v-spacer></v-spacer>
       <v-menu bottom offset-y>
         <v-btn slot="activator" icon dark @click="tapset()">
           <v-icon>settings</v-icon>
         </v-btn>
         <Infomation></Infomation>
       </v-menu>
       <v-toolbar-side-icon @click="goTop"><v-icon>home</v-icon></v-toolbar-side-icon>
     </v-toolbar>
     <v-content>

      <!-- 真ん中のView -->
      <!-- <v-container fluid fill-height> -->
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
      <!-- </v-container> -->
     </v-content>


  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
// Walletをimportする.
import Wallet from './components/Wallet.vue'

// コンポーネントの設定
@Component({
  name: 'app',
  // Walletをcomponentとして定義する.
  components: {
    Wallet
  }
})

// クラス
export default class App extends Vue {
  private title = '利用者向けウォレット'
  mounted () {}
//ボタン押したらページ移行のjs
  tapset(){
    this.$router.push({name: "Import"})
  }
  goTop(){
    this.$router.push({name: "Send"})
  }
}
</script>

<style>
#app {
  font-family: 'Verdana', 'ヒラギノ角ゴ', 'Avenir', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fffaf0;
  margin-top: 0px;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
  float: left;
}

i {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  /* padding-top: 16px; */ 
  float: right;
}

.settingBtn {
  padding-top: 16px; 
}
</style>