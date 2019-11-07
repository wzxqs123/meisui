// pages/live/live.js
//获取应用实例
const app = getApp()
var frameBuffer_Data, session, SocketTask;
var socketUrl = app.data.socketUrl;

var socketMsgQueue = []
var socketOpen = true // 判断心跳变量
var heart = ''  // 心跳失败次数
var heartBeatFailCount = 0 // 终止心跳
var heartBeatTimeOut = null; // 终止重新连接
var heartPingInterval = 2500; // 心跳默认25发送一次

Page({
  data: {
    livePlayerSrc: "", // 直播流
    livePlayer: { // 直播标签设置
      mode: "live", // 模式
      objectFit: "contain" // 填充模式
    },
    listNav: [{
      idName: "live-chat",
      isSel: true, // 当前是否选中
      cons: "聊天" // 子项文字内容
    }, {
      idName: "live-info",
      isSel: false, // 当前是否选中
      cons: "主播" // 子项文字内容
    }],
    footInput: {
      placeholderCon: "跟主播聊聊天吧！", // 占位符内容
      placeholderClass: "live-placeholder", // 占位符类名
      confirmType: "send", // 设置键盘右下角按钮的文字
      adjustPosition: false // 键盘弹起时，是否自动上推页面
    },
    inputDis: false, // input输入框是否禁用
    inputCons: "", // 输入框内容
    pmHeight: null, // 可使用窗口高度
    mainconH: 0, // 聊天部分内容区高度
    footBottom: 0, // 底部模块相对于屏幕定位的bottom值，默认为0
    alertDel: { // 弹窗详情
      titImageSrc: "https://wechatpay.pod.meisuizhibo.com/live-loadtit.png", // 头部标题图片
      copyTip: "复制链接，并在手机浏览器中黏贴打开或是直接在应用市场搜索下载美岁直播。", // 弹窗提示内容
      copybutCon: "复制链接", // 按钮内容
      butPicUrl: "https://wechatpay.pod.meisuizhibo.com/live-copybut.png?r=2", // 弹窗按钮图片路径
    },
    alertisShow: false, // 弹窗是否显示
    anchorState: 1, // 主播是否在线,1为在线，0为下线
    anchorInfo: {
      headPic: "", // 主播头像
      name: "", // 主播名字
      idnum: "", // 主播房间id号
      grade: "", // 账号等级
      gradeBg: "", // 等级背景
      noticeTit: "主播公告", // 公告标题
      noticeCon: "" // 公告内容
    },
    imgheadUrl: app.data.imgHeadUrl, // 头像地址前缀
    noPlayerTip: "主播暂时不在家～", // 主播下线提示
    chatListSet: {
      scrollY: true,
      isAnimation: true, // 在设置滚动条位置时使用动画过渡
    },
    newItemId: 'chatitem0', // 最新聊天子项id
    isShowBottom: true, // 是否强制显示到底部最新消息
    weChatLists: [] // 聊天内容列表
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.setData({
      livePlayerSrc: "rtmp://play.meisuizhibo.com/live/" + options.f_uuid, // 直播流
    })

    var videoH = null; // 当前视频区的高度
    var navH = null; // 当前页面导航区的高度
    var footH = null; // 底部模块区的高度
    // 获取可使用窗口高度
    wx.getSystemInfo({
      success: function (res) {
        that.data.pmHeight = res.windowHeight;
      }
    })
    // 获取当前视频区的高度
    const videoHeight = wx.createSelectorQuery()
    videoHeight.select('.player').boundingClientRect();
    videoHeight.exec(function (res) {
      videoH = res[0].height
    })
    // 获取当前页面导航区的高度
    const navHeight = wx.createSelectorQuery()
    navHeight.select('.live-navs').boundingClientRect();
    navHeight.exec(function (res) {
      navH = res[0].height
    })
    // 获取底部模块区的高度
    const footHeight = wx.createSelectorQuery()
    footHeight.select('.live-foot').boundingClientRect();
    footHeight.exec(function (res) {
      footH = res[0].height
      that.setData({
        mainconH: that.data.pmHeight - videoH - navH - footH - 20
      })
    })

    var liveDelUrl = "applet/getAnchorDetail"
    function liveDel(url, fUuid) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: app.data.liveServser + url,
          header: {
            'content-type': 'application/json'
          },
          data: {
            f_uuid: fUuid
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
    liveDel(liveDelUrl, options.f_uuid).then(res => {
      console.log(res)
      var that = this;
      var imgHead = that.data.imgheadUrl; // 获取头像地址的前缀
      var gradeBgColor = null; // 等级对应的背景颜色
      if (res.data.sign == 1) {
        var resData = res.data.d.user;
        wx.setNavigationBarTitle({ // 更改当前页面的标题
          title: resData.nickname
        })
        // 主播等级背景色判断
        if (resData.level < 10) {
          gradeBgColor = "live-gradeone"
        } else if (resData.level >= 10 && resData.level < 20) {
          gradeBgColor = "live-gradeten"
        } else if (resData.level >= 20 && resData.level < 30) {
          gradeBgColor = "live-gradetwenty"
        } else if (resData.level >= 30 && resData.level < 40) {
          gradeBgColor = "live-gradethirty"
        } else if (resData.level >= 40 && resData.level < 50) {
          gradeBgColor = "live-gradeforty"
        } else if (resData.level >= 50 && resData.level < 60) {
          gradeBgColor = "live-gradefifty"
        } else if (resData.level >= 60 && resData.level < 70) {
          gradeBgColor = "live-gradesixty"
        } else if (resData.level >= 70 && resData.level < 80) {
          gradeBgColor = "live-gradeseventy"
        } else if (resData.level >= 80 && resData.level < 90) {
          gradeBgColor = "live-gradeeighty"
        } else if (resData.level >= 90 && resData.level < 99) {
          gradeBgColor = "live-gradeninety"
        } else if (resData.level == 100) {
          gradeBgColor = "live-gradehundred"
        }
        that.setData({
          anchorState: resData.anchor_state, // 主播是否在线
          anchorInfo: {
            headPic: imgHead + '/' + resData.head, // 主播头像
            name: resData.nickname, // 主播名字
            idnum: resData.f_uuid, // 主播房间id号
            grade: resData.level, // 账号等级
            gradeBg: gradeBgColor, // 等级背景
            noticeTit: "主播公告", // 公告标题
            noticeCon: resData.character_autograph // 公告内容
          }
        })
        if (resData.anchor_state) { // 主播是否在线
          that.setData({
            inputDis: false, // input输入框是否禁用
          })
        } else {
          that.setData({
            inputDis: true, // input输入框是否禁用
          })
        }
        this.webSocket() // 链接websocket
      } else if (res.data.sign == 0) {
        wx.hideLoading(); // 隐藏加载弹窗
        app.toastShow("系统忙");
        setTimeout(() => {
          wx.redirectTo({
            url: '../payfail/payfail'
          })
        }, 1000)
      }
    })
  },
  // 页面加载完成
  onReady(res) {
    var that = this;
    this.ctx = wx.createLivePlayerContext('player')
    // this.ctx.requestFullScreen({
    //   success: res => {
    //     console.log('requestFullScreen success')
    //   },
    //   fail: res => {
    //     console.log('requestFullScreen fail')
    //   }
    // })

    that.initEventHandle(); // 监听socket事件
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    //离开页面销毁websocket并恢复初始数据
    wx.closeSocket();
    socketOpen = true 
    heart = '' // 心跳失败次数
    heartBeatFailCount = 0 // 终止心跳
    heartBeatTimeOut = null; // 终止重新连接
  },
  webSocket: function () {
    let that = this
    console.log(app.data.token)
    // 创建Socket
    SocketTask = wx.connectSocket({
      url: socketUrl,
      header: {
        'content-type': 'application/json',
        "t": app.data.token
      },
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        app.toastShow("网络异常！");
        console.log(err)
      },
    })

    // 连接成功
    wx.onSocketOpen((res) => {
      console.log('WebSocket 成功连接', res)
      heartBeatFailCount = 0;
      that.resMes()
      // 开始心跳
      that.startHeartBeat()
    })
    //连接失败
    wx.onSocketError((err) => {
      console.log('websocket连接失败', err);
      if (heartBeatFailCount > 3) {
        // 重连
        that.webSocket();
      }
      heartBeatFailCount++;
    })
  },
  initEventHandle() { // socket事件监听
    var that = this
    wx.onSocketMessage((onMessage) => {
      console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', onMessage)
      var resData = onMessage.data;
      var resMsgStart = parseInt(resData);
      if (resMsgStart == 42) {
        var chatDel = JSON.parse(resData.slice(2));
        if (chatDel[0] == "chat" || chatDel[0] == "pIntoRoom" || chatDel[0] == "noticemessage") {
          var newChatCon = that.data.weChatLists.concat(chatDel[1]);
          if (that.data.isShowBottom) {
            that.setData({
              weChatLists: newChatCon,
              newItemId: 'chatitem' + (newChatCon.length - 1), // 最新聊天子项id
            })
          } else {
            that.setData({
              weChatLists: newChatCon
            })
          }
        } else if (chatDel[0] == "leave") {
          // 主播下播，销毁websocket并恢复初始数据
          wx.closeSocket();
          socketOpen = true
          heart = '' // 心跳失败次数
          heartBeatFailCount = 0 // 终止心跳
          heartBeatTimeOut = null; // 终止重新连接
          that.setData({
            livePlayerSrc: "", // 直播流
            anchorState: false, // 主播是否在线
            inputDis: true, // input输入框是否禁用
          })
        }
      } else if (resMsgStart == 0) {
        var chatDel = JSON.parse(resData.slice(1));
        heartPingInterval = chatDel.pingInterval
        console.log(heartPingInterval)
      }
    })
    wx.onSocketOpen((res) => {
      socketOpen = true;
      console.log('监听 WebSocket 连接打开事件。', res)
    })
    wx.onSocketError(function (onError) {
      socketOpen = false
      console.log('监听 WebSocket 错误。错误信息', onError)
      that.webSocket()
    })
    wx.onSocketClose(function (onClose) {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
    })
  },

  // 开始心跳
  startHeartBeat: function () {
    // console.log('socket开始心跳')
    var that = this;
    heart = 'heart';
    that.heartBeat();
  },
  // 心跳检测
  heartBeat: function () {
    var that = this;
    if (!heart) {
      return;
    }
    that.sendSocketMessage({
      msgs: '42["pingbeat",{"time":1570783369}]',
      success: function (res) {
        console.log('socket心跳成功');
        if (heart) {
          heartBeatTimeOut = setTimeout(() => {
            that.heartBeat()
          }, heartPingInterval)
        }
      },
      fail: function (res) {
        console.log('socket心跳失败');
        if (heartBeatFailCount > 2) {
          // 重连
          that.webSocket();
        }
        if (heart) {
          heartBeatTimeOut = setTimeout(() => {
            that.heartBeat();
          }, heartPingInterval);
        }
        heartBeatFailCount++;
      },
    });
  },
  // 进入聊天
  resMes: function () {
    var that = this
    
    that.sendSocketMessage({
      msgs: '42["join", { "f_uuid": ' + that.data.anchorInfo.idnum + ', "istart": true, "isgame": "-1" }]',
      success: function (res) {
        console.log('进入房间成功', res);
        that.initEventHandle()
      },
      fail: function (err) {
        console.log('进入房间失败');
      },
    })
  },
  // 结束心跳
  stopHeartBeat: function () {
    var that = this;
    heart = '';
    if (heartBeatTimeOut) {
      clearTimeout(heartBeatTimeOut);
      heartBeatTimeOut = null;
    }
  },
  // 通过 WebSocket 连接发送数据
  sendSocketMessage: function (options) {
    var that = this
    if (socketOpen) {
      wx.sendSocketMessage({
        data: options.msgs,
        success: function (res) {
          if (options) {
            options.success && options.success(res);
          }
        },
        fail: function (res) {
          if (options) {
            options.fail && options.fail(res);
          }
        }
      })
    } else {
      socketMsgQueue.push(options.msgs)
    }
  },
  bindScroll(e) {
    if (e.detail.scrollTop + this.data.mainconH == e.detail.scrollHeight) {
      this.data.isShowBottom = true
    } else {
      this.data.isShowBottom = false
    }
  },

  tapNavs(e) {
    let that = this;
    if (e.currentTarget.id == "live-chat") {
      that.setData({
        listNav: [{
          idName: "live-chat",
          isSel: true, // 当前是否选中
          cons: "聊天" // 子项文字内容
        }, {
          idName: "live-info",
          isSel: false, // 当前是否选中
          cons: "主播" // 子项文字内容
        }]
      })
    } else {
      that.setData({
        listNav: [{
          idName: "live-chat",
          isSel: false, // 当前是否选中
          cons: "聊天" // 子项文字内容
        }, {
          idName: "live-info",
          isSel: true, // 当前是否选中
          cons: "主播" // 子项文字内容
        }]
      })
    }
  },
  bindFoucus(e) {
    // input聚焦时执行
    var that = this;
    that.setData({
      footBottom: e.detail.height
    })
  },
  bindBlur(e) {
    // input失焦时执行
    var that = this;
    that.setData({
      footBottom: 0
    })
  },
  bindConfirm(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      inputCons: ""
    })
    that.loadApp()
  },
  statechange(e) {
    // console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  loadApp(e) {
    const that = this;
    that.setData({
      alertisShow: true, // 弹窗是否显示
    })
  },
  copyLink(e) { // 复制文本
    const that = this;
    wx.setClipboardData({
      data: 'https://sj.qq.com/myapp/detail.htm?apkName=com.meisui.live',
      success(res) {
        that.setData({
          alertisShow: false, // 弹窗是否显示
        })
      }
    })
  },
  hideAlert(e) {
    var that = this;
    if (e.target.id == "live-alertbg" || e.target.id == "live-alertclose") {
      that.setData({
        alertisShow: false, // 弹窗是否显示
      })
    }
  }
})