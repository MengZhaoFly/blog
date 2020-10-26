import { ref } from 'vue';
export default function useDrag() {
  const x = ref(0);
  const y = ref(0);
  const handleMove = (e) => {
    const pageX = e.touches[0].pageX;
    const pageY = e.touches[0].pageY;
    x.value = pageX;
    y.value = pageY;
  }
  return {
    x,
    y,
    handleMove
  }
}