// 手机正则验证
var phoneReg = /^1((((3[4-9])|(5[0-27-9])|(8[2-478])|(78)|(47))|((3[0-2])|([58][56])|(76)|(45))|(([35]3)|(8[019])|(77))|((70)))\d{8})|(1349[0-9]{7})$/;
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

// 点击返回顶部，返回顶部
$(".index-callser").on('click', 'span', function(event) {
    $('body,html').stop(true).animate({
        "scrollTop" : "0"
    },500);
});
// 滚动滚动条时出现或隐藏图标
$(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        $(".index-callser span").stop(true).animate({
            "opacity" : 1
        }, 500)
    } else {
        $(".index-callser span").stop(true).animate({
            "opacity" : 0
        }, 500)
    }
})

// 鼠标移至客服，商务合作上显示详情
function mouseFun (mainEve, alertEve) {
    mainEve.on("mouseenter", function() {
        $(this).children(alertEve).removeClass("none");
    });
    mainEve.on("mouseleave", function() {
        $(this).children(alertEve).addClass("none");
    });
}
mouseFun($(".index-callser a"), ".index-callhover");
mouseFun($(".index-busicoo"), ".index-busicoopic");
// 弹窗移至弹窗本身时显示
function popup (alertEve) {
    $(alertEve).on("mouseenter", function() {
        $(this).removeClass("none");
    });
    $(alertEve).on("mouseleave", function() {
        $(this).addClass("none");
    });
}
popup(".index-callhover");
popup(".index-busicoopic");
// 鼠标移至我的商户显示具体信息
$(".index-mybusiness").on("mouseenter", function() {
    $(".index-mywhite").removeClass("none");
    $(".index-mycondel").removeClass("none");
});
$(".index-mybusiness").on("mouseleave", function() {
    $(".index-mywhite").addClass("none");
    $(".index-mycondel").addClass("none");
});
function mybusiness (mainEve, infocon) {
    $(mainEve).on("mouseenter", function() {
        $(this).removeClass("none");
        $(infocon).removeClass("none");
    });
    $(mainEve).on("mouseleave", function() {
        $(this).addClass("none");
        $(infocon).addClass("none");
    });
}
mybusiness(".index-mywhite", ".index-mycondel");
mybusiness(".index-mycondel", ".index-mywhite");

// 点击用户头像显示/隐藏弹窗
$(".merchant-i-personal").click(function() {
    var modifyBoolran = $(this).children(".merchant-i-modify").hasClass("merchant-i-modifytrue");
    if (modifyBoolran) {
        $(this).children(".merchant-i-modify").removeClass("merchant-i-modifytrue none");
    } else {
        $(this).children(".merchant-i-modify").addClass("merchant-i-modifytrue none");
    }
});
$("body, html").on("click", function(e){
    var _target = $(e.target);
    if (_target.closest(".merchant-i-personal").length == 0) {
        // 隐藏内容
        $(".merchant-i-modify").addClass("merchant-i-modifytrue none");
    }
})