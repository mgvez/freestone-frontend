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

- login dans freestone.jsx plutot que par redirect
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc.)
- liste des anciennes révisions du record
- au logout, save le state entier du user à la db

# Freestone PHP
- verifier que les tables avec plusieurs rels fonctionnent (voir icc content_block si encore setté de meme)
	- toutes les instances de Table->getRelField doivent passer le ID de la table parent. Vérifier dans js aussi
	- childrenAreLoaded (reducer record-form) est problématique
	- getRecords de formchildrenrecord reselect fucké 
- bank (et toutes les instances de cette classe)
	- js delete tags figure et figcaption vides
- traduire les erreurs (VException)
- remettre le champ rewrite.current
- pruner les temp files
- reimplmenter admin Bank.php
- remplacer les instances de 'id' par le vrai nom du champ (Table->priKeyName())
- vérifier constantes, et refactoriser
- à l'update: sitemap
	private static function manageSiteMap($tableId, $recId, $isDeleted) {
		$table = new Table($tableId);
		if($isDeleted) {
			return SiteMap::delete($table->getName(), $recId);
		}
		return SiteMap::update($table->getName(), $recId);
	}
- tester definitions dans install config
	- mettre field_type
- pas quit quand image resize marche pas : save quand meme
- images/files: overwrite ou pas au premier tour du resize, pour éviter d'écraser le fichier d'un autre record
- image resize pour img bank selon pixel ratio

# Freestone JS

## Menu

## Header menu
## Liste
- btn delete

## Form

par priorité

- créer type "minirel" ou "repeater field" -> en fait décider si rels s'affichent avec tabs ou en liste (le faire avec type de champ par defaut, mais changeables selon user prefs [menu tite gear]?)
- types de input
	- file
	- tinymce
		- link styles css site
		- insert freestone image
		- insert freestone link
	- date https://github.com/wangzuo/input-moment
- limiter en temps la validité d'un record pas savé, avec avertissement si trop vieux (1h?)
- insert image de banque : drag & drop
- autocomplete
	- revert quand perd le focus
	- finir positionnement, etc.
- Unit tests 20%


## Modules
- all

## Pages
- all

# Pluss tard
- faire une liste de type "file manager" ou on a des gros thumbnails au lieu d'une liste en table
- shop admin en react/redux
- ordre ds liste en drag/drop
- champ type ajax? (voir field format form)
- champ type tag
- meilleure strategie de modif du state quand save records (pas vider menu au complet par ex.)
- preview d'un record dans site (how... how... par uune duplic de db purement et simplement?)

# Semi-done


## Liste
- self-join trees
- grouped records
- delete

## Forms
- autocomplete

# Done à tester
- oto


# Done ou pas a faire
- pouvoir mettre une page par défaut au login (e.g. liste d'une table en particulier). *pas besoin, on peut linker vers une page et ce sera redirect la apres le login*

