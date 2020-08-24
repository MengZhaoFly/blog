publish-server: 提供 一个发布服务
publish-tool：先授权 后发布工具
server：纯服务器功能，可用 Nginx 替代

publish-tool：读取目录 -> http 传输给 publish-server -> 写入 server 目录



Oauth
https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow

tool: 吊起 https://github.com/login/oauth/authorize 浏览器

- 点击授权 第一步拿到 code，github 回调 我们自己的 url 给到 code
- 我们用 publish-server 用 code 获取 token
- publish-server 回调 tool
- 表示 tool 登录成功