//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function (option) {
    var _this = this
    console.log(option.id)
    wx.downloadFile({
      url: option.id,
      success: function (res) {

        var tempFilePath = res.tempFilePath

        console.log('downloadFile success, res is', res)

        _this.setData({
          audioPath: tempFilePath
        })
        //下载文件成功，播放录音
        wx.playVoice({
          filePath: tempFilePath,
          complete: function () {
          }
        })
      },
      fail: function ({ errMsg }) {
        console.log('downloadFile fail, err is:', errMsg)
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `一条来自${app.globalData.userInfo.nickName}的祝福`,
      path: `/pages/play/play?id=${this.data.currentIndex}&cat=${this.data.currentIndex}`,
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
    currentIndex: app.globalData.defaultCat,
    audioPath: ''
  },
  onSliderChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
    this.changeAnimation()
  },
  changeAnimation: function () {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
      animation: {
        duration: 500,
        timingFunc: 'easeInOut'
      }
    })
  }
})
