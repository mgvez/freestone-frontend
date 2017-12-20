import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ErrorsComp from '../components/Errors';

import { clearErrors } from '../actions/errors';
import { goTo } from '../actions/nav';

const Errors = connect(
	state => {
		return { errors: state.freestone.errors };
	},
	dispatch => bindActionCreators({ clearErrors, goTo }, dispatch)
)(ErrorsComp);

export default Errors;
