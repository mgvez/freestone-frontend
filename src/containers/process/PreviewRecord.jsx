import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PreviewRecord from '../../components/process/PreviewRecord';

import { navigateToSlug } from '../../actions/slugs';
import { previewRecordMapStateToProps } from '../../selectors/previewRecordSelector';

export default connect(
	previewRecordMapStateToProps,
	dispatch => bindActionCreators({ navigateToSlug }, dispatch)
)(PreviewRecord);
