function partition(arr, begin, end) {
  let pivot = arr[begin];
  while (begin < end) {
    while (begin < end && arr[end] >= pivot) end --
    arr[begin] = arr[end];
    while (begin < end && arr[begin] <= pivot) begin ++
    arr[end] = arr[begin];
  }
  arr[begin] = pivot;
  return begin;
}
function partition1(nums, left, right) {
  let pivot = nums[left];
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    // 小于基准值的: j ，后移动 空出一位 给小于基准值的交换
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
let arr = [10,-10,-15,9,2,1,4,7,5,8,3,6];
console.log(partition(arr.slice(0), 0, arr.length - 1), partition1(arr.slice(0), 0, arr.length - 1))