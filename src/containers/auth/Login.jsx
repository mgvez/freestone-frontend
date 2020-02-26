import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../../components/auth/Login';
/* actions */
import { loginUser, requestReset, clearStatus, resetPassword } from '../../actions/auth';
import { fetchVariable, setVariable } from '../../actions/env';
import { authSelector } from '../../selectors/auth';


export default connect(
	authSelector,
	dispatch => bindActionCreators({ loginUser, fetchVariable, setVariable, requestReset, clearStatus, resetPassword }, dispatch)
)(Login);

