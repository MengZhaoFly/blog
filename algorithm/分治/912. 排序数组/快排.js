/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  partition(nums, 0, nums.length - 1)
  return nums;
};
function partition(nums, left, right) {
  if (left >= right) return;
  let pivot = nums[left];
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (nums[i] < pivot) {
      // 小于 pivot 的元素都被交换到前面
      // j ++ 保证了：交换的时候，大的数不断去到后面
      j++;
      // 同时 j++; 保证了 小于 pivot 的元素 交换的空间
      swap(nums, j, i);
    }
  }
  // 在之前遍历的过程中，满足 [left + 1, j] < pivot，并且 (j, i] >= pivot
  // j ++ : 小于 pivot 元素的个数，
  swap(nums, j, left);
  // 交换以后 [left, j - 1] < pivot, nums[j] = pivot, [j + 1, right] >= pivot
  // return j;
  partition(nums, left, j - 1);
  partition(nums, j + 1, right);
}
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}