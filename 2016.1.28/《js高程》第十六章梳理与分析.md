##《js高程》第十六章 html5脚本编程
 
####1.原生拖拽

* 拖拽事件，拖动某元素时候，触发的事件有：dragstart事件、drag事件和dragend事件。

	* 按下鼠标键并开始移动鼠标的时候，会在被拖拽的元素上触发dragstart事件。这时候光标变成”不能放”符号(圆环中有一条反斜线)，表示不能把元素放在自己上门。拖拽开始时，可以通过ondragstart事件处理程序运行JavaScript代码。
	* 触发dragstart事件后，随即会触发drag事件，而在元素被拖动期间会持续触发drag事件。这个事件与mousemove和touchmove事件类似。当拖动停止时(无论把元素放到了有效的放置目标，还是放到了无效的放置目标上)，都会发生dragend事件。
	* 大多数浏览器会为正被拖动的元素创建一个半透明的副本，这个副本始终跟随光标移动。当某个元素被拖动到一个有效的放置目标的时候，会触发的事件有：dragenter事件、dragover事件和dragleave或者drop事件。
* 自定义放置目标

	* 在拖动元素经过某些无效放置目标的时候，可以看到一种特殊鼠标手势(圆环中一条反斜线)，表示不能放置。虽然所有元素都支持放置目标事件，但是这些元素默认是不允许放置的。如果拖动元素经过不允许放置的元素，无论用户如何操作，都不会发生drop事件。不过，你可以把任何元素变成有效的放置目标，方法是重写dragenter和dragover事件的默认行为。
	
			for(var i=0;i<aLi.length;i++){
				aLi[i].ondragstart=function(){//拖拽前触发
					this.style.background='yellow';
				}
				aLi[i].ondragend=function(){//拖拽结束后触发
					this.style.background='';
				}
			}
			oDiv.ondragenter=function(event){//进入目标触发
				this.style.background='blue';
				event.preventDefault();
			}
			oDiv.ondragleave=function(event){//离开目标触发
				this.style.background='red';
			}
			oDiv.ondragover=function(event){//进入与离开之间连续触发
				document.title=iNow++;
				event.preventDefault();
			}
			oDiv.ondrop=function(event){
				alert('鼠标被释放啦');
				event.preventDefault();
			}
* dataTransfer对象

	* dataTransfer对象有两个主要的方法：getData()方法和setData()方法
	* dropEffect:被拖动的元素能够执行哪种行为
	* effectAllowed:允许拖动元素的哪种行为
	
			for(var i=0;i<aLi.length;i++){ 
				aLi[i].ondragstart = function(ev){ //拖拽前触发 
					this.style.background = 'yellow'; 
					ev.dataTransfer.setData('a','hello');  //存储一个键值对 : value值必须是字符串 
					ev.dataTransfer.effectAllowed = 'all'; 
					ev.dataTransfer.setDragImage(this,0,0); 
				}; 
				aLi[i].ondragend = function(){  //拖拽结束触发 
					this.style.background = ''; 
				}; 
			} 
			for(var i=0;i<aA.length;i++){ 
				aA[i].ondragstart = function(ev){ //拖拽前触发 
					this.style.background = 'yellow'; 
					ev.dataTransfer.setData('a','hello');  //存储一个键值对 : value值必须是字符串 
					ev.dataTransfer.effectAllowed = 'link'; 
					ev.dataTransfer.setDragImage(this,0,0); 
				}; 
				aA[i].ondragend = function(){  //拖拽结束触发 
					this.style.background = ''; 
				}; 
			} 
			oDiv.ondragenter = function(){  //相当于onmouseover 
				this.style.background = 'green'; 
			}; 
			oDiv.ondragleave = function(){  //相当于onmouseout 
				this.style.background = 'red'; 
			}; 
			oDiv.ondragover = function(ev){ //进入目标、离开目标之间，连续触发 
				ev.preventDefault();  //阻止默认事件：元素就可以释放了 
				ev.dataTransfer.dropEffect = 'link';  //针对外部文件 
			}; 
			oDiv.ondrop = function(ev){  //释放鼠标的时候触发 
				this.style.background = 'red';   
				alert( ev.dataTransfer.getData('a') ); 
			}; 
	* 其他方法和属性
	
		* addElement(element)：为拖动操作添加一个元素。添加这个元素只影响数据(即增加作为拖动源而响应回调的对象)，不会影响拖动操作时页面元素的外观。
		* clearData(format)：清除以特定格式保存的数据。
		* setDragImge(element, x, y)：指定一幅图像，当拖动发生的时候，显示在光标下方。这个方法接收的参数有三个分别是：要显示的HTML元素和光标在图像中的x、y坐标。
		* Types：当前保存的数据类型。
####2.媒体元素

* 播放视频和音频的方法：

		<!-- 嵌入视频 -->
		<video id='myVideo'>
			<source src='media.webm' type="video/webm codecs='vp8,vorbis'">
			<source src='media.ogv' type="video/ogg codecs='theroa,vorbis'">
			<source src='media.mpg'>
			你的浏览器不支持video元素
		</video>
		<!-- 嵌入音频 -->
		<audio id='myAudio'>
			<source src='song.ogg' type='audio/ogg'>
			<source src='song.mp3' type='audio.mpeg'>
			你的浏览器不支持audio元素
		</audio>