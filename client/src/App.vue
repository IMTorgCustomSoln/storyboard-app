<template>
  <div id="app">
    <NavbarTop/>
    <SplitPane>
      <template v-slot:outline>
        <DragItem/>
      </template>
      <template v-slot:image>
        <ImagePanel/>
      </template>
      <template v-slot:layout>
        <!-- content for the header slot -->
      </template>
    </SplitPane>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
//import {useDisplayStore} from '@/main.js';
import NavbarTop from '@/components/NavbarTop.vue';
import SplitPane from '@/components/SplitPane.vue';
import FooterBar from '@/components/FooterBar.vue';

import DragItem from '@/components/panels/DragItem.vue';
import ImagePanel from '@/components/panels/ImagePanel.vue';

export default {
name: `App`,
components:{
  NavbarTop,
  SplitPane,
  FooterBar,

  DragItem,
  ImagePanel
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
  .content {
    /*  */
  }
</style>