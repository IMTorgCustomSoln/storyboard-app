<template>
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav >
            <b-nav-item >Logo</b-nav-item>
          </b-navbar-nav>
      
          <!--
            <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <WorkSessionIO></WorkSessionIO>
            
            <b-button 
              size="sm" 
              class="my-2 my-sm-0" 
              variant="outline-light" 
              style="margin-left:5px"
              type="button"
              v-b-modal="'account-modal'"
              @click="$bvModal.show('account-modal')"
              >User
            </b-button>
            <ModalAccount/>
            </b-nav-form>
            
            Open modal from dropdown, ref: https://stackoverflow.com/questions/65298847/how-can-i-modify-a-dropdown-item-in-bootstrap-vue-to-open-a-modal
            <b-nav-item-dropdown text="User" right>
              <b-dropdown-item href="#">Account</b-dropdown-item>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
            </b-nav-item-dropdown>
            
            </b-navbar-nav>-->
        </b-navbar>
</template>
    
<script>
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
  },
  methods:{
  }
}
</script>


<style scoped>
/*
.navbar{
    margin-bottom: 10px;
}*/

</style>