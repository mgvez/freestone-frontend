import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PermissionsForm from '../../components/permissions/PermissionsForm';

import { sitePermissionsSelector } from '../../selectors/sitePermissions';
import { fetchSitePermissions, fetchUsergroups, toggleRecordPermission } from '../../actions/permissions';

export default connect(
	sitePermissionsSelector,
	dispatch => bindActionCreators({ fetchSitePermissions, fetchUsergroups, toggleRecordPermission }, dispatch)
)(PermissionsForm);
