# Week04

- 所有 JavaScript 代码是一个微任务，只是哪些微任务构成了一个宏任务；
- 执行在 JavaScript 引擎里的是微任务，执行在 JavaScript 引擎之外的是宏任务，循环宏任务的工作就是事件循环。

Promise resolve 的执行，产生了一个额外的微任务，添加在微任务队列的最后。

- 宏任务：setTimeout、setInterval、UI Event、Script；
- 微任务：Promise、MutationObserve
