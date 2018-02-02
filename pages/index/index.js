//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    gifViewSRC: "",
    containerBackgroundColor: '#fdacad'
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    this.setData({
      gifViewSRC: "../../assets/lollipup_550px_by_x_squishystar_x-d7kobuy.gif"
    })
  },
  changeAnimation: function() {
    if (this.data.gifViewSRC == "../../assets/lollipup_550px_by_x_squishystar_x-d7kobuy.gif"){
      this.setData({gifViewSRC: "../../assets/curious_commission_550px_by_x_squishystar_x-d7kl2jj.gif"});
      this.setData({ containerBackgroundColor: "#81C7D4"});
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#81C7D4',
        animation: {
          duration: 500,
          timingFunc: 'easeInOut'
        }
      })
    }
    else{
      this.setData({ gifViewSRC: "../../assets/lollipup_550px_by_x_squishystar_x-d7kobuy.gif"})
      this.setData({ containerBackgroundColor: "#fdacad" });
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#fdacad',
        animation: {
          duration: 500,
          timingFunc: 'easeInOut'
        }
      })
    }
  },
  //事件处理函数
  startRecord: function() {
    wx.showLoading({
      title: '正在录音……',
    })
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
        wx.playVoice({
          filePath: tempFilePath,
          complete: function () {
          }
        })
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
