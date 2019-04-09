import React, { Component } from 'react';
import PropTypes from 'prop-types';


const containerStyle = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'nowrap',
};

const halfStyle = {
	flexBasis: '50%',
	position: 'relative',
	overflow: 'hidden',
};

const fullStyle = {
	flexBasis: '100%',
	position: 'relative',
	overflow: 'hidden',
};

export default class RecordPreview extends Component {
	static propTypes = {
		currentPreviewSlug: PropTypes.string,
		children: PropTypes.any,
	};

	render() {

		const mainWindowStyle = this.props.currentPreviewSlug ? halfStyle : fullStyle;

		const preview = this.props.currentPreviewSlug ? (
			<div style={halfStyle}>
				<iframe src={this.props.currentPreviewSlug} style={{ width: '50vw', minHeight: '100vh', position: 'fixed' }} />
			</div>
		) : null;

		return (
			<div style={containerStyle}>
				<div style={mainWindowStyle}>
					{this.props.children}
				</div>
				{preview}
			</div>
		);
	}
}
