var Generator = require('yeoman-generator');

class MyGenerator extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }
  initializing() {
    console.log(1);
  }
  creating() {
    this.fs.copyTpl(
      this.sourceRoot(),
      this.destinationPath('./'),
      { title: '' }
    );
  }
  end() {
    console.log(2);
  }

  // async prompting() {
  //   const answers = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Your project name",
  //       default: this.appname // Default to current folder name
  //     },
  //     {
  //       type: "confirm",
  //       name: "cool",
  //       message: "Would you like to enable the Cool feature?"
  //     }
  //   ]);

  //   this.log("app name", answers.name);
  //   this.log("cool feature", answers.cool);
  // }
  
};
module.exports = MyGenerator;