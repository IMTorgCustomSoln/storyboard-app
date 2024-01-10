<template>
  
  <div style="margin:20px">
    <VueDraggable
      v-model="list"
      :animation="150"
      handle=".handle"
    >
      <div
        v-for="(item, index) in list"
        :key="item.id"
      >
        <div class="column_container" style="text-align: center; align-items: center;">
          <!--<b-icon-chevron-double-right class="h5 mb-1 destroy" font-scale="0.8" />-->
          <b-row>
            <b-col cols="1" style="margin:auto">
              <b-icon-list class="handle cursor-move"></b-icon-list>
            </b-col>
            <b-col cols="6" style="margin:auto">
              <b-form-textarea
                id="textarea-rows"
                placeholder="Tall textarea"
                v-model="item.name"
                rows="3"
                ></b-form-textarea>
            </b-col>
            <b-col cols="3" style="">
              <div style="width:100px; vertical-align: text-top;">
                <img 
                  src="" 
                  onerror="this.src='/src/components/icons/placeholder.png';"
                  style="height:80px; margin:auto"
                  />
                <b-icon-box-arrow-up-right style="position: absolute"></b-icon-box-arrow-up-right>
              </div>
            </b-col>
            <b-col style="margin:auto">
              <b-icon-x-square class="cursor-pointer" @click="remove(index)">X</b-icon-x-square>
          </b-col>
        </b-row>
      </div>
    </div>
    </VueDraggable>
    <b-row>
      <b-col style="text-align:center;">
        <b-icon-plus-circle-fill
          class="h2 mb-0" 
          style="margin:50px"
          @click="handleAdd"
          >
        </b-icon-plus-circle-fill>
      </b-col>
    </b-row>
    
    <preview-list :list="list" />
  </div>
</template>

<script>
import { VueDraggable} from 'vue-draggable-plus'

export default{
  compatConfig: { 
    //MODE: 3,
    //COMPONENT_V_MODEL: false
  },
  name: 'DragItem',
  components:{
    VueDraggable
  },
  data(){
    return {
      list: [
              {
                name: 'Joao',
                id: '1'
              },
              {
                name: 'Jean',
                id: '2'
              },
              {
                name: 'Johanna',
                id: '3'
              },
              {
                name: 'Juan',
                id: '4'
              }
            ]
    }
  },
  methods:{
    handleAdd() {
  const length = this.list.length + 1
  this.list.push({
    name: `Juan ${length}`,
    id: `${length}`
  })
},

remove(index) {
  this.list.splice(index, 1)
}

  }

}
</script>

<style scoped>

.column_container{
  text-align: center; 
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  color: black;
}
.column_container .row {
  padding-top: 5px;
  padding-bottom: 5px;
}
.column_container  .col{
  margin: auto;
}

</style>