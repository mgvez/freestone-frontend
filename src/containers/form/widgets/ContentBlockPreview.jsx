import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContentBlockPreview from '../../../components/form/widgets/ContentBlockPreview';
import { previewUnsavedRecordMapStateToProps } from '../../../selectors/previewRecord';
import { fetchContentBlockPreview } from '../../../actions/contentBlockPreview';

export default connect(
	previewUnsavedRecordMapStateToProps,
	dispatch => bindActionCreators({ fetchContentBlockPreview }, dispatch)
	)(ContentBlockPreview);
