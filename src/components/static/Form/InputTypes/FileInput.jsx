import React from 'react';

import { Input } from 'components/static/Form/InputTypes/Input';
import { SavedFileInput } from 'freestone/fileInputs';
import { FileThumbnail } from 'components/static/FileThumbnail/FileThumbnail';

export class FileInput extends Input {
	constructor(props) {
		super(props);
		this.state = {
			changing: false,
		};
	}

	changeFileVal = (e) => {
		const input = e.target;
		const savedInput = this.getSavedInput();
		savedInput.setInput(input, this.props.field.id, this.props.recordId);
		this.changeVal(savedInput.getId());
		this.setState({ changing: false });
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
		return saved;
	}
	
	requestChange = () => {
		this.setState({ changing: true });
	};

	cancelRequestChange = () => {
		this.setState({ changing: false });
	};

	getRenderInput() {
		const id = `${this.props.field.id}__${this.props.recordId}`;
		if (this.state.changing || (!this.props.val && !this.props.origVal)) {
			let cancel;
			if (!this.props.val) {
				cancel = <button onClick={this.cancelRequestChange}>cancel</button>;
			}
			return (
				<div>
					<input id={id} type="file" value="" onChange={this.changeFileVal} />
					{cancel}
				</div>
			);
		}

		return (
			<button onClick={this.requestChange}>change</button>
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
		//si la val originale est pas la meme que la val actuelle, on peut vouloir revenir à la val ogiginale
		if (origVal && val !== origVal) {
			revertBtn = <button onClick={this.clearSavedInput}>revert to db file</button>;
		}

		// s'il y a une val originale et pas d'input (i.e. pas de val user encore) on peut vouloir deleter simplement la val db
		if (origVal === val) {
			deleteBtn = <button onClick={this.setForDelete}>delete db file</button>;
		}

		const displayVal = val && (inputVal || origVal);

		return (
			<div>
				<FileThumbnail val={origVal === val && val} dir={this.props.field.folder} env={this.props.env} type={this.props.field.type} />
				o: {origVal} <br/>
				v: {val} <br/>
				i: {inputVal} <br/>
				d: {displayVal} <br/>
				{renderInput}
				{revertBtn}
				{deleteBtn}
			</div>
		);
	}
}
