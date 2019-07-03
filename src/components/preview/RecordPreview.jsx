import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PREVIEW_IFRAME, PREVIEW_WIN } from '../../actions/record';


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
const iframeStyle = {
	width: '50vw',
	minHeight: '100vh',
	position: 'fixed',
};

export default class RecordPreview extends Component {
	static propTypes = {
		currentPreviewSlug: PropTypes.string,
		type: PropTypes.string,
		children: PropTypes.any,
	};

	componentDidMount() {
		this.updatePopWindow(this.props);
	}

	componentDidUpdate() {
		this.updatePopWindow(this.props);
	}

	updatePopWindow(props) {
		// console.log(nextProps && nextProps.type);
		const isWindow = props.type === PREVIEW_WIN;
		if (isWindow) {
			if (!this.window || this.window.closed) {
				this.window = window.open();
			}
			this.window.location = props.currentPreviewSlug;
		}
		// console.log(this.window);
	}

	render() {
		// console.log(this.props.type);
		const hasIframe = this.props.currentPreviewSlug && this.props.type === PREVIEW_IFRAME;

		const mainWindowStyle = hasIframe ? halfStyle : fullStyle;
		// console.log(this.props.currentPreviewSlug);
		const preview = hasIframe ? (
			<div style={halfStyle}>
				<iframe src={this.props.currentPreviewSlug} style={iframeStyle} />
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
