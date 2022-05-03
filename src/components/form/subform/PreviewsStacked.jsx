import React from 'react';
import PropTypes from 'prop-types';

import ContentBlockPreview from '../../../containers/form/widgets/ContentBlockPreview';
import ErrorBoundary from '../../widgets/ErrorBoundary';
import ToggleCollapse from '../buttons/ToggleCollapse';
import ChangeSubformView from '../../../containers/form/buttons/ChangeSubformView';
import FormHeaderContent from '../../header/info/FormHeaderContent';
import { Subform, SubformHeader } from '../../../styles/Form';
import { GridItem } from '../../../styles/Grid';

/*
List of all records, each one collapsable, one over the other
*/
export default function PreviewsStacked(props) {
	

	const getContent = () => { 
		return props.childrenRecords.map((record, index) => (
			<ErrorBoundary>
				<ContentBlockPreview 
					tableId={props.table.id}
					key={record.id}
					recordId={record.id}
					parentRecordId={props.parentRecordId}
					parentTableId={props.parentTableId}
					language={props.language}
					previewMode={props.previewMode}
					isSubform
				/>
			</ErrorBoundary>
		));
	};

	if (!props.childrenRecords || !props.table) return null;
	//on peut mettre en liste uniquement si la table n'a pas de children, sinon le formulaire deient très confus
	const changeViewBtn = (!props.isCollapsed) ? <ChangeSubformView tableId={props.table.id} /> : null;
	const content = getContent();
	return (
		<Subform>
			<SubformHeader>
				<GridItem columns="8">
					<FormHeaderContent table={props.table} titleOverride={props.titleOverride} descriptionAppend={props.descriptionAppend} language={props.language} />
				</GridItem>
				<GridItem columns="4" className="fcn">
					{changeViewBtn}
					<ToggleCollapse isCollapsed={props.isCollapsed} toggle={props.changeCollapsedState} />
				</GridItem>
			</SubformHeader>
			{content}
		</Subform>
	);

}

PreviewsStacked.propTypes = {
	table: PropTypes.object,
	activeRecords: PropTypes.array,
	childrenRecords: PropTypes.array,
	language: PropTypes.string,
	parentRecordId: PropTypes.string,
	parentTableId: PropTypes.number,
	titleOverride: PropTypes.string,
	previewMode: PropTypes.string,
	descriptionAppend: PropTypes.string,
	changeCollapsedState: PropTypes.func,
	toggleShownRecord: PropTypes.func,

	isCollapsed: PropTypes.bool,
};
