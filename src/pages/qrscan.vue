<template lang="html">
 <v-flex>
  <v-card>
   <qrcode-reader @decode="onDecode" :paused="paused"></qrcode-reader>
  </v-card>
 </v-flex>
</template>
 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { QrcodeReader } from 'vue-qrcode-reader'

Vue.component('my-component', {
  components: { QrcodeReader },
})

@Component({
  name: 'qrscan',
  // propsは他のvueから値渡しされる時に使用する.
  props: {
    message: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    async onInit (promise) {
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
    onDecode(content){
      this.$router.push({name: "Completed"})
    }
  },
})
export default class Qrscan extends Vue {
  private title = 'Qrscan class'
  mounted () {
    console.log('mounted Qrscan')
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
