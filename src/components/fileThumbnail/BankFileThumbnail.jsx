import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BANK_FILE_ALIAS, BANK_TITLE_ALIAS, BANK_PATH_ALIAS } from '../../freestone/schemaProps';

export default class BankFileThumbnail extends Component {
	static propTypes = {
		id: PropTypes.any,
		item: PropTypes.object,
		lang: PropTypes.string,

		fetchBankFile: PropTypes.func,
	};

	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	requireData(props) {
		// console.log(props);
		if (props.id && !props.item) this.props.fetchBankFile(props.id);
	}

	render() {
		// console.log(this.props.item);
		if (!this.props.id || !this.props.item) return null;
		return (
			<div className="bank-file-thumbnail">
				<strong>{this.props.item[`${BANK_TITLE_ALIAS}${this.props.lang}`]}</strong>
				<br />
				<a href={this.props.item[BANK_PATH_ALIAS]} target="_blank">
					<i className="fa fa-file" />&nbsp;
					{this.props.item[BANK_FILE_ALIAS]}
				</a>
			</div>
		);
	}
}
