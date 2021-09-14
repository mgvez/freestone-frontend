import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecordStructuredData from '../../../components/form/widgets/RecordStructuredData';
import { structuredWidgetMapStateToProps } from '../../../selectors/recordMetadata';
import { fetchWorkingStructured, clearWorkingStructured } from '../../../actions/metadata';

export default connect(
	structuredWidgetMapStateToProps,
	dispatch => bindActionCreators({ fetchWorkingStructured, clearWorkingStructured }, dispatch)
)(RecordStructuredData);
