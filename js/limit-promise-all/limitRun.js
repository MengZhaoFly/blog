
function createTask(t) {
  return () => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(t)
    }, t);
  })
}
function limitRunTask(tasks, limit) {
  return new Promise((resolve, reject) => {
    // 当前的 promise 的 index
    let index = 0;
    // 正在运行的 promise
    let alive = 0;
    let finish = 0;
    let result = [];
    function trigger() {
      if (finish >= tasks.length) {
        resolve(result);
        return;
      }
      while (alive < limit  && index < tasks.length) {
        alive ++;
        const promise = tasks[index]();
        const curIndex = index;
        promise.then(value => {
          alive --;
          finish ++;
          result[curIndex] = value;
          trigger();
        });
        index ++;
      }
    }
    trigger();
  });
}
limitRunTask([createTask(1000), createTask(1000), createTask(1000)], 2).then(r => console.log(r))