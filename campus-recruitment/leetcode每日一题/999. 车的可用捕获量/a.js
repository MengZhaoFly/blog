/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
  let pos = [[-1, 0], [1, 0], [0, -1], [0, 1]], res = 0;
  for (let i = 0; i < 8; i ++) {
    for (let j = 0; j < 8; j ++) {
      if (board[i][j] === 'R') {
        let posx = i, posy = j;
        for (let direc of pos) {
          while (true) {
            posx += direc[0];
            posy += direc[1];
            if (posx < 0 || posx >= 8 || posy < 0 || posy >= 8 || board[posx][posy] === 'B') {
              break;
            }
            if (board[posx][posy] === 'p') {
              res ++;
              break;
            }
          }
        }
      }
    }
  }
  return res;
};
console.log(numRookCaptures([
  [".",".",".",".",".",".",".","."],
  [".","p","p","p","p","p",".","."],
  [".","p","p","B","p","p",".","."],
  [".","p","B","R","B","p",".","."],
  [".","p","p","B","p","p",".","."],
  [".","p","p","p","p","p",".","."],
  [".",".",".",".",".",".",".","."],
  [".",".",".",".",".",".",".","."]
]))