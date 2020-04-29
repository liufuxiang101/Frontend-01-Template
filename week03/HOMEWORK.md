# Homework

## convertStringToNumber

```js
/**
 * convertStringToNumber
 */

function convertStringToNumber(str, radix = 10) {
  const zero = "0".codePointAt(0);

  let number = 0;
  let i = 0;

  while (i < str.length && str[i] !== ".") {
    number *= radix;
    number += str[i].codePointAt(0) - zero;
    i++;
  }

  if (str[i] === ".") {
    i++;
  }

  let fraction = 1;
  while (i < str.length) {
    fraction /= radix;
    number += (str[i].codePointAt(0) - zero) * fraction;
    i++;
  }

  // TODO: 带指数字符串 '22.023e8'

  return number;
}
```

## convertNumberToString

```js
/**
 * convertNumberToString
 */

function convertNumberToString(number, radix = 10) {
  let integer = Math.floor(number);
  let decimal = number - integer;
  let string = !integer ? "0" : "";

  while (integer > 0) {
    string = `${integer % radix}${string}`;
    integer = Math.floor(integer / radix);
  }

  if (decimal) {
    string += ".";

    while (decimal) {
      decimal *= radix;
      string += `${Math.floor(decimal)}`;
      decimal -= Math.floor(decimal);
    }
  }

  return string;
}
```
