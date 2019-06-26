

(function(){
	
	const PLACEHOLDER = '{{placeholder}}';

	function pepareContent(placeholder, ed) {
		const contentBefore = ed.getContent();
		const selectedNode = ed.selection.getNode();

		const container = document.createElement('div');
		container.appendChild(selectedNode.cloneNode(true));
		// console.log(container.innerHTML);
		const links = container.querySelectorAll('a');
		let link = null;
		if (links.length) {
			link = links[0].getAttribute('href');
		}

		// console.log(links);
		const selection = ed.selection.getContent();
		ed.execCommand('mceInsertContent', false, placeholder);
		const contentAfter = ed.getContent();
		return {
			contentBefore: contentBefore,
			contentAfter: contentAfter,
			selection: selection,
			link: link,
		};
	}

	tinymce.create('tinymce.plugins.freestone', {

		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('addImageFromBank', function() {});

			ed.addCommand('addDocFromBank', function() {});

			ed.addCommand('insertLink', function() {});

			ed.addButton('freestoneImageFromBank', {
				icon: "image",
				tooltip:"Insert image from bank",
				onclick: function() {
					ed.execCommand('addImageFromBank', false, pepareContent(PLACEHOLDER, ed));
				}
			});

			ed.addButton('freestoneDocFromBank', {
				tooltip:"Insert document from bank",
				icon:"browse",
				onclick: function() {
					ed.execCommand('addDocFromBank', false, pepareContent(PLACEHOLDER, ed));
				}
			});

			ed.addButton('freestoneLink', {
				tooltip:"Insert link",
				icon:"link",
				onclick: function() {
					ed.execCommand('insertLink', false, pepareContent(PLACEHOLDER, ed));
				}
			});

			// Add a node change handler, selects the button in the UI when a image is selected
			/*ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('example', n.nodeName == 'IMG');
			});/**/
		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Freestone plugin',
				author : 'Martin Vézina',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('freestone', tinymce.plugins.freestone);

})();
