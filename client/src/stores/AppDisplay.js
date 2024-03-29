import { defineStore } from 'pinia'


export const useAppDisplay = defineStore('display',{
    state: () => {
        return {
            exportAppStateFileName: 'WorkSession.gz',

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
            }
        }
    },
    getters:{
      rotateText(){
          return { transform: 'rotate(' + this.splitPanes.rotateText.turn + 'turn)'}
       },
    },
    actions:{
        setPane(pane, attr, newValue){
            this.splitPanes.panes[pane][attr] = newValue
        },
        initializeSplitPanes(){
            for(const pane of Object.values(this.splitPanes.panes)){
                pane.currentSize = pane.defaultSize
            }
        },
        showPanes(type, panes){
            this.splitPanes.panes.outline.currentSize = panes[0].size
            this.splitPanes.panes.image.currentSize = panes[1].size
            this.splitPanes.panes.layout.currentSize = panes[2].size
            if(panes[0].size <= 15){
              this.setPane('outline', 'showContent', false)
              this.setPane('outline', 'headerStyle', this.rotateText)
            }else{
              this.setPane('outline', 'showContent', true)
              this.setPane('outline', 'headerStyle', '')
            }
            if(panes[1].size <= 20){
              this.setPane('image', 'showContent', false)
              this.setPane('image', 'headerStyle', this.rotateText)
            }else{
              this.setPane('image', 'showContent', true)
              this.setPane('image', 'headerStyle', '')
            }
            if(panes[2].size <= 15){
              this.setPane('layout', 'showContent', false)
              this.setPane('layout', 'headerStyle', this.rotateText)
            }else{
              this.setPane('layout', 'showContent', true)
              this.setPane('layout', 'headerStyle', '')
            }
          },
        expandPane(paneName){
            const MaxSize = 200
            const ExpandRules = {
                  Outline:()=>{
                    this.setPane('outline','currentSize', MaxSize)
                    this.setPane('image','currentSize', 15)
                    this.setPane('layout','currentSize', 15)
                  },
                  Image:()=>{
                    this.setPane('outline','currentSize', 15)
                    this.setPane('image','currentSize', MaxSize)
                    this.setPane('layout','currentSize', 15)
    
                  }, 
                  Layout:()=>{
                    this.setPane('outline','currentSize', 15)
                    this.setPane('image','currentSize', 15)
                    this.setPane('layout','currentSize', MaxSize)
                  } 
                }
            ExpandRules[paneName]()
            const currentSizesByPane = Object.values(this.splitPanes.panes).map(item => (
              {size: item.currentSize}
            ))
            this.showPanes('resize', currentSizesByPane)
          },


    }
})