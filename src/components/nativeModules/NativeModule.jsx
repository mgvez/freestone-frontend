import React, { Component } from 'react';

import TextTranslations from '../../containers/nativeModules/textTranslations/TextTranslations';

export default class NativeModule extends Component {
	static propTypes = {
		params: React.PropTypes.shape({
			name: React.PropTypes.string,
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
