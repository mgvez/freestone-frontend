import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchBankFile } from 'actions/bank';
import { bankFileItemSelector } from 'selectors/bank';
import { BANK_FILE_FILE_ALIAS, BANK_FILE_TITLE_ALIAS, BANK_FILE_PATH_ALIAS } from 'freestone/schemaProps';

@connect(
	bankFileItemSelector,
	dispatch => bindActionCreators({ fetchBankFile }, dispatch)
)
export class BankFileThumbnail extends Component {
	static propTypes = {
		id: React.PropTypes.any,
		item: React.PropTypes.object,
		lang: React.PropTypes.string,

		fetchBankFile: React.PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// console.log(props);
		if (props.id && !props.item) this.props.fetchBankFile(props.id);
	}

	render() {
		if (!this.props.id || !this.props.item) return null;
		// console.log(this.props.item);
		return (
			<div className="bank-file-thumbnail">
				<a href={this.props.item[BANK_FILE_PATH_ALIAS]} target="_blank">
					<i className="fa fa-file" />&nbsp;
					{this.props.item[BANK_FILE_FILE_ALIAS]}
				</a>
				<br />
				<strong>{this.props.item[`${BANK_FILE_TITLE_ALIAS}${this.props.lang}`]}</strong>
			</div>
		);
	}
}
