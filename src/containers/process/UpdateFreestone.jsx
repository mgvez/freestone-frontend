import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateFreestone from '../../components/process/UpdateFreestone';

import { logout } from '../../actions/auth';

export default connect(
	(state) => {
		return { 
			jwt: state.freestone.auth.jwt,
			...state.freestone.env.freestone.version,
		};
	},
	dispatch => bindActionCreators({ logout }, dispatch)
)(UpdateFreestone);
