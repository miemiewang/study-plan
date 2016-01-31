function fn(data){
		var html='';
		if(data.s.length){
			for(var i=0;i<data.s.length;i++){
				html+='<li>'+data.s[i]+'</li>';
			}
			$('.search_result').html(html);
			$('.search_result').show();
		}else{
			$('.search_result').hide();
		}
	}
$(function(){
	//导航条的显示隐藏
	$('.down_list').on({
		mouseover:function(){
			$(this).children('div').show();
			$(this).children('a').css({'color':'#c21a19'})
		},
		mouseout:function(){
			$(this).children('div').hide();
			$(this).children('a').css('color','')
		}
	})
	$('.down_list a').on({
		mouseover:function(){
			$(this).css({'color':'#c21a19','textDecoration':'underline'})
			$('.all_bar a').css({'color':'','textDecoration':''})
		},
		mouseout:function(){
			$(this).css({'color':'','textDecoration':''})
		}
	})
	//搜索框获得失去焦点
	var originValue=$('.search_text').val();
	$('.search_text').on({
		focus:function(){
			if(this.value==originValue){
				this.value='';
			}
		},
		blur:function(){
			if(!this.value){
				this.value=originValue;
			}
		}
	})
	//ajax使用
	
	$('.search_text').keyup(function(){
		var oScript=$('<script>');
		if(this.value){
			oScript.attr('src','http://suggestion.baidu.com/su?wd='+this.value+'&cb=fn');
			$('body').append(oScript);
		}else{
			$('.search_result').hide();
		}
	}) 
})