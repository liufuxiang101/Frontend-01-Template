export class Timeline {
  constructor() {
    this.animations = [];
    this.requestID = null;
    this.state = "inited";
    this.tick = () => {
      let t = Date.now() - this.startTime;

      for (let animation of this.animations) {
        if (t > animation.duration + animation.delay) {
          continue;
        }

        let {
          object,
          property,
          template,
          start,
          end,
          duration,
          delay,
          timingFunction,
        } = animation;

        let progression = timingFunction((t - delay) / duration); // 0-1 之间的数
        let value = start + progression * (end - start);

        object[property] = template(value);
      }

      this.requestID = requestAnimationFrame(this.tick);
    };
  }

  start() {
    if (this.state !== "inited") {
      return;
    }

    this.state = "playing";
    this.startTime = Date.now();
    this.tick();
  }

  pause() {
    if (this.state !== "playing") {
      return;
    }

    this.state = "paused";
    this.pauseTime = Date.now();

    if (this.requestID !== null) {
      cancelAnimationFrame(this.requestID);
    }
  }

  resume() {
    if (this.state !== "paused") {
      return;
    }

    this.state = "playing";
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  restart() {
    if (this.state === "playing") {
      this.pause();
    }

    this.animations = [];
    this.requestID = null;
    this.state = "playing";
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }

  add(animation, startTime) {
    this.animations.push(animation);
    animation.finished = false;

    if (this.state === "playing") {
      animation.startTime = startTime || Date.now() - this.startTime;
    } else {
      animation.startTime = startTime || 0;
    }
  }
}

export class Animation {
  constructor(
    object,
    property,
    template,
    start,
    end,
    duration,
    delay,
    timingFunction
  ) {
    this.object = object;
    this.property = property;
    this.template = template;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction;
  }
}
