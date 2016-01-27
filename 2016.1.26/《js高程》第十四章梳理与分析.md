##《js高程》第十四章 表单脚本

####1.表单字段
* 获取表单字段

		var form=document.getElementById('form1');
		var field1=form.elements[0];//获取表单第一个字段
		var field2=form.elements['box1'];//获取名为box1的字段

* 表单字段事件

	* blur：失去焦点触发
	* focus:字段获得焦点触发
	* change:对于input和textarea元素，在它们失去焦点且value值改变时触发；对于select元素，在其选项改变时触发

* 文本框脚本

	* 取得选择的文本
	
			var field2=form.elements['sText'];//获取名为sText的字段
			function getText(obj){
				if(typeof obj.selectionStart=='number'){
					return obj.value.substring(obj.selectionStart,obj.selectionEnd);
				}else if(document.selection){
					return document.selection.createRange().text;
				}
			}
			field2.onselect=function(){
				console.log(getText(field2));
			}

	* 选择部分文本
	
			function getText(obj,start,stop){
				if(obj.setSelectionRange){
					obj.setSelectionRange(start,stop);
				}else if(obj.createTextRange){
					var range=obj.createTextRange();
					range.collapse(true);
					range.moveStart('character',start);
					range.moveEnd('character',stop-start);
					range.select();
				}
				obj.focus();
			}
			getText(field2,0,field2.value.length);

	* 自动切换焦点
	
			(function(){
				function tabFocus(ev){
					var ev=ev||event;
					var target=ev.target;
					if(target.value.length==target.maxLength){
						var form=target.form;
						for(var i=0;i<form.elements.length;i++){
							if(form.elements[i]==target){
								if(form.elements[i+1]){
									form.elements[i+1].focus();
								}
								return;
							}
						}
					}
				}
				var tel1=document.getElementById('sText1');
				var tel2=document.getElementById('sText2');
				var tel3=document.getElementById('sText3');
				tel1.onkeyup=tabFocus;
				tel2.onkeyup=tabFocus;
				tel3.onkeyup=tabFocus;
			})();
				
	
			