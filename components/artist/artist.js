Component({
	properties: {
		'channels': {
			type: Array,
			value: []
		}
	},
	methods: {
		receiveMusic: function(e){
			this.triggerEvent('receiveMusic', e.detail);
		}
	}
})	