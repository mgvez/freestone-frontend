import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getListLinkSelector } from '../../selectors/listRecords';


export default connect(
	getListLinkSelector,
	null,
)(NavLink);
