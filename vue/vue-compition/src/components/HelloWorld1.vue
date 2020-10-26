<template>
  <div @touchmove="handleMove"
     :style="{left: `${x}px`, top: `${y}px`, position: 'absolute'}">
     useDrag
  </div>
</template>
<script>
import useDrag from '../useDrag';
export default {
  setup() {
    const {x, y, handleMove} = useDrag()
    return {
      x, y, handleMove
    };
  }
}
</script>
