// 获取用户名和头像等信息
var obj_save = { datas: {}, func: "admin_control_getUserInfo" };
var success_func = function(res) {
  console.log(res);
  $(".userName").html(res.姓名);
  if (res.头像 != "" && res.头像 != "undefined") {
    $("#updateImg").attr("src", res.头像);
    $("#updateImg1").attr("src", res.头像);
    window.sessionStorage.setItem("avatar", res.头像);
  } else {
    $("#updateImg").attr("src", "/images/zhihu.jpg");
    $("#updateImg1").attr("src", "/images/zhihu.jpg");
    window.sessionStorage.setItem("avatar", "/images/zhihu.jpg");
  }

  if (res.解锁密码 != "" && res.解锁密码 != "undefined") {
    window.sessionStorage.setItem("password", res.解锁密码);
  } else {
    window.sessionStorage.setItem("password", "123");
  }

  window.sessionStorage.setItem("name", res.姓名);
};
var error_func = function(res) {
  if (res.状态 == "当前未登录") {
    window.location.href = "page/login.html";
  }
};
ajax.ajax_common(obj_save, success_func);

var $, tab, skyconsWeather;
var name = window.sessionStorage.getItem("name");
var password = window.sessionStorage.getItem("password");
layui
  .config({
    base: "js/"
  })
  .use(["bodyTab", "form", "element", "layer", "jquery", "flow"], function() {
    var form = layui.form,
      layer = layui.layer,
      element = layui.element,
      flow = layui.flow;

    $ = layui.jquery;
    tab = layui.bodyTab({
      openTabNum: "50", //最大可打开窗口数量
      url: "json/navs.json" //获取菜单json地址
    });

    //更换皮肤
    function skins() {
      var skin = window.sessionStorage.getItem("skin");
      if (skin) {
        //如果更换过皮肤
        if (window.sessionStorage.getItem("skinValue") != "自定义") {
          $("body").addClass(window.sessionStorage.getItem("skin"));
        } else {
          $(".layui-layout-admin .layui-header").css(
            "background-color",
            skin.split(",")[0]
          );
          $(".layui-bg-black").css("background-color", skin.split(",")[1]);
          $(".hideMenu").css("background-color", skin.split(",")[2]);
        }
      }
    }
    skins();

    var client = new OSS.Wrapper({
      region: "oss-cn-shenzhen",
      accessKeyId: "LTAIRz4pA6Qeu12D",
      accessKeySecret: "ZASbh3Xg1RtSo6VxwLnNkSlNvXNMYJ",
      bucket: "zyk-temp"
    });
    /**
     * zhou 上传头像
     */

    document.getElementById("putTou").addEventListener("change", function(e) {
      var file = e.target.files[0];
      var storeAs = new Date().getTime();
      client
        .multipartUpload(file.name, file, {})
        .then(function(result) {
          var dataImg = {};
          dataImg.头像 = result.res.requestUrls[0].split("?")[0];          
          dataImg = JSON.stringify(dataImg);
          $.ajax({
            url: "/ajax.post?func=updateAdiminImg",
            type: "POST",
            data: "data=" + dataImg,
            success: function(json) {
              $("#updateImg").attr("src", json.头像);
              $("#updateImg1").attr("src", json.头像);
              window.sessionStorage.setItem("avatar", json.头像);
            }
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    $(".changeSkin").click(function() {
      layer.open({
        title: "更换皮肤",
        area: ["310px", "280px"],
        type: "1",
        content:
          '<div class="skins_box">' +
          '<form class="layui-form">' +
          '<div class="layui-form-item">' +
          '<input type="radio" name="skin" value="默认" title="默认" lay-filter="default" checked="">' +
          '<input type="radio" name="skin" value="橙色" title="橙色" lay-filter="orange">' +
          '<input type="radio" name="skin" value="蓝色" title="蓝色" lay-filter="blue">' +
          '<input type="radio" name="skin" value="自定义" title="自定义" lay-filter="custom">' +
          '<div class="skinCustom">' +
          '<input type="text" class="layui-input topColor" name="topSkin" placeholder="顶部颜色" />' +
          '<input type="text" class="layui-input leftColor" name="leftSkin" placeholder="左侧颜色" />' +
          '<input type="text" class="layui-input menuColor" name="btnSkin" placeholder="顶部菜单按钮" />' +
          "</div>" +
          "</div>" +
          '<div class="layui-form-item skinBtn">' +
          '<a href="javascript:;" class="layui-btn layui-btn-small layui-btn-normal" lay-submit="" lay-filter="changeSkin">确定更换</a>' +
          '<a href="javascript:;" class="layui-btn layui-btn-small layui-btn-primary" lay-submit="" lay-filter="noChangeSkin">我再想想</a>' +
          "</div>" +
          "</form>" +
          "</div>",
        success: function(index, layero) {
          var skin = window.sessionStorage.getItem("skin");
          if (window.sessionStorage.getItem("skinValue")) {
            $(
              ".skins_box input[value=" +
                window.sessionStorage.getItem("skinValue") +
                "]"
            ).attr("checked", "checked");
          }
          if ($(".skins_box input[value=自定义]").attr("checked")) {
            $(".skinCustom").css("visibility", "inherit");
            $(".topColor").val(skin.split(",")[0]);
            $(".leftColor").val(skin.split(",")[1]);
            $(".menuColor").val(skin.split(",")[2]);
          }
          form.render();
          $(".skins_box").removeClass("layui-hide");
          $(".skins_box .layui-form-radio").on("click", function() {
            var skinColor;
            if (
              $(this)
                .find("span")
                .text() == "橙色"
            ) {
              skinColor = "orange";
            } else if (
              $(this)
                .find("span")
                .text() == "蓝色"
            ) {
              skinColor = "blue";
            } else if (
              $(this)
                .find("span")
                .text() == "默认"
            ) {
              skinColor = "";
            }
            if (
              $(this)
                .find("span")
                .text() != "自定义"
            ) {
              $(".topColor,.leftColor,.menuColor").val("");
              $("body")
                .removeAttr("class")
                .addClass("main_body " + skinColor + "");
              $(".skinCustom").removeAttr("style");
              $(
                ".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header"
              ).removeAttr("style");
            } else {
              $(".skinCustom").css("visibility", "inherit");
            }
          });
          var skinStr, skinColor;
          $(".topColor").blur(function() {
            $(".layui-layout-admin .layui-header").css(
              "background-color",
              $(this).val()
            );
          });
          $(".leftColor").blur(function() {
            $(".layui-bg-black").css("background-color", $(this).val());
          });
          $(".menuColor").blur(function() {
            $(".hideMenu").css("background-color", $(this).val());
          });

          form.on("submit(changeSkin)", function(data) {
            if (data.field.skin != "自定义") {
              if (data.field.skin == "橙色") {
                skinColor = "orange";
              } else if (data.field.skin == "蓝色") {
                skinColor = "blue";
              } else if (data.field.skin == "默认") {
                skinColor = "";
              }
              window.sessionStorage.setItem("skin", skinColor);
            } else {
              skinStr =
                $(".topColor").val() +
                "," +
                $(".leftColor").val() +
                "," +
                $(".menuColor").val();
              window.sessionStorage.setItem("skin", skinStr);
              $("body")
                .removeAttr("class")
                .addClass("main_body");
            }
            window.sessionStorage.setItem("skinValue", data.field.skin);
            layer.closeAll("page");
          });
          form.on("submit(noChangeSkin)", function() {
            $("body")
              .removeAttr("class")
              .addClass(
                "main_body " + window.sessionStorage.getItem("skin") + ""
              );
            $(
              ".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header"
            ).removeAttr("style");
            skins();
            layer.closeAll("page");
          });
        },
        cancel: function() {
          $("body")
            .removeAttr("class")
            .addClass(
              "main_body " + window.sessionStorage.getItem("skin") + ""
            );
          $(
            ".layui-bg-black,.hideMenu,.layui-layout-admin .layui-header"
          ).removeAttr("style");
          skins();
        }
      });
    });

    //退出
    $(".signOut").click(function() {
      window.sessionStorage.removeItem("menu");
      menu = [];
      window.sessionStorage.removeItem("curmenu");
    });

    //隐藏左侧导航
    $(".hideMenu").click(function() {
      $(".layui-layout-admin").toggleClass("showMenu");
      $(".hideMenu").toggleClass("icon-rotate-90");
      //渲染顶部窗口
      tab.tabMove();
    });

    //渲染左侧菜单
    tab.render();

    //锁屏
    function lockPage() {
      var name = window.sessionStorage.getItem("name");
      var avatar = window.sessionStorage.getItem("avatar");

      layer.open({
        title: false,
        skin: "lock-layer",
        type: 1,
        content:
          '	<div class="admin-header-lock" id="lock-box">' +
          '<div class="admin-header-lock-img"><img src="' +
          avatar +
          '"/></div>' +
          '<div class="admin-header-lock-name" id="lockUserName">' +
          name +
          "</div>" +
          '<div class="input_btn">' +
          '<input type="password" class="admin-header-lock-input layui-input" autocomplete="off" placeholder="请输入密码解锁.." name="lockPwd" id="lockPwd" />' +
          '<button class="layui-btn" id="unlock">解锁</button>' +
          "</div>" +
          "</div>",
        closeBtn: 0,
        shade: 0.1,
        offset: ["25%"],
        success: function() {
          // $(".layui-layer-shade").css({"background":"url(images/bg-lock.jpg)","background-size":"cover","background-repeat":"no-repeat"});
          // $(".now-time").css({"position":"absolute","left":"50%","top":"30%","transform":"translate(-50%,-50%)","font-size":"40px"});
          $(".layui-layer-shade")
            .append(
              '<img class="bg-lock" src="images/bg-lock.jpg"/><div class="now-time"></div>'
            )
            .css({ opacity: "1" });

          var currentTime = "";
          setInterval(function() {
            var date = new Date();
            date.date = date.getDate();
            date.hour =
              date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            date.minute =
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes();
            date.second =
              date.getSeconds() < 10
                ? "0" + date.getSeconds()
                : date.getSeconds();
            currentTime = date.hour + ":" + date.minute + ":" + date.second;
            $(".now-time").html(currentTime);
          }, 0);
        }
      });
      $(".admin-header-lock-input").focus();
    }

    $(".lockcms").on("click", function() {
      window.sessionStorage.setItem("lockcms", true);
      lockPage();
    });
    // 判断是否显示锁屏
    if (window.sessionStorage.getItem("lockcms") == "true") {
      lockPage();
    }
    // 解锁
    $("body").on("click", "#unlock", function() {
      var password = window.sessionStorage.getItem("password");
      if (
        $(this)
          .siblings(".admin-header-lock-input")
          .val() == ""
      ) {
        layer.msg("请输入解锁密码！");
        $(this)
          .siblings(".admin-header-lock-input")
          .focus();
      } else {
        if (
          $(this)
            .siblings(".admin-header-lock-input")
            .val() == password
        ) {
          window.sessionStorage.setItem("lockcms", false);
          $(this)
            .siblings(".admin-header-lock-input")
            .val("");
          layer.closeAll("page");
        } else {
          layer.msg("密码错误，请重新输入！");
          $(this)
            .siblings(".admin-header-lock-input")
            .val("")
            .focus();
        }
      }
    });
    $(document).on("keydown", function() {
      if (event.keyCode == 13) {
        $("#unlock").click();
      }
    });

    //手机设备的简单适配
    var treeMobile = $(".site-tree-mobile"),
      shadeMobile = $(".site-mobile-shade");

    treeMobile.on("click", function() {
      $("body").addClass("site-mobile");
    });

    shadeMobile.on("click", function() {
      $("body").removeClass("site-mobile");
    });

    // 添加新窗口
    $("body").on("click", ".layui-nav .layui-nav-item a", function() {
      //如果不存在子级
      if ($(this).siblings().length == 0) {
        addTab($(this));
        $("body").removeClass("site-mobile"); //移动端点击菜单关闭菜单层
      }
      $(this)
        .parent("li")
        .siblings()
        .removeClass("layui-nav-itemed");
    });
    //公告层
    (function () {
      $.ajax({
        url: "../json/systemParameter.json",
        type: "get",
        dataType: "json",
        success: function(data) {
          var main_title = data.cmsName;
          if(main_title != ""){
            $(".main-title").html(main_title)            
          }else{
            $(".main-title").html("中网商管理平台")
          }
        }
      })
    })()
    //公告层
    function showNotice() {
      $.ajax({
        url: "../json/systemParameter.json",
        type: "get",
        dataType: "json",
        success: function(data) {
          var notice = data.notice;
          layer.open({
            type: 1,
            title: "系统公告",
            closeBtn: false,
            area: "310px",
            shade: 0.8,
            id: "LAY_layuipro",
            btn: ["收起"],
            moveType: 1,
            content:
              '<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;"><p>' +
              notice +
              "</p></div>",
            success: function(layero) {
              var btn = layero.find(".layui-layer-btn");
              btn.css("text-align", "center");
              btn.on("click", function() {
                window.sessionStorage.setItem("showNotice", "true");
              });
            }
          });
        }
      });
    }
    //判断是否处于锁屏状态(如果关闭以后则未关闭浏览器之前不再显示)
    if (
      window.sessionStorage.getItem("lockcms") != "true" &&
      window.sessionStorage.getItem("showNotice") != "true"
    ) {
      showNotice();
    }
    $(".showNotice").on("click", function() {
      showNotice();
    });

    // //刷新后还原打开的窗口
    // if (window.sessionStorage.getItem("menu") != null) {
    //   menu = JSON.parse(window.sessionStorage.getItem("menu"));
    //   curmenu = window.sessionStorage.getItem("curmenu");
    //   var openTitle = "";
    //   for (var i = 0; i < menu.length; i++) {
    //     openTitle = "";
    //     if (menu[i].icon) {
    //       if (menu[i].icon.split("-")[0] == "icon") {
    //         openTitle += '<i class="iconfont ' + menu[i].icon + '"></i>';
    //       } else {
    //         openTitle += '<i class="layui-icon">' + menu[i].icon + "</i>";
    //       }
    //     }
    //     openTitle += "<cite>" + menu[i].title + "</cite>";
    //     openTitle +=
    //       '<i class="layui-icon layui-unselect layui-tab-close" data-id="' +
    //       menu[i].layId +
    //       '">&#x1006;</i>';
    //     element.tabAdd("bodyTab", {
    //       title: openTitle,
    //       content:
    //         "<iframe class='iframe_' src='" +
    //         menu[i].href +
    //         "' data-id='" +
    //         menu[i].layId +
    //         "'  ></frame>",
    //       id: menu[i].layId
    //     });
    //     //定位到刷新前的窗口
    //     if (curmenu != "undefined") {
    //       if (curmenu == "" || curmenu == "null") {
    //         //定位到后台首页
    //         element.tabChange("bodyTab", "");
    //       } else if (JSON.parse(curmenu).title == menu[i].title) {
    //         //定位到刷新前的页面
    //         element.tabChange("bodyTab", menu[i].layId);
    //       }
    //     } else {
    //       element.tabChange("bodyTab", menu[menu.length - 1].layId);
    //     }
    //   }
    //   //渲染顶部窗口
    //   tab.tabMove();
    // }

    //刷新当前
    $(".refresh").on("click", function() {
      //此处添加禁止连续点击刷新一是为了降低服务器压力，另外一个就是为了防止超快点击造成chrome本身的一些js文件的报错(不过貌似这个问题还是存在，不过概率小了很多)
      if ($(this).hasClass("refreshThis")) {
        $(this).removeClass("refreshThis");
        $(".clildFrame .layui-tab-item.layui-show")
          .find("iframe")[0]
          .contentWindow.location.reload(true);
        setTimeout(function() {
          $(".refresh").addClass("refreshThis");
        }, 2000);
      } else {
        layer.msg("您点击的速度超过了服务器的响应速度，还是等两秒再刷新吧！");
      }
    });

    //关闭其他
    $(".closePageOther").on("click", function() {
      if (
        $("#top_tabs li").length > 2 &&
        $("#top_tabs li.layui-this cite").text() != "后台首页"
      ) {
        var menu = JSON.parse(window.sessionStorage.getItem("menu"));
        $("#top_tabs li").each(function() {
          if ($(this).attr("lay-id") != "" && !$(this).hasClass("layui-this")) {
            element.tabDelete("bodyTab", $(this).attr("lay-id")).init();
            //此处将当前窗口重新获取放入session，避免一个个删除来回循环造成的不必要工作量
            for (var i = 0; i < menu.length; i++) {
              if ($("#top_tabs li.layui-this cite").text() == menu[i].title) {
                menu.splice(0, menu.length, menu[i]);
                window.sessionStorage.setItem("menu", JSON.stringify(menu));
              }
            }
          }
        });
      } else if (
        $("#top_tabs li.layui-this cite").text() == "后台首页" &&
        $("#top_tabs li").length > 1
      ) {
        $("#top_tabs li").each(function() {
          if ($(this).attr("lay-id") != "" && !$(this).hasClass("layui-this")) {
            element.tabDelete("bodyTab", $(this).attr("lay-id")).init();
            window.sessionStorage.removeItem("menu");
            menu = [];
            window.sessionStorage.removeItem("curmenu");
          }
        });
      } else {
        layer.msg("没有可以关闭的窗口了");
      }
      //渲染顶部窗口
      tab.tabMove();
    });
    //关闭全部
    $(".closePageAll").on("click", function() {
      if ($("#top_tabs li").length > 1) {
        $("#top_tabs li").each(function() {
          if ($(this).attr("lay-id") != "") {
            element.tabDelete("bodyTab", $(this).attr("lay-id")).init();
            window.sessionStorage.removeItem("menu");
            menu = [];
            window.sessionStorage.removeItem("curmenu");
          }
        });
      } else {
        layer.msg("没有可以关闭的窗口了@_@");
      }
      //渲染顶部窗口
      tab.tabMove();
    });
  });

//打开新窗口
function addTab(_this) {
  tab.tabAdd(_this);
}
