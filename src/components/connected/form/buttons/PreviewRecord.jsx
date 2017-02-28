import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Save } from 'components/connected/process/Save';
import { fetchSlug } from 'actions/slugs';

import { previewBtnMapStateToProps } from 'selectors/previewBtnSelector';

@connect(
	previewBtnMapStateToProps,
	dispatch => bindActionCreators({ fetchSlug }, dispatch)
)
export class PreviewRecord extends Component {
	static propTypes = {
		slug: React.PropTypes.string,
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,

		fetchSlug: React.PropTypes.func,
	};

	componentWillMount() {
		this.setState({
			saving: false,
		});
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		if (!props.slug) {
			this.props.fetchSlug(props.tableId, props.recordId);
		}
	}

	saveAndView = (e) => {
		// console.log('save');
		e.preventDefault();
		this.setState({
			saving: true,
			afterSave: (savedRecord) => {
				console.log(savedRecord);
			},
		});
	}

	cancelSave = () => {
		// console.log('cancel');
		this.setState({
			saving: false,
			afterSave: null,
		});
	}

	render() {
		if (this.state.saving) {
			return <Save tableId={this.props.tableId} recordId={this.props.recordId} callback={this.state.afterSave} cancelSave={this.cancelSave} isTemporary />;
		}
		return <a href={this.props.slug} target="_blank" className="button-preview" onClick={this.saveAndView}><i className="fa fa-eye"></i>Preview</a>;
	}
}
