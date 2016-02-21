(function() {
	var _;
	this.ListBox = function(targetElement) {
		_ = this;

		// Private Variables
		_.listBox = null;

		// Defaults
		var defaults = {
			className : targetElement,
			allowDuplicate : false,
			listItemClassName : 'listitem',
			listItemRemoverClassName : 'listitemremover',
			listBoxClassName : 'list',
			listerClassName : 'lister'
		};

		// Extend
		_.options = extendDefaults(defaults, arguments[0]);
		
		init();
	};

	// Private Methods
	// Method for extending options with arguments
	function extendDefaults(source, properties) {
		for( var property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			} 
		}
		return source;
	}

	// Method for creating the listbox
	function init() {
		_.listBox = document.getElementsByClassName( _.options.className);
		i = 0;
		for( var lb of _.listBox ) {
			var list= document.createElement('div');
			list.className = _.options.listBoxClassName;

			var lister = document.createElement('input');
			lister.className = _.options.listerClassName;

			lb.appendChild(list);
			lb.appendChild(lister);
		}
		initializeEvents();
	}

	// Method for attaching events
	function initializeEvents() {
		for( var lb of _.listBox ) {
			lb.getElementsByClassName(_.options.listerClassName)[0].addEventListener('keypress', function(e) {
				addItem(e, this);
			});
		}
	}

	// Method for adding list items
	function addItem( event, lister ) {
		var list = lister.previousSibling;
		if( event.keyCode == '13' && lister.value != '' ) {
			if( _.options.allowDuplicate == false ) {
				for( var i = 0, children = list.childNodes; i < children.length; i++ ) {
					if( children[i].childNodes[0].nodeValue == lister.value ) {
						alert('Already Exist');
						return;
					}
				}
			}

			var listItem = document.createElement('span');
			listItem.className=_.options.listItemClassName;

			var itemRemover = document.createElement('span');
			itemRemover.className = _.options.listItemRemoverClassName;
			itemRemover.appendChild(document.createTextNode('X'));

			listItem.appendChild(document.createTextNode(lister.value))	;
			listItem.appendChild(itemRemover);

			list.appendChild(listItem);

			itemRemover.addEventListener('click', function() {
				this.parentNode.remove();
			});

			lister.value = "";
		}
	}
})();

window.onload = function() {
	var lb = new ListBox('listbox');
}
	


