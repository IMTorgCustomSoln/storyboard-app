<template>
  <div id="app">
    <NavbarTop/>
    <SplitPane>
      <template v-slot:outline>
        <BoardOutline/>
      </template>
      <template v-slot:image>
        <ImageEditor/>
      </template>
      <template v-slot:layout>
        <PageLayout/>
      </template>
    </SplitPane>
    <!--<FooterBar class="footer"></FooterBar>-->
  </div>
</template>

<script>
//import {useDisplayStore} from '@/main.js';
import NavbarTop from '@/components/NavbarTop.vue';
import SplitPane from '@/components/SplitPane.vue';
//import FooterBar from '@/components/FooterBar.vue';

import BoardOutline from '@/components/panels/BoardOutline.vue';
import ImageEditor from '@/components/panels/ImageEditor.vue';
import PageLayout from '@/components/layout/PageLayout.vue'

export default {
name: `App`,
components:{
  NavbarTop,
  SplitPane,
  //FooterBar,

  BoardOutline,
  ImageEditor,
  PageLayout
},
data() {
  return {
  };
},
computed:{
},
methods:{
}
};
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .NOT_USED_footer {
    min-height: 100vh;  /*TODO:fix to bottom */
  }
</style>