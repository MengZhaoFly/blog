let sum = 0
for (let i = 0; i < 10000000; i++) {
  sum += i;
}
console.log(sum);
this.postMessage(`${sum}`);