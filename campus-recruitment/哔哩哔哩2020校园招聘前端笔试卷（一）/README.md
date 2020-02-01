7. CSS伪类选择器

伪元素: 创建一些不在DOM树中的元素，并为其添加样式.
```css
::first-letter, ::first-line, ::before, ::after
```
伪类: 用于元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的(:hover),和普通的 css 类相似,可以为已有的元素添加样式.

8. 位运算
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Unsigned_right_shift)

1  -> 1	 0000 0000 0000 0000 0000 0000 0000 0001
反码 + 1 之后：
-1 -> -1 1111 1111 1111 1111 1111 1111 1111 1111

右移 32位 之后 32 % 32 = 0
相当于 未移动 ：结果 ：1111 1111 1111 1111 1111 1111 1111 1111
例如：3
0000 0011

```js
3 >>> 1
// 1
```

9. [1 < 2 < 3, 3 < 2 < 1]

Number(false) -> 0
Number(true)  -> 1

18.

19. 括号匹配
    [](https://www.bilibili.com/video/av85982999?p=2)