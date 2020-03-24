/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxarea = 0;
  for (let i = 0; i < height.length; i++)
    for (let j = i + 1; j < height.length; j++) {
      console.log(i, j, Math.min(height[i], height[j]));
      maxarea = Math.max(maxarea, Math.min(height[i], height[j]) * (j - i));
    }
  return maxarea;
};
maxArea([1,8,6,2,5,4,8,3,7])