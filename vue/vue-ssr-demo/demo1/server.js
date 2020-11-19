const Vue = require('vue')
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
})
const createApp = require('./dist/server.bundle').default
const context = {
  title: 'vue ssr',
  meta: `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
  `
}

// server.use(express.static('dist'))
server.get('*', (req, res) => {
  const app = createApp()

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8080)