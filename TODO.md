## General
- Banque : liste de thumbnails au lieu de records en table
- liste des anciennes révisions du record
- au logout, save le state entier du user à la db
- mettre un search general
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc., errors)

# Freestone PHP

# Freestone JS
- link vers home

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
- changement de langue & save : sticky
- link to document from bank
- champ type url
- Mettre focus sur TinyMCE quand on l'edit et pas juste dans ses sous components - Pic 2016-07-22.

## Pages
- all

# Pluss tard
- Drag & drop dans liste pour order
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


## implementer / refactor
[https://blog.risingstack.com/react-js-best-practices-for-2016/](https://blog.risingstack.com/react-js-best-practices-for-2016/)
- voir https://gist.github.com/Chrisui/49e76eb8b4ff887967e9
- reecrire les components en functional components https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#stateless-functional-components et https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.de5b5b1q8
- Respond to window size https://facebook.github.io/react/tips/dom-event-listeners.html



