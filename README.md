## Notes

### eslint

on doit utiliser babel-eslint (voir le parser dans .eslintrc)

### babel

Les presets de babel sont utilisés. Voir .babelrc, et les presets installés par npm (package.json), en particulier les presets de stage (par ex. https://babeljs.io/docs/plugins/preset-stage-0/)

Les decorators ne sont pas suportés par Babel 6 (as of 2015-12-22) mais un plugin existe: 
```npm i babel-plugin-transform-decorators-legacy -D```
et voir ensuite dans .babelrc

## BUGS
- quand login marche pas, ?next s'append à chauqe login manqué

## Todo

### next

- navig back quand saved
- delete children (php)
- tab order
- VISUEL

### Respond to window size
https://facebook.github.io/react/tips/dom-event-listeners.html

### implementer / refactor
[https://blog.risingstack.com/react-js-best-practices-for-2016/](https://blog.risingstack.com/react-js-best-practices-for-2016/)

- immutable
- normalizr

### Redux
- essayer de mettre un reselect different pour chaque instance de la meme classe au lieu de un par classe
- strategie de invalidate du data après save & cancel

### General
- liste des records en cours de modif par le user dans un widget
- createddate && modifdate dans constantes des alias de champs
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc.)
- standardiser les noms de fichiers (record-form, formRecord, etc)
- mettre les actions dans des constantes, les types de champs aussi
- mettre des icones/couleurs pour les groupes dans le menu


### Freestone PHP
- verifier que les tables avec plusieurs rels fonctionnent (voir icc content_block si encore setté de meme)
	- toutes les instances de Table->getRelField doivent passer le ID de la table parent. Vérifier dans js aussi
	- childrenAreLoaded (reducer record-form) est problématique
	- getRecords de formchildrenrecord reselect fucké 
- bank (et toutes les instances de cet classe)
- traduire les erreurs (VException)
- pruner les temp files
- delete children
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

### Freestone JS

#### Menu
- n records

#### Header menu
#### Liste
- faire une liste de type "file manager" ou on a des gros thumbnails au lieu d'une liste en table

#### Form
- mtm
- oto
- record last modif
- mettre types de champs dans un foreign (avec type str en key) plutot qu'un enum
- créer type "minirel" ou "repeater field" -> en fait décider si rels s'affichent avec tabs ou en liste (le faire avec type de champ par defaut, mais changeables selon user prefs [menu tite gear]?)
- types de input
	- file
	- tinymce
		- link styles css site
		- insert freestone image
		- insert freestone link
	- date https://github.com/wangzuo/input-moment
- champ type ajax? (voir field format form)
- champ type tag
- champs en/fr séparés
- liste des anciennes révisions du record
- save
- comment enlever un record et ses children du store (aussi les children are loaded)
	- mettre un champ [table_id]_fk à chaque table loadée pour pouvoir deleter record sans connaitre structure
	- children loaded
	- menu gauche
	- quand save
	- quand cancel
- limiter en temps la validité d'un record pas savé, avec avertissement si trop vieux (1h?)
- si pas de record a saver quand component save, redirect (list??)
- drag & drop tabs http://webcloud.se/sortable-list-component-react-js/
- limiter le nombre de characteres dans les tabs
- remettre le champ rewrite.current
- navig back quand saved
- vider menu quand save
- insert image de banque : drag & drop

#### Modules
- all

#### Pages
- all

### Pluss tard
- shop admin en react/redux
- ordre ds liste en drag/drop
- meilleure strategie de modif du state quand save records (pas vider menu au complet par ex.)
- preview d'un record dans site (how... how... par uune duplic de db purement et simplement?)

### Semi-done

- comment faire en sorte de pas fetcher plein de fois le meme ajax si le component receive des props plusieurs fois entretemps? -> see redux async example shouldFetchPosts. P-e se faire un reducer qui contient toutes la signature des requetes en cours, et return false si on attempt une requete qui est deja en train de se ajaxer

#### Liste
- self-join trees
- grouped records
- delete

#### Forms
- autocomplete


### Done ou pas a faire
- pouvoir mettre une page par défaut au login (e.g. liste d'une table en particulier). *pas besoin, on peut linker vers une page et ce sera redirect la apres le login*

