import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HtmlInput from '../../../components/form/inputTypes/HtmlInput';

import { fetchVariable } from '../../../actions/env';
import { mceConfigSelector } from '../../../selectors/env';
import { setupBankSelect } from '../../../actions/bank';
import { goTo } from '../../../actions/nav';

export default connect(
	mceConfigSelector,
	dispatch => bindActionCreators({ fetchVariable, setupBankSelect, goTo }, dispatch)
)(HtmlInput);
