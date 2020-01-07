const Complier = require("./Compiler");
const options = require("./webpack.config");
new Complier(options).run();