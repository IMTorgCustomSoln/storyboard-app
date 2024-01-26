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
        getBoards(){
            return this.boards
        },
        getLayouts(){
            return this.layouts
        }
    },
    actions:{
        async initializeStoryFromBackend(){
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
                  image: lineImage,
                },
                {
                  description: 'Jerry runs into mouse hole',
                  image: lineImage,
                },
                {
                  description: 'Tom dives for mouse hole',
                  image: lineImage,
                },
                {
                  description: 'Tom gets stuck in mouse hole',
                  image: '',
                }
            ])
            }
            boards.forEach(board => {
                this.addBoard(board.description)
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
        setNewSelectedBoard(){
          if(this.isSelectedBoardAvailable()==false){
            const newBoardId = this.boards[0].id
            this.setSelectedBoardId(newBoardId)
          }
        },
        addBoard(description, images){
            const newBoard = new Board(description, images)
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



export class Board{
    constructor(description){
        const input = 5
        this.id = getRandomIdOrHash(input)
        this.description = description
        this.imageEditor = {
            selectedLayer: [0],
            layers: [ { name: 'layer-1', id: 0, group: null }]    //image: null} ]
        }
        this._brighten = false
    }
    getImage(){
        function fillSvgBase(id, groups){
            const strGroups = groups.join(``)
            return `<svg id=${id} viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">${strGroups}</svg>`
        }
        const groups = []
        const nonNullGroups = this.imageEditor.layers.filter(item =>{
            if(item.group!=null){
                return true
            }else{
                return false
            }
        })
        .map(item => item.group)
        nonNullGroups.length > 0 ? groups.push(...nonNullGroups) : groups.push(...[stringSvg])
        return fillSvgBase(this.id, groups)
    }
    getSelectedLayer(){
        return this.imageEditor.selectedLayer[0]
    }
    getLayers(){
        return this.imageEditor.layers
    }
    addLayer() {
        const code = getRandomIdOrHash(5)
        this.imageEditor.layers.push({
            name: `layer- ${code}`,
            id: code,
            image: null
        })
    }
    removeLayer(index) {
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
}



export class Layout{
    constructor(name, dimension, gridObj){
        this.id = getRandomIdOrHash(name)
        this.name = name
        this.dimension = dimension
        this.grid = gridObj
    }
}