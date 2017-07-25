//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '登录',
    userInfo: {},
    username:'',
    password:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  userNameInput:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  userPasswordInput:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    that.logIn()
  },
  logIn: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          var appid = res.code
          wx.request({
            url: 'http://localhost:8089/wxservice/api/v1/wx/getSession?apiName=WX_CODE&code=' + res.code,
            success: function (res) {
              if (0 == res.data.errorCode) {
                wx.setStorage({
                  key: 'sessionId',
                  data: res.data.sessionId,
                })
                wx.setStorage({
                  key: 'appId',
                  data: appid,
                })
                //跳转
                wx.navigateTo({
                  url: '../module/module',
                })
              } else {
                if (50030 == res.data.errorCode) {
                  wx.showToast({
                    title: '您没有权限',
                  })
                } else {
                  wx.showToast({
                    title: '登录失败',
                  })
                }

              }
            }
          })
          console.log("login：" + res.errMsg)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
})
