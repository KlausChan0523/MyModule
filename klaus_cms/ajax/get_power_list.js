var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require("../func/sqlite.js");
var public = require("../ajax/admin_control");

module.exports.run = function(body, pg, mo) {
  var server = config.get("server");
  var p = {};
  body.receive = JSON.parse(body.data);
  var f = body.receive;

  var menu = config.get("menu");
  var arr = [];
  menu.forEach(function(item) {
    for (i in item.导航) {
      if (item.导航[i].菜单 != undefined) {
        arr.push({
          菜单: item.导航[i].菜单,
          编号: item.导航[i].表格编号,
          字段: item.导航[i].表格名称,
          按钮: item.导航[i].功能按钮
        });
      }
    }
  });
  p.数据 = arr;
  p.状态 = "成功";
  return p;
};
