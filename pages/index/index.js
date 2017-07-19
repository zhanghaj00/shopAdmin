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
  logIn:function(){
    var that = this;
    wx.request({
      url: 'http://localhost:8000/userauth',
      data:{
        username: that.data.username,
        password: that.data.password
      },
      method:'GET',
      success:function(res){
        if(res.data && res.data.result){
          try{
            wx.setStorage({
              key: 'username',
              data: that.data.username,
            })
          }catch(e){
            console.log('there is no id_token')
          }
          wx.navigateTo({
            url: '../module/module',
          })

        }
      },
      fail:function(res){
        console.log(res.data)
      }
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
  }
})
