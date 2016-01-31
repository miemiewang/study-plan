function ajax(method,url,data,fn){
			var xhr=new XMLHttpRequest();
			if(method=="get"){
				url+='?'+data;
			}
			xhr.open(method,url,true);
			if(method=="post"){
				xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
				xhr.send(data);
			}else{
				xhr.send();
			}
			xhr.onreadystatechange=function(){				
				if(xhr.readyState===4){
					if(xhr.status===200){
						fn&&fn(xhr.responseText);
					}else{
						alert("出错啦，err:"+xhr.status);
					}	
				}
			}	
		}