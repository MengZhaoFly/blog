/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let res = 0, len = height.length;
  let maxDP1 = [height[0]], maxDP2 = new Array(len).fill(null);
  maxDP2[len - 1] = height[len - 1];
  // 从左到右 最大值
  for (let i = 1; i < height.length; i++) {
    maxDP1[i] = height[i] > maxDP1[i - 1] ? height[i] : maxDP1[i - 1];
  }
  for (let j = len - 2; j >= 0; j --) {
    maxDP2[j] = height[j] > maxDP2[j + 1] ? height[j] : maxDP2[j + 1];
  }
  for (let i = 1; i < height.length - 1; i++) {
    let num = height[i];
    let min = Math.min(maxDP1[i - 1], maxDP2[i + 1]);
    if (min > num) {
      res += (min - num);
    }
  }
  return res;
};
// trap([0,1,0,2,1,0,1,3,2,1,2,1]);