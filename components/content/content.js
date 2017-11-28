Component({
	properties: {
		listening: {
			type: Object,
		},
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