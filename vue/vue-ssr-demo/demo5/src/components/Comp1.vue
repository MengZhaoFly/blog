<template>
  <div>
    <p>组件</p>
    <button @click="btnClick">click me</button>
  </div>
</template>
<script>
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('getUsername')
  },
  methods: {
    btnClick: function () {
      console.log('comp1 cilck')
    }
  }
}
</script>
