// fib.js
const fib = (num) => {
  if (num===1 || num===2) {
      return num;
  }
  let a=1, b=2, sum=0;
  for(let i=3; i<num; i++) {
      sum = a + b;
      a = b;
      b = sum;
  }
  return sum;
}
process.on('message', num => {
  const result = fib(num);

  process.send(JSON.stringify({
      num,
      result,
      pid: process.pid
  }))
})
