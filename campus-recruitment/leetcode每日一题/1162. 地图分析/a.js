/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function(grid) {
  let queue = [], x = grid.length, y = grid[0].length;
  let directs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (let i = 0; i < x; i ++) {
    for (let j = 0; j < y; j ++) {
      if (grid[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  };
  if (queue.length === 0 || queue.length === x * y) {
    return -1;
  }
  let res = -1;
  // 每个陆地都往下 BFS，这样最后一个海洋也就距离各个陆地最远了
  while(queue.length) {
    let steps = queue.splice(0);
    res ++;
    for (let step of steps) {
      let theX = step[0], theY = step[1];
      for (let direct of directs) {
        let newX = theX + direct[0], newY = theY + direct[1]
        if (newX >= 0 && newX <= (x - 1) && newY >= 0 && newY <= (y - 1) && grid[newX][newY] === 0) {
          // 已经遍历过
          grid[newX][newY] = 2;
          queue.push([newX, newY]);
        }
      }
    }
  }
  return res;
};
console.log(maxDistance([[1,0,1],[0,0,0],[1,0,1]]))