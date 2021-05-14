import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordSlug from '../../components/widgets/RecordSlug';
import { slugWidgetMapStateToProps } from '../../selectors/recordSlugs';
import { fetchWorkingSlug } from '../../actions/slugs';

export default connect(
	slugWidgetMapStateToProps,
	dispatch => bindActionCreators({ fetchWorkingSlug }, dispatch)
)(RecordSlug);
