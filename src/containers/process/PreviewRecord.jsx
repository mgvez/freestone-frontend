import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PreviewRecord from '../../components/process/PreviewRecord';

import { showPreview } from '../../actions/slugs';
import { setIsPreviewing } from '../../actions/record';
import { previewRecordMapStateToProps } from '../../selectors/previewRecordSelector';

export default connect(
	previewRecordMapStateToProps,
	dispatch => bindActionCreators({ showPreview, setIsPreviewing }, dispatch)
)(PreviewRecord);
