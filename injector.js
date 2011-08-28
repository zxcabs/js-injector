//injector
(function (window) {
	
	var injector = function(w, fn){
		var sc=w['SCOPE']
			,fn=fn||function(){}
			,con=console	
			;

		if(sc){
			fn('already exists');
		}else{
			sc={};
			w['SCOPE']=sc;

			var cnt=null
				,_scLdEvs={}
				,doc=document
				,cE='createElement'
				,aP='appendChild'
				;
		
			function scLd(name,err,data){
				if(name&&_scLdEvs[name]){
					_scLdEvs[name](err,data);
					delete _scLdEvs[name];
				}
			};
	
			function getCnt(){
				if (!cnt) {
					cnt=doc.getElementById('SCOPE');

					if(!cnt){
						cnt=doc[cE]('div');
						cnt.id='SCOPE';
						doc.body[aP](cnt);
					};
				};

				return cnt;
			};

			function include(url, type, fn){
				var ua = url.split('/')
					, name = ua[ua.length - 1].replace(/\?.*$/i, '')
					, el
					, fn = fn || function(){}
					;

					switch (type) {
						case 'js':
							_scLdEvs[name]=fn;
							
							el=doc[cE]('script');
							el.type='text/javascript';
							el.charset='utf8';
							el.id=name;
							el.src=url;
							getCnt()[aP](el);
							break;
						case 'css':
							el=doc[cE]('link');
							el.type='text/css';
							el.href=url;
							el.rel='stylesheet';
							getCnt()[aP](el);
							break;
						default:
							fn('Type');
					};
			};

			function log(msg){
				if(con&&con.log)con.log(msg);
			};

			function error(msg){
				if(con&&con.error)con.error(msg);
			};

			sc.getContainer=getCnt;
			sc.include=include;
			sc.log=log;
			sc.error=error;
			sc.load=scLd;
			sc.v='0.3';
			sc.href='HREF';
		
			fn(null,sc);
		}
	};
	
	//create inject script
	//scope    - scope
	//return    - script string
	function make(scope, href, cb) {
		var   str  = injector.toString()
			, sc
			, hr
			, func
			;
		switch (arguments.length) {
			case 1:
				sc = 'INJECT';
				hr = window.location.href;
				func = ('function' == typeof arguments[0])? arguments[0]: function(){};
				break;
			case 2:
				sc = ('string' == typeof arguments[0])? arguments[0].replace(/\s/g, ''): 'INJECT';
				hr = window.location.href;
				func = ('function' == typeof arguments[1])? arguments[1]: function(){};
				break;
			case 3:
				sc = ('string' == typeof arguments[0])? arguments[0].replace(/\s/g, ''): 'INJECT';
				hr = ('string' == typeof arguments[1])? arguments[1].replace(/\s/g, ''): window.location.href;
				func = ('function' == typeof arguments[2])? arguments[2]: function(){};
				break;
			default:
				fn('Wrong argument');
		};
		
		str  = minJS(str.replace(/SCOPE/g, sc).replace(/HREF/g, hr));
		func = minJS(func.toString());
		
		return  "javascript:(" + str + ')(window,' + func +');';
	};
	
	function minJS(jsStr) {
		var r = jsStr.replace(/\s{2,}|\r|\n/g, '')
					 .replace(/,\s+/g, ',')
					 .replace(/\s{0,}\)\s{0,}/g, ')').replace(/\s{0,}\(\s{0,}/g, '(')
					 .replace(/\s{0,}{\s{0,}/g,'{').replace(/[\s;]{0,}}\s{0,}/g,'}')
					 .replace(/\s{0,}=\s{0,}/g, '=').replace(/\s{0,}==\s{0,}/g, '==').replace(/\s{0,}===\s{0,}/g, '===')
					 .replace(/\s{0,}!\s{0,}/g, '!').replace(/\s{0,}!=\s{0,}/g, '!=').replace(/\s{0,}!==\s{0,}/g, '!==')
					 .replace(/\s{0,}>\s{0,}/g, '>').replace(/\s{0,}>>\s{0,}/g, '>>').replace(/\s{0,}>=\s{0,}/g, '>=')
					 .replace(/\s{0,}<\s{0,}/g, '<').replace(/\s{0,}<<\s{0,}/g, '<<').replace(/\s{0,}<=\s{0,}/g, '<=')
					 .replace(/\s{0,}&\s{0,}/g, '&').replace(/\s{0,}&&\s{0,}/g, '&&')
					 .replace(/\s{0,}\|\s{0,}/g, '|').replace(/\s{0,}\|\|\s{0,}/g, '||')
					 .replace(/function\s+/g, 'function ').replace(/var\s+/g, 'var ').replace(/case\s+/g, 'case')
				;
		
		return r;
	};
	
	window.makeInject = make;
})(window);