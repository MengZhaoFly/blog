import * as React from 'react';
import classnames from 'classnames';
import './style.css';

const isMoblie: boolean = 'ontouchstart' in window; // 是否为移动端

interface mouseE {
  clientX: number,
  clientY: number
}
class Drag extends React.Component<drag.DragProps, drag.DragState> {

  private elementWid: number = this.props.width || 100;
  private elementHeight: number = this.props.height || 100;
  private left: number = this.props.left || 0;
  private top: number = this.props.top || 0;
  private zIndex: number = this.props.zIndex || 0;
  private clientWidth: number = this.props.maxWidth || 600;
  private clientHeight: number = this.props.maxHeight || 600;

  private clientX: number = 0;
  private clientY: number = 0;

  private startX: number = 0;
  private startY: number = 0;

  private disX: number = 0;
  private disY: number = 0;

  // private _dragStart: (ev: React.TouchEvent & React.MouseEvent) => void;
  // private _dragMove: (ev: drag.TouchEvent) => any;
  // private _dragEnd: (ev: TouchEvent) => any;

  state = {
    left: this.left,
    top: this.top
  };
  public foo(n: MouseEvent) {
    return n;
  }
  public test() {
    document.addEventListener('click', this.foo);
  }


  // (ev: TouchEvent<Element> & MouseEvent<Element, MouseEvent>)
  // (ev: TouchEvent<Element> & MouseEvent<Element, MouseEvent>)
  public dragStart = (ev: React.TouchEvent<HTMLDivElement> & React.MouseEvent<Element, MouseEvent>): void => {
    const target = ev.target;
    console.log(ev);
    if (isMoblie && ev.changedTouches) {
      this.startX = ev.changedTouches[0].pageX;
      this.startY = ev.changedTouches[0].pageY;
    } else {
      this.startX = ev.clientX;
      this.startY = ev.clientY;
    }
    // @ts-ignore 偏移位置 = 鼠标的初始值 - 元素的offset
    this.disX = this.startX - target.offsetLeft;

    // @ts-ignore
    this.disY = this.startY - target.offsetTop;

    this.zIndex += 1;


    if (!isMoblie) {
      document.addEventListener('mousemove', this.dragMove, false);
      document.addEventListener('mouseup', this.dragEnd, false);
    }
  }

  public dragMove = (ev: React.TouchEvent<HTMLDivElement> 
    & React.MouseEvent<Element, MouseEvent>
    & MouseEvent
    ): void => {
    console.log(ev);
    if (isMoblie && ev.changedTouches) {
      this.clientX = ev.changedTouches[0].pageX;
      this.clientY = ev.changedTouches[0].pageY;
    } else {
      this.clientX = ev.clientX;
      this.clientY = ev.clientY;
    }

    // 元素位置 = 现在鼠标位置 - 元素的偏移值
    let left = this.clientX - this.disX;
    let top = this.clientY - this.disY;

    if (left < 0) {
      left = 0;
    }

    if (top < 0) {
      top = 0;
    }

    if (left > this.clientWidth - this.elementWid) {
      left = this.clientWidth - this.elementWid;
    }

    if (top > this.clientHeight - this.elementHeight) {
      top = this.clientHeight - this.elementHeight;
    }

    this.setState({ left, top });
  }
  // (ev: TouchEvent<Element> & MouseEvent<Element, MouseEvent>)
  // (ev: TouchEvent<Element> & MouseEvent<Element, MouseEvent>)

  public dragEnd = (ev: React.TouchEvent<HTMLDivElement> 
    & React.MouseEvent<Element, MouseEvent>
    & MouseEvent
    ): void => {
    const { onDragEnd } = this.props;
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.dragEnd);

    if (onDragEnd) {
      onDragEnd({
        X: this.startX - this.clientX,
        Y: this.startY - this.clientY
      })
    };
  }

  public render() {
    const { className, width = 100, height = 100, zIndex } = this.props;
    const { left = 0, top = 0 } = this.state;

    const styles: drag.LiteralO = {
      width,
      height,
      left,
      top
    }

    if (zIndex) {
      styles['zIndex'] = this.zIndex;
    }

    /**
     * dragbox 为拖拽默认样式
     * className 表示可以从外部传入class修改样式
     */
    const cls = classnames('dragbox', className);

    return (
      <div
        className={cls}
        onTouchStart={this.dragStart}
        onTouchMove={this.dragMove}
        onTouchEnd={this.dragEnd}
        onMouseDown={this.dragStart}
        onMouseUp={this.dragEnd}
        style={styles}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Drag;

// /**
//  * 索引类型
//  * 表示key值不确定，但是可以约束key的类型，与value的类型
//  */
// interface LiteralO {
//   [key: number]: string
// }

// const enx: LiteralO = {
//   1: 'number',
//   2: 'axios',
//   3: 'http',
//   4: 'zindex'
// }

// /**
//  * 映射类型用另外一种方式约束JSON的key值
//  */
// type keys = 1 | 2 | 3 | 4 | 5;
// type Mapx = {
//   [key in keys]: string
// }

// const enx2: Mapx = {
//   1: 'number',
//   2: 'axios',
//   3: 'http',
//   4: 'zindex',
//   5: 'other'
// }

// interface Person {
//   name: string,
//   age: number
// }
// type Mapo = {
//   [P in keyof Person]: string
// }

// const enx3: Mapo = {
//   name: 'alex',
//   age: '20'
// }
