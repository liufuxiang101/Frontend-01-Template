let element = document.body;

let contexts = Object.create(null);
const MOUSE_SYMBOL = Symbol("mouse");

if (document.ontouchstart !== null) {
  element.addEventListener("mousedown", (event) => {
    contexts[MOUSE_SYMBOL] = Object.create(null);
    start(event, contexts[MOUSE_SYMBOL]);

    let mousemove = (event) => {
      move(event, contexts[MOUSE_SYMBOL]);
    };

    let mouseend = (event) => {
      end(event, contexts[MOUSE_SYMBOL]);

      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseend);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseend);
  });
}

element.addEventListener("touchstart", (event) => {
  for (let touch of event.changedTouches) {
    contexts[touch.identifier] = Object.create(null);
    start(touch, contexts[touch.identifier]);
  }
});

element.addEventListener("touchmove", (event) => {
  for (let touch of event.changedTouches) {
    move(touch, contexts[touch.identifier]);
  }
});

element.addEventListener("touchend", (event) => {
  for (let touch of event.changedTouches) {
    end(touch, contexts[touch.identifier]);

    delete contexts[touch.identifier];
  }
});

// touchend、touchcancel 只会触发其中一个
element.addEventListener("touchcancel", (event) => {
  for (let touch of event.changedTouches) {
    cancel(touch, contexts[touch.identifier]);

    delete contexts[touch.identifier];
  }
});

let start = (point, context) => {
  context.startX = point.clientX;
  context.startY = point.clientY;

  context.moves = [];

  context.isTap = true;
  context.isPan = false;
  context.isPress = false;
  context.timeoutHandler = setTimeout(() => {
    if (context.isPan) {
      return;
    }

    context.isTap = false;
    context.isPan = false;
    context.isPress = true;
    console.log("pressstart");
  }, 500);
};

let move = (point, context) => {
  let dx = point.clientX - context.startX;
  let dy = point.clientY - context.startY;

  if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
    context.isTap = false;
    context.isPan = true;
    context.isPress = false;
    console.log("panstart");
  }

  if (context.isPan) {
    context.moves.push({
      dx,
      dy,
      t: Date.now(),
    });

    context.moves = context.moves.filter(
      (record) => Date.now() - record.t < 300
    );

    console.log("pan");
  }

  // console.log("move", dx, dy);
};

let end = (point, context) => {
  if (context.isPan) {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;
    // console.log(context.moves);

    let record = context.moves[0];

    let speed =
      Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) /
      (Date.now() - record.t);

    console.log(speed);

    if (speed > 2.5) {
      console.log("flick");
    }

    console.log("panend");
  }

  if (context.isTap) {
    console.log("tap");
  }

  if (context.isPress) {
    console.log("pressend");
  }

  clearTimeout(context.timeoutHandler);
};

let cancel = (point, context) => {
  console.log("cancel");
  clearTimeout(context.timeoutHandler);
};

// tap
// pan panstart panmove panend
// flick
// press pressstart pressmove pressend
