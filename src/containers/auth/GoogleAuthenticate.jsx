import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GoogleAuthenticate from '../../components/auth/GoogleAuthenticate';
import { loginGoogleAPI } from '../../actions/auth';
import { fetchVariable } from '../../actions/env';

export default connect(
	state => {
		// console.log('selector', state.freestone.auth.isAuthenticated);
		return {
			...state.freestone.auth,
			apiGoogle: state.freestone.env.clientVariables && state.freestone.env.clientVariables.api_google,
		};
	},
	dispatch => bindActionCreators({ loginGoogleAPI, fetchVariable }, dispatch)
)(GoogleAuthenticate);

