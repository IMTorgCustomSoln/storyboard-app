<template>
    <!-- Add Header -->
    <b-row>
        <b-col style="text-align:center;">
            <h1>Layout</h1>
        </b-col>
    </b-row>

    <!-- Add Content -->
    <div v-for="(page, id) in pages" :key="id">
        <b-row>
            <b-col cols="8" class="mx-auto">
                <div>Page-{{id}}</div>
                <b-card>
                    <b-aspect :aspect="aspect">
                        <div v-bind:id="'gs-'+id" class="grid-stack"></div>
                    </b-aspect>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import {GridStack} from "gridstack"
import "gridstack/dist/gridstack.min.css"

export default{
    name:'PageLayout',
    compatConfig: {
        //MODE: 3,
        //COMPONENT_V_MODEL: false
    },
    data(){
        return{
            aspect:'8.5:11',
            pages: [
                {page: 0, id: 0},
                {page: 1, id: 1},
            ]
        }
    },
    mounted() {
        const options = {
            //layout
            column: 12,
            row:18,
            //cellHeight: '100px',
            //minRow: 1,

            //placement
            float: true,
            dragOut: true,
            acceptWidgets: true,

            //item attrs
            resizeable: {handles:'all'},
            sizeToContent: true
        }
        const items = [
            {content: 'my first widget'}, // will default to location (0,0) and 1x1
            {w: 2, content: 'another longer widget!'}, // will be placed next at (1,0) and 2x1
            {x: 1, y: 1, content: '<img src="./src/components/icons/placeholder.png" alt="Placeholder" fluid />'}, //, locked:true, content:"locked"},
            {x: 2, y: 2, w: 3},
            {x: 4, y: 2},
            {x: 3, y: 1, h: 2},
            {x: 0, y: 6, w: 2, h: 2}
          ]
        for(const page of this.pages){
            GridStack.init(options, document.getElementById(`gs-${page.id}`)).load(items)
        }
    }
}


/* TODO: add save / load methods to component
ref: https://gridstackjs.com/demo/serialization.html#
// 3.1 full method saving the grid options + children (which is recursive for nested grids)
function saveFullGrid() {
  const serializedFull = grid.save(true, true);
  const serializedData = serializedFull.children;
  document.querySelector('#saved-data').value = JSON.stringify(serializedFull, null, '  ');
}
// 3.1 full method to reload from scratch - delete the grid and add it back from JSON
function loadFullGrid() {
  if (!serializedFull) return;
  grid.destroy(true); // nuke everything
  grid = GridStack.addGrid(document.querySelector('#gridCont'), serializedFull)
}
function clearGrid() {
  grid.removeAll();
}


// TODO: render with Vue to add <b-img tag
ref: https://gridstackjs.com/demo/vue3js_dynamic-render_grid-item-content.html

// TODO: understand height better
ref: https://gridstackjs.com/demo/column.html#
ref: https://github.com/gridstack/gridstack.js/issues/2583

// TODO: demo to understand attributes better
ref: https://gridstackjs.com/demo/index.html

*/




/* REMOVE - these are not needed
//GridStack.setupDragIn('.sidebar .grid-stack-item', { appendTo: 'body', helper: myClone });

const grids = GridStack.initAll(options)
grids.forEach(function (grid, i) {
    addEvents(grid, i);
    //grid.compact();
    grid.load(items);
});

// decide what the dropped item will be - for now just a clone but can be anything
function myClone(event) {
      const el = event.target.cloneNode(true);
      el.setAttribute('gs-id', 'foo'); // TEST why clone element is not used directly on drop #2231
      return el;
    }


function addEvents(grid, id) {
  let g = (id !== undefined ? 'grid' + id + ' ' : '');

  grid.on('added removed change', function(event, items) {
    let str = '';
    items.forEach(function(item) { str += ' (' + item.x + ',' + item.y + ' ' + item.w + 'x' + item.h + ')'; });
    console.log(g + event.type + ' ' + items.length + ' items (x,y w h):' + str );
  })
  .on('enable', function(event) {
    let grid = event.target;
    console.log(g + 'enable');
  })
  .on('disable', function(event) {
    let grid = event.target;
    console.log(g + 'disable');
  })
  .on('dragstart', function(event, el) {
    let n = el.gridstackNode;
    let x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
    let y = el.getAttribute('gs-y');
    console.log(g + 'dragstart ' + (n.content || '') + ' pos: (' + n.x + ',' + n.y + ') = (' + x + ',' + y + ')');
  })
  .on('drag', function(event, el) {
    let n = el.gridstackNode;
    let x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
    let y = el.getAttribute('gs-y');
    // console.log(g + 'drag ' + (n.content || '') + ' pos: (' + n.x + ',' + n.y + ') = (' + x + ',' + y + ')');
  })
  .on('dragstop', function(event, el) {
    let n = el.gridstackNode;
    let x = el.getAttribute('gs-x'); // verify node (easiest) and attr are the same
    let y = el.getAttribute('gs-y');
    console.log(g + 'dragstop ' + (n.content || '') + ' pos: (' + n.x + ',' + n.y + ') = (' + x + ',' + y + ')');
  })
  .on('dropped', function(event, previousNode, newNode) {
    if (previousNode) {
      console.log(g + 'dropped - Removed widget from grid:', previousNode);
    }
    if (newNode) {
      console.log(g + 'dropped - Added widget in grid:', newNode);
    }
  })
  .on('resizestart', function(event, el) {
    let n = el.gridstackNode;
    let rec = el.getBoundingClientRect();
    console.log(`${g} resizestart ${n.content || ''} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);

  })
  .on('resize', function(event, el) {
    let n = el.gridstackNode;
    let rec = el.getBoundingClientRect();
    console.log(`${g} resize ${n.content || ''} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);
  })
  .on('resizestop', function(event, el) {
    let n = el.gridstackNode;
    let rec = el.getBoundingClientRect();
    console.log(`${g} resizestop ${n.content || ''} size: (${n.w}x${n.h}) = (${Math.round(rec.width)}x${Math.round(rec.height)})px`);
  });
}*/


</script>

<style type="text/css">
  .grid-stack { background: white; }
  .grid-stack-item-content { background-color: rgb(231, 231, 231); }

img {
    max-width: 100%;
    height: auto;
}

</style>