import { connect } from 'react-redux';

import CopyRecord from '../../../components/form/buttons/CopyRecord';

import { buildCopyRecordSelector } from '../../../selectors/buildRecord';

export default connect(
	buildCopyRecordSelector
)(CopyRecord);
