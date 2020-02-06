function AIDog(color) {
  this.color = color;
  this.init()
}
AIDog.prototype.init = function() {
  setInterval(() => {
    this.clean();
  }, 1000 * 60 * 60 * 24)
  setTimeout(() => {
    this.wakeUp();
  }, '8:30')
}
AIDog.prototype.clean = function() {}
AIDog.prototype.wakeUp = function() {}
new AIDog('white')
// declare some variables and initialize them
var a = 5
let b = 'xy'
const c = true

// assign new values
a = 6
b = b + 'z'
c = false // TypeError: Assignment to constant variable
