/**
 * @param {number[]} A
 * @return {number}
 */
 var minIncrementForUnique = function(A) {
  let res = 0, record = [], hash = {};
  A.sort((a, b) => a - b);
  for (let num of A) {
    if (hash[num] !== undefined) {
      record.push(num);
    }
    hash[num] = true;
  }
  let start = record[0];
  while (record.length > 0) {
    let t = record[0];
    if (hash[start] === undefined && start > t) {
      res += (start - t);
      record.shift();
    }
    start ++;
  }
  return res;
};
// console.log(minIncrementForUnique([14,4,5,14,13,14,10,17,2,12,2,14,7,13,14,13,4,16,4,10]))
// console.log(minIncrementForUnique([1,2,2]))