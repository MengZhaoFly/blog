/** declare 为声明关键字，让外部组件能访问该命名空间*/
declare namespace drag {
  interface JSONDemo {
    name: string,
    age: number
  }
  interface DragProps {
    width?: number,
    height?: number,
    left?: number,
    top?: number,
    zIndex?: number,
    maxWidth?: number,
    maxHeight?: number,
    className?: string,
    onDragEnd?: (target: DragEndParam) => any,
    children?: any
  }

  interface DragState {
    left: number,
    top: number
  }

  interface DragEndParam {
    X: number,
    Y: number
  }

  type TouchEvent = React.TouchEvent & React.MouseEvent;

  interface LiteralO {
    width: number,
    height: number,
    [key: string]: any
  }
}