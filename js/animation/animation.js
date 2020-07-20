export class Timeline {
  constructor() {
    this.animations = [];
    this.currentRAFid = null;
    this.state = 'init';
  }
  tick() {
    // 当前时间
    let animations = this.animations.filter(animation => !animation.finished);
    let t = Date.now() - this.startTime;
    console.log(t);
    for (let animation of this.animations) {

      let { object, property, template, delay,
        start, end, timingFunction, duration,
        whenAddTime
      } = animation;
      // t - delay 当前走过的时间
      // console.log(t, delay, t - delay)
      // if (t - delay < 0) continue;
      // 当前走过的时间 占比
      let hasPassedTime = t - delay - whenAddTime;
      let progression = timingFunction((hasPassedTime) / duration);
      // 超时 就不执行了
      if (t > animation.duration + animation.delay + whenAddTime) {
        // continue;
        // t = animation.duration + animation.delay;
        progression = 1;
        animation.finished = true
      }
      let value = start + progression * (end - start);
      object[property] = template(value);
    }
    if (animations.length) {
      this.currentRAFid = requestAnimationFrame(() => {
        this.tick();
      })
    }
  }
  start() {
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
  }
  pause() {
    this.pauseTime = Date.now();
    cancelAnimationFrame(this.currentRAFid)
  }
  add(animation, whenAddTime) {
    this.animations.push(animation);
    if (this.state === 'playing') {
      animation.whenAddTime = whenAddTime === undefined ?
       Date.now() - this.startTime : whenAddTime;
    } else {
      animation.whenAddTime = whenAddTime === undefined ? 
      0 : whenAddTime;
    }
  }
  restart() {
    // this.pause()
  }
  resume() {
    this.startTime += Date.now() - this.pauseTime;
    this.tick()
  }
}

export class Animation {
  constructor(
    object, property, template, start, end,
    duration, delay = 0, timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction || function (t) {
      return t;
    }
  }
}