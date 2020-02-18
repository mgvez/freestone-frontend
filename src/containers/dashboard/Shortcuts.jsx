import { connect } from 'react-redux';

import Shortcuts from '../../components/dashboard/Shortcuts';

import { dashboardSelector } from '../../selectors/nav';

export default connect(
	dashboardSelector
)(Shortcuts);

