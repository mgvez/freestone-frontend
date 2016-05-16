import React, { Component } from 'react';

import { TextInput } from 'components/unconnected/Form/InputTypes/TextInput';
import { BoolInput } from 'components/unconnected/Form/InputTypes/BoolInput';
// import { SelectInput } from 'components/Form/InputTypes/SelectInput';
import { NoEditInput } from 'components/unconnected/Form/InputTypes/NoEditInput';
import { HtmlInput } from 'components/unconnected/Form/InputTypes/HtmlInput';
import { FileInput } from 'components/unconnected/Form/InputTypes/FileInput';
import { AutocompleteInput } from 'components/unconnected/Form/InputTypes/AutocompleteInput';
import { LanguageToggler } from 'components/unconnected/Form/LanguageToggler';


export class Field extends Component {
	static propTypes = {
		field: React.PropTypes.object,
		recordId: React.PropTypes.string,
		val: React.PropTypes.string,
		origVal: React.PropTypes.string,
		
		setFieldVal: React.PropTypes.func,
	};

	render() {

		// console.log(`render input ${this.props.field.name} ${this.props.field.language}`);
		let input;
		switch (this.props.field.type) {
		case 'date':
		case 'datetime':
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
		case 'foreign':
		case 'enum':
			// input = <SelectInput {...this.props} />;
			// break;
		case 'selfcascade':
		case 'cascade':
		case 'foreigntext':
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
		case 'pri':
		case 'ajax':
		case 'rel':
		case 'order':
		case 'mtm':
		default:
			//pas d'affichage
			break;
		}

		const languageToggler = !!this.props.field.language ? (
			<LanguageToggler />
		) : null;

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
			return <div/>;
		default:
			return (
				<div className="field">
					{languageToggler}
					<label>{this.props.field.label}</label>
					<div>{input}</div>
					<em>{this.props.field.descripton}</em>
				</div>
			);	
		}

		
	}
}
