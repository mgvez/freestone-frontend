import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TYPE_BANKIMG, TYPE_BANKFILE } from '../../../freestone/SchemaProps';
import { callApi, getEndpoint } from '../../../freestone/api';
import { Button } from '../../../styles/Button';

export default class SelectBankItemBtn extends Component {
	static propTypes = {
		gotoOnChoose: PropTypes.string,
		bankItemId: PropTypes.string,

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

		// console.log(tableId, recordId, fieldId, fieldType);
		this.props.cancelBankSelect();
		//depending on type of target field, we might put bank ID directly, or markup of a placed image
		if (~[TYPE_BANKIMG, TYPE_BANKFILE].indexOf(fieldType)) {
			// console.log('direct value', prikeyVal);
			this.props.setFieldVal(tableId, recordId, fieldId, bankItemId);
			this.props.goTo(this.props.gotoOnChoose);

		} else {
			// console.log('fetch markup');
			callApi(getEndpoint(`bank/images/figure/${bankItemId}`)).then(res => {
				// console.log(res);
				const newValue = this.props.targetFieldValue && this.props.targetFieldValue.replace('{{placeholder}}', res.data.markup);
				// this.props.setMarkup(this.props.contentAfter.replace('{{placeholder}}', res.data.markup));
				this.props.setFieldVal(tableId, recordId, fieldId, newValue);
				this.props.goTo(this.props.gotoOnChoose);
			}, err => {
				console.log(err);// eslint-disable-line
			});
		}
		// console.log(this.props);
		// this.props.goTo(this.props.gotoOnChoose);
	}

	render() {
		if (!this.props.isChoosingBankItem) return <div />;
		
		return <Button onClick={this.chooseItem} cta fullwidth><i className="fa fa-check"></i>Choose</Button>;
	}
}
