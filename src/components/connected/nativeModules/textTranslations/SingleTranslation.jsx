import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as translationActions from '../../../../actions/translations';
import { singleTranslationMapStateToProps } from '../../../../selectors/translations';

@connect(
	singleTranslationMapStateToProps,
	dispatch => bindActionCreators(translationActions, dispatch)
)
export class SingleTranslation extends Component {
	static propTypes = {
		translationKey: React.PropTypes.string,
		translationValue: React.PropTypes.string,
		language: React.PropTypes.string,

		editTranslation: React.PropTypes.func,
	};

	changeVal = (e) => {
		const v = (e && e.target) ? e.target.value : e;
		this.props.editTranslation(this.props.language, this.props.translationKey, v);
		// console.log(`change ${this.props.translationKey}`);
	}

	render() {
		return (<input type="text" value={this.props.translationValue || ''} onChange={this.changeVal} />);
	}
}
