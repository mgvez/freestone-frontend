import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TextTranslations } from 'components/connected/nativeModules/textTranslations/TextTranslations';

@connect(
	state => { return { jwt: state.auth.jwt }; }
)
export class NativeModule extends Component {
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