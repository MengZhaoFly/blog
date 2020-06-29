const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('./for-await-of.js');

  const rl = readline.createInterface({
    input: fileStream
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。
  for await (const line of rl) {
    // input.txt 中的每一行在这里将会被连续地用作 `line`。
    console.log(`Line from file: ${line}`);
  }
}

// processLineByLine();
function* generator() {
  yield 0;
  yield 1;
  yield new Promise((reslove, reject) => { setTimeout(() => {
    reslove(2)
  }, 3000)});
  yield new Promise((reslove, reject) => { setTimeout(() => {
    reslove(3)
  }, 2000)});
  yield 4;
}

(async function() {
  for await (let num of generator()) {
    console.log(num);
  }
})();