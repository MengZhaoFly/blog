const puppeteer = require('puppeteer'),
    fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //视口参数
    await page.setViewport({width: 375, height: 667});

    // 事件监听，可用于调试
    //page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    //page.on('warning', msg => console.log('PAGE WARN:', JSON.stringify(msg)));
    //page.on('error', msg => console.log('PAGE ERR:', ...msg.args));

    // waitUntil 参数有四个关键字：load、domcontentload、networkidle0和networkidle2
    await page.goto('http://www.pwstrick.com/index.html', {waitUntil: 'networkidle2'});
    await page.addScriptTag({url: 'http://www.pwstrick.com/js/skeleton.js'});

    // 对打开的页面进行操作
    const html = await page.evaluate(() => {
        let sk = new Skeleton();
        sk.draw();
        return document.body.innerHTML;
    });

    // 将页面截图，输出为 pdf 或 图片
    //await page.pdf({path: 'auto.pdf', format: 'A4'});
    await page.screenshot({path: 'auto.png'});

    //console.log(html);

    //将骨架屏代码添加到content.txt文件中
    fs.writeFileSync('content.txt', html);

    //await page.close();
    await browser.close();
})();

