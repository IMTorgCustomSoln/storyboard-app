<template>

    <NavbarTop/>
    <div v-if="isDataLoaded">
      <SplitPane>
        <template v-slot:outline>
          <BoardOutline/>
        </template>
        <template v-slot:image>
          <ImageEditor/>
        </template>
        <template v-slot:layout>
          <PageLayout/>
        </template>
      </SplitPane>
    </div>
    <!--<FooterBar class="footer"></FooterBar>-->

</template>

<script>
import { mapStores } from 'pinia'
//import {useDisplayStore} from '@/main.js';
import { useStoryContent} from '@/stores/StoryContent'

import NavbarTop from '@/components/NavbarTop.vue';
import SplitPane from '@/components/SplitPane.vue';
//import FooterBar from '@/components/FooterBar.vue';

import BoardOutline from '@/components/panels/BoardOutline.vue';
import ImageEditor from '@/components/panels/ImageEditor.vue';
import PageLayout from '@/components/layout/PageLayout.vue'

export default {
name: `App`,
components:{
  NavbarTop,
  SplitPane,
  //FooterBar,

  BoardOutline,
  ImageEditor,
  PageLayout
},
data() {
  return {
    dataLoaded: false
  }
},
async created(){
    this.storyStore.initializeStoryFromBackend()
    const boards = await this.storyStore.getBoards
    this.storyStore.setNewSelectedBoard()
    if(boards.length>0){
      this.dataLoaded = true
      console.log('DATA INITIALIZED')
    }
},
computed:{
  ...mapStores(useStoryContent),
  isDataLoaded(){
      if(this.storyStore.boards && this.storyStore.boards.constructor === Array && this.storyStore.getSelectedBoardId!=null){
        console.log('DATA LOADED')
        return true
      }else{
        return false
      }
    }
},
methods:{
}
};
</script>

<style>
  #app {
    /*
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    display: flex;
    flex-direction: column;*/
  }

  .NOT_USED_footer {
    min-height: 100vh;  /*TODO:fix to bottom */
  }

  #canvas {
    /*position: fixed;*/
    border-color: black;
    border-style: solid;
    border-width: thin;
    background-color: #ffffff;

    /*
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    touch-action: none;
    */
}

#canvas path{
    fill: black;
    stroke: black;

}
</style>