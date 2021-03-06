# Homework

## 写一个正则表达式，匹配所有 Number 直接量

[https://regexr.com/533br](https://regexr.com/533br)

```js
/(-?([0-9]+)?)\.([0-9]+)?([eE][+-]?[0-9]+)?/ // 十进制，科学计数

/0[bB][01]+/ // 二进制

/0[oO][0-7]+/ // 八进制

/0[xX][0-9a-fA-F]+/ // 十六进制

/(-?\d+)\.\d+/ // 浮点数

/-?\d+/ // 整数

// 综合
var reg = /(-?([0-9]+)?)\.([0-9]+)?([eE][+-]?[0-9]+)?|0[bB][01]+|0[oO][0-7]+|0[xX][0-9a-fA-F]+|(-?\d+)\.\d+|-?\d+/g
```

NumericLiteral ::

- DecimalLiteral
- BinaryIntegerLiteral
- OctalIntegerLiteral
- HexIntegerLiteral

DecimalLiteral ::

- DecimalIntegerLiteral . DecimalDigits(opt) ExponentPart(opt)
- . DecimalDigits ExponentPart(opt)
- DecimalIntegerLiteral ExponentPart(opt)

DecimalIntegerLiteral ::

- 0
- NonZeroDigit DecimalDigits(opt)

DecimalDigits ::

- DecimalDigit
- DecimalDigits DecimalDigit

DecimalDigit :: one of

- 0123456789

NonZeroDigit :: one of

- 123456789

ExponentPart ::

- ExponentIndicator SignedInteger

ExponentIndicator :: one of

- e E

SignedInteger ::

- DecimalDigits
- - DecimalDigits
- - DecimalDigits

BinaryIntegerLiteral ::

- 0b BinaryDigits
- 0B BinaryDigits

BinaryDigits ::

- BinaryDigit
- BinaryDigits BinaryDigit

BinaryDigit :: one of

- 0 1

OctalIntegerLiteral ::

- 0o OctalDigits
- 0O OctalDigits

OctalDigits ::

- OctalDigit
- OctalDigits OctalDigit

OctalDigit :: one of

- 01234567

HexIntegerLiteral ::

- 0x HexDigits
- 0X HexDigits

HexDigits ::

- HexDigit
- HexDigits HexDigit

HexDigit :: one of

- 0123456789abcdefABCDEF

## 写一个 UTF-8 Encoding 的函数

[https://tools.ietf.org/html/rfc3629#page-4](https://tools.ietf.org/html/rfc3629#page-4)

[http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

```js
// 0000 0000-0000 007F | 0xxxxxxx 0-127
// 0000 0080-0000 07FF | 110xxxxx 10xxxxxx 128-2047
// 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx 2048-65535
// 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx 65536-1114111

/*
Encoding a character to UTF-8 proceeds as follows:

1.  Determine the number of octets required from the character number
    and the first column of the table above.  It is important to note
    that the rows of the table are mutually exclusive, i.e., there is
    only one valid way to encode a given character.

2.  Prepare the high-order bits of the octets as per the second
    column of the table.

3.  Fill in the bits marked x from the bits of the character number,
    expressed in binary.  Start by putting the lowest-order bit of
    the character number in the lowest-order position of the last
    octet of the sequence, then put the next higher-order bit of the
    character number in the next higher-order position of that octet,
    etc.  When the x bits of the last octet are filled in, move on to
    the next to last octet, then to the preceding one, etc. until all
    x bits are filled in.
*/

/**
 * UTF-8 Encoding
 * @param {string} str 字符
 */

function encodeUTF8(str) {
  if (!str || typeof str !== "string") {
    return;
  }

  let i = 0;
  let bytes = [];
  let binaryStr;
  let code = str.codePointAt(0);

  if (code < 128) {
    bytes[i++] = (code & 63) | 128;
  } else if (code > 127 && code < 2048) {
    bytes[i++] = (code >> 6) | 192;
    bytes[i++] = (code & 63) | 128;
  } else if (code > 2047 && code < 65536) {
    bytes[i++] = (code >> 12) | 224;
    bytes[i++] = ((code >> 6) & 63) | 128;
    bytes[i++] = (code & 63) | 128;
  } else if (code > 65535 && code < 1114112) {
    bytes[i++] = (code >> 18) | 240;
    bytes[i++] = ((code >> 12) & 63) | 128;
    bytes[i++] = ((code >> 6) & 63) | 128;
    bytes[i++] = (code & 63) | 128;
  }

  binaryStr = bytes.map((item) => {
    return item.toString(2);
  });

  return {
    binary: binaryStr.join(""),
    hex: parseInt(binaryStr.join(""), 2).toString(16),
  };
}

console.log(encodeUTF8("严")); // {binary: "111001001011100010100101", hex: "e4b8a5"}
console.log(encodeUTF8("1")); // {binary: "10110001", hex: "b1"}
```

## 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

[https://regexr.com/53425](https://regexr.com/53425)

```js
/**
 * 不可以出现：
 * <LF> U+000A LINE FEED (LF)
 * <CR> U+000D CARRIAGE RETURN (CR)
 *
 * 可以出现：
 * "
 * '
 * <LS> U+2028 LINE SEPARATOR
 * <PS> U+2029 PARAGRAPH SEPARATOR
 * [0-9]
 * \['"\bfnrtv]
 * \x[0-9a-fA-F]{2}
 * \u[0-9a-fA-F]{4}
 */

var reg = /'(\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4})*'/g;
```

StringLiteral ::

- " DoubleStringCharacters(opt) "
- ' SingleStringCharacters(opt) '

DoubleStringCharacters ::

- DoubleStringCharacter DoubleStringCharacters(opt)

SingleStringCharacters ::

- SingleStringCharacter SingleStringCharacters(opt)

DoubleStringCharacter ::

- SourceCharacter but not one of " or \ or LineTerminator
- \<LS\>
- \<PS\>
- \ EscapeSequence
- LineContinuation

SingleStringCharacter ::

- SourceCharacter but not one of ' or \ or LineTerminator
- \<LS\>
- \<PS\>
- \ EscapeSequence
- LineContinuation

LineContinuation ::

- \ LineTerminatorSequence

EscapeSequence ::

- CharacterEscapeSequence
- 0 [lookahead ∉ DecimalDigit]
- HexEscapeSequence
- UnicodeEscapeSequence

CharacterEscapeSequence ::

- SingleEscapeCharacter
- NonEscapeCharacter

SingleEscapeCharacter :: one of

- ' " \ b f n r t v

NonEscapeCharacter ::

- SourceCharacter but not one of EscapeCharacter or LineTerminator

EscapeCharacter ::

- SingleEscapeCharacter
- DecimalDigit
- x
- u

HexEscapeSequence ::

- x HexDigit HexDigit

UnicodeEscapeSequence ::

- u Hex4Digits
- u{ CodePoint }

Hex4Digits ::

- HexDigit HexDigit HexDigit HexDigit
