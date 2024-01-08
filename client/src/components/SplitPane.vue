<template>
    <div class="panel">
    <Splitpanes >
      <Pane min-size="5">1</Pane>
      <Pane min-size="5">2</Pane>
      <Pane min-size="5">3</Pane>
    </Splitpanes>
</div>
</template>

<script>
/*
ref: https://antoniandre.github.io/splitpanes/
must use the following in `vite.config.js`:
  ... ,
  optimizeDeps: {
    exclude: ['splitpanes']
  },
  ...
*/

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'


export default{
    name: 'SplitPane',
    components: { Splitpanes, Pane },
    data(){
        return {
        }
    },
    methods:{ 
    }

}

</script>

<style scoped>

.splitpanes__pane {
  box-shadow: 0 0 5px rgba(0, 0, 0, .2) inset;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
}


em.specs {
  font-size: 0.2em;
  line-height: 1;
  position: absolute;
  color: #bbb;
  bottom: 0.5em;
  left: 0;
  right: 0;
  text-align: center;
}


/* GENERAL STYLES 
html, body, #app {height: 100%;margin: 0;}
body {
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}

/* documentation link 
p {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #666;
  z-index: 10;
  font-size: 12px;
  
  a {color: inherit;}
}
*/


/* increase for touchscreen */

.splitpanes {
  background-color: #f2f2f2;

&__pane {
  justify-content: center;
  align-items: center;
  display: flex;
}

&__splitter {background-color: #ccc;position: relative;}

&__splitter:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: 0.4s;
}
&--vertical > &__splitter:before {left: -30px;right: -30px;}
&--horizontal > &__splitter:before {top: -30px;bottom: -30px;}
&__splitter:hover:before {background-color: rgba(255, 0, 0, 0.3);}
}


.panel {
    height: 100%;
    margin: 0;
font-family: Helvetica, Arial, sans-serif;
color: rgba(255, 255, 255, 0.8);
font-size: 5em;
}

.panel .text {
color: #999;
font-size: 15px;
text-align: center;
}

.panel .text em {
display: block;
margin-top: 0.5em;
color: #bbb;
font-size: 13px;
text-align: center;
}
</style>