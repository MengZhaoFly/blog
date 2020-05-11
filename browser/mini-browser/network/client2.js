const net = require("net");


class Request {
  // method, url = host + port + path
  // headers: 
  // Content-Type
  // Content-Type: application/x-www-form-urlencoded
  // Content-Type: application/json
  // Content-Type: multipart/form-data
  // Content-Type: text/xml
  // Content-Length
  // body: k-v

  constructor(options) {
    this.method = options.method || "GET"
    this.host = options.host
    this.port = options.port || 80
    this.path = options.path || "/"
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded"
    }

    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }

    // calculate Content-Length
    this.headers["Content-Length"] = this.bodyText.length

  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\nHOST: ${this.host}\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}\r\n`
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      const parse = new ResponseParser;
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port,
        }, () => {
          connection.write(this.toString())
        })
      }
      connection.on('data', (data) => {
        parse.receive(data.toString());
        if (parse.isFinished) {
          resolve(parse.response);
        }
        connection.end();
      });
      connection.on('error', (err) => {
        reject(err);
        connection.end();
      });
    })
  }
}

class Response {

}
// 响应体解析
class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParse = null;
  }

  get isFinished() {
    return this.bodyParse && this.bodyParse.isFinished
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusTex: RegExp.$2,
      headers: this.headers,
      body: this.bodyParse.content.join('')
    }
  }
  // 字符流处理
  receive(string) {
    console.log('收到', string);
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string[i]);
    }
  }
  receiveChar(char) {
    // \r 回车
    // \n 换行
    if (this.current === this.WAITING_STATUS_LINE) {
      // 状态行 接受完毕
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else {
        this.statusLine += char
      }
    }

    else if (this.current === this.WAITING_STATUS_LINE_END) {
      // 等待接受 头部字段
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    }

    else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParse = new TrunkedBodyParser();
        }
      } else {
        // 进入 头部字段解析 不是 ：|| \r 都是 K
        this.headerName += char
      }
    }

    else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      }
    }

    else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ""
        this.headerValue = ""
      } else {
        this.headerValue += char
      }
    }

    else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    }

    else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      // 
      if (char === '\n') {
        this.current = this.WAITING_BODY
      }
    }

    else if (this.current === this.WAITING_BODY) {
      this.bodyParse.receiveChar(char)
    }
  }
}


class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.FINISHED_NEW_LINE = 5;
    this.FINISHED_NEW_LINE_END = 6;
    this.isFinished = false;
    this.length = 0;
    this.content = [];
    this.current = this.WAITING_LENGTH;
  }
  // 字符流处理
  receiveChar(char) {
    console.log(JSON.stringify(char));
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.current = this.FINISHED_NEW_LINE
        } else {
          this.current = this.WAITING_LENGTH_LINE_END
        }
      } else {
        this.length *= 10
        this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
      }
    }

    else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK
      }
    }

    else if (this.current === this.READING_TRUNK) {
      this.content.push(char)
      this.length --
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE
      }
    }

    else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END
      }
    }

    else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH
      }
    }

    else if (this.current === this.FINISHED_NEW_LINE) {
      if (char === '\r') {
        this.current = this.FINISHED_NEW_LINE_END
      }
    }

    else if (this.current === this.FINISHED_NEW_LINE_END) {
      if (char === '\n') {
        this.isFinished = true
      }
    }
  }
}

void async function () {
  const options = {
    method: "POST",
    path: "/",
    host: "127.0.0.1",
    port: 8088,
    headers: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "elle"
    }
  }

  let request = new Request(options)

  let response = await request.send()
  console.log(response)
}()


/*
const client = net.createConnection({
  host: "127.0.0.1",
  port: 8088
}, () => {
  // 'connect' listener.
  console.log('connected to server!');

  const options = {
    method: "POST",
    path: "/",
    host: "127.0.0.1",
    port: 8088,
    headers: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "elle"
    }
  }

  let request = new Request(options)
  // console.log(request.toString())
  client.write(request.toString());
  // client.write('POST / HTTP/1.1\r\n');
  // client.write('HOST: 127.0.0.1\r\n');
  // client.write('Content-Length: 9\r\n');
  // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
  // client.write('\r\n');
  // client.write('name=elle');
  // client.write('\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
client.on('error', (err) => {
  console.log(err);
  client.end();
});

*/


/*
const net = require('net');
const client = net.createConnection({ port: 8088 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('POST / HTTP/1.1\r\n');
  client.write('HOST: 127.0.0.1\r\n');
  client.write('Content-Length: 9\r\n');
  client.write('Content-Type: application/x-www-form-urlencoded\r\n');
  client.write('\r\n');
  client.write('name=elle');
  client.write('\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
*/