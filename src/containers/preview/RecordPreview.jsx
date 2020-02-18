import { connect } from 'react-redux';

import RecordPreview from '../../components/preview/RecordPreview';
import { currentPreviewSelector } from '../../selectors/previewRecordSelector';

export default connect(
	currentPreviewSelector
)(RecordPreview);
