import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Cancel from '../../components/process/Cancel';

import { cancelEdit } from '../../actions/record';
import { goTo } from '../../actions/nav';

import { buildCancelRecordSelector } from '../../selectors/buildRecord';

export default connect(
	buildCancelRecordSelector,
	dispatch => bindActionCreators({ cancelEdit, goTo }, dispatch)
)(Cancel);
