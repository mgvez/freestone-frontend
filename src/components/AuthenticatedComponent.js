import React from 'react';
import { connect } from 'react-redux';
import { unauthorized } from 'actions/auth';

export function requireAuthentication(Component) {

	class AuthenticatedComponent extends React.Component {
		static propTypes = {
			isAuthenticated: React.PropTypes.bool,
			dispatch: React.PropTypes.func,
			location: React.PropTypes.object,
		};


		componentWillMount() {
			this.checkAuth();
		}

		componentWillReceiveProps() {
			this.checkAuth();
		}

		checkAuth() {
			// console.log('AUTHENTICATED:: ' + this.props.isAuthenticated);
			if (!this.props.isAuthenticated) {
				this.props.dispatch(unauthorized());
			}
		}

		render() {
			return (
				<div>
					{this.props.isAuthenticated === true
						? <Component {...this.props}/>
						: <div>Not permitted</div>
					}
				</div>
			);

		}
	}

	const mapStateToProps = (state) => ({
		userName: state.auth.userName,
		isAuthenticated: state.auth.isAuthenticated,
	});

	return connect(mapStateToProps)(AuthenticatedComponent);
}
