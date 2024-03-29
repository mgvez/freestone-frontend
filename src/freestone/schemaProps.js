
export const PRIKEY_ALIAS = 'prikey';
export const LASTMODIF_DATE_ALIAS = 'lastmodifdate';
export const CREATED_DATE_ALIAS = 'createddate';
export const LOADED_TIME_ALIAS = '__loaded_time';
export const DELETED_PSEUDOFIELD_ALIAS = '__deleted';
export const LABEL_PSEUDOFIELD_ALIAS = '__label';
export const EDITED_PSEUDOFIELD_ALIAS = '__isedited';
export const PREVIEW_EDITED_PSEUDOFIELD_ALIAS = '__ispreviewedited';
export const PREVIEWID_PSEUDOFIELD_ALIAS = '__previewid';
export const SLUG_PSEUDOFIELD_ALIAS = '__slug';
export const SUBSITE_FIELD = '___sub';
export const GUID_FIELD = '___guid';

export const TYPE_MAIN = 'main';

export const TYPE_MTM = 'mtm';
export const TYPE_OTO = 'oto';
export const TYPE_OTO_GUID = 'oto_guid';
export const TYPE_SUBFORM = 'subform';
export const TYPE_SUBFORM_GUID = 'subform_guid';
export const TYPE_PRIMARY = 'pri';
export const TYPE_MARKDOWN = 'md';
export const TYPE_ORDER = 'order';
export const TYPE_IMG = 'img';
export const TYPE_BANKIMG = 'bankimg';
export const TYPE_BANKFILE = 'bankfile';
export const TYPE_FILE = 'file';
export const TYPE_DATETIME = 'datetime';
export const TYPE_BOOL = 'bool';
export const TYPE_ISPUBLISHED = 'ispublished';
export const TYPE_PLACEHOLDER = 'placeholder';
export const TYPE_LANGUAGE = 'language';

export const TYPES_PARENT_LINK = [TYPE_SUBFORM, TYPE_OTO, TYPE_MTM, TYPE_SUBFORM_GUID, TYPE_OTO_GUID];


// if a field has this as its widget property, it must be displayed by the slugs widget
export const SLUG_WIDGET_NAME = 'META_SLUG';
export const TITLE_WIDGET_NAME = 'META_TITLE';
export const STRUCTURED_WIDGET_NAME = 'META_STRUCTURED';


export const SUBFORM_VIEW_TABBED = 'tabbed';
export const SUBFORM_VIEW_TABBED_VERTICAL = 'tabbed-vertical';
export const SUBFORM_VIEW_LIST = 'full list';
export const SUBFORM_VIEW_STACKED = 'stacked';

export const SUBFORM_PREVIEW_MODE_PREVIEWS = 'previews';
export const SUBFORM_PREVIEW_MODE_MIXED = 'mixed';
export const SUBFORM_PREVIEW_MODE_EDIT = 'edit';

export const BANK_IMG_NAME = 'img';
export const BANK_IMG_TABLE = 'zva_bank_img';
export const BANK_IMG_CATEGORIES_TABLE = 'zva_bank_img_categ';
export const BANK_IMG_DIM_ALIAS = '_dim';

export const BANK_DOCS_NAME = 'docs';
export const BANK_DOCS_TABLE = 'zva_bank_docs';
export const BANK_DOCS_CATEGORIES_TABLE = 'zva_bank_docs_categ';

export const BANK_CATEG_FOREIGN_FIELD = 'categ_id';

export const BANK_FILE_ALIAS = 'file';
export const BANK_OPTIMIZED_FILE_ALIAS = 'optimized_file';
export const BANK_FOLDER_ALIAS = 'folder';
export const BANK_TITLE_ALIAS = '_title_';
export const BANK_COMMENTS_ALIAS = 'file';
export const BANK_FILESIZE_ALIAS = '_kb';
export const BANK_PATH_ALIAS = 'file_path';
export const BANK_THUMB_ALIAS = 'thumb_path';
export const BANK_CATEG_ALIAS = 'categ_id_label';
export const BANK_NUSES_ALIAS = '_n_uses';
export const BANK_ISLOCKED_ALIAS = 'isLocked';

export const ROLE_N_USES = 'ROLE_N_USES';

//ID representing all records (for example in permissions)
export const ALL_RECORDS_ID = '-1';
export const EVERYBODY_GROUP_ID = 0;
export const GOD_USER_GROUP = 1;
