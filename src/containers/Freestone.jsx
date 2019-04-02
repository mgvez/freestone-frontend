import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Freestone from '../components/Freestone';

import { loginUser } from '../actions/auth';
import { fetchVariable, fetchEnv } from '../actions/env';

const actionCreators = { loginUser, fetchVariable, fetchEnv };

export default connect(
	state => {
		return {
			isAuthenticated: state.freestone.auth.isAuthenticated,
			lastRequestTime: state.freestone.auth.lastRequestTime,
			freestone: state.freestone.env.freestone,
			jwt: state.freestone.auth.jwt,
		};
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)(Freestone);
