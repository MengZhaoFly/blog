## 题目
Knuth 大佬（发明 KMP 算法的那位）: 思路很简单，细节是魔鬼

## 1
- #69. x 的平方根

`while (left <= right)` 事实上是把待搜索区间“三分”: left mid right
left == right + 1
`while (left < right)`
终止条件是 left == right

## 2

- #34. 在排序数组中查找元素的第一个和最后一个位置




- mid 被分到左边。即区间被分成 [left, mid] 与 [mid + 1, right]，此时取中间数的时候下取整。

```js
int mid = left + (right - left) / 2;
if (check(mid)) {
    // 下一轮搜索区间是 [left, mid]
    right = mid;
} else {
    left = mid + 1;
}
```
- mid 被分到右边。即区间被分成 [left, mid - 1] 与 [mid, right]，此时取中间数的时候上取整。

```js
int mid = left + (right - left + 1) / 2;
if (check(mid)) {
    // 下一轮搜索区间是 [left, mid - 1]
    right = mid - 1;
} else {
    left = mid;
}
```



