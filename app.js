//app.js
import { CusToast } from './components/cus_toast/cus_toast';
App({
  CusToast,
  data: {
    navigator_data: [
      {
        id: 'artist',
        icon: '../../images/artist.png',
        selectIcon: '../../images/artist_select.png',
        text: '艺术家'
      },{
        id: 'track',
        icon: '../../images/track.png',
        selectIcon: '../../images/track_select.png',
        text: '单曲'
      },{
        id: 'language',
        icon: '../../images/language.png',
        selectIcon: '../../images/language_select.png',
        text: '语言年代'
      },{
        id: 'genre',
        icon: '../../images/genre.png',
        selectIcon: '../../images/genre_select.png',
        text: '风格'
      },{
        id: 'scenario',
        icon: '../../images/scenario.png',
        selectIcon: '../../images/scenario_select.png',
        text: '心情'
      }
    ],
    listeningUrl: '',
    listeningPage: '',
    listeningChannel: '14029'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
/*
"tabBar": {
    "color":"#000",
    "selectedColor":"#26A2FF",
    "list":[{
      "pagePath": "pages/artist/artist",
      "text": "艺术家",
      "iconPath":"images/artist.png",
      "selectedIconPath":"images/artist_select.png"
    },{
      "pagePath": "pages/artist/artist",
      "text": "单曲",
      "iconPath":"images/single.png",
      "selectedIconPath":"images/single_select.png"
    },{
      "pagePath": "pages/artist/artist",
      "text": "语言年代",
      "iconPath":"images/language.png",
      "selectedIconPath":"images/language_select.png"
    },{
      "pagePath": "pages/artist/artist",
      "text": "风格",
      "iconPath":"images/style.png",
      "selectedIconPath":"images/style_select.png"
    },{
      "pagePath": "pages/artist/artist",
      "text": "心情",
      "iconPath":"images/mood.png",
      "selectedIconPath":"images/mood_select.png"
    }]
  }*/