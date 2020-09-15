import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LatestModifs from '../../components/dashboard/LatestModifs';

import { fetchLatestModifs } from '../../actions/dashboard';

export default connect(
	state => {
		if (!state.freestone.dashboard.latestModifs) return {};
		return {
			...state.freestone.dashboard.latestModifs,
		};
	},
	dispatch => bindActionCreators({ fetchLatestModifs }, dispatch)
)(LatestModifs);

