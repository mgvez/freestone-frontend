import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StackList from './StackList';
import Collapsable from '../../animation/Collapsable';
import ToggleCollapse from '../buttons/ToggleCollapse';
import ChangeSubformView from '../../../containers/form/buttons/ChangeSubformView';
import FormHeaderContent from '../../header/info/FormHeaderContent';
import { Subform, SubformHeader } from '../../../styles/Form';
import { GridItem } from '../../../styles/Grid';

/*
List of all records, each one collapsable, one over the other
*/
export default class SubformStacked extends Component {
	static propTypes = {
		table: PropTypes.object,
		activeRecords: PropTypes.array,
		childrenRecords: PropTypes.array,
		language: PropTypes.string,
		parentRecordId: PropTypes.string,
		parentTableId: PropTypes.number,
		titleOverride: PropTypes.string,
		descriptionAppend: PropTypes.string,
		changeCollapsedState: PropTypes.func,
		toggleShownRecord: PropTypes.func,

		isCollapsed: PropTypes.bool,
	};

	getContent() {

		return (<Collapsable isCollapsed={this.props.isCollapsed}>
			<StackList {...this.props} isVertical activeRecords={this.props.activeRecords} />
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
					<GridItem columns="4" className="fcn">
						{changeViewBtn}
						<ToggleCollapse isCollapsed={this.props.isCollapsed} toggle={this.props.changeCollapsedState} />
					</GridItem>
				</SubformHeader>
				{content}
			</Subform>
		);

	}
}
