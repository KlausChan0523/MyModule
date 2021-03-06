require.config({
  baseUrl: "/js/",
  paths: {
    //template层
    layui: "/template/layui/layui",

    //暂时不能调用
    // wangEditor: "/template/wangeditor/wangEditor.min",
    // oss: "http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min",  
    
    //lib层
    jquery: "lib/jquery.min",
    init: "lib/init",
    MD5: "lib/jQuery.md5",
    common: "lib/common",

    //ui层
    ui_login: "ui/ui_login",
    ui_index: "ui/ui_index",
    ui_main: "ui/ui_main",
    ui_leftNav: "ui/ui_leftNav",
    ui_user: "ui/ui_user",
    canvas_login: "ui/canvas_login",
    func_formControl: "ui/func_formControl",
    func_tableButton: "ui/func_tableButton",
    func_tableInit: "ui/func_tableInit",
    func_layer: "ui/func_layer",

    // 系统
    user_list: "ui/user_list",
    user_power: "ui/user_power",
    
    // 首页
    global_indexNews: "ui/global/global_indexNews",
    global_indexVideo: "ui/global/global_indexVideo",
    global_indexTemplate: "ui/global/global_indexTemplate",
    // 个人信息
    global_member: "ui/global/global_member",
    global_account: "ui/global/global_account",
    global_memberInformation: "ui/global/global_memberInformation",
    global_deviceManagement: "ui/global/global_deviceManagement",
    global_memberInformation_log: "ui/global/global_memberInformation_log",
    // 好友和群
    global_groupChat: "ui/global/global_groupChat",
    global_groupMember: "ui/global/global_groupMember",
    global_contact: "ui/global/global_contact",
    global_groupLiveRight_Apply: "ui/global/global_groupLiveRight_Apply",
    global_groupApplyRecord: "ui/global/global_groupApplyRecord",
    global_groupOperationRecord: "ui/global/global_groupOperationRecord",
    // 朋友圈
    global_postInfo: "ui/global/global_postInfo",
    global_postAdmire: "ui/global/global_postAdmire",
    global_postComment: "ui/global/global_postComment",
    global_postMsg: "ui/global/global_postMsg",

    // 充值全球币
    global_planSetting: "ui/global/global_planSetting",
    global_rechangeOrders: "ui/global/global_rechangeOrders",
    global_payOrders: "ui/global/global_payOrders",
    global_rechargeAlipay_logs: "ui/global/global_rechargeAlipay_logs",
    global_rechargeWechat_logs: "ui/global/global_rechargeWechat_logs",
    // 银行提现
    global_bankName: "ui/global/global_bankName",
    global_bankInfo: "ui/global/global_bankInfo",
    global_withdrawBankProcess: "ui/global/global_withdrawBankProcess",
    global_changeOrder: "ui/global/global_changeOrder",
    // 商学院直播
    spread_liveRecording: "ui/global/spread_liveRecording",
    spread_watchRecording: "ui/global/spread_watchRecording",
    spread_liveAttention: "ui/global/spread_liveAttention",
    spread_directBroadcast: "ui/global/spread_directBroadcast",
    spread_directBroadcastManager: "ui/global/spread_directBroadcastManager",
    // 群直播
    global_liveRecording: "ui/global/global_liveRecording",
    global_watchRecording: "ui/global/global_watchRecording",
    global_directBroadcastManager: "ui/global/global_directBroadcastManager",
    global_liveAttention: "ui/global/global_liveAttention",
    global_watchNumber: "ui/global/global_watchNumber",
    global_openOrders: "ui/global/global_openOrders",
    global_groupChatComplain: "ui/global/global_groupChatComplain",
    // 礼物
    global_giftRecord: "ui/global/global_giftRecord",
    global_giftListing: "ui/global/global_giftListing",
    global_giftExchangeRecord: "ui/global/global_giftExchangeRecord",
    // 短信与群发
    global_shortInfo_template: "ui/global/global_shortInfo_template",
    global_shortInfo_content: "ui/global/global_shortInfo_content",
    global_overseasTextCodeTable: "ui/global/global_overseasTextCodeTable",
    // 日志
    global_logMoney: "ui/global/global_logMoney",
    global_logNoMoney: "ui/global/global_logNoMoney",
    // 管理和设置
    global_groupSetting: "ui/global/global_groupSetting",
    global_explain: "ui/global/global_explain",
    global_setting: "ui/global/global_setting",
    global_livePower: "ui/global/global_livePower",
    global_creditSetting: "ui/global/global_creditSetting",
    // 其他
    global_picList: "ui/global/global_picList",
    global_viewFeedback: "ui/global/global_viewFeedback",
    global_concurrentProcessing: "ui/global/global_concurrentProcessing",
    global_identityVerification: "ui/global/global_identityVerification",
    global_massInfo: "ui/global/global_massInfo",
    global_chatRecord: "ui/global/global_chatRecord",
    global_viewFeedback: "ui/global/global_viewFeedback",
    global_cloudLogin: "ui/global/global_cloudLogin"
  },
  map: {
    "*": {
      css: "lib/css"
    }
  },
  shim: {
    // layui: ["css!/template/layui/css/layui.css","css!/css/main.css","css!/css/layer-set-myself.css"],
    func_layer: ["css!/css/layer-set-myself.css", "layui"],
    MD5: ["jquery"],
    common: ["jquery"],
    func_tableButton: ["common","layui"],
    func_formControl: ["common","layui"],
    func_tableInit: ["common","layui"],

    // 具体页面调用
    ui_login:["layui","jquery", "common","canvas_login","MD5"],
    ui_index:["layui", "jquery","ui_leftNav","common"],
    ui_main:["layui", "jquery","ui_leftNav","common"],
    ui_user:["layui", "jquery","ui_leftNav","common","MD5"],

    user_list: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    user_power: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],

    global_indexNews: ["layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer"],
    global_indexVideo: ["layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer"],
    global_indexTemplate: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_member: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_account: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_memberInformation: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_memberInformation_log: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_deviceManagement: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_groupChat: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_groupMember: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_contact: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_groupLiveRight_Apply: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_groupApplyRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_groupOperationRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_postInfo: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_postAdmire: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_postComment: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_postMsg: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    
    global_planSetting: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_rechangeOrders: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_payOrders: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_rechargeAlipay_logs: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_rechargeWechat_logs: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_bankName: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_bankInfo: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_withdrawBankProcess: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_changeOrder: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    spread_liveRecording: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    spread_watchRecording: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    spread_liveAttention: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    spread_directBroadcast: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    spread_directBroadcastManager: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_liveRecording: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_watchRecording: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_directBroadcastManager: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_liveAttention: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_watchNumber: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_openOrders: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_groupChatComplain: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_giftRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_giftListing: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_giftExchangeRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_shortInfo_template: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_shortInfo_content: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_overseasTextCodeTable: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_logMoney: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_logNoMoney: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_groupSetting: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_explain: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_setting: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_livePower: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_creditSetting: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_picList: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_viewFeedback: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_concurrentProcessing: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_identityVerification: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_massInfo: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_chatRecord: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_viewFeedback: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ],
    global_cloudLogin: [ "layui", "jquery", "common", "init", "func_formControl", "func_tableButton", "func_tableInit", "func_layer" ]
  }
});