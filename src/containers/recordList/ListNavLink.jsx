import { connect } from 'react-redux';

import ListNavLink from '../../components/recordList/ListNavLink';
import { getListLinkSelector } from '../../selectors/listNavig';


export default connect(
	getListLinkSelector
)(ListNavLink);
