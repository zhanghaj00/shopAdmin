// modulelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moduleDetailList:[],
    moduleName:'',
    moduleId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     console.log(options.query)
     var moduleId = options.moduleId;
     var moduleName = options.moduleName;
     that.setData({
       moduleName:moduleName,
       moduleId:moduleId
     })
    wx.getStorage({
       key: 'appId',
       success: function (res) {
         console.log(res)
         wx.request({
           url: 'http://localhost:8089/wxservice/api/v1/wx/queryPdInfo?apiName=WX_PD_QUERY&code=2&moduleId=' + moduleId,
           method: 'GET',
           success: function (res) {
             console.log("module:" + res.data.data.pdInfos)
             if (0 == res.data.errorCode) {
               that.setData({
                 moduleDetailList: res.data.data.pdInfos
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
  addPd:function(e){
    var moduleName = this.data.moduleName;
    var moduleId =this.data.moduleId;
    wx.navigateTo({
      url: '../moduleadd/moduleadd?moduleName='+moduleName+"&moduleId="+moduleId,
    })
  }
})