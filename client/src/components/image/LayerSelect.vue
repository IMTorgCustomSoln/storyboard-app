<template>
    <h5>Layers</h5>
                    <p>Check a single layer where the image should be saved.</p>
                    <VueDraggable 
                        ref="el"
                        v-model="this.storyStore.getSelectedBoard.imageEditor.layers" 
                        :animation="150"
                        ghostClass="ghost"
                        @start="onStart"
                        @update="onUpdate"
                        >
                        <div 
                            v-for="(item, index) in this.storyStore.getSelectedBoard.imageEditor.layers" 
                            :key="item.id"
                            >
                            <div class="column_container">
                                <b-row>
                                    <b-col cols="2">
                                        <input 
                                            type="checkbox" 
                                            :value="item.id" 
                                            v-model="item.checked"
                                            @change="uniqueCheckMark"
                                            >
                                    </b-col>
                                    <b-col cols="8">
                                        <input type="text" v-model="item.name" class="layer" style="width:100px;" />
                                    </b-col>
                                    <b-col cols="2">
                                        <b-icon-x-square class="cursor-pointer dim"
                                            @click="removeLayer(index)">X</b-icon-x-square>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>

                    </VueDraggable>
                    <!-- Add Button -->
                    <b-row>
                      <b-col style="text-align:center;">
                        <b-icon-plus class="mb-0 dim" style="margin:0px" @click="addLayer">
                        </b-icon-plus>
                      </b-col>
                    </b-row>

</template>

<script>
import { mapStores } from 'pinia'
import { VueDraggable } from 'vue-draggable-plus'

//import { useAppDisplay } from '@/stores/AppDisplay'
import { useStoryContent } from '@/stores/StoryContent'

export default{
    name:'LayerSelect',
    components:{
        VueDraggable
    },
    data(){
        return{
            /*
            selectedLayer: [],
            layers: [
                { name: 'layer-1', id: 0, image: null}
            ]*/
        }
    },
    created(){
        //this.uniqueCheckMark()
    },
    computed:{
        ...mapStores(useStoryContent)
    },
    methods:{
        uniqueCheckMark(e){
            this.storyStore.getSelectedBoard.imageEditor.layers.forEach(item => {
                if(item.id==e.target.value){
                    item.checked=true
                }else{
                    item.checked=false
                }
            })
        },
        isDisabledLayer(item){
            //TODO: dislpay non-checked layers are disables by dim
            //const {selectedLayer} = this
            return this.storyStore.getSelectedBoard.getSelectedLayer().length === 1 && !(this.storyStore.getSelectedBoard.getSelectedLayer()[0] === item.id)
        },
        addLayer(){
            const id = this.storyStore.getSelectedBoard.addLayer()
            this.storyStore.getSelectedBoard.setSelectedLayer(id)
            this.storyStore.getSelectedBoard.ensureUniqueCheckMark()
        },
        removeLayer(index){
            this.storyStore.getSelectedBoard.removeLayer(index)
        },
    }
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.column_container {
    text-align: center;
    align-items: center;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #e7e7e7;
    border-color: #e7e7e7;
    border-width: 1px;
    border-radius: 5px;
    border-style: solid;
    font-size: .8em;
}

.column_container div[class^="col-"] {
    padding: 0px;
    margin: auto;
}

.layer{
    padding: 0px;
}

.dim {
  color: #656565;
}
</style>