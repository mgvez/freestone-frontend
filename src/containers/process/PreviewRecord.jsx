import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PreviewRecord from '../../components/process/PreviewRecord';

import { showPreview } from '../../actions/slugs';
import { previewRecordMapStateToProps } from '../../selectors/previewRecordSelector';

export default connect(
	previewRecordMapStateToProps,
	dispatch => bindActionCreators({ showPreview }, dispatch)
)(PreviewRecord);
