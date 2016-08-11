import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { THUMBNAIL_SIZE } from 'freestone/settings';
import { fetchBankImage } from 'actions/bank';
import { bankImgThumbnailSelector } from 'selectors/bank';

@connect(
	bankImgThumbnailSelector,
	dispatch => bindActionCreators({ fetchBankImage }, dispatch)
)
export class BankImgThumbnail extends Component {
	static propTypes = {
		id: React.PropTypes.number,
		markup: React.PropTypes.string,

		fetchBankImage: React.PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);

		this.css = {
			maxHeight: 200,
			maxWidth: 200,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// console.log(props);
		if (props.id && !props.markup) this.props.fetchBankImage(props.id);
	}

	render() {
		if (!this.props.id) return null;
		return (
			<div className="bank-img-thumbnail-container" dangerouslySetInnerHTML={{ __html: this.props.markup }} />
		);
	}
}
