// 大数相加
let sum = function (a, b) {
  let sum = [], sA, sB, s = 0;
  //将大数一个个放入栈中，最后个位数要在栈顶
  let numSplit = function (a) {
    return r = a.split("");
  }
  sA = numSplit(a); sB = numSplit(b);
  //运算
  while (sA.length != 0 && sB.length != 0) {
    let t = parseInt(sA[sA.length - 1]) + parseInt(sB[sB.length - 1]) + s;
    sA.length--; sB.length--;
    sum.push(t % 10);
    //或者这样写，因为两个个位数相加，十位数最多是1
    s = t > 9 ? 1 : 0;
  }//a比较多位的时候，sA栈会剩余
  while (sA.length != 0) {
    let t = parseInt(sA[sA.length - 1]) + s
    sum.push(t % 10);
    s = t > 9 ? 1 : 0;
    sA.length--;
  }//b比较多位的时候，sB栈会剩余
  while (sB.length != 0) {
    let t = parseInt(sB[sB.length - 1]) + s
    sum.push(t % 10);
    s = t > 9 ? 1 : 0;
    sB.length--;
  }//ab一样位数时，且和大于9时，还有进位
  if (s != 0) {
    sum.push(s);
  }
  sum = sum.reverse().join("");
  return sum;
}
//注意传的参数也必须是字符串，因为整数无法精确保留
console.log(sum("101", "99"));
console.log(sum("9", "99"));

;
// 时间复杂度：O（n）