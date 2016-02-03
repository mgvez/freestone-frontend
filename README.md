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

### Autocomplete

### Respond to window size
https://facebook.github.io/react/tips/dom-event-listeners.html

### implementer
- implementer immutable

### Freestone
#### Redux
- Les children table sont un array pour chaque table. Ramener ca flat dans le reducer.

#### General
- settings generaux, i.e. nom du site, url

#### Menu
- n records

#### Header menu
#### Recherche
#### Liste
- field types images
- field types file
- self joins
- grouped records
- paging
- self-join trees
- link vers adresse du site pour chaque record

#### Form
- children
- record last modif

#### Modules
#### Pages
