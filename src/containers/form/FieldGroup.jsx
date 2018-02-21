import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FieldGroup from '../../components/form/FieldGroup';

import { toggleFieldGroup } from '../../actions/fieldgroup';
import { fieldGroupCollapsedMapStateToProps } from '../../selectors/fieldgroup';

export default connect(
	fieldGroupCollapsedMapStateToProps(),
	dispatch => bindActionCreators({ toggleFieldGroup }, dispatch)
)(FieldGroup);
