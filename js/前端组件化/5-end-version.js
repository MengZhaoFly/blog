import { createElement, Text, Wrapper } from './createElement.js';
import { Timeline, Animation } from './lib/animation';
import { ease } from './lib/cub'
import enableEvent from './lib/events';
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

    let children = this.attributes.get('data').map((url, i) => {
      let element = <img src={url} enableEvent="true"
        onPanStart={handlePanStart}
        index={i}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      />
      // 禁用拖拽
      element.addEventListener('dragstart', event => event.preventDefault());
      return element;
    });

    let root = <div class={this.attributes.get('class')}>
      {children}
    </div>;

    let positon = 0;
    let timeLine = new Timeline();

    // 两个一组 做移动
    let nextPic = () => {
      // 下一张图片索引
      let nextPositon = (positon + 1) % children.length;

      let current = children[positon];
      let next = children[nextPositon];

      let currentAnimation = new Animation(current.style, 'transform',
        (v) => `translateX(${v}%)`, -100 * positon, -100 - 100 * positon, 1000, 0, ease)
      let nextAnimation = new Animation(next.style, 'transform',
        (v) => `translateX(${v}%)`, 100 - 100 * nextPositon, -100 * nextPositon, 1000, 0, ease)
      timeLine.add(currentAnimation);
      timeLine.add(nextAnimation);
      positon = nextPositon;

      // 动画：图片的起始位置
      // current.style.transform = `translateX(${-100 * positon}%)`;     // 0
      // next.style.transform = `translateX(${100 - 100 * nextPositon}%)`;  // 1
      // 执行完这些代码，浏览器会在下一帧让其生效


      // transition 生效需要间隔，所以需要用 setTimeout，setTimeout 动画生效
      // setTimeout(() => {
      //   // 动画：图片的终止位置
      //   current.style.transform = `translateX(${-100 - 100 * positon}%)`;  // -1 位置
      //   next.style.transform = `translateX(${-100 * nextPositon}%)`;       // 0 的位置

      //   positon = nextPositon;
      // }, 16); // 16 = 0, 16 更保险一点, 1000 / 60 = 1 帧的时间
    }
    let timer = setInterval(nextPic, 3000);
    // window.nextPic = nextPic;
    // nextPic()
    timeLine.start();
    function handlePanStart(event) {
      timeLine.pause();
      clearInterval(timer);
      let lastPosition = (positon - 1 + children.length) % children.length;
      let nextPositon = (positon + 1) % children.length;
      let current = children[positon];
      let last = children[lastPosition];
      let next = children[nextPositon];

      current.style.transform = `translateX(${-750 * positon}px)`;          // 当前图片的正确的位置
      last.style.transform = `translateX(${-750 - 750 * lastPosition}px)`;  // 前一个
      next.style.transform = `translateX(${750 - 750 * nextPositon}px)`;   // 后一个
    }
    function handlePan(event) {
      event = event.detail;
      let lastPosition = (positon - 1 + children.length) % children.length;
      let nextPositon = (positon + 1) % children.length;

      let current = children[positon];
      let last = children[lastPosition];
      let next = children[nextPositon];

      current.style.transform = `translateX(${event.clientX - event.startX - 750 * positon}px)`;
      last.style.transform = `translateX(${event.clientX - event.startX - 750 - 750 * lastPosition}px)`;
      next.style.transform = `translateX(${event.clientX - event.startX + 750 - 750 * nextPositon}px)`;
    }
    function handlePanEnd(event) {
      event = event.detail
      let lastPosition = (positon - 1 + children.length) % children.length;
      let nextPositon = (positon + 1) % children.length;
      // 抬手 判断 
      // 到底下一张还是上一张
      let offset = 0;

      if (event.clientX - event.startX > 250) {
        offset = 1;
      } else if (event.clientX - event.startX < -250) {
        offset = -1;
      }

      let current = children[positon];
      let last = children[lastPosition];
      let next = children[nextPositon];

      // current.style.transition = 'ease 0.2s';
      // last.style.transition = 'ease 0.2s';
      // next.style.transition = 'ease 0.2s';

      current.style.transform = `translateX(${offset * 750 - 750 * positon}px)`;
      last.style.transform = `translateX(${offset * 750 - 750 - 750 * lastPosition}px)`;
      next.style.transform = `translateX(${offset * 750 + 750 - 750 * nextPositon}px)`;
      // offset 负值 为 左滑
      positon = (positon - offset + children.length) % children.length;

      timer = setInterval(nextPic, 3000);
      timeLine.restart();
    }

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