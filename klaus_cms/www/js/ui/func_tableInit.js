"use strict";

//获取iframe url的参数信息
var ifarme_func = window.top.document.getElementsByClassName("iframe_");
var tb_id = GetRequest(ifarme_func).page_id;
var func_arr = GetRequest(ifarme_func).func;
var get_func = [];
get_func[0] = func_arr.split("+")[0];
get_func[1] = func_arr.split("+")[1];
get_func[2] = func_arr.split("+")[2];
var form_special_control = {};
var data = {};
let page_save = "";
let tb_title = "";
let [success_func,error_func,obj_save]=["","",""];

// 表格渲染
layui.use(["table", "form", "upload"], function() {
  var table = layui.table;
  var form = layui.form;
  var upload = layui.upload;
  var $ = layui.jquery;

  // 存储[数据,表名,查询类别];
  data.field = "";
  data.tb_id = tb_id;
  data.type = "all";

  // ajax请求获取表格数据
  obj_save = {
    datas: [data.field, data.tb_id, data.type],
    func: get_func[0]
  };

  success_func = (res) => {
    tb_title = res.表格名称.replace("表", "").replace(/^[a-z]{0,8}_/, "");    
    // tb_title = tb_title.replace("表", "").replace(/^[\u2E80-\u9FFF]_/, "");
    $(".table-title").html(tb_title);

    // 渲染生成表格和按钮
    insertButton(table, res);   
    table_render(res);

    //单条查询10/21 zhou   

    form.on("select(search)", function(data) {
      if (data.value == "id") {
        $("#souVal").attr({
          onclick: "input_test2(this);",
          onkeyup: "input_test2(this);"
        });
      } else {
        $("#souVal").attr({ onclick, onkeyup });
      }
    });

    //搜索刷新列表
    form.render("select");
    $("#seacherButton").on("click", function() {
      var syllable = $(".layui-select-title input").val();
      var syllableVal = $("#souVal").val();   

      data.field = [syllable, syllableVal];
      data.tb_id = tb_id;
      data.type = "one";
      obj_save = {
        datas: [data.field, data.tb_id, data.type],
        func: get_func[0]
      };
      success_func = (res) => {
        var resSingle = res;
        table_render(resSingle);
      };
      error_func = (res) => {
        if (res.状态 == "获取列表异常") {
          layer.alert("查询无结果", { icon: 2 }, function(index) { layer.close(index) });
        } else {
          layer.alert(res.状态, { icon: 2 }, function(index) { history.go(0) });
        }
      };
      ajax.ajax_common(obj_save, success_func, error_func);
    });
  };
  error_func = (res) => {
    if (res.状态 == "获取列表异常") {
      //渲染标题
      tb_title = res.表格名称.replace("表", "").replace(/^[\u2E80-\u9FFF]_/, "");
      $(".table-title").html(tb_title);
      // table_render(res, toolbar);
      insertButton(table,res)
      $("section .table-container").html("<img class='no-data' src='/images/no_data.png'>")
    }
  };
  ajax.ajax_common(obj_save, success_func, error_func);
});

/**
 * 2017/10/23 write by zhou
 * 封装渲染表格
 * @param {Object} res
 */

function table_render(res) {
  layui.use(["table"], function() {
    let table = layui.table;
    let bar_set = $(".layui-hide .layui-btn").length;
    let th = [];

    // 引入工具条
    th.push({ checkbox: true, fixed: true, align: "center" }, { title: "操作", toolbar: "#act-bar", width: 180, fixed: true, align: "center" });

    // 插入表格头部
    for (let i in res.列表[0]) {
      th.push({ field: i, title: i, minWidth: 150, align: "center" });
      $(".select-test").append(`<option value="${i}">${i}</option>`);
    }

    // 排序、列宽等控制
    function set_sort(arg1,arg2) {
      arg1.sort = arg2;
    }
    function set_width(arg1,arg2) {
      arg1.minWidth = arg2;
    }

    for (let i in th) {
      if (th[i].field == "录入时间") {
        set_width(th[i],200);
      }
      if (th[i].field == "id") {
        set_width(th[i],100);
      }
      if (th[i].field == "用户id") {
        set_width(th[i],250);
      }
      if (th[i].field != "" && th[i].title != "操作") {
        set_sort(th[i],true);
      }
    }
    
    // 生成表格
    table.render({
      elem: "#demo",
      id: "common-table",
      data: res.列表,
      width: "auto",
      cellMinWidth: "120px",
      height: "full-155",
      cols: [th],
      skin: "row", //表格风格
      even: true,
      page: {curr:1}, //是否显示分页
      limits: [10, 15, 20, 50, 100, 500],
      limit: 20, //每页默认显示的数量
      done: function(res, curr, count){
        //如果是异步请求数据方式，res即为你接口返回的信息。
        //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
        console.log(res);
        console.log(curr);
        page_save = curr;
      },
      // url:"/ajax.post?func=page_select_all",
      // method:'post',
      // request: {
      //   pageName: 'curr' //页码的参数名称，默认：page
      //   ,limitName: 'nums' //每页数据量的参数名，默认：limit
      // }    
    });
  });
}


function insertButton(table,res) {
  // 功能按钮渲染
  obj_save = { datas: tb_id, func: "admin_control_function" };
  success_func = (res) => {
    if (res.keyPower != "") {
      var key_arr = [];
      for (let i in res.keyPower) {
        key_arr.push(res.keyPower[i]);
      }
    }
    if (key_arr != "") {
      for (let j in key_arr) {
        if (key_arr[j] == "删除" || key_arr[j] == "编辑") {
          switch (key_arr[j]) {
            case "编辑":
              $(".layui-hide").append(`<a class="layui-btn layui-btn-mini" lay-event="edit"><i class="layui-icon" style="font-size: 16px; color: #eee;">&#xe642;</i> ${key_arr[j]}</a>`);
              break;
            case "删除":
              $(".layui-hide").append( `<a class="layui-btn layui-btn-danger layui-btn-mini" lay-event="del"><i class="layui-icon" style="font-size: 16px; color: #eee;">&#x1006;</i> ${key_arr[j]}</a>`);
              break;
          }
        } else if (key_arr[j] == "新增" || key_arr[j] == "批量删除") {
          switch (key_arr[j]) {
            case "新增":
              $(".layui-btn-group").append(`<a class="layui-btn layui-btn-normal layui-btn-mini" data-type="insertData"> <i class="layui-icon">&#xe654;</i> ${key_arr[j]} </a>`);
              break;
            case "批量删除":
              $(".layui-btn-group").append(`<a class="layui-btn layui-btn-normal layui-btn-mini" data-type="deleteData" style="margin-left:10px!important"> <i class="layui-icon">&#xe640;</i> ${key_arr[j]} </a>`);
              break;
          }
        }
      }
    }

    // 通用按钮(无限制)
    // 刷新
    $(".layui-btn-group").append( `<a class="layui-btn layui-btn-normal layui-btn-mini btn-refresh" data-type="refresh" style="margin-left:10px!important"> <i class="layui-icon">&#x1002;</i>刷新</a>` );

    $(".btn-refresh").mouseover(function() {
      $(".btn-refresh") .find("i") .addClass("layui-anim layui-anim-rotate layui-anim-loop");
    });
    $(".btn-refresh").mouseout(function() {
      $(".btn-refresh") .find("i") .removeClass("layui-anim layui-anim-rotate layui-anim-loop");
    });

    // 获取按钮后表格外按钮重载
    $(".layui-btn").on("click", function() {
      var type = $(this).data("type");
      active[type] ? active[type].call(this) : "";
    });

    // 获取按钮后表格内按钮重载
    table.reload("common-table");
  
  };
  error_func = (res) => {
    if (res.状态 == "当前未登录") {
      parent.layer.open({
        type: 1,
        title: "信息",
        area: "310px",
        id: "LAY_layuipro",
        btn: ["确定"],
        content:'<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;"><p>登陆已超时</p></div>',
        yes: function() {
          parent.window.location.href = "/page/login.html";
        }
      });
    }
  };
  ajax.ajax_common(obj_save, success_func, error_func);

  //表格内功能工具条
  table.on("tool(demo)", function(obj) {
    //注：tool是工具条事件名，common-table是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data, //获得当前行数据
    layEvent = obj.event; 
    switch (layEvent) {
      case "detail":
        layer.msg("查看操作");
        break;
      case "del":
        layer.confirm(`确认删除 id=${data.id} 此条数据？`,{title:"删除"}, function(index) {
          var select_id = [];
          select_id.push(data.id);
          table_act.delete(res, tb_id, select_id);
          // obj.del(); //删除对应行（tr）的DOM结构
          layer.close(index);
        });
        break;
      case "edit":
        table_act.update(res, tb_id, data);
        break;
    }
  });

  //表格外功能工具条
  var active = {
    refresh: () => {history.go(0)},
    insertData: () => {table_act.insert(res, tb_id)},
    deleteData: () => {
      var checkStatus = table.checkStatus("common-table");
      var select_id = [];      
      var data = checkStatus.data;
      for (let i in checkStatus.data) {
        select_id.push(checkStatus.data[i].id);
      }
      if (select_id.length > 1) {
        layer.confirm(`确认删除 id=${select_id} 此 ${select_id.length} 条数据？`,{title:"批量删除"}, function(index) {
          table_act.delete(res, tb_id, select_id);
          layer.close(index);
        });
      } else {
        layer.msg("请选择多项数据");
      }
    }
  };
}


