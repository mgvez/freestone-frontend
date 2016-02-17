import React from 'react';

import { Input } from 'components/Form/InputTypes/Input';
import { SavedFileInput } from 'freestone/FileInputs';

export class FileInput extends Input {
	constructor(props) {
		super(props);
		this.state = {
			changing: false,
		};
	}

	changeFileVal = (e) => {
		const input = e.target;
		this.getSavedInput().setInput(input);
		this.changeVal(input.value);
		this.setState({ changing: false });

	};

	getSavedInput() {
		return new SavedFileInput(this.props.field.id, this.props.recordId);
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
		this.cancelRequestChange();
		this.getSavedInput().deleteInput();
		this.changeVal(this.props.origVal);
	};

	setForDelete = () => {
		this.cancelRequestChange();
		this.getSavedInput().deleteInput();
		this.changeVal('');
	};

	render() {
		// console.log(`render input ${this.props.field.name}`);
		let val = this.props.val && this.props.val.split(/(\\|\/)/g).pop();
		const { origVal } = this.props;
		const inMemory = this.getSavedInput().getInput();
		//vérifie si on a une val qui provient du local storage mais pour laquelle on n'aurait pu l'input (par ex si reloaded)
		if (val !== '' && val !== origVal && !inMemory) {
			val = origVal;
		}

		const inp = this.getRenderInput();

		let revertBtn;
		if ((inMemory && origVal) || (origVal && val === '')) {
			revertBtn = <button onClick={this.clearSavedInput}>revert to db file</button>;
		}

		let deleteBtn;
		if (!inMemory && origVal && val !== '') {
			deleteBtn = <button onClick={this.setForDelete}>delete db file</button>;
		}

		return (
			<div>
				{origVal} => {val}
				{inp}
				{revertBtn}
				{deleteBtn}
			</div>
		);
	}
}
