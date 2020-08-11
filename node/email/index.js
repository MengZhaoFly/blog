const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const mockData = require('./mock')

let transporter = nodemailer.createTransport({
  // host: 'smtp.ethereal.email',
  service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: '1501995112@qq.com',
    // 这里密码不是qq密码，是你设置的smtp授权码
    pass: 'fuspawuullfabadi',
  }
});
const template = ejs.compile(fs.readFileSync('./email.ejs', 'utf8'));

const html = template(mockData);
let mailOptions = {
  from: '"自己" <1501995112@qq.com>', // sender address
  to: '1501995112@qq.com', // list of receivers
  subject: 'Hello', // Subject line
  // 发送text或者html格式
  // text: 'Hello world?', // plain text body
  // html: '<b>Hello world?</b>' // html body
  // html: fs.readFileSync('./email.html', 'utf-8')
  html: html
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log('Message sent: %s', info.messageId);
  // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
});


/**
 * //每日发送时间
let EmailHour = 8;
let EmialMinminute= 20;
let rule = new schedule.RecurrenceRule();
// 0, 1, 2, 3, 4, 5, 6
// Sunday, mon, tue, th, f, f s
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = EmailHour;
rule.minute = EmialMinminute;
console.log('NodeMail: 开始等待目标时刻...')
let j = schedule.scheduleJob(rule, function() {
  console.log("执行任务");
  getAllDataAndSendMail();
});
 */