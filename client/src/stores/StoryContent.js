import { defineStore } from "pinia";


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
        getBoards(){
            return this.boards
        },
        getLayouts(){
            return this.layouts
        }

    },
    actions:{
        initializeStoryFromBackend(){
            //TODO
            console.log(this.name)
            return -1
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
    constructor(description, images){
        this.description = description
        this.images = images
    }
}

export class Layout{
    constructor(name, dimension, gridObj){
        this.name = name
        this.dimension = dimension
        this.grid = gridObj
    }
}