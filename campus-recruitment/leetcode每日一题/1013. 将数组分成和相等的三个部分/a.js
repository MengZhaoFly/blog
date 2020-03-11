/**
 * @param {number[]} A
 * @return {boolean}
 */
var canThreePartsEqualSum = function(A) {
  if (A.length < 3) return false;
  let i = 0, j = A.length - 1;
  let leftSum = A[0], rightSum = A[A.length - 1];
  let sum = A.reduce((a, b) => a + b, 0);
  let divide = sum / 3;
  while (i + 1 < j) {
    // console.log(i, j, leftSum, rightSum)
    if (leftSum === rightSum && leftSum === divide) {
      break;
    }
    if (rightSum !== divide) {
      j --;
      rightSum += A[j];
    }
    if (leftSum !== divide) {
      i ++;
      leftSum += A[i];
    }
  }
  if (i + 1 < j && divide === A.slice(i + 1, j).reduce((a, b) => a + b, 0)) {
    return true;
  }
  return false;
};
// console.log(canThreePartsEqualSum([3,3,6,5,-2,2,5,1,-9,4]))