//index.js
//获取应用实例
const app = getApp()

Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `一条来自${app.globalData.userInfo.nickName}的祝福`,
      path: `/pages/play/play?id=${this.data.recordPaths}&cat=${this.data.currentIndex}`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  data: {
    characters: [
      '/assets/cats/red-cat.gif',
      '/assets/cats/blue-cat.gif'
    ],
    currentIndex: 0,
    recordPaths: [],
    uploadStatus: ''
  },
  onSliderChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    })
    this.changeAnimation()
  },
  changeAnimation: function() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
      animation: {
        duration: 500,
        timingFunc: 'easeInOut'
      }
    })
  },
  //事件处理函数
  startRecord: function() {
    var _this = this
    wx.showLoading({
      title: '正在录音……',
    })
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
        _this.setData({
          // recordPaths: _this.data.recordPaths.concat([tempFilePath.substr(11, 5)])
          recordPaths: "https://medusa1st.me/projects/mio/uploads/" + tempFilePath.substr(9)
        })
        wx.uploadFile({
          url: 'https://medusa1st.me/projects/mio/upload.php', //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'myFile',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            console.log(res)
            //do something
            _this.setData({
              // recordPaths: _this.data.recordPaths.concat([tempFilePath.substr(11, 5)])
              uploadStatus: res.data
            })
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
        wx.playVoice({
          filePath: tempFilePath,
          complete: function () {
          }
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },
  stopRecord: function() {
    wx.stopRecord();
    wx.hideLoading();
    wx.showToast({
      title: '录音完成！',
      icon: 'success',
      duration: 1000
    }) 
  }
})
