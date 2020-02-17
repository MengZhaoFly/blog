class Queue{
  constructor() {
    this.allTasks = [];
    this.limitNumber = 1;
    this.loop = 0;
  }
  task(wait, cb) {
    this.allTasks.push({
      wait,
      cb
    })
    return this;
  }
  start() {
    // 启动任务
    return this.run(this.allTasks.slice(this.loop * this.limitNumber, 
      this.loop * this.limitNumber + this.limitNumber))
  }
  run(tasks) {
    var detail = tasks[0];
    if (!detail) {
      this.loop = 0;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      // 本次任务
      setTimeout(() => {
        detail.cb();
        this.loop ++;
        resolve();
      }, detail.wait);
    })
    .then(res => {
      // 下次任务
      return this.run(this.allTasks.slice(this.loop * this.limitNumber, 
        this.loop * this.limitNumber + this.limitNumber))
    })
  }
}
new Queue()
.task(1000, () => {
  console.log(1)
})
.task(2000, () => {
  console.log(2)
})
.task(1000, () => {
  console.log(3)
})
.start()
