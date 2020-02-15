/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (!intervals.length) return []
  intervals.sort((a, b) => a[0] - b[0]);
  let merged = [intervals[0]];
  for (let i = 1; i< intervals.length; i ++) {
    let len = intervals.length;
    let interval = intervals[i];
    let compare = merged[merged.length - 1];
    // [1,2] [1,3]
    if (interval[0] <= compare[1] || interval[0] === compare[0]) {
      // 可以合并的
      if (interval[1] > compare[1]) compare[1] = interval[1];
    } else {
      merged.push(interval);
    }
  }
  return merged;
};