<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- 也要同样的拖拽 功能
  复用：mixIn   高阶组件    compition  
  函数式编程：高阶函数(bind)=高阶组件 curry ....
  function curry(fn) {
    return function() {}
  }
   -->
  <h2>拖拽2</h2>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <HelloWorld1 />
  <Clock />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HelloWorld1 from './components/HelloWorld1.vue'
import Clock from './components/Clock';
// option api  2.0
// compition api  3.0
export default {
  name: 'App',
  components: {
    HelloWorld,
    HelloWorld1,
    Clock
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
