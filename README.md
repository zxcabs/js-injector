js-injector
===========
Inject script and css file into page


Example:
-------
* Make file

_index.html_

	
	<!doctype html>
	<html>
	<head>
		<script type='text/javascript' src='js/js-injector/injector.js'></script>
		<script type='text/javascript'>
			window.onload = function () {
				var a = document.getElementById('test');
				a.href = makeInject('TSCOPE', function(err,scope){
						scope.log('inject!: ' + err);
						if(!err){
							scope.include('http://yourhost/js/loader.js');
						};
					});
			};
		</script>
	</head>
	<body>
		<a href='#' id='test'>test</a>
	</body>
	</html>
	


_loader.js_

	
	(function (window, scope) {
		scope.log('Load loader.js');
	
		scope.include('http://yourhost/js/foo.js', function(err, data) {
			scope.log('foo include callback error: ' + err + '; data: ' + data);
		});
	})(window, TSCOPE);
	


_foo.js_

	
	(function (w, scope) {
		scope.log('load foo.js');
	
		scope.load('foo', 'some error', 'some data');
	})(window, TSCOPE);
	

* Open index.html
* Add test link to browser bookmarks
* Go to another page(any) and click to bookmark
* In the console should displayed something like this

>* inject!: null
>* Load loader.js
>* load foo.js
>* foo include callback error: some errordata: some data

