// console.log("Hello, world!");
// phantom.exit();

var page = require("webpage").create();
page.open("http://www.baidu.cn", function (status) {
  console.log("Status: " + status);
  if (status === "success") {
    page.render("./baidu.png");

    var title = page.evaluate(function () {
      return document.title;
    });
    console.log("Page title is " + title);
  }
  phantom.exit();
});
