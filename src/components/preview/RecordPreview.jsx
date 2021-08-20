import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PREVIEW_IFRAME, PREVIEW_WIN } from '../../actions/preview';


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

};

const scale = 0.5;
const iframeStyle = {
	width: '100vw',
	minHeight: '200vh',
	position: 'fixed',
	transformOrigin: '0 0',
	transform: `translate(0px, 0px) scale(${scale})`,
};

export default class RecordPreview extends Component {
	static propTypes = {
		currentPreviewSlug: PropTypes.string,
		isPreviewing: PropTypes.bool,
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


		const hasIframe = this.props.isPreviewing && this.props.currentPreviewSlug && this.props.type === PREVIEW_IFRAME;
		const mainWindowStyle = hasIframe ? halfStyle : fullStyle;

		// console.log(this.props.currentPreviewSlug);
		const previewIframe = this.props.isPreviewing && hasIframe ? (
			<div style={halfStyle}>
				<iframe src={this.props.currentPreviewSlug} style={iframeStyle} />
			</div>
		) : null;

		return (
			<div style={containerStyle}>
				<div style={mainWindowStyle}>
					{this.props.children}
				</div>
				{previewIframe}
			</div>
		);
	}
}
