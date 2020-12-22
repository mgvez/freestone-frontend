import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BlockFieldDeps from '../../../components/nativeModules/blockFieldDeps/BlockFieldDeps';

import { goTo } from '../../../actions/nav';
import { fetchTable } from '../../../actions/schema';
import { fetchAllData, setSingleDependency } from '../../../actions/blockFieldDeps';
import { blockFieldDepsSelector } from '../../../selectors/blockFieldDeps';

export default connect(
	blockFieldDepsSelector,
	dispatch => bindActionCreators({ goTo, fetchAllData, fetchTable, setSingleDependency }, dispatch)
)(BlockFieldDeps);
