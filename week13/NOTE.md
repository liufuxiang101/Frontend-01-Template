# Week13

## Proxy

## Range

### drag

```js
let dragable = document.getElementById("dragable");

dragable.addEventListener("mousedown", (event) => {
  console.log(event);

  let move = (event) => {
    console.log(event);
  };

  let up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };

  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
});
```

### min/max

查找最小值，初始参考值 Infinity；
查找最大值，初始参考值 -Infinity

```js
function findMin(arr = [1, 2, 3, 4, 5]) {
  let min = null;
  let number = Infinity;

  for (let i of arr) {
    if (i < number) {
      min = i;
      number = i;
    }
  }

  return min;
}
```
