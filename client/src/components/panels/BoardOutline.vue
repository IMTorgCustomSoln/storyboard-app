<template>

  <!-- Add Content -->
  <div v-if="isDataLoaded">

  <div style="margin:10px">
    <VueDraggable 
      v-model="boards" 
      :animation="150" 
      handle=".handle"
      >
      
      <div v-for="(board, index) in boards" :key="board.id">
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
              <div style="width:100px; vertical-align: text-top;">
                <div v-if="board.image">
                <span v-html="board.image"></span>
                </div>
                <div v-else>
                  <img :src="this.src='/src/components/icons/placeholder.png'" style="height:80px; margin:auto" />
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
              <b-icon-x-square class="cursor-pointer dim" @click="remove(index)">X</b-icon-x-square>
            </b-col>
          </b-row>
        </div>
      </div>
    
    </VueDraggable>

    <!-- Add Button -->
    <b-row>
      <b-col style="text-align:center;">
        <b-icon-plus-lg class="h5 mb-0 dim" style="margin:50px" @click="addBoard">
        </b-icon-plus-lg>
      </b-col>
    </b-row>

    <preview-list :list="boards" />
  </div>

</div>
</template>

<script>
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
    return {
      boards: null
    }
  },
  async created(){
    const story = useStoryContent()
    story.initializeStoryFromBackend()
    const boards = await story.getBoards

    boards.map(board => board['_brighten'] = false)
    this.boards = boards
  },
  computed:{
    isDataLoaded(){
      if(this.boards && this.boards.constructor === Array){
        return true
      }else{
        return false
      }
    },
    getBoards(){
      console.log(this.boards)
      return this.boards
    }
  },
  methods: {
    hoverHandler(isHovered){
      //TODO:figure this out
      if(isHovered){
        this.brighten = true
      }
    },
    addBoard() {
      //const story = useStoryContent()
      //story.addBoard()
      const length = this.boards.length + 1
      this.boards.push({
        description: '',
        image: '',
        id: `${length}`,
        _brighten: false
      })
    },
    remove(index) {
      this.boards.splice(index, 1)
    },
    openImageInPanel(item){
      const display = useAppDisplay()
      display.expandPane('Image')
      display.setSelectedBoardId(item.id)
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
  border-radius: 15px
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