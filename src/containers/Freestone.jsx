import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Freestone from '../components/Freestone';

import { loginUser } from '../actions/auth';
import { fetchVariable, fetchEnv } from '../actions/env';
import { appRootSelector } from '../selectors/env';


const actionCreators = { loginUser, fetchVariable, fetchEnv };

export default connect(
	appRootSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(Freestone);
