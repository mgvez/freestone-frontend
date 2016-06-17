import React, { Component } from 'react';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Tab } from 'components/static/form/Tab';
import { SingleRecord } from 'components/connected/form/SingleRecord';
import { AddRecord } from 'components/connected/form/buttons/AddRecord';
import { ChangeSubformView } from 'components/connected/form/buttons/ChangeSubformView';
import { Header } from 'components/static/form/Header';


@dragDropContext(HTML5Backend)
export class SubformTabbed extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		highestOrder: React.PropTypes.number,

		swapRecords: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.childrenRecords || !this.props.table) return null;
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		return (
			<section className="subform">
				<header className="row">
					<div className="col-md-8">
						<Header table={this.props.table} />
					</div>
					<div className="col-md-3 col-md-offset-1 fcn">
						<ChangeSubformView tableId={this.props.table.id} />
					</div>
				</header>

				<nav className="tabs">
					{
						this.props.childrenRecords.map((record, index) => {

							const active = record.id === activeRecordId;
							return (<Tab
								key={record.id}
								displayLabel={record.label}
								hasOrder={!!this.props.table.orderField}
								isActive={active}
								recordId={record.id}
								index={index}
								tableId={this.props.table.id}
								parentRecordId={this.props.parentRecordId}
								setShownRecord={this.props.setShownRecord}
								swapRecords={this.props.swapRecords}
							/>);
						})
					}

					<AddRecord
						table={this.props.table}
						parentRecordId={this.props.parentRecordId}
						parentTableId={this.props.parentTableId}
						highestOrder={this.props.highestOrder}
					/>
				</nav>

				<SingleRecord tableName={this.props.table.name} recordId={activeRecordId} />
			</section>
		);

	}
}
