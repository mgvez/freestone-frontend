import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Freestone from '../components/Freestone';

import { loginUser, setTicket } from '../actions/auth';
import { fetchVariable, fetchEnv } from '../actions/env';
import { appRootSelector } from '../selectors/env';


const actionCreators = { loginUser, fetchVariable, fetchEnv, setTicket };

export default connect(
	appRootSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(Freestone);
