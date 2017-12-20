import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FreestoneComp from '../components/Freestone';

import { loginUser } from '../actions/auth';
import { fetchVariable, fetchEnv } from '../actions/env';

const actionCreators = { loginUser, fetchVariable, fetchEnv };

const Freestone = connect(
	state => {
		return {
			isAuthenticated: state.freestone.auth.isAuthenticated,
			lastRequestTime: state.freestone.auth.lastRequestTime,
			freestone: state.freestone.env.freestone,
			jwt: state.freestone.auth.jwt,
		};
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)(FreestoneComp);

export default Freestone;
