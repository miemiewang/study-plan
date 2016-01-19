##《js高程设计》第六章 面向对象的程序设计

####1.程序设计方法：  
面向过程：以过程为中心，自顶向下逐一细化  
面向对象：对象作为程序的基本单元，程序分解为数据和相关操作

####2.面向对象：  
* 基本概念：  
类，对象  
属性，方法  
* 基本特性：  
继承，封装，多态  

####3.js中的面向对象
* constructor（构造器）
* 创建构造器的三种方法：  
Function Employee(){}  
Var Employee=function(){}  
Var Employee=new function(){}

####4.new关键字完成三个工作
* 创建一个对象
* 将该对象的_proto_指向函数的prototype
* 调用该函数

####5. 原型模式和基于原型继承的js对象系统
原型编程范型包括以下规则：  

* 所有的数据都是对象：  
Js基本类型包括：undefined,boolean,string,number  
对象类型为：object,null  
除了undefined，boolean,string和number都可以通过“包装类”变成对象类型数据，js中有一个根对象存在，为object.prototype  
* 要得到一个对象不是通过实例化类，而是找到一个对象作为原型，并克隆他  

		function Person(name){  
			this.name=name;  
		}  
		Person.prototype.getName=function(){  
			return this.name;  
		}  
		var person1=new Person(‘wangy’);  
		alert(person1.name)//’wangy’;  
		object.getPrototypeOf(person1)===Person.prototype;  
用new运算符来创建对象的过程，实际上也只是先克隆object.prototype对象，再进行其他操作
* 对象会记住它的原型  
`Var a=new object();`  
`A._proto_===object.prototype;`  
`_proto_`就是对象跟“对象构造器”的原型联系起来的纽带
* 如果对象无法响应某个请求，它会把这个请求委托给他自己的原型  
`var a=function(){};  `  
`a.prototype={name:'seven'};  `
`var b=function(){};`  
`b.prototype=new a();`  
`var c=new b();`  
`alert(a.__proto__);//function Empty(){}`  
`alert(b.__proto__)//function Empty(){}`  
`alert(c.__proto__===b.prototype)//true  `

####6.js面向对象中this的指向
* 作为对象的方法调用  
    * 当函数作为该对象的方法被调用时，this指向该对象  

			Obj={  
    			Name:’wangy’,  
				getName:function(){  
    				 alert(this.name)  
				}  
			}  
			obj.getName()//wangy  
			Var b=obj.getName;  
			b()//undefined
    * 作为普通函数调用（this总是指向全局对象）  

			var name='globalName';  
			var a=function(){  
				return this.name;  
			}  
			alert(a())//globalName;
    * 构造器调用（this指向返回的这个对象）  

			var a=function(){  
				this.name='miemie';  
			}  
			var b=new a();  
			alert(b.name)//miemie  
			var a=function(){  
				this.name='miemie';  
				return this.name='haha'  
			}  
			var b=new a();  
			alert(b.name)//haha  
当构造器显示的返回了一个对象时，运算结果最终会返回这个对象
    * 在call和apply中调用  

			var a={  
				name:'yami',  
 				sayName:function(){  
					alert(this.name);  
				}  
			}  
			var b={  
				name:'wuba'  
			}  
			a.sayName.call(b);//wuba  
Call或apply会改变this的指向
    * 其他：  
Var a=new Function(‘alert(this)’);  
This总指向全局对象  
Eval(‘alert(this)’);  
指向调用上下文中的this；
    * This的总结：
  
![](https://raw.githubusercontent.com/miemiewang/gitskills/master/images/6.png)

####7.call或apply的区别和用法
* 区别：传入参数形式不同，apply接受两个参数，第一个参数指定了函数体内this的指向，apply的二个参数作为一个带下标的集合，可以为数组也可以为类数组，apply方法把这个集合中的元素作为参数传递给被调用的函数。Call传入的参数数量不固定，从第二个参数开始往后，每个参数被依次传入函数  
Func.apply(null,[1,2,3]);  
Func.call(null,1,2,3);  
如果传入的第一个参数为null,函数体内的this会指向默认的宿主对象，浏览器中就是window
* Call和apply的用途：
   * 改变this指向  

			var a={  
				name:'yami',	  	
			}  
			var b={  
				name:'wuba'  
			}  
			var sayName=function(){  
				alert(this.name);  
			}  
			sayName.call(a);//yami  
   * Function.prototype.bind  

			Function.prototype.bind=function(context){  
				var self=this;  
				return function(){  
					return self.apply(context,arguments);  
				}  
			}  
			var b={  
				name:'wuba'  
			}  
			var func=function(){  
				alert(this.name);  
			}.bind(b);  
			func();//wuba
   * 借用其他对象的方法  

			var a=function(){  
				this.name='wangy';  
			}  
			var b=function(){  
				a.apply(this);  
			}  
			b.prototype.getName=function(){  
				alert(this.name);  
			}  
			var c=new b();  
			c.getName();//wangy  

####8.原型链
![](https://raw.githubusercontent.com/miemiewang/gitskills/master/images/26.png)

* 属性查找，删除，修改皆通过原型链
* Delete只能删除对象本身上的属性，不能删除原型上的属性
* 判断属性是否来自对象本身：hasownproperty();
* 无论属性存在于原型中还是对象中，in操作符都会在能够访问特定属性时返回true；  
同时使用hasownproperty()和in就可以确定属性到底存在于原型还是对象上

		Function hasownproperty(object,name){  
			Return !object.hasOwnProperty(name)&&(name in object);  
		}
* 要想取得对象上所有可枚举的实例属性，可以使用Object.keys()方法，该方法接受一个对象作为参数，返回一个包含所有可枚举属性的字符串数组
* 要想得到所有实例属性，无论可枚举，可以使用Object.getOwnPropertyNames(),使用方法同上

####9.原型的动态性
* 我们对原型对象所做的任何修改都能立即从实例上反映出来，即使是先创建了实例后修改原型也照样如此

		Function Person(){}
		Var friend=new Person();
		Person.prototype.sayHi=function(){
			alert(‘hi’);
		}
		friend.sayHi()///hi
* 把原型修改为另一个对象等于切断了构造函数与最初原型之间的联系，实例中的指针仅指向原型，而不指向构造函数  

		Function Person(){}  
		Var friend=new Person();  
		Person.prototype={  
			Constructor:Person,  
			Name:'John';,  
			sayName:function(){  
				alert(this.name);  
			}  
		}  
		friend.sayName()//error  
重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系，它们引用的仍是最初的原型

####10.继承
* 原型链继承  

		var A=function(){  
			this.name='wangy';  
		}  
		A.prototype.getName=function(){  
			alert(this.name);  
		}  
		var B=function(){  
			this.job='workker';  
		}  
		B.prototype=new A();  
		B.prototype.getJob=function(){  
			alert(this.job);  
		}  
		var c=new B();  
		c.getName();//'wangy'  
问题：引用类型值共享的问题  

		var A=function(){  
			this.color=['red','yellow'];  
		}  
		var B=function(){}  
		B.prototype=new A();  
		var c=new B();  
		c.color.push('blue');//['red','yellow','blue'];  
		var d=new B();  
		d.color//['red','yellow','blue'];
* 借用构造函数 
 
		var A=function(){  
			this.color=['red','yellow'];  
		}  
		var B=function(){  
			A.call(this);  
		}  
		var c=new B();  
		c.color.push('blue');//['red','yellow','blue'];  
		var d=new B();  
		d.color//['red','yellow'];  
问题：方法都在构造函数中定义，函数复用无从谈起
* 组合继承
  
		var A=function(name){  
			this.name=name;  
			this.color=['red','yellow'];  
		}  
		A.prototype.sayName=function(){  
			alert(this.name);  
		}  
		var B=function(name){  
			A.call(this,name);  
		}  
		B.prototype=new A();  
		var c=new B('dingding');  
		c.color.push('blue');//['red','yellow','blue'];  
		c.sayName()//dingding  
		var d=new B('haha');  
		d.color//['red','yellow'];  
		d.sayName()//haha
* 原型式继承  

		function object(o){  
			function F(){};  
			F.prototype=o;  
			return new F();  
		}  
		var Person={  
			name:'greg',  
			friends:['hong','qian','xiang']  
		}  
		var a=Object.create(Person);  
		a.friends.push('dong');  
		var b=Object.create(Person);  
		b.friends.push('ya');  
		alert(b.friends);
* 原型模式之浅复制和深复制  
浅复制：  

		var obj={  
			'name':{  
				'num':'wangyang',  
				'num2':'wangy'  
			},  
			'age':'20'  
		}  
		function clone(obj){  
			var ret={},k;  
			for(var k in obj){  
			ret[k]=obj[k];  
			}  
			return ret;  
		}
		var b=clone(obj);  
		b.name.num='wangding';  
		Alert(obj.name.num)//wangding  
深复制：  

        function clone2(obj){  
	        var ret,k,b;  
	        if(b=(obj instanceof Array)||obj instanceof Object){ 
		        ret=b?[]:{};  
                for(var k in obj){  
			       if(obj[k] instanceof Array||obj[k] instanceof   Object){  
				       ret[k]=clone2(obj[k]);  
	               }else{  
			  	      ret[k]=obj[k];  
		       }  
		    }  
	        return ret;  
	    }  
var c=clone2(obj);  
c.name.num='wangqian';  
Alert(obj.name.num)//wangyang