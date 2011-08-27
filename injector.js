//injector
(function (window) {
	
	var injector = function(w, fn){
		var sc=w['SCOPE']
			,fn=fn||function(){}
			,con=console	
			;

		if(sc){
			log('already exists');
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

			function include(url,fn){
				if(!url&&typeof(url)!="string"&&url.match(/\.\w+$/i)){
					fn('Type');
				}else{
					var type=url.match(/\.\w+$/i)[0]
						,name
						,el;

					switch(type){
						case '.js':
							name=(url.match(/[\w\d.-]+$/i))?url.match(/[\w\d.-]+$/i)[0].replace(/\.\w+$/i, ''):'SCOPE'+Math.random();
							if (fn&&typeof(fn)=='function'){
								_scLdEvs[name]=fn;
							};
	
							el=doc[cE]('script');
							el.type='text/javascript';
							el.charset='utf8';
							el.id=name;
							el.src=url;
							getCnt()[aP](el);
							break;
						case '.css':
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
			};

			function log(msg) {
				if(con&&con.log)con.log(msg);
			};

			function error(msg) {
				if(con&&con.error)con.error(msg);
			};

			sc.getContainer=getCnt;
			sc.include=include;
			sc.log=log;
			sc.error=error;
			sc.load=scLd;
		
			fn(null,sc);
		}
	};
	
	//create inject script
	//url      - url js file
	//scope    - scope
	//return    - script string
	function make(scope, fn) {
		var   str = injector.toString()
			, sc  = scope || 'INJECT'
			, fn  = fn || 'function(){}'
			;
		
		return  "javascript:(" + str.replace(/SCOPE/g, sc).replace(/\s{2,}/g, '') + ')(window,' + fn.toString() +');';
	};
	
	window.makeInject = make;
})(window);