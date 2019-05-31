import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankListCell from '../../components/recordList/BankListCell';

export default connect(
	(state) => {

		return {
			lang: state.freestone.env.freestone.defaultLanguage,
		};
	},
	null
	// dispatch => bindActionCreators({ swapAnimated }, dispatch)
)(BankListCell);
