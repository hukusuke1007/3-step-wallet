<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
      <v-toolbar card dark tabs color="view">
        <v-btn icon @click.native="back()" dark>
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-toolbar-title>ウォレットのインポート</v-toolbar-title>
        </v-toolbar>
      </v-card>
      <v-card>
         <v-form>
      <v-divider></v-divider>
      <v-text-field
        label="import secret key"
        value="秘密鍵を入力してください"
        single-line
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
    </v-flex>
   </v-layout>
</template>

 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
 
@Component({
  name: 'import',
  // propsは他のvueから値渡しされる時に使用する.
  props: {
    message: {
      type: String,
      default: 'default'
    }
  }
})
export default class Import extends Vue {
  private title = 'Import class'
  mounted () {
    console.log('mounted Import')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>