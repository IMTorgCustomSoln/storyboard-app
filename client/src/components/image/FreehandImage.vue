<template>
    <div id="container">
        <b-row>
            <b-col>
                <b-navbar type="light" variant="">
                    <b-navbar-nav>
                        <b-button 
                            @click="TODO_something" 
                            size="sm" 
                            style="margin:5px;"
                            >
                            Something
                        </b-button>
                    </b-navbar-nav>
                </b-navbar>
            </b-col>
        </b-row>
        <b-aspect :aspect="aspect">
            <div>
        <svg 
            id="freehand-canvas" 
            @pointerdown="handlePointerDown" 
            @pointermove="handlePointerMove"
            @pointerup="handlePointerUp"
            
            viewBox="0 0 1000 1000"
            aspect-ratio="XminYmin"
            ><!-- Notes
                using viewBox must be done correctly using the following references:
                    * viewBox explanation: https://stackoverflow.com/questions/19484707/how-can-i-make-an-svg-scale-with-its-parent-container
                    * event.clientX explanation: https://stackoverflow.com/questions/11715966/change-in-mouse-position-when-viewbox-is-added
                    * SVGGraphicsElement: https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement
                    * DOMPoint: https://developer.mozilla.org/en-US/docs/Web/API/DOMPointReadOnly
            -->
            <g id="background">
                <rect x="0" y="0" width="1000" height="1000" style="fill:white"></rect>
            </g>
            <!--
                <path />
                <g ></g>-->
            <g id="layer-TARGET" v-html="getSelectedGroup"></g>
            <g v-html="getUnSelectedGroups"></g>
            
        </svg>
            </div>
        </b-aspect>
    </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useStoryContent} from '@/stores/StoryContent'

import { getStroke } from "perfect-freehand";

export default {
    name: 'FreehandImage',
    compatConfig: {
        //MODE: 3,
        //COMPONENT_V_MODEL: false
    },
    data() {
        return {
            aspect:'1:1',
            points: [],
            setPoints: null
        }
    },
    computed:{
        ...mapStores(useStoryContent),
        getGroups(){
            return this.storyStore.getSelectedBoard.getLayers()
        },
        getSelectedGroup(){
            const layers = this.storyStore.getSelectedBoard.getLayers()
            const selectedLayer = layers.filter(item => {
                if(item.id==this.storyStore.getSelectedBoard.getSelectedLayer()){
                    return true
                }else{
                    return false
                }
            })
            let groupPath = '<g></g>'
            if(selectedLayer.length==1){
                if(selectedLayer[0].group!=null){
                const group = selectedLayer[0].group
                /*
                const parser = new DOMParser()
                const parsed = parser.parseFromString(group, 'image/svg+xml')
                const paths = [...parsed.querySelector('g').childNodes]
                */
                groupPath = group.replace('<g>','').replace('</g>','')
                }
            }
            return groupPath
        },
        getUnSelectedGroups(){
            const layers = this.storyStore.getSelectedBoard.getLayers()
            const unSelectedLayers = layers.filter(item => {
                if(item.id!=this.storyStore.getSelectedBoard.getSelectedLayer()){
                    return true
                }else{
                    return false
                }
            })
            return unSelectedLayers.map(item => item.group).join('')
        }
    },
    methods: {
        handlePointerDown(e) {
            //const point = [e.offsetX, e.offsetY, e.pressure]
            const svg = document.querySelector("#freehand-canvas")
            var m = svg.getScreenCTM()
            var p = new DOMPointReadOnly(e.clientX, e.clientY)
            p = p.matrixTransform(m.inverse())

            const point = [p.x, p.y, e.pressure]
            this.points = [point]
            this.render()
        },
        handlePointerMove(e) {
            if (e.buttons === 1) {
			    //this.points = [...this.points, [e.offsetX, e.offsetY, e.pressure]];
                const svg = document.querySelector("#freehand-canvas")
                var m = svg.getScreenCTM()
                var p = new DOMPointReadOnly(e.clientX, e.clientY)
                p = p.matrixTransform(m.inverse())

                this.points = [...this.points, [p.x, p.y, e.pressure]]
			    this.render()
		    }
        },
        handlePointerUp(e){
            this.saveSvg()
        },
        render() {
            const svg = document.querySelector("#freehand-canvas")
            const layer = svg.querySelector("#layer-TARGET")

            const newpath = document.createElementNS('http://www.w3.org/2000/svg',"path")
            newpath.setAttribute('d', getSvgPathFromStroke(
                getStroke(this.points, options)
                )
            );
            layer.appendChild(newpath)
            
        },
        saveSvg(){
            const newPaths = document.querySelector("#layer-TARGET").getInnerHTML()
            const newGroup = '<g>' + newPaths + '</g>'
            const id = this.storyStore.getSelectedBoard.getSelectedLayer()
            this.storyStore.getSelectedBoard.appendToLayer(id, newGroup)
        }
    }
}


const options = {
    size: 3,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
    easing: (t) => t,
    start: {
        taper: 0,
        easing: (t) => t,
        cap: true
    },
    end: {
        taper: 100,
        easing: (t) => t,
        cap: true
    }
}


function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return ''

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ['M', ...stroke[0], 'Q']
  )

  d.push('Z')
  return d.join(' ')
}
</script>


<style scoped>

#container {
    width: 100%;
    /*height: 1000px;*/
}

#freehand-canvas {
    /*position: fixed;*/
    border-color: black;
    border-style: solid;

    /*
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    touch-action: none;
    */
}

#freehand-canvas path{
    fill: black;
    stroke: black;

}

.navbar {
  background-color: rgb(221, 220, 220);
}

</style>