<template>
  <div>
  <Item />
  </div>
</template>

<script>
// import { reactive, watchEffect } from 'vue'
import Item from './src/components/Item.vue';

export default {
  name: 'App',
  components: {
    Item: Item
  }
}
</script>

<style>

</style>
