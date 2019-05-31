import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import InfosFcn from '../../containers/recordList/InfosFcn';
import DuplicateBtn from '../../containers/recordList/DuplicateBtn';
import OrderFcn from '../../containers/recordList/OrderFcn';
import DeleteBtn from '../../containers/recordList/DeleteBtn';

import { LASTMODIF_DATE_ALIAS, CREATED_DATE_ALIAS, PRIKEY_ALIAS, LABEL_PSEUDOFIELD_ALIAS, SLUG_PSEUDOFIELD_ALIAS } from '../../freestone/schemaProps';

const DEFAULT_LABEL = 'Actions';
const EDIT_LABEL = 'Edit';
const PREVIEW_LABEL = 'Preview';

export default class RecordInteractions extends Component {
	static propTypes = {
		table: PropTypes.object,
		fields: PropTypes.array,
		path: PropTypes.string,
		values: PropTypes.object,
		hasPreview: PropTypes.bool,
		hasCustomOrder: PropTypes.bool,

		rememberListPage: PropTypes.func,
		lockScroll: PropTypes.func,
		fetchRecords: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};
	}

	componentWillUnmount() {
		this.removeWindowListener();
	}
	
	onEditClick = () => {
		this.props.lockScroll(this.props.path, window.scrollY);
		this.props.rememberListPage(this.props.table.name, this.props.values[PRIKEY_ALIAS], this.props.path);
	}

	onWindowClick = () => {
		this.toggleActions();
	}

	toggleActions = (e) => {
		if (e) e.stopPropagation();
		const isActiveNewState = !this.state.active;

		this.setState({
			active: isActiveNewState,
		});
		//if becomes active, add event lister to close on click outside
		if (isActiveNewState) {
			this.addWindowListener();
		} else {
			this.removeWindowListener();
		}
	}

	addWindowListener() {
		window.addEventListener('click', this.onWindowClick);
	}

	removeWindowListener() {
		window.removeEventListener('click', this.onWindowClick);
	}

	render() {
		const prikeyVal = this.props.values[PRIKEY_ALIAS];
		let orderFcn;
		if (this.props.table.hasOrder) {
			orderFcn = this.props.hasCustomOrder ? <div /> : <OrderFcn tableName={this.props.table.name} prikey={prikeyVal} fetchRecords={this.props.fetchRecords} />;
		}

		const recordLink = this.props.values[SLUG_PSEUDOFIELD_ALIAS];
		const activeClass = this.state.active ? 'active' : '';

		const preview = recordLink ? (<a href={recordLink} target="_blank" className="record-action accent"><i className="fa fa-eye"></i>{PREVIEW_LABEL}</a>) : null;

		return (<div>
			<div className="actions">
				<div className={`record-actions ${activeClass}`}>
					<div className="button-round-bordered-info record-action-control" onClick={this.toggleActions}>{DEFAULT_LABEL} <i className="fa fa-angle-down"></i></div>
					<div className="record-actions-group">
						<NavLink to={`/edit/${this.props.table.name}/${prikeyVal}`} onClick={this.onEditClick} activeClassName="active" className="record-action accent">
							<i className="fa fa-pencil"></i>{EDIT_LABEL}
						</NavLink>
						<DuplicateBtn tableName={this.props.table.name} prikey={prikeyVal} />
						<DeleteBtn key={`${this.props.table.name}_${prikeyVal}`} tableName={this.props.table.name} prikey={prikeyVal} />
						{preview}
					</div>
				</div>
				<InfosFcn
					prikey={prikeyVal}
					lastmodifdate={this.props.values[LASTMODIF_DATE_ALIAS]}
					createddate={this.props.values[CREATED_DATE_ALIAS]}
					label={this.props.values[LABEL_PSEUDOFIELD_ALIAS]}
					tableName={this.props.table.name}
				/>
			</div>
			{orderFcn}
		</div>);
	}
}
