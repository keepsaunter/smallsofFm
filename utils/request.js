import { urlEncode } from './util.js';
//cross-domain request url
const cross_domain_url = "https://bird.ioliu.cn/v1/?url=";

//request douban channels
const douban_channels_res = 'https://douban.fm/j/v2/rec_channels?specific=';
const getDoubanItem = (type, sec_cb=function(){}, comp_cb=function(){}, fail_cb=function(){}) => {
	wx.request({
	  //必需
	  url: douban_channels_res+type,
	  success: function(res) {
	    console.log(res.data.data.channels);
	    sec_cb(res.data.data.channels);
	  },
	  fail: function(res) {
	  	fail_cb(res);
	    console.log(res);
	  },
	  complete: function(res){
	  	comp_cb(res);
	  }
	})
}
//request douban music info
const douban_musicInfo_url = 'https://api.douban.com/v2/fm/playlist';
const douban_musicInfo_params = {
	"kbps":128,
	"client":"s:mainsite|y:3.0",
	"app_name":"radio_website",
	"version":100,
	"type":"n"
};
const getDoubanMusic = (song_id, sec_cb=function(){}, comp_cb=function(){}, fail_cb=function(){}) => {
	wx.request({
	  //必需
	  url: cross_domain_url+douban_musicInfo_url+"&channel="+song_id+"&"+urlEncode(douban_musicInfo_params),
	  success: function(res) {
	    console.log(res.data.song);
	    sec_cb(res.data.song);
	  },
	  fail: function(res) {
	    fail_cb(res);
	  },
	  complete: function(res) {
	    comp_cb(res);
	  }
	})
}
module.exports = {
	getDoubanItem: getDoubanItem,
	getDoubanMusic: getDoubanMusic
}