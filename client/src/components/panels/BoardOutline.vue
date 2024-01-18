<template>

  <!-- Add Content -->
  <div style="margin:10px">
    <VueDraggable 
      v-model="list" 
      :animation="150" 
      handle=".handle"
      >
      <div v-for="(item, index) in list" :key="item.id">
        <div class="column_container">
          <!--<b-icon-chevron-double-right class="h5 mb-1 destroy" font-scale="0.8" />-->
          <b-row>
            <b-col cols="1">
              <b-icon-list class="handle cursor-move"></b-icon-list>
            </b-col>
            <b-col cols="7">
              <b-form-textarea id="textarea-rows" placeholder="Tall textarea" v-model="item.name"
                rows="3"></b-form-textarea>
            </b-col>
            <b-col cols="3">
              <div style="width:100px; vertical-align: text-top;">
                <img :src="item.imgSrc" onerror="this.src='/src/components/icons/placeholder.png';"
                  style="height:80px; margin:auto" />
                <b-icon-box-arrow-up-right 
                  @click="openImageInPanel(item)"
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
        <b-icon-plus-lg class="h5 mb-0 dim" style="margin:50px" @click="handleAdd">
        </b-icon-plus-lg>
      </b-col>
    </b-row>

    <preview-list :list="list" />
  </div>
</template>

<script>
import { VueDraggable } from 'vue-draggable-plus'

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
      list: [
        {
          name: 'Joao',
          id: '1',
          imgSrc: '',
          brighten: false,
        },
        {
          name: 'Jean',
          id: '2',
          imgSrc: '',
          brighten: false,
        },
        {
          name: 'Johanna',
          id: '3',
          imgSrc: '',
          brighten: false,
        },
        {
          name: 'Juan',
          id: '4',
          imgSrc: '',
          brighten: false,
        }
      ]
    }
  },
  methods: {
    hoverHandler(isHovered){
      if(isHovered){
        this.brighten = true
      }
    },
    handleAdd() {
      const length = this.list.length + 1
      this.list.push({
        name: `Juan ${length}`,
        id: `${length}`
      })
    },
    remove(index) {
      this.list.splice(index, 1)
    },
    openImageInPanel(item){
      //TODO:send to image panel
      console.log(item)
      const ImagePaneSize = 90
      const selectedItem = item
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