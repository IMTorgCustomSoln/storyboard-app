import {reactive} from 'vue'
import { getRandomIdOrHash } from '@/scripts/utils'


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
            this.imageEditor.selectedLayer = []
            this.imageEditor.selectedLayer.push(id)
        }
        //this.getLayers = function(){
        /*
        getLayers(){
            return this.imageEditor.layers
        }*/
        //this.addLayer = function(group) {
        addLayer(group){
            const code = getRandomIdOrHash(5)
            const newLayer = {
                name: `layer- ${code}`,
                id: code,
                checked: false,
                group: group ? group : null
            }
            this.imageEditor.layers.push( reactive(newLayer) )
            this.imageEditor.selectedLayer = []
            this.imageEditor.selectedLayer.push( code )
            return code
        }
        appendToLayer(id, newGroup){
            const ids = this.imageEditor.layers.map(item => item.id)
            const index = ids.indexOf(id)
            this.imageEditor.layers[index].group = newGroup
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
            if([0,null,undefined].indexOf(this.imageEditor.selectedLayer[0])!=-1){
                this.imageEditor.selectedLayer = []
                this.imageEditor.selectedLayer.push(this.imageEditor.layers[0].id)
            }
        }
    }