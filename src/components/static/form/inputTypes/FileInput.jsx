import React from 'react';

import { Input } from 'components/static/form/inputTypes/Input';
import { SavedFileInput } from 'freestone/fileInputs';
import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';
import { TYPE_IMG } from 'freestone/schemaProps';

export class FileInput extends Input {
	constructor(props) {
		super(props);
		this.state = {
			changing: false,
			localFile: null,
		};
	}

	changeFileVal = (e) => {
		const input = e.target;
		const savedInput = this.getSavedInput();
		savedInput.setInput(input, this.props.field.id, this.props.recordId);
		this.changeVal(savedInput.getId());
		this.setState({
			changing: false,
			localFile: null,
		});
	};

	getFileName() {
		return this.props.val;
	}

	getSavedInput() {
		const saved = new SavedFileInput(this.props.val);
		//si pas de input mais que la val est une ref à un input, c'est que le input existe pas... reset la val à original
		if (this.props.val && this.props.val !== this.props.origVal && !saved.getInput()) {
			this.changeVal(this.props.origVal);
		}
		if (saved.getInput()) {
			this.getLocalImage(saved.getInput());
		}
		return saved;
	}
	
	requestChange = () => {
		this.setState({
			changing: true,
			localFile: null,
		});
	};

	cancelRequestChange = () => {
		this.setState({
			changing: false,
			localFile: null,
		});
	};

	getRenderInput() {
		const id = `${this.props.field.id}__${this.props.recordId}`;
		if (this.state.changing || (!this.props.val && !this.props.origVal)) {
			let cancel;
			if (!this.props.val) {
				cancel = <button className="button-round-action-bordered" onClick={this.cancelRequestChange}>Modifier</button>;
			}
			return (
				<div className="file-input-input">
					<input id={id} type="file" value="" className="form-control" onChange={this.changeFileVal} ref={el => this.fileinp = el} />
					{cancel}
				</div>
			);
		}

		return (
			<button className="button-round-action-bordered" onClick={this.requestChange}>Modifier</button>
		);	
	}

	clearSavedInput = () => {
		this.getSavedInput().deleteInput();
		this.cancelRequestChange();
		this.changeVal(this.props.origVal);
	};

	setForDelete = () => {
		this.getSavedInput().deleteInput();
		this.cancelRequestChange();
		this.changeVal('');
	};

	getLocalImage(inp) {
		if (!inp || this.state.localFile || this.props.field.type !== TYPE_IMG) return undefined;

		const reader = new FileReader();

		reader.onload = (e) => {
			this.setState({
				localFile: e.target.result,
			});
		};

		reader.readAsDataURL(inp.files[0]);
	}

	render() {
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.field);
		const { origVal, val } = this.props;
		const inMemory = this.getSavedInput().getInput();
		//vérifie si on a une val qui provient du local storage mais pour laquelle on n'aurait pu l'input (par ex si reloaded)
		const inputVal = inMemory && inMemory.value.split(/(\\|\/)/g).pop();

		const renderInput = this.getRenderInput();

		let revertBtn;
		let deleteBtn;
		//si la val originale est pas la meme que la val actuelle, on peut vouloir revenir à la val originale
		if (origVal && val !== origVal) {
			revertBtn = <button className="button-round-bordered-warning" onClick={this.clearSavedInput}>revert to db file</button>;
		}

		// s'il y a une val originale et pas d'input (i.e. pas de val user encore) on peut vouloir deleter simplement la val db
		if (origVal === val) {
			deleteBtn = <button className="button-round-bordered-danger" onClick={this.setForDelete}>Effacer</button>;
		}

		const displayVal = val && (inputVal || origVal);

		const thumbnail = <FileThumbnail val={origVal === val ? val : null} localVal={this.state.localFile} dir={this.props.field.folder} type={this.props.field.type} />;

		return (
			<div>
				<div className="file-infos">
					{thumbnail}
					{displayVal}
				</div>
				<div className="file-input-section">
					{renderInput}
					{revertBtn}
					{deleteBtn}
				</div>
			</div>
		);
	}
}
