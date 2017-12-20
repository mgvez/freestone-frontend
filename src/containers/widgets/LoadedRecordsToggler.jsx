import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoadedRecordsToggler from '../../components/widgets/LoadedRecordsToggler';

import { toggleLoadedRecords } from '../../actions/siteHeader';
import { loadedRecordsStatusSelector } from '../../selectors/loadedRecordsStatus';

export default connect(
	loadedRecordsStatusSelector,
	dispatch => bindActionCreators({ toggleLoadedRecords }, dispatch)
)(LoadedRecordsToggler);
