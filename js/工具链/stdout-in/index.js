const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume()
stdin.setEncoding('utf-8');

function getChar() {
  return new Promise((resolve, reject) => {
    stdin.on('data', (key) => {
      resolve(key);
    })
  })
}

(async function() {
  while(true) {
    let char = await getChar();
    console.log(char);
  }
})()
