<template>
    <!-- Add Header -->
    <b-row>
        <b-col style="text-align:center;">
            <h1>Layout</h1>
        </b-col>
    </b-row>

    <!--Add Navbar-->
    <b-row>
      <b-col>
        <b-navbar type="light" variant="">
          <b-navbar-nav>
          <b-button 
              size="sm" 
              style="margin:5px"
              type="button"
              @click="saveGrid"
              >Save
            </b-button>
            <b-nav-item-dropdown text="Choose layout" right>
              <div v-for="option in aspectOptions" :key="option.id">
                <b-dropdown-item @click="selectLayout(option.name)">
                  {{ option.name }} - ({{ option.layout }})
                </b-dropdown-item>
              </div>

            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar>
      </b-col>
    </b-row>

    <!-- Add Content -->
    <div class="container">
      <div class="container-content">
        <div v-bind="currentGridName">{{ currentGridName }}</div>
        <b-row>
          <b-col cols="2" style="margin:5px">
            <b-form-input
              placeholder="Layout name"
              v-model="currentGrid.name"
              @input="event => this.currentGrid.name = event.target.value"
              ></b-form-input>
          </b-col>
        </b-row>
        <div v-for="(page, id) in pages" :key="id">
            <b-row>
                <b-col cols="8" class="mx-auto">
                    <div>Page-{{id}}</div>
                    <b-card>
                        <b-aspect :aspect="selectedAspect.layout">
                            <div v-bind:id="'gs-'+id" class="grid-stack"></div>
                        </b-aspect>
                    </b-card>
                </b-col>
            </b-row>
        </div>
      </div>
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
          savedGrids: [],    //TODO:save to store
          currentGrid: [],
          currentGridName: null,   //TODO:fix workflow

          aspectOptions:[
            {id:0, name:'template: default', layout: '8.5:11', itemWidth:4, itemHeight: 6},
            {id:1, name:'template: ppt', layout: '11:8.5', itemWidth:6, itemHeight: 4},
          ],
          selectedAspect:{name:'default', layout: '8.5:11', itemWidth:4, itemHeight: 6},
          pages: [
                {page: 0, id: 0},
                {page: 1, id: 1},
            ],

          gridOptions: {
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
        }
    },
    mounted() {
        this.initialize()
    },
    methods:{
      initialize(){
        const NUMBER_OF_ITEMS = 12
        const items = Array.apply(null, Array( NUMBER_OF_ITEMS )).map(function (x, i) { return {id:i} })

        const ITEMS_PER_PAGE = 9
        const NUMBER_OF_PAGES = Math.floor( items.length / ITEMS_PER_PAGE ) + 1
        this.pages = Array.apply(null, Array( NUMBER_OF_PAGES )).map(function (x, i) { return {id:i, page:i} })
        
        items.forEach((item, index) => {
          const pageIndex = Math.floor(index / ITEMS_PER_PAGE)
          const itemsOnPageIndex = index - (pageIndex * ITEMS_PER_PAGE)

          const itemsPerRow = this.gridOptions.column / this.selectedAspect.itemWidth;
          const colIndex = itemsOnPageIndex % itemsPerRow  
          const rowIndex = Math.floor(itemsOnPageIndex / itemsPerRow)

          item.x = colIndex * this.selectedAspect.itemWidth;
          item.y = rowIndex * itemsOnPageIndex
          item.w = this.selectedAspect.itemWidth;
          item.h = this.selectedAspect.itemHeight;

          item.content = '<img src="./src/components/icons/placeholder.png" alt="Placeholder" fluid />' //, locked:true, content:"locked"},
        })

        for(const [idx, page] of this.pages.entries()){
          const itemIndex = (ITEMS_PER_PAGE) * idx
          const selectedItems = items.slice(itemIndex, (itemIndex + ITEMS_PER_PAGE)  )
          const pageGrid = GridStack.init(
            this.gridOptions, 
            document.getElementById(`gs-${page.id}`)
            ).load(selectedItems)
          this.currentGrid.push(pageGrid)
        }
      },
      selectLayout(layout){
        this.selectedAspect = layout
      },
      saveGrid(){
        const serializedGrids = []
        for(const grid of this.currentGrid){
          const serializedFull = grid.save(true, true);
          //const serializedData = serializedFull.children;
          serializedGrids.push( JSON.stringify(serializedFull, null, '  ') )
        }
        this.savedGrids[this.selectedAspect.name] = serializedGrids
        console.log(this.savedGrids)
      },
      loadFullGrid() {
        /* 3.1 full method to reload from scratch - delete the grid and add it back from JSON
        if (!serializedFull) return;
        grid.destroy(true); // nuke everything
        grid = GridStack.addGrid(document.querySelector('#gridCont'), serializedFull)
        */
      },
      clearGrid() {
        this.currentGrid.removeAll();
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


<style >
/*TODO: this should be `scoped`*/

.container{
  height: 1000px;      /*TODO: scrolling is good, but must make the container the height of the screen*/
}
.container-content{
  height: 1000px;
  overflow:auto;
}

.grid-stack { background: white; }
.grid-stack-item-content { background-color: rgb(231, 231, 231); }

img {
    max-width: 100%;
    height: auto;
}

.navbar {
  background-color: rgb(221, 220, 220);
}

</style>