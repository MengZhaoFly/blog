
// https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/observe
// https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry/entryType
// 包含FP和FCP的时间  监听paint. 页面首次初始化的时候

const observer = new window.PerformanceObserver(list => {
    list.getEntries().forEach((entry) => {
        console.log('entry', entry);
    });
});

observer.observe({
    entryTypes: ['paint']
});

function sleep(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// This triggers first-paint
sleep().then(() => document.body.style.backgroundColor = 'lightgrey');

// This triggers first-contentful-paint
sleep(2000).then(() => document.body.innerHTML += '<p>Hi there!</p>');
