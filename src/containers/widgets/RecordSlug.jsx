import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordSlug from '../../components/widgets/RecordSlug';
import { slugWidgetMapStateToProps } from '../../selectors/recordSlugs';
import { fetchSlug } from '../../actions/slugs';

export default connect(
	slugWidgetMapStateToProps,
	dispatch => bindActionCreators({ fetchSlug }, dispatch)
)(RecordSlug);
