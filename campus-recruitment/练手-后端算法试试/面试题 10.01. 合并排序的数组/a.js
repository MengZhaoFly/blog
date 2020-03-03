/**
 * @param {number[]} A
 * @param {number} m
 * @param {number[]} B
 * @param {number} n
 * @return {void} Do not return anything, modify A in-place instead.
 */
 var merge = function (A, m, B, n) {
  let pa = m - 1, pb = n - 1, tail = m + n - 1
  while (pa >= 0 || pb >= 0) {
    // console.log(pa, pb)
    if (pa === -1) {
      A[tail] = B[pb];
      pb -= 1;
    }else if (pb === -1) {
      A[tail] = A[pa];
      pa -= 1;
    } else if (A[pa] > B[pb]) {
      A[tail] = A[pa]
      pa -= 1
    } else {
      A[tail] = B[pb]
      pb -= 1
    }
    tail -= 1
  }
  return A
};
// console.log(merge([1,2,3,0,0,0], m = 3, [2,5,6], n = 3))
// console.log(merge([0],0,[1],1))
// console.log(merge([1],1,[],0));