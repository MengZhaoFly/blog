const puppeteer = require('puppeteer');

// 检测页面url
const url = 'https://www.baidu.com';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  // 等待保证页面加载完成
  await page.waitFor(5000);

  // 获取页面的 window.performance 属性
  const deep = await page.evaluate(
    () => {
      function domCheck(tree) {
        let elementMaxDeep = Number.MIN_VALUE;
        let elementCount = 0; // body 不算 -1
        let elementMaxPath = null;
        function walk(node, deep, path) {
          if (node.nodeType === 1 && node.tagName) {
            let classList = [...node.classList].join('.');
            path.push(`${node.tagName}.${classList}`);
            elementCount ++;
            if (deep > elementMaxDeep) {
              elementMaxDeep = deep;
              elementMaxPath = path.slice(0);
            }
          }
          if (node.children) {
            deep++;
            for (let child of node.children) {
              walk(child, deep, path.slice(0))
            }
          }
        }
      
        walk(tree, 1, []);
        return {
          elementMaxDeep,
          elementMaxPath,
          elementCount
        };
      }
      return domCheck(document.body)
    }
  );
  console.log(JSON.stringify(deep, null, 2));
  await browser.close();
})()

