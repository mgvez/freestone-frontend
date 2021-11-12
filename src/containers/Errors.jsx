import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Errors from '../components/Errors';

import { clearErrors } from '../actions/errors';
import { goTo } from '../actions/nav';
import { errorsMapStateToProps } from '../selectors/Errors';

export default connect(
	errorsMapStateToProps,
	dispatch => bindActionCreators({ clearErrors, goTo }, dispatch)
)(Errors);

