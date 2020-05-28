import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { THUMBNAIL_SIZE } from '../../freestone/settings';
import styled from 'styled-components';

const ChoosenImage = styled.div`
	margin-bottom: 10px;
	width: max-content;
	cursor: pointer;
	
	img {
		max-height: ${THUMBNAIL_SIZE}px;
	}
`;

export default class BankImgThumbnail extends Component {
	static propTypes = {
		id: PropTypes.any,
		markup: PropTypes.string,
		thumbPath: PropTypes.string,
		maxSize: PropTypes.number,
		onClick: PropTypes.func,
		fetchBankImage: PropTypes.func,
	};

	componentDidMount() {
		this.requireData(this.props);
	}

	componentDidUpdate() {
		this.requireData(this.props);
	}

	requireData(props) {
		// console.log(props);
		if (props.id && !props.markup) this.props.fetchBankImage(props.id, this.props.maxSize || THUMBNAIL_SIZE);
	}

	render() {
		if (!this.props.id) return null;

		return (
			<ChoosenImage onClick={this.props.onClick} dangerouslySetInnerHTML={{ __html: this.props.markup }} />
		);
	}
}
