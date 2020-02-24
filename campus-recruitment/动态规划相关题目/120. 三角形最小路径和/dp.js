/**
 * 
 * @param {*} triangle 
 * 自底向上
 *  DP 状态 DP[i,j] 定义为 i,j 的节点到底部的最小值，DP状态转移方程定义如下：
DP[i,j] = min(DP[i+1, j], DP[i+1, j+1]) + triangle[i,j]
 */
var minimumTotal = (triangle) => {
  let len = triangle.length
  let dp = new Array(len).fill(null);
  dp[len - 1] = triangle[len - 1];
  for (let x = len - 2; x >= 0; x --) {
    for (let y = 0; y < triangle[x].length; y ++) {
      if (dp[x] === null) dp[x] = [];
      dp[x][y] = Math.min(dp[x + 1][y], dp[x + 1][y + 1]) + triangle[x][y];
    }
  }
  return dp[0][0];
  // let mini = triangle[len - 1];
  //   // 从倒数第二行求起，因为最后一行的值本身是固定的
  //   for (let i = len - 2; i >= 0; i--) {
      
  //       for (let j = 0; j < triangle[i].length; j ++) {
  //         console.log(i, j)
  //           mini[j] = triangle[i][j] + Math.min(mini[j], mini[j+1]);
  //       }
  //   }
  //   return mini[0];
}
// console.log(minimumTotal([
//   [2],
//  [3,4],
// [6,5,7],
// [4,1,8,3]
// ]))
