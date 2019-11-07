// pages/payfail/payfail.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: "订单支付失败！",
    butSet: {
      type: "default", // 按钮的样式类型
      openType: "launchApp", // 微信开放能力
      appParameter: "0", // 打开 APP 时，向 APP 传递的参数，
      hoverClass: "none", // 没有点击态效果
      bindError: "launchAppError", // 发生错误的回调
      con: "重新购买" // 按钮文字内容
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  launchAppError(e) {
    var that = this;
    console.log(e.detail.errMsg);
    app.toastShow("返回APP失败");
  },
})