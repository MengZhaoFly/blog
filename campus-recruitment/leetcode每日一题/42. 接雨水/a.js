/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let res = 0;
  for (let i = 1; i < height.length; i ++) {
    let num = height[i];
    let max1 = Number.MIN_VALUE, max2 = Number.MIN_VALUE;

    for (let j = 0; j < i; j ++) {
      max1 = Math.max(max1, height[j]);
    }
    for (let k = i + 1; k < height.length; k ++) {
      max2 = Math.max(max2, height[k]);
    }
    let min = Math.min(max1, max2);
    if (min > num) {
      res += (min - num);
    }
  }
  return res;
};