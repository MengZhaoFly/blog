const fs = require('fs');
const zlib = require('zlib');
const stream = fs.createReadStream('./wwwroot/b.html', {
  flags: 'r'
});
stream.pipe(zlib.createGzip()).pipe(fs.createWriteStream('./file.gz'));