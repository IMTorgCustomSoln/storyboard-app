<template>

    <!-- Add Content -->
    <div>
        <!--<b-card>-->
            <b-row>
                <b-col cols="3" style="padding-top:60px;">
                    <LayerSelect/>
                </b-col>

                <!-- Tabs -->
                <b-col cols="9" class="editor-container">
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
        <!--</b-card>-->
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useStoryContent} from '@/stores/StoryContent'

import LayerSelect from '@/components/image/LayerSelect.vue'
import FreeHand from '@/components/image/FreehandImage.vue'

export default {
    name: 'ImageEditor',
    compatConfig: {
        //MODE: 3,
        COMPONENT_V_MODEL: false
    },
    components: {
        LayerSelect,
        FreeHand
    },
    data() {
        return {/*
            selectedLayer: [],
            layers: [
                { name: 'layer-1', id: 0, image: null}
            ]*/
        }
    },
    computed:{
        ...mapStores(useStoryContent),
    },
    methods: {
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
/*TODO:not scoped so that it works with LayerSelect*/

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
/*
.editor-container{
    background-color: #e7e7e7;
}*/
</style>