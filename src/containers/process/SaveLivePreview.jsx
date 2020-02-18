import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SaveLivePreview from '../../components/process/SaveLivePreview';

import { saveRecord } from '../../actions/save';
import { buildSaveRecordSelector } from '../../selectors/buildRecord';

export default connect(
	buildSaveRecordSelector,
	dispatch => bindActionCreators({ saveRecord }, dispatch)
)(SaveLivePreview);

