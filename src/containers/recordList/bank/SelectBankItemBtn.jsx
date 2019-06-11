import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectBankItemBtn from '../../../components/recordList/bank/SelectBankItemBtn';

import { setFieldVal } from '../../../actions/record';
import { goTo } from '../../../actions/nav';
import { bankSelectionSelector } from '../../../selectors/bank';

export default connect(
	bankSelectionSelector,
	dispatch => bindActionCreators({ setFieldVal, goTo }, dispatch)
)(SelectBankItemBtn);
