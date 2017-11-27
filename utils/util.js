const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//dispose request params object,return a request string
const urlEncode = params => {
  if(!params) return '';
  let req_str = '';
  for(var key in params){
    req_str += key+'='+params[key]+'&';
  }
  return req_str.substr(0, req_str.length-1);
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//pack wx request api
const myRequest = req_object => {
  wx.showNavigationBarLoading();
  var temp_req_object = {...req_object};
  wx.request(Object.assign(req_object, {
    fail: function(res) {
      wx.getNetworkType({
        success: function(res) {
          var networkType = res.networkType;
          if(!/^(wifi|2g|3g|4g)$/.test(networkType)){
            let pages = getCurrentPages();
            let cur_page = pages[pages.length - 1];
            //show reload component after request fail if it has
            if(cur_page.data.show_reload !== undefined) cur_page.setData({show_reload: true});
            cur_page.show({show_title: '请检查网络', show_duration: 1500});
          }
          if(temp_req_object.fail) temp_req_object.fail();
        },
        fail: function(res) {
          if(temp_req_object.fail) temp_req_object.fail();
        }
      });
    },
    success: function(res){
      let pages = getCurrentPages();
      let cur_page = pages[pages.length - 1];
      //remove reload component after request success
      if(cur_page.data.show_reload !== undefined) cur_page.setData({show_reload: false});

      if(temp_req_object.success) {
        temp_req_object.success(res);
      }
    },
    complete: function(){
      wx.hideNavigationBarLoading();
      if(temp_req_object.complete) temp_req_object.complete();
    }
  }))
}
const playMusic = resource => {
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title = resource.title;
    backgroundAudioManager.epname = resource.albumtitle;
    backgroundAudioManager.singer = resource.artist;
    backgroundAudioManager.coverImgUrl = resource.picture;
    backgroundAudioManager.src = resource.url;
}
module.exports = {
  formatTime: formatTime,
  urlEncode: urlEncode,
  myRequest: myRequest,
  playMusic: playMusic
}
