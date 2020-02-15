class Queue {
  constructor() {
    this._tasks = [];
    this.loop = 0;
    this.limitNumber = 1;
  }
  task(wait, cb) {
    this._tasks.push({
      cb,
      wait
    })
    return this;
  }
  start() {
    return this._run(this._tasks.slice(this.loop * this.limitNumber, 
      this.loop * this.limitNumber + this.limitNumber));
  }
  _run(task) {
    // if (task.length < 1) return Promise.resolve();
    var taskDetail = task[0]
    if (!taskDetail) return Promise.resolve();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        taskDetail.cb();
        this.loop ++;
        resolve();
      }, taskDetail.wait);
    })
    .then(res => {
      return this._run(this._tasks.slice(this.loop * this.limitNumber, 
        this.loop * this.limitNumber + this.limitNumber));
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
.task(3000, () => {
  console.log(3)
})
.start()