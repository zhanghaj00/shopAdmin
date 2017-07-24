// module.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      moduleList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      wx.getStorage({
        key: 'appId',
        success: function(res) {
          console.log(res)

          wx.request({
            url: 'http://localhost:8089/wxservice/api/v1/wx/queryPdInfoModule?apiName=WX_PD_QUERY_GROUP_MODULE&code=2',
            method:'GET',
            success:function(res){
              console.log("module:"+res.data.errorCode)
              console.log("module:" + res.data.data.pdInfos)
              if (0 == res.data.errorCode){
                that.setData({
                  moduleList: res.data.data.pdInfos
                })
              }
            }
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

  intoItem:function(e){
    var moduleid = e.currentTarget.dataset.moduleid;
    var moduleName = e.currentTarget.dataset.modulename;
    //发送请求 跳转新的页面
    wx.navigateTo({
      url: '../moduledetail/modules/modulelist?moduleId='+moduleid +"&moduleName="+moduleName
    })
  }
})