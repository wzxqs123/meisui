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
var options = {
    animateThreshold: 0,
    scrollPollInterval: 50
}
$('.aniview').AniView(options);

// 二级导航列表内容
var navListCon = [{
    "name": "首页",
    "listComs": [],
    "listItemSrc": ["index.html"]
}, {
    "name": "集团业务",
    "listComs": ["直播平台", "艺人培养", "MCN", "影视产业"],
    "listItemSrc": ["live-terrace.html", "artist-develop.html", "mcn.html", "movie-industry.html"]
}, {
    "name": "新闻中心",
    "listComs": [],
    "listItemSrc": ["news-center.html"]
}, {
    "name": "城市运营中心",
    "listComs": ["华东地区", 2, 3, 4, 5, 6, 7],
    "listItemSrc": ["region-agent.html", "2", "3", "4", "5", "6", "7"]
}, {
    "name": "合伙人计划",
    "listComs": ["合伙人计划", "商务合作"],
    "listItemSrc": ["partner-plan.html", "business-cooperation.html"]
}, {
    "name": "关于我们",
    "listComs": ["企业简介", "联系我们"],
    "listItemSrc": ["company-profile.html", "contact-us.html"]
}]
// 点击微信图标
function clickWechat (wxPic, codePic) {
    $(wxPic).click(function () {
        $(codePic).removeClass("none");
    });
}
clickWechat(".index-navwx", ".index-wxcode");
// 点击空白部分隐藏微信二维码图标
freeBlank(".index-wxcode", ".index-wxcodepic", "none");

// 点击左上角导航图标
var screenHeight = screen.height; // 获取当前屏幕的高度
$(".index-nav").click(function (e) {
    $(".index-Mask").removeClass("none"); // 显示遮罩
    $(".index-wrap").css({
        "overflow": "hidden",
        "height": screenHeight
    })
    $(".index-leftnav").stop(true).animate({
        "width": "68.8%"
    }, 500)
    // 导航图标变化
    $(".index-navtop").css({
        "-webkit-transform": "translateY(0) rotate(-45deg)"
    })
    $(".index-navbottom").css({
        "-webkit-transform": "translateY(0) rotate(45deg)"
    })
    $(".index-footnav").fadeOut("slow"); // 隐藏底部导航
});
// 关闭导航
$(".index-Mask").on('touchstart', function (e) {
    setTimeout(function () {
        $(".index-Mask").addClass("none"); // 隐藏遮罩
        $(".index-footnav").fadeIn("slow"); // 显示底部导航
    }, 500)
    $(".index-wrap").css({
        "overflow": "auto",
        "height": "100%"
    })
    $(".index-leftnav").stop(true).animate({
        "width": "0%"
    }, 500)
    // 导航图标变化
    $(".index-navtop").css({
        "-webkit-transform": "translateY(-0.43rem) rotate(0)"
    })
    $(".index-navbottom").css({
        "-webkit-transform": "translateY(0.43rem) rotate(0)"
    })
});

// 点击导航部分
$(".index-lnoneitem").click(function (e) {
    var thisItemIndex = $(this).index();
    if (thisItemIndex != 0 && thisItemIndex != 2) {
        var _this = $(this),
            dataNavNum = parseInt(_this.attr("data-nav")),
            selOptionCom = navListCon[dataNavNum].listComs,
            listItemSrc = "javascript:;",
            navSelColor = null, // 当前选中项字体颜色
            listAddCom = null;
        for (var i = 0; i <= selOptionCom.length; i++) {
            if (i == 0) {
                listAddCom = '<li class="index-lntwoitem"><a class="block clearfix position-rel" href="javascript:;"><i class="index-leftarrow position-abs"></i><span class="index-itemleftword left">' + navListCon[dataNavNum].name + '</span></a></li>'
            } else {
                if (thisItemIndex == currentNavSel[0] && i == currentNavSel[1]) {
                    listItemSrc = "javascript:;";
                    navSelColor = "index-lntwoitemsel"
                } else {
                    listItemSrc = navListCon[dataNavNum].listItemSrc[i - 1];
                    navSelColor = ""
                }
                listAddCom += '<li class="index-lntwoitem ' + navSelColor + '"><a class="block clearfix position-rel" href="' + listItemSrc + '"><span class="index-itemleftword left">' + selOptionCom[i - 1] + '</span></a></li>'
            }
        };
        $(".index-leftnavtwo").empty();
        $(".index-leftnavtwo").append(listAddCom);
        $(".index-navshow").stop(true).animate({
            "marginLeft": "-18.43rem"
        }, 300)
        twoItemClick();
    }
});
function twoItemClick () {
    $(".index-lntwoitem").eq(0).click(function (e) {
        $(".index-navshow").stop(true).animate({
            "marginLeft": "0rem"
        }, 300)
    });
}