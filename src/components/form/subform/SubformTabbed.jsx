import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabList from './TabList';
import Collapsable from '../../animation/Collapsable';
import SingleRecord from '../../../containers/form/SingleRecord';
import ChangeSubformView from '../../../containers/form/buttons/ChangeSubformView';
import ToggleCollapse from '../buttons/ToggleCollapse';
import FormHeaderContent from '../../header/FormHeaderContent';
import { Subform, SubformHeader } from '../../../styles/Form';
import { GridItem } from '../../../styles/Grid';

export default class SubformTabbed extends Component {
	static propTypes = {
		table: PropTypes.object,
		activeRecord: PropTypes.object,
		childrenRecords: PropTypes.array,
		language: PropTypes.string,
		parentRecordId: PropTypes.string,
		parentTableId: PropTypes.number,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,
		changeCollapsedState: PropTypes.func,

		isCollapsed: PropTypes.bool,
	};

	getContent() {
		const activeRecordId = this.props.activeRecord && this.props.activeRecord.id;

		return (<Collapsable isCollapsed={this.props.isCollapsed}>
			<TabList {...this.props} activeRecordId={activeRecordId} />
			<SingleRecord
				tableId={this.props.table.id}
				parentRecordId={this.props.parentRecordId}
				parentTableId={this.props.parentTableId}
				recordId={activeRecordId}
				language={this.props.language}
				isSubform
			/>
		</Collapsable>);
	}

	render() {
		if (!this.props.childrenRecords || !this.props.table) return null;
		//on peut mettre en liste uniquement si la table n'a pas de children, sinon le formulaire deient très confus
		const changeViewBtn = (!this.props.isCollapsed) ? <ChangeSubformView tableId={this.props.table.id} /> : null;
		const content = this.getContent();
		return (
			<Subform>
				<SubformHeader>
					<GridItem columns="8">
						<FormHeaderContent table={this.props.table} titleOverride={this.props.titleOverride} descriptionAppend={this.props.descriptionAppend} language={this.props.language} />
					</GridItem>
					<GridItem columns="4" align="end" className="fcn">
						{changeViewBtn}
						<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.props.changeCollapsedState} />
					</GridItem>
				</SubformHeader>
				{content}
			</Subform>
		);

	}
}
