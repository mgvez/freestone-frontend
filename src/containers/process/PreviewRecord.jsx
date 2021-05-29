import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PreviewRecord from '../../components/process/PreviewRecord';

import { setCurrentPreview, setPreviewViewType } from '../../actions/record';
import { previewRecordMapStateToProps } from '../../selectors/previewRecord';

export default connect(
	previewRecordMapStateToProps,
	dispatch => bindActionCreators({ setCurrentPreview, setPreviewViewType }, dispatch)
)(PreviewRecord);
