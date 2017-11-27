import { getDoubanItem, getDoubanMusic, getNextMusic } from '../../utils/request.js';
import { playMusic } from '../../utils/util.js';
var channel_config = getApp().data.navigator_data;
var channer_list_name = (function(){
			var temp_data = [];
			channel_config.forEach(function(val){
				temp_data.push(val.id);
			})
			return temp_data;
		})();

Page({
	data:{
		navigator_data: getApp().data.navigator_data,
		artist_channel: [],
		channel_list_data: JSON.parse('{"'+channer_list_name.join('":[],"')+'":[]}'),
		select_channel_list: channer_list_name[0],
		listening: {
			playing: false,
			channel: ''
		},
		show_reload: false
	},
	onLoad:function(options){
		new (getApp().CusToast)();
		this.getChannelData(this.data.select_channel_list);
	},
	getChannelData: function(name, type=0, callback={}){
		//type=1:refresh
		var temp_data = this.data.channel_list_data;
		if(temp_data[name].length==0 || type==1){
			var self = this;
			getDoubanItem(name, Object.assign({success: function(res){
				temp_data[name] = res;
				self.setData({channel_list_data: temp_data});
			}},callback));
		}
	},
	navigatorChange: function(e){
		var key_channel = channer_list_name[e.detail.index];
		this.getChannelData(key_channel);
		this.setData({select_channel_list: key_channel});
	},
	receiveMusic: function(e){
		var self = this;
		var channel_id = e.detail;
		const backgroundAudioManager = wx.getBackgroundAudioManager();

		if(self.data.listening.channel == channel_id){
			var play_status = this.data.listening.playing

			if(play_status){
				backgroundAudioManager.pause();
			}else{
				backgroundAudioManager.play();
			}
			self.setData({ listening: {
					channel: channel_id,
					playing: !play_status
				}
			});
		}else{
			var temp_data_channel = self.data.listening.channel;
			wx.getNetworkType({
		        success: function(res) {
		          var networkType = res.networkType;
		          if(/^(2g|3g|4g)$/.test(networkType) && temp_data_channel==''){
		            self.show({show_title: '正在使用非wifi网络听歌', show_duration: 1500});
		          }
		        }
		    });
		    self.setData({ listening: {
					channel: e.detail,
					playing: true
				}
			});
			getDoubanMusic(e.detail, {success: function(res){
				playMusic(res);
				backgroundAudioManager.onTimeUpdate(function(){
			      if(backgroundAudioManager.currentTime != undefined && backgroundAudioManager.duration != undefined){
			        if(backgroundAudioManager.currentTime >= backgroundAudioManager.duration && backgroundAudioManager.duration!=0){
			        	getNextMusic(e.detail, res.sid, {success: function(res){
			        			playMusic(res);
			        		}
			        	});
			        }
			      }
			    });
			}});
		}
	},
	reloadPage: function(){
		this.onLoad();
	},
	onPullDownRefresh: function(){
		this.getChannelData(this.data.select_channel_list, 1, {
			complete:function(){
				wx.stopPullDownRefresh();
			}
		});
	}
})		