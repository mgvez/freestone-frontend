import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Changelog from '../../components/changelog/Changelog';
import { fetchChangelog } from '../../actions/changelog';

export default connect(
	state => {
		if (!state.freestone.changelog.latestModifs) return {};
		return {
			...state.freestone.changelog.latestModifs,
		};
	},
	dispatch => bindActionCreators({ fetchChangelog }, dispatch)
)(Changelog);

