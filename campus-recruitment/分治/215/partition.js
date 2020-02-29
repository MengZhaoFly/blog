var findKthLargest = function (nums, k) {
  let left = 0, right = nums.length - 1;
  let index = partition(nums, left, right);
  let target = nums.length - k;
  // target 从小到大
  // console.log(index, target, nums.length)
  while(index !== target) {
    if (index < target) {
      left = index + 1;
    } else {
      right = index - 1;
    }
    index = partition(nums, left, right);
    console.log(index, target, target)
  }
  return nums[index];
}
/**
 * 给基准值找到正确的位置，
   >  基准值  < 
   从小到大
*/
function partition(nums, left, right) {
  let piovt = nums[left];
  let j = left;
  for (let i = left + 1; i <= right; i ++) {
    if (nums[i] < piovt) {
      j ++;
      swap(nums, i, j);
    }
  }
  swap(nums, left, j);
  // piovt 应该位于 j 位置
  return j;
}
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
console.log(findKthLargest([3,2,1,5,6,4], 2))