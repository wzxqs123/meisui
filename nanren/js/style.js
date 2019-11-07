$(function(){
    $(window).resize(infinite);
    function infinite() {
        var htmlWidth = $('html').width();
        if (htmlWidth >= 750) {
            $("html").css({
                "font-size" : "28px"
            });
        } else {
            $("html").css({
                "font-size" : 28 / 750 * htmlWidth + "px"
            });
        }
    }infinite();
});
window.onorientationchange = orientationChange;
function orientationChange() {
    setTimeout(function(){
        switch(window.orientation) {
        　　case 0: break;
        　　case -90: 
            window.reload();
            break;
        　　case 90:   
            window.reload();
            break;
        }
    }, 30);
}
// 我的订单
function myOHead (headEve, emEve, divEve, colEve, sibEve, none, empty) {
    if ($(sibEve).eq(0).children("li").size() == 0) {
        $(sibEve).addClass(none);
        $(empty).removeClass(none);
    }
    headEve.on("click", divEve, function () {
        if ($(sibEve).eq($(this).index()).children("li").size() == 0) {
            $(this).children().children(emEve).addClass(colEve);
            $(this).siblings(divEve).children().children(emEve).removeClass(colEve);
            $(sibEve).addClass(none);
            $(empty).removeClass(none);
        } else {
            $(this).children().children(emEve).addClass(colEve);
            $(this).siblings(divEve).children().children(emEve).removeClass(colEve);
            $(sibEve).eq($(this).index()).removeClass(none).siblings(sibEve).addClass(none);
            $(empty).addClass(none);
        }
    })
}
myOHead ($(".my-o-option"), "em", "div", "bg-color", ".my-o-con", "none", ".my-o-empty");
myOHead ($(".logist-m-option"), "em", "div", "bg-color");
// 支付方式
function sletClick (modeEve, selcEve, noselcEve) {
    $(modeEve).click(function() {
        $(this).removeClass(noselcEve).addClass(selcEve);
        $(this).siblings(modeEve).removeClass(selcEve).addClass(noselcEve);
    });
}
sletClick(".s-mode", "s-selected", "s-noselected");
//填写订单
function readClick (readEve, nosel, sel) {
    $(readEve).click(function() {
        if ($(this).hasClass(nosel)) {
            $(this).removeClass(nosel).addClass(sel);
            $(this).children("p").removeClass("g-three");
        } else {
            $(this).removeClass(sel).addClass(nosel);
            $(this).children("p").addClass("g-three");
        }
    });
}
readClick(".clear-read", "clear-nosel", "clear-sel");
// 订单部分最后一个订单的类lone-one删除
$(".order-d-conblock").each(function(i) {
    var clearLists = $(this).children(".order-d-lists");
    var clearNums = clearLists.size() - 1;
    clearLists.eq(clearNums).removeClass("line-one");
});

// 过渡动画加载
// $(document).ready = function () {
//     $(".animation").addClass("none");
// }
setTimeout(function () {
    $(document).ready(function() {
        $(".animation").addClass("none");
    })
}, 500)
$("html").css({
    "font-size" : "28px"
});
// 登陆
    // 手机正则验证
var phoneReg = /^1((((3[4-9])|(5[0-27-9])|(8[2-478])|(78)|(47))|((3[0-2])|([58][56])|(76)|(45))|(([35]3)|(8[019])|(77))|((170)))\d{8})|(1349[0-9]{7})$/;
$(".login-num input").on("input", function() {
    var loginNum = $(this).val();
    if (phoneReg.test(loginNum)) {
        $(".login-code").addClass("white-color login-true").removeClass("login-color");
    } else {
        $(".login-code").addClass("login-color").removeClass("white-color login-true");
    }
})
    // 获取验证码倒计时功能
$(".login-code").on("click", function () {
    if ($(this).hasClass("login-true")) {
        // 验证码倒计时
        var loginTimes = 60;
        // 删除类名login-true  防止用户在倒计时期间再次点击引起重新倒计时等问题
        $(this).removeClass("login-true");
        // 先清除一次计时器，防止叠加等错误
        clearInterval(loginShow);
        // 改变倒计时的字体颜色
        $(this).addClass("login-color").removeClass("white-color");
        // 显示倒计时时间
        $(this).html(loginTimes+"s");
        var loginShow = setInterval(function () {
            loginTimes--;
            $(".login-code").html(loginTimes+"s");
            if (loginTimes <= 0) {
                clearInterval(loginShow);
                // 此处的$(".login-code")不可用$(this)代替
                $(".login-code").addClass("white-color").removeClass("login-color").html("发送验证码");
                // 当倒计时结束后添加回类名login-true
                $(".login-code").addClass("login-true");
            }
        }, 1000)
    }
})