import {reactive} from 'vue'
import { defineStore } from "pinia";
import { getRandomIdOrHash } from '@/scripts/utils'

import { stringSvg } from "@/components/__tests__/images/groups";


export const useStoryContent = defineStore('story', {
    state(){
        return{
            name: null,
            selectedBoardId: null,
            boards: [],
            layouts: []
        }
    },
    getters:{
        getName(){
            return this.name
        },/*
        async getBoards(){
            return toRaw(this.boards)
        },*/
        getSelectedBoardId(){
            return this.selectedBoardId
        },
        getSelectedBoard(){
            const id = this.getSelectedBoardId
            if([null,undefined].indexOf(id)==-1){
              const selectedBoard = this.getBoards.filter(item => {
                if(item.id==id){ 
                  return true 
                }else{ 
                  return false
                }
              })
              if(selectedBoard.length==1){
                return selectedBoard[0]
              }
            }
            return null
        },
        getBoards(){
            return this.boards
        },
        getLayouts(){
            return this.layouts
        }
    },
    actions:{
        async initializeStoryFromBackend(){
            //TODO:this will have to be accepted as JSON
            //ref: https://stackoverflow.com/questions/40201589/serializing-an-es6-class-object-as-json
            const DEMO = true
            const boards = []
            if(DEMO){
                //const parser = new DOMParser()
                //const lineImage = parser.parseFromString( stringSvgCircle, "image/svg+xml" )
                //console.log(lineImage)
                const lineImage = stringSvg
                boards.push(...[
                {
                  description: 'Tom runs after Jerry',
                  groups: [lineImage],
                },
                {
                  description: 'Jerry runs into mouse hole',
                  groups: [],
                },
                {
                  description: 'Tom dives for mouse hole',
                  groups: [],
                },
                {
                  description: 'Tom gets stuck in mouse hole',
                  groups: [],
                }
            ])
            }
            boards.forEach(board => {
                this.addBoard(board.description, board.groups)
            })
            return true
        },
        isSelectedBoardAvailable(){
            const id = this.getSelectedBoardId
            if([null,undefined].indexOf(id)==-1){
              const selectedBoard = this.getBoards.filter(item => {
                if(item.id==id){ 
                  return true 
                }else{ 
                  return false
                }
              })
              if(selectedBoard.length>0){
                return true
              }else{
                return false
              }
            }else{
              return false
            }
        },
        setSelectedBoardId(id){
            this.selectedBoardId = id
        },
        async setNewSelectedBoard(){
          if(this.isSelectedBoardAvailable()==false){
            const newBoardId = await this.boards[0].id
            this.setSelectedBoardId(newBoardId)
          }
        },
        addBoard(description, groups){
            const newBoard = reactive( new Board(description, groups) )
            this.boards.push(newBoard)
        },
        removeBoard(index){
            this.boards.splice(index, 1)
            if(this.getBoards.length < 1){
                this.addBoard()
            }
        },
        removeBoardById(id){
            const index = this.boards.findIndex((item)=>{
                item.id == id
            })
            this.boards.splice(index[0], 1)
        },
        addLayout(name, dimension, gridObj){
            const newLayout = new Layout(name, dimension, gridObj)
            this.layouts.push(newLayout)
        },
        removeLayout(id){
            const index = this.layouts.findIndex((item)=>{
                item.id == id
            })
            this.layouts.splice(index[0], 1)
        },

    }
})


//TODO:may need to change to common object
//ref: https://stackoverflow.com/questions/67894487/vue-3-reactivity-not-triggered-from-inside-a-class-instance
export class Board{
    constructor(description, groups=[]){
        const input = 5
        this.id = getRandomIdOrHash(input)
        this.description = description
        this.imageEditor = {
            selectedLayer: [0],
            layers: []// { name: 'layer-1', id: 0, group: null }]    //image: null} ]
        }
        if(groups.length>0){
            for(const group of groups){
                this.addLayer(group)
            }
        }else{
            this.addLayer()
        }
        this.ensureUniqueCheckMark()
        this._brighten = false
        }

        //this.getImageGroup = function(){
        getImageGroup(){
            const groups = []
            const nonNullGroups = this.imageEditor.layers.filter(item =>{
                if(item.group!=null){
                    return true
                }else{
                    return false
                }
            })
            .map(item => item.group)
            nonNullGroups.length > 0 ? groups.push(...nonNullGroups) : groups.push(...[])
            return groups
        }
        //this.getImage = function(){
        getImage(){
            function fillSvgBase(id, groups){
                const strGroups = groups.join(``)
                return `<svg id=${id} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                        <g>
                        <rect x="0" y="0" width="1000" height="1000" style="fill:white"></rect>
                        ${strGroups}
                        </g>
                        </svg>`
            }
            if(this.getImageGroup().length>0){
                return fillSvgBase(this.id, this.getImageGroup())
            }else{
                return null
            }
        }
        //this.getSelectedLayer = function(){
        getSelectedLayer(){
            return this.imageEditor.selectedLayer[0]
        }
        //this.setSelectedLayer = function(id){
        setSelectedLayer(id){
            this.imageEditor.selectedLayer.length = 0
            this.imageEditor.selectedLayer.push(id)
        }
        //this.getLayers = function(){
        getLayers(){
            return this.imageEditor.layers
        }
        //this.addLayer = function(group) {
        addLayer(group){
            const code = getRandomIdOrHash(5)
            this.imageEditor.layers.push({
                name: `layer- ${code}`,
                id: code,
                checked: false,
                group: group ? group : null
            })
            return code
        }
        //this.removeLayer = function(index) {
        removeLayer(index){
            this.imageEditor.layers.splice(index, 1)
            const length = this.imageEditor.layers.length
            if(length < 1){
                this.addLayer()
                const id = this.imageEditor.layers[0].id
                const sim_event = {
                    target:{
                        checked: true,
                        value: id
                    }
                }
                //TODO:fix
                this.uniqueCheck(sim_event)
            }
            //TODO:wtf
            const ids = this.imageEditor.layers.map(item => item.id)
            const selectedItem = this.imageEditor.selectedLayer[0]
            const isCheckedInLayers = ids.indexOf(selectedItem) 
            if(isCheckedInLayers==-1){
                this.imageEditor.selectedLayer = []
                this.imageEditor.selectedLayer.push(ids[0])
            }
        }
        //this.ensureUniqueCheckMark = function(){
        ensureUniqueCheckMark(){
            /*
            const checked = this.imageEditor.layers.filter(item => {
                if(item.checked==true){
                    return true
                }else{
                    return false
                }
            })
            if(checked.length != 1){
                this.imageEditor.layers.forEach(item => item.checked == false)
                this.imageEditor.layers[0].checked = true
            }*/
            console.log(this.imageEditor.selectedLayer[0])
            if([0,null,undefined].indexOf(this.imageEditor.selectedLayer[0])!=-1){
                console.log(this.imageEditor.selectedLayer)
                this.imageEditor.selectedLayer = []
                this.imageEditor.selectedLayer.push(this.imageEditor.layers[0].id)
            }
        }
    }

//}



export class Layout{
    constructor(name, dimension, gridObj){
        this.id = getRandomIdOrHash(name)
        this.name = name
        this.dimension = dimension
        this.grid = gridObj
    }
}