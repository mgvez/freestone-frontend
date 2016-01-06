import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import styles from './styles';

export class Header extends Component {
	constructor(props) {
		super(props);
		this.hideHeader = this.hideHeader.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.hideHeader);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.hideHeader);
	}

	hideHeader() {
		const opacity = 1 - (window.pageYOffset / 200).toFixed(1);
		this.refs.header.style.opacity = opacity;
	}

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
					</div>
				</div>
			</header>
		);
	}
}
