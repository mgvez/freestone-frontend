import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';


export default class InfosFcn extends Component {
	static propTypes = {
		prikey: PropTypes.string,
		createddate: PropTypes.string,
		lastmodifdate: PropTypes.string,
		label: PropTypes.string,

		onRequestInfo: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};
	}

	handleMouseOver = () => {
		if (!this.props.createddate) this.props.onRequestInfo();
		this.setState({
			active: true,
		});
	}

	handleMouseOut = () => {
		this.setState({
			active: false,
		});
	}
	
	render() {
		const created = this.props.createddate || 'unknown';
		const modified = this.props.lastmodifdate || 'unknown';
		const activeClass = this.state.active ? 'shown' : '';
		return (
			<div data-info-tooltip>
				<div className={`tooltip ${activeClass}`}>
					id. {this.props.prikey}<br />
					c. {created}<br />
					m. {modified}<br />
				</div>

				<a onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>Record infos</a>
			</div>
		);
	}
}
