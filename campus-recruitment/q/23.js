var a = ["Welcome", "to", "Lexin", "!"];
var b = ["Let", "us", "make", "the", "future", "together", "!"];
function formatArr(...eles) {
  return eles.map(arr => {
    return arr.join(' ')
  })
  .join('\n')
}
console.log(formatArr(a, b))