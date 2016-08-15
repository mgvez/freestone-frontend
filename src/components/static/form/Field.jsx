import React, { Component } from 'react';

import { TextInput } from 'components/static/form/inputTypes/TextInput';
import { BoolInput } from 'components/static/form/inputTypes/BoolInput';
// import { SelectInput } from 'components/Form/InputTypes/SelectInput';
import { NoEditInput } from 'components/static/form/inputTypes/NoEditInput';
import { HtmlInput } from 'components/static/form/inputTypes/HtmlInput';
import { FileInput } from 'components/static/form/inputTypes/FileInput';
import { DateInput } from 'components/static/form/inputTypes/DateInput';
import { BankImgInput } from 'components/static/form/inputTypes/BankImgInput';
import { AutocompleteInput } from 'components/connected/form/inputTypes/AutocompleteInput';

export class Field extends Component {
	static propTypes = {
		field: React.PropTypes.object,
		recordId: React.PropTypes.string,
		val: React.PropTypes.any,
		origVal: React.PropTypes.any,
		lang: React.PropTypes.string,

		setFieldVal: React.PropTypes.func,
	};

	render() {

		// console.log(`render input ${this.props.field.name} ${this.props.field.language}`);
		let input;
		switch (this.props.field.type) {
		case 'int':
		case 'float':
		case 'text':
		case 'char':
		case 'note':
		case 'url':
		case 'password':
			input = <TextInput {...this.props} />;
			break;
		case 'html':
			input = <HtmlInput {...this.props} />;
			break;
		case 'internal_url':
			input = <TextInput {...this.props} />;
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
		case 'selfcascade':
		case 'cascade':
		case 'foreigntext':
			// input = <SelectInput {...this.props} />;
			// break;
			input = <AutocompleteInput {...this.props} />;
			break;
		case 'img':
		case 'file':
			input = <FileInput {...this.props} />;
			break;
		case 'bool':
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
		case 'pri':
		case 'ajax':
		case 'rel':
		case 'subform':
		case 'order':
		case 'mtm':
		default:
			//pas d'affichage
			break;
		}

		const languageAppend = this.props.lang ? <em className="lang-append">(<span>{this.props.lang}</span>)</em> : '';

		switch (this.props.field.type) {
		case 'separator':
			return <h2>{this.props.field.label}</h2>;
		case 'pri':
		case 'rel':
		case 'mtm':
		case 'oto':
		case 'order':
		case 'subform':
		case 'nodisplay':
			return null;
		default:
			return (
				<div className="field row">
					<div className="col-md-4 field-label">
						<label>{this.props.field.label} {languageAppend}</label>
					</div>
					<div className="col-md-8">
						{input}
						<em className="field-description" dangerouslySetInnerHTML={{ __html: this.props.field.description }}></em>
					</div>
				</div>
			);
		}


	}
}
