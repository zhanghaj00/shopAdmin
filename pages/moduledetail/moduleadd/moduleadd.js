// moduleadd.js
var util = require('./manyupload.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      moduleId:'',
      moduleName:'',
      appId:'',
      chooseImgs:[],
      pdPic:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      var moduleName = options.moduleName;
      var moduleId = options.moduleId;
      wx.getStorage({
        key: 'appId',
        success: function (res) {
          console.log(res)
          that.setData({
            moduleName: moduleName,
            moduleId: moduleId,
            appId:res.data
          })
        },
      }) 
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  batchUploadImg:function(){
    var that =this
    wx.chooseImage({
      count: 9 - that.data.chooseImgs.length,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中'
        })
        var tempFilePaths = res.tempFilePaths
        util.uploadMany(tempFilePaths, function (obj) {

          that.data.chooseImgs.push(obj.data.data.pdPic)
          that.setData({
            chooseImgs: that.data.chooseImgs
          })
          wx.hideLoading()
        })

      }
    })
  },
 uploadImg: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '上传中'
        })
        wx.uploadFile({
          url: 'http://localhost:8089/wxservice/api/v1/upload/image?apiName=UPLOAD_IMAGE', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var result = JSON.parse(res.data)
            that.setData({
              pdPic: result.data.pdPic
            })
            wx.hideLoading()
          },
          fail:function(res){

          }
        })
      }
    })
  },
  formsubmit:function(e){
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: 'http://localhost:8089/wxservice/api/v1/wx/insertPdInfo?apiName=WX_PD_INSERT',
      method:'POST',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.modalTap();
      }
    })  
  }
})