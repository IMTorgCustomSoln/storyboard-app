import {reactive} from 'vue'
import { defineStore } from "pinia";
import { getRandomIdOrHash } from '@/scripts/utils'
import { Board } from '@/stores/Board'

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
        getSelectedBoard(){
            const id = this.selectedBoardId
            if([null,undefined].indexOf(id)==-1){
              const selectedBoard = this.boards.filter(item => {
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
        }
    },
    actions:{
        async initializeStoryFromBackend(){
            //TODO:this will have to be accepted as JSON
            //ref: https://stackoverflow.com/questions/40201589/serializing-an-es6-class-object-as-json
            const DEMO = true
            const boards = []
            if(DEMO){
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
            const id = this.selectedBoardId
            if([null,undefined].indexOf(id)==-1){
              const selectedBoard = this.boards.filter(item => {
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
            const newBoard = reactive( new Board(description, groups) )       //TODO:review in future
            this.boards.push(newBoard)
        },
        removeBoard(index){
            this.boards.splice(index, 1)
            if(this.boards.length < 1){
                this.addBoard()
            }
            this.synchronizeSelectedBoard()
        },
        removeBoardById(id){
            const index = this.boards.findIndex((item)=>{
                item.id == id
            })
            this.boards.splice(index[0], 1)
            this.synchronizeSelectedBoard()
        },
        synchronizeSelectedBoard(){
            const ids = this.boards.map(item => item.id)
            if(ids.indexOf(this.selectedBoardId)==-1){
                this.selectedBoardId = ids[0]
            }

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






export class Layout{
    constructor(name, dimension, gridObj){
        this.id = getRandomIdOrHash(name)
        this.name = name
        this.dimension = dimension
        this.grid = gridObj
    }
}