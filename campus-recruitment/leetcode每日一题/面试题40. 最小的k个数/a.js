/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}
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

var getLeastNumbers = function (arr, k) {
  let start = 0, end = arr.length - 1;
  let index = partition(arr, start, end);
  
  while (index !== k) {
    if (index > k) {
      end = index - 1;
      index = partition(arr, start, end);
    } else {
      start = index + 1
      index = partition(arr, start, end);
    }
  }
  return arr.slice(0, index);
};
// console.log(getLeastNumbers([0,0,1,2,4,2,2,3,1,4],8))