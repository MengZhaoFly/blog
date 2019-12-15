const Handlebars = require('handlebars')
const fs = require('fs');
var file = fs.readFileSync('./test.json', 'utf8')
var t = Handlebars.compile(file)({
  projectName: '123666777',
  projectVersion: '1.0.07777777',
  projectDescription: 'A project named 12377777',
})
console.log(t);