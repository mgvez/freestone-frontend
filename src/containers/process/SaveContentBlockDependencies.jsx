import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SaveContentBlockDependencies from '../../components/process/SaveContentBlockDependencies';

import { saveDependencies } from '../../actions/blockFieldDeps';

export default connect(
	(state) => {
		return {
			dependencies: state.freestone.blockFieldDeps && state.freestone.blockFieldDeps.dependencies,
		};
	},
	dispatch => bindActionCreators({ saveDependencies }, dispatch)
)(SaveContentBlockDependencies);
