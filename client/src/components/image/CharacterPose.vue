<template>
	<div id="container">
		<b-row>
			<b-col>
				<b-navbar type="light" variant="">
					<b-navbar-nav>
						<b-button @click="btnSVGExportClick" size="sm" style="margin:5px;">
							Save to Layer
						</b-button>
					</b-navbar-nav>
				</b-navbar>
			</b-col>
		</b-row>
		<b-aspect :aspect="aspect">
			<iframe id="pose-canvas" title="PoseCanvas" :src="filePath" frameborder="0" width="100%" height="100%">
			</iframe>

		</b-aspect>
	</div>
</template>

<script>
/*
import * as THREE from 'three'
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js'
import { Scene, Camera } from 'three'*/
import { mapStores } from 'pinia'
import { useStoryContent} from '@/stores/StoryContent'


export default {
	name: 'CharacterPose',
	watch:{/*
		message(newVal, oldVal){
			console.log(newVal.data)
		}*/
	},
	data() {
		return {
			aspect: '1:1',
			filePath: './src/components/image/mannequin/posture-editor.html'
		}
	},
	mounted(){
		window.onmessage = function(e) {
			if(typeof e.data === 'string' || e.data instanceof String){
				this.saveSvg(e.data) 
			}
		}.bind(this)
	},
	computed:{
        ...mapStores(useStoryContent),
	},
	methods: {
		btnJPEGExportClick() {
			//TODO: how to use jpeg
			const canvasWindow = document.getElementById('pose-canvas').contentWindow
			const data = canvasWindow.renderer.domElement.toDataURL('image/jpeg')
			console.log(data)
		},
		saveSvg(newPaths){
            //const newPaths = document.querySelector("#layer-TARGET").getInnerHTML()
            const newGroup = '<g>' + newPaths + '</g>'
            const id = this.storyStore.getSelectedBoard.imageEditor.selectedLayer[0]
            this.storyStore.getSelectedBoard.appendToLayer(id, newGroup)
        }
	}
}
</script>