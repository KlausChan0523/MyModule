var ajax = {};
ajax.ajax_depend_concurrent = function (obj_save, success_func, error_func, type) {
	var ajax_type;
	var flags = 1;
	var func = obj_save.func;
	var datas = obj_save.datas;
	if (!arguments[2]) { error_func = function () { }; }
	if (!arguments[3]) { ajax_type = "POST"; }
	datas = JSON.stringify(datas);
	if (flags) {
		$.ajax({
			type: "POST",
			url: func,
			data: "data=" + datas,
			beforeSend: function () {
				$(".opacity-bg").show();
				$(".spinner").show();
			},
			success: function (p) {
				if ((p.状态 = "成功")) {
					setTimeout(function () {
						success_func(p);
						$(".opacity-bg").hide();
						$(".spinner").hide();
					}, 2000);
				} else { error_func(p); }
			}
		});
	}
};

ajax.ajax_common = function (obj_save, success_func, error_func, type) {

	var ajax_type;

	if (!arguments[2]) { error_func = function () { }; }
	if (!arguments[3]) { ajax_type = "POST"; }
	var func = obj_save.func;
	var datas = obj_save.datas;
	datas = JSON.stringify(datas);

	var ajax_type;

	if (!arguments[2]) { error_func = function () { }; }
	if (!arguments[3]) { ajax_type = "POST"; }
	var func = obj_save.func;
	var datas = obj_save.datas;
	datas = JSON.stringify(datas);
	// console.log(func)


	$.ajax({
		type: "POST",
		url: "/ajax.post?func=" + func,
		data: "data=" + datas,
		success: function (res) {
			console.log(res)
			if (res.状态 == "成功") {
				success_func(res);
			} else if(res.状态 == "当前未登录"){ 
				layer.open({
					type: 1,
					title: "信息",
					area: '310px',
					btn: ['确定'],
					content: '<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;"><p>登陆已超时</p></div>',
					yes:function(){
						window.location.href="page/login/login.html";					
					}
				});
			} else {
				error_func(res);			
			}
			return false;
		}
	});

};

function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/**
 * 2017/10/23 write by zhou
 * 封装渲染表格
 * @param {Object} res
 */
function changeTableStutas(res,toolbar) {
	layui.use(['table', 'form'], function () {
		var table = layui.table;
		var bar_set = $(".layui-hide .layui-btn").length;
		var th = [];
		if(toolbar == "flase"){
			th.push({ checkbox: true, fixed: true, align: "center" });		
		}else{
			th.push({ checkbox: true, fixed: true, align: "center" }, { title: "操作", toolbar: "#act-bar", width: 180, fixed: true, align: "center" });				
		}
		for (var i in res.列表[0]) {
			th.push({ field: i, title: i, width: "120", align: "center" });
			$(".select-test").append("<option value='" + i + "'>" + i + "</option>");
		}		
		th[2].sort = true;

		// 生成表格
		window.demoTable = table.render({
			initSort: {
				field: 'id', //排序字段，对应 cols 设定的各字段名				
				type: 'asc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
			},
			elem: "#demo",
			id: "test",
			data: res.列表,
			width: "auto",
			cols: [th],
			skin: "row", //表格风格
			even: true,
			page: true, //是否显示分页
			limits: [10, 15, 20],
			limit: 15 //每页默认显示的数量
		});
	});

}

//阻止冒泡的兼容性写法
function stopBubble(e){
    e = e ? e : (window.event ? window.event :null);
    if(e&&e.stopPropagation){
        e.stopPropagation()
    }else if(window.event){
        window.event.cancelBubble=true;
    }
}


//阻止浏览器默认行为的兼容性写法
function stopDefault(e){
    e = e ? e : (window.event ? window.event :null);
    //阻止默认浏览器动作(W3C)
    if(e&&e.preventDefault){
        e.preventDefault();
    }else{
        //IE中阻止函数默认动作的方式
        window.event.returnValue=false;      
    }
    return false;
}
