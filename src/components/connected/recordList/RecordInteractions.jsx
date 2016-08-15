import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { routeSelector } from 'selectors/route';
import { lockScroll } from 'actions/nav';

import { InfosFcn } from 'components/static/recordList/InfosFcn';
import { DuplicateBtn } from 'components/connected/recordList/DuplicateBtn';
import { OrderFcn } from 'components/connected/recordList/OrderFcn';
import { DeleteBtn } from 'components/connected/recordList/DeleteBtn';

import { LASTMODIF_DATE_ALIAS, CREATED_DATE_ALIAS, PRIKEY_ALIAS, LABEL_PSEUDOFIELD_ALIAS } from 'freestone/schemaProps';

const DEFAULT_LABEL = 'Actions';
const EDIT_LABEL = 'Edit';
const PREVIEW_LABEL = 'Preview';


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

		this.state = {
			active: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		const currentPrikeyVal = this.props.values[PRIKEY_ALIAS];
		const nextPrikeyVal = nextProps.values[PRIKEY_ALIAS];

		if (currentPrikeyVal !== nextPrikeyVal) {
			this.setState({
				active: false,
			});
		}
	}

	componentWillUnmount() {
		this.removeWindowListener();
	}
	
	onEditClick = () => {
		this.props.lockScroll(this.props.path, window.scrollY);
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
			orderFcn = <OrderFcn tableName={this.props.table.name} prikey={prikeyVal} />;
		}

		const recordLink = `../main.php?i=${prikeyVal}&t=${this.props.table.name}`;
		const activeClass = this.state.active ? 'active' : '';

		return (<div>
			<div className="actions">
				<div className={`record-actions ${activeClass}`}>
					<div className="button-round-bordered-info record-action-control" onClick={this.toggleActions}>{DEFAULT_LABEL} <i className="fa fa-angle-down"></i></div>
					<div className="record-actions-group">
						<Link to={`/edit/${this.props.table.name}/${prikeyVal}`} onClick={this.onEditClick} activeClassName="active" className="record-action accent">
							<i className="fa fa-pencil"></i>{EDIT_LABEL}
						</Link>
						<DuplicateBtn tableName={this.props.table.name} prikey={prikeyVal} />
						<DeleteBtn tableName={this.props.table.name} prikey={prikeyVal} />
						<a href={recordLink} className="record-action accent">
							<i className="fa fa-eye"></i>{PREVIEW_LABEL}
						</a>
					</div>
				</div>
				<InfosFcn
					prikey={prikeyVal}
					lastmodifdate={this.props.values[LASTMODIF_DATE_ALIAS]}
					createddate={this.props.values[CREATED_DATE_ALIAS]}
					label={this.props.values[LABEL_PSEUDOFIELD_ALIAS]}
				/>
			</div>
			{orderFcn}
		</div>);
	}
}
