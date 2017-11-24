let show_content = {
	toast_show: false,
	show_title: 'ff',
	show_icon: '',
	show_image: '',
	show_duration: '1000'
}
//需要绑定到调用页下的组件用方法
let cusToast = {
	show: function(data){
		let self = this;
		let temp = self.data.show_content
		Object.assign(temp, data, {'toast_show': true});
		self.setData({show_content: temp});
		setTimeout(function(){
			temp.toast_show=false;
			self.setData({show_content: temp});
		}, self.data.show_content.show_duration);
	}
}
//组件的构造方法
function CusToast(){
	let pages = getCurrentPages();
	let cur_page = pages[pages.length - 1];
	Object.assign(cur_page, cusToast);
	cur_page.cusToast = this;
	//把组件用的数据并入调用页下的data
	cur_page.data.show_content=show_content;
	//此时可以不用更新视图
	// cur_page.setData({show_content:show_content});
	return this;
}
module.exports = {
	CusToast: CusToast
}