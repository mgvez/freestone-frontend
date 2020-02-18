import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Errors from '../components/Errors';

import { clearErrors } from '../actions/errors';
import { goTo } from '../actions/nav';

export default connect(
	state => {
		return { errors: state.freestone.errors };
	},
	dispatch => bindActionCreators({ clearErrors, goTo }, dispatch)
)(Errors);

