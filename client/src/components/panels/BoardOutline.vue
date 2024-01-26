<template>

  <!-- Add Content -->
  <div style="margin:10px">
    <VueDraggable 
      v-model="this.storyStore.getBoards" 
      :animation="150" 
      handle=".handle"
      >
      
      <div v-for="(board, index) in this.storyStore.boards" :key="board.id">
        <div class="column_container">
          <!--<b-icon-chevron-double-right class="h5 mb-1 destroy" font-scale="0.8" />-->
          <b-row>
            <b-col cols="1">
              <b-icon-list class="handle cursor-move"></b-icon-list>
            </b-col>
            <b-col cols="7">
              <b-form-textarea id="textarea-rows" placeholder="Type description" v-model="board.description"
                rows="3"></b-form-textarea>
            </b-col>
            <b-col cols="3">
              <div style="vertical-align: text-top;">
                <div style="width:80px">
                  <div v-if="board.getImage()">
                    <span v-html="board.getImage()"></span>
                  </div>
                  <div v-else>
                    <img :src="this.src='/src/components/icons/placeholder.png'" style="height:80px; margin:auto" />
                  </div>
                </div>
              <b-icon-box-arrow-up-right 
                  @click="openImageInPanel(board)"
                  v-b-hover="hoverHandler"
                  
                  style="position: absolute"
                  ><!-- TODO:  :class="brighten: isHovered(location.id)"   -->
              </b-icon-box-arrow-up-right>
              </div>
            </b-col>
            <b-col cols="1">
              <b-icon-x-square class="cursor-pointer dim" @click="removeBoard(index)">X</b-icon-x-square>
            </b-col>
          </b-row>
        </div>
      </div>
    
    </VueDraggable>

    <!-- Add Button -->
    <b-row>
      <b-col style="text-align:center;">
        <b-icon-plus-lg class="h5 mb-0 dim" style="margin:50px" @click="this.storyStore.addBoard('','')">
        </b-icon-plus-lg>
      </b-col>
    </b-row>

    <preview-list :list="this.storyStore.boards" />
  </div>

</template>

<script>
import { mapStores } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'

import { useAppDisplay } from '@/stores/AppDisplay'
import { useStoryContent} from '@/stores/StoryContent'


export default {
  name: 'BoardOutline',
  compatConfig: {
    //MODE: 3,
    COMPONENT_V_MODEL: false
  },
  components: {
    VueDraggable
  },
  data() {
    return {}
  },
  /*
  async created(){
    //this.storyStore.initializeStoryFromBackend()
    const boards = await this.storyStore.getBoards
    this.setNewSelectedBoard()
    return boards
  },*/
  computed:{
    ...mapStores(useAppDisplay, useStoryContent),
    /*
    isDataLoaded(){
      if(this.storyStore.boards && this.storyStore.boards.constructor === Array){
        return true
      }else{
        return false
      }
    }*/
  },
  methods: {
    hoverHandler(isHovered){
      //TODO:figure this out
      if(isHovered){
        this.brighten = true
      }
    },
    openImageInPanel(item){
      this.displayStore.expandPane('Image')
      this.displayStore.setSelectedBoardId(item.id)
    },
    removeBoard(index){
      this.storyStore.removeBoard(index)
      this.storyStore.setNewSelectedBoard()
    }
  }
}
</script>

<style scoped>
.column_container {
  text-align: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #e7e7e7;
  border-radius: 5px
}

.column_container .row {
  padding-top: 5px;
  padding-bottom: 5px;
}

.column_container div[class^="col-"] {
  margin: auto;
}

.bright {
  fill: blue;
}

.dim {
  color: #979797;
}
</style>