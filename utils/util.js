const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

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
const myRequest = req_object => {
  wx.getNetworkType({
    success: function(res) {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      var networkType = res.networkType;
      if(/^(wifi|2g|3g|4g)$/.test(networkType)){

      }else{

      }
    },
    fail: function(res) {
    }
  })
}

module.exports = {
  formatTime: formatTime,
  urlEncode: urlEncode,
  myRequest: myRequest
}
