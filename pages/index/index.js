//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    containerBackgroundColors: [
      '#fdacad',
      '#81C7D4'
    ],
    characters: [
      '/assets/cats/red-cat.gif',
      '/assets/cats/blue-cat.gif'
    ],
    currentIndex: 0
  },
  onSliderChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    })
    this.changeAnimation()
  },
  changeAnimation: function() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.data.containerBackgroundColors[this.data.currentIndex],
      animation: {
        duration: 500,
        timingFunc: 'easeInOut'
      }
    })
  },
  //事件处理函数
  startRecord: function() {
    wx.showLoading({
      title: '正在录音……',
    })
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
        wx.uploadFile({
          url: 'http://127.0.0.1:3000/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'sampleFile',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            console.log(res)
            //do something
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
