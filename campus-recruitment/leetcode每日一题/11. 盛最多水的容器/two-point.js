/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function (height) {
  let start = 0, end = height.length - 1;
  let max = Math.min(height[start], height[end]) * (end - start);
  while (start < end) {
    if (height[start] < height[end]) {
      start ++;
    } else {
      end --;
    }
    let minVal = Math.min(height[start], height[end]);
    let len = end - start;
    max = Math.max(minVal * len, max);
  }
  return max;
};
maxArea([1,8,6,2,5,4,8,3,7])