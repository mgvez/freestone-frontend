<?php

	//ouvre un iFrame qui permet de naviguer dans le site et de s?lectionner la page vers laquelle on veut faire un lien.
	$site='http://'.$_SERVER['HTTP_HOST'];



?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>Insert Link</title>
	<meta http-equiv="Content-Type" content="text/html; charset='utf-8'">
	<script type="text/javascript" src="/admin/lib/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="../../tiny_mce_popup.js"></script>
<script language="JavaScript" type="text/javascript">

(function($){

	$(document).ready(function(){

		$(this).on('click.freestone', function(){
			$(this).off('click.freestone');
			window.resizeTo(1024,768);
		});


		var ifr = $('#source');
		var frm = $('#linkForm');
		frm.on('submit.freestone', function(){

			if (frm.find('#linkText').val() == '') {
				alert('Svp entrer un texte sur lequel se fera le lien.');
				return false;
			}
			//is there a freestone link?
			var lnk = ifr.contents().find('body').data('freestonelink');
			if(lnk) {
				lnk = '{' + lnk + '}';
			} else {
				//no freestone link, use page location
				lnk = ifr.contents().get(0).location.href ;
			}

			var html = '<a href="' + lnk + '">' + frm.find('#linkText').val() + '</a>';

			tinyMCEPopup.editor.execCommand('mceInsertContent', false, html);
			tinyMCEPopup.close();
			return false;

		});
	});

})(jQuery);

</script>
</head>

<body style="margin: 10px; background: #D3D3D3;">
<div style="width:1024px;height:768px;">
<!--<input type="button" value="test" onclick="console.log(oRte)">-->

<form name="linkForm" id="linkForm">
<table cellpadding="4" cellspacing="0" border="0">
	<tr><td colspan="2"><span style="font-style: italic; font-size: small;">Dans la fenêtre du bas, naviguez à la page vers laquelle vous voulez faire un lien et appuyez sur le bouton de sélection.</span></td></tr>
	<tr>
		<td align="right">Texte du lien:</td>
		<td><input name="linkText" type="text" id="linkText" size="40" value=""></td>
	</tr>
	<tr>
		<td colspan="3" align="center">
			<input type="submit" value="Inserer le lien" />
			<input type="button" value="Annuler" onClick="window.close();" />
		</td>
	</tr>
</table>

</form>

<iframe name="source" id="source" src="<?PHP echo $site; ?>" style="width:100%;height:100%">

</iframe>
</div>
<script type="text/javascript">
	var selTx = tinyMCEPopup.editor.selection.getContent();
	document.linkForm.linkText.value=selTx;
</script>
</body>
</html>
