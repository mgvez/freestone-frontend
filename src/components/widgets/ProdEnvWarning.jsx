import React, { Component } from 'react';
import { Button } from '../../styles/Button';

export default class ProdEnvWarning extends Component {

	render() {

		return (
			<Button danger="true">
				PRODUCTION ENVIRONMENT
			</Button>
		);
	}
}
