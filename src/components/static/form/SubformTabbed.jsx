import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { collapser } from 'components/static/animation/Collapser';

import { formCollapsedMapStateToProps } from 'selectors/formCollapsed';
import { setSubformCollapsed } from 'actions/subform';

import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Tab } from 'components/static/form/Tab';
import { SingleRecord } from 'components/connected/form/SingleRecord';
import { AddRecord } from 'components/connected/form/buttons/AddRecord';
import { ChangeSubformView } from 'components/connected/form/buttons/ChangeSubformView';
import { Header } from 'components/static/form/Header';
import { ToggleSubform } from 'components/connected/form/buttons/ToggleSubform';

@dragDropContext(HTML5Backend)
@connect(
	formCollapsedMapStateToProps,
	dispatch => bindActionCreators({ setSubformCollapsed }, dispatch)
)
@collapser({})
export class SubformTabbed extends Component {
	static propTypes = {
		table: React.PropTypes.object,
		activeRecord: React.PropTypes.object,
		childrenRecords: React.PropTypes.array,
		parentTableId: React.PropTypes.number,
		parentRecordId: React.PropTypes.string,
		highestOrder: React.PropTypes.number,
		language: React.PropTypes.string,
		isCollapsed: React.PropTypes.bool,

		swapRecords: React.PropTypes.func,
		setShownRecord: React.PropTypes.func,
		
		setSubformCollapsed: React.PropTypes.func,
		onRequestToggleCollapse: React.PropTypes.func,

	};

	getContent() {
		if (this.props.isCollapsed) return null;
		
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		return (<div ref={this.setCollapsable}>
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

			<SingleRecord tableId={this.props.table.id} recordId={activeRecordId} language={this.props.language}/>
		</div>);
	}

	setCollapsable = (el) => {
		this._collapsable = el;
	}

	getCollapsable = (el) => {
		return this._collapsable;
	}

	toggleCollapse(val) {
		console.log('collapse %s', val);
		this.props.setSubformCollapsed(this.props.table.id, val);
	}

	checkIsCollapsed(props) {
		return (props || this.props).isCollapsed;
	}

	render() {
		if (!this.props.childrenRecords || !this.props.table) return null;
		//on peut mettre en liste uniquement si la table n'a pas de children, sinon le formulaire deient très confus
		const changeViewBtn = (!this.props.table.hasChildren && !this.props.isCollapsed) ? <ChangeSubformView tableId={this.props.table.id} /> : null;
		const content = this.getContent();
		return (
			<section className="subform">
				<header className="row">
					<div className="col-md-8">
						<Header table={this.props.table} />
					</div>
					<div className="col-md-3 col-md-offset-1 fcn">
						{changeViewBtn}
						<ToggleSubform isCollapsed={this.props.isCollapsed} onRequestToggleCollapse={this.props.onRequestToggleCollapse}/>
					</div>
				</header>
				{ content }
			</section>
		);

	}
}
