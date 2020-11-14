const fs = require('fs')
const http = require('http')
// const { exec } = require('child_process')
const { extname, resolve, join } = require('path')
const zlib = require('zlib')
const hostname = '127.0.0.1'
const port = 4000
// 可以测试的静态资源从下面链接下载，文件夹 wwwroot 放到仓库根目录下
// 链接: https://pan.baidu.com/s/195aNMKtOtJ1i8FBeC7MyoA  密码: 9k53
const wwwroot = resolve(__dirname, './wwwroot')
const mimeType = {
  '.ico': 'image/x-icon',
  '.md': 'text/plain',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt'
}

const buildHtml = (framents) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>static server</title>
</head>
<body>
    <h1>静态资源列表：</h1>
    ${framents.join('<br />')}
</body>
</html>
`
const server = http.createServer((req, res) => {
  const pathname = req.url
  const filePath = join(wwwroot, pathname)
  const ext = extname(pathname)
  const exists = fs.existsSync(filePath)

  // 访问网站静态资源
  
  if (pathname.indexOf('favicon.ico') > -1) {
    return
  }
  console.log('url: ', req.url, exists)

  if (pathname === '/') {
    const framents = []

    fs.readdirSync(wwwroot)
      .map(file => {
        framents.push(`<a href="/${file}">${file}</a>`)
      })
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')

    return res.end(buildHtml(framents))
  }

  // 参数合法性校验
  // 1. 非允许后缀的资源不予返回
  // 2. 若后缀合法，判断文件是否存在
  if (!mimeType[ext] || !exists) {
    res.statusCode = 404
    return res.end('404')
  }

  // 3. 若文件存在，判断是否是文件类型
  // 4. 若合法存在，判断是否位于 wwwroot 目录下
  const fStat = fs.statSync(filePath)
  if (!fStat.isFile() || !filePath.startsWith(wwwroot)) {
    res.statusCode = 404
    return res.end()
  }

  // 5. 304 缓存有效期判断, 使用 If-Modified-Since，用 Etag 也可以
  const modified = req.headers['if-modified-since']
  const expectedModified = new Date(fStat.mtime).toGMTString()

  if (modified && modified === expectedModified) {
    res.statusCode = 304
    res.setHeader('Content-Type', mimeType[ext])
    res.setHeader('Cache-Control', 'max-age=3600')
    res.setHeader('Last-Modified', new Date(expectedModified).toGMTString())

    return res.end()
  }
  console.log(2)
  // 6. 文件头信息设置
  res.statusCode = 200
  res.setHeader('Content-Type', mimeType[ext])
  res.setHeader('Cache-Control', 'max-age=3600')
  res.setHeader('Last-Modified', new Date(expectedModified).toGMTString())
  // 7. gzip 压缩后，把文件流 pipe 回去
  const stream = fs.createReadStream(filePath, {
    flags: 'r'
  })
  stream.on('error', (err) => {
    console.log(err);
    res.writeHead(404)
    res.end()
  })

  // 根据请求头判断返回文件的压缩格式
  const acceptEncoding = req.headers['accept-encoding']

  if (acceptEncoding.indexOf('gzip') > -1) {
    res.setHeader('Content-Encoding', 'gzip')
    return stream.pipe(zlib.createGzip()).pipe(res)
  } else if (acceptEncoding.indexOf('deflate') > -1) {
    res.setHeader('Content-Encoding', 'deflate')
    return stream.pipe(zlib.createDeflate()).pipe(res)
  } else {
    stream.pipe(res)
  }
})

server.on('error', error => console.log(error))
server.listen(port, hostname, () => {
  const url = `http://${hostname}:${port}/`
  console.log(`Server running at ${url}`)

  // if (process.platform === 'darwin') {
  //   exec(`open ${url}`)
  // } else if (process.platform === 'win32') {
  //   exec(`start ${url}`)
  // }
})
