// https://developer.mozilla.org/zh-CN/docs/Web/API/Long_Tasks_API

const observer = new PerformanceObserver(list => {
    for(const entry of list.getEntries()){
        console.log('long task.', entry);
    }
})
// 大于50ms  都会触发
observer.observe({entryTypes:["longtask"]})