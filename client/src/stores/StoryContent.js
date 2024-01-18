import { defineStore } from "pinia";
import { toRaw } from "vue";
import '@/scripts/utils'

import { stringSvg } from "@/components/__tests__/images/line";


export const useStoryContent = defineStore('story', {
    state(){
        return{
            name: null,
            boards: [],
            layouts: []
        }
    },
    getters:{
        getName(){
            return this.name
        },
        async getBoards(){
            return toRaw(this.boards)
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
                this.addBoard(
                    board.description,
                    board.image
                    )
            })
            return true
        },
        addBoard(description, images){
            const newBoard = new Board(description, images)
            this.boards.push(newBoard)
        },
        addLayout(name, dimension, gridObj){
            const newLayout = new Layout(name, dimension, gridObj)
            this.layouts.push(newLayout)
        }

    }
})

export class Board{
    constructor(description, image){
        this.id = description.hashCode()
        this.description = description
        this.image = image
    }
}

export class Layout{
    constructor(name, dimension, gridObj){
        this.name = name
        this.dimension = dimension
        this.grid = gridObj
    }
}