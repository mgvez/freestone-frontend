import React, { Component } from 'react';
// import { Link } from 'react-router';


export class InfosFcn extends Component {
	static propTypes = {
		prikey: React.PropTypes.string,
		createddate: React.PropTypes.string,
		lastmodifdate: React.PropTypes.string,
		label: React.PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};
	}

	handleMouseOver = () => {
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
