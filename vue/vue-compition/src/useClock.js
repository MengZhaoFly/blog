import { onMounted, computed, ref } from 'vue';
// d = new Date()
// onMounted setinterval
// computed
// 返回计算完之后的值
// 2.0  []  变了 import router from 'xxx.js' router.push
// 3.0 router.addRouter()  removeRouter()
// loading开 请求  loading关
// ... 
// div.middle
// div.left
// div.right
// if ([] == false) {console.log(1);};
// if ("" == 0)
// if (0 === 0)
// if ({} == false ) {console.log(2);};
// if ([]) {console.log(3);};
// if ([1] == [1]) {console.log(4);};
// 基本数据类型 值 存在 栈里面
// 复杂数据类型 值 存在 堆里面
export default function useClock() {
  const d = ref(new Date());
  onMounted(() => {
    setInterval(() => {
      d.value = new Date()
    }, 1000)
  })
  const timeStr = computed(() => {
    const arr = ['星期天', '星期1', '星期2', '星期3', '星期4', '星期5']
    let week = arr[d.value.getDay()];
    return week + d.value.toLocaleTimeString();
  });
  return timeStr;
}
