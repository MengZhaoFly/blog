
module.exports = function (source) {
  // source = JSON.stringify(source)
  // .replace(/"/g, '')
  // .replace(/"/g, '');
  // source = source.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  console.log('-------------', source, JSON.stringify(source))
  return new Promise((resolve, reject) => {
    resolve(`
      import React from 'react';
      import Markdown from 'markdown-to-jsx';
      export default function Post() {
        return (
          <Markdown children={\`${source}\`} />
        )
      }
    `);
  })
}