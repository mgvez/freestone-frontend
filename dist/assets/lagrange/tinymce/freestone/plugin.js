!function(){const n="{{placeholder}}";function e(e){const t=e.getContent(),o=e.selection.getNode(),i=document.createElement("div");i.appendChild(o.cloneNode(!0));const c=i.querySelectorAll("a");let r=null;c.length&&(r=c[0].getAttribute("href"));const a=e.selection.getContent();let m;return a&&0===a.trim().indexOf("<figure")?(m=e.getContent(),m=m.replace(a,n)):(e.execCommand("mceReplaceContent",!1,n),m=e.getContent()),{contentBefore:t,contentAfter:m,selection:a,link:r}}tinymce.create("tinymce.plugins.freestone",{init:function(n,t){n.addCommand("addImageFromBank",(function(){})),n.addCommand("addDocFromBank",(function(){})),n.addCommand("insertLink",(function(){})),n.addButton("freestoneImageFromBank",{icon:"image",tooltip:"Insert image from bank",onclick:function(){n.execCommand("addImageFromBank",!1,e(n))}}),n.addButton("freestoneDocFromBank",{tooltip:"Insert document from bank",icon:"browse",onclick:function(){n.execCommand("addDocFromBank",!1,e(n))}}),n.addButton("freestoneLink",{tooltip:"Insert link",icon:"link",onclick:function(){n.execCommand("insertLink",!1,e(n))}})},createControl:function(n,e){return null},getInfo:function(){return{longname:"Freestone plugin",author:"Martin Vézina",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example",version:"1.0"}}}),tinymce.PluginManager.add("freestone",tinymce.plugins.freestone)}();