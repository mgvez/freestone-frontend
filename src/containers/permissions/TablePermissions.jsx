import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TablePermissions from '../../components/permissions/TablePermissions';

import { savePermissions } from '../../actions/permissions';
import { tableSitePermissionsSelector } from '../../selectors/sitePermissions';

export default connect(
	tableSitePermissionsSelector,
	dispatch => bindActionCreators({ savePermissions }, dispatch)
)(TablePermissions);
