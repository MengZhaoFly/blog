var sortArray = function(nums) {
  partition(nums, 0, nums.length - 1);
  console.log(nums);
}
/**
 * 给基准值找到正确的位置，
   >  基准值  < 
*/
// [4,5,6,0,2]
// piovt = 4 j = 2
// j 有几个元素小于基准值 === piovt 应该位于 j 位置
// [4,0,2,4,3,2,1,5,6]
// j = 0; i: [1 ~ 4]
// j = 1; i => 3  [i <=> j]
// j = 2; i => 4  [i <=> j]
function partition(nums, left, right) {
  if (left >= right ) return;
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
  // 递归
  partition(nums, left, j - 1);
  partition(nums, j + 1, right);
}
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
let arr = [4,5,6,0,2]
console.log(sortArray(arr))
