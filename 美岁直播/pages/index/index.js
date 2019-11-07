// pages/index/index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    // nvabarData: {
    //   showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
    //   title: '主页', //导航栏 中间的标题
    // },
    // 此页面 页面内容距最顶部的距离
    // height: app.globalData.height * 2 + 28,

    f_uuid: "", // 房间号
    o_id: '', // 订单号
    change_rmb: "", // 所要充值的人民币金额
    virtual_count: "", // 所要充值的钻石数量
    anchorList: [],
    imgheadUrl: app.data.imgHeadUrl, // 头像地址前缀
    comeAnchorNum: "", // 要进入直播间的主播房间号
    listPage: 0, // 当前最新列表页数，默认0开始
    everyPageItemNum: 10, // 每一次请求获取的10条主播信息
    isCanPullUp: true, // 是否可以上拉
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.height)
    var that = this;
    
  },
  onShow: function () {
    var that = this;

    that.resAnchorList(that.data.listPage, that.data.everyPageItemNum); // 获取主播主播列表

    if (app.data.sceneStar == 1069) {
      that.setData({
        f_uuid: app.data.f_uuid, // 房间号
        o_id: app.data.o_id, // 订单号
      })
      if (that.data.f_uuid != undefined) {
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        app.gainCode().then(res => {
          console.log(res)
          var params = res;
          var url = "applet/getAppletPayInfo";
          function promise(url, params, oId) {
            return new Promise(function (resolve, reject) {
              wx.request({
                url: app.data.servser + url,
                data: {
                  code: params,
                  o_id: oId
                },
                header: {
                  'content-type': 'application/json'
                },
                method: 'get',
                success: function (res) {
                  resolve(res);
                },
                fail: function (res) {
                  app.toastShow("请求失败");
                }
              })
            })
          }
          promise(url, params, that.data.o_id).then(res => {
            console.log(res)
            var that = this;
            var payInfo = res.data;
            if (payInfo.sign == 1) {
              wx.requestPayment({
                timeStamp: payInfo.timeStamp,
                nonceStr: payInfo.nonceStr,
                package: payInfo.package,
                signType: payInfo.signType,
                paySign: payInfo.paySign,
                success(res) {
                  console.log(res);
                  wx.hideLoading(); // 隐藏加载弹窗
                  let callbackUrl = "applet/appletNotify"; // 回调请求url
                  function callbacks(url, oId) {
                    return new Promise(function (resolve, reject) {
                      wx.request({
                        url: app.data.servser + url,
                        data: {
                          o_id: oId
                        },
                        method: 'post',
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (result) {
                          resolve(result);
                        }
                      });
                    });
                  }
                  callbacks(callbackUrl, that.data.o_id).then(res => {
                    wx.redirectTo({
                      url: '../paysuc/paysuc?moneys=' + parseInt(app.data.change_rmb).toFixed(2) + '&'
                    })
                  })
                },
                fail(res) {
                  console.log(res);
                  wx.hideLoading(); // 隐藏加载弹窗
                  wx.redirectTo({
                    url: '../payfail/payfail'
                  })
                }
              })
            } else if (payInfo.sign == 0) {
              wx.hideLoading(); // 隐藏加载弹窗
              app.toastShow("系统忙");
              setTimeout(() => {
                wx.redirectTo({
                  url: '../payfail/payfail'
                })
              }, 1000)
            }
          })
        })
      }
    }
    
  },
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.data.anchorList = []; // 重置显示列表
    that.data.listPage = 0; // 重置当前请求哪一个页面
    that.resAnchorList(that.data.listPage, that.data.everyPageItemNum); // 获取主播主播列表
    
  },
  onReachBottom: function () {
    var that = this;
    if (that.data.isCanPullUp) {
      that.data.listPage += 1;
      wx.showLoading({
        title: '加载中',
      })
      that.resAnchorList(that.data.listPage, that.data.everyPageItemNum); // 获取主播主播列表
    } else {
      wx.hideLoading(); // 隐藏加载弹窗
    }
  },
  resAnchorList(pageNum, pageItemNum) { // 获取主播列表
    var that = this;
    var anchorListUrl = "applet/getList"
    function anchorList(url) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: app.data.liveServser + url,
          data: {
            p: pageNum,
            r: pageItemNum
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'get',
          success: function (res) {
            resolve(res);
          },
          fail: function (res) {
            app.toastShow("请求失败");
          }
        })
      })
    }
    anchorList(anchorListUrl).then(res => {
      console.log(res)
      var that = this;
      wx.hideLoading(); // 隐藏加载弹窗
      if (res.data.sign == 1) {
        var newList = (that.data.anchorList).concat(res.data.d.anchor)
        if (res.data.d.anchor.length >= 10) {
          that.setData({
            anchorList: newList,
            isCanPullUp: true,
          })
        } else {
          that.setData({
            anchorList: newList,
            isCanPullUp: false
          })
        }
      } else if (res.data.sign == 0) {
        wx.hideLoading(); // 隐藏加载弹窗
        app.toastShow("系统忙");
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    })
  },
  clickAnchor: function(e) {
    var that = this;
    that.data.comeAnchorNum = e.currentTarget.dataset.fuuid; // 要进入的主播的房间号
    if (app.data.token) {
      wx.navigateTo({
        url: '/pages/live/live?f_uuid=' + that.data.comeAnchorNum + '&'
      })
    } else {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log(res);
                app.globalData.userInfo = res.userInfo;
                app.data.nickName = res.userInfo.nickName;
                app.data.avatarUrl = res.userInfo.avatarUrl;
                app.data.iv = res.iv;
                app.data.encryptedData = res.encryptedData;
                that.comeLive(that.data.comeAnchorNum)
              }
            })
          } else {
            this.setData({
              hasUserInfo: false
            })
          }
        }
      })
    }
    // var Fuuid = e.currentTarget.dataset.fuuid
    // wx.navigateTo({
    //   url: '/pages/live/live?f_uuid=' + Fuuid + '&'
    // })
  },
  getuserinfo: function (e) {
    var that = this;
    console.log(e);
    var hasUserInfo = e.detail.hasUserInfo;
    that.setData({
      hasUserInfo: hasUserInfo,
    })
    that.comeLive(that.data.comeAnchorNum)
  },
  comeLive(fuuidNum) {
    // 获取code
    app.gainCode().then(res => {
      console.log(res)
      var params = res;
      var url = "applet/getOpenId";
      function promise(url, params) {
        return new Promise(function (resolve, reject) {
          wx.request({
            url: app.data.liveServserTwo + url,
            data: {
              code: params,
              nickname: app.globalData.userInfo.nickName,
              encryptedData: app.data.encryptedData,
              iv: app.data.iv,
              js: app.globalData.userInfo
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'get',
            success: function (res) {
              resolve(res);
            },
            fail: function (res) {
              app.toastShow("请求失败");
            }
          })
        })
      }
      promise(url, params).then(res => {
        var that = this;
        console.log(res)
        if (res.data.sign == 1) {
          var tokenNum = res.data.d.token;
          app.data.token = tokenNum;
          wx.navigateTo({
            url: '/pages/live/live?f_uuid=' + fuuidNum + '&'
          })
        } else if (res.data.sign == 0) {
          app.toastShow("系统忙");
        }
      })
    })
  }
})