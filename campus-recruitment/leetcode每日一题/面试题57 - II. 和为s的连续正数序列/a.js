/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
  let res = [];
  for (let i = 1; i <= target - 1; i ++) {
    let t = [i];
    let rest = target - i;
    for (let j = i + 1; j <= target - 1; j ++ ) {
      if (rest === 0) {
        res.push(t);
        break;
      }
      if (rest < 0) break;
      rest -= j;
      t.push(j)
    }
  }
  return res;
};
// console.log(findContinuousSequence(1))