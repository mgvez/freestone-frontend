import React, { Component } from 'react';
// import { Link } from 'react-router';


export class InfosFcn extends Component {
	static propTypes = {
		tableName: React.PropTypes.string,
		prikey: React.PropTypes.string,
		createddate: React.PropTypes.string,
		lastmodifdate: React.PropTypes.string,
	};
	
	render() {
		const recordLink = `../main.php?i=${this.props.prikey}&t=${this.props.tableName}`;
		const created = this.props.createddate || 'unknown';
		const modified = this.props.lastmodifdate || 'unknown';
		return (
			<div className="modification" colSpan="25">
				created {created}, 
				modified {modified}, 
				<em><a target="_blank" href={recordLink}>{this.props.prikey}</a></em>
			</div>
		);
	}
}
