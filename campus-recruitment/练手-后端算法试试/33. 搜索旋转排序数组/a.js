/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 解题关键：
 nums[middle]与target的大小之外，
 还需判断nums[middle]与nums[start]、nums[end]的大小（以判断target可能存在范围是升序序列还是包含旋转点）
 */
var search = function (nums, target) {
  if (nums == null || nums.length == 0) {
    return -1;
  }
  let start = 0;
  let end = nums.length - 1;
  let mid;
  while (start <= end) {
    mid = start + (end - start) / 2;
    if (nums[mid] == target) {
      return mid;
    }
    //前半部分有序,注意此处用小于等于
    if (nums[start] <= nums[mid]) {
      // target在前半部分
      // 第一类 2 3 4 5 6 7 1 这种，也就是 nums[start] <= nums[mid] (2 <= 5) 
      // 这种情况下，前半部分有序。因此如果 nums[start] <= target <nums[mid]，则在前半部分找，否则去后半部分找。
      if (target >= nums[start] && target < nums[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    } else {
      // 6 7 1 2 3 4 5 这种，也就是 nums[start] > nums[mid]。此例子中就是 6 > 2。
      // 这种情况下，后半部分有序。因此如果 nums[mid] <target<=nums[end]，则在后半部分找，否则去前半部分找
      if (target <= nums[end] && target > nums[mid]) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }

  }
  return -1;
};