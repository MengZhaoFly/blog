#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const glob = require('glob'); // npm i glob -D
const ora = require('ora');
const chalk = require('chalk');
const download = require('../lib/download')
const generator = require('../lib/generator');

const args = program.parse(process.argv).args
program.usage('<project-name>')
// 根据输入，获取项目名称
let projectName = args[0]
console.log('需要创建的项目名：', projectName);
if (!projectName) {  // project-name 必填
  // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
  program.help()
  return
}

const list = glob.sync('*')  // 遍历当前目录
// cli
let rootName = path.basename(process.cwd())

if (list.length) {  // 如果当前目录不为空
  if (list.filter(name => {
    // .cwd()  current work dir
    const fileName = path.resolve(process.cwd(), path.join('.', name));
    const isDir = fs.statSync(fileName).isDirectory()
    return name.indexOf(projectName) !== -1 && isDir
  }).length !== 0) {
    console.log(`项目${projectName}已经存在`)
    // return
  }
  rootName = projectName
}
// 这里还可以进行 当前 要创建的项目名 是否 和 当前的文件名一致
//  else if (rootName === projectName) {
//   rootName = '.'
// } else {
//   rootName = projectName
// }
go()

// 测试 init 命令
// function go() {
//   // 预留，处理子命令  
//   console.log(path.resolve(process.cwd(), path.join('.', rootName)))
// }

function go() {
  // download  resolve 下载完的一个地址
  // download(rootName)
  //   .then(target => {
  //     console.log('下载到：', target);
  //     return {
  //       name: projectName,
  //       root: projectName,
  //       downloadTemp: target
  //     }
  //   })
    Promise.resolve({name: '123', root: 'src', downloadTemp: 'git'})
    .then(context => {
      return inquirer.prompt([
        {
          name: 'projectName',
          message: '项目的名称',
          default: context.name
        }, {
          name: 'projectVersion',
          message: '项目的版本号',
          default: '1.0.0'
        }, {
          name: 'projectDescription',
          message: '项目的简介',
          default: `A project named ${context.name}`
        },
        {
          type: 'list',
          name: 'css',
          message: '使用的css预处理器',
          choices: ['less', 'stylus'],
          default: 'less'
        },
        {
          type: 'confirm',
          name: 'router',
          message: '使用router吗？'
        }
      ])
        .then(answers => {
          return {
            ...context,
            metadata: {
              ...answers
            }
          }
        })
    })
    .then(context => {
      console.log('context-----', context);
      // 添加生成的逻辑
      return generator(context);
    })
    .then(context => {
      console.log(chalk.blue('创建成功:)'))
      console.log(chalk.green(`
      cd ${projectName}
      live-server
      `))
    })
    .catch(err => {
      console.error(err)
    })
}
