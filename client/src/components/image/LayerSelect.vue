<template>
    <h5>Layers</h5>
                    <p>Check a single layer where the image should be saved.</p>
                    <VueDraggable 
                        ref="el"
                        v-model="this.displayStore.imageEditor.layers" 
                        :animation="150"
                        ghostClass="ghost"
                        @start="onStart"
                        @update="onUpdate"
                        >
                        <!--
                        <b-form-checkbox-group
                            id="checkbox-group"
                            v-model="selectedLayer"
                            :aria-describedby="ariaDescribedby"
                            name="selected-layer"
                          >-->
                        <div v-for="(item, index) in this.displayStore.imageEditor.layers" :key="item.id">
                            <div class="column_container">
                                <b-row>
                                    <b-col cols="2">
                                        <input 
                                            type="checkbox" 
                                            :value="item.id" 
                                            v-model="this.displayStore.imageEditor.selectedLayer" 
                                            @change="uniqueCheck"
                                            >
                                        <!--
                                        <b-form-checkbox
                                          name="selected-layer"
                                          :value=item.id
                                          :disabled="isDisabledLayer(item)"
                                          >
                                            TODO:an error occurs, but why: Uncaught TypeError: assign is not a function at HTMLInputElement.<anonymous>
                                                ref: https://github.com/bootstrap-vue/bootstrap-vue/discussions/6407
                                          v-model="item.selected"
                                          value="true"
                                          unchecked-value="false"
                                        >
                                        </b-form-checkbox>-->
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
                        <!--</b-form-checkbox-group>-->

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

import { useAppDisplay } from '@/stores/AppDisplay'

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
    computed:{
        ...mapStores(useAppDisplay)
    },
    methods:{
        uniqueCheck(e){
            this.displayStore.imageEditor.selectedLayer = []
            if (e.target.checked) {
                this.displayStore.imageEditor.selectedLayer.push(e.target.value)
            }
        },
        isDisabledLayer(item){
            //TODO: dislpay non-checked layers are disables by dim
            //const {selectedLayer} = this
            return this.displayStore.imageEditor.selectedLayer.length === 1 && !(this.displayStore.imageEditor.selectedLayer [0] === item.id)
        },/*
        addLayer() {
            const code = getRandomIdOrHash(5)
            this.displayStore.imageEditor.layers.push({
                name: `layer- ${code}`,
                id: code,
                image: null
            })
        },
        removeLayer(index) {
            this.displayStore.imageEditor.layers.splice(index, 1)
            const length = this.displayStore.imageEditor.layers.length
            if(length < 1){
                this.addLayer()
                const id = this.displayStore.imageEditor.layers[0].id
                const sim_event = {
                    target:{
                        checked: true,
                        value: id
                    }
                }
                this.uniqueCheck(sim_event)
            }
            const ids = this.displayStore.imageEditor.layers.map(item => item.id)
            const selectedItem = this.displayStore.imageEditor.selectedLayer[0]
            const isCheckedInLayers = ids.indexOf(selectedItem) 
            if(isCheckedInLayers==-1){
                this.displayStore.imageEditor.selectedLayer = []
                this.displayStore.imageEditor.selectedLayer.push(ids[0])
            }
        },*/
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
    /*background-color: #e7e7e7;*/
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
  color: #979797;
}
</style>