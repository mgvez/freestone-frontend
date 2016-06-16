# Todo

## next



## Respond to window size
https://facebook.github.io/react/tips/dom-event-listeners.html

## implementer / refactor
[https://blog.risingstack.com/react-js-best-practices-for-2016/](https://blog.risingstack.com/react-js-best-practices-for-2016/)
- voir https://gist.github.com/Chrisui/49e76eb8b4ff887967e9
- reecrire les components en functional components https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components et https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.de5b5b1q8
- immutable
- normalizr
- au lieu de tinymce http://facebook.github.io/draft-js/

## General
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc.)
- liste des anciennes révisions du record
- au logout, save le state entier du user à la db

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

## Modules
- all


# Freestone JS
- login dans freestone.jsx plutot que par redirect

## Menu

## Header menu
## Liste
- grouped records
- self-join trees

## Form

par priorité

- types de input
	- enum
	- tinymce
		- link styles css site
	- date https://github.com/wangzuo/input-moment
	- link (internal)
	- password
- limiter en temps la validité d'un record pas savé, avec avertissement si trop vieux (1h?)
- insert image de banque : drag & drop
- autocomplete
	- revert quand perd le focus
	- finir positionnement, etc.
	- afficher images (si image presente dans label)
- Unit tests 20%


## Pages
- all

# Pluss tard
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
