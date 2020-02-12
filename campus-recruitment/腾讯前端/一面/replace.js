
// s2 出现的 在 s1 删掉
// abc
function remove(s1, s2) {
  for (let i = 0, len = s2.length; i < len; i++) {
    //  /a/g  /b/g   /c/g
    // let r = new RegExp(s2[i], "g");
    // if (r.test(s1)) {
    //   s1 = s1.replace(r, "")
    // }
    s1 = s1.replace(s2[i], "")
    //replace(/b/g, '')
    //replace('b', '')
  }
  return s1
}
console.log(remove('abcd', 'abc'))