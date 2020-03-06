var orangesRotting = function (grid) {
  let bad = [], time = -1, direction = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let m = grid.length, n = grid[0].length;
  for (let i = 0; i < grid.length; i ++) {
    for (let j = 0; j < grid[0].length; j ++) {
      if (grid[i][j] ===  2) {
        bad.push({x: i, y : j})
      }
    }
  }
  while(bad.length !== 0) {
    let loop = bad.splice(0, bad.length);
    time ++;
    for (let { x, y } of loop) {
      // 
      for (let direct of direction) {
        let newX = x + direct[0], newY = y + direct[1];
        if (newX >= 0 && newX < m && newY >= 0 && newY < n && grid[newX][newY] === 1) {
          grid[newX][newY] = 2;
          // 
          bad.push({x: newX, y: newY})
        }
      }
    }
  }
  for (let row of grid) {
    if (row.includes(1)) return -1;
  }
  return Math.max(0, time);
}
// console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]]))
// console.log(orangesRotting([[]])) // 0 分