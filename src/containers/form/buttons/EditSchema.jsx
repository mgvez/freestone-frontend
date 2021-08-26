import { connect } from 'react-redux';

import EditSchema from '../../../components/form/buttons/EditSchema';
import { editSchemaMapStateToProps } from '../../../selectors/EditSchema';

export default connect(
	editSchemaMapStateToProps,
)(EditSchema);
