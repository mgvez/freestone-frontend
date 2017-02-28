import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Save } from 'components/connected/process/Save';
import { navigateToSlug } from 'actions/slugs';

import { previewBtnMapStateToProps } from 'selectors/previewBtnSelector';

@connect(
	previewBtnMapStateToProps,
	dispatch => bindActionCreators({ navigateToSlug }, dispatch)
)
export class PreviewRecord extends Component {
	static propTypes = {
		slug: React.PropTypes.string,
		tableId: React.PropTypes.number,
		recordId: React.PropTypes.string,
		currentLanguage: React.PropTypes.string,

		navigateToSlug: React.PropTypes.func,
	};

	componentWillMount() {
		this.setState({
			saving: false,
			savedRecordId: null,
		});
	}

	saveAndView = (e) => {
		// console.log('save');
		e.preventDefault();
		this.setState({
			saving: true,
			afterSave: (savedRecord) => {
				this.props.navigateToSlug(this.props.tableId, savedRecord.recordId, this.props.currentLanguage);
				this.setState({
					saving: false,
				});
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
		return <button className="button-preview" onClick={this.saveAndView}><i className="fa fa-eye"></i>Preview</button>;
	}
}
