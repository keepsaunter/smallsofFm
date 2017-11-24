Component({
	properties: {
		color: {
			type: String,
			value: '#000'
		},
		select_text_color: {
			type: String,
			value: '#26A2FF'
		},
		navigator_data: {
			type: Array,
			value: []
		}
	},
	data: {
		select_index: 0
	},
	methods: {
		itemClickHandle: function(e){
			var target_index = e.currentTarget.dataset.index;
			if(target_index != this.data.select_index){
				this.setData({select_index: target_index});
				this.triggerEvent('selectChange', {index: target_index});
			}
		}
	}
})