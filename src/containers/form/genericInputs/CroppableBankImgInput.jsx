import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CroppableBankImgInput from '../../../components/form/genericInputs/CroppableBankImgInput';
import { fetchImageBankItem } from '../../../actions/bank';
import { bankItemSelector } from '../../../selectors/bank';


export default connect(
	bankItemSelector,
	dispatch => bindActionCreators({ fetchImageBankItem }, dispatch)
)(CroppableBankImgInput);
