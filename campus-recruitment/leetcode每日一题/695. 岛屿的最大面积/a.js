/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  let x = grid.length, y = grid[0].length;
  let max = 0;
  for (let i = 0; i < x; i ++) {
    for (let j = 0; j < y; j ++) {
      if (grid[i][j] === 1) {
        // 开始探测
        let area = getArea(grid, i, j);
        max = Math.max(area, max);
      }
    }
  }
  function getArea(arr, posx, posy) {
    if (posx < 0 || posy < 0 || posx >= x || posy >= y || arr[posx][posy] === 0) {
      return 0;
    }
    if (arr[posx][posy] === 1) {
      arr[posx][posy] = 0;
      return getArea(arr, posx + 1, posy) + getArea(arr, posx - 1, posy) + getArea(arr, posx, posy + 1) + getArea(arr, posx, posy - 1) + 1
    }
    // return 0;
  }
  return max;
};
