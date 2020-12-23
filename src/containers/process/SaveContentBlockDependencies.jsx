import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SaveContentBlockDependencies from '../../components/process/SaveContentBlockDependencies';

import { saveDependencies } from '../../actions/blockFieldDeps';

export default connect(
	(state) => {
		return {
			dependencies: state.freestone.dependencies && state.freestone.dependencies.dependencies,
		};
	},
	dispatch => bindActionCreators({ saveDependencies }, dispatch)
)(SaveContentBlockDependencies);
