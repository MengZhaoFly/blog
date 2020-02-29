var sortArray = function(nums) {
  return mergeSort(nums);
}
function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) {
    // [38] [27] [43]
    return arr;
  }
  let mid = Math.floor(len / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  // 分
  let lLeft = mergeSort(left);
  let rRight = mergeSort(right);
  // 治
  return merge(lLeft, rRight);
}
/**
 * 
 * @param {*} arr1 
 * @param {*} arr2 
 合并数组
 */
function merge(arr1, arr2) {
  let res = [];
  // [1,3,5]  [2,4,6,8,9,10,11]
  while(arr1.length && arr2.length) {
    if (arr1[0] <= arr2[0]) {
      res.push(arr1.shift())
    } else {
      res.push(arr2.shift())
    }
  }
  while(arr1.length) res.push(arr1.shift())
  while(arr2.length) res.push(arr2.shift())
  return res;
}