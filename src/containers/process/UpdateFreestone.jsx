import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UpdateFreestone from '../../components/process/UpdateFreestone';

import { clearData } from '../../actions/dev';

export default connect(
	(state) => {
		return { 
			jwt: state.freestone.auth.jwt,
			...state.freestone.env.freestone.version,
		};
	},
	dispatch => bindActionCreators({ clearData }, dispatch)
)(UpdateFreestone);
