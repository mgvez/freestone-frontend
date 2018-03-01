import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from './inputTypes/TextInput';
import BoolInput from './inputTypes/BoolInput';
import FileInput from './inputTypes/FileInput';
import DateInput from './inputTypes/DateInput';
import BankImgInput from './inputTypes/BankImgInput';
import BankFileInput from './inputTypes/BankFileInput';
import UrlInput from './inputTypes/UrlInput';

import HotspotInput from '../../containers/form/inputTypes/HotspotInput';
import NoEditInput from '../../containers/form/inputTypes/NoEditInput';
import HtmlInput from '../../containers/form/inputTypes/HtmlInput';
import AutocompleteInput from '../../containers/form/inputTypes/AutocompleteInput';

export default class Field extends Component {
	static propTypes = {
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
		origVal: PropTypes.any,
		lang: PropTypes.string,
		//isRoot can be true if table has property forceAsRoot that make it "main table" even if it is also subforms. 
		isRoot: PropTypes.bool,
		absolutePath: PropTypes.string,
		setFieldVal: PropTypes.func,
	};

	changeVal = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		// console.log(v);
		this.props.setFieldVal(this.props.field.table_id, this.props.recordId, this.props.field.id, v);
	};

	render() {
		if (this.props.field.type === 'separator') {
			return <h2>{this.props.field.label}</h2>;
		}
		//do we hide the input, as per its definition
		if (this.props.field.isHidden) {
			return null;
		}
		// console.log(`render input ${this.props.field.name} ${this.props.field.language}`);
		let input;
		if (this.props.field.isUneditable) {
			input = <NoEditInput {...this.props} />;
		} else {
			switch (this.props.field.type) {
			case 'int':
			case 'float':
			case 'text':
			case 'char':
			case 'note':
			case 'password':
			case 'md':
				input = <TextInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'html':
				input = <HtmlInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'url':
				input = <UrlInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'tags':
				input = <TextInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'date':
			case 'datetime':
				input = <DateInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'enum':
			case 'foreign':
			case 'selfjoin':
			case 'foreigntext':
			case 'language':
				// input = <SelectInput {...this.props} />;
				// break;
				input = <AutocompleteInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'img':
			case 'file':
				// console.log(this.props);
				input = <FileInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'hotspot':
				input = <HotspotInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'bool':
			case 'ispublished':
				input = <BoolInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'permissions':
				input = <TextInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'noedit'://on la voit mais on l'edit pas!
				input = <NoEditInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'bankimg'://link vers image de la banque
				input = <BankImgInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'bankfile'://link vers image de la banque
				input = <BankFileInput {...this.props} changeVal={this.changeVal} />;
				break;
			case 'subform':
			case 'rel':
			case 'oto':
				if (this.props.isRoot) {
					input = <AutocompleteInput {...this.props} changeVal={this.changeVal} />;
				}
				break;
			case 'pri':
			case 'ajax':
			case 'order':
			case 'mtm':
			default:
				//pas d'affichage
				break;
			}
		}

		if (input) {
			const languageAppend = this.props.lang ? <em className="lang-append">(<span>{this.props.lang}</span>)</em> : '';
			const classes = ['col-md-' + (this.props.field.columns || 12)];
			
			classes.push(`field-${this.props.field.displaySize}`);

			return (
				<div className={`field ${classes.join(' ')}`}>
					<div className="field-label">
						<label title={this.props.field.alias}>{this.props.field.label} {languageAppend}</label>
					</div>
					<em className="field-description" dangerouslySetInnerHTML={{ __html: this.props.field.description }}></em>
					<em className="field-description" dangerouslySetInnerHTML={{ __html: this.props.field.descriptionAppend }}></em>
					{input}
				</div>
			);
		}

		return null;

	}
}
