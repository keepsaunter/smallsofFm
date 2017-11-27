import { urlEncode, myRequest } from './util.js';
//cross-domain request url
const cross_domain_url = "https://bird.ioliu.cn/v1/?url=";

//request douban channels
const douban_channels_res = 'https://douban.fm/j/v2/rec_channels?specific=';
//callback:{success,fail,complete}
const getDoubanItem = (type, callback={}) => {
	var temp = {...callback};
	myRequest(Object.assign(callback, {
		url: douban_channels_res+type,
		success: function(res) {
	    	temp.success(res.data.data.channels);
	  	}
	}));
}
//request douban music info
const douban_musicInfo_url = 'https://api.douban.com/v2/fm/playlist';
const douban_musicInfo_params = {"from":"mainsite","pt":"0.0","kbps":128,"formats":"aac","alt":"json","app_name":"radio_iphone","client":"s:mobile|y:iOS 10.2|f:115|d:b88146214e19b8a8244c9bc0e2789da68955234d|e:iPhone7,1|m:appstore","apikey":"02646d3fb69a52ff072d47bf23cef8fd","client_id":"02646d3fb69a52ff072d47bf23cef8fd","icon_cate":"xlarge","udid":"b88146214e19b8a8244c9bc0e2789da68955234d","douban_udid":"b635779c65b816b13b330b68921c0f8edc049590","version":115,"type":"n"};
const getDoubanMusic = (song_id, callback={}) => {
	myRequest({
		url: cross_domain_url+douban_musicInfo_url+"&channel="+song_id+"&"+urlEncode(douban_musicInfo_params),
		success: function(res) {
	    	callback.success(res.data.song[0]);
	  	},
	})
}
const getNextMusic = (song_id, sid, callback={}) => {
	myRequest({
		url: cross_domain_url+douban_musicInfo_url+"&channel="+song_id+"&sid="+sid+"&"+urlEncode(douban_musicInfo_params),
		success: function(res) {
	    	callback.success(res.data.song[0]);
	  	},
	})
}
module.exports = {
	getDoubanItem: getDoubanItem,
	getDoubanMusic: getDoubanMusic,
	getNextMusic: getNextMusic
}