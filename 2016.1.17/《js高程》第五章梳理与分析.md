##《js高程》第五章 引用类型

###一.重点梳理

####1.引用类型
* Object类型
* Array类型
* Date类型
* RegExp类型
* Function

####2.数组常用方法
* 数组元素的添加
    * arrayObj. push(num);// 将一个或多个新元素添加到数组结尾，并返回数组新长度
    * arrayObj.unshift(num);// 将一个或多个新元素添加到数组开始，数组中的元素自动后移，返回数组新长度
    * arrayObj.splice(insertPos,0,[item1[, item2[, . . . [,itemN]]]]);//将一个或多个新元素插入到数组的指定位置，插入位置的元素自动后移，返回""。
* 数组元素的删除
    * arrayObj.pop(); //移除最后一个元素并返回该元素值
    * arrayObj.shift(); //移除最前一个元素并返回该元素值，数组中元素自动前移
    * arrayObj.splice(deletePos,deleteCount); //删除从指定位置deletePos开始的指定数量deleteCount的元素，数组形式返回所移除的元素
* 数组的截取和合并
    * arrayObj.slice(start, [end]); //以数组的形式返回数组的一部分，注意不包括 end 对应的元素，如果省略 end 将复制 start 之后的所有元素
    * arrayObj.concat([item1[, item2[, . . . [,itemN]]]]); //将多个数组（也可以是字符串，或者是数组和字符串的混合）连接为一个数组，返回连接好的新的数组
* 数组的拷贝
    * arrayObj.slice(0); //返回数组的拷贝数组，注意是一个新的数组，不是指向
    * arrayObj.concat(); //返回数组的拷贝数组，注意是一个新的数组，不是指向
* 数组元素的排序
    * arrayObj.reverse(); //反转元素（最前的排到最后、最后的排到最前），返回数组地址
    * arrayObj.sort(); //对数组元素排序，返回数组地址
* 数组元素的字符串化
    * arrayObj.join(separator); //返回字符串，这个字符串将数组的每一个元素值连接在一起，中间用 separator 隔开。
    * toLocaleString 、toString 、valueOf：可以看作是join的特殊用法，不常用

####3.Function类型
* 定义函数的三种方式
	
	* 函数声明：function sum(a,b){return a+b;}
	* 函数表达式:var sum=function(a,b){return a+b};
	* Function构造函数：var sum=new Function('a','b','return a+b');

####4.基本包装类型
* 基本包装类型：String类型、Number类型、Boolean类型
* 与引用类型的区别：对象的生存期

		var str='abc';
		str.name='basic';
		alert(str.name)//undefined
基本包装类型的对象只存在于一行代码的执行瞬间，然后立即被销毁。因此第二行创建的String在执行第三行代码时已经被销毁了

####5.字符串方法
* 获取类方法    
  * charAt()    
     * stringObject.charAt(index)  
     * 方法可用来获取指定位置的字符串，index为字符串索引值，从0开始到string.leng – 1，若不在这个范围将返回一个空字符串。如：  
     
				var str = 'abcde';  
				console.log(str.charAt(2));     //返回c  
				console.log(str.charAt(8));     //返回空字符串  
  * charCodeAt()  
      * stringObject.charCodeAt(index)  
      * charCodeAt()方法可返回指定位置的字符的Unicode编码。charCodeAt()方法与charAt()方法类似，都需要传入一个索引值作为参数，区别是前者返回指定位置的字符的编码，而后者返回的是字符子串。  
				
				var str = 'abcde';  			
				console.log(str.charCodeAt(0));     //返回97  
  * fromCharCode()  
      * String.fromCharCode(numX,numX,…,numX)  
      * fromCharCode()可接受一个或多个Unicode值，然后返回一个字符串。另外该方法是String 的静态方法，字符串中的每个字符都由单独的数字Unicode编码指定。  

				String.fromCharCode(97, 98, 99, 100, 101)   //返回abcde  
* 查找类方法  
  * indexOf()  
     * stringObject.indexOf(searchvalue,fromindex)  
     * indexOf()用来检索指定的字符串值在字符串中首次出现的位置。它可以接收两个参数，searchvalue表示要查找的子字符串，fromindex表示查找的开始位置，省略的话则从开始位置进行检索。  
				 
				var str = 'abcdeabcde';  
				console.log(str.indexOf('a'));  // 返回0  
				console.log(str.indexOf('a', 3));   // 返回5  
				console.log(str.indexOf('bc')); // 返回1  
  * lastIndexOf()方法  
     * stringObject.lastIndexOf(searchvalue,fromindex)
     * lastIndexOf()语法与indexOf()类似，它返回的是一个指定的子字符串值最后出现的位置，其检索顺序是从后向前。  
				
				var str = 'abcdeabcde';  
				console.log(str.lastIndexOf('a'));  // 返回5  
				console.log(str.lastIndexOf('a', 3));   // 返回0 从第索引3的位置往前检索  
				console.log(str.lastIndexOf('bc')); // 返回6    
  * search()方法
      * stringObject.search(substr) 
      * stringObject.search(regexp)
      * search()方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。它会返回第一个匹配的子字符串的起始位置，如果没有匹配的，则返回-1。  
				
				var str = 'abcDEF';  
				console.log(str.search('c'));   //返回2  
				console.log(str.search('d'));   //返回-1  
				console.log(str.search(/d/i));  //返回3  
  * match()方法
      * stringObject.match(substr) 
      * stringObject.match(regexp)
      * match()方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
      * 如果参数中传入的是子字符串或是没有进行全局匹配的正则表达式，那么match()方法会从开始位置执行一次匹配，如果没有匹配到结果，则返回null。否则则会返回一个数组，该数组的第0个元素存放的是匹配文本，除此之外，返回的数组还含有两个对象属性index和input，分别表示匹配文本的起始字符索引和stringObject 的引用(即原字符串)。  
				
				var str = '1a2b3c4d5e';  
				console.log(str.match('h'));    //返回null  
				console.log(str.match('b'));    //返回["b", index: 3, input: "1a2b3c4d5e"]  
				console.log(str.match(/b/));    //返回["b", index: 3, input: "1a2b3c4d5e"]  
      * 如果参数传入的是具有全局匹配的正则表达式，那么match()从开始位置进行多次匹配，直到最后。如果没有匹配到结果，则返回null。否则则会返回一个数组，数组中存放所有符合要求的子字符串，并且没有index和input属性。  
				
				var str = '1a2b3c4d5e';  
				console.log(str.match(/h/g));   //返回null  
				console.log(str.match(/\d/g));  //返回["1", "2", "3", "4", "5"]
* 截取类方法
  * subString()
     * stringObject.(start,end)
     * subString()是最常用到的字符串截取方法，它可以接收两个参数(参数不能为负值)，分别是要截取的开始位置和结束位置，它将返回一个新的字符串，其内容是从start处到end-1处的所有字符。若结束参数(end)省略，则表示从start位置一直截取到最后。  
				
				var str = ‘abdopfg';  
				console.log(str.subString(1, 4));   //返回bdo  
				console.log(str.subString(1));  //返回bdopfg  
				console.log(str.subString(-1)); //返回abdopfg，传入负值时会视为0
 * slice()
     * stringObject.slice(start,end)
     * slice()方法与subString()方法非常类似，它传入的两个参数也分别对应着开始位置和结束位置。而区别在于，slice()中的参数可以为负值，如果参数是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符。  
				
				var str =’abdopfg ';  
				console.log(str.slice(1, 4));   //返回bdo  
				console.log(str.slice(-3, -1)); //返回pf  
				console.log(str.slice(1, -1));  //返回abdopf  
				console.log(str.slice(-1, -3)); //返回空字符串，若传入的参数有问题，则返回空
 * substr()
     * stringObject.substr(start,length)
     * substr()方法可在字符串中抽取从start下标开始的指定数目的字符。其返回值为一个字符串，包含从 stringObject的start（包括start所指的字符）处开始的length个字符。如果没有指定 length，那么返回的字符串包含从start到stringObject的结尾的字符。另外如果start为负数，则表示从字符串尾部开始算起。  
				
				var str = ‘abdopfg';  
				console.log(str.substr(1, 3))   //返回bdo  
				console.log(str.substr(2))  //返回dopfg  
				console.log(str.substr(-2, 4))  //返回fg，目标长度较大的话，以实际截取的长度为准
* 其他方法
  * replace()方法
     * stringObject.replace(regexp/substr,replacement)
     * replace()方法用来进行字符串替换操作，它可以接收两个参数，前者为被替换的子字符串（可以是正则），后者为用来替换的文本。
如果第一个参数传入的是子字符串或是没有进行全局匹配的正则表达式，那么replace()方法将只进行一次替换（即替换最前面的），返回经过一次替换后的结果字符串。  
				
				var str = ';  
				console.log(str.replace('a', 'A'));  
				console.log(str.replace(/a/, 'A'));  
 * 如果第一个参数传入的全局匹配的正则表达式，那么replace()将会对符合条件的子字符串进行多次替换，最后返回经过多次替换的结果字符串。  
				
				var str = ';  
				console.log(str.replace(/a/g, 'A'));    //返回  
				console.log(str.replace(/a/, '$'));   //返回$$$BCDE
  * split()方法
     * stringObject.split(separator,)
     * split()方法用于把一个字符串分割成字符串数组。第一个参数separator表示分割位置(参考符)，第二个参数howmany表示返回数组的允许最大长度(一般情况下不设置)。  
				   
				var str = 'a|b|c|d|e';  
				console.log(str.split('|'));    //返回["a", "b", "c", "d", "e"]  
				console.log(str.split('|', 3)); //返回["a", "b", "c"]  
				console.log(str.split('')); //返回["a", "|", "b", "|", "c", "|", "d", "|", "e"]  
     * 也可以用正则来进行分割  
				
				var str = 'a1b2c3d4e';  
				console.log(str.split(/\d/)); //返回["a", "b", "c", "d", "e"]
  * toLowerCase()和toUpperCase()
     * stringObject.toLowerCase() 
     * stringObject.toUpperCase()

####6.call和apply的区别与用法
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

####7.Math对象
* 常用Math方法
	* floor(x) 对一个数进行下舍入。
	* max(x,y) 返回 x 和 y 中的最高值 
	* min(x,y) 返回 x 和 y 中的最低值
	* pow(x,y) 返回 x 的 y 次幂 
	* random() 返回 0 ~ 1 之间的随机数
	* round(x) 把一个数四舍五入为最接近的整数
	* sin(x) 返回数的正弦
	* sqrt(x) 返回数的平方根
	* tan(x) 返回一个角的正切 
	* ceil(x) 对一个数进行上舍入。

######注：对正则表达式那一部分还不太理解，所以没有总结。打算买本《精通正则表达式》来看

###二.相关知识理解

####1.对eval函数的理解

* 定义：eval函数可计算某个字符串，并执行其中的的 JavaScript 代码。
	
		document.write(eval("2+2"))//4
		alert(eval("(function (){return 1;})()"))//1
注：如果参数中没有合法的表达式和语句，会抛出 SyntaxError 异常。
		
		alert(eval("function (){return 1;})"))//抛出 SyntaxError 异常,直接定义匿名函数不合法
注：eval接受的参数为语句时，执行结果为一个值则返回此值，否则返回undefined
		
		alert(eval("function a(){return 1;}"))//undefined
* eval的作用域：它总是在调用它的上下文变量空间内执行，没有特殊的作用域

		var s='function test(){return 1;}'; //一个函数定义语句 
		function demo(){ 
		eval(s); 
		alert(test());
		} 
		demo(); //1
		alert(test()); //error:test is not defined 
		s在函数内部被eval解析，所以只能在函数内执行，外部访问不到
注：如果想让eval变成全局的可以在eval前加window（不太明白）

		var s='function test(){return 1;}'; //一个函数定义语句 
		function demo(){ 
		window.eval(s); 
		alert(test());
		} 
		demo(); //1
		alert(test()); //1
		eval函数处于全局作用域下
* eval中的this：指向调用上下文中的this
		
		var name=3;
		var obj={
			'name':4,
			'get':function(){
				eval("alert(this.name)");
			}
		}		
		obj.get();//4
* eval解析json
		
		var data='{"a":{"name":"xiaoming","age":20,"job":"student"}}';
		alert(eval("("+data+")"))//object
注：对于对象声明语句来说，仅仅是执行，并不能返回值。为了返回常用的“{}”这样的对象声明语句，必须用括号括住，以将其转换为表达式，才能返回其值。

不支持使用eval函数： 1、性能不好 2、不安全 3、产生混乱的代码逻辑