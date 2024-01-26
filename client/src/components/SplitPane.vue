<template>
  <div class="panel">
    <Splitpanes 
      class="default-theme" 
      :push-other-panes="true"
      @resize="this.displayStore.showPanes('resize', $event)"
      >
      
      <Pane min-size="5" :size="this.displayStore.getPanes.outline.currentSize">
        <h1 
          :style="this.displayStore.getPanes.outline.headerStyle" 
          @click="this.displayStore.expandPane('Outline')"
          >Outline
        </h1>
        <div v-show="this.displayStore.getPanes.outline.showContent">
          <slot name="outline"></slot>
        </div>
      </Pane>

      <Pane min-size="5" :size="this.displayStore.getPanes.image.currentSize">
        <h1 
          :style="this.displayStore.getPanes.image.headerStyle" 
          @click="this.displayStore.expandPane('Image')"
          >Image
        </h1>
        <div v-show="this.displayStore.getPanes.image.showContent">
          <slot name="image"></slot>
        </div>
      </Pane>

      <Pane min-size="5" 
        :size="this.displayStore.getPanes.layout.currentSize">
        <h1 
          :style="this.displayStore.getPanes.layout.headerStyle" 
          @click="this.displayStore.expandPane('Layout')"
          >Layout
        </h1>
        <div v-show="this.displayStore.getPanes.layout.showContent">
          <slot name="layout"></slot>
        </div>
      </Pane>
    

    </Splitpanes>
  </div>
</template>

<script>
/*
ref: https://antoniandre.github.io/splitpanes/
must use the following in `vite.config.js`:
  ... ,
  optimizeDeps: {
    exclude: ['splitpanes']
  },
  ...
*/
import { mapStores } from 'pinia'

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import { useAppDisplay } from '@/stores/AppDisplay'


export default{
    name: 'SplitPane',
    components: { Splitpanes, Pane },
    compatConfig: { 
      //MODE: 3,
      //COMPONENT_V_MODEL: false 
    },
    data(){
        return {}
    },

    computed: {
      ...mapStores(useAppDisplay),
     getLayoutSize(){
      return 100 - this.displayStore.getPanes.image.currentSize
     }
    },
    methods:{
      
    }

}

</script>

<style scoped>

.reset{
  padding-top: 2px;
  padding-bottom: 2px;
}

h1 {
  margin: 20px;
}



.panel {
    /*height: 100%; */
    height: 100vh;
    margin: 0;
}

.splitpanes {
  background-color: #f8f8f8;
}

.splitpanes__pane {
  box-shadow: 0 0 5px rgba(0, 0, 0, .2) inset;
  display: block; 
  padding: 10px;
  justify-content: center;
  align-items: center;
  /*display: flex;*/
  position: relative;
}




/* increase for touchscreen 
TODO:this fails - why!!!
ref: https://github.com/antoniandre/splitpanes/issues/63
*/

.splitpanes__splitter {background-color: #ccc;position: relative;}
.splitpanes__splitter:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: rgba(255, 0, 0, 0.3);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {opacity: 1;}
.splitpanes--vertical > .splitpanes__splitter:before {left: -30px;right: -30px;height: 100%;}
.splitpanes--horizontal > .splitpanes__splitter:before {top: -30px;bottom: -30px;width: 100%;}








em.specs {
  font-size: 0.2em;
  line-height: 1;
  position: absolute;
  color: #bbb;
  bottom: 0.5em;
  left: 0;
  right: 0;
  text-align: center;
}

</style>