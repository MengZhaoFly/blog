<template>
  <div>
    <p>组件2</p>
    <button @click="btnClick">click me</button>
  </div>
</template>
<script>
export default {
  methods: {
    btnClick: function () {
      console.log('comp2 cilck')
    }
  }
}
</script>