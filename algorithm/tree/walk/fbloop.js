
function fb3(n) {
  var res1 = 1;
  var res2 = 1;
  var sum = res2;
  for (var i = 2; i < n; i++) {
    sum = res1 + res2;
    res1 = res2;
    res2 = sum;
  }
  return sum;
}
console.log(fb3(40))