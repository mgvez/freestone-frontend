import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TYPE_BANKIMG, TYPE_BANKFILE, TYPE_MARKDOWN } from '../../../freestone/SchemaProps';
import { PLACEHOLDER } from '../../../freestone/settings';
import { callApi, getEndpoint } from '../../../freestone/api';
import { Button } from '../../../styles/Button';
import { Icon } from '../../../styles/Icon';

export default class SelectBankItemBtn extends Component {
	static propTypes = {
		gotoOnChoose: PropTypes.string,
		bankItemId: PropTypes.string,
		lang: PropTypes.string,

		targetFieldValue: PropTypes.any,
		bankDestination: PropTypes.object,
		isChoosingBankItem: PropTypes.bool, //indicate whether we are in the process of choosing an item to put in a record, or merely browsing the list
		setFieldVal: PropTypes.func,
		goTo: PropTypes.func,
		cancelBankSelect: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			requested: false,
		};
	}

	chooseItem = () => {

		const bankItemId = this.props.bankItemId;
		const { tableId, recordId, fieldId, fieldType } = this.props.bankDestination;
		const { targetFieldValue, gotoOnChoose, lang } = this.props;

		this.props.cancelBankSelect();

		// console.log(tableId, recordId, fieldId, fieldType);
		//depending on type of target field, we might put bank ID directly, or markup of a placed image
		if (~[TYPE_BANKIMG, TYPE_BANKFILE].indexOf(fieldType)) {
			// console.log('direct value', prikeyVal);
			this.props.setFieldVal(tableId, recordId, fieldId, bankItemId);
			this.props.goTo(gotoOnChoose);

		} else {
			// console.log('fetch markup');
			// console.log(this.props);

			const action = fieldType === TYPE_MARKDOWN ? 'item' : 'figure';

			callApi(getEndpoint(`bank/images/${action}/${bankItemId}/${lang}`)).then(res => {
				let replacement = res.data.markup;
				if (fieldType === TYPE_MARKDOWN && res.data.item) {
					// console.log(res.data);
					const alt = res.data.item[`_alt_${lang}`] || 'Image';
					const title = res.data.item[`_title_${lang}`] || 'Image';
					replacement = `![${alt}](${res.data.item.file_path} "${title}")`;
				}
				const newValue = targetFieldValue && targetFieldValue.replace(PLACEHOLDER, replacement);
				this.props.setFieldVal(tableId, recordId, fieldId, newValue);
				this.props.goTo(gotoOnChoose);
			}, err => {
				console.log(err);// eslint-disable-line
			});
		}
		// console.log(this.props);
		// this.props.goTo(this.props.gotoOnChoose);
	}

	render() {
		if (!this.props.isChoosingBankItem) return <div />;
		
		return <Button onClick={this.chooseItem} cta fullwidth><Icon icon="check" />Choose</Button>;
	}
}
