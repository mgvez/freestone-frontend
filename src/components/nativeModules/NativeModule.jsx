import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextTranslations from '../../containers/nativeModules/textTranslations/TextTranslations';

export default class NativeModule extends Component {
	static propTypes = {
		name: PropTypes.string,
	};

	render() {
		// console.log(this.props);
		switch (this.props.name) {
		case 'TextTranslations':
			return <TextTranslations />;
		default:
			return null;
		}
	}
}
