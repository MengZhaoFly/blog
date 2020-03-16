// 给定一个正整数数列a, 对于其每个区间, 我们都可以计算一个X值;
// X值的定义如下: 对于任意区间, 其X值等于区间内最小的那个数乘上区间内所有数和;
// 现在需要你找出数列a的所有区间中, X值最大的那个区间;
// 如数列a为: 3 1 6 4 5 2;
// 则X值最大的区间为6, 4, 5, X = 4 * (6+4+5) = 60;

/**
 * 思路：动态规划  数据结构：栈
 * 31 316 3164 31645 316452
 * 16 164 1645 16452 
 * 64 645 6452 
 * 45 452 
 * 52
 * 区间动态规划结束，每次求出区间的
 * X(对于任意区间, 其X值等于区间内最小的那个数乘上区间内所有数和;)
 * 取最大值
 * @param {*} arr 
 */
 function min_max(arr) {
  let stack = []
  let maxNum = 0
  for(let i = 0; i < arr.length; i++) {
    stack.push(arr[i])
    for(let j = i + 1; j < arr.length; j++) {
      stack.push(arr[j])
      maxNum = Math.max(maxNum,select(stack))
    }
    // 每次遍历完清空栈
    stack = []
  }
  return maxNum
}
function select(stack) {
  // 求出栈中最小值
  let temp = stack.sort(function(a,b) {return a - b})[0]
  temp = temp * stack.reduce((a,b) => a + b)
  return temp
}
console.log(min_max([3,1,6,4,9,2]))