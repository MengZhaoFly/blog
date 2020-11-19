<template>
  <div>
    <p>组件1</p>
    <button @click="btnClick">click me</button>
    <h3>
      {{ count }}
    </h3>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('getUsername')
  },
  methods: {
    btnClick: function () {
      console.log('comp1 cilck')
    }
  },
  computed:{
    count() {
      //返回获取到的数据
      return this.$store.state.username
    }
  }
}
</script>
