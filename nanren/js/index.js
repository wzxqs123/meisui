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
            relievescroll();
        }
    })
}
// 物流信息
// logist-m-con具体个数
function logMtrack (conEve) {
    var lMSize = $(conEve).size() - 1;
    $(conEve).eq(lMSize).css({
        "background" : "none"
    });
}
logMtrack(".logist-m-con");
if ($(".logist-m-nav div").size() == 1) {
    $(".logist-m-option").addClass("none")
}
if ($(".logist-m-nav div").size() == 0) {
    $(".logist-m-wrap").addClass("none");
    $(".logist-m-no").removeClass("none");
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
// 商品详情
function proDOpt (colEVE, spanEve, checkEve) {
    $(colEVE).click(function() {
        $(this).children(spanEve).addClass(checkEve);
        $(this).siblings(colEVE).children(spanEve).removeClass(checkEve);
    });
}
proDOpt(".pro-d-col", "span", "pro-d-check");

// 商品列表
function proLOpen (strEve, openEve, stopEve, pEve, hidEve) {
    $(strEve).click(function() {
        if ($(this).hasClass(openEve)) {
            $(this).removeClass(openEve).addClass(stopEve);
            $(pEve).removeClass(hidEve);
        } else {
            $(this).removeClass(stopEve).addClass(openEve);
            $(pEve).addClass(hidEve);
        }
    });
}
proLOpen(".pro-l-con strong", "pro-l-open", "pro-l-stop", ".pro-l-con p", "pro-l-hid");
proLOpen(".pro-l-screen span", "pro-l-many", "pro-l-less");

// 购买协议
function serAcon (emEve, numEve, speedEve, conEve, eqone, eqtwo, noneEve) {
    $(emEve).stop(true, true).animate({
        "left" : numEve
    }, speedEve)
    $(conEve).eq(eqone).addClass(noneEve);
    $(conEve).eq(eqtwo).removeClass(noneEve);
}
$(".ser-a-nav").on("click", "span", function() {
    if ($(this).index() == 1) {
        serAcon(".ser-a-nav em", "50%", 300, ".ser-a-con", 0, 1, "none");
    } else {
        serAcon(".ser-a-nav em", "0", 300, ".ser-a-con", 1, 0, "none");
    }
});
$(".ser-a-switch").click(function() {
    serAcon(".ser-a-nav em", "50%", 300, ".ser-a-con", 0, 1, "none");
    $(document.body).stop(true).animate({
        "scrollTop" : "0"
    },30)
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
// 全球包税,夏日活动页
function bouCShow (ulEve, titEve, picEve, monEVe) {
    $(ulEve).each(function(i) {
        var bouCBool = !$(this).children(picEve).children(".bou-c-loot").hasClass("none");
        if (bouCBool) {
            $(this).children(titEve).removeClass("g-one").addClass("g-three");
            $(this).children(monEVe).children("span").removeClass("g-one").addClass("g-three");
        }
    })
}
bouCShow(".bou-c-ul a", "p", ".bou-c-pic", ".bou-c-money");
bouCShow(".global-p-li", "p", ".global-p-pic", ".global-p-money");
bouCShow(".global-p-li", ".global-p-title", ".global-p-pic", ".global-p-money");
function tranlist (listEve, dtEve, lootEve, noneEve, ddEve, titleEve, gone, gthree, money, childSpan, ctwo, childEm, emAddClass) {
    $(listEve).each(function(i) {
        var bouCBools = !$(this).children().children(dtEve).children(lootEve).hasClass(noneEve);
        if (bouCBools) {
            $(this).children().children(ddEve).children(titleEve).removeClass(gone).addClass(gthree);
            $(this).children().children(ddEve).children(money).children(childSpan).removeClass(ctwo).addClass(gthree).siblings(childEm).removeClass(ctwo).addClass(emAddClass);
        }
    })
}
tranlist(".ord-c-lists a", ".ord-c-pic", ".bou-c-loot", "none", ".ord-c-con", "p", "g-one", "g-three", ".art-d-money", "span", "c-two", "em", "g-three art-d-graybor");
tranlist(".art-d-sin", ".art-d-dt", ".bou-c-loot", "none", ".art-d-dd", ".art-d-two", "g-one", "g-three", ".art-d-money", "span", "c-two", "em", "g-three art-d-graybor");

function floClick (covEve, floEve, noneEve, addEve) {
    $(covEve).click(function() {
        $(floEve).removeClass(noneEve);
        $(addEve).removeClass(noneEve);
    })
}
floClick(".onl-s-cover em", ".floating", "none", ".float-fri");
function freeAdd (mainEve, floEve, noneEve) {
    $(mainEve).click(function() {
        $(floEve).addClass(noneEve)
    })
}
freeAdd(".floating", ".floating", "none") //点击隐藏标签 2016.8.22
function modelJudge (butEve) {
    $(butEve).attr("href","http://a.app.qq.com/o/simple.jsp?pkgname=com.haibao.forman");
}

// 免费拿福利页面特效 2016.8.22
function butClick (butEve, floEve, noneEve) {
    $(butEve).click(function() {
        $(floEve).removeClass(noneEve);
    })
}
butClick(".free-b-ori", ".free-b-float", "none");
// 点击空白部分隐藏内容
freeBlank(".free-b-float", ".free-b-form", "none");
// 手机正则验证
var phoneReg = /^1((((3[4-9])|(5[0-27-9])|(8[2-478])|(78)|(47))|((3[0-2])|([58][56])|(76)|(45))|(([35]3)|(8[019])|(77))|((170)))\d{8})|(1349[0-9]{7})$/;
// 提交检测
var freeFocus = [0];
// 事件委托 检测e.target的id属性
// 失焦检测
$(".free-b-num").on("blur", function () {
    freeFocus[0] = 0;
    var freeNum = $(this).val();
    if (phoneReg.test(freeNum)) {
        $(".free-b-data p").removeClass("red").addClass("g-two");
        $(".free-b-data p").html("使用手机登录男人帮，即可看到你的优惠劵");
        $(".free-b-sub").click(function() {
            $(".free-b-float").addClass("none");
            // 成功领取礼包或已领取礼包时按钮样式如下
            $(".free-b-but").removeClass("free-b-ori c-two").addClass("free-b-suc white-color bg-color-two").html("礼包入手，开启男人帮！")
            freeAdd(".free-b-suc", ".free-b-float", "none"); //点击礼包入手按钮防止再次弹出输入框填写手机号 2016.8.22
            modelJudge(".free-b-suc"); //免费拿福利页面

        })
        freeFocus[0] = 1;
    } else {
        $(".free-b-data p").removeClass("g-two").addClass("red");
        $(".free-b-data p").html("请检查您的手机号后重新提交~");
        freeFocus[0] = 0;
    }
})
var freeBool = true;
$(".free-b-sub").on("click", function (e) {
    // 阻止表单提交的默认事件
    e.preventDefault();

    // 阻止多次点击产生的多次提交
    if(freeBool) {
        $('.free-b-num').blur();
        var freeTSum = 0;
        for (var i = 0; i < freeFocus.length; i++) {
            freeTSum += freeFocus[i];
        }
        if (freeTSum == freeFocus.length) {
            // 这里传数据
            freeBool = false;
        } else {
            freeBool = true;
        }
    }
})

// 文章详情相关商品按钮特效
    // 刚打开页面时商品按钮做呼吸特效三次
setTimeout(artDDrea, 4500);
function artDDrea () {
    $(".art-d-fix img").removeClass("art-d-animation");
}
    // 按钮显示的商品数量超过99时显示99+
if (parseInt($(".art-d-fix span").html()) > 99) {
    $(".art-d-fix span").html("99+")
}

// 判断是否支持webp，如果不支持则使用JPG格式的图片
function check_webp_feature(feature, callback) {
    var kTestImages = {
        // 有损 - lossy； 无损 - lossless
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
         callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
}
var imgs = $("img").size();
check_webp_feature('lossy', function(feature, result){
    if (result) {
        
        for (var i = 0; i < imgs; i++) {
            console.log('支持' + feature + '的压缩方式');
        }

    } else {
        
        for (var i = 0; i < imgs; i++) {
            // imgs[i].setAttribute('src', imgs[i].getAttribute('normalsrc'));
            console.log('不支持' + feature + '的压缩方式');
            var imgReg = /\/format\/webp/;
            if ($("img").eq(i).attr('data-echo')) {
                var imgEchoSrc = $("img").eq(i).attr('data-echo');
                imgEchoSrc = imgEchoSrc.replace(imgReg, "");
                $("img").eq(i).attr('data-echo', imgEchoSrc);
            } else {
                var imgSrc = $("img").eq(i).attr('src');
                imgSrc = imgSrc.replace(imgReg, "");
                $("img").eq(i).attr('src', imgSrc);
            }
        }
    }
})