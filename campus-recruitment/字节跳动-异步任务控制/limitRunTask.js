function createTask(ms) {
  return () => {
    console.log('start', ms);
    return new Promise(r => setTimeout(() => {
      console.log('end', ms);
      r(ms);
    }, ms));
  }
}
const tasks = Array(5).fill(null).map((_, i) => createTask(i * 1000));
Promise.all(tasks.map(task => task())).then(console.log);
// limitRunTask(tasks, 2).then(console.log);

function limitRunTask(allTask, limitNumber) {
  let resArr = [];
  let loop = 0;
  function limit(task) {
    console.log(loop)
    if (!task.length) return Promise.resolve(resArr);
    return Promise.all(task.map(t => t())).then(res => {
      resArr.push(...res)
      loop++;
      return limit(allTask.slice(limitNumber * loop, loop * limitNumber + limitNumber))
    })
  }
  return limit(allTask.slice(limitNumber * loop, loop * limitNumber + limitNumber))
}