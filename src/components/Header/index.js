import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import styles from './styles';

export class Header extends Component {
	static propTypes = {
		logout: React.PropTypes.func,
		clearErrors: React.PropTypes.func,
		clearData: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// window.addEventListener('scroll', this.hideHeader);
	}

	componentWillUnmount() {
		// window.removeEventListener('scroll', this.hideHeader);
	}

	// hideHeader() {
	// 	const opacity = 1 - (window.pageYOffset / 200).toFixed(1);
	// 	this.refs.header.style.opacity = opacity;
	// }

	render() {

		return (
			<header className={`${styles}`} ref="header">
				<div className="container">
					<div className="row">
						<div className="col-xs-5 col-sm-3 col-md-3 col-lg-3 logo">
							<Link to="/">
								Freestone
							</Link>
						</div>
						<div className="col-xs-5 col-sm-3 col-md-3 col-lg-3">
							<button className="btn btn-xs" onClick={this.props.logout}>
								Logout
							</button>
							<button className="btn btn-xs" onClick={this.props.clearData}>
								Clear all data
							</button>
							<button className="btn btn-xs" onClick={this.props.clearErrors}>
								Clear errors
							</button>
						</div>
					</div>
				</div>
			</header>
		);
	}
}
