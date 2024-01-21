import { defineStore } from 'pinia'


export const useAppDisplay = defineStore('display',{
    state: () => {
        return {
            exportAppStateFileName: 'WorkSession.gz',
            selectedBoardId: null,

            splitPanes:{
                rotateText:{
                    turn: 0.25
                },
                panes: {
                    outline: {
                        name: 'outline',
                        defaultSize: 40,
                        currentSize: 40,
                        showContent: true,
                        headerStyle: ''
                    },
                    image: {
                        name: 'image',
                        defaultSize: 50,
                        currentSize: 50,
                        showContent: true,
                        headerStyle: ''
                    },
                    layout: {
                        name: 'layout',
                        defaultSize: 50,
                        currentSize: 50,
                        showContent: true,
                        headerStyle: ''
                    },
                },
                //...


            }
        }
    },
    getters:{
        getSelectedBoardId(){
            return this.selectedBoardId
        },
        getPanes(){
            return this.splitPanes.panes
        }
    },
    actions:{
        setSelectedBoardId(id){
            this.selectedBoardId = id
        },
        setPane(pane, attr, newValue){
            this.splitPanes.panes[pane][attr] = newValue
        },
        initializeSplitPanes(){
            for(const [name, pane] of Object.entries(this.splitPanes.panes)){
                pane.currentSize = pane.defaultSize
            }
        }
    }
})