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

// 点击页面出现弹窗
function alertBlock (clickEve, alertEve, noneEve) {
    $(clickEve).click(function() {
       $(alertEve).removeClass(noneEve);
       // 锁定滚动条
       lockscroll();
    });
}