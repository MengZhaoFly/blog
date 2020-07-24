import { createElement, Text, Wrapper } from './createElement.js';

class Carousel {
  constructor(config) {  // config
    // console.log('Parent::config', config);
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }

  // set className (v) { // property
  //     console.log('Parent::className', v);
  // }

  setAttribute(name, value) {    // attribute
    // console.log('Parent::setAttribute', name, value);
    // todo this.root.setAttribute(name, value);
    // 这里将 attribute 存起来，在 render 中处理
    this.attributes.set(name, value);
    this[name] = value;
    // this[name] = value;
  }

  appendChild(child) {   // children
    // console.log('Parent::appendChild', child);
    this.children.push(child);
    // child.mountTo(this.root);    // 这里不要直接 moute
  }

  set subTitle(value) {
    this.properties.set('subTitle', value);
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }

  render() {
    let children = this.attributes.get('data').map(url => {
      let element = <img src={url} />
      // 禁用拖拽
      element.addEventListener('dragstart', event => event.preventDefault());
      return element;
    });

    let root = <div class={this.attributes.get('class')}>
      {children}
    </div>;

    let positon = 0;
    // 两个一组 做移动
    let nextPic = () => {
      // 下一张图片索引
      let nextPositon = (positon + 1) % this.data.length;

      let current = children[positon];
      let next = children[nextPositon];
      console.log(current, next);

      // 移到起点 不需要动画 瞬间完成
      current.style.transition = 'none';
      next.style.transition = 'none';
      // 动画：图片的起始位置
      current.style.transform = `translateX(${-100 * positon}%)`;     // 0
      next.style.transform = `translateX(${100 - 100 * nextPositon}%)`;  // 1
      // 执行完这些代码，浏览器会在下一帧让其生效


      // transition 生效需要间隔，所以需要用 setTimeout，setTimeout 动画生效
      setTimeout(() => {
        // 从起点到终点 就需要动画了
        current.style.transition = '';  // = '' means use css
        next.style.transition = '';
        // 动画：图片的终止位置
        current.style.transform = `translateX(${-100 - 100 * positon}%)`;  // -1 位置
        next.style.transform = `translateX(${-100 * nextPositon}%)`;       // 0 的位置

        positon = nextPositon;
      }, 16); // 16 = 0, 16 更保险一点, 1000 / 60 = 1 帧的时间

      // todo ???
      // requestAnimationFrame(function() {
      //     // 上一块 DOM 操作在浏览器生效
      //     requestAnimationFrame(function() {
      //         current.style.transition = 'ease 0s';
      //         next.style.transition = 'ease 0s';

      //         current.style.transform = `translateX(${-100-100 * positon}%)`;
      //         next.style.transform = `translateX(${-100 * nextPositon}%)`;

      //         positon = nextPositon;
      //     });
      // });
    }
    // setInterval(nextPic, 3000);

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

    return root;
  }
}

let component = <Carousel class="carousel" data={[
  "https://yanxuan.nosdn.127.net/e1d32c538a9fcf420411592746098ad2.jpg?type=webp&amp;imageView&amp;quality=75&amp;thumbnail=750x0",
  "https://yanxuan.nosdn.127.net/7e01b30c2c440e118cf09e14c7a69266.jpg?type=webp&imageView&quality=75&thumbnail=750x0",
  "https://yanxuan.nosdn.127.net/94408b4d014ce6774e8f768bdf9b6f60.jpg?type=webp&amp;imageView&amp;quality=75&amp;thumbnail=750x0",
  "https://yanxuan.nosdn.127.net/e14d684c9dc43de2af5215c3d49b6870.jpg?type=webp&amp;imageView&amp;quality=75&amp;thumbnail=750x0",
]} />

component.subTitle = 'i am sub title'

component.mountTo(document.body);

// console.log(component);
// component.id = 'a';
// component.setAttribute('id', 'a');