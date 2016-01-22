##《js高程设计》第九章 客户端检测

####1.能力监测
第一个概念是先检测达成目的的最常用的特性。先检测最常用的特性，可以保证代码最优化，因为在多数情况下都可以避免测试多个条件。  
第二个概念是必须测试实际要用到的特性。一个特性存在，不一定意味着另一个特性也存在。

####2.怪癖检测
目标识别浏览器特殊的行为，与能力检测不同，是想知道浏览器存在的什么缺陷.运行一小段代码，以确定某一特性不能正常工作.

####3.用户代理检测

* 用户代理检测通过检测用户代理字符串来确定实际使用的浏览器。
* 1.识别呈现引擎
	 
		var client = function(){
		    var engine = {
		        // 呈现引擎
		        ie: 0,
		        gecko:0,
		        webkit: 0,
		        khtml:0,
		        opera:0,
		        //其他版本号
		        ver: null
		    };
		    // 在此检测呈现引擎，平台和设备
		    return {
		        engine: engine
		    };
		}();
		var engine = client;
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/opr\/([\d\.]+)/) || window.opera) {//检测opera
		    var result = ua.match(/opr\/([\d\.]+)/);
		    engine.ver = result[1];
		    engine.opera = parseFloat(engine.ver);
		    if(window.opera) {
		        engine.ver = window.opera.version();
		        engine.opera = parseFloat(engine.ver);
		    }
		}else if(/applewebkit\/(\S+)/.test(ua)) {//检测webkit
		    engine.ver = RegExp["$1"];
		    engine.webkit = parseFloat(engine.ver);
		}else if (/khtml\/(\S+)/.test(ua) || /konqueror\/([^;]+)/.test(ua)){//检测kHTML
		    engine.ver = RegExp["$1"];
		    engine.khtml = parseFloat(engine.ver);
		}else if(/rv:([^\)]+)\) gecko\/\d{8}/.test(ua)){//检测gecko
		    engine.ver = RegExp["$1"];
		    engine.gecko = parseFloat(engine.ver);
		}else if (/msie ([^;]+)/.test(ua)){//检测ie
		    engine.ver = RegExp["$1"];
		    engine.ie = parseFloat(engine.ver);
		}
		console.log(engine);//Object {engine: Object, ver: "537.36", webkit: 537.36}

* 2.识别浏览器
	
		var client = function(){
		    var engine = {
		        // 呈现引擎
		        ie: 0,
		        gecko:0,
		        webkit: 0,
		        khtml:0,
		        opera:0,
		        //其他版本号
		        ver: null
		    };
		    var browser = {
		        // 浏览器
		        ie: 0,
		        firefox:0,
		        safari:0,
		        konq:0,
		        opera:0,
		        chrome:0,
		        // 其他的版本
		        ver: null
		    };
		    // 在此检测呈现引擎，平台和设备
		    return {
		        engine: engine,
		        browser: browser
		    };
		}();
		var engine = client;
		var browser = client;
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/opr\/([\d\.]+)/) || window.opera) {
		    var result = ua.match(/opr\/([\d\.]+)/);
		    engine.ver = browser.ver = result[1];
		    engine.opera = browser.opera = parseFloat(engine.ver);
		    if(window.opera) {
		        engine.ver = browser.ver = window.opera.version();
		        engine.opera = browser.opera = parseFloat(engine.ver);
		    }
		}else if(/applewebkit\/(\S+)/.test(ua)) {
		    engine.ver = RegExp["$1"];
		    engine.webkit = parseFloat(engine.ver);
		    // 确定是chrome还是safari
		    /*
		     * chrome用户代理字符串
		     * Mozilla/5.0 (Windows NT 6.1; WOW64)        AppleWebKit/537.36 (KHTML, like Gecko) 
		     * Chrome/42.0.2311.152 Safari/537.36
		     */
		    if(/chrome\/(\S+)/.test(ua)) {
		        browser.ver = RegExp["$1"];
		        browser.chrome = parseFloat(browser.ver);
		    }else if(/version\/(\S+)/.test(ua)) {
		        /*
		         * safari用户代理字符串
		         * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) 
		         * Version/5.1.7 Safari/534.57.2
		         */
		        browser.ver = RegExp["$1"];
		        browser.safari = parseFloat(browser.ver);
		    }else {
		        //近似地确定版本号
		        var safariVersion = 1;
		        if (engine.webkit < 100){
		            safariVersion = 1;
		        } else if (engine.webkit < 312){
		            safariVersion = 1.2;
		        } else if (engine.webkit < 412){
		            safariVersion = 1.3;
		        } else {
		            safariVersion = 2;
		        }
		        browser.safari = browser.ver = safariVersion;
		    }
		}else if (/khtml\/(\S+)/.test(ua) || /konqueror\/([^;]+)/.test(ua)){
		        engine.ver = browser.ver = RegExp["$1"];
		        engine.khtml = browser.konq =  parseFloat(engine.ver);
		}else if(/rv:([^\)]+)\) gecko\/\d{8}/.test(ua)){
		        engine.ver = RegExp["$1"];
		        engine.gecko = parseFloat(engine.ver);
		        /*
		         * firefox的用户代理的字符串
		         * Mozilla/5.0 (Windows NT 6.1; WOW64; rv:38.0) 
		         * Gecko/20100101 Firefox/38.0
		         */
		        // 确定是不是firefox
		        if(/firefox\/(\S+)/.test(ua)) {
		            browser.ver = RegExp["$1"];
		            browser.firefox = parseFloat(browser.ver);
		        }
		}else if (/msie ([^;]+)/.test(ua) || "ActiveXObject" in window){
		    if("ActiveXObject" in window) {
		        if(/msie ([^;]+)/.test(ua)) {
		            engine.ver = browser.ver = RegExp["1"];             
		            engine.ie = browser.ie = parseFloat(engine.ver);         
		        }else {             // ie11+            
		          if(/rv:([^\)]+)\)/.test(ua)) {                
		          		engine.ver = browser.ver = RegExp["1"];
		                engine.ie = browser.ie = parseFloat(engine.ver);
		            }
		        }
		    }
		}
		console.log(browser);//Object {engine: Object, browser: Object, ver: "46.0.2490.86", webkit: 537.36, chrome: 46}
		if (client.engine.webkit) { 
	    //if it’s WebKit
		    if (client.browser.chrome){
		       //执行针对Chrome 的代码
		    } else if (client.browser.safari){
		       //执行针对Safari 的代码
		    }
		} else if (client.engine.gecko){
		    if (client.browser.firefox){
		        //执行针对Firefox 的代码
		    } else {
		       //执行针对其他Gecko 浏览器的代码
		    }
		}

* 3.识别平台

		var client = function(){
          var engine = {
              // 呈现引擎
              ie: 0,
              gecko:0,
              webkit: 0,
              khtml:0,
              opera:0,
              //其他版本号
              ver: null
          };
          var browser = {
              // 浏览器
              ie: 0,
              firefox:0,
              safari:0,
              konq:0,
              opera:0,
              chrome:0,
              // 其他的版本
              ver: null
          };
          var system = {
              win: false,
              mac: false,
              xll: false,
              // 移动设备
              iphone: false,
              ipod: false,
              ipad: false,
              ios: false,
              android:false
           };
           // 在此检测呈现引擎，平台和设备
           return {
               engine: engine,
               browser: browser,
               system: system
           };
		}();
	       var engine = client;
	       var browser = client;
	       var ua = navigator.userAgent.toLowerCase();
	       if(ua.match(/opr\/([\d\.]+)/) || window.opera) {
	            var result = ua.match(/opr\/([\d\.]+)/);
	            engine.ver = browser.ver = result[1];
	            engine.opera = browser.opera = parseFloat(engine.ver);
	            if(window.opera) {
	                 engine.ver = browser.ver = window.opera.version();
	                 engine.opera = browser.opera = parseFloat(engine.ver);
	             }
	        }else if(/applewebkit\/(\S+)/.test(ua)) {
	            engine.ver = RegExp["$1"];
	            engine.webkit = parseFloat(engine.ver);
	            // 确定是chrome还是safari
	            /*
	             * chrome用户代理字符串
	             * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) 
	             * Chrome/42.0.2311.152 Safari/537.36
	             */
	             if(/chrome\/(\S+)/.test(ua)) {
	                  browser.ver = RegExp["$1"];
	                  browser.chrome = parseFloat(browser.ver);
	             }else if(/version\/(\S+)/.test(ua)) {
	                  /*
	                   * safari用户代理字符串
	                   * Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) 
	                   * Version/5.1.7 Safari/534.57.2
	                   */
	                  browser.ver = RegExp["$1"];
	                  browser.safari = parseFloat(browser.ver);
	             }else {
	                  //近似地确定版本号
	                  var safariVersion = 1;
	                  if (engine.webkit < 100){
	                      safariVersion = 1;
	                  } else if (engine.webkit < 312){
	                      safariVersion = 1.2;
	                  } else if (engine.webkit < 412){
	                      safariVersion = 1.3;
	                  } else {
	                      safariVersion = 2;
	                  }
	                  browser.safari = browser.ver = safariVersion;
	              }
	        }else if (/khtml\/(\S+)/.test(ua) || /konqueror\/([^;]+)/.test(ua)){
	              engine.ver = browser.ver = RegExp["$1"];
	              engine.khtml = browser.konq =  parseFloat(engine.ver);
 
        }else if(/rv:([^\)]+)\) gecko\/\d{8}/.test(ua)){
              engine.ver = RegExp["$1"];
              engine.gecko = parseFloat(engine.ver);
              /*
               * firefox的用户代理的字符串
               * Mozilla/5.0 (Windows NT 6.1; WOW64; rv:38.0) 
               * Gecko/20100101 Firefox/38.0
               */
              // 确定是不是firefox
              if(/firefox\/(\S+)/.test(ua)) {
                  browser.ver = RegExp["$1"];
                  browser.firefox = parseFloat(browser.ver);
              }
         }else if (/msie ([^;]+)/.test(ua) || "ActiveXObject" in window){
              if("ActiveXObject" in window) {
                 if(/msie ([^;]+)/.test(ua)) {
                    engine.ver = browser.ver = RegExp["$1"];
                    engine.ie = browser.ie = parseFloat(engine.ver);
                 }else {
                    if(/rv:([^\)]+)\)/.test(ua)) {
                        engine.ver = browser.ver = RegExp["$1"];
                        engine.ie = browser.ie = parseFloat(engine.ver);
                    }
                 }
              }
 
         }
         // 检测平台
         var system = client;
         var platform = navigator.platform;
         system.win = platform.indexOf("Win") == 0;
         system.mac = platform.indexOf("Mac") == 0;
         system.x11 = (platform.indexOf("X11") == 0) || (platform.indexOf("Linux") == 0);
 
         // 移动设备
         system.iphone = ua.indexOf("iphone") > -1;
         system.ipod = ua.indexOf("ipod") > -1;
         system.ipad = ua.indexOf("ipad") > -1;
         //检测iOS 版本
         if (system.mac && ua.indexOf("mobile") > -1){
              if (/cpu (?:iphone )?os (\d+_\d+)/.test(ua)){
                  system.ios = parseFloat(RegExp.$1.replace("_", "."));
              } else {
                  system.ios = 2; //不能真正检测出来，所以只能猜测
              }
          }
          //检测Android 版本
          if (/android (\d+\.\d+)/.test(ua)){
              system.android = parseFloat(RegExp.$1);
          }
          console.log(system);