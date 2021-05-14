import React from 'react';
import PropTypes from 'prop-types';
import { TYPE_SUBFORM, TYPE_SUBFORM_GUID, TYPE_OTO, TYPE_OTO_GUID, TYPE_MTM, SLUG_WIDGET_NAME } from '../../freestone/schemaProps';

import TextInput from './inputTypes/TextInput';
import BoolInput from './inputTypes/BoolInput';
import FileInput from './inputTypes/FileInput';
import DateInput from './inputTypes/DateInput';
import UrlInput from './inputTypes/UrlInput';

import BankImgInput from '../../containers/form/inputTypes/BankImgInput';
import MarkdownInput from '../../containers/form/inputTypes/MarkdownInput';
import BankFileInput from '../../containers/form/inputTypes/BankFileInput';
import HotspotInput from '../../containers/form/inputTypes/HotspotInput';
import NoEditInput from '../../containers/form/inputTypes/NoEditInput';
import HtmlInput from '../../containers/form/inputTypes/HtmlInput';
import AutocompleteInput from '../../containers/form/inputTypes/AutocompleteInput';

import RecordSlug from '../../containers/form/widgets/RecordSlug';

import { StyledField, FieldLabel, FieldDescription } from '../../styles/Input';
import { GridItem } from '../../styles/Grid';

export default function Field(props) {

	const changeVal = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		// console.log(v);
		props.setFieldVal(props.field.table_id, props.recordId, props.field.id, v);
	};

	if (props.field.type === 'separator') {
		return <h2>{props.field.label}</h2>;
	}
	//do we hide the input, as per its definition
	if (props.field.isHidden) {
		return null;
	}
	const key = `${props.field.id}_${props.recordId}`;
	// console.log(`render input ${props.field.name} ${props.field.language}`);
	let input;
	let widget;
	if (props.field.isUneditable) {
		if (props.field.type === 'bool') {
			input = <BoolInput key={key} fieldId={props.field.id} {...props} changeVal={changeVal} readonly />;
		} else {
			input = <NoEditInput key={key} {...props} />;
		}
	} else if (props.field.widget) {
		if (props.field.widget === SLUG_WIDGET_NAME) {
			console.log('SLUG WIDGET');
			// Slugs widget is in the META table, so the slug really is for the meta record's parent record
			widget = (
				<RecordSlug 
					tableId={props.parentTableId} 
					recordId={props.parentRecordId} 
				/>
			);
		}
	} else {
		switch (props.field.type) {
		case 'int':
		case 'float':
		case 'text':
		case 'char':
		case 'note':
		case 'password':
			input = <TextInput key={key} val={props.val} size={props.field.size} changeVal={changeVal} />;
			break;
		case 'md':
			input = <MarkdownInput key={key} {...props} changeVal={changeVal} />;
			break;
		case 'html':
		case 'tinyhtml':
			input = <HtmlInput key={key} {...props} changeVal={changeVal} />;
			break;
		case 'url':
			input = <UrlInput key={key} {...props} changeVal={changeVal} />;
			break;
		case 'tags':
			input = <TextInput key={key} val={props.val} size={200} changeVal={changeVal} />;
			break;
		case 'date':
		case 'datetime':
			input = <DateInput key={key} {...props} changeVal={changeVal} />;
			break;
		case 'enum':
		case 'foreign':
		case 'selfjoin':
		case 'foreigntext':
		case 'language':
			// input = <SelectInput {...props} />;
			// break;
			if (props.field.foreign) {
				switch (props.field.foreign.foreignType) {
				case TYPE_SUBFORM:
				case TYPE_SUBFORM_GUID:
				case TYPE_OTO:
				case TYPE_OTO_GUID:
				case 'rel':
					//update 2020-01-17: don't show subform fields when record is shown as root (records are orphans)
					// if (props.isRoot) {
					// 	input = <AutocompleteInput key={key} {...props} changeVal={changeVal} />;
					// }
					break;
				case TYPE_MTM:
					break;
				default:
					input = <AutocompleteInput key={key} {...props} changeVal={changeVal} />;
				}
			} else {
				input = <AutocompleteInput key={key} {...props} changeVal={changeVal} />;
			}
			break;
		case 'img':
		case 'file':
			// console.log(props);
			input = <FileInput key={key} {...props} changeVal={changeVal} />;
			break;
		case 'hotspot':
			input = <HotspotInput key={key} {...props} changeVal={changeVal} />;
			break;
		case 'bool':
		case 'ispublished':
			input = <BoolInput key={key} fieldId={props.field.id} {...props} changeVal={changeVal} />;
			break;
		case 'permissions':
			input = <TextInput key={key} val={props.val} size={100} changeVal={changeVal} />;
			break;
		case 'noedit'://on la voit mais on l'edit pas!
			input = <NoEditInput key={key} {...props} changeVal={changeVal} />;
			break;
		case 'bankimg'://link vers image de la banque
			input = <BankImgInput key={key} {...props} changeVal={changeVal} />;
			break;
		case 'bankfile'://link vers image de la banque
			input = <BankFileInput key={key} {...props} changeVal={changeVal} />;
			break;
		
		case 'pri':
		case 'ajax':
		case 'order':
		default:
			//pas d'affichage
			break;
		}
	}
	if (input || widget) {
		return (<GridItem key={key} columns={props.isAside ? 12 : props.field.columns}>
			<StyledField displaySize={props.field.displaySize}>
				{!widget && (
					<React.Fragment>
						<FieldLabel>
							<label title={props.field.alias}>
								{props.field.label}
								{props.lang && <em>(<span>{props.lang}</span>)</em>}
							</label>
						</FieldLabel>
						{input}
						{props.field.description && <FieldDescription dangerouslySetInnerHTML={{ __html: props.field.description }} />}
						{props.field.descriptionAppend && <FieldDescription dangerouslySetInnerHTML={{ __html: props.field.descriptionAppend }} />}
					</React.Fragment>
				)}
				{widget}
			</StyledField>
		</GridItem>);
	}

	return null;


}

Field.propTypes = {
	field: PropTypes.object,
	recordId: PropTypes.string,
	parentRecordId: PropTypes.string,
	parentTableId: PropTypes.number,
	val: PropTypes.any,
	origVal: PropTypes.any,
	lang: PropTypes.string,
	//isRoot can be true if table has property forceAsRoot that make it "main table" even if it is also subforms. 
	isRoot: PropTypes.bool,
	isAside: PropTypes.bool,
	absolutePath: PropTypes.string,
	setFieldVal: PropTypes.func,
};
