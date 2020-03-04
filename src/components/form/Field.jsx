import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

import { StyledField, FieldLabel, FieldDescription } from '../../styles/Input';
import { GridItem } from '../../styles/Grid';

export default class Field extends Component {
	static propTypes = {
		field: PropTypes.object,
		recordId: PropTypes.string,
		val: PropTypes.any,
		origVal: PropTypes.any,
		lang: PropTypes.string,
		//isRoot can be true if table has property forceAsRoot that make it "main table" even if it is also subforms. 
		isRoot: PropTypes.bool,
		isAside: PropTypes.bool,
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
		const key = `${this.props.field.id}_${this.props.recordId}`;
		// console.log(`render input ${this.props.field.name} ${this.props.field.language}`);
		let input;
		if (this.props.field.isUneditable) {
			input = <NoEditInput key={key} {...this.props} />;
		} else {
			switch (this.props.field.type) {
			case 'int':
			case 'float':
			case 'text':
			case 'char':
			case 'note':
			case 'password':
				input = <TextInput key={key} val={this.props.val} size={this.props.field.size} changeVal={this.changeVal} />;
				break;
			case 'md':
				input = <MarkdownInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'html':
				input = <HtmlInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'url':
				input = <UrlInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'tags':
				input = <TextInput key={key} val={this.props.val} size={200} changeVal={this.changeVal} />;
				break;
			case 'date':
			case 'datetime':
				input = <DateInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'enum':
			case 'foreign':
			case 'selfjoin':
			case 'foreigntext':
			case 'language':
				// input = <SelectInput {...this.props} />;
				// break;
				if (this.props.field.foreign) {
					switch (this.props.field.foreign.foreignType) {
					case 'subform':
					case 'rel':
					case 'oto':
						//update 2020-01-17: don't show subform fields when record is shown as root (records are orphans)
						// if (this.props.isRoot) {
						// 	input = <AutocompleteInput key={key} {...this.props} changeVal={this.changeVal} />;
						// }
						break;
					case 'mtm':
						break;
					default:
						input = <AutocompleteInput key={key} {...this.props} changeVal={this.changeVal} />;
					}
				} else {
					input = <AutocompleteInput key={key} {...this.props} changeVal={this.changeVal} />;
				}
				break;
			case 'img':
			case 'file':
				// console.log(this.props);
				input = <FileInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'hotspot':
				input = <HotspotInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'bool':
			case 'ispublished':
				input = <BoolInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'permissions':
				input = <TextInput key={key} val={this.props.val} size={100} changeVal={this.changeVal} />;
				break;
			case 'noedit'://on la voit mais on l'edit pas!
				input = <NoEditInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'bankimg'://link vers image de la banque
				input = <BankImgInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			case 'bankfile'://link vers image de la banque
				input = <BankFileInput key={key} {...this.props} changeVal={this.changeVal} />;
				break;
			
			case 'pri':
			case 'ajax':
			case 'order':
			default:
				//pas d'affichage
				break;
			}
		}
		if (input) {
			return (<GridItem key={key} columns={this.props.isAside ? 12 : this.props.field.columns}>
				<StyledField displaySize={this.props.field.displaySize}>
					<FieldLabel>
						<label title={this.props.field.alias}>
							{this.props.field.label}
							{this.props.lang && <em>(<span>{this.props.lang}</span>)</em>}
						</label>
					</FieldLabel>
					{input}
					{this.props.field.description && <FieldDescription dangerouslySetInnerHTML={{ __html: this.props.field.description }} />}
					{this.props.field.descriptionAppend && <FieldDescription dangerouslySetInnerHTML={{ __html: this.props.field.descriptionAppend }} />}
				</StyledField>
			</GridItem>);
		}

		return null;

	}
}
