const Vue = require('vue')
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
})
const createApp = require('./dist/server.bundle').default

server.use(express.static('dist'))
server.get('*', (req, res) => {
  const context = {
    url: req.url
  }
  createApp(context).then(app => {
    renderer.renderToString(app, {
      title: 'vue ssr',
      meta: `
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
      `
    }, (err, html) => {
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
  }).catch(err => { 
    console.log(err)
  })
})

server.listen(8080)