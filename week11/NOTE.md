# Week11

## 异步编程

### co 实现原理

```js
// sleep
function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
}

// generator
function* go() {
  while (true) {
    green();
    yield sleep(10000);

    yellow();
    yield sleep(2000);

    red();
    yield sleep(5000);
  }
}

function run(iterator) {
  let { value, done } = iterator.next();

  if (done) {
    return;
  }

  if (value instanceof Promise) {
    value.then(() => {
      run(iterator);
    });
  }
}

function co(generator) {
  return () => {
    return run(generator());
  };
}

go = co(go);
```

### generator for...of

```js
function* g() {
  yield 1;
  yield 2;
  yield 3;
}

for (v of g()) {
  console.log(v);
}

// sleep
function sleep(t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
}

// async generator
async function* g() {
  let i = 0;
  while (true) {
    await sleep(1000);
    yield i++;
  }
}

for await (let v of g()) {
  console.log(v);
}
```

### Summary

1. `generator` 逻辑控制写法，是一种特定结构、特定的表达，提供一种使代码更易读、更简洁的实现方式；
2. `async/await` 异常捕获：`try...catch` 或 `Promise reject` 分支；
3. `fetch` 默认分 2 段，提供一种流式处理 `response` 的机会，如：超大文件传输，`response` 会先接受 `header`，然后传输，直到完成；
4. 大部分场景推荐使用 `await` 而不是 `then`；
5. 各种语言特性需要深入理解，才能更好的应用在实际项目。

## 寻路问题（搜索）

### Array

```js
new Array(10001)
  .join(0)
  .split("")
  .map((s) => Number(s));

new Array(10000).fill(0);
```

### localStorage

1. 当前源（origin）；
2. `localStorage` 长期保留，`sessionStorage` 当前会话结束删除；
3. 键值对总是以字符串的形式存储，数值类型会自动转化为字符串类型。

```js
localStorage.setItem("key", "value");
localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear();

localStorage.map = JSON.stringify(map);
JSON.parse(localStorage.map);
```

### MouseEvent.buttons

- 0 : No button or un-initialized
- 1 : Primary button (usually the left button)
- 2 : Secondary button (usually the right button)
- 4 : Auxiliary button (usually the mouse wheel button or middle button)
- 8 : 4th button (typically the "Browser Back" button)
- 16 : 5th button (typically the "Browser Forward" button)

> https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons

### A Star

> https://en.wikipedia.org/wiki/A*_search_algorithm

### Sorted

```js
class Sorted {
  constructor(data, compare) {
    this.data = data;
    this.compare = compare;
  }

  take() {
    // O(n) for
    // O(n * log(n)) sort

    if (!this.data.length) {
      return;
    }

    let min = this.data[0];
    let minIndex = 0;

    for (let i = 1; i < this.data.length; i++) {
      if (this.compare(this.data[i], min) < 0) {
        min = this.data[i];
        minIndex = i;
      }
    }

    // 找到最小数位置，和最后一个交换位置，然后 pop
    this.data[minIndex] = this.data[this.data.length - 1];
    this.data.pop();

    return min;
  }

  insert(v) {
    this.data.push(v);
  }

  get length() {
    return this.data.length;
  }
}
```

### BinaryHeap

```js
// 二叉堆
class BinaryHeap {
  constructor(data, compare) {
    this.data = data;
    this.compare = compare;
  }

  take() {
    // O(log(n))

    if (!this.data.length) {
      return;
    }

    let min = this.data[0];
    let i = 0;

    // fix heap
    while (i < this.data.length) {
      // 左节点
      if (i * 2 + 1 >= this.data.length) {
        break;
      }

      // 右节点
      if (i * 2 + 2 >= this.data.length) {
        this.data[i] = this.data[i * 2 + 1];
        i = i * 2 + 1;
        break;
      }

      if (this.compare(this.data[i * 2 + 1], this.data[i * 2 + 2]) < 0) {
        this.data[i] = this.data[i * 2 + 1];
        i = i * 2 + 1;
      } else {
        this.data[i] = this.data[i * 2 + 2];
        i = i * 2 + 2;
      }
    }

    if (i < this.data.length - 1) {
      this.insertAt(i, this.data.pop());
    } else {
      this.data.pop();
    }

    return min;
  }

  insertAt(i, v) {
    this.data[i] = v;

    while (i > 0 && this.compare(v, this.data[Math.floor((i - 1) / 2)]) < 0) {
      this.data[i] = this.data[Math.floor((i - 1) / 2)];
      this.data[Math.floor((i - 1) / 2)] = v;
      i = Math.floor((i - 1) / 2);
    }
  }

  insert(v) {
    console.log(v);
    this.insertAt(this.data.length, v);
  }

  get length() {
    return this.data.length;
  }
}
```

## 寻路问题（正则）

### match

```js
> 'abc'.match(/a(b)c/); // 捕获

0: "abc"
1: "b"
groups: undefined
index: 0
input: "abc"
length: 2

> 'abc'.match(/a(?:b)c/); // 非捕获

0: "abc"
groups: undefined
index: 0
input: "abc"
length: 1

> "[a=value]".match(/\[([^=]+)=([^\]]+)\]/);

0: "[a=value]"
1: "a"
2: "value"
groups: undefined
index: 0
input: "[a=value]"
length: 3

> "[a=value]".match(/\[(?:[^=]+)=(?:[^\]]+)\]/);

0: "[a=value]"
groups: undefined
index: 0
input: "[a=value]"
length: 1
```

### replace

```js
"abc".replace(/a(b)c/, function (str, $1) {
  console.log(str, $1);
});

// abc b
// "undefined"

"abc".replace(/a(b)c/, function (str, $1) {
  console.log(str, $1);
  return $1 + $1;
});

// abc b
// "bb"

"abc".replace(/a(b)c/, "$1$1");

// "bb"

"abc".replace(/a(b)c/, "$$1$$1");

// "$1$1"
```

### exec lastIndex

```js
let lastIndex = 0;
let token;

do {
  token = inputElement.exec(source);
  console.log(token);
} while (inputElement.lastIndex - lastIndex === token.length);
```
