## Notes

### eslint

on doit utiliser babel-eslint (voir le parser dans .eslintrc)

### babel

Les presets de babel sont utilisés. Voir .babelrc, et les presets installés par npm (package.json), en particulier les presets de stage (par ex. https://babeljs.io/docs/plugins/preset-stage-0/)

Les decorators ne sont pas suportés par Babel 6 (as of 2015-12-22) mais un plugin existe: 
```npm i babel-plugin-transform-decorators-legacy -D```
et voir ensuite dans .babelrc


## Todo

### next

- file inputs
- remove record from redux quand saved
- delete children (php)
- order dans lst
- tab order

### Respond to window size
https://facebook.github.io/react/tips/dom-event-listeners.html

### implementer / refactor
[https://blog.risingstack.com/react-js-best-practices-for-2016/](https://blog.risingstack.com/react-js-best-practices-for-2016/)

- immutable
- normalizr

### BUGS
- quand login marche pas, ?next s'append à chauqe login manqué

### Freestone


#### Redux
- essayer de mettre un reselect different pour chaque instance de la meme classe au lieu de un par classe
- strategie de invalidate du data

#### General
- settings generaux, i.e. nom du site, url
- liste des records en cours de modif par le user dans un widget
- createddate && modifdate dans constantes des alias de champs
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc.)
- pouvoir mettre une page par défaut au login (e.g. liste d'une table en particulier)
- standardiser les noms de fichiers (record-form, formRecord, etc)
- mettre les actions dans des constantes, les types de champs aussi
- mettre des icones/couleurs pour les groupes dans le menu

#### PHP
- verifier que les tables avec plusieurs rels fonctionnent (voir icc content_block si encore setté de meme)
	- toutes les instances de Table->getRelField doivent passer le ID de la table parent. Vérifier dans js aussi
- bank (et toutes les instances de cet classe)
- traduire les erreurs (VException)
- Save files
- delete children
- remplacer les instances de 'id' par le vrai nom du champ (Table->priKeyName())

#### Menu
- n records

#### Header menu
#### Liste
- field types images
- field types file
- recherche
	- chercher aussi dans les foreign keys
- paging
- order buttons. Mettre à la position du champ dans les colonnes selon son rank (ou immediatement à droite des fcn)

#### Form
- mtm
- oto
- record last modif
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
	- quand save
	- quand cancel
- drag & drop tabs http://webcloud.se/sortable-list-component-react-js/
- limiter le nombre de characteres dans les tabs
- remettre le champ rewrite.current

#### Modules
#### Pages

### Refactor
	- upload des records en tree, et des files. Rencre plus clair, peut etre en flat, et mettre les files aussi plus clair (voir le loop qui build les ids de champs file)



### Semi-done

#### Liste
- self-join trees
- grouped records
- delete
- change order

#### Forms
- autocomplete

