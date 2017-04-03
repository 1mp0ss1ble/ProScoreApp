export function toLower(text){ 
	return text.toString().trim().toLowerCase();
}


export function isStringsAreEqual(text1, text2){
	return toLower(text1) === toLower(text2);
}