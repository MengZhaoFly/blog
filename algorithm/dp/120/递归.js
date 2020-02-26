/*[
  [2(11)],
  [3(9：[1,0]),4(10)],
  [6(7:[2, 0]),5(6: [2, 1]),7(10)],
  [4,1,8,3]
]
// 递归
*/
var solution = (nums) => {
  function minSum(x, y) {
    if (x === nums.length - 1) return nums[x][y];
    let left = nums[x][y] + minSum(x + 1, y)
    let right = nums[x][y] +  minSum(x + 1, y + 1)  // 右相邻这个点为顶点的最小路径和
    return Math.min(left, right);
  }
  return minSum(0, 0);
}
console.log(solution([
  [2],
 [3,4],
[6,5,7],
[4,1,8,3]
]))