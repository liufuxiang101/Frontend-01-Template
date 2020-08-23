# Week19

## ToyTool

## Publish

```js
const fs = require("fs");

let writeStream = fs.createWriteStream("");

// req.pipe(wirteStream);

req.on("data", (thunk) => {
  writeStream.write(thunk);
});

req.on("end", (thunk) => {
  writeStream.end(thunk);
});
```
