//app.js
App({
  data: {
    servser: "https://weixin.live.meisuizhibo.com/meisuiorder/",
    liveServser: "https://weixin.live.meisuizhibo.com/meisuindex/",
    liveServserTwo: "https://weixin.live.meisuizhibo.com/meisuiuser/",
    socketUrl: 'wss://weixin.live.meisuizhibo.com/socket.io/?EIO=3&transport=websocket',
    imgHeadUrl: "https://weixin.img.meisuitv.com",
    code: null,
    f_uuid: "", // 房间号
    o_id: '', // 订单号
    change_rmb: "", // 所要充值的人民币金额
    virtual_count: "", // 所要充值的钻石数量
    token: "", // 用户的token
    nickName: "", // 昵称
    avatarUrl: "", // 用户头像
    iv: "", // 获取用户的iv
    encryptedData: "", // 获取用户的cloudID
    sceneStar: 1001 // 如何进入小程序的
  },
  onLaunch: function (options) {
    // 判断是否由分享进入小程序
    // if (options.scene == 1007 || options.scene == 1008) {
    //   this.globalData.share = true
    // } else {
    //   this.globalData.share = false
    // };
    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
    //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
    //虽然最后解决了，但是花费了不少时间
    // wx.getSystemInfo({
    //   success: (res) => {
    //     this.globalData.height = res.statusBarHeight
    //   }
    // })
    this.gainCode();
  },
  onShow(options) {
    this.data.f_uuid = options.query.f_uuid
    this.data.o_id = options.query.o_id
    this.data.change_rmb = options.query.change_rmb || 0
    this.data.virtual_count = options.query.virtual_count || 0
    this.data.sceneStar = options.scene
    console.log(options)
  },
  globalData: {
    userInfo: null
  },
  toastShow: function (titleCon) {
    wx.showToast({
      title: titleCon,
      icon: 'none',
      duration: 1000
    });
  },
  gainCode: function () {
    var that = this;
    let newCode = new Promise(function (resolve, reject) {
      // 发送登录请求
      wx.login({
        success: res => {
          resolve(res.code);
        },
        fail: function (err) {
          toastShow("信息获取失败");
        }
      })
    });
    return newCode;
  },
  // globalData: {
  //   share: false,  // 分享默认为false
  //   height: 0,
  // }
})