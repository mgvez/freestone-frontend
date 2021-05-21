import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordSlug from '../../../components/form/widgets/RecordSlug';
import { slugWidgetMapStateToProps } from '../../../selectors/recordSlugs';
import { fetchWorkingSlug, clearWorkingSlug } from '../../../actions/slugs';

export default connect(
	slugWidgetMapStateToProps,
	dispatch => bindActionCreators({ fetchWorkingSlug, clearWorkingSlug }, dispatch)
)(RecordSlug);
