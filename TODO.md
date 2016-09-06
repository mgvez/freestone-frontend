## General
- Banque : liste de thumbnails au lieu de records en table
- liste des anciennes révisions du record
- au logout, save le state entier du user à la db
- mettre un search general
- pouvoir mettre une langue différente pour le core (i.e. strings de l'admin, e.g. search, etc., errors)

# Freestone PHP
- ajouter un field "has_preview" à json de def de table, qui check si un template existe avec le nom de la table, pour eviter de mettre le link preview si non
- ajout 'noparse' dans template

# Images
- widget qui montre les uses précis des items de banque (tel item dans tel record)

# Freestone JS
- ~link vers home~ reste juste à détecter le active

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
- Couleurs highligthées dans les record list ( ex #ff0000 ou rgba(0,0,0,0.5) )
