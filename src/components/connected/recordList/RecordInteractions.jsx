import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { routeSelector } from 'selectors/route';
import { lockScroll } from 'actions/nav';

import { FileThumbnail } from 'components/connected/fileThumbnail/FileThumbnail';
import { InfosFcn } from 'components/static/recordList/InfosFcn';
import { DuplicateBtn } from 'components/connected/recordList/DuplicateBtn';
import { OrderFcn } from 'components/connected/recordList/OrderFcn';
import { DeleteBtn } from 'components/connected/recordList/DeleteBtn';

import { LASTMODIF_DATE_ALIAS, CREATED_DATE_ALIAS, PRIKEY_ALIAS } from 'freestone/schemaProps';


@connect(
	routeSelector,
	dispatch => bindActionCreators({ lockScroll }, dispatch)
)
export class RecordInteractions extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		fields: React.PropTypes.array,
		path: React.PropTypes.string,
		values: React.PropTypes.object,

		lockScroll: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	onEditClick = (e) => {
		this.props.lockScroll(this.props.path, window.scrollY);
	}

	render() {
		const prikeyVal = this.props.values[PRIKEY_ALIAS];
		let orderFcn;
		if (this.props.table.hasOrder) {
			orderFcn = <OrderFcn tableName={this.props.table.name} prikey={prikeyVal}/>;
		}

		const modifFcn = (
			<div className="list-functions">
				<Link to={`/edit/${this.props.table.name}/${prikeyVal}`} onClick={this.onEditClick} activeClassName="active" className="btn btn-primary btn-sm"><i className="fa fa-pencil"></i><span> Edit</span></Link>
				<DuplicateBtn tableName={this.props.table.name} prikey={prikeyVal} />
				<DeleteBtn tableName={this.props.table.name} prikey={prikeyVal} />
			</div>
		);
		const infos = (
			<InfosFcn
				tableName={this.props.table.name}
				prikey={prikeyVal}
				lastmodifdate={this.props.values[LASTMODIF_DATE_ALIAS]}
				createddate={this.props.values[CREATED_DATE_ALIAS]}
			/>
		);

		return (<div>
			{ orderFcn }
			{ modifFcn }
			{ infos }
		</div>);

	}
}
