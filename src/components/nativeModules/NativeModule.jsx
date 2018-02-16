import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextTranslations from '../../containers/nativeModules/textTranslations/TextTranslations';

export default class NativeModule extends Component {
	static propTypes = {
		params: PropTypes.shape({
			name: PropTypes.string,
		}),
	};

	render() {
		// console.log(this.props);
		switch (this.props.params.name) {
		case 'TextTranslations':
			return <TextTranslations />;
		default:
			return null;
		}
	}
}
