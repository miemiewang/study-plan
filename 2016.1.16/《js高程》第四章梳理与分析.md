##《js高程》第四章 变量、作用域、内存问题

###一.重点梳理

####1.基本类型和引用类型（上一章分析过了）

####2.函数参数的传递：按值传递

* 基本类型按值传递

		function sum(a){
			a+=10;
			return a;
		}
		var count=20;
		alert(sum(count))//30;
		alert(count)//20;
参数a相当于把count值复制了一遍，它们仅只是具有相同的值，不相互干扰

* 引用类型按值传递

		function a(obj){
			obj.name='hehe';
			obj=new Object();
			obj.name='xixi';
			alert(obj.name);
		}
		var obj=new Object();
		a(obj)//xixi
		alert(obj.name)//hehe
参数obj相当于把对象obj复制了一遍，但这里复制的是它的地址，所以参数obj和外面的对象obj引用的是相同的地址，对参数obj属性的修改也会影响到外面对象obj的属性；  
但是在函数里重写obj等于切断了参数obj和外面obj的联系，函数里的obj指向了新的对象，所以重写后的obj和外面的Obj是两个不同的对象，引用的地址不同，所得到的属性值也不同。

####3.执行环境及作用域

* 执行环境：每个函数都有自己的执行环境，当执行流进入一个环境时，函数的环境就会被推入一个环境栈中，而在函数执行之后，栈将其环境弹出，把控制权返还给之前的执行环境
* 作用域：当代码在一个环境中执行时，会创建变量对象的一个作用域链。作用域链的用途是保证对执行环境有权访问的所有变量和函数的有序访问。

####4.垃圾收集：引用计数和标记清除

###二.相关知识点理解

####对js预解析和作用域的深入理解

js的解析阶段分为：预解析阶段和执行阶段

* 预解析阶段：先创建一个当前执行环境下的活动对象，相当于作用域。然后把var、function、参数提升到作用域的顶端，但预解析阶段不会给变量赋值，默认为undefined，而function是提升整个函数块  
例：

		alert(a)//undefined;
		var a=2;
在这个阶段有几点值得关注：

	* 同名变量和函数在预解析过程中，函数会覆盖掉同名变量
	
			alert(typeof a)//function
			function a(){
				alert(1);
			}
			var a=2;
	但在执行过程中，赋值后的变量会覆盖掉同名函数
			
			function a(){
				alert(1);
			}
			var a=2;
			alert(typeof a);//number;

	* 函数声明会提升函数，但函数表达式不会（立即执行函数也相当于函数表达式，函数不会被提升）
			
			函数声明
			a()//1;
			function a(){
				alert(1);
			}
			函数表达式
			a()//报错：a is not a function
			var a=function(){
				alert(1);
			}
	* 关于函数参数的提升
	
			var a=1;
			function fn(a){
				alert(a);
				a=2;
			}
			fn()//undefined
			alert(a)//1
	在预解析过程，函数的参数被提升到函数顶端并默认值为undefined，由于在执行过程中函数未传递值，所以函数内部的alert弹出的仍是undefined;而在全局环境下的a仍为1，因为函数内部改变的a值为参数a的值，和全局下的变量a无关

*	执行阶段：从上至下依次执行，并给变量赋值
	
js的作用域：通过对函数解析阶段的分析，大致就能了解函数作用域的原理。通过总结，js的作用域有以下几个特点

* js为静态作用域：定义一个function时，function的作用域为定义时的作用域，而不是执行时的作用域
	
			var a=2;	
			function fn1(){
				alert(a);
			}
			(function (){
				var a=4;
				fn1()//2
				})()

	这段程序里有两个变量，分别为全局作用域下的a和局部作用域下的a，局部作用域的a位于匿名函数中。函数fn1是在全局环境中定义的，所以在本作用域没有找到a的情况下，就通过作用域链向全局环境查找，找到a=2；不管fn1在哪里执行都一样

* js没有块级作用域
	
				if(true){
					var color='red';
				}
				alert(color)//red;

js中，语句中的变量声明会将变量添加到当前的执行环境中（这里为全局环境）

				function sum(a,b){
					var add=a+b;
				}
				var result=sum(1,2);
				alert(add)//报错
使用var声明的变量会被添加到最接近的环境，函数中就是函数环境，所以全局环境下没有add，会报错

* 延长作用域链（某些特殊的语句会延长作用域链）

	* with语句（已经分析过了）
	* try-catch语句的catch块
	
				(function(){
				  e="default";
				  try{
				    throw "test";
				  }catch(e){
				    var e,x=123;
				    console.log(e); //test
				    e=456;
				    console.log(e); //456
				  };
				  console.log(x); //123
				  console.log(e); //default
				  console.log(window.e); //undefined
				})();
			
		* catch内部不会形成一个作用域，所以catch内声明的变量为函数的局部变量，所以第一个打印的e为try语句块里抛出的test。
		* catch括号里的e会形成一个作用域，所以e=456改变的是e作用域里的值，第二个e打印为456
		* 因为catch内的变量为函数的局部变量，所以函数可访问x
		* 函数作用域下的e仍然为default，没有改变
		* catch内部声明了局部变量，所以全局环境下没有e，所以打印出undefined  
		
总之catch内部的作用域仍然为最接近的环境的作用域，但e会单独形成一个作用域

疑惑：
		javascript
		var a=2;
		var a=(function(){
			a=1;
			alert(typeof a);//number
		})()

这里很好理解a的类型为number，但是下面等价的函数却又不一样的结果

		var a=2;
		(function a(){
			a=1;
			alert(typeof a);//function
		})();
		alert(a)//2

这里的a类型为function，按理说执行到匿名函数时，先提升a函数，然后执行内部代码时，a被赋值为1，然而这里的a既没有改变全局环境中的a变量，也没有改变局部环境下的a，为什么会没有发挥任何作用，还没有找到答案。。。。。。。。（等两天研究一下）