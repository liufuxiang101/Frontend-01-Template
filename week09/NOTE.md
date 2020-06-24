# Week09

## 定义

> The **HTMLCollection** interface represents a generic collection (array-like object similar to `arguments`) of elements (in document order) and offers methods and properties for selecting from the list.
>
> **NodeList** objects are collections of nodes, usually returned by properties such as `Node.childNodes` and methods such as `document.querySelectorAll()`.

## 相同点

- array-like，都有 `length` 属性
- item(index) 方法返回指定索引的节点，超出范围返回 `null`

> HTMLCollection[index]/NodeList[index] 超出范围返回 `undefined`

- 实时变动（live），`document` 上的更改会反映到相关对象上

> `Node.childNodes` 返回的 `NodeList` 是实时的，`document.querySelectorAll` 返回的 `NodeList` 不是实时的

## 不同点

- NodeList 可以包含任何节点类型，如 `Text`，`Comment`，`HTMLElement`，HTMLCollection 只包含元素节点 `HTMLElement`
- HTMLCollection 比 NodeList 多一项方法 `namedItem`，可以通过传递 id 或 name 属性来获取节点信息

## 代码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>HTMLCollection vs NodeList</title>
  </head>

  <body>
    <h1>China</h1>
    <!-- comment -->
    <p class="test">China is a popular country with...</p>
  </body>
</html>
```

```js
var h = document.body.getElementsByTagName("*");
// HTMLCollection(2) [h1, p]

var n = document.body.querySelectorAll("*");
// NodeList(2) [h1, p]

var cn = document.body.childNodes;
// NodeList(7) [text, h1, text, comment, text, p, text]

// 插入节点
document.body.appendChild(document.createElement("div"));

console.log(h);
// HTMLCollection(3) [h1, p, div] // 2 -> 3

console.log(n);
// NodeList(2) [h1, p] // 2

console.log(cn);
// NodeList(8) [text, h1, text, comment, text, p, text, div] // 2 -> 3
```

## 参考

> https://developer.mozilla.org/en-US/docs/Web/API/Node

> https://developer.mozilla.org/en-US/docs/Web/API/NodeList

> https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
