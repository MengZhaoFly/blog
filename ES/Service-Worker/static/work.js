console.log(self);
console.log(this);
self.addEventListener('message', function (e) {
  const { opt } = e.data;
  if (opt === 'start') {
    let sum = 0;
    for (let i = 0; i < 100000000; i ++) {
      sum += i;
    }
    self.postMessage('cal: ' + sum);
  }
}, false);