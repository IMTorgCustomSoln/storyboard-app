<template>
    <div id="container">
        <b-row>
            <b-col>
                <b-button @click="saveSvg" size="sm" style="margin:5px;">Save</b-button>
            </b-col>
        </b-row>
        <b-aspect :aspect="aspect">
            <div>
        <svg id="freehand-canvas" 
            @pointerdown="handlePointerDown" 
            @pointermove="handlePointerMove"
            
            viewBox="0 0 1000 1000"
            aspect-ratio="XminYmin"
            ><!-- Notes
                using viewBox must be done correctly using the following references:
                    * viewBox explanation: https://stackoverflow.com/questions/19484707/how-can-i-make-an-svg-scale-with-its-parent-container
                    * event.clientX explanation: https://stackoverflow.com/questions/11715966/change-in-mouse-position-when-viewbox-is-added
                    * SVGGraphicsElement: https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement
                    * DOMPoint: https://developer.mozilla.org/en-US/docs/Web/API/DOMPointReadOnly
            -->
            <g id="layer-1">
                <path />
            </g>
        </svg>
            </div>
        </b-aspect>
    </div>
</template>

<script>
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
    methods: {
        handlePointerDown(e) {
            //const point = [e.offsetX, e.offsetY, e.pressure]
            const svg = document.querySelector("#freehand-canvas");
            var m = svg.getScreenCTM();
            var p = new DOMPointReadOnly(e.clientX, e.clientY)
            p = p.matrixTransform(m.inverse());

            const point = [p.x, p.y, e.pressure]
            this.points = [point]
            this.render()
        },
        handlePointerMove(e) {
            if (e.buttons === 1) {
			    //this.points = [...this.points, [e.offsetX, e.offsetY, e.pressure]];
                const svg = document.querySelector("#freehand-canvas");
                var m = svg.getScreenCTM();
                var p = new DOMPointReadOnly(e.clientX, e.clientY)
                p = p.matrixTransform(m.inverse());

                this.points = [...this.points, [p.x, p.y, e.pressure]];
			    this.render();
		    }
        },
        render() {
            const svg = document.querySelector("#freehand-canvas");
            const layer = svg.querySelector("#layer-1")

            const newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
            newpath.setAttribute('d', getSvgPathFromStroke(
                getStroke(this.points, options)
                )
            );
            layer.appendChild(newpath)
        },
        saveSvg(){
            const serializedSvg = document.querySelector("#freehand-canvas").parentElement.getInnerHTML()
            this.$emit('saved', serializedSvg)
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


</style>