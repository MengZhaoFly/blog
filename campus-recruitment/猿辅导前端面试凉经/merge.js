/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (!intervals.length) return []
  intervals.sort((a, b) => a[0] - b[0]);
  let merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i ++) {
    let len = merged.length;
    let interval = intervals[i];
    let compare = merged[len - 1];
    if (interval[0] <= compare[1] || interval[0] === compare[0]) {
      // 可以合并
      if (interval[1] > compare[1]) compare[1] = interval[1]
    } else {
      merged.push(interval);
    }

  }
  return merged;
};
console.log(merge([[2,3],[0,1],[1,2],[3,4],[4,5],[1,1],[0,1],[4,6],[5,7],[1,1],[3,5]]));