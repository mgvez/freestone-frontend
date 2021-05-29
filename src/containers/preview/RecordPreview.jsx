import { connect } from 'react-redux';

import RecordPreview from '../../components/preview/RecordPreview';
import { currentPreviewSelector } from '../../selectors/previewRecord';

export default connect(
	currentPreviewSelector
)(RecordPreview);
