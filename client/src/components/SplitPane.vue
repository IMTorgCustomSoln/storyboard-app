<template>
  <div class="panel">
    <Splitpanes >
      <Pane min-size="5" :size="40">
        <slot name="outline"></slot>
      </Pane>
      <Pane min-size="5" :size="ImagePaneSize">
        <slot name="image"></slot>
      </Pane>
      <Pane min-size="5" :size="100 - ImagePaneSize">
        <slot name="layout"></slot>
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

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default{
    name: 'SplitPane',
    components: { Splitpanes, Pane },
    compatConfig: { 
      MODE: 3,
      //COMPONENT_V_MODEL: false 
    },
    data(){
        return {
          ImagePaneSize: 5
        }
    },
    methods:{ 
    }

}

</script>

<style scoped>

.panel {
    height: 100%;
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




/* increase for touchscreen */

.splitpanes__splitter {
  background-color: #ccc;
  position: relative;
}
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
.splitpanes__splitter:hover:before {
  /*opacity: 1;*/
  background-color: rgba(255, 0, 0, 0.3);
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -30px;right: -30px;height: 100%;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -30px;bottom: -30px;width: 100%;
}







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