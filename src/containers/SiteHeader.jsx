import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearData } from '../actions/dev';
import { clearErrors } from '../actions/errors';
import { logout } from '../actions/auth';
import { clearSchema } from '../actions/schema';

import SiteHeader from '../components/header/SiteHeader';
import { headerSelector } from '../selectors/header';

const actionCreators = { clearErrors, clearData, clearSchema, logout };

export default connect(
	headerSelector,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(SiteHeader);
