import React, { Component } from 'react';

import { TextInput } from './inputTypes/TextInput';
import { BoolInput } from './inputTypes/BoolInput';
// import { SelectInput } from 'components/Form/InputTypes/SelectInput';
import { NoEditInput } from './inputTypes/NoEditInput';
import { HtmlInput } from './inputTypes/HtmlInput';
import { FileInput } from './inputTypes/FileInput';
import { DateInput } from './inputTypes/DateInput';
import { BankImgInput } from './inputTypes/BankImgInput';
import { BankFileInput } from './inputTypes/BankFileInput';
import { UrlInput } from './inputTypes/UrlInput';
import { HotspotInput } from './inputTypes/HotspotInput';
import { AutocompleteInput } from './inputTypes/AutocompleteInput';

export class Field extends Component {
	static propTypes = {
		field: React.PropTypes.object,
		recordId: React.PropTypes.string,
		val: React.PropTypes.any,
		origVal: React.PropTypes.any,
		lang: React.PropTypes.string,
		//isRoot can be true if table has property forceAsRoot that make it "main table" even if it is also subforms. 
		isRoot: React.PropTypes.bool,
		absolutePath: React.PropTypes.string,
		setFieldVal: React.PropTypes.func,
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
				input = <TextInput {...this.props} />;
				break;
			case 'html':
				input = <HtmlInput {...this.props} />;
				break;
			case 'url':
				input = <UrlInput {...this.props} />;
				break;
			case 'tags':
				input = <TextInput {...this.props} />;
				break;
			case 'date':
			case 'datetime':
				input = <DateInput {...this.props} />;
				break;
			case 'enum':
			case 'foreign':
			case 'selfjoin':
			case 'foreigntext':
			case 'language':
				// input = <SelectInput {...this.props} />;
				// break;
				input = <AutocompleteInput {...this.props} />;
				break;
			case 'img':
			case 'file':
				// console.log(this.props);
				input = <FileInput {...this.props} />;
				break;
			case 'hotspot':
				input = <HotspotInput {...this.props} />;
				break;
			case 'bool':
			case 'ispublished':
				input = <BoolInput {...this.props} />;
				break;
			case 'permissions':
				input = <TextInput {...this.props} />;
				break;
			case 'noedit'://on la voit mais on l'edit pas!
				input = <NoEditInput {...this.props} />;
				break;
			case 'bankimg'://link vers image de la banque
				input = <BankImgInput {...this.props} />;
				break;
			case 'bankfile'://link vers image de la banque
				input = <BankFileInput {...this.props} />;
				break;
			case 'subform':
			case 'rel':
			case 'oto':
				if (this.props.isRoot) {
					input = <AutocompleteInput {...this.props} />;
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
			return (
				<div className="field row">
					<div className="col-md-12">
						<div className="field-label">
							<label>{this.props.field.label} {languageAppend}</label>
						</div>
						<em className="field-description" dangerouslySetInnerHTML={{ __html: this.props.field.description }}></em>
						<em className="field-description" dangerouslySetInnerHTML={{ __html: this.props.field.descriptionAppend }}></em>
						{input}
					</div>
				</div>
			);
		}

		return null;

	}
}
