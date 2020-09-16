import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LatestModifs from '../../components/dashboard/LatestModifs';

import { fetchLatestModifs } from '../../actions/changelog';

export default connect(
	state => {
		if (!state.freestone.changelog.latestModifs) return {};
		return {
			...state.freestone.changelog.latestModifs,
		};
	},
	dispatch => bindActionCreators({ fetchLatestModifs }, dispatch)
)(LatestModifs);

