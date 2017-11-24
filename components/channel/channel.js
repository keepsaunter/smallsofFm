import { getDoubanMusic } from '../../utils/request.js';
Component({
	properties: {
		cover_img: {
			value: '',
			type: String
		},
		title: {
			value: '',
			type: String
		},
		id: {
			value: '',
			type: Number
		}
	},
	data: {
		status: 0 //0:default;1:playing;2:pause
	},
	methods: {
		channelTapHandle: function(){
			var self = this;
			getDoubanMusic(self.id, function(res){
				self.triggerEvent('receiveMusic', res);
			});

// 			const backgroundAudioManager = wx.getBackgroundAudioManager()

// backgroundAudioManager.title = '此时此刻'
// backgroundAudioManager.epname = '此时此刻'
// backgroundAudioManager.singer = '汪峰'
// backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
// backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
		}
	}
})