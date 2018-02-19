import { connect } from 'react-redux';

import ClientComponent from '../../components/utils/ClientComponent';
import { clientComponentInfosSelector } from '../../selectors/env';

export default connect(
	clientComponentInfosSelector
)(ClientComponent);
