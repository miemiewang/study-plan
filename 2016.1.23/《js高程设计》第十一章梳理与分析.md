##《js高程设计》第十一章 dom扩展

###一.重点梳理

####1.querySelector()和querySelectorAll()
* querySelector:返回一个css选择符，返回与该模式匹配的第一个元素

		var body=document.querySelector('body');
		var oDiv=document.querySelector('.myDiv');//第一个class为myDiv的元素

* querySelectorAll:返回所有匹配的元素

		var oDiv=document.querySelector('.myDiv');//所有class为myDiv的元素
		
* 两个方法获取的元素都不是动态的，增删节点不会表现出来

####2.classList属性(ff和chrome支持）

* add：将给定的字符串值添加到列表中

		oDiv.classList.add('show');//添加show类

* contains:列表中是否存在给定的值，存在返回true，否则返回false;

		oDiv.classList.add('show')//是否包含show类名

* remove:从列表中删除给定的字符串

		oDiv.classList.remove('show')//删除show类

* toggle:如果列表中存在给定的值，删除它，否则添加它

####3.插入标记

* innerHTML

		div.innerHTML='hello world';
注：通过innerHTML插入&lt;script&gt;不会执行脚本;

* outerHTML

		div.outerHTML='hello world';//文本节点会取代dom中的div节点

* 内存与性能问题

	* 使用前述属性从文档中删除元素，元素所绑定的事件处理程序仍在内存中，会占用内存数量
	* 插入大量新HTML标记时，使用前述属性相对于1通过dom创建节点，效率要高很多
	
####4.插入文本

* innerText
* outerText

###二.相关知识点理解
	
####HTML5  data 自定义属性

* 定义：为元素提供与渲染无关的信息，或语义信息
* 存取方式

	* 直接写在元素标签内
	
			<div data-name='wangyang'>王杨</div>

	* 通过js存取
	
		* 原始方法
		
				oDiv.setAttribute('data-num',20);//存入data-num属性
				alert(oDiv.getAttribute('data-num'));//20
		* html5方法
		
				oDiv.dataset.addr='www.baidu.com';
				alert(oDiv.dataset.addr);//www.baidu.com

* 在css中使用data属性

		[data-role="page"] {
		  /* Styles */
		}
