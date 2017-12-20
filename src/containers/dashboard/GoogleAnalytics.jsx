import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GoogleAnalytics from '../../components/dashboard/GoogleAnalytics';
/* actions */
import { fetchVariable } from '../../actions/env';


export default connect(
	state => { 
		if (!state.freestone.env.clientVariables.api_google) return {};
		return {
			...state.freestone.env.clientVariables.api_google,
			gapi_token_access: state.freestone.auth.gapi_token_access,
		};
	},
	dispatch => bindActionCreators({ fetchVariable }, dispatch)
)(GoogleAnalytics);

