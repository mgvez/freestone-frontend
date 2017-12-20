import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavToggler from '../../components/widgets/NavToggler';

import { toggleNavVisibility } from '../../actions/siteHeader';

export default connect(
	state => { 
		return { nav_visibility: state.freestone.siteHeader.nav_visibility };
	},
	dispatch => bindActionCreators({ toggleNavVisibility }, dispatch)
)(NavToggler);
