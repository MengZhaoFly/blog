/**
 * @param {number[]} A
 * @return {number}
 */
var minIncrementForUnique = function(A) {
  let res = 0, hash = {};
  let lessThanMin = A[0];
  for (let num of A) {
    if (hash[num] !== undefined) {
      // 已经有了，++
    }
    hash[num] = true;
  }
  return res;
};
// console.log(minIncrementForUnique([3,2,1,2,1,7]))