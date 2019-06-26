import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MarkdownInput from '../../../components/form/inputTypes/MarkdownInput';

import { fetchVariable } from '../../../actions/env';
import { setupBankSelect } from '../../../actions/bank';
import { goTo } from '../../../actions/nav';
import { mceConfigSelector } from '../../../selectors/env';

export default connect(
	mceConfigSelector,
	dispatch => bindActionCreators({ fetchVariable, setupBankSelect, goTo }, dispatch)
)(MarkdownInput);
