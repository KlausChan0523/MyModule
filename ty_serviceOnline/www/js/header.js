'use strict';

document.write('<script src="./js/jquery-1.11.1.min.js"></script>');
document.write('<script src="./js/judge_browser.js"></script>');
document.write('<script src="./template/layui/layui.js"></script>');

document.write('\n<div class="header">\n        <div class="header-main">\n            <div class="clearfloat">\n                <div class="ic-symbol fl">\n                    <img src="./img/u0.jpg" alt="">\n                </div>\n                <div class="header-login fr">\n                    <input id="input_" type="text" placeholder="\u8BF7\u8F93\u5165\u641C\u7D22\u5173\u952E\u8BCD">\n                    <i class="search_"><img src="./img/u232.png"/></i>\n                    <span><a href="#">\u767B\u9646</a></span>\n                    <span><a href="#">\u65B0\u7528\u6237\u6CE8\u518C</a></span>\n                </div>\n            </div>            \n        </div>\n        <div class="header-nav">\n            <div class="clearfloat">\n                <ul class="header-nav-ul clearfloat layui-nav bgc-0d7 fl" lay-filter="">\n                    <li class="header-nav-item layui-nav-item page-index"><a href="index.html">\u9996\u9875</a></li>     \n                    <li class="header-nav-item layui-nav-item page-news">\n                        <a href="javascript:void(0);">\u8054\u76DF\u8D44\u8BAF</a>\n                        <dl class="header-nav-childItem layui-nav-child"> \n                            <dd><a href="news_league.html">\u8054\u76DF\u8D44\u8BAF</a></dd>\n                            <dd><a href="news_member.html">\u4F1A\u5458\u8D44\u8BAF</a></dd>\n                            <dd><a href="news_industry.html">\u884C\u4E1A\u65B0\u95FB</a></dd>\n                            <dd><a href="news_conversation.html">\u5BF9\u8BDD\u8BBF\u8C08</a></dd>\n                            <dd><a href="news_picture.html">\u56FE\u7247\u8D44\u8BAF</a></dd>\n                            \n                        </dl>\n                    </li>     \n                    <li class="header-nav-item layui-nav-item page-activity">\n                        <a href="javascript:void(0);">\u8FD1\u671F\u6D3B\u52A8</a>\n                        <dl class="header-nav-childItem layui-nav-child"> \n                            <dd><a href="activity_league.html">\u8054\u76DF\u6D3B\u52A8</a></dd>\n                            <dd><a href="activity_member.html">\u4F1A\u5458\u6D3B\u52A8</a></dd>\n                            <dd><a href="activity_industry.html">\u884C\u4E1A\u6D3B\u52A8</a></dd>\n                            <dd><a href="activity_topic.html">\u4E13\u9898\u6D3B\u52A8</a></dd>\n                        </dl>\n                    </li>     \n                    <li class="header-nav-item layui-nav-item page-member">\n                        <a href="javascript:void(0);">\u4F1A\u5458\u670D\u52A1</a>\n                        <dl class="header-nav-childItem layui-nav-child"> \n                            <dd><a href="member_service.html">\u670D\u52A1\u4ECB\u7ECD</a></dd>\n                            <dd><a href="member_join.html">\u5165\u4F1A\u6D41\u7A0B</a></dd>                            \n                            <dd><a href="member_list.html">\u4F1A\u5458\u540D\u5F55</a></dd>\n                            <dd><a href="member_elegant.html">\u4F1A\u5458\u98CE\u91C7</a></dd>\n                            <dd><a href="member_train.html">\u57F9\u8BAD\u54A8\u8BE2</a></dd>\n                        </dl>\n                    </li>    \n                    <li class="header-nav-item layui-nav-item page-study">\n                        <a href="javascript:void(0);">\u5B66\u672F\u7814\u7A76</a>\n                        <dl class="header-nav-childItem layui-nav-child"> \n                            <dd><a href="study_report.html">\u7814\u7A76\u62A5\u544A</a></dd>\n                            <dd><a href="study_standard.html">\u6807\u51C6\u8BA4\u8BC1</a></dd>\n                        </dl>\n                    </li>     \n                    <li class="header-nav-item layui-nav-item page-party">\n                        <a href="javascript:void(0);">\u8054\u76DF\u5E74\u4F1A</a>\n                        <dl class="header-nav-childItem layui-nav-child"> \n                            <dd><a href="party_thisYear.html">2018\u5E74\u4F1A</a></dd>\n                            <dd><a href="party_formerYear.html">\u5386\u5C4A\u5E74\u4F1A</a></dd>\n                        </dl>\n                    </li>     \n                    <li class="header-nav-item layui-nav-item page-picture"><a href="javascript:void(0);">\u5171\u4EAB\u56FE\u5E93</a></li>      \n                    <li class="header-nav-item layui-nav-item page-media">\n                        <a href="javascript:void(0);">\u5A92\u4F53\u4E2D\u5FC3</a>\n                        <dl class="header-nav-childItem layui-nav-child"> \n                            <dd><a href="media_center.html">\u8054\u76DF\u8D44\u6599</a></dd>\n                            <dd><a href="media_Ebook.html">\u8054\u76DF\u671F\u520A</a></dd>\n                        </dl>\n                    </li>     \n                    <li class="header-nav-item layui-nav-item page-forum"><a href="javascript:void(0);">\u793E\u533A\u8BBA\u575B</a></li>    \n                    <li class="header-nav-item layui-nav-item page-about">\n                        <a href="javascript:void(0);">\u5173\u4E8E\u6211\u4EEC</a>\n                        <dl class="header-nav-childItem layui-nav-child"> \n                            <dd><a href="about_us.html">\u5173\u4E8E\u6211\u4EEC</a></dd>\n                            <dd><a href="about_organization.html">\u7EC4\u7EC7\u673A\u6784</a></dd>\n                            <dd><a href="about_leader.html">\u8054\u76DF\u9886\u5BFC</a></dd>\n                            <dd><a href="about_contact.html">\u8054\u7CFB\u6211\u4EEC</a></dd>\n                        </dl>\n                    </li>\n                </ul>\n                <form class="header-nav-select layui-form fr">\n                    <select name="language_" lay-filter="language">\n                        <option value="1">\u4E2D\u6587</option>    \n                        <option value="0">English</option>                       \n                    </select>\n                </form>\n\n            </div>            \n        </div>\n    </div>\n');