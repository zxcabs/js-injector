js-injector
===========
Inject script and css file into page


Example:
-------
_index.html_

	
	<!doctype html>
	<html>
	<head>
		<script type='text/javascript' src='js/js-injector/injector.js'></script>
		<script type='text/javascript'>
			window.onload = function () {
				var a = document.getElementById('test');
				a.href = makeInject('TSCOPE', function(err,scope){
						console.log('inject!: ' + err);
						if(!err){
							scope.includeJS('/js/loader.js');
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
		console.log('Load loader.js');
	
		scope.includeJS('/js/foo.js', function(err, data) {
			console.log('foo include callback error: ' + err + '; data: ' + data);
		});
	})(window, TSCOPE);
	


_foo.js_

	
	(function (w, scope) {
		console.log('load foo.js');
		
		scope.includeCSS('/css/bar.css', function(err) {
			console.log('include bar.css');
		});
		
		scope.includeHTML(document.body, '/baz.html');
		
		scope.exports = 'some data';
	})(window, TSCOPE);
	
	

_bar.css_

	
	body {
		background: red;
	}
	

* Open index.html
* Add test link to browser bookmarks
* Go to another page(any) and click to bookmark
* In the console should displayed something like this

>* inject!: null
>* Load loader.js
>* load foo.js
>* foo include callback error: null, data: some data
>* include bar.css (Only IE and Opera)

callback on html load not supported;