const shelljs = require('shelljs');
const Rsync = require('rsync');
const path = require('path');
const colors = require('colors');
const argv = require('yargs').argv;

const [
  targetName,
] = argv._;

const host_map = {
  prod1: 'root@47.94.147.222:/root/doc',
};

if (!host_map[targetName]) {
  shelljs.echo(colors.red('目标主机不存在'));
  shelljs.exit(1);
}

function sendNotify(message) {
  shelljs.exec(`curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=dbb3fa53-29f8-4394-bfa1-ecce009e8cbb' -H 'Content-Type: application/json' -d '{"msgtype": "text", "text": {"content": "${message}"}}'`);
}

// 通知 开始构建

// 安装依赖
console.log(colors.yellow('🐛️ 安装依赖'));
if (shelljs.exec('npm i').code !== 0) {
  shelljs.echo('error: npm install error.');
  shelljs.exit(1);
}

// 测试
console.log(colors.yellow('🐛️ 进行测试'));
if (shelljs.exec('npm run test').code !== 0) {
  shelljs.echo('error: npm install error.');
  shelljs.exit(1);
}

// 构建
// sendNotify('开始构建');
console.log(colors.yellow('☕️ 开始构建'));
if (shelljs.exec('npm run build').code !== 0) {
  shelljs.echo('error: npm install error.');
  shelljs.exit(1);
}

// 部署
console.log(colors.yellow('🐛️ 开始部署'));
// sendNotify('开始部署');
const rsync = Rsync.build({
  source: path.join(__dirname, '../', '.vuepress/dist/*'),
  destination: host_map[targetName],
  flags: 'avz',
  shell: 'ssh',
});

rsync.execute((err, code, cmd) => {
  console.log(err, code, cmd);
  console.log(colors.green('🚀 部署完成'));
  sendNotify('部署完成');
});