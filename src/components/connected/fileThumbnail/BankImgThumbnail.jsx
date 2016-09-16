import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchBankImage } from 'actions/bank';
import { bankImgThumbnailSelector } from 'selectors/bank';

//dimension max des images, selon grille
const MAX_SIZE = 400;

@connect(
	bankImgThumbnailSelector,
	dispatch => bindActionCreators({ fetchBankImage }, dispatch)
)
export class BankImgThumbnail extends Component {
	static propTypes = {
		id: React.PropTypes.any,
		markup: React.PropTypes.string,
		maxSize: React.PropTypes.number,

		fetchBankImage: React.PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// console.log(props);
		if (props.id && !props.markup) this.props.fetchBankImage(props.id, this.props.maxSize || MAX_SIZE);
	}

	render() {
		if (!this.props.id) return null;
		return (
			<div className="bank-image-thumbnail" dangerouslySetInnerHTML={{ __html: this.props.markup }} />
		);
	}
}
