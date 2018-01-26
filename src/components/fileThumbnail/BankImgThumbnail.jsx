import React, { Component } from 'react';


export default class BankImgThumbnail extends Component {
	static propTypes = {
		id: React.PropTypes.any,
		markup: React.PropTypes.string,
		maxSize: React.PropTypes.number,
		onClick: React.PropTypes.func,
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
		if (props.id && !props.markup) this.props.fetchBankImage(props.id, this.props.maxSize);
	}

	render() {
		if (!this.props.id) return null;
		return (
			<div className="bank-image-thumbnail" onClick={this.props.onClick} dangerouslySetInnerHTML={{ __html: this.props.markup }} />
		);
	}
}
