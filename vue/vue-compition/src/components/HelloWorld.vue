<template>
  <div>
    <!-- fragment -->
    <h2 @touchmove="handleMove"
     :style="{left: `${x}px`, top: `${y}px`, position: 'absolute'}">拖拽</h2>
    <DragAble />
  </div>
</template>
<script>
// 一段普通的文本 <div>哈哈哈哈</div>
import Txt from './Txt';
import withDrag from '../withDrag.js';

const DragAble  = withDrag(Txt);
// <div touchMove="handleMove"><div>哈哈哈哈</div></div>
// DragAble 拥有了 拖拽事件
export default {
  components: {
    'DragAble': DragAble
  },
  data() {
    return {
      x: 0, y: 0
    }
  },
  methods: {
    handleMove(e) {
      const x = e.touches[0].pageX;
      const y = e.touches[0].pageY;
      this.x = x;
      this.y = y;
    }
  }
}
</script>
