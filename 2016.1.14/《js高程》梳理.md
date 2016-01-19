###《js高级程序设计》第二章总结
####1.脚本加载方式
* async：异步，立即下载脚本，但不妨碍页面中其他操作，多个脚本无序执行
* defer：延迟，立即下载脚本，延迟到</html>标签后执行，多个脚本顺序执行

####2.在XHTML中的用法

		function a(){
			if(a > b){
				alert(1);
			}
		}

* 特殊符号要转换成实体符号，例如：>用&gt；
* 用CData片段包含js代码

		<script>
			//<![CData[
				function a(){
					if(a > b){
						alert(1);
					}
				}
			//]]
		</script>
在不兼容XHTML的浏览器中用注释实现平稳退化