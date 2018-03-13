import { VALID_ELEMENTS } from './validElements';

export const TINYMCE_CONFIG = {
	theme: 'modern',
	menubar: false,
	statusbar: true,
	resize: true,
	forced_root_block: 'p',
	height: 200,
	toolbar1: 'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect',
	toolbar2: 'bullist numlist | outdent indent | hr removeformat | subscript superscript | freestoneImageFromBank freestoneDocFromBank freestoneLink | code',
	plugins: [
		'link',
		'hr',
		'paste',
		'code',
		'freestone',
		'tabfocus',
		'paste',
		'visualchars',
		'autolink',
	],
	style_formats: [
		{
			title: 'Small',
			inline: 'small',
		},
		{
			title: 'Article',
			block: 'article',
		},
		{
			title: 'Section',
			block: 'section',
		},
		{
			title: 'Aside',
			block: 'aside',
		},
	],
	paste_as_text: false,
	paste_merge_formats: true,
	theme_modern_toolbar_location: 'top',
	theme_modern_toolbar_align: 'left',
	block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre',
	extended_valid_elements: 'img[src|alt=|title|class|id|style|height|width|srcset|sizes]',
	valid_elements: VALID_ELEMENTS,
	force_br_newlines: false,
	force_p_newlines: true,
};
