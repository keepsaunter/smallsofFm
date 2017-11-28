Component({
	properties: {
		listening: {
			type: Object
		},
		cover_img: {
			value: '',
			type: String
		},
		title: {
			value: '',
			type: String
		},
		channel_id: {
			value: '',
			type: Number
		}
	},
	data: {
		status: 0 //0:default;1:playing;2:pause
	},
	methods: {
		channelTapHandle: function(){
			this.triggerEvent('receiveMusic', this.data.channel_id);
		}
	}
})