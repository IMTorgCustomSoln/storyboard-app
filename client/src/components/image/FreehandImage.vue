<template>
    <div id="container">
        <b-aspect :aspect="aspect"> <!--TODO:fix viewport wrt aspect-->
        <svg id="freehand-canvas" 
            @pointerdown="handlePointerDown" 
            @pointermove="handlePointerMove"
            >
            <g id="layer-1">
                <path />
            </g>
        </svg>
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
            const point = [e.offsetX, e.offsetY, e.pressure]
            this.points = [point]
            this.render()
        },
        handlePointerMove(e) {
            if (e.buttons === 1) {
			    this.points = [...this.points, [e.offsetX, e.offsetY, e.pressure]];
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
    max-width: 100%;
    height: auto;
}

#freehand-canvas {
    /*position: fixed;*/
    border-color: black;
    border-style: solid;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    touch-action: none;
}

#freehand-canvas path{
    fill: black;
    stroke: black;

}


</style>