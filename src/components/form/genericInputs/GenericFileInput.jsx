import React, { Component } from 'react';

import { SavedFileInput } from '../../../freestone/fileInputs';
import { FileThumbnail } from '../../fileThumbnail/FileThumbnail';
import { TYPE_IMG } from '../../../freestone/schemaProps';

export class GenericFileInput extends Component {

	static propTypes = {
		fieldId: React.PropTypes.number,
		val: React.PropTypes.string,
		origVal: React.PropTypes.string,
		type: React.PropTypes.string,
		folder: React.PropTypes.string,
		recordId: React.PropTypes.string,
		changeVal: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			localFile: null,
		};
	}

	getLocalImage(file) {
		if (!file || this.state.localFile || this.props.type !== TYPE_IMG) return undefined;

		const reader = new FileReader();

		reader.onload = (e) => {
			this.setState({
				localFile: e.target.result,
			});
		};

		reader.readAsDataURL(file);
	}

	getFileName() {
		return this.props.val;
	}

	getSavedInput() {
		// console.log('get input %s', this.props.val);
		const saved = new SavedFileInput(this.props.val);
		//si pas de input mais que la val est une ref à un input, c'est que le input existe pas... reset la val à original
		if (this.props.val && this.props.val !== this.props.origVal && !saved.getFilePath()) {
			this.props.changeVal(this.props.origVal);
		}
		if (saved.getFile()) {
			this.getLocalImage(saved.getFile());
		}
		return saved;
	}

	setForDelete = () => {
		this.getSavedInput().deleteInput();
		this.props.changeVal('');
	}

	changeFileVal = (e) => {
		const input = e.target;
		const savedInput = this.getSavedInput();
		savedInput.setInput(input, this.props.fieldId, this.props.recordId);
		// console.log('change val %s', savedInput.getId());
		this.setState({
			localFile: null,
		});
		this.props.changeVal(savedInput.getId());
	}

	clearSavedInput = () => {
		this.getSavedInput().deleteInput();
		this.props.changeVal(this.props.origVal);
	}

	triggerSelectFile = () => {
		if (this.fileinp) {
			this.fileinp.click();
			// console.log(this.fileinp);
		}
	}

	render() {
		const typeLabel = this.props.type === TYPE_IMG ? 'image' : 'file';
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.field);
		const { origVal, val } = this.props;
		const inMemory = this.getSavedInput().getFilePath();
		//vérifie si on a une val qui provient du local storage mais pour laquelle on n'aurait pu l'input (par ex si reloaded)
		const inputVal = inMemory && inMemory.split(/(\\|\/)/g).pop();
		// console.log(val);
		let revertBtn;
		let deleteBtn;
		//si la val originale est pas la meme que la val actuelle, on peut vouloir revenir à la val originale
		if (origVal && val !== origVal) {
			revertBtn = <button className="button-round-bordered-warning" onClick={this.clearSavedInput}>Revert to db {typeLabel}</button>;
		}

		// s'il y a une val originale et pas d'input (i.e. pas de val user encore) on peut vouloir deleter simplement la val db
		if (val && origVal === val) {
			deleteBtn = <button className="button-round-bordered-danger" onClick={this.setForDelete}><i className="fa fa-times"></i>Delete {typeLabel}</button>;
		}

		const displayVal = this.props.type === TYPE_IMG ? val && (inputVal || origVal) : null;

		const thumbnail = <FileThumbnail val={origVal === val ? val : null} localVal={this.state.localFile} dir={this.props.folder} type={this.props.type} />;
		const id = `${this.props.fieldId}__${this.props.recordId}`;

		let fileInfos;
		if (val) {
			fileInfos = (<div className="file-infos">
				{thumbnail}
				{displayVal}
			</div>);
		}
		return (
			<div className="file-input-generic">
				{fileInfos}
				<div className="file-input-section">
					<div className="file-input-input">
						<input id={id} type="file" value="" className="file-control form-control" onChange={this.changeFileVal} ref={el => this.fileinp = el} />
						<button className="button-round-action-bordered" onClick={this.triggerSelectFile}><i className="fa fa-pencil"></i>Select file on your computer</button>
					</div>
					{revertBtn}
					{deleteBtn}
				</div>
			</div>
		);
	}
}
