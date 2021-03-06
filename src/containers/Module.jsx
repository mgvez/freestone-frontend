import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pingAuth } from '../actions/auth';

import Module from '../components/Module';

export default connect(
	(state, props) => {
		const { url } = props.match.params;
		const modules = state.freestone.nav.structure.modules;
		let module = {};
		if (modules) {
			module = modules.find(mod => mod.url === url);
		}
		return { 
			jwt: state.freestone.auth.jwt,
			url,
			...module,
		};
	},
	dispatch => bindActionCreators({ pingAuth }, dispatch)
)(Module);

