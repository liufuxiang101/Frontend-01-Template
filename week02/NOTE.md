# Week02

- 编程语言通识
- JavaScript 词法 类型

## 编程语言通识

### 语言按语法分类

1. 非形式语言：中文、英文
2. 形式语言（乔姆斯基谱系）：0 型 无限制文法/1 型 上下文相关文法/2 型 上下文无关文法/3 型 正则文法

### 形式语言产生式

1. BNF
   - 尖括号括起来的名称表示语法结构名
   - 语法结构：基础结构称为终结符，复合结构称为非终结符
   - 引号和中间的字符表示终结符
   - 符号：() 括号，星号 多次，| 或，+ 至少一次
2. EBNF
3. ABNF

### 现代语言的特例

1. C++ 星号
2. VB \<
3. Python tab 空格
4. JavaScript /

### 语言分类

1. 用途：数据描述、编程语言
2. 表达方式：声明式、命令式

### 图灵完备性

1. 命令式-图灵机：用 goto 实现，用 if 和 while 实现
2. 声明式-lambda：用递归实现

### 动态与静态

1. 动态：用户设备/在线服务器上、实际运行时、Runtime
2. 静态：程序员设备上、开发时、Compiletime

### 类型系统：

1. 按动静划分：动态类型、静态类型
2. 按是否隐式转换：强类型、弱类型
3. 按复合类型划分：结构体、函数签名
4. 按继承：逆变、协变

### 一般命令式编程语言

1. Atom
2. Express
3. Statement
4. Structure
5. Program

## JavaScript 词法 类型

### Unicode

[https://home.unicode.org](https://home.unicode.org)
[https://www.fileformat.info/info/unicode/](https://www.fileformat.info/info/unicode/)

#### Block

- 范围：U+0000 - U+10FFFF
- Basic Latin：U+0000 - U+007F **编程不要使用 ascii 外字符**
- BMP: Basic Multilingual Plane U+0000 - U+FFFF https://www.sttmedia.com/unicode-basiclingualplane
- CJK: Chinese Japanese Korean U+4E00 - U+9FFF
- \u 转义
- ECMAScript 常用：

```js
Unicode Format-Control Characters

U+200C ZERO WIDTH NON-JOINER (ZWNJ) IdentifierPart
U+200D ZERO WIDTH JOINER (ZWJ) IdentifierPart
U+FEFF ZERO WIDTH NO-BREAK SPACE (ZWNBSP) WhiteSpace

White Space

U+0009 CHARACTER TABULATION (TAB)
U+000B LINE TABULATION (VT)
U+000C FORM FEED (FF)
U+0020 SPACE (SP)
U+00A0 NO-BREAK SPACE (NBSP)
U+FEFF ZERO WIDTH NO-BREAK SPACE (ZWNBSP)
Other category "Zs" Any other Unicode "Space_Separator" code point (USP)

Line Terminators

U+000A LINE FEED (LF)
U+000D CARRIAGE RETURN (CR)
U+2028 LINE SEPARATOR (LS)
U+2029 PARAGRAPH SEPARATOR (PS)
```

#### Categories

```js
Separate、Space

U+0020	SPACE
U+00A0	NO-BREAK SPACE
U+1680	OGHAM SPACE MARK
U+2000	EN QUAD
U+2001	EM QUAD
U+2002	EN SPACE
U+2003	EM SPACE
U+2004	THREE-PER-EM SPACE
U+2005	FOUR-PER-EM SPACE
U+2006	SIX-PER-EM SPACE
U+2007	FIGURE SPACE
U+2008	PUNCTUATION SPACE
U+2009	THIN SPACE
U+200A	HAIR SPACE
U+202F	NARROW NO-BREAK SPACE
U+205F	MEDIUM MATHEMATICAL SPACE
U+3000	IDEOGRAPHIC SPACE
```

### InputElement

#### WhiteSpace

```js
<TAB>
<VT> 纵向制表符
<FF> Form Feed
<SP> 推荐使用
<NBSP> 处理排版时，如果是普通的 <SP>，会在一行放不下时，将它左右断开；<NBSP> 它的左右不会断开
<ZWNBSP>
<USP>
```

#### LineTerminator

```js
<LF> Line Feed \n 换行 推荐使用
<CR> Carriage Return \r 回车
<LS>
<PS>
```

#### Comment

```js
//
/* */
```

#### Token

1. Punctuator 标点符号： > < = }...
2. IdentifierName：Identifier、Keywords、Future reserved Keywords
3. Literal：Number、String、Boolean、Null、Undefined

##### 1、Punctuator

标点符号 > < = } ...

##### 2、IdentifierName

- Identifier
- Keywords: await async break
- Future reserved Keywords: enum

##### 3、Literal

##### 3.1、Number

- IEEE754 Double Float
- Grammar：`DecimalLiteral` `BinaryIntegerLiteral` `OctalIntegerLiteral` `HexIntegerLiteral`
- Safe Integer: `Number.MAX_SAFE_INTEGER`
- Float Compare: `0.1 + 0.2 === 0.3 // false` => `Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON // true`
- `97.toString(2)` => `97 .toString(2)`

##### 3.2、String

- 字符集：ASCII、Unicode、UCS、GB、ISO-8859、BIG5
- Character 字符
- Code point 码点
- Encoding UTF：Unicode Transformation Format 通用转换格式 UTF-8 UTF-16
- Grammar："abc" 'abc' \`abc\`

##### 3.3、Boolean、Null、Undefined

```js
void 0; // undefined

function f() {
  // undefined 函数内被重写
  var undefined = 1;
  console.log(undefined); // 1
}

function f() {
  // null 不会被重写
  var null = 0;
  console.log(null); // null
}
```

## Summary

- 通过 BNF 练习，学习`形式语言产生式`生成过程，了解到通用编程语言的基础，通一晓百，不仅为学习 ECMA-262 规范打下了基础，同时也为学习其他编程语言打下基础
- 了解到现代编程语言的特例方式，语言的分类（用途/表达方式、动态/静态、类型系统），图灵完备性和语言的基本构成（Atom、Express、Statement、Structure、Program）
- Unicode 是计算机科学领域里的一项业界标准，包括字符集、编码方案等。它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。了解到其目前定义的各段 Block 和 Categories 种类，日常编码的安全范围（兼容 ascii 段）及 ECMAScript 中常用编码
- ECMAScript 中的主要 InputElement 部分：WhiteSpace、LineTerminator、Comment、Token，其中 Token 表示为有效的输入内容，包括 Punctuator、IdentifierName 和 Literal
- 了解到 IEEE754 Double Float 精度不准确导致计算问题以及解决方案，UTF-8 是 Encoding 实现
