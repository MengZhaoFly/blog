const gulp = require('gulp')
const ejs = require('ejs');
const fs = require('fs');
const path = require('path')
function compile(cb) {
  const template = ejs.compile(fs.readFileSync('./email.ejs', 'utf8'));
  // 再次 require 数据还是不会变 commonJS 的缓存问题
  delete require.cache[path.resolve('./mock.js')];
  const mockData = require('./mock.js')
  const html = template(mockData);
  console.log(html, mockData)
  // fs.createReadStream(html).pipe(fs.createWriteStream('./dist.html'))
  fs.writeFileSync('./dist.html', html)
  cb()
}
gulp.watch(['./email.ejs', './mock.js'], gulp.series(compile))

