##《js高程设计》第七章 函数表达式

####1.函数声明与函数表达式
（1）声明总是在作用域开始时先行解析；
（2）表达式在遇到时候才运算。


####2.递归算法
* 

		 function fact(num){   
			if (num<=1){   
				return 1;   
			}else{   
				return num`*`fact(num-1);   
			}   
		}   
		以下可能导致出错  
		var anotherFact = fact;   
		fact = null;   
		alert(antherFact(4)); //出错   
		用arguments.callee可解决问题，这是一个指向正在执行的函数的指针。   
		function fact(num){   
			if (num<=1){   
				return 1;   
			}else{   
				return num*arguments.callee(num-1); //此处更改了。   
			}   
		}   
		var anotherFact = fact;   
		fact = null;   
		alert(antherFact(4)); //结果为24.  

####3.闭包
* 由函数和与其相关的引用环境组合而成
* 允许函数访问其引用环境中的变量  
当内部函数 在定义它的作用域 的外部 被引用时,就创建了该内部函数的闭包 ,如果内部函数引用了位于外部函数的变量,当外部函数调用完毕后,这些变量在内存不会被 释放,因为闭包需要它们.  
在Javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收。如果两个对象互相引用，而不再被第3者所引用，那么这两个互相引用的对象也会被回收。因为函数a被b引用，b又被a外的c引用，这就是为什么函数a执行后不会被回收的原因。  
例：
				
		var name = "The Window";     
		var object = {     
		　　name : "My Object",     
		　　getNameFunc : function(){     
		　　　　　　return function(){     
		　　　　　　　　return this.name;     
		　　　　　};     
		　　}     
		};     
		alert(object.getNameFunc()());  //The Window
闭包中的this指向调用它的对象，直接调用就指向window，这里的object.getNameFunc()()相当于，var a=object.getNameFunc(),执行a(),也是直接调用