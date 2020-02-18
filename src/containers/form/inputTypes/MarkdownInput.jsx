import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MarkdownInput from '../../../components/form/inputTypes/MarkdownInput';

import { fetchVariable } from '../../../actions/env';
import { setupBankSelect } from '../../../actions/bank';
import { goTo } from '../../../actions/nav';
import { routeSelector } from '../../../selectors/route';

export default connect(
	routeSelector,
	dispatch => bindActionCreators({ fetchVariable, setupBankSelect, goTo }, dispatch)
)(MarkdownInput);
