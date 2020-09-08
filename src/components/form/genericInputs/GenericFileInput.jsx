import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';
import 'react-image-crop/lib/ReactCrop.scss';

import { SavedFileInput } from '../../../freestone/fileInputs';
import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import Cropper from '../../images/Cropper';
import { TYPE_FILE, TYPE_IMG } from '../../../freestone/schemaProps';
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
			isCropping: false,
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

	setIsCropping = isCropping => {

		this.setState({
			isCropping,
		});
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

	setCrop = (newCrop) => {
		this.getSavedInput().setCropSettings(newCrop);
	}

	render() {
		const typeLabel = this.props.type === TYPE_IMG ? 'image' : 'file';
		// console.log(`render input ${this.props.field.name}`);
		// console.log(this.props.field);
		const { origVal, val } = this.props;

		// Vérifie si on a une val qui provient du local storage mais pour laquelle on n'aurait pu l'input (par ex si reloaded)
		const inMemory = this.getSavedInput().getFilePath();
		const fileName = inMemory && inMemory.split(/(\\|\/)/g).pop();

		// Si la val originale est pas la meme que la val actuelle, on peut vouloir revenir à la val originale
		let revertBtn;
		if (origVal && val !== origVal) {
			revertBtn = <Button round="true" bordered="true" warn="true" onClick={this.clearSavedInput}>Revert to db {typeLabel}</Button>;
		}

		// S'il y a une val originale et pas d'input (i.e. pas de val user encore) on peut vouloir deleter simplement la val db
		let deleteBtn;
		if (val && origVal === val) {
			deleteBtn = <Button round="true" bordered="true" danger="true" onClick={this.setForDelete}><Icon icon="times" />Delete {typeLabel}</Button>;
		}

		let displayVal;
		let cropBtn;
		// TYPE_FILE shows the extension and file name.
		if (this.props.type === TYPE_FILE) {
			// Add : Show nothing at first, then show val.
			// 		before : val and origVal are null
			//  	after : val is set and origVal is null
			// Edit : Show origVal at first, then show val.
			// 		before : val is set and origVal is the same
			// 		afterChange : val is set and origVal is set but is different
			//		afterDelete : val is null and origVal is set
			displayVal = val !== origVal ? (val ? fileName : null) : origVal;
		}
		// TYPE_IMG shows the picture.
		if (this.props.type === TYPE_IMG) {
			// If displayBal is null, FileThumbnail will display the uploaded file as an image or nothing if no file was
			// uploaded.
			// Add : Show nothing at first, then show the uploaded.
			// Edit : Show the original at first, then show the uploaded.
			// Delete : Shows nothing.
			// console.log(this.props);
			displayVal = val !== origVal ? null : origVal;

			// display option to crop file, if to be uploaded
			if (this.state.localFile) {
				cropBtn = <Button round bordered cta faded onClick={() => this.setIsCropping(true)}><Icon icon="crop" />Crop</Button>;
			}
		}

		let cropper = null;
		const currentCrop = this.getSavedInput().getCropSettings();
		if (this.state.isCropping) {
			cropper = (
				<Cropper
					src={this.state.localFile}
					setIsCropping={this.setIsCropping}
					setCrop={this.setCrop}
					crop={currentCrop}
				/>
			);
			// cropper = (
			// 	<div>
			// 		<ReactCrop src={this.state.localFile} crop={currentCrop} onChange={this.setCrop} />
			// 		<Button round bordered cta onClick={() => this.setIsCropping(false)}><Icon icon="crop" />OK</Button>
			// 		<Button round bordered danger onClick={() => this.setIsCropping(false, true)}><Icon icon="times" />Cancel</Button>
			// 	</div>
			// );
		}

		const thumbnail = (<FileThumbnail
			val={displayVal}
			absolutePath={this.props.absolutePath}
			localVal={this.state.localFile}
			dir={this.props.folder}
			type={this.props.type}
			crop={currentCrop}
		/>);
		const id = `${this.props.fieldId}__${this.props.recordId}`;

		return (
			<Container>
				{cropper}
				<FileInfos>
					{thumbnail}
					{(this.props.type === TYPE_FILE ? displayVal : null)}
				</FileInfos>

				<FileInputContainer>
					<input id={id} type="file" value="" onChange={this.changeFileVal} ref={el => this.fileinp = el} />
					<Button round="true" bordered="true" info="true" onClick={this.triggerSelectFile}><Icon icon="upload" />{val ? 'Change file' : 'Upload file'}</Button>
				</FileInputContainer>
				{revertBtn}
				{deleteBtn}
				{cropBtn}

			</Container>
		);
	}
}
