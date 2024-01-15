<template>
    <!-- Add Header -->
    <b-row>
        <b-col style="text-align:center;">
            <h1>Image</h1>
        </b-col>
    </b-row>


    <!-- Add Content -->
    <div>
        <b-card>
            <b-row>
                <b-col cols="3" style="padding-top:60px;">
                    <h5>Layers</h5>
                    <p>Check a single layer where the image should be saved.</p>
                    <VueDraggable 
                        ref="el"
                        v-model="layers" 
                        :animation="150"
                        ghostClass="ghost"
                        @start="onStart"
                        @update="onUpdate"
                        >
                        <b-form-checkbox-group
                            id="checkbox-group"
                            v-model="selectedLayer"
                            :aria-describedby="ariaDescribedby"
                            name="selected-layer"
                          >
                        <div v-for="(item, index) in layers" :key="item.id">
                            <div class="column_container">
                                <b-row>
                                    <b-col cols="2">
                                        <b-form-checkbox
                                          name="selected-layer"
                                          :value=item.id
                                          :disabled="isDisabledLayer(item)"
                                          ><!--
                                            TODO:an error occurs, but why: Uncaught TypeError: assign is not a function at HTMLInputElement.<anonymous>
                                                ref: https://github.com/bootstrap-vue/bootstrap-vue/discussions/6407
                                          v-model="item.selected"
                                          value="true"
                                          unchecked-value="false"
                                        >-->
                                        </b-form-checkbox>
                                    </b-col>
                                    <b-col cols="8">
                                        <input type="text" v-model="item.name" class="layer" style="width:100px;" />
                                    </b-col>
                                    <b-col cols="2">
                                        <b-icon-x-square class="cursor-pointer dim"
                                            @click="remove(index)">X</b-icon-x-square>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        </b-form-checkbox-group>
                    </VueDraggable>
                    <!-- Add Button -->
                    <b-row>
                      <b-col style="text-align:center;">
                        <b-icon-plus class="mb-0 dim" style="margin:0px" @click="layerAdd">
                        </b-icon-plus>
                      </b-col>
                    </b-row>
                </b-col>
                <b-col cols="9">
                    <b-tabs content-class="mt-3">
                        <b-tab title="Freehand" active>
                            <b-container>
                            <p>Sketch anything by freehand.</p>
                            <FreeHand @saved="onChildSaved"/>
                            </b-container>
                        </b-tab>
                        <b-tab title="Background">
                            <p>Create backgrounds for your scene.</p>
                        </b-tab>
                        <b-tab title="Subject">
                            <p>Design the pose and looks for primary characters.</p>
                        </b-tab>
                        <b-tab title="Foreground">
                            <p>This can include any additional objects.</p>
                        </b-tab>
                        <b-tab title="Frame">
                            <p>Shape and size the view portal to your image.</p>
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import { VueDraggable } from 'vue-draggable-plus'

import FreeHand from '@/components/image/FreehandImage.vue'

export default {
    name: 'ImagePanel',
    compatConfig: {
        //MODE: 3,
        COMPONENT_V_MODEL: false
    },
    components: {
        VueDraggable,
        FreeHand
    },
    data() {
        return {
            selectedLayer: [],
            layers: [
                { name: 'layer-1', id: 0, image: null}
            ]
        }
    },
    methods: {
        isDisabledLayer(item){
            //const {selectedLayer} = this
            return this.selectedLayer.length === 1 && !(this.selectedLayer[0] === item.id)
        },
        layerAdd() {
            const length = this.layers.length
            this.layers.push({
                name: `layer-${length+1}`,
                id: `${length}`,
                image: null
            })
        },
        remove(index) {
            this.layers.splice(index, 1)
        },
        onChildSaved(image){
            //Save image that comes from child tab
            console.log(image)
            const layerToSaveImage = this.selectedLayer[0]
            this.layers.forEach(layer => {
                if(layer.id==layerToSaveImage){
                    layer.image = image
                }
            })
        }

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