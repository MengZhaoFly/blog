let arr = [3,1,6,4,5,2]
function solution() {
  let max = Number.MIN_VALUE;
  let pos = null;
  for (let i = 0; i < arr.length; i ++) {
    let min = arr[i];
    let sum = arr[i]
    for (let j = i + 1; j < arr.length; j ++) {
      min = Math.min(min, arr[j]);
      sum += arr[j];
      if (min * sum > max) {
        max = min * sum;
        pos = [i, j];
      }
    }
  }
  console.log(max, pos);
}
solution();