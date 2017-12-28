## General
- Banque : liste de thumbnails au lieu de records en table
- liste des anciennes révisions du record
- mettre styles ds components, pas dans scss

# Freestone PHP

# Images

# Freestone JS
- ~link vers home~ reste juste à détecter le active

## Dashboard
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
- champ type url

# Pluss tard
- au logout, save le state entier du user à la db
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc., errors)
- mettre un search general
- Drag & drop dans liste pour order
- insert image de banque : drag & drop
- faire une liste de type "file manager" ou on a des gros thumbnails au lieu d'une liste en table
- shop admin en react/redux
- champ type ajax? (voir field format form)
- champ type tag
- meilleure strategie de modif du state quand save records (pas vider menu au complet par ex.) 
- à l'update: sitemap
	private static function manageSiteMap($tableId, $recId, $isDeleted) {
		$table = new Table($tableId);
		if($isDeleted) {
			return SiteMap::delete($table->getName(), $recId);
		}
		return SiteMap::update($table->getName(), $recId);
	}
- Couleurs highligthées dans les record list ( ex #ff0000 ou rgba(0,0,0,0.5) )

