import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankNUses from '../../../components/recordList/bank/BankNUses';

import { fetchBankUses } from '../../../actions/bank';
import { bankUsesSelector } from '../../../selectors/bank';

export default connect(
	bankUsesSelector,
	dispatch => bindActionCreators({ fetchBankUses }, dispatch)
)(BankNUses);
