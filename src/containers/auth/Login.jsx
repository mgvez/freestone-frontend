import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../../components/auth/Login';
/* actions */
import { loginUser } from '../../actions/auth';
import { fetchVariable, setVariable } from '../../actions/env';


export default connect(
	state => {
		return {
			...state.freestone.auth,
			isInstalled: state.freestone.env.clientVariables && state.freestone.env.clientVariables.isInstalled,
			apiGoogle: state.freestone.env.clientVariables && state.freestone.env.clientVariables.api_google,
		};
	},
	dispatch => bindActionCreators({ loginUser, fetchVariable, setVariable }, dispatch)
)(Login);

