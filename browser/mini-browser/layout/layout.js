function getStyle(element) {
  if (!element.style) {
    element.style = {};
  } else {
    return element.style;
  }
  for (let prop in element.computerStyle) {
    // let p = 
    element.style[prop] = element.computerStyle[prop].value;
    if (element.style[prop].toString().match(/px$/)
    || element.style[prop].toString().match(/^[0-9\.]+$/)
    ) {
      element.style[prop] = parseInt(element.style[prop]);
    }
    if (prop.includes('-')) {
      let props = prop.split('-')
      let formatProp = props[0] + props[1].charAt(0).toUpperCase() + props[1].substring(1);
      element.style[formatProp] = element.computerStyle[prop].value;
    }
  }
  return element.style;
}
function layout(element) {
  if (!element.computerStyle) {
    return ;
  }
  let elementStyle = getStyle(element);
  if (elementStyle.display !== 'flex') {
    return ;
  }
  const style = elementStyle;
  const items = element.children.filter(e => e.type === 'element');

  // 起点 方向
  let mainSize, mainStart, mainBase,
      crossSize, crossStart, crossEnd, crossBase = 0;
      //crossSign = 1, crossBase = 0;
  if (style.flexDirection === 'row') {
    mainSize = 'width';
    mainStart = 'left';
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';

  }
  if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  // let isAutoMainSize = false;
  // element 没有设置 width
  // 在 flex 布局看来 width 由子元素 width 之和撑开
  // if (!style[mainSize]) {
  //   elementStyle[mainSize] = 0;
  //   for (let item of items) {
  //     if ()
  //   }
  // }
  // 把元素 收进行
  let flexLine = [];
  let flexLines = [flexLine];
  // 主轴剩余
  let mainSpace = elementStyle[mainSize];
  // 交叉轴剩余
  let maxLHeight = 0;
  for (let i = 0; i < items.length; i ++) {
    let item = items[i];
    let itemStyle = getStyle(item);
    // 子元素，有 flex 自适应 全部收进一行
    if (itemStyle.flex) {
      flexLine.push(item)
    } else if (style.flexWrap === 'nowrap') {
      // 父元素 设置 nowrap
    } else {
      // 空间不够 换行
      if (mainSpace < itemStyle[mainSize]) {
      } else {
        // 空间够继续塞到当前行
        flexLine.push(item);
      }
      if (itemStyle[crossSize]) {
        // 计算 交叉轴 当前行最高的元素
        maxLHeight = Math.max(maxLHeight, itemStyle[crossSize])
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  // 更新当前行 主轴剩余
  flexLine.mainSpace = mainSpace;
  flexLine.maxLHeight = maxLHeight;
  // 计算主轴方向
  // 找出所有 flex 元素
  // 把主轴 方向的剩余尺寸按比例分配给这些元素
  // 若剩余空间为负数，所有 flex 元素为 0，等比压缩剩余元素

  if (elementStyle.justifyContent === 'center') {
    for (let line of flexLines) {
      mainBase = line.mainSpace / 2
      for (let item of line) {
        let itemStyle = getStyle(item);
        itemStyle[mainStart] = mainBase;
        mainBase += itemStyle[mainSize]
      }
    }
  }
  // 交叉轴剩余
  let crossSpace = elementStyle[crossSize] - maxLHeight;
  crossBase = crossSpace / 2
  if (elementStyle.alignItems === 'center') {
    for (let line of flexLines) {
      mainBase = line.mainSpace / 2
      for (let item of line) {
        let itemStyle = getStyle(item);
        itemStyle[crossStart] = crossBase + (maxLHeight - itemStyle[crossSize]) / 2;
        crossBase = crossSpace / 2;
      }
    }
  }

}


module.exports = layout