# Week05

```js
// Request

POST / HTTP/1.1                                 // request line
Host: 127.0.0.1                                 // headers
Content-Type: application/x-www-form-urlencoded

field1=aaa&code=x%3D1                           // headers

// Response

HTTP/1.1 200 OK                                 // status line
Content-Type: text/html                         // headers
Date: Mon, 23 Dec 2019 06:46:19 GMT
Connection: keep-alive
Transfer-Encoding: chunked

26                                              // body
<html><body> Hello World<body></html>
26<html><body> Hello World<body></html>
0
```

`OPTIONS` `GET` `HEAD` `POST` `PUT` `TRACE` `CONNECT`

`HTTP` 文本协议，`\r` `\n` 换行区分

`TCP` 字节流传输
