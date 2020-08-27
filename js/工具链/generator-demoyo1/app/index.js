var Generator = require('yeoman-generator');
// var beautify = require("gulp-beautify");

class MyGenerator extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    // This makes `appname` a required argument.
    this.argument("appname", { type: String, required: true });
    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
  initializing() {
    console.log(1);
  }
  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "输入项目名:",
        default: this.options.appname // Default to current folder name
      },
      {
        type: "confirm",
        name: "isLodash",
        message: "要使用 lodash 吗"
      },
      {
        type: 'rawlist',
        name: 'installTool',
        message:'选择你使用的包管理器',
        choices: ['npm', 'yarn']
      }
    ]);
    this.appname = answers.name;
    this.isLodash = answers.isLodash;
    this.installTool = answers.installTool
  }
  writing() {
    console.log({ 
      isLodash: this.isLodash,
      appname: this.appname
    })
    // this.registerTransformStream(beautify({ indent_size: 2 }));
    this.fs.copyTpl(
      this.sourceRoot(),
      this.destinationPath('./'),
      { 
        isLodash: this.isLodash,
        appname: this.appname
      },
    );
    this.fs.commit([], (...args) => {
      console.log('copy done', args)
    })
    if (this.isLodash) {
      const pkgJson = {
        dependencies: {
          "lodash-es": "^4.17.15"
        }
      };
      // Extend or create package.json file in destination path
      this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    }
  }
  install() {
    // this.installTool === 'yarn' ?  this.yarnInstall() : this.npmInstall();
  }
  end() {
    console.log(`
     npm run start to enjoy coding
    `);
  }

};
module.exports = MyGenerator;