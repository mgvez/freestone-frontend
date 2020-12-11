import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SaveQuickedit from '../../components/process/SaveQuickedit';

import { saveQuickedit } from '../../actions/save';
import { buildSaveQuickeditRecordSelector } from '../../selectors/buildRecord';

export default connect(
	buildSaveQuickeditRecordSelector,
	dispatch => bindActionCreators({ saveQuickedit }, dispatch)
)(SaveQuickedit);
