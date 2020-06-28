
        (function(modules) {
            // webpackBootstrap
            // The module cache
            var installedModules = {};
        
            // The require function
            function require(moduleId) {
                // Check if module is in cache
                if (installedModules[moduleId]) {
                    return installedModules[moduleId].exports;
                }
                // Create a new module (and put it into the cache)
                var module = (installedModules[moduleId] = {
                    i: moduleId,
                    l: false,
                    exports: {},
                });
            
                // Execute the module function
                modules[moduleId].call(
                    module.exports,
                    module,
                    module.exports,
                    require
                );
            
                // Flag the module as loaded
                module.l = true;
            
                // Return the exports of the module
                return module.exports;
            }
            require("./src/index.js");
        })({"./src/index.js":function (module, exports, require){
            const a = require('./a.js');
const b = require('./b.js');

console.log(a());
b();
            },"./a.js":function (module, exports, require){
            module.exports = function () {
  console.log('a');
  return 'aaaaa';
}
            },"./b.js":function (module, exports, require){
            module.exports = function () {
  console.log('b');
}
            },})
        