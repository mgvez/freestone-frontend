import React from 'react';
import PropTypes from 'prop-types';

import TabList from './TabList';
import Collapsable from '../../animation/Collapsable';
import SingleRecord from '../../../containers/form/SingleRecord';
import ChangeSubformView from '../../../containers/form/buttons/ChangeSubformView';
import ToggleCollapse from '../buttons/ToggleCollapse';
import FormHeaderContent from '../../header/info/FormHeaderContent';
import { Subform, SubformHeader, SubformTabbedContainer } from '../../../styles/Form';
import { GridItem } from '../../../styles/Grid';
import { SUBFORM_VIEW_TABBED_VERTICAL } from '../../../freestone/schemaProps';

export default function SubformTabbed(props) {

	if (!props.childrenRecords || !props.table) return null;
	//on peut mettre en liste uniquement si la table n'a pas de children, sinon le formulaire deient très confus
	const changeViewBtn = (!props.isCollapsed) ? <ChangeSubformView tableId={props.table.id} /> : null;

	const activeRecordId = (props.activeRecords && props.activeRecords.length && props.activeRecords[0].id) || (props.childrenRecords && props.childrenRecords.length && props.childrenRecords[0].id) || null;

	const isSidebarView = props.currentViewType === SUBFORM_VIEW_TABBED_VERTICAL;

	return (
		<Subform>
			<SubformHeader>
				<GridItem columns="8">
					<FormHeaderContent table={props.table} titleOverride={props.titleOverride} descriptionAppend={props.descriptionAppend} language={props.language} />
				</GridItem>
				<GridItem columns="4" align="end" className="fcn">
					{changeViewBtn}
					<ToggleCollapse isCollapsed={props.isCollapsed} toggle={props.changeCollapsedState} />
				</GridItem>
			</SubformHeader>
			<Collapsable isCollapsed={props.isCollapsed}>
				<SubformTabbedContainer isSidebarView={isSidebarView}>
					<TabList {...props} isSidebarView={isSidebarView} activeRecordId={activeRecordId} />
					<SingleRecord
						tableId={props.table.id}
						parentRecordId={props.parentRecordId}
						parentTableId={props.parentTableId}
						recordId={activeRecordId && String(activeRecordId)}
						language={props.language}
						isSubform
						isSidebarView={isSidebarView}
					/>
				</SubformTabbedContainer>
			</Collapsable>
		</Subform>
	);

}

SubformTabbed.propTypes = {
	table: PropTypes.object,
	activeRecords: PropTypes.array,
	childrenRecords: PropTypes.array,
	language: PropTypes.string,
	parentRecordId: PropTypes.string,
	parentTableId: PropTypes.number,
	titleOverride: PropTypes.string,
	descriptionAppend: PropTypes.string,
	currentViewType: PropTypes.string,
	changeCollapsedState: PropTypes.func,
	isCollapsed: PropTypes.bool,
};
