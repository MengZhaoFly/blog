import { ref, computed } from 'vue';

export default function Clock() {
  const time = ref(new Date());
  const timeString = computed(() => {
    return time.value.toLocaleTimeString();
  })
  setInterval(() => {
    time.value = new Date()
  }, 1000);
  return {
    timeString
  }
}