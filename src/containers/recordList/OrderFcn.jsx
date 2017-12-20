import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OrderFcn from '../../components/recordList/OrderFcn';

import { swapOrder } from '../../actions/save';

export default connect(
	null,
	dispatch => bindActionCreators({ swapOrder }, dispatch)
)(OrderFcn);
