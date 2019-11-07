// pages/paysuc/paysuc.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: "订单支付成功！",
    rechargeType: "钻石充值",
    rechargeMoney: "", // 具体交易金额
    butSet: {
      type: "default", // 按钮的样式类型
      openType: "launchApp", // 微信开放能力
      appParameter: "1", // 打开 APP 时，向 APP 传递的参数，
      hoverClass: "none", // 没有点击态效果
      bindError: "launchAppError", // 发生错误的回调
      con: "完成" // 按钮文字内容
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      rechargeMoney: options.moneys // 具体交易金额
    })
  },
  launchAppError(e) {
    var that = this;
    console.log(e.detail.errMsg);
    app.toastShow("返回APP失败");
  }
})