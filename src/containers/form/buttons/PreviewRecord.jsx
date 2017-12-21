import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PreviewRecord from '../../../components/form/buttons/PreviewRecord';

import { navigateToSlug } from '../../../actions/slugs';
import { previewBtnMapStateToProps } from '../../../selectors/previewBtnSelector';

export default connect(
	previewBtnMapStateToProps,
	dispatch => bindActionCreators({ navigateToSlug }, dispatch)
)(PreviewRecord);
