import { defineStore } from 'pinia'


export const useAppDisplay = defineStore('display',{
    state: () => {
        return {
            exportAppStateFileName: 'WorkSession.gz',

            splitPanes:{
                defaultSize:{
                    outline: 40,
                    image: 50,
                    layout: 50
                },
                currentSize:{
                    outline: null,
                    image: null,
                    layout: null
                },
            }
        }
    },
    getters:{
        getSplitPanesDefaultSize(){
            return this.splitPanes.defaultSize
        },
    },
    actions:{
    }
})