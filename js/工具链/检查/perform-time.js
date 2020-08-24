const puppeteer = require('puppeteer');

// 检测页面url
const url = 'https://www.juejin.im';
// 检测次数
const times = 1;
const record = [];

(async () => {
  for (let i = 0; i < times; i++) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    // 等待保证页面加载完成
    await page.waitFor(5000);

    // 获取页面的 window.performance 属性
    const timing = JSON.parse(await page.evaluate(
      () => JSON.stringify(window.performance.timing)
    ));
    record.push(calculate(timing));
    await browser.close();
  }
  // 统计请求次数
  let reqCount = 0;
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    reqCount ++;
    interceptedRequest.continue();
  });
  await page.goto(url, { waitUntil: 'load' });
  
  
  await browser.close();

  let whiteScreenTime = 0, requestTime = 0;

  for (let item of record) {
    whiteScreenTime += item.whiteScreenTime;
    requestTime += item.requestTime;
  }

  // 检测计算结果
  const result = [];
  result.push(url);
  result.push(`页面平均白屏时间为：${whiteScreenTime / times} ms`);
  result.push(`页面平均请求时间为：${requestTime / times} ms`);

  console.log(result);
  console.log('reqCount', reqCount)

  function calculate(timing) {
    const result = {};
    // 白屏时间
    result.whiteScreenTime = timing.responseStart - timing.navigationStart;
    // 请求时间
    result.requestTime = timing.responseEnd - timing.responseStart;
    return result;
  }
})();