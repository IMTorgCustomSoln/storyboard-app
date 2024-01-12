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
                    <VueDraggable 
                        ref="el"
                        v-model="layers" 
                        :animation="150"
                        ghostClass="ghost"
                        @start="onStart"
                        @update="onUpdate"
                        >
                        <div v-for="(item, index) in layers" :key="item.id">
                            <div class="column_container">
                                <b-row>
                                    <b-col cols="10">
                                        <input type="text" v-model="item.name" class="layer" style="width:100px;" />
                                    </b-col>
                                    <b-col cols="2">
                                        <b-icon-x-square class="cursor-pointer dim"
                                            @click="remove(index)">X</b-icon-x-square>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
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
                            <p>I'm the first tab</p>
                            <FreeHand/>
                            </b-container>
                        </b-tab>
                        <b-tab title="Background">
                            <p>I'm a disabled tab!</p>
                        </b-tab>
                        <b-tab title="Subject">
                            <p>I'm the second tab</p>
                        </b-tab>
                        <b-tab title="Foreground">
                            <p>I'm a disabled tab!</p>
                        </b-tab>
                        <b-tab title="Frame">
                            <p>I'm a disabled tab!</p>
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
            layers: [
                { name: 'layer-1', id: 0 }
            ]
        }
    },
    methods: {
        layerAdd() {
            const length = this.layers.length + 1
            this.layers.push({
                name: `layer-${length}`,
                id: `${length}`
            })
        },
        remove(index) {
            this.layers.splice(index, 1)
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