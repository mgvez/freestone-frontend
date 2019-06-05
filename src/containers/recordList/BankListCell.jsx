import { connect } from 'react-redux';

import BankListCell from '../../components/recordList/BankListCell';

export default connect(
	(state) => {
		return {
			lang: state.freestone.env.freestone.defaultLanguage,
		};
	},
	null
)(BankListCell);
