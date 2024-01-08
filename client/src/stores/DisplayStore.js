import { defineStore } from 'pinia'


const DisplayStore = defineStore('display',{
    state: () => {
        return {
            exportAppStateFileName: 'WorkSession.gz',
        }
    },
    getters:{
    },
    actions:{
    }
})

export default DisplayStore