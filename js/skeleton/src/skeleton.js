(function (global) {
  const NODE_ELEMENT = 1,     //元素类型的节点常量
    NODE_TEXT = 3,          //文本类型的节点常量
    NODE_COMMENT = 8;       //注释类型的节点常量

  /**
   * @param color         字体的背景色
   * @param bgColor       带背景图模块的背景色
   * @param rectHeight    指定区域的高度，默认为视口高度
   * @param formFn        自定义表单着色规则
   * @constructor
   */
  function Skeleton({
    color = "#DCDCDC",
    bgColor = "#F6F8FA",
  } = {}) {
    this.container = document.body;     //骨架容器
    this.color = color;
    this.bgColor = bgColor;
  }

  Skeleton.prototype = {
    draw() {
      this.container.style.background = "#FFF";       //容器背景重置
      //移除元素和节点
      // this.removeElement(this.container);
      // this.removeNode(this.container);
      //为文本添加<span>
      this.appendTextNode(this.container);
      //处理普通元素
      Array.from(this.container.querySelectorAll('div,section,footer,header,a,p,span,form,label,li')).map(element => {
        //背景图或背景颜色的处理
        const hasBg = getStyle(element, 'background-image') != "none" ||
          getStyle(element, 'background-color') != "rgba(0, 0, 0, 0)";
        // 有背景图 背景色的 意味着 这里有一块内容 才为他占位
        if (hasBg) {
          this.image(element, false);
        }
        //文本处理
        this.text(element);
      });
      //处理表单中的控件
      Array.from(this.container.querySelectorAll('input,select,button')).map(element => {
        this.form(element);
      });
      //<img>元素处理
      Array.from(this.container.querySelectorAll('img')).map(img => {
        this.image(img);
      });
    },
    /**
     * 递归为纯文本节点添加<span>
     * @param parent
     */
    appendTextNode(parent) {
      //避免<span>中嵌套<span>
      if (parent.childNodes.length <= 1 && parent.nodeName.toLowerCase() == "span") {
        return;
      }
      parent.childNodes.forEach((node) => {
        if (node.nodeType === NODE_TEXT && node.nodeValue.trim().length > 0) {
          let span = document.createElement('span');
          span.textContent = node.nodeValue;
          parent.replaceChild(span, node);
        } else {
          this.appendTextNode(node);
        }
      });
    },
    /**
     * 绘制图像
     * @param element
     * @param isImage   是否是<img>元素
     */
    image(element, isImage = true) {
      const { width, height } = getRect(element);
      //图像颜色 #EEE
      const src = 'data:image/gif;base64,R0lGODlhAQABAPAAAPT09AAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAIf8LWE1QIERhdGFYTVA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAA7';
      if (isImage)
        element.src = src;
      else {
        element.style.background = this.bgColor;
      }
      element.width = width;
      element.height = height;
    },
    text(element) {
      //判断是否是只包含文本的节点
      const isText = element.childNodes &&
        element.childNodes.length === 1 &&
        element.childNodes[0].nodeType === NODE_TEXT &&
        /\S/.test(element.childNodes[0].textContent);
      if (!isText) {
        return;
      }
      const rule = this.calculate(element);         //计算样式
      // element.setAttribute("style", rule);
      element.style = rule
    },
    /**
     * 计算文本的着色
     * @param element
     * @returns
     */
    calculate(element) {
      let { fontSize, lineHeight } = getStyle(element);
      if (lineHeight === 'normal') {
        lineHeight = 1.2
      }
      console.log({ fontSize, lineHeight })
      lineHeight = parseFloat(lineHeight);                //解析浮点数
      fontSize = parseFloat(fontSize);
      const textHeightRatio = fontSize / lineHeight,      //字体占行高的比值
        firstColorPoint = ((1 - textHeightRatio) / 2 * 100).toFixed(2),                         //渐变的第一个位置，小数点后两位四舍五入
        secondColorPoint = (((1 - textHeightRatio) / 2 + textHeightRatio) * 100).toFixed(2);    //渐变的第二个位置
      return `
              background-color: ${this.color}; 
              color: transparent;
        `;
    },
  };

  /**
   * 元素样式
   * @param element   元素
   * @param name      属性名
   * @returns 属性值或属性对象
   */
  function getStyle(element, name) {
    const style = global.getComputedStyle(element);
    return name ? style[name] : style;
  }

  /**
   * 元素尺寸和坐标
   * @param element   元素
   * @returns {DOMRect}
   */
  function getRect(element) {
    return element.getBoundingClientRect();
  }

  global.Skeleton = Skeleton;
  return Skeleton;
})(window);


