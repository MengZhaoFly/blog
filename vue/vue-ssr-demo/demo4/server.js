const fs = require('fs')
const express = require('express')
const server = express()
const {
  createBundleRenderer
} = require('vue-server-renderer')
const template = fs.readFileSync('./src/index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

server.use(express.static('dist'))
server.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: 'vue ssr',
    meta: `
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
      `
  }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
})

server.listen(8080)