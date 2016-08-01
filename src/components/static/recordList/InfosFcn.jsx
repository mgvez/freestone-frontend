import React, { Component } from 'react';
// import { Link } from 'react-router';


export class InfosFcn extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		prikey: React.PropTypes.string,
		createddate: React.PropTypes.string,
		lastmodifdate: React.PropTypes.string,
		label: React.PropTypes.string,
	};
	
	render() {
		const recordLink = `../main.php?i=${this.props.prikey}&t=${this.props.tableName}`;
		const created = this.props.createddate || 'unknown';
		const modified = this.props.lastmodifdate || 'unknown';
		return (
			<div className="modification" colSpan="25">
				<div>{this.props.prikey}. <strong>{this.props.label}</strong></div>
				created {created}<br />
				modified {modified}<br />
				<em><a target="_blank" href={recordLink}>preview</a></em>
			</div>
		);
	}
}
