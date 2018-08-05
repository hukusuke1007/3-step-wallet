<template>
  <a href="#" class="btn">
	<i class="fa fa-home"></i>
</a>
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

.btn{/*周りの凹み*/
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
    display: inline-block;
    text-decoration: none;
    color: rgba(3, 169, 244, 0.54);
    width: 220px;
    height: 220px;
    border-radius: 50%;
    text-align: center;
    background: #f7f7f7;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.08);
}
.btn .fa {/*ボタン自体*/
    position: absolute;
    content: '';
    width: 200px;
    height: 200px;
    line-height: 200px;
    vertical-align: middle; 
    left: 10px;
    top: 9px;
    border-radius: 50%;
    font-size: 6em;
    background-image: -webkit-linear-gradient(#e8e8e8 0%, #d6d6d6 100%);
    background-image: linear-gradient(#e8e8e8 0%, #d6d6d6 100%);
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.66);
    box-shadow: inset 0 2px 0 rgba(255,255,255,0.5), 0 2px 2px rgba(0, 0, 0, 0.19);
    border-bottom: solid 2px #b5b5b5;
  }
  
.btn .fa:active{
    background-image: -webkit-linear-gradient(#efefef 0%, #d6d6d6 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 2px rgba(0, 0, 0, 0.19);
    border-bottom: solid 2px #d8d8d8;
}


</style>
