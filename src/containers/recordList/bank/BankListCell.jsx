import { connect } from 'react-redux';

import BankListCell from '../../../components/recordList/bank/BankListCell';

export default connect(
	(state) => {
		return {
			lang: state.freestone.env.freestone.defaultLanguage,
		};
	},
	null
)(BankListCell);
