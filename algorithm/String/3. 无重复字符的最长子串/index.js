/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
  const map={};
  var max=0;
  var left=0;
  for(var i=0;i<s.length;i++)
  {
    var v=s[i];
    // 存在 相同的数字，让左指针往右移动
    if(map[v]>=left)//一开始map[v]不存在，undefined，式子值为false
    {
      left=map[v]+1;
    }
    map[v]=i;
    // 更新长度
    if(max<i-left+1)
    {
      max=i-left+1;
    }
  }
  return max;
}