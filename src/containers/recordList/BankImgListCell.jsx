import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankImgListCell from '../../components/recordList/BankImgListCell';

export default connect(
	(state) => {

		return {
			lang: state.freestone.env.freestone.defaultLanguage,
		};
	},
	null
	// dispatch => bindActionCreators({ swapAnimated }, dispatch)
)(BankImgListCell);
