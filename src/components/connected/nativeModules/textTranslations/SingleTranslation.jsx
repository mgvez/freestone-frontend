import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as translationActions from 'actions/translations';
import { singleTranslationMapStateToProps } from 'selectors/translations';

@connect(
	singleTranslationMapStateToProps
)
export class SingleTranslation extends Component {
	static propTypes = {
		translationKey: React.PropTypes.string,
		translationValue: React.PropTypes.string,

		fetchTranslations: React.PropTypes.func,
		fetchPlacedTranslations: React.PropTypes.func,
	};

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(props) {
		this.requireData(props);
	}

	requireData(props) {
		// props.languages.forEach(lang => {
		// 	if (!props.translations || !props.translations[lang]) {
		// 		this.props.fetchTranslations(lang);
		// 	}
		// });

		// if (!props.placedTranslations) {
		// 	this.props.fetchPlacedTranslations();
		// }
	}

	render() {
		return (<input value={this.props.translationValue} />);
	}
}
