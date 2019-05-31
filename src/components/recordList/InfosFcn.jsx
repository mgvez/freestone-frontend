import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';


export default class InfosFcn extends Component {
	static propTypes = {
		prikey: PropTypes.string,
		tableName: PropTypes.string,
		createddate: PropTypes.string,
		lastmodifdate: PropTypes.string,
		label: PropTypes.string,

		fetchRecordInfo: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};
	}

	handleMouseOver = () => {
		if (!this.props.createddate) this.onRequestInfo();
		this.setState({
			active: true,
		});
	}

	handleMouseOut = () => {
		this.setState({
			active: false,
		});
	}

	onRequestInfo = () => {
		if (!this.props.tableName) return;
		this.props.fetchRecordInfo(this.props.tableName, this.props.prikey);
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
