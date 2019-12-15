const download = require('download-git-repo')
const path = require('path');
const ora = require('ora');

module.exports = function (target) {
  target = path.join(target || '.', '.download-temp')
  const spinner = ora('正在下载项目').start();
  return new Promise((resolve, reject) => {
    // 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
    // clone - boolean default false - If true use git clone instead of an http download
    download('github:MengZhaoFly/blog#master',
      target, { clone: true }, (err) => {
        if (err) {
          spinner.fail()
          reject(err)
        } else {
          // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
          spinner.succeed()
          resolve(target)
        }
      })
  })
}
