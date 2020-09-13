# Week10

## API

## TicTacToe

### 使用多层三元表达式处理 `if...else`

```js
cell.innerText = pattern[x][y] === 2 ? "❌" : pattern[x][y] === 1 ? "⭕️" : "";
```

### 状态交换

```js
// 如果状态为 0，填充 ''
// 如果状态为 1，填充 ⭕️
// 如果状态为 2，填充 ❌

...

// 默认状态 1，交替落子，状态交换
pattern[x][y] = color;

...

color = 3 - color;
```

### 常规初始值设定

```js
// && 初始化值 true
// || 初始化值 false
// + 初始化值 0
// * 初始化值 1
```

### `let` 使用 `{}` 包装，形成固定作用域

```js

{
    let result = -1;
    ...
}
```

### Array 快速 clone

```js
// 二维数组
let pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function clone(pattern) {
  return JSON.parse(JSON.stringify(pattern));
}

// 一维数组
let pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function clone(pattern) {
  // 以原来数组为原型创建对象
  return Object.create(pattern);
}
```
