import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoadedRecords from '../../components/dashboard/LoadedRecords';
/* actions */
import { fetchTable } from '../../actions/schema';
import { fetchForeignLabel } from '../../actions/foreignOptions';
import { toggleLoadedRecords } from '../../actions/siteHeader';
import { loadedRecords } from '../../selectors/loadedRecords';

export default connect(
	loadedRecords,
	dispatch => bindActionCreators({ fetchTable, fetchForeignLabel, toggleLoadedRecords }, dispatch)
)(LoadedRecords);

