<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <div v-html="message"> </div>
    <v-btn @click="tap"></v-btn>
              <v-text-field
            box
            label="利用される方の秘密鍵を入力してください"
            :counter="64"
            required></v-text-field>
  </div>
</template>
 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SettingModel from '../ts/settingModel'
 
@Component({
  name: 'hello',
  // propsは他のvueから値渡しされる時に使用する.
  props: {
    message: {
      type: String,
      default: 'default'
    }
  }
})
export default class Hello extends Vue {
  private title = 'Hello class'

  mounted () {
    console.log('mounted Hello')
  }
  async tap(){
    let test = new SettingModel
    let result = await test.load()
    console.log(result.privateKey)
    // console.log(test.load());
  }
}

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
