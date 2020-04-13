/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let res = []
  backtrack('', n, n, res, 2 * n);
  return res;
};
function backtrack(str, left, right, res, len) {
  if (str.length === len) {
    res.push(str);
    return;
  }
  if (left > right) {
    // 左边 括号多 生成的结果不合法
    return;
  }
  if (left > 0) {
    // left 被用了一个
    backtrack(str + '(', left - 1, right, res, len);
  }
  if (right > 0) {
    // right 被用了一个
    backtrack(str + ')', left, right - 1, res, len);
  }
}
