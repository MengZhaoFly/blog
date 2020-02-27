/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  // [数量, 等待时间]
  let hashMap = {};
  for (let i = 0; i < tasks.length; i++) {
    if (!hashMap[tasks[i]]) {
      hashMap[tasks[i]] = [0, 0];
    }
    hashMap[tasks[i]][0]++;
  }
  console.log('总体', hashMap)
  let count = tasks.length;
  let res = 0;
  while (count > 0) {
    let max = null;
    let c = null
    for (let key in hashMap) {
      // 贪心选择：任务数量大于 0，等待时间为 0
      if (hashMap[key][1] == 0 && hashMap[key][0] > 0) {
        // 循环找到 剩余数目最多的
        // 任务多的 满足条件了 就得赶快执行，不然到最后会阻塞
        if (!max || hashMap[key][0] > max[0]) {
          c= key
          max = hashMap[key];
        }
      } else if (hashMap[key][0] > 0 && hashMap[key][1] > 0) {
        // 还有数量 但是在等待中 那么 将它的等待时间 - 1
        hashMap[key][1]--;
      }
    }
    console.log(c, max, hashMap);
    // 找到当前执行的 任务 数量减 1，等待时间 为 n
    if (max) {
      max[0]--;
      max[1] = n;
      count--;
    }
    // 找不到符合条件的任务 等待
    res++;
  }

  return res;
};
console.log(leastInterval(["A","A","A","B","B","B"], 2))
console.log(leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"]
,2))