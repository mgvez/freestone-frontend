import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SaveQuickedit from '../../components/process/SaveQuickedit';

import { saveRecord } from '../../actions/save';
import { buildSaveRecordSelector } from '../../selectors/buildRecord';

export default connect(
	buildSaveRecordSelector,
	dispatch => bindActionCreators({ saveRecord }, dispatch)
)(SaveQuickedit);
