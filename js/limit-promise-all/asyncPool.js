function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = [];
  const executing = [];
  const enqueue = function() {
    // 递归终止条件
    if (i === array.length) {
      return Promise.resolve();
    }
    const item = array[i++];
    // 
    const p = Promise.resolve().then(() => {
      // console.log('iteratorFn ---', item);
      return iteratorFn(item, array)
    });
    // console.log(1);
    // ret 存放 用 iteratorFn 生成的 promise，在该promise上我们可以取得，iteratorFn的resolve值
    ret.push(p);
    // 如果 某次iteratorFn 已经完成，删除
    const e = p.then(() => {
      // console.log('p 完成')
      return executing.splice(executing.indexOf(e), 1)
    });
    executing.push(e);
    let r = Promise.resolve();
    // console.log(2, executing.length);
    if (executing.length >= poolLimit) {
      r = Promise.race(executing);
    }
    // 如果 没达到 poolLimit 次数，或者之前有promise 完成，递归加入一个 iteratorFn
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}
const timeout = i => {
  console.log('生成 promise', i)
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${i} is resolve`);
      resolve(i)
    }, i)
  })
};
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(console.log)