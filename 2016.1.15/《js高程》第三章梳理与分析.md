##《js高程》第三章 基本概念
###一.重点梳理

####1.数据类型

#####基本数据类型：undefined、null、Boolean、String、Number
#####引用类型:Object

####2.类型识别
* typeOf  
 * 可以识别标准类型（null除外）typeOf null//object
 * 不能识别具体的对象类型（function除外）typeOf function//function
* object.prototype.toString
 * 可以识别标准类型及内置对象类型
 * 不能识别自定义类型  
Object.prototype.toString.call(‘a’)==’[Object String]’
* Constructor
 * 识别标准类型(null和undefined除外）
 * 识别内置对象类型
 * 识别自定义类型  
[1,2].constructor==Array
* instanceOf
 * 判别内置对象类型
 * 不能识别原始类型（null,number,string.boolean.undefined）
 * 可以判别自定义对象类型  
[1,2] instanceof Array==true;

####3.js类型转换规则
* 显示转换
 *  转换为数值：Number()、parseInt()、parseFloat()
 * 转换为字符串：toString()、String()
 * 转换为布尔类型:Boolean()（如果是对象，调用对象的valueOf()方法，然后根据前面规则转换，如果转换结果是NaN，调用对象toString()方法）
* 隐式类型转换
 * 用于检测是否为非数值的函数：isNaN，该函数会尝试将参数值用Number()进行转换
 * 递增递减操作符，一元正负符号操作符
 * 加法、乘除、减号、取模运算符
 * 逻辑，相等、关系操作符

####4.语句
* if语句
* do-while语句
* while语句
* for语句
* for in语句
* label语句
* break和continue
* with
* switch

#####5.函数

###二.相关知识点理解

####1.基本类型和引用类型的区别：

（1）基本类型：  

			var str='abc';
			var str2=str;
			alert(str2)//'abc'
			alert(str==str2)//true;
			str2='def';
			alert(str==str2)//false;
复制后会在栈中创建一个新值，然后把值复制到为新变量分配的位置上；


 (2)引用类型

			var arr1=[1,2,3];
			var arr2=arr1;
			alert(arr1==arr2)//true;
			arr2.push(4);
			alert(arr1)//[1,2,3,4]引用堆内存中相同的指针，所以arr2改变会引起arr1的改变
			arr2=null;
			alert(arr1==arr2)//false;重写arr2切断了与指针的联系，所以两者不再相等
复制操作结束后，两个变量实际上将引用同一个对象；因此改变其中的一个，将影响另一个；

####2.null和undefined
（1）null==undefined，都表示“无”

 （2）null!==undefined，null是一个空对象，typeOf为Object。而undefined是全局对象(window)的一个特殊属性，typeOf为undefined

（3）典型用法  

* null（"没有对象"，即该处不应该有值）

	* 作为函数的参数，表示该函数的参数不是对象。
	* 作为对象原型链的终点。

* undefined（"缺少值"，就是此处应该有一个值，但是还没有定义）

	* 变量被声明了，但没有赋值时，就等于undefined。
	* 调用函数时，应该提供的参数没有提供，该参数等于undefined。
	* 对象没有赋值的属性，该属性的值为undefined。
	* 函数没有返回值时，默认返回undefined。

####3.对with语句的理解

* 可以引用某个对象中已有的属性，减少代码量。添加属性需要明确引用该对象
		
		var person={
			'name'='xiaoming',
			'age'=20
		}
		with(person){
			alert(name)//xiaoming
			job='student';
			alert(job)//student
		}
		alert(person.job)//undefined
		alert(window.job)//student
疑问：为什么在with语句内给person添加job属性不成功，而是把job属性添加到了全局函数上。这就是第二句话说的添加属性需要明确引用该对象，所以在with语句内给Person添加属性应该写为person.job='student';  
结论：由此得出通过with语句直接添加属性会把属性添加到了全局对象（window）上去，因为with语句内部仍然处于全局作用域下，形成作用域的只是with里的person对象。至于为什么with语句中的弹出的job为student而不是undefined，这与with的下一个用法有关

* 延长作用域链

		var name='xiaoming';
		var person={
			'name':'fangfang',
			'age':20
		}
		with(person){
			age=30;
			alert(name);//fangfang;首先会查找with的作用域中是否包含属性name，如果包含就直接返回fangfang；如果没有，就会继续向上一层作用域中查找该属性，找到xiaoming；以此类推。
		}

结论：因此with语句中的person就类似于形成了一个局部作用域，该作用域内的变量的优先级要高于其作用域外的变量优先级，查找变量就通过作用域链依次向上查找

这也就不难解释上一个代码演示中with语句内的job弹出了student，因为先在person作用域内查找job没有找到，然后又在全局作用域中查找，正好window下有job，所以with语句内的Job相当于window.job而不是person.job