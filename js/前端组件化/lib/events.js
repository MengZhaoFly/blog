// let element = document.body;
// enableEvent();
export default function enableEvent(element) {
  let contexts = Object.create(null);
  let MOUSE_SYMBOL = Symbol('mouse');
  // pc undefined
  // mobile null
  if (element.ontouchstart !== null) {
    element.addEventListener('mousedown', (event) => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = event => {
        move(event, contexts[MOUSE_SYMBOL]);
      }
      let mouseend = event => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseend);
      }
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseend);
    })
  }
  element.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier])
    }
  })
  element.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier])
    }
  })
  element.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier])
    }
  })
  // 系统事件进来：弹窗
  element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier])
      delete contexts[touch.identifier];
    }
  })
  // tap
  // pan panstart panmove panend
  // flick 快速扫过
  // press pressstart pressend
  function start(point, contexts) {
    contexts.startX = point.clientX;
    contexts.startY = point.clientY;
    contexts.moves = [];
    contexts.isTap = true;
    contexts.isPan = false;
    contexts.isPress = false;
    contexts.timeoutHandler = setTimeout(() => {
      // 500 之后发现 还要考虑是不是滑动事件
      if (contexts.isPan) {
        return;
      }
      // 不滑动 就是 press
      contexts.isTap = false;
      contexts.isPan = false;
      contexts.isPress = true;
    }, 500);
  }
  function move(point, contexts) {
    let dx = point.clientX - contexts.startX,
    dy = point.clientY - contexts.startY;
    // 如果移动了 10px 且之前 没有 pan 过 就是 panStart
    if (dx ** 2 + dy ** 2 > 100 && !contexts.isPan) {
      contexts.isTap = false;
      contexts.isPan = true;
      contexts.isPress = false;
      console.log('panStart')
      let e = new CustomEvent('panstart');
      element.dispatchEvent(e);
    }
    // 
    if (contexts.isPan) {
      contexts.moves.push({
        dx, dy, t: Date.now()
      })
      // 只要 最后 300ms 的移动距离
      contexts.moves = contexts.moves.filter(r => Date.now() - r.t < 300);
      let e = new CustomEvent('pan', {
        detail: {
          startX: contexts.startX, startY: contexts.startY,
          clientX: point.clientX, clientY: point.clientY
        }
      })
      element.dispatchEvent(e);
    }
  }
  function end(point, contexts) {
    if (contexts.isPan) {
      console.log('panend')
      let e = new CustomEvent('panend', {
        detail: {
          startX: contexts.startX, startY: contexts.startY,
          clientX: point.clientX, clientY: point.clientY
        }
      })
      element.dispatchEvent(e);
    }
    if (contexts.isTap) console.log('tap')
    if (contexts.isPress) console.log('isPress')
    if (contexts.isPan) {
      // 最后一次距离
      let dx = point.clientX - contexts.startX,
          dy = point.clientY - contexts.startY;
      // 最早的一次的 距离
      let record = contexts.moves[0];
      // 最早的一次距离和最后的一次距离之差 / 时间
      let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
      let isFlick = speed > 2.5;
      if (isFlick) {
        console.log('flick')
      }
    }
    // 抬手 clear
    clearTimeout(contexts.timeoutHandler)
  }
  function cancel() {}
}