##《js高程设计》第十章 dom

###一.重点梳理

####1.js操作dom节点

* 访问节点  

		document.getElementById(id);
		返回对拥有指定id的第一个对象进行访问  
		document.getElementsByName(name);返回带有指定名称的节点集合  
		document.getElementsByTagName(tagname);  返回带有指定标签名的对象集合    
		document.getElementsByClassName(classname);  
		返回带有指定class名称的对象集合  
		注意：Elements

* 生成节点  

		document.createElement(eName);  
		创建一个节点  
		document.createAttribute(attrName);  
		对某个节点创建属性  
		document.createTextNode(text);  
		创建文本节点

* 添加节点 
 
		document.insertBefore(newNode,referenceChild);  
		在某个节点前插入节点  
		parentNode.appendChild(newNode);  
		给某个节点添加子节点

* 复制节点  

		cloneNode(true | false);  
		复制某个节点  
		参数：是否复制原节点的所有属性

* 删除节点  

		parentNode.removeChild(node)  
		删除某个节点的子节点  
		node是要删除的节点  
注意：IE会忽略节点间生成的空白文本节点(例如，换行符号)，而Mozilla不会这样做。在删除指定节点的时候不会出错，但是如果要删除最后一个子结点或者是第一个子结点的时候，就会出现问题。这时候，就需要用一个函数来判断首个子结点的节点类型。  
元素节点的节点类型是 1，因此如果首个子节点不是一个元素节点，它就会移至下一个节点，然后继续检查此节点是否为元素节点。整个过程会一直持续到首个元素子节点被找到为止。通过这个方法，我们就可以在 Internet Explorer 和 Mozilla 得到正确的方法。  

* 属性操作  

		getAttribute(name)  
		通过属性名称获取某个节点属性的值  
		setAttribute(name,value);  
		修改某个节点属性的值  
		removeAttribute(name)  
		删除某个属性

* 查找节点  

		parentObj.firstChild  
		如果节点为已知节点的第一个子节点就可以使用这个方法。此方法可以递归进行使用  
		parentObj.firstChild.firstChild.....  
		parentObj.lastChild  
		获得一个节点的最后一个节点，与firstChild一样也可以进行递归使用  
		parentObj.lastChild.lastChild.....  
		parentObj.childNodes  
		获得节点的所有子节点，然后通过循环和索引找到目标节点

* 获取相邻的节点  

		naborNode.previousSibling :获取已知节点的相邻的上一个节点  
		narbourNode.nextSlbling: 获取已知节点的下一个节点

* 获取父节点  

		childNode.parentNode:得到已知节点的父节点
* 替换节点方法

		someNode.replaceChild(new,old)

* 操作文本节点
 
 		
		appendData(text)//将text添加到节点的末尾
		deleteData(offset,count)//从offset位置开始删除count个字符
		insertData(offset,text)//在offset位置插入
		splitText(offset)//从offset位置将当前文本节点分成两个文本节点
		document.createTextNode()//创建文本节点
####2.dom操作技术

* 创建动态脚本

		function createScript(code){
				var body=document.body||document.documentElement;
				var oScript=document.createElement("script");
				oScript.type="text/javascript";
				try{
					oScript.appendChild(document.createTextNode(code));
				}catch(ex){
					oScript.text=code;
				}
				body.appendChild(oScript);
			}
			createScript("alert(1)");

* 创建动态样式
	
		function createStyle(css){
				var head=document.getElementsByTagName('head')[0];
				var oStyle=document.createElement("style");
				oStyle.type="text/css";
				try{
					oStyle.appendChild(document.createTextNode(css));
				}catch(ex){
					oStyle.styleSheet.cssText=css;
				}
				head.appendChild(oStyle);
			}
			createStyle("body{background:red;}");
		}