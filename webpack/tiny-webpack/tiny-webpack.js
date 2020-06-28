const fs = require('fs');
const path = require('path');

const REQUIRE_REG_GLOBAL = /require\(("|')(.+)("|')\)/g;
const REQUIRE_REG_SINGLE = /require\(("|')(.+)("|')\)/;

// interface GraphStruct {
//     context: string;
//     moduleId: string;
// }

class TinyWebpack {
  entryPath = ''
  graph = []
  constructor(entryPath) {
    this.entryPath = entryPath;
    this.graph = [];
    this.init();
  }
  init() {
    this.createGraph(this.entryPath, this.entryPath);
    fs.writeFileSync('bundle.js', this.bundle(this.graph))
  }
  createGraph(rootPath, relativePath) {
    const context = fs.readFileSync(rootPath, 'utf-8');
    const childrens = context.match(REQUIRE_REG_GLOBAL);
    this.graph.push({
      context,
      moduleId: relativePath,
    })
    const dirname = path.dirname(rootPath);
    if (childrens) {
      childrens.forEach(child => {
        const childPath = child.match(REQUIRE_REG_SINGLE)[2];
        this.createGraph(path.join(dirname, childPath), childPath);
      });
    }
  }
  bundle(graph) {
    console.log(graph)
    let modules = '';
    graph.forEach(module => {
      modules += `"${module.moduleId}":function (module, exports, require){
            ${module.context}
            },`;
    });
    const bundleOutput = `
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
            require("${graph[0].moduleId}");
        })({${modules}})
        `;
    return bundleOutput;
  }
}

new TinyWebpack('./src/index.js');