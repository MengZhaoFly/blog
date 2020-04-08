## 权重

权重值 | 选择器
------------ | -------------
!important | 1,0,0,0,0
1,0,0,0 | 内联样式：style=""
0,1,0,0 | ID选择器：#idName{...}
0,0,1,0 | 类、伪类、属性选择器：.className{...} / :hover{...} / [type="text"] ={...}
0,0,0,1 | 元素、伪元素选择器：div{...} / :after{...}
0,0,0,0 | 通用选择器（*）、子选择器（>）、相邻选择器（+）、同胞选择器（~）

```css
<div class="red blue">123</div>

.red {
  color: red;
}
.blue {
  color: blue;
}
// or
.blue {
  color: blue;
}
.red {
  color: red;
}
```
