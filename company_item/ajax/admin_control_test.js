var cipher = require("../func/cipher.js");
var config = require("../func/config.js");
var share = require("../ajax/public/share.js");
var logs = require("../func/logs.js");
var pgdb = require("../func/pgdb.js");
var common = require("../func/common.js");
var request = require("../func/request.js");
var txsms = require("../func/txsms.js");
var moment = require("moment");
var sign = require("../func/sign.js");
var transliteration = require("transliteration");
var fs = require("fs");

module.exports.run = function(body, pg, mo) {
    var server = config.get("server");
    // console.log(body)
    var p = {};
    var f = {};
    
    //第一步：获取参数
    f.session = body.session;
    
  
    //第二步：是否存有登陆状态
    if((!f.session.user_name || f.session.user_name == null)){
        f._power = "当前未登陆";
    }
    if(!f.session.user_pid){
        return f;
    }

    //第三步：控制可看页面
    var isPower = false;
    sql = "select id,权限 from 管_权限表 where id = '" + f.session.user_pid + "'";
    var power = pgdb.query(pg, sql).数据;
    // console.log(power);

    if(power.length == 0) {
        f._power = "无此权限";
	}else{
        f._权限 = JSON.parse(power[0].权限);
        // console.log(f._权限);
        isPower = true;
        if( !isPower){
			f._power = "无此权限";
		}
    }

    //第三步：权限分配

    var menu = config.get('menu');
    // 菜单（一级）
    var listMenu = [];
    // 导航（二级）
    var listNav = [];
    // 展示列表
    var listMenuShow = [];
    // 权限列表
    var listPower = [];

    // console.log(f,"klldlf")

    for(var key in f._权限) {
		if(f._权限[key]['查看'] == '1') {
            listPower[f._权限[key]['字段']] = '1';
		}
    }
    
    menu.forEach(function(item) {
		if(item.菜单) {
			(item.菜单).forEach(function(name) {
                listNav[name.名称] = new Array;
                
                listMenu.push(name);
                // console.log(listMenu,"llllkkkkkk");
                
			});
		}
		
		if(item.导航) {
			(item.导航).forEach(function(name) {
				if(listNav[name.菜单] && listPower[name.func]){	
					// if(f.arg.nav == null || decodeURIComponent(f.arg.nav) == name.类别 || name.类别 == null || name.类别 == '管'){
                        listNav[name.菜单].push(name);
                        // console.log(listNav,"llllkkkkkk");

						// console.log(listNav,"ccc")
						// console.log(listPower[name.func],"ddd")
					// }
				}
			});
	
		}
	});

	listMenu.forEach(function(name) {
		if(listNav[name.名称].length > 0)
			listMenuShow.push(name);
	});
	
	p.listMenu = listMenuShow;
    p.listNav = listNav;
    
    // console.log(p.listMenu,"ttt")
    // console.log(p.listNav,"ppp")
    // for (var i in p.listNav){
    //     p.listNav+=p.listNav[i]
    // }
    
    console.log(p.listNav,"long")

    p.状态 = "成功";


    return common.removenull(p, body);
};
