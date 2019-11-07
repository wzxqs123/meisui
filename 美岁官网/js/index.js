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

//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1 //是否iPad
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
function pageFun (pcWrap, mWrap) {
    if(browser.versions.mobile||browser.versions.android||browser.versions.ios){
        console.log("移动端");
        $(pcWrap).addClass("none");
        $(mWrap).removeClass("none");
        $("body").css({
            "min-width" : "auto"
        });

        // 判断是否是微信打开
        function is_weixn(){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == "micromessenger") {
                $(".index-m-mask").removeClass("none");
            } else {
                $(".index-m-mask").addClass("none");
            }
        }
        is_weixn();
        /*// 判断环境
        if (browser.versions.iPhone && browser.versions.iPad) {
            // 苹果系统
            is_weixn();
        }else {
            // 安卓系统
            is_weixn();
        }*/
    } else {
        console.log("pc");
        $(pcWrap).removeClass("none");
        $(mWrap).addClass("none");
        $("body").css({
            "min-width" : "1200px;"
        });
    }
}
// 新增 2018-10-18 鼠标移至侧边栏时的效果
function mouseFun (aEve, navsel, navnosel, wxEve) {
    $(aEve).hover(function () {
        if ($(this).hasClass(wxEve)) {
            $(this).children(navnosel).addClass("none");
            $(this).children(navsel).removeClass("none");
        } else {
            $(this).children(navnosel).addClass("none");
            $(this).children(navsel).stop(true, true).animate({
                "marginRight" : "0"
            }, 600);
        }
    }, function () {
        if ($(this).hasClass(wxEve)) {
            $(this).children(navnosel).removeClass("none");
            $(this).children(navsel).addClass("none");
        } else {
            $(this).children(navnosel).removeClass("none");
            $(this).children(navsel).stop(true, true).animate({
                "marginRight" : "-210px"
            }, 0);
        }
    })
}
mouseFun(".index-p-lxitem a", ".index-p-lxatc", ".index-p-lxnoatc", "index-p-lxwxcom")
// 点击返回顶部，返回顶部
$(".index-p-lxfhcom").on('click', function(event) {
    $('body,html').stop(true).animate({
        "scrollTop" : "0"
    },500);
});