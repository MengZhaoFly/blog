root.addEventListener('mousedown', event => {
  // 滑动需要 【前一张图片 当前这张图片 下一张图片】 相互配合完成
  let startX = event.clientX, startY = event.clientY;
  // 处理负值
  let lastPosition = (positon - 1 + this.data.length) % this.data.length;
  let nextPositon = (positon + 1) % this.data.length;

  let current = children[positon];
  let last = children[lastPosition];
  let next = children[nextPositon];

  current.style.transition = 'none';
  last.style.transition = 'none';
  next.style.transition = 'none';
  // 0 0px 1 -500px  2 -1000px 以此类推
  current.style.transform = `translateX(${-750 * positon}px)`;          // 当前图片的正确的位置
  last.style.transform = `translateX(${-750 - 750 * lastPosition}px)`;  // 前一个
  next.style.transform = `translateX(${750 - 750 * nextPositon}px)`;   // 后一个

  let move = event => {
    current.style.transform = `translateX(${event.clientX - startX - 750 * positon}px)`;
    last.style.transform = `translateX(${event.clientX - startX - 750 - 750 * lastPosition}px)`;
    next.style.transform = `translateX(${event.clientX - startX + 750 - 750 * nextPositon}px)`;

    // console.log(event.clientX - startX, event.clientY - startY);
  }

  let up = event => {
    // 抬手 判断 
    // 到底下一张还是上一张
    let offset = 0;

    if (event.clientX - startX > 250) {
      offset = 1;
    } else if (event.clientX - startX < -250) {
      offset = -1;
    }

    current.style.transition = 'ease 0.2s';
    last.style.transition = 'ease 0.2s';
    next.style.transition = 'ease 0.2s';

    current.style.transform = `translateX(${offset * 750 - 750 * positon}px)`;
    last.style.transform = `translateX(${offset * 750 - 750 - 750 * lastPosition}px)`;
    next.style.transform = `translateX(${offset * 750 + 750 - 750 * nextPositon}px)`;
    // offset 负值 为 左滑
    positon = (positon - offset + this.data.length) % this.data.length;

    // baseX = baseX + event.clientX - startX, baseY = baseY + event.clientY - startY;
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseup', up);
  }

  // 监听在 document 上的事件，即使移到浏览器的外面也会触发
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up);
});