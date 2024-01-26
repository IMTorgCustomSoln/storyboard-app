<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">

          <b-navbar-brand href="#">Logo</b-navbar-brand>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form right>
                <b-button class="reset" sz="sm" @click="resetPanes">Reset Panes</b-button>
              </b-nav-form>
            </b-navbar-nav>
      
        </b-navbar>
</template>
    
<script>
import { mapStores } from 'pinia'
import { useAppDisplay } from '@/stores/AppDisplay'
/*
import {useDisplayStore} from '@/main.js';
import WorkSessionIO from '@/components/modals/WorkSessionIO.vue';
import ModalAccount from '@/components/modals/ModalAccount.vue'
*/

export default {
  name: 'NavbarTop',
  components:{
    //WorkSessionIO,
    //ModalAccount
  },
  data(){
    return{
    }
  },
  mounted(){
  },
  computed:{
    ...mapStores(useAppDisplay),
  },
  methods:{
    resetPanes(){
        this.displayStore.initializeSplitPanes()
        const currentSizesByPane = Object.values(this.displayStore.getPanes).map(item => (
          {size: item.currentSize}
        ))
        //console.log(currentSizesByPane)
        this.displayStore.showPanes('resize', currentSizesByPane)
      }
  }
}
</script>


<style scoped>

.navbar{
    /*margin-bottom: 10px;*/
    padding-left: 10px;
    padding-right: 10px;
}

</style>