/**
 * 
 [
     [2(11)],
    [3(9),4(10)],
   [6(7),5(6),7(10)],
  [4(4),1(1),8(8),3(3)]
]
// 自底向上
dp = []
dp[x, y] = 以（x,y）为顶点的最小路径和
*/
var minimumTotal = (triangle) => {
  let len = triangle.length;
  let dp = new Array(len).fill(null);
  dp[len - 1] = triangle[len - 1];
  for (let x = len - 2; i >= 0; x --) {
    if (dp[x] === null) dp[x] = [];
    for (y = 0; y < triangle[x].length; y ++) {
      dp[x][y] = Math.min(dp[x + 1][y], dp[x + 1][y + 1]) + triangle[x][y]
    }
  }
  return dp[0][0]
}

