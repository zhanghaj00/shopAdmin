var app = getApp()
var apiDomain = 'http://localhost:8089/wxservice/api/v1/upload/image?apiName=UPLOAD_IMAGE'
var imagePaths = [] //图片路径数组
var index = 0 // 要上传图片的索引
var cb = function () { } //回调函数
var inProgress = false // 是否正在上传图片中

var sucFun = function (data) {
  cb({
    success: true,
    data: data,
    index: index
  })

  ++index

  if (index < imagePaths.length) {
    setTimeout(uploadFile, 50)
  } else { //上传结束
    inProgress = false
  }
}

var errorFun = function () {

  cb({
    success: false,
    data: null,
    index: index
  })

  ++index

  if (index < imagePaths.length) {
    setTimeout(uploadFile, 50)
  } else { //上传结束
    inProgress = false
  }
}

var uploadFile = function () {
  wx.uploadFile({
    url: apiDomain ,
    filePath: imagePaths[index],
    name: 'file',
    formData: {
      token: app.globalData.token
    },
    success: function (resp) {
      console.log(resp)
      if (resp.statusCode == 200) {
        var data = {}
        var result = JSON.parse(resp.data)
        try {
          data = JSON.parse(resp.data)
          sucFun(result)
        } catch (e) {
          throw "error:" + e.message + ", invalid json: " + resp.data
        }

      } else {
        errorFun()
      }
    },
    fail: function () {
      errorFun()
    }

  })
}

//cb 是上传结束的回调函数
exports.uploadMany = function (arr, funCB) {
  if (inProgress) {
    wx.showToast({
      title: '还有图片在上传中'
    })
    return;
  }

  inProgress = true
  imagePaths = arr //图片路径数组
  index = 0 // 要上传图片的索引

  if (imagePaths.length == 0) {
    wx.showToast({
      title: '数组不能为空'
    })
    return;
  }

  if (funCB != null && typeof funCB == 'function') {
    cb = funCB
  }

  setTimeout(uploadFile, 50)
}