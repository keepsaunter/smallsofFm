import { getDoubanItem } from '../../utils/request.js';
Page({
	data:{
		navigator_data: getApp().data.navigator_data,
		artist_channel: [],
		listening: {
			url: '',
			author: '',
			channel: '',
		}
	},
	onLoad:function(options){
		new (getApp().CusToast)();
		var temp = '[{"related_artists":[{"cover":"https://img3.doubanio.com/img/fmadmin/large/742936.jpg","id":"18006","name":"Natalie Cole"},{"cover":"https://img3.doubanio.com/img/fmadmin/large/32701.jpg","id":"11892","name":"Frank Sinatra"},{"cover":"https://img3.doubanio.com/img/fmadmin/large/720073.jpg","id":"13774","name":"Eliane Elias"},{"cover":"https://img3.doubanio.com/img/fmadmin/large/33434.jpg","id":"2773","name":"Laura Fygi"}],"creator":{"url":"https://site.douban.com/douban.fm/","name":"豆瓣FM","id":""},"intro":"为你推荐 Natalie Cole 以及相似的艺术家","rec_reason":"你可能喜欢 Natalie Cole 的风格","banner":"https://img3.doubanio.com/img/fmadmin/large/742936.jpg","id":28006,"name":"Natalie Cole 系","cover":"https://img3.doubanio.com/img/fmadmin/large/742936.jpg","song_to_start":"","song_num":0,"collected":"false","artist_id":18006,"hot_songs":[]},{"related_artists":[{"cover":"https://img3.doubanio.com/img/fmadmin/large/913583.jpg","id":"4353","name":"Patti Smith"},{"cover":"https://img1.doubanio.com/img/fmadmin/large/33338.jpg","id":"15105","name":"The Doors"},{"cover":"https://img1.doubanio.com/img/fmadmin/large/32187.jpg","id":"4284","name":"Joy Division"},{"cover":"https://img3.doubanio.com/img/fmadmin/large/33220.jpg","id":"6978","name":"The Velvet Underground"}],"creator":{"url":"https://site.douban.com/douban.fm/","name":"豆瓣FM","id":""},"intro":"为你推荐 Patti Smith 以及相似的艺术家","rec_reason":"你可能喜欢 Patti Smith 的风格","banner":"https://img3.doubanio.com/img/fmadmin/large/913583.jpg","id":14353,"name":"Patti Smith 系","cover":"https://img3.doubanio.com/img/fmadmin/large/913583.jpg","song_to_start":"","song_num":0,"collected":"false","artist_id":4353,"hot_songs":[]}]';
		temp = JSON.parse(temp);
		temp.push(...temp);
		temp.push(...temp);
		temp.push(...temp);
		this.setData({artist_channel: temp});
		// getDoubanItem('artist', function(res){
		// 	console.log(res);
		// })
		// wx.showToast({
		//   title: '准备播放',
		//   duration: 10000
		// });
		// this.show({show_title: 'test', show_duration: 3000});
	},
	navigatorChange: function(e){
		console.log(e);
	},
	receiveMusic: function(e){
		console.log(e.detail);
	}
})		