// component/get-userinfo.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getuserinfo: function (e) {
      var that = this;
      console.log(e);
      if (e.detail.errMsg == "getUserInfo:ok") {
        app.globalData.userInfo = e.detail.userInfo;
        app.data.nickName = e.detail.userInfo.nickName;
        app.data.avatarUrl = e.detail.userInfo.avatarUrl;
        app.data.iv = e.detail.iv;
        app.data.encryptedData = e.detail.encryptedData;
        var alertOperate = { // detail对象，提供给事件监听函数  //监听函数可以通过e.detail查看传递的数据;
          hasUserInfo: true,
        }
        that.triggerEvent('userinfos', alertOperate);
      }
    }
  }
})
