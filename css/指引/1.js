function fib1(n) {
  let res = [0n, 1n];
  // let res = ['0', '1']
  for (let i = 2; i < n; i++) {
    res[i] = res[i - 1] + res[i - 2];
  }
  return res[n - 1]
}
console.log(fib1(10000));