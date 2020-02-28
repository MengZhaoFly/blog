/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {

  let len = nums.length;
  let left = 0;
  let right = len - 1;

  // 转换一下，第 k 大元素的索引是 len - k
  let target = len - k;
  let index = partition(nums, left, right);

  while (index !== target) {
    index = partition(nums, left, right);
    if (index < target) {
      left = index + 1;
    } else {
      right = index - 1;
    }
  }
  return nums[index];

};
function partition(nums, left, right) {
  let pivot = nums[left];
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (nums[i] < pivot) {
      // 小于 pivot 的元素都被交换到前面
      j++;
      // 同时 j++; 保证了 小于 pivot 的元素 交换的空间
      swap(nums, j, i);
    }
  }
  // 在之前遍历的过程中，满足 [left + 1, j] < pivot，并且 (j, i] >= pivot
  // j ++ : 小于 pivot 元素的个数，
  swap(nums, j, left);
  // 交换以后 [left, j - 1] < pivot, nums[j] = pivot, [j + 1, right] >= pivot
  return j;
}
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
// let arr = [4,8,9, 10,2,1,6];
// console.log(partition(arr, 0, arr.length - 1))
// console.log(arr);