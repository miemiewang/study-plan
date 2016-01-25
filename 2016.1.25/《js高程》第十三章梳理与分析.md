##《js高程》第十三章 事件

####1.事件流
![](https://raw.githubusercontent.com/miemiewang/gitskills/master/images/22.png)  
每当某一事件发生时，都会经过捕获阶段->处理阶段->冒泡阶段(有些浏览器不支持捕获) 
捕获阶段是由上层元素到下层元素的顺序依次。而冒泡阶段则正相反。 

####2.事件注册
eventTarget.addEventListener(type.listener,false)||attachEvent(type.listener)  
取消：eventTarget.removeEventListener(type.listener,false)||detachEvent(type.listener) 
 
		var eventHandler={ 		
			addHandler:function(element,type,func){   　　      	
							if(element.addEventListener){  　             
								element.addEventListener(type,func,false);        
							 }else if(element.detachEvent{  　　           		
								element.attachEvent('on'+type,func);  　       
							}else{  　　        					
								element['on'+type]=func;  　　     
						  	}       					
						},
			removerHandler:function(element,type,func){  　        
								if(element.removeEventListener){  	　　          
									element.removeEventListener(type,func,false);  	　　         
								}else if(element.detachEvent){ 	 　　          
									element.detachEvent('on'+type,func);  
	 　　      					}else{  　              	 					
									element['on'+type]=null;  
								}   　　     
							}  　   
	 	}  
阻止事件冒泡  

	event.stopPropagation()(w3c)    
	event.cancelBubble==true//ie6,7,8    
	event.stopImmediatePropagation()(w3c)其后的事件也被阻止  
阻止默认行为  

	event.returnValue=false(ie)  
	event.preventDefault(w3c)  

####3.addEventListener和attachEvent的区别
* 适应的浏览器版本不同
前者在Mozilla中使用，后者在ie中
* 执行顺序不一样  
前者依次顺序执行监听函数  
后者倒序执行
* 使用attachEvent()方法，事件处理程序会在全局作用域下运行，因此函数内的this等于window
* 使用事件监听的好处：
    * 事件监听可以同时执行多个函数，而像click,mouseover等事件后一个方法会覆盖掉前一个
    * 采用事件监听可以解除相应的绑定，但解除时一定要用函数的句柄，把整个函数写上无法解除  

			Function a(){alert(1)}  
			btn.addEventListener(‘click’,a,false)  
			btn.removeEventListener(‘click’,a)  

####4.事件对象

* 事件目标：  
event.target(w3c)  
event.srcElement(ie);
* target与eventTarget的区别：  
	target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象（一般为父级）。

		div.onclick=function(ev){
				var ev=ev||event;
				console.log(ev.target);//div
				console.log(ev.currentTarget);//div
		}
			
		document.body.onclick=function(ev){
				var ev=ev||event;
				console.log(ev.target);//被单击的div
				console.log(ev.currentTarget);//父级body
		}

####4.事件委托
利用冒泡原理，把事件加到父级上，触发执行效果

* 提高性能。例如：在有很多个li并需要为其添加事件时，依次触发很耗性能，可以利用事件委托加到ul上
* 新添加的元素还会有之前的事件，例如：点击button动态添加Li,仍然会有之前的事件

####5.mouse事件
![](https://raw.githubusercontent.com/miemiewang/gitskills/master/images/23.png)  
注：mouseenter和mouseLeave不冒泡

####6.触摸事件
* touchstart:当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
* touchmove:当手指在屏幕上滑动时连续的触发。在这个事件发生期间，调用preventDefault()可阻止滚动。
* touchend:当手指从屏幕上移开时触发。
* touchcancel:当系统停止跟踪触摸时触发。例如，alert，有电话打来或者有 推送的消息提示的时候会取消当前的touch操作，即触发ontouchcancel。当你在开发一个web game的时候，ontouchcancel 对你很重要，你可以在ontouchcancel触发的时候暂停游戏或者保存游戏。

触摸事件包含的属性

* touches:表示当前跟踪的触摸操作的Touch对象的数组。
* targetTouches:特定于事件目标的Touch对象的数组。
* changeTouches:表示自上次触摸以来发生了什么改变的Touch对象的数组。

每个touch对象包含下列属性

* client / clientY：// 触摸点相对于浏览器窗口viewport的位置 
* pageX / pageY：// 触摸点相对于页面的位置 
* screenX /screenY：// 触摸点相对于屏幕的位置 
* identifier： // touch对象的unique ID 

		 var oLeft=document.getElementById('left');
			function handleTouchEvent(event) {
			    //只跟踪一次触摸
			    if (event.touches.length == 1) {
			       // var oLeft = document.getElementById("oLeft");
			        switch (event.type) {
			            case "touchstart":
			                oLeft.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
			                break;
			            case "touchend":
			                oLeft.innerHTML += "<br>Touch ended (" + event.changedTouches[0].clientX + "," + event.changeTouches[0].clientY + ")";         
			                break;
			            case "touchmove":
			                event.preventDefault(); //阻止滚动
			                oLeft.innerHTML += "<br>Touch moved (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
			                break;
			        }
			    }
			}
			document.addEventListener("touchstart", handleTouchEvent, false);
			document.addEventListener("touchmove", handleTouchEvent, false);
			document.addEventListener("touchend", handleTouchEvent, false);