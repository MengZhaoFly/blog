// npm i handlebars metalsmith -D
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const ora = require('ora')
const rm = require('rimraf').sync

module.exports = function (context) {
  let metadata = context.metadata;
  let src = context.downloadTemp;
  let dest = './' + context.root;
  if (!src) {
    return Promise.reject(new Error(`无效的source：${src}`))
  }
  const spinner = ora('生成项目').start();
  return new Promise((resolve, reject) => {
    //Metalsmith 工作的 目录
    Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(src)
      .destination(dest)
      .use((files, metalsmith, done) => {
      	const meta = metalsmith.metadata()
        Object.keys(files).forEach(fileName => {
          const t = files[fileName].contents.toString()
          console.log(fileName);
          files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
        })
      	done()
      }).build(err => {
      	if (!err) {
          // rm(src)
          spinner.succeed()
        }
      	err ? reject(err) : resolve()
      })
  })
}
