import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearData, startPerf, stopPerf } from '../actions/dev';
import { clearErrors } from '../actions/errors';
import { logout } from '../actions/auth';
import { clearSchema } from '../actions/schema';

import SiteHeader from '../components/header/SiteHeader';
import { isGodSelector } from '../selectors/credentials';

const actionCreators = { clearErrors, clearData, startPerf, stopPerf, clearSchema, logout };

export default connect(
	isGodSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(SiteHeader);
