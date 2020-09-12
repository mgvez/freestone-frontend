import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SavedFileInput, getSavedInput, clearSavedInput } from '../../../freestone/fileInputs';
import FileThumbnail from '../../../containers/fileThumbnail/FileThumbnail';
import Cropper from '../../images/Cropper';
import RatioWarning from '../../images/RatioWarning';
import FileInfos from './FileInfos';
import { TYPE_FILE, TYPE_IMG } from '../../../freestone/schemaProps';
import { Button } from '../../../styles/Button';
import { WarningMessage } from '../../../styles/Texts';
import { THUMBNAIL_SIZE, IMAGE_MAX_SAFE_MP } from '../../../freestone/settings';
import { Icon } from '../../../styles/Icon';
import { useImageDimensions } from '../../../hooks/imageDimensions';


const Container = styled.div`
	display: inline-block;
	vertical-align: middle;
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


const GenericFileInput = (props) => {

	const [localFile, setLocalFile] = useState(null);
	const [isCropping, setIsCropping] = useState(false);
	const inputRef = useRef(false);

	const getLocalImage = (file) => {
		if (!file || localFile || props.type !== TYPE_IMG) return undefined;

		const reader = new FileReader();

		reader.onload = (e) => {
			setLocalFile(e.target.result);
		};

		reader.readAsDataURL(file);
	};

	const getCurrentSavedInput = () => {
		// console.log('get input %s', props.val);
		const saved = new SavedFileInput(props.val);

		//si pas de input mais que la val est une ref à un input, c'est que le input existe pas... reset la val à original
		if (props.val && props.val !== props.origVal && !saved.getFilePath()) {
			props.changeVal(props.origVal);
		}
		if (saved.getFile()) {
			getLocalImage(saved.getFile());
		}
		return saved;
	};

	const setForDelete = () => {
		clearSavedInput(props.val);
		props.changeVal('');
	};

	const changeFileVal = (e) => {
		const input = e.target;
		const savedInput = getCurrentSavedInput();

		savedInput.setInput(input, props.fieldId, props.recordId);
		// console.log('change val %s', savedInput.getId());
		setLocalFile(null);
		props.changeVal(savedInput.getId());
	};

	const onClearSavedInput = () => {
		clearSavedInput(props.val);
		setLocalFile(null);
		props.changeVal(props.origVal);
	};

	const triggerSelectFile = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};


	const typeLabel = props.type === TYPE_IMG ? 'image' : 'file';
	const { origVal, val } = props;

	const [localImgWidth, localImgHeight] = useImageDimensions(props.type === TYPE_IMG && localFile);

	const input = getCurrentSavedInput();
	// Vérifie si on a une val qui provient du local storage mais pour laquelle on n'aurait pu l'input (par ex si reloaded)
	const inMemory = input.getFilePath();
	const fileName = inMemory && inMemory.split(/(\\|\/)/g).pop();

	// Si la val originale est pas la meme que la val actuelle, on peut vouloir revenir à la val originale
	let revertBtn;
	if (origVal && val !== origVal) {
		revertBtn = <Button round bordered warn small onClick={onClearSavedInput}>Revert to db {typeLabel}</Button>;
	} else if (val) {
		revertBtn = <Button round bordered warn small onClick={onClearSavedInput}>Clear</Button>;
	}

	// S'il y a une val originale et pas d'input (i.e. pas de val user encore) on peut vouloir deleter simplement la val db
	let deleteBtn;
	if (val && origVal === val) {
		deleteBtn = <Button round bordered small danger onClick={setForDelete}><Icon icon="times" />Delete {typeLabel}</Button>;
	}

	let displayVal;
	let cropBtn;
	// TYPE_FILE shows the extension and file name.
	if (props.type === TYPE_FILE) {
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
	let sizeInfos;
	let sizeWarning;
	let ratioWarning;
	const currentCrop = input.getCropSettings();

	if (props.type === TYPE_IMG) {
		// If displayBal is null, FileThumbnail will display the uploaded file as an image or nothing if no file was
		// uploaded.
		// Add : Show nothing at first, then show the uploaded.
		// Edit : Show the original at first, then show the uploaded.
		// Delete : Shows nothing.
		// console.log(props);
		displayVal = val !== origVal ? null : origVal;

		// display option to crop file, if to be uploaded
		if (localFile) {
			cropBtn = <Button round small bordered cta faded onClick={() => setIsCropping(true)}><Icon icon="crop" />Crop</Button>;
			const megaPixels = Math.round(((localImgWidth * localImgHeight) / (1000000)) * 100 + Number.EPSILON) / 100;
			if (megaPixels > IMAGE_MAX_SAFE_MP) {
				sizeWarning = (
					<WarningMessage>
						Image is larger than {IMAGE_MAX_SAFE_MP} megapixels. It may cause performance issues or server errors. Please consider using a smaller image.
					</WarningMessage>
				);
			}

			ratioWarning = (
				<RatioWarning imageWidth={localImgWidth} imageHeight={localImgHeight} suggestedRatio={props.ratio} crop={currentCrop} />
			);

			sizeInfos = (
				<div className="sizeInfos">
					{localImgWidth}px * {localImgHeight}px, {megaPixels} megapixels
				</div>
			);
		}
	}

	let cropper = null;
	if (isCropping) {
		cropper = (
			<Cropper
				src={localFile}
				setIsCropping={setIsCropping}
				setCrop={(newCrop) => input.setCropSettings(newCrop)}
				crop={currentCrop}
				ratio={props.ratio}
			/>
		);
	}
	// console.log(props.absolutePath);

	const thumbnail = (<FileThumbnail
		val={displayVal}
		absolutePath={props.absolutePath}
		localVal={localFile}
		dir={props.folder}
		type={props.type}
		crop={currentCrop}
	/>);
	const id = `${props.fieldId}__${props.recordId}`;

	return (
		<Container>
			{cropper}
			<FileInfos 
				thumbnail={thumbnail}
				sizeInfos={sizeInfos}
				warnings={[sizeWarning, ratioWarning]}
				displayVal={(props.type === TYPE_FILE ? displayVal : null)}
			/>

			<FileInputContainer>
				<input id={id} type="file" value="" onChange={changeFileVal} ref={inputRef} />
				<Button round small bordered info onClick={triggerSelectFile}><Icon icon="upload" />{val ? 'Change file' : 'Upload file'}</Button>
			</FileInputContainer>
			{revertBtn}
			{deleteBtn}
			{cropBtn}

		</Container>
	);

};

GenericFileInput.propTypes = {
	fieldId: PropTypes.number,
	ratio: PropTypes.number,
	val: PropTypes.string,
	origVal: PropTypes.string,
	type: PropTypes.string,
	folder: PropTypes.string,
	recordId: PropTypes.string,
	changeVal: PropTypes.func,
	absolutePath: PropTypes.string,
};
export default GenericFileInput;

