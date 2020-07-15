# Week14

## Animation

### setTimeout

```js
current.style.transition = "ease 0s";
next.style.transition = "ease 0s";

current.style.transform = `translateX(${-100 * position}%)`;
next.style.transform = `translateX(${100 - 100 * nextPostion}%)`;

setTimeout(() => {
  current.style.transition = "ease 0.5s";
  next.style.transition = "ease 0.5s";

  current.style.transform = `translateX(${-100 - 100 * position}%)`;
  next.style.transform = `translateX(${-100 * nextPostion}%)`;

  position = nextPostion;
}, 16);

setTimeout(nextPic, 3000);
```

### RFA

```js
current.style.transition = "ease 0s";
next.style.transition = "ease 0s";

current.style.transform = `translateX(${-100 * position}%)`;
next.style.transform = `translateX(${100 - 100 * nextPostion}%)`;

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    current.style.transition = "ease 0.5s";
    next.style.transition = "ease 0.5s";

    current.style.transform = `translateX(${-100 - 100 * position}%)`;
    next.style.transform = `translateX(${-100 * nextPostion}%)`;

    position = nextPostion;
  });
});
```

## %

```js
function sleep(t) {
  return new Promise((resovle, reject) => {
    setTimeout(resovle, t);
  });
}

async function mod(length) {
  let position = 0;

  while (position < length) {
    nextPosition = (position + 1) % length; // 正向

    console.log(position, nextPosition);

    await sleep(1000);
    position = nextPosition;
  }
}
mod(5);

async function mod(length) {
  let position = 0;

  while (position < length) {
    nextPosition = (position - 1 + length) % length; // 反向

    console.log(position, nextPosition);

    await sleep(1000);
    position = nextPosition;
  }
}
mod(5);
```
