##《js高程》第十二章 dom2和dom3

这章的知识点很多都没有在实际中遇到过，所以只梳理会用到的知识点，其他的遇到再做深入研究

###一.重点梳理

####1.获取计算后的样式

		function getStyle(){
			return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
		}

####2.操作样式表

* 获取样式表

		function getStyle(obj){
			return obj.sheet||obj.styleSheet;
		}
		var style=document.getElementsByTagName('style')[0];
		var sheet=getStyle(style);//取得第一个样式表，也可以用document.styleSheets[0];
		var rules=sheet.cssRules||sheet.rules;
		var rule=rules[0];//取得第一条规则
		console.log(rule.style.cssText);//取得第一条规则的所有css代码
		console.log(rule.selectorText)//选择器

* 添加规则

		function insertRule(sheet, selectorText, cssText, position) {
		    if (sheet.insertRule) {
		        sheet.insertRule(selectorText + "{" + cssText + "}", position);
		    } else if (sheet.addRule) {
		        sheet.addRule(selectorText, cssText, poistion);
		    }
		}
		insertRule(document.styleSheets[0], "body", "background-color: silver", 0);//在开始增加一条规则

* 删除规则

		function deleteRule(sheet, index) {
			    if (sheet.deleteRule) {
			        sheet.deleteRule(index);
			    } else if (sheet.removeRule) {
			        sheet.removeRule(index);
			    }
			}
		deleteRule(document.styleSheets[0], 0);//删除第一条规则

####3.偏移量

 ![](https://raw.githubusercontent.com/miemiewang/gitskills/master/images/p1.png)

* 获取元素在页面上的偏移量

		function getPos(obj){
			var left=obj.offsetLeft;
			var parent=obj.offsetParent;
			while(parent){
				left+=parent.offsetLeft;
				parent=parent.offsetParent;
			}
		return left;
		}

####4.客户区大小
![](https://raw.githubusercontent.com/miemiewang/gitskills/master/images/p2.png)