
function createTask(ms) {
   return () => {
     console.log('start', ms);
     return new Promise(r => setTimeout(() => {
       console.log('end', ms);
       r(ms);
     }, ms));
   }
}
// [createTask()(), ....]
const tasks = Array(5).fill(null).map((_, i) => createTask(i * 1000));
// Promise.all(tasks.map(task => task())).then(res => {
//   console.log(res);
// });
//  start 0
//  start 1000
//  start 2000
//  start 3000
//  start 4000
// end 0
// end 1000
// end 2000
// end 3000
// end 4000
// [0, 1000, 2000, 3000, 4000]

// 表示同时只能有2个任务运行，且then中得到的数组顺序和通过Promise.all得到的一致
limitRunTask(tasks, 2).then(console.log);
function limitRunTask(allTasks, limitNumber) {
  let loop = 0;
  let resArr = []
  // Promise.then
  // 两个任务
  // 每次只接受两个任务
  // 返回 Promise
  function run(tasks) {
    if (!tasks.length) return Promise.resolve(resArr)
    return Promise.all(tasks.map(task => task())).then(res => {
      // 下两个任务
      resArr.push(...res);
      console.log(loop, '任务结束')
      loop ++;
      
      return run(allTasks.slice(loop * limitNumber, loop * limitNumber + limitNumber));
    })
  }
  return run(allTasks.slice(loop * limitNumber, loop * limitNumber + limitNumber))  
  // 2, 4
  // 4, 6
  
}


