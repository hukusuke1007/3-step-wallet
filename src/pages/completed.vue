<template>
    <a id="fab" href="#"><v-icon @click="goCalling">phone</v-icon></a>
</template>
 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
 
@Component({
  name: 'completed',
  // propsは他のvueから値渡しされる時に使用する.
  props: {
    message: {
      type: String,
      default: 'default'
    }
  }
})
export default class Completed extends Vue {
  private title = 'Completed class'
  mounted () {
    console.log('mounted Completed')
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

#fab {/*円の部分*/
    display: block;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    width: 200px;/*幅*/
    height: 200px;/*高さ*/
    background: #03a9f4;/*背景色*/
    text-align: center;/*中央寄せ*/
    border-radius: 50%;/*角丸く*/
    transition: .3s;/*滑らかな動きに*/
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.12), 0 2px 2px 0 rgba(0,0,0,.24);/*影*/
}

#fab:hover {/*ホバー時*/
  box-shadow: 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12), 0 2px 4px -1px rgba(0,0,0,.2);
}

#fab i {/*中央のアイコン*/
  position: relative;
  color: white;
  line-height: 200px;/*＝幅と高さ*/
  font-size: 100px;/*サイズ*/
  display: block;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
}
</style>
