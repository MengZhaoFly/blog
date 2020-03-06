/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
  let left = new Array(ratings.length).fill(1),
  right = new Array(ratings.length).fill(1), res = [];
  // 左遍历一次，满足 左规则
  for (let i = 1; i < ratings.length; i ++) {
    if (ratings[i] > ratings[i - 1]) {
      left[i] = left[ i - 1] + 1;
    }
  }
  // 右遍历一次，满足 右规则
  for (let i = ratings.length - 2; i >= 0; i --) {
    if (ratings[i] > ratings[i + 1]) {
      right[i] = right[ i + 1] + 1;
    }
  }
  // 取出最大值
  for (let i = 0; i < left.length; i ++) {
    res[i] = Math.max(left[i], right[i]);
  }
  // console.log(left, right, res);
  return res.reduce((a, b) => a + b, 0);
};
// console.log(candy([1,3,2,2,1]))
// console.log(candy([1,2,2]))
// console.log(candy([1,2,87,87,87,2,1]))