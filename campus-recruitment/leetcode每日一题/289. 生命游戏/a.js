/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
  let direction = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1]
  ]
  let effectList = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      let live = 0, die = 0;
      for (let direct of direction) {
        let newx = i + direct[0], newy = j + direct[1];
        if (newx >= 0 && newx < board.length && newy >= 0 && newy < board[0].length) {
          if (board[newx][newy] === 1) live++
          else die++;
        }
      }
      // 活细胞
      if (board[i][j] === 1) {
        if (live < 2 || live > 3) effectList.push({ i, j, val: 0 })
      } else {
        if (live === 3) effectList.push({ i, j, val: 1 })
      }
    }
  }
  // update
  for (let effect of effectList) {
    let { i, j, val } = effect;
    board[i][j] = val;
  }
  return board;
};