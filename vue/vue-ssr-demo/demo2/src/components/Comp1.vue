<template>
  <div>
    <p>组件1</p>
    <button @click="btnClick">click me</button>
  </div>
</template>
<script>
export default {
  methods: {
    btnClick: function () {
      console.log('comp1 cilck')
    }
  }
}
</script>
