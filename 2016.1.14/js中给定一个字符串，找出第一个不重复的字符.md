看到一篇文章说，如何“javascript实现给定一个字符串，从字符串中找到第一个不重复的字符”，博主的实现方法如下：

	function firstUniqueChar(str){
		var str = str || "",
			i = 0,
			k = "",
			_char = "",
			charMap = {},
			result = {name: "",index: str.length}; 
		for(i=0;i<str.length;i++){
			_char = str.charAt(i);
			if(charMap[_char] != undefined){
				charMap[_char] = -1;
			}else{
				charMap[_char] = i;
			}
		} 
		for(k in charMap){
			if(charMap[k]<0){
				continue;
			}
			if(result.index>charMap[k]){
				result.index = charMap[k];
				result.name = k;
			}
		} 
		return result.name;
	}

程序没错，但就是太复杂了。不仅变量和循环太多，连程序之间的逻辑都要看半天，所以思考了一下有没有什么简单的办法，还真的找到了一个
	
	var str='abeacdbf';
	function findF(str){
		var arr=str.split('');//将字符串转化成数组
		var n=[arr[0]];
		for(var i=1;i<arr.length;i++){//从第二项开始循环数组
			if(arr.indexOf(arr[i])==i){//判断如果数组的第i项第一次出现的位置为i，说明该字符不重复，放入数组
				n.push(arr[i]);
			}else{//否则该字符重复，将其从新数组中删除
				n.splice(n.indexOf(arr[i]),1);
			}
		}
		return n[0];//最后数组中的第一项就为字符串中第一个不重复的字符
	}
	console.log(findF(str))//e
	
