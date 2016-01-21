##《js高程设计》第八章 BOM

###一.重点知识点
####1.window对象
* 定义：在网页中定义的任何一个对象、变量和函数，都是以window作为global对象。
* 全局作用域

		var age=29;
		function sayAge(){
			alert(this.age);
		}
		alert(window.age)//29;
		sayAge();//29
		window.sayAge()//29;
所有在全局作用域中声明的函数和变量都会变成window的方法和属性。  
注：全局变量不能通过delete操作符删除，而在window上定义的属性可以

		var age=29;
		window.color='red';
		delete window.age;
		delete window.color;
		alert(window.age);//29
		alert(window.color);//undefined
* 窗口位置
 	
		跨浏览器取得窗口位置
		var leftPos=(typeof window.screenLeft=="number")?window.screenLeft:window.screenX;
		var rightPos=(typeof window.screenRight=="number")?window.screenRight:window.screenY;
* 窗口大小

		取得页面视口的大小
		var pageWidth=window.innerWidth;
		if(typeof pageWidth!='number'){
			if(document.compatMODE=='CSS1Compat'){
				pageWidth=document.documentElement.clientWidth;
			}else{
				pageWidth=document.body.clientWidth;
			}
		}
		alert(pageWidth);

####2.location对象
* 定义：提供了与当前窗口中加载的文档有关的信息。location对象既是window对象的属性也是document对象的属性。
* 查询字符串参数

		function getStr(){
			var qs=(location.search.length>0?location.search.substring(1):"");
			args={};
			items=qs.length?qs.split("&"):[];
			item=null;
			name=null;
			value=null;
			for(var i=0;len=items.length,i<len;i++){
				item=items[i].split("=");
				name=decodeURLComponent(item[0]);
				value=decodeURLComponent(item[1]);
				if(name.length){
					args[name]=value;
				}
			}
			return args;
		}

####3.history对象
* history.go(-1);//后退一页
* history.go(1);//前进一页
* history.go("baidu.com")//跳转到最近的baidu.com页面
* back()和forward()代表前进和后退

###二.相关知识点理解
	
####对frameset的理解
* 概念：每个框架都拥有自己的window对象并保存在frames集合中，可以通过数值索引和框架名称来访问相应的window对象。
* 框架间的互相引用：

	* 父框架到子框架的引用
		
			window.frames["frameName"];
	这样就引用了页面内名为frameName的子框架。如果要引用子框架内的子框架，根据引用的框架实际就是window对象的性质，可以这样实现：

			window.frames["frameName"].frames["frameName2"];
	这样就引用到了二级子框架，以此类推，可以实现多层框架的引用。
	* 子框架到父框架的引用  
	每个window对象都有一个parent属性，表示它的父框架。如果该框架已经是顶层框架，则window.parent还表示该框架本身。
	* 兄弟框架间的引用  
	如果两个框架同为一个框架的子框架，它们称为兄弟框架，可以通过父框架来实现互相引用，例如一个页面包括2个子框架：

			<frameset rows="50%,50%">
    		 <frame src="1.html" name="frame1" />
    		 <frame src="2.html" name="frame2" />
			</frameset>
	在frame1中可以使用如下语句来引用frame2：		
	self.parent.frames["frame2"];		
	* 不同层次框架间的互相引用  
	框架的层次是针对顶层框架而言的。当层次不同时，只要知道自己所在的层次以及另一个框架所在的层次和名字，利用框架引用的window对象性质，可以很容易地实现互相访问，例如：

			self.parent.frames["childName"].frames["targetFrameName"];
	* 对顶层框架的引用  
	和parent属性类似，window对象还有一个top属性。它表示对顶层框架的引用，这可以用来判断一个框架自身是否为顶层框架，例如：
		
			//判断本框架是否为顶层框架
			if(self==top){
      		 //dosomething
			}
* 改变框架的载入页面  
对框架的引用就是对window对象的引用，利用window对象的location属性，可以改变框架的导航，例如：

		window.frames[0].location="1.html";
这就将页面中第一个框架的页面重定向到1.html，利用这个性质，甚至可以使用一条链接来更新多个框架。
		
		<frameset rows="50%,50%">
    	 <frame src="1.html" name="frame1" />
     	<frame src="2.html" name="frame2" />
		</frameset>
		<!--somecode-->
		<a href="frame1.location='3.html;frame2.location='4.html'" onclick="">link</a>
		<!--somecode-->
* frameset、frame、iframe的区别与联系
  
	* frameset: 它称为框架标记，是用来告知HTML文件是框架模式，并且设定可视窗口怎么分割
	* frame:只是设定某一个框架窗口中的参数属性,它必须嵌套在<frameset></frameset>之内
	* iframe: 它是在一个页面中嵌入一个框架窗口  

利用frameset和frame可以把网页制作成所需要的不同大小的框架，可以用来布局。  
iframe则是把一些网页嵌入到当前网页中，达到所需要的效果。