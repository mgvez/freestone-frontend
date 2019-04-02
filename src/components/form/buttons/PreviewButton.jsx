import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class PreviewRecord extends Component {
	static propTypes = {
		tableId: PropTypes.number,
		recordId: PropTypes.string,
		setIsPreviewing: PropTypes.func,
	};

	onClickPreview = () => {
		this.props.setIsPreviewing(this.props.tableId, this.props.recordId, true);
	}

	render() {
		return <button className="button-preview" onClick={this.onClickPreview}><i className="fa fa-eye"></i>Preview</button>;
	}
}
