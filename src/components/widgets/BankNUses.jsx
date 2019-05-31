import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class BankNUses extends Component {
	static propTypes = {
		bankName: PropTypes.string,
		//id de l'item de banque
		id: PropTypes.string,
		nUses: PropTypes.number,
		records: PropTypes.array,

		fetchBankUses: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			active: false,
		};
	}

	onWindowClick = () => {
		this.toggleActions();
	}

	requireData(props) {
		// console.log(props);
		if (props.id && !props.records) this.props.fetchBankUses(this.props.bankName, props.id);
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
			this.requireData(this.props);
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
		if (this.props.nUses === '0') return <div>not used</div>;
		const activeClass = this.state.active ? 'active' : '';

		const listRecords = this.props.records && this.props.records.map((rec, i) => {
			return <Link to={`/edit/${rec.tableId}/${rec.recordId}`} key={i} onClick={this.toggleActions} className="record-action">{rec.tableLabel} - {rec.label}</Link>;
		});

		return (
			<div>
				<div className="actions">
					<div className={`record-actions ${activeClass}`}>
						<button className="button-round-bordered-info record-action-control" onClick={this.toggleActions}>{this.props.nUses} use(s) <i className="fa fa-angle-down"></i></button>
						<div className="record-actions-group record-actions-group-large">
							{listRecords}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
