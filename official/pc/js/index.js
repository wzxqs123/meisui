// 手机正则验证
var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

function lockscroll (argument) {
    // 锁定滚动条，不让底部标签可以移动
    $("html").css({
        "overflow" : "hidden"
    })
    $("body").css({
        "overflow" : "hidden"
    })
}
function relievescroll (argument) {
    // 解除锁定
    $("html").css({
        "overflow" : ""
    })
    $("body").css({
        "overflow" : ""
    })
}

// 点击空白部分隐藏内容
function freeBlank (floEve, formEve, noneEve) {
    $(floEve).on("click", function(e){
        var _target = $(e.target);
        if (_target.closest(formEve).length == 0) {
            // 隐藏内容
            $(floEve).addClass(noneEve);
            relievescroll(); // 解除锁定的滚动条
        }
    })
}

// 滑动模块逐渐上滑
var options = {
    animateThreshold: 0,
    scrollPollInterval: 50
}
$('.aniview').AniView(options);

// 打开右侧联系详情
$(".index-p-rnphone").click(function (e) {
    $(".index-p-consult").removeClass("none");
});
// 关闭右侧联系详情
$(".index-p-consultclose").click(function (e) {
    $(".index-p-consult").addClass("none")
});

// 点击显示微信二维码
function clickWechat (wechatLogo, wechatCode) {
    $(wechatLogo).click(function (e) {
        $(wechatCode).removeClass("none");
    });
}

// 点击返回顶部
var returnTop = null;
$(".index-p-rnreturn").click( function (e) {
    clearInterval(returnTop);
    var topVal = $(window).scrollTop();
    var speed = topVal / 20;
    returnTop = setInterval(handleFun, 17);
    function handleFun() {
        topVal -= speed;
        $(window).scrollTop(topVal);
        if (topVal <= 0) {
            clearInterval(returnTop);
        }
    }
});

// 导航部分显示二级子项
function itemShow (navItem, navItemNum, itemList) {
    $(navItem).eq(navItemNum).bind("mouseenter mouseleave", function (e) {
        if (e.type == 'mouseenter') {
            $(itemList).fadeIn("slow");
        } else {
            $(itemList).fadeOut("slow");
        }
    });
}
itemShow(".index-p-navitem", 5, ".index-p-navul");

// 点击显示微信二维码
clickWechat(".index-p-wechat", ".index-p-wechatcode");
clickWechat(".index-p-rnwechat", ".index-p-wechatcode");
// 点击微信二维码空白部分隐藏弹窗
freeBlank(".index-p-wechatcode", ".index-p-wechatcode img", "none");