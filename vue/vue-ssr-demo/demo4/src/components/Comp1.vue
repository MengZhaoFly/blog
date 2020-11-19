<template>
  <div>
    <p>组件1</p>
    <button @click="btnClick">click me</button>
  </div>
</template>
<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    console.log('数据预取')
    return store.dispatch('getUsername')
  },
  methods: {
    btnClick: function () {
      console.log('comp1 cilck')
    }
  }
}
</script>
