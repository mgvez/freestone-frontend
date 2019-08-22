import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SavedFileInput } from '../../../freestone/fileInputs';
import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import { TYPE_IMG } from '../../../freestone/schemaProps';
import { Button } from '../../../styles/Button';
import { THUMBNAIL_SIZE } from '../../../freestone/settings';
import { Icon } from '../../../styles/Icon';


const Container = styled.div`
	display: inline-block;
	vertical-align: middle;
	margin-left: 10px;
`;

const FileInfos = styled.div`
	font-style: italic;
	display: block;
	margin-right: 10px;
	max-width: ${THUMBNAIL_SIZE}px;

	a {
		display: block;
		margin-bottom: 5px;
	}
`;

const FileInputContainer = styled.div`
	display: inline-block;
	vertical-align: bottom;

	input {
		display:none;
	}

	button {
		margin-right: 10px
	}
`;

export default class GenericFileInput extends Component {

	static propTypes = {
		fieldId: PropTypes.number,
		val: PropTypes.string,
		origVal: PropTypes.string,
		type: PropTypes.string,
		folder: PropTypes.string,
		recordId: PropTypes.string,
		changeVal: PropTypes.func,
		absolutePath: PropTypes.string,
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
			revertBtn = <Button round="true" bordered="true" warn="true" onClick={this.clearSavedInput}>Revert to db {typeLabel}</Button>;
		}

		// s'il y a une val originale et pas d'input (i.e. pas de val user encore) on peut vouloir deleter simplement la val db
		if (val && origVal === val) {
			deleteBtn = <Button round="true" bordered="true" danger="true" onClick={this.setForDelete}><Icon icon="times" />Delete {typeLabel}</Button>;
		}

		const displayVal = this.props.type === TYPE_IMG ? val && (inputVal || origVal) : null;

		const thumbnail = (<FileThumbnail
			val={origVal === val ? val : null}
			absolutePath={this.props.absolutePath}
			localVal={this.state.localFile}
			dir={this.props.folder}
			type={this.props.type}
		/>);
		const id = `${this.props.fieldId}__${this.props.recordId}`;

		return (
			<Container>
				{val && (<FileInfos>
					{thumbnail}
					{displayVal}
				</FileInfos>)}

				<FileInputContainer>
					<input id={id} type="file" value="" onChange={this.changeFileVal} ref={el => this.fileinp = el} />
					<Button round="true" bordered="true" info="true" onClick={this.triggerSelectFile}><Icon icon="upload" />{val ? 'Change file' : 'Upload file'}</Button>
				</FileInputContainer>
				{revertBtn}
				{deleteBtn}

			</Container>
		);
	}
}
