<template>
  <div id="app">
    <div class="content">
    <CustomPrpertiesPanel/>
    </div>
  </div>
</template>

<script>
import CustomPrpertiesPanel from './components/custom-properties-panel'
export default {
  name: 'app',
  components: {
    CustomPrpertiesPanel
  },
  data() {
    return {
      mainPage:{
        to: '/custom-properties-panel', 
        title: 'custom-properties-panel'
      }
    }
  }
}
</script>

<style>
*{
    touch-action: pan-y;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  touch-action: none;
}
body {
  margin: 0;
}
.router_ul {
  display: flex;
  justify-content: center;
  margin: 0;
  list-style: none;
  padding: 10px 0;
}
.router_ul li {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s;
}
.router_ul li.activeClass {
  background: #4d90fe;
  color: #fff;
  border: none;
}
</style>
