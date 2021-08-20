import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContentBlockPreview from '../../../components/form/widgets/ContentBlockPreview';
import { previewUnsavedRecordMapStateToProps } from '../../../selectors/previewRecord';
import { fetchContentBlockPreview, setPreviewWidth } from '../../../actions/contentBlockPreview';

export default connect(
	previewUnsavedRecordMapStateToProps,
	dispatch => bindActionCreators({ fetchContentBlockPreview, setPreviewWidth }, dispatch)
	)(ContentBlockPreview);
