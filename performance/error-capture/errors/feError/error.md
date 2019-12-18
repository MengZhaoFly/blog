# 错误捕获四剑客

try...catch， onerror， onunhandledrejection， uncaughtException

## 前端错误监控
可疑区域增加 try-catch
全局监控JS异常 window.onerror
全局监控静态资源异常 window.addEventListener
捕获没有catch的promise异常：unhandledrejection

## node错误监控
try-catch
process.on('uncatchException') 
process.on('unhandledrejection') 