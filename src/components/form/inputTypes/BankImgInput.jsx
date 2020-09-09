import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TYPE_IMG, BANK_IMG_TABLE } from '../../../freestone/schemaProps';

import BankImgThumbnail from '../../../containers/fileThumbnail/BankImgThumbnail';
import GenericFileInput from '../genericInputs/GenericFileInput';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

export default class BankImgInput extends Component {
	static propTypes = {
		changeVal: PropTypes.func,
		bankDestination: PropTypes.object,
		lang: PropTypes.string,
		field: PropTypes.object,
		recordId: PropTypes.string,
		route: PropTypes.string,
		val: PropTypes.any,
		goTo: PropTypes.func,
		setupBankSelect: PropTypes.func,
	};

	gotoSelect = () => {
		this.props.setupBankSelect(
			this.props.field.table_id,
			this.props.recordId,
			this.props.field.id,
			this.props.field.type,
			this.props.lang,
			this.props.route
		);
		this.props.goTo(`/list/${BANK_IMG_TABLE}/`);
	}

	handleEditorChange = (v) => {
		// console.log('set val', v);
		this.props.changeVal(v);
	};

	delete = () => {
		this.handleEditorChange(0);
	};

	render() {

		const bankImgId = Number(this.props.val);
		const hasLocalFile = !bankImgId && this.props.val;
		const localFileId = hasLocalFile ? this.props.val : null;
		//si une image de banque deja placée, on peut pas mettre un fichier direct. O peut juste changer l'image de la banque, parce que sinon ça donne l'impression que le fichier direct edit le record de banque.
		let fileDisplay = null;
		let deleteBtn = null;
		let chooseBtn = null;
		if (!bankImgId) {
			fileDisplay = (
				<GenericFileInput 
					type={TYPE_IMG}
					fieldId={this.props.field.id}
					recordId={this.props.recordId}
					val={localFileId}
					changeVal={this.handleEditorChange}
				/>
			);

			if (!hasLocalFile) {
				chooseBtn = <Button small round bordered info onClick={this.gotoSelect}><Icon icon="check" /> Choose in bank</Button>;

			}
		} else {
			deleteBtn = <Button small round danger bordered onClick={this.delete}><Icon icon="times" /> Remove value</Button>;
			fileDisplay = <BankImgThumbnail id={bankImgId} onClick={this.gotoSelect} />;
			chooseBtn = <Button small round bordered info onClick={this.gotoSelect}><Icon icon="exchange-alt" /> Change</Button>;
		}
		
		
		return (
			<div>
				{fileDisplay}
				{chooseBtn}
				{deleteBtn}
			</div>
		);
	}
}
