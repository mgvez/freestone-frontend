import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordTitle from '../../../components/form/widgets/RecordTitle';
import { titlesWidgetMapStateToProps } from '../../../selectors/recordMetadata';
import { fetchWorkingTitle, clearWorkingTitle } from '../../../actions/metadata';

export default connect(
	titlesWidgetMapStateToProps,
	dispatch => bindActionCreators({ fetchWorkingTitle, clearWorkingTitle }, dispatch)
)(RecordTitle);
