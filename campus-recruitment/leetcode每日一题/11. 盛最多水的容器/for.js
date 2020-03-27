// [1,8,6,2,5,4,8,3,7]
// [1,8] 186 1862  18625 186254
// 86 862  8625
var maxArea = function (height) {
  let max = 0;
  for (let i = 0; i < height.length; i ++) {
    for (let j = i + 1; i < height.length; j ++) {
      let min = Math.min([i], height[j]);
      max = Math.max(max, min * (j - i));
    }
  }
  return max;
}