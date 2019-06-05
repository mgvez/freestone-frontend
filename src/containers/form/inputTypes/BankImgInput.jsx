import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BankImgInput from '../../../components/form/inputTypes/BankImgInput';
import { setupBankSelect } from '../../../actions/bank';
import { goTo } from '../../../actions/nav';
import { bankSelectionSelector } from '../../../selectors/bank';


export default connect(
	bankSelectionSelector,
	dispatch => bindActionCreators({ setupBankSelect, goTo }, dispatch)
)(BankImgInput);
