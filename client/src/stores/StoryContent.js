import { defineStore } from "pinia";
import { getRandomIdOrHash } from '@/scripts/utils'

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
        },/*
        async getBoards(){
            return toRaw(this.boards)
        },*/
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
        removeBoard(index){
            this.boards.splice(index, 1)
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
    constructor(description, image){
        let input = 0
        if(description.length<1){
            input = 7
        } else {
            input = description
        }
        this.id = getRandomIdOrHash(input)
        this.description = description
        /*TODO: image is initialized with <svg><image>
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <image href="mdn_logo_only_color.png" height="200" width="200" />
        </svg>
        */
        this.image = image
        //TODO:add imageEditor:{layers...
        this._brighten = false
    }/*
    TODO:add methods here
    * save layers to image
    * addLayer()
    * removeLayer()
    */
}

export class Layout{
    constructor(name, dimension, gridObj){
        this.id = getRandomIdOrHash(name)
        this.name = name
        this.dimension = dimension
        this.grid = gridObj
    }
}