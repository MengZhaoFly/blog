<template>
  <div>{{now}}</div>
</template>
<script>
// 以下代码为一个Clock组件，请将该组件根据以下要求改造：
// 1、Clock组件，假设在页面上其他地方需要复用这个 Clock 逻辑（需要每隔一秒获取到一次新的时间），
// 2、优化now()方法。
export default {
  data() {
    return {
      date: new Date(),
    };
  },
  mounted() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  computed: {
    now() {
      const day = this.date.getDay();
      let dayStr;
      if (day === 0) {
        dayStr = "星期日";
      } else if (day === 1) {
        dayStr = "星期一";
      } else if (day === 2) {
        dayStr = "星期二";
      } else if (day === 3) {
        dayStr = "星期三";
      } else if (day === 4) {
        dayStr = "星期四";
      } else if (day === 5) {
        dayStr = "星期五";
      } else if (day === 6) {
        dayStr = "星期六";
      }
      return dayStr + this.date.toLocaleTimeString();
    },
  },
};
</script>
<style>
</style>