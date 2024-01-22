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
                                        <input type="checkbox" :value="item.id" v-model="this.displayStore.imageEditor.selectedLayer" @change="uniqueCheck">
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
            selectedLayer: [],
            layers: [
                { name: 'layer-1', id: 0, image: null}
            ]
        }
    },
    computed:{
        ...mapStores(useAppDisplay)
    },
    methods:{
        //TODO:some logic should probably be in AppDisplay???
        uniqueCheck(e){
            this.displayStore.imageEditor.selectedLayer = []
            if (e.target.checked) {
                this.displayStore.imageEditor.selectedLayer .push(e.target.value)
            }
        },
        isDisabledLayer(item){
            //TODO: dislpay non-checked layers are disables by dim
            //const {selectedLayer} = this
            return this.displayStore.imageEditor.selectedLayer.length === 1 && !(this.displayStore.imageEditor.selectedLayer [0] === item.id)
        },
        addLayer() {
            const length = this.displayStore.imageEditor.layers.length
            this.displayStore.imageEditor.layers.push({
                name: `layer-${length+1}`,
                id: `${length}`,
                image: null
            })
        },
        removeLayer(index) {
            this.displayStore.imageEditor.layers.splice(index, 1)
        },
    }
}
</script>