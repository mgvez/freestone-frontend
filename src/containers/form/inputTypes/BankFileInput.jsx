import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankFileInput from '../../../components/form/inputTypes/BankFileInput';
import { setupBankSelect } from '../../../actions/bank';
import { goTo } from '../../../actions/nav';
import { bankSelectionSelector } from '../../../selectors/bank';


export default connect(
	bankSelectionSelector,
	dispatch => bindActionCreators({ setupBankSelect, goTo }, dispatch)
)(BankFileInput);
