import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { fetchTable } from 'actions/schema';
import * as recordActionCreators from 'actions/record';

import { formMtmMapStateToProps } from 'selectors/formMtm';

import { Header } from 'components/static/form/Header';


@dragDropContext(HTML5Backend)
@connect(
	formMtmMapStateToProps,
	dispatch => bindActionCreators({ ...recordActionCreators, fetchTable }, dispatch)
)
export class SubformMtm extends Component {
	static propTypes = {
		tableId: React.PropTypes.number,
		table: React.PropTypes.object,
		records: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		mtmOptions: React.PropTypes.array,

		fetchTable: React.PropTypes.func,
		fetchMtmOptions: React.PropTypes.func,
		fetchMtmRecords: React.PropTypes.func,
		toggleMtm: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.requireData(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.requireData(nextProps);
	}

	requireData(props) {
		// console.log(props.records);
		const { tableId, parentRecordId, parentTableId } = props;
		if (!props.table) {
			this.props.fetchTable(tableId);
		} else {
			const tableName = props.table.name;
			if (!props.mtmOptions) this.props.fetchMtmOptions(tableName);
			if (!props.records) this.props.fetchMtmRecords(tableName, parentRecordId, parentTableId);

		}
	}

	toggleValue = (e) => {
		const v = (e && e.target) ? e.target.value : false;
		this.props.toggleMtm(this.props.tableId, this.props.parentTableId, this.props.parentRecordId, v);
	};

	render() {
		// console.log(this.props.records);
		if (this.props.mtmOptions) {
			// console.log(this.props.mtmOptions);
			return (
				<section className="subform row">
					<header>
						<Header table={this.props.table} />
					</header>
					{
						this.props.mtmOptions.map((optionGroup, groupIndex) => {
							// console.log(optionGroup);
							const { categ, options } = optionGroup;
							let categLabel;
							if (categ) {
								categLabel = <h3 className="col-md-12">{categ}</h3>;
							}
							const inputs = options.map((option, optionIndex) => {
								const { display, id } = option;
								const checked = this.props.records && !!this.props.records.find(r => r === id);
								return (
									<label className="col-md-3" key={id}>
										<input type="checkbox" value={id} checked={checked} onChange={this.toggleValue} /> {display}
									</label>
								);
							});

							return (<div key={groupIndex}>
								{categLabel}
								{inputs}
							</div>);
							
						})
					}
				</section>
			);
		}

		return null;

	}
}
