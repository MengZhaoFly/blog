— async会非同步去请求外部脚本响应后停止解析执行脚本内容
— defer也会非同步请求外部脚本但是等待浏览器解析完才执行（而且早于DOMContentLoaded 参考MDN）


## async
- async操作没有办法确保DOM都已经全部渲染
- 操作DOM可能等于找死
- 会在google analytics, 而不是UI类库

## defer
- 脚本执行时，可以确保DOM已经完整渲染
- 在DOMContentLoaded前先去执行