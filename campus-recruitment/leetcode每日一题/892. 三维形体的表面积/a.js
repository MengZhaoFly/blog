/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function(grid) {
  let front = 0, top = 0;
  for (let x = 0; x < grid.length; x ++) {
    let frontMax = 0, rightMax = 0;
    for (let y = 0; y < grid[0].length; y ++) {
      let num = grid[x][y];
      if (y === x)
      frontMax = Math.max(num, frontMax);
    }
    front += frontMax;
    
  }
};