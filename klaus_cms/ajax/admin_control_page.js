var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var sqlite = require("../func/sqlite.js");
var public = require("../ajax/admin_control");

module.exports.run = function(body, pg, mo) {
  
  //第一步：获取参数
  var p = {};
  var f = {};
  p.状态 = "成功";
  
  var testing = public.all(body);

  if (testing.verify != "当前已登录") {
    p.状态 = testing.verify;
    return p;
  }

  //前台传参获取表格名称
  body.receive = JSON.parse(body.data);
  f.data = body.receive;
  f.session = body.session;

  var db = sqlite.connect();

  //第三步：控制可看页面
  var isPower = false;
  sql = "select id,权限 from 管_权限表 where id = '" + f.session.user_pid + "'";
  var power = sqlite.query(db, sql).数据;

  sqlite.close(db);

  f._权限 = JSON.parse(power[0].权限);
  if (power.length == 0) {
    f._power = "无此权限";
  } else {
    f._权限 = JSON.parse(power[0].权限);
    isPower = true;
    if (!isPower) {
      f._power = "无此权限";
    }
  }

  //第四步：权限分配
  var menu = config.get("menu");
  // 菜单（一级）
  var listMenu = [];
  // 导航（二级）
  var listNav = [];
  // 展示列表
  var listMenuShow = [];
  // 权限列表
  var listPower = [];

  for (var key in f._权限) {
    if (f._权限[key]["查看"] == "1") {
      listPower[f._权限[key]["字段"]] = "1";
    }
  }

  menu.forEach(function(item) {
    if (item.菜单) {
      item.菜单.forEach(function(name) {
        listNav[name.名称] = new Array();
        listMenu.push(name);
      });
    }

    if (item.导航) {
      item.导航.forEach(function(name) {
        if (listNav[name.菜单] && listPower[name.func]) {
          listNav[name.菜单].push(name);
        }
      });
    }
  });

  listMenu.forEach(function(name) {
    if (listNav[name.名称].length > 0) listMenuShow.push(name);
  });

  var list_ = [];
  for (i in listNav) {
    for (j in listNav[i]) {
      list_.push({ [i]: listNav[i][j] });
    }
  }

  p.listMenu = listMenuShow;
  p.listNav = list_;

  // console.log(p.listMenu)
  // console.log(p.listNav)

  return common.removenull(p);
};
