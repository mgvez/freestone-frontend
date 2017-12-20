import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Save from '../../components/process/Save';

import { saveRecord } from '../../actions/save';
import { buildSaveRecordSelector } from '../../selectors/buildRecord';

export default connect(
	buildSaveRecordSelector,
	dispatch => bindActionCreators({ saveRecord }, dispatch)
)(Save);
