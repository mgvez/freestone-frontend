import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateFreestone from '../../components/process/UpdateFreestone';

import { updateFreestone } from '../../actions/env';

export default connect(
	null,
	dispatch => bindActionCreators({ updateFreestone }, dispatch)
)(UpdateFreestone);
