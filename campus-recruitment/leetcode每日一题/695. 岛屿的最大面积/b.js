var maxAreaOfIsland = function(grid) {
  let x = grid.length, y = grid[0].length;
  let res = 0;
  for (let i = 0; i < x; i ++) {
    for (let j = 0; j < y; j ++) {
      if (grid[i][j] === 1) {
        let area = getArea(grid, i, j);
        res = Math.max(area, res);
      }
    }
  }
  function getArea(arr, posx, posy) {
    if (posx < 0 || posy < 0 || posx >= x || posy >= y || arr[posx][posy] == 0) {
      return 0;
    }
    if (arr[posx][posy] == 1) {
      // 已经走过的路了
      arr[posx][posy] = 0;
      return getArea(arr, posx + 1, posy) + getArea(arr, posx - 1, posy) +
      getArea(arr, posx, posy + 1) + getArea(arr, posx, posy - 1) + 1
    } 
  }
  return res;
}
console.log(maxAreaOfIsland([[0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]]))