## 1
https://www.nowcoder.com/discuss/353684?type=2&order=0&pos=9&page=2

```js
// 表示同时只能有2个任务运行，且then中得到的数组顺序和通过Promise.all得到的一致
limitRunTask(tasks, 2).then(console.log);
```

## 2
https://www.nowcoder.com/discuss/357853?type=2&order=0&pos=16&page=1
编程题，实现一个带并发限制的异步调度器

## 3
实现一个Queue类，要求包含两个函数
task函数：新增一个任务。包含两个参数，等待时间和回调函数
start函数：执行任务队列。将所有任务按队列顺序执行，执行完一个任务才能执行下一个任务
ps：下面代码，实现添加3个任务，然后执行3个任务。隔1秒，打印1；再隔2秒，打印2；再隔1秒，打印3

```js
new Queue()
.task(1000, () => {
  console.log(1)
})
.task(2000, () => {
  console.log(2)
})
.task(1000, () => {
  console.log(3)
})
.start()
```