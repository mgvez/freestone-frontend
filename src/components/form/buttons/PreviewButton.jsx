import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class PreviewRecord extends Component {
	static propTypes = {
		initPreview: PropTypes.func,
	};

	render() {
		return <button className="button-preview" onClick={this.props.initPreview}><i className="fa fa-eye"></i>Preview</button>;
	}
}
