let element = document.body;

element.addEventListener("mousedown", (event) => {
  start(event);

  let mousemove = (event) => {
    move(event);
  };

  let mouseend = (event) => {
    end(event);

    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseend);
  };

  document.addEventListener("mousemove", mousemove);
  document.addEventListener("mouseup", mouseend);
});

element.addEventListener("touchstart", (event) => {
  for (let touch of event.changedTouches) {
    start(touch);
  }
});

element.addEventListener("touchmove", (event) => {
  for (let touch of event.changedTouches) {
    move(touch);
  }
});

element.addEventListener("touchend", (event) => {
  for (let touch of event.changedTouches) {
    end(touch);
  }
});

element.addEventListener("touchcancel", (event) => {
  for (let touch of event.changedTouches) {
    cancel(touch);
  }
});

let start = (point) => {
  console.log("start");
};

let move = (point) => {
  console.log("move");
};

let end = (point) => {
  console.log("end");
};

let cancel = (point) => {
  console.log("cancel");
};

// tap
// pan panstart panmove panend
// flick
// press pressstart pressmove pressend
