# Todo

## next

- autocomplete
	- revert quand perd le focus
	- finir positionnement, etc.
- debounce (lodash) des fetch data


## Respond to window size
https://facebook.github.io/react/tips/dom-event-listeners.html

## implementer / refactor
[https://blog.risingstack.com/react-js-best-practices-for-2016/](https://blog.risingstack.com/react-js-best-practices-for-2016/)
- voir https://gist.github.com/Chrisui/49e76eb8b4ff887967e9
- reecrire les components en functional components https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components et https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.de5b5b1q8
- immutable
- normalizr
- au lieu de tinymce http://facebook.github.io/draft-js/

## Redux
- essayer de mettre un reselect different pour chaque instance de la meme classe au lieu de un par classe

## General

- login dans freestone plutot que par redirect
- liste des records en cours de modif par le user dans un widget
- createddate && modifdate dans constantes des alias de champs
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc.)
- standardiser les noms de fichiers (record-form, formRecord, etc)
- mettre les actions dans des constantes, les types de champs aussi
- mettre des icones/couleurs pour les groupes dans le menu


# Freestone PHP
- verifier que les tables avec plusieurs rels fonctionnent (voir icc content_block si encore setté de meme)
	- toutes les instances de Table->getRelField doivent passer le ID de la table parent. Vérifier dans js aussi
	- childrenAreLoaded (reducer record-form) est problématique
	- getRecords de formchildrenrecord reselect fucké 
- bank (et toutes les instances de cet classe)
- traduire les erreurs (VException)
- pruner les temp files
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

# Freestone JS


## Menu
- n records

## Header menu
## Liste
- faire une liste de type "file manager" ou on a des gros thumbnails au lieu d'une liste en table
- ptn delete

## Form
- mtm
- oto
- mettre types de champs dans un foreign (avec type str en key) plutot qu'un enum
- créer type "minirel" ou "repeater field" -> en fait décider si rels s'affichent avec tabs ou en liste (le faire avec type de champ par defaut, mais changeables selon user prefs [menu tite gear]?)
- types de input
	- file
	- tinymce
		- link styles css site
		- insert freestone image
		- insert freestone link
	- date https://github.com/wangzuo/input-moment
- champs en/fr séparés
- new record
	- val de order default
- liste des anciennes révisions du record
- comment enlever un record et ses children du store (aussi les children are loaded)
	- mettre un champ [table_id]_fk à chaque table loadée pour pouvoir deleter record sans connaitre structure
	- children loaded
	- menu gauche
	- quand save
	- quand cancel
- limiter en temps la validité d'un record pas savé, avec avertissement si trop vieux (1h?)
- si pas de record a saver quand component save, redirect (list??)
- limiter le nombre de characteres dans les tabs
- remettre le champ rewrite.current
- navig back quand saved
- vider menu quand save
- insert image de banque : drag & drop

## Modules
- all

## Pages
- all

# Pluss tard
- shop admin en react/redux
- ordre ds liste en drag/drop
- champ type ajax? (voir field format form)
- champ type tag
- meilleure strategie de modif du state quand save records (pas vider menu au complet par ex.)
- preview d'un record dans site (how... how... par uune duplic de db purement et simplement?)

# Semi-done

- comment faire en sorte de pas fetcher plein de fois le meme ajax si le component receive des props plusieurs fois entretemps? -> see redux async example shouldFetchPosts. P-e se faire un reducer qui contient toutes la signature des requetes en cours, et return false si on attempt une requete qui est deja en train de se ajaxer

## Liste
- self-join trees
- grouped records
- delete

## Forms
- autocomplete


# Done ou pas a faire
- pouvoir mettre une page par défaut au login (e.g. liste d'une table en particulier). *pas besoin, on peut linker vers une page et ce sera redirect la apres le login*

