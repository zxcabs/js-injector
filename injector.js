//injector
(function (window) {
	
	var injector = function(g, fn){
		var sc=g['SCOPE']
			, fn=fn||function(){}
			, cnt
			, doc = document
			, cE = 'createElement'
			, aP = 'appendChild'
			;

		if(sc){
			fn('already exists');
		}else{
			g['SCOPE'] = sc = {};

			function getCnt() {
				if (!cnt) {
					cnt = doc.getElementById('SCOPE');

					if(!cnt){
						cnt = doc[cE]('div');
						cnt.id = 'SCOPE';
						doc.body[aP](cnt);
					};
				};

				return cnt;
			};
			
			function mU (u) {
				return ((u.match(/^\//))? sc.href + u: u);
			};
			
			function iJS(url, fn){
				var fn = fn || function(){}
					, el = doc[cE]('script')
					; 
					
					el.type = 'text/javascript';
					el.src = mU(url);
					
					function ol (err) {
						fn(err, sc.exports);
						sc.exports = undefined;
					};
					
					return ld(el, url, ol);
			};
			
			function iCSS(url, fn) {
				var fn = fn || function(){}
					, el = doc[cE]('link')
					; 
					
					el.type = 'text/css';
					el.rel = 'stylesheet';
					el.href = mU(url);
				
				return ld(el, url, fn);
			};
			
			function ld(el, u, cb) {
				var ua = u.split('/')
					, n = ua[ua.length - 1]
					;
				
				el.id = n;
				
				function on (err) {
					return function () {
						cb(err);
					};
				}
				
				el.onload = on();
				el.onabort = on('Abort');
				el.onerror = on('Load error');
				return getCnt()[aP](el);
			};
			
			sc.getContainer = getCnt;
			sc.includeJS = iJS;
			sc.includeCSS = iCSS;
			sc.exports = undefined;
			sc.v = '0.5';
			sc.href = 'HREF';
			sc._load = ld;
		
			fn(null, sc);
		};
	};
	
	/*
	 * Make injection script
	 * make([scope,] [href,] callback);
	 * callback(error, scope);
	 */
	function make(cb) {
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
		
		return  "javascript:(" + str + '(this,' + func +'));';
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
					 .replace(/function\s+/g, 'function ').replace(/var\s+/g, 'var ').replace(/case\s+/g, 'case ')
				;
		
		return r;
	};
	
	window.makeInject = make;
})(window);
