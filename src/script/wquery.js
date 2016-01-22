(function(){
	var $ = document.querySelectorAll.bind(document);
	var $$ = document.querySelector.bind(document);

	function empty(selector){
		var nodes = $(selector);
		for (var index in nodes) {
			nodes[index].innerHTML = '';
		}
	}

	function append(selector, append, type){
		var wrapper= document.createElement('div');
		wrapper.innerHTML= append;
		if (type){
			wrapper.innerHTML = '<' + type + '>' + append + '</' + type + '>';
		}
		$$(selector).appendChild(wrapper.firstChild);
	}

	function html(selector, html){
		var nodes = $(selector);
		for (var index in nodes){
			nodes[index].innerHTML = html;
		}
	}

	function animate(selector, style){
		$$(selector).style.animation = style;
	}

	function style(selector, style, value){
		$$(selector).style[style] = value;
	}

	function hide(selector){
		$$(selector).style.display = 'none';
	}

	function show(selector){
		$$(selector).style.display = 'block';
	}

	window._WQ = {
		empty : empty,
		append : append,
		style : style,
		hide : hide,
		show : show,
		animate : animate,
		html : html,
		$ : $,
		$$ : $$
	};
})();

