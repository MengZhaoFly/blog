var MaxQueue = function() {
  this.queue = [];
  this.max = [];
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  if (this.queue.length === 0) return -1;
  return this.max[0];
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
  this.queue.push(value);
  if (this.max.length === 0) this.max.push(value)
  else {
    // max 队列维护一个递减的队列 每次插入新的 value 如果队列里面有小于 value的 都 pop 掉，因为他们都不需要了
    while(this.max.length !== 0 && value > this.max[this.max.length - 1]) {
      this.max.pop();
    } 
    this.max.push(value)
  }
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  if (this.queue.length === 0) return -1;
  if (this.queue[0] === this.max[0]) {
    this.max.shift();
    return this.queue.shift();
  } else {
    return this.queue.shift();
  }
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */