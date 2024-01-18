import { defineStore } from 'pinia'
import { toRaw } from 'vue'


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
                    outline: 40,
                    image: 50,
                    layout: 50
                },
            },

            selectedBoardId: null
        }
    },
    getters:{
        getSplitPanesDefaultSize(){
            return this.splitPanes.defaultSize
        },
        getSplitPanesCurrentSize(){
            return this.splitPanes.currentSize
        },
        getSelectedBoardId(){
            return this.selectedBoardId
        }
    },
    actions:{
        setSelectedBoardId(id){
            this.$patch({
                selectedBoardId: id
            })
        },
        initializeSplitPanes(){
            const defaults = toRaw(this.getSplitPanesDefaultSize)
            this.$patch({
                splitPanes:{
                    currentSize:{
                        outline: defaults.outline,
                        image: defaults.image,
                        layout: defaults.layout
                    }
                }
            })
        },
        expandPane(paneName){
            const MaxSize = 200
            const ExpandRules = {
              Outline:()=>{
                this.$patch({
                    splitPanes:{
                        currentSize:{
                            outline: MaxSize,
                            image: 15,
                            layout: 15
                        }
                    }
                })

              },
              Image:()=>{
                this.$patch({
                    splitPanes:{
                        currentSize:{
                            outline: 15,
                            image: MaxSize,
                            layout: 15
                        }
                    }
                })

              }, 
              Layout:()=>{
                this.$patch({
                    splitPanes:{
                        currentSize:{
                            outline: 15,
                            image:15,
                            layout:  MaxSize
                        }
                    }
                })

              }, 
            }
            ExpandRules[paneName]()
        }
    }
})