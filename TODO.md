# Todo

## next
- images retina (bank / field normal)

## Respond to window size
https://facebook.github.io/react/tips/dom-event-listeners.html

## implementer / refactor
[https://blog.risingstack.com/react-js-best-practices-for-2016/](https://blog.risingstack.com/react-js-best-practices-for-2016/)
- voir https://gist.github.com/Chrisui/49e76eb8b4ff887967e9
- reecrire les components en functional components https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components et https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.de5b5b1q8

## General
- Rows: pas d'infos ni btns, ils apparaissent ds un widget au hover
- Duplicate records
- Quand erreur au save, btn confirm avant de retourner (pas de timeout)
- mettre un search general
- Banque : liste de thumbnails au lieu de records en table
- au logout, save le state entier du user à la db
- Drag & drop dans liste pour order
- Mettre les subforms collapse/decollapse
- liste des anciennes révisions du record
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc.)

# Freestone PHP
- bank (et toutes les instances de cette classe)
	- js delete tags figure et figcaption vides
	- image resize pour img bank selon pixel ratio
- tester definitions dans install config
	- mettre field_type
- verifier que les tables avec plusieurs rels fonctionnent (voir icc content_block si encore setté de meme)
	- toutes les instances de Table->getRelField doivent passer le ID de la table parent. Vérifier dans js aussi
	- childrenAreLoaded (reducer record-form) est problématique
	- getRecords de formchildrenrecord reselect fucké
- traduire les erreurs (VException)
- pas quit quand image resize marche pas : save quand meme

# Freestone JS
- link vers home
- pouvoir editer son propre compte

## Dashboard
- Analytics
- latest modifications?
- login list?
- status commerce en ligne
- feed de nouvelle twitter alerte mot cle
- campagnes de emails (mailchimp, etc)
- derniers messages envoyés par formulaires

## Menu

## Header menu
## Liste

## Form
- changement de langue : sticky
- link to document from bank
- champ type url
- quand edit img banque et change lang, ferme popin
	- parce que le input sous-jacent change aussi car il répond au state. Soit mettre les 2 langues dans le form de bank, ou mettre le lang local aux forms din popins, ou mettre que le lang est table-specific

## Pages
- all

# Pluss tard
- Unit tests 20%
- insert image de banque : drag & drop
- faire une liste de type "file manager" ou on a des gros thumbnails au lieu d'une liste en table
- shop admin en react/redux
- ordre ds liste en drag/drop
- champ type ajax? (voir field format form)
- champ type tag
- meilleure strategie de modif du state quand save records (pas vider menu au complet par ex.)
- preview d'un record dans site (how... how... par une duplic de db purement et simplement?)
- à l'update: sitemap
	private static function manageSiteMap($tableId, $recId, $isDeleted) {
		$table = new Table($tableId);
		if($isDeleted) {
			return SiteMap::delete($table->getName(), $recId);
		}
		return SiteMap::update($table->getName(), $recId);
	}





