export default {
	showError : (error) => {
		if(error){
			alert(`Error occured: ${error}`);
		}
	},

	getEnumrabelObjProps: (src) => {
		let dst = {};
		for(let key in src){
			dst[key] = src[key];
		}
		return dst;
	},
	
}