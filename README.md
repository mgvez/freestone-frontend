Basé sur Redux Easy Boilerplate
=========================


### eslint

on doit utiliser babel-eslint (voir le parser dans .eslintrc)

### babel

Les presets de babel sont utilisés. Voir .babelrc, et les presets installés par npm (package.json), en particulier les presets de stage (par ex. https://babeljs.io/docs/plugins/preset-stage-0/)

Les decorators ne sont pas suportés par Babel 6 (as of 2015-12-22) mais un plugin existe: 
```npm i babel-plugin-transform-decorators-legacy -D```
et voir ensuite dans .babelrc


## Todo

### Drag & drop tabs

http://webcloud.se/sortable-list-component-react-js/

### Datepicker

https://github.com/wangzuo/input-moment

### Tinymce

### Plugin freestone tinymce

### Respond to window size
https://facebook.github.io/react/tips/dom-event-listeners.html

### implementer
- implementer immutable

### Freestone
#### Redux

#### General
- settings generaux, i.e. nom du site, url
- strategie de invalidate du data
- liste des records en cours de modif par le user dans un widget
- essayer de mettre un reselect different pour chaque instance de la meme classe au lieu de un par classe
- createddate && modifdate dans constantes des alias de champs

#### Menu
- n records

#### Header menu
#### Recherche
#### Liste
- field types images
- field types file
- paging

#### Form
- mtm
- record last modif
- types de input
	- file
	- tinymce
		- link styles css site
		- insert freestone image
		- insert freestone link
	- date
- champ type ajax? (voir field format form)
- champ type tag
- champs en/fr séparés
- liste des anciennes révisions du record
- save

#### Modules
#### Pages


### Semi-done

#### Liste
- self-join trees
- grouped records
- delete
- change order

#### Forms
- autocomplete