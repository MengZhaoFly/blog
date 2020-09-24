<template>
  <div>
  <Todo />
  </div>
</template>

<script>
// import { reactive, watchEffect } from 'vue'
import Todo from './components/Todo';

export default {
  name: 'App',
  components: {
    Todo: Todo
  }
  // setup() {
  //   const obj = reactive({
  //     a: 1, b: 2
  //   })
  //   watchEffect(() => {
  //     console.log(obj.a)
  //   })
  //   setTimeout(() => {
  //     obj.a = Date.now()
  //   }, 2000);
  // }
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
