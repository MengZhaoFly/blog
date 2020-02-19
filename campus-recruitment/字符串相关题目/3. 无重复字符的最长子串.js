// "abcabcbb"
// left:0 a 1  ab 2 abc3 abca 都没意义 断了
// b 1  bc 2 bca3 bcab 都没意义 断了
// c 1  ca 2 
// 不重复 一直往后叠加
// 重复的话，断开，之后再叠加也没意义
// 起点往后 ++
// left 重复字符下一位
var lengthOfLongestSubstring = function(s) {
  let hash = {};  // O(1)
  let max = 0;
  let left = 0;
  for (let i = 0; i < s.length; i ++) {
    let v = s[i];
    // 再一次判断  left ~ i 之间存不存在 v ？？？
    if (hash[v] >= left) {
      // 重复了
      left = hash[v] + 1;
    }
    hash[v] = i;  // 遍历过的数据都存起来
    let len = i - left + 1;
    if (max < len) max = len;
  }
  return max;
}