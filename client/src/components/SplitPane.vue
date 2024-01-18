<template>
  <b-row>
    <b-col>
      <b-button class="reset" sz="sm" @click="resetPanes">Reset Panes</b-button>
    </b-col>
  </b-row>
  <div class="panel">
    <Splitpanes 
      class="default-theme" 
      :push-other-panes="true"
      @resize="showPanels('resize', $event)"
      >
      <Pane min-size="5" :size="paneSize.outline">
        <h1 :style="textPanel1" @click="expandPane($event)">Outline</h1>
        <div v-show="showPanel1">
          <slot name="outline"></slot>
        </div>
      </Pane>
      <Pane min-size="5" :size="paneSize.image">
        <h1 :style="textPanel2" @click="expandPane($event)">Image</h1>
        <div v-show="showPanel2">
          <slot name="image"></slot>
        </div>
      </Pane>
      <Pane min-size="5" :size="paneSize.layout">
        <h1 :style="textPanel3" @click="expandPane($event)">Layout</h1>
        <div v-show="showPanel3">
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
      const display = useAppDisplay()

        return {
          paneSize:{
            outline: display.getSplitPanesDefaultSize.outline,
            image: display.getSplitPanesDefaultSize.image,
            layout: display.getSplitPanesDefaultSize.layout
          },

          showPanel1: true,
          showPanel2: true,
          showPanel3: true,

          turn: 0.25,
          textPanel1: '',
          textPanel2: '',
          textPanel3: '',
        }
    },
    computed: {
     rotateText(){
        return { transform: 'rotate(' + this.turn + 'turn)'}
     },
     getLayoutSize(){
      const display = useAppDisplay()
      return 100 - display.getSplitPanesCurrentSize.image
     }
    },
    methods:{
      showPanels(type, panels){
        if(panels[0].size <= 15){
          this.showPanel1 = false
          this.textPanel1 = this.rotateText
        }else{
          this.showPanel1 = true
          this.textPanel1 = ''
        }
        if(panels[1].size <= 20){
          this.showPanel2 = false
          this.textPanel2 = this.rotateText
        }else{
          this.showPanel2 = true
          this.textPanel2 = ''
        }
        if(panels[2].size <= 15){
          this.showPanel3 = false
          this.textPanel3 = this.rotateText
        }else{
          this.showPanel3 = true
          this.textPanel3 = ''
        }
      },
      expandPane(event){
        const display = useAppDisplay()
        const paneName = event.srcElement.innerHTML

        display.expandPane(paneName)
        const currentSize = display.getSplitPanesCurrentSize
        this.paneSize.outline = currentSize.outline
        this.paneSize.image = currentSize.image
        this.paneSize.layout = currentSize.layout
        
        this.showPanels('resize', [
          {size: this.paneSize.outline},
          {size: this.paneSize.image},
          {size: this.paneSize.layout}
          ]
        )
      },
      resetPanes(){
        const display = useAppDisplay()
        display.initializeSplitPanes()
        this.paneSize.outline = display.getSplitPanesCurrentSize.outline
        this.paneSize.image = display.getSplitPanesCurrentSize.image
        this.paneSize.layout = display.getSplitPanesCurrentSize.layout
        this.showPanels('resize', [
          {size: this.paneSize.outline},
          {size: this.paneSize.image},
          {size: this.paneSize.layout}
          ]
        )

      }
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